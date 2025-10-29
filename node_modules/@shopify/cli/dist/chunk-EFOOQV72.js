import {
  require_merge2,
  require_out
} from "./chunk-CTFDRWUN.js";
import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/slash@3.0.0/node_modules/slash/index.js
var require_slash = __commonJS({
  "../../node_modules/.pnpm/slash@3.0.0/node_modules/slash/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = (path) => {
      let isExtendedLengthPath = /^\\\\\?\\/.test(path), hasNonAscii = /[^\u0000-\u0080]+/.test(path);
      return isExtendedLengthPath || hasNonAscii ? path : path.replace(/\\/g, "/");
    };
  }
});

// ../../node_modules/.pnpm/array-union@2.1.0/node_modules/array-union/index.js
var require_array_union = __commonJS({
  "../../node_modules/.pnpm/array-union@2.1.0/node_modules/array-union/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = (...arguments_) => [...new Set([].concat(...arguments_))];
  }
});

// ../../node_modules/.pnpm/path-type@4.0.0/node_modules/path-type/index.js
var require_path_type = __commonJS({
  "../../node_modules/.pnpm/path-type@4.0.0/node_modules/path-type/index.js"(exports) {
    "use strict";
    init_cjs_shims();
    var { promisify } = __require("util"), fs = __require("fs");
    async function isType(fsStatType, statsMethodName, filePath) {
      if (typeof filePath != "string")
        throw new TypeError(`Expected a string, got ${typeof filePath}`);
      try {
        return (await promisify(fs[fsStatType])(filePath))[statsMethodName]();
      } catch (error) {
        if (error.code === "ENOENT")
          return !1;
        throw error;
      }
    }
    function isTypeSync(fsStatType, statsMethodName, filePath) {
      if (typeof filePath != "string")
        throw new TypeError(`Expected a string, got ${typeof filePath}`);
      try {
        return fs[fsStatType](filePath)[statsMethodName]();
      } catch (error) {
        if (error.code === "ENOENT")
          return !1;
        throw error;
      }
    }
    exports.isFile = isType.bind(null, "stat", "isFile");
    exports.isDirectory = isType.bind(null, "stat", "isDirectory");
    exports.isSymlink = isType.bind(null, "lstat", "isSymbolicLink");
    exports.isFileSync = isTypeSync.bind(null, "statSync", "isFile");
    exports.isDirectorySync = isTypeSync.bind(null, "statSync", "isDirectory");
    exports.isSymlinkSync = isTypeSync.bind(null, "lstatSync", "isSymbolicLink");
  }
});

// ../../node_modules/.pnpm/dir-glob@3.0.1/node_modules/dir-glob/index.js
var require_dir_glob = __commonJS({
  "../../node_modules/.pnpm/dir-glob@3.0.1/node_modules/dir-glob/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var path = __require("path"), pathType = require_path_type(), getExtensions = (extensions) => extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0], getPath = (filepath, cwd) => {
      let pth = filepath[0] === "!" ? filepath.slice(1) : filepath;
      return path.isAbsolute(pth) ? pth : path.join(cwd, pth);
    }, addExtensions = (file, extensions) => path.extname(file) ? `**/${file}` : `**/${file}.${getExtensions(extensions)}`, getGlob = (directory, options) => {
      if (options.files && !Array.isArray(options.files))
        throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof options.files}\``);
      if (options.extensions && !Array.isArray(options.extensions))
        throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof options.extensions}\``);
      return options.files && options.extensions ? options.files.map((x) => path.posix.join(directory, addExtensions(x, options.extensions))) : options.files ? options.files.map((x) => path.posix.join(directory, `**/${x}`)) : options.extensions ? [path.posix.join(directory, `**/*.${getExtensions(options.extensions)}`)] : [path.posix.join(directory, "**")];
    };
    module.exports = async (input, options) => {
      if (options = {
        cwd: process.cwd(),
        ...options
      }, typeof options.cwd != "string")
        throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
      let globs = await Promise.all([].concat(input).map(async (x) => await pathType.isDirectory(getPath(x, options.cwd)) ? getGlob(x, options) : x));
      return [].concat.apply([], globs);
    };
    module.exports.sync = (input, options) => {
      if (options = {
        cwd: process.cwd(),
        ...options
      }, typeof options.cwd != "string")
        throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
      let globs = [].concat(input).map((x) => pathType.isDirectorySync(getPath(x, options.cwd)) ? getGlob(x, options) : x);
      return [].concat.apply([], globs);
    };
  }
});

