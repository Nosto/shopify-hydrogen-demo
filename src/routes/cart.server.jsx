import {Seo} from '@shopify/hydrogen';
import {PageHeader, Section, CartDetails} from '~/components';
import {Layout} from '~/components/index.server';

import {NostoCheckout, NostoPlacement} from '@nosto/shopify-hydrogen';

export default function Cart() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading="Your Cart" className="max-w-7xl mx-auto" />
      <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section>
      <NostoPlacement id="cartpage-nosto-1" />
      <NostoCheckout />
    </Layout>
  );
}
