import {
  require_braces,
  require_glob_parent,
  require_picomatch,
  require_utils
} from "./chunk-7IK72W75.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/array.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.splitWhen = exports.flatten = void 0;
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), []);
    }
    exports.flatten = flatten;
    function splitWhen(items, predicate) {
      let result = [[]], groupIndex = 0;
      for (let item of items)
        predicate(item) ? (groupIndex++, result[groupIndex] = []) : result[groupIndex].push(item);
      return result;
    }
    exports.splitWhen = splitWhen;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/errno.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.isEnoentCodeError = void 0;
    function isEnoentCodeError(error) {
      return error.code === "ENOENT";
    }
    exports.isEnoentCodeError = isEnoentCodeError;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/fs.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name, this.isBlockDevice = stats.isBlockDevice.bind(stats), this.isCharacterDevice = stats.isCharacterDevice.bind(stats), this.isDirectory = stats.isDirectory.bind(stats), this.isFIFO = stats.isFIFO.bind(stats), this.isFile = stats.isFile.bind(stats), this.isSocket = stats.isSocket.bind(stats), this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports.createDirentFromStats = createDirentFromStats;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/path.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.convertPosixPathToPattern = exports.convertWindowsPathToPattern = exports.convertPathToPattern = exports.escapePosixPath = exports.escapeWindowsPath = exports.escape = exports.removeLeadingDotSegment = exports.makeAbsolute = exports.unixify = void 0;
    var os = __require("os"), path = __require("path"), IS_WINDOWS_PLATFORM = os.platform() === "win32", LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2, POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g, WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g, DOS_DEVICE_PATH_RE = /^\\\\([.?])/, WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
    function unixify(filepath) {
      return filepath.replace(/\\/g, "/");
    }
    exports.unixify = unixify;
    function makeAbsolute(cwd, filepath) {
      return path.resolve(cwd, filepath);
    }
    exports.makeAbsolute = makeAbsolute;
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === ".") {
        let secondCharactery = entry.charAt(1);
        if (secondCharactery === "/" || secondCharactery === "\\")
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
      }
      return entry;
    }
    exports.removeLeadingDotSegment = removeLeadingDotSegment;
    exports.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
    function escapeWindowsPath(pattern) {
      return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
    }
    exports.escapeWindowsPath = escapeWindowsPath;
    function escapePosixPath(pattern) {
      return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
    }
    exports.escapePosixPath = escapePosixPath;
    exports.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
    function convertWindowsPathToPattern(filepath) {
      return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
    }
    exports.convertWindowsPathToPattern = convertWindowsPathToPattern;
    function convertPosixPathToPattern(filepath) {
      return escapePosixPath(filepath);
    }
    exports.convertPosixPathToPattern = convertPosixPathToPattern;
  }
});

// ../../node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "../../node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var util = __require("util"), braces = require_braces(), picomatch = require_picomatch(), utils = require_utils(), isEmptyString = (v) => v === "" || v === "./", hasBraces = (v) => {
      let index = v.indexOf("{");
      return index > -1 && v.indexOf("}", index) > -1;
    }, micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns), list = [].concat(list);
      let omit = /* @__PURE__ */ new Set(), keep = /* @__PURE__ */ new Set(), items = /* @__PURE__ */ new Set(), negatives = 0, onResult = (state) => {
        items.add(state.output), options && options.onResult && options.onResult(state);
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, !0), negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        negated && negatives++;
        for (let item of list) {
          let matched = isMatch(item, !0);
          (negated ? !matched.isMatch : matched.isMatch) && (negated ? omit.add(matched.output) : (omit.delete(matched.output), keep.add(matched.output)));
        }
      }
      let matches = (negatives === patterns.length ? [...items] : [...keep]).filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === !0)
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        if (options.nonull === !0 || options.nullglob === !0)
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = /* @__PURE__ */ new Set(), items = [], onResult = (state) => {
        options.onResult && options.onResult(state), items.push(state.output);
      }, matches = new Set(micromatch(list, patterns, { ...options, onResult }));
      for (let item of items)
        matches.has(item) || result.add(item);
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str != "string")
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      if (Array.isArray(pattern))
        return pattern.some((p) => micromatch.contains(str, p, options));
      if (typeof pattern == "string") {
        if (isEmptyString(str) || isEmptyString(pattern))
          return !1;
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern))
          return !0;
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: !0 });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj))
        throw new TypeError("Expected the first argument to be an object");
      let keys = micromatch(Object.keys(obj), patterns, options), res = {};
      for (let key of keys) res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item)))
          return !0;
      }
      return !1;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch(item)))
          return !1;
      }
      return !0;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str != "string")
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options), match = picomatch.makeRe(String(glob), { ...options, capture: !0 }).exec(posix ? utils.toPosixSlashes(input) : input);
      if (match)
        return match.slice(1).map((v) => v === void 0 ? "" : v);
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || []))
        for (let str of braces(String(pattern), options))
          res.push(picomatch.parse(str, options));
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern != "string") throw new TypeError("Expected a string");
      return options && options.nobrace === !0 || !hasBraces(pattern) ? [pattern] : braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern != "string") throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: !0 });
    };
    micromatch.hasBraces = hasBraces;
    module.exports = micromatch;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/pattern.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.isAbsolute = exports.partitionAbsoluteAndRelative = exports.removeDuplicateSlashes = exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
    var path = __require("path"), globParent = require_glob_parent(), micromatch = require_micromatch(), GLOBSTAR = "**", ESCAPE_SYMBOL = "\\", COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/, REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/, REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/, GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/, BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./, DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
    function isStaticPattern(pattern, options = {}) {
      return !isDynamicPattern(pattern, options);
    }
    exports.isStaticPattern = isStaticPattern;
    function isDynamicPattern(pattern, options = {}) {
      return pattern === "" ? !1 : !!(options.caseSensitiveMatch === !1 || pattern.includes(ESCAPE_SYMBOL) || COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern) || options.extglob !== !1 && GLOB_EXTENSION_SYMBOLS_RE.test(pattern) || options.braceExpansion !== !1 && hasBraceExpansion(pattern));
    }
    exports.isDynamicPattern = isDynamicPattern;
    function hasBraceExpansion(pattern) {
      let openingBraceIndex = pattern.indexOf("{");
      if (openingBraceIndex === -1)
        return !1;
      let closingBraceIndex = pattern.indexOf("}", openingBraceIndex + 1);
      if (closingBraceIndex === -1)
        return !1;
      let braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
      return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
    }
    function convertToPositivePattern(pattern) {
      return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
    }
    exports.convertToPositivePattern = convertToPositivePattern;
    function convertToNegativePattern(pattern) {
      return "!" + pattern;
    }
    exports.convertToNegativePattern = convertToNegativePattern;
    function isNegativePattern(pattern) {
      return pattern.startsWith("!") && pattern[1] !== "(";
    }
    exports.isNegativePattern = isNegativePattern;
    function isPositivePattern(pattern) {
      return !isNegativePattern(pattern);
    }
    exports.isPositivePattern = isPositivePattern;
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern);
    }
    exports.getNegativePatterns = getNegativePatterns;
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern);
    }
    exports.getPositivePatterns = getPositivePatterns;
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
    }
    exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory);
    }
    exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith("..") || pattern.startsWith("./..");
    }
    exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: !1 });
    }
    exports.getBaseDirectory = getBaseDirectory;
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR);
    }
    exports.hasGlobStar = hasGlobStar;
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith("/" + GLOBSTAR);
    }
    exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
    function isAffectDepthOfReadingPattern(pattern) {
      let basename = path.basename(pattern);
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
    }
    exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => collection.concat(expandBraceExpansion(pattern)), []);
    }
    exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
    function expandBraceExpansion(pattern) {
      let patterns = micromatch.braces(pattern, { expand: !0, nodupes: !0, keepEscaping: !0 });
      return patterns.sort((a, b) => a.length - b.length), patterns.filter((pattern2) => pattern2 !== "");
    }
    exports.expandBraceExpansion = expandBraceExpansion;
    function getPatternParts(pattern, options) {
      let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: !0 }));
      return parts.length === 0 && (parts = [pattern]), parts[0].startsWith("/") && (parts[0] = parts[0].slice(1), parts.unshift("")), parts;
    }
    exports.getPatternParts = getPatternParts;
    function makeRe(pattern, options) {
      return micromatch.makeRe(pattern, options);
    }
    exports.makeRe = makeRe;
    function convertPatternsToRe(patterns, options) {
      return patterns.map((pattern) => makeRe(pattern, options));
    }
    exports.convertPatternsToRe = convertPatternsToRe;
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry));
    }
    exports.matchAny = matchAny;
    function removeDuplicateSlashes(pattern) {
      return pattern.replace(DOUBLE_SLASH_RE, "/");
    }
    exports.removeDuplicateSlashes = removeDuplicateSlashes;
    function partitionAbsoluteAndRelative(patterns) {
      let absolute = [], relative = [];
      for (let pattern of patterns)
        isAbsolute(pattern) ? absolute.push(pattern) : relative.push(pattern);
      return [absolute, relative];
    }
    exports.partitionAbsoluteAndRelative = partitionAbsoluteAndRelative;
    function isAbsolute(pattern) {
      return path.isAbsolute(pattern);
    }
    exports.isAbsolute = isAbsolute;
  }
});

