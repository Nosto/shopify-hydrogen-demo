import {
  createCartServerHandlers,
  gql,
  type CartDataFromHandlers,
} from '@shopify/hydrogen';

// Extra cart fields on top of the library's default cart query.
const CART_FRAGMENT = gql(`
  fragment CartFragment on Cart {
    appliedGiftCards {
      id
      lastCharacters
      amountUsed {
        amount
        currencyCode
      }
    }
  }
`);

export const cartHandlers = createCartServerHandlers({fragment: CART_FRAGMENT});

export type AppCartData = CartDataFromHandlers<typeof cartHandlers>;
