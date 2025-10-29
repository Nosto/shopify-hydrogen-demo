import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { Product } from "@nosto/nosto-js/client"

/**
 * @group Hooks
 */
export type NostoProductProps = {
  product: string
  reference?: string
  tagging?: Product
  placements?: string[]
}

/**
 * You can personalise your product pages by using the useNostoProduct hook.
 *
 * @group Hooks
 */
export function useNostoProduct({ product, tagging, placements, reference }: NostoProductProps) {
  const { renderCampaigns } = useRenderCampaigns()

  if (tagging && !tagging.product_id) {
    throw new Error("The product object must contain a product_id property")
  }

  const productId = tagging?.product_id ?? product

  useNostoApi(
    async api => {
      const action = api
        .defaultSession()
        .viewProduct(tagging ?? product)
        .setPlacements(placements || api.placements.getPlacements())
      if (reference) {
        action.setRef(productId, reference)
      }
      const data = await action.load()
      renderCampaigns(data)
    },
    [productId, tagging?.selected_sku_id]
  )
}
