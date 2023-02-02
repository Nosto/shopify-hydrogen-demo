import {createRoot} from 'react-dom/client';
import {useEffect} from 'react';

function renderContent(contentCampaigns = {}) {
  for (const key in contentCampaigns) {
    let placementSelector = '#' + key;
    let html = contentCampaigns[key]?.html;

    document.querySelector(placementSelector) &&
      (document.querySelector(placementSelector).innerHTML = html);
  }
}

function NostoSlot({recommendation}) {
  let {title, result_id, products} = recommendation;

  return (
    <div className="nosto-container">
      <div className="nosto-title">{title}</div>
      <div className="nosto-list">
        {products.map((product) => {
          return (
            <div className="nosto-item" key={product.productId}>
              <a href={product.url}>
                <div className="nosto-image-container">
                  <img src={product.thumb_url} alt={product.name} />
                </div>
                <div className="nosto-product-details">
                  <div className="nosto-product-name">{product.name}</div>
                  <div className="nosto-product-price">
                    {product.price_text}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderRecommendations(recommendations = {}) {
  for (const key in recommendations) {
    let recommendation = recommendations[key];
    let placementSelector = '#' + key;
    let placement = () => document.querySelector(placementSelector);
    placement.replaceWith(placement.cloneNode());

    createRoot(placement).render();
  }
}

export default function renderNostoCampaigns(data) {
  renderContent(data.content);
}
