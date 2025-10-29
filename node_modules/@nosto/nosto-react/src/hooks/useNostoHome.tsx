import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoHomeProps = { placements?: string[] }

/**
 * You can personalise your home page by using the useNostoHome hook.
 *
 * @group Hooks
 */
export function useNostoHome(props?: NostoHomeProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewFrontPage()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}