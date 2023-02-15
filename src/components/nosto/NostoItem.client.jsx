export function NostoItem({product, onClick}) {
  return (
    <div className="nosto-item" onClick={onClick}>
      <div className="nosto-image-container">
        <div className="nosto-image">
          <img src={product.thumb_url} alt={product.name} />
        </div>
        <div className="nosto-product-details">
          <div className="nosto-product-name">{product.name}</div>
          <div className="nosto-product-price">{product.price_text}</div>
        </div>
      </div>
    </div>
  );
}
