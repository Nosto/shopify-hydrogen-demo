import {
  Cache,
  handleShopifyRedirects,
  handleShopifyRoutes,
  type ShopifyScriptsI18n,
  type ShopifyScriptsShop,
} from '@shopify/hydrogen';
import {ShopifyScripts} from '@shopify/hydrogen/react';
import {getNostoData, NostoProvider} from '@nosto/shopify-hydrogen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError,
  useRouteLoaderData,
  type ShouldRevalidateFunction,
} from 'react-router';

import type {Route} from './+types/root';
import favicon from '~/assets/favicon.svg';
import {
  CartAnalyticsTracker,
  PageViewTracker,
} from '~/components/AnalyticsTrackers';
import {PageLayout} from '~/components/PageLayout';
import nostoStyles from '~/components/nosto/nostoSlot.css?url';
import {CartProvider} from '~/lib/cart';
import {cartHandlers} from '~/lib/cart-handlers';
import {useNonce} from '~/lib/csp';
import {
  createCustomerAccount,
  customerAccountContext,
  getCustomerAccountSetup,
  isCustomerLoggedIn,
} from '~/lib/customer-account';
import {envContext} from '~/lib/env';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import {giftCardHandlers} from '~/lib/gift-card-handlers';
import {predictiveSearchHandlers} from '~/lib/predictive-search-handlers';
import {routeTemplates} from '~/lib/route-templates';
import {
  createEphemeralSessionManager,
  createRequestSessionManager,
} from '~/lib/session';
import {
  createRequestStorefrontClient,
  storefrontClientContext,
  storefrontRequestContext,
} from '~/lib/storefront';
import appStyles from '~/styles/app.css?url';
import resetStyles from '~/styles/reset.css?url';
import tailwindCss from '~/styles/tailwind.css?url';

export const middleware: Route.MiddlewareFunction[] = [
  async ({context, request}, next) => {
    const env = context.get(envContext);
    const storefrontClient = createRequestStorefrontClient(
      request,
      env,
      context.cache,
      context.waitUntil,
    );
    // Reuse the client's request context: a fresh one throws in handleShopifyRoutes.
    const requestContext = storefrontClient.requestContext;
    const sessionManager = env.SESSION_SECRET
      ? await createRequestSessionManager(request, env.SESSION_SECRET)
      : createEphemeralSessionManager(request);

    const customerAccountSetup = getCustomerAccountSetup(env);

    const shopifyRoute = handleShopifyRoutes({
      request,
      requestContext,
      sessionManager,
      storefrontClient,
      routeTemplates,
      handlers: customerAccountSetup
        ? [
            cartHandlers,
            giftCardHandlers,
            predictiveSearchHandlers,
            customerAccountSetup.handlers,
          ]
        : [cartHandlers, giftCardHandlers, predictiveSearchHandlers],
    });
    // Decided synchronously: a Promise<Response> for handler-owned paths, else null.
    if (shopifyRoute) {
      return shopifyRoute;
    }

    context.set(storefrontClientContext, storefrontClient);
    context.set(storefrontRequestContext, requestContext);
    context.set(
      customerAccountContext,
      customerAccountSetup
        ? createCustomerAccount(
            env,
            customerAccountSetup.customerSession,
            sessionManager,
            requestContext,
          )
        : null,
    );

    const response = await next();

    const sessionHeaders = new Headers(
      (await sessionManager.commit?.()) ?? undefined,
    );
    for (const [name, value] of sessionHeaders) {
      response.headers.append(name, value);
    }

    if (response.status === 404) {
      const redirect = await handleShopifyRedirects({
        request,
        storefrontClient,
        routeTemplates,
      });
      if (redirect) {
        return redirect;
      }
    }

    requestContext.applyResponseHeaders(response.headers);
    return response;
  },
];

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: nostoStyles,
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const env = context.get(envContext);
  const storefrontClient = context.get(storefrontClientContext);
  const account = context.get(customerAccountContext);

  const accessToken = account
    ? await account.customerSession.getAccessToken(
        account.sessionManager,
        account.requestContext,
      )
    : undefined;

  const [header, cart, nostoData] = await Promise.all([
    storefrontClient.graphql(HEADER_QUERY, {
      cache: Cache.long(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Seed the cart store on the server so the cart doesn't flicker empty on first paint.
    cartHandlers.get({storefrontClient, request}),
    getNostoData({
      storefrontClient,
      customerAccount:
        account && accessToken
          ? {client: account.client, accessToken}
          : undefined,
    }),
  ]);

  if (header.errors?.length || !header.data) {
    throw new Response(header.errors?.[0]?.message ?? 'Header query failed', {
      status: 500,
    });
  }

  const {i18n} = storefrontClient;
  const shop: ShopifyScriptsShop = {
    shopId: env.SHOP_ID ?? header.data.shop.id,
    storefrontId: env.PUBLIC_STOREFRONT_ID ?? '',
    myshopifyDomain: env.PUBLIC_STORE_DOMAIN ?? 'mock.shop',
  };
  const shopifyI18n: ShopifyScriptsI18n = {
    country: i18n.country,
    language: i18n.language,
    pathPrefix: i18n.pathPrefix,
    currency: header.data.localization.country.currency.isoCode,
  };

  return {
    ...nostoData,
    header: header.data,
    cart: cart.data,
    shop,
    i18n: shopifyI18n,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const storefrontClient = context.get(storefrontClientContext);

  // defer the footer query (below the fold)
  const footer = storefrontClient
    .graphql(FOOTER_QUERY, {
      cache: Cache.long(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .then(({data, errors}) => {
      if (errors?.length) {
        console.error(errors);
      }
      return data ?? null;
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    isLoggedIn: isCustomerLoggedIn(context),
    footer,
  };
}

export type RootLoader = typeof loader;

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const navigate = useNavigate();
  const data = useRouteLoaderData<RootLoader>('root');
  const storefrontId = data?.shop.storefrontId ?? '';

  return (
    <html lang={data?.i18n.language.toLowerCase() ?? 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
        {data && (
          <ShopifyScripts
            shop={data.shop}
            i18n={data.i18n}
            analytics={{channel: storefrontId ? 'hydrogen' : 'headless'}}
            shopifyAnalytics={storefrontId !== ''}
            consent={{mode: 'default-banner'}}
            navigate={(url) => navigate(url)}
            routes={routeTemplates}
            nonce={nonce}
          />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App({loaderData}: Route.ComponentProps) {
  const nonce = useNonce();

  return (
    <CartProvider initialData={loaderData.cart}>
      <PageViewTracker />
      <CartAnalyticsTracker />
      <NostoProvider
        account="shopify-11368366139"
        nonce={nonce ?? ''}
        renderMode="JSON_ORIGINAL"
      >
        <PageLayout {...loaderData}>
          <Outlet />
        </PageLayout>
      </NostoProvider>
    </CartProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
