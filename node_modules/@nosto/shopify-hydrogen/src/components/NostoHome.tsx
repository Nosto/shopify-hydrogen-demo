import * as React from 'react';
export type NostoHomeProps = import('@nosto/nosto-react').NostoHomeProps;

export function NostoHome(props: NostoHomeProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoHome(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
