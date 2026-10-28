import {
  type CacheInstance,
  type CachingStrategy,
  createShopifyRequestContext,
  createStorefrontClient,
  type PublicStorefrontClient,
  type RequestScopedPrivateStorefrontClient,
  type ShopifyRequestContext,
} from '@shopify/hydrogen';
import {createContext} from 'react-router';

import type {Env} from '~/lib/env';
import {getLocaleFromRequest} from '~/lib/i18n';

// The bare client types default `Extra` to `{}`, which drops the per-call `cache` option
// from `graphql()`. Carry it through the alias instead.
type CacheOptions = {cache?: CachingStrategy};

export type RequestStorefrontClient =
  | RequestScopedPrivateStorefrontClient<CacheOptions>
  | PublicStorefrontClient<CacheOptions>;

export const storefrontClientContext = createContext<RequestStorefrontClient>();
export const storefrontRequestContext = createContext<ShopifyRequestContext>();

export function createRequestStorefrontClient(
  request: Request,
  env: Env,
  cache: CacheInstance,
  waitUntil: ExecutionContext['waitUntil'],
): RequestStorefrontClient {
  const i18n = getLocaleFromRequest(request);

  // mock.shop is auth-free and rejects any token header, so it always gets the tokenless public client.
  if (env.MOCK_SHOP === '1' || !env.PUBLIC_STORE_DOMAIN) {
    return createStorefrontClient({
      type: 'public',
      requestContext: createShopifyRequestContext({request, i18n}),
      config: {storeDomain: 'mock.shop', cache, waitUntil},
    });
  }

  if (env.PRIVATE_STOREFRONT_API_TOKEN) {
    return createStorefrontClient({
      type: 'private',
      requestContext: createShopifyRequestContext({
        request,
        i18n,
        buyerIp: getBuyerIp(request.headers),
      }),
      config: {
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        cache,
        waitUntil,
      },
    });
  }

  return createStorefrontClient({
    type: 'public',
    requestContext: createShopifyRequestContext({request, i18n}),
    config: {
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      storefrontId: env.PUBLIC_STOREFRONT_ID,
      cache,
      waitUntil,
    },
  });
}

function getBuyerIp(headers: Headers) {
  for (const header of [
    'oxygen-buyer-ip',
    'cf-connecting-ip',
    'x-forwarded-for',
  ]) {
    const ip = headers.get(header)?.split(',')[0]?.trim();
    if (ip) {
      return ip;
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    return '127.0.0.1';
  }
  throw new Error('No buyer IP header on the request');
}
