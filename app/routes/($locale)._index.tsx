import {Await, Link} from 'react-router';
import {Suspense, useEffect, useState} from 'react';
import {Cache, gql, type StorefrontApi} from '@shopify/hydrogen';
import type {Route} from './+types/($locale)._index';
import {responsiveSrcSet, shopifyImageUrl} from '~/lib/image';
import {ProductItem} from '~/components/ProductItem';
import {storefrontClientContext} from '~/lib/storefront';
import {NostoPlacement} from '@nosto/shopify-hydrogen';
import {
  NostoSlot,
  withNosto,
  type NostoRecommendations,
} from '~/components/nosto/NostoSlot';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {
    ...deferredData,
    ...criticalData,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);

  const [{data, errors}] = await Promise.all([
    storefront.graphql(FEATURED_COLLECTION_QUERY, {cache: Cache.long()}),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (errors) {
    console.error('[hydrogen] Featured collection query failed', errors);
    throw new Response('Featured collection query failed', {status: 500});
  }

  return {
    featuredCollection: data?.collections.nodes[0] ?? null,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);

  const recommendedProducts = storefront
    .graphql(RECOMMENDED_PRODUCTS_QUERY, {cache: Cache.short()})
    .then(({data, errors}) => {
      if (errors) {
        throw errors;
      }
      return data ?? null;
    })
    .catch((error: unknown) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage({loaderData: data}: Route.ComponentProps) {
  const [nostoRecommendations, setNostoRecommendations] =
    useState<NostoRecommendations>({});

  useEffect(() => {
    // This runs after hydration — both on first load and on client navigations
    withNosto(async (api) => {
      const result = await api
        .defaultSession()
        .viewFrontPage()
        .setPlacements(['frontpage-nosto-1', 'frontpage-nosto-3'])
        .load();

      setNostoRecommendations(result.campaigns?.recommendations || {});
    });
  }, []);

  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
      <NostoPlacement id="frontpage-nosto-1">
        <NostoSlot
          nostoRecommendation={nostoRecommendations['frontpage-nosto-1']}
        />
      </NostoPlacement>
      <NostoPlacement id="frontpage-nosto-3">
        <NostoSlot
          nostoRecommendation={nostoRecommendations['frontpage-nosto-3']}
        />
      </NostoPlacement>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionQuery['collections']['nodes'][number] | null;
}) {
  if (!collection) {
    return null;
  }
  const image = collection.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <img
            alt={image.altText ?? ''}
            src={shopifyImageUrl(image.url, {width: 1200})}
            srcSet={responsiveSrcSet(image.url, [600, 900, 1200, 1600, 2000])}
            sizes="100vw"
            width={image.width ?? undefined}
            height={image.height ?? undefined}
          />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = gql(`#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`);

const RECOMMENDED_PRODUCTS_QUERY = gql(`#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`);

type FeaturedCollectionQuery = StorefrontApi.ResultOf<
  typeof FEATURED_COLLECTION_QUERY
>;
type RecommendedProductsQuery = StorefrontApi.ResultOf<
  typeof RECOMMENDED_PRODUCTS_QUERY
>;
