import {Link} from 'react-router';
import {Cache, gql, type StorefrontApi} from '@shopify/hydrogen';
import type {Route} from './+types/($locale).collections._index';
import {Image} from '~/components/Image';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {getPaginationVariables} from '~/lib/pagination';
import {storefrontClientContext} from '~/lib/storefront';

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{data, errors}] = await Promise.all([
    storefront.graphql(COLLECTIONS_QUERY, {
      variables: paginationVariables,
      cache: Cache.short(),
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (errors || !data) {
    console.error('[hydrogen] Collections query failed', errors);
    throw new Response('Collections query failed', {status: 500});
  }

  return {collections: data.collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collections({loaderData}: Route.ComponentProps) {
  const {collections} = loaderData;

  return (
    <div className="collections">
      <h1>Collections</h1>
      <PaginatedResourceSection
        connection={collections}
        resourcesClassName="collections-grid"
      >
        {({node: collection, index}) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionsQuery['collections']['nodes'][number];
  index: number;
}) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h5>{collection.title}</h5>
    </Link>
  );
}

const COLLECTIONS_QUERY = gql(`#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`);

type CollectionsQuery = StorefrontApi.ResultOf<typeof COLLECTIONS_QUERY>;
