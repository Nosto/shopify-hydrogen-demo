import { isValidElement } from "react"
import { NostoContext, RecommendationComponent } from "../context"
import type { ReactNode } from "react"
import { ScriptLoadOptions } from "../hooks/scriptLoader"
import { useLoadClientScript } from "../hooks/useLoadClientScript"
import { nostojs } from "@nosto/nosto-js"
import { RenderMode } from "@nosto/nosto-js/client"

/**
 * @group Components
 */
export interface NostoProviderProps {
  /**
   * Indicates merchant id
   */
  account: string
  /**
   * Indicates currency
   */
  currentVariation?: string
  /**
   * Indicates an url of a server
   */
  host?: string
  /**
   * children
   */
  children: ReactNode | ReactNode[]
  /**
   * Indicates if merchant uses multiple currencies
   */
  multiCurrency?: boolean
  /**
   * Recommendation component which holds nostoRecommendation object
   */
  recommendationComponent?: RecommendationComponent
  /**
   * Recommendation render mode. See {@link https://nosto.github.io/nosto-js/types/client.RenderMode.html}
   */
  renderMode?: RenderMode
  /**
   * Enables Shopify markets with language and market id
   */
  shopifyMarkets?: {
    language: string
    marketId: string | number
  }
  /**
   * Load nosto script (should be false if loading the script outside of nosto-react)
   */
  loadScript?: boolean
  /**
   * Custom script loader
   */
  scriptLoader?: (scriptSrc: string, options?: ScriptLoadOptions) => Promise<void>
}

/**
 * This widget is what we call the Nosto root widget, which is responsible for adding the actual Nosto script and the JS API stub.
 * This widget wraps all other React Nosto widgets.
 *
 * ```
 * <NostoProvider account="your-nosto-account-id" recommendationComponent={<NostoSlot />}>
 *   <App />
 * </NostoProvider>
 * ```
 *
 * **Note:** the component also accepts a prop to configure the host `host="connect.nosto.com"`.
 * In advanced use-cases, the need to configure the host may surface.
 *
 * In order to implement client-side rendering, the requires a designated component to render the recommendations provided by Nosto.
 * This component should be capable of processing the JSON response received from our backend.
 * Notice the `recommendationComponent` prop passed to `<NostoProvider>` above.
 *
 * Learn more [here](https://github.com/Nosto/shopify-hydrogen/blob/main/README.md#client-side-rendering-for-recommendations) and see a [live example](https://github.com/Nosto/shopify-hydrogen-demo) on our demo store.
 *
 * @group Components
 */
export function NostoProvider(props: NostoProviderProps) {
  const { account, multiCurrency = false, children, recommendationComponent, renderMode } = props

  // Pass currentVariation as empty string if multiCurrency is disabled
  const currentVariation = multiCurrency ? props.currentVariation : ""

  if (recommendationComponent && !isValidElement(recommendationComponent)) {
    throw new Error(
      "The recommendationComponent prop must be a valid React element. Please provide a valid React element."
    )
  }

  // Set responseMode for loading campaigns:
  const responseMode = renderMode || (recommendationComponent ? "JSON_ORIGINAL" : "HTML")

  const { clientScriptLoaded } = useLoadClientScript(props)

  if (clientScriptLoaded) {
    nostojs(api => {
      api.defaultSession().setVariation(currentVariation!).setResponseMode(responseMode)
    })
  }

  return (
    <NostoContext.Provider
      value={{
        account,
        clientScriptLoaded,
        currentVariation,
        responseMode,
        recommendationComponent
      }}
    >
      {children}
    </NostoContext.Provider>
  )
}
