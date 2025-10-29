import {
  __commonJS,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports, module) {
    init_cjs_shims();
    module.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn != "function")
        throw new TypeError("need wrapper function");
      return Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      }), wrapper;
      function wrapper() {
        for (var args = new Array(arguments.length), i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var ret = fn.apply(this, args), cb2 = args[args.length - 1];
        return typeof ret == "function" && ret !== cb2 && Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        }), ret;
      }
    }
  }
});

// ../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports, module) {
    init_cjs_shims();
    var wrappy = require_wrappy();
    module.exports = wrappy(once);
    module.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: !0
      }), Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: !0
      });
    });
    function once(fn) {
      var f = function() {
        return f.called ? f.value : (f.called = !0, f.value = fn.apply(this, arguments));
      };
      return f.called = !1, f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        return f.called = !0, f.value = fn.apply(this, arguments);
      }, name = fn.name || "Function wrapped with `once`";
      return f.onceError = name + " shouldn't be called more than once", f.called = !1, f;
    }
  }
});

export {
  require_wrappy,
  require_once
};
//# sourceMappingURL=chunk-SHWOPMLQ.js.map
