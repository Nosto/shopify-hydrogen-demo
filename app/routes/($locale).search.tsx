import {useEffect} from 'react';
import {useLoaderData} from 'react-router';
import {Cache, gql} from '@shopify/hydrogen';

import type {Route} from './+types/($locale).search';
import {SearchForm} from '~/components/SearchForm';
import {SearchResults} from '~/components/SearchResults';
import {AnalyticsEvent, getAnalytics} from '~/lib/analytics';
import {getPaginationVariables} from '~/lib/pagination';
import type {RegularSearchReturn} from '~/lib/search';
import {storefrontClientContext} from '~/lib/storefront';

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Search`}];
};

export async function loader({
  request,
  context,
}: Route.LoaderArgs): Promise<RegularSearchReturn> {
  // Predictive search is served by the `/api/predictive-search` route handler
  try {
    return await regularSearch({request, context});
  } catch (error) {
    console.error(error);
    return {
      type: 'regular',
      term: '',
      result: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Renders the /search route
 */
export default function SearchPage() {
  const {term, result, error} = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!term) {
      return;
    }
    getAnalytics()?.publish(AnalyticsEvent.SEARCH_VIEWED, {
      searchTerm: term,
      searchResults: {totalCount: result?.total ?? 0},
    });
  }, [term, result?.total]);

  return (
    <div className="search">
      <h1>Search</h1>
      <SearchForm>
        {({inputRef}) => (
          <>
            <input
              defaultValue={term}
              name="q"
              placeholder="Search…"
              ref={inputRef}
              type="search"
            />
            &nbsp;
            <button type="submit">Search</button>
          </>
        )}
      </SearchForm>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!term || !result?.total ? (
        <SearchResults.Empty />
      ) : (
        <SearchResults result={result} term={term}>
          {({articles, pages, products, term}) => (
            <div>
              <SearchResults.Products products={products} term={term} />
              <SearchResults.Pages pages={pages} term={term} />
              <SearchResults.Articles articles={articles} term={term} />
            </div>
          )}
        </SearchResults>
      )}
    </div>
  );
}

/**
 * Regular search query and fragments
 * (adjust as needed)
 */
const SEARCH_PRODUCT_FRAGMENT = gql(`
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
      product {
        handle
        title
      }
    }
  }
`);

const SEARCH_PAGE_FRAGMENT = gql(`
  fragment SearchPage on Page {
    __typename
    handle
    id
    title
    trackingParameters
  }
`);

const SEARCH_ARTICLE_FRAGMENT = gql(`
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
    blog {
      handle
    }
  }
`);

const PAGE_INFO_FRAGMENT = gql(`
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`);

// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/search
export const SEARCH_QUERY = gql(
  `
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`,
  [
    SEARCH_PRODUCT_FRAGMENT,
    SEARCH_PAGE_FRAGMENT,
    SEARCH_ARTICLE_FRAGMENT,
    PAGE_INFO_FRAGMENT,
  ],
);

/**
 * Regular search fetcher
 */
async function regularSearch({
  request,
  context,
}: Pick<Route.LoaderArgs, 'request' | 'context'>): Promise<RegularSearchReturn> {
  const storefront = context.get(storefrontClientContext);
  const url = new URL(request.url);
  const variables = getPaginationVariables(request, {pageBy: 8});
  const term = String(url.searchParams.get('q') || '').trim();

  // A blank term renders the empty state without querying the Storefront API
  if (!term) {
    return {type: 'regular', term, result: null};
  }

  // Search articles, pages, and products for the `q` term
  const {data, errors} = await storefront.graphql(SEARCH_QUERY, {
    variables: {...variables, term},
    cache: Cache.short(),
  });

  if (!data) {
    throw new Error(
      errors?.map(({message}) => message).join(', ') ||
        'No search data returned from Shopify API',
    );
  }

  const items = {
    articles: data.articles,
    pages: data.pages,
    products: data.products,
  };

  const total = Object.values(items).reduce(
    (acc, {nodes}) => acc + nodes.length,
    0,
  );

  const error = errors?.length
    ? errors.map(({message}) => message).join(', ')
    : undefined;

  return {type: 'regular', term, error, result: {total, items}};
}
