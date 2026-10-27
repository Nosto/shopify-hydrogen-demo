import {useLoaderData, Link} from 'react-router';
import {Cache, gql} from '@shopify/hydrogen';

import {storefrontClientContext} from '~/lib/storefront';

import type {Route} from './+types/($locale).policies._index';

export async function loader({context}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);
  const {data, errors} = await storefront.graphql(POLICIES_QUERY, {
    cache: Cache.long(),
  });

  if (errors?.length) {
    throw new Response(errors.map((error) => error.message).join(', '), {
      status: 500,
    });
  }

  const shopPolicies = data?.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  return (
    <div className="policies">
      <h1>Policies</h1>
      <div>
        {policies.map((policy) => (
          <fieldset key={policy.id}>
            <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
          </fieldset>
        ))}
      </div>
    </div>
  );
}

const POLICY_ITEM_FRAGMENT = gql(`#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
`);

const POLICIES_QUERY = gql(
  `#graphql
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`,
  [POLICY_ITEM_FRAGMENT],
);