// ../../node_modules/.pnpm/ignore@5.3.2/node_modules/ignore/index.js
var require_ignore = __commonJS({
  "../../node_modules/.pnpm/ignore@5.3.2/node_modules/ignore/index.js"(exports, module) {
    init_cjs_shims();
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var EMPTY = "", SPACE = " ", ESCAPE = "\\", REGEX_TEST_BLANK_LINE = /^\s+$/, REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/, REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/, REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/, REGEX_SPLITALL_CRLF = /\r?\n/g, REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/, SLASH = "/", TMP_KEY_IGNORE = "node-ignore";
    typeof Symbol < "u" && (TMP_KEY_IGNORE = Symbol.for("node-ignore"));
    var KEY_IGNORE = TMP_KEY_IGNORE, define = (object, key, value) => Object.defineProperty(object, key, { value }), REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g, RETURN_FALSE = () => !1, sanitizeRange = (range) => range.replace(
      REGEX_REGEXP_RANGE,
      (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
    ), cleanRangeBackSlash = (slashes) => {
      let { length } = slashes;
      return slashes.slice(0, length - length % 2);
    }, REPLACERS = [
      [
        // remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => EMPTY
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a ) -> (a)
        // (a \ ) -> (a  )
        /((?:\\\\)*?)(\\?\s+)$/,
        (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
      ],
      // replace (\ ) with ' '
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        /(\\+?)\s/g,
        (_, m1) => {
          let { length } = m1;
          return m1.slice(0, length - length % 2) + SPACE;
        }
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function() {
          return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          let unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" && endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ],
      // trailing wildcard
      [
        /(\^|\\\/)?\\\*$/,
        (_, p1) => `${p1 ? `${p1}[^/]+` : "[^/]*"}(?=$|\\/$)`
      ]
    ], regexCache = /* @__PURE__ */ Object.create(null), makeRegex = (pattern, ignoreCase) => {
      let source = regexCache[pattern];
      return source || (source = REPLACERS.reduce(
        (prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)),
        pattern
      ), regexCache[pattern] = source), ignoreCase ? new RegExp(source, "i") : new RegExp(source);
    }, isString = (subject) => typeof subject == "string", checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0, splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF), IgnoreRule = class {
      constructor(origin, pattern, negative, regex) {
        this.origin = origin, this.pattern = pattern, this.negative = negative, this.regex = regex;
      }
    }, createRule = (pattern, ignoreCase) => {
      let origin = pattern, negative = !1;
      pattern.indexOf("!") === 0 && (negative = !0, pattern = pattern.substr(1)), pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      let regex = makeRegex(pattern, ignoreCase);
      return new IgnoreRule(
        origin,
        pattern,
        negative,
        regex
      );
    }, throwError = (message, Ctor) => {
      throw new Ctor(message);
    }, checkPath = (path, originalPath, doThrow) => isString(path) ? path ? checkPath.isNotRelative(path) ? doThrow(
      `path should be a \`path.relative()\`d string, but got "${originalPath}"`,
      RangeError
    ) : !0 : doThrow("path must not be empty", TypeError) : doThrow(
      `path must be a string, but got \`${originalPath}\``,
      TypeError
    ), isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = !0,
        ignoreCase = ignorecase,
        allowRelativePaths = !1
      } = {}) {
        define(this, KEY_IGNORE, !0), this._rules = [], this._ignoreCase = ignoreCase, this._allowRelativePaths = allowRelativePaths, this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
      }
      _addPattern(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules), this._added = !0;
          return;
        }
        if (checkPattern(pattern)) {
          let rule = createRule(pattern, this._ignoreCase);
          this._added = !0, this._rules.push(rule);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        return this._added = !1, makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._addPattern, this), this._added && this._initCache(), this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      //          |           ignored : unignored
      // negative |   0:0   |   0:1   |   1:0   |   1:1
      // -------- | ------- | ------- | ------- | --------
      //     0    |  TEST   |  TEST   |  SKIP   |    X
      //     1    |  TESTIF |  SKIP   |  TEST   |    X
      // - SKIP: always skip
      // - TEST: always test
      // - TESTIF: only test if checkUnignored
      // - X: that never happen
      // @param {boolean} whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // @returns {TestResult} true if a file is ignored
      _testOne(path, checkUnignored) {
        let ignored = !1, unignored = !1;
        return this._rules.forEach((rule) => {
          let { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored)
            return;
          rule.regex.test(path) && (ignored = !negative, unignored = negative);
        }), {
          ignored,
          unignored
        };
      }
      // @returns {TestResult}
      _test(originalPath, cache, checkUnignored, slices) {
        let path = originalPath && checkPath.convert(originalPath);
        return checkPath(
          path,
          originalPath,
          this._allowRelativePaths ? RETURN_FALSE : throwError
        ), this._t(path, cache, checkUnignored, slices);
      }
      _t(path, cache, checkUnignored, slices) {
        if (path in cache)
          return cache[path];
        if (slices || (slices = path.split(SLASH)), slices.pop(), !slices.length)
          return cache[path] = this._testOne(path, checkUnignored);
        let parent = this._t(
          slices.join(SLASH) + SLASH,
          cache,
          checkUnignored,
          slices
        );
        return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
      }
      ignores(path) {
        return this._test(path, this._ignoreCache, !1).ignored;
      }
      createFilter() {
        return (path) => !this.ignores(path);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path) {
        return this._test(path, this._testCache, !0);
      }
    }, factory = (options) => new Ignore(options), isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
    factory.isPathValid = isPathValid;
    factory.default = factory;
    module.exports = factory;
    if (
      // Detect `process` so that it can run in browsers.
      typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
    ) {
      let makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      let REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
    }
  }
});

