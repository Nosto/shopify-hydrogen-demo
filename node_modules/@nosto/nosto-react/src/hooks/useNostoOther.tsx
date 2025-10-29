import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoOtherProps = { placements?: string[] }

/**
 * You can personalise your miscellaneous pages by using the useNostoOther hook.
 *
 * @group Hooks
 */
export function useNostoOther(props?: NostoOtherProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewOther()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
