import {gql} from '@shopify/hydrogen/customer-account';

const ORDER_MONEY_FRAGMENT = gql(`#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
`);

const DISCOUNT_APPLICATION_FRAGMENT = gql(
  `#graphql
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
`,
  [ORDER_MONEY_FRAGMENT],
);

const ORDER_LINE_ITEM_FULL_FRAGMENT = gql(
  `#graphql
  fragment OrderLineItemFull on LineItem {
    id
    title
    quantity
    price {
      ...OrderMoney
    }
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    totalDiscount {
      ...OrderMoney
    }
    image {
      altText
      height
      url
      id
      width
    }
    variantTitle
  }
`,
  // DiscountApplication already carries OrderMoney; listing it twice breaks result typing.
  [DISCOUNT_APPLICATION_FRAGMENT],
);

const ORDER_FRAGMENT = gql(
  `#graphql
  fragment Order on Order {
    id
    name
    confirmationNumber
    statusPageUrl
    fulfillmentStatus
    processedAt
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalTax {
      ...OrderMoney
    }
    totalPrice {
      ...OrderMoney
    }
    subtotal {
      ...OrderMoney
    }
    shippingAddress {
      name
      formatted(withName: true)
      formattedArea
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
`,
  // OrderLineItemFull already carries OrderMoney and DiscountApplication.
  [ORDER_LINE_ITEM_FULL_FRAGMENT],
);

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/order
export const CUSTOMER_ORDER_QUERY = gql(
  `#graphql
  query Order($orderId: ID!, $language: LanguageCode)
    @inContext(language: $language) {
    order(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`,
  [ORDER_FRAGMENT],
);