// ../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/gitignore.js
var require_gitignore = __commonJS({
  "../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/gitignore.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { promisify } = __require("util"), fs = __require("fs"), path = __require("path"), fastGlob = require_out(), gitIgnore = require_ignore(), slash = require_slash(), DEFAULT_IGNORE = [
      "**/node_modules/**",
      "**/flow-typed/**",
      "**/coverage/**",
      "**/.git"
    ], readFileP = promisify(fs.readFile), mapGitIgnorePatternTo = (base) => (ignore) => ignore.startsWith("!") ? "!" + path.posix.join(base, ignore.slice(1)) : path.posix.join(base, ignore), parseGitIgnore = (content, options) => {
      let base = slash(path.relative(options.cwd, path.dirname(options.fileName)));
      return content.split(/\r?\n/).filter(Boolean).filter((line) => !line.startsWith("#")).map(mapGitIgnorePatternTo(base));
    }, reduceIgnore = (files) => {
      let ignores = gitIgnore();
      for (let file of files)
        ignores.add(parseGitIgnore(file.content, {
          cwd: file.cwd,
          fileName: file.filePath
        }));
      return ignores;
    }, ensureAbsolutePathForCwd = (cwd, p) => {
      if (cwd = slash(cwd), path.isAbsolute(p)) {
        if (slash(p).startsWith(cwd))
          return p;
        throw new Error(`Path ${p} is not in cwd ${cwd}`);
      }
      return path.join(cwd, p);
    }, getIsIgnoredPredecate = (ignores, cwd) => (p) => ignores.ignores(slash(path.relative(cwd, ensureAbsolutePathForCwd(cwd, p.path || p)))), getFile = async (file, cwd) => {
      let filePath = path.join(cwd, file), content = await readFileP(filePath, "utf8");
      return {
        cwd,
        filePath,
        content
      };
    }, getFileSync = (file, cwd) => {
      let filePath = path.join(cwd, file), content = fs.readFileSync(filePath, "utf8");
      return {
        cwd,
        filePath,
        content
      };
    }, normalizeOptions = ({
      ignore = [],
      cwd = slash(process.cwd())
    } = {}) => ({ ignore, cwd });
    module.exports = async (options) => {
      options = normalizeOptions(options);
      let paths = await fastGlob("**/.gitignore", {
        ignore: DEFAULT_IGNORE.concat(options.ignore),
        cwd: options.cwd
      }), files = await Promise.all(paths.map((file) => getFile(file, options.cwd))), ignores = reduceIgnore(files);
      return getIsIgnoredPredecate(ignores, options.cwd);
    };
    module.exports.sync = (options) => {
      options = normalizeOptions(options);
      let files = fastGlob.sync("**/.gitignore", {
        ignore: DEFAULT_IGNORE.concat(options.ignore),
        cwd: options.cwd
      }).map((file) => getFileSync(file, options.cwd)), ignores = reduceIgnore(files);
      return getIsIgnoredPredecate(ignores, options.cwd);
    };
  }
});

// ../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/stream-utils.js
var require_stream_utils = __commonJS({
  "../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/stream-utils.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var { Transform } = __require("stream"), ObjectTransform = class extends Transform {
      constructor() {
        super({
          objectMode: !0
        });
      }
    }, FilterStream = class extends ObjectTransform {
      constructor(filter) {
        super(), this._filter = filter;
      }
      _transform(data, encoding, callback) {
        this._filter(data) && this.push(data), callback();
      }
    }, UniqueStream = class extends ObjectTransform {
      constructor() {
        super(), this._pushed = /* @__PURE__ */ new Set();
      }
      _transform(data, encoding, callback) {
        this._pushed.has(data) || (this.push(data), this._pushed.add(data)), callback();
      }
    };
    module.exports = {
      FilterStream,
      UniqueStream
    };
  }
});

