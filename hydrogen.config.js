import {defineConfig} from '@shopify/hydrogen/config';
import {
  CookieSessionStorage,
  PerformanceMetricsServerAnalyticsConnector,
} from '@shopify/hydrogen';

export default defineConfig({
  routes: import.meta.globEager('./src/routes/**/*.server.[jt](s|sx)'),
  shopify: {
    storeDomain: 'maninostolocal.myshopify.com',
    storefrontToken: '4d26d6886f78c9b22d532c0578497ed1',
    storefrontApiVersion: '2022-07',
  },
  nosto: {
    merchantId: 'shopify-61881221345',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
});
