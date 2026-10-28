import {
  createShopifyRouteHandler,
  getCartId,
  gql,
  type ShopifyRouteHandlerContext,
} from '@shopify/hydrogen';

export const GIFT_CARD_API_PATH = '/api/cart/gift-cards';

const GIFT_CARD_CODES_ADD_MUTATION = gql(`
  mutation CartGiftCardCodesAdd($cartId: ID!, $giftCardCodes: [String!]!) {
    cartGiftCardCodesAdd(cartId: $cartId, giftCardCodes: $giftCardCodes) {
      userErrors {
        field
        message
      }
    }
  }
`);

const GIFT_CARD_CODES_REMOVE_MUTATION = gql(`
  mutation CartGiftCardCodesRemove($cartId: ID!, $appliedGiftCardIds: [ID!]!) {
    cartGiftCardCodesRemove(
      cartId: $cartId
      appliedGiftCardIds: $appliedGiftCardIds
    ) {
      userErrors {
        field
        message
      }
    }
  }
`);

type GiftCardRequest =
  | {intent: 'add'; code: string}
  | {intent: 'remove'; giftCardId: string};

function parseGiftCardRequest(body: unknown): GiftCardRequest | null {
  if (!body || typeof body !== 'object') {
    return null;
  }
  const {intent, code, giftCardId} = body as Record<string, unknown>;
  if (intent === 'add' && typeof code === 'string') {
    // Gift card codes are entered with spaces for readability
    const formattedCode = code.replace(/\s/g, '');
    return formattedCode ? {intent, code: formattedCode} : null;
  }
  if (intent === 'remove' && typeof giftCardId === 'string' && giftCardId) {
    return {intent, giftCardId};
  }
  return null;
}

/**
 * Applies and removes cart gift cards, which Hydrogen's `/api/cart` handlers don't cover.
 * Returns only `userErrors`; the client re-reads the cart with `refresh()` afterwards.
 */
export const giftCardHandlers = {
  post: createShopifyRouteHandler(
    GIFT_CARD_API_PATH,
    'POST',
    async ({
      request,
      storefrontClient,
    }: Pick<ShopifyRouteHandlerContext, 'request' | 'storefrontClient'>) => {
      const giftCardRequest = parseGiftCardRequest(
        await request.json().catch(() => null),
      );
      if (!giftCardRequest) {
        return {
          type: 'error',
          error: {code: 'invalid_request', message: 'Invalid gift card request.'},
        };
      }

      // Read the cart from the cookie, never from the request body. Don't create a cart here:
      // gift cards only apply to a cart that already has lines.
      const cartId = getCartId(request);
      if (!cartId) {
        return {
          type: 'error',
          error: {code: 'missing_cart', message: 'No cart exists.'},
        };
      }

      if (giftCardRequest.intent === 'add') {
        const {data, errors} = await storefrontClient.graphql(
          GIFT_CARD_CODES_ADD_MUTATION,
          {variables: {cartId, giftCardCodes: [giftCardRequest.code]}},
        );
        return {
          type: 'json',
          data: {
            userErrors: errors?.length
              ? errors.map(({message}) => ({message}))
              : (data?.cartGiftCardCodesAdd?.userErrors ?? []),
          },
        };
      }

      const {data, errors} = await storefrontClient.graphql(
        GIFT_CARD_CODES_REMOVE_MUTATION,
        {variables: {cartId, appliedGiftCardIds: [giftCardRequest.giftCardId]}},
      );
      return {
        type: 'json',
        data: {
          userErrors: errors?.length
            ? errors.map(({message}) => ({message}))
            : (data?.cartGiftCardCodesRemove?.userErrors ?? []),
        },
      };
    },
  ),
};
