import {formatMoney, type MoneyV2} from '@shopify/hydrogen';

/**
 * Structural money shape, so both Storefront and Customer Account API `MoneyV2` values fit.
 */
export type MoneyLike = {amount: string; currencyCode: string};

export function formatPrice(money: MoneyLike, locale = 'en-US') {
  return formatMoney(money as MoneyV2, {locale}).toString();
}
