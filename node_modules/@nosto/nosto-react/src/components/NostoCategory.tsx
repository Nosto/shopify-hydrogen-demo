import { NostoCategoryProps, useNostoCategory } from "../hooks/useNostoCategory"

/**
 * You can personalise your category and collection pages by using the NostoCategory component.
 * The component requires that you provide it the the slash-delimited slug representation of the current category.
 *
 * By default, your account, when created, has two category placements named `categorypage-nosto-1` and `categorypage-nosto-2`.
 * You may omit these and use any identifier you need. The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="category-page">
 *   <NostoPlacement id="categorypage-nosto-1" />
 *   <NostoPlacement id="categorypage-nosto-2" />
 *   <NostoCategory category={category.name} />
 * </div>
 * ```
 *
 * **Note:** Be sure to pass in the correct category representation.
 * If the category being viewed is `Mens >> Jackets`, you must provide the name as `/Mens/Jackets`.
 * You must ensure that the category path provided here matches that of the categories tagged in your products.
 *
 * @group Components
 */
export function NostoCategory(props: NostoCategoryProps) {
  useNostoCategory(props)
  return null
}
