import * as React from 'react';
export type NostoOtherProps = import('@nosto/nosto-react').NostoOtherProps;

export function NostoOther(props: NostoOtherProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoOther(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
