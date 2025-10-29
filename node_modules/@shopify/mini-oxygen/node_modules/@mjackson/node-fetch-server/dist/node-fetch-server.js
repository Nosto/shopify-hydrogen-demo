// src/lib/read-stream.ts
async function* readStream(stream) {
  let reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done)
      break;
    yield value;
  }
}

// src/lib/request-listener.ts
function createRequestListener(handler, options) {
  let onError = options?.onError ?? defaultErrorHandler;
  return async (req, res) => {
    let request = createRequest(req, res, options);
    let client = {
      address: req.socket.remoteAddress,
      family: req.socket.remoteFamily,
      port: req.socket.remotePort
    };
    let response;
    try {
      response = await handler(request, client);
    } catch (error) {
      try {
        response = await onError(error) ?? internalServerError();
      } catch (error2) {
        console.error(`There was an error in the error handler: ${error2}`);
        response = internalServerError();
      }
    }
    await sendResponse(res, response);
  };
}
function defaultErrorHandler(error) {
  console.error(error);
  return internalServerError();
}
function internalServerError() {
  return new Response(
    // "Internal Server Error"
    new Uint8Array([
      73,
      110,
      116,
      101,
      114,
      110,
      97,
      108,
      32,
      83,
      101,
      114,
      118,
      101,
      114,
      32,
      69,
      114,
      114,
      111,
      114
    ]),
    {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    }
  );
}
function createRequest(req, res, options) {
  let controller = new AbortController();
  res.on("close", () => {
    controller.abort();
  });
  let method = req.method ?? "GET";
  let headers = createHeaders(req);
  let protocol = options?.protocol ?? ("encrypted" in req.socket && req.socket.encrypted ? "https:" : "http:");
  let host = options?.host ?? headers.get("Host") ?? "localhost";
  let url = new URL(req.url, `${protocol}//${host}`);
  let init = { method, headers, signal: controller.signal };
  if (method !== "GET" && method !== "HEAD") {
    init.body = new ReadableStream({
      start(controller2) {
        req.on("data", (chunk) => {
          controller2.enqueue(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
        });
        req.on("end", () => {
          controller2.close();
        });
      }
    });
    init.duplex = "half";
  }
  return new Request(url, init);
}
function createHeaders(req) {
  let headers = new Headers();
  let rawHeaders = req.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i].startsWith(":"))
      continue;
    headers.append(rawHeaders[i], rawHeaders[i + 1]);
  }
  return headers;
}
async function sendResponse(res, response) {
  let headers = {};
  for (let [key, value] of response.headers) {
    if (key in headers) {
      if (Array.isArray(headers[key])) {
        headers[key].push(value);
      } else {
        headers[key] = [headers[key], value];
      }
    } else {
      headers[key] = value;
    }
  }
  res.writeHead(response.status, headers);
  if (response.body != null && res.req.method !== "HEAD") {
    for await (let chunk of readStream(response.body)) {
      res.write(chunk);
    }
  }
  res.end();
}
export {
  createHeaders,
  createRequest,
  createRequestListener,
  sendResponse
};
//# sourceMappingURL=node-fetch-server.js.map
