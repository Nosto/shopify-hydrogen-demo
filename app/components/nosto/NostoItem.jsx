import { CartForm } from '@shopify/hydrogen';

export function NostoItem({product, onClick}) {
  const selectedVariant = product.skus.find(s => s.available);
  return (
    <div className="nosto-item" onClick={onClick}>
      <a href={product.url}>
        <>
          <div className="nosto-image-container">
            <div className="nosto-image">
              <img src={product.thumb_url} alt={product.name}/>
            </div>
            <div className="nosto-product-details">
              <div className="nosto-product-name">{product.name}</div>
              <div className="nosto-product-price">{product.price_text}</div>
            </div>
          </div>
          <div className="product-form">
            <br/>
            <AddToCartButton
              disabled={!selectedVariant || !selectedVariant.available}
              onClick={() => {
                window.location.href = window.location.href + '#cart-aside';
              }}
              lines={
                selectedVariant
                  ? [
                    {
                      merchandiseId: `gid://shopify/ProductVariant/${selectedVariant.id}`,
                      quantity: 1,
                    },
                  ]
                  : []
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

function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm
      route="/cart"
      inputs={{lines: lines, other: 'data'}}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
