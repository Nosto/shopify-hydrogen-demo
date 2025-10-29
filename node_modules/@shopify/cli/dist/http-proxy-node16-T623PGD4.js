import {
  require_src
} from "./chunk-UMUTXITN.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    Object.create && (Events.prototype = /* @__PURE__ */ Object.create(null), new Events().__proto__ || (prefix = !1));
    function EE(fn, context, once) {
      this.fn = fn, this.context = context, this.once = once || !1;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn != "function")
        throw new TypeError("The listener must be a function");
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      return emitter._events[evt] ? emitter._events[evt].fn ? emitter._events[evt] = [emitter._events[evt], listener] : emitter._events[evt].push(listener) : (emitter._events[evt] = listener, emitter._eventsCount++), emitter;
    }
    function clearEvent(emitter, evt) {
      --emitter._eventsCount === 0 ? emitter._events = new Events() : delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events(), this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events)
        has.call(events, name) && names.push(prefix ? name.slice(1) : name);
      return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
    };
    EventEmitter.prototype.listeners = function(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)
        ee[i] = handlers[i].fn;
      return ee;
    };
    EventEmitter.prototype.listenerCount = function(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      return listeners ? listeners.fn ? 1 : listeners.length : 0;
    };
    EventEmitter.prototype.emit = function(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return !1;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), len) {
          case 1:
            return listeners.fn.call(listeners.context), !0;
          case 2:
            return listeners.fn.call(listeners.context, a1), !0;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), !0;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), !0;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++)
          args[i - 1] = arguments[i];
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++)
          switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++)
                args[j - 1] = arguments[j];
              listeners[i].fn.apply(listeners[i].context, args);
          }
      }
      return !0;
    };
    EventEmitter.prototype.on = function(event, fn, context) {
      return addListener(this, event, fn, context, !1);
    };
    EventEmitter.prototype.once = function(event, fn, context) {
      return addListener(this, event, fn, context, !0);
    };
    EventEmitter.prototype.removeListener = function(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn)
        return clearEvent(this, evt), this;
      var listeners = this._events[evt];
      if (listeners.fn)
        listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context) && clearEvent(this, evt);
      else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++)
          (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
        events.length ? this._events[evt] = events.length === 1 ? events[0] : events : clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(event) {
      var evt;
      return event ? (evt = prefix ? prefix + event : event, this._events[evt] && clearEvent(this, evt)) : (this._events = new Events(), this._eventsCount = 0), this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    typeof module < "u" && (module.exports = EventEmitter);
  }
});

