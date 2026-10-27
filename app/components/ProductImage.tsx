import {Image} from '~/components/Image';

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
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id ?? image.url}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
