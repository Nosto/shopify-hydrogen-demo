import {useLocation, useNavigate} from 'react-router';
import {
  Cache,
  getSelectedProductOptions,
  gql,
  type StorefrontApi,
} from '@shopify/hydrogen';
import type {Route} from './+types/($locale).products.$handle';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {
  ProductForm,
  ProductProvider,
  useProduct,
} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getSelectionUrl} from '~/lib/variants';
import {AnalyticsEvent, getAnalytics} from '~/lib/analytics';
import {storefrontClientContext} from '~/lib/storefront';
import {NostoPlacement} from '@nosto/shopify-hydrogen';
import {
  NostoSlot,
  withNosto,
  type NostoRecommendations,
} from '~/components/nosto/NostoSlot';
import {useEffect, useState} from 'react';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const storefront = context.get(storefrontClientContext);

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const selectedOptions = getSelectedProductOptions({
    searchParams: new URL(request.url).searchParams,
  });

  const [{data, errors}] = await Promise.all([
    storefront.graphql(PRODUCT_QUERY, {
      variables: {handle, selectedOptions},
      cache: Cache.short(),
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (errors) {
    console.error('[hydrogen] Product query failed', errors);
    throw new Response('Product query failed', {status: 500});
  }

  if (!data?.product?.id) {
    throw new Response(null, {status: 404});
  }

  const product = data.product;

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(_args: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product({loaderData}: Route.ComponentProps) {
  const {product} = loaderData;
  const navigate = useNavigate();
  const {pathname, search} = useLocation();

  return (
    <ProductProvider
      product={product}
      onSelect={(result) => {
        // The provider owns URL sync: option links only select, this replaces the URL once
        void navigate(
          getSelectionUrl({
            product,
            selectedOptions: result.selectedOptions,
            handle: result.selectedVariant?.product?.handle,
            pathname,
            base: new URLSearchParams(search),
          }),
          {replace: true, preventScrollReset: true},
        );
      }}
    >
      <ProductDetails product={product} />
    </ProductProvider>
  );
}

function ProductDetails({product}: {product: ProductData}) {
  const [nostoRecommendations, setNostoRecommendations] =
    useState<NostoRecommendations>({});
  const {title, descriptionHtml, id} = product;

  // The selected variant updates client-side as options are selected
  const {selectedVariant} = useProduct();

  useEffect(() => {
    // This runs after hydration — both on first load and on variant changes
    withNosto(async (api) => {
      const result = await api
        .defaultSession()
        .viewProduct({
          product_id: id,
          selected_sku_id: selectedVariant?.sku,
        })
        .setPlacements(['productpage-nosto-1'])
        .load();

      setNostoRecommendations(result.campaigns?.recommendations || {});
    });
  }, [id, selectedVariant?.id]);

  useEffect(() => {
    getAnalytics()?.publish(AnalyticsEvent.PRODUCT_VIEWED, {
      products: [
        {
          id: product.id,
          title: product.title,
          price: selectedVariant?.price ?? product.priceRange.minVariantPrice,
          vendor: product.vendor,
          variantId: selectedVariant?.id ?? product.id,
          variantTitle: selectedVariant?.title ?? product.title,
          quantity: 1,
          sku: selectedVariant?.sku,
        },
      ],
    });
    // Publish once per product view, not per variant selection
  }, [product.id]);

  return (
    <div className="product">
      <ProductImage image={selectedVariant?.image} />
      <div className="product-main">
        <h1>{title}</h1>
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
        <br />
        <ProductForm product={product} />
        <br />
        <br />
        <p>
          <strong>Description</strong>
        </p>
        <br />
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
        <br />
      </div>
      <NostoPlacement id="productpage-nosto-1">
        <NostoSlot
          nostoRecommendation={nostoRecommendations['productpage-nosto-1']}
        />
      </NostoPlacement>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = gql(`#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
  }
`);

const PRODUCT_FRAGMENT = gql(
  `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    requiresSellingPlan
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    seo {
      description
      title
    }
  }
`,
  [PRODUCT_VARIANT_FRAGMENT],
);

const PRODUCT_QUERY = gql(
  `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
`,
  [PRODUCT_FRAGMENT],
);

export type ProductData = NonNullable<
  StorefrontApi.ResultOf<typeof PRODUCT_QUERY>['product']
>;
