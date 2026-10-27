import {gql, type StorefrontApi} from '@shopify/hydrogen';

const MENU_FRAGMENT = gql(`
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`);

export const HEADER_QUERY = gql(
  `
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
    localization {
      country {
        currency {
          isoCode
        }
      }
    }
  }
`,
  [MENU_FRAGMENT],
);

export const FOOTER_QUERY = gql(
  `
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
`,
  [MENU_FRAGMENT],
);

export type HeaderQuery = StorefrontApi.ResultOf<typeof HEADER_QUERY>;
export type FooterQuery = StorefrontApi.ResultOf<typeof FOOTER_QUERY>;