// ../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js
var require_merge2 = __commonJS({
  "../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var Stream = __require("stream"), PassThrough = Stream.PassThrough, slice = Array.prototype.slice;
    module.exports = merge2;
    function merge2() {
      let streamsQueue = [], args = slice.call(arguments), merging = !1, options = args[args.length - 1];
      options && !Array.isArray(options) && options.pipe == null ? args.pop() : options = {};
      let doEnd = options.end !== !1, doPipeError = options.pipeError === !0;
      options.objectMode == null && (options.objectMode = !0), options.highWaterMark == null && (options.highWaterMark = 64 * 1024);
      let mergedStream = PassThrough(options);
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++)
          streamsQueue.push(pauseStreams(arguments[i], options));
        return mergeStream(), this;
      }
      function mergeStream() {
        if (merging)
          return;
        merging = !0;
        let streams = streamsQueue.shift();
        if (!streams) {
          process.nextTick(endStream);
          return;
        }
        Array.isArray(streams) || (streams = [streams]);
        let pipesCount = streams.length + 1;
        function next() {
          --pipesCount > 0 || (merging = !1, mergeStream());
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener("merge2UnpipeEnd", onend), stream.removeListener("end", onend), doPipeError && stream.removeListener("error", onerror), next();
          }
          function onerror(err) {
            mergedStream.emit("error", err);
          }
          if (stream._readableState.endEmitted)
            return next();
          stream.on("merge2UnpipeEnd", onend), stream.on("end", onend), doPipeError && stream.on("error", onerror), stream.pipe(mergedStream, { end: !1 }), stream.resume();
        }
        for (let i = 0; i < streams.length; i++)
          pipe(streams[i]);
        next();
      }
      function endStream() {
        merging = !1, mergedStream.emit("queueDrain"), doEnd && mergedStream.end();
      }
      return mergedStream.setMaxListeners(0), mergedStream.add = addStream, mergedStream.on("unpipe", function(stream) {
        stream.emit("merge2UnpipeEnd");
      }), args.length && addStream.apply(null, args), mergedStream;
    }
    function pauseStreams(streams, options) {
      if (Array.isArray(streams))
        for (let i = 0, len = streams.length; i < len; i++)
          streams[i] = pauseStreams(streams[i], options);
      else {
        if (!streams._readableState && streams.pipe && (streams = streams.pipe(PassThrough(options))), !streams._readableState || !streams.pause || !streams.pipe)
          throw new Error("Only readable stream can be merged.");
        streams.pause();
      }
      return streams;
    }
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/stream.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.merge = void 0;
    var merge2 = require_merge2();
    function merge(streams) {
      let mergedStream = merge2(streams);
      return streams.forEach((stream) => {
        stream.once("error", (error) => mergedStream.emit("error", error));
      }), mergedStream.once("close", () => propagateCloseEventToSources(streams)), mergedStream.once("end", () => propagateCloseEventToSources(streams)), mergedStream;
    }
    exports.merge = merge;
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit("close"));
    }
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/string.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.isEmpty = exports.isString = void 0;
    function isString(input) {
      return typeof input == "string";
    }
    exports.isString = isString;
    function isEmpty(input) {
      return input === "";
    }
    exports.isEmpty = isEmpty;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/index.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/utils/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
    var array = require_array();
    exports.array = array;
    var errno = require_errno();
    exports.errno = errno;
    var fs = require_fs();
    exports.fs = fs;
    var path = require_path();
    exports.path = path;
    var pattern = require_pattern();
    exports.pattern = pattern;
    var stream = require_stream();
    exports.stream = stream;
    var string = require_string();
    exports.string = string;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/managers/tasks.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
    var utils = require_utils2();
    function generate(input, settings) {
      let patterns = processPatterns(input, settings), ignore = processPatterns(settings.ignore, settings), positivePatterns = getPositivePatterns(patterns), negativePatterns = getNegativePatternsAsPositive(patterns, ignore), staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings)), dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings)), staticTasks = convertPatternsToTasks(
        staticPatterns,
        negativePatterns,
        /* dynamic */
        !1
      ), dynamicTasks = convertPatternsToTasks(
        dynamicPatterns,
        negativePatterns,
        /* dynamic */
        !0
      );
      return staticTasks.concat(dynamicTasks);
    }
    exports.generate = generate;
    function processPatterns(input, settings) {
      let patterns = input;
      return settings.braceExpansion && (patterns = utils.pattern.expandPatternsWithBraceExpansion(patterns)), settings.baseNameMatch && (patterns = patterns.map((pattern) => pattern.includes("/") ? pattern : `**/${pattern}`)), patterns.map((pattern) => utils.pattern.removeDuplicateSlashes(pattern));
    }
    function convertPatternsToTasks(positive, negative, dynamic) {
      let tasks = [], patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive), patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive), outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory), insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
      return tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic)), "." in insideCurrentDirectoryGroup ? tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic)) : tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic)), tasks;
    }
    exports.convertPatternsToTasks = convertPatternsToTasks;
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns);
    }
    exports.getPositivePatterns = getPositivePatterns;
    function getNegativePatternsAsPositive(patterns, ignore) {
      return utils.pattern.getNegativePatterns(patterns).concat(ignore).map(utils.pattern.convertToPositivePattern);
    }
    exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
    function groupPatternsByBaseDirectory(patterns) {
      let group = {};
      return patterns.reduce((collection, pattern) => {
        let base = utils.pattern.getBaseDirectory(pattern);
        return base in collection ? collection[base].push(pattern) : collection[base] = [pattern], collection;
      }, group);
    }
    exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => convertPatternGroupToTask(base, positive[base], negative, dynamic));
    }
    exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
      };
    }
    exports.convertPatternGroupToTask = convertPatternGroupToTask;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.read = void 0;
    function read(path, settings, callback) {
      settings.fs.lstat(path, (lstatError, lstat) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError);
          return;
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat);
          return;
        }
        settings.fs.stat(path, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError);
              return;
            }
            callSuccessCallback(callback, lstat);
            return;
          }
          settings.markSymbolicLink && (stat.isSymbolicLink = () => !0), callSuccessCallback(callback, stat);
        });
      });
    }
    exports.read = read;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.read = void 0;
    function read(path, settings) {
      let lstat = settings.fs.lstatSync(path);
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink)
        return lstat;
      try {
        let stat = settings.fs.statSync(path);
        return settings.markSymbolicLink && (stat.isSymbolicLink = () => !0), stat;
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink)
          return lstat;
        throw error;
      }
    }
    exports.read = read;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/adapters/fs.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
    var fs = __require("fs");
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs.lstat,
      stat: fs.stat,
      lstatSync: fs.lstatSync,
      statSync: fs.statSync
    };
    function createFileSystemAdapter(fsMethods) {
      return fsMethods === void 0 ? exports.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports.createFileSystemAdapter = createFileSystemAdapter;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/settings.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var fs = require_fs2(), Settings = class {
      constructor(_options = {}) {
        this._options = _options, this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, !0), this.fs = fs.createFileSystemAdapter(this._options.fs), this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, !1), this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0);
      }
      _getValue(option, value) {
        return option ?? value;
      }
    };
    exports.default = Settings;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.statSync = exports.stat = exports.Settings = void 0;
    var async = require_async(), sync = require_sync(), settings_1 = require_settings();
    exports.Settings = settings_1.default;
    function stat(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback == "function") {
        async.read(path, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports.stat = stat;
    function statSync(path, optionsOrSettings) {
      let settings = getSettings(optionsOrSettings);
      return sync.read(path, settings);
    }
    exports.statSync = statSync;
    function getSettings(settingsOrOptions = {}) {
      return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
    }
  }
});

