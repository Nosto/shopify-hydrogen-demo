import {Link, useLoaderData} from 'react-router';
import {Cache, gql} from '@shopify/hydrogen';

import {storefrontClientContext} from '~/lib/storefront';

import type {Route} from './+types/($locale).policies.$handle';

const SELECTED_POLICIES = [
  'privacyPolicy',
  'shippingPolicy',
  'termsOfService',
  'refundPolicy',
] as const;

type SelectedPolicies = (typeof SELECTED_POLICIES)[number];

function isSelectedPolicy(name: string): name is SelectedPolicies {
  return (SELECTED_POLICIES as readonly string[]).includes(name);
}

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.policy.title ?? ''}`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1: string) =>
    m1.toUpperCase(),
  );

  if (!isSelectedPolicy(policyName)) {
    throw new Response('Could not find the policy', {status: 404});
  }

  const storefront = context.get(storefrontClientContext);
  const {data, errors} = await storefront.graphql(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: policyName === 'privacyPolicy',
      shippingPolicy: policyName === 'shippingPolicy',
      termsOfService: policyName === 'termsOfService',
      refundPolicy: policyName === 'refundPolicy',
    },
    cache: Cache.long(),
  });

  if (errors?.length) {
    throw new Response(errors.map((error) => error.message).join(', '), {
      status: 500,
    });
  }

  const policy = data?.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <div className="policy">
      <br />
      <br />
      <div>
        <Link to="/policies">← Back to Policies</Link>
      </div>
      <br />
      <h1>{policy.title}</h1>
      <div dangerouslySetInnerHTML={{__html: policy.body}} />
    </div>
  );
}

const POLICY_FRAGMENT = gql(`#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
`);

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = gql(
  `#graphql
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`,
  [POLICY_FRAGMENT],
);
