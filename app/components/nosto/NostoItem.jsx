import { CartForm } from "@shopify/hydrogen";
import { Link } from "@remix-run/react";

export function NostoItem({product, onClick}) {
  console.log(product);
  let selectedVariant = product.skus[0].id

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
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              onClick={() => {
                window.location.href = window.location.href + '#cart-aside';
              }}
              lines={
                selectedVariant
                  ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                    },
                  ]
                  : []
              }
            >
              {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
            </AddToCartButton>
          </div>
        </>
      </a>
    </div>
  );

  function AddToCartButton({analytics, children, disabled, lines, onClick}) {
    return (
      <CartForm route="/cart" inputs={{lines: lines, other: "data"}} action={CartForm.ACTIONS.LinesAdd}>
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

  function ProductOptions({option}) {
    return (
      <div className="product-options" key={option.name}>
        <h5>{option.name}</h5>
        <div className="product-options-grid">
          {option.values.map(({value, isAvailable, isActive, to}) => {
            return (
              <Link
                className="product-options-item"
                key={option.name + value}
                prefetch="intent"
                preventScrollReset
                replace
                to={to}
                style={{
                  border: isActive ? '1px solid black' : '1px solid transparent',
                  opacity: isAvailable ? 1 : 0.3,
                }}
              >
                {value}
              </Link>
            );
          })}
        </div>
        <br/>
      </div>
    );
  }
}