// ../../node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  "../../node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js"(exports, module) {
    init_cjs_shims();
    var promise;
    module.exports = typeof queueMicrotask == "function" ? queueMicrotask.bind(typeof window < "u" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
      throw err;
    }, 0));
  }
});

// ../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js
var require_run_parallel = __commonJS({
  "../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = runParallel;
    var queueMicrotask2 = require_queue_microtask();
    function runParallel(tasks, cb) {
      let results, pending, keys, isSync = !0;
      Array.isArray(tasks) ? (results = [], pending = tasks.length) : (keys = Object.keys(tasks), results = {}, pending = keys.length);
      function done(err) {
        function end() {
          cb && cb(err, results), cb = null;
        }
        isSync ? queueMicrotask2(end) : end();
      }
      function each(i, err, result) {
        results[i] = result, (--pending === 0 || err) && done(err);
      }
      pending ? keys ? keys.forEach(function(key) {
        tasks[key](function(err, result) {
          each(key, err, result);
        });
      }) : tasks.forEach(function(task, i) {
        task(function(err, result) {
          each(i, err, result);
        });
      }) : done(null), isSync = !1;
    }
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/constants.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
    if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0)
      throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10), MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10), SUPPORTED_MAJOR_VERSION = 10, SUPPORTED_MINOR_VERSION = 10, IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION, IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/fs.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name, this.isBlockDevice = stats.isBlockDevice.bind(stats), this.isCharacterDevice = stats.isCharacterDevice.bind(stats), this.isDirectory = stats.isDirectory.bind(stats), this.isFIFO = stats.isFIFO.bind(stats), this.isFile = stats.isFile.bind(stats), this.isSocket = stats.isSocket.bind(stats), this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports.createDirentFromStats = createDirentFromStats;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.fs = void 0;
    var fs = require_fs3();
    exports.fs = fs;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/common.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.joinPathSegments = void 0;
    function joinPathSegments(a, b, separator) {
      return a.endsWith(separator) ? a + b : a + separator + b;
    }
    exports.joinPathSegments = joinPathSegments;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
    var fsStat = require_out(), rpl = require_run_parallel(), constants_1 = require_constants(), utils = require_utils3(), common = require_common();
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback);
        return;
      }
      readdir(directory, settings, callback);
    }
    exports.read = read;
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(directory, { withFileTypes: !0 }, (readdirError, dirents) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        let entries = dirents.map((dirent) => ({
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        }));
        if (!settings.followSymbolicLinks) {
          callSuccessCallback(callback, entries);
          return;
        }
        let tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, rplEntries);
        });
      });
    }
    exports.readdirWithFileTypes = readdirWithFileTypes;
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry);
          return;
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError);
              return;
            }
            done(null, entry);
            return;
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats), done(null, entry);
        });
      };
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        let tasks = names.map((name) => {
          let path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
          return (done) => {
            fsStat.stat(path, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error);
                return;
              }
              let entry = {
                name,
                path,
                dirent: utils.fs.createDirentFromStats(name, stats)
              };
              settings.stats && (entry.stats = stats), done(null, entry);
            });
          };
        });
        rpl(tasks, (rplError, entries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, entries);
        });
      });
    }
    exports.readdir = readdir;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
    var fsStat = require_out(), constants_1 = require_constants(), utils = require_utils3(), common = require_common();
    function read(directory, settings) {
      return !settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES ? readdirWithFileTypes(directory, settings) : readdir(directory, settings);
    }
    exports.read = read;
    function readdirWithFileTypes(directory, settings) {
      return settings.fs.readdirSync(directory, { withFileTypes: !0 }).map((dirent) => {
        let entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks)
          try {
            let stats = settings.fs.statSync(entry.path);
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink)
              throw error;
          }
        return entry;
      });
    }
    exports.readdirWithFileTypes = readdirWithFileTypes;
    function readdir(directory, settings) {
      return settings.fs.readdirSync(directory).map((name) => {
        let entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator), stats = fsStat.statSync(entryPath, settings.fsStatSettings), entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats)
        };
        return settings.stats && (entry.stats = stats), entry;
      });
    }
    exports.readdir = readdir;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/adapters/fs.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
    var fs = __require("fs");
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs.lstat,
      stat: fs.stat,
      lstatSync: fs.lstatSync,
      statSync: fs.statSync,
      readdir: fs.readdir,
      readdirSync: fs.readdirSync
    };
    function createFileSystemAdapter(fsMethods) {
      return fsMethods === void 0 ? exports.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports.createFileSystemAdapter = createFileSystemAdapter;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/settings.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var path = __require("path"), fsStat = require_out(), fs = require_fs4(), Settings = class {
      constructor(_options = {}) {
        this._options = _options, this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !1), this.fs = fs.createFileSystemAdapter(this._options.fs), this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep), this.stats = this._getValue(this._options.stats, !1), this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0), this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option ?? value;
      }
    };
    exports.default = Settings;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Settings = exports.scandirSync = exports.scandir = void 0;
    var async = require_async2(), sync = require_sync2(), settings_1 = require_settings2();
    exports.Settings = settings_1.default;
    function scandir(path, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback == "function") {
        async.read(path, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports.scandir = scandir;
    function scandirSync(path, optionsOrSettings) {
      let settings = getSettings(optionsOrSettings);
      return sync.read(path, settings);
    }
    exports.scandirSync = scandirSync;
    function getSettings(settingsOrOptions = {}) {
      return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
    }
  }
});