// ../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/index.js
var require_globby = __commonJS({
  "../../node_modules/.pnpm/globby@11.1.0/node_modules/globby/index.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    var fs = __require("fs"), arrayUnion = require_array_union(), merge2 = require_merge2(), fastGlob = require_out(), dirGlob = require_dir_glob(), gitignore = require_gitignore(), { FilterStream, UniqueStream } = require_stream_utils(), DEFAULT_FILTER = () => !1, isNegative = (pattern) => pattern[0] === "!", assertPatternsInput = (patterns) => {
      if (!patterns.every((pattern) => typeof pattern == "string"))
        throw new TypeError("Patterns must be a string or an array of strings");
    }, checkCwdOption = (options = {}) => {
      if (!options.cwd)
        return;
      let stat;
      try {
        stat = fs.statSync(options.cwd);
      } catch {
        return;
      }
      if (!stat.isDirectory())
        throw new Error("The `cwd` option must be a path to a directory");
    }, getPathString = (p) => p.stats instanceof fs.Stats ? p.path : p, generateGlobTasks = (patterns, taskOptions) => {
      patterns = arrayUnion([].concat(patterns)), assertPatternsInput(patterns), checkCwdOption(taskOptions);
      let globTasks = [];
      taskOptions = {
        ignore: [],
        expandDirectories: !0,
        ...taskOptions
      };
      for (let [index, pattern] of patterns.entries()) {
        if (isNegative(pattern))
          continue;
        let ignore = patterns.slice(index).filter((pattern2) => isNegative(pattern2)).map((pattern2) => pattern2.slice(1)), options = {
          ...taskOptions,
          ignore: taskOptions.ignore.concat(ignore)
        };
        globTasks.push({ pattern, options });
      }
      return globTasks;
    }, globDirs = (task, fn) => {
      let options = {};
      return task.options.cwd && (options.cwd = task.options.cwd), Array.isArray(task.options.expandDirectories) ? options = {
        ...options,
        files: task.options.expandDirectories
      } : typeof task.options.expandDirectories == "object" && (options = {
        ...options,
        ...task.options.expandDirectories
      }), fn(task.pattern, options);
    }, getPattern = (task, fn) => task.options.expandDirectories ? globDirs(task, fn) : [task.pattern], getFilterSync = (options) => options && options.gitignore ? gitignore.sync({ cwd: options.cwd, ignore: options.ignore }) : DEFAULT_FILTER, globToTask = (task) => (glob) => {
      let { options } = task;
      return options.ignore && Array.isArray(options.ignore) && options.expandDirectories && (options.ignore = dirGlob.sync(options.ignore)), {
        pattern: glob,
        options
      };
    };
    module.exports = async (patterns, options) => {
      let globTasks = generateGlobTasks(patterns, options), getFilter = async () => options && options.gitignore ? gitignore({ cwd: options.cwd, ignore: options.ignore }) : DEFAULT_FILTER, getTasks = async () => {
        let tasks2 = await Promise.all(globTasks.map(async (task) => {
          let globs = await getPattern(task, dirGlob);
          return Promise.all(globs.map(globToTask(task)));
        }));
        return arrayUnion(...tasks2);
      }, [filter, tasks] = await Promise.all([getFilter(), getTasks()]), paths = await Promise.all(tasks.map((task) => fastGlob(task.pattern, task.options)));
      return arrayUnion(...paths).filter((path_) => !filter(getPathString(path_)));
    };
    module.exports.sync = (patterns, options) => {
      let globTasks = generateGlobTasks(patterns, options), tasks = [];
      for (let task of globTasks) {
        let newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
        tasks.push(...newTask);
      }
      let filter = getFilterSync(options), matches = [];
      for (let task of tasks)
        matches = arrayUnion(matches, fastGlob.sync(task.pattern, task.options));
      return matches.filter((path_) => !filter(path_));
    };
    module.exports.stream = (patterns, options) => {
      let globTasks = generateGlobTasks(patterns, options), tasks = [];
      for (let task of globTasks) {
        let newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
        tasks.push(...newTask);
      }
      let filter = getFilterSync(options), filterStream = new FilterStream((p) => !filter(p)), uniqueStream = new UniqueStream();
      return merge2(tasks.map((task) => fastGlob.stream(task.pattern, task.options))).pipe(filterStream).pipe(uniqueStream);
    };
    module.exports.generateGlobTasks = generateGlobTasks;
    module.exports.hasMagic = (patterns, options) => [].concat(patterns).some((pattern) => fastGlob.isDynamicPattern(pattern, options));
    module.exports.gitignore = gitignore;
  }
});

export {
  require_slash,
  require_globby
};
//# sourceMappingURL=chunk-EFOOQV72.js.map
