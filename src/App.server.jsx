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
} from '@shopify/hydrogen';

import {HeaderFallback} from '~/components';
import {DefaultSeo, NotFound} from '~/components/index.server';

import NostoComponent from '~/components/NostoComponents.client';
import NostoSession from '~/components/NostoSessionServer.server';
import {default as hydrogenConfig} from '../hydrogen.config';
const {merchantId} = hydrogenConfig.nosto;

function App({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <ShopifyProvider countryCode={countryCode}>
        <CartProvider countryCode={countryCode}>
          <Suspense>
            <DefaultSeo />
          </Suspense>
          <Router>
            <NostoComponent
              type="NostoProvider"
              multiCurrency={false}
              account={merchantId}
            >
              <NostoSession />
              <FileRoutes
                basePath={countryCode ? `/${countryCode}/` : undefined}
              />
              <Route path="*" page={<NotFound />} />
            </NostoComponent>
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