// ../../node_modules/.pnpm/reusify@1.1.0/node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  "../../node_modules/.pnpm/reusify@1.1.0/node_modules/reusify/reusify.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    function reusify(Constructor) {
      var head = new Constructor(), tail = head;
      function get() {
        var current = head;
        return current.next ? head = current.next : (head = new Constructor(), tail = head), current.next = null, current;
      }
      function release(obj) {
        tail.next = obj, tail = obj;
      }
      return {
        get,
        release
      };
    }
    module.exports = reusify;
  }
});

// ../../node_modules/.pnpm/fastq@1.19.1/node_modules/fastq/queue.js
var require_queue = __commonJS({
  "../../node_modules/.pnpm/fastq@1.19.1/node_modules/fastq/queue.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var reusify = require_reusify();
    function fastqueue(context, worker, _concurrency) {
      if (typeof context == "function" && (_concurrency = worker, worker = context, context = null), !(_concurrency >= 1))
        throw new Error("fastqueue concurrency must be equal to or greater than 1");
      var cache = reusify(Task), queueHead = null, queueTail = null, _running = 0, errorHandler = null, self = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: !1,
        get concurrency() {
          return _concurrency;
        },
        set concurrency(value) {
          if (!(value >= 1))
            throw new Error("fastqueue concurrency must be equal to or greater than 1");
          if (_concurrency = value, !self.paused)
            for (; queueHead && _running < _concurrency; )
              _running++, release();
        },
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error
      };
      return self;
      function running() {
        return _running;
      }
      function pause() {
        self.paused = !0;
      }
      function length() {
        for (var current = queueHead, counter = 0; current; )
          current = current.next, counter++;
        return counter;
      }
      function getQueue() {
        for (var current = queueHead, tasks = []; current; )
          tasks.push(current.value), current = current.next;
        return tasks;
      }
      function resume() {
        if (self.paused) {
          if (self.paused = !1, queueHead === null) {
            _running++, release();
            return;
          }
          for (; queueHead && _running < _concurrency; )
            _running++, release();
        }
      }
      function idle() {
        return _running === 0 && self.length() === 0;
      }
      function push(value, done) {
        var current = cache.get();
        current.context = context, current.release = release, current.value = value, current.callback = done || noop, current.errorHandler = errorHandler, _running >= _concurrency || self.paused ? queueTail ? (queueTail.next = current, queueTail = current) : (queueHead = current, queueTail = current, self.saturated()) : (_running++, worker.call(context, current.value, current.worked));
      }
      function unshift(value, done) {
        var current = cache.get();
        current.context = context, current.release = release, current.value = value, current.callback = done || noop, current.errorHandler = errorHandler, _running >= _concurrency || self.paused ? queueHead ? (current.next = queueHead, queueHead = current) : (queueHead = current, queueTail = current, self.saturated()) : (_running++, worker.call(context, current.value, current.worked));
      }
      function release(holder) {
        holder && cache.release(holder);
        var next = queueHead;
        next && _running <= _concurrency ? self.paused ? _running-- : (queueTail === queueHead && (queueTail = null), queueHead = next.next, next.next = null, worker.call(context, next.value, next.worked), queueTail === null && self.empty()) : --_running === 0 && self.drain();
      }
      function kill() {
        queueHead = null, queueTail = null, self.drain = noop;
      }
      function killAndDrain() {
        queueHead = null, queueTail = null, self.drain(), self.drain = noop;
      }
      function error(handler) {
        errorHandler = handler;
      }
    }
    function noop() {
    }
    function Task() {
      this.value = null, this.callback = noop, this.next = null, this.release = noop, this.context = null, this.errorHandler = null;
      var self = this;
      this.worked = function(err, result) {
        var callback = self.callback, errorHandler = self.errorHandler, val = self.value;
        self.value = null, self.callback = noop, self.errorHandler && errorHandler(err, val), callback.call(self.context, err, result), self.release(self);
      };
    }
    function queueAsPromised(context, worker, _concurrency) {
      typeof context == "function" && (_concurrency = worker, worker = context, context = null);
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function(res) {
          cb(null, res);
        }, cb);
      }
      var queue = fastqueue(context, asyncWrapper, _concurrency), pushCb = queue.push, unshiftCb = queue.unshift;
      return queue.push = push, queue.unshift = unshift, queue.drained = drained, queue;
      function push(value) {
        var p = new Promise(function(resolve, reject) {
          pushCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        return p.catch(noop), p;
      }
      function unshift(value) {
        var p = new Promise(function(resolve, reject) {
          unshiftCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        return p.catch(noop), p;
      }
      function drained() {
        var p = new Promise(function(resolve) {
          process.nextTick(function() {
            if (queue.idle())
              resolve();
            else {
              var previousDrain = queue.drain;
              queue.drain = function() {
                typeof previousDrain == "function" && previousDrain(), resolve(), queue.drain = previousDrain;
              };
            }
          });
        });
        return p;
      }
    }
    module.exports = fastqueue;
    module.exports.promise = queueAsPromised;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/common.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0;
    function isFatalError(settings, error) {
      return settings.errorFilter === null ? !0 : !settings.errorFilter(error);
    }
    exports.isFatalError = isFatalError;
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value);
    }
    exports.isAppliedFilter = isAppliedFilter;
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator);
    }
    exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
    function joinPathSegments(a, b, separator) {
      return a === "" ? b : a.endsWith(separator) ? a + b : a + separator + b;
    }
    exports.joinPathSegments = joinPathSegments;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/reader.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var common = require_common2(), Reader = class {
      constructor(_root, _settings) {
        this._root = _root, this._settings = _settings, this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
      }
    };
    exports.default = Reader;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var events_1 = __require("events"), fsScandir = require_out2(), fastq = require_queue(), common = require_common2(), reader_1 = require_reader(), AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings), this._settings = _settings, this._scandir = fsScandir.scandir, this._emitter = new events_1.EventEmitter(), this._queue = fastq(this._worker.bind(this), this._settings.concurrency), this._isFatalError = !1, this._isDestroyed = !1, this._queue.drain = () => {
          this._isFatalError || this._emitter.emit("end");
        };
      }
      read() {
        return this._isFatalError = !1, this._isDestroyed = !1, setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath);
        }), this._emitter;
      }
      get isDestroyed() {
        return this._isDestroyed;
      }
      destroy() {
        if (this._isDestroyed)
          throw new Error("The reader is already destroyed");
        this._isDestroyed = !0, this._queue.killAndDrain();
      }
      onEntry(callback) {
        this._emitter.on("entry", callback);
      }
      onError(callback) {
        this._emitter.once("error", callback);
      }
      onEnd(callback) {
        this._emitter.once("end", callback);
      }
      _pushToQueue(directory, base) {
        let queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
          error !== null && this._handleError(error);
        });
      }
      _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
          if (error !== null) {
            done(error, void 0);
            return;
          }
          for (let entry of entries)
            this._handleEntry(entry, item.base);
          done(null, void 0);
        });
      }
      _handleError(error) {
        this._isDestroyed || !common.isFatalError(this._settings, error) || (this._isFatalError = !0, this._isDestroyed = !0, this._emitter.emit("error", error));
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError)
          return;
        let fullpath = entry.path;
        base !== void 0 && (entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)), common.isAppliedFilter(this._settings.entryFilter, entry) && this._emitEntry(entry), entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry) && this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
      }
      _emitEntry(entry) {
        this._emitter.emit("entry", entry);
      }
    };
    exports.default = AsyncReader;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var async_1 = require_async3(), AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root, this._settings = _settings, this._reader = new async_1.default(this._root, this._settings), this._storage = [];
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error);
        }), this._reader.onEntry((entry) => {
          this._storage.push(entry);
        }), this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage);
        }), this._reader.read();
      }
    };
    exports.default = AsyncProvider;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, entries) {
      callback(null, entries);
    }
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/stream.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var stream_1 = __require("stream"), async_1 = require_async3(), StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root, this._settings = _settings, this._reader = new async_1.default(this._root, this._settings), this._stream = new stream_1.Readable({
          objectMode: !0,
          read: () => {
          },
          destroy: () => {
            this._reader.isDestroyed || this._reader.destroy();
          }
        });
      }
      read() {
        return this._reader.onError((error) => {
          this._stream.emit("error", error);
        }), this._reader.onEntry((entry) => {
          this._stream.push(entry);
        }), this._reader.onEnd(() => {
          this._stream.push(null);
        }), this._reader.read(), this._stream;
      }
    };
    exports.default = StreamProvider;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var fsScandir = require_out2(), common = require_common2(), reader_1 = require_reader(), SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments), this._scandir = fsScandir.scandirSync, this._storage = [], this._queue = /* @__PURE__ */ new Set();
      }
      read() {
        return this._pushToQueue(this._root, this._settings.basePath), this._handleQueue(), this._storage;
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
      }
      _handleQueue() {
        for (let item of this._queue.values())
          this._handleDirectory(item.directory, item.base);
      }
      _handleDirectory(directory, base) {
        try {
          let entries = this._scandir(directory, this._settings.fsScandirSettings);
          for (let entry of entries)
            this._handleEntry(entry, base);
        } catch (error) {
          this._handleError(error);
        }
      }
      _handleError(error) {
        if (common.isFatalError(this._settings, error))
          throw error;
      }
      _handleEntry(entry, base) {
        let fullpath = entry.path;
        base !== void 0 && (entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)), common.isAppliedFilter(this._settings.entryFilter, entry) && this._pushToStorage(entry), entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry) && this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
      }
      _pushToStorage(entry) {
        this._storage.push(entry);
      }
    };
    exports.default = SyncReader;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var sync_1 = require_sync3(), SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root, this._settings = _settings, this._reader = new sync_1.default(this._root, this._settings);
      }
      read() {
        return this._reader.read();
      }
    };
    exports.default = SyncProvider;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/settings.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var path = __require("path"), fsScandir = require_out2(), Settings = class {
      constructor(_options = {}) {
        this._options = _options, this.basePath = this._getValue(this._options.basePath, void 0), this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY), this.deepFilter = this._getValue(this._options.deepFilter, null), this.entryFilter = this._getValue(this._options.entryFilter, null), this.errorFilter = this._getValue(this._options.errorFilter, null), this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep), this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option ?? value;
      }
    };
    exports.default = Settings;
  }
});

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS({
  "../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
    var async_1 = require_async4(), stream_1 = require_stream2(), sync_1 = require_sync4(), settings_1 = require_settings3();
    exports.Settings = settings_1.default;
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback == "function") {
        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
        return;
      }
      new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
    }
    exports.walk = walk;
    function walkSync(directory, optionsOrSettings) {
      let settings = getSettings(optionsOrSettings);
      return new sync_1.default(directory, settings).read();
    }
    exports.walkSync = walkSync;
    function walkStream(directory, optionsOrSettings) {
      let settings = getSettings(optionsOrSettings);
      return new stream_1.default(directory, settings).read();
    }
    exports.walkStream = walkStream;
    function getSettings(settingsOrOptions = {}) {
      return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
    }
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/reader.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var path = __require("path"), fsStat = require_out(), utils = require_utils2(), Reader = class {
      constructor(_settings) {
        this._settings = _settings, this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
      }
      _getFullEntryPath(filepath) {
        return path.resolve(this._settings.cwd, filepath);
      }
      _makeEntry(stats, pattern) {
        let entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats)
        };
        return this._settings.stats && (entry.stats = stats), entry;
      }
      _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
      }
    };
    exports.default = Reader;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/stream.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var stream_1 = __require("stream"), fsStat = require_out(), fsWalk = require_out3(), reader_1 = require_reader2(), ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments), this._walkStream = fsWalk.walkStream, this._stat = fsStat.stat;
      }
      dynamic(root, options) {
        return this._walkStream(root, options);
      }
      static(patterns, options) {
        let filepaths = patterns.map(this._getFullEntryPath, this), stream = new stream_1.PassThrough({ objectMode: !0 });
        stream._write = (index, _enc, done) => this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
          entry !== null && options.entryFilter(entry) && stream.push(entry), index === filepaths.length - 1 && stream.end(), done();
        }).catch(done);
        for (let i = 0; i < filepaths.length; i++)
          stream.write(i);
        return stream;
      }
      _getEntry(filepath, pattern, options) {
        return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
          if (options.errorFilter(error))
            return null;
          throw error;
        });
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => error === null ? resolve(stats) : reject(error));
        });
      }
    };
    exports.default = ReaderStream;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/async.js
