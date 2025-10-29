import { NostoCheckoutProps, useNostoCheckout } from "../hooks/useNostoCheckout"

/**
 * You can personalise your cart and checkout pages by using the NostoCheckout component.
 * The component does not require any props.
 *
 * By default, your account, when created, has two cart-page placements named `categorypage-nosto-1` and `categorypage-nosto-2`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="checkout-page">
 *   <NostoPlacement id="checkout-nosto-1" />
 *   <NostoPlacement id="checkout-nosto-2" />
 *   <NostoCheckout />
 * </div>
 * ```
 *
 * @group Components
 */
export function NostoCheckout(props: NostoCheckoutProps) {
  useNostoCheckout(props)
  return null
}
