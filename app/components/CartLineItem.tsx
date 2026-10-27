import type {CartLine} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useVariantUrl} from '~/lib/variants';
import {useCart, useCartForm} from '~/lib/cart';
import {Image} from '~/components/Image';
import {Money} from '~/components/Money';
import {useAside} from './Aside';
import type {CartLayout} from './CartMain';

// Lines the cart store has added optimistically, before Shopify has assigned a real line id.
const OPTIMISTIC_LINE_ID_PREFIX = 'optimistic:';

const EMPTY_OPTIONS: Array<{name: string; value: string}> = [];

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise} = line;
  const product = merchandise?.product;
  const title = merchandise?.title;
  const image = merchandise?.image;
  const selectedOptions = merchandise?.selectedOptions ?? EMPTY_OPTIONS;

  const lineItemUrl = useVariantUrl(product?.handle ?? '', selectedOptions);
  const {close} = useAside();
  const isPending = useCart((state) => state.pending.lines.has(id));

  // An optimistic line added without a product preview has nothing to show yet.
  if (id.startsWith(OPTIMISTIC_LINE_ID_PREFIX) && !product?.title) {
    return (
      <li key={id} className="cart-line animate-pulse flex items-center gap-4 p-2">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-md" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="w-2/3 h-4 bg-gray-200 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-1/2 h-3 bg-gray-200 rounded" />
          <div className="w-24 h-8 bg-gray-200 rounded mt-2" />
        </div>
      </li>
    );
  }

  return (
    <li key={id} className="cart-line">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          loading="lazy"
          sizes="100px"
          width={100}
        />
      )}

      <div>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
        >
          <p>
            <strong>{product?.title}</strong>
          </p>
        </Link>
        {/* Unconfirmed totals keep their last value, dimmed until the server responds */}
        <div
          className="product-price"
          style={isPending ? {opacity: 0.4} : undefined}
        >
          <Money data={line.cost?.totalAmount} />
        </div>
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} isPending={isPending} />
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 * Edits to existing lines stay enabled; the cart store supersedes in-flight updates.
 */
function CartLineQuantity({
  line,
  isPending,
}: {
  line: CartLine;
  isPending: boolean;
}) {
  const {formProps, register} = useCartForm();
  const lineErrors = useCart((state) => state.errors.lines.get(line.id));

  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const isOptimistic = lineId.startsWith(OPTIMISTIC_LINE_ID_PREFIX);
  const errorId = `cart-line-error-${lineId}`;
  const errorMessages = lineErrors?.userErrors.map((error) => error.message);

  return (
    <form {...formProps()} className="cart-line-quantity">
      {/* Default submit control: pressing Enter in the quantity input sets that quantity */}
      <button {...register('set')} />
      <input type="hidden" {...register('lineId', {value: lineId})} />
      <small>
        Quantity:{' '}
        <input
          {...register('quantity', {value: quantity, interactive: true})}
          aria-label="Quantity"
          aria-invalid={errorMessages?.length ? true : undefined}
          aria-describedby={errorMessages?.length ? errorId : undefined}
          disabled={isOptimistic}
          size={2}
          style={isPending ? {opacity: 0.4} : undefined}
        />{' '}
        &nbsp;&nbsp;
      </small>
      <button
        {...register('decrease')}
        aria-label="Decrease quantity"
        disabled={quantity <= 1 || isOptimistic}
        type="submit"
      >
        <span>&#8722; </span>
      </button>
      &nbsp;
      <button
        {...register('increase')}
        aria-label="Increase quantity"
        disabled={isOptimistic}
        type="submit"
      >
        <span>&#43;</span>
      </button>
      &nbsp;
      <button {...register('remove')} disabled={isOptimistic} type="submit">
        Remove
      </button>
      {errorMessages?.length ? (
        <p id={errorId} role="alert">
          <small>{errorMessages.join(' ')}</small>
        </p>
      ) : null}
    </form>
  );
}
