import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function(str) {
      if (typeof str != "string" || str === "")
        return !1;
      for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
        if (match[2]) return !0;
        str = str.slice(match.index + match[0].length);
      }
      return !1;
    };
  }
});

// ../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js"(exports, module) {
    init_cjs_shims();
    var isExtglob = require_is_extglob(), chars = { "{": "}", "(": ")", "[": "]" }, strictCheck = function(str) {
      if (str[0] === "!")
        return !0;
      for (var index = 0, pipeIndex = -2, closeSquareIndex = -2, closeCurlyIndex = -2, closeParenIndex = -2, backSlashIndex = -2; index < str.length; ) {
        if (str[index] === "*" || str[index + 1] === "?" && /[\].+)]/.test(str[index]) || closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]" && (closeSquareIndex < index && (closeSquareIndex = str.indexOf("]", index)), closeSquareIndex > index && (backSlashIndex === -1 || backSlashIndex > closeSquareIndex || (backSlashIndex = str.indexOf("\\", index), backSlashIndex === -1 || backSlashIndex > closeSquareIndex))) || closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}" && (closeCurlyIndex = str.indexOf("}", index), closeCurlyIndex > index && (backSlashIndex = str.indexOf("\\", index), backSlashIndex === -1 || backSlashIndex > closeCurlyIndex)) || closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")" && (closeParenIndex = str.indexOf(")", index), closeParenIndex > index && (backSlashIndex = str.indexOf("\\", index), backSlashIndex === -1 || backSlashIndex > closeParenIndex)) || pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|" && (pipeIndex < index && (pipeIndex = str.indexOf("|", index)), pipeIndex !== -1 && str[pipeIndex + 1] !== ")" && (closeParenIndex = str.indexOf(")", pipeIndex), closeParenIndex > pipeIndex && (backSlashIndex = str.indexOf("\\", pipeIndex), backSlashIndex === -1 || backSlashIndex > closeParenIndex))))
          return !0;
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            n !== -1 && (index = n + 1);
          }
          if (str[index] === "!")
            return !0;
        } else
          index++;
      }
      return !1;
    }, relaxedCheck = function(str) {
      if (str[0] === "!")
        return !0;
      for (var index = 0; index < str.length; ) {
        if (/[*?{}()[\]]/.test(str[index]))
          return !0;
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            n !== -1 && (index = n + 1);
          }
          if (str[index] === "!")
            return !0;
        } else
          index++;
      }
      return !1;
    };
    module.exports = function(str, options) {
      if (typeof str != "string" || str === "")
        return !1;
      if (isExtglob(str))
        return !0;
      var check = strictCheck;
      return options && options.strict === !1 && (check = relaxedCheck), check(str);
    };
  }
});

// ../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var isGlob = require_is_glob(), pathPosixDirname = __require("path").posix.dirname, isWin32 = __require("os").platform() === "win32", slash = "/", backslash = /\\/g, enclosure = /[\{\[].*[\}\]]$/, globby = /(^|[^\\])([\{\[]|\([^\)]+$)/, escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module.exports = function(str, opts) {
      var options = Object.assign({ flipBackslashes: !0 }, opts);
      options.flipBackslashes && isWin32 && str.indexOf(slash) < 0 && (str = str.replace(backslash, slash)), enclosure.test(str) && (str += slash), str += "a";
      do
        str = pathPosixDirname(str);
      while (isGlob(str) || globby.test(str));
      return str.replace(escaped, "$1");
    };
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js"(exports) {
    "use strict";
    init_cjs_shims();
    exports.isInteger = (num) => typeof num == "number" ? Number.isInteger(num) : typeof num == "string" && num.trim() !== "" ? Number.isInteger(Number(num)) : !1;
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => limit === !1 || !exports.isInteger(min) || !exports.isInteger(max) ? !1 : (Number(max) - Number(min)) / Number(step) >= limit;
    exports.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n];
      node && (type && node.type === type || node.type === "open" || node.type === "close") && node.escaped !== !0 && (node.value = "\\" + node.value, node.escaped = !0);
    };
    exports.encloseBrace = (node) => node.type !== "brace" ? !1 : node.commas >> 0 + node.ranges >> 0 === 0 ? (node.invalid = !0, !0) : !1;
    exports.isInvalidBrace = (block) => block.type !== "brace" ? !1 : block.invalid === !0 || block.dollar ? !0 : block.commas >> 0 + block.ranges >> 0 === 0 || block.open !== !0 || block.close !== !0 ? (block.invalid = !0, !0) : !1;
    exports.isOpenOrClose = (node) => node.type === "open" || node.type === "close" ? !0 : node.open === !0 || node.close === !0;
    exports.reduce = (nodes) => nodes.reduce((acc, node) => (node.type === "text" && acc.push(node.value), node.type === "range" && (node.type = "text"), acc), []);
    exports.flatten = (...args) => {
      let result = [], flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          ele !== void 0 && result.push(ele);
        }
        return result;
      };
      return flat(args), result;
    };
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var utils = require_utils();
    module.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent), invalidNode = node.invalid === !0 && options.escapeInvalid === !0, output = "";
        if (node.value)
          return (invalidBlock || invalidNode) && utils.isOpenOrClose(node) ? "\\" + node.value : node.value;
        if (node.value)
          return node.value;
        if (node.nodes)
          for (let child of node.nodes)
            output += stringify(child);
        return output;
      };
      return stringify(ast);
    };
  }
});

