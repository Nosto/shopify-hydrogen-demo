import * as React from 'react';
import { parseGid } from '@shopify/hydrogen';
import createScriptLoader from '../createScriptLoader';
import { useHydrogenRootFallback } from '../lib/useHydrogenRootFallback';
import { ClientOnly } from '../internal/clientOnly';
import { NostoSession } from './NostoSession';

type Upstream = typeof import('@nosto/nosto-react');
type BaseNostoProviderProps = React.ComponentProps<Upstream['NostoProvider']>;

const NostoProviderInner = React.lazy(async () => {
  const mod = await import('@nosto/nosto-react');
  return { default: mod.NostoProvider };
});

interface NostoProviderProps extends BaseNostoProviderProps {
  nonce: string;
  currency?: string;
}

export function NostoProvider({
  children,
  currency: currencyProp,
  nonce,
  ...props
}: NostoProviderProps) {
  const root = useHydrogenRootFallback();

  const language = props.shopifyMarkets?.language ?? root.language;

  const currentVariation = props.currentVariation ?? currencyProp;

  const rootMarketGid = root.nostoProviderData?.localization?.country?.market?.id;

  const propMarketId = props.shopifyMarkets?.marketId;

  const marketId: string | number | undefined =
    propMarketId != null
      ? typeof propMarketId === 'number'
        ? propMarketId
        : propMarketId.startsWith('gid://')
          ? (parseGid(propMarketId).id ?? propMarketId)
          : propMarketId
      : rootMarketGid
        ? (parseGid(rootMarketGid).id ?? rootMarketGid)
        : undefined;

  const shopifyMarkets = language && marketId ? { language, marketId } : undefined;

  const scriptLoader = React.useMemo(() => createScriptLoader(nonce), [nonce]);

  return (
    <ClientOnly>
      <React.Suspense fallback={null}>
        <NostoProviderInner
          {...props}
          {...(shopifyMarkets ? { shopifyMarkets } : {})}
          currentVariation={currentVariation}
          scriptLoader={scriptLoader}
        >
          <NostoSession />
          {children}
        </NostoProviderInner>
      </React.Suspense>
    </ClientOnly>
  );
}
