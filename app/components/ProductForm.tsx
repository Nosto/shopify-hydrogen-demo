import {useMemo, type MouseEvent} from 'react';
import {Link, useLocation} from 'react-router';
import {canAddToCart} from '@shopify/hydrogen';
import {createProductComponents} from '@shopify/hydrogen/react';
import {useAside} from './Aside';
import {getSelectionUrl} from '~/lib/variants';
import type {ProductData} from '~/routes/($locale).products.$handle';

export const {ProductProvider, useProduct, useProductForm} =
  createProductComponents<ProductData>();

type OptionValue = ReturnType<
  typeof useProductForm
>['options'][number]['values'][number];

export function ProductForm({product}: {product: ProductData}) {
  const {open} = useAside();
  const {options, selectedVariant, register, formProps, errors, pending} =
    useProductForm();
  const {pathname, search} = useLocation();
  const baseParams = useMemo(() => new URLSearchParams(search), [search]);
  const addable = canAddToCart(product, options);

  return (
    <div className="product-form">
      {options.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.values.length <= 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {option.values.map((value) => {
                const style = {
                  border: value.selected
                    ? '1px solid black'
                    : '1px solid transparent',
                  opacity: value.available ? 1 : 0.3,
                };

                if (!value.exists) {
                  // No variant exists for this combination, so there is no URL to link to
                  return (
                    <button
                      type="button"
                      className="product-options-item"
                      key={option.name + value.name}
                      style={style}
                      disabled
                      aria-pressed={value.selected}
                    >
                      <ProductOptionSwatch value={value} />
                    </button>
                  );
                }

                const to = getSelectionUrl({
                  product,
                  selectedOptions: value.selectedOptions,
                  handle: value.handle,
                  pathname,
                  base: baseParams,
                });

                if (value.handle !== product.handle) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as a link to that product
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + value.name}
                      prefetch="intent"
                      preventScrollReset
                      to={to}
                      style={style}
                      data-available={value.available ? 'true' : 'false'}
                    >
                      <ProductOptionSwatch value={value} />
                    </Link>
                  );
                }

                // Same-product values are real GET links so selection works without
                // JavaScript; once hydrated, a plain click selects client-side instead
                const registered = register('optionValue', {
                  optionName: option.name,
                  value: value.name,
                });
                const onSelectLink = (event: MouseEvent<HTMLAnchorElement>) => {
                  if (
                    event.defaultPrevented ||
                    event.button !== 0 ||
                    event.metaKey ||
                    event.altKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    (event.currentTarget.target &&
                      event.currentTarget.target !== '_self')
                  ) {
                    return;
                  }

                  // The provider owns URL sync; stop Link from navigating a second time
                  event.preventDefault();
                  registered.onClick();
                };

                return (
                  <Link
                    className={`product-options-item${
                      !value.selected ? ' link' : ''
                    }`}
                    key={option.name + value.name}
                    to={to}
                    replace
                    preventScrollReset
                    style={style}
                    aria-current={value.selected ? 'true' : undefined}
                    data-available={value.available ? 'true' : 'false'}
                    onClick={onSelectLink}
                  >
                    <ProductOptionSwatch value={value} />
                  </Link>
                );
              })}
            </div>
            <br />
          </div>
        );
      })}
      <form {...formProps({beforeSubmit: () => open('cart')})}>
        <input type="hidden" {...register('merchandiseId', {})} />
        <input type="hidden" {...register('quantity', {value: 1})} />
        <button {...register('addToCart', {})} disabled={!addable || pending}>
          {addable
            ? 'Add to cart'
            : selectedVariant
              ? 'Sold out'
              : 'Select options'}
        </button>
      </form>
      {errors.userErrors.length > 0 ? (
        <ul role="alert">
          {errors.userErrors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

// Announced to screen readers only; sold-out values are already dimmed visually
const VISUALLY_HIDDEN = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;

function ProductOptionSwatch({value}: {value: OptionValue}) {
  const {name, swatch, available} = value;
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;
  const soldOut = !available ? (
    <span style={VISUALLY_HIDDEN}> (Sold out)</span>
  ) : null;

  if (!image && !color) {
    return (
      <>
        {name}
        {soldOut}
      </>
    );
  }

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
      {soldOut}
    </div>
  );
}
