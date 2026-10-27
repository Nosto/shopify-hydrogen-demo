import {gql} from '@shopify/hydrogen/customer-account';

// NOTE: https://shopify.dev/docs/api/customer/latest/objects/CustomerAddress
export const ADDRESS_FRAGMENT = gql(`#graphql
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    countryCode
    zoneCode
    city
    zip
    phoneNumber
  }
`);

// NOTE: https://shopify.dev/docs/api/customer/latest/objects/Customer
export const CUSTOMER_FRAGMENT = gql(
  `#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
`,
  [ADDRESS_FRAGMENT],
);

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_DETAILS_QUERY = gql(
  `#graphql
  query CustomerDetails($language: LanguageCode) @inContext(language: $language) {
    customer {
      ...Customer
    }
  }
`,
  [CUSTOMER_FRAGMENT],
);
