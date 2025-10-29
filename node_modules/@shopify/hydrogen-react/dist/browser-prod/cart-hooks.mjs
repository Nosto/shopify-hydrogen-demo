import { useCallback } from "react";
import { useShop } from "./ShopifyProvider.mjs";
import { SHOPIFY_STOREFRONT_ID_HEADER, SHOPIFY_STOREFRONT_Y_HEADER, SHOPIFY_Y, SHOPIFY_STOREFRONT_S_HEADER, SHOPIFY_S } from "./cart-constants.mjs";
import { getShopifyCookies } from "./cookies-utils.mjs";
function useCartFetch() {
  const { storefrontId, getPublicTokenHeaders, getStorefrontApiUrl } = useShop();
  return useCallback(
    ({
      query,
      variables
    }) => {
      const headers = getPublicTokenHeaders({ contentType: "json" });
      if (storefrontId) {
        headers[SHOPIFY_STOREFRONT_ID_HEADER] = storefrontId;
      }
      const cookieData = getShopifyCookies(document.cookie);
      headers[SHOPIFY_STOREFRONT_Y_HEADER] = cookieData[SHOPIFY_Y];
      headers[SHOPIFY_STOREFRONT_S_HEADER] = cookieData[SHOPIFY_S];
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
export {
  useCartFetch
};
//# sourceMappingURL=cart-hooks.mjs.map
