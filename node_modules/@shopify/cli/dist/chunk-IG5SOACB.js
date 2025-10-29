import {
  require_once,
  require_wrappy
} from "./chunk-SHWOPMLQ.js";
import {
  require_balanced_match
} from "./chunk-XE5EOEBL.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js"(exports) {
    init_cjs_shims();
    var pathModule = __require("path"), isWindows = process.platform === "win32", fs = __require("fs"), DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        err && (backtrace.message = err.message, err = backtrace, missingCallback(err));
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            process.traceDeprecation ? console.trace(msg) : console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb == "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    isWindows ? nextPartRe = /(.*?)(?:[\/\\]+|$)/g : nextPartRe = /(.*?)(?:[\/]+|$)/g;
    var nextPartRe;
    isWindows ? splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/ : splitRootRe = /^[\/]*/;
    var splitRootRe;
    exports.realpathSync = function(p, cache) {
      if (p = pathModule.resolve(p), cache && Object.prototype.hasOwnProperty.call(cache, p))
        return cache[p];
      var original = p, seenLinks = {}, knownHard = {}, pos, current, base, previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length, current = m[0], base = m[0], previous = "", isWindows && !knownHard[base] && (fs.lstatSync(base), knownHard[base] = !0);
      }
      for (; pos < p.length; ) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        if (previous = current, current += result[0], base = previous + result[1], pos = nextPartRe.lastIndex, !(knownHard[base] || cache && cache[base] === base)) {
          var resolvedLink;
          if (cache && Object.prototype.hasOwnProperty.call(cache, base))
            resolvedLink = cache[base];
          else {
            var stat = fs.lstatSync(base);
            if (!stat.isSymbolicLink()) {
              knownHard[base] = !0, cache && (cache[base] = base);
              continue;
            }
            var linkTarget = null;
            if (!isWindows) {
              var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
              seenLinks.hasOwnProperty(id) && (linkTarget = seenLinks[id]);
            }
            linkTarget === null && (fs.statSync(base), linkTarget = fs.readlinkSync(base)), resolvedLink = pathModule.resolve(previous, linkTarget), cache && (cache[base] = resolvedLink), isWindows || (seenLinks[id] = linkTarget);
          }
          p = pathModule.resolve(resolvedLink, p.slice(pos)), start();
        }
      }
      return cache && (cache[original] = p), p;
    };
    exports.realpath = function(p, cache, cb) {
      if (typeof cb != "function" && (cb = maybeCallback(cache), cache = null), p = pathModule.resolve(p), cache && Object.prototype.hasOwnProperty.call(cache, p))
        return process.nextTick(cb.bind(null, null, cache[p]));
      var original = p, seenLinks = {}, knownHard = {}, pos, current, base, previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length, current = m[0], base = m[0], previous = "", isWindows && !knownHard[base] ? fs.lstat(base, function(err) {
          if (err) return cb(err);
          knownHard[base] = !0, LOOP();
        }) : process.nextTick(LOOP);
      }
      function LOOP() {
        if (pos >= p.length)
          return cache && (cache[original] = p), cb(null, p);
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        return previous = current, current += result[0], base = previous + result[1], pos = nextPartRe.lastIndex, knownHard[base] || cache && cache[base] === base ? process.nextTick(LOOP) : cache && Object.prototype.hasOwnProperty.call(cache, base) ? gotResolvedLink(cache[base]) : fs.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err) return cb(err);
        if (!stat.isSymbolicLink())
          return knownHard[base] = !0, cache && (cache[base] = base), process.nextTick(LOOP);
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id))
            return gotTarget(null, seenLinks[id], base);
        }
        fs.stat(base, function(err2) {
          if (err2) return cb(err2);
          fs.readlink(base, function(err3, target) {
            isWindows || (seenLinks[id] = target), gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err) return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        cache && (cache[base2] = resolvedLink), gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos)), start();
      }
    };
  }
});

// ../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs = __require("fs"), origRealpath = fs.realpath, origRealpathSync = fs.realpathSync, version = process.version, ok = /^v[0-5]\./.test(version), old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok)
        return origRealpath(p, cache, cb);
      typeof cache == "function" && (cb = cache, cache = null), origRealpath(p, cache, function(er, result) {
        newError(er) ? old.realpath(p, cache, cb) : cb(er, result);
      });
    }
    function realpathSync(p, cache) {
      if (ok)
        return origRealpathSync(p, cache);
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er))
          return old.realpathSync(p, cache);
        throw er;
      }
    }
    function monkeypatch() {
      fs.realpath = realpath, fs.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs.realpath = origRealpath, fs.realpathSync = origRealpathSync;
    }
  }
});

