import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
  useSession,
  useServerAnalytics,
  Seo,
} from '@shopify/hydrogen';
import {HeaderFallback, EventsListener} from '~/components';
import {NotFound} from '~/components/index.server';
// import {Nosto404, NostoSession} from '@nosto/nosto-react/shopify-hydrogen';

import {
  NostoProvider,
  NostoPlacement,
  NostoHome,
  NostoSession,
} from '@nosto/shopify-hydrogen';

// import {NostoHome as NostoHomeBuild} from '@nosto/shopify-hydrogen/build';

// import {ClientTest} from '@nosto/nosto-react/shopify-hydrogen';

function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {customerAccessToken} = useSession();

  useServerAnalytics({
    shopify: {
      isLoggedIn: !!customerAccessToken,
    },
  });

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <EventsListener />
      <ShopifyProvider countryCode={countryCode}>
        <Seo
          type="defaultSeo"
          data={{
            title: 'Hydrogen',
            description:
              "A custom storefront powered by Hydrogen, Shopify's React-based framework for building headless.",
            titleTemplate: `%s · Hydrogen`,
          }}
        />
        <NostoProvider account="test-account">
          <NostoPlacement id="palcement-test"></NostoPlacement>
          <NostoHome></NostoHome>
          <NostoSession />
          TEST
        </NostoProvider>
        <CartProvider
          countryCode={countryCode}
          customerAccessToken={customerAccessToken}
        >
          <Router>
            <FileRoutes
              basePath={countryCode ? `/${countryCode}/` : undefined}
            />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics cookieDomain="hydrogen.shop" />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
