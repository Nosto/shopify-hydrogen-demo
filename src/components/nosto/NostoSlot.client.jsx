import {NostoItem} from './NostoItem.client';
import './nostoSlot.css';

export function NostoSlot({nostoRecommendation}) {
  let {title, products, result_id} = nostoRecommendation;

  function reportClick(productId) {
    window?.nostojs(function (api) {
      api.defaultSession().recordAttribution('vp', productId, result_id).done();
    });
  }

  return (
    <div className="nosto-container">
      <h2 className="nosto-title">{title}</h2>
      <div className="nosto-list">
        {products.map((product) => (
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
