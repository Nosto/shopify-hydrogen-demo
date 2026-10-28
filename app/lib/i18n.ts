import type {I18nConfig} from '@shopify/hydrogen';

export type I18nLocale = I18nConfig & {pathPrefix: string};

/**
 * Resolves the market from a `/{language}-{country}` path prefix, such as `/fr-ca`,
 * falling back to US English.
 */
export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase() ?? '';

  if (/^[A-Z]{2}-[A-Z]{2}$/.test(firstPathPart)) {
    const [language, country] = firstPathPart.split('-');
    return {
      language: language as I18nConfig['language'],
      country: country as I18nConfig['country'],
      pathPrefix: '/' + firstPathPart,
    };
  }

  return {language: 'EN', country: 'US', pathPrefix: ''};
}
