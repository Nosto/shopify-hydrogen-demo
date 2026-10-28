import {getSitemapIndex} from '~/lib/sitemap';
import {storefrontClientContext} from '~/lib/storefront';

import type {Route} from './+types/($locale).[sitemap.xml]';

export async function loader({request, context}: Route.LoaderArgs) {
  const storefront = context.get(storefrontClientContext);

  const response = await getSitemapIndex({
    storefront,
    request,
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
