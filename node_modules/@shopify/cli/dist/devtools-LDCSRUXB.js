import {
  wrapper_default
} from "./chunk-3GXB4ZRP.js";
import {
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/ink@4.4.1_@types+react@17.0.2_react@18.3.1/node_modules/ink/build/devtools.js
init_cjs_shims();

// ../../node_modules/.pnpm/ink@4.4.1_@types+react@17.0.2_react@18.3.1/node_modules/ink/build/devtools-window-polyfill.js
init_cjs_shims();
var customGlobal = global;
customGlobal.WebSocket || (customGlobal.WebSocket = wrapper_default);
customGlobal.window || (customGlobal.window = global);
customGlobal.self || (customGlobal.self = global);
customGlobal.window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ = [
  {
    // ComponentFilterElementType
    type: 1,
    // ElementTypeHostComponent
    value: 7,
    isEnabled: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalApp",
    isEnabled: !0,
    isValid: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalAppContext",
    isEnabled: !0,
    isValid: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalStdoutContext",
    isEnabled: !0,
    isValid: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalStderrContext",
    isEnabled: !0,
    isValid: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalStdinContext",
    isEnabled: !0,
    isValid: !0
  },
  {
    // ComponentFilterDisplayName
    type: 2,
    value: "InternalFocusContext",
    isEnabled: !0,
    isValid: !0
  }
];

// ../../node_modules/.pnpm/ink@4.4.1_@types+react@17.0.2_react@18.3.1/node_modules/ink/build/devtools.js
import devtools from "react-devtools-core";
devtools.connectToDevTools();
//# sourceMappingURL=devtools-LDCSRUXB.js.map
