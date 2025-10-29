import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type Nosto404Props = { placements?: string[] }

/**
 * You can personalise your cart and checkout pages by using the `useNosto404` hook.
 *
 * @group Hooks
 */
export function useNosto404(props?: Nosto404Props) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewNotFound()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
