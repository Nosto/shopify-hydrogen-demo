import * as React from 'react';
import crypto from 'crypto-es';
import { Await, useAsyncValue } from 'react-router-dom';
import { ClientOnly } from '../internal/clientOnly';
import { useHydrogenRootFallback } from '../lib/useHydrogenRootFallback';

const LazySession = React.lazy(() =>
  import('@nosto/nosto-react').then((m) => ({ default: m.NostoSession })),
);

if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, 'at', {
    value: function (index: number) {
      return index >= 0 ? this[index] : this[this.length + index];
    },
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

interface CustomerData {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  acceptsMarketing?: boolean;
}
interface CartNode {
  quantity: number;
  merchandise?: {
    id?: string;
    product?: { id: string; title?: string };
    price?: { amount: number; currencyCode: string };
  };
}
interface Cart {
  lines?: { edges?: Array<{ node: CartNode }> };
}
interface AsyncData {
  customer?: CustomerData;
  cart?: Cart;
  storeDomain?: string;
}

function AsyncSessionWrapper() {
  const {
    customer: customerData = {},
    cart: shopifyCart,
    storeDomain,
  } = (useAsyncValue() as AsyncData) || {};

  const customerId = customerData?.id?.split('/')?.at(-1);
  const customer_reference =
    customerId && storeDomain ? crypto.SHA256(customerId + storeDomain).toString() : undefined;

  const customer = {
    customer_reference,
    first_name: customerData?.firstName || undefined,
    last_name: customerData?.lastName || undefined,
    email: customerData?.email || undefined,
    newsletter: customerData?.acceptsMarketing ?? undefined,
  };

  const items = shopifyCart?.lines?.edges?.map((e) => e.node);
  const nostoCart = items?.map((item) => ({
    product_id: item?.merchandise?.product?.id.split('/')?.at(-1),
    name: item?.merchandise?.product?.title,
    sku_id: item?.merchandise?.id?.split('/')?.at(-1),
    quantity: item?.quantity,
    unit_price: item?.merchandise?.price?.amount ?? 0,
    price_currency_code: item?.merchandise?.price?.currencyCode,
  }));
  const cart = nostoCart ? { items: nostoCart } : undefined;

  return (
    <ClientOnly>
      <React.Suspense fallback={null}>
        <LazySession customer={customer} cart={cart} />
      </React.Suspense>
    </ClientOnly>
  );
}

export function NostoSession() {
  const root = useHydrogenRootFallback();
  const nostoPromise = root?.nostoSessionData;
  return (
    <Await resolve={nostoPromise}>
      <AsyncSessionWrapper />
    </Await>
  );
}