// ../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = function(port, protocol) {
      if (protocol = protocol.split(":")[0], port = +port, !port) return !1;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return !1;
      }
      return port !== 0;
    };
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/common.js"(exports) {
    init_cjs_shims();
    var common = exports, url = __require("url"), extend = Object.assign, required = require_requires_port(), upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i, isSSL = /^https|wss/;
    common.isSSL = isSSL;
    common.setupOutgoing = function(outgoing, options, req, forward) {
      outgoing.port = options[forward || "target"].port || (isSSL.test(options[forward || "target"].protocol) ? 443 : 80), [
        "host",
        "hostname",
        "socketPath",
        "pfx",
        "key",
        "passphrase",
        "cert",
        "ca",
        "ciphers",
        "secureProtocol"
      ].forEach(
        function(e) {
          outgoing[e] = options[forward || "target"][e];
        }
      ), outgoing.method = options.method || req.method, outgoing.headers = extend({}, req.headers), options.headers && extend(outgoing.headers, options.headers), options.auth && (outgoing.auth = options.auth), options.ca && (outgoing.ca = options.ca), isSSL.test(options[forward || "target"].protocol) && (outgoing.rejectUnauthorized = typeof options.secure > "u" ? !0 : options.secure), outgoing.agent = options.agent || !1, outgoing.localAddress = options.localAddress, outgoing.agent || (outgoing.headers = outgoing.headers || {}, (typeof outgoing.headers.connection != "string" || !upgradeHeader.test(outgoing.headers.connection)) && (outgoing.headers.connection = "close"));
      var target = options[forward || "target"], targetPath = target && options.prependPath !== !1 && target.path || "", outgoingPath = options.toProxy ? req.url : url.parse(req.url).path || "";
      return outgoingPath = options.ignorePath ? "" : outgoingPath, outgoing.path = common.urlJoin(targetPath, outgoingPath), options.changeOrigin && (outgoing.headers.host = required(outgoing.port, options[forward || "target"].protocol) && !hasPort(outgoing.host) ? outgoing.host + ":" + outgoing.port : outgoing.host), outgoing;
    };
    common.setupSocket = function(socket) {
      return socket.setTimeout(0), socket.setNoDelay(!0), socket.setKeepAlive(!0, 0), socket;
    };
    common.getPort = function(req) {
      var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : "";
      return res ? res[1] : common.hasEncryptedConnection(req) ? "443" : "80";
    };
    common.hasEncryptedConnection = function(req) {
      return !!(req.connection.encrypted || req.connection.pair);
    };
    common.urlJoin = function() {
      var args = Array.prototype.slice.call(arguments), queryParams = [], queryParamRaw = "", retSegs;
      return args.forEach((url2, index) => {
        var qpStart = url2.indexOf("?");
        qpStart !== -1 && (queryParams.push(url2.substring(qpStart + 1)), args[index] = url2.substring(0, qpStart));
      }), queryParamRaw = queryParams.filter(Boolean).join("&"), retSegs = args.filter(Boolean).join("/").replace(/\/+/g, "/").replace("http:/", "http://").replace("https:/", "https://"), queryParamRaw ? retSegs + "?" + queryParamRaw : retSegs;
    };
    common.rewriteCookieProperty = function rewriteCookieProperty(header, config, property) {
      return Array.isArray(header) ? header.map(function(headerElement) {
        return rewriteCookieProperty(headerElement, config, property);
      }) : header.replace(new RegExp("(;\\s*" + property + "=)([^;]+)", "i"), function(match, prefix, previousValue) {
        var newValue;
        if (previousValue in config)
          newValue = config[previousValue];
        else if ("*" in config)
          newValue = config["*"];
        else
          return match;
        return newValue ? prefix + newValue : "";
      });
    };
    function hasPort(host) {
      return !!~host.indexOf(":");
    }
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/web-outgoing.js
var require_web_outgoing = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/web-outgoing.js"(exports, module) {
    init_cjs_shims();
    var url = __require("url"), common = require_common(), redirectRegex = /^201|30(1|2|7|8)$/;
    module.exports = {
      // <--
      /**
       * If is a HTTP 1.0 request, remove chunk headers
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {proxyResponse} Res Response object from the proxy request
       *
       * @api private
       */
      removeChunked: function(req, res, proxyRes) {
        req.httpVersion === "1.0" && delete proxyRes.headers["transfer-encoding"];
      },
      /**
       * If is a HTTP 1.0 request, set the correct connection header
       * or if connection header not present, then use `keep-alive`
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {proxyResponse} Res Response object from the proxy request
       *
       * @api private
       */
      setConnection: function(req, res, proxyRes) {
        req.httpVersion === "1.0" ? proxyRes.headers.connection = req.headers.connection || "close" : req.httpVersion !== "2.0" && !proxyRes.headers.connection && (proxyRes.headers.connection = req.headers.connection || "keep-alive");
      },
      setRedirectHostRewrite: function(req, res, proxyRes, options) {
        if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite) && proxyRes.headers.location && redirectRegex.test(proxyRes.statusCode)) {
          var target = url.parse(options.target), u = url.parse(proxyRes.headers.location);
          if (target.host != u.host)
            return;
          options.hostRewrite ? u.host = options.hostRewrite : options.autoRewrite && (u.host = req.headers.host), options.protocolRewrite && (u.protocol = options.protocolRewrite), proxyRes.headers.location = u.format();
        }
      },
      /**
       * Copy headers from proxyResponse to response
       * set each header in response object.
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {proxyResponse} Res Response object from the proxy request
       * @param {Object} Options options.cookieDomainRewrite: Config to rewrite cookie domain
       *
       * @api private
       */
      writeHeaders: function(req, res, proxyRes, options) {
        var rewriteCookieDomainConfig = options.cookieDomainRewrite, rewriteCookiePathConfig = options.cookiePathRewrite, preserveHeaderKeyCase = options.preserveHeaderKeyCase, rawHeaderKeyMap, setHeader = function(key2, header) {
          header != null && (rewriteCookieDomainConfig && key2.toLowerCase() === "set-cookie" && (header = common.rewriteCookieProperty(header, rewriteCookieDomainConfig, "domain")), rewriteCookiePathConfig && key2.toLowerCase() === "set-cookie" && (header = common.rewriteCookieProperty(header, rewriteCookiePathConfig, "path")), res.setHeader(String(key2).trim(), header));
        };
        if (typeof rewriteCookieDomainConfig == "string" && (rewriteCookieDomainConfig = { "*": rewriteCookieDomainConfig }), typeof rewriteCookiePathConfig == "string" && (rewriteCookiePathConfig = { "*": rewriteCookiePathConfig }), preserveHeaderKeyCase && proxyRes.rawHeaders != null) {
          rawHeaderKeyMap = {};
          for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
            var key = proxyRes.rawHeaders[i];
            rawHeaderKeyMap[key.toLowerCase()] = key;
          }
        }
        Object.keys(proxyRes.headers).forEach(function(key2) {
          var header = proxyRes.headers[key2];
          preserveHeaderKeyCase && rawHeaderKeyMap && (key2 = rawHeaderKeyMap[key2] || key2), setHeader(key2, header);
        });
      },
      /**
       * Set the statusCode from the proxyResponse
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {proxyResponse} Res Response object from the proxy request
       *
       * @api private
       */
      writeStatusCode: function(req, res, proxyRes) {
        proxyRes.statusMessage ? (res.statusCode = proxyRes.statusCode, res.statusMessage = proxyRes.statusMessage) : res.statusCode = proxyRes.statusCode;
      }
    };
  }
});

