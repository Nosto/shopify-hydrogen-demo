import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCheckoutProps = { placements?: string[] }

/**
 * You can personalise your cart and checkout pages by using the useNostoCheckout hook.
 *
 * @group Hooks
 */
export function useNostoCheckout(props?: NostoCheckoutProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewCart()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
