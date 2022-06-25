import * as NostoComponents from '@nosto/nosto-react';

//Render Nosto component based on type prop:
export default function NostoComponent({type, ...props}) {
  const Component = NostoComponents[type];
  if (Component) {
    return <Component {...props} />;
  } else {
    console.warn(
      `No NostoComponent found with type: ${type}. Make sure to pass a correct type attribute.`,
    );
    return <>{props.children}</>;
  }
}
