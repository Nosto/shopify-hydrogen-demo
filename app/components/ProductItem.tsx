import {Link} from 'react-router';
import {responsiveSrcSet, shopifyImageUrl} from '~/lib/image';
import {Money} from '~/components/Money';
import type {MoneyLike} from '~/lib/money';
import {useVariantUrl} from '~/lib/variants';

export type ProductItemData = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {minVariantPrice: MoneyLike};
};

export function ProductItem({
  product,
  loading,
}: {
  product: ProductItemData;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <img
          alt={image.altText || product.title}
          src={shopifyImageUrl(image.url, {width: 400, height: 400, crop: 'center'})}
          srcSet={responsiveSrcSet(image.url, [400, 600, 800], 1)}
          sizes="(min-width: 45em) 400px, 100vw"
          width={400}
          height={400}
          loading={loading}
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}
