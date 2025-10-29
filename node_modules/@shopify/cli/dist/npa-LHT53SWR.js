import {
  require_lib,
  require_semver
} from "./chunk-AM4QB5OM.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/lru-cache@10.4.3/node_modules/lru-cache/dist/commonjs/index.js
var require_commonjs = __commonJS({
  "../../node_modules/.pnpm/lru-cache@10.4.3/node_modules/lru-cache/dist/commonjs/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.LRUCache = void 0;
    var perf = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, warned = /* @__PURE__ */ new Set(), PROCESS = typeof process == "object" && process ? process : {}, emitWarning = (msg, type, code, fn) => {
      typeof PROCESS.emitWarning == "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
    }, AC = globalThis.AbortController, AS = globalThis.AbortSignal;
    if (typeof AC > "u") {
      AS = class {
        onabort;
        _onabort = [];
        reason;
        aborted = !1;
        addEventListener(_, fn) {
          this._onabort.push(fn);
        }
      }, AC = class {
        constructor() {
          warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
          if (!this.signal.aborted) {
            this.signal.reason = reason, this.signal.aborted = !0;
            for (let fn of this.signal._onabort)
              fn(reason);
            this.signal.onabort?.(reason);
          }
        }
      };
      let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", warnACPolyfill = () => {
        printACPolyfillWarning && (printACPolyfillWarning = !1, emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill));
      };
    }
    var shouldWarn = (code) => !warned.has(code), TYPE = Symbol("type"), isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n), getUintArray = (max) => isPosInt(max) ? max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null : null, ZeroArray = class extends Array {
      constructor(size) {
        super(size), this.fill(0);
      }
    }, Stack = class _Stack {
      heap;
      length;
      // private constructor
      static #constructing = !1;
      static create(max) {
        let HeapCls = getUintArray(max);
        if (!HeapCls)
          return [];
        _Stack.#constructing = !0;
        let s = new _Stack(max, HeapCls);
        return _Stack.#constructing = !1, s;
      }
      constructor(max, HeapCls) {
        if (!_Stack.#constructing)
          throw new TypeError("instantiate Stack using Stack.create(n)");
        this.heap = new HeapCls(max), this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    }, LRUCache = class _LRUCache {
      // options that cannot be changed without disaster
      #max;
      #maxSize;
      #dispose;
      #disposeAfter;
      #fetchMethod;
      #memoMethod;
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      ttl;
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      ttlResolution;
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      ttlAutopurge;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      updateAgeOnGet;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      updateAgeOnHas;
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      allowStale;
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      noDisposeOnSet;
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      noUpdateTTL;
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      maxEntrySize;
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      sizeCalculation;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      noDeleteOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      noDeleteOnStaleGet;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      allowStaleOnFetchAbort;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      allowStaleOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      ignoreFetchAbort;
      // computed properties
      #size;
      #calculatedSize;
      #keyMap;
      #keyList;
      #valList;
      #next;
      #prev;
      #head;
      #tail;
      #free;
      #disposed;
      #sizes;
      #starts;
      #ttls;
      #hasDispose;
      #hasFetchMethod;
      #hasDisposeAfter;
      /**
       * Do not call this method unless you need to inspect the
       * inner workings of the cache.  If anything returned by this
       * object is modified in any way, strange breakage may occur.
       *
       * These fields are private for a reason!
       *
       * @internal
       */
      static unsafeExposeInternals(c) {
        return {
          // properties
          starts: c.#starts,
          ttls: c.#ttls,
          sizes: c.#sizes,
          keyMap: c.#keyMap,
          keyList: c.#keyList,
          valList: c.#valList,
          next: c.#next,
          prev: c.#prev,
          get head() {
            return c.#head;
          },
          get tail() {
            return c.#tail;
          },
          free: c.#free,
          // methods
          isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
          backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
          moveToTail: (index) => c.#moveToTail(index),
          indexes: (options) => c.#indexes(options),
          rindexes: (options) => c.#rindexes(options),
          isStale: (index) => c.#isStale(index)
        };
      }
      // Protected read-only members
      /**
       * {@link LRUCache.OptionsBase.max} (read-only)
       */
      get max() {
        return this.#max;
      }
      /**
       * {@link LRUCache.OptionsBase.maxSize} (read-only)
       */
      get maxSize() {
        return this.#maxSize;
      }
      /**
       * The total computed size of items in the cache (read-only)
       */
      get calculatedSize() {
        return this.#calculatedSize;
      }
      /**
       * The number of items stored in the cache (read-only)
       */
      get size() {
        return this.#size;
      }
      /**
       * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
       */
      get fetchMethod() {
        return this.#fetchMethod;
      }
      get memoMethod() {
        return this.#memoMethod;
      }
      /**
       * {@link LRUCache.OptionsBase.dispose} (read-only)
       */
      get dispose() {
        return this.#dispose;
      }
      /**
       * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
       */
      get disposeAfter() {
        return this.#disposeAfter;
      }
      constructor(options) {
        let { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max))
          throw new TypeError("max option must be a nonnegative integer");
        let UintArray = max ? getUintArray(max) : Array;
        if (!UintArray)
          throw new Error("invalid max value: " + max);
        if (this.#max = max, this.#maxSize = maxSize, this.maxEntrySize = maxEntrySize || this.#maxSize, this.sizeCalculation = sizeCalculation, this.sizeCalculation) {
          if (!this.#maxSize && !this.maxEntrySize)
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          if (typeof this.sizeCalculation != "function")
            throw new TypeError("sizeCalculation set to non-function");
        }
        if (memoMethod !== void 0 && typeof memoMethod != "function")
          throw new TypeError("memoMethod must be a function if defined");
        if (this.#memoMethod = memoMethod, fetchMethod !== void 0 && typeof fetchMethod != "function")
          throw new TypeError("fetchMethod must be a function if specified");
        if (this.#fetchMethod = fetchMethod, this.#hasFetchMethod = !!fetchMethod, this.#keyMap = /* @__PURE__ */ new Map(), this.#keyList = new Array(max).fill(void 0), this.#valList = new Array(max).fill(void 0), this.#next = new UintArray(max), this.#prev = new UintArray(max), this.#head = 0, this.#tail = 0, this.#free = Stack.create(max), this.#size = 0, this.#calculatedSize = 0, typeof dispose == "function" && (this.#dispose = dispose), typeof disposeAfter == "function" ? (this.#disposeAfter = disposeAfter, this.#disposed = []) : (this.#disposeAfter = void 0, this.#disposed = void 0), this.#hasDispose = !!this.#dispose, this.#hasDisposeAfter = !!this.#disposeAfter, this.noDisposeOnSet = !!noDisposeOnSet, this.noUpdateTTL = !!noUpdateTTL, this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection, this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection, this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort, this.ignoreFetchAbort = !!ignoreFetchAbort, this.maxEntrySize !== 0) {
          if (this.#maxSize !== 0 && !isPosInt(this.#maxSize))
            throw new TypeError("maxSize must be a positive integer if specified");
          if (!isPosInt(this.maxEntrySize))
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          this.#initializeSizeTracking();
        }
        if (this.allowStale = !!allowStale, this.noDeleteOnStaleGet = !!noDeleteOnStaleGet, this.updateAgeOnGet = !!updateAgeOnGet, this.updateAgeOnHas = !!updateAgeOnHas, this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1, this.ttlAutopurge = !!ttlAutopurge, this.ttl = ttl || 0, this.ttl) {
          if (!isPosInt(this.ttl))
            throw new TypeError("ttl must be a positive integer if specified");
          this.#initializeTTLTracking();
        }
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0)
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
          let code = "LRU_CACHE_UNBOUNDED";
          shouldWarn(code) && (warned.add(code), emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", code, _LRUCache));
        }
      }
      /**
       * Return the number of ms left in the item's TTL. If item is not in cache,
       * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
       */
      getRemainingTTL(key) {
        return this.#keyMap.has(key) ? 1 / 0 : 0;
      }
      #initializeTTLTracking() {
        let ttls = new ZeroArray(this.#max), starts = new ZeroArray(this.#max);
        this.#ttls = ttls, this.#starts = starts, this.#setItemTTL = (index, ttl, start = perf.now()) => {
          if (starts[index] = ttl !== 0 ? start : 0, ttls[index] = ttl, ttl !== 0 && this.ttlAutopurge) {
            let t = setTimeout(() => {
              this.#isStale(index) && this.#delete(this.#keyList[index], "expire");
            }, ttl + 1);
            t.unref && t.unref();
          }
        }, this.#updateItemAge = (index) => {
          starts[index] = ttls[index] !== 0 ? perf.now() : 0;
        }, this.#statusTTL = (status, index) => {
          if (ttls[index]) {
            let ttl = ttls[index], start = starts[index];
            if (!ttl || !start)
              return;
            status.ttl = ttl, status.start = start, status.now = cachedNow || getNow();
            let age = status.now - start;
            status.remainingTTL = ttl - age;
          }
        };
        let cachedNow = 0, getNow = () => {
          let n = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n;
            let t = setTimeout(() => cachedNow = 0, this.ttlResolution);
            t.unref && t.unref();
          }
          return n;
        };
        this.getRemainingTTL = (key) => {
          let index = this.#keyMap.get(key);
          if (index === void 0)
            return 0;
          let ttl = ttls[index], start = starts[index];
          if (!ttl || !start)
            return 1 / 0;
          let age = (cachedNow || getNow()) - start;
          return ttl - age;
        }, this.#isStale = (index) => {
          let s = starts[index], t = ttls[index];
          return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
      }
      // conditionally set private methods related to TTL
      #updateItemAge = () => {
      };
      #statusTTL = () => {
      };
      #setItemTTL = () => {
      };
      /* c8 ignore stop */
      #isStale = () => !1;
      #initializeSizeTracking() {
        let sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0, this.#sizes = sizes, this.#removeItemSize = (index) => {
          this.#calculatedSize -= sizes[index], sizes[index] = 0;
        }, this.#requireSize = (k, v, size, sizeCalculation) => {
          if (this.#isBackgroundFetch(v))
            return 0;
          if (!isPosInt(size))
            if (sizeCalculation) {
              if (typeof sizeCalculation != "function")
                throw new TypeError("sizeCalculation must be a function");
              if (size = sizeCalculation(v, k), !isPosInt(size))
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
            } else
              throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
          return size;
        }, this.#addItemSize = (index, size, status) => {
          if (sizes[index] = size, this.#maxSize) {
            let maxSize = this.#maxSize - sizes[index];
            for (; this.#calculatedSize > maxSize; )
              this.#evict(!0);
          }
          this.#calculatedSize += sizes[index], status && (status.entrySize = size, status.totalCalculatedSize = this.#calculatedSize);
        };
      }
      #removeItemSize = (_i) => {
      };
      #addItemSize = (_i, _s, _st) => {
      };
      #requireSize = (_k, _v, size, sizeCalculation) => {
        if (size || sizeCalculation)
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        return 0;
      };
      *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size)
          for (let i = this.#tail; !(!this.#isValidIndex(i) || ((allowStale || !this.#isStale(i)) && (yield i), i === this.#head)); )
            i = this.#prev[i];
      }
      *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size)
          for (let i = this.#head; !(!this.#isValidIndex(i) || ((allowStale || !this.#isStale(i)) && (yield i), i === this.#tail)); )
            i = this.#next[i];
      }
      #isValidIndex(index) {
        return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
      }
      /**
       * Return a generator yielding `[key, value]` pairs,
       * in order from most recently used to least recently used.
       */
      *entries() {
        for (let i of this.#indexes())
          this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield [this.#keyList[i], this.#valList[i]]);
      }
      /**
       * Inverse order version of {@link LRUCache.entries}
       *
       * Return a generator yielding `[key, value]` pairs,
       * in order from least recently used to most recently used.
       */
      *rentries() {
        for (let i of this.#rindexes())
          this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield [this.#keyList[i], this.#valList[i]]);
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (let i of this.#indexes()) {
          let k = this.#keyList[i];
          k !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield k);
        }
      }
      /**
       * Inverse order version of {@link LRUCache.keys}
       *
       * Return a generator yielding the keys in the cache,
       * in order from least recently used to most recently used.
       */
      *rkeys() {
        for (let i of this.#rindexes()) {
          let k = this.#keyList[i];
          k !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield k);
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (let i of this.#indexes())
          this.#valList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield this.#valList[i]);
      }
      /**
       * Inverse order version of {@link LRUCache.values}
       *
       * Return a generator yielding the values in the cache,
       * in order from least recently used to most recently used.
       */
      *rvalues() {
        for (let i of this.#rindexes())
          this.#valList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i]) && (yield this.#valList[i]);
      }
      /**
       * Iterating over the cache itself yields the same results as
       * {@link LRUCache.entries}
       */
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * A String value that is used in the creation of the default string
       * description of an object. Called by the built-in method
       * `Object.prototype.toString`.
       */
      [Symbol.toStringTag] = "LRUCache";
      /**
       * Find a value for which the supplied fn method returns a truthy value,
       * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
       */
      find(fn, getOptions = {}) {
        for (let i of this.#indexes()) {
          let v = this.#valList[i], value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value !== void 0 && fn(value, this.#keyList[i], this))
            return this.get(this.#keyList[i], getOptions);
        }
      }
      /**
       * Call the supplied function on each item in the cache, in order from most
       * recently used to least recently used.
       *
       * `fn` is called as `fn(value, key, cache)`.
       *
       * If `thisp` is provided, function will be called in the `this`-context of
       * the provided object, or the cache if no `thisp` object is provided.
       *
       * Does not update age or recenty of use, or iterate over stale values.
       */
      forEach(fn, thisp = this) {
        for (let i of this.#indexes()) {
          let v = this.#valList[i], value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          value !== void 0 && fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn, thisp = this) {
        for (let i of this.#rindexes()) {
          let v = this.#valList[i], value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          value !== void 0 && fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = !1;
        for (let i of this.#rindexes({ allowStale: !0 }))
          this.#isStale(i) && (this.#delete(this.#keyList[i], "expire"), deleted = !0);
        return deleted;
      }
      /**
       * Get the extended info about a given entry, to get its value, size, and
       * TTL info simultaneously. Returns `undefined` if the key is not present.
       *
       * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
       * serialization, the `start` value is always the current timestamp, and the
       * `ttl` is a calculated remaining time to live (negative if expired).
       *
       * Always returns stale values, if their info is found in the cache, so be
       * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
       * if relevant.
       */
      info(key) {
        let i = this.#keyMap.get(key);
        if (i === void 0)
          return;
        let v = this.#valList[i], value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          return;
        let entry = { value };
        if (this.#ttls && this.#starts) {
          let ttl = this.#ttls[i], start = this.#starts[i];
          if (ttl && start) {
            let remain = ttl - (perf.now() - start);
            entry.ttl = remain, entry.start = Date.now();
          }
        }
        return this.#sizes && (entry.size = this.#sizes[i]), entry;
      }
      /**
       * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
       * passed to {@link LRLUCache#load}.
       *
       * The `start` fields are calculated relative to a portable `Date.now()`
       * timestamp, even if `performance.now()` is available.
       *
       * Stale entries are always included in the `dump`, even if
       * {@link LRUCache.OptionsBase.allowStale} is false.
       *
       * Note: this returns an actual array, not a generator, so it can be more
       * easily passed around.
       */
      dump() {
        let arr = [];
        for (let i of this.#indexes({ allowStale: !0 })) {
          let key = this.#keyList[i], v = this.#valList[i], value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0 || key === void 0)
            continue;
          let entry = { value };
          if (this.#ttls && this.#starts) {
            entry.ttl = this.#ttls[i];
            let age = perf.now() - this.#starts[i];
            entry.start = Math.floor(Date.now() - age);
          }
          this.#sizes && (entry.size = this.#sizes[i]), arr.unshift([key, entry]);
        }
        return arr;
      }
      /**
       * Reset the cache and load in the items in entries in the order listed.
       *
       * The shape of the resulting cache may be different if the same options are
       * not used in both caches.
       *
       * The `start` fields are assumed to be calculated relative to a portable
       * `Date.now()` timestamp, even if `performance.now()` is available.
       */
      load(arr) {
        this.clear();
        for (let [key, entry] of arr) {
          if (entry.start) {
            let age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key, entry.value, entry);
        }
      }
      /**
       * Add a value to the cache.
       *
       * Note: if `undefined` is specified as a value, this is an alias for
       * {@link LRUCache#delete}
       *
       * Fields on the {@link LRUCache.SetOptions} options param will override
       * their corresponding values in the constructor options for the scope
       * of this single `set()` operation.
       *
       * If `start` is provided, then that will set the effective start
       * time for the TTL calculation. Note that this must be a previous
       * value of `performance.now()` if supported, or a previous value of
       * `Date.now()` if not.
       *
       * Options object may also include `size`, which will prevent
       * calling the `sizeCalculation` function and just use the specified
       * number if it is a positive integer, and `noDisposeOnSet` which
       * will prevent calling a `dispose` function in the case of
       * overwrites.
       *
       * If the `size` (or return value of `sizeCalculation`) for a given
       * entry is greater than `maxEntrySize`, then the item will not be
       * added to the cache.
       *
       * Will update the recency of the entry.
       *
       * If the value is `undefined`, then this is an alias for
       * `cache.delete(key)`. `undefined` is never stored in the cache.
       */
      set(k, v, setOptions = {}) {
        if (v === void 0)
          return this.delete(k), this;
        let { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions, { noUpdateTTL = this.noUpdateTTL } = setOptions, size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize)
          return status && (status.set = "miss", status.maxEntrySizeExceeded = !0), this.#delete(k, "set"), this;
        let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
        if (index === void 0)
          index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(!1) : this.#size, this.#keyList[index] = k, this.#valList[index] = v, this.#keyMap.set(k, index), this.#next[this.#tail] = index, this.#prev[index] = this.#tail, this.#tail = index, this.#size++, this.#addItemSize(index, size, status), status && (status.set = "add"), noUpdateTTL = !1;
        else {
          this.#moveToTail(index);
          let oldVal = this.#valList[index];
          if (v !== oldVal) {
            if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              let { __staleWhileFetching: s } = oldVal;
              s !== void 0 && !noDisposeOnSet && (this.#hasDispose && this.#dispose?.(s, k, "set"), this.#hasDisposeAfter && this.#disposed?.push([s, k, "set"]));
            } else noDisposeOnSet || (this.#hasDispose && this.#dispose?.(oldVal, k, "set"), this.#hasDisposeAfter && this.#disposed?.push([oldVal, k, "set"]));
            if (this.#removeItemSize(index), this.#addItemSize(index, size, status), this.#valList[index] = v, status) {
              status.set = "replace";
              let oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
              oldValue !== void 0 && (status.oldValue = oldValue);
            }
          } else status && (status.set = "update");
        }
        if (ttl !== 0 && !this.#ttls && this.#initializeTTLTracking(), this.#ttls && (noUpdateTTL || this.#setItemTTL(index, ttl, start), status && this.#statusTTL(status, index)), !noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
          let dt = this.#disposed, task;
          for (; task = dt?.shift(); )
            this.#disposeAfter?.(...task);
        }
        return this;
      }
      /**
       * Evict the least recently used item, returning its value or
       * `undefined` if cache is empty.
       */
      pop() {
        try {
          for (; this.#size; ) {
            let val = this.#valList[this.#head];
            if (this.#evict(!0), this.#isBackgroundFetch(val)) {
              if (val.__staleWhileFetching)
                return val.__staleWhileFetching;
            } else if (val !== void 0)
              return val;
          }
        } finally {
          if (this.#hasDisposeAfter && this.#disposed) {
            let dt = this.#disposed, task;
            for (; task = dt?.shift(); )
              this.#disposeAfter?.(...task);
          }
        }
      }
      #evict(free) {
        let head = this.#head, k = this.#keyList[head], v = this.#valList[head];
        return this.#hasFetchMethod && this.#isBackgroundFetch(v) ? v.__abortController.abort(new Error("evicted")) : (this.#hasDispose || this.#hasDisposeAfter) && (this.#hasDispose && this.#dispose?.(v, k, "evict"), this.#hasDisposeAfter && this.#disposed?.push([v, k, "evict"])), this.#removeItemSize(head), free && (this.#keyList[head] = void 0, this.#valList[head] = void 0, this.#free.push(head)), this.#size === 1 ? (this.#head = this.#tail = 0, this.#free.length = 0) : this.#head = this.#next[head], this.#keyMap.delete(k), this.#size--, head;
      }
      /**
       * Check if a key is in the cache, without updating the recency of use.
       * Will return false if the item is stale, even though it is technically
       * in the cache.
       *
       * Check if a key is in the cache, without updating the recency of
       * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
       * to `true` in either the options or the constructor.
       *
       * Will return `false` if the item is stale, even though it is technically in
       * the cache. The difference can be determined (if it matters) by using a
       * `status` argument, and inspecting the `has` field.
       *
       * Will not update item age unless
       * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
       */
      has(k, hasOptions = {}) {
        let { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions, index = this.#keyMap.get(k);
        if (index !== void 0) {
          let v = this.#valList[index];
          if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0)
            return !1;
          if (this.#isStale(index))
            status && (status.has = "stale", this.#statusTTL(status, index));
          else return updateAgeOnHas && this.#updateItemAge(index), status && (status.has = "hit", this.#statusTTL(status, index)), !0;
        } else status && (status.has = "miss");
        return !1;
      }
      /**
       * Like {@link LRUCache#get} but doesn't update recency or delete stale
       * items.
       *
       * Returns `undefined` if the item is stale, unless
       * {@link LRUCache.OptionsBase.allowStale} is set.
       */
      peek(k, peekOptions = {}) {
        let { allowStale = this.allowStale } = peekOptions, index = this.#keyMap.get(k);
        if (index === void 0 || !allowStale && this.#isStale(index))
          return;
        let v = this.#valList[index];
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      }
      #backgroundFetch(k, index, options, context) {
        let v = index === void 0 ? void 0 : this.#valList[index];
        if (this.#isBackgroundFetch(v))
          return v;
        let ac = new AC(), { signal } = options;
        signal?.addEventListener("abort", () => ac.abort(signal.reason), {
          signal: ac.signal
        });
        let fetchOpts = {
          signal: ac.signal,
          options,
          context
        }, cb = (v2, updateCache = !1) => {
          let { aborted } = ac.signal, ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
          if (options.status && (aborted && !updateCache ? (options.status.fetchAborted = !0, options.status.fetchError = ac.signal.reason, ignoreAbort && (options.status.fetchAbortIgnored = !0)) : options.status.fetchResolved = !0), aborted && !ignoreAbort && !updateCache)
            return fetchFail(ac.signal.reason);
          let bf2 = p;
          return this.#valList[index] === p && (v2 === void 0 ? bf2.__staleWhileFetching ? this.#valList[index] = bf2.__staleWhileFetching : this.#delete(k, "fetch") : (options.status && (options.status.fetchUpdated = !0), this.set(k, v2, fetchOpts.options))), v2;
        }, eb = (er) => (options.status && (options.status.fetchRejected = !0, options.status.fetchError = er), fetchFail(er)), fetchFail = (er) => {
          let { aborted } = ac.signal, allowStaleAborted = aborted && options.allowStaleOnFetchAbort, allowStale = allowStaleAborted || options.allowStaleOnFetchRejection, noDelete = allowStale || options.noDeleteOnFetchRejection, bf2 = p;
          if (this.#valList[index] === p && (!noDelete || bf2.__staleWhileFetching === void 0 ? this.#delete(k, "fetch") : allowStaleAborted || (this.#valList[index] = bf2.__staleWhileFetching)), allowStale)
            return options.status && bf2.__staleWhileFetching !== void 0 && (options.status.returnedStale = !0), bf2.__staleWhileFetching;
          if (bf2.__returned === bf2)
            throw er;
        }, pcall = (res, rej) => {
          let fmp = this.#fetchMethod?.(k, v, fetchOpts);
          fmp && fmp instanceof Promise && fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej), ac.signal.addEventListener("abort", () => {
            (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) && (res(void 0), options.allowStaleOnFetchAbort && (res = (v2) => cb(v2, !0)));
          });
        };
        options.status && (options.status.fetchDispatched = !0);
        let p = new Promise(pcall).then(cb, eb), bf = Object.assign(p, {
          __abortController: ac,
          __staleWhileFetching: v,
          __returned: void 0
        });
        return index === void 0 ? (this.set(k, bf, { ...fetchOpts.options, status: void 0 }), index = this.#keyMap.get(k)) : this.#valList[index] = bf, bf;
      }
      #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod)
          return !1;
        let b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
      }
      async fetch(k, fetchOptions = {}) {
        let {
          // get options
          allowStale = this.allowStale,
          updateAgeOnGet = this.updateAgeOnGet,
          noDeleteOnStaleGet = this.noDeleteOnStaleGet,
          // set options
          ttl = this.ttl,
          noDisposeOnSet = this.noDisposeOnSet,
          size = 0,
          sizeCalculation = this.sizeCalculation,
          noUpdateTTL = this.noUpdateTTL,
          // fetch exclusive options
          noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
          ignoreFetchAbort = this.ignoreFetchAbort,
          allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
          context,
          forceRefresh = !1,
          status,
          signal
        } = fetchOptions;
        if (!this.#hasFetchMethod)
          return status && (status.fetch = "get"), this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            status
          });
        let options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection,
          allowStaleOnFetchRejection,
          allowStaleOnFetchAbort,
          ignoreFetchAbort,
          status,
          signal
        }, index = this.#keyMap.get(k);
        if (index === void 0) {
          status && (status.fetch = "miss");
          let p = this.#backgroundFetch(k, index, options, context);
          return p.__returned = p;
        } else {
          let v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            let stale = allowStale && v.__staleWhileFetching !== void 0;
            return status && (status.fetch = "inflight", stale && (status.returnedStale = !0)), stale ? v.__staleWhileFetching : v.__returned = v;
          }
          let isStale = this.#isStale(index);
          if (!forceRefresh && !isStale)
            return status && (status.fetch = "hit"), this.#moveToTail(index), updateAgeOnGet && this.#updateItemAge(index), status && this.#statusTTL(status, index), v;
          let p = this.#backgroundFetch(k, index, options, context), staleVal = p.__staleWhileFetching !== void 0 && allowStale;
          return status && (status.fetch = isStale ? "stale" : "refresh", staleVal && isStale && (status.returnedStale = !0)), staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      async forceFetch(k, fetchOptions = {}) {
        let v = await this.fetch(k, fetchOptions);
        if (v === void 0)
          throw new Error("fetch() returned undefined");
        return v;
      }
      memo(k, memoOptions = {}) {
        let memoMethod = this.#memoMethod;
        if (!memoMethod)
          throw new Error("no memoMethod provided to constructor");
        let { context, forceRefresh, ...options } = memoOptions, v = this.get(k, options);
        if (!forceRefresh && v !== void 0)
          return v;
        let vv = memoMethod(k, v, {
          options,
          context
        });
        return this.set(k, vv, options), vv;
      }
      /**
       * Return a value from the cache. Will update the recency of the cache
       * entry found.
       *
       * If the key is not found, get() will return `undefined`.
       */
      get(k, getOptions = {}) {
        let { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions, index = this.#keyMap.get(k);
        if (index !== void 0) {
          let value = this.#valList[index], fetching = this.#isBackgroundFetch(value);
          return status && this.#statusTTL(status, index), this.#isStale(index) ? (status && (status.get = "stale"), fetching ? (status && allowStale && value.__staleWhileFetching !== void 0 && (status.returnedStale = !0), allowStale ? value.__staleWhileFetching : void 0) : (noDeleteOnStaleGet || this.#delete(k, "expire"), status && allowStale && (status.returnedStale = !0), allowStale ? value : void 0)) : (status && (status.get = "hit"), fetching ? value.__staleWhileFetching : (this.#moveToTail(index), updateAgeOnGet && this.#updateItemAge(index), value));
        } else status && (status.get = "miss");
      }
      #connect(p, n) {
        this.#prev[n] = p, this.#next[p] = n;
      }
      #moveToTail(index) {
        index !== this.#tail && (index === this.#head ? this.#head = this.#next[index] : this.#connect(this.#prev[index], this.#next[index]), this.#connect(this.#tail, index), this.#tail = index);
      }
      /**
       * Deletes a key out of the cache.
       *
       * Returns true if the key was deleted, false otherwise.
       */
      delete(k) {
        return this.#delete(k, "delete");
      }
      #delete(k, reason) {
        let deleted = !1;
        if (this.#size !== 0) {
          let index = this.#keyMap.get(k);
          if (index !== void 0)
            if (deleted = !0, this.#size === 1)
              this.#clear(reason);
            else {
              this.#removeItemSize(index);
              let v = this.#valList[index];
              if (this.#isBackgroundFetch(v) ? v.__abortController.abort(new Error("deleted")) : (this.#hasDispose || this.#hasDisposeAfter) && (this.#hasDispose && this.#dispose?.(v, k, reason), this.#hasDisposeAfter && this.#disposed?.push([v, k, reason])), this.#keyMap.delete(k), this.#keyList[index] = void 0, this.#valList[index] = void 0, index === this.#tail)
                this.#tail = this.#prev[index];
              else if (index === this.#head)
                this.#head = this.#next[index];
              else {
                let pi = this.#prev[index];
                this.#next[pi] = this.#next[index];
                let ni = this.#next[index];
                this.#prev[ni] = this.#prev[index];
              }
              this.#size--, this.#free.push(index);
            }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
          let dt = this.#disposed, task;
          for (; task = dt?.shift(); )
            this.#disposeAfter?.(...task);
        }
        return deleted;
      }
      /**
       * Clear the cache entirely, throwing away all values.
       */
      clear() {
        return this.#clear("delete");
      }
      #clear(reason) {
        for (let index of this.#rindexes({ allowStale: !0 })) {
          let v = this.#valList[index];
          if (this.#isBackgroundFetch(v))
            v.__abortController.abort(new Error("deleted"));
          else {
            let k = this.#keyList[index];
            this.#hasDispose && this.#dispose?.(v, k, reason), this.#hasDisposeAfter && this.#disposed?.push([v, k, reason]);
          }
        }
        if (this.#keyMap.clear(), this.#valList.fill(void 0), this.#keyList.fill(void 0), this.#ttls && this.#starts && (this.#ttls.fill(0), this.#starts.fill(0)), this.#sizes && this.#sizes.fill(0), this.#head = 0, this.#tail = 0, this.#free.length = 0, this.#calculatedSize = 0, this.#size = 0, this.#hasDisposeAfter && this.#disposed) {
          let dt = this.#disposed, task;
          for (; task = dt?.shift(); )
            this.#disposeAfter?.(...task);
        }
      }
    };
    exports.LRUCache = LRUCache;
  }
});

// ../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/hosts.js
var require_hosts = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/hosts.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var maybeJoin = (...args) => args.every((arg) => arg) ? args.join("") : "", maybeEncode = (arg) => arg ? encodeURIComponent(arg) : "", formatHashFragment = (f) => f.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-"), defaults = {
      sshtemplate: ({ domain, user, project, committish }) => `git@${domain}:${user}/${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, user, project, committish }) => `git+ssh://git@${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      edittemplate: ({ domain, user, project, committish, editpath, path }) => `https://${domain}/${user}/${project}${maybeJoin("/", editpath, "/", maybeEncode(committish || "HEAD"), "/", path)}`,
      browsetemplate: ({ domain, user, project, committish, treepath }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}`,
      browsetreetemplate: ({ domain, user, project, committish, treepath, path, fragment, hashformat }) => `https://${domain}/${user}/${project}/${treepath}/${maybeEncode(committish || "HEAD")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
      browseblobtemplate: ({ domain, user, project, committish, blobpath, path, fragment, hashformat }) => `https://${domain}/${user}/${project}/${blobpath}/${maybeEncode(committish || "HEAD")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
      docstemplate: ({ domain, user, project, treepath, committish }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ domain, user, project, committish, path }) => `https://${domain}/${user}/${project}/raw/${maybeEncode(committish || "HEAD")}/${path}`,
      shortcuttemplate: ({ type, user, project, committish }) => `${type}:${user}/${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ user, project, committish }) => `${user}/${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, user, project }) => `https://${domain}/${user}/${project}/issues`,
      hashformat: formatHashFragment
    }, hosts = {};
    hosts.github = {
      // First two are insecure and generally shouldn't be used any more, but
      // they are still supported.
      protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "github.com",
      treepath: "tree",
      blobpath: "blob",
      editpath: "edit",
      filetemplate: ({ auth, user, project, committish, path }) => `https://${maybeJoin(auth, "@")}raw.githubusercontent.com/${user}/${project}/${maybeEncode(committish || "HEAD")}/${path}`,
      gittemplate: ({ auth, domain, user, project, committish }) => `git://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://codeload.${domain}/${user}/${project}/tar.gz/${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        let [, user, project, type, committish] = url.pathname.split("/", 5);
        if (!(type && type !== "tree") && (type || (committish = url.hash.slice(1)), project && project.endsWith(".git") && (project = project.slice(0, -4)), !(!user || !project)))
          return { user, project, committish };
      }
    };
    hosts.bitbucket = {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "bitbucket.org",
      treepath: "src",
      blobpath: "src",
      editpath: "?mode=edit",
      edittemplate: ({ domain, user, project, committish, treepath, path, editpath }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish || "HEAD"), "/", path, editpath)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/get/${maybeEncode(committish || "HEAD")}.tar.gz`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (!["get"].includes(aux) && (project && project.endsWith(".git") && (project = project.slice(0, -4)), !(!user || !project)))
          return { user, project, committish: url.hash.slice(1) };
      }
    };
    hosts.gitlab = {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gitlab.com",
      treepath: "tree",
      blobpath: "tree",
      editpath: "-/edit",
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/repository/archive.tar.gz?ref=${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        let path = url.pathname.slice(1);
        if (path.includes("/-/") || path.includes("/archive.tar.gz"))
          return;
        let segments = path.split("/"), project = segments.pop();
        project.endsWith(".git") && (project = project.slice(0, -4));
        let user = segments.join("/");
        if (!(!user || !project))
          return { user, project, committish: url.hash.slice(1) };
      }
    };
    hosts.gist = {
      protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gist.github.com",
      editpath: "edit",
      sshtemplate: ({ domain, project, committish }) => `git@${domain}:${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, project, committish }) => `git+ssh://git@${domain}/${project}.git${maybeJoin("#", committish)}`,
      edittemplate: ({ domain, user, project, committish, editpath }) => `https://${domain}/${user}/${project}${maybeJoin("/", maybeEncode(committish))}/${editpath}`,
      browsetemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      browsetreetemplate: ({ domain, project, committish, path, hashformat }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path))}`,
      browseblobtemplate: ({ domain, project, committish, path, hashformat }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path))}`,
      docstemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      httpstemplate: ({ domain, project, committish }) => `git+https://${domain}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ user, project, committish, path }) => `https://gist.githubusercontent.com/${user}/${project}/raw${maybeJoin("/", maybeEncode(committish))}/${path}`,
      shortcuttemplate: ({ type, project, committish }) => `${type}:${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ project, committish }) => `${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, project }) => `https://${domain}/${project}`,
      gittemplate: ({ domain, project, committish }) => `git://${domain}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ project, committish }) => `https://codeload.github.com/gist/${project}/tar.gz/${maybeEncode(committish || "HEAD")}`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (aux !== "raw") {
          if (!project) {
            if (!user)
              return;
            project = user, user = null;
          }
          return project.endsWith(".git") && (project = project.slice(0, -4)), { user, project, committish: url.hash.slice(1) };
        }
      },
      hashformat: function(fragment) {
        return fragment && "file-" + formatHashFragment(fragment);
      }
    };
    hosts.sourcehut = {
      protocols: ["git+ssh:", "https:"],
      domain: "git.sr.ht",
      treepath: "tree",
      blobpath: "tree",
      filetemplate: ({ domain, user, project, committish, path }) => `https://${domain}/${user}/${project}/blob/${maybeEncode(committish) || "HEAD"}/${path}`,
      httpstemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/archive/${maybeEncode(committish) || "HEAD"}.tar.gz`,
      bugstemplate: () => null,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (!["archive"].includes(aux) && (project && project.endsWith(".git") && (project = project.slice(0, -4)), !(!user || !project)))
          return { user, project, committish: url.hash.slice(1) };
      }
    };
    for (let [name, host] of Object.entries(hosts))
      hosts[name] = Object.assign({}, defaults, host);
    module.exports = hosts;
  }
});

// ../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/parse-url.js
var require_parse_url = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/parse-url.js"(exports, module) {
    init_cjs_shims();
    var url = __require("url"), lastIndexOfBefore = (str, char, beforeChar) => {
      let startPosition = str.indexOf(beforeChar);
      return str.lastIndexOf(char, startPosition > -1 ? startPosition : 1 / 0);
    }, safeUrl = (u) => {
      try {
        return new url.URL(u);
      } catch {
      }
    }, correctProtocol = (arg, protocols) => {
      let firstColon = arg.indexOf(":"), proto = arg.slice(0, firstColon + 1);
      if (Object.prototype.hasOwnProperty.call(protocols, proto))
        return arg;
      let firstAt = arg.indexOf("@");
      return firstAt > -1 ? firstAt > firstColon ? `git+ssh://${arg}` : arg : arg.indexOf("//") === firstColon + 1 ? arg : `${arg.slice(0, firstColon + 1)}//${arg.slice(firstColon + 1)}`;
    }, correctUrl = (giturl) => {
      let firstAt = lastIndexOfBefore(giturl, "@", "#"), lastColonBeforeHash = lastIndexOfBefore(giturl, ":", "#");
      return lastColonBeforeHash > firstAt && (giturl = giturl.slice(0, lastColonBeforeHash) + "/" + giturl.slice(lastColonBeforeHash + 1)), lastIndexOfBefore(giturl, ":", "#") === -1 && giturl.indexOf("//") === -1 && (giturl = `git+ssh://${giturl}`), giturl;
    };
    module.exports = (giturl, protocols) => {
      let withProtocol = protocols ? correctProtocol(giturl, protocols) : giturl;
      return safeUrl(withProtocol) || safeUrl(correctUrl(withProtocol));
    };
  }
});

