import {responsiveSrcSet, shopifyImageUrl} from '~/lib/image';

type ProductImageData = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export function ProductImage({image}: {image?: ProductImageData | null}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <img
        alt={image.altText || 'Product Image'}
        key={image.id ?? image.url}
        src={shopifyImageUrl(image.url, {width: 1000, height: 1000, crop: 'center'})}
        srcSet={responsiveSrcSet(image.url, [400, 600, 800, 1000, 1400], 1)}
        sizes="(min-width: 45em) 50vw, 100vw"
        width={1000}
        height={1000}
      />
    </div>
  );
}