// ../../node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "../../node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function(xs, fn) {
      for (var res = [], i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        isArray(x) ? res.push.apply(res, x) : res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// ../../node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "../../node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js"(exports, module) {
    init_cjs_shims();
    var concatMap = require_concat_map(), balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0", escOpen = "\0OPEN" + Math.random() + "\0", escClose = "\0CLOSE" + Math.random() + "\0", escComma = "\0COMMA" + Math.random() + "\0", escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [], m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre, body = m.body, post = m.post, p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      return post.length && (p[p.length - 1] += postParts.shift(), p.push.apply(p, postParts)), parts.push.apply(parts, p), parts;
    }
    function expandTop(str) {
      return str ? (str.substr(0, 2) === "{}" && (str = "\\{\\}" + str.substr(2)), expand(escapeBraces(str), !0).map(unescapeBraces)) : [];
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [], m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre)) return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body), isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body), isSequence = isNumericSequence || isAlphaSequence, isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions)
        return m.post.match(/,.*\}/) ? (str = m.pre + "{" + m.body + escClose + m.post, expand(str)) : [str];
      var n;
      if (isSequence)
        n = m.body.split(/\.\./);
      else if (n = parseCommaParts(m.body), n.length === 1 && (n = expand(n[0], !1).map(embrace), n.length === 1)) {
        var post = m.post.length ? expand(m.post, !1) : [""];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
      var pre = m.pre, post = m.post.length ? expand(m.post, !1) : [""], N;
      if (isSequence) {
        var x = numeric(n[0]), y = numeric(n[1]), width = Math.max(n[0].length, n[1].length), incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1, test = lte, reverse = y < x;
        reverse && (incr *= -1, test = gte);
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence)
            c = String.fromCharCode(i), c === "\\" && (c = "");
          else if (c = String(i), pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              i < 0 ? c = "-" + z + c.slice(1) : c = z + c;
            }
          }
          N.push(c);
        }
      } else
        N = concatMap(n, function(el) {
          return expand(el, !1);
        });
      for (var j = 0; j < N.length; j++)
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          (!isTop || isSequence || expansion) && expansions.push(expansion);
        }
      return expansions;
    }
  }
});

