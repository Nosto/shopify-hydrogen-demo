import {
  __commonJS,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "../../node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = balanced;
    function balanced(a, b, str) {
      a instanceof RegExp && (a = maybeMatch(a, str)), b instanceof RegExp && (b = maybeMatch(b, str));
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result, ai = str.indexOf(a), bi = str.indexOf(b, ai + 1), i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b)
          return [ai, bi];
        for (begs = [], left = str.length; i >= 0 && !result; )
          i == ai ? (begs.push(i), ai = str.indexOf(a, i + 1)) : begs.length == 1 ? result = [begs.pop(), bi] : (beg = begs.pop(), beg < left && (left = beg, right = bi), bi = str.indexOf(b, i + 1)), i = ai < bi && ai >= 0 ? ai : bi;
        begs.length && (result = [left, right]);
      }
      return result;
    }
  }
});

export {
  require_balanced_match
};
//# sourceMappingURL=chunk-XE5EOEBL.js.map
