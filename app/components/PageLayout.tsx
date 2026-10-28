import {useEffect, useId, useRef, type ReactNode} from 'react';
import {Link, useRouteLoaderData} from 'react-router';
import {getSearchResultUrl} from '@shopify/hydrogen';
import {PredictiveSearchProvider} from '@shopify/hydrogen/react';

import {Aside, useAside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {
  AnalyticsEvent,
  getAnalytics,
  hasPendingCartWork,
  toAnalyticsCart,
} from '~/lib/analytics';
import {useCart} from '~/lib/cart';
import type {RootLoader} from '~/root';
import {checkTokenToCustomer} from '~/utils/checkTokenToNostoCustomer';

/** The root loader data, as rendered by `<PageLayout {...loaderData}>` in root. */
type RootLoaderData = NonNullable<
  ReturnType<typeof useRouteLoaderData<RootLoader>>
>;

type PageLayoutProps = Pick<
  RootLoaderData,
  'footer' | 'header' | 'isLoggedIn' | 'publicStoreDomain'
> & {
  children?: ReactNode;
};

const PREDICTIVE_SEARCH_LIMIT = 5;

export function PageLayout({
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain = '',
}: PageLayoutProps) {
  const cartId = useCart((state) => state.data.id);

  useEffect(() => {
    void checkTokenToCustomer(cartId, header?.shop?.id);
  }, [cartId]);

  return (
    <Aside.Provider>
      <CartAside />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main>{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
  );
}

function CartAside() {
  useCartViewedAnalytics();
  return (
    <Aside type="cart" heading="CART">
      <CartMain layout="aside" />
    </Aside>
  );
}

/**
 * Publishes `cart_viewed` each time the cart aside opens, once the cart has
 * no changes in flight (an add-to-cart opens the aside while still pending).
 */
function useCartViewedAnalytics() {
  const {type} = useAside();
  const expanded = type === 'cart';
  const cartState = useCart((state) => state);
  const settled = !hasPendingCartWork(cartState);
  // Read the latest cart at publish time without re-running the effect on every change
  const cartStateRef = useRef(cartState);
  useEffect(() => {
    cartStateRef.current = cartState;
  });
  const published = useRef(false);

  useEffect(() => {
    if (!expanded) {
      published.current = false;
      return;
    }
    if (!settled || published.current) {
      return;
    }
    published.current = true;
    getAnalytics()?.publish(AnalyticsEvent.CART_VIEWED, {
      cart: toAnalyticsCart(cartStateRef.current.data),
    });
  }, [expanded, settled]);
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <PredictiveSearchProvider
        limit={PREDICTIVE_SEARCH_LIMIT}
        searchAction={SEARCH_ENDPOINT}
      >
        <div className="predictive-search">
          <br />
          <SearchFormPredictive>
            {({register, fetchResults}) => (
              <>
                <input
                  {...register({
                    onFocus: fetchResults,
                    placeholder: 'Search',
                    list: queriesDatalistId,
                  })}
                />
                &nbsp;
                <button type="submit">Search</button>
              </>
            )}
          </SearchFormPredictive>

          <SearchResultsPredictive>
            {({items, total, term, state, error, closeSearch}) => {
              const {articles, collections, pages, products, queries} = items;

              if (state === 'loading' && term) {
                return <div>Loading...</div>;
              }

              if (state === 'error' && error) {
                return <p role="alert">{error}</p>;
              }

              if (!total) {
                return <SearchResultsPredictive.Empty term={term} />;
              }

              return (
                <>
                  <SearchResultsPredictive.Queries
                    queries={queries}
                    queriesDatalistId={queriesDatalistId}
                  />
                  <SearchResultsPredictive.Products
                    products={products}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Collections
                    collections={collections}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Pages
                    pages={pages}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Articles
                    articles={articles}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  {term && total ? (
                    <Link
                      onClick={closeSearch}
                      to={getSearchResultUrl({baseUrl: SEARCH_ENDPOINT, term})}
                    >
                      <p>
                        View all results for <q>{term}</q>
                        &nbsp; →
                      </p>
                    </Link>
                  ) : null}
                </>
              );
            }}
          </SearchResultsPredictive>
        </div>
      </PredictiveSearchProvider>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: Pick<PageLayoutProps, 'header' | 'publicStoreDomain'> & {
  publicStoreDomain: string;
}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