// ../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/from-url.js
var require_from_url = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/from-url.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var parseUrl = require_parse_url(), isGitHubShorthand = (arg) => {
      let firstHash = arg.indexOf("#"), firstSlash = arg.indexOf("/"), secondSlash = arg.indexOf("/", firstSlash + 1), firstColon = arg.indexOf(":"), firstSpace = /\s/.exec(arg), firstAt = arg.indexOf("@"), spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash, atOnlyAfterHash = firstAt === -1 || firstHash > -1 && firstAt > firstHash, colonOnlyAfterHash = firstColon === -1 || firstHash > -1 && firstColon > firstHash, secondSlashOnlyAfterHash = secondSlash === -1 || firstHash > -1 && secondSlash > firstHash, hasSlash = firstSlash > 0, doesNotEndWithSlash = firstHash > -1 ? arg[firstHash - 1] !== "/" : !arg.endsWith("/"), doesNotStartWithDot = !arg.startsWith(".");
      return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
    };
    module.exports = (giturl, opts, { gitHosts, protocols }) => {
      if (!giturl)
        return;
      let correctedUrl = isGitHubShorthand(giturl) ? `github:${giturl}` : giturl, parsed = parseUrl(correctedUrl, protocols);
      if (!parsed)
        return;
      let gitHostShortcut = gitHosts.byShortcut[parsed.protocol], gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith("www.") ? parsed.hostname.slice(4) : parsed.hostname], gitHostName = gitHostShortcut || gitHostDomain;
      if (!gitHostName)
        return;
      let gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain], auth = null;
      protocols[parsed.protocol]?.auth && (parsed.username || parsed.password) && (auth = `${parsed.username}${parsed.password ? ":" + parsed.password : ""}`);
      let committish = null, user = null, project = null, defaultRepresentation = null;
      try {
        if (gitHostShortcut) {
          let pathname = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname, firstAt = pathname.indexOf("@");
          firstAt > -1 && (pathname = pathname.slice(firstAt + 1));
          let lastSlash = pathname.lastIndexOf("/");
          lastSlash > -1 ? (user = decodeURIComponent(pathname.slice(0, lastSlash)), user || (user = null), project = decodeURIComponent(pathname.slice(lastSlash + 1))) : project = decodeURIComponent(pathname), project.endsWith(".git") && (project = project.slice(0, -4)), parsed.hash && (committish = decodeURIComponent(parsed.hash.slice(1))), defaultRepresentation = "shortcut";
        } else {
          if (!gitHostInfo.protocols.includes(parsed.protocol))
            return;
          let segments = gitHostInfo.extract(parsed);
          if (!segments)
            return;
          user = segments.user && decodeURIComponent(segments.user), project = decodeURIComponent(segments.project), committish = decodeURIComponent(segments.committish), defaultRepresentation = protocols[parsed.protocol]?.name || parsed.protocol.slice(0, -1);
        }
      } catch (err) {
        if (err instanceof URIError)
          return;
        throw err;
      }
      return [gitHostName, user, auth, project, committish, defaultRepresentation, opts];
    };
  }
});

