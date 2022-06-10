import { NostoProvider } from '@nosto/nosto-react';
import { fetchSync, useUrl } from '@shopify/hydrogen/client';

export default function WrapperClient({children}) {
    const uri = useUrl();
    const account = fetchSync(`${uri.protocol}//${uri.host}/account`).json().merchantId;
    return (
        <NostoProvider accountProp={account}>
            {children}
        </NostoProvider>
    );

}