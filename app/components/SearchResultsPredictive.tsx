import type {ReactNode} from 'react';
import {Link} from 'react-router';
import {
  getPredictiveSearchItemUrl,
  type PredictiveSearchData,
  type PredictiveSearchStatus,
} from '@shopify/hydrogen';
import {usePredictiveSearch} from '@shopify/hydrogen/react';

import {useAside} from './Aside';
import {shopifyImageUrl, srcSetFor} from '~/lib/image';
import {Money} from '~/components/Money';
import {routeTemplates} from '~/lib/route-templates';

type PredictiveSearchItems = PredictiveSearchData['items'];

type SearchResultsPredictiveArgs = {
  items: PredictiveSearchItems;
  total: number;
  term: string;
  state: PredictiveSearchStatus;
  error: string | null;
  closeSearch: () => void;
};

type PartialPredictiveSearchResult<
  ItemType extends keyof PredictiveSearchItems,
  ExtraProps extends keyof SearchResultsPredictiveArgs = 'term' | 'closeSearch',
> = Pick<PredictiveSearchItems, ItemType> &
  Pick<SearchResultsPredictiveArgs, ExtraProps>;

type SearchResultsPredictiveProps = {
  children: (args: SearchResultsPredictiveArgs) => ReactNode;
};

/** Predictive search thumbnails render at 50x50, cropped to square. */
const THUMBNAIL_SIZE = {width: 50, height: 50, crop: 'center'} as const;

/**
 * Component that renders predictive search results.
 * Must render inside a `PredictiveSearchProvider`.
 */
export function SearchResultsPredictive({
  children,
}: SearchResultsPredictiveProps) {
  const aside = useAside();
  const {term, status, result, error} = usePredictiveSearch();

  /**
   * Utility that closes the search aside, which also resets the search input
   */
  function closeSearch() {
    aside.close();
  }

  return children({
    items: result.items,
    total: result.total,
    closeSearch,
    state: status,
    error,
    term,
  });
}

SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;

function SearchResultsPredictiveArticles({
  term,
  articles,
  closeSearch,
}: PartialPredictiveSearchResult<'articles'>) {
  if (!articles.length) {
    return null;
  }

  return (
    <div className="predictive-search-result" key="articles">
      <h5>Articles</h5>
      <ul>
        {articles.map((article) => {
          const articleUrl = getPredictiveSearchItemUrl(article, {
            routes: routeTemplates,
            term,
          });

          return (
            <li className="predictive-search-result-item" key={article.id}>
              <Link onClick={closeSearch} to={articleUrl}>
                {article.image?.url && (
                  <img
                    alt={article.image.altText ?? ''}
                    src={shopifyImageUrl(article.image.url, THUMBNAIL_SIZE)}
                    srcSet={srcSetFor(article.image.url, THUMBNAIL_SIZE)}
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                )}
                <div>
                  <span>{article.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SearchResultsPredictiveCollections({
  term,
  collections,
  closeSearch,
}: PartialPredictiveSearchResult<'collections'>) {
  if (!collections.length) {
    return null;
  }

  return (
    <div className="predictive-search-result" key="collections">
      <h5>Collections</h5>
      <ul>
        {collections.map((collection) => {
          const collectionUrl = getPredictiveSearchItemUrl(collection, {
            routes: routeTemplates,
            term,
          });

          return (
            <li className="predictive-search-result-item" key={collection.id}>
              <Link onClick={closeSearch} to={collectionUrl}>
                {collection.image?.url && (
                  <img
                    alt={collection.image.altText ?? ''}
                    src={shopifyImageUrl(collection.image.url, THUMBNAIL_SIZE)}
                    srcSet={srcSetFor(collection.image.url, THUMBNAIL_SIZE)}
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                )}
                <div>
                  <span>{collection.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SearchResultsPredictivePages({
  term,
  pages,
  closeSearch,
}: PartialPredictiveSearchResult<'pages'>) {
  if (!pages.length) {
    return null;
  }

  return (
    <div className="predictive-search-result" key="pages">
      <h5>Pages</h5>
      <ul>
        {pages.map((page) => {
          const pageUrl = getPredictiveSearchItemUrl(page, {
            routes: routeTemplates,
            term,
          });

          return (
            <li className="predictive-search-result-item" key={page.id}>
              <Link onClick={closeSearch} to={pageUrl}>
                <div>
                  <span>{page.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SearchResultsPredictiveProducts({
  term,
  products,
  closeSearch,
}: PartialPredictiveSearchResult<'products'>) {
  if (!products.length) {
    return null;
  }

  return (
    <div className="predictive-search-result" key="products">
      <h5>Products</h5>
      <ul>
        {products.map((product) => {
          const productUrl = getPredictiveSearchItemUrl(product, {
            routes: routeTemplates,
            term,
          });

          const price = product?.selectedOrFirstAvailableVariant?.price;
          const image = product?.selectedOrFirstAvailableVariant?.image;
          return (
            <li className="predictive-search-result-item" key={product.id}>
              <Link to={productUrl} onClick={closeSearch}>
                {image && (
                  <img
                    alt={image.altText ?? ''}
                    src={shopifyImageUrl(image.url, THUMBNAIL_SIZE)}
                    srcSet={srcSetFor(image.url, THUMBNAIL_SIZE)}
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                )}
                <div>
                  <p>{product.title}</p>
                  <small>{price && <Money data={price} />}</small>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SearchResultsPredictiveQueries({
  queries,
  queriesDatalistId,
}: PartialPredictiveSearchResult<'queries', never> & {
  queriesDatalistId: string;
}) {
  if (!queries.length) {
    return null;
  }

  return (
    <datalist id={queriesDatalistId}>
      {queries.map((suggestion) => {
        if (!suggestion) {
          return null;
        }

        return <option key={suggestion.text} value={suggestion.text} />;
      })}
    </datalist>
  );
}

function SearchResultsPredictiveEmpty({term}: {term: string}) {
  if (!term) {
    return null;
  }

  return (
    <p>
      No results found for <q>{term}</q>
    </p>
  );
}
