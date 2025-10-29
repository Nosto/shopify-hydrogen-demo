import * as React from 'react';
export type NostoSearchProps = import('@nosto/nosto-react').NostoSearchProps;

export function NostoSearch(props: NostoSearchProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoSearch(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
