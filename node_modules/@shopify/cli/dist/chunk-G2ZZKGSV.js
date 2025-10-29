import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js
var require_is_docker = __commonJS({
  "../../node_modules/.pnpm/is-docker@2.2.1/node_modules/is-docker/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var fs = __require("fs"), isDocker;
    function hasDockerEnv() {
      try {
        return fs.statSync("/.dockerenv"), !0;
      } catch {
        return !1;
      }
    }
    function hasDockerCGroup() {
      try {
        return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
      } catch {
        return !1;
      }
    }
    module.exports = () => (isDocker === void 0 && (isDocker = hasDockerEnv() || hasDockerCGroup()), isDocker);
  }
});

// ../../node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js
var require_is_wsl = __commonJS({
  "../../node_modules/.pnpm/is-wsl@2.2.0/node_modules/is-wsl/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var os = __require("os"), fs = __require("fs"), isDocker = require_is_docker(), isWsl = () => {
      if (process.platform !== "linux")
        return !1;
      if (os.release().toLowerCase().includes("microsoft"))
        return !isDocker();
      try {
        return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : !1;
      } catch {
        return !1;
      }
    };
    process.env.__IS_WSL_TEST__ ? module.exports = isWsl : module.exports = isWsl();
  }
});

export {
  require_is_docker,
  require_is_wsl
};
//# sourceMappingURL=chunk-G2ZZKGSV.js.map
