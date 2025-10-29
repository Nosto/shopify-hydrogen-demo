import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Components
 */
export type NostoSearchProps = {
  query: string
  placements?: string[]
}

/**
 * You can personalise your search pages by using the useNostoSearch hook.
 *
 * @group Hooks
 */
export function useNostoSearch({ query, placements }: NostoSearchProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewSearch(query)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [query]
  )
}
