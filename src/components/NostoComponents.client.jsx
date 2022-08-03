import * as NostoComponents from '@nosto/nosto-react';
import {useLocalization, fetchSync, useCart, useShop} from '@shopify/hydrogen';
import React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function NostoComponent({type, ...props}) {
  const {storeDomain} = useShop();
  const {country} = useLocalization();
  const typeSpecificProps = {};
  const shopifyCart = useCart();

  const [nostoCart, setNostoCart] = React.useState([]);
  useDeepCompareEffect(() => {
    if (type == 'NostoSession') {
      const nostoCartCopy = [];
      let promises = [];
      shopifyCart.lines.forEach((item) => {
        let promise = new Promise((resolve) => {
          let handle = item?.merchandise?.product?.handle;
          let sku_id = item?.merchandise?.id.split('/').at(-1) || undefined;
          let quantity = item?.quantity;
          let unit_price = item?.merchandise?.priceV2?.amount;
          let price_currency_code = item?.merchandise?.priceV2?.currencyCode;

          fetch(`https://${storeDomain}/products/${handle}.js`)
            .catch(resolve)
            .then((resp) => resp.json())
            .then((resp) => {
              let product_id = resp.id || undefined;
              nostoCartCopy.push({
                product_id,
                sku_id,
                quantity,
                unit_price,
                price_currency_code,
              });
              resolve();
            });
        });
        promises.push(promise);
      });
      Promise.allSettled(promises).then(() => {
        setNostoCart(nostoCartCopy);
      });
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
