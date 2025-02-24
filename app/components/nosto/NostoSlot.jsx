import {useEffect} from 'react';
import {NostoItem} from './NostoItem';
import {useLoaderData} from '@remix-run/react';
//import styles from './nostoSlot.css';

/*
export function links() {
  return [{ rel: 'stylesheet', href: './nostoSlot.css' }]
}
*/

export function NostoSlot({name, nostoRecommendation}) {
  function reportClick(productId) {
    window?.nostojs(function (api) {
      api.defaultSession().recordAttribution('vp', productId, result_id).done();
    });
  }

  return (
    <div className="nosto-container">
      <h2 className="nosto-title">{nostoRecommendation?.title}</h2>
      <div className="nosto-list">
        {nostoRecommendation?.products.map((product) => (
          <NostoItem
            product={product}
            key={product.product_id}
            onClick={() => {
              reportClick(product.product_id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
