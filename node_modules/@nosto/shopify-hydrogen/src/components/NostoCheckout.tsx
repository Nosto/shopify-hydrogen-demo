import * as React from 'react';
export type NostoCheckoutProps = import('@nosto/nosto-react').NostoCheckoutProps;

export function NostoCheckout(props: NostoCheckoutProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoCheckout(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
