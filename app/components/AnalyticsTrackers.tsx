import {useCartAnalytics} from '@shopify/hydrogen/react';
import {useEffect} from 'react';
import {useLocation} from 'react-router';

import {AnalyticsEvent, getAnalytics} from '~/lib/analytics';

/** Publishes `page_viewed` on the first load and on every client navigation. */
export function PageViewTracker() {
  const location = useLocation();
  const pageKey = location.pathname + location.search;

  useEffect(() => {
    getAnalytics()?.publish(AnalyticsEvent.PAGE_VIEWED);
  }, [pageKey]);

  return null;
}

/** Publishes cart delta events from the cart store. Render once inside `CartProvider`. */
export function CartAnalyticsTracker() {
  useCartAnalytics();
  return null;
}
