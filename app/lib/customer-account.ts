import type {ShopifyRequestContext} from '@shopify/hydrogen';
import {
  createCustomerAccountClient,
  createCustomerAccountServerHandlers,
  createCustomerSession,
  CUSTOMER_ACCOUNT_LOGIN_PATH,
  CUSTOMER_ACCOUNT_REFRESH_PATH,
  type CustomerAccountClient,
  type CustomerSession,
  type WritableCustomerSessionManager,
} from '@shopify/hydrogen/customer-account';
import {createContext, redirect, type RouterContextProvider} from 'react-router';

import type {Env} from '~/lib/env';

export type CustomerAccount = {
  customerSession: CustomerSession;
  sessionManager: WritableCustomerSessionManager;
  requestContext: ShopifyRequestContext;
  client: CustomerAccountClient;
};

/** `null` when the store has no customer-account env configured. */
export const customerAccountContext = createContext<CustomerAccount | null>(
  null,
);

let cached:
  | {
      key: string;
      customerSession: ReturnType<typeof createCustomerSession>;
      handlers: ReturnType<typeof createCustomerAccountServerHandlers>;
    }
  | undefined;

/**
 * The customer session and its route handlers depend on env, which Oxygen only exposes per
 * request, so create them on first use and reuse them for the life of the worker.
 */
export function getCustomerAccountSetup(env: Env) {
  if (!env.SHOP_ID || !env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID) {
    return null;
  }

  const key = `${env.SHOP_ID}:${env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID}`;
  if (cached?.key !== key) {
    const customerSession = createCustomerSession({
      shopId: env.SHOP_ID,
      customerAccountApiClientId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
    });
    cached = {
      key,
      customerSession,
      handlers: createCustomerAccountServerHandlers({customerSession}),
    };
  }
  return cached;
}

export function createCustomerAccount(
  env: Env,
  customerSession: CustomerSession,
  sessionManager: WritableCustomerSessionManager,
  requestContext: ShopifyRequestContext,
): CustomerAccount {
  return {
    customerSession,
    sessionManager,
    requestContext,
    client: createCustomerAccountClient({
      shopId: env.SHOP_ID!,
      requestContext,
    }),
  };
}

export async function isCustomerLoggedIn(context: Readonly<RouterContextProvider>) {
  const account = context.get(customerAccountContext);
  if (!account) {
    return false;
  }
  return account.customerSession.isLoggedIn(
    account.sessionManager,
    account.requestContext,
  );
}

/**
 * Returns the customer-account client and a usable access token, or throws a redirect:
 * to `/account/refresh` once when the session is refreshable, otherwise to `/account/login`.
 */
export async function requireCustomerAccount(
  context: Readonly<RouterContextProvider>,
  request: Request,
) {
  const account = context.get(customerAccountContext);
  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;

  if (!account) {
    throw new Response('Customer accounts are not configured', {status: 404});
  }

  const {customerSession, sessionManager, requestContext} = account;
  const accessToken = await customerSession.getAccessToken(
    sessionManager,
    requestContext,
  );
  if (accessToken) {
    return {client: account.client, accessToken};
  }

  const refreshed = url.searchParams.has('refreshed');
  if (
    !refreshed &&
    (await customerSession.isLoggedIn(sessionManager, requestContext))
  ) {
    url.searchParams.set('refreshed', '1');
    throw redirect(
      `${CUSTOMER_ACCOUNT_REFRESH_PATH}?return_to=${encodeURIComponent(
        url.pathname + url.search,
      )}`,
    );
  }

  throw redirect(
    `${CUSTOMER_ACCOUNT_LOGIN_PATH}?return_to=${encodeURIComponent(returnTo)}`,
  );
}
