import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/posix.js
var require_posix = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/posix.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs"), promises_1 = __require("fs/promises"), isexe = async (path, options = {}) => {
      let { ignoreErrors = !1 } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path), options);
      } catch (e) {
        let er = e;
        if (ignoreErrors || er.code === "EACCES")
          return !1;
        throw er;
      }
    };
    exports.isexe = isexe;
    var sync = (path, options = {}) => {
      let { ignoreErrors = !1 } = options;
      try {
        return checkStat((0, fs_1.statSync)(path), options);
      } catch (e) {
        let er = e;
        if (ignoreErrors || er.code === "EACCES")
          return !1;
        throw er;
      }
    };
    exports.sync = sync;
    var checkStat = (stat, options) => stat.isFile() && checkMode(stat, options), checkMode = (stat, options) => {
      let myUid = options.uid ?? process.getuid?.(), myGroups = options.groups ?? process.getgroups?.() ?? [], myGid = options.gid ?? process.getgid?.() ?? myGroups[0];
      if (myUid === void 0 || myGid === void 0)
        throw new Error("cannot get uid or gid");
      let groups = /* @__PURE__ */ new Set([myGid, ...myGroups]), mod = stat.mode, uid = stat.uid, gid = stat.gid, u = parseInt("100", 8), g = parseInt("010", 8), o = parseInt("001", 8), ug = u | g;
      return !!(mod & o || mod & g && groups.has(gid) || mod & u && uid === myUid || mod & ug && myUid === 0);
    };
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/win32.js
var require_win32 = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/win32.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs"), promises_1 = __require("fs/promises"), isexe = async (path, options = {}) => {
      let { ignoreErrors = !1 } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path), path, options);
      } catch (e) {
        let er = e;
        if (ignoreErrors || er.code === "EACCES")
          return !1;
        throw er;
      }
    };
    exports.isexe = isexe;
    var sync = (path, options = {}) => {
      let { ignoreErrors = !1 } = options;
      try {
        return checkStat((0, fs_1.statSync)(path), path, options);
      } catch (e) {
        let er = e;
        if (ignoreErrors || er.code === "EACCES")
          return !1;
        throw er;
      }
    };
    exports.sync = sync;
    var checkPathExt = (path, options) => {
      let { pathExt = process.env.PATHEXT || "" } = options, peSplit = pathExt.split(";");
      if (peSplit.indexOf("") !== -1)
        return !0;
      for (let i = 0; i < peSplit.length; i++) {
        let p = peSplit[i].toLowerCase(), ext = path.substring(path.length - p.length).toLowerCase();
        if (p && ext === p)
          return !0;
      }
      return !1;
    }, checkStat = (stat, path, options) => stat.isFile() && checkPathExt(path, options);
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/options.js
var require_options = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/options.js"(exports) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports, "__esModule", { value: !0 });
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      k2 === void 0 && (k2 = k);
      var desc = Object.getOwnPropertyDescriptor(m, k);
      (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) && (desc = { enumerable: !0, get: function() {
        return m[k];
      } }), Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      k2 === void 0 && (k2 = k), o[k2] = m[k];
    }), __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: !0, value: v });
    } : function(o, v) {
      o.default = v;
    }), __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) k !== "default" && Object.prototype.hasOwnProperty.call(mod, k) && __createBinding(result, mod, k);
      return __setModuleDefault(result, mod), result;
    }, __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p) && __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.sync = exports.isexe = exports.posix = exports.win32 = void 0;
    var posix = __importStar(require_posix());
    exports.posix = posix;
    var win32 = __importStar(require_win32());
    exports.win32 = win32;
    __exportStar(require_options(), exports);
    var platform = process.env._ISEXE_TEST_PLATFORM_ || process.platform, impl = platform === "win32" ? win32 : posix;
    exports.isexe = impl.isexe;
    exports.sync = impl.sync;
  }
});

// ../../node_modules/.pnpm/which@4.0.0/node_modules/which/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/which@4.0.0/node_modules/which/lib/index.js"(exports, module) {
    init_cjs_shims();
    var { isexe, sync: isexeSync } = require_cjs(), { join, delimiter, sep, posix } = __require("path"), isWindows = process.platform === "win32", rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1")), rRel = new RegExp(`^\\.${rSlash.source}`), getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" }), getPathInfo = (cmd, {
      path: optPath = process.env.PATH,
      pathExt: optPathExt = process.env.PATHEXT,
      delimiter: optDelimiter = delimiter
    }) => {
      let pathEnv = cmd.match(rSlash) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(optPath || /* istanbul ignore next: very unusual */
        "").split(optDelimiter)
      ];
      if (isWindows) {
        let pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter), pathExt = pathExtExe.split(optDelimiter).flatMap((item) => [item, item.toLowerCase()]);
        return cmd.includes(".") && pathExt[0] !== "" && pathExt.unshift(""), { pathEnv, pathExt, pathExtExe };
      }
      return { pathEnv, pathExt: [""] };
    }, getPathPart = (raw, cmd) => {
      let pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
      return (!pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "") + join(pathPart, cmd);
    }, which = async (cmd, opt = {}) => {
      let { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt), found = [];
      for (let envPart of pathEnv) {
        let p = getPathPart(envPart, cmd);
        for (let ext of pathExt) {
          let withExt = p + ext;
          if (await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: !0 })) {
            if (!opt.all)
              return withExt;
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    }, whichSync = (cmd, opt = {}) => {
      let { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt), found = [];
      for (let pathEnvPart of pathEnv) {
        let p = getPathPart(pathEnvPart, cmd);
        for (let ext of pathExt) {
          let withExt = p + ext;
          if (isexeSync(withExt, { pathExt: pathExtExe, ignoreErrors: !0 })) {
            if (!opt.all)
              return withExt;
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module.exports = which;
    which.sync = whichSync;
  }
});

export {
  require_lib
};
//# sourceMappingURL=chunk-B5EXYCV3.js.map
