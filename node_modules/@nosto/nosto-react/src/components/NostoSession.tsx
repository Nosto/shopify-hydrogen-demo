import { NostoSessionProps, useNostoSession } from "../hooks/useNostoSession"

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 * This makes it easier to add attribution.
 *
 * The `NostoSession` component makes it very easy to keep the session up to date so long as the cart and the customer are provided.
 *
 * The cart prop requires a value that adheres to the type `Cart`, while the customer prop requires a value that adheres to the type `Customer`.
 *
 * @group Components
 */
export function NostoSession(props?: NostoSessionProps) {
  useNostoSession(props)
  return null
}
