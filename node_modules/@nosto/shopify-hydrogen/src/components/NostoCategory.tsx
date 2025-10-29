import * as React from 'react';
export type NostoCategoryProps = import('@nosto/nosto-react').NostoCategoryProps;

export function NostoCategory(props: NostoCategoryProps) {
  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (!cancelled) m.useNostoCategory(props);
    });
    return () => {
      cancelled = true;
    };
  }, [props]);
  return null;
}
