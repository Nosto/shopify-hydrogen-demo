import { NostoOtherProps, useNostoOther } from "../hooks/useNostoOther"

/**
 * You can personalise your miscellaneous pages by using the NostoOther component.
 * The component does not require any props.
 *
 * By default, your account, when created, has two other-page placements named `other-nosto-1` and `other-nosto-2`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="other-page">
 *     <NostoPlacement id="other-nosto-1" />
 *     <NostoPlacement id="other-nosto-2" />
 *     <NostoOther />
 * </div>;
 * ```
 *
 * @group Components
 */
export function NostoOther(props: NostoOtherProps) {
  useNostoOther(props)
  return null
}
