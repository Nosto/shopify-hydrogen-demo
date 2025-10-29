import * as React from 'react';
import { ClientOnly } from '../internal/clientOnly';
export type NostoPlacementProps = import('@nosto/nosto-react').NostoPlacementProps;

const LazyPlacement = React.lazy(() =>
  import('@nosto/nosto-react').then((m) => ({ default: m.NostoPlacement })),
);

export function NostoPlacement(props: NostoPlacementProps) {
  return (
    <ClientOnly>
      <React.Suspense fallback={null}>
        <LazyPlacement {...props} />
      </React.Suspense>
    </ClientOnly>
  );
}
