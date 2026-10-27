import type {ReactNode} from 'react';
import {useCartForm} from '~/lib/cart';

/**
 * Adds one unit of a variant to the cart through the cart store. The form posts to the
 * cart endpoint before hydration, so it works without JavaScript.
 */
export function AddToCartButton({
  children,
  disabled,
  merchandiseId,
  quantity = 1,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  merchandiseId: string | null | undefined;
  quantity?: number;
  /** Runs before the cart store submits, e.g. to open the cart drawer. */
  onClick?: () => void;
}) {
  const {formProps, register} = useCartForm();

  return (
    <form {...formProps({beforeSubmit: () => onClick?.()})}>
      <input
        type="hidden"
        {...register('merchandiseId', {value: merchandiseId ?? ''})}
      />
      <input type="hidden" {...register('quantity', {value: quantity})} />
      <button
        type="submit"
        {...register('add')}
        disabled={disabled ?? !merchandiseId}
      >
        {children}
      </button>
    </form>
  );
}
