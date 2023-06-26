export function NostoItem({product, onClick}) {
  return (
    <div className="nosto-item" onClick={onClick}>
      <a href={product.url}>
        <div className="nosto-image-container">
          <div className="nosto-image">
            <img src={product.thumb_url} alt={product.name} />
          </div>
          <div className="nosto-product-details">
            <div className="nosto-product-name">{product.name}</div>
            <div className="nosto-product-price">{product.price_text}</div>
          </div>
        </div>
      </a>
    </div>
  );
}
