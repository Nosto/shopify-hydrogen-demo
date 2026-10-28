import type {StorefrontApi} from '@shopify/hydrogen';

import type {SEARCH_QUERY} from '~/routes/($locale).search';

/** The search path that the search forms submit to. */
export const SEARCH_ENDPOINT = '/search';

export type RegularSearchQuery = StorefrontApi.ResultOf<typeof SEARCH_QUERY>;

export type RegularSearchItems = Pick<
  RegularSearchQuery,
  'articles' | 'pages' | 'products'
>;

export type RegularSearchReturn = {
  type: 'regular';
  term: string;
  error?: string;
  result: {total: number; items: RegularSearchItems} | null;
};
