import {createRoot} from 'react-dom/client';
import {NostoSlot} from './NostoSlot';

function renderContent(contentCampaigns = {}) {
  for (const key in contentCampaigns) {
    let placementSelector = '#' + key;
    let html = contentCampaigns[key]?.html;

    document.querySelector(placementSelector) &&
      (document.querySelector(placementSelector).innerHTML = html);
  }
}

function renderRecommendations(recommendations = {}) {
  for (const key in recommendations) {
    let recommendation = recommendations[key];
    let placementSelector = '#' + key;
    let placement = () => document.querySelector(placementSelector);
    placement.replaceWith(placement.cloneNode());

    createRoot(placement).render(<NostoSlot recommendation={recommendation} />);
  }
}

export function renderNostoCampaigns(data) {
  renderContent(data.content);
  renderRecommendations(data.recommendations);
}
