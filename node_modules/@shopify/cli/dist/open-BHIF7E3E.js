import {
  require_is_docker,
  require_is_wsl
} from "./chunk-G2ZZKGSV.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/define-lazy-prop@2.0.0/node_modules/define-lazy-prop/index.js
var require_define_lazy_prop = __commonJS({
  "../../node_modules/.pnpm/define-lazy-prop@2.0.0/node_modules/define-lazy-prop/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = (object, propertyName, fn) => {
      let define = (value) => Object.defineProperty(object, propertyName, { value, enumerable: !0, writable: !0 });
      return Object.defineProperty(object, propertyName, {
        configurable: !0,
        enumerable: !0,
        get() {
          let result = fn();
          return define(result), result;
        },
        set(value) {
          define(value);
        }
      }), object;
    };
  }
});

// ../../node_modules/.pnpm/open@8.4.2/node_modules/open/index.js
var require_open = __commonJS({
  "../../node_modules/.pnpm/open@8.4.2/node_modules/open/index.js"(exports, module) {
    init_cjs_shims();
    var path = __require("path"), childProcess = __require("child_process"), { promises: fs, constants: fsConstants } = __require("fs"), isWsl = require_is_wsl(), isDocker = require_is_docker(), defineLazyProperty = require_define_lazy_prop(), localXdgOpenPath = path.join(__dirname, "xdg-open"), { platform, arch } = process, hasContainerEnv = () => {
      try {
        return fs.statSync("/run/.containerenv"), !0;
      } catch {
        return !1;
      }
    }, cachedResult;
    function isInsideContainer() {
      return cachedResult === void 0 && (cachedResult = hasContainerEnv() || isDocker()), cachedResult;
    }
    var getWslDrivesMountPoint = /* @__PURE__ */ (() => {
      let defaultMountPoint = "/mnt/", mountPoint;
      return async function() {
        if (mountPoint)
          return mountPoint;
        let configFilePath = "/etc/wsl.conf", isConfigFileExists = !1;
        try {
          await fs.access(configFilePath, fsConstants.F_OK), isConfigFileExists = !0;
        } catch {
        }
        if (!isConfigFileExists)
          return defaultMountPoint;
        let configContent = await fs.readFile(configFilePath, { encoding: "utf8" }), configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);
        return configMountPoint ? (mountPoint = configMountPoint.groups.mountPoint.trim(), mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`, mountPoint) : defaultMountPoint;
      };
    })(), pTryEach = async (array, mapper) => {
      let latestError;
      for (let item of array)
        try {
          return await mapper(item);
        } catch (error) {
          latestError = error;
        }
      throw latestError;
    }, baseOpen = async (options) => {
      if (options = {
        wait: !1,
        background: !1,
        newInstance: !1,
        allowNonzeroExitCode: !1,
        ...options
      }, Array.isArray(options.app))
        return pTryEach(options.app, (singleApp) => baseOpen({
          ...options,
          app: singleApp
        }));
      let { name: app, arguments: appArguments = [] } = options.app || {};
      if (appArguments = [...appArguments], Array.isArray(app))
        return pTryEach(app, (appName) => baseOpen({
          ...options,
          app: {
            name: appName,
            arguments: appArguments
          }
        }));
      let command, cliArguments = [], childProcessOptions = {};
      if (platform === "darwin")
        command = "open", options.wait && cliArguments.push("--wait-apps"), options.background && cliArguments.push("--background"), options.newInstance && cliArguments.push("--new"), app && cliArguments.push("-a", app);
      else if (platform === "win32" || isWsl && !isInsideContainer() && !app) {
        let mountPoint = await getWslDrivesMountPoint();
        command = isWsl ? `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`, cliArguments.push(
          "-NoProfile",
          "-NonInteractive",
          "\u2013ExecutionPolicy",
          "Bypass",
          "-EncodedCommand"
        ), isWsl || (childProcessOptions.windowsVerbatimArguments = !0);
        let encodedArguments = ["Start"];
        options.wait && encodedArguments.push("-Wait"), app ? (encodedArguments.push(`"\`"${app}\`""`, "-ArgumentList"), options.target && appArguments.unshift(options.target)) : options.target && encodedArguments.push(`"${options.target}"`), appArguments.length > 0 && (appArguments = appArguments.map((arg) => `"\`"${arg}\`""`), encodedArguments.push(appArguments.join(","))), options.target = Buffer.from(encodedArguments.join(" "), "utf16le").toString("base64");
      } else {
        if (app)
          command = app;
        else {
          let isBundled = !__dirname || __dirname === "/", exeLocalXdgOpen = !1;
          try {
            await fs.access(localXdgOpenPath, fsConstants.X_OK), exeLocalXdgOpen = !0;
          } catch {
          }
          command = process.versions.electron || platform === "android" || isBundled || !exeLocalXdgOpen ? "xdg-open" : localXdgOpenPath;
        }
        appArguments.length > 0 && cliArguments.push(...appArguments), options.wait || (childProcessOptions.stdio = "ignore", childProcessOptions.detached = !0);
      }
      options.target && cliArguments.push(options.target), platform === "darwin" && appArguments.length > 0 && cliArguments.push("--args", ...appArguments);
      let subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
      return options.wait ? new Promise((resolve, reject) => {
        subprocess.once("error", reject), subprocess.once("close", (exitCode) => {
          if (!options.allowNonzeroExitCode && exitCode > 0) {
            reject(new Error(`Exited with code ${exitCode}`));
            return;
          }
          resolve(subprocess);
        });
      }) : (subprocess.unref(), subprocess);
    }, open = (target, options) => {
      if (typeof target != "string")
        throw new TypeError("Expected a `target`");
      return baseOpen({
        ...options,
        target
      });
    }, openApp = (name, options) => {
      if (typeof name != "string")
        throw new TypeError("Expected a `name`");
      let { arguments: appArguments = [] } = options || {};
      if (appArguments != null && !Array.isArray(appArguments))
        throw new TypeError("Expected `appArguments` as Array type");
      return baseOpen({
        ...options,
        app: {
          name,
          arguments: appArguments
        }
      });
    };
    function detectArchBinary(binary) {
      if (typeof binary == "string" || Array.isArray(binary))
        return binary;
      let { [arch]: archBinary } = binary;
      if (!archBinary)
        throw new Error(`${arch} is not supported`);
      return archBinary;
    }
    function detectPlatformBinary({ [platform]: platformBinary }, { wsl }) {
      if (wsl && isWsl)
        return detectArchBinary(wsl);
      if (!platformBinary)
        throw new Error(`${platform} is not supported`);
      return detectArchBinary(platformBinary);
    }
    var apps = {};
    defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
      darwin: "google chrome",
      win32: "chrome",
      linux: ["google-chrome", "google-chrome-stable", "chromium"]
    }, {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
      }
    }));
    defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
      darwin: "firefox",
      win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      linux: "firefox"
    }, {
      wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
    }));
    defineLazyProperty(apps, "edge", () => detectPlatformBinary({
      darwin: "microsoft edge",
      win32: "msedge",
      linux: ["microsoft-edge", "microsoft-edge-dev"]
    }, {
      wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    }));
    open.apps = apps;
    open.openApp = openApp;
    module.exports = open;
  }
});
export default require_open();
//# sourceMappingURL=open-BHIF7E3E.js.map
