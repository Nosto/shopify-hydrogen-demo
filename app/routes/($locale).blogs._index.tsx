import {Link, useLoaderData} from 'react-router';
import {Cache, gql} from '@shopify/hydrogen';

import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {getPaginationVariables} from '~/lib/pagination';
import {storefrontClientContext} from '~/lib/storefront';

import type {Route} from './+types/($locale).blogs._index';

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Blogs`}];
};

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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const storefront = context.get(storefrontClientContext);

  const [{data, errors}] = await Promise.all([
    storefront.graphql(BLOGS_QUERY, {
      variables: {
        ...paginationVariables,
      },
      cache: Cache.short(),
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (errors?.length || !data?.blogs) {
    throw new Response(
      errors?.map((error) => error.message).join(', ') ?? 'Blogs not found',
      {status: 500},
    );
  }

  return {blogs: data.blogs};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Blogs() {
  const {blogs} = useLoaderData<typeof loader>();

  return (
    <div className="blogs">
      <h1>Blogs</h1>
      <div className="blogs-grid">
        <PaginatedResourceSection connection={blogs}>
          {({node: blog}) => (
            <Link
              className="blog"
              key={blog.handle}
              prefetch="intent"
              to={`/blogs/${blog.handle}`}
            >
              <h2>{blog.title}</h2>
            </Link>
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = gql(`#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
`);
