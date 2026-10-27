import {cartQueries, createCartCookie, getCartId} from '@shopify/hydrogen';
import {redirect} from 'react-router';
import {storefrontClientContext} from '~/lib/storefront';
import type {Route} from './+types/($locale).discount.$code';

/**
 * Automatically applies a discount found on the url
 * If a cart exists it's updated with the discount, otherwise a cart is created with the discount already applied
 *
 * @example
 * Example path applying a discount and optional redirecting (defaults to the home page)
 * ```js
 * /discount/FREESHIPPING?redirect=/products
 *
 * ```
 */
export async function loader({request, context, params}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);
  const {code} = params;

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  let redirectParam =
    searchParams.get('redirect') || searchParams.get('return_to') || '/';

  if (redirectParam.includes('//')) {
    // Avoid redirecting to external URLs to prevent phishing attacks
    redirectParam = '/';
  }

  searchParams.delete('redirect');
  searchParams.delete('return_to');

  const redirectUrl = `${redirectParam}?${searchParams}`;

  if (!code) {
    return redirect(redirectUrl);
  }

  const cartId = getCartId(request);
  let resultCartId: string | null | undefined;

  if (cartId) {
    const {data, errors} = await storefront.graphql(
      cartQueries.cartDiscountCodesUpdate,
      {variables: {cartId, discountCodes: [code]}},
    );
    if (errors?.length) {
      throw new Response(errors[0].message, {status: 500});
    }
    resultCartId = data?.cartDiscountCodesUpdate?.cart?.id;
  } else {
    const {data, errors} = await storefront.graphql(cartQueries.cartCreate, {
      variables: {input: {discountCodes: [code]}},
    });
    if (errors?.length) {
      throw new Response(errors[0].message, {status: 500});
    }
    resultCartId = data?.cartCreate?.cart?.id;
  }

  const headers = new Headers();
  if (resultCartId && resultCartId !== cartId) {
    headers.append('Set-Cookie', createCartCookie(resultCartId));
  }

  // Using set-cookie on a 303 redirect will not work if the domain origin have port number (:3000)
  // If there is no cart id and a new cart id is created in the progress, it will not be set in the cookie
  // on localhost:3000
  return redirect(redirectUrl, {
    status: 303,
    headers,
  });
}
