import {useState, type FormEvent} from 'react';
import {useCart, useCartActions, useCartForm} from '~/lib/cart';
import type {AppCartData} from '~/lib/cart-handlers';
import {GIFT_CARD_API_PATH} from '~/lib/gift-card-handlers';
import {Money} from '~/components/Money';
import type {CartLayout} from './CartMain';

export function CartSummary({
  cart,
  layout,
}: {
  cart: AppCartData;
  layout: CartLayout;
}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
  // Totals keep their last confirmed value while a change is in flight, dimmed until confirmed.
  const totalsPending = useCart(
    (state) => state.pending.cost === true || state.revalidating === true,
  );

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4>Totals</h4>
      <dl className="cart-subtotal">
        <dt>Subtotal</dt>
        <dd style={totalsPending ? {opacity: 0.4} : undefined}>
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      <CartDiscounts discountCodes={cart.discountCodes} />
      <CartGiftCard giftCards={cart.appliedGiftCards} />
      <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string | null}) {
  if (!checkoutUrl) {
    return null;
  }

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes: AppCartData['discountCodes'];
}) {
  const {formProps, register} = useCartForm();
  const pendingCodes = useCart((state) => state.pending.discountCodes);
  const discountErrors = useCart((state) => state.errors.discountCodes);

  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable || pendingCodes.has(discount.code))
      ?.map(({code}) => code) || [];
  // Errors for codes the server rejected (they are no longer on the cart)
  const orphanedErrors = [...discountErrors.entries()]
    .filter(([code]) => !codes.includes(code))
    .flatMap(([, group]) => group.userErrors.map((error) => error.message));

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          {codes.map((code) => (
            <form key={code} {...formProps()}>
              <input type="hidden" {...register('discountCode', {value: code})} />
              <div
                className="cart-discount"
                style={pendingCodes.has(code) ? {opacity: 0.4} : undefined}
              >
                <code>{code}</code>
                &nbsp;
                <button type="submit" {...register('discount-remove')}>
                  Remove
                </button>
              </div>
              {discountErrors.get(code)?.userErrors.length ? (
                <p role="alert">
                  <small>
                    {discountErrors
                      .get(code)
                      ?.userErrors.map((error) => error.message)
                      .join(' ')}
                  </small>
                </p>
              ) : null}
            </form>
          ))}
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <form
        {...formProps({
          beforeSubmit: (event) => {
            // Ignore blank codes and codes that are already on the cart
            const value = new FormData(event.currentTarget)
              .get('discountCode')
              ?.toString()
              .trim();
            if (!value || discountCodes.some(({code}) => code === value)) {
              event.preventDefault();
            }
          },
          afterSubmit: (event) => (event.target as HTMLFormElement).reset(),
        })}
      >
        <div>
          <input
            type="text"
            placeholder="Discount code"
            aria-invalid={orphanedErrors.length ? true : undefined}
            {...register('discountCode', {defaultValue: ''})}
          />
          &nbsp;
          <button type="submit" {...register('discount-apply')}>
            Apply
          </button>
        </div>
        {orphanedErrors.length ? (
          <p role="alert">
            <small>{orphanedErrors.join(' ')}</small>
          </p>
        ) : null}
      </form>
    </div>
  );
}

/**
 * Gift cards go through the app's own `/api/cart/gift-cards` route, since Hydrogen's cart
 * handlers have no gift card actions. The cart store is re-read with `refresh()` afterwards.
 */
function CartGiftCard({
  giftCards,
}: {
  giftCards: AppCartData['appliedGiftCards'] | undefined;
}) {
  const {refresh} = useCartActions();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function submitGiftCard(body: Record<string, string>) {
    setPending(true);
    setErrors([]);
    try {
      const response = await fetch(GIFT_CARD_API_PATH, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      const result = (await response.json().catch(() => null)) as {
        userErrors?: {message: string}[];
        error?: {message: string};
      } | null;
      const messages = result?.error
        ? [result.error.message]
        : (result?.userErrors ?? []).map(({message}) => message);
      if (!response.ok && !messages.length) {
        messages.push('Could not update gift cards.');
      }
      setErrors(messages);
      if (response.ok) {
        refresh();
      }
      return response.ok && !messages.length;
    } catch {
      setErrors(['Could not update gift cards.']);
      return false;
    } finally {
      setPending(false);
    }
  }

  async function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = new FormData(form).get('giftCardCode')?.toString().trim();
    if (!code) {
      return;
    }
    // Clear the gift card code input after the gift card is added
    if (await submitGiftCard({intent: 'add', code})) {
      form.reset();
    }
  }

  return (
    <div>
      {/* Display applied gift cards with individual remove buttons */}
      {giftCards && giftCards.length > 0 && (
        <dl>
          <dt>Applied Gift Card(s)</dt>
          {giftCards.map((giftCard) => (
            <form
              key={giftCard.id}
              onSubmit={(event) => {
                event.preventDefault();
                void submitGiftCard({intent: 'remove', giftCardId: giftCard.id});
              }}
            >
              <div className="cart-discount">
                <code>***{giftCard.lastCharacters}</code>
                &nbsp;
                <Money data={giftCard.amountUsed} />
                &nbsp;
                <button type="submit" disabled={pending}>
                  Remove
                </button>
              </div>
            </form>
          ))}
        </dl>
      )}

      {/* Show an input to apply a gift card */}
      <form onSubmit={handleApply}>
        <div>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            aria-invalid={errors.length ? true : undefined}
          />
          &nbsp;
          <button type="submit" disabled={pending}>
            Apply
          </button>
        </div>
        {errors.length ? (
          <p role="alert">
            <small>{errors.join(' ')}</small>
          </p>
        ) : null}
      </form>
    </div>
  );
}
