"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const ShopifyProvider = require("./ShopifyProvider.js");
const cartConstants = require("./cart-constants.js");
const cookiesUtils = require("./cookies-utils.js");
function useCartFetch() {
  const { storefrontId, getPublicTokenHeaders, getStorefrontApiUrl } = ShopifyProvider.useShop();
  return React.useCallback(
    ({
      query,
      variables
    }) => {
      const headers = getPublicTokenHeaders({ contentType: "json" });
      if (storefrontId) {
        headers[cartConstants.SHOPIFY_STOREFRONT_ID_HEADER] = storefrontId;
      }
      const cookieData = cookiesUtils.getShopifyCookies(document.cookie);
      headers[cartConstants.SHOPIFY_STOREFRONT_Y_HEADER] = cookieData[cartConstants.SHOPIFY_Y];
      headers[cartConstants.SHOPIFY_STOREFRONT_S_HEADER] = cookieData[cartConstants.SHOPIFY_S];
      return fetch(getStorefrontApiUrl(), {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: query.toString(),
          variables
        })
      }).then(
        (res) => res.json()
      ).catch((error) => {
        return {
          data: void 0,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          errors: error == null ? void 0 : error.toString()
        };
      });
    },
    [getPublicTokenHeaders, storefrontId, getStorefrontApiUrl]
  );
}
exports.useCartFetch = useCartFetch;
//# sourceMappingURL=cart-hooks.js.map
