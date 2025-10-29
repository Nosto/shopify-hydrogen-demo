import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/base64.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/base64.js"(exports) {
    init_cjs_shims();
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length)
        return intToCharMap[number];
      throw new TypeError("Must be between 0 and 63: " + number);
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/base64-vlq.js"(exports) {
    init_cjs_shims();
    var base64 = require_base64(), VLQ_BASE_SHIFT = 5, VLQ_BASE = 1 << VLQ_BASE_SHIFT, VLQ_BASE_MASK = VLQ_BASE - 1, VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    exports.encode = function(aValue) {
      let encoded = "", digit, vlq = toVLQSigned(aValue);
      do
        digit = vlq & VLQ_BASE_MASK, vlq >>>= VLQ_BASE_SHIFT, vlq > 0 && (digit |= VLQ_CONTINUATION_BIT), encoded += base64.encode(digit);
      while (vlq > 0);
      return encoded;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/util.js
var require_util = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/util.js"(exports) {
    init_cjs_shims();
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs)
        return aArgs[aName];
      if (arguments.length === 3)
        return aDefaultValue;
      throw new Error('"' + aName + '" is a required argument.');
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      let match = aUrl.match(urlRegexp);
      return match ? {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      } : null;
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      let url = "";
      return aParsedUrl.scheme && (url += aParsedUrl.scheme + ":"), url += "//", aParsedUrl.auth && (url += aParsedUrl.auth + "@"), aParsedUrl.host && (url += aParsedUrl.host), aParsedUrl.port && (url += ":" + aParsedUrl.port), aParsedUrl.path && (url += aParsedUrl.path), url;
    }
    exports.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f) {
      let cache = [];
      return function(input) {
        for (let i = 0; i < cache.length; i++)
          if (cache[i].input === input) {
            let temp = cache[0];
            return cache[0] = cache[i], cache[i] = temp, cache[0].result;
          }
        let result = f(input);
        return cache.unshift({
          input,
          result
        }), cache.length > MAX_CACHED_INPUTS && cache.pop(), result;
      };
    }
    var normalize = lruMemoize(function(aPath) {
      let path = aPath, url = urlParse(aPath);
      if (url) {
        if (!url.path)
          return aPath;
        path = url.path;
      }
      let isAbsolute = exports.isAbsolute(path), parts = [], start = 0, i = 0;
      for (; ; )
        if (start = i, i = path.indexOf("/", start), i === -1) {
          parts.push(path.slice(start));
          break;
        } else
          for (parts.push(path.slice(start, i)); i < path.length && path[i] === "/"; )
            i++;
      let up = 0;
      for (i = parts.length - 1; i >= 0; i--) {
        let part = parts[i];
        part === "." ? parts.splice(i, 1) : part === ".." ? up++ : up > 0 && (part === "" ? (parts.splice(i + 1, up), up = 0) : (parts.splice(i, 2), up--));
      }
      return path = parts.join("/"), path === "" && (path = isAbsolute ? "/" : "."), url ? (url.path = path, urlGenerate(url)) : path;
    });
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      aRoot === "" && (aRoot = "."), aPath === "" && (aPath = ".");
      let aPathUrl = urlParse(aPath), aRootUrl = urlParse(aRoot);
      if (aRootUrl && (aRoot = aRootUrl.path || "/"), aPathUrl && !aPathUrl.scheme)
        return aRootUrl && (aPathUrl.scheme = aRootUrl.scheme), urlGenerate(aPathUrl);
      if (aPathUrl || aPath.match(dataUrlRegexp))
        return aPath;
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path)
        return aRootUrl.host = aPath, urlGenerate(aRootUrl);
      let joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      return aRootUrl ? (aRootUrl.path = joined, urlGenerate(aRootUrl)) : joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      aRoot === "" && (aRoot = "."), aRoot = aRoot.replace(/\/$/, "");
      let level = 0;
      for (; aPath.indexOf(aRoot + "/") !== 0; ) {
        let index = aRoot.lastIndexOf("/");
        if (index < 0 || (aRoot = aRoot.slice(0, index), aRoot.match(/^([^\/]+:\/)?\/*$/)))
          return aPath;
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      return !("__proto__" in /* @__PURE__ */ Object.create(null));
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      return isProtoString(aStr) ? "$" + aStr : aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      return isProtoString(aStr) ? aStr.slice(1) : aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s)
        return !1;
      let length = s.length;
      if (length < 9 || s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95)
        return !1;
      for (let i = length - 10; i >= 0; i--)
        if (s.charCodeAt(i) !== 36)
          return !1;
      return !0;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      let cmp = strcmp(mappingA.source, mappingB.source);
      return cmp !== 0 || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0 || onlyCompareOriginal) || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0) || (cmp = mappingA.generatedLine - mappingB.generatedLine, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      let cmp = mappingA.generatedLine - mappingB.generatedLine;
      return cmp !== 0 || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0 || onlyCompareGenerated) || (cmp = strcmp(mappingA.source, mappingB.source), cmp !== 0) || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      return aStr1 === aStr2 ? 0 : aStr1 === null ? 1 : aStr2 === null ? -1 : aStr1 > aStr2 ? 1 : -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      let cmp = mappingA.generatedLine - mappingB.generatedLine;
      return cmp !== 0 || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0) || (cmp = strcmp(mappingA.source, mappingB.source), cmp !== 0) || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      if (sourceURL = sourceURL || "", sourceRoot && (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/" && (sourceRoot += "/"), sourceURL = sourceRoot + sourceURL), sourceMapURL) {
        let parsed = urlParse(sourceMapURL);
        if (!parsed)
          throw new Error("sourceMapURL could not be parsed");
        if (parsed.path) {
          let index = parsed.path.lastIndexOf("/");
          index >= 0 && (parsed.path = parsed.path.substring(0, index + 1));
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/array-set.js
var require_array_set = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/array-set.js"(exports) {
    init_cjs_shims();
    var ArraySet = class _ArraySet {
      constructor() {
        this._array = [], this._set = /* @__PURE__ */ new Map();
      }
      /**
       * Static method for creating ArraySet instances from an existing array.
       */
      static fromArray(aArray, aAllowDuplicates) {
        let set = new _ArraySet();
        for (let i = 0, len = aArray.length; i < len; i++)
          set.add(aArray[i], aAllowDuplicates);
        return set;
      }
      /**
       * Return how many unique items are in this ArraySet. If duplicates have been
       * added, than those do not count towards the size.
       *
       * @returns Number
       */
      size() {
        return this._set.size;
      }
      /**
       * Add the given string to this set.
       *
       * @param String aStr
       */
      add(aStr, aAllowDuplicates) {
        let isDuplicate = this.has(aStr), idx = this._array.length;
        (!isDuplicate || aAllowDuplicates) && this._array.push(aStr), isDuplicate || this._set.set(aStr, idx);
      }
      /**
       * Is the given string a member of this set?
       *
       * @param String aStr
       */
      has(aStr) {
        return this._set.has(aStr);
      }
      /**
       * What is the index of the given string in the array?
       *
       * @param String aStr
       */
      indexOf(aStr) {
        let idx = this._set.get(aStr);
        if (idx >= 0)
          return idx;
        throw new Error('"' + aStr + '" is not in the set.');
      }
      /**
       * What is the element at the given index?
       *
       * @param Number aIdx
       */
      at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length)
          return this._array[aIdx];
        throw new Error("No element indexed by " + aIdx);
      }
      /**
       * Returns the array representation of this set (which has the proper indices
       * indicated by indexOf). Note that this is a copy of the internal array used
       * for storing the members so that no one can mess with internal state.
       */
      toArray() {
        return this._array.slice();
      }
    };
    exports.ArraySet = ArraySet;
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/mapping-list.js"(exports) {
    init_cjs_shims();
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      let lineA = mappingA.generatedLine, lineB = mappingB.generatedLine, columnA = mappingA.generatedColumn, columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    var MappingList = class {
      constructor() {
        this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
      }
      /**
       * Iterate through internal items. This method takes the same arguments that
       * `Array.prototype.forEach` takes.
       *
       * NOTE: The order of the mappings is NOT guaranteed.
       */
      unsortedForEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      }
      /**
       * Add the given source mapping.
       *
       * @param Object aMapping
       */
      add(aMapping) {
        generatedPositionAfter(this._last, aMapping) ? (this._last = aMapping, this._array.push(aMapping)) : (this._sorted = !1, this._array.push(aMapping));
      }
      /**
       * Returns the flat, sorted array of mappings. The mappings are sorted by
       * generated position.
       *
       * WARNING: This method returns internal data without copying, for
       * performance. The return value must NOT be mutated, and should be treated as
       * an immutable borrow. If you want to take ownership, you must make your own
       * copy.
       */
      toArray() {
        return this._sorted || (this._array.sort(util.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
      }
    };
    exports.MappingList = MappingList;
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-map-generator.js"(exports) {
    init_cjs_shims();
    var base64VLQ = require_base64_vlq(), util = require_util(), ArraySet = require_array_set().ArraySet, MappingList = require_mapping_list().MappingList, SourceMapGenerator = class _SourceMapGenerator {
      constructor(aArgs) {
        aArgs || (aArgs = {}), this._file = util.getArg(aArgs, "file", null), this._sourceRoot = util.getArg(aArgs, "sourceRoot", null), this._skipValidation = util.getArg(aArgs, "skipValidation", !1), this._sources = new ArraySet(), this._names = new ArraySet(), this._mappings = new MappingList(), this._sourcesContents = null;
      }
      /**
       * Creates a new SourceMapGenerator based on a SourceMapConsumer
       *
       * @param aSourceMapConsumer The SourceMap.
       */
      static fromSourceMap(aSourceMapConsumer) {
        let sourceRoot = aSourceMapConsumer.sourceRoot, generator = new _SourceMapGenerator({
          file: aSourceMapConsumer.file,
          sourceRoot
        });
        return aSourceMapConsumer.eachMapping(function(mapping) {
          let newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };
          mapping.source != null && (newMapping.source = mapping.source, sourceRoot != null && (newMapping.source = util.relative(sourceRoot, newMapping.source)), newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          }, mapping.name != null && (newMapping.name = mapping.name)), generator.addMapping(newMapping);
        }), aSourceMapConsumer.sources.forEach(function(sourceFile) {
          let sourceRelative = sourceFile;
          sourceRoot !== null && (sourceRelative = util.relative(sourceRoot, sourceFile)), generator._sources.has(sourceRelative) || generator._sources.add(sourceRelative);
          let content = aSourceMapConsumer.sourceContentFor(sourceFile);
          content != null && generator.setSourceContent(sourceFile, content);
        }), generator;
      }
      /**
       * Add a single mapping from original source line and column to the generated
       * source's line and column for this source map being created. The mapping
       * object should have the following properties:
       *
       *   - generated: An object with the generated line and column positions.
       *   - original: An object with the original line and column positions.
       *   - source: The original source file (relative to the sourceRoot).
       *   - name: An optional original token name for this mapping.
       */
      addMapping(aArgs) {
        let generated = util.getArg(aArgs, "generated"), original = util.getArg(aArgs, "original", null), source = util.getArg(aArgs, "source", null), name = util.getArg(aArgs, "name", null);
        this._skipValidation || this._validateMapping(generated, original, source, name), source != null && (source = String(source), this._sources.has(source) || this._sources.add(source)), name != null && (name = String(name), this._names.has(name) || this._names.add(name)), this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source,
          name
        });
      }
      /**
       * Set the source content for a source file.
       */
      setSourceContent(aSourceFile, aSourceContent) {
        let source = aSourceFile;
        this._sourceRoot != null && (source = util.relative(this._sourceRoot, source)), aSourceContent != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[util.toSetString(source)] = aSourceContent) : this._sourcesContents && (delete this._sourcesContents[util.toSetString(source)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
      }
      /**
       * Applies the mappings of a sub-source-map for a specific source file to the
       * source map being generated. Each mapping to the supplied source file is
       * rewritten using the supplied source map. Note: The resolution for the
       * resulting mappings is the minimium of this map and the supplied map.
       *
       * @param aSourceMapConsumer The source map to be applied.
       * @param aSourceFile Optional. The filename of the source file.
       *        If omitted, SourceMapConsumer's file property will be used.
       * @param aSourceMapPath Optional. The dirname of the path to the source map
       *        to be applied. If relative, it is relative to the SourceMapConsumer.
       *        This parameter is needed when the two source maps aren't in the same
       *        directory, and the source map to be applied contains relative source
       *        paths. If so, those relative source paths need to be rewritten
       *        relative to the SourceMapGenerator.
       */
      applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        let sourceFile = aSourceFile;
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null)
            throw new Error(
              `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
            );
          sourceFile = aSourceMapConsumer.file;
        }
        let sourceRoot = this._sourceRoot;
        sourceRoot != null && (sourceFile = util.relative(sourceRoot, sourceFile));
        let newSources = this._mappings.toArray().length > 0 ? new ArraySet() : this._sources, newNames = new ArraySet();
        this._mappings.unsortedForEach(function(mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            let original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            original.source != null && (mapping.source = original.source, aSourceMapPath != null && (mapping.source = util.join(aSourceMapPath, mapping.source)), sourceRoot != null && (mapping.source = util.relative(sourceRoot, mapping.source)), mapping.originalLine = original.line, mapping.originalColumn = original.column, original.name != null && (mapping.name = original.name));
          }
          let source = mapping.source;
          source != null && !newSources.has(source) && newSources.add(source);
          let name = mapping.name;
          name != null && !newNames.has(name) && newNames.add(name);
        }, this), this._sources = newSources, this._names = newNames, aSourceMapConsumer.sources.forEach(function(srcFile) {
          let content = aSourceMapConsumer.sourceContentFor(srcFile);
          content != null && (aSourceMapPath != null && (srcFile = util.join(aSourceMapPath, srcFile)), sourceRoot != null && (srcFile = util.relative(sourceRoot, srcFile)), this.setSourceContent(srcFile, content));
        }, this);
      }
      /**
       * A mapping can have one of the three levels of data:
       *
       *   1. Just the generated position.
       *   2. The Generated position, original position, and original source.
       *   3. Generated and original position, original source, as well as a name
       *      token.
       *
       * To maintain consistency, we validate that any new mapping being added falls
       * in to one of these categories.
       */
      _validateMapping(aGenerated, aOriginal, aSource, aName) {
        if (aOriginal && typeof aOriginal.line != "number" && typeof aOriginal.column != "number")
          throw new Error(
            "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
          );
        if (!(aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName)) {
          if (!(aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource))
            throw new Error("Invalid mapping: " + JSON.stringify({
              generated: aGenerated,
              source: aSource,
              original: aOriginal,
              name: aName
            }));
        }
      }
      /**
       * Serialize the accumulated mappings in to the stream of base 64 VLQs
       * specified by the source map format.
       */
      _serializeMappings() {
        let previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = "", next, mapping, nameIdx, sourceIdx, mappings = this._mappings.toArray();
        for (let i = 0, len = mappings.length; i < len; i++) {
          if (mapping = mappings[i], next = "", mapping.generatedLine !== previousGeneratedLine)
            for (previousGeneratedColumn = 0; mapping.generatedLine !== previousGeneratedLine; )
              next += ";", previousGeneratedLine++;
          else if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1]))
              continue;
            next += ",";
          }
          next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn), previousGeneratedColumn = mapping.generatedColumn, mapping.source != null && (sourceIdx = this._sources.indexOf(mapping.source), next += base64VLQ.encode(sourceIdx - previousSource), previousSource = sourceIdx, next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine), previousOriginalLine = mapping.originalLine - 1, next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn), previousOriginalColumn = mapping.originalColumn, mapping.name != null && (nameIdx = this._names.indexOf(mapping.name), next += base64VLQ.encode(nameIdx - previousName), previousName = nameIdx)), result += next;
        }
        return result;
      }
      _generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function(source) {
          if (!this._sourcesContents)
            return null;
          aSourceRoot != null && (source = util.relative(aSourceRoot, source));
          let key = util.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
        }, this);
      }
      /**
       * Externalize the source map.
       */
      toJSON() {
        let map = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        return this._file != null && (map.file = this._file), this._sourceRoot != null && (map.sourceRoot = this._sourceRoot), this._sourcesContents && (map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)), map;
      }
      /**
       * Render the source map being generated to a string.
       */
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
    SourceMapGenerator.prototype._version = 3;
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/binary-search.js
var require_binary_search = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/binary-search.js"(exports) {
    init_cjs_shims();
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      let mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], !0);
      return cmp === 0 ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? aHigh < aHaystack.length ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? mid : aLow < 0 ? -1 : aLow;
    }
    exports.search = function(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0)
        return -1;
      let index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports.GREATEST_LOWER_BOUND
      );
      if (index < 0)
        return -1;
      for (; index - 1 >= 0 && aCompare(aHaystack[index], aHaystack[index - 1], !0) === 0; )
        --index;
      return index;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/read-wasm.js
var require_read_wasm = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/read-wasm.js"(exports, module) {
    init_cjs_shims();
    var isBrowserEnvironment = function() {
      return typeof window < "u" && this === window;
    }.call();
    if (isBrowserEnvironment) {
      let mappingsWasm = null;
      module.exports = function() {
        if (typeof mappingsWasm == "string")
          return fetch(mappingsWasm).then((response) => response.arrayBuffer());
        if (mappingsWasm instanceof ArrayBuffer)
          return Promise.resolve(mappingsWasm);
        throw new Error("You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer");
      }, module.exports.initialize = (input) => mappingsWasm = input;
    } else {
      let fs = __require("fs"), path = __require("path");
      module.exports = function() {
        return new Promise((resolve, reject) => {
          let wasmPath = path.join(__dirname, "mappings.wasm");
          fs.readFile(wasmPath, null, (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(data.buffer);
          });
        });
      }, module.exports.initialize = (_) => {
        console.debug("SourceMapConsumer.initialize is a no-op when running in node.js");
      };
    }
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/wasm.js
var require_wasm = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/wasm.js"(exports, module) {
    init_cjs_shims();
    var readWasm = require_read_wasm();
    function Mapping() {
      this.generatedLine = 0, this.generatedColumn = 0, this.lastGeneratedColumn = null, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
    }
    var cachedWasm = null;
    module.exports = function() {
      if (cachedWasm)
        return cachedWasm;
      let callbackStack = [];
      return cachedWasm = readWasm().then((buffer) => WebAssembly.instantiate(buffer, {
        env: {
          mapping_callback(generatedLine, generatedColumn, hasLastGeneratedColumn, lastGeneratedColumn, hasOriginal, source, originalLine, originalColumn, hasName, name) {
            let mapping = new Mapping();
            mapping.generatedLine = generatedLine + 1, mapping.generatedColumn = generatedColumn, hasLastGeneratedColumn && (mapping.lastGeneratedColumn = lastGeneratedColumn - 1), hasOriginal && (mapping.source = source, mapping.originalLine = originalLine + 1, mapping.originalColumn = originalColumn, hasName && (mapping.name = name)), callbackStack[callbackStack.length - 1](mapping);
          },
          start_all_generated_locations_for() {
            console.time("all_generated_locations_for");
          },
          end_all_generated_locations_for() {
            console.timeEnd("all_generated_locations_for");
          },
          start_compute_column_spans() {
            console.time("compute_column_spans");
          },
          end_compute_column_spans() {
            console.timeEnd("compute_column_spans");
          },
          start_generated_location_for() {
            console.time("generated_location_for");
          },
          end_generated_location_for() {
            console.timeEnd("generated_location_for");
          },
          start_original_location_for() {
            console.time("original_location_for");
          },
          end_original_location_for() {
            console.timeEnd("original_location_for");
          },
          start_parse_mappings() {
            console.time("parse_mappings");
          },
          end_parse_mappings() {
            console.timeEnd("parse_mappings");
          },
          start_sort_by_generated_location() {
            console.time("sort_by_generated_location");
          },
          end_sort_by_generated_location() {
            console.timeEnd("sort_by_generated_location");
          },
          start_sort_by_original_location() {
            console.time("sort_by_original_location");
          },
          end_sort_by_original_location() {
            console.timeEnd("sort_by_original_location");
          }
        }
      })).then((Wasm) => ({
        exports: Wasm.instance.exports,
        withMappingCallback: (mappingCallback, f) => {
          callbackStack.push(mappingCallback);
          try {
            f();
          } finally {
            callbackStack.pop();
          }
        }
      })).then(null, (e) => {
        throw cachedWasm = null, e;
      }), cachedWasm;
    };
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-map-consumer.js"(exports) {
    init_cjs_shims();
    var util = require_util(), binarySearch = require_binary_search(), ArraySet = require_array_set().ArraySet, base64VLQ = require_base64_vlq(), readWasm = require_read_wasm(), wasm = require_wasm(), INTERNAL = Symbol("smcInternal"), SourceMapConsumer = class _SourceMapConsumer {
      constructor(aSourceMap, aSourceMapURL) {
        return aSourceMap == INTERNAL ? Promise.resolve(this) : _factory(aSourceMap, aSourceMapURL);
      }
      static initialize(opts) {
        readWasm.initialize(opts["lib/mappings.wasm"]);
      }
      static fromSourceMap(aSourceMap, aSourceMapURL) {
        return _factoryBSM(aSourceMap, aSourceMapURL);
      }
      /**
       * Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
       * (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
       * function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
       * for `f` to complete, call `destroy` on the consumer, and return `f`'s return
       * value.
       *
       * You must not use the consumer after `f` completes!
       *
       * By using `with`, you do not have to remember to manually call `destroy` on
       * the consumer, since it will be called automatically once `f` completes.
       *
       * ```js
       * const xSquared = await SourceMapConsumer.with(
       *   myRawSourceMap,
       *   null,
       *   async function (consumer) {
       *     // Use `consumer` inside here and don't worry about remembering
       *     // to call `destroy`.
       *
       *     const x = await whatever(consumer);
       *     return x * x;
       *   }
       * );
       *
       * // You may not use that `consumer` anymore out here; it has
       * // been destroyed. But you can use `xSquared`.
       * console.log(xSquared);
       * ```
       */
      static async with(rawSourceMap, sourceMapUrl, f) {
        let consumer = await new _SourceMapConsumer(rawSourceMap, sourceMapUrl);
        try {
          return await f(consumer);
        } finally {
          consumer.destroy();
        }
      }
      /**
       * Parse the mappings in a string in to a data structure which we can easily
       * query (the ordered arrays in the `this.__generatedMappings` and
       * `this.__originalMappings` properties).
       */
      _parseMappings(aStr, aSourceRoot) {
        throw new Error("Subclasses must implement _parseMappings");
      }
      /**
       * Iterate over each mapping between an original source/line/column and a
       * generated line/column in this source map.
       *
       * @param Function aCallback
       *        The function that is called with each mapping.
       * @param Object aContext
       *        Optional. If specified, this object will be the value of `this` every
       *        time that `aCallback` is called.
       * @param aOrder
       *        Either `SourceMapConsumer.GENERATED_ORDER` or
       *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
       *        iterate over the mappings sorted by the generated file's line/column
       *        order or the original's source/line/column order, respectively. Defaults to
       *        `SourceMapConsumer.GENERATED_ORDER`.
       */
      eachMapping(aCallback, aContext, aOrder) {
        throw new Error("Subclasses must implement eachMapping");
      }
      /**
       * Returns all generated line and column information for the original source,
       * line, and column provided. If no column is provided, returns all mappings
       * corresponding to a either the line we are searching for or the next
       * closest line that has any mappings. Otherwise, returns all mappings
       * corresponding to the given line and either the column we are searching for
       * or the next closest column that has any offsets.
       *
       * The only argument is an object with the following properties:
       *
       *   - source: The filename of the original source.
       *   - line: The line number in the original source.  The line number is 1-based.
       *   - column: Optional. the column number in the original source.
       *    The column number is 0-based.
       *
       * and an array of objects is returned, each with the following properties:
       *
       *   - line: The line number in the generated source, or null.  The
       *    line number is 1-based.
       *   - column: The column number in the generated source, or null.
       *    The column number is 0-based.
       */
      allGeneratedPositionsFor(aArgs) {
        throw new Error("Subclasses must implement allGeneratedPositionsFor");
      }
      destroy() {
        throw new Error("Subclasses must implement destroy");
      }
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    exports.SourceMapConsumer = SourceMapConsumer;
    var BasicSourceMapConsumer = class _BasicSourceMapConsumer extends SourceMapConsumer {
      constructor(aSourceMap, aSourceMapURL) {
        return super(INTERNAL).then((that) => {
          let sourceMap = aSourceMap;
          typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap));
          let version = util.getArg(sourceMap, "version"), sources = util.getArg(sourceMap, "sources"), names = util.getArg(sourceMap, "names", []), sourceRoot = util.getArg(sourceMap, "sourceRoot", null), sourcesContent = util.getArg(sourceMap, "sourcesContent", null), mappings = util.getArg(sourceMap, "mappings"), file = util.getArg(sourceMap, "file", null);
          if (version != that._version)
            throw new Error("Unsupported version: " + version);
          return sourceRoot && (sourceRoot = util.normalize(sourceRoot)), sources = sources.map(String).map(util.normalize).map(function(source) {
            return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
          }), that._names = ArraySet.fromArray(names.map(String), !0), that._sources = ArraySet.fromArray(sources, !0), that._absoluteSources = that._sources.toArray().map(function(s) {
            return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
          }), that.sourceRoot = sourceRoot, that.sourcesContent = sourcesContent, that._mappings = mappings, that._sourceMapURL = aSourceMapURL, that.file = file, that._computedColumnSpans = !1, that._mappingsPtr = 0, that._wasm = null, wasm().then((w) => (that._wasm = w, that));
        });
      }
      /**
       * Utility function to find the index of a source.  Returns -1 if not
       * found.
       */
      _findSourceIndex(aSource) {
        let relativeSource = aSource;
        if (this.sourceRoot != null && (relativeSource = util.relative(this.sourceRoot, relativeSource)), this._sources.has(relativeSource))
          return this._sources.indexOf(relativeSource);
        for (let i = 0; i < this._absoluteSources.length; ++i)
          if (this._absoluteSources[i] == aSource)
            return i;
        return -1;
      }
      /**
       * Create a BasicSourceMapConsumer from a SourceMapGenerator.
       *
       * @param SourceMapGenerator aSourceMap
       *        The source map that will be consumed.
       * @param String aSourceMapURL
       *        The URL at which the source map can be found (optional)
       * @returns BasicSourceMapConsumer
       */
      static fromSourceMap(aSourceMap, aSourceMapURL) {
        return new _BasicSourceMapConsumer(aSourceMap.toString());
      }
      get sources() {
        return this._absoluteSources.slice();
      }
      _getMappingsPtr() {
        return this._mappingsPtr === 0 && this._parseMappings(this._mappings, this.sourceRoot), this._mappingsPtr;
      }
      /**
       * Parse the mappings in a string in to a data structure which we can easily
       * query (the ordered arrays in the `this.__generatedMappings` and
       * `this.__originalMappings` properties).
       */
      _parseMappings(aStr, aSourceRoot) {
        let size = aStr.length, mappingsBufPtr = this._wasm.exports.allocate_mappings(size), mappingsBuf = new Uint8Array(this._wasm.exports.memory.buffer, mappingsBufPtr, size);
        for (let i = 0; i < size; i++)
          mappingsBuf[i] = aStr.charCodeAt(i);
        let mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);
        if (!mappingsPtr) {
          let error = this._wasm.exports.get_last_error(), msg = `Error parsing mappings (code ${error}): `;
          switch (error) {
            case 1:
              msg += "the mappings contained a negative line, column, source index, or name index";
              break;
            case 2:
              msg += "the mappings contained a number larger than 2**32";
              break;
            case 3:
              msg += "reached EOF while in the middle of parsing a VLQ";
              break;
            case 4:
              msg += "invalid base 64 character while parsing a VLQ";
              break;
            default:
              msg += "unknown error code";
              break;
          }
          throw new Error(msg);
        }
        this._mappingsPtr = mappingsPtr;
      }
      eachMapping(aCallback, aContext, aOrder) {
        let context = aContext || null, order = aOrder || SourceMapConsumer.GENERATED_ORDER, sourceRoot = this.sourceRoot;
        this._wasm.withMappingCallback(
          (mapping) => {
            mapping.source !== null && (mapping.source = this._sources.at(mapping.source), mapping.source = util.computeSourceURL(sourceRoot, mapping.source, this._sourceMapURL), mapping.name !== null && (mapping.name = this._names.at(mapping.name))), aCallback.call(context, mapping);
          },
          () => {
            switch (order) {
              case SourceMapConsumer.GENERATED_ORDER:
                this._wasm.exports.by_generated_location(this._getMappingsPtr());
                break;
              case SourceMapConsumer.ORIGINAL_ORDER:
                this._wasm.exports.by_original_location(this._getMappingsPtr());
                break;
              default:
                throw new Error("Unknown order of iteration.");
            }
          }
        );
      }
      allGeneratedPositionsFor(aArgs) {
        let source = util.getArg(aArgs, "source"), originalLine = util.getArg(aArgs, "line"), originalColumn = aArgs.column || 0;
        if (source = this._findSourceIndex(source), source < 0)
          return [];
        if (originalLine < 1)
          throw new Error("Line numbers must be >= 1");
        if (originalColumn < 0)
          throw new Error("Column numbers must be >= 0");
        let mappings = [];
        return this._wasm.withMappingCallback(
          (m) => {
            let lastColumn = m.lastGeneratedColumn;
            this._computedColumnSpans && lastColumn === null && (lastColumn = 1 / 0), mappings.push({
              line: m.generatedLine,
              column: m.generatedColumn,
              lastColumn
            });
          },
          () => {
            this._wasm.exports.all_generated_locations_for(
              this._getMappingsPtr(),
              source,
              originalLine - 1,
              "column" in aArgs,
              originalColumn
            );
          }
        ), mappings;
      }
      destroy() {
        this._mappingsPtr !== 0 && (this._wasm.exports.free_mappings(this._mappingsPtr), this._mappingsPtr = 0);
      }
      /**
       * Compute the last column for each generated mapping. The last column is
       * inclusive.
       */
      computeColumnSpans() {
        this._computedColumnSpans || (this._wasm.exports.compute_column_spans(this._getMappingsPtr()), this._computedColumnSpans = !0);
      }
      /**
       * Returns the original source, line, and column information for the generated
       * source's line and column positions provided. The only argument is an object
       * with the following properties:
       *
       *   - line: The line number in the generated source.  The line number
       *     is 1-based.
       *   - column: The column number in the generated source.  The column
       *     number is 0-based.
       *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
       *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
       *     closest element that is smaller than or greater than the one we are
       *     searching for, respectively, if the exact element cannot be found.
       *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
       *
       * and an object is returned with the following properties:
       *
       *   - source: The original source file, or null.
       *   - line: The line number in the original source, or null.  The
       *     line number is 1-based.
       *   - column: The column number in the original source, or null.  The
       *     column number is 0-based.
       *   - name: The original identifier, or null.
       */
      originalPositionFor(aArgs) {
        let needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        if (needle.generatedLine < 1)
          throw new Error("Line numbers must be >= 1");
        if (needle.generatedColumn < 0)
          throw new Error("Column numbers must be >= 0");
        let bias = util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND);
        bias == null && (bias = SourceMapConsumer.GREATEST_LOWER_BOUND);
        let mapping;
        if (this._wasm.withMappingCallback((m) => mapping = m, () => {
          this._wasm.exports.original_location_for(
            this._getMappingsPtr(),
            needle.generatedLine - 1,
            needle.generatedColumn,
            bias
          );
        }), mapping && mapping.generatedLine === needle.generatedLine) {
          let source = util.getArg(mapping, "source", null);
          source !== null && (source = this._sources.at(source), source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL));
          let name = util.getArg(mapping, "name", null);
          return name !== null && (name = this._names.at(name)), {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      /**
       * Return true if we have the source content for every source in the source
       * map, false otherwise.
       */
      hasContentsOfAllSources() {
        return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
          return sc == null;
        }) : !1;
      }
      /**
       * Returns the original source content. The only argument is the url of the
       * original source file. Returns null if no original source content is
       * available.
       */
      sourceContentFor(aSource, nullOnMissing) {
        if (!this.sourcesContent)
          return null;
        let index = this._findSourceIndex(aSource);
        if (index >= 0)
          return this.sourcesContent[index];
        let relativeSource = aSource;
        this.sourceRoot != null && (relativeSource = util.relative(this.sourceRoot, relativeSource));
        let url;
        if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
          let fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
          if (url.scheme == "file" && this._sources.has(fileUriAbsPath))
            return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
          if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource))
            return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
        if (nullOnMissing)
          return null;
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
      /**
       * Returns the generated line and column information for the original source,
       * line, and column positions provided. The only argument is an object with
       * the following properties:
       *
       *   - source: The filename of the original source.
       *   - line: The line number in the original source.  The line number
       *     is 1-based.
       *   - column: The column number in the original source.  The column
       *     number is 0-based.
       *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
       *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
       *     closest element that is smaller than or greater than the one we are
       *     searching for, respectively, if the exact element cannot be found.
       *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
       *
       * and an object is returned with the following properties:
       *
       *   - line: The line number in the generated source, or null.  The
       *     line number is 1-based.
       *   - column: The column number in the generated source, or null.
       *     The column number is 0-based.
       */
      generatedPositionFor(aArgs) {
        let source = util.getArg(aArgs, "source");
        if (source = this._findSourceIndex(source), source < 0)
          return {
            line: null,
            column: null,
            lastColumn: null
          };
        let needle = {
          source,
          originalLine: util.getArg(aArgs, "line"),
          originalColumn: util.getArg(aArgs, "column")
        };
        if (needle.originalLine < 1)
          throw new Error("Line numbers must be >= 1");
        if (needle.originalColumn < 0)
          throw new Error("Column numbers must be >= 0");
        let bias = util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND);
        bias == null && (bias = SourceMapConsumer.GREATEST_LOWER_BOUND);
        let mapping;
        if (this._wasm.withMappingCallback((m) => mapping = m, () => {
          this._wasm.exports.generated_location_for(
            this._getMappingsPtr(),
            needle.source,
            needle.originalLine - 1,
            needle.originalColumn,
            bias
          );
        }), mapping && mapping.source === needle.source) {
          let lastColumn = mapping.lastGeneratedColumn;
          return this._computedColumnSpans && lastColumn === null && (lastColumn = 1 / 0), {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn
          };
        }
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
    };
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    var IndexedSourceMapConsumer = class extends SourceMapConsumer {
      constructor(aSourceMap, aSourceMapURL) {
        return super(INTERNAL).then((that) => {
          let sourceMap = aSourceMap;
          typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap));
          let version = util.getArg(sourceMap, "version"), sections = util.getArg(sourceMap, "sections");
          if (version != that._version)
            throw new Error("Unsupported version: " + version);
          that._sources = new ArraySet(), that._names = new ArraySet(), that.__generatedMappings = null, that.__originalMappings = null, that.__generatedMappingsUnsorted = null, that.__originalMappingsUnsorted = null;
          let lastOffset = {
            line: -1,
            column: 0
          };
          return Promise.all(sections.map((s) => {
            if (s.url)
              throw new Error("Support for url field in sections not implemented.");
            let offset = util.getArg(s, "offset"), offsetLine = util.getArg(offset, "line"), offsetColumn = util.getArg(offset, "column");
            if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
              throw new Error("Section offsets must be ordered and non-overlapping.");
            return lastOffset = offset, new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL).then((consumer) => ({
              generatedOffset: {
                // The offset fields are 0-based, but we use 1-based indices when
                // encoding/decoding from VLQ.
                generatedLine: offsetLine + 1,
                generatedColumn: offsetColumn + 1
              },
              consumer
            }));
          })).then((s) => (that._sections = s, that));
        });
      }
      // `__generatedMappings` and `__originalMappings` are arrays that hold the
      // parsed mapping coordinates from the source map's "mappings" attribute. They
      // are lazily instantiated, accessed via the `_generatedMappings` and
      // `_originalMappings` getters respectively, and we only parse the mappings
      // and create these arrays once queried for a source location. We jump through
      // these hoops because there can be many thousands of mappings, and parsing
      // them is expensive, so we only want to do it if we must.
      //
      // Each object in the arrays is of the form:
      //
      //     {
      //       generatedLine: The line number in the generated code,
      //       generatedColumn: The column number in the generated code,
      //       source: The path to the original source file that generated this
      //               chunk of code,
      //       originalLine: The line number in the original source that
      //                     corresponds to this chunk of generated code,
      //       originalColumn: The column number in the original source that
      //                       corresponds to this chunk of generated code,
      //       name: The name of the original symbol which generated this chunk of
      //             code.
      //     }
      //
      // All properties except for `generatedLine` and `generatedColumn` can be
      // `null`.
      //
      // `_generatedMappings` is ordered by the generated positions.
      //
      // `_originalMappings` is ordered by the original positions.
      get _generatedMappings() {
        return this.__generatedMappings || this._sortGeneratedMappings(), this.__generatedMappings;
      }
      get _originalMappings() {
        return this.__originalMappings || this._sortOriginalMappings(), this.__originalMappings;
      }
      get _generatedMappingsUnsorted() {
        return this.__generatedMappingsUnsorted || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappingsUnsorted;
      }
      get _originalMappingsUnsorted() {
        return this.__originalMappingsUnsorted || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappingsUnsorted;
      }
      _sortGeneratedMappings() {
        let mappings = this._generatedMappingsUnsorted;
        mappings.sort(util.compareByGeneratedPositionsDeflated), this.__generatedMappings = mappings;
      }
      _sortOriginalMappings() {
        let mappings = this._originalMappingsUnsorted;
        mappings.sort(util.compareByOriginalPositions), this.__originalMappings = mappings;
      }
      /**
       * The list of original sources.
       */
      get sources() {
        let sources = [];
        for (let i = 0; i < this._sections.length; i++)
          for (let j = 0; j < this._sections[i].consumer.sources.length; j++)
            sources.push(this._sections[i].consumer.sources[j]);
        return sources;
      }
      /**
       * Returns the original source, line, and column information for the generated
       * source's line and column positions provided. The only argument is an object
       * with the following properties:
       *
       *   - line: The line number in the generated source.  The line number
       *     is 1-based.
       *   - column: The column number in the generated source.  The column
       *     number is 0-based.
       *
       * and an object is returned with the following properties:
       *
       *   - source: The original source file, or null.
       *   - line: The line number in the original source, or null.  The
       *     line number is 1-based.
       *   - column: The column number in the original source, or null.  The
       *     column number is 0-based.
       *   - name: The original identifier, or null.
       */
      originalPositionFor(aArgs) {
        let needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        }, sectionIndex = binarySearch.search(
          needle,
          this._sections,
          function(aNeedle, section2) {
            let cmp = aNeedle.generatedLine - section2.generatedOffset.generatedLine;
            return cmp || aNeedle.generatedColumn - section2.generatedOffset.generatedColumn;
          }
        ), section = this._sections[sectionIndex];
        return section ? section.consumer.originalPositionFor({
          line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
          column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          bias: aArgs.bias
        }) : {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      /**
       * Return true if we have the source content for every source in the source
       * map, false otherwise.
       */
      hasContentsOfAllSources() {
        return this._sections.every(function(s) {
          return s.consumer.hasContentsOfAllSources();
        });
      }
      /**
       * Returns the original source content. The only argument is the url of the
       * original source file. Returns null if no original source content is
       * available.
       */
      sourceContentFor(aSource, nullOnMissing) {
        for (let i = 0; i < this._sections.length; i++) {
          let content = this._sections[i].consumer.sourceContentFor(aSource, !0);
          if (content)
            return content;
        }
        if (nullOnMissing)
          return null;
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
      /**
       * Returns the generated line and column information for the original source,
       * line, and column positions provided. The only argument is an object with
       * the following properties:
       *
       *   - source: The filename of the original source.
       *   - line: The line number in the original source.  The line number
       *     is 1-based.
       *   - column: The column number in the original source.  The column
       *     number is 0-based.
       *
       * and an object is returned with the following properties:
       *
       *   - line: The line number in the generated source, or null.  The
       *     line number is 1-based.
       *   - column: The column number in the generated source, or null.
       *     The column number is 0-based.
       */
      generatedPositionFor(aArgs) {
        for (let i = 0; i < this._sections.length; i++) {
          let section = this._sections[i];
          if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1)
            continue;
          let generatedPosition = section.consumer.generatedPositionFor(aArgs);
          if (generatedPosition)
            return {
              line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
              column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
        }
        return {
          line: null,
          column: null
        };
      }
      /**
       * Parse the mappings in a string in to a data structure which we can easily
       * query (the ordered arrays in the `this.__generatedMappings` and
       * `this.__originalMappings` properties).
       */
      _parseMappings(aStr, aSourceRoot) {
        let generatedMappings = this.__generatedMappingsUnsorted = [], originalMappings = this.__originalMappingsUnsorted = [];
        for (let i = 0; i < this._sections.length; i++) {
          let section = this._sections[i], sectionMappings = [];
          section.consumer.eachMapping((m) => sectionMappings.push(m));
          for (let j = 0; j < sectionMappings.length; j++) {
            let mapping = sectionMappings[j], source = util.computeSourceURL(section.consumer.sourceRoot, null, this._sourceMapURL);
            this._sources.add(source), source = this._sources.indexOf(source);
            let name = null;
            mapping.name && (this._names.add(mapping.name), name = this._names.indexOf(mapping.name));
            let adjustedMapping = {
              source,
              generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
              generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
              originalLine: mapping.originalLine,
              originalColumn: mapping.originalColumn,
              name
            };
            generatedMappings.push(adjustedMapping), typeof adjustedMapping.originalLine == "number" && originalMappings.push(adjustedMapping);
          }
        }
      }
      eachMapping(aCallback, aContext, aOrder) {
        let context = aContext || null, order = aOrder || SourceMapConsumer.GENERATED_ORDER, mappings;
        switch (order) {
          case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
          case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
          default:
            throw new Error("Unknown order of iteration.");
        }
        let sourceRoot = this.sourceRoot;
        mappings.map(function(mapping) {
          let source = null;
          return mapping.source !== null && (source = this._sources.at(mapping.source), source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL)), {
            source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
          };
        }, this).forEach(aCallback, context);
      }
      /**
       * Find the mapping that best matches the hypothetical "needle" mapping that
       * we are searching for in the given "haystack" of mappings.
       */
      _findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0)
          throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
        if (aNeedle[aColumnName] < 0)
          throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
        return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
      }
      allGeneratedPositionsFor(aArgs) {
        let line = util.getArg(aArgs, "line"), needle = {
          source: util.getArg(aArgs, "source"),
          originalLine: line,
          originalColumn: util.getArg(aArgs, "column", 0)
        };
        if (needle.source = this._findSourceIndex(needle.source), needle.source < 0)
          return [];
        if (needle.originalLine < 1)
          throw new Error("Line numbers must be >= 1");
        if (needle.originalColumn < 0)
          throw new Error("Column numbers must be >= 0");
        let mappings = [], index = this._findMapping(
          needle,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          util.compareByOriginalPositions,
          binarySearch.LEAST_UPPER_BOUND
        );
        if (index >= 0) {
          let mapping = this._originalMappings[index];
          if (aArgs.column === void 0) {
            let originalLine = mapping.originalLine;
            for (; mapping && mapping.originalLine === originalLine; ) {
              let lastColumn = mapping.lastGeneratedColumn;
              this._computedColumnSpans && lastColumn === null && (lastColumn = 1 / 0), mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn
              }), mapping = this._originalMappings[++index];
            }
          } else {
            let originalColumn = mapping.originalColumn;
            for (; mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn; ) {
              let lastColumn = mapping.lastGeneratedColumn;
              this._computedColumnSpans && lastColumn === null && (lastColumn = 1 / 0), mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn
              }), mapping = this._originalMappings[++index];
            }
          }
        }
        return mappings;
      }
      destroy() {
        for (let i = 0; i < this._sections.length; i++)
          this._sections[i].consumer.destroy();
      }
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    function _factory(aSourceMap, aSourceMapURL) {
      let sourceMap = aSourceMap;
      typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap));
      let consumer = sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
      return Promise.resolve(consumer);
    }
    function _factoryBSM(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    }
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-node.js
var require_source_node = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/lib/source-node.js"(exports) {
    init_cjs_shims();
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator, util = require_util(), REGEX_NEWLINE = /(\r?\n)/, NEWLINE_CODE = 10, isSourceNode = "$$$isSourceNode$$$", SourceNode = class _SourceNode {
      constructor(aLine, aColumn, aSource, aChunks, aName) {
        this.children = [], this.sourceContents = {}, this.line = aLine ?? null, this.column = aColumn ?? null, this.source = aSource ?? null, this.name = aName ?? null, this[isSourceNode] = !0, aChunks != null && this.add(aChunks);
      }
      /**
       * Creates a SourceNode from generated code and a SourceMapConsumer.
       *
       * @param aGeneratedCode The generated code
       * @param aSourceMapConsumer The SourceMap for the generated code
       * @param aRelativePath Optional. The path that relative sources in the
       *        SourceMapConsumer should be relative to.
       */
      static fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        let node = new _SourceNode(), remainingLines = aGeneratedCode.split(REGEX_NEWLINE), remainingLinesIndex = 0, shiftNextLine = function() {
          let lineContents = getNextLine(), newLine = getNextLine() || "";
          return lineContents + newLine;
          function getNextLine() {
            return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
          }
        }, lastGeneratedLine = 1, lastGeneratedColumn = 0, lastMapping = null, nextLine;
        return aSourceMapConsumer.eachMapping(function(mapping) {
          if (lastMapping !== null)
            if (lastGeneratedLine < mapping.generatedLine)
              addMappingWithCode(lastMapping, shiftNextLine()), lastGeneratedLine++, lastGeneratedColumn = 0;
            else {
              nextLine = remainingLines[remainingLinesIndex] || "";
              let code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
              remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn), lastGeneratedColumn = mapping.generatedColumn, addMappingWithCode(lastMapping, code), lastMapping = mapping;
              return;
            }
          for (; lastGeneratedLine < mapping.generatedLine; )
            node.add(shiftNextLine()), lastGeneratedLine++;
          lastGeneratedColumn < mapping.generatedColumn && (nextLine = remainingLines[remainingLinesIndex] || "", node.add(nextLine.substr(0, mapping.generatedColumn)), remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn), lastGeneratedColumn = mapping.generatedColumn), lastMapping = mapping;
        }, this), remainingLinesIndex < remainingLines.length && (lastMapping && addMappingWithCode(lastMapping, shiftNextLine()), node.add(remainingLines.splice(remainingLinesIndex).join(""))), aSourceMapConsumer.sources.forEach(function(sourceFile) {
          let content = aSourceMapConsumer.sourceContentFor(sourceFile);
          content != null && (aRelativePath != null && (sourceFile = util.join(aRelativePath, sourceFile)), node.setSourceContent(sourceFile, content));
        }), node;
        function addMappingWithCode(mapping, code) {
          if (mapping === null || mapping.source === void 0)
            node.add(code);
          else {
            let source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new _SourceNode(
              mapping.originalLine,
              mapping.originalColumn,
              source,
              code,
              mapping.name
            ));
          }
        }
      }
      /**
       * Add a chunk of generated JS to this source node.
       *
       * @param aChunk A string snippet of generated JS code, another instance of
       *        SourceNode, or an array where each member is one of those things.
       */
      add(aChunk) {
        if (Array.isArray(aChunk))
          aChunk.forEach(function(chunk) {
            this.add(chunk);
          }, this);
        else if (aChunk[isSourceNode] || typeof aChunk == "string")
          aChunk && this.children.push(aChunk);
        else
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
          );
        return this;
      }
      /**
       * Add a chunk of generated JS to the beginning of this source node.
       *
       * @param aChunk A string snippet of generated JS code, another instance of
       *        SourceNode, or an array where each member is one of those things.
       */
      prepend(aChunk) {
        if (Array.isArray(aChunk))
          for (let i = aChunk.length - 1; i >= 0; i--)
            this.prepend(aChunk[i]);
        else if (aChunk[isSourceNode] || typeof aChunk == "string")
          this.children.unshift(aChunk);
        else
          throw new TypeError(
            "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
          );
        return this;
      }
      /**
       * Walk over the tree of JS snippets in this node and its children. The
       * walking function is called once for each snippet of JS and is passed that
       * snippet and the its original associated source's line/column location.
       *
       * @param aFn The traversal function.
       */
      walk(aFn) {
        let chunk;
        for (let i = 0, len = this.children.length; i < len; i++)
          chunk = this.children[i], chunk[isSourceNode] ? chunk.walk(aFn) : chunk !== "" && aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
          });
      }
      /**
       * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
       * each of `this.children`.
       *
       * @param aSep The separator.
       */
      join(aSep) {
        let newChildren, i, len = this.children.length;
        if (len > 0) {
          for (newChildren = [], i = 0; i < len - 1; i++)
            newChildren.push(this.children[i]), newChildren.push(aSep);
          newChildren.push(this.children[i]), this.children = newChildren;
        }
        return this;
      }
      /**
       * Call String.prototype.replace on the very right-most source snippet. Useful
       * for trimming whitespace from the end of a source node, etc.
       *
       * @param aPattern The pattern to replace.
       * @param aReplacement The thing to replace the pattern with.
       */
      replaceRight(aPattern, aReplacement) {
        let lastChild = this.children[this.children.length - 1];
        return lastChild[isSourceNode] ? lastChild.replaceRight(aPattern, aReplacement) : typeof lastChild == "string" ? this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement) : this.children.push("".replace(aPattern, aReplacement)), this;
      }
      /**
       * Set the source content for a source file. This will be added to the SourceMapGenerator
       * in the sourcesContent field.
       *
       * @param aSourceFile The filename of the source file
       * @param aSourceContent The content of the source file
       */
      setSourceContent(aSourceFile, aSourceContent) {
        this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
      }
      /**
       * Walk over the tree of SourceNodes. The walking function is called for each
       * source file content and is passed the filename and source content.
       *
       * @param aFn The traversal function.
       */
      walkSourceContents(aFn) {
        for (let i = 0, len = this.children.length; i < len; i++)
          this.children[i][isSourceNode] && this.children[i].walkSourceContents(aFn);
        let sources = Object.keys(this.sourceContents);
        for (let i = 0, len = sources.length; i < len; i++)
          aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
      /**
       * Return the string representation of this source node. Walks over the tree
       * and concatenates all the various snippets together to one string.
       */
      toString() {
        let str = "";
        return this.walk(function(chunk) {
          str += chunk;
        }), str;
      }
      /**
       * Returns the string representation of this source node along with a source
       * map.
       */
      toStringWithSourceMap(aArgs) {
        let generated = {
          code: "",
          line: 1,
          column: 0
        }, map = new SourceMapGenerator(aArgs), sourceMappingActive = !1, lastOriginalSource = null, lastOriginalLine = null, lastOriginalColumn = null, lastOriginalName = null;
        return this.walk(function(chunk, original) {
          generated.code += chunk, original.source !== null && original.line !== null && original.column !== null ? ((lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) && map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          }), lastOriginalSource = original.source, lastOriginalLine = original.line, lastOriginalColumn = original.column, lastOriginalName = original.name, sourceMappingActive = !0) : sourceMappingActive && (map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          }), lastOriginalSource = null, sourceMappingActive = !1);
          for (let idx = 0, length = chunk.length; idx < length; idx++)
            chunk.charCodeAt(idx) === NEWLINE_CODE ? (generated.line++, generated.column = 0, idx + 1 === length ? (lastOriginalSource = null, sourceMappingActive = !1) : sourceMappingActive && map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            })) : generated.column++;
        }), this.walkSourceContents(function(sourceFile, sourceContent) {
          map.setSourceContent(sourceFile, sourceContent);
        }), { code: generated.code, map };
      }
    };
    exports.SourceNode = SourceNode;
  }
});

// ../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/source-map.js
var require_source_map = __commonJS({
  "../../node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/source-map.js"(exports) {
    init_cjs_shims();
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});
export default require_source_map();
//# sourceMappingURL=source-map-QCVC46UY.js.map
