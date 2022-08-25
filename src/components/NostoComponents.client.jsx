import * as NostoComponents from '@nosto/nosto-react';
import {useLocalization, fetchSync, useCart} from '@shopify/hydrogen';

export default function NostoComponent({type, ...props}) {
  const {country} = useLocalization();
  const typeSpecificProps = {};
  const shopifyCart = useCart();

  if (type == 'NostoSession') {
    //Sync cart with Nosto:
    const nostoCart = [];
    shopifyCart.lines.forEach((item) => {
      let product_id =
        item?.merchandise?.product.id.split('/').at(-1) || undefined;
      let sku_id = item?.merchandise?.id.split('/').at(-1) || undefined;
      let quantity = item?.quantity;
      let unit_price = +item?.merchandise?.priceV2?.amount;
      let price_currency_code = item?.merchandise?.priceV2?.currencyCode;

      nostoCart.push({
        product_id,
        sku_id,
        quantity,
        unit_price,
        price_currency_code,
      });
    });
    typeSpecificProps.cart = {items: nostoCart};

    //Sync customer with Nosto:
    let first_name = props?.customerData?.firstName || undefined;
    let last_name = props?.customerData?.lastName || undefined;
    let email = props?.customerData?.email || undefined;
    let newsletter = props?.customerData?.acceptsMarketing ?? undefined;
    let customer_reference =
      props?.customerData?.customerReference || undefined;
    typeSpecificProps.customer = {
      first_name,
      last_name,
      email,
      newsletter,
      customer_reference,
    };
    console.log(typeSpecificProps.customer);
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
