import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type Ref,
} from 'react';
import {
  Link,
  redirect,
  useFetcher,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import {
  Cache,
  formatMoney,
  getSortByValue,
  gql,
  isFilterInputActive,
  parseCollectionParams,
  serializeCollectionParams,
  type AvailableFilter,
  type CollectionState,
  type MoneyV2,
  type ProductFilter,
} from '@shopify/hydrogen';
import {
  CollectionProvider,
  useCollection,
  useCollectionForm,
} from '@shopify/hydrogen/react';
import type {ProductFilter as StorefrontApiProductFilter} from '@shopify/hydrogen/storefront-api-types';
import type {Route} from './+types/($locale).collections.$handle';
import {ProductItem} from '~/components/ProductItem';
import {AnalyticsEvent, getAnalytics} from '~/lib/analytics';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {storefrontClientContext} from '~/lib/storefront';

const PAGE_BY = 8;

// The locale for the price filter's currency symbol. Fixed so server and client match.
const LOCALE = 'en-US';

const COLLECTION_SORT_OPTIONS = [
  {label: 'Featured', value: getSortByValue('COLLECTION_DEFAULT', false)},
  {label: 'Best selling', value: getSortByValue('BEST_SELLING', false)},
  {label: 'Alphabetically, A-Z', value: getSortByValue('TITLE', false)},
  {label: 'Alphabetically, Z-A', value: getSortByValue('TITLE', true)},
  {label: 'Price, low to high', value: getSortByValue('PRICE', false)},
  {label: 'Price, high to low', value: getSortByValue('PRICE', true)},
  {label: 'Date, old to new', value: getSortByValue('CREATED', false)},
  {label: 'Date, new to old', value: getSortByValue('CREATED', true)},
];

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
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
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const storefront = context.get(storefrontClientContext);
  const url = new URL(request.url);
  const browse = parseCollectionParams(url.searchParams);

  if (!handle) {
    throw redirect('/collections');
  }

  // `before`/`after` cursors are the params the collection store clears when the
  // browse intent (filters, sort) changes
  const before = url.searchParams.get('before');
  const after = url.searchParams.get('after');
  const paginationVariables = before
    ? {last: PAGE_BY, startCursor: before}
    : {first: PAGE_BY, endCursor: after};

  const [{data, errors}] = await Promise.all([
    storefront.graphql(COLLECTION_QUERY, {
      variables: {
        handle,
        ...paginationVariables,
        filters:
          browse.filters.length > 0
            ? (browse.filters as StorefrontApiProductFilter[])
            : undefined,
        sortKey: browse.sortKey,
        reverse: browse.reverse || undefined,
      },
      cache: Cache.short(),
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (errors) {
    console.error('[hydrogen] Collection query failed', errors);
    throw new Response('Collection query failed', {status: 500});
  }

  const collection = data?.collection;

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
    availableFilters: collection.products.filters as AvailableFilter[],
    currencyCode: data.localization.country.currency.isoCode,
    dataSearch: url.searchParams.toString(),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

type LoaderData = Route.ComponentProps['loaderData'];

export default function Collection({loaderData}: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {collection, dataSearch} = loaderData;

  useEffect(() => {
    getAnalytics()?.publish(AnalyticsEvent.COLLECTION_VIEWED, {
      collection: {
        id: collection.id,
        handle: collection.handle,
      },
    });
  }, [collection.id]);

  return (
    <CollectionProvider
      data={{handle: collection.handle, dataSearch}}
      urlSearch={searchParams.toString()}
      onChange={(search) =>
        void navigate(
          {search},
          {replace: searchParams.size > 0, preventScrollReset: true},
        )}
    >
      <CollectionBrowser {...loaderData} />
    </CollectionProvider>
  );
}

function CollectionBrowser({
  collection,
  availableFilters,
  currencyCode,
}: LoaderData) {
  const state = useCollection();
  const {formProps} = useCollectionForm();
  const {pathname} = useLocation();
  const isLoading = state.status === 'loading';

  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <p className="collection-description">{collection.description}</p>
      <form
        {...formProps()}
        method="get"
        action={pathname}
        className="collection-browse"
      >
        <div className="collection-filters">
          {availableFilters.map((filter) => (
            <fieldset key={filter.id}>
              <legend>{filter.label}</legend>
              <FilterGroup
                filter={filter}
                activeFilters={state.filters}
                currencyCode={currencyCode}
              />
            </fieldset>
          ))}
        </div>
        <label>
          Sort by{' '}
          <select
            name="sort_by"
            value={currentSortValue(state)}
            onChange={requestFormSubmit}
          >
            {COLLECTION_SORT_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <noscript>
          <button type="submit">Apply</button>
        </noscript>
      </form>
      <ProductGrid
        key={collection.handle}
        products={collection.products}
        pending={isLoading}
      />
    </div>
  );
}

type ProductConnection = LoaderData['collection']['products'];

/**
 * Renders the products with GET cursor links for the previous/next page. Once hydrated,
 * "Load more" appends the next page in place instead of replacing the grid.
 */
function ProductGrid({
  products,
  pending,
}: {
  products: ProductConnection;
  pending: boolean;
}) {
  const {pathname, search} = useLocation();
  const fetcher = useFetcher<typeof loader>();
  const [basePage, setBasePage] = useState(products);
  const [appendedPages, setAppendedPages] = useState<ProductConnection[]>([]);
  const [lastFetched, setLastFetched] = useState(fetcher.data);

  // A new server page (filters, sort, navigation) restarts the accumulated list
  if (basePage !== products) {
    setBasePage(products);
    setAppendedPages([]);
  }

  // Append each "Load more" result once
  if (fetcher.data !== lastFetched) {
    setLastFetched(fetcher.data);
    const next = fetcher.data?.collection.products;
    if (
      next &&
      !appendedPages.some(
        (page) => page.pageInfo.endCursor === next.pageInfo.endCursor,
      )
    ) {
      setAppendedPages([...appendedPages, next]);
    }
  }

  const pages = [basePage, ...appendedPages];
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  const nodes = pages.flatMap((page) => page.nodes);

  const pageUrl = (param: 'before' | 'after', cursor?: string | null) => {
    const params = new URLSearchParams(search);
    params.delete('before');
    params.delete('after');
    if (cursor) {
      params.set(param, cursor);
    }
    return `${pathname}?${params}`;
  };

  const nextUrl = pageUrl('after', lastPage.pageInfo.endCursor);

  const onLoadMore = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    void fetcher.load(nextUrl);
  };

  return (
    <div>
      {firstPage.pageInfo.hasPreviousPage && (
        <Link
          to={pageUrl('before', firstPage.pageInfo.startCursor)}
          preventScrollReset
        >
          <span>↑ Load previous</span>
        </Link>
      )}
      <div
        className="products-grid"
        aria-busy={pending}
        style={pending ? {opacity: 0.5} : undefined}
      >
        {nodes.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < PAGE_BY ? 'eager' : undefined}
          />
        ))}
      </div>
      {lastPage.pageInfo.hasNextPage && (
        <Link to={nextUrl} preventScrollReset onClick={onLoadMore}>
          {fetcher.state === 'loading' ? (
            'Loading...'
          ) : (
            <span>Load more ↓</span>
          )}
        </Link>
      )}
    </div>
  );
}

function currentSortValue(state: CollectionState) {
  return state.sortKey
    ? getSortByValue(state.sortKey, state.reverse)
    : getSortByValue('COLLECTION_DEFAULT', false);
}

function requestFormSubmit(
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) {
  event.currentTarget.form?.requestSubmit();
}

function FilterGroup({
  activeFilters,
  currencyCode,
  filter,
}: {
  activeFilters: ProductFilter[];
  currencyCode: MoneyV2['currencyCode'];
  filter: AvailableFilter;
}) {
  if (filter.type === 'PRICE_RANGE') {
    return (
      <PriceRangeInput
        activeFilters={activeFilters}
        currencyCode={currencyCode}
      />
    );
  }

  return filter.values.map((value) => (
    <CheckboxFilterValue
      key={value.id}
      activeFilters={activeFilters}
      filter={filter}
      value={value}
    />
  ));
}

function PriceRangeInput({
  activeFilters,
  currencyCode,
}: {
  activeFilters: ProductFilter[];
  currencyCode: MoneyV2['currencyCode'];
}) {
  // One timer for both inputs, so editing min then max submits once.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minInput = useRef<HTMLInputElement>(null);
  const maxInput = useRef<HTMLInputElement>(null);
  const price = activeFilters.find((filter) => filter.price)?.price;
  const min = price?.min ?? '';
  const max = price?.max ?? '';
  const symbol = formatMoney(
    {amount: '0', currencyCode},
    {locale: LOCALE},
  ).currencyNarrowSymbol;

  useEffect(() => {
    for (const [input, value] of [
      [minInput.current, min],
      [maxInput.current, max],
    ] as const) {
      if (!input) {
        continue;
      }
      const matches =
        value === ''
          ? input.value === ''
          : input.value !== '' && Number(input.value) === value;
      if (!matches) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = null;
        input.value = String(value);
      }
    }
  }, [min, max]);

  useEffect(() => {
    function cancelPendingSubmit() {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = null;
    }

    function restoreHistoryPrice() {
      // Cancel drafts before history data loads, even if the price is unchanged.
      cancelPendingSubmit();
      const {filters} = parseCollectionParams(
        new URLSearchParams(window.location.search),
      );
      const price = filters.find((filter) => filter.price)?.price;
      if (minInput.current) {
        minInput.current.value = String(price?.min ?? '');
      }
      if (maxInput.current) {
        maxInput.current.value = String(price?.max ?? '');
      }
    }

    // Any form submission (native Enter included) already carries the typed price.
    const form = minInput.current?.form;
    form?.addEventListener('submit', cancelPendingSubmit);
    window.addEventListener('popstate', restoreHistoryPrice);
    return () => {
      form?.removeEventListener('submit', cancelPendingSubmit);
      window.removeEventListener('popstate', restoreHistoryPrice);
      cancelPendingSubmit();
    };
  }, []);

  function submitAfterTyping(event: ChangeEvent<HTMLInputElement>) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const form = event.currentTarget.form;
    timer.current = setTimeout(() => {
      timer.current = null;
      form?.requestSubmit();
    }, 350);
  }

  return (
    <>
      <PriceInput
        inputRef={minInput}
        name="filter.v.price.gte"
        defaultValue={min}
        label={`Minimum price in ${currencyCode}`}
        symbol={symbol}
        onChange={submitAfterTyping}
      />
      <PriceInput
        inputRef={maxInput}
        name="filter.v.price.lte"
        defaultValue={max}
        label={`Maximum price in ${currencyCode}`}
        symbol={symbol}
        onChange={submitAfterTyping}
      />
    </>
  );
}

