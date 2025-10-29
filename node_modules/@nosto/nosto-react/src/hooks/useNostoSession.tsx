import { snakeize } from "../utils/snakeize"
import { PushedCustomer as CustomerSnakeCase, Cart as CartSnakeCase } from "@nosto/nosto-js/client"
import { ToCamelCase } from "../utils/types"
import { useNostoContext } from "./useNostoContext"
import { useDeepCompareEffect } from "./useDeepCompareEffect"
import { nostojs } from "@nosto/nosto-js"

/**
 * @group Hooks
 */
export type NostoSessionProps = {
  cart?: CartSnakeCase | ToCamelCase<CartSnakeCase>
  customer?: CustomerSnakeCase | ToCamelCase<CustomerSnakeCase>
}

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 *
 * @group Hooks
 */
export function useNostoSession({ cart, customer }: NostoSessionProps = {}) {
  const { clientScriptLoaded } = useNostoContext()

  useDeepCompareEffect(() => {
    const currentCart = cart ? snakeize(cart) : undefined
    const currentCustomer = customer ? snakeize(customer) : undefined

    if (clientScriptLoaded) {
      nostojs(api => {
        api.defaultSession().setCart(currentCart).setCustomer(currentCustomer).viewOther().load({ skipPageViews: true })
      })
    }
  }, [clientScriptLoaded, cart, customer])
}
