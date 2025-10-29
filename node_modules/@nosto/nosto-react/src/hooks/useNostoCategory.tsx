import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCategoryProps = {
  category: string
  placements?: string[]
}

/**
 * You can personalise your category and collection pages by using the useNostoCategory hook.
 *
 * @group Hooks
 */
export function useNostoCategory({ category, placements }: NostoCategoryProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewCategory(category)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [category]
  )
}
