import {createContext, useContext} from 'react';

const NonceContext = createContext<string | undefined>(undefined);

export const NonceProvider = NonceContext.Provider;

/** The CSP nonce for this document. Hydrogen 2026-10 no longer ships `useNonce`. */
export function useNonce() {
  return useContext(NonceContext);
}

export function createNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

type ContentSecurityPolicyOptions = {
  nonce: string;
  storeDomain?: string;
  checkoutDomain?: string;
};

/**
 * Builds the storefront's Content-Security-Policy header, with Shopify's and Nosto's domains
 * on top of the defaults that classic Hydrogen's `createContentSecurityPolicy` used to add.
 */
export function createContentSecurityPolicy({
  nonce,
  storeDomain,
  checkoutDomain,
}: ContentSecurityPolicyOptions) {
  const isDev = process.env.NODE_ENV === 'development';
  const shopDomains = [checkoutDomain, storeDomain]
    .filter(Boolean)
    .map((domain) => `https://${domain}`);
  const devSources = isDev
    ? [
        'http://localhost:*',
        'ws://localhost:*',
        'ws://127.0.0.1:*',
        'ws://*.tryhydrogen.dev:*',
        'wss://*.tryhydrogen.dev:*',
      ]
    : [];

  const directives: Record<string, string[]> = {
    'base-uri': ["'self'"],
    'default-src': [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://connect.nosto.com',
      ...shopDomains,
      ...devSources,
    ],
    'script-src': [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://cdn.shopify.com',
      'https://connect.nosto.com',
      ...devSources,
    ],
    'connect-src': [
      "'self'",
      'https://monorail-edge.shopifysvc.com',
      'https://connect.nosto.com',
      ...shopDomains,
      ...devSources,
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://nosto-campaign-assets.s3.amazonaws.com',
      ...devSources,
    ],
    'frame-ancestors': ["'none'"],
  };
  if (!isDev) {
    directives['upgrade-insecure-requests'] = [];
  }

  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(' '))
    .join('; ');
}
