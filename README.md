# Nosto Hydrogen Storefront

[Hydrogen](https://hydrogen.shopify.dev) is Shopify's React-based framework for building custom storefronts. This demo storefront shows how our [React component library](https://github.com/Nosto/nosto-react) can be integrated with a Hydrogen-based storefront.

Check out a [live demo](https://nosto-hydrogen.herokuapp.com/) of our storefront running against our own store. You can also check out this repository and connect it to your own store by following the [Getting started](#getting-started) section below.

> :warning: This project is a work-in-progress and does not yet provide 100% compatibility with all Nosto features. Full compatibility will be achieved in our 1.0.0 release planned for later this year.

## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

```bash
yarn
yarn dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `yarn preview`:

```bash
yarn build
yarn preview
```

## Building for production

```bash
yarn build
```

Then, you can run a local `server.js` using the production build with:

```bash
yarn serve
```

## Running tests

This project contains basic end-to-end (E2E) tests in the `/tests/e2e` folder powered by [Vitest](https://vitest.dev).

You can run tests in development, and they will automatically reload when you make changes to the component you provide to `hydrogen.watchForUpdates()`:

```bash
yarn test
```

To run tests in a continuous-integration (CI) environment like GitHub Actions:

```bash
yarn test:ci
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

## Modify vite.config file to accept external client component importds from @nosto

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
