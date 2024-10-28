import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy(
    {
      scriptSrc: [
        "'self'",
        "'strict-dynamic'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://connect.nosto.com",
        "https://cdn.shopify.com"
      ],
      connectSrc: [
        "'self'",
        'https://connect.nosto.com'
      ],
      defaultSrc: [
        "'self'",
        'https://connect.nosto.com',
        'https://cdn.shopify.com'
      ],
      styleSrc: [
        "'self'",
        "https://nosto-campaign-assets.s3.amazonaws.com"
      ]
    });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url}/>
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  //responseHeaders.set('Access-Control-Allow-Origin', 'a269b04fb8b8.ngrok.app');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
