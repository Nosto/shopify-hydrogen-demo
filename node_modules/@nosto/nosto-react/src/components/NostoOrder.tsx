import { NostoOrderProps, useNostoOrder } from "../hooks/useNostoOrder"

/**
 * You can personalise your order-confirmation/thank-you page by using the `NostoOrder` component.
 * The component requires that you provide it with the details of the order.
 *
 * By default, your account, when created, has one other-page placement named `thankyou-nosto-1`.
 * You may omit this and use any identifier you need. The identifier used here is simply provided to illustrate the example.
 *
 * The order prop requires a value that adheres to the type `Purchase`.
 *
 * @example
 * ```
 * <div className="thankyou-page">
 *     <NostoPlacement id="thankyou-nosto-1" />
 *     <NostoOrder order={{ purchase: toOrder(order) }} />
 * </div>
 * ```
 *
 * @group Components
 */
export function NostoOrder(props: NostoOrderProps) {
  useNostoOrder(props)
  return null
}
