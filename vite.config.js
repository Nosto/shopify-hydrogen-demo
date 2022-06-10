import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    hydrogen()
  ],
  optimizeDeps: {
    include: ['@headlessui/react'],
    exclude: ['@nosto/nosto-react']
  },
  test: {
    globals: true,
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  // @ts-ignore
  ssr: {noExternal: ['@nosto/nosto-react']}
});
