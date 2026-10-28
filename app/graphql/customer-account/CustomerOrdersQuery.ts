import {gql} from '@shopify/hydrogen/customer-account';

// NOTE: https://shopify.dev/docs/api/customer/latest/objects/Order
export const ORDER_ITEM_FRAGMENT = gql(`#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillmentStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    confirmationNumber
    processedAt
  }
`);

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
// The orders selection lives in the query itself (not a fragment) because it reads the
// query's pagination variables.
export const CUSTOMER_ORDERS_QUERY = gql(
  `#graphql
  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
    $query: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    customer {
      orders(
        sortKey: PROCESSED_AT,
        reverse: true,
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        query: $query
      ) {
        nodes {
          ...OrderItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`,
  [ORDER_ITEM_FRAGMENT],
);
