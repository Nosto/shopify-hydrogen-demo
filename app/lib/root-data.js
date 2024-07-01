import {useMatches} from '@remix-run/react';

/**
 * Access the result of the root loader from a React component.
 * @return {SerializeFrom<loader>}
 */
export function useRootLoaderData() {
  const [root] = useMatches();
  return root?.data;
}

/** @template T @typedef {import('@shopify/remix-oxygen').SerializeFrom<T>} SerializeFrom */
/** @typedef {import('~/root').loader} loader */
