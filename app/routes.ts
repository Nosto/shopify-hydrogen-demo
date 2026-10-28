import type {RouteConfig} from '@react-router/dev/routes';
import {flatRoutes} from '@react-router/fs-routes';

// Classic Hydrogen wrapped this in `hydrogenRoutes()` to inject its virtual routes
// (graphiql, subrequest profiler). In Hydrogen 2026-10, Shopify-owned endpoints are
// served by `handleShopifyRoutes` in the root middleware, so file routes are enough.
// Manual route definitions can be added alongside `flatRoutes()` if needed.
// See https://reactrouter.com/api/framework-conventions/routes.ts#routests
export default flatRoutes() satisfies RouteConfig;
