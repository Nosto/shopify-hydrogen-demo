import type { PushedProduct } from "@nosto/nosto-js/client"

/**
 * @group Types
 */
export interface Recommendation {
  result_id: string
  products: PushedProduct[]
  result_type: string
  title: string
  div_id: string
  source_product_ids: string[]
  params: unknown
}
