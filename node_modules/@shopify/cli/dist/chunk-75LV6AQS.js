import {
  __commonJS,
  __require,
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js"(exports, module) {
    init_cjs_shims();
    var constants = __require("constants"), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      return cwd || (cwd = origCwd.call(process)), cwd;
    };
    try {
      process.cwd();
    } catch {
    }
    typeof process.chdir == "function" && (chdir = process.chdir, process.chdir = function(d) {
      cwd = null, chdir.call(process, d);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, chdir));
    var chdir;
    module.exports = patch;
    function patch(fs) {
      constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && patchLchmod(fs), fs.lutimes || patchLutimes(fs), fs.chown = chownFix(fs.chown), fs.fchown = chownFix(fs.fchown), fs.lchown = chownFix(fs.lchown), fs.chmod = chmodFix(fs.chmod), fs.fchmod = chmodFix(fs.fchmod), fs.lchmod = chmodFix(fs.lchmod), fs.chownSync = chownFixSync(fs.chownSync), fs.fchownSync = chownFixSync(fs.fchownSync), fs.lchownSync = chownFixSync(fs.lchownSync), fs.chmodSync = chmodFixSync(fs.chmodSync), fs.fchmodSync = chmodFixSync(fs.fchmodSync), fs.lchmodSync = chmodFixSync(fs.lchmodSync), fs.stat = statFix(fs.stat), fs.fstat = statFix(fs.fstat), fs.lstat = statFix(fs.lstat), fs.statSync = statFixSync(fs.statSync), fs.fstatSync = statFixSync(fs.fstatSync), fs.lstatSync = statFixSync(fs.lstatSync), fs.chmod && !fs.lchmod && (fs.lchmod = function(path, mode, cb) {
        cb && process.nextTick(cb);
      }, fs.lchmodSync = function() {
      }), fs.chown && !fs.lchown && (fs.lchown = function(path, uid, gid, cb) {
        cb && process.nextTick(cb);
      }, fs.lchownSync = function() {
      }), platform === "win32" && (fs.rename = typeof fs.rename != "function" ? fs.rename : function(fs$rename) {
        function rename(from, to, cb) {
          var start = Date.now(), backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
              setTimeout(function() {
                fs.stat(to, function(stater, st) {
                  stater && stater.code === "ENOENT" ? fs$rename(from, to, CB) : cb(er);
                });
              }, backoff), backoff < 100 && (backoff += 10);
              return;
            }
            cb && cb(er);
          });
        }
        return Object.setPrototypeOf && Object.setPrototypeOf(rename, fs$rename), rename;
      }(fs.rename)), fs.read = typeof fs.read != "function" ? fs.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ == "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10)
                return eagCounter++, fs$read.call(fs, fd, buffer, offset, length, position, callback);
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback);
        }
        return Object.setPrototypeOf && Object.setPrototypeOf(read, fs$read), read;
      }(fs.read), fs.readSync = typeof fs.readSync != "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          for (var eagCounter = 0; ; )
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path, mode, callback) {
          fs2.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                callback && callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  callback && callback(err2 || err22);
                });
              });
            }
          );
        }, fs2.lchmodSync = function(path, mode) {
          var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode), threw = !0, ret;
          try {
            ret = fs2.fchmodSync(fd, mode), threw = !1;
          } finally {
            if (threw)
              try {
                fs2.closeSync(fd);
              } catch {
              }
            else
              fs2.closeSync(fd);
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        constants.hasOwnProperty("O_SYMLINK") && fs2.futimes ? (fs2.lutimes = function(path, at, mt, cb) {
          fs2.open(path, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              cb && cb(er);
              return;
            }
            fs2.futimes(fd, at, mt, function(er2) {
              fs2.close(fd, function(er22) {
                cb && cb(er2 || er22);
              });
            });
          });
        }, fs2.lutimesSync = function(path, at, mt) {
          var fd = fs2.openSync(path, constants.O_SYMLINK), ret, threw = !0;
          try {
            ret = fs2.futimesSync(fd, at, mt), threw = !1;
          } finally {
            if (threw)
              try {
                fs2.closeSync(fd);
              } catch {
              }
            else
              fs2.closeSync(fd);
          }
          return ret;
        }) : fs2.futimes && (fs2.lutimes = function(_a, _b, _c, cb) {
          cb && process.nextTick(cb);
        }, fs2.lutimesSync = function() {
        });
      }
      function chmodFix(orig) {
        return orig && function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        return orig && function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        return orig && function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        return orig && function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        return orig && function(target, options, cb) {
          typeof options == "function" && (cb = options, options = null);
          function callback(er, stats) {
            stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), cb && cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        return orig && function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          return stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), stats;
        };
      }
      function chownErOk(er) {
        if (!er || er.code === "ENOSYS")
          return !0;
        var nonroot = !process.getuid || process.getuid() !== 0;
        return !!(nonroot && (er.code === "EINVAL" || er.code === "EPERM"));
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    init_cjs_shims();
    var Stream = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);
        Stream.call(this);
        var self = this;
        this.path = path, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, options = options || {};
        for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
          if (typeof this.start != "number")
            throw TypeError("start must be a Number");
          if (this.end === void 0)
            this.end = 1 / 0;
          else if (typeof this.end != "number")
            throw TypeError("end must be a Number");
          if (this.start > this.end)
            throw new Error("start must be <= end");
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err), self.readable = !1;
            return;
          }
          self.fd = fd, self.emit("open", fd), self._read();
        });
      }
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);
        Stream.call(this), this.path = path, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, options = options || {};
        for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if (typeof this.start != "number")
            throw TypeError("start must be a Number");
          if (this.start < 0)
            throw new Error("start must be >= zero");
          this.pos = this.start;
        }
        this.busy = !1, this._queue = [], this.fd === null && (this._open = fs.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    init_cjs_shims();
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj != "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      return Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      }), copy;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    init_cjs_shims();
    var fs = __require("fs"), polyfills = require_polyfills(), legacy = require_legacy_streams(), clone = require_clone(), util = __require("util"), gracefulQueue, previousSymbol;
    typeof Symbol == "function" && typeof Symbol.for == "function" ? (gracefulQueue = Symbol.for("graceful-fs.queue"), previousSymbol = Symbol.for("graceful-fs.previous")) : (gracefulQueue = "___graceful-fs.queue", previousSymbol = "___graceful-fs.previous");
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    util.debuglog ? debug = util.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (debug = function() {
      var m = util.format.apply(util, arguments);
      m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
    });
    fs[gracefulQueue] || (queue = global[gracefulQueue] || [], publishQueue(fs, queue), fs.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs, fd, function(err) {
          err || resetQueue(), typeof cb == "function" && cb.apply(this, arguments);
        });
      }
      return Object.defineProperty(close, previousSymbol, {
        value: fs$close
      }), close;
    }(fs.close), fs.closeSync = function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs, arguments), resetQueue();
      }
      return Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      }), closeSync;
    }(fs.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      debug(fs[gracefulQueue]), __require("assert").equal(fs[gracefulQueue].length, 0);
    }));
    var queue;
    global[gracefulQueue] || publishQueue(global, fs[gracefulQueue]);
    module.exports = patch(clone(fs));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched && (module.exports = patch(fs), fs.__patched = !0);
    function patch(fs2) {
      polyfills(fs2), fs2.gracefulify = patch, fs2.createReadStream = createReadStream, fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile;
      function readFile(path, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      fs$appendFile && (fs2.appendFile = appendFile);
      function appendFile(path, data, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$copyFile = fs2.copyFile;
      fs$copyFile && (fs2.copyFile = copyFile);
      function copyFile(src, dest, flags, cb) {
        return typeof flags == "function" && (cb = flags, flags = 0), go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options, cb) {
        typeof options == "function" && (cb = options, options = null);
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err, files) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([
              go$readdir,
              [path2, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]) : (files && files.sort && files.sort(), typeof cb2 == "function" && cb2.call(this, err, files));
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream, WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      fs$ReadStream && (ReadStream.prototype = Object.create(fs$ReadStream.prototype), ReadStream.prototype.open = ReadStream$open);
      var fs$WriteStream = fs2.WriteStream;
      fs$WriteStream && (WriteStream.prototype = Object.create(fs$WriteStream.prototype), WriteStream.prototype.open = WriteStream$open), Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      function ReadStream(path, options) {
        return this instanceof ReadStream ? (fs$ReadStream.apply(this, arguments), this) : ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          err ? (that.autoClose && that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd), that.read());
        });
      }
      function WriteStream(path, options) {
        return this instanceof WriteStream ? (fs$WriteStream.apply(this, arguments), this) : WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          err ? (that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd));
        });
      }
      function createReadStream(path, options) {
        return new fs2.ReadStream(path, options);
      }
      function createWriteStream(path, options) {
        return new fs2.WriteStream(path, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
      function open(path, flags, mode, cb) {
        return typeof mode == "function" && (cb = mode, mode = null), go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err, fd) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]), fs[gracefulQueue].push(elem), retry();
    }
    var retryTimer;
    function resetQueue() {
      for (var now = Date.now(), i = 0; i < fs[gracefulQueue].length; ++i)
        fs[gracefulQueue][i].length > 2 && (fs[gracefulQueue][i][3] = now, fs[gracefulQueue][i][4] = now);
      retry();
    }
    function retry() {
      if (clearTimeout(retryTimer), retryTimer = void 0, fs[gracefulQueue].length !== 0) {
        var elem = fs[gracefulQueue].shift(), fn = elem[0], args = elem[1], err = elem[2], startTime = elem[3], lastTime = elem[4];
        if (startTime === void 0)
          debug("RETRY", fn.name, args), fn.apply(null, args);
        else if (Date.now() - startTime >= 6e4) {
          debug("TIMEOUT", fn.name, args);
          var cb = args.pop();
          typeof cb == "function" && cb.call(null, err);
        } else {
          var sinceAttempt = Date.now() - lastTime, sinceStart = Math.max(lastTime - startTime, 1), desiredDelay = Math.min(sinceStart * 1.2, 100);
          sinceAttempt >= desiredDelay ? (debug("RETRY", fn.name, args), fn.apply(null, args.concat([startTime]))) : fs[gracefulQueue].push(elem);
        }
        retryTimer === void 0 && (retryTimer = setTimeout(retry, 0));
      }
    }
  }
});

export {
  require_graceful_fs
};
//# sourceMappingURL=chunk-75LV6AQS.js.map