// ../../node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "../../node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js"(exports, module) {
    init_cjs_shims();
    module.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path = function() {
      try {
        return __require("path");
      } catch {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, expand = require_brace_expansion(), plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    }, qmark = "[^/]", star = qmark + "*?", twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?", reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        return set[c] = !0, set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      return options = options || {}, function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      return Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      }), Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      }), t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def != "object" || !Object.keys(def).length)
        return minimatch;
      var orig = minimatch, m = function(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      return m.Minimatch = function(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      }, m.Minimatch.defaults = function(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }, m.filter = function(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      }, m.defaults = function(options) {
        return orig.defaults(ext(def, options));
      }, m.makeRe = function(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      }, m.braceExpand = function(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      }, m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      }, m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      return assertValidPattern(pattern), options || (options = {}), !options.nocomment && pattern.charAt(0) === "#" ? !1 : new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch))
        return new Minimatch(pattern, options);
      assertValidPattern(pattern), options || (options = {}), pattern = pattern.trim(), !options.allowWindowsEscape && path.sep !== "/" && (pattern = pattern.split(path.sep).join("/")), this.options = options, this.set = [], this.pattern = pattern, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.partial = !!options.partial, this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern, options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = !0;
        return;
      }
      if (!pattern) {
        this.empty = !0;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      options.debug && (this.debug = function() {
        console.error.apply(console, arguments);
      }), this.debug(this.pattern, set), set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      }), this.debug(this.pattern, set), set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this), this.debug(this.pattern, set), set = set.filter(function(s) {
        return s.indexOf(!1) === -1;
      }), this.debug(this.pattern, set), this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern, negate = !1, options = this.options, negateOffset = 0;
      if (!options.nonegate) {
        for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++)
          negate = !negate, negateOffset++;
        negateOffset && (this.pattern = pattern.substr(negateOffset)), this.negate = negate;
      }
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      return options || (this instanceof Minimatch ? options = this.options : options = {}), pattern = typeof pattern > "u" ? this.pattern : pattern, assertValidPattern(pattern), options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern) ? [pattern] : expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64, assertValidPattern = function(pattern) {
      if (typeof pattern != "string")
        throw new TypeError("invalid pattern");
      if (pattern.length > MAX_PATTERN_LENGTH)
        throw new TypeError("pattern is too long");
    };
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**")
        if (options.noglobstar)
          pattern = "*";
        else
          return GLOBSTAR;
      if (pattern === "") return "";
      var re = "", hasMagic = !!options.nocase, escaping = !1, patternListStack = [], negativeLists = [], stateChar, inClass = !1, reClassStart = -1, classStart = -1, patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star, hasMagic = !0;
              break;
            case "?":
              re += qmark, hasMagic = !0;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re), stateChar = !1;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        if (this.debug("%s	%s %s %j", pattern, i, re, c), escaping && reSpecials[c]) {
          re += "\\" + c, escaping = !1;
          continue;
        }
        switch (c) {
          /* istanbul ignore next */
          case "/":
            return !1;
          case "\\":
            clearStateChar(), escaping = !0;
            continue;
          // the various stateChar values
          // for the "extglob" stuff.
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            if (this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c), inClass) {
              this.debug("  in class"), c === "!" && i === classStart + 1 && (c = "^"), re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar), clearStateChar(), stateChar = c, options.noext && clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            }), re += stateChar === "!" ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", stateChar, re), stateChar = !1;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar(), hasMagic = !0;
            var pl = patternListStack.pop();
            re += pl.close, pl.type === "!" && negativeLists.push(pl), pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|", escaping = !1;
              continue;
            }
            clearStateChar(), re += "|";
            continue;
          // these are mostly the same in regexp and glob
          case "[":
            if (clearStateChar(), inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = !0, classStart = i, reClassStart = re.length, re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c, escaping = !1;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]", hasMagic = hasMagic || sp[1], inClass = !1;
              continue;
            }
            hasMagic = !0, inClass = !1, re += c;
            continue;
          default:
            clearStateChar(), escaping ? escaping = !1 : reSpecials[c] && !(c === "^" && inClass) && (re += "\\"), re += c;
        }
      }
      for (inClass && (cs = pattern.substr(classStart + 1), sp = this.parse(cs, SUBPARSE), re = re.substr(0, reClassStart) + "\\[" + sp[0], hasMagic = hasMagic || sp[1]), pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl), tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          return $2 || ($2 = "\\"), $1 + $1 + $2 + "|";
        }), this.debug(`tail=%j
   %s`, tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = !0, re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar(), escaping && (re += "\\\\");
      var addPatternStart = !1;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = !0;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n], nlBefore = re.slice(0, nl.reStart), nlFirst = re.slice(nl.reStart, nl.reEnd - 8), nlLast = re.slice(nl.reEnd - 8, nl.reEnd), nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1, cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++)
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        nlAfter = cleanAfter;
        var dollar = "";
        nlAfter === "" && isSub !== SUBPARSE && (dollar = "$");
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic && (re = "(?=.)" + re), addPatternStart && (re = patternStart + re), isSub === SUBPARSE)
        return [re, hasMagic];
      if (!hasMagic)
        return globUnescape(pattern);
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch {
        return new RegExp("$.");
      }
      return regExp._glob = pattern, regExp._src = re, regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === !1) return this.regexp;
      var set = this.set;
      if (!set.length)
        return this.regexp = !1, this.regexp;
      var options = this.options, twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot, flags = options.nocase ? "i" : "", re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p == "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$", this.negate && (re = "^(?!" + re + ").*$");
      try {
        this.regexp = new RegExp(re, flags);
      } catch {
        this.regexp = !1;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      return list = list.filter(function(f) {
        return mm.match(f);
      }), mm.options.nonull && !list.length && list.push(pattern), list;
    };
    Minimatch.prototype.match = function(f, partial) {
      if (typeof partial > "u" && (partial = this.partial), this.debug("match", f, this.pattern), this.comment) return !1;
      if (this.empty) return f === "";
      if (f === "/" && partial) return !0;
      var options = this.options;
      path.sep !== "/" && (f = f.split(path.sep).join("/")), f = f.split(slashSplit), this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename, i;
      for (i = f.length - 1; i >= 0 && (filename = f[i], !filename); i--)
        ;
      for (i = 0; i < set.length; i++) {
        var pattern = set[i], file = f;
        options.matchBase && pattern.length === 1 && (file = [filename]);
        var hit = this.matchOne(file, pattern, partial);
        if (hit)
          return options.flipNegate ? !0 : !this.negate;
      }
      return options.flipNegate ? !1 : this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { this: this, file, pattern }
      ), this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi], f = file[fi];
        if (this.debug(pattern, p, f), p === !1) return !1;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi, pr = pi + 1;
          if (pr === pl) {
            for (this.debug("** at the end"); fi < fl; fi++)
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return !1;
            return !0;
          }
          for (; fr < fl; ) {
            var swallowee = file[fr];
            if (this.debug(`
globstar while`, file, fr, pattern, pr, swallowee), this.matchOne(file.slice(fr), pattern.slice(pr), partial))
              return this.debug("globstar found match!", fr, fl, swallowee), !0;
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), fr++;
          }
          return !!(partial && (this.debug(`
>>> no match, partial?`, file, fr, pattern, pr), fr === fl));
        }
        var hit;
        if (typeof p == "string" ? (hit = f === p, this.debug("string match", p, f, hit)) : (hit = f.match(p), this.debug("pattern match", p, f, hit)), !hit) return !1;
      }
      if (fi === fl && pi === pl)
        return !0;
      if (fi === fl)
        return partial;
      if (pi === pl)
        return fi === fl - 1 && file[fi] === "";
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports, module) {
    init_cjs_shims();
    typeof Object.create == "function" ? module.exports = function(ctor, superCtor) {
      superCtor && (ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }));
    } : module.exports = function(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
      }
    };
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports, module) {
    init_cjs_shims();
    try {
      if (util = __require("util"), typeof util.inherits != "function") throw "";
      module.exports = util.inherits;
    } catch {
      module.exports = require_inherits_browser();
    }
    var util;
  }
});

