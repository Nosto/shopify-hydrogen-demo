import { defer } from '@shopify/remix-oxygen';
import { Await, Link, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';

import { NostoPlacement } from '@nosto/shopify-hydrogen';
import { NostoSlot } from '~/components/nosto/NostoSlot';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({
    featuredCollection,
    recommendedProducts,
    nostoRecommendations: {},
  });
}

export async function clientLoader({serverLoader}) {
  const recoLoader = () =>
    new Promise(async (resolve) => {
      window?.nostojs(async (api) => {
        const data = await api
          .defaultSession()
          .viewFrontPage()
          .setPlacements(['frontpage-nosto-1', 'frontpage-nosto-3'])
          .load();

        resolve({
          nostoRecommendations: data.campaigns?.recommendations || {},
        });
      });
    });

  const [serverData, clientData] = await Promise.all([
    serverLoader(),
    recoLoader(),
  ]);
  return {...serverData, ...clientData};
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

clientLoader.hydrate = true;

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="home">
      <div>
        {/*<Image src="https://nosto.com/wp-content/uploads/Hydrogen-Feature.png" width={100} height={100}/>*/}
      </div>
      <FeaturedCollection collection={data.featuredCollection}/>
      <RecommendedProducts products={data.recommendedProducts}/>
      <NostoPlacement id="frontpage-nosto-1">
        <NostoSlot
          nostoRecommendation={data.nostoRecommendations['frontpage-nosto-1']}
        />
      </NostoPlacement>
      <NostoPlacement id="frontpage-nosto-3">
        <NostoSlot
          nostoRecommendation={data.nostoRecommendations['frontpage-nosto-3']}
        />
      </NostoPlacement>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw"/>
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice}/>
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br/>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
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
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
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
  images(first: 1) {
    nodes {
      id
      url
      altText
      width
      height
    }
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
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
