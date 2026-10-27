import type {WritableCustomerSessionManager} from '@shopify/hydrogen/customer-account';
import {createCookieSessionStorage} from 'react-router';

/**
 * A signed, cookie-backed session for the customer-account OAuth flow and the cart.
 * The OAuth state is written on `/account/login` and read back on `/account/authorize`,
 * so it has to survive across requests.
 */
export async function createRequestSessionManager(
  request: Request,
  secret: string,
): Promise<WritableCustomerSessionManager> {
  const storage = createCookieSessionStorage({
    cookie: {
      name: 'session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: new URL(request.url).protocol === 'https:',
      secrets: [secret],
    },
  });

  const session = await storage
    .getSession(request.headers.get('Cookie'))
    .catch(() => storage.getSession());
  const origin = new URL(request.url).origin;
  let isPending = false;

  return {
    getSessionOrigin: () => origin,
    getSessionItem: (key) => session.get(key),
    setSessionItem: (key, value) => {
      isPending = true;
      session.set(key, value);
    },
    removeSessionItem: (key) => {
      isPending = true;
      session.unset(key);
    },
    async commit() {
      if (!isPending) return;
      isPending = false;
      return {'Set-Cookie': await storage.commitSession(session)};
    },
  };
}

/**
 * An in-memory session for stores without customer accounts configured. It satisfies the
 * cart handlers but can't complete a customer-account login.
 */
export function createEphemeralSessionManager(
  request: Request,
): WritableCustomerSessionManager {
  const data = new Map<string, unknown>();
  const origin = new URL(request.url).origin;
  return {
    getSessionOrigin: () => origin,
    getSessionItem: (key) => data.get(key),
    setSessionItem: (key, value) => {
      data.set(key, value);
    },
    removeSessionItem: (key) => {
      data.delete(key);
    },
  };
}
