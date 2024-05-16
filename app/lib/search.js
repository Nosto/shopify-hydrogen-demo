/**
 * @param {| PredictiveQueryFragment
 *     | SearchProductFragment
 *     | PredictiveProductFragment
 *     | PredictiveCollectionFragment
 *     | PredictiveArticleFragment
 *     | PredictivePageFragment} resource
 * @param {string} [params]
 */
export function applyTrackingParams(resource, params) {
  if (params) {
    return resource?.trackingParameters
      ? `?${params}&${resource.trackingParameters}`
      : `?${params}`;
  } else {
    return resource?.trackingParameters
      ? `?${resource.trackingParameters}`
      : '';
  }
}

/** @typedef {import('storefrontapi.generated').PredictiveQueryFragment} PredictiveQueryFragment */
/** @typedef {import('storefrontapi.generated').SearchProductFragment} SearchProductFragment */
/** @typedef {import('storefrontapi.generated').PredictiveProductFragment} PredictiveProductFragment */
/** @typedef {import('storefrontapi.generated').PredictiveCollectionFragment} PredictiveCollectionFragment */
/** @typedef {import('storefrontapi.generated').PredictivePageFragment} PredictivePageFragment */
/** @typedef {import('storefrontapi.generated').PredictiveArticleFragment} PredictiveArticleFragment */
