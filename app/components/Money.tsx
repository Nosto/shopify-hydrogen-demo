import {formatPrice, type MoneyLike} from '~/lib/money';

type MoneyProps = {
  data: MoneyLike | null | undefined;
  as?: 'span' | 'div' | 'p' | 'dd' | 'strong';
  className?: string;
};

/** Replacement for classic Hydrogen's `<Money>`, built on `formatMoney()`. */
export function Money({data, as: Component = 'span', className}: MoneyProps) {
  if (!data) {
    return null;
  }
  return <Component className={className}>{formatPrice(data)}</Component>;
}
