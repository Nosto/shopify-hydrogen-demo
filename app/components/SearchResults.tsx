import type {ReactNode} from 'react';
import {Link} from 'react-router';
import {getSearchResultUrl} from '@shopify/hydrogen';

import {shopifyImageUrl, srcSetFor} from '~/lib/image';
import {Money} from '~/components/Money';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import type {RegularSearchItems, RegularSearchReturn} from '~/lib/search';

type SearchItems = RegularSearchItems;

type PartialSearchResult<ItemType extends keyof SearchItems> = Pick<
  SearchItems,
  ItemType
> & {term: string};

type SearchResultsProps = {
  term: string;
  result: RegularSearchReturn['result'];
  children: (args: SearchItems & {term: string}) => ReactNode;
};

/** Search result nodes are a union of every searchable type; keep the requested one. */
function nodesOfType<T extends string, N extends {__typename?: string}>(
  nodes: readonly N[],
  typename: T,
) {
  return nodes.filter(
    (node): node is Extract<N, {__typename: T}> => node.__typename === typename,
  );
}

export function SearchResults({term, result, children}: SearchResultsProps) {
  if (!result?.total) {
    return null;
  }

  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

function SearchResultsArticles({term, articles}: PartialSearchResult<'articles'>) {
  const nodes = nodesOfType(articles?.nodes ?? [], 'Article');
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Articles</h2>
      <div>
        {nodes.map((article) => {
          const articleUrl = getSearchResultUrl({
            baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
            trackingParameters: article.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={article.id}>
              <Link prefetch="intent" to={articleUrl}>
                {article.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function SearchResultsPages({term, pages}: PartialSearchResult<'pages'>) {
  const nodes = nodesOfType(pages?.nodes ?? [], 'Page');
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Pages</h2>
      <div>
        {nodes.map((page) => {
          const pageUrl = getSearchResultUrl({
            baseUrl: `/pages/${page.handle}`,
            trackingParameters: page.trackingParameters,
            term,
          });

          return (
            <div className="search-results-item" key={page.id}>
              <Link prefetch="intent" to={pageUrl}>
                {page.title}
              </Link>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function SearchResultsProducts({term, products}: PartialSearchResult<'products'>) {
  const nodes = nodesOfType(products?.nodes ?? [], 'Product');
  if (!products || !nodes.length) {
    return null;
  }

  return (
    <div className="search-result">
      <h2>Products</h2>
      <PaginatedResourceSection
        connection={{nodes, pageInfo: products.pageInfo}}
      >
        {({node: product}) => {
          const productUrl = getSearchResultUrl({
            baseUrl: `/products/${product.handle}`,
            trackingParameters: product.trackingParameters,
            term,
          });

          const price = product?.selectedOrFirstAvailableVariant?.price;
          const image = product?.selectedOrFirstAvailableVariant?.image;

          return (
            <div className="search-results-item" key={product.id}>
              <Link prefetch="intent" to={productUrl}>
                {image && (
                  <img
                    alt={product.title}
                    src={shopifyImageUrl(image.url, {width: 50})}
                    srcSet={srcSetFor(image.url, {width: 50})}
                    width={50}
                    height={
                      image.width && image.height
                        ? Math.round((50 * image.height) / image.width)
                        : undefined
                    }
                    loading="lazy"
                  />
                )}
                <div>
                  <p>{product.title}</p>
                  <small>{price && <Money data={price} />}</small>
                </div>
              </Link>
            </div>
          );
        }}
      </PaginatedResourceSection>
      <br />
    </div>
  );
}

function SearchResultsEmpty() {
  return <p>No results, try a different search.</p>;
}
