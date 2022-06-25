import * as NostoComponents from '@nosto/nosto-react';
import {useLocalization} from '@shopify/hydrogen';

//Render NostoComponent based on type prop:
export default function NostoComponent({type, ...props}) {
  const {country} = useLocalization();

  const Component = NostoComponents[type];
  if (Component) {
    return <Component currentVariation={country.isoCode} {...props} />;
  } else {
    console.error(
      `No NostoComponent found with type: ${type} \n Make sure to pass a correct type attribute.`,
    );
    return <>{props.children}</>;
  }
}
