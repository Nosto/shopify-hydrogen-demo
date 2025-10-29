import { useContext } from "react"
import { NostoContext, NostoContextType } from "../context"

/**
 * A hook that allows you to access the NostoContext and retrieve Nosto-related data from it in React components.
 *
 * @group Essential Functions
 */
export function useNostoContext(): NostoContextType {
  return useContext(NostoContext)
}
