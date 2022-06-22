import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, Route, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import LoadingFallback from './components/LoadingFallback';
import CartProvider from './components/CartProvider.client';
import {
  PerformanceMetrics,
  PerformanceMetricsDebug,
} from '@shopify/hydrogen/client';
import {NostoProvider} from '@nosto/nosto-react';
import {default as hydrogenConfig} from '../hydrogen.config';
const {merchantId} = hydrogenConfig.nosto;

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
       <NostoProvider accountProp={ merchantId }>
        <ShopifyProvider>
          <CartProvider>
            <DefaultSeo />
            <Router>
              <FileRoutes />
              <Route path="*" page={<NotFound />} />
            </Router>
          </CartProvider>
          <PerformanceMetrics />
          {process.env.LOCAL_DEV && <PerformanceMetricsDebug />}
        </ShopifyProvider>
        </NostoProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
