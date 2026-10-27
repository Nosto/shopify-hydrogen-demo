import {createRequestHandler, RouterContextProvider} from 'react-router';
import * as serverBuild from 'virtual:react-router/server-build';

import {envContext} from '~/lib/env';

const handleRequest = createRequestHandler(serverBuild, process.env.NODE_ENV);

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const routerContext = new RouterContextProvider();
      routerContext.cache = await caches.open('hydrogen');
      routerContext.set(envContext, env);
      routerContext.waitUntil =
        executionContext.waitUntil.bind(executionContext);
      return await handleRequest(request, routerContext as never);
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
