import {NostoItem, type NostoProduct} from './NostoItem';
//import styles from './nostoSlot.css';

/*
export function links() {
  return [{ rel: 'stylesheet', href: './nostoSlot.css' }]
}
*/

export type NostoRecommendation = {
  result_id: string;
  title?: string;
  products: NostoProduct[];
};

export type NostoRecommendations = Record<
  string,
  NostoRecommendation | undefined
>;

/** The parts of the Nosto client API (`window.nostojs`) that the storefront calls. */
type NostoRequest = {
  setPlacements(placements: string[]): NostoRequest;
  load(): Promise<{campaigns?: {recommendations?: NostoRecommendations}}>;
};

type NostoApi = {
  defaultSession(): {
    viewFrontPage(): NostoRequest;
    viewProduct(product: {
      product_id: string;
      selected_sku_id?: string | null;
    }): NostoRequest;
    recordAttribution(
      type: string,
      productId: string,
      resultId: string,
    ): {done(): void};
  };
};

type NostoWindow = Window & {
  nostojs?: (callback: (api: NostoApi) => void | Promise<void>) => void;
};

/** Runs `callback` once the Nosto client script is ready. No-op during SSR. */
export function withNosto(callback: (api: NostoApi) => void | Promise<void>) {
  if (typeof window === 'undefined') return;
  (window as NostoWindow).nostojs?.(callback);
}

export function NostoSlot({
  nostoRecommendation,
}: {
  nostoRecommendation?: NostoRecommendation;
}) {
  function reportClick(productId: string) {
    if (!nostoRecommendation) return;
    withNosto(function (api) {
      api
        .defaultSession()
        .recordAttribution('vp', productId, nostoRecommendation.result_id)
        .done();
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
