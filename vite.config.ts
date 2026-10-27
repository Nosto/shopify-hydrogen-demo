import {defineConfig} from 'vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import {localHttps} from '@shopify/hydrogen/vite';
import tailwindcss from '@tailwindcss/vite';

const enabled =
  process.env.VITE_LOCAL_HTTPS === '1' ||
  process.env.npm_lifecycle_event === 'dev:https';

export default defineConfig({
  plugins: [localHttps({enabled}), tailwindcss(), ...oxygen(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
    // @nosto/shopify-hydrogen is linked with `file:` and ships its own copies of its peers.
    // Use one copy so React, React Router contexts and Hydrogen's branded types are shared.
    dedupe: ['react', 'react-dom', 'react-router', '@shopify/hydrogen'],
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/server',
        'react-dom/client',
        'react-router',
        'react-router > cookie',
        'react-router > set-cookie-parser'
      ],
    },
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev', '.ngrok.app'],
  },
});
