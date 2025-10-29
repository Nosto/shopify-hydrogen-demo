import {
  __commonJS,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js
var require_indent_string = __commonJS({
  "../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = (string, count = 1, options) => {
      if (options = {
        indent: " ",
        includeEmptyLines: !1,
        ...options
      }, typeof string != "string")
        throw new TypeError(
          `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
        );
      if (typeof count != "number")
        throw new TypeError(
          `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
        );
      if (typeof options.indent != "string")
        throw new TypeError(
          `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
        );
      if (count === 0)
        return string;
      let regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
      return string.replace(regex, options.indent.repeat(count));
    };
  }
});

export {
  require_indent_string
};
//# sourceMappingURL=chunk-UV5N2VL7.js.map
