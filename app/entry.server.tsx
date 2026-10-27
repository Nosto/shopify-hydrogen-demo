import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  type EntryContext,
  type RouterContextProvider,
  ServerRouter,
} from 'react-router';

import {
  createContentSecurityPolicy,
  createNonce,
  NonceProvider,
} from '~/lib/csp';
import {envContext} from '~/lib/env';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: RouterContextProvider,
) {
  const env = context.get(envContext);
  const nonce = createNonce();

  // ✅ Render app
  const body = await renderToReadableStream(
    <NonceProvider value={nonce}>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  // ✅ Wait for bots (SEO)
  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  // ✅ Add headers, with Shopify's and Nosto's domains in the CSP
  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set(
    'Content-Security-Policy',
    createContentSecurityPolicy({
      nonce,
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
    }),
  );

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
