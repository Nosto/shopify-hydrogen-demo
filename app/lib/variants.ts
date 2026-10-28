import {useLocation} from 'react-router';
import {useMemo} from 'react';
import {
  buildProductSelectionSearchParams,
  type SelectedOption,
} from '@shopify/hydrogen';

type VariantParams = {
  handle: string;
  pathname: string;
  searchParams: URLSearchParams;
  selectedOptions?: readonly SelectedOption[];
};

export function useVariantUrl(
  handle: string,
  selectedOptions?: readonly SelectedOption[],
) {
  const {pathname} = useLocation();

  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions,
    });
  }, [handle, selectedOptions, pathname]);
}

/** The `/products/:handle` path, keeping the current `/{language}-{country}` prefix. */
export function getProductPath(pathname: string, handle: string) {
  const match = /^(\/[a-zA-Z]{2}-[a-zA-Z]{2})(\/|$)/.exec(pathname);
  return `${match ? match[1] : ''}/products/${handle}`;
}

export function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions,
}: VariantParams) {
  const path = getProductPath(pathname, handle);

  selectedOptions?.forEach((option) => {
    searchParams.set(option.name, option.value);
  });

  const searchString = searchParams.toString();

  return path + (searchString ? '?' + searchString : '');
}

/**
 * URL for a product form selection. Replaces the current product's option params (and any
 * stale `variant` param) on `base`, keeping unrelated params such as `?ref=campaign`.
 */
export function getSelectionUrl({
  product,
  selectedOptions,
  handle,
  pathname,
  base,
}: {
  product: {handle: string; options: ReadonlyArray<{name: string}>};
  selectedOptions: readonly SelectedOption[];
  handle?: string | null;
  pathname: string;
  base?: URLSearchParams;
}) {
  const params = buildProductSelectionSearchParams({
    selectedOptions,
    optionNames: product.options.map((option) => option.name),
    base,
  });
  const path = getProductPath(pathname, handle || product.handle);

  return params.size ? `${path}?${params}` : path;
}
