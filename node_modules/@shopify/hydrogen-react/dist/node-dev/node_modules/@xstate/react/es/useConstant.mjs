import * as React from "react";
function useConstant(fn) {
  var ref = React.useRef();
  if (!ref.current) {
    ref.current = { v: fn() };
  }
  return ref.current.v;
}
export {
  useConstant as default
};
//# sourceMappingURL=useConstant.mjs.map
