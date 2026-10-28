import {useEffect, useRef} from 'react';
import {CartMain} from '~/components/CartMain';
import {
  AnalyticsEvent,
  getAnalytics,
  hasPendingCartWork,
  toAnalyticsCart,
} from '~/lib/analytics';
import {useCart} from '~/lib/cart';
import type {Route} from './+types/($locale).cart';

// Cart mutations are served by the `/api/cart` handler (createCartServerHandlers),
// and the cart itself is seeded into the client cart store by the root loader.

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Cart`}];
};

export default function Cart() {
  useCartViewedAnalytics();

  return (
    <div className="cart">
      <h1>Cart</h1>
      <CartMain layout="page" />
    </div>
  );
}

/**
 * Publishes `cart_viewed` once per visit to the cart page, as soon as the cart
 * is settled (loaded and with no changes in flight).
 */
function useCartViewedAnalytics() {
  const settled = useCart(
    (state) => !state.loading && !hasPendingCartWork(state),
  );
  const cart = useCart((state) => state.data);
  const published = useRef(false);

  useEffect(() => {
    if (published.current || !settled) {
      return;
    }
    const analytics = getAnalytics();
    if (!analytics) {
      return;
    }
    published.current = true;
    analytics.publish(AnalyticsEvent.CART_VIEWED, {
      cart: toAnalyticsCart(cart),
    });
  }, [settled, cart]);
}