// ../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@7.0.2/node_modules/hosted-git-info/lib/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { LRUCache } = require_commonjs(), hosts = require_hosts(), fromUrl = require_from_url(), parseUrl = require_parse_url(), cache = new LRUCache({ max: 1e3 }), GitHost = class _GitHost {
      constructor(type, user, auth, project, committish, defaultRepresentation, opts = {}) {
        Object.assign(this, _GitHost.#gitHosts[type], {
          type,
          user,
          auth,
          project,
          committish,
          default: defaultRepresentation,
          opts
        });
      }
      static #gitHosts = { byShortcut: {}, byDomain: {} };
      static #protocols = {
        "git+ssh:": { name: "sshurl" },
        "ssh:": { name: "sshurl" },
        "git+https:": { name: "https", auth: !0 },
        "git:": { auth: !0 },
        "http:": { auth: !0 },
        "https:": { auth: !0 },
        "git+http:": { auth: !0 }
      };
      static addHost(name, host) {
        _GitHost.#gitHosts[name] = host, _GitHost.#gitHosts.byDomain[host.domain] = name, _GitHost.#gitHosts.byShortcut[`${name}:`] = name, _GitHost.#protocols[`${name}:`] = { name };
      }
      static fromUrl(giturl, opts) {
        if (typeof giturl != "string")
          return;
        let key = giturl + JSON.stringify(opts || {});
        if (!cache.has(key)) {
          let hostArgs = fromUrl(giturl, opts, {
            gitHosts: _GitHost.#gitHosts,
            protocols: _GitHost.#protocols
          });
          cache.set(key, hostArgs ? new _GitHost(...hostArgs) : void 0);
        }
        return cache.get(key);
      }
      static parseUrl(url) {
        return parseUrl(url);
      }
      #fill(template, opts) {
        if (typeof template != "function")
          return null;
        let options = { ...this, ...this.opts, ...opts };
        options.path || (options.path = ""), options.path.startsWith("/") && (options.path = options.path.slice(1)), options.noCommittish && (options.committish = null);
        let result = template(options);
        return options.noGitPlus && result.startsWith("git+") ? result.slice(4) : result;
      }
      hash() {
        return this.committish ? `#${this.committish}` : "";
      }
      ssh(opts) {
        return this.#fill(this.sshtemplate, opts);
      }
      sshurl(opts) {
        return this.#fill(this.sshurltemplate, opts);
      }
      browse(path, ...args) {
        return typeof path != "string" ? this.#fill(this.browsetemplate, path) : typeof args[0] != "string" ? this.#fill(this.browsetreetemplate, { ...args[0], path }) : this.#fill(this.browsetreetemplate, { ...args[1], fragment: args[0], path });
      }
      // If the path is known to be a file, then browseFile should be used. For some hosts
      // the url is the same as browse, but for others like GitHub a file can use both `/tree/`
      // and `/blob/` in the path. When using a default committish of `HEAD` then the `/tree/`
      // path will redirect to a specific commit. Using the `/blob/` path avoids this and
      // does not redirect to a different commit.
      browseFile(path, ...args) {
        return typeof args[0] != "string" ? this.#fill(this.browseblobtemplate, { ...args[0], path }) : this.#fill(this.browseblobtemplate, { ...args[1], fragment: args[0], path });
      }
      docs(opts) {
        return this.#fill(this.docstemplate, opts);
      }
      bugs(opts) {
        return this.#fill(this.bugstemplate, opts);
      }
      https(opts) {
        return this.#fill(this.httpstemplate, opts);
      }
      git(opts) {
        return this.#fill(this.gittemplate, opts);
      }
      shortcut(opts) {
        return this.#fill(this.shortcuttemplate, opts);
      }
      path(opts) {
        return this.#fill(this.pathtemplate, opts);
      }
      tarball(opts) {
        return this.#fill(this.tarballtemplate, { ...opts, noCommittish: !1 });
      }
      file(path, opts) {
        return this.#fill(this.filetemplate, { ...opts, path });
      }
      edit(path, opts) {
        return this.#fill(this.edittemplate, { ...opts, path });
      }
      getDefaultRepresentation() {
        return this.default;
      }
      toString(opts) {
        return this.default && typeof this[this.default] == "function" ? this[this.default](opts) : this.sshurl(opts);
      }
    };
    for (let [name, host] of Object.entries(hosts))
      GitHost.addHost(name, host);
    module.exports = GitHost;
  }
});

