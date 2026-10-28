import {createPredictiveSearchServerHandlers} from '@shopify/hydrogen';

/**
 * Serves `GET /api/predictive-search` for the predictive search aside.
 * Register in the root middleware's `handleShopifyRoutes({handlers})`.
 */
export const predictiveSearchHandlers = createPredictiveSearchServerHandlers();
