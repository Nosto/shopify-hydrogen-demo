import { useNonce } from '@shopify/hydrogen';
import { defer } from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import favicon from './assets/favicon.svg';
import resetStyles from './styles/reset.css?url';
import appStyles from './styles/app.css?url';
import { Layout } from '~/components/Layout';

import { getNostoData, NostoProvider } from "@nosto/shopify-hydrogen";
import nostoStyles from '~/components/nosto/nostoSlot.css?url';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: nostoStyles
    },
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: appStyles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ context }) {
  const { storefront, customerAccount, cart } = context;
  const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN;

  const isLoggedInPromise = customerAccount.isLoggedIn();

  // defer the footer query (below the fold)
  const footerPromise = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer', // Adjust to your footer menu handle
    },
  });

  // await the header query (above the fold)
  const headerPromise = storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: 'main-menu', // Adjust to your header menu handle
    },
  });
  const cartData = await cart.get();
  return defer(
    {
      ...(await getNostoData({ context, cartId: cartData?.id })),
      cart: cart.get(),
      footer: footerPromise,
      header: await headerPromise,
      isLoggedIn: isLoggedInPromise,
      publicStoreDomain,
    },
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function App() {
  const nonce = useNonce();
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout {...data}>
          <NostoProvider
            shopifyMarkets={true}
            account="shopify-11368366139"
            nonce={nonce}
            renderMode="JSON_ORIGINAL"
          >
            <Outlet />
          </NostoProvider>
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  /** @type {LoaderReturnData} */
  const rootData = useLoaderData();
  const nonce = useNonce();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout {...rootData}>
          <NostoProvider
            shopifyMarkets={false}
            account="shopify-11368366139"
            nonce={nonce}
            renderMode="JSON_ORIGINAL"
          >
            <div className="route-error">
              <h1>Oops</h1>
              <h2>{errorStatus}</h2>
              {errorMessage && (
                <fieldset>
                  <pre>{errorMessage}</pre>
                </fieldset>
              )}
            </div>
          </NostoProvider>
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

const MENU_FRAGMENT = `#graphql
fragment MenuItem on MenuItem {
  id
  resourceId
  tags
  title
  type
  url
}
fragment ChildMenuItem on MenuItem {
  ...MenuItem
}
fragment ParentMenuItem on MenuItem {
  ...MenuItem
  items {
    ...ChildMenuItem
  }
}
fragment Menu on Menu {
  id
  items {
    ...ParentMenuItem
  }
}
`;

const HEADER_QUERY = `#graphql
fragment Shop on Shop {
  id
  name
  description
  primaryDomain {
    url
  }
  brand {
    logo {
      image {
        url
      }
    }
  }
}
query Header(
  $country: CountryCode
  $headerMenuHandle: String!
  $language: LanguageCode
) @inContext(language: $language, country: $country) {
  shop {
    ...Shop
  }
  menu(handle: $headerMenuHandle) {
    ...Menu
  }
}
${MENU_FRAGMENT}
`;

const FOOTER_QUERY = `#graphql
query Footer(
  $country: CountryCode
  $footerMenuHandle: String!
  $language: LanguageCode
) @inContext(language: $language, country: $country) {
  menu(handle: $footerMenuHandle) {
    ...Menu
  }
}
${MENU_FRAGMENT}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@remix-run/react').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
