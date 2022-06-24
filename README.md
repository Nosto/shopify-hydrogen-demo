# Nosto Hydrogen Storefront

[Hydrogen](https://hydrogen.shopify.dev) is Shopify's React-based framework for building custom storefronts. This demo storefront shows how our [React component library](https://github.com/Nosto/nosto-react) can be integrated with a Hydrogen-based storefront.

Check out a [live demo](https://nosto-hydrogen.herokuapp.com/) of our storefront running against our own store. You can also check out this repository and connect it to your own store by following the [Getting started](#getting-started) section below.

> :warning: This project is a work-in-progress and does not yet provide 100% compatibility with all Nosto features. Full compatibility will be achieved in our 1.0.0 release planned for later this year.


## Getting started

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/stackblitz/templates/demo-store)

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

To create a new Hydrogen app, run:

```bash
npm init @shopify/hydrogen
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `npm run preview`:

```bash
npm run build
npm run preview
```

## Set up storefront API token and domain

Follow these instructions:
https://shopify.dev/custom-storefronts/hydrogen/getting-started/create#step-2-update-information-about-your-shopify-storefront

--> hydrogen.config.js:

```
export default {
  shopify: {
    storeDomain: 'YOUR_STORE_NAME.myshopify.com',
    storefrontToken: 'YOUR_STOREFRONT_ACCESS_TOKEN',
    storefrontApiVersion: '2022-07',
  },
};
```

## Modify vite.config file to accept external client component imports from @nosto

You need to adjust the Vite config file to make Vite consider the Nosto React components as external client components and treat them accordingly when rendering the app.
Pass `ssr.noExternal: [‘@nosto/nosto-react‘]` inside the vite.config.js of your Hydrogen app:

```
export default defineConfig({
  plugins: [hydrogen()],
  optimizeDeps: {include: ['@headlessui/react']},
  test: {
    globals: true,
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  ssr: {noExternal: ['@nosto/nosto-react']},
});
```
