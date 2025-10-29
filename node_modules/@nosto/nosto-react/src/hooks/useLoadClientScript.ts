import { useState, useEffect } from "react"
import type { NostoProviderProps } from "../components/NostoProvider"
import scriptLoaderFn from "./scriptLoader"
import { init, initNostoStub, isNostoLoaded, nostojs } from "@nosto/nosto-js"

type NostoScriptProps = Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets" | "loadScript" | "scriptLoader">

const defaultAttributes = { "nosto-client-script": "" }

export function useLoadClientScript(props: NostoScriptProps) {
  const {
    scriptLoader = scriptLoaderFn,
    account,
    shopifyMarkets,
    loadScript = true
  } = props
  const [clientScriptLoaded, setClientScriptLoaded] = useState(false)

  useEffect(() => {
    function scriptOnload() {
      setClientScriptLoaded(true)
    }

    initNostoStub()
    nostojs(api => api.setAutoLoad(false))

    if (!loadScript) {
      nostojs(scriptOnload)
      return
    }

    async function initClientScript() {
      await init({
        merchantId: account,
        shopifyInternational: shopifyMarkets,
        options: {
          attributes: defaultAttributes
        },
        scriptLoader
      })
      scriptOnload()
    }

    // Load Nosto client script if not already loaded externally
    if (!isNostoLoaded() || shopifyMarkets) {
      initClientScript()
    }
  }, [shopifyMarkets?.marketId, shopifyMarkets?.language])

  return { clientScriptLoaded }
}