var require_async5 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var fsWalk = require_out3(), reader_1 = require_reader2(), stream_1 = require_stream3(), ReaderAsync = class extends reader_1.default {
      constructor() {
        super(...arguments), this._walkAsync = fsWalk.walk, this._readerStream = new stream_1.default(this._settings);
      }
      dynamic(root, options) {
        return new Promise((resolve, reject) => {
          this._walkAsync(root, options, (error, entries) => {
            error === null ? resolve(entries) : reject(error);
          });
        });
      }
      async static(patterns, options) {
        let entries = [], stream = this._readerStream.static(patterns, options);
        return new Promise((resolve, reject) => {
          stream.once("error", reject), stream.on("data", (entry) => entries.push(entry)), stream.once("end", () => resolve(entries));
        });
      }
    };
    exports.default = ReaderAsync;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/matchers/matcher.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var utils = require_utils2(), Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns, this._settings = _settings, this._micromatchOptions = _micromatchOptions, this._storage = [], this._fillStorage();
      }
      _fillStorage() {
        for (let pattern of this._patterns) {
          let segments = this._getPatternSegments(pattern), sections = this._splitSegmentsIntoSections(segments);
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections
          });
        }
      }
      _getPatternSegments(pattern) {
        return utils.pattern.getPatternParts(pattern, this._micromatchOptions).map((part) => utils.pattern.isDynamicPattern(part, this._settings) ? {
          dynamic: !0,
          pattern: part,
          patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
        } : {
          dynamic: !1,
          pattern: part
        });
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
      }
    };
    exports.default = Matcher;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/matchers/partial.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var matcher_1 = require_matcher(), PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        let parts = filepath.split("/"), levels = parts.length, patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (let pattern of patterns) {
          let section = pattern.sections[0];
          if (!pattern.complete && levels > section.length || parts.every((part, index) => {
            let segment = pattern.segments[index];
            return !!(segment.dynamic && segment.patternRe.test(part) || !segment.dynamic && segment.pattern === part);
          }))
            return !0;
        }
        return !1;
      }
    };
    exports.default = PartialMatcher;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/deep.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var utils = require_utils2(), partial_1 = require_partial(), DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings, this._micromatchOptions = _micromatchOptions;
      }
      getFilter(basePath, positive, negative) {
        let matcher = this._getMatcher(positive), negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
      }
      _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
      }
      _getNegativePatternsRe(patterns) {
        let affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path) || this._isSkippedSymbolicLink(entry))
          return !1;
        let filepath = utils.path.removeLeadingDotSegment(entry.path);
        return this._isSkippedByPositivePatterns(filepath, matcher) ? !1 : this._isSkippedByNegativePatterns(filepath, negativeRe);
      }
      _isSkippedByDeep(basePath, entryPath) {
        return this._settings.deep === 1 / 0 ? !1 : this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
      }
      _getEntryLevel(basePath, entryPath) {
        let entryPathDepth = entryPath.split("/").length;
        if (basePath === "")
          return entryPathDepth;
        let basePathDepth = basePath.split("/").length;
        return entryPathDepth - basePathDepth;
      }
      _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe);
      }
    };
    exports.default = DeepFilter;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/entry.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var utils = require_utils2(), EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings, this._micromatchOptions = _micromatchOptions, this.index = /* @__PURE__ */ new Map();
      }
      getFilter(positive, negative) {
        let [absoluteNegative, relativeNegative] = utils.pattern.partitionAbsoluteAndRelative(negative), patterns = {
          positive: {
            all: utils.pattern.convertPatternsToRe(positive, this._micromatchOptions)
          },
          negative: {
            absolute: utils.pattern.convertPatternsToRe(absoluteNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: !0 })),
            relative: utils.pattern.convertPatternsToRe(relativeNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: !0 }))
          }
        };
        return (entry) => this._filter(entry, patterns);
      }
      _filter(entry, patterns) {
        let filepath = utils.path.removeLeadingDotSegment(entry.path);
        if (this._settings.unique && this._isDuplicateEntry(filepath) || this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry))
          return !1;
        let isMatched = this._isMatchToPatternsSet(filepath, patterns, entry.dirent.isDirectory());
        return this._settings.unique && isMatched && this._createIndexRecord(filepath), isMatched;
      }
      _isDuplicateEntry(filepath) {
        return this.index.has(filepath);
      }
      _createIndexRecord(filepath) {
        this.index.set(filepath, void 0);
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
      }
      _isMatchToPatternsSet(filepath, patterns, isDirectory) {
        return !(!this._isMatchToPatterns(filepath, patterns.positive.all, isDirectory) || this._isMatchToPatterns(filepath, patterns.negative.relative, isDirectory) || this._isMatchToAbsoluteNegative(filepath, patterns.negative.absolute, isDirectory));
      }
      _isMatchToAbsoluteNegative(filepath, patternsRe, isDirectory) {
        if (patternsRe.length === 0)
          return !1;
        let fullpath = utils.path.makeAbsolute(this._settings.cwd, filepath);
        return this._isMatchToPatterns(fullpath, patternsRe, isDirectory);
      }
      _isMatchToPatterns(filepath, patternsRe, isDirectory) {
        if (patternsRe.length === 0)
          return !1;
        let isMatched = utils.pattern.matchAny(filepath, patternsRe);
        return !isMatched && isDirectory ? utils.pattern.matchAny(filepath + "/", patternsRe) : isMatched;
      }
    };
    exports.default = EntryFilter;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/filters/error.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var utils = require_utils2(), ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getFilter() {
        return (error) => this._isNonFatalError(error);
      }
      _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
      }
    };
    exports.default = ErrorFilter;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/transformers/entry.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var utils = require_utils2(), EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getTransformer() {
        return (entry) => this._transform(entry);
      }
      _transform(entry) {
        let filepath = entry.path;
        return this._settings.absolute && (filepath = utils.path.makeAbsolute(this._settings.cwd, filepath), filepath = utils.path.unixify(filepath)), this._settings.markDirectories && entry.dirent.isDirectory() && (filepath += "/"), this._settings.objectMode ? Object.assign(Object.assign({}, entry), { path: filepath }) : filepath;
      }
    };
    exports.default = EntryTransformer;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/provider.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var path = __require("path"), deep_1 = require_deep(), entry_1 = require_entry(), error_1 = require_error(), entry_2 = require_entry2(), Provider = class {
      constructor(_settings) {
        this._settings = _settings, this.errorFilter = new error_1.default(this._settings), this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions()), this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions()), this.entryTransformer = new entry_2.default(this._settings);
      }
      _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base);
      }
      _getReaderOptions(task) {
        let basePath = task.base === "." ? "" : task.base;
        return {
          basePath,
          pathSegmentSeparator: "/",
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
          entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer()
        };
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: !0,
          strictSlashes: !1
        };
      }
    };
    exports.default = Provider;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/async.js