// ../../node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "../../node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    function posix(path) {
      return path.charAt(0) === "/";
    }
    function win32(path) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/, result = splitDeviceRe.exec(path), device = result[1] || "", isUnc = !!(device && device.charAt(1) !== ":");
      return !!(result[2] || isUnc);
    }
    module.exports = process.platform === "win32" ? win32 : posix;
    module.exports.posix = posix;
    module.exports.win32 = win32;
  }
});

// ../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js"(exports) {
    init_cjs_shims();
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs = __require("fs"), path = __require("path"), minimatch = require_minimatch(), isAbsolute = require_path_is_absolute(), Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [], Array.isArray(self.ignore) || (self.ignore = [self.ignore]), self.ignore.length && (self.ignore = self.ignore.map(ignoreMap));
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: !0 });
      }
      return {
        matcher: new Minimatch(pattern, { dot: !0 }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (options || (options = {}), options.matchBase && pattern.indexOf("/") === -1) {
        if (options.noglobstar)
          throw new Error("base matching requires globstar");
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent, self.pattern = pattern, self.strict = options.strict !== !1, self.realpath = !!options.realpath, self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null), self.follow = !!options.follow, self.dot = !!options.dot, self.mark = !!options.mark, self.nodir = !!options.nodir, self.nodir && (self.mark = !0), self.sync = !!options.sync, self.nounique = !!options.nounique, self.nonull = !!options.nonull, self.nosort = !!options.nosort, self.nocase = !!options.nocase, self.stat = !!options.stat, self.noprocess = !!options.noprocess, self.absolute = !!options.absolute, self.fs = options.fs || fs, self.maxLength = options.maxLength || 1 / 0, self.cache = options.cache || /* @__PURE__ */ Object.create(null), self.statCache = options.statCache || /* @__PURE__ */ Object.create(null), self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null), setupIgnores(self, options), self.changedCwd = !1;
      var cwd = process.cwd();
      ownProp(options, "cwd") ? (self.cwd = path.resolve(options.cwd), self.changedCwd = self.cwd !== cwd) : self.cwd = cwd, self.root = options.root || path.resolve(self.cwd, "/"), self.root = path.resolve(self.root), process.platform === "win32" && (self.root = self.root.replace(/\\/g, "/")), self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd), process.platform === "win32" && (self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")), self.nomount = !!options.nomount, options.nonegate = !0, options.nocomment = !0, options.allowWindowsEscape = !1, self.minimatch = new Minimatch(pattern, options), self.options = self.minimatch.options;
    }
    function finish(self) {
      for (var nou = self.nounique, all = nou ? [] : /* @__PURE__ */ Object.create(null), i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            nou ? all.push(literal) : all[literal] = !0;
          }
        } else {
          var m = Object.keys(matches);
          nou ? all.push.apply(all, m) : m.forEach(function(m2) {
            all[m2] = !0;
          });
        }
      }
      if (nou || (all = Object.keys(all)), self.nosort || (all = all.sort(alphasort)), self.mark) {
        for (var i = 0; i < all.length; i++)
          all[i] = self._mark(all[i]);
        self.nodir && (all = all.filter(function(e) {
          var notDir = !/\/$/.test(e), c = self.cache[e] || self.cache[makeAbs(self, e)];
          return notDir && c && (notDir = c !== "DIR" && !Array.isArray(c)), notDir;
        }));
      }
      self.ignore.length && (all = all.filter(function(m2) {
        return !isIgnored(self, m2);
      })), self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p), c = self.cache[abs], m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c), slash = p.slice(-1) === "/";
        if (isDir && !slash ? m += "/" : !isDir && slash && (m = m.slice(0, -1)), m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs], self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      return f.charAt(0) === "/" ? abs = path.join(self.root, f) : isAbsolute(f) || f === "" ? abs = f : self.changedCwd ? abs = path.resolve(self.cwd, f) : abs = path.resolve(f), process.platform === "win32" && (abs = abs.replace(/\\/g, "/")), abs;
    }
    function isIgnored(self, path2) {
      return self.ignore.length ? self.ignore.some(function(item) {
        return item.matcher.match(path2) || !!(item.gmatcher && item.gmatcher.match(path2));
      }) : !1;
    }
    function childrenIgnored(self, path2) {
      return self.ignore.length ? self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path2));
      }) : !1;
    }
  }
});

