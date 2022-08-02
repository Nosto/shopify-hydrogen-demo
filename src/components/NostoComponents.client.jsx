import * as NostoComponents from '@nosto/nosto-react';
import {useLocalization, fetchSync, useCart, useShop} from '@shopify/hydrogen';

export default function NostoComponent({type, ...props}) {
  const {storeDomain} = useShop();
  const {country} = useLocalization();
  const typeSpecificProps = {};

  if (type == 'NostoSession') {
    const shopifyCart = useCart();

    const nostoCart = [];
    shopifyCart.lines.forEach((item) => {
      let handle = item?.merchandise?.product?.handle;
      let product_id =
        fetchSync(`https://${storeDomain}/products/${handle}.js`).json()?.id ||
        undefined;
      let sku_id = item?.merchandise?.id.split('/').at(-1) || undefined;
      let quantity = item?.quantity;
      let unit_price = item?.merchandise?.priceV2?.amount;
      let price_currency_code = item?.merchandise?.priceV2?.currencyCode;

      nostoCart.push({
        product_id,
        sku_id,
        quantity,
        unit_price,
        price_currency_code,
      });

      typeSpecificProps.cart = {items: nostoCart};
    });
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
