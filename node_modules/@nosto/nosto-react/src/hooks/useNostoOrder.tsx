import { snakeize } from "../utils/snakeize"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { useNostoApi } from "./useNostoApi"
import { ToCamelCase } from "../utils/types"
import { WebsiteOrder as Order } from "@nosto/nosto-js/client"

/**
 * @group Hooks
 */
export type NostoOrderProps = {
  order: Order | ToCamelCase<Order>
  placements?: string[]
}

/**
 * You can personalise your order-confirmation/thank-you page by using the `useNostoOrder` hook.
 *
 * @group Hooks
 */
export function useNostoOrder({ order, placements }: NostoOrderProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .addOrder(snakeize(order))
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [order],
    { deep: true }
  )
}