// ../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js
var require_sync = __commonJS({
  "../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js"(exports, module) {
    init_cjs_shims();
    module.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs(), minimatch = require_minimatch(), Minimatch = minimatch.Minimatch, Glob = require_glob().Glob, util = __require("util"), path = __require("path"), assert = __require("assert"), isAbsolute = require_path_is_absolute(), common = require_common(), setopts = common.setopts, ownProp = common.ownProp, childrenIgnored = common.childrenIgnored, isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options == "function" || arguments.length === 3)
        throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options == "function" || arguments.length === 3)
        throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      if (setopts(this, pattern, options), this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++)
        this._process(this.minimatch.set[i], i, !1);
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      if (assert.ok(this instanceof GlobSync), this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset)
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = !0;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = !0;
              else
                throw er;
            }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert.ok(this instanceof GlobSync);
      for (var n = 0; typeof pattern[n] == "string"; )
        n++;
      var prefix;
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n), read;
      prefix === null ? read = "." : ((isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p == "string" ? p : "[*]";
      }).join("/"))) && (!prefix || !isAbsolute(prefix)) && (prefix = "/" + prefix), read = prefix);
      var abs = this._makeAbs(read);
      if (!childrenIgnored(this, read)) {
        var isGlobStar = remain[0] === minimatch.GLOBSTAR;
        isGlobStar ? this._processGlobStar(prefix, read, abs, remain, index, inGlobStar) : this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
      }
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (entries) {
        for (var pn = remain[0], negate = !!this.minimatch.negate, rawGlob = pn._glob, dotOk = this.dot || rawGlob.charAt(0) === ".", matchedEntries = [], i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (e.charAt(0) !== "." || dotOk) {
            var m;
            negate && !prefix ? m = !e.match(pn) : m = e.match(pn), m && matchedEntries.push(e);
          }
        }
        var len = matchedEntries.length;
        if (len !== 0) {
          if (remain.length === 1 && !this.mark && !this.stat) {
            this.matches[index] || (this.matches[index] = /* @__PURE__ */ Object.create(null));
            for (var i = 0; i < len; i++) {
              var e = matchedEntries[i];
              prefix && (prefix.slice(-1) !== "/" ? e = prefix + "/" + e : e = prefix + e), e.charAt(0) === "/" && !this.nomount && (e = path.join(this.root, e)), this._emitMatch(index, e);
            }
            return;
          }
          remain.shift();
          for (var i = 0; i < len; i++) {
            var e = matchedEntries[i], newPattern;
            prefix ? newPattern = [prefix, e] : newPattern = [e], this._process(newPattern.concat(remain), index, inGlobStar);
          }
        }
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (!isIgnored(this, e)) {
        var abs = this._makeAbs(e);
        if (this.mark && (e = this._mark(e)), this.absolute && (e = abs), !this.matches[index][e]) {
          if (this.nodir) {
            var c = this.cache[abs];
            if (c === "DIR" || Array.isArray(c))
              return;
          }
          this.matches[index][e] = !0, this.stat && this._stat(e);
        }
      }
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, !1);
      var entries, lstat, stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT")
          return null;
      }
      var isSym = lstat && lstat.isSymbolicLink();
      return this.symlinks[abs] = isSym, !isSym && lstat && !lstat.isDirectory() ? this.cache[abs] = "FILE" : entries = this._readdir(abs, !1), entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        return this._readdirError(abs, er), null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat)
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          abs === "/" ? e = abs + e : e = abs + "/" + e, this.cache[e] = !0;
        }
      return this.cache[abs] = entries, entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        // https://github.com/isaacs/node-glob/issues/205
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          if (this.cache[abs] = "FILE", abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            throw error.path = this.cwd, error.code = er.code, error;
          }
          break;
        case "ENOENT":
        // not terribly unusual
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = !1;
          break;
        default:
          if (this.cache[this._makeAbs(f)] = !1, this.strict)
            throw er;
          this.silent || console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (entries) {
        var remainWithoutGlobStar = remain.slice(1), gspref = prefix ? [prefix] : [], noGlobStar = gspref.concat(remainWithoutGlobStar);
        this._process(noGlobStar, index, !1);
        var len = entries.length, isSym = this.symlinks[abs];
        if (!(isSym && inGlobStar))
          for (var i = 0; i < len; i++) {
            var e = entries[i];
            if (!(e.charAt(0) === "." && !this.dot)) {
              var instead = gspref.concat(entries[i], remainWithoutGlobStar);
              this._process(instead, index, !0);
              var below = gspref.concat(entries[i], remain);
              this._process(below, index, !0);
            }
          }
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (this.matches[index] || (this.matches[index] = /* @__PURE__ */ Object.create(null)), !!exists) {
        if (prefix && isAbsolute(prefix) && !this.nomount) {
          var trail = /[\/\\]$/.test(prefix);
          prefix.charAt(0) === "/" ? prefix = path.join(this.root, prefix) : (prefix = path.resolve(this.root, prefix), trail && (prefix += "/"));
        }
        process.platform === "win32" && (prefix = prefix.replace(/\\/g, "/")), this._emitMatch(index, prefix);
      }
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f), needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return !1;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c) && (c = "DIR"), !needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return !1;
      }
      var exists, stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR"))
            return this.statCache[abs] = !1, !1;
        }
        if (lstat && lstat.isSymbolicLink())
          try {
            stat = this.fs.statSync(abs);
          } catch {
            stat = lstat;
          }
        else
          stat = lstat;
      }
      this.statCache[abs] = stat;
      var c = !0;
      return stat && (c = stat.isDirectory() ? "DIR" : "FILE"), this.cache[abs] = this.cache[abs] || c, needDir && c === "FILE" ? !1 : c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// ../../node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "../../node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js"(exports, module) {
    init_cjs_shims();
    var wrappy = require_wrappy(), reqs = /* @__PURE__ */ Object.create(null), once = require_once();
    module.exports = wrappy(inflight);
    function inflight(key, cb) {
      return reqs[key] ? (reqs[key].push(cb), null) : (reqs[key] = [cb], makeres(key));
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key], len = cbs.length, args = slice(arguments);
        try {
          for (var i = 0; i < len; i++)
            cbs[i].apply(null, args);
        } finally {
          cbs.length > len ? (cbs.splice(0, len), process.nextTick(function() {
            RES.apply(null, args);
          })) : delete reqs[key];
        }
      });
    }
    function slice(args) {
      for (var length = args.length, array = [], i = 0; i < length; i++) array[i] = args[i];
      return array;
    }
  }
});

