import * as React from 'react';
export type NostoProductProps = import('@nosto/nosto-react').NostoProductProps;

export function NostoProduct(props: NostoProductProps) {
  const selectedSku = props.tagging?.selectedVariant?.sku;

  React.useEffect(() => {
    let cancelled = false;
    import('@nosto/nosto-react').then((m) => {
      if (cancelled) return;
      m.useNostoProduct({
        product: props.product,
        tagging: {
          product_id: props.product,
          selected_sku_id: selectedSku,
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [props.product, selectedSku]);

  return null;
}