// ../../node_modules/.pnpm/proc-log@4.2.0/node_modules/proc-log/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/.pnpm/proc-log@4.2.0/node_modules/proc-log/lib/index.js"(exports, module) {
    init_cjs_shims();
    var META = Symbol("proc-log.meta");
    module.exports = {
      META,
      output: {
        LEVELS: [
          "standard",
          "error",
          "buffer",
          "flush"
        ],
        KEYS: {
          standard: "standard",
          error: "error",
          buffer: "buffer",
          flush: "flush"
        },
        standard: function(...args) {
          return process.emit("output", "standard", ...args);
        },
        error: function(...args) {
          return process.emit("output", "error", ...args);
        },
        buffer: function(...args) {
          return process.emit("output", "buffer", ...args);
        },
        flush: function(...args) {
          return process.emit("output", "flush", ...args);
        }
      },
      log: {
        LEVELS: [
          "notice",
          "error",
          "warn",
          "info",
          "verbose",
          "http",
          "silly",
          "timing",
          "pause",
          "resume"
        ],
        KEYS: {
          notice: "notice",
          error: "error",
          warn: "warn",
          info: "info",
          verbose: "verbose",
          http: "http",
          silly: "silly",
          timing: "timing",
          pause: "pause",
          resume: "resume"
        },
        error: function(...args) {
          return process.emit("log", "error", ...args);
        },
        notice: function(...args) {
          return process.emit("log", "notice", ...args);
        },
        warn: function(...args) {
          return process.emit("log", "warn", ...args);
        },
        info: function(...args) {
          return process.emit("log", "info", ...args);
        },
        verbose: function(...args) {
          return process.emit("log", "verbose", ...args);
        },
        http: function(...args) {
          return process.emit("log", "http", ...args);
        },
        silly: function(...args) {
          return process.emit("log", "silly", ...args);
        },
        timing: function(...args) {
          return process.emit("log", "timing", ...args);
        },
        pause: function() {
          return process.emit("log", "pause");
        },
        resume: function() {
          return process.emit("log", "resume");
        }
      },
      time: {
        LEVELS: [
          "start",
          "end"
        ],
        KEYS: {
          start: "start",
          end: "end"
        },
        start: function(name, fn) {
          process.emit("time", "start", name);
          function end() {
            return process.emit("time", "end", name);
          }
          if (typeof fn == "function") {
            let res = fn();
            return res && res.finally ? res.finally(end) : (end(), res);
          }
          return end;
        },
        end: function(name) {
          return process.emit("time", "end", name);
        }
      },
      input: {
        LEVELS: [
          "start",
          "end",
          "read"
        ],
        KEYS: {
          start: "start",
          end: "end",
          read: "read"
        },
        start: function(fn) {
          process.emit("input", "start");
          function end() {
            return process.emit("input", "end");
          }
          if (typeof fn == "function") {
            let res = fn();
            return res && res.finally ? res.finally(end) : (end(), res);
          }
          return end;
        },
        end: function() {
          return process.emit("input", "end");
        },
        read: function(...args) {
          let resolve, reject, promise = new Promise((_resolve, _reject) => {
            resolve = _resolve, reject = _reject;
          });
          return process.emit("input", "read", resolve, reject, ...args), promise;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/npm-package-arg@11.0.3/node_modules/npm-package-arg/lib/npa.js
var require_npa = __commonJS({
  "../../node_modules/.pnpm/npm-package-arg@11.0.3/node_modules/npm-package-arg/lib/npa.js"(exports, module) {
    init_cjs_shims();
    module.exports = npa;
    module.exports.resolve = resolve;
    module.exports.toPurl = toPurl;
    module.exports.Result = Result;
    var { URL } = __require("url"), HostedGit = require_lib2(), semver = require_semver(), path = global.FAKE_WINDOWS ? __require("path").win32 : __require("path"), validatePackageName = require_lib(), { homedir } = __require("os"), { log } = require_lib3(), isWindows = process.platform === "win32" || global.FAKE_WINDOWS, hasSlashes = isWindows ? /\\|[/]/ : /[/]/, isURL = /^(?:git[+])?[a-z]+:/i, isGit = /^[^@]+@[^:.]+\.[^:]+:.+$/i, isFilename = /[.](?:tgz|tar.gz|tar)$/i;
    function npa(arg, where) {
      let name, spec;
      if (typeof arg == "object")
        return arg instanceof Result && (!where || where === arg.where) ? arg : arg.name && arg.rawSpec ? npa.resolve(arg.name, arg.rawSpec, where || arg.where) : npa(arg.raw, where || arg.where);
      let nameEndsAt = arg[0] === "@" ? arg.slice(1).indexOf("@") + 1 : arg.indexOf("@"), namePart = nameEndsAt > 0 ? arg.slice(0, nameEndsAt) : arg;
      return isURL.test(arg) ? spec = arg : isGit.test(arg) ? spec = `git+ssh://${arg}` : namePart[0] !== "@" && (hasSlashes.test(namePart) || isFilename.test(namePart)) ? spec = arg : nameEndsAt > 0 ? (name = namePart, spec = arg.slice(nameEndsAt + 1) || "*") : validatePackageName(arg).validForOldPackages ? (name = arg, spec = "*") : spec = arg, resolve(name, spec, where, arg);
    }
    var isFilespec = isWindows ? /^(?:[.]|~[/]|[/\\]|[a-zA-Z]:)/ : /^(?:[.]|~[/]|[/]|[a-zA-Z]:)/;
    function resolve(name, spec, where, arg) {
      let res = new Result({
        raw: arg,
        name,
        rawSpec: spec,
        fromArgument: arg != null
      });
      if (name && res.setName(name), spec && (isFilespec.test(spec) || /^file:/i.test(spec)))
        return fromFile(res, where);
      if (spec && /^npm:/i.test(spec))
        return fromAlias(res, where);
      let hosted = HostedGit.fromUrl(spec, {
        noGitPlus: !0,
        noCommittish: !0
      });
      return hosted ? fromHostedGit(res, hosted) : spec && isURL.test(spec) ? fromURL(res) : spec && (hasSlashes.test(spec) || isFilename.test(spec)) ? fromFile(res, where) : fromRegistry(res);
    }
    var defaultRegistry = "https://registry.npmjs.org";
    function toPurl(arg, reg = defaultRegistry) {
      let res = npa(arg);
      if (res.type !== "version")
        throw invalidPurlType(res.type, res.raw);
      let purl = "pkg:npm/" + res.name.replace(/^@/, "%40") + "@" + res.rawSpec;
      return reg !== defaultRegistry && (purl += "?repository_url=" + reg), purl;
    }
    function invalidPackageName(name, valid, raw) {
      let err = new Error(`Invalid package name "${name}" of package "${raw}": ${valid.errors.join("; ")}.`);
      return err.code = "EINVALIDPACKAGENAME", err;
    }
    function invalidTagName(name, raw) {
      let err = new Error(`Invalid tag name "${name}" of package "${raw}": Tags may not have any characters that encodeURIComponent encodes.`);
      return err.code = "EINVALIDTAGNAME", err;
    }
    function invalidPurlType(type, raw) {
      let err = new Error(`Invalid type "${type}" of package "${raw}": Purl can only be generated for "version" types.`);
      return err.code = "EINVALIDPURLTYPE", err;
    }
    function Result(opts) {
      this.type = opts.type, this.registry = opts.registry, this.where = opts.where, opts.raw == null ? this.raw = opts.name ? opts.name + "@" + opts.rawSpec : opts.rawSpec : this.raw = opts.raw, this.name = void 0, this.escapedName = void 0, this.scope = void 0, this.rawSpec = opts.rawSpec || "", this.saveSpec = opts.saveSpec, this.fetchSpec = opts.fetchSpec, opts.name && this.setName(opts.name), this.gitRange = opts.gitRange, this.gitCommittish = opts.gitCommittish, this.gitSubdir = opts.gitSubdir, this.hosted = opts.hosted;
    }
    Result.prototype.setName = function(name) {
      let valid = validatePackageName(name);
      if (!valid.validForOldPackages)
        throw invalidPackageName(name, valid, this.raw);
      return this.name = name, this.scope = name[0] === "@" ? name.slice(0, name.indexOf("/")) : void 0, this.escapedName = name.replace("/", "%2f"), this;
    };
    Result.prototype.toString = function() {
      let full = [];
      this.name != null && this.name !== "" && full.push(this.name);
      let spec = this.saveSpec || this.fetchSpec || this.rawSpec;
      return spec != null && spec !== "" && full.push(spec), full.length ? full.join("@") : this.raw;
    };
    Result.prototype.toJSON = function() {
      let result = Object.assign({}, this);
      return delete result.hosted, result;
    };
    function setGitAttrs(res, committish) {
      if (!committish) {
        res.gitCommittish = null;
        return;
      }
      for (let part of committish.split("::")) {
        if (!part.includes(":")) {
          if (res.gitRange)
            throw new Error("cannot override existing semver range with a committish");
          if (res.gitCommittish)
            throw new Error("cannot override existing committish with a second committish");
          res.gitCommittish = part;
          continue;
        }
        let [name, value] = part.split(":");
        if (name === "semver") {
          if (res.gitCommittish)
            throw new Error("cannot override existing committish with a semver range");
          if (res.gitRange)
            throw new Error("cannot override existing semver range with a second semver range");
          res.gitRange = decodeURIComponent(value);
          continue;
        }
        if (name === "path") {
          if (res.gitSubdir)
            throw new Error("cannot override existing path with a second path");
          res.gitSubdir = `/${value}`;
          continue;
        }
        log.warn("npm-package-arg", `ignoring unknown key "${name}"`);
      }
    }
    function fromFile(res, where) {
      where || (where = process.cwd()), res.type = isFilename.test(res.rawSpec) ? "file" : "directory", res.where = where;
      let specUrl, resolvedUrl, rawWithPrefix = (/^file:/.test(res.rawSpec) ? "" : "file:") + res.rawSpec, rawNoPrefix = rawWithPrefix.replace(/^file:/, "");
      try {
        resolvedUrl = new URL(rawWithPrefix, `file://${path.resolve(where)}/`), specUrl = new URL(rawWithPrefix);
      } catch (originalError) {
        let er = new Error("Invalid file: URL, must comply with RFC 8089");
        throw Object.assign(er, {
          raw: res.rawSpec,
          spec: res,
          where,
          originalError
        });
      }
      if (resolvedUrl.host && resolvedUrl.host !== "localhost") {
        let rawSpec = res.rawSpec.replace(/^file:\/\//, "file:///");
        resolvedUrl = new URL(rawSpec, `file://${path.resolve(where)}/`), specUrl = new URL(rawSpec), rawNoPrefix = rawSpec.replace(/^file:/, "");
      }
      if (/^\/{1,3}\.\.?(\/|$)/.test(rawNoPrefix)) {
        let rawSpec = res.rawSpec.replace(/^file:\/{1,3}/, "file:");
        resolvedUrl = new URL(rawSpec, `file://${path.resolve(where)}/`), specUrl = new URL(rawSpec), rawNoPrefix = rawSpec.replace(/^file:/, "");
      }
      let specPath = decodeURIComponent(specUrl.pathname), resolvedPath = decodeURIComponent(resolvedUrl.pathname);
      return isWindows && (specPath = specPath.replace(/^\/+([a-z]:\/)/i, "$1"), resolvedPath = resolvedPath.replace(/^\/+([a-z]:\/)/i, "$1")), /^\/~(\/|$)/.test(specPath) ? (res.saveSpec = `file:${specPath.substr(1)}`, resolvedPath = path.resolve(homedir(), specPath.substr(3))) : path.isAbsolute(rawNoPrefix) ? res.saveSpec = `file:${path.resolve(resolvedPath)}` : res.saveSpec = `file:${path.relative(where, resolvedPath)}`, res.fetchSpec = path.resolve(where, resolvedPath), res;
    }
    function fromHostedGit(res, hosted) {
      return res.type = "git", res.hosted = hosted, res.saveSpec = hosted.toString({ noGitPlus: !1, noCommittish: !1 }), res.fetchSpec = hosted.getDefaultRepresentation() === "shortcut" ? null : hosted.toString(), setGitAttrs(res, hosted.committish), res;
    }
    function unsupportedURLType(protocol, spec) {
      let err = new Error(`Unsupported URL Type "${protocol}": ${spec}`);
      return err.code = "EUNSUPPORTEDPROTOCOL", err;
    }
    function fromURL(res) {
      let rawSpec = res.rawSpec;
      if (res.saveSpec = rawSpec, rawSpec.startsWith("git+ssh:")) {
        let matched = rawSpec.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
        if (matched && !matched[1].match(/:[0-9]+\/?.*$/i))
          return res.type = "git", setGitAttrs(res, matched[2]), res.fetchSpec = matched[1], res;
      } else rawSpec.startsWith("git+file://") && (rawSpec = rawSpec.replace(/\\/g, "/"));
      let parsedUrl = new URL(rawSpec);
      switch (parsedUrl.protocol) {
        case "git:":
        case "git+http:":
        case "git+https:":
        case "git+rsync:":
        case "git+ftp:":
        case "git+file:":
        case "git+ssh:":
          res.type = "git", setGitAttrs(res, parsedUrl.hash.slice(1)), parsedUrl.protocol === "git+file:" && /^git\+file:\/\/[a-z]:/i.test(rawSpec) ? res.fetchSpec = `git+file://${parsedUrl.host.toLowerCase()}:${parsedUrl.pathname}` : (parsedUrl.hash = "", res.fetchSpec = parsedUrl.toString()), res.fetchSpec.startsWith("git+") && (res.fetchSpec = res.fetchSpec.slice(4));
          break;
        case "http:":
        case "https:":
          res.type = "remote", res.fetchSpec = res.saveSpec;
          break;
        default:
          throw unsupportedURLType(parsedUrl.protocol, rawSpec);
      }
      return res;
    }
    function fromAlias(res, where) {
      let subSpec = npa(res.rawSpec.substr(4), where);
      if (subSpec.type === "alias")
        throw new Error("nested aliases not supported");
      if (!subSpec.registry)
        throw new Error("aliases only work for registry deps");
      if (!subSpec.name)
        throw new Error("aliases must have a name");
      return res.subSpec = subSpec, res.registry = !0, res.type = "alias", res.saveSpec = null, res.fetchSpec = null, res;
    }
    function fromRegistry(res) {
      res.registry = !0;
      let spec = res.rawSpec.trim();
      res.saveSpec = null, res.fetchSpec = spec;
      let version = semver.valid(spec, !0), range = semver.validRange(spec, !0);
      if (version)
        res.type = "version";
      else if (range)
        res.type = "range";
      else {
        if (encodeURIComponent(spec) !== spec)
          throw invalidTagName(spec, res.raw);
        res.type = "tag";
      }
      return res;
    }
  }
});
export default require_npa();
//# sourceMappingURL=npa-LHT53SWR.js.map
