import type {Route} from './+types/($locale).$';

// Throwing a 404 lets the root middleware run handleShopifyRedirects (URL redirects,
// /admin, standard Shopify paths) before the 404 page is rendered.
export async function loader({request}: Route.LoaderArgs) {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
  });
}

export default function CatchAllPage() {
  return null;
}