// ../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js
var require_glob = __commonJS({
  "../../node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js"(exports, module) {
    init_cjs_shims();
    module.exports = glob;
    var rp = require_fs(), minimatch = require_minimatch(), Minimatch = minimatch.Minimatch, inherits = require_inherits(), EE = __require("events").EventEmitter, path = __require("path"), assert = __require("assert"), isAbsolute = require_path_is_absolute(), globSync = require_sync(), common = require_common(), setopts = common.setopts, ownProp = common.ownProp, inflight = require_inflight(), util = __require("util"), childrenIgnored = common.childrenIgnored, isIgnored = common.isIgnored, once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options == "function" && (cb = options, options = {}), options || (options = {}), options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add != "object")
        return origin;
      for (var keys = Object.keys(add), i = keys.length; i--; )
        origin[keys[i]] = add[keys[i]];
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = !0;
      var g = new Glob(pattern, options), set = g.minimatch.set;
      if (!pattern)
        return !1;
      if (set.length > 1)
        return !0;
      for (var j = 0; j < set[0].length; j++)
        if (typeof set[0][j] != "string")
          return !0;
      return !1;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options == "function" && (cb = options, options = null), options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options), this._didRealPath = !1;
      var n = this.minimatch.set.length;
      this.matches = new Array(n), typeof cb == "function" && (cb = once(cb), this.on("error", cb), this.on("end", function(matches) {
        cb(null, matches);
      }));
      var self = this;
      if (this._processing = 0, this._emitQueue = [], this._processQueue = [], this.paused = !1, this.noprocess)
        return this;
      if (n === 0)
        return done();
      for (var sync = !0, i = 0; i < n; i++)
        this._process(this.minimatch.set[i], i, !1, done);
      sync = !1;
      function done() {
        --self._processing, self._processing <= 0 && (sync ? process.nextTick(function() {
          self._finish();
        }) : self._finish());
      }
    }
    Glob.prototype._finish = function() {
      if (assert(this instanceof Glob), !this.aborted) {
        if (this.realpath && !this._didRealpath)
          return this._realpath();
        common.finish(this), this.emit("end", this.found);
      }
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = !0;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      for (var self = this, i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        --n === 0 && self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset), self = this, n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p), rp.realpath(p, self.realpathCache, function(er, real) {
          er ? er.syscall === "stat" ? set[p] = !0 : self.emit("error", er) : set[real] = !0, --n === 0 && (self.matches[index] = set, cb());
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = !0, this.emit("abort");
    };
    Glob.prototype.pause = function() {
      this.paused || (this.paused = !0, this.emit("pause"));
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        if (this.emit("resume"), this.paused = !1, this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--, this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      if (assert(this instanceof Glob), assert(typeof cb == "function"), !this.aborted) {
        if (this._processing++, this.paused) {
          this._processQueue.push([pattern, index, inGlobStar, cb]);
          return;
        }
        for (var n = 0; typeof pattern[n] == "string"; )
          n++;
        var prefix;
        switch (n) {
          // if not, then this is rather simple
          case pattern.length:
            this._processSimple(pattern.join("/"), index, cb);
            return;
          case 0:
            prefix = null;
            break;
          default:
            prefix = pattern.slice(0, n).join("/");
            break;
        }
        var remain = pattern.slice(n), read;
        prefix === null ? read = "." : ((isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
          return typeof p == "string" ? p : "[*]";
        }).join("/"))) && (!prefix || !isAbsolute(prefix)) && (prefix = "/" + prefix), read = prefix);
        var abs = this._makeAbs(read);
        if (childrenIgnored(this, read))
          return cb();
        var isGlobStar = remain[0] === minimatch.GLOBSTAR;
        isGlobStar ? this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb) : this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
      }
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      for (var pn = remain[0], negate = !!this.minimatch.negate, rawGlob = pn._glob, dotOk = this.dot || rawGlob.charAt(0) === ".", matchedEntries = [], i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          negate && !prefix ? m = !e.match(pn) : m = e.match(pn), m && matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        this.matches[index] || (this.matches[index] = /* @__PURE__ */ Object.create(null));
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          prefix && (prefix !== "/" ? e = prefix + "/" + e : e = prefix + e), e.charAt(0) === "/" && !this.nomount && (e = path.join(this.root, e)), this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i], newPattern;
        prefix && (prefix !== "/" ? e = prefix + "/" + e : e = prefix + e), this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (!this.aborted && !isIgnored(this, e)) {
        if (this.paused) {
          this._emitQueue.push([index, e]);
          return;
        }
        var abs = isAbsolute(e) ? e : this._makeAbs(e);
        if (this.mark && (e = this._mark(e)), this.absolute && (e = abs), !this.matches[index][e]) {
          if (this.nodir) {
            var c = this.cache[abs];
            if (c === "DIR" || Array.isArray(c))
              return;
          }
          this.matches[index][e] = !0;
          var st = this.statCache[abs];
          st && this.emit("stat", e, st), this.emit("match", e);
        }
      }
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, !1, cb);
      var lstatkey = "lstat\0" + abs, self = this, lstatcb = inflight(lstatkey, lstatcb_);
      lstatcb && self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym, !isSym && lstat && !lstat.isDirectory() ? (self.cache[abs] = "FILE", cb()) : self._readdir(abs, !1, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (!this.aborted && (cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb), !!cb)) {
        if (inGlobStar && !ownProp(this.symlinks, abs))
          return this._readdirInGlobStar(abs, cb);
        if (ownProp(this.cache, abs)) {
          var c = this.cache[abs];
          if (!c || c === "FILE")
            return cb();
          if (Array.isArray(c))
            return cb(null, c);
        }
        var self = this;
        self.fs.readdir(abs, readdirCb(this, abs, cb));
      }
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        er ? self._readdirError(abs, er, cb) : self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (!this.aborted) {
        if (!this.mark && !this.stat)
          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            abs === "/" ? e = abs + e : e = abs + "/" + e, this.cache[e] = !0;
          }
        return this.cache[abs] = entries, cb(null, entries);
      }
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (!this.aborted) {
        switch (er.code) {
          case "ENOTSUP":
          // https://github.com/isaacs/node-glob/issues/205
          case "ENOTDIR":
            var abs = this._makeAbs(f);
            if (this.cache[abs] = "FILE", abs === this.cwdAbs) {
              var error = new Error(er.code + " invalid cwd " + this.cwd);
              error.path = this.cwd, error.code = er.code, this.emit("error", error), this.abort();
            }
            break;
          case "ENOENT":
          // not terribly unusual
          case "ELOOP":
          case "ENAMETOOLONG":
          case "UNKNOWN":
            this.cache[this._makeAbs(f)] = !1;
            break;
          default:
            this.cache[this._makeAbs(f)] = !1, this.strict && (this.emit("error", er), this.abort()), this.silent || console.error("glob error", er);
            break;
        }
        return cb();
      }
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1), gspref = prefix ? [prefix] : [], noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, !1, cb);
      var isSym = this.symlinks[abs], len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (!(e.charAt(0) === "." && !this.dot)) {
          var instead = gspref.concat(entries[i], remainWithoutGlobStar);
          this._process(instead, index, !0, cb);
          var below = gspref.concat(entries[i], remain);
          this._process(below, index, !0, cb);
        }
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (this.matches[index] || (this.matches[index] = /* @__PURE__ */ Object.create(null)), !exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        prefix.charAt(0) === "/" ? prefix = path.join(this.root, prefix) : (prefix = path.resolve(this.root, prefix), trail && (prefix += "/"));
      }
      process.platform === "win32" && (prefix = prefix.replace(/\\/g, "/")), this._emitMatch(index, prefix), cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f), needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c) && (c = "DIR"), !needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists, stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === !1)
          return cb(null, stat);
        var type = stat.isDirectory() ? "DIR" : "FILE";
        return needDir && type === "FILE" ? cb() : cb(null, type, stat);
      }
      var self = this, statcb = inflight("stat\0" + abs, lstatcb_);
      statcb && self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink())
          return self.fs.stat(abs, function(er2, stat2) {
            er2 ? self._stat2(f, abs, null, lstat, cb) : self._stat2(f, abs, er2, stat2, cb);
          });
        self._stat2(f, abs, er, lstat, cb);
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR"))
        return this.statCache[abs] = !1, cb();
      var needDir = f.slice(-1) === "/";
      if (this.statCache[abs] = stat, abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, !1, stat);
      var c = !0;
      return stat && (c = stat.isDirectory() ? "DIR" : "FILE"), this.cache[abs] = this.cache[abs] || c, needDir && c === "FILE" ? cb() : cb(null, c, stat);
    };
  }
});

export {
  require_fs,
  require_inherits,
  require_inflight,
  require_glob
};
//# sourceMappingURL=chunk-IG5SOACB.js.map
