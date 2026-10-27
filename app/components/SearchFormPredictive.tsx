import {
  useEffect,
  useRef,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import {useNavigate} from 'react-router';
import {getSearchResultUrl} from '@shopify/hydrogen';
import {
  usePredictiveSearchActions,
  usePredictiveSearchForm,
  type PredictiveSearchQueryInputPropsOptions,
} from '@shopify/hydrogen/react';

import {useAside} from './Aside';
import {SEARCH_ENDPOINT} from '~/lib/search';

export {SEARCH_ENDPOINT};

type SearchFormPredictiveChildren = (args: {
  /** Spread on the search input: searches as the customer types. */
  register: (
    options?: PredictiveSearchQueryInputPropsOptions,
  ) => InputHTMLAttributes<HTMLInputElement>;
  /** Searches again for the input's current value, e.g. on focus. */
  fetchResults: (event: {currentTarget: HTMLInputElement}) => void;
}) => ReactNode;

type SearchFormPredictiveProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'children' | 'onSubmit'
> & {
  children: SearchFormPredictiveChildren | null;
};

/**
 * Search form component that searches predictively as the customer types.
 * Must render inside a `PredictiveSearchProvider`. Without JavaScript the form
 * submits natively to the `/search` route; after hydration it navigates there.
 */
export function SearchFormPredictive({
  children,
  className = 'predictive-search-form',
  ...props
}: SearchFormPredictiveProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const aside = useAside();
  const {formProps, register} = usePredictiveSearchForm();
  const {search, clear} = usePredictiveSearchActions();

  // Clear the input and stale suggestions when the search aside closes
  useEffect(() => {
    if (aside.type === 'search') return;
    clear();
    formRef.current?.reset();
  }, [aside.type, clear]);

  if (typeof children !== 'function') {
    return null;
  }

  return (
    <form
      {...formProps({
        ...props,
        className,
        action: SEARCH_ENDPOINT,
        /** Navigate to the search page with the current input value */
        onSubmit(event, term) {
          event.preventDefault();
          void navigate(
            term
              ? getSearchResultUrl({baseUrl: SEARCH_ENDPOINT, term})
              : SEARCH_ENDPOINT,
          );
          aside.close();
        },
      })}
      ref={formRef}
    >
      {children({
        register: (options) => register('query', options),
        fetchResults: (event) => void search(event.currentTarget.value),
      })}
    </form>
  );
}
