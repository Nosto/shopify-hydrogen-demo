import {
  AnalyticsEvent,
  type AnalyticsCart,
  type CartData,
  type CartState,
  type StorefrontAnalytics,
} from '@shopify/hydrogen';

export {AnalyticsEvent};

let bus: StorefrontAnalytics | null = null;

/** The analytics bus that `<ShopifyScripts>` creates. `null` during SSR. */
export function getAnalytics(): StorefrontAnalytics | null {
  if (typeof window === 'undefined') {
    return null;
  }
  bus ??= window.Shopify?.analytics ?? null;
  return bus;
}

/** Whether the cart store has changes in flight, so its data is not settled yet. */
export function hasPendingCartWork({pending, revalidating}: CartState) {
  return (
    revalidating === true ||
    pending.lines.size > 0 ||
    pending.discountCodes.size > 0 ||
    pending.cost === true ||
    pending.note === true ||
    pending.attributes === true
  );
}

/** Maps the cart store data to the analytics cart shape (mirrors the library's cart tracker). */
export function toAnalyticsCart(cart: CartData | null): AnalyticsCart | null {
  if (!cart?.id || !cart.updatedAt) {
    return null;
  }
  return {
    id: cart.id,
    updatedAt: cart.updatedAt,
    cost: cart.cost,
    lines: {
      nodes: cart.lines.nodes.flatMap((line) => {
        const merchandise = line.merchandise;
        if (!merchandise) {
          return [];
        }
        const product = merchandise.product;
        return [
          {
            id: line.id,
            quantity: line.quantity,
            merchandise: {
              id: merchandise.id,
              title: merchandise.title ?? product.title,
              price: line.cost.amountPerQuantity,
              sku: typeof merchandise.sku === 'string' ? merchandise.sku : null,
              product: {
                id: typeof product.id === 'string' ? product.id : '',
                title: product.title,
                vendor: typeof product.vendor === 'string' ? product.vendor : '',
                productType:
                  typeof product.productType === 'string'
                    ? product.productType
                    : undefined,
                handle: product.handle,
              },
            },
          },
        ];
      }),
    },
  };
}
