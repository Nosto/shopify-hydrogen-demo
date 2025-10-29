import {
  __commonJS,
  __require,
  __toESM,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      !this.destroyed && this._writableState.finished && this.destroy();
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError), this.destroy(), this.listenerCount("error") === 0 && this.emit("error", err);
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = !0, duplex = new Duplex({
        ...options,
        autoDestroy: !1,
        emitClose: !1,
        objectMode: !1,
        writableObjectMode: !1
      });
      return ws.on("message", function(msg, isBinary) {
        let data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        duplex.push(data) || ws.pause();
      }), ws.once("error", function(err) {
        duplex.destroyed || (terminateOnDestroy = !1, duplex.destroy(err));
      }), ws.once("close", function() {
        duplex.destroyed || duplex.push(null);
      }), duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err), process.nextTick(emitClose, duplex);
          return;
        }
        let called = !1;
        ws.once("error", function(err2) {
          called = !0, callback(err2);
        }), ws.once("close", function() {
          called || callback(err), process.nextTick(emitClose, duplex);
        }), terminateOnDestroy && ws.terminate();
      }, duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function() {
            duplex._final(callback);
          });
          return;
        }
        ws._socket !== null && (ws._socket._writableState.finished ? (callback(), duplex._readableState.endEmitted && duplex.destroy()) : (ws._socket.once("finish", function() {
          callback();
        }), ws.close()));
      }, duplex._read = function() {
        ws.isPaused && ws.resume();
      }, duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      }, duplex.on("end", duplexOnEnd), duplex.on("error", duplexOnError), duplex;
    }
    module.exports = createWebSocketStream2;
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"], hasBlob = typeof Blob < "u";
    hasBlob && BINARY_TYPES.push("blob");
    module.exports = {
      BINARY_TYPES,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { EMPTY_BUFFER } = require_constants(), FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      let target = Buffer.allocUnsafe(totalLength), offset = 0;
      for (let i = 0; i < list.length; i++) {
        let buf = list[i];
        target.set(buf, offset), offset += buf.length;
      }
      return offset < totalLength ? new FastBuffer(target.buffer, target.byteOffset, offset) : target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++)
        output[offset + i] = source[i] ^ mask[i & 3];
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++)
        buffer[i] ^= mask[i & 3];
    }
    function toArrayBuffer(buf) {
      return buf.length === buf.buffer.byteLength ? buf.buffer : buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      if (toBuffer.readOnly = !0, Buffer.isBuffer(data)) return data;
      let buf;
      return data instanceof ArrayBuffer ? buf = new FastBuffer(data) : ArrayBuffer.isView(data) ? buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength) : (buf = Buffer.from(data), toBuffer.readOnly = !1), buf;
    }
    module.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL)
      try {
        let bufferUtil = __require("bufferutil");
        module.exports.mask = function(source, mask, output, offset, length) {
          length < 48 ? _mask(source, mask, output, offset, length) : bufferUtil.mask(source, mask, output, offset, length);
        }, module.exports.unmask = function(buffer, mask) {
          buffer.length < 32 ? _unmask(buffer, mask) : bufferUtil.unmask(buffer, mask);
        };
      } catch {
      }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var kDone = Symbol("kDone"), kRun = Symbol("kRun"), Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--, this[kRun]();
        }, this.concurrency = concurrency || 1 / 0, this.jobs = [], this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job), this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending !== this.concurrency && this.jobs.length) {
          let job = this.jobs.shift();
          this.pending++, job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var zlib = __require("zlib"), bufferUtil = require_buffer_util(), Limiter = require_limiter(), { kStatusCode } = require_constants(), FastBuffer = Buffer[Symbol.species], TRAILER = Buffer.from([0, 0, 255, 255]), kPerMessageDeflate = Symbol("permessage-deflate"), kTotalLength = Symbol("total-length"), kCallback = Symbol("callback"), kBuffers = Symbol("buffers"), kError = Symbol("error"), zlibLimiter, PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        if (this._maxPayload = maxPayload | 0, this._options = options || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!isServer, this._deflate = null, this._inflate = null, this.params = null, !zlibLimiter) {
          let concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        let params = {};
        return this._options.serverNoContextTakeover && (params.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (params.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (params.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? params.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (params.client_max_window_bits = !0), params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        return configurations = this.normalizeParams(configurations), this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations), this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
          let callback = this._deflate[kCallback];
          this._deflate.close(), this._deflate = null, callback && callback(
            new Error(
              "The deflate stream was closed while data was being processed"
            )
          );
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        let opts = this._options, accepted = offers.find((params) => !(opts.serverNoContextTakeover === !1 && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === !1 || typeof opts.serverMaxWindowBits == "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits == "number" && !params.client_max_window_bits));
        if (!accepted)
          throw new Error("None of the extension offers can be accepted");
        return opts.serverNoContextTakeover && (accepted.server_no_context_takeover = !0), opts.clientNoContextTakeover && (accepted.client_no_context_takeover = !0), typeof opts.serverMaxWindowBits == "number" && (accepted.server_max_window_bits = opts.serverMaxWindowBits), typeof opts.clientMaxWindowBits == "number" ? accepted.client_max_window_bits = opts.clientMaxWindowBits : (accepted.client_max_window_bits === !0 || opts.clientMaxWindowBits === !1) && delete accepted.client_max_window_bits, accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        let params = response[0];
        if (this._options.clientNoContextTakeover === !1 && params.client_no_context_takeover)
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        if (!params.client_max_window_bits)
          typeof this._options.clientMaxWindowBits == "number" && (params.client_max_window_bits = this._options.clientMaxWindowBits);
        else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && params.client_max_window_bits > this._options.clientMaxWindowBits)
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        return configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1)
              throw new Error(`Parameter "${key}" must have only a single value`);
            if (value = value[0], key === "client_max_window_bits") {
              if (value !== !0) {
                let num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15)
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                value = num;
              } else if (!this._isServer)
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
            } else if (key === "server_max_window_bits") {
              let num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15)
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== !0)
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
            } else
              throw new Error(`Unknown parameter "${key}"`);
            params[key] = value;
          });
        }), configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done(), callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done(), callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        let endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          let key = `${endpoint}_max_window_bits`, windowBits = typeof this.params[key] != "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          }), this._inflate[kPerMessageDeflate] = this, this._inflate[kTotalLength] = 0, this._inflate[kBuffers] = [], this._inflate.on("error", inflateOnError), this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback, this._inflate.write(data), fin && this._inflate.write(TRAILER), this._inflate.flush(() => {
          let err = this._inflate[kError];
          if (err) {
            this._inflate.close(), this._inflate = null, callback(err);
            return;
          }
          let data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[kTotalLength] = 0, this._inflate[kBuffers] = [], fin && this.params[`${endpoint}_no_context_takeover`] && this._inflate.reset()), callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        let endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          let key = `${endpoint}_max_window_bits`, windowBits = typeof this.params[key] != "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          }), this._deflate[kTotalLength] = 0, this._deflate[kBuffers] = [], this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback, this._deflate.write(data), this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate)
            return;
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          fin && (data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4)), this._deflate[kCallback] = null, this._deflate[kTotalLength] = 0, this._deflate[kBuffers] = [], fin && this.params[`${endpoint}_no_context_takeover`] && this._deflate.reset(), callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk), this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      if (this[kTotalLength] += chunk.length, this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded"), this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[kError][kStatusCode] = 1009, this.removeListener("data", inflateOnData), this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null, err[kStatusCode] = 1007, this[kCallback](err);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { isUtf8 } = __require("buffer"), { hasBlob } = require_constants(), tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      let len = buf.length, i = 0;
      for (; i < len; )
        if ((buf[i] & 128) === 0)
          i++;
        else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192)
            return !1;
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160)
            return !1;
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244)
            return !1;
          i += 4;
        } else
          return !1;
      return !0;
    }
    function isBlob(value) {
      return hasBlob && typeof value == "object" && typeof value.arrayBuffer == "function" && typeof value.type == "string" && typeof value.stream == "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8)
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    else if (!process.env.WS_NO_UTF_8_VALIDATE)
      try {
        let isValidUTF8 = __require("utf-8-validate");
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch {
      }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { Writable } = __require("stream"), PerMessageDeflate = require_permessage_deflate(), {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants(), { concat, toArrayBuffer, unmask } = require_buffer_util(), { isValidStatusCode, isValidUTF8 } = require_validation(), FastBuffer = Buffer[Symbol.species], GET_INFO = 0, GET_PAYLOAD_LENGTH_16 = 1, GET_PAYLOAD_LENGTH_64 = 2, GET_MASK = 3, GET_DATA = 4, INFLATING = 5, DEFER_EVENT = 6, Receiver2 = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super(), this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : !0, this._binaryType = options.binaryType || BINARY_TYPES[0], this._extensions = options.extensions || {}, this._isServer = !!options.isServer, this._maxPayload = options.maxPayload | 0, this._skipUTF8Validation = !!options.skipUTF8Validation, this[kWebSocket] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk.length, this._buffers.push(chunk), this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        if (this._bufferedBytes -= n, n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          let buf = this._buffers[0];
          return this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          ), new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        let dst = Buffer.allocUnsafe(n);
        do {
          let buf = this._buffers[0], offset = dst.length - n;
          n >= buf.length ? dst.set(this._buffers.shift(), offset) : (dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset), this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          )), n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = !0;
        do
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = !1;
              return;
          }
        while (this._loop);
        this._errored || cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = !1;
          return;
        }
        let buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          let error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        let compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          let error = this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        if (this._fin = (buf[0] & 128) === 128, this._opcode = buf[0] & 15, this._payloadLength = buf[1] & 127, this._opcode === 0) {
          if (compressed) {
            let error = this.createError(
              RangeError,
              "RSV1 must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            let error = this.createError(
              RangeError,
              "invalid opcode 0",
              !0,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            let error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              !0,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            let error = this.createError(
              RangeError,
              "FIN must be set",
              !0,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            let error = this.createError(
              RangeError,
              "RSV1 must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            let error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              !0,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          let error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            !0,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (buf[1] & 128) === 128, this._isServer) {
          if (!this._masked) {
            let error = this.createError(
              RangeError,
              "MASK must be set",
              !0,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          let error = this.createError(
            RangeError,
            "MASK must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        this._payloadLength === 126 ? this._state = GET_PAYLOAD_LENGTH_16 : this._payloadLength === 127 ? this._state = GET_PAYLOAD_LENGTH_64 : this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = !1;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0), this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = !1;
          return;
        }
        let buf = this.consume(8), num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 21) - 1) {
          let error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4), this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
          let error = this.createError(
            RangeError,
            "Max payload size exceeded",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
          );
          cb(error);
          return;
        }
        this._masked ? this._state = GET_MASK : this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = !1;
          return;
        }
        this._mask = this.consume(4), this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = !1;
            return;
          }
          data = this.consume(this._payloadLength), this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0 && unmask(data, this._mask);
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING, this.decompress(data, cb);
          return;
        }
        data.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(data)), this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        this._extensions[PerMessageDeflate.extensionName].decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            if (this._messageLength += buf.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
              let error = this.createError(
                RangeError,
                "Max payload size exceeded",
                !1,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb), this._state === GET_INFO && this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        let messageLength = this._messageLength, fragments = this._fragments;
        if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
          let data;
          this._binaryType === "nodebuffer" ? data = concat(fragments, messageLength) : this._binaryType === "arraybuffer" ? data = toArrayBuffer(concat(fragments, messageLength)) : this._binaryType === "blob" ? data = new Blob(fragments) : data = fragments, this._allowSynchronousEvents ? (this.emit("message", data, !0), this._state = GET_INFO) : (this._state = DEFER_EVENT, setImmediate(() => {
            this.emit("message", data, !0), this._state = GET_INFO, this.startLoop(cb);
          }));
        } else {
          let buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            let error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              !0,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          this._state === INFLATING || this._allowSynchronousEvents ? (this.emit("message", buf, !1), this._state = GET_INFO) : (this._state = DEFER_EVENT, setImmediate(() => {
            this.emit("message", buf, !1), this._state = GET_INFO, this.startLoop(cb);
          }));
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0)
            this._loop = !1, this.emit("conclude", 1005, EMPTY_BUFFER), this.end();
          else {
            let code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              let error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                !0,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            let buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              let error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                !0,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = !1, this.emit("conclude", code, buf), this.end();
          }
          this._state = GET_INFO;
          return;
        }
        this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", data), this._state = GET_INFO) : (this._state = DEFER_EVENT, setImmediate(() => {
          this.emit(this._opcode === 9 ? "ping" : "pong", data), this._state = GET_INFO, this.startLoop(cb);
        }));
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = !1, this._errored = !0;
        let err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        return Error.captureStackTrace(err, this.createError), err.code = errorCode, err[kStatusCode] = statusCode, err;
      }
    };
    module.exports = Receiver2;
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { Duplex } = __require("stream"), { randomFillSync } = __require("crypto"), PerMessageDeflate = require_permessage_deflate(), { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants(), { isBlob, isValidStatusCode } = require_validation(), { mask: applyMask, toBuffer } = require_buffer_util(), kByteLength = Symbol("kByteLength"), maskBuffer = Buffer.alloc(4), RANDOM_POOL_SIZE = 8 * 1024, randomPool, randomPoolPointer = RANDOM_POOL_SIZE, DEFAULT = 0, DEFLATING = 1, GET_BLOB_DATA = 2, Sender2 = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {}, generateMask && (this._generateMask = generateMask, this._maskBuffer = Buffer.alloc(4)), this._socket = socket, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = DEFAULT, this.onerror = NOOP, this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask, merge = !1, offset = 2, skipMasking = !1;
        options.mask && (mask = options.maskBuffer || maskBuffer, options.generateMask ? options.generateMask(mask) : (randomPoolPointer === RANDOM_POOL_SIZE && (randomPool === void 0 && (randomPool = Buffer.alloc(RANDOM_POOL_SIZE)), randomFillSync(randomPool, 0, RANDOM_POOL_SIZE), randomPoolPointer = 0), mask[0] = randomPool[randomPoolPointer++], mask[1] = randomPool[randomPoolPointer++], mask[2] = randomPool[randomPoolPointer++], mask[3] = randomPool[randomPoolPointer++]), skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0, offset = 6);
        let dataLength;
        typeof data == "string" ? (!options.mask || skipMasking) && options[kByteLength] !== void 0 ? dataLength = options[kByteLength] : (data = Buffer.from(data), dataLength = data.length) : (dataLength = data.length, merge = options.mask && options.readOnly && !skipMasking);
        let payloadLength = dataLength;
        dataLength >= 65536 ? (offset += 8, payloadLength = 127) : dataLength > 125 && (offset += 2, payloadLength = 126);
        let target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        return target[0] = options.fin ? options.opcode | 128 : options.opcode, options.rsv1 && (target[0] |= 64), target[1] = payloadLength, payloadLength === 126 ? target.writeUInt16BE(dataLength, 2) : payloadLength === 127 && (target[2] = target[3] = 0, target.writeUIntBE(dataLength, 4, 6)), options.mask ? (target[1] |= 128, target[offset - 4] = mask[0], target[offset - 3] = mask[1], target[offset - 2] = mask[2], target[offset - 1] = mask[3], skipMasking ? [target, data] : merge ? (applyMask(data, mask, target, offset, dataLength), [target]) : (applyMask(data, mask, data, 0, dataLength), [target, data])) : [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0)
          buf = EMPTY_BUFFER;
        else {
          if (typeof code != "number" || !isValidStatusCode(code))
            throw new TypeError("First argument must be a valid error code number");
          if (data === void 0 || !data.length)
            buf = Buffer.allocUnsafe(2), buf.writeUInt16BE(code, 0);
          else {
            let length = Buffer.byteLength(data);
            if (length > 123)
              throw new RangeError("The message must not be greater than 123 bytes");
            buf = Buffer.allocUnsafe(2 + length), buf.writeUInt16BE(code, 0), typeof data == "string" ? buf.write(data, 2) : buf.set(data, 2);
          }
        }
        let options = {
          [kByteLength]: buf.length,
          fin: !0,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: !1,
          rsv1: !1
        };
        this._state !== DEFAULT ? this.enqueue([this.dispatch, buf, !1, options, cb]) : this.sendFrame(_Sender.frame(buf, options), cb);
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength, readOnly;
        if (typeof data == "string" ? (byteLength = Buffer.byteLength(data), readOnly = !1) : isBlob(data) ? (byteLength = data.size, readOnly = !1) : (data = toBuffer(data), byteLength = data.length, readOnly = toBuffer.readOnly), byteLength > 125)
          throw new RangeError("The data size must not be greater than 125 bytes");
        let options = {
          [kByteLength]: byteLength,
          fin: !0,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: !1
        };
        isBlob(data) ? this._state !== DEFAULT ? this.enqueue([this.getBlobData, data, !1, options, cb]) : this.getBlobData(data, !1, options, cb) : this._state !== DEFAULT ? this.enqueue([this.dispatch, data, !1, options, cb]) : this.sendFrame(_Sender.frame(data, options), cb);
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength, readOnly;
        if (typeof data == "string" ? (byteLength = Buffer.byteLength(data), readOnly = !1) : isBlob(data) ? (byteLength = data.size, readOnly = !1) : (data = toBuffer(data), byteLength = data.length, readOnly = toBuffer.readOnly), byteLength > 125)
          throw new RangeError("The data size must not be greater than 125 bytes");
        let options = {
          [kByteLength]: byteLength,
          fin: !0,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: !1
        };
        isBlob(data) ? this._state !== DEFAULT ? this.enqueue([this.getBlobData, data, !1, options, cb]) : this.getBlobData(data, !1, options, cb) : this._state !== DEFAULT ? this.enqueue([this.dispatch, data, !1, options, cb]) : this.sendFrame(_Sender.frame(data, options), cb);
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        let perMessageDeflate = this._extensions[PerMessageDeflate.extensionName], opcode = options.binary ? 2 : 1, rsv1 = options.compress, byteLength, readOnly;
        typeof data == "string" ? (byteLength = Buffer.byteLength(data), readOnly = !1) : isBlob(data) ? (byteLength = data.size, readOnly = !1) : (data = toBuffer(data), byteLength = data.length, readOnly = toBuffer.readOnly), this._firstFragment ? (this._firstFragment = !1, rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (rsv1 = byteLength >= perMessageDeflate._threshold), this._compress = rsv1) : (rsv1 = !1, opcode = 0), options.fin && (this._firstFragment = !0);
        let opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        isBlob(data) ? this._state !== DEFAULT ? this.enqueue([this.getBlobData, data, this._compress, opts, cb]) : this.getBlobData(data, this._compress, opts, cb) : this._state !== DEFAULT ? this.enqueue([this.dispatch, data, this._compress, opts, cb]) : this.dispatch(data, this._compress, opts, cb);
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength], this._state = GET_BLOB_DATA, blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            let err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          let data = toBuffer(arrayBuffer);
          compress ? this.dispatch(data, compress, options, cb) : (this._state = DEFAULT, this.sendFrame(_Sender.frame(data, options), cb), this.dequeue());
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        let perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength], this._state = DEFLATING, perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            let err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength], this._state = DEFAULT, options.readOnly = !1, this.sendFrame(_Sender.frame(buf, options), cb), this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        for (; this._state === DEFAULT && this._queue.length; ) {
          let params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength], Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength], this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {Buffer[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        list.length === 2 ? (this._socket.cork(), this._socket.write(list[0]), this._socket.write(list[1], cb), this._socket.uncork()) : this._socket.write(list[0], cb);
      }
    };
    module.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      typeof cb == "function" && cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        let params = sender._queue[i], callback = params[params.length - 1];
        typeof callback == "function" && callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb), sender.onerror(err);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { kForOnEventAttribute, kListener } = require_constants(), kCode = Symbol("kCode"), kData = Symbol("kData"), kError = Symbol("kError"), kMessage = Symbol("kMessage"), kReason = Symbol("kReason"), kTarget = Symbol("kTarget"), kType = Symbol("kType"), kWasClean = Symbol("kWasClean"), Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null, this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: !0 });
    Object.defineProperty(Event.prototype, "type", { enumerable: !0 });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type), this[kCode] = options.code === void 0 ? 0 : options.code, this[kReason] = options.reason === void 0 ? "" : options.reason, this[kWasClean] = options.wasClean === void 0 ? !1 : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: !0 });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: !0 });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: !0 });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type), this[kError] = options.error === void 0 ? null : options.error, this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: !0 });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: !0 });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type), this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: !0 });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (let listener of this.listeners(type))
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute])
            return;
        let wrapper;
        if (type === "message")
          wrapper = function(data, isBinary) {
            let event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this, callListener(handler, this, event);
          };
        else if (type === "close")
          wrapper = function(code, message) {
            let event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this, callListener(handler, this, event);
          };
        else if (type === "error")
          wrapper = function(error) {
            let event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this, callListener(handler, this, event);
          };
        else if (type === "open")
          wrapper = function() {
            let event = new Event("open");
            event[kTarget] = this, callListener(handler, this, event);
          };
        else
          return;
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute], wrapper[kListener] = handler, options.once ? this.once(type, wrapper) : this.on(type, wrapper);
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (let listener of this.listeners(type))
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
      }
    };
    module.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      typeof listener == "object" && listener.handleEvent ? listener.handleEvent.call(listener, event) : listener.call(thisArg, event);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      dest[name] === void 0 ? dest[name] = [elem] : dest[name].push(elem);
    }
    function parse(header) {
      let offers = /* @__PURE__ */ Object.create(null), params = /* @__PURE__ */ Object.create(null), mustUnescape = !1, isEscaping = !1, inQuotes = !1, extensionName, paramName, start = -1, code = -1, end = -1, i = 0;
      for (; i < header.length; i++)
        if (code = header.charCodeAt(i), extensionName === void 0)
          if (end === -1 && tokenChars[code] === 1)
            start === -1 && (start = i);
          else if (i !== 0 && (code === 32 || code === 9))
            end === -1 && start !== -1 && (end = i);
          else if (code === 59 || code === 44) {
            if (start === -1)
              throw new SyntaxError(`Unexpected character at index ${i}`);
            end === -1 && (end = i);
            let name = header.slice(start, end);
            code === 44 ? (push(offers, name, params), params = /* @__PURE__ */ Object.create(null)) : extensionName = name, start = end = -1;
          } else
            throw new SyntaxError(`Unexpected character at index ${i}`);
        else if (paramName === void 0)
          if (end === -1 && tokenChars[code] === 1)
            start === -1 && (start = i);
          else if (code === 32 || code === 9)
            end === -1 && start !== -1 && (end = i);
          else if (code === 59 || code === 44) {
            if (start === -1)
              throw new SyntaxError(`Unexpected character at index ${i}`);
            end === -1 && (end = i), push(params, header.slice(start, end), !0), code === 44 && (push(offers, extensionName, params), params = /* @__PURE__ */ Object.create(null), extensionName = void 0), start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1)
            paramName = header.slice(start, i), start = end = -1;
          else
            throw new SyntaxError(`Unexpected character at index ${i}`);
        else if (isEscaping) {
          if (tokenChars[code] !== 1)
            throw new SyntaxError(`Unexpected character at index ${i}`);
          start === -1 ? start = i : mustUnescape || (mustUnescape = !0), isEscaping = !1;
        } else if (inQuotes)
          if (tokenChars[code] === 1)
            start === -1 && (start = i);
          else if (code === 34 && start !== -1)
            inQuotes = !1, end = i;
          else if (code === 92)
            isEscaping = !0;
          else
            throw new SyntaxError(`Unexpected character at index ${i}`);
        else if (code === 34 && header.charCodeAt(i - 1) === 61)
          inQuotes = !0;
        else if (end === -1 && tokenChars[code] === 1)
          start === -1 && (start = i);
        else if (start !== -1 && (code === 32 || code === 9))
          end === -1 && (end = i);
        else if (code === 59 || code === 44) {
          if (start === -1)
            throw new SyntaxError(`Unexpected character at index ${i}`);
          end === -1 && (end = i);
          let value = header.slice(start, end);
          mustUnescape && (value = value.replace(/\\/g, ""), mustUnescape = !1), push(params, paramName, value), code === 44 && (push(offers, extensionName, params), params = /* @__PURE__ */ Object.create(null), extensionName = void 0), paramName = void 0, start = end = -1;
        } else
          throw new SyntaxError(`Unexpected character at index ${i}`);
      if (start === -1 || inQuotes || code === 32 || code === 9)
        throw new SyntaxError("Unexpected end of input");
      end === -1 && (end = i);
      let token = header.slice(start, end);
      return extensionName === void 0 ? push(offers, token, params) : (paramName === void 0 ? push(params, token, !0) : mustUnescape ? push(params, paramName, token.replace(/\\/g, "")) : push(params, paramName, token), push(offers, extensionName, params)), offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        return Array.isArray(configurations) || (configurations = [configurations]), configurations.map((params) => [extension].concat(
          Object.keys(params).map((k) => {
            let values = params[k];
            return Array.isArray(values) || (values = [values]), values.map((v) => v === !0 ? k : `${k}=${v}`).join("; ");
          })
        ).join("; ")).join(", ");
      }).join(", ");
    }
    module.exports = { format, parse };
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var EventEmitter = __require("events"), https = __require("https"), http = __require("http"), net = __require("net"), tls = __require("tls"), { randomBytes, createHash } = __require("crypto"), { Duplex, Readable } = __require("stream"), { URL } = __require("url"), PerMessageDeflate = require_permessage_deflate(), Receiver2 = require_receiver(), Sender2 = require_sender(), { isBlob } = require_validation(), {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants(), {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target(), { format, parse } = require_extension(), { toBuffer } = require_buffer_util(), closeTimeout = 30 * 1e3, kAborted = Symbol("kAborted"), protocolVersions = [8, 13], readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/, WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super(), this._binaryType = BINARY_TYPES[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = EMPTY_BUFFER, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = _WebSocket.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, address !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, protocols === void 0 ? protocols = [] : Array.isArray(protocols) || (typeof protocols == "object" && protocols !== null ? (options = protocols, protocols = []) : protocols = [protocols]), initAsClient(this, address, protocols, options)) : (this._autoPong = options.autoPong, this._isServer = !0);
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        BINARY_TYPES.includes(type) && (this._binaryType = type, this._receiver && (this._receiver._binaryType = type));
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        let receiver = new Receiver2({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        }), sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver, this._sender = sender, this._socket = socket, receiver[kWebSocket] = this, sender[kWebSocket] = this, socket[kWebSocket] = this, receiver.on("conclude", receiverOnConclude), receiver.on("drain", receiverOnDrain), receiver.on("error", receiverOnError), receiver.on("message", receiverOnMessage), receiver.on("ping", receiverOnPing), receiver.on("pong", receiverOnPong), sender.onerror = senderOnError, socket.setTimeout && socket.setTimeout(0), socket.setNoDelay && socket.setNoDelay(), head.length > 0 && socket.unshift(head), socket.on("close", socketOnClose), socket.on("data", socketOnData), socket.on("end", socketOnEnd), socket.on("error", socketOnError), this._readyState = _WebSocket.OPEN, this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        this._extensions[PerMessageDeflate.extensionName] && this._extensions[PerMessageDeflate.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = _WebSocket.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState !== _WebSocket.CLOSED) {
          if (this.readyState === _WebSocket.CONNECTING) {
            abortHandshake(this, this._req, "WebSocket was closed before the connection was established");
            return;
          }
          if (this.readyState === _WebSocket.CLOSING) {
            this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
            return;
          }
          this._readyState = _WebSocket.CLOSING, this._sender.close(code, data, !this._isServer, (err) => {
            err || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
          }), setCloseTimer(this);
        }
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED || (this._paused = !0, this._socket.pause());
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (typeof data == "function" ? (cb = data, data = mask = void 0) : typeof mask == "function" && (cb = mask, mask = void 0), typeof data == "number" && (data = data.toString()), this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        mask === void 0 && (mask = !this._isServer), this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (typeof data == "function" ? (cb = data, data = mask = void 0) : typeof mask == "function" && (cb = mask, mask = void 0), typeof data == "number" && (data = data.toString()), this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        mask === void 0 && (mask = !this._isServer), this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (typeof options == "function" && (cb = options, options = {}), typeof data == "number" && (data = data.toString()), this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        let opts = {
          binary: typeof data != "string",
          mask: !this._isServer,
          compress: !0,
          fin: !0,
          ...options
        };
        this._extensions[PerMessageDeflate.extensionName] || (opts.compress = !1), this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState !== _WebSocket.CLOSED) {
          if (this.readyState === _WebSocket.CONNECTING) {
            abortHandshake(this, this._req, "WebSocket was closed before the connection was established");
            return;
          }
          this._socket && (this._readyState = _WebSocket.CLOSING, this._socket.destroy());
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: !0,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: !0,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: !0,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: !0,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: !0,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: !0,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: !0,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: !0,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: !0 });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: !0,
        get() {
          for (let listener of this.listeners(method))
            if (listener[kForOnEventAttribute]) return listener[kListener];
          return null;
        },
        set(handler) {
          for (let listener of this.listeners(method))
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          typeof handler == "function" && this.addEventListener(method, handler, {
            [kForOnEventAttribute]: !0
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      let opts = {
        allowSynchronousEvents: !0,
        autoPong: !0,
        protocolVersion: protocolVersions[1],
        maxPayload: 104857600,
        skipUTF8Validation: !1,
        perMessageDeflate: !0,
        followRedirects: !1,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (websocket._autoPong = opts.autoPong, !protocolVersions.includes(opts.protocolVersion))
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      let parsedUrl;
      if (address instanceof URL)
        parsedUrl = address;
      else
        try {
          parsedUrl = new URL(address);
        } catch {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      parsedUrl.protocol === "http:" ? parsedUrl.protocol = "ws:" : parsedUrl.protocol === "https:" && (parsedUrl.protocol = "wss:"), websocket._url = parsedUrl.href;
      let isSecure = parsedUrl.protocol === "wss:", isIpcUrl = parsedUrl.protocol === "ws+unix:", invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl ? invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https", or "ws+unix:"` : isIpcUrl && !parsedUrl.pathname ? invalidUrlMessage = "The URL's pathname is empty" : parsedUrl.hash && (invalidUrlMessage = "The URL contains a fragment identifier"), invalidUrlMessage) {
        let err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0)
          throw err;
        emitErrorAndClose(websocket, err);
        return;
      }
      let defaultPort = isSecure ? 443 : 80, key = randomBytes(16).toString("base64"), request = isSecure ? https.request : http.request, protocolSet = /* @__PURE__ */ new Set(), perMessageDeflate;
      if (opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect), opts.defaultPort = opts.defaultPort || defaultPort, opts.port = parsedUrl.port || defaultPort, opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname, opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      }, opts.path = parsedUrl.pathname + parsedUrl.search, opts.timeout = opts.handshakeTimeout, opts.perMessageDeflate && (perMessageDeflate = new PerMessageDeflate(
        opts.perMessageDeflate !== !0 ? opts.perMessageDeflate : {},
        !1,
        opts.maxPayload
      ), opts.headers["Sec-WebSocket-Extensions"] = format({
        [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
      })), protocols.length) {
        for (let protocol of protocols) {
          if (typeof protocol != "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol))
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin && (opts.protocolVersion < 13 ? opts.headers["Sec-WebSocket-Origin"] = opts.origin : opts.headers.Origin = opts.origin), (parsedUrl.username || parsedUrl.password) && (opts.auth = `${parsedUrl.username}:${parsedUrl.password}`), isIpcUrl) {
        let parts = opts.path.split(":");
        opts.socketPath = parts[0], opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl, websocket._originalSecure = isSecure, websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          let headers = options && options.headers;
          if (options = { ...options, headers: {} }, headers)
            for (let [key2, value] of Object.entries(headers))
              options.headers[key2.toLowerCase()] = value;
        } else if (websocket.listenerCount("redirect") === 0) {
          let isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : !1 : websocket._originalIpc ? !1 : parsedUrl.host === websocket._originalHostOrSocketPath;
          (!isSameHost || websocket._originalSecure && !isSecure) && (delete opts.headers.authorization, delete opts.headers.cookie, isSameHost || delete opts.headers.host, opts.auth = void 0);
        }
        opts.auth && !options.headers.authorization && (options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64")), req = websocket._req = request(opts), websocket._redirects && websocket.emit("redirect", websocket.url, req);
      } else
        req = websocket._req = request(opts);
      opts.timeout && req.on("timeout", () => {
        abortHandshake(websocket, req, "Opening handshake has timed out");
      }), req.on("error", (err) => {
        req === null || req[kAborted] || (req = websocket._req = null, emitErrorAndClose(websocket, err));
      }), req.on("response", (res) => {
        let location = res.headers.location, statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL(location, address);
          } catch {
            let err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else websocket.emit("unexpected-response", req, res) || abortHandshake(
          websocket,
          req,
          `Unexpected server response: ${res.statusCode}`
        );
      }), req.on("upgrade", (res, socket, head) => {
        if (websocket.emit("upgrade", res), websocket.readyState !== WebSocket2.CONNECTING) return;
        req = websocket._req = null;
        let upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        let digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        let serverProt = res.headers["sec-websocket-protocol"], protError;
        if (serverProt !== void 0 ? protocolSet.size ? protocolSet.has(serverProt) || (protError = "Server sent an invalid subprotocol") : protError = "Server sent a subprotocol but none was requested" : protocolSet.size && (protError = "Server sent no subprotocol"), protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        serverProt && (websocket._protocol = serverProt);
        let secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            abortHandshake(websocket, socket, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch {
            abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Extensions header");
            return;
          }
          let extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            abortHandshake(websocket, socket, "Server indicated an extension that was not requested");
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch {
            abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Extensions header");
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      }), opts.finishRequest ? opts.finishRequest(req, websocket) : req.end();
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING, websocket._errorEmitted = !0, websocket.emit("error", err), websocket.emitClose();
    }
    function netConnect(options) {
      return options.path = options.socketPath, net.connect(options);
    }
    function tlsConnect(options) {
      return options.path = void 0, !options.servername && options.servername !== "" && (options.servername = net.isIP(options.host) ? "" : options.host), tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      let err = new Error(message);
      Error.captureStackTrace(err, abortHandshake), stream.setHeader ? (stream[kAborted] = !0, stream.abort(), stream.socket && !stream.socket.destroyed && stream.socket.destroy(), process.nextTick(emitErrorAndClose, websocket, err)) : (stream.destroy(err), stream.once("error", websocket.emit.bind(websocket, "error")), stream.once("close", websocket.emitClose.bind(websocket)));
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        let length = isBlob(data) ? data.size : toBuffer(data).length;
        websocket._socket ? websocket._sender._bufferedBytes += length : websocket._bufferedAmount += length;
      }
      if (cb) {
        let err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      let websocket = this[kWebSocket];
      websocket._closeFrameReceived = !0, websocket._closeMessage = reason, websocket._closeCode = code, websocket._socket[kWebSocket] !== void 0 && (websocket._socket.removeListener("data", socketOnData), process.nextTick(resume, websocket._socket), code === 1005 ? websocket.close() : websocket.close(code, reason));
    }
    function receiverOnDrain() {
      let websocket = this[kWebSocket];
      websocket.isPaused || websocket._socket.resume();
    }
    function receiverOnError(err) {
      let websocket = this[kWebSocket];
      websocket._socket[kWebSocket] !== void 0 && (websocket._socket.removeListener("data", socketOnData), process.nextTick(resume, websocket._socket), websocket.close(err[kStatusCode])), websocket._errorEmitted || (websocket._errorEmitted = !0, websocket.emit("error", err));
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      let websocket = this[kWebSocket];
      websocket._autoPong && websocket.pong(data, !this._isServer, NOOP), websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      let websocket = this[kWebSocket];
      websocket.readyState !== WebSocket2.CLOSED && (websocket.readyState === WebSocket2.OPEN && (websocket._readyState = WebSocket2.CLOSING, setCloseTimer(websocket)), this._socket.end(), websocket._errorEmitted || (websocket._errorEmitted = !0, websocket.emit("error", err)));
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        closeTimeout
      );
    }
    function socketOnClose() {
      let websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose), this.removeListener("data", socketOnData), this.removeListener("end", socketOnEnd), websocket._readyState = WebSocket2.CLOSING;
      let chunk;
      !this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null && websocket._receiver.write(chunk), websocket._receiver.end(), this[kWebSocket] = void 0, clearTimeout(websocket._closeTimer), websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted ? websocket.emitClose() : (websocket._receiver.on("error", receiverOnFinish), websocket._receiver.on("finish", receiverOnFinish));
    }
    function socketOnData(chunk) {
      this[kWebSocket]._receiver.write(chunk) || this.pause();
    }
    function socketOnEnd() {
      let websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING, websocket._receiver.end(), this.end();
    }
    function socketOnError() {
      let websocket = this[kWebSocket];
      this.removeListener("error", socketOnError), this.on("error", NOOP), websocket && (websocket._readyState = WebSocket2.CLOSING, this.destroy());
    }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/subprotocol.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { tokenChars } = require_validation();
    function parse(header) {
      let protocols = /* @__PURE__ */ new Set(), start = -1, end = -1, i = 0;
      for (i; i < header.length; i++) {
        let code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1)
          start === -1 && (start = i);
        else if (i !== 0 && (code === 32 || code === 9))
          end === -1 && start !== -1 && (end = i);
        else if (code === 44) {
          if (start === -1)
            throw new SyntaxError(`Unexpected character at index ${i}`);
          end === -1 && (end = i);
          let protocol2 = header.slice(start, end);
          if (protocols.has(protocol2))
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          protocols.add(protocol2), start = end = -1;
        } else
          throw new SyntaxError(`Unexpected character at index ${i}`);
      }
      if (start === -1 || end !== -1)
        throw new SyntaxError("Unexpected end of input");
      let protocol = header.slice(start, i);
      if (protocols.has(protocol))
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      return protocols.add(protocol), protocols;
    }
    module.exports = { parse };
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var EventEmitter = __require("events"), http = __require("http"), { Duplex } = __require("stream"), { createHash } = __require("crypto"), extension = require_extension(), PerMessageDeflate = require_permessage_deflate(), subprotocol = require_subprotocol(), WebSocket2 = require_websocket(), { GUID, kWebSocket } = require_constants(), keyRegex = /^[+/0-9A-Za-z]{22}==$/, RUNNING = 0, CLOSING = 1, CLOSED = 2, WebSocketServer2 = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        if (super(), options = {
          allowSynchronousEvents: !0,
          autoPong: !0,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: !1,
          perMessageDeflate: !1,
          handleProtocols: null,
          clientTracking: !0,
          verifyClient: null,
          noServer: !1,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        }, options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer)
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        if (options.port != null ? (this._server = http.createServer((req, res) => {
          let body = http.STATUS_CODES[426];
          res.writeHead(426, {
            "Content-Length": body.length,
            "Content-Type": "text/plain"
          }), res.end(body);
        }), this._server.listen(
          options.port,
          options.host,
          options.backlog,
          callback
        )) : options.server && (this._server = options.server), this._server) {
          let emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        options.perMessageDeflate === !0 && (options.perMessageDeflate = {}), options.clientTracking && (this.clients = /* @__PURE__ */ new Set(), this._shouldEmitClose = !1), this.options = options, this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer)
          throw new Error('The server is operating in "noServer" mode');
        return this._server ? this._server.address() : null;
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          cb && this.once("close", () => {
            cb(new Error("The server is not running"));
          }), process.nextTick(emitClose, this);
          return;
        }
        if (cb && this.once("close", cb), this._state !== CLOSING)
          if (this._state = CLOSING, this.options.noServer || this.options.server)
            this._server && (this._removeListeners(), this._removeListeners = this._server = null), this.clients ? this.clients.size ? this._shouldEmitClose = !0 : process.nextTick(emitClose, this) : process.nextTick(emitClose, this);
          else {
            let server = this._server;
            this._removeListeners(), this._removeListeners = this._server = null, server.close(() => {
              emitClose(this);
            });
          }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          let index = req.url.indexOf("?");
          if ((index !== -1 ? req.url.slice(0, index) : req.url) !== this.options.path) return !1;
        }
        return !0;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        let key = req.headers["sec-websocket-key"], upgrade = req.headers.upgrade, version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, "Invalid HTTP method");
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, "Invalid Upgrade header");
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, "Missing or invalid Sec-WebSocket-Key header");
          return;
        }
        if (version !== 8 && version !== 13) {
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, "Missing or invalid Sec-WebSocket-Version header");
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        let secWebSocketProtocol = req.headers["sec-websocket-protocol"], protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0)
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch {
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, "Invalid Sec-WebSocket-Protocol header");
            return;
          }
        let secWebSocketExtensions = req.headers["sec-websocket-extensions"], extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          let perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            !0,
            this.options.maxPayload
          );
          try {
            let offers = extension.parse(secWebSocketExtensions);
            offers[PerMessageDeflate.extensionName] && (perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]), extensions[PerMessageDeflate.extensionName] = perMessageDeflate);
          } catch {
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
            return;
          }
        }
        if (this.options.verifyClient) {
          let info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified)
                return abortHandshake(socket, code || 401, message, headers);
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket])
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        let headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${createHash("sha1").update(key + GUID).digest("base64")}`
        ], ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          let protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          protocol && (headers.push(`Sec-WebSocket-Protocol: ${protocol}`), ws._protocol = protocol);
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          let params = extensions[PerMessageDeflate.extensionName].params, value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`), ws._extensions = extensions;
        }
        this.emit("headers", headers, req), socket.write(headers.concat(`\r
`).join(`\r
`)), socket.removeListener("error", socketOnError), ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        }), this.clients && (this.clients.add(ws), ws.on("close", () => {
          this.clients.delete(ws), this._shouldEmitClose && !this.clients.size && process.nextTick(emitClose, this);
        })), cb(ws, req);
      }
    };
    module.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (let event of Object.keys(map)) server.on(event, map[event]);
      return function() {
        for (let event of Object.keys(map))
          server.removeListener(event, map[event]);
      };
    }
    function emitClose(server) {
      server._state = CLOSED, server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code], headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      }, socket.once("finish", socket.destroy), socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join(`\r
`) + `\r
\r
` + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        let err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError), server.emit("wsClientError", err, socket, req);
      } else
        abortHandshake(socket, code, message);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.18.0/node_modules/ws/wrapper.mjs
init_cjs_shims();
var import_stream = __toESM(require_stream(), 1), import_receiver = __toESM(require_receiver(), 1), import_sender = __toESM(require_sender(), 1), import_websocket = __toESM(require_websocket(), 1), import_websocket_server = __toESM(require_websocket_server(), 1);
var wrapper_default = import_websocket.default;

export {
  import_websocket_server,
  wrapper_default
};
//# sourceMappingURL=chunk-3GXB4ZRP.js.map
