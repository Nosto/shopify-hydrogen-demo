import { DependencyList, useEffect } from "react"
import { useNostoContext } from "./useNostoContext"
import { useDeepCompareEffect } from "./useDeepCompareEffect"
import { nostojs } from "@nosto/nosto-js"
import { API } from "@nosto/nosto-js/client"

export function useNostoApi(cb: (api: API) => void, deps?: DependencyList, flags?: { deep?: boolean }): void {
  const { clientScriptLoaded } = useNostoContext()
  const useEffectFn = flags?.deep ? useDeepCompareEffect : useEffect

  useEffectFn(() => {
    if (clientScriptLoaded) {
      nostojs(cb)
    }
  }, [clientScriptLoaded, ...(deps ?? [])])
}
