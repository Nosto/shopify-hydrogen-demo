import {Money} from '~/components/Money';
import type {MoneyLike} from '~/lib/money';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyLike | null;
  compareAtPrice?: MoneyLike | null;
}) {
  return (
    <div className="product-price">
      {compareAtPrice ? (
        <div className="product-price-on-sale">
          {price ? <Money data={price} /> : null}
          <s>
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <Money data={price} />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
