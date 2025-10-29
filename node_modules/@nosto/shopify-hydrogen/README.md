# @nosto/shopify-hydrogen

### Welcome to the Nosto React Component Library for Shopify Hydrogen! 

Our component library is designed to help you easily integrate Nosto features into your Hydrogen-based storefront.

The library includes a comprehensive set of reusable components, each designed to support a specific feature or functionality of Nosto. With our library, you can quickly and easily implement Nosto features into your storefront.

This README is designed to provide you with an overview of our component library, including instructions on how to install and use our components, as well as information on the features and functionalities that our library supports. 


> :warning: Please note that the information provided in this documentation is specific to Hydrogen 2, which is built on Remix. If your storefront is still running on Hydrogen 1, we recommend referring to our [documentation specifically tailored for Hydrogen 1](https://github.com/Nosto/shopify-hydrogen/tree/hydrogen-v1). This will ensure that you access the appropriate guidance and instructions for your specific version.

## nosto-react

It's important to note that our React component library for Shopify Hydrogen is an extension of our nosto-react library, a powerful and flexible library that provides seamless integration with Nosto. Our Shopify Hydrogen-specific component library builds upon the core functionality of [nosto-react](https://github.com/Nosto/nosto-react), adding Hydrogen-specific hooks and logic to make integration even easier and more intuitive.

## Demo store

To see our React component library in action in a Hydrogen project, we invite you to check out our [Shopify Hydrogen demo store](https://shopify-hydrogen-demo.nosto.com/). The code for the demo store is available on our [GitHub repository](https://github.com/Nosto/shopify-hydrogen-demo). We hope that our Hydrogen demo store will serve as a source of inspiration for your own storefront development, and we encourage you to explore our component library as well and customize it further to fit your unique needs.


## Feature list

Our React component library for Shopify Hydrogen includes the following features:

* Recommendations, including client-side rendering
* Onsite content personalisation
* Dynamic bundles
* Debug toolbar* (excluding advanced use cases)
* Pop-ups & personalised emails
* A/B testing
* Segmentation and Insights
* Analytics
* Search** (when implemented via our code editor)
* Shopify Markets

_*Note: Our React component library currently does not support advanced use cases of the debug toolbar, but we are constantly working to improve our library and provide you with the best possible integration options._

_**Note: The search feature is available when implemented via our code editor._

## Installation

To install the package into your project, run:

```sh
npm install @nosto/shopify-hydrogen
```

Or if you prefer using Yarn:

```sh
yarn add @nosto/shopify-hydrogen
```

## Usage

### Adding Nosto's fetcher function to the root loader

- Import `getNostoData` from `@nosto/shopify-hydrogen` into your root.jsx file
- Invoke the function, passing an object that contains both `context` and `cartId` as properties
- Spread it to the returned defer object of the root loader by using the spread operator `...` and `await` keyword: `...(await getNostoData({ context, cartId }))`

By following these steps, you enable Nosto components to seamlessly receive relevant server-based data through the root loader.

```js
// app/root.jsx

import { getNostoData } from '@nosto/shopify-hydrogen'

export async function loader({ request, context }) {
  const cartId = getCartId(request);
  //...

  return defer({
    ...(await getNostoData({ context, cartId })),
  });
}
```

### Adding components

The library uses [@nosto/nosto-react](https://github.com/Nosto/nosto-react) under the hood combined with Hydrogen functionality. You can import the following components:

#### NostoProvider

- The NostoProvider component is **required** and provides the Nosto functionality.
- It must wrap all other Nosto components.
- Pass your Nosto merchant ID via the `account` prop.
- Pass Shopify Hydrogen nonce as a nonce prop. This is used to add your stores content security policy nonce to a Nosto script.
- Imports the Nosto client script into the window environment. This is used to control all of Nosto functionality.
- Remix separates the App and ErrorBoundary within the root. Make sure to add <NostoProvider/> to both for also enabling Nosto on 404 pages.
- The `currentVariation` prop is automatically detected and managed within the NostoProvider component. However, if you prefer to set it manually, you can simply pass the prop directly yourself. 

```jsx
// app/root.jsx

import { NostoProvider } from "@nosto/shopify-hydrogen";

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData();
  
  return (
      ...
      <body>
        <NostoProvider account="shopify-11368366139" recommendationComponent={<NostoSlot />} nonce={nonce}>
          <Layout>
            <Outlet/>
          </Layout>
        </NostoProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
  );
}

export function ErrorBoundary() {

  const [root] = useMatches();

  return (
      ...
      <body>
        <NostoProvider account="shopify-11368366139" recommendationComponent={<NostoSlot />}>
          <Layout/>
        </NostoProvider>
        <Scripts />
      </body>
  );
}
```

#### Shopify Markets

- Make sure you have configured markets within your Shopify account. If you need assistance with the setup process, we recommend referring to this helpful [article](https://help.shopify.com/en/manual/markets/managing-markets).
- To enable Shopify Markets for Nosto in Hydrogen, you can utilize the `shopifyMarkets` prop when using the `<NostoProvider/>` component.
- You can enable automatic market and language detection by simply passing `true` as the value for the `shopifyMarkets` prop.
- Alternatively, you can manually pass the language and market ID individually using the following format: `{language: "EN", marketId: "123456789"}`.

```jsx
// Enable with automatic market and language detection:
<NostoProvider shopifyMarkets={true} account="shopify-11368366139" nonce={nonce}/>

// Manually set only the language of the market:
<NostoProvider shopifyMarkets={{ language: "EN" }} account="shopify-11368366139" nonce={nonce}/>

// Manually set both the language and ID of the market:
<NostoProvider shopifyMarkets={{ language: "EN", marketId: '123456789' }} account="shopify-11368366139" nonce={nonce}/>

```


#### Client side rendering for recommendations

In order to implement client-side rendering, the <NostoProvider> requires a designated component to render the recommendations provided by Nosto. This component should be capable of processing the JSON response received from our backend. Notice the `recommendationComponent={<NostoSlot />}` prop passed to `<NostoProvider>` above. 

We have included a set of basic components as examples, however, additional customizations can be made to suit specific requirements. It is important to note that these components serve as a starting point for implementation.

```jsx
// app/components/nosto/NostoItem.jsx

export function NostoItem({product, onClick}) {
  return (
    <div className="nosto-item" onClick={onClick}>
      <a href={product.url}>
        <div className="nosto-image-container">
          <div className="nosto-image">
            <img src={product.thumb_url} alt={product.name} />
          </div>
          <div className="nosto-product-details">
            <div className="nosto-product-name">{product.name}</div>
            <div className="nosto-product-price">{product.price_text}</div>
          </div>
        </div>
      </a>
    </div>
  );
}
```

Additionally, we have a component that will use `<NostoItem>` in slots defined for recommendations.

```jsx
// app/components/nosto/NostoSlot.jsx

import { NostoItem } from './NostoItem';

export function NostoSlot({nostoRecommendation}) {
  let {title, products, result_id} = nostoRecommendation;

  function reportClick(productId) {
    // To report attribution for product clicks towards segmentation & analytics
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
```

#### NostoSession

In Hydrogen the NostoSession component is rendered automatically, no need for manually adding it to your app.

#### NostoPlacement

- The NostoPlacement component renders a static Nosto placement.
- Placements are used to inject recommendations	and content directly into the page. It’s advised to add these wherever you may wish to add personalisation later.
- Pass the placement id via the `id` prop.

```jsx
import { NostoPlacement } from "@nosto/shopify-hydrogen";

<NostoPlacement id="frontpage-nosto-1" />;
<NostoPlacement id="frontpage-nosto-2” />;
```
##### :warning: Dynamic placements and Shopify Hydrogen
Please note that the concept of dynamic placements does not apply to Shopify Hydrogen headless environments, as they can interfere with React's DOM rendering process and adversely affect site navigation. As such, we have disabled Nosto's dynamic placement feature in our React component library for Shopify Hydrogen builds. Instead, all placements should be statically placed where needed with the `NostoPlacement` component described above. While dynamic placements may be a useful feature in other environments, we have found that they are not compatible with the unique architecture of Shopify Hydrogen, and can cause unexpected behavior in your storefront.

##### Optionally passing placement IDs to page type components
An optional prop called "placements" can be passed for all components in the library. This prop is a string array that accepts placement IDs. When used, it allows Nosto to render only the placements you specify, rather than all placements on the page (which is the default behavior). This can include placements that are 'visible' on the page, like ones in the background such as those on a product detail page or your homepage when your mini-cart is open.
To use this prop, simply pass the placement IDs you wish to render as an array of strings. For example, if you only want to render placements "frontpage-nosto-1" and "frontpage-nosto-2" you would pass the following prop to the `<NostoHome>` component:

```jsx
<NostoHome placements={['frontpage-nosto-1', 'frontpage-nosto-2']} />
```

#### NostoHome

- The NostoHome component needs to be added on the home/front page.
- It loads the campaigns for all the Nosto placements on the page.
- No props required.
- Must be added at the end of all Nosto components on the page. 
- This is a page-specific tag. There are other page-specific components described later in this doc.

```jsx
// app/routes/($locale)._index.jsx

import { NostoHome, NostoPlacement } from "@nosto/shopify-hydrogen";

function Homepage() {
  return (
    <>
      ...
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-2" />
      <NostoHome />
    </>
  );
}
```

#### NostoProduct

- The NostoProduct component needs to be added on product pages.
- It loads the campaigns for all the `<NostoPlacement>`s on the page.
- Pass the product ID via the `product` prop
- For Nosto tagging, pass the product data via the `tagging` prop. This allows Nosto to better personalise the result served to the page.
- Must be added at the end of all Nosto components on the page.

```jsx
// app/routes/($locale).products.$productHandle.jsx

import { NostoProduct, NostoPlacement } from '@nosto/shopify-hydrogen';

export default function Product() {

  ...
  const { product } = useLoaderData();

  let nostoProductId = product?.id?.split('/');
  nostoProductId && (nostoProductId = nostoProductId[nostoProductId.length - 1]);

  return (
      <>
        ...
        <NostoPlacement id="productpage-nosto-1" />
        <NostoPlacement id="productpage-nosto-2" />
        <NostoProduct product={nostoProductId} tagging={product} />        
      </>
  );
}
```

#### NostoCategory

- The NostoCategory component needs to be added on collection pages.
- It loads the campaigns for all the Nosto placements on the page.
- Pass the collection title via the `category` prop.
- Must be added at the end of all Nosto components on the page.

```jsx
// app/routes/($locale).collections.$collectionHandle.jsx

import { NostoCategory, NostoPlacement } from "@nosto/shopify-hydrogen";

export default function Collection() {

  const { collection } = useLoaderData();

  return (
    <>
      ...
      <NostoPlacement id="categorypage-nosto-1" />
      <NostoPlacement id="categorypage-nosto-2" />
      <NostoCategory category={collection.title} />
    </>
  );
}
```

#### NostoSearch

- The NostoSearch component needs to be added on the search page.
- It loads the campaigns for all the Nosto placements on the page.
- Pass the search term via the `query` prop.
- Must be added at the end of all Nosto components on the page.

```jsx
// app/routes/($locale).search.jsx

import { NostoSearch, NostoPlacement } from "@nosto/shopify-hydrogen";

export default function Search() {

  const { searchTerm } = useLoaderData();  

  return (
    <>
      ...
      <NostoPlacement id="searchpage-nosto-1" />
      <NostoPlacement id="searchpage-nosto-2" />
      <NostoSearch query={searchTerm ? decodeURI(searchTerm) : ""} />
    <>
  );
}
```

#### NostoOther

- The NostoOther component needs to be added on pages with no specific page type.
- It loads the campaigns for all the Nosto placements on the page.
- No props required.
- Must be added at the end of all Nosto components on the page.

```jsx
import { NostoOther, NostoPlacement } from "@nosto/shopify-hydrogen";

function OtherPage() {
  return (
    <>
      ...
      <NostoPlacement id="other-nosto-1" />
      <NostoPlacement id="other-nosto-2" />
      <NostoOther />
    </>
  );
}
```

#### NostoCheckout

- The NostoCheckout component needs to be added on the cart page.
- It loads the campaigns for all the Nosto placements on the page.
- No props required.
- Must be added at the end of all Nosto components on the page.
- Order details are automatically passed with the help of the Nosto script that is loaded on the page already. Once the user is taken back to the website post-payment, this order information is logged internally. 

```jsx
// app/components/Cart.jsx

import { NostoCheckout, NostoPlacement } from "@nosto/shopify-hydrogen";

export function Cart({ layout, onClose, cart }) {

  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />

      {/* Render specific Nosto slot when there are items in cart: */}
      {linesCount && (<NostoPlacement id="cartpage-nosto-1" />)}

      <NostoCheckout />
    </>
  );
}

export function CartEmpty({ hidden = false}) {

  return (
    <div>
      ...

      {/* Render specific Nosto slot when cart is empty: */}
      {!hidden && (<NostoPlacement id="cartpage-nosto-2" />)}

    </div>
  );
}
```

#### Nosto404

- The Nosto404 component needs to be added on 404/not found pages.
- It loads the campaigns for all the Nosto placements on the page.
- No props required.
- Must be added at the end of all Nosto components on the page.
- Make sure to wrap NostoProvider around ErrorBoundary inside root.jsx

```jsx
// app/components/NotFound.jsx

import { Nosto404, NostoPlacement } from "@nosto/shopify-hydrogen";

export function NotFound() {
  return (
    <>
      ...
      <NostoPlacement id="notfound-nosto-1" />
      <NostoPlacement id="notfound-nosto-2" />
      <Nosto404 />
    </>
  );
}
```



### Feedback

If you've found a feature missing or you would like to report an issue, simply [open up an issue](https://github.com/nosto/shopify-hydrogen/issues/new) and let us know. 

We're always collecting feedback and learning from your use-cases. If you find yourself customising widgets and forking the repo to make patches - do drop a message. We'd love to know more and understand how we can make this library even better for you.


## Authors

- **Dominik Gilg** - [dominikgilg](https://github.com/dominikgilg)

See also the list of [contributors](https://github.com/Nosto/shopify-hydrogen/contributors) who participated in this project.

## License

MIT License © Nosto Solutions
