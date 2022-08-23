import * as NostoComponents from '@nosto/nosto-react';
import {useLocalization, fetchSync, useCart} from '@shopify/hydrogen';
import React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function NostoComponent({type, ...props}) {
  const {country} = useLocalization();
  const typeSpecificProps = {};
  const shopifyCart = useCart();
  const [nostoCart, setNostoCart] = React.useState([]);

  //Sync Shopify cart with Nosto:
  useDeepCompareEffect(() => {
    if (type == 'NostoSession') {
      const nostoCartCopy = [];
      shopifyCart.lines.forEach((item) => {
        let product_id =
          item?.merchandise?.product.id.split('/').at(-1) || undefined;
        let sku_id = item?.merchandise?.id.split('/').at(-1) || undefined;
        let quantity = item?.quantity;
        let unit_price = +item?.merchandise?.priceV2?.amount;
        let price_currency_code = item?.merchandise?.priceV2?.currencyCode;

        nostoCartCopy.push({
          product_id,
          sku_id,
          quantity,
          unit_price,
          price_currency_code,
        });
      });
      setNostoCart(nostoCartCopy);
    }
  }, [shopifyCart.lines]);

  if (type == 'NostoSession') {
    typeSpecificProps.cart = {items: nostoCart};
  }

  //Get currentVariation based on country:
  if (type == 'NostoProvider' && props.multiCurrency) {
    const countries = fetchSync('/api/countries').json() || [];
    const currentVariation =
      countries.find((item) => item.isoCode == country.isoCode)?.currency
        ?.isoCode || '';
    typeSpecificProps.currentVariation = currentVariation;
  }

  //Render NostoComponent based on type prop:
  const Component = NostoComponents[type];
  if (Component) {
    return <Component {...typeSpecificProps} {...props} />;
  } else {
    console.error(
      `No NostoComponent found with type: ${type} \n Make sure to pass a correct type attribute.`,
    );
    return <>{props.children}</>;
  }
}
