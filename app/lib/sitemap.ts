import {Cache, gql} from '@shopify/hydrogen';

import type {RequestStorefrontClient} from '~/lib/storefront';

/**
 * Local replacement for classic Hydrogen's `getSitemapIndex` / `getSitemap`, which the
 * 2026-10 library no longer ships. The XML output matches the classic helpers.
 */

/** Sitemap URL segment → Storefront API `SitemapType`. */
const SITEMAP_TYPES = {
  products: 'PRODUCT',
  pages: 'PAGE',
  collections: 'COLLECTION',
  metaObjects: 'METAOBJECT',
  articles: 'ARTICLE',
  blogs: 'BLOG',
} as const;

export type SitemapIndexType = keyof typeof SITEMAP_TYPES;

const DEFAULT_INDEX_TYPES: SitemapIndexType[] = [
  'products',
  'pages',
  'collections',
  'metaObjects',
  'articles',
  'blogs',
];

const SITEMAP_INDEX_PREFIX = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const SITEMAP_INDEX_SUFFIX = `</sitemapindex>`;

const SITEMAP_PREFIX = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>`;
const SITEMAP_SUFFIX = `</urlset>`;

const XML_HEADERS = {
  'Content-Type': 'application/xml',
  'Cache-Control': `max-age=${60 * 60 * 24}`,
};

export type SitemapLinkArgs = {
  type: string;
  baseUrl: string;
  handle: string;
  locale?: string;
};

/**
 * Builds the sitemap index (`/sitemap.xml`) with one child sitemap per page of each
 * resource type, e.g. `/sitemap/products/1.xml`.
 */
export async function getSitemapIndex({
  storefront,
  request,
  types = DEFAULT_INDEX_TYPES,
  customChildSitemaps = [],
}: {
  storefront: RequestStorefrontClient;
  request: Request;
  types?: SitemapIndexType[];
  customChildSitemaps?: string[];
}) {
  const {data, errors} = await storefront.graphql(SITEMAP_INDEX_QUERY, {
    cache: Cache.long(),
  });

  if (errors?.length || !data) {
    throw new Response('Sitemap index not found.', {status: 404});
  }

  const baseUrl = new URL(request.url).origin;

  const body =
    SITEMAP_INDEX_PREFIX +
    types
      .map((type) =>
        getSitemapLinks(type, data[type]?.pagesCount?.count ?? 0, baseUrl),
      )
      .join('\n') +
    customChildSitemaps
      .map(
        (url) =>
          '<sitemap><loc>' +
          (baseUrl + (url.startsWith('/') ? url : '/' + url)) +
          '</loc></sitemap>',
      )
      .join('\n') +
    SITEMAP_INDEX_SUFFIX;

  return new Response(body, {headers: XML_HEADERS});
}

function getSitemapLinks(resource: string, count: number, baseUrl: string) {
  let links = ``;
  for (let i = 1; i <= count; i++) {
    links += `<sitemap><loc>${baseUrl}/sitemap/${resource}/${i}.xml</loc></sitemap>`;
  }
  return links;
}

/**
 * Builds one page of a child sitemap (`/sitemap/:type/:page.xml`), with an
 * `xhtml:link` alternate per locale.
 */
export async function getSitemap({
  storefront,
  request,
  params,
  getLink,
  locales = [],
  getChangeFreq,
  noItemsFallback = '/',
}: {
  storefront: RequestStorefrontClient;
  request: Request;
  params: {type?: string; page?: string};
  getLink: (args: SitemapLinkArgs) => string;
  locales?: string[];
  getChangeFreq?: (args: {type: string; handle: string}) => string;
  noItemsFallback?: string;
}) {
  if (!params.type || !params.page) {
    throw new Response('No data found', {status: 404});
  }

  const type = params.type;
  const page = parseInt(params.page, 10);
  if (!isSitemapType(type) || !Number.isFinite(page) || page < 1) {
    throw new Response('Not found', {status: 404});
  }

  const {data, errors} = await storefront.graphql(SITEMAP_QUERY, {
    variables: {type: SITEMAP_TYPES[type], page},
    cache: Cache.long(),
  });

  if (errors?.length) {
    throw new Response('Sitemap not found.', {status: 404});
  }

  const baseUrl = new URL(request.url).origin;
  const items = data?.sitemap?.resources?.items ?? [];

  let body = '';

  if (!items.length) {
    body =
      SITEMAP_PREFIX +
      `<url><loc>${baseUrl + noItemsFallback}</loc></url>` +
      SITEMAP_SUFFIX;
  } else {
    body =
      SITEMAP_PREFIX +
      items
        .map((item) => {
          // Metaobject entries link by their metaobject type rather than the sitemap type
          const metaobjectType =
            'type' in item && typeof item.type === 'string'
              ? item.type
              : undefined;
          return renderUrlTag({
            url: getLink({
              type: metaobjectType ?? type,
              baseUrl,
              handle: item.handle,
            }),
            type: metaobjectType ?? type,
            handle: item.handle,
            updatedAt: String(item.updatedAt),
            locales,
            baseUrl,
            getLink,
            getChangeFreq,
          });
        })
        .join('') +
      SITEMAP_SUFFIX;
  }

  return new Response(body, {headers: XML_HEADERS});
}

function isSitemapType(type: string): type is SitemapIndexType {
  return Object.prototype.hasOwnProperty.call(SITEMAP_TYPES, type);
}

function renderUrlTag({
  url,
  type,
  handle,
  updatedAt,
  locales,
  baseUrl,
  getLink,
  getChangeFreq,
}: {
  url: string;
  type: string;
  handle: string;
  updatedAt: string;
  locales: string[];
  baseUrl: string;
  getLink: (args: SitemapLinkArgs) => string;
  getChangeFreq?: (args: {type: string; handle: string}) => string;
}) {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${updatedAt}</lastmod>
  <changefreq>${getChangeFreq ? getChangeFreq({type, handle}) : 'weekly'}</changefreq>
${locales
  .map((locale) =>
    renderAlternateTag(getLink({type, baseUrl, handle, locale}), locale),
  )
  .join('\n')}
</url>
  `.trim();
}

function renderAlternateTag(url: string, locale: string) {
  return `  <xhtml:link rel="alternate" hreflang="${locale}" href="${url}" />`;
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/sitemap
const SITEMAP_INDEX_QUERY = gql(`#graphql
  query SitemapIndex {
    products: sitemap(type: PRODUCT) {
      pagesCount {
        count
      }
    }
    collections: sitemap(type: COLLECTION) {
      pagesCount {
        count
      }
    }
    articles: sitemap(type: ARTICLE) {
      pagesCount {
        count
      }
    }
    pages: sitemap(type: PAGE) {
      pagesCount {
        count
      }
    }
    blogs: sitemap(type: BLOG) {
      pagesCount {
        count
      }
    }
    metaObjects: sitemap(type: METAOBJECT) {
      pagesCount {
        count
      }
    }
  }
`);

const SITEMAP_QUERY = gql(`#graphql
  query Sitemap($type: SitemapType!, $page: Int!) {
    sitemap(type: $type) {
      resources(page: $page) {
        items {
          handle
          updatedAt
          ... on SitemapResourceMetaobject {
            type
          }
        }
      }
    }
  }
`);