function PriceInput({
  inputRef,
  name,
  defaultValue,
  label,
  symbol,
  onChange,
}: {
  inputRef: Ref<HTMLInputElement>;
  name: string;
  defaultValue: number | '';
  label: string;
  symbol: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <span
      className="price-input"
      style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}
    >
      <span aria-hidden="true">{symbol}</span>
      <input
        ref={inputRef}
        type="number"
        name={name}
        defaultValue={defaultValue}
        aria-label={label}
        min="0"
        step="any"
        style={{minWidth: 0}}
        onChange={onChange}
      />
    </span>
  );
}

function filterValueInputParamEntries(
  input: string,
): Array<{name: string; value: string}> {
  let filter: ProductFilter;
  try {
    filter = JSON.parse(input) as ProductFilter;
  } catch {
    return [];
  }

  return Array.from(
    serializeCollectionParams({
      filters: [filter],
      sortKey: undefined,
      reverse: false,
    }),
    ([name, value]) => ({name, value}),
  );
}

/** Single-choice filters (such as availability) share one param name across values. */
function isMutuallyExclusive(filter: AvailableFilter) {
  return filter.type === 'BOOLEAN';
}

function uncheckSiblings(input: HTMLInputElement) {
  const form = input.form;
  if (!form) {
    return;
  }
  for (const element of Array.from(form.elements)) {
    if (
      element instanceof HTMLInputElement &&
      element !== input &&
      element.type === 'checkbox' &&
      element.name === input.name
    ) {
      element.checked = false;
    }
  }
}

function CheckboxFilterValue({
  activeFilters,
  filter,
  value,
}: {
  activeFilters: ProductFilter[];
  filter: AvailableFilter;
  value: AvailableFilter['values'][number];
}) {
  const entries = filterValueInputParamEntries(value.input);
  if (entries.length !== 1) {
    return null;
  }

  const [{name, value: paramValue}] = entries;

  return (
    <label style={{display: 'block'}}>
      <input
        type="checkbox"
        name={name}
        value={paramValue}
        checked={isFilterInputActive(activeFilters, value.input)}
        onChange={(event) => {
          if (isMutuallyExclusive(filter) && event.currentTarget.checked) {
            uncheckSiblings(event.currentTarget);
          }
          requestFormSubmit(event);
        }}
      />{' '}
      {value.label} ({value.count})
    </label>
  );
}

const PRODUCT_ITEM_FRAGMENT = gql(`#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`);

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/collection
const COLLECTION_QUERY = gql(
  `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          presentation
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    localization {
      country {
        currency {
          isoCode
        }
      }
    }
  }
`,
  [PRODUCT_ITEM_FRAGMENT],
);
