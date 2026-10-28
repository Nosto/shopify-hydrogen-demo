import {AddToCartButton} from '../AddToCartButton';
import {useAside} from '../Aside';

export type Sku = {
  id: string;
  available: boolean;
};

export type NostoProduct = {
  product_id: string;
  url: string;
  name: string;
  thumb_url: string;
  price_text: string;
  skus: Array<Sku>;
};

export function NostoItem({
  product,
  onClick,
}: {
  product: NostoProduct;
  onClick?: () => void;
}) {
  const selectedVariant = product.skus.find((s) => s.available);
  const {open} = useAside();
  return (
    <div className="nosto-item" onClick={onClick}>
      <a href={product.url}>
        <>
          <div className="nosto-image-container">
            <div className="nosto-image">
              <img src={product.thumb_url} alt={product.name} />
            </div>
            <div className="nosto-product-details">
              <div className="nosto-product-name">{product.name}</div>
              <div className="nosto-product-price">{product.price_text}</div>
            </div>
          </div>
          <div className="product-form">
            <br />
            <AddToCartButton
              disabled={!selectedVariant || !selectedVariant.available}
              onClick={() => open('cart')}
              merchandiseId={
                selectedVariant
                  ? `gid://shopify/ProductVariant/${selectedVariant.id}`
                  : null
              }
            >
              {selectedVariant?.available ? 'Add to cart' : 'Sold out'}
            </AddToCartButton>
          </div>
        </>
      </a>
    </div>
  );
}
