import * as NostoComponents from '@nosto/nosto-react';

//Render Nosto comonent based on type prop:
export default function NostoComponent({type, ...props}) {
  const Component = NostoComponents[type];
  return <Component {...props} />;
}
