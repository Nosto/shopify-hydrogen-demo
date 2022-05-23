# Hydrogen App

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

## What's in this template

- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Playwright](https://playwright.dev)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Javascript linting with [ESLint](https://eslint.org) and the Hydrogen [ESLint plugin](https://github.com/Shopify/hydrogen/tree/main/packages/eslint-plugin)
- CSS linting with [Stylelint](https://stylelint.io)

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

## SET UP STOREFRONT API TOKEN AND DOMAIN

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

## MODIFY VITE.CONFIG FILE TO ACCEP EXTERNAL CLIENT COMPONENt IMPORTS FROM @NOSTO

You need to adjust the Vite config file to make Vite consider the Nosto React components as external client components and treat them accordingly when rendering the app.
Pass ssr.noExternal: [‘@nosto/nosto-react‘] inside the vite.config.js of your Hydrogen app:

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
