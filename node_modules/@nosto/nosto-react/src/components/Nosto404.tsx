import { Nosto404Props, useNosto404 } from "../hooks/useNosto404"

/**
 * You can personalise your cart and checkout pages by using the `Nosto404` component.
 * The component does not require any props.
 *
 * By default, your account, when created, has three 404-page placements named `notfound-nosto-1`, `notfound-nosto-2` and `notfound-nosto-3`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="notfound-page">
 *   <NostoPlacement id="notfound-nosto-1" />
 *   <NostoPlacement id="notfound-nosto-2" />
 *   <NostoPlacement id="notfound-nosto-3" />
 *   <Nosto404 />
 * </div>
 * ```
 *
 * @group Components
 */
export function Nosto404(props: Nosto404Props) {
  useNosto404(props)
  return null
}
