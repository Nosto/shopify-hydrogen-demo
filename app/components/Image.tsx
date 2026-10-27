import type {ImgHTMLAttributes} from 'react';

import {shopifyImageUrl, type ShopifyImageOptions} from '~/lib/image';

type ImageData = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height'
> & {
  data: ImageData;
  /** A CSS aspect ratio such as `1/1`. Crops the image to that ratio. */
  aspectRatio?: string;
  /** The widest rendered width, used to cap the generated `srcset`. */
  width?: number;
};

const SRCSET_WIDTHS = [200, 400, 600, 800, 1000, 1200, 1600, 2000];

function parseAspectRatio(aspectRatio?: string) {
  if (!aspectRatio) return undefined;
  const [w, h] = aspectRatio.split('/').map(Number);
  return w && h ? w / h : undefined;
}

/**
 * Replacement for classic Hydrogen's `<Image>`: a plain `<img>` with a Shopify CDN `srcset`.
 */
export function Image({
  data,
  aspectRatio,
  width,
  alt,
  loading = 'lazy',
  sizes = '100vw',
  style,
  ...props
}: ImageProps) {
  const ratio =
    parseAspectRatio(aspectRatio) ??
    (data.width && data.height ? data.width / data.height : undefined);
  const maxWidth = width ?? data.width ?? undefined;
  const widths = maxWidth
    ? SRCSET_WIDTHS.filter((w) => w < maxWidth).concat(maxWidth)
    : SRCSET_WIDTHS;
  const crop: ShopifyImageOptions['crop'] = aspectRatio
    ? 'center'
    : undefined;
  const sizeFor = (w: number) => ({
    width: w,
    height: ratio && aspectRatio ? Math.round(w / ratio) : undefined,
    crop,
  });

  const defaultWidth = maxWidth ?? SRCSET_WIDTHS[SRCSET_WIDTHS.length - 1];

  return (
    <img
      {...props}
      alt={alt ?? data.altText ?? ''}
      loading={loading}
      sizes={sizes}
      src={shopifyImageUrl(data.url, sizeFor(defaultWidth))}
      srcSet={widths
        .map((w) => `${shopifyImageUrl(data.url, sizeFor(w))} ${w}w`)
        .join(', ')}
      width={defaultWidth}
      height={ratio ? Math.round(defaultWidth / ratio) : undefined}
      style={{
        width: '100%',
        height: 'auto',
        ...(aspectRatio ? {aspectRatio, objectFit: 'cover'} : {}),
        ...style,
      }}
    />
  );
}
