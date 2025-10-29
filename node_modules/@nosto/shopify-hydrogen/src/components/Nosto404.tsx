import * as React from 'react';
export type Nosto404Props = import('@nosto/nosto-react').Nosto404Props;

export function Nosto404(props: Nosto404Props) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNosto404(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
