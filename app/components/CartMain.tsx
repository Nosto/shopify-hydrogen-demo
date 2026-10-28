import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {useCart} from '~/lib/cart';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * The cart is read from the client cart store, which applies pending
 * changes optimistically so the user immediately sees feedback.
 */
export function CartMain({layout}: {layout: CartLayout}) {
  const cart = useCart((state) => state.data);
  const loading = useCart((state) => state.loading);

  const linesCount = Boolean(cart.lines.nodes.length || 0);
  const withDiscount = Boolean(
    cart.discountCodes.filter((code) => code.applicable).length,
  );
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart.totalQuantity > 0;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount || loading} layout={layout} />
      <div className="cart-details">
        <div aria-labelledby="cart-lines">
          <ul>
            {cart.lines.nodes.map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartLayout;
}) {
  const {close} = useAside();
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link to="/collections" onClick={close} prefetch="viewport">
        Continue shopping →
      </Link>
    </div>
  );
}
