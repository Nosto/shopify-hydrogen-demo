import NostoComponent from './NostoComponents.client';
import {useShopQuery, gql, useSession, useShop} from '@shopify/hydrogen';
import Crypto from 'crypto';

export default function NostoSession(props) {
  const {storeDomain} = useShop();
  const {customerAccessToken} = useSession();
  const QUERY = gql`
          query {
          customer(customerAccessToken: "${customerAccessToken}") {
            firstName
            lastName
            email
            acceptsMarketing
            id
          }
        }
        `;
  const {
    data: {customer: customerData},
  } = useShopQuery({
    query: QUERY,
  });

  if (customerData?.id && storeDomain) {
    customerData.customerReference = Crypto.createHash('sha256')
      .update(customerData.id + storeDomain)
      .digest('hex');
  }

  return <NostoComponent customerData={customerData} type="NostoSession" />;
}
