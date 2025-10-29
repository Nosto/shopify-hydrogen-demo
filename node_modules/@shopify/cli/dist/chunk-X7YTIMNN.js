import {
  __commonJS,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "../../node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports, module) {
    init_cjs_shims();
    module.exports = function(path, stripTrailing) {
      if (typeof path != "string")
        throw new TypeError("expected path to be a string");
      if (path === "\\" || path === "/") return "/";
      var len = path.length;
      if (len <= 1) return path;
      var prefix = "";
      if (len > 4 && path[3] === "\\") {
        var ch = path[2];
        (ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\" && (path = path.slice(2), prefix = "//");
      }
      var segs = path.split(/[/\\]+/);
      return stripTrailing !== !1 && segs[segs.length - 1] === "" && segs.pop(), prefix + segs.join("/");
    };
  }
});

export {
  require_normalize_path
};
/*! Bundled license information:

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=chunk-X7YTIMNN.js.map
