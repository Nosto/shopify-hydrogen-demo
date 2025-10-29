import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    init_cjs_shims();
    var s = 1e3, m = s * 60, h = m * 60, d = h * 24, w = d * 7, y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0)
        return parse(val);
      if (type === "number" && isFinite(val))
        return options.long ? fmtLong(val) : fmtShort(val);
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      if (str = String(str), !(str.length > 100)) {
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (match) {
          var n = parseFloat(match[1]), type = (match[2] || "ms").toLowerCase();
          switch (type) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * y;
            case "weeks":
            case "week":
            case "w":
              return n * w;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * s;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return;
          }
        }
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      return msAbs >= d ? Math.round(ms / d) + "d" : msAbs >= h ? Math.round(ms / h) + "h" : msAbs >= m ? Math.round(ms / m) + "m" : msAbs >= s ? Math.round(ms / s) + "s" : ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      return msAbs >= d ? plural(ms, msAbs, d, "day") : msAbs >= h ? plural(ms, msAbs, h, "hour") : msAbs >= m ? plural(ms, msAbs, m, "minute") : msAbs >= s ? plural(ms, msAbs, s, "second") : ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/common.js"(exports, module) {
    init_cjs_shims();
    function setup(env) {
      createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = coerce, createDebug.disable = disable, createDebug.enable = enable, createDebug.enabled = enabled, createDebug.humanize = require_ms(), createDebug.destroy = destroy, Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      }), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++)
          hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime, enableOverride = null, namespacesCache, enabledCache;
        function debug(...args) {
          if (!debug.enabled)
            return;
          let self = debug, curr = Number(/* @__PURE__ */ new Date()), ms = curr - (prevTime || curr);
          self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), typeof args[0] != "string" && args.unshift("%O");
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%")
              return "%";
            index++;
            let formatter = createDebug.formatters[format];
            if (typeof formatter == "function") {
              let val = args[index];
              match = formatter.call(self, val), args.splice(index, 1), index--;
            }
            return match;
          }), createDebug.formatArgs.call(self, args), (self.log || createDebug.log).apply(self, args);
        }
        return debug.namespace = namespace, debug.useColors = createDebug.useColors(), debug.color = createDebug.selectColor(namespace), debug.extend = extend, debug.destroy = createDebug.destroy, Object.defineProperty(debug, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () => enableOverride !== null ? enableOverride : (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, enabledCache = createDebug.enabled(namespace)), enabledCache),
          set: (v) => {
            enableOverride = v;
          }
        }), typeof createDebug.init == "function" && createDebug.init(debug), debug;
      }
      function extend(namespace, delimiter) {
        let newDebug = createDebug(this.namespace + (typeof delimiter > "u" ? ":" : delimiter) + namespace);
        return newDebug.log = this.log, newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], createDebug.skips = [];
        let split = (typeof namespaces == "string" ? namespaces : "").trim().replace(" ", ",").split(",").filter(Boolean);
        for (let ns of split)
          ns[0] === "-" ? createDebug.skips.push(ns.slice(1)) : createDebug.names.push(ns);
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0, templateIndex = 0, starIndex = -1, matchIndex = 0;
        for (; searchIndex < search.length; )
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*"))
            template[templateIndex] === "*" ? (starIndex = templateIndex, matchIndex = searchIndex, templateIndex++) : (searchIndex++, templateIndex++);
          else if (starIndex !== -1)
            templateIndex = starIndex + 1, matchIndex++, searchIndex = matchIndex;
          else
            return !1;
        for (; templateIndex < template.length && template[templateIndex] === "*"; )
          templateIndex++;
        return templateIndex === template.length;
      }
      function disable() {
        let namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        return createDebug.enable(""), namespaces;
      }
      function enabled(name) {
        for (let skip of createDebug.skips)
          if (matchesTemplate(name, skip))
            return !1;
        for (let ns of createDebug.names)
          if (matchesTemplate(name, ns))
            return !0;
        return !1;
      }
      function coerce(val) {
        return val instanceof Error ? val.stack || val.message : val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      return createDebug.enable(createDebug.load()), createDebug;
    }
    module.exports = setup;
  }
});

// ../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/browser.js"(exports, module) {
    init_cjs_shims();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = !1;
      return () => {
        warned || (warned = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let m;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), !this.useColors)
        return;
      let c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0, lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        match !== "%%" && (index++, match === "%c" && (lastC = index));
      }), args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
      } catch {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = (flag, argv = process.argv) => {
      let prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--", position = argv.indexOf(prefix + flag), terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/.pnpm/supports-color@8.1.1/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var os = __require("os"), tty = __require("tty"), hasFlag = require_has_flag(), { env } = process, flagForceColor;
    hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? flagForceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (flagForceColor = 1);
    function envForceColor() {
      if ("FORCE_COLOR" in env)
        return env.FORCE_COLOR === "true" ? 1 : env.FORCE_COLOR === "false" ? 0 : env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
    }
    function translateLevel(level) {
      return level === 0 ? !1 : {
        level,
        hasBasic: !0,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, { streamIsTTY, sniffFlags = !0 } = {}) {
      let noFlagForceColor = envForceColor();
      noFlagForceColor !== void 0 && (flagForceColor = noFlagForceColor);
      let forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
      if (forceColor === 0)
        return 0;
      if (sniffFlags) {
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor"))
          return 3;
        if (hasFlag("color=256"))
          return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0)
        return 0;
      let min = forceColor || 0;
      if (env.TERM === "dumb")
        return min;
      if (process.platform === "win32") {
        let osRelease = os.release().split(".");
        return Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
      }
      if ("CI" in env)
        return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship" ? 1 : min;
      if ("TEAMCITY_VERSION" in env)
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      if (env.COLORTERM === "truecolor")
        return 3;
      if ("TERM_PROGRAM" in env) {
        let version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
    }
    function getSupportLevel(stream, options = {}) {
      let level = supportsColor(stream, {
        streamIsTTY: stream && stream.isTTY,
        ...options
      });
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel({ isTTY: tty.isatty(1) }),
      stderr: getSupportLevel({ isTTY: tty.isatty(2) })
    };
  }
});

// ../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/node.js"(exports, module) {
    init_cjs_shims();
    var tty = __require("tty"), util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      let supportsColor = require_supports_color();
      supportsColor && (supportsColor.stderr || supportsColor).level >= 2 && (exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => /^debug_/i.test(key)).reduce((obj, key) => {
      let prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => k.toUpperCase()), val = process.env[key];
      return /^(yes|on|true|enabled)$/i.test(val) ? val = !0 : /^(no|off|false|disabled)$/i.test(val) ? val = !1 : val === "null" ? val = null : val = Number(val), obj[prop] = val, obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? !!exports.inspectOpts.colors : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      let { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        let c = this.color, colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c), prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split(`
`).join(`
` + prefix), args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else
        args[0] = getDate() + name + " " + args[0];
    }
    function getDate() {
      return exports.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + `
`);
    }
    function save(namespaces) {
      namespaces ? process.env.DEBUG = namespaces : delete process.env.DEBUG;
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      let keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++)
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).split(`
`).map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
    };
  }
});

// ../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.0_supports-color@8.1.1/node_modules/debug/src/index.js"(exports, module) {
    init_cjs_shims();
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? module.exports = require_browser() : module.exports = require_node();
  }
});

export {
  require_has_flag,
  require_ms,
  require_supports_color,
  require_src
};
//# sourceMappingURL=chunk-UMUTXITN.js.map
