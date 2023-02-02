import './css/NostoItem.css';

export function NostoItem({product}) {
  return (
    <div className="nosto-item" key={product.productId}>
      <a href={product.url}>
        <div className="nosto-image-container">
          <div className="nosto-image">
            <img src={product.thumb_url} alt={product.name} />
          </div>
        </div>
        <div className="nosto-product-details">
          <div className="nosto-product-name">{product.name}</div>
          <div className="nosto-product-price">{product.price_text}</div>
        </div>
      </a>
    </div>
  );
}
