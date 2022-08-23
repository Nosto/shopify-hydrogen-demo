import NostoComponent from './NostoComponents.client';
import {useShopQuery, gql, useSession} from '@shopify/hydrogen';

export default function NostoSession(props) {
  const {customerAccessToken} = useSession();
  const QUERY = gql`
          query {
          customer(customerAccessToken: "${customerAccessToken}") {
            firstName
            lastName
            email
          }
        }
        `;
  const {data: customerData} = useShopQuery({
    query: QUERY,
  });

  return <NostoComponent {...props} {...customerData} type="NostoSession" />;
}