var require_async6 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/async.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var async_1 = require_async5(), provider_1 = require_provider(), ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments), this._reader = new async_1.default(this._settings);
      }
      async read(task) {
        let root = this._getRootDirectory(task), options = this._getReaderOptions(task);
        return (await this.api(root, task, options)).map((entry) => options.transform(entry));
      }
      api(root, task, options) {
        return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderAsync;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/stream.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var stream_1 = __require("stream"), stream_2 = require_stream3(), provider_1 = require_provider(), ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments), this._reader = new stream_2.default(this._settings);
      }
      read(task) {
        let root = this._getRootDirectory(task), options = this._getReaderOptions(task), source = this.api(root, task, options), destination = new stream_1.Readable({ objectMode: !0, read: () => {
        } });
        return source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end")), destination.once("close", () => source.destroy()), destination;
      }
      api(root, task, options) {
        return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderStream;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/readers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var fsStat = require_out(), fsWalk = require_out3(), reader_1 = require_reader2(), ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments), this._walkSync = fsWalk.walkSync, this._statSync = fsStat.statSync;
      }
      dynamic(root, options) {
        return this._walkSync(root, options);
      }
      static(patterns, options) {
        let entries = [];
        for (let pattern of patterns) {
          let filepath = this._getFullEntryPath(pattern), entry = this._getEntry(filepath, pattern, options);
          entry === null || !options.entryFilter(entry) || entries.push(entry);
        }
        return entries;
      }
      _getEntry(filepath, pattern, options) {
        try {
          let stats = this._getStat(filepath);
          return this._makeEntry(stats, pattern);
        } catch (error) {
          if (options.errorFilter(error))
            return null;
          throw error;
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
      }
    };
    exports.default = ReaderSync;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/providers/sync.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var sync_1 = require_sync5(), provider_1 = require_provider(), ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments), this._reader = new sync_1.default(this._settings);
      }
      read(task) {
        let root = this._getRootDirectory(task), options = this._getReaderOptions(task);
        return this.api(root, task, options).map(options.transform);
      }
      api(root, task, options) {
        return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderSync;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/settings.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
    var fs = __require("fs"), os = __require("os"), CPU_COUNT = Math.max(os.cpus().length, 1);
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs.lstat,
      lstatSync: fs.lstatSync,
      stat: fs.stat,
      statSync: fs.statSync,
      readdir: fs.readdir,
      readdirSync: fs.readdirSync
    };
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options, this.absolute = this._getValue(this._options.absolute, !1), this.baseNameMatch = this._getValue(this._options.baseNameMatch, !1), this.braceExpansion = this._getValue(this._options.braceExpansion, !0), this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, !0), this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT), this.cwd = this._getValue(this._options.cwd, process.cwd()), this.deep = this._getValue(this._options.deep, 1 / 0), this.dot = this._getValue(this._options.dot, !1), this.extglob = this._getValue(this._options.extglob, !0), this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !0), this.fs = this._getFileSystemMethods(this._options.fs), this.globstar = this._getValue(this._options.globstar, !0), this.ignore = this._getValue(this._options.ignore, []), this.markDirectories = this._getValue(this._options.markDirectories, !1), this.objectMode = this._getValue(this._options.objectMode, !1), this.onlyDirectories = this._getValue(this._options.onlyDirectories, !1), this.onlyFiles = this._getValue(this._options.onlyFiles, !0), this.stats = this._getValue(this._options.stats, !1), this.suppressErrors = this._getValue(this._options.suppressErrors, !1), this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !1), this.unique = this._getValue(this._options.unique, !0), this.onlyDirectories && (this.onlyFiles = !1), this.stats && (this.objectMode = !0), this.ignore = [].concat(this.ignore);
      }
      _getValue(option, value) {
        return option === void 0 ? value : option;
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
      }
    };
    exports.default = Settings;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/index.js
