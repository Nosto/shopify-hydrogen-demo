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

  if (!isShopifyImageHost(parsed.hostname)) {
    return url;
  }

  if (options.width) {
    parsed.searchParams.set('width', String(options.width));
  }
  if (options.height) {
    parsed.searchParams.set('height', String(options.height));
  }
  if (options.crop) {
    parsed.searchParams.set('crop', options.crop);
  }

  return parsed.toString();
}

/** A 1x/2x `srcset` for an image rendered at a fixed size, such as a thumbnail. */
export function srcSetFor(url: string, options: ShopifyImageOptions) {
  const oneX = shopifyImageUrl(url, options);
  const twoX = shopifyImageUrl(url, {
    ...options,
    width: options.width ? options.width * 2 : undefined,
    height: options.height ? options.height * 2 : undefined,
  });

  return `${oneX} 1x, ${twoX} 2x`;
}

/**
 * A width-based `srcset` for an image whose rendered size depends on the layout. Pair it
 * with a `sizes` attribute. Pass `heightRatio` (height / width) to crop every candidate to
 * that shape, e.g. `1` for square.
 */
export function responsiveSrcSet(
  url: string,
  widths: number[],
  heightRatio?: number,
) {
  return widths
    .map((width) => {
      const src = shopifyImageUrl(url, {
        width,
        height: heightRatio ? Math.round(width * heightRatio) : undefined,
        crop: heightRatio ? 'center' : undefined,
      });
      return `${src} ${width}w`;
    })
    .join(', ');
}
