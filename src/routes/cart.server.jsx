import {Seo} from '@shopify/hydrogen';
import {PageHeader, Section, CartDetails} from '~/components';
import {Layout} from '~/components/index.server';
import NostoComponent from '~/components/NostoComponents.client';

export default function Cart() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading="Your Cart" className="max-w-7xl mx-auto" />
      <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section>
      <NostoComponent type="NostoPlacement" id="cartpage-nosto-3" />
      <NostoComponent type="NostoCheckout" />
    </Layout>
  );
}
