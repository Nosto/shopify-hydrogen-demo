import {Seo} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {PageHeader, Section, CartDetails} from '~/components';
import {Layout} from '~/components/index.server';
import NostoComponent from '../components/NostoComponents.client';

export default function Cart() {
  return (
    <Layout>
      <Suspense>
        <Seo
          type="page"
          data={{
            title: 'Cart',
          }}
        />
      </Suspense>
      <div className="w-full mx-auto max-w-7xl xl:-translate-x-12">
        <PageHeader heading="Your Cart" />
      </div>
      <Section padding="x">
        <CartDetails layout="page" />
      </Section>
      <NostoComponent type="NostoPlacement" id="cartpage-nosto-3" />
      <NostoComponent type="NostoCheckout" />
    </Layout>
  );
}
