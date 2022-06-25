import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'FI',
    defaultLanguageCode: 'EN',
    storeDomain: 'nosto-hydrogen.myshopify.com',
    storefrontToken: '3ad9cd17e9b93845eba336765e0f33ac',
    storefrontApiVersion: '2022-07',
  },
  nosto: {
    merchantId: 'shopify-55957520471',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
