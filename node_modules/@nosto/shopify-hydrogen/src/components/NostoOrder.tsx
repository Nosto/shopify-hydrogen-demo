import * as React from 'react';
export type NostoOrderProps = import('@nosto/nosto-react').NostoOrderProps;

export function NostoOrder(props: NostoOrderProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoOrder(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