// ../../node_modules/.pnpm/follow-redirects@1.15.9/node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "../../node_modules/.pnpm/follow-redirects@1.15.9/node_modules/follow-redirects/debug.js"(exports, module) {
    init_cjs_shims();
    var debug;
    module.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch {
        }
        typeof debug != "function" && (debug = function() {
        });
      }
      debug.apply(null, arguments);
    };
  }
});

// ../../node_modules/.pnpm/follow-redirects@1.15.9/node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "../../node_modules/.pnpm/follow-redirects@1.15.9/node_modules/follow-redirects/index.js"(exports, module) {
    init_cjs_shims();
    var url = __require("url"), URL = url.URL, http = __require("http"), https = __require("https"), Writable = __require("stream").Writable, assert = __require("assert"), debug = require_debug();
    (function() {
      var looksLikeNode = typeof process < "u", looksLikeBrowser = typeof window < "u" && typeof document < "u", looksLikeV8 = isFunction(Error.captureStackTrace);
      !looksLikeNode && (looksLikeBrowser || !looksLikeV8) && console.warn("The follow-redirects package should be excluded from browser builds.");
    })();
    var useNativeURL = !1;
    try {
      assert(new URL(""));
    } catch (error) {
      useNativeURL = error.code === "ERR_INVALID_URL";
    }
    var preservedUrlFields = [
      "auth",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "hash"
    ], events = ["abort", "aborted", "connect", "error", "socket", "timeout"], eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    ), RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    ), TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded",
      RedirectionError
    ), MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    ), WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    ), destroy = Writable.prototype.destroy || noop;
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this), this._sanitizeOptions(options), this._options = options, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], responseCallback && this.on("response", responseCallback);
      var self = this;
      this._onNativeResponse = function(response) {
        try {
          self._processResponse(response);
        } catch (cause) {
          self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
        }
      }, this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      destroyRequest(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
    };
    RedirectableRequest.prototype.destroy = function(error) {
      return destroyRequest(this._currentRequest, error), destroy.call(this, error), this;
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending)
        throw new WriteAfterEndError();
      if (!isString(data) && !isBuffer(data))
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      if (isFunction(encoding) && (callback = encoding, encoding = null), data.length === 0) {
        callback && callback();
        return;
      }
      this._requestBodyLength + data.length <= this._options.maxBodyLength ? (this._requestBodyLength += data.length, this._requestBodyBuffers.push({ data, encoding }), this._currentRequest.write(data, encoding, callback)) : (this.emit("error", new MaxBodyLengthExceededError()), this.abort());
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction(data) ? (callback = data, data = encoding = null) : isFunction(encoding) && (callback = encoding, encoding = null), !data)
        this._ended = this._ending = !0, this._currentRequest.end(null, null, callback);
      else {
        var self = this, currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = !0, currentRequest.end(null, null, callback);
        }), this._ending = !0;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value, this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name], this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs), socket.removeListener("timeout", socket.destroy), socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        self._timeout && clearTimeout(self._timeout), self._timeout = setTimeout(function() {
          self.emit("timeout"), clearTimer();
        }, msecs), destroyOnTimeout(socket);
      }
      function clearTimer() {
        self._timeout && (clearTimeout(self._timeout), self._timeout = null), self.removeListener("abort", clearTimer), self.removeListener("error", clearTimer), self.removeListener("response", clearTimer), self.removeListener("close", clearTimer), callback && self.removeListener("timeout", callback), self.socket || self._currentRequest.removeListener("socket", startTimer);
      }
      return callback && this.on("timeout", callback), this.socket ? startTimer(this.socket) : this._currentRequest.once("socket", startTimer), this.on("socket", destroyOnTimeout), this.on("abort", clearTimer), this.on("error", clearTimer), this.on("response", clearTimer), this.on("close", clearTimer), this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (options.headers || (options.headers = {}), options.host && (options.hostname || (options.hostname = options.host), delete options.host), !options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        searchPos < 0 ? options.pathname = options.path : (options.pathname = options.path.substring(0, searchPos), options.search = options.path.substring(searchPos));
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol, nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol)
        throw new TypeError("Unsupported protocol " + protocol);
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events)
        request.on(event, eventHandlers[event]);
      if (this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : (
        // When making a request to a proxy, […]
        // a client MUST send the target URI in absolute-form […].
        this._options.path
      ), this._isRedirect) {
        var i = 0, self = this, buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest)
            if (error)
              self.emit("error", error);
            else if (i < buffers.length) {
              var buffer = buffers[i++];
              request.finished || request.write(buffer.data, buffer.encoding, writeNext);
            } else self._ended && request.end();
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      this._options.trackRedirects && this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode
      });
      var location = response.headers.location;
      if (!location || this._options.followRedirects === !1 || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl, response.redirects = this._redirects, this.emit("response", response), this._requestBodyBuffers = [];
        return;
      }
      if (destroyRequest(this._currentRequest), response.destroy(), ++this._redirectCount > this._options.maxRedirects)
        throw new TooManyRedirectsError();
      var requestHeaders, beforeRedirect = this._options.beforeRedirect;
      beforeRedirect && (requestHeaders = Object.assign({
        // The Host header was set by nativeProtocol.request
        Host: response.req.getHeader("host")
      }, this._options.headers));
      var method = this._options.method;
      ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], removeMatchingHeaders(/^content-/i, this._options.headers));
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers), currentUrlParts = parseUrl(this._currentUrl), currentHost = currentHostHeader || currentUrlParts.host, currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost })), redirectUrl = resolveUrl(location, currentUrl);
      if (debug("redirecting to", redirectUrl.href), this._isRedirect = !0, spreadUrlObject(redirectUrl, this._options), (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) && removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        }, requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails), this._sanitizeOptions(this._options);
      }
      this._performRequest();
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10485760
      }, nativeProtocols = {};
      return Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":", nativeProtocol = nativeProtocols[protocol] = protocols[scheme], wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          return isURL(input) ? input = spreadUrlObject(input) : isString(input) ? input = spreadUrlObject(parseUrl(input)) : (callback = options, options = validateUrl(input), input = { protocol }), isFunction(options) && (callback = options, options = null), options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options), options.nativeProtocols = nativeProtocols, !isString(options.host) && !isString(options.hostname) && (options.hostname = "::1"), assert.equal(options.protocol, protocol, "protocol mismatch"), debug("options", options), new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          return wrappedRequest.end(), wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: !0, enumerable: !0, writable: !0 },
          get: { value: get, configurable: !0, enumerable: !0, writable: !0 }
        });
      }), exports2;
    }
    function noop() {
    }
    function parseUrl(input) {
      var parsed;
      if (useNativeURL)
        parsed = new URL(input);
      else if (parsed = validateUrl(url.parse(input)), !isString(parsed.protocol))
        throw new InvalidUrlError({ input });
      return parsed;
    }
    function resolveUrl(relative, base) {
      return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
    }
    function validateUrl(input) {
      if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname))
        throw new InvalidUrlError({ input: input.href || input });
      if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host))
        throw new InvalidUrlError({ input: input.href || input });
      return input;
    }
    function spreadUrlObject(urlObject, target) {
      var spread = target || {};
      for (var key of preservedUrlFields)
        spread[key] = urlObject[key];
      return spread.hostname.startsWith("[") && (spread.hostname = spread.hostname.slice(1, -1)), spread.port !== "" && (spread.port = Number(spread.port)), spread.path = spread.search ? spread.pathname + spread.search : spread.pathname, spread;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers)
        regex.test(header) && (lastValue = headers[header], delete headers[header]);
      return lastValue === null || typeof lastValue > "u" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        isFunction(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, properties || {}), this.code = code, this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      return CustomError.prototype = new (baseClass || Error)(), Object.defineProperties(CustomError.prototype, {
        constructor: {
          value: CustomError,
          enumerable: !1
        },
        name: {
          value: "Error [" + code + "]",
          enumerable: !1
        }
      }), CustomError;
    }
    function destroyRequest(request, error) {
      for (var event of events)
        request.removeListener(event, eventHandlers[event]);
      request.on("error", noop), request.destroy(error);
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value == "string" || value instanceof String;
    }
    function isFunction(value) {
      return typeof value == "function";
    }
    function isBuffer(value) {
      return typeof value == "object" && "length" in value;
    }
    function isURL(value) {
      return URL && value instanceof URL;
    }
    module.exports = wrap({ http, https });
    module.exports.wrap = wrap;
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/web-incoming.js
var require_web_incoming = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/web-incoming.js"(exports, module) {
    init_cjs_shims();
    var httpNative = __require("http"), httpsNative = __require("https"), web_o = require_web_outgoing(), common = require_common(), followRedirects = require_follow_redirects();
    web_o = Object.keys(web_o).map(function(pass) {
      return web_o[pass];
    });
    var nativeAgents = { http: httpNative, https: httpsNative };
    var supportsAbortedEvent = function() {
      var ver = process.versions.node.split(".").map(Number);
      return ver[0] <= 14 || ver[0] === 15 && ver[1] <= 4;
    }();
    module.exports = {
      /**
       * Sets `content-length` to '0' if request is of DELETE type.
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      deleteLength: function(req, res, options) {
        (req.method === "DELETE" || req.method === "OPTIONS") && !req.headers["content-length"] && (req.headers["content-length"] = "0", delete req.headers["transfer-encoding"]);
      },
      /**
       * Sets timeout in request socket if it was specified in options.
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      timeout: function(req, res, options) {
        options.timeout && req.socket.setTimeout(options.timeout);
      },
      /**
       * Sets `x-forwarded-*` headers if specified in config.
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      XHeaders: function(req, res, options) {
        if (options.xfwd) {
          var encrypted = req.isSpdy || common.hasEncryptedConnection(req), values = {
            for: req.connection.remoteAddress || req.socket.remoteAddress,
            port: common.getPort(req),
            proto: encrypted ? "https" : "http"
          };
          ["for", "port", "proto"].forEach(function(header) {
            req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
          }), req.headers["x-forwarded-host"] = req.headers["x-forwarded-host"] || req.headers.host || "";
        }
      },
      /**
       * Does the actual proxying. If `forward` is enabled fires up
       * a ForwardStream, same happens for ProxyStream. The request
       * just dies otherwise.
       *
       * @param {ClientRequest} Req Request object
       * @param {IncomingMessage} Res Response object
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      stream: function(req, res, options, _, server, clb) {
        server.emit("start", req, res, options.target || options.forward);
        var agents = options.followRedirects ? followRedirects : nativeAgents, http = agents.http, https = agents.https;
        if (options.forward) {
          var forwardReq = (options.forward.protocol === "https:" ? https : http).request(
            common.setupOutgoing(options.ssl || {}, options, req, "forward")
          ), forwardError = createErrorHandler(forwardReq, options.forward);
          if (req.on("error", forwardError), forwardReq.on("error", forwardError), (options.buffer || req).pipe(forwardReq), !options.target)
            return res.end();
        }
        var proxyReq = (options.target.protocol === "https:" ? https : http).request(
          common.setupOutgoing(options.ssl || {}, options, req)
        );
        proxyReq.on("socket", function(socket) {
          server && !proxyReq.getHeader("expect") && server.emit("proxyReq", proxyReq, req, res, options);
        }), options.proxyTimeout && proxyReq.setTimeout(options.proxyTimeout, function() {
          proxyReq.abort();
        }), supportsAbortedEvent ? req.on("aborted", function() {
          proxyReq.abort();
        }) : res.on("close", function() {
          var aborted = !res.writableFinished;
          aborted && proxyReq.abort();
        });
        var proxyError = createErrorHandler(proxyReq, options.target);
        req.on("error", proxyError), proxyReq.on("error", proxyError);
        function createErrorHandler(proxyReq2, url) {
          return function(err) {
            if (req.socket.destroyed && err.code === "ECONNRESET")
              return server.emit("econnreset", err, req, res, url), proxyReq2.abort();
            clb ? clb(err, req, res, url) : server.emit("error", err, req, res, url);
          };
        }
        (options.buffer || req).pipe(proxyReq), proxyReq.on("response", function(proxyRes) {
          if (server && server.emit("proxyRes", proxyRes, req, res), !res.headersSent && !options.selfHandleResponse)
            for (var i = 0; i < web_o.length && !web_o[i](req, res, proxyRes, options); i++)
              ;
          res.finished ? server && server.emit("end", req, res, proxyRes) : (proxyRes.on("end", function() {
            server && server.emit("end", req, res, proxyRes);
          }), options.selfHandleResponse || proxyRes.pipe(res));
        });
      }
    };
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/ws-incoming.js
var require_ws_incoming = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/passes/ws-incoming.js"(exports, module) {
    init_cjs_shims();
    var http = __require("http"), https = __require("https"), common = require_common();
    module.exports = {
      /**
       * WebSocket requests must have the `GET` method and
       * the `upgrade:websocket` header
       *
       * @param {ClientRequest} Req Request object
       * @param {Socket} Websocket
       *
       * @api private
       */
      checkMethodAndHeader: function(req, socket) {
        if (req.method !== "GET" || !req.headers.upgrade || req.headers.upgrade.toLowerCase() !== "websocket")
          return socket.destroy(), !0;
      },
      /**
       * Sets `x-forwarded-*` headers if specified in config.
       *
       * @param {ClientRequest} Req Request object
       * @param {Socket} Websocket
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      XHeaders: function(req, socket, options) {
        if (options.xfwd) {
          var values = {
            for: req.connection.remoteAddress || req.socket.remoteAddress,
            port: common.getPort(req),
            proto: common.hasEncryptedConnection(req) ? "wss" : "ws"
          };
          ["for", "port", "proto"].forEach(function(header) {
            req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
          });
        }
      },
      /**
       * Does the actual proxying. Make the request and upgrade it
       * send the Switching Protocols request and pipe the sockets.
       *
       * @param {ClientRequest} Req Request object
       * @param {Socket} Websocket
       * @param {Object} Options Config object passed to the proxy
       *
       * @api private
       */
      stream: function(req, socket, options, head, server, clb) {
        var createHttpHeader = function(line, headers) {
          return Object.keys(headers).reduce(function(head2, key) {
            var value = headers[key];
            if (!Array.isArray(value))
              return head2.push(key + ": " + value), head2;
            for (var i = 0; i < value.length; i++)
              head2.push(key + ": " + value[i]);
            return head2;
          }, [line]).join(`\r
`) + `\r
\r
`;
        };
        common.setupSocket(socket), head && head.length && socket.unshift(head);
        var proxyReq = (common.isSSL.test(options.target.protocol) ? https : http).request(
          common.setupOutgoing(options.ssl || {}, options, req)
        );
        return server && server.emit("proxyReqWs", proxyReq, req, socket, options, head), proxyReq.on("error", onOutgoingError), proxyReq.on("response", function(res) {
          res.upgrade || (socket.write(createHttpHeader("HTTP/" + res.httpVersion + " " + res.statusCode + " " + res.statusMessage, res.headers)), res.pipe(socket));
        }), proxyReq.on("upgrade", function(proxyRes, proxySocket, proxyHead) {
          proxySocket.on("error", onOutgoingError), proxySocket.on("end", function() {
            server.emit("close", proxyRes, proxySocket, proxyHead);
          }), socket.on("error", function() {
            proxySocket.destroy();
          }), common.setupSocket(proxySocket), proxyHead && proxyHead.length && proxySocket.unshift(proxyHead), socket.write(createHttpHeader("HTTP/1.1 101 Switching Protocols", proxyRes.headers)), proxySocket.pipe(socket).pipe(proxySocket), server.emit("open", proxySocket), server.emit("proxySocket", proxySocket);
        }), proxyReq.end();
        function onOutgoingError(err) {
          clb ? clb(err, req, socket) : server.emit("error", err, req, socket), socket.end();
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/index.js
var require_http_proxy = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy/index.js"(exports, module) {
    init_cjs_shims();
    var httpProxy = module.exports, extend = Object.assign, parse_url = __require("url").parse, EE3 = require_eventemitter3(), http = __require("http"), https = __require("https"), web = require_web_incoming(), ws = require_ws_incoming();
    httpProxy.Server = ProxyServer;
    function createRightProxy(type) {
      return function(options) {
        return function(req, res) {
          var passes = type === "ws" ? this.wsPasses : this.webPasses, args = [].slice.call(arguments), cntr = args.length - 1, head, cbl;
          typeof args[cntr] == "function" && (cbl = args[cntr], cntr--);
          var requestOptions = options;
          if (!(args[cntr] instanceof Buffer) && args[cntr] !== res && (requestOptions = extend({}, options), extend(requestOptions, args[cntr]), cntr--), args[cntr] instanceof Buffer && (head = args[cntr]), ["target", "forward"].forEach(function(e) {
            typeof requestOptions[e] == "string" && (requestOptions[e] = parse_url(requestOptions[e]));
          }), !requestOptions.target && !requestOptions.forward)
            return this.emit("error", new Error("Must provide a proper URL as target"));
          for (var i = 0; i < passes.length && !passes[i](req, res, requestOptions, head, this, cbl); i++)
            ;
        };
      };
    }
    httpProxy.createRightProxy = createRightProxy;
    function ProxyServer(options) {
      EE3.call(this), options = options || {}, options.prependPath = options.prependPath !== !1, this.web = this.proxyRequest = createRightProxy("web")(options), this.ws = this.proxyWebsocketRequest = createRightProxy("ws")(options), this.options = options, this.webPasses = Object.keys(web).map(function(pass) {
        return web[pass];
      }), this.wsPasses = Object.keys(ws).map(function(pass) {
        return ws[pass];
      }), this.on("error", this.onError, this);
    }
    __require("util").inherits(ProxyServer, EE3);
    ProxyServer.prototype.onError = function(err) {
      if (this.listeners("error").length === 1)
        throw err;
    };
    ProxyServer.prototype.listen = function(port, hostname) {
      var self = this, closure = function(req, res) {
        self.web(req, res);
      };
      return this._server = this.options.ssl ? https.createServer(this.options.ssl, closure) : http.createServer(closure), this.options.ws && this._server.on("upgrade", function(req, socket, head) {
        self.ws(req, socket, head);
      }), this._server.listen(port, hostname), this;
    };
    ProxyServer.prototype.close = function(callback) {
      var self = this;
      this._server && this._server.close(done);
      function done() {
        self._server = null, callback && callback.apply(null, arguments);
      }
    };
    ProxyServer.prototype.before = function(type, passName, callback) {
      if (type !== "ws" && type !== "web")
        throw new Error("type must be `web` or `ws`");
      var passes = type === "ws" ? this.wsPasses : this.webPasses, i = !1;
      if (passes.forEach(function(v, idx) {
        v.name === passName && (i = idx);
      }), i === !1) throw new Error("No such pass");
      passes.splice(i, 0, callback);
    };
    ProxyServer.prototype.after = function(type, passName, callback) {
      if (type !== "ws" && type !== "web")
        throw new Error("type must be `web` or `ws`");
      var passes = type === "ws" ? this.wsPasses : this.webPasses, i = !1;
      if (passes.forEach(function(v, idx) {
        v.name === passName && (i = idx);
      }), i === !1) throw new Error("No such pass");
      passes.splice(i++, 0, callback);
    };
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy.js
var require_http_proxy2 = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/lib/http-proxy.js"(exports, module) {
    init_cjs_shims();
    var ProxyServer = require_http_proxy().Server;
    function createProxyServer(options) {
      return new ProxyServer(options);
    }
    ProxyServer.createProxyServer = createProxyServer;
    ProxyServer.createServer = createProxyServer;
    ProxyServer.createProxy = createProxyServer;
    module.exports = ProxyServer;
  }
});

// ../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/index.js
var require_http_proxy_node16 = __commonJS({
  "../../node_modules/.pnpm/http-proxy-node16@1.0.6/node_modules/http-proxy-node16/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = require_http_proxy2();
  }
});
export default require_http_proxy_node16();
/*! Bundled license information:

http-proxy-node16/lib/http-proxy/passes/web-outgoing.js:
http-proxy-node16/lib/http-proxy/passes/web-incoming.js:
  (*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   *)

http-proxy-node16/lib/http-proxy/passes/ws-incoming.js:
  (*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, socket, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   *)

http-proxy-node16/index.js:
  (*!
   * Caron dimonio, con occhi di bragia
   * loro accennando, tutte le raccoglie;
   * batte col remo qualunque s’adagia 
   *
   * Charon the demon, with the eyes of glede,
   * Beckoning to them, collects them all together,
   * Beats with his oar whoever lags behind
   *          
   *          Dante - The Divine Comedy (Canto III)
   *)
*/
//# sourceMappingURL=http-proxy-node16-T623PGD4.js.map
