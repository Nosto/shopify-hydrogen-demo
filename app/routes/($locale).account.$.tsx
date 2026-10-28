import {
  CUSTOMER_ACCOUNT_AUTHORIZE_PATH,
  CUSTOMER_ACCOUNT_LOGIN_PATH,
  CUSTOMER_ACCOUNT_REFRESH_PATH,
} from '@shopify/hydrogen/customer-account';
import {redirect} from 'react-router';

import {requireCustomerAccount} from '~/lib/customer-account';

import type {Route} from './+types/($locale).account.$';

// The customer-account handlers only own the unprefixed paths, so send locale-prefixed
// ones (e.g. /fr-ca/account/login) there instead of treating them as unknown account pages.
const HANDLER_PATHS = new Set<string>([
  CUSTOMER_ACCOUNT_LOGIN_PATH,
  CUSTOMER_ACCOUNT_AUTHORIZE_PATH,
  CUSTOMER_ACCOUNT_REFRESH_PATH,
]);

// fallback wild card for all unauthenticated routes in account section
export async function loader({request, context, params}: Route.LoaderArgs) {
  const handlerPath = `/account/${params['*'] ?? ''}`;
  if (HANDLER_PATHS.has(handlerPath)) {
    throw redirect(handlerPath + new URL(request.url).search);
  }

  await requireCustomerAccount(context, request);

  return redirect('/account');
}