// ../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = function(num) {
      return typeof num == "number" ? num - num === 0 : typeof num == "string" && num.trim() !== "" ? Number.isFinite ? Number.isFinite(+num) : isFinite(+num) : !1;
    };
  }
});

// ../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var isNumber = require_is_number(), toRegexRange = (min, max, options) => {
      if (isNumber(min) === !1)
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      if (max === void 0 || min === max)
        return String(min);
      if (isNumber(max) === !1)
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      let opts = { relaxZeros: !0, ...options };
      typeof opts.strictZeros == "boolean" && (opts.relaxZeros = opts.strictZeros === !1);
      let relax = String(opts.relaxZeros), shorthand = String(opts.shorthand), capture = String(opts.capture), wrap = String(opts.wrap), cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey))
        return toRegexRange.cache[cacheKey].result;
      let a = Math.min(min, max), b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        return opts.capture ? `(${result})` : opts.wrap === !1 ? result : `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max), state = { min, max, a, b }, positives = [], negatives = [];
      if (isPadded && (state.isPadded = isPadded, state.maxLen = String(state.max).length), a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts), a = state.a = 0;
      }
      return b >= 0 && (positives = splitToPatterns(a, b, state, opts)), state.negatives = negatives, state.positives = positives, state.result = collatePatterns(negatives, positives, opts), opts.capture === !0 ? state.result = `(${state.result})` : opts.wrap !== !1 && positives.length + negatives.length > 1 && (state.result = `(?:${state.result})`), toRegexRange.cache[cacheKey] = state, state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", !1, options) || [], onlyPositive = filterPatterns(pos, neg, "", !1, options) || [], intersected = filterPatterns(neg, pos, "-?", !0, options) || [];
      return onlyNegative.concat(intersected).concat(onlyPositive).join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1, zeros = 1, stop = countNines(min, nines), stops = /* @__PURE__ */ new Set([max]);
      for (; min <= stop && stop <= max; )
        stops.add(stop), nines += 1, stop = countNines(min, nines);
      for (stop = countZeros(max + 1, zeros) - 1; min < stop && stop <= max; )
        stops.add(stop), zeros += 1, stop = countZeros(max + 1, zeros) - 1;
      return stops = [...stops], stops.sort(compare), stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop)
        return { pattern: start, count: [], digits: 0 };
      let zipped = zip(start, stop), digits = zipped.length, pattern = "", count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        startDigit === stopDigit ? pattern += startDigit : startDigit !== "0" || stopDigit !== "9" ? pattern += toCharacterClass(startDigit, stopDigit, options) : count++;
      }
      return count && (pattern += options.shorthand === !0 ? "\\d" : "[0-9]"), { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max), tokens = [], start = min, prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i], obj = rangeToPattern(String(start), String(max2), options), zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          prev.count.length > 1 && prev.count.pop(), prev.count.push(obj.count[0]), prev.string = prev.pattern + toQuantifier(prev.count), start = max2 + 1;
          continue;
        }
        tok.isPadded && (zeros = padZeros(max2, tok, options)), obj.string = zeros + obj.pattern + toQuantifier(obj.count), tokens.push(obj), start = max2 + 1, prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        !intersection && !contains(comparison, "string", string) && result.push(prefix + string), intersection && contains(comparison, "string", string) && result.push(prefix + string);
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      return stop || start > 1 ? `{${start + (stop ? "," + stop : "")}}` : "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded)
        return value;
      let diff = Math.abs(tok.maxLen - String(value).length), relax = options.relaxZeros !== !1;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default:
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module.exports = toRegexRange;
  }
});

// ../../node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "../../node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var util = __require("util"), toRegexRange = require_to_regex_range(), isObject = (val) => val !== null && typeof val == "object" && !Array.isArray(val), transform = (toNumber) => (value) => toNumber === !0 ? Number(value) : String(value), isValidValue = (value) => typeof value == "number" || typeof value == "string" && value !== "", isNumber = (num) => Number.isInteger(+num), zeros = (input) => {
      let value = `${input}`, index = -1;
      if (value[0] === "-" && (value = value.slice(1)), value === "0") return !1;
      for (; value[++index] === "0"; ) ;
      return index > 0;
    }, stringify = (start, end, options) => typeof start == "string" || typeof end == "string" ? !0 : options.stringify === !0, pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        dash && (input = input.slice(1)), input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      return toNumber === !1 ? String(input) : input;
    }, toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      for (negative && (input = input.slice(1), maxLength--); input.length < maxLength; ) input = "0" + input;
      return negative ? "-" + input : input;
    }, toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0), parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:", positives = "", negatives = "", result;
      return parts.positives.length && (positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|")), parts.negatives.length && (negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`), positives && negatives ? result = `${positives}|${negatives}` : result = positives || negatives, options.wrap ? `(${prefix}${result})` : result;
    }, toRange = (a, b, isNumbers, options) => {
      if (isNumbers)
        return toRegexRange(a, b, { wrap: !1, ...options });
      let start = String.fromCharCode(a);
      if (a === b) return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    }, toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === !0, prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    }, rangeError = (...args) => new RangeError("Invalid range arguments: " + util.inspect(...args)), invalidRange = (start, end, options) => {
      if (options.strictRanges === !0) throw rangeError([start, end]);
      return [];
    }, invalidStep = (step, options) => {
      if (options.strictRanges === !0)
        throw new TypeError(`Expected step "${step}" to be a number`);
      return [];
    }, fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start), b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === !0) throw rangeError([start, end]);
        return [];
      }
      a === 0 && (a = 0), b === 0 && (b = 0);
      let descending = a > b, startString = String(start), endString = String(end), stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString), maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0, toNumber = padded === !1 && stringify(start, end, options) === !1, format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1)
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), !0, options);
      let parts = { negatives: [], positives: [] }, push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num)), range = [], index = 0;
      for (; descending ? a >= b : a <= b; )
        options.toRegex === !0 && step > 1 ? push(a) : range.push(pad(format(a, index), maxLen, toNumber)), a = descending ? a - step : a + step, index++;
      return options.toRegex === !0 ? step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: !1, ...options }) : range;
    }, fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1)
        return invalidRange(start, end, options);
      let format = options.transform || ((val) => String.fromCharCode(val)), a = `${start}`.charCodeAt(0), b = `${end}`.charCodeAt(0), descending = a > b, min = Math.min(a, b), max = Math.max(a, b);
      if (options.toRegex && step === 1)
        return toRange(min, max, !1, options);
      let range = [], index = 0;
      for (; descending ? a >= b : a <= b; )
        range.push(format(a, index)), a = descending ? a - step : a + step, index++;
      return options.toRegex === !0 ? toRegex(range, null, { wrap: !1, options }) : range;
    }, fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start))
        return [start];
      if (!isValidValue(start) || !isValidValue(end))
        return invalidRange(start, end, options);
      if (typeof step == "function")
        return fill(start, end, 1, { transform: step });
      if (isObject(step))
        return fill(start, end, 0, step);
      let opts = { ...options };
      return opts.capture === !0 && (opts.wrap = !0), step = step || opts.step || 1, isNumber(step) ? isNumber(start) && isNumber(end) ? fillNumbers(start, end, step, opts) : fillLetters(start, end, Math.max(Math.abs(step), 1), opts) : step != null && !isObject(step) ? invalidStep(step, opts) : fill(start, end, 1, step);
    };
    module.exports = fill;
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var fill = require_fill_range(), utils = require_utils(), compile = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent), invalidNode = node.invalid === !0 && options.escapeInvalid === !0, invalid = invalidBlock === !0 || invalidNode === !0, prefix = options.escapeInvalid === !0 ? "\\" : "", output = "";
        if (node.isOpen === !0)
          return prefix + node.value;
        if (node.isClose === !0)
          return console.log("node.isClose", prefix, node.value), prefix + node.value;
        if (node.type === "open")
          return invalid ? prefix + node.value : "(";
        if (node.type === "close")
          return invalid ? prefix + node.value : ")";
        if (node.type === "comma")
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        if (node.value)
          return node.value;
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes), range = fill(...args, { ...options, wrap: !1, toRegex: !0, strictZeros: !0 });
          if (range.length !== 0)
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
        }
        if (node.nodes)
          for (let child of node.nodes)
            output += walk(child, node);
        return output;
      };
      return walk(ast);
    };
    module.exports = compile;
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var fill = require_fill_range(), stringify = require_stringify(), utils = require_utils(), append = (queue = "", stash = "", enclose = !1) => {
      let result = [];
      if (queue = [].concat(queue), stash = [].concat(stash), !stash.length) return queue;
      if (!queue.length)
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      for (let item of queue)
        if (Array.isArray(item))
          for (let value of item)
            result.push(append(value, stash, enclose));
        else
          for (let ele of stash)
            enclose === !0 && typeof ele == "string" && (ele = `{${ele}}`), result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
      return utils.flatten(result);
    }, expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit, walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent, q = parent.queue;
        for (; p.type !== "brace" && p.type !== "root" && p.parent; )
          p = p.parent, q = p.queue;
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== !0 && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit))
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          let range = fill(...args, options);
          range.length === 0 && (range = stringify(node, options)), q.push(append(q.pop(), range)), node.nodes = [];
          return;
        }
        let enclose = utils.encloseBrace(node), queue = node.queue, block = node;
        for (; block.type !== "brace" && block.type !== "root" && block.parent; )
          block = block.parent, queue = block.queue;
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            i === 1 && queue.push(""), queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          child.nodes && walk(child, node);
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module.exports = expand;
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: `
`,
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var stringify = require_stringify(), {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants(), parse = (input, options = {}) => {
      if (typeof input != "string")
        throw new TypeError("Expected a string");
      let opts = options || {}, max = typeof opts.maxLength == "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max)
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      let ast = { type: "root", input, nodes: [] }, stack = [ast], block = ast, prev = ast, brackets = 0, length = input.length, index = 0, depth = 0, value, advance = () => input[index++], push = (node) => {
        if (node.type === "text" && prev.type === "dot" && (prev.type = "text"), prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        return block.nodes.push(node), node.parent = block, node.prev = prev, prev = node, node;
      };
      for (push({ type: "bos" }); index < length; )
        if (block = stack[stack.length - 1], value = advance(), !(value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE)) {
          if (value === CHAR_BACKSLASH) {
            push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
            continue;
          }
          if (value === CHAR_RIGHT_SQUARE_BRACKET) {
            push({ type: "text", value: "\\" + value });
            continue;
          }
          if (value === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            let next;
            for (; index < length && (next = advance()); ) {
              if (value += next, next === CHAR_LEFT_SQUARE_BRACKET) {
                brackets++;
                continue;
              }
              if (next === CHAR_BACKSLASH) {
                value += advance();
                continue;
              }
              if (next === CHAR_RIGHT_SQUARE_BRACKET && (brackets--, brackets === 0))
                break;
            }
            push({ type: "text", value });
            continue;
          }
          if (value === CHAR_LEFT_PARENTHESES) {
            block = push({ type: "paren", nodes: [] }), stack.push(block), push({ type: "text", value });
            continue;
          }
          if (value === CHAR_RIGHT_PARENTHESES) {
            if (block.type !== "paren") {
              push({ type: "text", value });
              continue;
            }
            block = stack.pop(), push({ type: "text", value }), block = stack[stack.length - 1];
            continue;
          }
          if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
            let open = value, next;
            for (options.keepQuotes !== !0 && (value = ""); index < length && (next = advance()); ) {
              if (next === CHAR_BACKSLASH) {
                value += next + advance();
                continue;
              }
              if (next === open) {
                options.keepQuotes === !0 && (value += next);
                break;
              }
              value += next;
            }
            push({ type: "text", value });
            continue;
          }
          if (value === CHAR_LEFT_CURLY_BRACE) {
            depth++;
            let brace = {
              type: "brace",
              open: !0,
              close: !1,
              dollar: prev.value && prev.value.slice(-1) === "$" || block.dollar === !0,
              depth,
              commas: 0,
              ranges: 0,
              nodes: []
            };
            block = push(brace), stack.push(block), push({ type: "open", value });
            continue;
          }
          if (value === CHAR_RIGHT_CURLY_BRACE) {
            if (block.type !== "brace") {
              push({ type: "text", value });
              continue;
            }
            let type = "close";
            block = stack.pop(), block.close = !0, push({ type, value }), depth--, block = stack[stack.length - 1];
            continue;
          }
          if (value === CHAR_COMMA && depth > 0) {
            if (block.ranges > 0) {
              block.ranges = 0;
              let open = block.nodes.shift();
              block.nodes = [open, { type: "text", value: stringify(block) }];
            }
            push({ type: "comma", value }), block.commas++;
            continue;
          }
          if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
            let siblings = block.nodes;
            if (depth === 0 || siblings.length === 0) {
              push({ type: "text", value });
              continue;
            }
            if (prev.type === "dot") {
              if (block.range = [], prev.value += value, prev.type = "range", block.nodes.length !== 3 && block.nodes.length !== 5) {
                block.invalid = !0, block.ranges = 0, prev.type = "text";
                continue;
              }
              block.ranges++, block.args = [];
              continue;
            }
            if (prev.type === "range") {
              siblings.pop();
              let before = siblings[siblings.length - 1];
              before.value += prev.value + value, prev = before, block.ranges--;
              continue;
            }
            push({ type: "dot", value });
            continue;
          }
          push({ type: "text", value });
        }
      do
        if (block = stack.pop(), block.type !== "root") {
          block.nodes.forEach((node) => {
            node.nodes || (node.type === "open" && (node.isOpen = !0), node.type === "close" && (node.isClose = !0), node.nodes || (node.type = "text"), node.invalid = !0);
          });
          let parent = stack[stack.length - 1], index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      while (stack.length > 0);
      return push({ type: "eos" }), ast;
    };
    module.exports = parse;
  }
});

// ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js
var require_braces = __commonJS({
  "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var stringify = require_stringify(), compile = require_compile(), expand = require_expand(), parse = require_parse(), braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input))
        for (let pattern of input) {
          let result = braces.create(pattern, options);
          Array.isArray(result) ? output.push(...result) : output.push(result);
        }
      else
        output = [].concat(braces.create(input, options));
      return options && options.expand === !0 && options.nodupes === !0 && (output = [...new Set(output)]), output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => stringify(typeof input == "string" ? braces.parse(input, options) : input, options);
    braces.compile = (input, options = {}) => (typeof input == "string" && (input = braces.parse(input, options)), compile(input, options));
    braces.expand = (input, options = {}) => {
      typeof input == "string" && (input = braces.parse(input, options));
      let result = expand(input, options);
      return options.noempty === !0 && (result = result.filter(Boolean)), options.nodupes === !0 && (result = [...new Set(result)]), result;
    };
    braces.create = (input, options = {}) => input === "" || input.length < 3 ? [input] : options.expand !== !0 ? braces.compile(input, options) : braces.expand(input, options);
    module.exports = braces;
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var path = __require("path"), WIN_SLASH = "\\\\/", WIN_NO_SLASH = `[^${WIN_SLASH}]`, DOT_LITERAL = "\\.", PLUS_LITERAL = "\\+", QMARK_LITERAL = "\\?", SLASH_LITERAL = "\\/", ONE_CHAR = "(?=.)", QMARK = "[^/]", END_ANCHOR = `(?:${SLASH_LITERAL}|$)`, START_ANCHOR = `(?:^|${SLASH_LITERAL})`, DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`, NO_DOT = `(?!${DOT_LITERAL})`, NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`, NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`, NO_DOTS_SLASH = `(?!${DOTS_SLASH})`, QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`, STAR = `${QMARK}*?`, POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    }, WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    }, POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === !0 ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    init_cjs_shims();
    var path = __require("path"), win32 = process.platform === "win32", {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports.isObject = (val) => val !== null && typeof val == "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => str.replace(REGEX_REMOVE_BACKSLASH, (match) => match === "\\" ? "" : match);
    exports.supportsLookbehinds = () => {
      let segs = process.version.slice(1).split(".").map(Number);
      return segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10;
    };
    exports.isWindows = (options) => options && typeof options.windows == "boolean" ? options.windows : win32 === !0 || path.sep === "\\";
    exports.escapeLast = (input, char, lastIdx) => {
      let idx = input.lastIndexOf(char, lastIdx);
      return idx === -1 ? input : input[idx - 1] === "\\" ? exports.escapeLast(input, char, idx - 1) : `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      return output.startsWith("./") && (output = output.slice(2), state.prefix = "./"), output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      let prepend = options.contains ? "" : "^", append = options.contains ? "" : "$", output = `${prepend}(?:${input})${append}`;
      return state.negated === !0 && (output = `(?:^(?!${output}).*$)`), output;
    };
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var utils = require_utils2(), {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants2(), isPathSeparator = (code) => code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH, depth = (token) => {
      token.isPrefix !== !0 && (token.depth = token.isGlobstar ? 1 / 0 : 1);
    }, scan = (input, options) => {
      let opts = options || {}, length = input.length - 1, scanToEnd = opts.parts === !0 || opts.scanToEnd === !0, slashes = [], tokens = [], parts = [], str = input, index = -1, start = 0, lastIndex = 0, isBrace = !1, isBracket = !1, isGlob = !1, isExtglob = !1, isGlobstar = !1, braceEscaped = !1, backslashes = !1, negated = !1, negatedExtglob = !1, finished = !1, braces = 0, prev, code, token = { value: "", depth: 0, isGlob: !1 }, eos = () => index >= length, peek = () => str.charCodeAt(index + 1), advance = () => (prev = code, str.charCodeAt(++index));
      for (; index < length; ) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = !0, code = advance(), code === CHAR_LEFT_CURLY_BRACE && (braceEscaped = !0);
          continue;
        }
        if (braceEscaped === !0 || code === CHAR_LEFT_CURLY_BRACE) {
          for (braces++; eos() !== !0 && (code = advance()); ) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = !0, advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== !0 && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
                continue;
              break;
            }
            if (braceEscaped !== !0 && code === CHAR_COMMA) {
              if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
                continue;
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE && (braces--, braces === 0)) {
              braceEscaped = !1, isBrace = token.isBrace = !0, finished = !0;
              break;
            }
          }
          if (scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          if (slashes.push(index), tokens.push(token), token = { value: "", depth: 0, isGlob: !1 }, finished === !0) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== !0 && (code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) === !0 && peek() === CHAR_LEFT_PARENTHESES) {
          if (isGlob = token.isGlob = !0, isExtglob = token.isExtglob = !0, finished = !0, code === CHAR_EXCLAMATION_MARK && index === start && (negatedExtglob = !0), scanToEnd === !0) {
            for (; eos() !== !0 && (code = advance()); ) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = !0, code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob = token.isGlob = !0, finished = !0;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK && (isGlobstar = token.isGlobstar = !0), isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          if (isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          for (; eos() !== !0 && (next = advance()); ) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = !0, advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = !0, isGlob = token.isGlob = !0, finished = !0;
              break;
            }
          }
          if (scanToEnd === !0)
            continue;
          break;
        }
        if (opts.nonegate !== !0 && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = !0, start++;
          continue;
        }
        if (opts.noparen !== !0 && code === CHAR_LEFT_PARENTHESES) {
          if (isGlob = token.isGlob = !0, scanToEnd === !0) {
            for (; eos() !== !0 && (code = advance()); ) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = !0, code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = !0;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === !0) {
          if (finished = !0, scanToEnd === !0)
            continue;
          break;
        }
      }
      opts.noext === !0 && (isExtglob = !1, isGlob = !1);
      let base = str, prefix = "", glob = "";
      start > 0 && (prefix = str.slice(0, start), str = str.slice(start), lastIndex -= start), base && isGlob === !0 && lastIndex > 0 ? (base = str.slice(0, lastIndex), glob = str.slice(lastIndex)) : isGlob === !0 ? (base = "", glob = str) : base = str, base && base !== "" && base !== "/" && base !== str && isPathSeparator(base.charCodeAt(base.length - 1)) && (base = base.slice(0, -1)), opts.unescape === !0 && (glob && (glob = utils.removeBackslashes(glob)), base && backslashes === !0 && (base = utils.removeBackslashes(base)));
      let state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === !0 && (state.maxDepth = 0, isPathSeparator(code) || tokens.push(token), state.tokens = tokens), opts.parts === !0 || opts.tokens === !0) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          let n = prevIndex ? prevIndex + 1 : start, i = slashes[idx], value = input.slice(n, i);
          opts.tokens && (idx === 0 && start !== 0 ? (tokens[idx].isPrefix = !0, tokens[idx].value = prefix) : tokens[idx].value = value, depth(tokens[idx]), state.maxDepth += tokens[idx].depth), (idx !== 0 || value !== "") && parts.push(value), prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          let value = input.slice(prevIndex + 1);
          parts.push(value), opts.tokens && (tokens[tokens.length - 1].value = value, depth(tokens[tokens.length - 1]), state.maxDepth += tokens[tokens.length - 1].depth);
        }
        state.slashes = slashes, state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var constants = require_constants2(), utils = require_utils2(), {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants, expandRange = (args, options) => {
      if (typeof options.expandRange == "function")
        return options.expandRange(...args, options);
      args.sort();
      let value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    }, syntaxError = (type, char) => `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`, parse = (input, options) => {
      if (typeof input != "string")
        throw new TypeError("Expected a string");
      input = REPLACEMENTS[input] || input;
      let opts = { ...options }, max = typeof opts.maxLength == "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH, len = input.length;
      if (len > max)
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      let bos = { type: "bos", value: "", output: opts.prepend || "" }, tokens = [bos], capture = opts.capture ? "" : "?:", win32 = utils.isWindows(options), PLATFORM_CHARS = constants.globChars(win32), EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS), {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS, globstar = (opts2) => `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, nodot = opts.dot ? "" : NO_DOT, qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT, star = opts.bash === !0 ? globstar(opts) : STAR;
      opts.capture && (star = `(${star})`), typeof opts.noext == "boolean" && (opts.noextglob = opts.noext);
      let state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === !0,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: !1,
        negated: !1,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: !1,
        tokens
      };
      input = utils.removePrefix(input, state), len = input.length;
      let extglobs = [], braces = [], stack = [], prev = bos, value, eos = () => state.index === len - 1, peek = state.peek = (n = 1) => input[state.index + n], advance = state.advance = () => input[++state.index] || "", remaining = () => input.slice(state.index + 1), consume = (value2 = "", num = 0) => {
        state.consumed += value2, state.index += num;
      }, append = (token) => {
        state.output += token.output != null ? token.output : token.value, consume(token.value);
      }, negate = () => {
        let count = 1;
        for (; peek() === "!" && (peek(2) !== "(" || peek(3) === "?"); )
          advance(), state.start++, count++;
        return count % 2 === 0 ? !1 : (state.negated = !0, state.start++, !0);
      }, increment = (type) => {
        state[type]++, stack.push(type);
      }, decrement = (type) => {
        state[type]--, stack.pop();
      }, push = (tok) => {
        if (prev.type === "globstar") {
          let isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace"), isExtglob = tok.extglob === !0 || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob && (state.output = state.output.slice(0, -prev.output.length), prev.type = "star", prev.value = "*", prev.output = star, state.output += prev.output);
        }
        if (extglobs.length && tok.type !== "paren" && (extglobs[extglobs.length - 1].inner += tok.value), (tok.value || tok.output) && append(tok), prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value, prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev, tokens.push(tok), prev = tok;
      }, extglobOpen = (type, value2) => {
        let token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev, token.parens = state.parens, token.output = state.output;
        let output = (opts.capture ? "(" : "") + token.open;
        increment("parens"), push({ type, value: value2, output: state.output ? "" : ONE_CHAR }), push({ type: "paren", extglob: !0, value: advance(), output }), extglobs.push(token);
      }, extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : ""), rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/") && (extglobStar = globstar(opts)), (extglobStar !== star || eos() || /^\)+$/.test(remaining())) && (output = token.close = `)$))${extglobStar}`), token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            let expression = parse(rest, { ...options, fastpaths: !1 }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          token.prev.type === "bos" && (state.negatedExtglob = !0);
        }
        push({ type: "paren", extglob: !0, value, output }), decrement("parens");
      };
      if (opts.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = !1, output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => first === "\\" ? (backslashes = !0, m) : first === "?" ? esc ? esc + first + (rest ? QMARK.repeat(rest.length) : "") : index === 0 ? qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "") : QMARK.repeat(chars.length) : first === "." ? DOT_LITERAL.repeat(chars.length) : first === "*" ? esc ? esc + first + (rest ? star : "") : star : esc ? m : `\\${m}`);
        return backslashes === !0 && (opts.unescape === !0 ? output = output.replace(/\\/g, "") : output = output.replace(/\\+/g, (m) => m.length % 2 === 0 ? "\\\\" : m ? "\\" : "")), output === input && opts.contains === !0 ? (state.output = input, state) : (state.output = utils.wrapOutput(output, state, options), state);
      }
      for (; !eos(); ) {
        if (value = advance(), value === "\0")
          continue;
        if (value === "\\") {
          let next = peek();
          if (next === "/" && opts.bash !== !0 || next === "." || next === ";")
            continue;
          if (!next) {
            value += "\\", push({ type: "text", value });
            continue;
          }
          let match = /^\\+/.exec(remaining()), slashes = 0;
          if (match && match[0].length > 2 && (slashes = match[0].length, state.index += slashes, slashes % 2 !== 0 && (value += "\\")), opts.unescape === !0 ? value = advance() : value += advance(), state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== !1 && value === ":") {
            let inner = prev.value.slice(1);
            if (inner.includes("[") && (prev.posix = !0, inner.includes(":"))) {
              let idx = prev.value.lastIndexOf("["), pre = prev.value.slice(0, idx), rest2 = prev.value.slice(idx + 2), posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix, state.backtrack = !0, advance(), !bos.output && tokens.indexOf(prev) === 1 && (bos.output = ONE_CHAR);
                continue;
              }
            }
          }
          (value === "[" && peek() !== ":" || value === "-" && peek() === "]") && (value = `\\${value}`), value === "]" && (prev.value === "[" || prev.value === "[^") && (value = `\\${value}`), opts.posix === !0 && value === "!" && prev.value === "[" && (value = "^"), prev.value += value, append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value), prev.value += value, append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1, opts.keepQuotes === !0 && push({ type: "text", value });
          continue;
        }
        if (value === "(") {
          increment("parens"), push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === !0)
            throw new SyntaxError(syntaxError("opening", "("));
          let extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" }), decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === !0 || !remaining().includes("]")) {
            if (opts.nobracket !== !0 && opts.strictBrackets === !0)
              throw new SyntaxError(syntaxError("closing", "]"));
            value = `\\${value}`;
          } else
            increment("brackets");
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === !0 || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === !0)
              throw new SyntaxError(syntaxError("opening", "["));
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          let prevValue = prev.value.slice(1);
          if (prev.posix !== !0 && prevValue[0] === "^" && !prevValue.includes("/") && (value = `/${value}`), prev.value += value, append({ value }), opts.literalBrackets === !1 || utils.hasRegexChars(prevValue))
            continue;
          let escaped = utils.escapeRegex(prev.value);
          if (state.output = state.output.slice(0, -prev.value.length), opts.literalBrackets === !0) {
            state.output += escaped, prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`, state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== !0) {
          increment("braces");
          let open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open), push(open);
          continue;
        }
        if (value === "}") {
          let brace = braces[braces.length - 1];
          if (opts.nobrace === !0 || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === !0) {
            let arr = tokens.slice(), range = [];
            for (let i = arr.length - 1; i >= 0 && (tokens.pop(), arr[i].type !== "brace"); i--)
              arr[i].type !== "dots" && range.unshift(arr[i].value);
            output = expandRange(range, opts), state.backtrack = !0;
          }
          if (brace.comma !== !0 && brace.dots !== !0) {
            let out = state.output.slice(0, brace.outputIndex), toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{", value = output = "\\}", state.output = out;
            for (let t of toks)
              state.output += t.output || t.value;
          }
          push({ type: "brace", value, output }), decrement("braces"), braces.pop();
          continue;
        }
        if (value === "|") {
          extglobs.length > 0 && extglobs[extglobs.length - 1].conditions++, push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value, brace = braces[braces.length - 1];
          brace && stack[stack.length - 1] === "braces" && (brace.comma = !0, output = "|"), push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1, state.consumed = "", state.output = "", tokens.pop(), prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            prev.value === "." && (prev.output = DOT_LITERAL);
            let brace = braces[braces.length - 1];
            prev.type = "dots", prev.output += value, prev.value += value, brace.dots = !0;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          if (!(prev && prev.value === "(") && opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            let next = peek(), output = value;
            if (next === "<" && !utils.supportsLookbehinds())
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) && (output = `\\${value}`), push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== !0 && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== !0 && peek() === "(" && (peek(2) !== "?" || !/[!=<:]/.test(peek(3)))) {
            extglobOpen("negate", value);
            continue;
          }
          if (opts.nonegate !== !0 && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === !1) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: !0, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          (value === "$" || value === "^") && (value = `\\${value}`);
          let match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          match && (value += match[0], state.index += match[0].length), push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === !0)) {
          prev.type = "star", prev.star = !0, prev.value += value, prev.output = star, state.backtrack = !0, state.globstar = !0, consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== !0 && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === !0) {
            consume(value);
            continue;
          }
          let prior = prev.prev, before = prior.prev, isStart = prior.type === "slash" || prior.type === "bos", afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === !0 && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          let isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace"), isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          for (; rest.slice(0, 3) === "/**"; ) {
            let after = input[state.index + 4];
            if (after && after !== "/")
              break;
            rest = rest.slice(3), consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar", prev.value += value, prev.output = globstar(opts), state.output = prev.output, state.globstar = !0, consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, prev.type = "globstar", prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)"), prev.value += value, state.globstar = !0, state.output += prior.output + prev.output, consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            let end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, prev.type = "globstar", prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`, prev.value += value, state.output += prior.output + prev.output, state.globstar = !0, consume(value + advance()), push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar", prev.value += value, prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`, state.output = prev.output, state.globstar = !0, consume(value + advance()), push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length), prev.type = "globstar", prev.output = globstar(opts), prev.value += value, state.output += prev.output, state.globstar = !0, consume(value);
          continue;
        }
        let token = { type: "star", value, output: star };
        if (opts.bash === !0) {
          token.output = ".*?", (prev.type === "bos" || prev.type === "slash") && (token.output = nodot + token.output), push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === !0) {
          token.output = value, push(token);
          continue;
        }
        (state.index === state.start || prev.type === "slash" || prev.type === "dot") && (prev.type === "dot" ? (state.output += NO_DOT_SLASH, prev.output += NO_DOT_SLASH) : opts.dot === !0 ? (state.output += NO_DOTS_SLASH, prev.output += NO_DOTS_SLASH) : (state.output += nodot, prev.output += nodot), peek() !== "*" && (state.output += ONE_CHAR, prev.output += ONE_CHAR)), push(token);
      }
      for (; state.brackets > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "["), decrement("brackets");
      }
      for (; state.parens > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "("), decrement("parens");
      }
      for (; state.braces > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{"), decrement("braces");
      }
      if (opts.strictSlashes !== !0 && (prev.type === "star" || prev.type === "bracket") && push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` }), state.backtrack === !0) {
        state.output = "";
        for (let token of state.tokens)
          state.output += token.output != null ? token.output : token.value, token.suffix && (state.output += token.suffix);
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      let opts = { ...options }, max = typeof opts.maxLength == "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH, len = input.length;
      if (len > max)
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      input = REPLACEMENTS[input] || input;
      let win32 = utils.isWindows(options), {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32), nodot = opts.dot ? NO_DOTS : NO_DOT, slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT, capture = opts.capture ? "" : "?:", state = { negated: !1, prefix: "" }, star = opts.bash === !0 ? ".*?" : STAR;
      opts.capture && (star = `(${star})`);
      let globstar = (opts2) => opts2.noglobstar === !0 ? star : `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            let match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            let source2 = create(match[1]);
            return source2 ? source2 + DOT_LITERAL + match[2] : void 0;
          }
        }
      }, output = utils.removePrefix(input, state), source = create(output);
      return source && opts.strictSlashes !== !0 && (source += `${SLASH_LITERAL}?`), source;
    };
    module.exports = parse;
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var path = __require("path"), scan = require_scan(), parse = require_parse2(), utils = require_utils2(), constants = require_constants2(), isObject = (val) => val && typeof val == "object" && !Array.isArray(val), picomatch = (glob, options, returnState = !1) => {
      if (Array.isArray(glob)) {
        let fns = glob.map((input) => picomatch(input, options, returnState));
        return (str) => {
          for (let isMatch of fns) {
            let state2 = isMatch(str);
            if (state2) return state2;
          }
          return !1;
        };
      }
      let isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob != "string" && !isState)
        throw new TypeError("Expected pattern to be a non-empty string");
      let opts = options || {}, posix = utils.isWindows(options), regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, !1, !0), state = regex.state;
      delete regex.state;
      let isIgnored = () => !1;
      if (opts.ignore) {
        let ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      let matcher = (input, returnObject = !1) => {
        let { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix }), result = { glob, state, regex, posix, input, output, match, isMatch };
        return typeof opts.onResult == "function" && opts.onResult(result), isMatch === !1 ? (result.isMatch = !1, returnObject ? result : !1) : isIgnored(input) ? (typeof opts.onIgnore == "function" && opts.onIgnore(result), result.isMatch = !1, returnObject ? result : !1) : (typeof opts.onMatch == "function" && opts.onMatch(result), returnObject ? result : !0);
      };
      return returnState && (matcher.state = state), matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input != "string")
        throw new TypeError("Expected input to be a string");
      if (input === "")
        return { isMatch: !1, output: "" };
      let opts = options || {}, format = opts.format || (posix ? utils.toPosixSlashes : null), match = input === glob, output = match && format ? format(input) : input;
      return match === !1 && (output = format ? format(input) : input, match = output === glob), (match === !1 || opts.capture === !0) && (opts.matchBase === !0 || opts.basename === !0 ? match = picomatch.matchBase(input, regex, options, posix) : match = regex.exec(output)), { isMatch: !!match, match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => (glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)).test(path.basename(input));
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => Array.isArray(pattern) ? pattern.map((p) => picomatch.parse(p, options)) : parse(pattern, { ...options, fastpaths: !1 });
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = !1, returnState = !1) => {
      if (returnOutput === !0)
        return state.output;
      let opts = options || {}, prepend = opts.contains ? "" : "^", append = opts.contains ? "" : "$", source = `${prepend}(?:${state.output})${append}`;
      state && state.negated === !0 && (source = `^(?!${source}).*$`);
      let regex = picomatch.toRegex(source, options);
      return returnState === !0 && (regex.state = state), regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = !1, returnState = !1) => {
      if (!input || typeof input != "string")
        throw new TypeError("Expected a non-empty string");
      let parsed = { negated: !1, fastpaths: !0 };
      return options.fastpaths !== !1 && (input[0] === "." || input[0] === "*") && (parsed.output = parse.fastpaths(input, options)), parsed.output || (parsed = parse(input, options)), picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        let opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === !0) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module.exports = picomatch;
  }
});

// ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = require_picomatch();
  }
});

export {
  require_is_glob,
  require_glob_parent,
  require_braces,
  require_utils2 as require_utils,
  require_picomatch2 as require_picomatch
};
/*! Bundled license information:

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=chunk-7IK72W75.js.map
