import {redirect} from 'react-router';
import type {Route} from './+types/($locale).cart.$lines';

// Matches the cart permalinks that handleShopifyRoutes serves: `/cart/<variant_id>:<quantity>[,...]`
const CART_PERMALINK_LINES_RE = /^\d+:\d+(?:,\d+:\d+)*$/;

/**
 * Cart permalinks (`/cart/<variant_id>:<quantity>`) are served by handleShopifyRoutes,
 * which hands them off to the Online Store to build the cart and redirect to checkout.
 * It only matches the unprefixed path, so this route forwards locale-prefixed
 * permalinks (`/fr-ca/cart/...`) to it, keeping the querystring (e.g. `?discount=`).
 *
 * @example
 * ```js
 * /fr-ca/cart/41007289663544:1,41007289696312:2?discount=HYDROBOARD
 * ```
 */
export async function loader({request, params}: Route.LoaderArgs) {
  const {lines, locale} = params;

  // Without a locale prefix a valid permalink never reaches this route, so redirecting
  // to the unprefixed path would loop.
  if (!locale || !lines || !CART_PERMALINK_LINES_RE.test(lines)) {
    throw new Response('Link may be expired. Try checking the URL.', {
      status: 410,
    });
  }

  const {search} = new URL(request.url);
  return redirect(`/cart/${lines}${search}`, 303);
}

export default function Component() {
  return null;
}
