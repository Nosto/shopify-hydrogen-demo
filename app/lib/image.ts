export type ShopifyImageOptions = {
  width?: number;
  height?: number;
  crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
};

const SHOPIFY_CDN_HOSTS = ['cdn.shopify.com', 'mock.shop'];

function isShopifyImageHost(hostname: string) {
  return SHOPIFY_CDN_HOSTS.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );
}

/** Adds CDN sizing params to Shopify image URLs and leaves other URLs unchanged. */
export function shopifyImageUrl(url: string, options: ShopifyImageOptions = {}) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (!isShopifyImageHost(parsed.hostname)) return url;

  if (options.width) parsed.searchParams.set('width', String(options.width));
  if (options.height) parsed.searchParams.set('height', String(options.height));
  if (options.crop) parsed.searchParams.set('crop', options.crop);

  return parsed.toString();
}