var require_out4 = __commonJS({
  "../../node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/index.js"(exports, module) {
    init_cjs_shims();
    var taskManager = require_tasks(), async_1 = require_async6(), stream_1 = require_stream4(), sync_1 = require_sync6(), settings_1 = require_settings4(), utils = require_utils2();
    async function FastGlob(source, options) {
      assertPatternsInput(source);
      let works = getWorks(source, async_1.default, options), result = await Promise.all(works);
      return utils.array.flatten(result);
    }
    (function(FastGlob2) {
      FastGlob2.glob = FastGlob2, FastGlob2.globSync = sync, FastGlob2.globStream = stream, FastGlob2.async = FastGlob2;
      function sync(source, options) {
        assertPatternsInput(source);
        let works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
      }
      FastGlob2.sync = sync;
      function stream(source, options) {
        assertPatternsInput(source);
        let works = getWorks(source, stream_1.default, options);
        return utils.stream.merge(works);
      }
      FastGlob2.stream = stream;
      function generateTasks(source, options) {
        assertPatternsInput(source);
        let patterns = [].concat(source), settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
      }
      FastGlob2.generateTasks = generateTasks;
      function isDynamicPattern(source, options) {
        assertPatternsInput(source);
        let settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
      }
      FastGlob2.isDynamicPattern = isDynamicPattern;
      function escapePath(source) {
        return assertPatternsInput(source), utils.path.escape(source);
      }
      FastGlob2.escapePath = escapePath;
      function convertPathToPattern(source) {
        return assertPatternsInput(source), utils.path.convertPathToPattern(source);
      }
      FastGlob2.convertPathToPattern = convertPathToPattern;
      let posix;
      (function(posix2) {
        function escapePath2(source) {
          return assertPatternsInput(source), utils.path.escapePosixPath(source);
        }
        posix2.escapePath = escapePath2;
        function convertPathToPattern2(source) {
          return assertPatternsInput(source), utils.path.convertPosixPathToPattern(source);
        }
        posix2.convertPathToPattern = convertPathToPattern2;
      })(posix = FastGlob2.posix || (FastGlob2.posix = {}));
      let win32;
      (function(win322) {
        function escapePath2(source) {
          return assertPatternsInput(source), utils.path.escapeWindowsPath(source);
        }
        win322.escapePath = escapePath2;
        function convertPathToPattern2(source) {
          return assertPatternsInput(source), utils.path.convertWindowsPathToPattern(source);
        }
        win322.convertPathToPattern = convertPathToPattern2;
      })(win32 = FastGlob2.win32 || (FastGlob2.win32 = {}));
    })(FastGlob || (FastGlob = {}));
    function getWorks(source, _Provider, options) {
      let patterns = [].concat(source), settings = new settings_1.default(options), tasks = taskManager.generate(patterns, settings), provider = new _Provider(settings);
      return tasks.map(provider.read, provider);
    }
    function assertPatternsInput(input) {
      if (![].concat(input).every((item) => utils.string.isString(item) && !utils.string.isEmpty(item)))
        throw new TypeError("Patterns must be a string (non empty) or an array of strings");
    }
    module.exports = FastGlob;
  }
});

export {
  require_merge2,
  require_out4 as require_out
};
/*! Bundled license information:

queue-microtask/index.js:
  (*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

run-parallel/index.js:
  (*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=chunk-CTFDRWUN.js.map
