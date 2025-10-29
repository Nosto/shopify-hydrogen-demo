import {
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/is-wsl@3.1.0/node_modules/is-wsl/index.js
init_cjs_shims();
import process from "node:process";
import os from "node:os";
import fs3 from "node:fs";

// ../../node_modules/.pnpm/is-inside-container@1.0.0/node_modules/is-inside-container/index.js
init_cjs_shims();
import fs2 from "node:fs";

// ../../node_modules/.pnpm/is-docker@3.0.0/node_modules/is-docker/index.js
init_cjs_shims();
import fs from "node:fs";
var isDockerCached;
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
function isDocker() {
  return isDockerCached === void 0 && (isDockerCached = hasDockerEnv() || hasDockerCGroup()), isDockerCached;
}

// ../../node_modules/.pnpm/is-inside-container@1.0.0/node_modules/is-inside-container/index.js
var cachedResult, hasContainerEnv = () => {
  try {
    return fs2.statSync("/run/.containerenv"), !0;
  } catch {
    return !1;
  }
};
function isInsideContainer() {
  return cachedResult === void 0 && (cachedResult = hasContainerEnv() || isDocker()), cachedResult;
}

// ../../node_modules/.pnpm/is-wsl@3.1.0/node_modules/is-wsl/index.js
var isWsl = () => {
  if (process.platform !== "linux")
    return !1;
  if (os.release().toLowerCase().includes("microsoft"))
    return !isInsideContainer();
  try {
    return fs3.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isInsideContainer() : !1;
  } catch {
    return !1;
  }
}, is_wsl_default = process.env.__IS_WSL_TEST__ ? isWsl : isWsl();
export {
  is_wsl_default as default
};
//# sourceMappingURL=is-wsl-YAJ3DFN7.js.map
