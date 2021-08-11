var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJS({
  "node_modules/@actions/io/lib/io-util.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e3) {
            reject(e3);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e3) {
            reject(e3);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getCmdPath = exports2.tryGetExecutablePath = exports2.isRooted = exports2.isDirectory = exports2.exists = exports2.IS_WINDOWS = exports2.unlink = exports2.symlink = exports2.stat = exports2.rmdir = exports2.rename = exports2.readlink = exports2.readdir = exports2.mkdir = exports2.lstat = exports2.copyFile = exports2.chmod = void 0;
    var fs4 = __importStar(require("fs"));
    var path = __importStar(require("path"));
    _a = fs4.promises, exports2.chmod = _a.chmod, exports2.copyFile = _a.copyFile, exports2.lstat = _a.lstat, exports2.mkdir = _a.mkdir, exports2.readdir = _a.readdir, exports2.readlink = _a.readlink, exports2.rename = _a.rename, exports2.rmdir = _a.rmdir, exports2.stat = _a.stat, exports2.symlink = _a.symlink, exports2.unlink = _a.unlink;
    exports2.IS_WINDOWS = process.platform === "win32";
    function exists(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield exports2.stat(fsPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            return false;
          }
          throw err;
        }
        return true;
      });
    }
    exports2.exists = exists;
    function isDirectory(fsPath, useStat = false) {
      return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports2.stat(fsPath) : yield exports2.lstat(fsPath);
        return stats.isDirectory();
      });
    }
    exports2.isDirectory = isDirectory;
    function isRooted(p2) {
      p2 = normalizeSeparators(p2);
      if (!p2) {
        throw new Error('isRooted() parameter "p" cannot be empty');
      }
      if (exports2.IS_WINDOWS) {
        return p2.startsWith("\\") || /^[A-Z]:/i.test(p2);
      }
      return p2.startsWith("/");
    }
    exports2.isRooted = isRooted;
    function tryGetExecutablePath(filePath, extensions) {
      return __awaiter(this, void 0, void 0, function* () {
        let stats = void 0;
        try {
          stats = yield exports2.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports2.IS_WINDOWS) {
            const upperExt = path.extname(filePath).toUpperCase();
            if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
              return filePath;
            }
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
        const originalFilePath = filePath;
        for (const extension of extensions) {
          filePath = originalFilePath + extension;
          stats = void 0;
          try {
            stats = yield exports2.stat(filePath);
          } catch (err) {
            if (err.code !== "ENOENT") {
              console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
          }
          if (stats && stats.isFile()) {
            if (exports2.IS_WINDOWS) {
              try {
                const directory = path.dirname(filePath);
                const upperName = path.basename(filePath).toUpperCase();
                for (const actualName of yield exports2.readdir(directory)) {
                  if (upperName === actualName.toUpperCase()) {
                    filePath = path.join(directory, actualName);
                    break;
                  }
                }
              } catch (err) {
                console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
              }
              return filePath;
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
        }
        return "";
      });
    }
    exports2.tryGetExecutablePath = tryGetExecutablePath;
    function normalizeSeparators(p2) {
      p2 = p2 || "";
      if (exports2.IS_WINDOWS) {
        p2 = p2.replace(/\//g, "\\");
        return p2.replace(/\\\\+/g, "\\");
      }
      return p2.replace(/\/\/+/g, "/");
    }
    function isUnixExecutable(stats) {
      return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
    }
    function getCmdPath() {
      var _a2;
      return (_a2 = process.env["COMSPEC"]) !== null && _a2 !== void 0 ? _a2 : `cmd.exe`;
    }
    exports2.getCmdPath = getCmdPath;
  }
});

// node_modules/@actions/io/lib/io.js
var require_io = __commonJS({
  "node_modules/@actions/io/lib/io.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e3) {
            reject(e3);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e3) {
            reject(e3);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.findInPath = exports2.which = exports2.mkdirP = exports2.rmRF = exports2.mv = exports2.cp = void 0;
    var assert_1 = require("assert");
    var childProcess = __importStar(require("child_process"));
    var path = __importStar(require("path"));
    var util_1 = require("util");
    var ioUtil = __importStar(require_io_util());
    var exec2 = util_1.promisify(childProcess.exec);
    var execFile = util_1.promisify(childProcess.execFile);
    function cp2(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        if (destStat && destStat.isFile() && !force) {
          return;
        }
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path.join(dest, path.basename(source)) : dest;
        if (!(yield ioUtil.exists(source))) {
          throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
          if (!recursive) {
            throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
          } else {
            yield cpDirRecursive(source, newDest, 0, force);
          }
        } else {
          if (path.relative(source, newDest) === "") {
            throw new Error(`'${newDest}' and '${source}' are the same file`);
          }
          yield copyFile(source, newDest, force);
        }
      });
    }
    exports2.cp = cp2;
    function mv(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
          let destExists = true;
          if (yield ioUtil.isDirectory(dest)) {
            dest = path.join(dest, path.basename(source));
            destExists = yield ioUtil.exists(dest);
          }
          if (destExists) {
            if (options.force == null || options.force) {
              yield rmRF(dest);
            } else {
              throw new Error("Destination already exists");
            }
          }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
      });
    }
    exports2.mv = mv;
    function rmRF(inputPath) {
      return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
          if (/[*"<>|]/.test(inputPath)) {
            throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
          }
          try {
            const cmdPath = ioUtil.getCmdPath();
            if (yield ioUtil.isDirectory(inputPath, true)) {
              yield exec2(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                env: { inputPath }
              });
            } else {
              yield exec2(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                env: { inputPath }
              });
            }
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
          }
          try {
            yield ioUtil.unlink(inputPath);
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
          }
        } else {
          let isDir = false;
          try {
            isDir = yield ioUtil.isDirectory(inputPath);
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
            return;
          }
          if (isDir) {
            yield execFile(`rm`, [`-rf`, `${inputPath}`]);
          } else {
            yield ioUtil.unlink(inputPath);
          }
        }
      });
    }
    exports2.rmRF = rmRF;
    function mkdirP(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, "a path argument must be provided");
        yield ioUtil.mkdir(fsPath, { recursive: true });
      });
    }
    exports2.mkdirP = mkdirP;
    function which(tool2, check) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool2) {
          throw new Error("parameter 'tool' is required");
        }
        if (check) {
          const result = yield which(tool2, false);
          if (!result) {
            if (ioUtil.IS_WINDOWS) {
              throw new Error(`Unable to locate executable file: ${tool2}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
            } else {
              throw new Error(`Unable to locate executable file: ${tool2}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
          }
          return result;
        }
        const matches = yield findInPath(tool2);
        if (matches && matches.length > 0) {
          return matches[0];
        }
        return "";
      });
    }
    exports2.which = which;
    function findInPath(tool2) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool2) {
          throw new Error("parameter 'tool' is required");
        }
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
          for (const extension of process.env["PATHEXT"].split(path.delimiter)) {
            if (extension) {
              extensions.push(extension);
            }
          }
        }
        if (ioUtil.isRooted(tool2)) {
          const filePath = yield ioUtil.tryGetExecutablePath(tool2, extensions);
          if (filePath) {
            return [filePath];
          }
          return [];
        }
        if (tool2.includes(path.sep)) {
          return [];
        }
        const directories = [];
        if (process.env.PATH) {
          for (const p2 of process.env.PATH.split(path.delimiter)) {
            if (p2) {
              directories.push(p2);
            }
          }
        }
        const matches = [];
        for (const directory of directories) {
          const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool2), extensions);
          if (filePath) {
            matches.push(filePath);
          }
        }
        return matches;
      });
    }
    exports2.findInPath = findInPath;
    function readCopyOptions(options) {
      const force = options.force == null ? true : options.force;
      const recursive = Boolean(options.recursive);
      const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
      return { force, recursive, copySourceDirectory };
    }
    function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if (currentDepth >= 255)
          return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
          const srcFile = `${sourceDir}/${fileName}`;
          const destFile = `${destDir}/${fileName}`;
          const srcFileStat = yield ioUtil.lstat(srcFile);
          if (srcFileStat.isDirectory()) {
            yield cpDirRecursive(srcFile, destFile, currentDepth, force);
          } else {
            yield copyFile(srcFile, destFile, force);
          }
        }
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
      });
    }
    function copyFile(srcFile, destFile, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
          try {
            yield ioUtil.lstat(destFile);
            yield ioUtil.unlink(destFile);
          } catch (e3) {
            if (e3.code === "EPERM") {
              yield ioUtil.chmod(destFile, "0666");
              yield ioUtil.unlink(destFile);
            }
          }
          const symlinkFull = yield ioUtil.readlink(srcFile);
          yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield ioUtil.exists(destFile)) || force) {
          yield ioUtil.copyFile(srcFile, destFile);
        }
      });
    }
  }
});

// node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJS({
  "node_modules/@actions/exec/lib/toolrunner.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e3) {
            reject(e3);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e3) {
            reject(e3);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argStringToArray = exports2.ToolRunner = void 0;
    var os2 = __importStar(require("os"));
    var events = __importStar(require("events"));
    var child = __importStar(require("child_process"));
    var path = __importStar(require("path"));
    var io2 = __importStar(require_io());
    var ioUtil = __importStar(require_io_util());
    var timers_1 = require("timers");
    var IS_WINDOWS = process.platform === "win32";
    var ToolRunner = class extends events.EventEmitter {
      constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
          throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
      }
      _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
          this.options.listeners.debug(message);
        }
      }
      _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd2 = noPrefix ? "" : "[command]";
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            cmd2 += toolPath;
            for (const a2 of args) {
              cmd2 += ` ${a2}`;
            }
          } else if (options.windowsVerbatimArguments) {
            cmd2 += `"${toolPath}"`;
            for (const a2 of args) {
              cmd2 += ` ${a2}`;
            }
          } else {
            cmd2 += this._windowsQuoteCmdArg(toolPath);
            for (const a2 of args) {
              cmd2 += ` ${this._windowsQuoteCmdArg(a2)}`;
            }
          }
        } else {
          cmd2 += toolPath;
          for (const a2 of args) {
            cmd2 += ` ${a2}`;
          }
        }
        return cmd2;
      }
      _processLineBuffer(data, strBuffer, onLine) {
        try {
          let s = strBuffer + data.toString();
          let n2 = s.indexOf(os2.EOL);
          while (n2 > -1) {
            const line = s.substring(0, n2);
            onLine(line);
            s = s.substring(n2 + os2.EOL.length);
            n2 = s.indexOf(os2.EOL);
          }
          return s;
        } catch (err) {
          this._debug(`error processing line. Failed with error ${err}`);
          return "";
        }
      }
      _getSpawnFileName() {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            return process.env["COMSPEC"] || "cmd.exe";
          }
        }
        return this.toolPath;
      }
      _getSpawnArgs(options) {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
            for (const a2 of this.args) {
              argline += " ";
              argline += options.windowsVerbatimArguments ? a2 : this._windowsQuoteCmdArg(a2);
            }
            argline += '"';
            return [argline];
          }
        }
        return this.args;
      }
      _endsWith(str, end) {
        return str.endsWith(end);
      }
      _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
      }
      _windowsQuoteCmdArg(arg) {
        if (!this._isCmdFile()) {
          return this._uvQuoteCmdArg(arg);
        }
        if (!arg) {
          return '""';
        }
        const cmdSpecialChars = [
          " ",
          "	",
          "&",
          "(",
          ")",
          "[",
          "]",
          "{",
          "}",
          "^",
          "=",
          ";",
          "!",
          "'",
          "+",
          ",",
          "`",
          "~",
          "|",
          "<",
          ">",
          '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
          if (cmdSpecialChars.some((x2) => x2 === char)) {
            needsQuotes = true;
            break;
          }
        }
        if (!needsQuotes) {
          return arg;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += '"';
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _uvQuoteCmdArg(arg) {
        if (!arg) {
          return '""';
        }
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
          return arg;
        }
        if (!arg.includes('"') && !arg.includes("\\")) {
          return `"${arg}"`;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += "\\";
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _cloneExecOptions(options) {
        options = options || {};
        const result = {
          cwd: options.cwd || process.cwd(),
          env: options.env || process.env,
          silent: options.silent || false,
          windowsVerbatimArguments: options.windowsVerbatimArguments || false,
          failOnStdErr: options.failOnStdErr || false,
          ignoreReturnCode: options.ignoreReturnCode || false,
          delay: options.delay || 1e4
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
      }
      _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
          result.argv0 = `"${toolPath}"`;
        }
        return result;
      }
      exec() {
        return __awaiter(this, void 0, void 0, function* () {
          if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
            this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
          }
          this.toolPath = yield io2.which(this.toolPath, true);
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this._debug(`exec tool: ${this.toolPath}`);
            this._debug("arguments:");
            for (const arg of this.args) {
              this._debug(`   ${arg}`);
            }
            const optionsNonNull = this._cloneExecOptions(this.options);
            if (!optionsNonNull.silent && optionsNonNull.outStream) {
              optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
            }
            const state = new ExecState(optionsNonNull, this.toolPath);
            state.on("debug", (message) => {
              this._debug(message);
            });
            if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
              return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
            }
            const fileName = this._getSpawnFileName();
            const cp2 = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
            let stdbuffer = "";
            if (cp2.stdout) {
              cp2.stdout.on("data", (data) => {
                if (this.options.listeners && this.options.listeners.stdout) {
                  this.options.listeners.stdout(data);
                }
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                  optionsNonNull.outStream.write(data);
                }
                stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                  if (this.options.listeners && this.options.listeners.stdline) {
                    this.options.listeners.stdline(line);
                  }
                });
              });
            }
            let errbuffer = "";
            if (cp2.stderr) {
              cp2.stderr.on("data", (data) => {
                state.processStderr = true;
                if (this.options.listeners && this.options.listeners.stderr) {
                  this.options.listeners.stderr(data);
                }
                if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                  const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                  s.write(data);
                }
                errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                  if (this.options.listeners && this.options.listeners.errline) {
                    this.options.listeners.errline(line);
                  }
                });
              });
            }
            cp2.on("error", (err) => {
              state.processError = err.message;
              state.processExited = true;
              state.processClosed = true;
              state.CheckComplete();
            });
            cp2.on("exit", (code) => {
              state.processExitCode = code;
              state.processExited = true;
              this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
              state.CheckComplete();
            });
            cp2.on("close", (code) => {
              state.processExitCode = code;
              state.processExited = true;
              state.processClosed = true;
              this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
              state.CheckComplete();
            });
            state.on("done", (error, exitCode) => {
              if (stdbuffer.length > 0) {
                this.emit("stdline", stdbuffer);
              }
              if (errbuffer.length > 0) {
                this.emit("errline", errbuffer);
              }
              cp2.removeAllListeners();
              if (error) {
                reject(error);
              } else {
                resolve(exitCode);
              }
            });
            if (this.options.input) {
              if (!cp2.stdin) {
                throw new Error("child process missing stdin");
              }
              cp2.stdin.end(this.options.input);
            }
          }));
        });
      }
    };
    exports2.ToolRunner = ToolRunner;
    function argStringToArray(argString) {
      const args = [];
      let inQuotes = false;
      let escaped = false;
      let arg = "";
      function append(c3) {
        if (escaped && c3 !== '"') {
          arg += "\\";
        }
        arg += c3;
        escaped = false;
      }
      for (let i = 0; i < argString.length; i++) {
        const c3 = argString.charAt(i);
        if (c3 === '"') {
          if (!escaped) {
            inQuotes = !inQuotes;
          } else {
            append(c3);
          }
          continue;
        }
        if (c3 === "\\" && escaped) {
          append(c3);
          continue;
        }
        if (c3 === "\\" && inQuotes) {
          escaped = true;
          continue;
        }
        if (c3 === " " && !inQuotes) {
          if (arg.length > 0) {
            args.push(arg);
            arg = "";
          }
          continue;
        }
        append(c3);
      }
      if (arg.length > 0) {
        args.push(arg.trim());
      }
      return args;
    }
    exports2.argStringToArray = argStringToArray;
    var ExecState = class extends events.EventEmitter {
      constructor(options, toolPath) {
        super();
        this.processClosed = false;
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false;
        this.processStderr = false;
        this.delay = 1e4;
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
          throw new Error("toolPath must not be empty");
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
          this.delay = options.delay;
        }
      }
      CheckComplete() {
        if (this.done) {
          return;
        }
        if (this.processClosed) {
          this._setResult();
        } else if (this.processExited) {
          this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
      }
      _debug(message) {
        this.emit("debug", message);
      }
      _setResult() {
        let error;
        if (this.processExited) {
          if (this.processError) {
            error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
          } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
            error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
          } else if (this.processStderr && this.options.failOnStdErr) {
            error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
          }
        }
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.done = true;
        this.emit("done", error, this.processExitCode);
      }
      static HandleTimeout(state) {
        if (state.done) {
          return;
        }
        if (!state.processClosed && state.processExited) {
          const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
          state._debug(message);
        }
        state._setResult();
      }
    };
  }
});

// node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJS({
  "node_modules/@actions/exec/lib/exec.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e3) {
            reject(e3);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e3) {
            reject(e3);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getExecOutput = exports2.exec = void 0;
    var string_decoder_1 = require("string_decoder");
    var tr = __importStar(require_toolrunner());
    function exec2(commandLine, args, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
          throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
      });
    }
    exports2.exec = exec2;
    function getExecOutput(commandLine, args, options) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function* () {
        let stdout = "";
        let stderr = "";
        const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
        const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
          stderr += stderrDecoder.write(data);
          if (originalStdErrListener) {
            originalStdErrListener(data);
          }
        };
        const stdOutListener = (data) => {
          stdout += stdoutDecoder.write(data);
          if (originalStdoutListener) {
            originalStdoutListener(data);
          }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec2(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
          exitCode,
          stdout,
          stderr
        };
      });
    }
    exports2.getExecOutput = getExecOutput;
  }
});

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command2, properties2, message) {
      const cmd2 = new Command(command2, properties2, message);
      process.stdout.write(cmd2.toString() + os2.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command2, properties2, message) {
        if (!command2) {
          command2 = "missing.command";
        }
        this.command = command2;
        this.properties = properties2;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issueCommand = void 0;
    var fs4 = __importStar(require("fs"));
    var os2 = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command2, message) {
      const filePath = process.env[`GITHUB_${command2}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command2}`);
      }
      if (!fs4.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs4.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os2.EOL}`, {
        encoding: "utf8"
      });
    }
    exports2.issueCommand = issueCommand;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m4[k];
      } });
    } : function(o, m4, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m4[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v2) {
      Object.defineProperty(o, "default", { enumerable: true, value: v2 });
    } : function(o, v2) {
      o["default"] = v2;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e3) {
            reject(e3);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e3) {
            reject(e3);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getState = exports2.saveState = exports2.group = exports2.endGroup = exports2.startGroup = exports2.info = exports2.warning = exports2.error = exports2.debug = exports2.isDebug = exports2.setFailed = exports2.setCommandEcho = exports2.setOutput = exports2.getBooleanInput = exports2.getMultilineInput = exports2.getInput = exports2.addPath = exports2.setSecret = exports2.exportVariable = exports2.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os2 = __importStar(require("os"));
    var path = __importStar(require("path"));
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os2.EOL}${convertedVal}${os2.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options).split("\n").filter((x2) => x2 !== "");
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput2(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os2.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports2.debug = debug;
    function error(message) {
      command_1.issue("error", message instanceof Error ? message.toString() : message);
    }
    exports2.error = error;
    function warning(message) {
      command_1.issue("warning", message instanceof Error ? message.toString() : message);
    }
    exports2.warning = warning;
    function info2(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports2.info = info2;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
          return test2[n2];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports2) {
    "use strict";
    var l2 = require_object_assign();
    var n2 = 60103;
    var p2 = 60106;
    exports2.Fragment = 60107;
    exports2.StrictMode = 60108;
    exports2.Profiler = 60114;
    var q2 = 60109;
    var r4 = 60110;
    var t2 = 60112;
    exports2.Suspense = 60113;
    var u = 60115;
    var v2 = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w2 = Symbol.for;
      n2 = w2("react.element");
      p2 = w2("react.portal");
      exports2.Fragment = w2("react.fragment");
      exports2.StrictMode = w2("react.strict_mode");
      exports2.Profiler = w2("react.profiler");
      q2 = w2("react.provider");
      r4 = w2("react.context");
      t2 = w2("react.forward_ref");
      exports2.Suspense = w2("react.suspense");
      u = w2("react.memo");
      v2 = w2("react.lazy");
    }
    var w2;
    var x2 = typeof Symbol === "function" && Symbol.iterator;
    function y3(a2) {
      if (a2 === null || typeof a2 !== "object")
        return null;
      a2 = x2 && a2[x2] || a2["@@iterator"];
      return typeof a2 === "function" ? a2 : null;
    }
    function z(a2) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c3 = 1; c3 < arguments.length; c3++)
        b += "&args[]=" + encodeURIComponent(arguments[c3]);
      return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var B = {};
    function C(a2, b, c3) {
      this.props = a2;
      this.context = b;
      this.refs = B;
      this.updater = c3 || A;
    }
    C.prototype.isReactComponent = {};
    C.prototype.setState = function(a2, b) {
      if (typeof a2 !== "object" && typeof a2 !== "function" && a2 != null)
        throw Error(z(85));
      this.updater.enqueueSetState(this, a2, b, "setState");
    };
    C.prototype.forceUpdate = function(a2) {
      this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
    };
    function D() {
    }
    D.prototype = C.prototype;
    function E2(a2, b, c3) {
      this.props = a2;
      this.context = b;
      this.refs = B;
      this.updater = c3 || A;
    }
    var F = E2.prototype = new D();
    F.constructor = E2;
    l2(F, C.prototype);
    F.isPureReactComponent = true;
    var G = { current: null };
    var H = Object.prototype.hasOwnProperty;
    var I = { key: true, ref: true, __self: true, __source: true };
    function J(a2, b, c3) {
      var e3, d2 = {}, k = null, h2 = null;
      if (b != null)
        for (e3 in b.ref !== void 0 && (h2 = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          H.call(b, e3) && !I.hasOwnProperty(e3) && (d2[e3] = b[e3]);
      var g2 = arguments.length - 2;
      if (g2 === 1)
        d2.children = c3;
      else if (1 < g2) {
        for (var f2 = Array(g2), m4 = 0; m4 < g2; m4++)
          f2[m4] = arguments[m4 + 2];
        d2.children = f2;
      }
      if (a2 && a2.defaultProps)
        for (e3 in g2 = a2.defaultProps, g2)
          d2[e3] === void 0 && (d2[e3] = g2[e3]);
      return { $$typeof: n2, type: a2, key: k, ref: h2, props: d2, _owner: G.current };
    }
    function K(a2, b) {
      return { $$typeof: n2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
    }
    function L(a2) {
      return typeof a2 === "object" && a2 !== null && a2.$$typeof === n2;
    }
    function escape(a2) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a2.replace(/[=:]/g, function(a3) {
        return b[a3];
      });
    }
    var M = /\/+/g;
    function N(a2, b) {
      return typeof a2 === "object" && a2 !== null && a2.key != null ? escape("" + a2.key) : b.toString(36);
    }
    function O(a2, b, c3, e3, d2) {
      var k = typeof a2;
      if (k === "undefined" || k === "boolean")
        a2 = null;
      var h2 = false;
      if (a2 === null)
        h2 = true;
      else
        switch (k) {
          case "string":
          case "number":
            h2 = true;
            break;
          case "object":
            switch (a2.$$typeof) {
              case n2:
              case p2:
                h2 = true;
            }
        }
      if (h2)
        return h2 = a2, d2 = d2(h2), a2 = e3 === "" ? "." + N(h2, 0) : e3, Array.isArray(d2) ? (c3 = "", a2 != null && (c3 = a2.replace(M, "$&/") + "/"), O(d2, b, c3, "", function(a3) {
          return a3;
        })) : d2 != null && (L(d2) && (d2 = K(d2, c3 + (!d2.key || h2 && h2.key === d2.key ? "" : ("" + d2.key).replace(M, "$&/") + "/") + a2)), b.push(d2)), 1;
      h2 = 0;
      e3 = e3 === "" ? "." : e3 + ":";
      if (Array.isArray(a2))
        for (var g2 = 0; g2 < a2.length; g2++) {
          k = a2[g2];
          var f2 = e3 + N(k, g2);
          h2 += O(k, b, c3, f2, d2);
        }
      else if (f2 = y3(a2), typeof f2 === "function")
        for (a2 = f2.call(a2), g2 = 0; !(k = a2.next()).done; )
          k = k.value, f2 = e3 + N(k, g2++), h2 += O(k, b, c3, f2, d2);
      else if (k === "object")
        throw b = "" + a2, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b));
      return h2;
    }
    function P(a2, b, c3) {
      if (a2 == null)
        return a2;
      var e3 = [], d2 = 0;
      O(a2, e3, "", "", function(a3) {
        return b.call(c3, a3, d2++);
      });
      return e3;
    }
    function Q(a2) {
      if (a2._status === -1) {
        var b = a2._result;
        b = b();
        a2._status = 0;
        a2._result = b;
        b.then(function(b2) {
          a2._status === 0 && (b2 = b2.default, a2._status = 1, a2._result = b2);
        }, function(b2) {
          a2._status === 0 && (a2._status = 2, a2._result = b2);
        });
      }
      if (a2._status === 1)
        return a2._result;
      throw a2._result;
    }
    var R = { current: null };
    function S() {
      var a2 = R.current;
      if (a2 === null)
        throw Error(z(321));
      return a2;
    }
    var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l2 };
    exports2.Children = { map: P, forEach: function(a2, b, c3) {
      P(a2, function() {
        b.apply(this, arguments);
      }, c3);
    }, count: function(a2) {
      var b = 0;
      P(a2, function() {
        b++;
      });
      return b;
    }, toArray: function(a2) {
      return P(a2, function(a3) {
        return a3;
      }) || [];
    }, only: function(a2) {
      if (!L(a2))
        throw Error(z(143));
      return a2;
    } };
    exports2.Component = C;
    exports2.PureComponent = E2;
    exports2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports2.cloneElement = function(a2, b, c3) {
      if (a2 === null || a2 === void 0)
        throw Error(z(267, a2));
      var e3 = l2({}, a2.props), d2 = a2.key, k = a2.ref, h2 = a2._owner;
      if (b != null) {
        b.ref !== void 0 && (k = b.ref, h2 = G.current);
        b.key !== void 0 && (d2 = "" + b.key);
        if (a2.type && a2.type.defaultProps)
          var g2 = a2.type.defaultProps;
        for (f2 in b)
          H.call(b, f2) && !I.hasOwnProperty(f2) && (e3[f2] = b[f2] === void 0 && g2 !== void 0 ? g2[f2] : b[f2]);
      }
      var f2 = arguments.length - 2;
      if (f2 === 1)
        e3.children = c3;
      else if (1 < f2) {
        g2 = Array(f2);
        for (var m4 = 0; m4 < f2; m4++)
          g2[m4] = arguments[m4 + 2];
        e3.children = g2;
      }
      return {
        $$typeof: n2,
        type: a2.type,
        key: d2,
        ref: k,
        props: e3,
        _owner: h2
      };
    };
    exports2.createContext = function(a2, b) {
      b === void 0 && (b = null);
      a2 = { $$typeof: r4, _calculateChangedBits: b, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null };
      a2.Provider = { $$typeof: q2, _context: a2 };
      return a2.Consumer = a2;
    };
    exports2.createElement = J;
    exports2.createFactory = function(a2) {
      var b = J.bind(null, a2);
      b.type = a2;
      return b;
    };
    exports2.createRef = function() {
      return { current: null };
    };
    exports2.forwardRef = function(a2) {
      return { $$typeof: t2, render: a2 };
    };
    exports2.isValidElement = L;
    exports2.lazy = function(a2) {
      return { $$typeof: v2, _payload: { _status: -1, _result: a2 }, _init: Q };
    };
    exports2.memo = function(a2, b) {
      return { $$typeof: u, type: a2, compare: b === void 0 ? null : b };
    };
    exports2.useCallback = function(a2, b) {
      return S().useCallback(a2, b);
    };
    exports2.useContext = function(a2, b) {
      return S().useContext(a2, b);
    };
    exports2.useDebugValue = function() {
    };
    exports2.useEffect = function(a2, b) {
      return S().useEffect(a2, b);
    };
    exports2.useImperativeHandle = function(a2, b, c3) {
      return S().useImperativeHandle(a2, b, c3);
    };
    exports2.useLayoutEffect = function(a2, b) {
      return S().useLayoutEffect(a2, b);
    };
    exports2.useMemo = function(a2, b) {
      return S().useMemo(a2, b);
    };
    exports2.useReducer = function(a2, b, c3) {
      return S().useReducer(a2, b, c3);
    };
    exports2.useRef = function(a2) {
      return S().useRef(a2);
    };
    exports2.useState = function(a2) {
      return S().useState(a2);
    };
    exports2.version = "17.0.2";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var _assign = require_object_assign();
        var ReactVersion = "17.0.2";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        exports2.Fragment = 60107;
        exports2.StrictMode = 60108;
        exports2.Profiler = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        exports2.Suspense = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports2.Fragment = symbolFor("react.fragment");
          exports2.StrictMode = symbolFor("react.strict_mode");
          exports2.Profiler = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          exports2.Suspense = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: 0
        };
        var ReactCurrentOwner = {
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var IsSomeRendererActing = {
          current: false
        };
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner,
          IsSomeRendererActing,
          assign: _assign
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
        }
        function warn(format2) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format2, args);
          }
        }
        function error(format2) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format2, args);
          }
        }
        function printWarning(level, format2, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format2 += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format2);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          isMounted: function(publicInstance) {
            return false;
          },
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props2, context, updater) {
          this.props = props2;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
            {
              throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info2) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info2[0], info2[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props2, context, updater) {
          this.props = props2;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        _assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type2) {
          return type2.displayName || "Context";
        }
        function getComponentName(type2) {
          if (type2 == null) {
            return null;
          }
          {
            if (typeof type2.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type2 === "function") {
            return type2.displayName || type2.name || null;
          }
          if (typeof type2 === "string") {
            return type2;
          }
          switch (type2) {
            case exports2.Fragment:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case exports2.Profiler:
              return "Profiler";
            case exports2.StrictMode:
              return "StrictMode";
            case exports2.Suspense:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type2 === "object") {
            switch (type2.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type2;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type2;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type2, type2.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type2.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type2._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type2;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return getComponentName(init2(payload));
                } catch (x2) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props2, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props2, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props2, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props2, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type2, key, ref, self3, source, owner, props2) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type2,
            key,
            ref,
            props: props2,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self3
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type2, config, children2) {
          var propName;
          var props2 = {};
          var key = null;
          var ref = null;
          var self3 = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            self3 = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props2[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props2.children = children2;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props2.children = childArray;
          }
          if (type2 && type2.defaultProps) {
            var defaultProps = type2.defaultProps;
            for (propName in defaultProps) {
              if (props2[propName] === void 0) {
                props2[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type2 === "function" ? type2.displayName || type2.name || "Unknown" : type2;
              if (key) {
                defineKeyPropWarningGetter(props2, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props2, displayName);
              }
            }
          }
          return ReactElement(type2, key, ref, self3, source, ReactCurrentOwner.current, props2);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children2) {
          if (!!(element === null || element === void 0)) {
            {
              throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
          }
          var propName;
          var props2 = _assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self3 = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props2[propName] = defaultProps[propName];
                } else {
                  props2[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props2.children = children2;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props2.children = childArray;
          }
          return ReactElement(element.type, key, ref, self3, source, owner, props2);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children2, array2, escapedPrefix, nameSoFar, callback) {
          var type2 = typeof children2;
          if (type2 === "undefined" || type2 === "boolean") {
            children2 = null;
          }
          var invokeCallback = false;
          if (children2 === null) {
            invokeCallback = true;
          } else {
            switch (type2) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children2.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children2;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (Array.isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array2, escapedChildKey, "", function(c3) {
                return c3;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
              }
              array2.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (Array.isArray(children2)) {
            for (var i = 0; i < children2.length; i++) {
              child = children2[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array2, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children2);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children2;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array2, escapedPrefix, nextName, callback);
              }
            } else if (type2 === "object") {
              var childrenString = "" + children2;
              {
                {
                  throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children2).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                }
              }
            }
          }
          return subtreeCount;
        }
        function mapChildren2(children2, func, context) {
          if (children2 == null) {
            return children2;
          }
          var result = [];
          var count2 = 0;
          mapIntoArray(children2, result, "", "", function(child) {
            return func.call(context, child, count2++);
          });
          return result;
        }
        function countChildren(children2) {
          var n2 = 0;
          mapChildren2(children2, function() {
            n2++;
          });
          return n2;
        }
        function forEachChildren(children2, forEachFunc, forEachContext) {
          mapChildren2(children2, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children2) {
          return mapChildren2(children2, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children2) {
          if (!isValidElement(children2)) {
            {
              throw Error("React.Children.only expected to receive a single React element child.");
            }
          }
          return children2;
        }
        function createContext(defaultValue, calculateChangedBits) {
          if (calculateChangedBits === void 0) {
            calculateChangedBits = null;
          } else {
            {
              if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
              }
            }
          }
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context,
              _calculateChangedBits: context._calculateChangedBits
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            var pending = payload;
            pending._status = Pending;
            pending._result = thenable;
            thenable.then(function(moduleObject) {
              if (payload._status === Pending) {
                var defaultExport = moduleObject.default;
                {
                  if (defaultExport === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = defaultExport;
              }
            }, function(error2) {
              if (payload._status === Pending) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
          }
          if (payload._status === Resolved) {
            return payload._result;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            _status: -1,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (render.displayName == null) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var enableScopeAPI = false;
        function isValidElementType(type2) {
          if (typeof type2 === "string" || typeof type2 === "function") {
            return true;
          }
          if (type2 === exports2.Fragment || type2 === exports2.Profiler || type2 === REACT_DEBUG_TRACING_MODE_TYPE || type2 === exports2.StrictMode || type2 === exports2.Suspense || type2 === REACT_SUSPENSE_LIST_TYPE || type2 === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type2 === "object" && type2 !== null) {
            if (type2.$$typeof === REACT_LAZY_TYPE || type2.$$typeof === REACT_MEMO_TYPE || type2.$$typeof === REACT_PROVIDER_TYPE || type2.$$typeof === REACT_CONTEXT_TYPE || type2.$$typeof === REACT_FORWARD_REF_TYPE || type2.$$typeof === REACT_FUNDAMENTAL_TYPE || type2.$$typeof === REACT_BLOCK_TYPE || type2[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function memo(type2, compare) {
          {
            if (!isValidElementType(type2)) {
              error("memo: The first argument must be a component. Instead received: %s", type2 === null ? "null" : typeof type2);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type: type2,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (type2.displayName == null) {
                  type2.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          if (!(dispatcher !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context, unstable_observedBits) {
          var dispatcher = resolveDispatcher();
          {
            if (unstable_observedBits !== void 0) {
              error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
            }
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context, unstable_observedBits);
        }
        function useState2(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init2) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init2);
        }
        function useRef2(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create2, deps);
        }
        function useLayoutEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create2, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo3(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create2, deps);
        }
        function useImperativeHandle(ref, create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create2, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props2 = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props2,
                log: props2,
                warn: props2,
                error: props2,
                group: props2,
                groupCollapsed: props2,
                groupEnd: props2
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props2 = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props2, {
                  value: prevLog
                }),
                info: _assign({}, props2, {
                  value: prevInfo
                }),
                warn: _assign({}, props2, {
                  value: prevWarn
                }),
                error: _assign({}, props2, {
                  value: prevError
                }),
                group: _assign({}, props2, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props2, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props2, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x2) {
                var match = x2.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame2 = componentFrameCache.get(fn);
            if (frame2 !== void 0) {
              return frame2;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x2) {
                  control = x2;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x2) {
                  control = x2;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x2) {
                control = x2;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c3 = controlLines.length - 1;
              while (s >= 1 && c3 >= 0 && sampleLines[s] !== controlLines[c3]) {
                c3--;
              }
              for (; s >= 1 && c3 >= 0; s--, c3--) {
                if (sampleLines[s] !== controlLines[c3]) {
                  if (s !== 1 || c3 !== 1) {
                    do {
                      s--;
                      c3--;
                      if (c3 < 0 || sampleLines[s] !== controlLines[c3]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c3 >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type2, source, ownerFn) {
          if (type2 == null) {
            return "";
          }
          if (typeof type2 === "function") {
            {
              return describeNativeComponentFrame(type2, shouldConstruct(type2));
            }
          }
          if (typeof type2 === "string") {
            return describeBuiltInComponentFrame(type2);
          }
          switch (type2) {
            case exports2.Suspense:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type2 === "object") {
            switch (type2.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type2.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type2.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type2._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type2;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
                } catch (x2) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex2) {
                  error$1 = ex2;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info2 = getDeclarationErrorAddendum();
          if (!info2) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info2 = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info2;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type2 = element.type;
            if (type2 === null || type2 === void 0 || typeof type2 === "string") {
              return;
            }
            var propTypes;
            if (typeof type2 === "function") {
              propTypes = type2.propTypes;
            } else if (typeof type2 === "object" && (type2.$$typeof === REACT_FORWARD_REF_TYPE || type2.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type2.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentName(type2);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type2.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentName(type2);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type2.getDefaultProps === "function" && !type2.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type2, props2, children2) {
          var validType = isValidElementType(type2);
          if (!validType) {
            var info2 = "";
            if (type2 === void 0 || typeof type2 === "object" && type2 !== null && Object.keys(type2).length === 0) {
              info2 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props2);
            if (sourceInfo) {
              info2 += sourceInfo;
            } else {
              info2 += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type2 === null) {
              typeString = "null";
            } else if (Array.isArray(type2)) {
              typeString = "array";
            } else if (type2 !== void 0 && type2.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentName(type2.type) || "Unknown") + " />";
              info2 = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type2;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info2);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type2);
            }
          }
          if (type2 === exports2.Fragment) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type2) {
          var validatedFactory = createElementWithValidation.bind(null, type2);
          validatedFactory.type = type2;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type2
                });
                return type2;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props2, children2) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        {
          try {
            var frozenObject = Object.freeze({});
            new Map([[frozenObject, null]]);
            new Set([frozenObject]);
          } catch (e3) {
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren2,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports2.Children = Children;
        exports2.Component = Component;
        exports2.PureComponent = PureComponent;
        exports2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports2.cloneElement = cloneElement$1;
        exports2.createContext = createContext;
        exports2.createElement = createElement$1;
        exports2.createFactory = createFactory;
        exports2.createRef = createRef;
        exports2.forwardRef = forwardRef;
        exports2.isValidElement = isValidElement;
        exports2.lazy = lazy;
        exports2.memo = memo;
        exports2.useCallback = useCallback;
        exports2.useContext = useContext;
        exports2.useDebugValue = useDebugValue;
        exports2.useEffect = useEffect;
        exports2.useImperativeHandle = useImperativeHandle;
        exports2.useLayoutEffect = useLayoutEffect;
        exports2.useMemo = useMemo3;
        exports2.useReducer = useReducer;
        exports2.useRef = useRef2;
        exports2.useState = useState2;
        exports2.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.production.min.js
var require_react_dom_server_node_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.production.min.js"(exports2) {
    "use strict";
    var l2 = require_object_assign();
    var n2 = require_react();
    var aa = require("stream");
    function p2(a2) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c3 = 1; c3 < arguments.length; c3++)
        b += "&args[]=" + encodeURIComponent(arguments[c3]);
      return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var q2 = 60106;
    var r4 = 60107;
    var u = 60108;
    var z = 60114;
    var B = 60109;
    var ba = 60110;
    var ca = 60112;
    var D = 60113;
    var da = 60120;
    var ea = 60115;
    var fa = 60116;
    var ha = 60121;
    var ia = 60117;
    var ja = 60119;
    var ka = 60129;
    var la = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      E2 = Symbol.for;
      q2 = E2("react.portal");
      r4 = E2("react.fragment");
      u = E2("react.strict_mode");
      z = E2("react.profiler");
      B = E2("react.provider");
      ba = E2("react.context");
      ca = E2("react.forward_ref");
      D = E2("react.suspense");
      da = E2("react.suspense_list");
      ea = E2("react.memo");
      fa = E2("react.lazy");
      ha = E2("react.block");
      ia = E2("react.fundamental");
      ja = E2("react.scope");
      ka = E2("react.debug_trace_mode");
      la = E2("react.legacy_hidden");
    }
    var E2;
    function F(a2) {
      if (a2 == null)
        return null;
      if (typeof a2 === "function")
        return a2.displayName || a2.name || null;
      if (typeof a2 === "string")
        return a2;
      switch (a2) {
        case r4:
          return "Fragment";
        case q2:
          return "Portal";
        case z:
          return "Profiler";
        case u:
          return "StrictMode";
        case D:
          return "Suspense";
        case da:
          return "SuspenseList";
      }
      if (typeof a2 === "object")
        switch (a2.$$typeof) {
          case ba:
            return (a2.displayName || "Context") + ".Consumer";
          case B:
            return (a2._context.displayName || "Context") + ".Provider";
          case ca:
            var b = a2.render;
            b = b.displayName || b.name || "";
            return a2.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
          case ea:
            return F(a2.type);
          case ha:
            return F(a2._render);
          case fa:
            b = a2._payload;
            a2 = a2._init;
            try {
              return F(a2(b));
            } catch (c3) {
            }
        }
      return null;
    }
    var ma2 = n2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var na = {};
    function I(a2, b) {
      for (var c3 = a2._threadCount | 0; c3 <= b; c3++)
        a2[c3] = a2._currentValue2, a2._threadCount = c3 + 1;
    }
    function oa(a2, b, c3, d2) {
      if (d2 && (d2 = a2.contextType, typeof d2 === "object" && d2 !== null))
        return I(d2, c3), d2[c3];
      if (a2 = a2.contextTypes) {
        c3 = {};
        for (var f2 in a2)
          c3[f2] = b[f2];
        b = c3;
      } else
        b = na;
      return b;
    }
    for (var J = new Uint16Array(16), K = 0; 15 > K; K++)
      J[K] = K + 1;
    J[15] = 0;
    var pa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var qa = Object.prototype.hasOwnProperty;
    var ra = {};
    var sa = {};
    function ta(a2) {
      if (qa.call(sa, a2))
        return true;
      if (qa.call(ra, a2))
        return false;
      if (pa.test(a2))
        return sa[a2] = true;
      ra[a2] = true;
      return false;
    }
    function ua(a2, b, c3, d2) {
      if (c3 !== null && c3.type === 0)
        return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d2)
            return false;
          if (c3 !== null)
            return !c3.acceptsBooleans;
          a2 = a2.toLowerCase().slice(0, 5);
          return a2 !== "data-" && a2 !== "aria-";
        default:
          return false;
      }
    }
    function va(a2, b, c3, d2) {
      if (b === null || typeof b === "undefined" || ua(a2, b, c3, d2))
        return true;
      if (d2)
        return false;
      if (c3 !== null)
        switch (c3.type) {
          case 3:
            return !b;
          case 4:
            return b === false;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
      return false;
    }
    function M(a2, b, c3, d2, f2, h2, t2) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4;
      this.attributeName = d2;
      this.attributeNamespace = f2;
      this.mustUseProperty = c3;
      this.propertyName = a2;
      this.type = b;
      this.sanitizeURL = h2;
      this.removeEmptyString = t2;
    }
    var N = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
      N[a2] = new M(a2, 0, false, a2, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
      var b = a2[0];
      N[b] = new M(b, 1, false, a2[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
      N[a2] = new M(a2, 2, false, a2.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
      N[a2] = new M(a2, 2, false, a2, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
      N[a2] = new M(a2, 3, false, a2.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
      N[a2] = new M(a2, 3, true, a2, null, false, false);
    });
    ["capture", "download"].forEach(function(a2) {
      N[a2] = new M(a2, 4, false, a2, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a2) {
      N[a2] = new M(a2, 6, false, a2, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a2) {
      N[a2] = new M(a2, 5, false, a2.toLowerCase(), null, false, false);
    });
    var wa = /[\-:]([a-z])/g;
    function xa(a2) {
      return a2[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
      var b = a2.replace(wa, xa);
      N[b] = new M(b, 1, false, a2, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
      var b = a2.replace(wa, xa);
      N[b] = new M(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
      var b = a2.replace(wa, xa);
      N[b] = new M(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a2) {
      N[a2] = new M(a2, 1, false, a2.toLowerCase(), null, false, false);
    });
    N.xlinkHref = new M("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a2) {
      N[a2] = new M(a2, 1, false, a2.toLowerCase(), null, true, true);
    });
    var ya = /["'&<>]/;
    function O(a2) {
      if (typeof a2 === "boolean" || typeof a2 === "number")
        return "" + a2;
      a2 = "" + a2;
      var b = ya.exec(a2);
      if (b) {
        var c3 = "", d2, f2 = 0;
        for (d2 = b.index; d2 < a2.length; d2++) {
          switch (a2.charCodeAt(d2)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f2 !== d2 && (c3 += a2.substring(f2, d2));
          f2 = d2 + 1;
          c3 += b;
        }
        a2 = f2 !== d2 ? c3 + a2.substring(f2, d2) : c3;
      }
      return a2;
    }
    function za(a2, b) {
      var c3 = N.hasOwnProperty(a2) ? N[a2] : null;
      var d2;
      if (d2 = a2 !== "style")
        d2 = c3 !== null ? c3.type === 0 : !(2 < a2.length) || a2[0] !== "o" && a2[0] !== "O" || a2[1] !== "n" && a2[1] !== "N" ? false : true;
      if (d2 || va(a2, b, c3, false))
        return "";
      if (c3 !== null) {
        a2 = c3.attributeName;
        d2 = c3.type;
        if (d2 === 3 || d2 === 4 && b === true)
          return a2 + '=""';
        c3.sanitizeURL && (b = "" + b);
        return a2 + '="' + (O(b) + '"');
      }
      return ta(a2) ? a2 + '="' + (O(b) + '"') : "";
    }
    function Aa(a2, b) {
      return a2 === b && (a2 !== 0 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
    }
    var Ba = typeof Object.is === "function" ? Object.is : Aa;
    var P = null;
    var Q = null;
    var R = null;
    var S = false;
    var T = false;
    var U = null;
    var V = 0;
    function W() {
      if (P === null)
        throw Error(p2(321));
      return P;
    }
    function Ca() {
      if (0 < V)
        throw Error(p2(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function Da() {
      R === null ? Q === null ? (S = false, Q = R = Ca()) : (S = true, R = Q) : R.next === null ? (S = false, R = R.next = Ca()) : (S = true, R = R.next);
      return R;
    }
    function Ea(a2, b, c3, d2) {
      for (; T; )
        T = false, V += 1, R = null, c3 = a2(b, d2);
      Fa();
      return c3;
    }
    function Fa() {
      P = null;
      T = false;
      Q = null;
      V = 0;
      R = U = null;
    }
    function Ga(a2, b) {
      return typeof b === "function" ? b(a2) : b;
    }
    function Ha(a2, b, c3) {
      P = W();
      R = Da();
      if (S) {
        var d2 = R.queue;
        b = d2.dispatch;
        if (U !== null && (c3 = U.get(d2), c3 !== void 0)) {
          U.delete(d2);
          d2 = R.memoizedState;
          do
            d2 = a2(d2, c3.action), c3 = c3.next;
          while (c3 !== null);
          R.memoizedState = d2;
          return [d2, b];
        }
        return [R.memoizedState, b];
      }
      a2 = a2 === Ga ? typeof b === "function" ? b() : b : c3 !== void 0 ? c3(b) : b;
      R.memoizedState = a2;
      a2 = R.queue = { last: null, dispatch: null };
      a2 = a2.dispatch = Ia.bind(null, P, a2);
      return [R.memoizedState, a2];
    }
    function Ja(a2, b) {
      P = W();
      R = Da();
      b = b === void 0 ? null : b;
      if (R !== null) {
        var c3 = R.memoizedState;
        if (c3 !== null && b !== null) {
          var d2 = c3[1];
          a:
            if (d2 === null)
              d2 = false;
            else {
              for (var f2 = 0; f2 < d2.length && f2 < b.length; f2++)
                if (!Ba(b[f2], d2[f2])) {
                  d2 = false;
                  break a;
                }
              d2 = true;
            }
          if (d2)
            return c3[0];
        }
      }
      a2 = a2();
      R.memoizedState = [a2, b];
      return a2;
    }
    function Ia(a2, b, c3) {
      if (!(25 > V))
        throw Error(p2(301));
      if (a2 === P)
        if (T = true, a2 = { action: c3, next: null }, U === null && (U = new Map()), c3 = U.get(b), c3 === void 0)
          U.set(b, a2);
        else {
          for (b = c3; b.next !== null; )
            b = b.next;
          b.next = a2;
        }
    }
    function Ka() {
    }
    var X2 = null;
    var La = { readContext: function(a2) {
      var b = X2.threadID;
      I(a2, b);
      return a2[b];
    }, useContext: function(a2) {
      W();
      var b = X2.threadID;
      I(a2, b);
      return a2[b];
    }, useMemo: Ja, useReducer: Ha, useRef: function(a2) {
      P = W();
      R = Da();
      var b = R.memoizedState;
      return b === null ? (a2 = { current: a2 }, R.memoizedState = a2) : b;
    }, useState: function(a2) {
      return Ha(Ga, a2);
    }, useLayoutEffect: function() {
    }, useCallback: function(a2, b) {
      return Ja(function() {
        return a2;
      }, b);
    }, useImperativeHandle: Ka, useEffect: Ka, useDebugValue: Ka, useDeferredValue: function(a2) {
      W();
      return a2;
    }, useTransition: function() {
      W();
      return [function(a2) {
        a2();
      }, false];
    }, useOpaqueIdentifier: function() {
      return (X2.identifierPrefix || "") + "R:" + (X2.uniqueID++).toString(36);
    }, useMutableSource: function(a2, b) {
      W();
      return b(a2._source);
    } };
    var Ma = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
    function Na(a2) {
      switch (a2) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    var Oa = { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true };
    var Pa = l2({ menuitem: true }, Oa);
    var Y2 = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var Qa = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Y2).forEach(function(a2) {
      Qa.forEach(function(b) {
        b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
        Y2[b] = Y2[a2];
      });
    });
    var Ra = /([A-Z])/g;
    var Sa = /^ms-/;
    var Z = n2.Children.toArray;
    var Ta = ma2.ReactCurrentDispatcher;
    var Ua = { listing: true, pre: true, textarea: true };
    var Va = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Wa = {};
    var Xa = {};
    function Ya(a2) {
      if (a2 === void 0 || a2 === null)
        return a2;
      var b = "";
      n2.Children.forEach(a2, function(a3) {
        a3 != null && (b += a3);
      });
      return b;
    }
    var Za = Object.prototype.hasOwnProperty;
    var $a = { children: null, dangerouslySetInnerHTML: null, suppressContentEditableWarning: null, suppressHydrationWarning: null };
    function ab(a2, b) {
      if (a2 === void 0)
        throw Error(p2(152, F(b) || "Component"));
    }
    function bb2(a2, b, c3) {
      function d2(d3, h3) {
        var e3 = h3.prototype && h3.prototype.isReactComponent, f3 = oa(h3, b, c3, e3), t2 = [], g2 = false, m4 = { isMounted: function() {
          return false;
        }, enqueueForceUpdate: function() {
          if (t2 === null)
            return null;
        }, enqueueReplaceState: function(a3, b2) {
          g2 = true;
          t2 = [b2];
        }, enqueueSetState: function(a3, b2) {
          if (t2 === null)
            return null;
          t2.push(b2);
        } };
        if (e3) {
          if (e3 = new h3(d3.props, f3, m4), typeof h3.getDerivedStateFromProps === "function") {
            var k = h3.getDerivedStateFromProps.call(null, d3.props, e3.state);
            k != null && (e3.state = l2({}, e3.state, k));
          }
        } else if (P = {}, e3 = h3(d3.props, f3, m4), e3 = Ea(h3, d3.props, e3, f3), e3 == null || e3.render == null) {
          a2 = e3;
          ab(a2, h3);
          return;
        }
        e3.props = d3.props;
        e3.context = f3;
        e3.updater = m4;
        m4 = e3.state;
        m4 === void 0 && (e3.state = m4 = null);
        if (typeof e3.UNSAFE_componentWillMount === "function" || typeof e3.componentWillMount === "function")
          if (typeof e3.componentWillMount === "function" && typeof h3.getDerivedStateFromProps !== "function" && e3.componentWillMount(), typeof e3.UNSAFE_componentWillMount === "function" && typeof h3.getDerivedStateFromProps !== "function" && e3.UNSAFE_componentWillMount(), t2.length) {
            m4 = t2;
            var v2 = g2;
            t2 = null;
            g2 = false;
            if (v2 && m4.length === 1)
              e3.state = m4[0];
            else {
              k = v2 ? m4[0] : e3.state;
              var H = true;
              for (v2 = v2 ? 1 : 0; v2 < m4.length; v2++) {
                var x2 = m4[v2];
                x2 = typeof x2 === "function" ? x2.call(e3, k, d3.props, f3) : x2;
                x2 != null && (H ? (H = false, k = l2({}, k, x2)) : l2(k, x2));
              }
              e3.state = k;
            }
          } else
            t2 = null;
        a2 = e3.render();
        ab(a2, h3);
        if (typeof e3.getChildContext === "function" && (d3 = h3.childContextTypes, typeof d3 === "object")) {
          var y3 = e3.getChildContext();
          for (var A in y3)
            if (!(A in d3))
              throw Error(p2(108, F(h3) || "Unknown", A));
        }
        y3 && (b = l2({}, b, y3));
      }
      for (; n2.isValidElement(a2); ) {
        var f2 = a2, h2 = f2.type;
        if (typeof h2 !== "function")
          break;
        d2(f2, h2);
      }
      return { child: a2, context: b };
    }
    var cb = function() {
      function a2(a3, b2, f2) {
        n2.isValidElement(a3) ? a3.type !== r4 ? a3 = [a3] : (a3 = a3.props.children, a3 = n2.isValidElement(a3) ? [a3] : Z(a3)) : a3 = Z(a3);
        a3 = { type: null, domNamespace: Ma.html, children: a3, childIndex: 0, context: na, footer: "" };
        var c3 = J[0];
        if (c3 === 0) {
          var d2 = J;
          c3 = d2.length;
          var g2 = 2 * c3;
          if (!(65536 >= g2))
            throw Error(p2(304));
          var e3 = new Uint16Array(g2);
          e3.set(d2);
          J = e3;
          J[0] = c3 + 1;
          for (d2 = c3; d2 < g2 - 1; d2++)
            J[d2] = d2 + 1;
          J[g2 - 1] = 0;
        } else
          J[0] = J[c3];
        this.threadID = c3;
        this.stack = [a3];
        this.exhausted = false;
        this.currentSelectValue = null;
        this.previousWasTextNode = false;
        this.makeStaticMarkup = b2;
        this.suspenseDepth = 0;
        this.contextIndex = -1;
        this.contextStack = [];
        this.contextValueStack = [];
        this.uniqueID = 0;
        this.identifierPrefix = f2 && f2.identifierPrefix || "";
      }
      var b = a2.prototype;
      b.destroy = function() {
        if (!this.exhausted) {
          this.exhausted = true;
          this.clearProviders();
          var a3 = this.threadID;
          J[a3] = J[0];
          J[0] = a3;
        }
      };
      b.pushProvider = function(a3) {
        var b2 = ++this.contextIndex, c3 = a3.type._context, h2 = this.threadID;
        I(c3, h2);
        var t2 = c3[h2];
        this.contextStack[b2] = c3;
        this.contextValueStack[b2] = t2;
        c3[h2] = a3.props.value;
      };
      b.popProvider = function() {
        var a3 = this.contextIndex, b2 = this.contextStack[a3], f2 = this.contextValueStack[a3];
        this.contextStack[a3] = null;
        this.contextValueStack[a3] = null;
        this.contextIndex--;
        b2[this.threadID] = f2;
      };
      b.clearProviders = function() {
        for (var a3 = this.contextIndex; 0 <= a3; a3--)
          this.contextStack[a3][this.threadID] = this.contextValueStack[a3];
      };
      b.read = function(a3) {
        if (this.exhausted)
          return null;
        var b2 = X2;
        X2 = this;
        var c3 = Ta.current;
        Ta.current = La;
        try {
          for (var h2 = [""], t2 = false; h2[0].length < a3; ) {
            if (this.stack.length === 0) {
              this.exhausted = true;
              var g2 = this.threadID;
              J[g2] = J[0];
              J[0] = g2;
              break;
            }
            var e3 = this.stack[this.stack.length - 1];
            if (t2 || e3.childIndex >= e3.children.length) {
              var L = e3.footer;
              L !== "" && (this.previousWasTextNode = false);
              this.stack.pop();
              if (e3.type === "select")
                this.currentSelectValue = null;
              else if (e3.type != null && e3.type.type != null && e3.type.type.$$typeof === B)
                this.popProvider(e3.type);
              else if (e3.type === D) {
                this.suspenseDepth--;
                var G = h2.pop();
                if (t2) {
                  t2 = false;
                  var C = e3.fallbackFrame;
                  if (!C)
                    throw Error(p2(303));
                  this.stack.push(C);
                  h2[this.suspenseDepth] += "<!--$!-->";
                  continue;
                } else
                  h2[this.suspenseDepth] += G;
              }
              h2[this.suspenseDepth] += L;
            } else {
              var m4 = e3.children[e3.childIndex++], k = "";
              try {
                k += this.render(m4, e3.context, e3.domNamespace);
              } catch (v2) {
                if (v2 != null && typeof v2.then === "function")
                  throw Error(p2(294));
                throw v2;
              } finally {
              }
              h2.length <= this.suspenseDepth && h2.push("");
              h2[this.suspenseDepth] += k;
            }
          }
          return h2[0];
        } finally {
          Ta.current = c3, X2 = b2, Fa();
        }
      };
      b.render = function(a3, b2, f2) {
        if (typeof a3 === "string" || typeof a3 === "number") {
          f2 = "" + a3;
          if (f2 === "")
            return "";
          if (this.makeStaticMarkup)
            return O(f2);
          if (this.previousWasTextNode)
            return "<!-- -->" + O(f2);
          this.previousWasTextNode = true;
          return O(f2);
        }
        b2 = bb2(a3, b2, this.threadID);
        a3 = b2.child;
        b2 = b2.context;
        if (a3 === null || a3 === false)
          return "";
        if (!n2.isValidElement(a3)) {
          if (a3 != null && a3.$$typeof != null) {
            f2 = a3.$$typeof;
            if (f2 === q2)
              throw Error(p2(257));
            throw Error(p2(258, f2.toString()));
          }
          a3 = Z(a3);
          this.stack.push({ type: null, domNamespace: f2, children: a3, childIndex: 0, context: b2, footer: "" });
          return "";
        }
        var c3 = a3.type;
        if (typeof c3 === "string")
          return this.renderDOM(a3, b2, f2);
        switch (c3) {
          case la:
          case ka:
          case u:
          case z:
          case da:
          case r4:
            return a3 = Z(a3.props.children), this.stack.push({
              type: null,
              domNamespace: f2,
              children: a3,
              childIndex: 0,
              context: b2,
              footer: ""
            }), "";
          case D:
            throw Error(p2(294));
          case ja:
            throw Error(p2(343));
        }
        if (typeof c3 === "object" && c3 !== null)
          switch (c3.$$typeof) {
            case ca:
              P = {};
              var d2 = c3.render(a3.props, a3.ref);
              d2 = Ea(c3.render, a3.props, d2, a3.ref);
              d2 = Z(d2);
              this.stack.push({ type: null, domNamespace: f2, children: d2, childIndex: 0, context: b2, footer: "" });
              return "";
            case ea:
              return a3 = [n2.createElement(c3.type, l2({ ref: a3.ref }, a3.props))], this.stack.push({ type: null, domNamespace: f2, children: a3, childIndex: 0, context: b2, footer: "" }), "";
            case B:
              return c3 = Z(a3.props.children), f2 = { type: a3, domNamespace: f2, children: c3, childIndex: 0, context: b2, footer: "" }, this.pushProvider(a3), this.stack.push(f2), "";
            case ba:
              c3 = a3.type;
              d2 = a3.props;
              var g2 = this.threadID;
              I(c3, g2);
              c3 = Z(d2.children(c3[g2]));
              this.stack.push({ type: a3, domNamespace: f2, children: c3, childIndex: 0, context: b2, footer: "" });
              return "";
            case ia:
              throw Error(p2(338));
            case fa:
              return c3 = a3.type, d2 = c3._init, c3 = d2(c3._payload), a3 = [n2.createElement(c3, l2({ ref: a3.ref }, a3.props))], this.stack.push({
                type: null,
                domNamespace: f2,
                children: a3,
                childIndex: 0,
                context: b2,
                footer: ""
              }), "";
          }
        throw Error(p2(130, c3 == null ? c3 : typeof c3, ""));
      };
      b.renderDOM = function(a3, b2, f2) {
        var c3 = a3.type.toLowerCase();
        f2 === Ma.html && Na(c3);
        if (!Wa.hasOwnProperty(c3)) {
          if (!Va.test(c3))
            throw Error(p2(65, c3));
          Wa[c3] = true;
        }
        var d2 = a3.props;
        if (c3 === "input")
          d2 = l2({ type: void 0 }, d2, { defaultChecked: void 0, defaultValue: void 0, value: d2.value != null ? d2.value : d2.defaultValue, checked: d2.checked != null ? d2.checked : d2.defaultChecked });
        else if (c3 === "textarea") {
          var g2 = d2.value;
          if (g2 == null) {
            g2 = d2.defaultValue;
            var e3 = d2.children;
            if (e3 != null) {
              if (g2 != null)
                throw Error(p2(92));
              if (Array.isArray(e3)) {
                if (!(1 >= e3.length))
                  throw Error(p2(93));
                e3 = e3[0];
              }
              g2 = "" + e3;
            }
            g2 == null && (g2 = "");
          }
          d2 = l2({}, d2, { value: void 0, children: "" + g2 });
        } else if (c3 === "select")
          this.currentSelectValue = d2.value != null ? d2.value : d2.defaultValue, d2 = l2({}, d2, { value: void 0 });
        else if (c3 === "option") {
          e3 = this.currentSelectValue;
          var L = Ya(d2.children);
          if (e3 != null) {
            var G = d2.value != null ? d2.value + "" : L;
            g2 = false;
            if (Array.isArray(e3))
              for (var C = 0; C < e3.length; C++) {
                if ("" + e3[C] === G) {
                  g2 = true;
                  break;
                }
              }
            else
              g2 = "" + e3 === G;
            d2 = l2({ selected: void 0, children: void 0 }, d2, { selected: g2, children: L });
          }
        }
        if (g2 = d2) {
          if (Pa[c3] && (g2.children != null || g2.dangerouslySetInnerHTML != null))
            throw Error(p2(137, c3));
          if (g2.dangerouslySetInnerHTML != null) {
            if (g2.children != null)
              throw Error(p2(60));
            if (!(typeof g2.dangerouslySetInnerHTML === "object" && "__html" in g2.dangerouslySetInnerHTML))
              throw Error(p2(61));
          }
          if (g2.style != null && typeof g2.style !== "object")
            throw Error(p2(62));
        }
        g2 = d2;
        e3 = this.makeStaticMarkup;
        L = this.stack.length === 1;
        G = "<" + a3.type;
        b:
          if (c3.indexOf("-") === -1)
            C = typeof g2.is === "string";
          else
            switch (c3) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                C = false;
                break b;
              default:
                C = true;
            }
        for (w2 in g2)
          if (Za.call(g2, w2)) {
            var m4 = g2[w2];
            if (m4 != null) {
              if (w2 === "style") {
                var k = void 0, v2 = "", H = "";
                for (k in m4)
                  if (m4.hasOwnProperty(k)) {
                    var x2 = k.indexOf("--") === 0, y3 = m4[k];
                    if (y3 != null) {
                      if (x2)
                        var A = k;
                      else if (A = k, Xa.hasOwnProperty(A))
                        A = Xa[A];
                      else {
                        var eb2 = A.replace(Ra, "-$1").toLowerCase().replace(Sa, "-ms-");
                        A = Xa[A] = eb2;
                      }
                      v2 += H + A + ":";
                      H = k;
                      x2 = y3 == null || typeof y3 === "boolean" || y3 === "" ? "" : x2 || typeof y3 !== "number" || y3 === 0 || Y2.hasOwnProperty(H) && Y2[H] ? ("" + y3).trim() : y3 + "px";
                      v2 += x2;
                      H = ";";
                    }
                  }
                m4 = v2 || null;
              }
              k = null;
              C ? $a.hasOwnProperty(w2) || (k = w2, k = ta(k) && m4 != null ? k + '="' + (O(m4) + '"') : "") : k = za(w2, m4);
              k && (G += " " + k);
            }
          }
        e3 || L && (G += ' data-reactroot=""');
        var w2 = G;
        g2 = "";
        Oa.hasOwnProperty(c3) ? w2 += "/>" : (w2 += ">", g2 = "</" + a3.type + ">");
        a: {
          e3 = d2.dangerouslySetInnerHTML;
          if (e3 != null) {
            if (e3.__html != null) {
              e3 = e3.__html;
              break a;
            }
          } else if (e3 = d2.children, typeof e3 === "string" || typeof e3 === "number") {
            e3 = O(e3);
            break a;
          }
          e3 = null;
        }
        e3 != null ? (d2 = [], Ua.hasOwnProperty(c3) && e3.charAt(0) === "\n" && (w2 += "\n"), w2 += e3) : d2 = Z(d2.children);
        a3 = a3.type;
        f2 = f2 == null || f2 === "http://www.w3.org/1999/xhtml" ? Na(a3) : f2 === "http://www.w3.org/2000/svg" && a3 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : f2;
        this.stack.push({ domNamespace: f2, type: c3, children: d2, childIndex: 0, context: b2, footer: g2 });
        this.previousWasTextNode = false;
        return w2;
      };
      return a2;
    }();
    function db(a2, b) {
      a2.prototype = Object.create(b.prototype);
      a2.prototype.constructor = a2;
      a2.__proto__ = b;
    }
    var fb = function(a2) {
      function b(b2, c4, h2) {
        var d2 = a2.call(this, {}) || this;
        d2.partialRenderer = new cb(b2, c4, h2);
        return d2;
      }
      db(b, a2);
      var c3 = b.prototype;
      c3._destroy = function(a3, b2) {
        this.partialRenderer.destroy();
        b2(a3);
      };
      c3._read = function(a3) {
        try {
          this.push(this.partialRenderer.read(a3));
        } catch (f2) {
          this.destroy(f2);
        }
      };
      return b;
    }(aa.Readable);
    exports2.renderToNodeStream = function(a2, b) {
      return new fb(a2, false, b);
    };
    exports2.renderToStaticMarkup = function(a2, b) {
      a2 = new cb(a2, true, b);
      try {
        return a2.read(Infinity);
      } finally {
        a2.destroy();
      }
    };
    exports2.renderToStaticNodeStream = function(a2, b) {
      return new fb(a2, true, b);
    };
    exports2.renderToString = function(a2, b) {
      a2 = new cb(a2, false, b);
      try {
        return a2.read(Infinity);
      } finally {
        a2.destroy();
      }
    };
    exports2.version = "17.0.2";
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.development.js
var require_react_dom_server_node_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React4 = require_react();
        var _assign = require_object_assign();
        var stream = require("stream");
        var ReactVersion = "17.0.2";
        function formatProdErrorMessage(code) {
          var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;
          for (var i2 = 1; i2 < arguments.length; i2++) {
            url += "&args[]=" + encodeURIComponent(arguments[i2]);
          }
          return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        }
        var ReactSharedInternals = React4.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format2) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format2, args);
          }
        }
        function error(format2) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format2, args);
          }
        }
        function printWarning(level, format2, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format2 += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format2);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getContextName(type2) {
          return type2.displayName || "Context";
        }
        function getComponentName(type2) {
          if (type2 == null) {
            return null;
          }
          {
            if (typeof type2.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type2 === "function") {
            return type2.displayName || type2.name || null;
          }
          if (typeof type2 === "string") {
            return type2;
          }
          switch (type2) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type2 === "object") {
            switch (type2.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type2;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type2;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type2, type2.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type2.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type2._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type2;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return getComponentName(init2(payload));
                } catch (x2) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var enableSuspenseServerRenderer = false;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props2 = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props2,
                log: props2,
                warn: props2,
                error: props2,
                group: props2,
                groupCollapsed: props2,
                groupEnd: props2
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props2 = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: _assign({}, props2, {
                  value: prevLog
                }),
                info: _assign({}, props2, {
                  value: prevInfo
                }),
                warn: _assign({}, props2, {
                  value: prevWarn
                }),
                error: _assign({}, props2, {
                  value: prevError
                }),
                group: _assign({}, props2, {
                  value: prevGroup
                }),
                groupCollapsed: _assign({}, props2, {
                  value: prevGroupCollapsed
                }),
                groupEnd: _assign({}, props2, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x2) {
                var match = x2.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame2 = componentFrameCache.get(fn);
            if (frame2 !== void 0) {
              return frame2;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x2) {
                  control = x2;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x2) {
                  control = x2;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x2) {
                control = x2;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c3 = controlLines.length - 1;
              while (s >= 1 && c3 >= 0 && sampleLines[s] !== controlLines[c3]) {
                c3--;
              }
              for (; s >= 1 && c3 >= 0; s--, c3--) {
                if (sampleLines[s] !== controlLines[c3]) {
                  if (s !== 1 || c3 !== 1) {
                    do {
                      s--;
                      c3--;
                      if (c3 < 0 || sampleLines[s] !== controlLines[c3]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c3 >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type2, source, ownerFn) {
          if (type2 == null) {
            return "";
          }
          if (typeof type2 === "function") {
            {
              return describeNativeComponentFrame(type2, shouldConstruct(type2));
            }
          }
          if (typeof type2 === "string") {
            return describeBuiltInComponentFrame(type2);
          }
          switch (type2) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type2 === "object") {
            switch (type2.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type2.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type2.type, source, ownerFn);
              case REACT_BLOCK_TYPE:
                return describeFunctionComponentFrame(type2._render);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type2;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
                } catch (x2) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(Object.prototype.hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex2) {
                  error$1 = ex2;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutInvalidateContextType = new Set();
        }
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function maskContext(type2, context) {
          var contextTypes = type2.contextTypes;
          if (!contextTypes) {
            return emptyObject;
          }
          var maskedContext = {};
          for (var contextName in contextTypes) {
            maskedContext[contextName] = context[contextName];
          }
          return maskedContext;
        }
        function checkContextTypes(typeSpecs, values, location) {
          {
            checkPropTypes(typeSpecs, values, location, "Component");
          }
        }
        function validateContextBounds(context, threadID) {
          for (var i2 = context._threadCount | 0; i2 <= threadID; i2++) {
            context[i2] = context._currentValue2;
            context._threadCount = i2 + 1;
          }
        }
        function processContext(type2, context, threadID, isClass) {
          if (isClass) {
            var contextType = type2.contextType;
            {
              if ("contextType" in type2) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(type2)) {
                  didWarnAboutInvalidateContextType.add(type2);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type2) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              validateContextBounds(contextType, threadID);
              return contextType[threadID];
            }
            {
              var maskedContext = maskContext(type2, context);
              {
                if (type2.contextTypes) {
                  checkContextTypes(type2.contextTypes, maskedContext, "context");
                }
              }
              return maskedContext;
            }
          } else {
            {
              var _maskedContext = maskContext(type2, context);
              {
                if (type2.contextTypes) {
                  checkContextTypes(type2.contextTypes, _maskedContext, "context");
                }
              }
              return _maskedContext;
            }
          }
        }
        var nextAvailableThreadIDs = new Uint16Array(16);
        for (var i = 0; i < 15; i++) {
          nextAvailableThreadIDs[i] = i + 1;
        }
        nextAvailableThreadIDs[15] = 0;
        function growThreadCountAndReturnNextAvailable() {
          var oldArray = nextAvailableThreadIDs;
          var oldSize = oldArray.length;
          var newSize = oldSize * 2;
          if (!(newSize <= 65536)) {
            {
              throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
            }
          }
          var newArray = new Uint16Array(newSize);
          newArray.set(oldArray);
          nextAvailableThreadIDs = newArray;
          nextAvailableThreadIDs[0] = oldSize + 1;
          for (var _i = oldSize; _i < newSize - 1; _i++) {
            nextAvailableThreadIDs[_i] = _i + 1;
          }
          nextAvailableThreadIDs[newSize - 1] = 0;
          return oldSize;
        }
        function allocThreadID() {
          var nextID = nextAvailableThreadIDs[0];
          if (nextID === 0) {
            return growThreadCountAndReturnNextAvailable();
          }
          nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
          return nextID;
        }
        function freeThreadID(id2) {
          nextAvailableThreadIDs[id2] = nextAvailableThreadIDs[0];
          nextAvailableThreadIDs[0] = id2;
        }
        var RESERVED = 0;
        var STRING = 1;
        var BOOLEANISH_STRING = 2;
        var BOOLEAN = 3;
        var OVERLOADED_BOOLEAN = 4;
        var NUMERIC = 5;
        var POSITIVE_NUMERIC = 6;
        var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
        var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
        var ROOT_ATTRIBUTE_NAME = "data-reactroot";
        var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var illegalAttributeNameCache = {};
        var validatedAttributeNameCache = {};
        function isAttributeNameSafe(attributeName) {
          if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
            return true;
          }
          if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
            return false;
          }
          if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
            validatedAttributeNameCache[attributeName] = true;
            return true;
          }
          illegalAttributeNameCache[attributeName] = true;
          {
            error("Invalid attribute name: `%s`", attributeName);
          }
          return false;
        }
        function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null) {
            return propertyInfo.type === RESERVED;
          }
          if (isCustomComponentTag) {
            return false;
          }
          if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
            return true;
          }
          return false;
        }
        function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null && propertyInfo.type === RESERVED) {
            return false;
          }
          switch (typeof value) {
            case "function":
            case "symbol":
              return true;
            case "boolean": {
              if (isCustomComponentTag) {
                return false;
              }
              if (propertyInfo !== null) {
                return !propertyInfo.acceptsBooleans;
              } else {
                var prefix2 = name.toLowerCase().slice(0, 5);
                return prefix2 !== "data-" && prefix2 !== "aria-";
              }
            }
            default:
              return false;
          }
        }
        function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
          if (value === null || typeof value === "undefined") {
            return true;
          }
          if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
            return true;
          }
          if (isCustomComponentTag) {
            return false;
          }
          if (propertyInfo !== null) {
            switch (propertyInfo.type) {
              case BOOLEAN:
                return !value;
              case OVERLOADED_BOOLEAN:
                return value === false;
              case NUMERIC:
                return isNaN(value);
              case POSITIVE_NUMERIC:
                return isNaN(value) || value < 1;
            }
          }
          return false;
        }
        function getPropertyInfo(name) {
          return properties2.hasOwnProperty(name) ? properties2[name] : null;
        }
        function PropertyInfoRecord(name, type2, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
          this.acceptsBooleans = type2 === BOOLEANISH_STRING || type2 === BOOLEAN || type2 === OVERLOADED_BOOLEAN;
          this.attributeName = attributeName;
          this.attributeNamespace = attributeNamespace;
          this.mustUseProperty = mustUseProperty;
          this.propertyName = name;
          this.type = type2;
          this.sanitizeURL = sanitizeURL2;
          this.removeEmptyString = removeEmptyString;
        }
        var properties2 = {};
        var reservedProps = [
          "children",
          "dangerouslySetInnerHTML",
          "defaultValue",
          "defaultChecked",
          "innerHTML",
          "suppressContentEditableWarning",
          "suppressHydrationWarning",
          "style"
        ];
        reservedProps.forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
        });
        [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
          var name = _ref[0], attributeName = _ref[1];
          properties2[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
        });
        ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
        });
        ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
        });
        [
          "allowFullScreen",
          "async",
          "autoFocus",
          "autoPlay",
          "controls",
          "default",
          "defer",
          "disabled",
          "disablePictureInPicture",
          "disableRemotePlayback",
          "formNoValidate",
          "hidden",
          "loop",
          "noModule",
          "noValidate",
          "open",
          "playsInline",
          "readOnly",
          "required",
          "reversed",
          "scoped",
          "seamless",
          "itemScope"
        ].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
        });
        [
          "checked",
          "multiple",
          "muted",
          "selected"
        ].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
        });
        [
          "capture",
          "download"
        ].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
        });
        [
          "cols",
          "rows",
          "size",
          "span"
        ].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
        });
        ["rowSpan", "start"].forEach(function(name) {
          properties2[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
        });
        var CAMELIZE = /[\-\:]([a-z])/g;
        var capitalize = function(token) {
          return token[1].toUpperCase();
        };
        [
          "accent-height",
          "alignment-baseline",
          "arabic-form",
          "baseline-shift",
          "cap-height",
          "clip-path",
          "clip-rule",
          "color-interpolation",
          "color-interpolation-filters",
          "color-profile",
          "color-rendering",
          "dominant-baseline",
          "enable-background",
          "fill-opacity",
          "fill-rule",
          "flood-color",
          "flood-opacity",
          "font-family",
          "font-size",
          "font-size-adjust",
          "font-stretch",
          "font-style",
          "font-variant",
          "font-weight",
          "glyph-name",
          "glyph-orientation-horizontal",
          "glyph-orientation-vertical",
          "horiz-adv-x",
          "horiz-origin-x",
          "image-rendering",
          "letter-spacing",
          "lighting-color",
          "marker-end",
          "marker-mid",
          "marker-start",
          "overline-position",
          "overline-thickness",
          "paint-order",
          "panose-1",
          "pointer-events",
          "rendering-intent",
          "shape-rendering",
          "stop-color",
          "stop-opacity",
          "strikethrough-position",
          "strikethrough-thickness",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",
          "text-anchor",
          "text-decoration",
          "text-rendering",
          "underline-position",
          "underline-thickness",
          "unicode-bidi",
          "unicode-range",
          "units-per-em",
          "v-alphabetic",
          "v-hanging",
          "v-ideographic",
          "v-mathematical",
          "vector-effect",
          "vert-adv-y",
          "vert-origin-x",
          "vert-origin-y",
          "word-spacing",
          "writing-mode",
          "xmlns:xlink",
          "x-height"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties2[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
        });
        [
          "xlink:actuate",
          "xlink:arcrole",
          "xlink:role",
          "xlink:show",
          "xlink:title",
          "xlink:type"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties2[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
        });
        [
          "xml:base",
          "xml:lang",
          "xml:space"
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties2[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
        });
        ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
          properties2[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
        });
        var xlinkHref = "xlinkHref";
        properties2[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
        ["src", "href", "action", "formAction"].forEach(function(attributeName) {
          properties2[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
        });
        var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
        var didWarn = false;
        function sanitizeURL(url) {
          {
            if (!didWarn && isJavaScriptProtocol.test(url)) {
              didWarn = true;
              error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
            }
          }
        }
        var matchHtmlRegExp = /["'&<>]/;
        function escapeHtml(string) {
          var str = "" + string;
          var match = matchHtmlRegExp.exec(str);
          if (!match) {
            return str;
          }
          var escape;
          var html2 = "";
          var index;
          var lastIndex = 0;
          for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
              case 34:
                escape = "&quot;";
                break;
              case 38:
                escape = "&amp;";
                break;
              case 39:
                escape = "&#x27;";
                break;
              case 60:
                escape = "&lt;";
                break;
              case 62:
                escape = "&gt;";
                break;
              default:
                continue;
            }
            if (lastIndex !== index) {
              html2 += str.substring(lastIndex, index);
            }
            lastIndex = index + 1;
            html2 += escape;
          }
          return lastIndex !== index ? html2 + str.substring(lastIndex, index) : html2;
        }
        function escapeTextForBrowser(text) {
          if (typeof text === "boolean" || typeof text === "number") {
            return "" + text;
          }
          return escapeHtml(text);
        }
        function quoteAttributeValueForBrowser(value) {
          return '"' + escapeTextForBrowser(value) + '"';
        }
        function createMarkupForRoot() {
          return ROOT_ATTRIBUTE_NAME + '=""';
        }
        function createMarkupForProperty(name, value) {
          var propertyInfo = getPropertyInfo(name);
          if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, false)) {
            return "";
          }
          if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
            return "";
          }
          if (propertyInfo !== null) {
            var attributeName = propertyInfo.attributeName;
            var type2 = propertyInfo.type;
            if (type2 === BOOLEAN || type2 === OVERLOADED_BOOLEAN && value === true) {
              return attributeName + '=""';
            } else {
              if (propertyInfo.sanitizeURL) {
                value = "" + value;
                sanitizeURL(value);
              }
              return attributeName + "=" + quoteAttributeValueForBrowser(value);
            }
          } else if (isAttributeNameSafe(name)) {
            return name + "=" + quoteAttributeValueForBrowser(value);
          }
          return "";
        }
        function createMarkupForCustomAttribute(name, value) {
          if (!isAttributeNameSafe(name) || value == null) {
            return "";
          }
          return name + "=" + quoteAttributeValueForBrowser(value);
        }
        function is(x2, y3) {
          return x2 === y3 && (x2 !== 0 || 1 / x2 === 1 / y3) || x2 !== x2 && y3 !== y3;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var currentlyRenderingComponent = null;
        var firstWorkInProgressHook = null;
        var workInProgressHook = null;
        var isReRender = false;
        var didScheduleRenderPhaseUpdate = false;
        var renderPhaseUpdates = null;
        var numberOfReRenders = 0;
        var RE_RENDER_LIMIT = 25;
        var isInHookUserCodeInDev = false;
        var currentHookNameInDev;
        function resolveCurrentlyRenderingComponent() {
          if (!(currentlyRenderingComponent !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          {
            if (isInHookUserCodeInDev) {
              error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
            }
          }
          return currentlyRenderingComponent;
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
            }
          }
          for (var i2 = 0; i2 < prevDeps.length && i2 < nextDeps.length; i2++) {
            if (objectIs(nextDeps[i2], prevDeps[i2])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function createHook() {
          if (numberOfReRenders > 0) {
            {
              {
                throw Error("Rendered more hooks than during the previous render");
              }
            }
          }
          return {
            memoizedState: null,
            queue: null,
            next: null
          };
        }
        function createWorkInProgressHook() {
          if (workInProgressHook === null) {
            if (firstWorkInProgressHook === null) {
              isReRender = false;
              firstWorkInProgressHook = workInProgressHook = createHook();
            } else {
              isReRender = true;
              workInProgressHook = firstWorkInProgressHook;
            }
          } else {
            if (workInProgressHook.next === null) {
              isReRender = false;
              workInProgressHook = workInProgressHook.next = createHook();
            } else {
              isReRender = true;
              workInProgressHook = workInProgressHook.next;
            }
          }
          return workInProgressHook;
        }
        function prepareToUseHooks(componentIdentity) {
          currentlyRenderingComponent = componentIdentity;
          {
            isInHookUserCodeInDev = false;
          }
        }
        function finishHooks(Component, props2, children2, refOrContext) {
          while (didScheduleRenderPhaseUpdate) {
            didScheduleRenderPhaseUpdate = false;
            numberOfReRenders += 1;
            workInProgressHook = null;
            children2 = Component(props2, refOrContext);
          }
          resetHooksState();
          return children2;
        }
        function resetHooksState() {
          {
            isInHookUserCodeInDev = false;
          }
          currentlyRenderingComponent = null;
          didScheduleRenderPhaseUpdate = false;
          firstWorkInProgressHook = null;
          numberOfReRenders = 0;
          renderPhaseUpdates = null;
          workInProgressHook = null;
        }
        function readContext(context, observedBits) {
          var threadID = currentPartialRenderer.threadID;
          validateContextBounds(context, threadID);
          {
            if (isInHookUserCodeInDev) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          return context[threadID];
        }
        function useContext(context, observedBits) {
          {
            currentHookNameInDev = "useContext";
          }
          resolveCurrentlyRenderingComponent();
          var threadID = currentPartialRenderer.threadID;
          validateContextBounds(context, threadID);
          return context[threadID];
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function useState2(initialState) {
          {
            currentHookNameInDev = "useState";
          }
          return useReducer(basicStateReducer, initialState);
        }
        function useReducer(reducer, initialArg, init2) {
          {
            if (reducer !== basicStateReducer) {
              currentHookNameInDev = "useReducer";
            }
          }
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          if (isReRender) {
            var queue = workInProgressHook.queue;
            var dispatch2 = queue.dispatch;
            if (renderPhaseUpdates !== null) {
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate !== void 0) {
                renderPhaseUpdates.delete(queue);
                var newState = workInProgressHook.memoizedState;
                var update = firstRenderPhaseUpdate;
                do {
                  var action = update.action;
                  {
                    isInHookUserCodeInDev = true;
                  }
                  newState = reducer(newState, action);
                  {
                    isInHookUserCodeInDev = false;
                  }
                  update = update.next;
                } while (update !== null);
                workInProgressHook.memoizedState = newState;
                return [newState, dispatch2];
              }
            }
            return [workInProgressHook.memoizedState, dispatch2];
          } else {
            {
              isInHookUserCodeInDev = true;
            }
            var initialState;
            if (reducer === basicStateReducer) {
              initialState = typeof initialArg === "function" ? initialArg() : initialArg;
            } else {
              initialState = init2 !== void 0 ? init2(initialArg) : initialArg;
            }
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = initialState;
            var _queue = workInProgressHook.queue = {
              last: null,
              dispatch: null
            };
            var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
            return [workInProgressHook.memoizedState, _dispatch];
          }
        }
        function useMemo3(nextCreate, deps) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          if (workInProgressHook !== null) {
            var prevState = workInProgressHook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
          }
          {
            isInHookUserCodeInDev = true;
          }
          var nextValue = nextCreate();
          {
            isInHookUserCodeInDev = false;
          }
          workInProgressHook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function useRef2(initialValue) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var previousRef = workInProgressHook.memoizedState;
          if (previousRef === null) {
            var ref = {
              current: initialValue
            };
            {
              Object.seal(ref);
            }
            workInProgressHook.memoizedState = ref;
            return ref;
          } else {
            return previousRef;
          }
        }
        function useLayoutEffect(create2, inputs) {
          {
            currentHookNameInDev = "useLayoutEffect";
            error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
          }
        }
        function dispatchAction(componentIdentity, queue, action) {
          if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
            {
              throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
          }
          if (componentIdentity === currentlyRenderingComponent) {
            didScheduleRenderPhaseUpdate = true;
            var update = {
              action,
              next: null
            };
            if (renderPhaseUpdates === null) {
              renderPhaseUpdates = new Map();
            }
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate === void 0) {
              renderPhaseUpdates.set(queue, update);
            } else {
              var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
              while (lastRenderPhaseUpdate.next !== null) {
                lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
              }
              lastRenderPhaseUpdate.next = update;
            }
          }
        }
        function useCallback(callback, deps) {
          return useMemo3(function() {
            return callback;
          }, deps);
        }
        function useMutableSource(source, getSnapshot, subscribe) {
          resolveCurrentlyRenderingComponent();
          return getSnapshot(source._source);
        }
        function useDeferredValue(value) {
          resolveCurrentlyRenderingComponent();
          return value;
        }
        function useTransition() {
          resolveCurrentlyRenderingComponent();
          var startTransition = function(callback) {
            callback();
          };
          return [startTransition, false];
        }
        function useOpaqueIdentifier() {
          return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
        }
        function noop2() {
        }
        var currentPartialRenderer = null;
        function setCurrentPartialRenderer(renderer) {
          currentPartialRenderer = renderer;
        }
        var Dispatcher = {
          readContext,
          useContext,
          useMemo: useMemo3,
          useReducer,
          useRef: useRef2,
          useState: useState2,
          useLayoutEffect,
          useCallback,
          useImperativeHandle: noop2,
          useEffect: noop2,
          useDebugValue: noop2,
          useDeferredValue,
          useTransition,
          useOpaqueIdentifier,
          useMutableSource
        };
        var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        var Namespaces = {
          html: HTML_NAMESPACE,
          mathml: MATH_NAMESPACE,
          svg: SVG_NAMESPACE
        };
        function getIntrinsicNamespace(type2) {
          switch (type2) {
            case "svg":
              return SVG_NAMESPACE;
            case "math":
              return MATH_NAMESPACE;
            default:
              return HTML_NAMESPACE;
          }
        }
        function getChildNamespace(parentNamespace, type2) {
          if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
            return getIntrinsicNamespace(type2);
          }
          if (parentNamespace === SVG_NAMESPACE && type2 === "foreignObject") {
            return HTML_NAMESPACE;
          }
          return parentNamespace;
        }
        var hasReadOnlyValue = {
          button: true,
          checkbox: true,
          image: true,
          hidden: true,
          radio: true,
          reset: true,
          submit: true
        };
        function checkControlledValueProps(tagName, props2) {
          {
            if (!(hasReadOnlyValue[props2.type] || props2.onChange || props2.onInput || props2.readOnly || props2.disabled || props2.value == null)) {
              error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            }
            if (!(props2.onChange || props2.readOnly || props2.disabled || props2.checked == null)) {
              error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }
          }
        }
        var omittedCloseTags = {
          area: true,
          base: true,
          br: true,
          col: true,
          embed: true,
          hr: true,
          img: true,
          input: true,
          keygen: true,
          link: true,
          meta: true,
          param: true,
          source: true,
          track: true,
          wbr: true
        };
        var voidElementTags = _assign({
          menuitem: true
        }, omittedCloseTags);
        var HTML = "__html";
        function assertValidProps(tag, props2) {
          if (!props2) {
            return;
          }
          if (voidElementTags[tag]) {
            if (!(props2.children == null && props2.dangerouslySetInnerHTML == null)) {
              {
                throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
              }
            }
          }
          if (props2.dangerouslySetInnerHTML != null) {
            if (!(props2.children == null)) {
              {
                throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
            }
            if (!(typeof props2.dangerouslySetInnerHTML === "object" && HTML in props2.dangerouslySetInnerHTML)) {
              {
                throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
            }
          }
          {
            if (!props2.suppressContentEditableWarning && props2.contentEditable && props2.children != null) {
              error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
            }
          }
          if (!(props2.style == null || typeof props2.style === "object")) {
            {
              throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
          }
        }
        var isUnitlessNumber = {
          animationIterationCount: true,
          borderImageOutset: true,
          borderImageSlice: true,
          borderImageWidth: true,
          boxFlex: true,
          boxFlexGroup: true,
          boxOrdinalGroup: true,
          columnCount: true,
          columns: true,
          flex: true,
          flexGrow: true,
          flexPositive: true,
          flexShrink: true,
          flexNegative: true,
          flexOrder: true,
          gridArea: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowSpan: true,
          gridRowStart: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnSpan: true,
          gridColumnStart: true,
          fontWeight: true,
          lineClamp: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          tabSize: true,
          widows: true,
          zIndex: true,
          zoom: true,
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeDasharray: true,
          strokeDashoffset: true,
          strokeMiterlimit: true,
          strokeOpacity: true,
          strokeWidth: true
        };
        function prefixKey(prefix2, key) {
          return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
        }
        var prefixes2 = ["Webkit", "ms", "Moz", "O"];
        Object.keys(isUnitlessNumber).forEach(function(prop) {
          prefixes2.forEach(function(prefix2) {
            isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
          });
        });
        function dangerousStyleValue(name, value, isCustomProperty) {
          var isEmpty = value == null || typeof value === "boolean" || value === "";
          if (isEmpty) {
            return "";
          }
          if (!isCustomProperty && typeof value === "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
            return value + "px";
          }
          return ("" + value).trim();
        }
        var uppercasePattern = /([A-Z])/g;
        var msPattern = /^ms-/;
        function hyphenateStyleName(name) {
          return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
        }
        function isCustomComponent(tagName, props2) {
          if (tagName.indexOf("-") === -1) {
            return typeof props2.is === "string";
          }
          switch (tagName) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return false;
            default:
              return true;
          }
        }
        var warnValidStyle = function() {
        };
        {
          var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
          var msPattern$1 = /^-ms-/;
          var hyphenPattern = /-(.)/g;
          var badStyleValueWithSemicolonPattern = /;\s*$/;
          var warnedStyleNames = {};
          var warnedStyleValues = {};
          var warnedForNaNValue = false;
          var warnedForInfinityValue = false;
          var camelize = function(string) {
            return string.replace(hyphenPattern, function(_10, character) {
              return character.toUpperCase();
            });
          };
          var warnHyphenatedStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern$1, "ms-")));
          };
          var warnBadVendoredStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
          };
          var warnStyleValueWithSemicolon = function(name, value) {
            if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
              return;
            }
            warnedStyleValues[value] = true;
            error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
          };
          var warnStyleValueIsNaN = function(name, value) {
            if (warnedForNaNValue) {
              return;
            }
            warnedForNaNValue = true;
            error("`NaN` is an invalid value for the `%s` css style property.", name);
          };
          var warnStyleValueIsInfinity = function(name, value) {
            if (warnedForInfinityValue) {
              return;
            }
            warnedForInfinityValue = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", name);
          };
          warnValidStyle = function(name, value) {
            if (name.indexOf("-") > -1) {
              warnHyphenatedStyleName(name);
            } else if (badVendoredStyleNamePattern.test(name)) {
              warnBadVendoredStyleName(name);
            } else if (badStyleValueWithSemicolonPattern.test(value)) {
              warnStyleValueWithSemicolon(name, value);
            }
            if (typeof value === "number") {
              if (isNaN(value)) {
                warnStyleValueIsNaN(name, value);
              } else if (!isFinite(value)) {
                warnStyleValueIsInfinity(name, value);
              }
            }
          };
        }
        var warnValidStyle$1 = warnValidStyle;
        var ariaProperties = {
          "aria-current": 0,
          "aria-details": 0,
          "aria-disabled": 0,
          "aria-hidden": 0,
          "aria-invalid": 0,
          "aria-keyshortcuts": 0,
          "aria-label": 0,
          "aria-roledescription": 0,
          "aria-autocomplete": 0,
          "aria-checked": 0,
          "aria-expanded": 0,
          "aria-haspopup": 0,
          "aria-level": 0,
          "aria-modal": 0,
          "aria-multiline": 0,
          "aria-multiselectable": 0,
          "aria-orientation": 0,
          "aria-placeholder": 0,
          "aria-pressed": 0,
          "aria-readonly": 0,
          "aria-required": 0,
          "aria-selected": 0,
          "aria-sort": 0,
          "aria-valuemax": 0,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "aria-valuetext": 0,
          "aria-atomic": 0,
          "aria-busy": 0,
          "aria-live": 0,
          "aria-relevant": 0,
          "aria-dropeffect": 0,
          "aria-grabbed": 0,
          "aria-activedescendant": 0,
          "aria-colcount": 0,
          "aria-colindex": 0,
          "aria-colspan": 0,
          "aria-controls": 0,
          "aria-describedby": 0,
          "aria-errormessage": 0,
          "aria-flowto": 0,
          "aria-labelledby": 0,
          "aria-owns": 0,
          "aria-posinset": 0,
          "aria-rowcount": 0,
          "aria-rowindex": 0,
          "aria-rowspan": 0,
          "aria-setsize": 0
        };
        var warnedProperties = {};
        var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
        var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
        function validateProperty(tagName, name) {
          {
            if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
              return true;
            }
            if (rARIACamel.test(name)) {
              var ariaName = "aria-" + name.slice(4).toLowerCase();
              var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
              if (correctName == null) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                warnedProperties[name] = true;
                return true;
              }
              if (name !== correctName) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                warnedProperties[name] = true;
                return true;
              }
            }
            if (rARIA.test(name)) {
              var lowerCasedName = name.toLowerCase();
              var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
              if (standardName == null) {
                warnedProperties[name] = true;
                return false;
              }
              if (name !== standardName) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties[name] = true;
                return true;
              }
            }
          }
          return true;
        }
        function warnInvalidARIAProps(type2, props2) {
          {
            var invalidProps = [];
            for (var key in props2) {
              var isValid = validateProperty(type2, key);
              if (!isValid) {
                invalidProps.push(key);
              }
            }
            var unknownPropString = invalidProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (invalidProps.length === 1) {
              error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type2);
            } else if (invalidProps.length > 1) {
              error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type2);
            }
          }
        }
        function validateProperties(type2, props2) {
          if (isCustomComponent(type2, props2)) {
            return;
          }
          warnInvalidARIAProps(type2, props2);
        }
        var didWarnValueNull = false;
        function validateProperties$1(type2, props2) {
          {
            if (type2 !== "input" && type2 !== "textarea" && type2 !== "select") {
              return;
            }
            if (props2 != null && props2.value === null && !didWarnValueNull) {
              didWarnValueNull = true;
              if (type2 === "select" && props2.multiple) {
                error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type2);
              } else {
                error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type2);
              }
            }
          }
        }
        var possibleStandardNames = {
          accept: "accept",
          acceptcharset: "acceptCharset",
          "accept-charset": "acceptCharset",
          accesskey: "accessKey",
          action: "action",
          allowfullscreen: "allowFullScreen",
          alt: "alt",
          as: "as",
          async: "async",
          autocapitalize: "autoCapitalize",
          autocomplete: "autoComplete",
          autocorrect: "autoCorrect",
          autofocus: "autoFocus",
          autoplay: "autoPlay",
          autosave: "autoSave",
          capture: "capture",
          cellpadding: "cellPadding",
          cellspacing: "cellSpacing",
          challenge: "challenge",
          charset: "charSet",
          checked: "checked",
          children: "children",
          cite: "cite",
          class: "className",
          classid: "classID",
          classname: "className",
          cols: "cols",
          colspan: "colSpan",
          content: "content",
          contenteditable: "contentEditable",
          contextmenu: "contextMenu",
          controls: "controls",
          controlslist: "controlsList",
          coords: "coords",
          crossorigin: "crossOrigin",
          dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
          data: "data",
          datetime: "dateTime",
          default: "default",
          defaultchecked: "defaultChecked",
          defaultvalue: "defaultValue",
          defer: "defer",
          dir: "dir",
          disabled: "disabled",
          disablepictureinpicture: "disablePictureInPicture",
          disableremoteplayback: "disableRemotePlayback",
          download: "download",
          draggable: "draggable",
          enctype: "encType",
          enterkeyhint: "enterKeyHint",
          for: "htmlFor",
          form: "form",
          formmethod: "formMethod",
          formaction: "formAction",
          formenctype: "formEncType",
          formnovalidate: "formNoValidate",
          formtarget: "formTarget",
          frameborder: "frameBorder",
          headers: "headers",
          height: "height",
          hidden: "hidden",
          high: "high",
          href: "href",
          hreflang: "hrefLang",
          htmlfor: "htmlFor",
          httpequiv: "httpEquiv",
          "http-equiv": "httpEquiv",
          icon: "icon",
          id: "id",
          innerhtml: "innerHTML",
          inputmode: "inputMode",
          integrity: "integrity",
          is: "is",
          itemid: "itemID",
          itemprop: "itemProp",
          itemref: "itemRef",
          itemscope: "itemScope",
          itemtype: "itemType",
          keyparams: "keyParams",
          keytype: "keyType",
          kind: "kind",
          label: "label",
          lang: "lang",
          list: "list",
          loop: "loop",
          low: "low",
          manifest: "manifest",
          marginwidth: "marginWidth",
          marginheight: "marginHeight",
          max: "max",
          maxlength: "maxLength",
          media: "media",
          mediagroup: "mediaGroup",
          method: "method",
          min: "min",
          minlength: "minLength",
          multiple: "multiple",
          muted: "muted",
          name: "name",
          nomodule: "noModule",
          nonce: "nonce",
          novalidate: "noValidate",
          open: "open",
          optimum: "optimum",
          pattern: "pattern",
          placeholder: "placeholder",
          playsinline: "playsInline",
          poster: "poster",
          preload: "preload",
          profile: "profile",
          radiogroup: "radioGroup",
          readonly: "readOnly",
          referrerpolicy: "referrerPolicy",
          rel: "rel",
          required: "required",
          reversed: "reversed",
          role: "role",
          rows: "rows",
          rowspan: "rowSpan",
          sandbox: "sandbox",
          scope: "scope",
          scoped: "scoped",
          scrolling: "scrolling",
          seamless: "seamless",
          selected: "selected",
          shape: "shape",
          size: "size",
          sizes: "sizes",
          span: "span",
          spellcheck: "spellCheck",
          src: "src",
          srcdoc: "srcDoc",
          srclang: "srcLang",
          srcset: "srcSet",
          start: "start",
          step: "step",
          style: "style",
          summary: "summary",
          tabindex: "tabIndex",
          target: "target",
          title: "title",
          type: "type",
          usemap: "useMap",
          value: "value",
          width: "width",
          wmode: "wmode",
          wrap: "wrap",
          about: "about",
          accentheight: "accentHeight",
          "accent-height": "accentHeight",
          accumulate: "accumulate",
          additive: "additive",
          alignmentbaseline: "alignmentBaseline",
          "alignment-baseline": "alignmentBaseline",
          allowreorder: "allowReorder",
          alphabetic: "alphabetic",
          amplitude: "amplitude",
          arabicform: "arabicForm",
          "arabic-form": "arabicForm",
          ascent: "ascent",
          attributename: "attributeName",
          attributetype: "attributeType",
          autoreverse: "autoReverse",
          azimuth: "azimuth",
          basefrequency: "baseFrequency",
          baselineshift: "baselineShift",
          "baseline-shift": "baselineShift",
          baseprofile: "baseProfile",
          bbox: "bbox",
          begin: "begin",
          bias: "bias",
          by: "by",
          calcmode: "calcMode",
          capheight: "capHeight",
          "cap-height": "capHeight",
          clip: "clip",
          clippath: "clipPath",
          "clip-path": "clipPath",
          clippathunits: "clipPathUnits",
          cliprule: "clipRule",
          "clip-rule": "clipRule",
          color: "color",
          colorinterpolation: "colorInterpolation",
          "color-interpolation": "colorInterpolation",
          colorinterpolationfilters: "colorInterpolationFilters",
          "color-interpolation-filters": "colorInterpolationFilters",
          colorprofile: "colorProfile",
          "color-profile": "colorProfile",
          colorrendering: "colorRendering",
          "color-rendering": "colorRendering",
          contentscripttype: "contentScriptType",
          contentstyletype: "contentStyleType",
          cursor: "cursor",
          cx: "cx",
          cy: "cy",
          d: "d",
          datatype: "datatype",
          decelerate: "decelerate",
          descent: "descent",
          diffuseconstant: "diffuseConstant",
          direction: "direction",
          display: "display",
          divisor: "divisor",
          dominantbaseline: "dominantBaseline",
          "dominant-baseline": "dominantBaseline",
          dur: "dur",
          dx: "dx",
          dy: "dy",
          edgemode: "edgeMode",
          elevation: "elevation",
          enablebackground: "enableBackground",
          "enable-background": "enableBackground",
          end: "end",
          exponent: "exponent",
          externalresourcesrequired: "externalResourcesRequired",
          fill: "fill",
          fillopacity: "fillOpacity",
          "fill-opacity": "fillOpacity",
          fillrule: "fillRule",
          "fill-rule": "fillRule",
          filter: "filter",
          filterres: "filterRes",
          filterunits: "filterUnits",
          floodopacity: "floodOpacity",
          "flood-opacity": "floodOpacity",
          floodcolor: "floodColor",
          "flood-color": "floodColor",
          focusable: "focusable",
          fontfamily: "fontFamily",
          "font-family": "fontFamily",
          fontsize: "fontSize",
          "font-size": "fontSize",
          fontsizeadjust: "fontSizeAdjust",
          "font-size-adjust": "fontSizeAdjust",
          fontstretch: "fontStretch",
          "font-stretch": "fontStretch",
          fontstyle: "fontStyle",
          "font-style": "fontStyle",
          fontvariant: "fontVariant",
          "font-variant": "fontVariant",
          fontweight: "fontWeight",
          "font-weight": "fontWeight",
          format: "format",
          from: "from",
          fx: "fx",
          fy: "fy",
          g1: "g1",
          g2: "g2",
          glyphname: "glyphName",
          "glyph-name": "glyphName",
          glyphorientationhorizontal: "glyphOrientationHorizontal",
          "glyph-orientation-horizontal": "glyphOrientationHorizontal",
          glyphorientationvertical: "glyphOrientationVertical",
          "glyph-orientation-vertical": "glyphOrientationVertical",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          hanging: "hanging",
          horizadvx: "horizAdvX",
          "horiz-adv-x": "horizAdvX",
          horizoriginx: "horizOriginX",
          "horiz-origin-x": "horizOriginX",
          ideographic: "ideographic",
          imagerendering: "imageRendering",
          "image-rendering": "imageRendering",
          in2: "in2",
          in: "in",
          inlist: "inlist",
          intercept: "intercept",
          k1: "k1",
          k2: "k2",
          k3: "k3",
          k4: "k4",
          k: "k",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          kerning: "kerning",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          letterspacing: "letterSpacing",
          "letter-spacing": "letterSpacing",
          lightingcolor: "lightingColor",
          "lighting-color": "lightingColor",
          limitingconeangle: "limitingConeAngle",
          local: "local",
          markerend: "markerEnd",
          "marker-end": "markerEnd",
          markerheight: "markerHeight",
          markermid: "markerMid",
          "marker-mid": "markerMid",
          markerstart: "markerStart",
          "marker-start": "markerStart",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          mask: "mask",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          mathematical: "mathematical",
          mode: "mode",
          numoctaves: "numOctaves",
          offset: "offset",
          opacity: "opacity",
          operator: "operator",
          order: "order",
          orient: "orient",
          orientation: "orientation",
          origin: "origin",
          overflow: "overflow",
          overlineposition: "overlinePosition",
          "overline-position": "overlinePosition",
          overlinethickness: "overlineThickness",
          "overline-thickness": "overlineThickness",
          paintorder: "paintOrder",
          "paint-order": "paintOrder",
          panose1: "panose1",
          "panose-1": "panose1",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointerevents: "pointerEvents",
          "pointer-events": "pointerEvents",
          points: "points",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          prefix: "prefix",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          property: "property",
          r: "r",
          radius: "radius",
          refx: "refX",
          refy: "refY",
          renderingintent: "renderingIntent",
          "rendering-intent": "renderingIntent",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          resource: "resource",
          restart: "restart",
          result: "result",
          results: "results",
          rotate: "rotate",
          rx: "rx",
          ry: "ry",
          scale: "scale",
          security: "security",
          seed: "seed",
          shaperendering: "shapeRendering",
          "shape-rendering": "shapeRendering",
          slope: "slope",
          spacing: "spacing",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          speed: "speed",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stemh: "stemh",
          stemv: "stemv",
          stitchtiles: "stitchTiles",
          stopcolor: "stopColor",
          "stop-color": "stopColor",
          stopopacity: "stopOpacity",
          "stop-opacity": "stopOpacity",
          strikethroughposition: "strikethroughPosition",
          "strikethrough-position": "strikethroughPosition",
          strikethroughthickness: "strikethroughThickness",
          "strikethrough-thickness": "strikethroughThickness",
          string: "string",
          stroke: "stroke",
          strokedasharray: "strokeDasharray",
          "stroke-dasharray": "strokeDasharray",
          strokedashoffset: "strokeDashoffset",
          "stroke-dashoffset": "strokeDashoffset",
          strokelinecap: "strokeLinecap",
          "stroke-linecap": "strokeLinecap",
          strokelinejoin: "strokeLinejoin",
          "stroke-linejoin": "strokeLinejoin",
          strokemiterlimit: "strokeMiterlimit",
          "stroke-miterlimit": "strokeMiterlimit",
          strokewidth: "strokeWidth",
          "stroke-width": "strokeWidth",
          strokeopacity: "strokeOpacity",
          "stroke-opacity": "strokeOpacity",
          suppresscontenteditablewarning: "suppressContentEditableWarning",
          suppresshydrationwarning: "suppressHydrationWarning",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textanchor: "textAnchor",
          "text-anchor": "textAnchor",
          textdecoration: "textDecoration",
          "text-decoration": "textDecoration",
          textlength: "textLength",
          textrendering: "textRendering",
          "text-rendering": "textRendering",
          to: "to",
          transform: "transform",
          typeof: "typeof",
          u1: "u1",
          u2: "u2",
          underlineposition: "underlinePosition",
          "underline-position": "underlinePosition",
          underlinethickness: "underlineThickness",
          "underline-thickness": "underlineThickness",
          unicode: "unicode",
          unicodebidi: "unicodeBidi",
          "unicode-bidi": "unicodeBidi",
          unicoderange: "unicodeRange",
          "unicode-range": "unicodeRange",
          unitsperem: "unitsPerEm",
          "units-per-em": "unitsPerEm",
          unselectable: "unselectable",
          valphabetic: "vAlphabetic",
          "v-alphabetic": "vAlphabetic",
          values: "values",
          vectoreffect: "vectorEffect",
          "vector-effect": "vectorEffect",
          version: "version",
          vertadvy: "vertAdvY",
          "vert-adv-y": "vertAdvY",
          vertoriginx: "vertOriginX",
          "vert-origin-x": "vertOriginX",
          vertoriginy: "vertOriginY",
          "vert-origin-y": "vertOriginY",
          vhanging: "vHanging",
          "v-hanging": "vHanging",
          videographic: "vIdeographic",
          "v-ideographic": "vIdeographic",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          visibility: "visibility",
          vmathematical: "vMathematical",
          "v-mathematical": "vMathematical",
          vocab: "vocab",
          widths: "widths",
          wordspacing: "wordSpacing",
          "word-spacing": "wordSpacing",
          writingmode: "writingMode",
          "writing-mode": "writingMode",
          x1: "x1",
          x2: "x2",
          x: "x",
          xchannelselector: "xChannelSelector",
          xheight: "xHeight",
          "x-height": "xHeight",
          xlinkactuate: "xlinkActuate",
          "xlink:actuate": "xlinkActuate",
          xlinkarcrole: "xlinkArcrole",
          "xlink:arcrole": "xlinkArcrole",
          xlinkhref: "xlinkHref",
          "xlink:href": "xlinkHref",
          xlinkrole: "xlinkRole",
          "xlink:role": "xlinkRole",
          xlinkshow: "xlinkShow",
          "xlink:show": "xlinkShow",
          xlinktitle: "xlinkTitle",
          "xlink:title": "xlinkTitle",
          xlinktype: "xlinkType",
          "xlink:type": "xlinkType",
          xmlbase: "xmlBase",
          "xml:base": "xmlBase",
          xmllang: "xmlLang",
          "xml:lang": "xmlLang",
          xmlns: "xmlns",
          "xml:space": "xmlSpace",
          xmlnsxlink: "xmlnsXlink",
          "xmlns:xlink": "xmlnsXlink",
          xmlspace: "xmlSpace",
          y1: "y1",
          y2: "y2",
          y: "y",
          ychannelselector: "yChannelSelector",
          z: "z",
          zoomandpan: "zoomAndPan"
        };
        var validateProperty$1 = function() {
        };
        {
          var warnedProperties$1 = {};
          var _hasOwnProperty = Object.prototype.hasOwnProperty;
          var EVENT_NAME_REGEX = /^on./;
          var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
          var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          validateProperty$1 = function(tagName, name, value, eventRegistry) {
            if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
              return true;
            }
            var lowerCasedName = name.toLowerCase();
            if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
              error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (eventRegistry != null) {
              var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
              if (registrationNameDependencies.hasOwnProperty(name)) {
                return true;
              }
              var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
              if (registrationName != null) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (EVENT_NAME_REGEX.test(name)) {
                error("Unknown event handler property `%s`. It will be ignored.", name);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (EVENT_NAME_REGEX.test(name)) {
              if (INVALID_EVENT_NAME_REGEX.test(name)) {
                error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
              return true;
            }
            if (lowerCasedName === "innerhtml") {
              error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "aria") {
              error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
              error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "number" && isNaN(value)) {
              error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
              warnedProperties$1[name] = true;
              return true;
            }
            var propertyInfo = getPropertyInfo(name);
            var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
            if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
              var standardName = possibleStandardNames[lowerCasedName];
              if (standardName !== name) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (!isReserved && name !== lowerCasedName) {
              error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              if (value) {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
              } else {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (isReserved) {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              warnedProperties$1[name] = true;
              return false;
            }
            if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
              error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
              warnedProperties$1[name] = true;
              return true;
            }
            return true;
          };
        }
        var warnUnknownProperties = function(type2, props2, eventRegistry) {
          {
            var unknownProps = [];
            for (var key in props2) {
              var isValid = validateProperty$1(type2, key, props2[key], eventRegistry);
              if (!isValid) {
                unknownProps.push(key);
              }
            }
            var unknownPropString = unknownProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (unknownProps.length === 1) {
              error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type2);
            } else if (unknownProps.length > 1) {
              error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type2);
            }
          }
        };
        function validateProperties$2(type2, props2, eventRegistry) {
          if (isCustomComponent(type2, props2)) {
            return;
          }
          warnUnknownProperties(type2, props2, eventRegistry);
        }
        var toArray = React4.Children.toArray;
        var currentDebugStacks = [];
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var ReactDebugCurrentFrame$1;
        var prevGetCurrentStackImpl = null;
        var getCurrentServerStackImpl = function() {
          return "";
        };
        var describeStackFrame = function(element) {
          return "";
        };
        var validatePropertiesInDevelopment = function(type2, props2) {
        };
        var pushCurrentDebugStack = function(stack) {
        };
        var pushElementToDebugStack = function(element) {
        };
        var popCurrentDebugStack = function() {
        };
        var hasWarnedAboutUsingContextAsConsumer = false;
        {
          ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          validatePropertiesInDevelopment = function(type2, props2) {
            validateProperties(type2, props2);
            validateProperties$1(type2, props2);
            validateProperties$2(type2, props2, null);
          };
          describeStackFrame = function(element) {
            return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
          };
          pushCurrentDebugStack = function(stack) {
            currentDebugStacks.push(stack);
            if (currentDebugStacks.length === 1) {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl;
            }
          };
          pushElementToDebugStack = function(element) {
            var stack = currentDebugStacks[currentDebugStacks.length - 1];
            var frame2 = stack[stack.length - 1];
            frame2.debugElementStack.push(element);
          };
          popCurrentDebugStack = function() {
            currentDebugStacks.pop();
            if (currentDebugStacks.length === 0) {
              ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              prevGetCurrentStackImpl = null;
            }
          };
          getCurrentServerStackImpl = function() {
            if (currentDebugStacks.length === 0) {
              return "";
            }
            var frames = currentDebugStacks[currentDebugStacks.length - 1];
            var stack = "";
            for (var i2 = frames.length - 1; i2 >= 0; i2--) {
              var frame2 = frames[i2];
              var debugElementStack = frame2.debugElementStack;
              for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
                stack += describeStackFrame(debugElementStack[ii]);
              }
            }
            return stack;
          };
        }
        var didWarnDefaultInputValue = false;
        var didWarnDefaultChecked = false;
        var didWarnDefaultSelectValue = false;
        var didWarnDefaultTextareaValue = false;
        var didWarnInvalidOptionChildren = false;
        var didWarnAboutNoopUpdateForComponent = {};
        var didWarnAboutBadClass = {};
        var didWarnAboutModulePatternComponent = {};
        var didWarnAboutDeprecatedWillMount = {};
        var didWarnAboutUndefinedDerivedState = {};
        var didWarnAboutUninitializedState = {};
        var valuePropNames = ["value", "defaultValue"];
        var newlineEatingTags = {
          listing: true,
          pre: true,
          textarea: true
        };
        var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
        var validatedTagCache = {};
        function validateDangerousTag(tag) {
          if (!validatedTagCache.hasOwnProperty(tag)) {
            if (!VALID_TAG_REGEX.test(tag)) {
              {
                throw Error("Invalid tag: " + tag);
              }
            }
            validatedTagCache[tag] = true;
          }
        }
        var styleNameCache = {};
        var processStyleName = function(styleName) {
          if (styleNameCache.hasOwnProperty(styleName)) {
            return styleNameCache[styleName];
          }
          var result = hyphenateStyleName(styleName);
          styleNameCache[styleName] = result;
          return result;
        };
        function createMarkupForStyles(styles) {
          var serialized = "";
          var delimiter = "";
          for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
              continue;
            }
            var isCustomProperty = styleName.indexOf("--") === 0;
            var styleValue2 = styles[styleName];
            {
              if (!isCustomProperty) {
                warnValidStyle$1(styleName, styleValue2);
              }
            }
            if (styleValue2 != null) {
              serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":";
              serialized += dangerousStyleValue(styleName, styleValue2, isCustomProperty);
              delimiter = ";";
            }
          }
          return serialized || null;
        }
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && getComponentName(_constructor) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnAboutNoopUpdateForComponent[warningKey]) {
              return;
            }
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
            didWarnAboutNoopUpdateForComponent[warningKey] = true;
          }
        }
        function shouldConstruct$1(Component) {
          return Component.prototype && Component.prototype.isReactComponent;
        }
        function getNonChildrenInnerMarkup(props2) {
          var innerHTML = props2.dangerouslySetInnerHTML;
          if (innerHTML != null) {
            if (innerHTML.__html != null) {
              return innerHTML.__html;
            }
          } else {
            var content = props2.children;
            if (typeof content === "string" || typeof content === "number") {
              return escapeTextForBrowser(content);
            }
          }
          return null;
        }
        function flattenTopLevelChildren(children2) {
          if (!React4.isValidElement(children2)) {
            return toArray(children2);
          }
          var element = children2;
          if (element.type !== REACT_FRAGMENT_TYPE) {
            return [element];
          }
          var fragmentChildren = element.props.children;
          if (!React4.isValidElement(fragmentChildren)) {
            return toArray(fragmentChildren);
          }
          var fragmentChildElement = fragmentChildren;
          return [fragmentChildElement];
        }
        function flattenOptionChildren(children2) {
          if (children2 === void 0 || children2 === null) {
            return children2;
          }
          var content = "";
          React4.Children.forEach(children2, function(child) {
            if (child == null) {
              return;
            }
            content += child;
            {
              if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                didWarnInvalidOptionChildren = true;
                error("Only strings and numbers are supported as <option> children.");
              }
            }
          });
          return content;
        }
        var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
        var STYLE = "style";
        var RESERVED_PROPS = {
          children: null,
          dangerouslySetInnerHTML: null,
          suppressContentEditableWarning: null,
          suppressHydrationWarning: null
        };
        function createOpenTagMarkup(tagVerbatim, tagLowercase, props2, namespace, makeStaticMarkup, isRootElement) {
          var ret = "<" + tagVerbatim;
          var isCustomComponent$1 = isCustomComponent(tagLowercase, props2);
          for (var propKey in props2) {
            if (!hasOwnProperty$2.call(props2, propKey)) {
              continue;
            }
            var propValue = props2[propKey];
            if (propValue == null) {
              continue;
            }
            if (propKey === STYLE) {
              propValue = createMarkupForStyles(propValue);
            }
            var markup = null;
            if (isCustomComponent$1) {
              if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
                markup = createMarkupForCustomAttribute(propKey, propValue);
              }
            } else {
              markup = createMarkupForProperty(propKey, propValue);
            }
            if (markup) {
              ret += " " + markup;
            }
          }
          if (makeStaticMarkup) {
            return ret;
          }
          if (isRootElement) {
            ret += " " + createMarkupForRoot();
          }
          return ret;
        }
        function validateRenderResult(child, type2) {
          if (child === void 0) {
            {
              {
                throw Error((getComponentName(type2) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
              }
            }
          }
        }
        function resolve(child, context, threadID) {
          while (React4.isValidElement(child)) {
            var element = child;
            var Component = element.type;
            {
              pushElementToDebugStack(element);
            }
            if (typeof Component !== "function") {
              break;
            }
            processChild2(element, Component);
          }
          function processChild2(element2, Component2) {
            var isClass = shouldConstruct$1(Component2);
            var publicContext = processContext(Component2, context, threadID, isClass);
            var queue = [];
            var replace = false;
            var updater = {
              isMounted: function(publicInstance) {
                return false;
              },
              enqueueForceUpdate: function(publicInstance) {
                if (queue === null) {
                  warnNoop(publicInstance, "forceUpdate");
                  return null;
                }
              },
              enqueueReplaceState: function(publicInstance, completeState) {
                replace = true;
                queue = [completeState];
              },
              enqueueSetState: function(publicInstance, currentPartialState) {
                if (queue === null) {
                  warnNoop(publicInstance, "setState");
                  return null;
                }
                queue.push(currentPartialState);
              }
            };
            var inst;
            if (isClass) {
              inst = new Component2(element2.props, publicContext, updater);
              if (typeof Component2.getDerivedStateFromProps === "function") {
                {
                  if (inst.state === null || inst.state === void 0) {
                    var componentName = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutUninitializedState[componentName]) {
                      error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName);
                      didWarnAboutUninitializedState[componentName] = true;
                    }
                  }
                }
                var partialState = Component2.getDerivedStateFromProps.call(null, element2.props, inst.state);
                {
                  if (partialState === void 0) {
                    var _componentName = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutUndefinedDerivedState[_componentName]) {
                      error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName);
                      didWarnAboutUndefinedDerivedState[_componentName] = true;
                    }
                  }
                }
                if (partialState != null) {
                  inst.state = _assign({}, inst.state, partialState);
                }
              }
            } else {
              {
                if (Component2.prototype && typeof Component2.prototype.render === "function") {
                  var _componentName2 = getComponentName(Component2) || "Unknown";
                  if (!didWarnAboutBadClass[_componentName2]) {
                    error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2);
                    didWarnAboutBadClass[_componentName2] = true;
                  }
                }
              }
              var componentIdentity = {};
              prepareToUseHooks(componentIdentity);
              inst = Component2(element2.props, publicContext, updater);
              inst = finishHooks(Component2, element2.props, inst, publicContext);
              {
                if (inst != null && inst.render != null) {
                  var _componentName3 = getComponentName(Component2) || "Unknown";
                  if (!didWarnAboutModulePatternComponent[_componentName3]) {
                    error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3);
                    didWarnAboutModulePatternComponent[_componentName3] = true;
                  }
                }
              }
              if (inst == null || inst.render == null) {
                child = inst;
                validateRenderResult(child, Component2);
                return;
              }
            }
            inst.props = element2.props;
            inst.context = publicContext;
            inst.updater = updater;
            var initialState = inst.state;
            if (initialState === void 0) {
              inst.state = initialState = null;
            }
            if (typeof inst.UNSAFE_componentWillMount === "function" || typeof inst.componentWillMount === "function") {
              if (typeof inst.componentWillMount === "function") {
                {
                  if (inst.componentWillMount.__suppressDeprecationWarning !== true) {
                    var _componentName4 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
                      warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", _componentName4);
                      didWarnAboutDeprecatedWillMount[_componentName4] = true;
                    }
                  }
                }
                if (typeof Component2.getDerivedStateFromProps !== "function") {
                  inst.componentWillMount();
                }
              }
              if (typeof inst.UNSAFE_componentWillMount === "function" && typeof Component2.getDerivedStateFromProps !== "function") {
                inst.UNSAFE_componentWillMount();
              }
              if (queue.length) {
                var oldQueue = queue;
                var oldReplace = replace;
                queue = null;
                replace = false;
                if (oldReplace && oldQueue.length === 1) {
                  inst.state = oldQueue[0];
                } else {
                  var nextState = oldReplace ? oldQueue[0] : inst.state;
                  var dontMutate = true;
                  for (var i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                    var partial = oldQueue[i2];
                    var _partialState = typeof partial === "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                    if (_partialState != null) {
                      if (dontMutate) {
                        dontMutate = false;
                        nextState = _assign({}, nextState, _partialState);
                      } else {
                        _assign(nextState, _partialState);
                      }
                    }
                  }
                  inst.state = nextState;
                }
              } else {
                queue = null;
              }
            }
            child = inst.render();
            {
              if (child === void 0 && inst.render._isMockFunction) {
                child = null;
              }
            }
            validateRenderResult(child, Component2);
            var childContext;
            {
              if (typeof inst.getChildContext === "function") {
                var _childContextTypes = Component2.childContextTypes;
                if (typeof _childContextTypes === "object") {
                  childContext = inst.getChildContext();
                  for (var contextKey in childContext) {
                    if (!(contextKey in _childContextTypes)) {
                      {
                        throw Error((getComponentName(Component2) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                      }
                    }
                  }
                } else {
                  {
                    error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component2) || "Unknown");
                  }
                }
              }
              if (childContext) {
                context = _assign({}, context, childContext);
              }
            }
          }
          return {
            child,
            context
          };
        }
        var ReactDOMServerRenderer = /* @__PURE__ */ function() {
          function ReactDOMServerRenderer2(children2, makeStaticMarkup, options) {
            var flatChildren = flattenTopLevelChildren(children2);
            var topFrame = {
              type: null,
              domNamespace: Namespaces.html,
              children: flatChildren,
              childIndex: 0,
              context: emptyObject,
              footer: ""
            };
            {
              topFrame.debugElementStack = [];
            }
            this.threadID = allocThreadID();
            this.stack = [topFrame];
            this.exhausted = false;
            this.currentSelectValue = null;
            this.previousWasTextNode = false;
            this.makeStaticMarkup = makeStaticMarkup;
            this.suspenseDepth = 0;
            this.contextIndex = -1;
            this.contextStack = [];
            this.contextValueStack = [];
            this.uniqueID = 0;
            this.identifierPrefix = options && options.identifierPrefix || "";
            {
              this.contextProviderStack = [];
            }
          }
          var _proto = ReactDOMServerRenderer2.prototype;
          _proto.destroy = function destroy() {
            if (!this.exhausted) {
              this.exhausted = true;
              this.clearProviders();
              freeThreadID(this.threadID);
            }
          };
          _proto.pushProvider = function pushProvider(provider) {
            var index = ++this.contextIndex;
            var context = provider.type._context;
            var threadID = this.threadID;
            validateContextBounds(context, threadID);
            var previousValue = context[threadID];
            this.contextStack[index] = context;
            this.contextValueStack[index] = previousValue;
            {
              this.contextProviderStack[index] = provider;
            }
            context[threadID] = provider.props.value;
          };
          _proto.popProvider = function popProvider(provider) {
            var index = this.contextIndex;
            {
              if (index < 0 || provider !== this.contextProviderStack[index]) {
                error("Unexpected pop.");
              }
            }
            var context = this.contextStack[index];
            var previousValue = this.contextValueStack[index];
            this.contextStack[index] = null;
            this.contextValueStack[index] = null;
            {
              this.contextProviderStack[index] = null;
            }
            this.contextIndex--;
            context[this.threadID] = previousValue;
          };
          _proto.clearProviders = function clearProviders() {
            for (var index = this.contextIndex; index >= 0; index--) {
              var context = this.contextStack[index];
              var previousValue = this.contextValueStack[index];
              context[this.threadID] = previousValue;
            }
          };
          _proto.read = function read(bytes) {
            if (this.exhausted) {
              return null;
            }
            var prevPartialRenderer = currentPartialRenderer;
            setCurrentPartialRenderer(this);
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            try {
              var out = [""];
              var suspended = false;
              while (out[0].length < bytes) {
                if (this.stack.length === 0) {
                  this.exhausted = true;
                  freeThreadID(this.threadID);
                  break;
                }
                var frame2 = this.stack[this.stack.length - 1];
                if (suspended || frame2.childIndex >= frame2.children.length) {
                  var footer = frame2.footer;
                  if (footer !== "") {
                    this.previousWasTextNode = false;
                  }
                  this.stack.pop();
                  if (frame2.type === "select") {
                    this.currentSelectValue = null;
                  } else if (frame2.type != null && frame2.type.type != null && frame2.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                    var provider = frame2.type;
                    this.popProvider(provider);
                  } else if (frame2.type === REACT_SUSPENSE_TYPE) {
                    this.suspenseDepth--;
                    var buffered = out.pop();
                    if (suspended) {
                      suspended = false;
                      var fallbackFrame = frame2.fallbackFrame;
                      if (!fallbackFrame) {
                        {
                          throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
                        }
                      }
                      this.stack.push(fallbackFrame);
                      out[this.suspenseDepth] += "<!--$!-->";
                      continue;
                    } else {
                      out[this.suspenseDepth] += buffered;
                    }
                  }
                  out[this.suspenseDepth] += footer;
                  continue;
                }
                var child = frame2.children[frame2.childIndex++];
                var outBuffer = "";
                if (true) {
                  pushCurrentDebugStack(this.stack);
                  frame2.debugElementStack.length = 0;
                }
                try {
                  outBuffer += this.render(child, frame2.context, frame2.domNamespace);
                } catch (err) {
                  if (err != null && typeof err.then === "function") {
                    if (enableSuspenseServerRenderer) {
                      if (!(this.suspenseDepth > 0)) {
                        {
                          throw Error(true ? "A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." : formatProdErrorMessage(342));
                        }
                      }
                      suspended = true;
                    } else {
                      if (true) {
                        {
                          throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
                        }
                      }
                    }
                  } else {
                    throw err;
                  }
                } finally {
                  if (true) {
                    popCurrentDebugStack();
                  }
                }
                if (out.length <= this.suspenseDepth) {
                  out.push("");
                }
                out[this.suspenseDepth] += outBuffer;
              }
              return out[0];
            } finally {
              ReactCurrentDispatcher$1.current = prevDispatcher;
              setCurrentPartialRenderer(prevPartialRenderer);
              resetHooksState();
            }
          };
          _proto.render = function render(child, context, parentNamespace) {
            if (typeof child === "string" || typeof child === "number") {
              var text = "" + child;
              if (text === "") {
                return "";
              }
              if (this.makeStaticMarkup) {
                return escapeTextForBrowser(text);
              }
              if (this.previousWasTextNode) {
                return "<!-- -->" + escapeTextForBrowser(text);
              }
              this.previousWasTextNode = true;
              return escapeTextForBrowser(text);
            } else {
              var nextChild;
              var _resolve = resolve(child, context, this.threadID);
              nextChild = _resolve.child;
              context = _resolve.context;
              if (nextChild === null || nextChild === false) {
                return "";
              } else if (!React4.isValidElement(nextChild)) {
                if (nextChild != null && nextChild.$$typeof != null) {
                  var $$typeof = nextChild.$$typeof;
                  if (!($$typeof !== REACT_PORTAL_TYPE)) {
                    {
                      throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                    }
                  }
                  {
                    {
                      throw Error("Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
                    }
                  }
                }
                var nextChildren = toArray(nextChild);
                var frame2 = {
                  type: null,
                  domNamespace: parentNamespace,
                  children: nextChildren,
                  childIndex: 0,
                  context,
                  footer: ""
                };
                {
                  frame2.debugElementStack = [];
                }
                this.stack.push(frame2);
                return "";
              }
              var nextElement = nextChild;
              var elementType = nextElement.type;
              if (typeof elementType === "string") {
                return this.renderDOM(nextElement, context, parentNamespace);
              }
              switch (elementType) {
                case REACT_LEGACY_HIDDEN_TYPE:
                case REACT_DEBUG_TRACING_MODE_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                case REACT_FRAGMENT_TYPE: {
                  var _nextChildren = toArray(nextChild.props.children);
                  var _frame = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  {
                    _frame.debugElementStack = [];
                  }
                  this.stack.push(_frame);
                  return "";
                }
                case REACT_SUSPENSE_TYPE: {
                  {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support Suspense.");
                      }
                    }
                  }
                }
                case REACT_SCOPE_TYPE: {
                  {
                    {
                      throw Error("ReactDOMServer does not yet support scope components.");
                    }
                  }
                }
              }
              if (typeof elementType === "object" && elementType !== null) {
                switch (elementType.$$typeof) {
                  case REACT_FORWARD_REF_TYPE: {
                    var element = nextChild;
                    var _nextChildren5;
                    var componentIdentity = {};
                    prepareToUseHooks(componentIdentity);
                    _nextChildren5 = elementType.render(element.props, element.ref);
                    _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref);
                    _nextChildren5 = toArray(_nextChildren5);
                    var _frame5 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren5,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame5.debugElementStack = [];
                    }
                    this.stack.push(_frame5);
                    return "";
                  }
                  case REACT_MEMO_TYPE: {
                    var _element = nextChild;
                    var _nextChildren6 = [React4.createElement(elementType.type, _assign({
                      ref: _element.ref
                    }, _element.props))];
                    var _frame6 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren6,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame6.debugElementStack = [];
                    }
                    this.stack.push(_frame6);
                    return "";
                  }
                  case REACT_PROVIDER_TYPE: {
                    var provider = nextChild;
                    var nextProps = provider.props;
                    var _nextChildren7 = toArray(nextProps.children);
                    var _frame7 = {
                      type: provider,
                      domNamespace: parentNamespace,
                      children: _nextChildren7,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame7.debugElementStack = [];
                    }
                    this.pushProvider(provider);
                    this.stack.push(_frame7);
                    return "";
                  }
                  case REACT_CONTEXT_TYPE: {
                    var reactContext = nextChild.type;
                    {
                      if (reactContext._context === void 0) {
                        if (reactContext !== reactContext.Consumer) {
                          if (!hasWarnedAboutUsingContextAsConsumer) {
                            hasWarnedAboutUsingContextAsConsumer = true;
                            error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                          }
                        }
                      } else {
                        reactContext = reactContext._context;
                      }
                    }
                    var _nextProps = nextChild.props;
                    var threadID = this.threadID;
                    validateContextBounds(reactContext, threadID);
                    var nextValue = reactContext[threadID];
                    var _nextChildren8 = toArray(_nextProps.children(nextValue));
                    var _frame8 = {
                      type: nextChild,
                      domNamespace: parentNamespace,
                      children: _nextChildren8,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame8.debugElementStack = [];
                    }
                    this.stack.push(_frame8);
                    return "";
                  }
                  case REACT_FUNDAMENTAL_TYPE: {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support the fundamental API.");
                      }
                    }
                  }
                  case REACT_LAZY_TYPE: {
                    var _element2 = nextChild;
                    var lazyComponent = nextChild.type;
                    var payload = lazyComponent._payload;
                    var init2 = lazyComponent._init;
                    var result = init2(payload);
                    var _nextChildren10 = [React4.createElement(result, _assign({
                      ref: _element2.ref
                    }, _element2.props))];
                    var _frame10 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren10,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame10.debugElementStack = [];
                    }
                    this.stack.push(_frame10);
                    return "";
                  }
                }
              }
              var info2 = "";
              {
                var owner = nextElement._owner;
                if (elementType === void 0 || typeof elementType === "object" && elementType !== null && Object.keys(elementType).length === 0) {
                  info2 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
                var ownerName = owner ? getComponentName(owner) : null;
                if (ownerName) {
                  info2 += "\n\nCheck the render method of `" + ownerName + "`.";
                }
              }
              {
                {
                  throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info2);
                }
              }
            }
          };
          _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
            var tag = element.type.toLowerCase();
            var namespace = parentNamespace;
            if (parentNamespace === Namespaces.html) {
              namespace = getIntrinsicNamespace(tag);
            }
            {
              if (namespace === Namespaces.html) {
                if (tag !== element.type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", element.type);
                }
              }
            }
            validateDangerousTag(tag);
            var props2 = element.props;
            if (tag === "input") {
              {
                checkControlledValueProps("input", props2);
                if (props2.checked !== void 0 && props2.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                  error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props2.type);
                  didWarnDefaultChecked = true;
                }
                if (props2.value !== void 0 && props2.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                  error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props2.type);
                  didWarnDefaultInputValue = true;
                }
              }
              props2 = _assign({
                type: void 0
              }, props2, {
                defaultChecked: void 0,
                defaultValue: void 0,
                value: props2.value != null ? props2.value : props2.defaultValue,
                checked: props2.checked != null ? props2.checked : props2.defaultChecked
              });
            } else if (tag === "textarea") {
              {
                checkControlledValueProps("textarea", props2);
                if (props2.value !== void 0 && props2.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                  error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultTextareaValue = true;
                }
              }
              var initialValue = props2.value;
              if (initialValue == null) {
                var defaultValue = props2.defaultValue;
                var textareaChildren = props2.children;
                if (textareaChildren != null) {
                  {
                    error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
                  }
                  if (!(defaultValue == null)) {
                    {
                      throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                    }
                  }
                  if (Array.isArray(textareaChildren)) {
                    if (!(textareaChildren.length <= 1)) {
                      {
                        throw Error("<textarea> can only have at most one child.");
                      }
                    }
                    textareaChildren = textareaChildren[0];
                  }
                  defaultValue = "" + textareaChildren;
                }
                if (defaultValue == null) {
                  defaultValue = "";
                }
                initialValue = defaultValue;
              }
              props2 = _assign({}, props2, {
                value: void 0,
                children: "" + initialValue
              });
            } else if (tag === "select") {
              {
                checkControlledValueProps("select", props2);
                for (var i2 = 0; i2 < valuePropNames.length; i2++) {
                  var propName = valuePropNames[i2];
                  if (props2[propName] == null) {
                    continue;
                  }
                  var isArray = Array.isArray(props2[propName]);
                  if (props2.multiple && !isArray) {
                    error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                  } else if (!props2.multiple && isArray) {
                    error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                  }
                }
                if (props2.value !== void 0 && props2.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                  error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultSelectValue = true;
                }
              }
              this.currentSelectValue = props2.value != null ? props2.value : props2.defaultValue;
              props2 = _assign({}, props2, {
                value: void 0
              });
            } else if (tag === "option") {
              var selected = null;
              var selectValue = this.currentSelectValue;
              var optionChildren = flattenOptionChildren(props2.children);
              if (selectValue != null) {
                var value;
                if (props2.value != null) {
                  value = props2.value + "";
                } else {
                  value = optionChildren;
                }
                selected = false;
                if (Array.isArray(selectValue)) {
                  for (var j3 = 0; j3 < selectValue.length; j3++) {
                    if ("" + selectValue[j3] === value) {
                      selected = true;
                      break;
                    }
                  }
                } else {
                  selected = "" + selectValue === value;
                }
                props2 = _assign({
                  selected: void 0,
                  children: void 0
                }, props2, {
                  selected,
                  children: optionChildren
                });
              }
            }
            {
              validatePropertiesInDevelopment(tag, props2);
            }
            assertValidProps(tag, props2);
            var out = createOpenTagMarkup(element.type, tag, props2, namespace, this.makeStaticMarkup, this.stack.length === 1);
            var footer = "";
            if (omittedCloseTags.hasOwnProperty(tag)) {
              out += "/>";
            } else {
              out += ">";
              footer = "</" + element.type + ">";
            }
            var children2;
            var innerMarkup = getNonChildrenInnerMarkup(props2);
            if (innerMarkup != null) {
              children2 = [];
              if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === "\n") {
                out += "\n";
              }
              out += innerMarkup;
            } else {
              children2 = toArray(props2.children);
            }
            var frame2 = {
              domNamespace: getChildNamespace(parentNamespace, element.type),
              type: tag,
              children: children2,
              childIndex: 0,
              context,
              footer
            };
            {
              frame2.debugElementStack = [];
            }
            this.stack.push(frame2);
            this.previousWasTextNode = false;
            return out;
          };
          return ReactDOMServerRenderer2;
        }();
        function renderToString(element, options) {
          var renderer = new ReactDOMServerRenderer(element, false, options);
          try {
            var markup = renderer.read(Infinity);
            return markup;
          } finally {
            renderer.destroy();
          }
        }
        function renderToStaticMarkup(element, options) {
          var renderer = new ReactDOMServerRenderer(element, true, options);
          try {
            var markup = renderer.read(Infinity);
            return markup;
          } finally {
            renderer.destroy();
          }
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }
        var ReactMarkupReadableStream = /* @__PURE__ */ function(_Readable) {
          _inheritsLoose(ReactMarkupReadableStream2, _Readable);
          function ReactMarkupReadableStream2(element, makeStaticMarkup, options) {
            var _this;
            _this = _Readable.call(this, {}) || this;
            _this.partialRenderer = new ReactDOMServerRenderer(element, makeStaticMarkup, options);
            return _this;
          }
          var _proto = ReactMarkupReadableStream2.prototype;
          _proto._destroy = function _destroy(err, callback) {
            this.partialRenderer.destroy();
            callback(err);
          };
          _proto._read = function _read(size) {
            try {
              this.push(this.partialRenderer.read(size));
            } catch (err) {
              this.destroy(err);
            }
          };
          return ReactMarkupReadableStream2;
        }(stream.Readable);
        function renderToNodeStream(element, options) {
          return new ReactMarkupReadableStream(element, false, options);
        }
        function renderToStaticNodeStream(element, options) {
          return new ReactMarkupReadableStream(element, true, options);
        }
        exports2.renderToNodeStream = renderToNodeStream;
        exports2.renderToStaticMarkup = renderToStaticMarkup;
        exports2.renderToStaticNodeStream = renderToStaticNodeStream;
        exports2.renderToString = renderToString;
        exports2.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/react-dom/server.node.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_dom_server_node_production_min();
    } else {
      module2.exports = require_react_dom_server_node_development();
    }
  }
});

// node_modules/react-dom/server.js
var require_server = __commonJS({
  "node_modules/react-dom/server.js"(exports2, module2) {
    "use strict";
    module2.exports = require_server_node();
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports2, module2) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module2.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports2, module2) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal || freeSelf || Function("return this")();
    module2.exports = root2;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports2, module2) {
    var root2 = require_root();
    var Symbol2 = root2.Symbol;
    module2.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports2, module2) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e3) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module2.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports2, module2) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module2.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports2, module2) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module2.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports2, module2) {
    function isObject(value) {
      var type2 = typeof value;
      return value != null && (type2 == "object" || type2 == "function");
    }
    module2.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports2, module2) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module2.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports2, module2) {
    var root2 = require_root();
    var coreJsData = root2["__core-js_shared__"];
    module2.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports2, module2) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module2.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports2, module2) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e3) {
        }
        try {
          return func + "";
        } catch (e3) {
        }
      }
      return "";
    }
    module2.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports2, module2) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module2.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports2, module2) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module2.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports2, module2) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module2.exports = getNative;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports2, module2) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e3) {
      }
    }();
    module2.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports2, module2) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module2.exports = baseAssignValue;
  }
});

// node_modules/lodash/_arrayAggregator.js
var require_arrayAggregator = __commonJS({
  "node_modules/lodash/_arrayAggregator.js"(exports2, module2) {
    function arrayAggregator(array2, setter, iteratee, accumulator) {
      var index = -1, length = array2 == null ? 0 : array2.length;
      while (++index < length) {
        var value = array2[index];
        setter(accumulator, value, iteratee(value), array2);
      }
      return accumulator;
    }
    module2.exports = arrayAggregator;
  }
});

// node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "node_modules/lodash/_createBaseFor.js"(exports2, module2) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props2 = keysFunc(object), length = props2.length;
        while (length--) {
          var key = props2[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module2.exports = createBaseFor;
  }
});

// node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "node_modules/lodash/_baseFor.js"(exports2, module2) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module2.exports = baseFor;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports2, module2) {
    function baseTimes(n2, iteratee) {
      var index = -1, result = Array(n2);
      while (++index < n2) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module2.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports2, module2) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports2, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module2.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports2, module2) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module2.exports = isArguments;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports2, module2) {
    var isArray = Array.isArray;
    module2.exports = isArray;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports2, module2) {
    function stubFalse() {
      return false;
    }
    module2.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports2, module2) {
    var root2 = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root2.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module2.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports2, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type2 = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module2.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports2, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module2.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports2, module2) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module2.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports2, module2) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module2.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports2, module2) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e3) {
      }
    }();
    module2.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports2, module2) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module2.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports2, module2) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports2, module2) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module2.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports2, module2) {
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    module2.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports2, module2) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module2.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports2, module2) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module2.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports2, module2) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module2.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports2, module2) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module2.exports = keys;
  }
});

// node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/_baseForOwn.js"(exports2, module2) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module2.exports = baseForOwn;
  }
});

// node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/_createBaseEach.js"(exports2, module2) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module2.exports = createBaseEach;
  }
});

// node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/_baseEach.js"(exports2, module2) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module2.exports = baseEach;
  }
});

// node_modules/lodash/_baseAggregator.js
var require_baseAggregator = __commonJS({
  "node_modules/lodash/_baseAggregator.js"(exports2, module2) {
    var baseEach = require_baseEach();
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection2) {
        setter(accumulator, value, iteratee(value), collection2);
      });
      return accumulator;
    }
    module2.exports = baseAggregator;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports2, module2) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module2.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports2, module2) {
    function eq2(value, other) {
      return value === other || value !== value && other !== other;
    }
    module2.exports = eq2;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports2, module2) {
    var eq2 = require_eq();
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq2(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module2.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports2, module2) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module2.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports2, module2) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module2.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports2, module2) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module2.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports2, module2) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module2.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports2, module2) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      this.clear();
      while (++index < length) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module2.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports2, module2) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module2.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports2, module2) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module2.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports2, module2) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module2.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports2, module2) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module2.exports = stackHas;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports2, module2) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Map2 = getNative(root2, "Map");
    module2.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports2, module2) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module2.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports2, module2) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module2.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports2, module2) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module2.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports2, module2) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module2.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports2, module2) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module2.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports2, module2) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module2.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports2, module2) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      this.clear();
      while (++index < length) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module2.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports2, module2) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module2.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports2, module2) {
    function isKeyable(value) {
      var type2 = typeof value;
      return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
    }
    module2.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports2, module2) {
    var isKeyable = require_isKeyable();
    function getMapData(map2, key) {
      var data = map2.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module2.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports2, module2) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module2.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports2, module2) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module2.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports2, module2) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module2.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports2, module2) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module2.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports2, module2) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      this.clear();
      while (++index < length) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module2.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports2, module2) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module2.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports2, module2) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries2) {
      var data = this.__data__ = new ListCache(entries2);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module2.exports = Stack;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports2, module2) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module2.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports2, module2) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module2.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports2, module2) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module2.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports2, module2) {
    function arraySome(array2, predicate) {
      var index = -1, length = array2 == null ? 0 : array2.length;
      while (++index < length) {
        if (predicate(array2[index], index, array2)) {
          return true;
        }
      }
      return false;
    }
    module2.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports2, module2) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module2.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports2, module2) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array2, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array2.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array2);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array2;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array2, other);
      stack.set(other, array2);
      while (++index < arrLength) {
        var arrValue = array2[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array2);
      stack["delete"](other);
      return result;
    }
    module2.exports = equalArrays;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports2, module2) {
    var root2 = require_root();
    var Uint8Array2 = root2.Uint8Array;
    module2.exports = Uint8Array2;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports2, module2) {
    function mapToArray(map2) {
      var index = -1, result = Array(map2.size);
      map2.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    module2.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports2, module2) {
    function setToArray(set3) {
      var index = -1, result = Array(set3.size);
      set3.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    module2.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports2, module2) {
    var Symbol2 = require_Symbol();
    var Uint8Array2 = require_Uint8Array();
    var eq2 = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq2(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module2.exports = equalByTag;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports2, module2) {
    function arrayPush(array2, values) {
      var index = -1, length = values.length, offset = array2.length;
      while (++index < length) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    module2.exports = arrayPush;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports2, module2) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module2.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports2, module2) {
    function arrayFilter(array2, predicate) {
      var index = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array2[index];
        if (predicate(value, index, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module2.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports2, module2) {
    function stubArray() {
      return [];
    }
    module2.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports2, module2) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module2.exports = getSymbols;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports2, module2) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module2.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports2, module2) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module2.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports2, module2) {
    var getNative = require_getNative();
    var root2 = require_root();
    var DataView2 = getNative(root2, "DataView");
    module2.exports = DataView2;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports2, module2) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Promise2 = getNative(root2, "Promise");
    module2.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports2, module2) {
    var getNative = require_getNative();
    var root2 = require_root();
    var Set2 = getNative(root2, "Set");
    module2.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports2, module2) {
    var getNative = require_getNative();
    var root2 = require_root();
    var WeakMap2 = getNative(root2, "WeakMap");
    module2.exports = WeakMap2;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports2, module2) {
    var DataView2 = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView2);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module2.exports = getTag;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports2, module2) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module2.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports2, module2) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module2.exports = baseIsEqual;
  }
});

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js"(exports2, module2) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module2.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js"(exports2, module2) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module2.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js"(exports2, module2) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module2.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js"(exports2, module2) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module2.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js"(exports2, module2) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module2.exports = baseMatches;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports2, module2) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module2.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports2, module2) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type2 = typeof value;
      if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module2.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports2, module2) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module2.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports2, module2) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module2.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports2, module2) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number3, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number3 || match);
      });
      return result;
    });
    module2.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports2, module2) {
    function arrayMap(array2, iteratee) {
      var index = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array2[index], index, array2);
      }
      return result;
    }
    module2.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports2, module2) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports2, module2) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module2.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports2, module2) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module2.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports2, module2) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports2, module2) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module2.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports2, module2) {
    var baseGet = require_baseGet();
    function get3(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module2.exports = get3;
  }
});

// node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/lodash/_baseHasIn.js"(exports2, module2) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module2.exports = baseHasIn;
  }
});

// node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/lodash/_hasPath.js"(exports2, module2) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module2.exports = hasPath;
  }
});

// node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/lodash/hasIn.js"(exports2, module2) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module2.exports = hasIn;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js"(exports2, module2) {
    var baseIsEqual = require_baseIsEqual();
    var get3 = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get3(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module2.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports2, module2) {
    function identity4(value) {
      return value;
    }
    module2.exports = identity4;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js"(exports2, module2) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module2.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js"(exports2, module2) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module2.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js"(exports2, module2) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module2.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js"(exports2, module2) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity4 = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity4;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module2.exports = baseIteratee;
  }
});

// node_modules/lodash/_createAggregator.js
var require_createAggregator = __commonJS({
  "node_modules/lodash/_createAggregator.js"(exports2, module2) {
    var arrayAggregator = require_arrayAggregator();
    var baseAggregator = require_baseAggregator();
    var baseIteratee = require_baseIteratee();
    var isArray = require_isArray();
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    module2.exports = createAggregator;
  }
});

// node_modules/lodash/countBy.js
var require_countBy = __commonJS({
  "node_modules/lodash/countBy.js"(exports2, module2) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var countBy2 = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });
    module2.exports = countBy2;
  }
});

// node_modules/lodash/_baseExtremum.js
var require_baseExtremum = __commonJS({
  "node_modules/lodash/_baseExtremum.js"(exports2, module2) {
    var isSymbol = require_isSymbol();
    function baseExtremum(array2, iteratee, comparator) {
      var index = -1, length = array2.length;
      while (++index < length) {
        var value = array2[index], current = iteratee(value);
        if (current != null && (computed === void 0 ? current === current && !isSymbol(current) : comparator(current, computed))) {
          var computed = current, result = value;
        }
      }
      return result;
    }
    module2.exports = baseExtremum;
  }
});

// node_modules/lodash/_baseGt.js
var require_baseGt = __commonJS({
  "node_modules/lodash/_baseGt.js"(exports2, module2) {
    function baseGt(value, other) {
      return value > other;
    }
    module2.exports = baseGt;
  }
});

// node_modules/lodash/maxBy.js
var require_maxBy = __commonJS({
  "node_modules/lodash/maxBy.js"(exports2, module2) {
    var baseExtremum = require_baseExtremum();
    var baseGt = require_baseGt();
    var baseIteratee = require_baseIteratee();
    function maxBy2(array2, iteratee) {
      return array2 && array2.length ? baseExtremum(array2, baseIteratee(iteratee, 2), baseGt) : void 0;
    }
    module2.exports = maxBy2;
  }
});

// node_modules/lodash/_baseToPairs.js
var require_baseToPairs = __commonJS({
  "node_modules/lodash/_baseToPairs.js"(exports2, module2) {
    var arrayMap = require_arrayMap();
    function baseToPairs(object, props2) {
      return arrayMap(props2, function(key) {
        return [key, object[key]];
      });
    }
    module2.exports = baseToPairs;
  }
});

// node_modules/lodash/_setToPairs.js
var require_setToPairs = __commonJS({
  "node_modules/lodash/_setToPairs.js"(exports2, module2) {
    function setToPairs(set3) {
      var index = -1, result = Array(set3.size);
      set3.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    module2.exports = setToPairs;
  }
});

// node_modules/lodash/_createToPairs.js
var require_createToPairs = __commonJS({
  "node_modules/lodash/_createToPairs.js"(exports2, module2) {
    var baseToPairs = require_baseToPairs();
    var getTag = require_getTag();
    var mapToArray = require_mapToArray();
    var setToPairs = require_setToPairs();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }
    module2.exports = createToPairs;
  }
});

// node_modules/lodash/toPairs.js
var require_toPairs = __commonJS({
  "node_modules/lodash/toPairs.js"(exports2, module2) {
    var createToPairs = require_createToPairs();
    var keys = require_keys();
    var toPairs = createToPairs(keys);
    module2.exports = toPairs;
  }
});

// node_modules/lodash/entries.js
var require_entries = __commonJS({
  "node_modules/lodash/entries.js"(exports2, module2) {
    module2.exports = require_toPairs();
  }
});

// node_modules/lodash/_baseFindIndex.js
var require_baseFindIndex = __commonJS({
  "node_modules/lodash/_baseFindIndex.js"(exports2, module2) {
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length = array2.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array2[index], index, array2)) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = baseFindIndex;
  }
});

// node_modules/lodash/_baseIsNaN.js
var require_baseIsNaN = __commonJS({
  "node_modules/lodash/_baseIsNaN.js"(exports2, module2) {
    function baseIsNaN(value) {
      return value !== value;
    }
    module2.exports = baseIsNaN;
  }
});

// node_modules/lodash/_strictIndexOf.js
var require_strictIndexOf = __commonJS({
  "node_modules/lodash/_strictIndexOf.js"(exports2, module2) {
    function strictIndexOf(array2, value, fromIndex) {
      var index = fromIndex - 1, length = array2.length;
      while (++index < length) {
        if (array2[index] === value) {
          return index;
        }
      }
      return -1;
    }
    module2.exports = strictIndexOf;
  }
});

// node_modules/lodash/_baseIndexOf.js
var require_baseIndexOf = __commonJS({
  "node_modules/lodash/_baseIndexOf.js"(exports2, module2) {
    var baseFindIndex = require_baseFindIndex();
    var baseIsNaN = require_baseIsNaN();
    var strictIndexOf = require_strictIndexOf();
    function baseIndexOf(array2, value, fromIndex) {
      return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
    }
    module2.exports = baseIndexOf;
  }
});

// node_modules/lodash/_arrayIncludes.js
var require_arrayIncludes = __commonJS({
  "node_modules/lodash/_arrayIncludes.js"(exports2, module2) {
    var baseIndexOf = require_baseIndexOf();
    function arrayIncludes(array2, value) {
      var length = array2 == null ? 0 : array2.length;
      return !!length && baseIndexOf(array2, value, 0) > -1;
    }
    module2.exports = arrayIncludes;
  }
});

// node_modules/lodash/_arrayIncludesWith.js
var require_arrayIncludesWith = __commonJS({
  "node_modules/lodash/_arrayIncludesWith.js"(exports2, module2) {
    function arrayIncludesWith(array2, value, comparator) {
      var index = -1, length = array2 == null ? 0 : array2.length;
      while (++index < length) {
        if (comparator(value, array2[index])) {
          return true;
        }
      }
      return false;
    }
    module2.exports = arrayIncludesWith;
  }
});

// node_modules/lodash/noop.js
var require_noop = __commonJS({
  "node_modules/lodash/noop.js"(exports2, module2) {
    function noop2() {
    }
    module2.exports = noop2;
  }
});

// node_modules/lodash/_createSet.js
var require_createSet = __commonJS({
  "node_modules/lodash/_createSet.js"(exports2, module2) {
    var Set2 = require_Set();
    var noop2 = require_noop();
    var setToArray = require_setToArray();
    var INFINITY = 1 / 0;
    var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values) {
      return new Set2(values);
    };
    module2.exports = createSet;
  }
});

// node_modules/lodash/_baseUniq.js
var require_baseUniq = __commonJS({
  "node_modules/lodash/_baseUniq.js"(exports2, module2) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var cacheHas = require_cacheHas();
    var createSet = require_createSet();
    var setToArray = require_setToArray();
    var LARGE_ARRAY_SIZE = 200;
    function baseUniq(array2, iteratee, comparator) {
      var index = -1, includes = arrayIncludes, length = array2.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set3 = iteratee ? null : createSet(array2);
        if (set3) {
          return setToArray(set3);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer:
        while (++index < length) {
          var value = array2[index], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    module2.exports = baseUniq;
  }
});

// node_modules/lodash/uniqBy.js
var require_uniqBy = __commonJS({
  "node_modules/lodash/uniqBy.js"(exports2, module2) {
    var baseIteratee = require_baseIteratee();
    var baseUniq = require_baseUniq();
    function uniqBy2(array2, iteratee) {
      return array2 && array2.length ? baseUniq(array2, baseIteratee(iteratee, 2)) : [];
    }
    module2.exports = uniqBy2;
  }
});

// node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/lodash/_isFlattenable.js"(exports2, module2) {
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module2.exports = isFlattenable;
  }
});

// node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/lodash/_baseFlatten.js"(exports2, module2) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array2, depth, predicate, isStrict, result) {
      var index = -1, length = array2.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array2[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module2.exports = baseFlatten;
  }
});

// node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "node_modules/lodash/flatten.js"(exports2, module2) {
    var baseFlatten = require_baseFlatten();
    function flatten2(array2) {
      var length = array2 == null ? 0 : array2.length;
      return length ? baseFlatten(array2, 1) : [];
    }
    module2.exports = flatten2;
  }
});

// node_modules/lodash/uniqueId.js
var require_uniqueId = __commonJS({
  "node_modules/lodash/uniqueId.js"(exports2, module2) {
    var toString = require_toString();
    var idCounter = 0;
    function uniqueId2(prefix) {
      var id2 = ++idCounter;
      return toString(prefix) + id2;
    }
    module2.exports = uniqueId2;
  }
});

// src/index.jsx
var import_exec = __toModule(require_exec());
var core = __toModule(require_core());
var import_react3 = __toModule(require_react());
var import_server = __toModule(require_server());
var import_fs2 = __toModule(require("fs"));

// src/process-dir.js
var import_fs = __toModule(require("fs"));
var processDir = async (rootPath, excludedPaths = []) => {
  if (!rootPath) {
    console.log("no rootPath specified");
    return;
  }
  const foldersToIgnore = [".git", ...excludedPaths];
  const fullPathFoldersToIgnore = foldersToIgnore.map((d2) => `${rootPath}/${d2}`);
  const getFileStats = async (path = "") => {
    const stats = await import_fs.default.statSync(path);
    const name = path.split("/").filter(Boolean).slice(-1)[0];
    const size = stats.size;
    const relativePath = path.slice(rootPath.length + 1);
    return {
      name,
      path: relativePath,
      size
    };
  };
  const addItemToTree = async (path = "", isFolder = true) => {
    try {
      console.log("Looking in ", path);
      if (isFolder) {
        const files = await import_fs.default.readdirSync(path);
        const children2 = [];
        for (const file of files) {
          if (fullPathFoldersToIgnore.includes(rootPath + "/" + file)) {
            continue;
          }
          const info2 = import_fs.default.statSync(path + "/" + file);
          const stats2 = await addItemToTree(path + "/" + file, info2.isDirectory());
          if (stats2)
            children2.push(stats2);
        }
        const stats = await getFileStats(path);
        return { ...stats, children: children2 };
      } else {
        const stats = getFileStats(path);
        return stats;
      }
    } catch (e3) {
      console.log("Issue trying to read file", path, e3);
      return null;
    }
  };
  const tree = await addItemToTree(rootPath);
  return tree;
};

// src/Tree.tsx
var import_react2 = __toModule(require_react());

// node_modules/d3-array/src/ascending.js
function ascending_default(a2, b) {
  return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector_default(f2) {
  let delta = f2;
  let compare = f2;
  if (f2.length === 1) {
    delta = (d2, x2) => f2(d2) - x2;
    compare = ascendingComparator(f2);
  }
  function left(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a2[mid], x2) < 0)
        lo = mid + 1;
      else
        hi = mid;
    }
    return lo;
  }
  function right(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a2[mid], x2) > 0)
        hi = mid;
      else
        lo = mid + 1;
    }
    return lo;
  }
  function center(a2, x2, lo, hi) {
    if (lo == null)
      lo = 0;
    if (hi == null)
      hi = a2.length;
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function ascendingComparator(f2) {
  return (d2, x2) => ascending_default(f2(d2), x2);
}

// node_modules/d3-array/src/number.js
function number_default(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/extent.js
function extent_default(values, valueof) {
  let min;
  let max;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null) {
        if (min === void 0) {
          if (value >= value)
            min = max = value;
        } else {
          if (min > value)
            min = value;
          if (max < value)
            max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === void 0) {
          if (value >= value)
            min = max = value;
        } else {
          if (min > value)
            min = value;
          if (max < value)
            max = value;
        }
      }
    }
  }
  return [min, max];
}

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start2, stop, count2) {
  var reverse, i = -1, n2, ticks, step;
  stop = +stop, start2 = +start2, count2 = +count2;
  if (start2 === stop && count2 > 0)
    return [start2];
  if (reverse = stop < start2)
    n2 = start2, start2 = stop, stop = n2;
  if ((step = tickIncrement(start2, stop, count2)) === 0 || !isFinite(step))
    return [];
  if (step > 0) {
    let r0 = Math.round(start2 / step), r1 = Math.round(stop / step);
    if (r0 * step < start2)
      ++r0;
    if (r1 * step > stop)
      --r1;
    ticks = new Array(n2 = r1 - r0 + 1);
    while (++i < n2)
      ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start2 * step), r1 = Math.round(stop * step);
    if (r0 / step < start2)
      ++r0;
    if (r1 / step > stop)
      --r1;
    ticks = new Array(n2 = r1 - r0 + 1);
    while (++i < n2)
      ticks[i] = (r0 + i) / step;
  }
  if (reverse)
    ticks.reverse();
  return ticks;
}
function tickIncrement(start2, stop, count2) {
  var step = (stop - start2) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start2, stop, count2) {
  var step0 = Math.abs(stop - start2) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10)
    step1 *= 10;
  else if (error >= e5)
    step1 *= 5;
  else if (error >= e2)
    step1 *= 2;
  return stop < start2 ? -step1 : step1;
}

// node_modules/d3-array/src/range.js
function range_default(start2, stop, step) {
  start2 = +start2, stop = +stop, step = (n2 = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n2 < 3 ? 1 : +step;
  var i = -1, n2 = Math.max(0, Math.ceil((stop - start2) / step)) | 0, range = new Array(n2);
  while (++i < n2) {
    range[i] = start2 + i * step;
  }
  return range;
}

// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n2 = arguments.length, _10 = {}, t2; i < n2; ++i) {
    if (!(t2 = arguments[i] + "") || t2 in _10 || /[\s.]/.test(t2))
      throw new Error("illegal type: " + t2);
    _10[t2] = [];
  }
  return new Dispatch(_10);
}
function Dispatch(_10) {
  this._ = _10;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t2) {
    var name = "", i = t2.indexOf(".");
    if (i >= 0)
      name = t2.slice(i + 1), t2 = t2.slice(0, i);
    if (t2 && !types.hasOwnProperty(t2))
      throw new Error("unknown type: " + t2);
    return { type: t2, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _10 = this._, T = parseTypenames(typename + "", _10), t2, i = -1, n2 = T.length;
    if (arguments.length < 2) {
      while (++i < n2)
        if ((t2 = (typename = T[i]).type) && (t2 = get(_10[t2], typename.name)))
          return t2;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n2) {
      if (t2 = (typename = T[i]).type)
        _10[t2] = set(_10[t2], typename.name, callback);
      else if (callback == null)
        for (t2 in _10)
          _10[t2] = set(_10[t2], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy2 = {}, _10 = this._;
    for (var t2 in _10)
      copy2[t2] = _10[t2].slice();
    return new Dispatch(copy2);
  },
  call: function(type2, that) {
    if ((n2 = arguments.length - 2) > 0)
      for (var args = new Array(n2), i = 0, n2, t2; i < n2; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t2 = this._[type2], i = 0, n2 = t2.length; i < n2; ++i)
      t2[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t2 = this._[type2], i = 0, n2 = t2.length; i < n2; ++i)
      t2[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n2 = type2.length, c3; i < n2; ++i) {
    if ((c3 = type2[i]).name === name) {
      return c3.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n2 = type2.length; i < n2; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m4 = groups.length, subgroups = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x2) {
  return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m4 = groups.length, subgroups = [], parents = [], j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, node, i = 0; i < n2; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m4 = groups.length, subgroups = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = [], node, i = 0; i < n2; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m4 = groups.length, update = new Array(m4), enter = new Array(m4), exit = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    var parent = parents[j3], group = groups[j3], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j3, parents)), dataLength = data.length, enterGroup = enter[j3] = new Array(dataLength), updateGroup = update[j3] = new Array(dataLength), exitGroup = exit[j3] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m4 = Math.min(m0, m1), merges = new Array(m0), j3 = 0; j3 < m4; ++j3) {
    for (var group0 = groups0[j3], group1 = groups1[j3], n2 = group0.length, merge = merges[j3] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j3 < m0; ++j3) {
    merges[j3] = groups0[j3];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j3 = -1, m4 = groups.length; ++j3 < m4; ) {
    for (var group = groups[j3], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a2, b) {
    return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
  }
  for (var groups = this._groups, m4 = groups.length, sortgroups = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, sortgroup = sortgroups[j3] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j3 = 0, m4 = groups.length; j3 < m4; ++j3) {
    for (var group = groups[j3], i = 0, n2 = group.length; i < n2; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j3 = 0, m4 = groups.length; j3 < m4; ++j3) {
    for (var group = groups[j3], i = 0, n2 = group.length, node; i < n2; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v2);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v2);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v2, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (v2 == null)
      delete this[name];
    else
      this[name] = v2;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n2 = names.length;
  while (++i < n2)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n2 = names.length;
  while (++i < n2)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n2 = names.length;
    while (++i < n2)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.textContent = v2 == null ? "" : v2;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v2 = value.apply(this, arguments);
    this.innerHTML = v2 == null ? "" : v2;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t2) {
    var name = "", i = t2.indexOf(".");
    if (i >= 0)
      name = t2.slice(i + 1), t2 = t2.slice(0, i);
    return { type: t2, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j3 = 0, i = -1, m4 = on.length, o; j3 < m4; ++j3) {
      if (o = on[j3], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j3 = 0, m4 = on.length; j3 < m4; ++j3) {
        if ((o = on[j3]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n2 = typenames.length, t2;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j3 = 0, m4 = on.length, o; j3 < m4; ++j3) {
        for (i = 0, o = on[j3]; i < n2; ++i) {
          if ((t2 = typenames[i]).type === o.type && t2.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n2; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j3 = 0, m4 = groups.length; j3 < m4; ++j3) {
    for (var group = groups[j3], i = 0, n2 = group.length, node; i < n2; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m4, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m4 = reHex.exec(format2)) ? (l2 = m4[1].length, m4 = parseInt(m4[1], 16), l2 === 6 ? rgbn(m4) : l2 === 3 ? new Rgb(m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, (m4 & 15) << 4 | m4 & 15, 1) : l2 === 8 ? rgba(m4 >> 24 & 255, m4 >> 16 & 255, m4 >> 8 & 255, (m4 & 255) / 255) : l2 === 4 ? rgba(m4 >> 12 & 15 | m4 >> 8 & 240, m4 >> 8 & 15 | m4 >> 4 & 240, m4 >> 4 & 15 | m4 & 240, ((m4 & 15) << 4 | m4 & 15) / 255) : null) : (m4 = reRgbInteger.exec(format2)) ? new Rgb(m4[1], m4[2], m4[3], 1) : (m4 = reRgbPercent.exec(format2)) ? new Rgb(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, 1) : (m4 = reRgbaInteger.exec(format2)) ? rgba(m4[1], m4[2], m4[3], m4[4]) : (m4 = reRgbaPercent.exec(format2)) ? rgba(m4[1] * 255 / 100, m4[2] * 255 / 100, m4[3] * 255 / 100, m4[4]) : (m4 = reHslPercent.exec(format2)) ? hsla(m4[1], m4[2] / 100, m4[3] / 100, 1) : (m4 = reHslaPercent.exec(format2)) ? hsla(m4[1], m4[2] / 100, m4[3] / 100, m4[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r4, g2, b, a2) {
  if (a2 <= 0)
    r4 = g2 = b = NaN;
  return new Rgb(r4, g2, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r4, g2, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r4) : new Rgb(r4, g2, b, opacity == null ? 1 : opacity);
}
function Rgb(r4, g2, b, opacity) {
  this.r = +r4;
  this.g = +g2;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a2 = this.opacity;
  a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
  return (a2 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a2 === 1 ? ")" : ", " + a2 + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s, l2, a2) {
  if (a2 <= 0)
    h2 = s = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1)
    h2 = s = NaN;
  else if (s <= 0)
    h2 = NaN;
  return new Hsl(h2, s, l2, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r4 = o.r / 255, g2 = o.g / 255, b = o.b / 255, min = Math.min(r4, g2, b), max = Math.max(r4, g2, b), h2 = NaN, s = max - min, l2 = (max + min) / 2;
  if (s) {
    if (r4 === max)
      h2 = (g2 - b) / s + (g2 < b) * 6;
    else if (g2 === max)
      h2 = (b - r4) / s + 2;
    else
      h2 = (r4 - g2) / s + 4;
    s /= l2 < 0.5 ? max + min : 2 - max - min;
    h2 *= 60;
  } else {
    s = l2 > 0 && l2 < 1 ? 0 : h2;
  }
  return new Hsl(h2, s, l2, o.opacity);
}
function hsl(h2, s, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s, l2, opacity == null ? 1 : opacity);
}
function Hsl(h2, s, l2, opacity) {
  this.h = +h2;
  this.s = +s;
  this.l = +l2;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m23 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s, m1 = 2 * l2 - m23;
    return new Rgb(hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m23), hsl2rgb(h2, m1, m23), hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m23), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a2 = this.opacity;
    a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
    return (a2 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a2 === 1 ? ")" : ", " + a2 + ")");
  }
}));
function hsl2rgb(h2, m1, m23) {
  return (h2 < 60 ? m1 + (m23 - m1) * h2 / 60 : h2 < 180 ? m23 : h2 < 240 ? m1 + (m23 - m1) * (240 - h2) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t2 = t12 * t12, t3 = t2 * t12;
  return ((1 - 3 * t12 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t12 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n2 = values.length - 1;
  return function(t2) {
    var i = t2 <= 0 ? t2 = 0 : t2 >= 1 ? (t2 = 1, n2 - 1) : Math.floor(t2 * n2), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n2 - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t2 - i / n2) * n2, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n2 = values.length;
  return function(t2) {
    var i = Math.floor(((t2 %= 1) < 0 ? ++t2 : t2) * n2), v0 = values[(i + n2 - 1) % n2], v1 = values[i % n2], v2 = values[(i + 1) % n2], v3 = values[(i + 2) % n2];
    return basis((t2 - i / n2) * n2, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a2, d2) {
  return function(t2) {
    return a2 + t2 * d2;
  };
}
function exponential(a2, b, y3) {
  return a2 = Math.pow(a2, y3), b = Math.pow(b, y3) - a2, y3 = 1 / y3, function(t2) {
    return Math.pow(a2 + t2 * b, y3);
  };
}
function gamma(y3) {
  return (y3 = +y3) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y3) : constant_default2(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d2 = b - a2;
  return d2 ? linear(a2, d2) : constant_default2(isNaN(a2) ? b : a2);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y3) {
  var color2 = gamma(y3);
  function rgb2(start2, end) {
    var r4 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g2 = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t2) {
      start2.r = r4(t2);
      start2.g = g2(t2);
      start2.b = b(t2);
      start2.opacity = opacity(t2);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n2 = colors.length, r4 = new Array(n2), g2 = new Array(n2), b = new Array(n2), i, color2;
    for (i = 0; i < n2; ++i) {
      color2 = rgb(colors[i]);
      r4[i] = color2.r || 0;
      g2[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r4 = spline(r4);
    g2 = spline(g2);
    b = spline(b);
    color2.opacity = 1;
    return function(t2) {
      color2.r = r4(t2);
      color2.g = g2(t2);
      color2.b = b(t2);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a2, b) {
  if (!b)
    b = [];
  var n2 = a2 ? Math.min(b.length, a2.length) : 0, c3 = b.slice(), i;
  return function(t2) {
    for (i = 0; i < n2; ++i)
      c3[i] = a2[i] * (1 - t2) + b[i] * t2;
    return c3;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a2, b) {
  var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c3 = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x2[i] = value_default(a2[i], b[i]);
  for (; i < nb; ++i)
    c3[i] = b[i];
  return function(t2) {
    for (i = 0; i < na; ++i)
      c3[i] = x2[i](t2);
    return c3;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a2, b) {
  var d2 = new Date();
  return a2 = +a2, b = +b, function(t2) {
    return d2.setTime(a2 * (1 - t2) + b * t2), d2;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default2(a2, b) {
  return a2 = +a2, b = +b, function(t2) {
    return a2 * (1 - t2) + b * t2;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a2, b) {
  var i = {}, c3 = {}, k;
  if (a2 === null || typeof a2 !== "object")
    a2 = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a2) {
      i[k] = value_default(a2[k], b[k]);
    } else {
      c3[k] = b[k];
    }
  }
  return function(t2) {
    for (k in i)
      c3[k] = i[k](t2);
    return c3;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t2) {
    return b(t2) + "";
  };
}
function string_default(a2, b) {
  var bi2 = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q2 = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi2) {
      bs = b.slice(bi2, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q2.push({ i, x: number_default2(am, bm) });
    }
    bi2 = reB.lastIndex;
  }
  if (bi2 < b.length) {
    bs = b.slice(bi2);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q2[0] ? one(q2[0].x) : zero(b) : (b = q2.length, function(t2) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q2[i2]).i] = o.x(t2);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a2, b) {
  var t2 = typeof b, c3;
  return b == null || t2 === "boolean" ? constant_default2(b) : (t2 === "number" ? number_default2 : t2 === "string" ? (c3 = color(b)) ? (b = c3, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default2)(a2, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a2, b) {
  return a2 = +a2, b = +b, function(t2) {
    return Math.round(a2 * (1 - t2) + b * t2);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c3, d2, e3, f2) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b))
    a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c3 + b * d2)
    c3 -= a2 * skewX, d2 -= b * skewX;
  if (scaleY = Math.sqrt(c3 * c3 + d2 * d2))
    c3 /= scaleY, d2 /= scaleY, skewX /= scaleY;
  if (a2 * d2 < b * c3)
    a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e3,
    translateY: f2,
    rotate: Math.atan2(b, a2) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m4 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m4.isIdentity ? identity : decompose_default(m4.a, m4.b, m4.c, m4.d, m4.e, m4.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q2.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b, s, q2) {
    if (a2 !== b) {
      if (a2 - b > 180)
        b += 360;
      else if (b - a2 > 180)
        a2 += 360;
      q2.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default2(a2, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s, q2) {
    if (a2 !== b) {
      q2.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default2(a2, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q2.push({ i: i - 4, x: number_default2(xa, xb) }, { i: i - 2, x: number_default2(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s = [], q2 = [];
    a2 = parse(a2), b = parse(b);
    translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s, q2);
    rotate(a2.rotate, b.rotate, s, q2);
    skewX(a2.skewX, b.skewX, s, q2);
    scale(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s, q2);
    a2 = b = null;
    return function(t2) {
      var i = -1, n2 = q2.length, o;
      while (++i < n2)
        s[(o = q2[i]).i] = o.x(t2);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f2) {
  setTimeout(f2, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t2 = new Timer();
  t2.restart(callback, delay, time);
  return t2;
}
function timerFlush() {
  now();
  ++frame;
  var t2 = taskHead, e3;
  while (t2) {
    if ((e3 = clockNow - t2._time) >= 0)
      t2._call.call(void 0, e3);
    t2 = t2._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t02, t12 = taskHead, t2, time = Infinity;
  while (t12) {
    if (t12._call) {
      if (time > t12._time)
        time = t12._time;
      t02 = t12, t12 = t12._next;
    } else {
      t2 = t12._next, t12._next = null;
      t12 = t02 ? t02._next = t2 : taskHead = t2;
    }
  }
  taskTail = t02;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t2 = new Timer();
  delay = delay == null ? 0 : +delay;
  t2.restart((elapsed) => {
    t2.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t2;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index,
    group,
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self3) {
  var schedules = node.__transition, tween;
  schedules[id2] = self3;
  self3.timer = timer(schedule, 0, self3.time);
  function schedule(elapsed) {
    self3.state = SCHEDULED;
    self3.timer.restart(start2, self3.delay, self3.time);
    if (self3.delay <= elapsed)
      start2(elapsed - self3.delay);
  }
  function start2(elapsed) {
    var i, j3, n2, o;
    if (self3.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self3.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self3.state === STARTED) {
        self3.state = RUNNING;
        self3.timer.restart(tick, self3.delay, self3.time);
        tick(elapsed);
      }
    });
    self3.state = STARTING;
    self3.on.call("start", node, node.__data__, self3.index, self3.group);
    if (self3.state !== STARTING)
      return;
    self3.state = STARTED;
    tween = new Array(n2 = self3.tween.length);
    for (i = 0, j3 = -1; i < n2; ++i) {
      if (o = self3.tween[i].value.call(node, node.__data__, self3.index, self3.group)) {
        tween[++j3] = o;
      }
    }
    tween.length = j3 + 1;
  }
  function tick(elapsed) {
    var t2 = elapsed < self3.duration ? self3.ease.call(null, elapsed / self3.duration) : (self3.timer.restart(stop), self3.state = ENDING, 1), i = -1, n2 = tween.length;
    while (++i < n2) {
      tween[i].call(node, t2);
    }
    if (self3.state === ENDING) {
      self3.on.call("end", node, node.__data__, self3.index, self3.group);
      stop();
    }
  }
  function stop() {
    self3.state = ENDED;
    self3.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n2 = tween1.length; i < n2; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t2 = { name, value }, i = 0, n2 = tween1.length; i < n2; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t2;
          break;
        }
      }
      if (i === n2)
        tween1.push(t2);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n2 = tween.length, t2; i < n2; ++i) {
      if ((t2 = tween[i]).name === name) {
        return t2.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a2, b) {
  var c3;
  return (typeof b === "number" ? number_default2 : b instanceof color ? rgb_default : (c3 = color(b)) ? (b = c3, rgb_default) : string_default)(a2, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t2) {
    this.setAttribute(name, i.call(this, t2));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t2) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t2));
  };
}
function attrTweenNS(fullname, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && attrInterpolate(name, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v2 = value.apply(this, arguments);
    if (typeof v2 !== "function")
      throw new Error();
    set2(this, id2).ease = v2;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m4 = groups.length, subgroups = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = [], node, i = 0; i < n2; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m4 = Math.min(m0, m1), merges = new Array(m0), j3 = 0; j3 < m4; ++j3) {
    for (var group0 = groups0[j3], group1 = groups1[j3], n2 = group0.length, merge = merges[j3] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j3 < m0; ++j3) {
    merges[j3] = groups0[j3];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t2) {
    var i = t2.indexOf(".");
    if (i >= 0)
      t2 = t2.slice(0, i);
    return !t2 || t2 === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m4 = groups.length, subgroups = new Array(m4), j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, subgroup = subgroups[j3] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m4 = groups.length, subgroups = [], parents = [], j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, node, i = 0; i < n2; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l2 = children2.length; k < l2; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t2) {
    this.style.setProperty(name, i.call(this, t2), priority);
  };
}
function styleTween(name, value, priority) {
  var t2, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t2 = (i0 = i) && styleInterpolate(name, i, priority);
    return t2;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t2) {
    this.textContent = i.call(this, t2);
  };
}
function textTween(value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t02 = (i0 = i) && textInterpolate(i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m4 = groups.length, j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, node, i = 0; i < n2; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default2,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t2) {
  return ((t2 *= 2) <= 1 ? t2 * t2 * t2 : (t2 -= 2) * t2 * t2 + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m4 = groups.length, j3 = 0; j3 < m4; ++j3) {
    for (var group = groups[j3], n2 = group.length, node, i = 0; i < n2; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/brush.js
function number1(e3) {
  return [+e3[0], +e3[1]];
}
function number2(e3) {
  return [number1(e3[0]), number1(e3[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x2, e3) {
    return x2 == null ? null : [[+x2[0], e3[0][1]], [+x2[1], e3[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y3, e3) {
    return y3 == null ? null : [[e3[0][0], +y3[0]], [e3[1][0], +y3[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t2) {
  return { type: t2 };
}

// node_modules/d3-quadtree/src/add.js
function add_default(d2) {
  const x2 = +this._x.call(null, d2), y3 = +this._y.call(null, d2);
  return add(this.cover(x2, y3), x2, y3, d2);
}
function add(tree, x2, y3, d2) {
  if (isNaN(x2) || isNaN(y3))
    return tree;
  var parent, node = tree._root, leaf = { data: d2 }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j3;
  if (!node)
    return tree._root = leaf, tree;
  while (node.length) {
    if (right = x2 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right]))
      return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x2 === xp && y3 === yp)
    return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x2 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
  } while ((i = bottom << 1 | right) === (j3 = (yp >= ym) << 1 | xp >= xm));
  return parent[j3] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d2, i, n2 = data.length, x2, y3, xz = new Array(n2), yz = new Array(n2), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (i = 0; i < n2; ++i) {
    if (isNaN(x2 = +this._x.call(null, d2 = data[i])) || isNaN(y3 = +this._y.call(null, d2)))
      continue;
    xz[i] = x2;
    yz[i] = y3;
    if (x2 < x0)
      x0 = x2;
    if (x2 > x1)
      x1 = x2;
    if (y3 < y0)
      y0 = y3;
    if (y3 > y1)
      y1 = y3;
  }
  if (x0 > x1 || y0 > y1)
    return this;
  this.cover(x0, y0).cover(x1, y1);
  for (i = 0; i < n2; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x2, y3) {
  if (isNaN(x2 = +x2) || isNaN(y3 = +y3))
    return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x2)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x1 - x0 || 1, node = this._root, parent, i;
    while (x0 > x2 || x2 >= x1 || y0 > y3 || y3 >= y1) {
      i = (y3 < y0) << 1 | x2 < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length)
      this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

// node_modules/d3-quadtree/src/data.js
function data_default2() {
  var data = [];
  this.visit(function(node) {
    if (!node.length)
      do
        data.push(node.data);
      while (node = node.next);
  });
  return data;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default2(_10) {
  return arguments.length ? this.cover(+_10[0][0], +_10[0][1]).cover(+_10[1][0], +_10[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x2, y3, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x3 = this._x1, y32 = this._y1, quads = [], node = this._root, q2, i;
  if (node)
    quads.push(new quad_default(node, x0, y0, x3, y32));
  if (radius == null)
    radius = Infinity;
  else {
    x0 = x2 - radius, y0 = y3 - radius;
    x3 = x2 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q2 = quads.pop()) {
    if (!(node = q2.node) || (x1 = q2.x0) > x3 || (y1 = q2.y0) > y32 || (x22 = q2.x1) < x0 || (y22 = q2.y1) < y0)
      continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(new quad_default(node[3], xm, ym, x22, y22), new quad_default(node[2], x1, ym, xm, y22), new quad_default(node[1], xm, y1, x22, ym), new quad_default(node[0], x1, y1, xm, ym));
      if (i = (y3 >= ym) << 1 | x2 >= xm) {
        q2 = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q2;
      }
    } else {
      var dx = x2 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d3 = Math.sqrt(radius = d2);
        x0 = x2 - d3, y0 = y3 - d3;
        x3 = x2 + d3, y32 = y3 + d3;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default3(d2) {
  if (isNaN(x2 = +this._x.call(null, d2)) || isNaN(y3 = +this._y.call(null, d2)))
    return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x2, y3, xm, ym, right, bottom, i, j3;
  if (!node)
    return this;
  if (node.length)
    while (true) {
      if (right = x2 >= (xm = (x0 + x1) / 2))
        x0 = xm;
      else
        x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right]))
        return this;
      if (!node.length)
        break;
      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
        retainer = parent, j3 = i;
    }
  while (node.data !== d2)
    if (!(previous = node, node = node.next))
      return this;
  if (next = node.next)
    delete node.next;
  if (previous)
    return next ? previous.next = next : delete previous.next, this;
  if (!parent)
    return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer)
      retainer[j3] = node;
    else
      this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n2 = data.length; i < n2; ++i)
    this.remove(data[i]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default2() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length)
      do
        ++size;
      while (node = node.next);
  });
  return size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q2, node = this._root, child, x0, y0, x1, y1;
  if (node)
    quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    if (!callback(node = q2.node, x0 = q2.x0, y0 = q2.y0, x1 = q2.x1, y1 = q2.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q2;
  if (this._root)
    quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q2 = quads.pop()) {
    var node = q2.node;
    if (node.length) {
      var child, x0 = q2.x0, y0 = q2.y0, x1 = q2.x1, y1 = q2.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
    }
    next.push(q2);
  }
  while (q2 = next.pop()) {
    callback(q2.node, q2.x0, q2.y0, q2.x1, q2.y1);
  }
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d2) {
  return d2[0];
}
function x_default(_10) {
  return arguments.length ? (this._x = _10, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d2) {
  return d2[1];
}
function y_default(_10) {
  return arguments.length ? (this._y = _10, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x2, y3) {
  var tree = new Quadtree(x2 == null ? defaultX : x2, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x2, y3, x0, y0, x1, y1) {
  this._x = x2;
  this._y = y3;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy2 = { data: leaf.data }, next = copy2;
  while (leaf = leaf.next)
    next = next.next = { data: leaf.data };
  return copy2;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy2 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node)
    return copy2;
  if (!node.length)
    return copy2._root = leaf_copy(node), copy2;
  nodes = [{ source: node, target: copy2._root = new Array(4) }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length)
          nodes.push({ source: child, target: node.target[i] = new Array(4) });
        else
          node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy2;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default2;
treeProto.extent = extent_default2;
treeProto.find = find_default;
treeProto.remove = remove_default3;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default2;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/constant.js
function constant_default4(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default(random) {
  return (random() - 0.5) * 1e-6;
}

// node_modules/d3-force/src/collide.js
function x(d2) {
  return d2.x + d2.vx;
}
function y(d2) {
  return d2.y + d2.vy;
}
function collide_default(radius) {
  var nodes, radii, random, strength = 1, iterations = 1;
  if (typeof radius !== "function")
    radius = constant_default4(radius == null ? 1 : +radius);
  function force() {
    var i, n2 = nodes.length, tree, node, xi, yi, ri, ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n2; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r4 = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x2 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l2 = x2 * x2 + y3 * y3;
          if (l2 < r4 * r4) {
            if (x2 === 0)
              x2 = jiggle_default(random), l2 += x2 * x2;
            if (y3 === 0)
              y3 = jiggle_default(random), l2 += y3 * y3;
            l2 = (r4 - (l2 = Math.sqrt(l2))) / l2 * strength;
            node.vx += (x2 *= l2) * (r4 = (rj *= rj) / (ri2 + rj));
            node.vy += (y3 *= l2) * r4;
            data.vx -= x2 * (r4 = 1 - r4);
            data.vy -= y3 * r4;
          }
        }
        return;
      }
      return x0 > xi + r4 || x1 < xi - r4 || y0 > yi + r4 || y1 < yi - r4;
    }
  }
  function prepare(quad) {
    if (quad.data)
      return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n2 = nodes.length, node;
    radii = new Array(n2);
    for (i = 0; i < n2; ++i)
      node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.iterations = function(_10) {
    return arguments.length ? (iterations = +_10, force) : iterations;
  };
  force.strength = function(_10) {
    return arguments.length ? (strength = +_10, force) : strength;
  };
  force.radius = function(_10) {
    return arguments.length ? (radius = typeof _10 === "function" ? _10 : constant_default4(+_10), initialize(), force) : radius;
  };
  return force;
}

// node_modules/d3-force/src/lcg.js
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

// node_modules/d3-force/src/simulation.js
var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
  if (nodes == null)
    nodes = [];
  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i, n2 = nodes.length, node;
    if (iterations === void 0)
      iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function(force) {
        force(alpha);
      });
      for (i = 0; i < n2; ++i) {
        node = nodes[i];
        if (node.fx == null)
          node.x += node.vx *= velocityDecay;
        else
          node.x = node.fx, node.vx = 0;
        if (node.fy == null)
          node.y += node.vy *= velocityDecay;
        else
          node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null)
        node.x = node.fx;
      if (node.fy != null)
        node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize)
      force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation;
    },
    stop: function() {
      return stepper.stop(), simulation;
    },
    nodes: function(_10) {
      return arguments.length ? (nodes = _10, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },
    alpha: function(_10) {
      return arguments.length ? (alpha = +_10, simulation) : alpha;
    },
    alphaMin: function(_10) {
      return arguments.length ? (alphaMin = +_10, simulation) : alphaMin;
    },
    alphaDecay: function(_10) {
      return arguments.length ? (alphaDecay = +_10, simulation) : +alphaDecay;
    },
    alphaTarget: function(_10) {
      return arguments.length ? (alphaTarget = +_10, simulation) : alphaTarget;
    },
    velocityDecay: function(_10) {
      return arguments.length ? (velocityDecay = 1 - _10, simulation) : 1 - velocityDecay;
    },
    randomSource: function(_10) {
      return arguments.length ? (random = _10, forces.forEach(initializeForce), simulation) : random;
    },
    force: function(name, _10) {
      return arguments.length > 1 ? (_10 == null ? forces.delete(name) : forces.set(name, initializeForce(_10)), simulation) : forces.get(name);
    },
    find: function(x2, y3, radius) {
      var i = 0, n2 = nodes.length, dx, dy, d2, node, closest;
      if (radius == null)
        radius = Infinity;
      else
        radius *= radius;
      for (i = 0; i < n2; ++i) {
        node = nodes[i];
        dx = x2 - node.x;
        dy = y3 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius)
          closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _10) {
      return arguments.length > 1 ? (event.on(name, _10), simulation) : event.on(name);
    }
  };
}

// node_modules/d3-force/src/x.js
function x_default2(x2) {
  var strength = constant_default4(0.1), nodes, strengths, xz;
  if (typeof x2 !== "function")
    x2 = constant_default4(x2 == null ? 0 : +x2);
  function force(alpha) {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n2 = nodes.length;
    strengths = new Array(n2);
    xz = new Array(n2);
    for (i = 0; i < n2; ++i) {
      strengths[i] = isNaN(xz[i] = +x2(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_10) {
    nodes = _10;
    initialize();
  };
  force.strength = function(_10) {
    return arguments.length ? (strength = typeof _10 === "function" ? _10 : constant_default4(+_10), initialize(), force) : strength;
  };
  force.x = function(_10) {
    return arguments.length ? (x2 = typeof _10 === "function" ? _10 : constant_default4(+_10), initialize(), force) : x2;
  };
  return force;
}

// node_modules/d3-force/src/y.js
function y_default2(y3) {
  var strength = constant_default4(0.1), nodes, strengths, yz;
  if (typeof y3 !== "function")
    y3 = constant_default4(y3 == null ? 0 : +y3);
  function force(alpha) {
    for (var i = 0, n2 = nodes.length, node; i < n2; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n2 = nodes.length;
    strengths = new Array(n2);
    yz = new Array(n2);
    for (i = 0; i < n2; ++i) {
      strengths[i] = isNaN(yz[i] = +y3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_10) {
    nodes = _10;
    initialize();
  };
  force.strength = function(_10) {
    return arguments.length ? (strength = typeof _10 === "function" ? _10 : constant_default4(+_10), initialize(), force) : strength;
  };
  force.y = function(_10) {
    return arguments.length ? (y3 = typeof _10 === "function" ? _10 : constant_default4(+_10), initialize(), force) : y3;
  };
  return force;
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p2) {
  if ((i = (x2 = p2 ? x2.toExponential(p2 - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width2) {
    var i = value.length, t2 = [], j3 = 0, g2 = grouping[0], length = 0;
    while (i > 0 && g2 > 0) {
      if (length + g2 + 1 > width2)
        g2 = Math.max(1, width2 - length);
      t2.push(value.substring(i -= g2, i + g2));
      if ((length += g2 + 1) > width2)
        break;
      g2 = grouping[j3 = (j3 + 1) % grouping.length];
    }
    return t2.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out:
    for (var n2 = s.length, i = 1, i0 = -1, i1; i < n2; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p2) {
  var d2 = formatDecimalParts(x2, p2);
  if (!d2)
    return x2 + "";
  var coefficient = d2[0], exponent = d2[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n2 = coefficient.length;
  return i === n2 ? coefficient : i > n2 ? coefficient + new Array(i - n2 + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p2 + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p2) {
  var d2 = formatDecimalParts(x2, p2);
  if (!d2)
    return x2 + "";
  var coefficient = d2[0], exponent = d2[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x2, p2) => (x2 * 100).toFixed(p2),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal_default,
  "e": (x2, p2) => x2.toExponential(p2),
  "f": (x2, p2) => x2.toFixed(p2),
  "g": (x2, p2) => x2.toPrecision(p2),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p2) => formatRounded_default(x2 * 100, p2),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "\u2212" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width2 = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n")
      comma = true, type2 = "g";
    else if (!formatTypes_default[type2])
      precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n2, c3;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n2 = value.length;
          while (++i < n2) {
            if (c3 = value.charCodeAt(i), 48 > c3 || c3 > 57) {
              valueSuffix = (c3 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width2 ? new Array(width2 - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group(padding + value, padding.length ? width2 - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f2 = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e3 = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e3), prefix = prefixes[8 + e3 / 3];
    return function(value2) {
      return f2(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent_default(max) - exponent_default(step)) + 1;
}

// node_modules/d3-hierarchy/src/hierarchy/count.js
function count(node) {
  var sum = 0, children2 = node.children, i = children2 && children2.length;
  if (!i)
    sum = 1;
  else
    while (--i >= 0)
      sum += children2[i].value;
  node.value = sum;
}
function count_default() {
  return this.eachAfter(count);
}

// node_modules/d3-hierarchy/src/hierarchy/each.js
function each_default2(callback, that) {
  let index = -1;
  for (const node of this) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function eachBefore_default(callback, that) {
  var node = this, nodes = [node], children2, i, index = -1;
  while (node = nodes.pop()) {
    callback.call(that, node, ++index, this);
    if (children2 = node.children) {
      for (i = children2.length - 1; i >= 0; --i) {
        nodes.push(children2[i]);
      }
    }
  }
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function eachAfter_default(callback, that) {
  var node = this, nodes = [node], next = [], children2, i, n2, index = -1;
  while (node = nodes.pop()) {
    next.push(node);
    if (children2 = node.children) {
      for (i = 0, n2 = children2.length; i < n2; ++i) {
        nodes.push(children2[i]);
      }
    }
  }
  while (node = next.pop()) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/find.js
function find_default2(callback, that) {
  let index = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}

// node_modules/d3-hierarchy/src/hierarchy/sum.js
function sum_default(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0, children2 = node.children, i = children2 && children2.length;
    while (--i >= 0)
      sum += children2[i].value;
    node.value = sum;
  });
}

// node_modules/d3-hierarchy/src/hierarchy/sort.js
function sort_default2(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

// node_modules/d3-hierarchy/src/hierarchy/path.js
function path_default(end) {
  var start2 = this, ancestor = leastCommonAncestor(start2, end), nodes = [start2];
  while (start2 !== ancestor) {
    start2 = start2.parent;
    nodes.push(start2);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a2, b) {
  if (a2 === b)
    return a2;
  var aNodes = a2.ancestors(), bNodes = b.ancestors(), c3 = null;
  a2 = aNodes.pop();
  b = bNodes.pop();
  while (a2 === b) {
    c3 = a2;
    a2 = aNodes.pop();
    b = bNodes.pop();
  }
  return c3;
}

// node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ancestors_default() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

// node_modules/d3-hierarchy/src/hierarchy/descendants.js
function descendants_default() {
  return Array.from(this);
}

// node_modules/d3-hierarchy/src/hierarchy/leaves.js
function leaves_default() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

// node_modules/d3-hierarchy/src/hierarchy/links.js
function links_default() {
  var root2 = this, links = [];
  root2.each(function(node) {
    if (node !== root2) {
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}

// node_modules/d3-hierarchy/src/hierarchy/iterator.js
function* iterator_default2() {
  var node = this, current, next = [node], children2, i, n2;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      yield node;
      if (children2 = node.children) {
        for (i = 0, n2 = children2.length; i < n2; ++i) {
          next.push(children2[i]);
        }
      }
    }
  } while (next.length);
}

// node_modules/d3-hierarchy/src/hierarchy/index.js
function hierarchy(data, children2) {
  if (data instanceof Map) {
    data = [void 0, data];
    if (children2 === void 0)
      children2 = mapChildren;
  } else if (children2 === void 0) {
    children2 = objectChildren;
  }
  var root2 = new Node(data), node, nodes = [root2], child, childs, i, n2;
  while (node = nodes.pop()) {
    if ((childs = children2(node.data)) && (n2 = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n2 - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root2.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d2) {
  return d2.children;
}
function mapChildren(d2) {
  return Array.isArray(d2) ? d2[1] : null;
}
function copyData(node) {
  if (node.data.value !== void 0)
    node.value = node.data.value;
  node.data = node.data.data;
}
function computeHeight(node) {
  var height2 = 0;
  do
    node.height = height2;
  while ((node = node.parent) && node.height < ++height2);
}
function Node(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: count_default,
  each: each_default2,
  eachAfter: eachAfter_default,
  eachBefore: eachBefore_default,
  find: find_default2,
  sum: sum_default,
  sort: sort_default2,
  path: path_default,
  ancestors: ancestors_default,
  descendants: descendants_default,
  leaves: leaves_default,
  links: links_default,
  copy: node_copy,
  [Symbol.iterator]: iterator_default2
};

// node_modules/d3-hierarchy/src/array.js
function array_default(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function shuffle(array2) {
  var m4 = array2.length, t2, i;
  while (m4) {
    i = Math.random() * m4-- | 0;
    t2 = array2[m4];
    array2[m4] = array2[i];
    array2[i] = t2;
  }
  return array2;
}

// node_modules/d3-hierarchy/src/pack/enclose.js
function enclose_default(circles) {
  var i = 0, n2 = (circles = shuffle(Array.from(circles))).length, B = [], p2, e3;
  while (i < n2) {
    p2 = circles[i];
    if (e3 && enclosesWeak(e3, p2))
      ++i;
    else
      e3 = encloseBasis(B = extendBasis(B, p2)), i = 0;
  }
  return e3;
}
function extendBasis(B, p2) {
  var i, j3;
  if (enclosesWeakAll(p2, B))
    return [p2];
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p2, B[i]) && enclosesWeakAll(encloseBasis2(B[i], p2), B)) {
      return [B[i], p2];
    }
  }
  for (i = 0; i < B.length - 1; ++i) {
    for (j3 = i + 1; j3 < B.length; ++j3) {
      if (enclosesNot(encloseBasis2(B[i], B[j3]), p2) && enclosesNot(encloseBasis2(B[i], p2), B[j3]) && enclosesNot(encloseBasis2(B[j3], p2), B[i]) && enclosesWeakAll(encloseBasis3(B[i], B[j3], p2), B)) {
        return [B[i], B[j3], p2];
      }
    }
  }
  throw new Error();
}
function enclosesNot(a2, b) {
  var dr = a2.r - b.r, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}
function enclosesWeak(a2, b) {
  var dr = a2.r - b.r + Math.max(a2.r, b.r, 1) * 1e-9, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function enclosesWeakAll(a2, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a2, B[i])) {
      return false;
    }
  }
  return true;
}
function encloseBasis(B) {
  switch (B.length) {
    case 1:
      return encloseBasis1(B[0]);
    case 2:
      return encloseBasis2(B[0], B[1]);
    case 3:
      return encloseBasis3(B[0], B[1], B[2]);
  }
}
function encloseBasis1(a2) {
  return {
    x: a2.x,
    y: a2.y,
    r: a2.r
  };
}
function encloseBasis2(a2, b) {
  var x1 = a2.x, y1 = a2.y, r1 = a2.r, x2 = b.x, y22 = b.y, r22 = b.r, x21 = x2 - x1, y21 = y22 - y1, r21 = r22 - r1, l2 = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l2 * r21) / 2,
    y: (y1 + y22 + y21 / l2 * r21) / 2,
    r: (l2 + r1 + r22) / 2
  };
}
function encloseBasis3(a2, b, c3) {
  var x1 = a2.x, y1 = a2.y, r1 = a2.r, x2 = b.x, y22 = b.y, r22 = b.r, x3 = c3.x, y3 = c3.y, r32 = c3.r, a22 = x1 - x2, a3 = x1 - x3, b2 = y1 - y22, b3 = y1 - y3, c22 = r22 - r1, c32 = r32 - r1, d1 = x1 * x1 + y1 * y1 - r1 * r1, d2 = d1 - x2 * x2 - y22 * y22 + r22 * r22, d3 = d1 - x3 * x3 - y3 * y3 + r32 * r32, ab = a3 * b2 - a22 * b3, xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1, xb = (b3 * c22 - b2 * c32) / ab, ya = (a3 * d2 - a22 * d3) / (ab * 2) - y1, yb = (a22 * c32 - a3 * c22) / ab, A = xb * xb + yb * yb - 1, B = 2 * (r1 + xa * xb + ya * yb), C = xa * xa + ya * ya - r1 * r1, r4 = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r4,
    y: y1 + ya + yb * r4,
    r: r4
  };
}

// node_modules/d3-hierarchy/src/pack/siblings.js
function place(b, a2, c3) {
  var dx = b.x - a2.x, x2, a22, dy = b.y - a2.y, y3, b2, d2 = dx * dx + dy * dy;
  if (d2) {
    a22 = a2.r + c3.r, a22 *= a22;
    b2 = b.r + c3.r, b2 *= b2;
    if (a22 > b2) {
      x2 = (d2 + b2 - a22) / (2 * d2);
      y3 = Math.sqrt(Math.max(0, b2 / d2 - x2 * x2));
      c3.x = b.x - x2 * dx - y3 * dy;
      c3.y = b.y - x2 * dy + y3 * dx;
    } else {
      x2 = (d2 + a22 - b2) / (2 * d2);
      y3 = Math.sqrt(Math.max(0, a22 / d2 - x2 * x2));
      c3.x = a2.x + x2 * dx - y3 * dy;
      c3.y = a2.y + x2 * dy + y3 * dx;
    }
  } else {
    c3.x = a2.x + c3.r;
    c3.y = a2.y;
  }
}
function intersects(a2, b) {
  var dr = a2.r + b.r - 1e-6, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function score(node) {
  var a2 = node._, b = node.next._, ab = a2.r + b.r, dx = (a2.x * b.r + b.x * a2.r) / ab, dy = (a2.y * b.r + b.y * a2.r) / ab;
  return dx * dx + dy * dy;
}
function Node2(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}
function packEnclose(circles) {
  if (!(n2 = (circles = array_default(circles)).length))
    return 0;
  var a2, b, c3, n2, aa, ca, i, j3, k, sj2, sk;
  a2 = circles[0], a2.x = 0, a2.y = 0;
  if (!(n2 > 1))
    return a2.r;
  b = circles[1], a2.x = -b.r, b.x = a2.r, b.y = 0;
  if (!(n2 > 2))
    return a2.r + b.r;
  place(b, a2, c3 = circles[2]);
  a2 = new Node2(a2), b = new Node2(b), c3 = new Node2(c3);
  a2.next = c3.previous = b;
  b.next = a2.previous = c3;
  c3.next = b.previous = a2;
  pack:
    for (i = 3; i < n2; ++i) {
      place(a2._, b._, c3 = circles[i]), c3 = new Node2(c3);
      j3 = b.next, k = a2.previous, sj2 = b._.r, sk = a2._.r;
      do {
        if (sj2 <= sk) {
          if (intersects(j3._, c3._)) {
            b = j3, a2.next = b, b.previous = a2, --i;
            continue pack;
          }
          sj2 += j3._.r, j3 = j3.next;
        } else {
          if (intersects(k._, c3._)) {
            a2 = k, a2.next = b, b.previous = a2, --i;
            continue pack;
          }
          sk += k._.r, k = k.previous;
        }
      } while (j3 !== k.next);
      c3.previous = a2, c3.next = b, a2.next = b.previous = b = c3;
      aa = score(a2);
      while ((c3 = c3.next) !== b) {
        if ((ca = score(c3)) < aa) {
          a2 = c3, aa = ca;
        }
      }
      b = a2.next;
    }
  a2 = [b._], c3 = b;
  while ((c3 = c3.next) !== b)
    a2.push(c3._);
  c3 = enclose_default(a2);
  for (i = 0; i < n2; ++i)
    a2 = circles[i], a2.x -= c3.x, a2.y -= c3.y;
  return c3.r;
}

// node_modules/d3-hierarchy/src/accessors.js
function optional(f2) {
  return f2 == null ? null : required(f2);
}
function required(f2) {
  if (typeof f2 !== "function")
    throw new Error();
  return f2;
}

// node_modules/d3-hierarchy/src/constant.js
function constantZero() {
  return 0;
}
function constant_default5(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-hierarchy/src/pack/index.js
function defaultRadius(d2) {
  return Math.sqrt(d2.value);
}
function pack_default() {
  var radius = null, dx = 1, dy = 1, padding = constantZero;
  function pack(root2) {
    root2.x = dx / 2, root2.y = dy / 2;
    if (radius) {
      root2.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
    } else {
      root2.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root2.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root2.r)));
    }
    return root2;
  }
  pack.radius = function(x2) {
    return arguments.length ? (radius = optional(x2), pack) : radius;
  };
  pack.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], pack) : [dx, dy];
  };
  pack.padding = function(x2) {
    return arguments.length ? (padding = typeof x2 === "function" ? x2 : constant_default5(+x2), pack) : padding;
  };
  return pack;
}
function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}
function packChildren(padding, k) {
  return function(node) {
    if (children2 = node.children) {
      var children2, i, n2 = children2.length, r4 = padding(node) * k || 0, e3;
      if (r4)
        for (i = 0; i < n2; ++i)
          children2[i].r += r4;
      e3 = packEnclose(children2);
      if (r4)
        for (i = 0; i < n2; ++i)
          children2[i].r -= r4;
      node.r = e3 + r4;
    }
  };
}
function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x2) {
  return x2;
}
function normalize(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a2, b) {
  var t2;
  if (a2 > b)
    t2 = a2, a2 = b, b = t2;
  return function(x2) {
    return Math.max(a2, Math.min(b, x2));
  };
}
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range, interpolate) {
  var j3 = Math.min(domain.length, range.length) - 1, d2 = new Array(j3), r4 = new Array(j3), i = -1;
  if (domain[j3] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j3) {
    d2[i] = normalize(domain[i], domain[i + 1]);
    r4[i] = interpolate(range[i], range[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j3) - 1;
    return r4[i2](d2[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate = value_default, transform2, untransform, unknown, clamp = identity2, piecewise, output, input;
  function rescale() {
    var n2 = Math.min(domain.length, range.length);
    if (clamp !== identity2)
      clamp = clamper(domain[0], domain[n2 - 1]);
    piecewise = n2 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise(domain.map(transform2), range, interpolate)))(transform2(clamp(x2)));
  }
  scale.invert = function(y3) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform2), number_default2)))(y3)));
  };
  scale.domain = function(_10) {
    return arguments.length ? (domain = Array.from(_10, number), rescale()) : domain.slice();
  };
  scale.range = function(_10) {
    return arguments.length ? (range = Array.from(_10), rescale()) : range.slice();
  };
  scale.rangeRound = function(_10) {
    return range = Array.from(_10), interpolate = round_default, rescale();
  };
  scale.clamp = function(_10) {
    return arguments.length ? (clamp = _10 ? true : identity2, rescale()) : clamp !== identity2;
  };
  scale.interpolate = function(_10) {
    return arguments.length ? (interpolate = _10, rescale()) : interpolate;
  };
  scale.unknown = function(_10) {
    return arguments.length ? (unknown = _10, scale) : unknown;
  };
  return function(t2, u) {
    transform2 = t2, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop, count2, specifier) {
  var step = tickStep(start2, stop, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d2 = domain();
    return ticks_default(d2[0], d2[d2.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d2 = domain();
    return tickFormat(d2[0], d2[d2.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null)
      count2 = 10;
    var d2 = domain();
    var i0 = 0;
    var i1 = d2.length - 1;
    var start2 = d2[i0];
    var stop = d2[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start2) {
      step = start2, start2 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop, count2);
      if (step === prestep) {
        d2[i0] = start2;
        d2[i1] = stop;
        return domain(d2);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear2() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear2());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-scale/src/pow.js
function transformPow(exponent) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent) : Math.pow(x2, exponent);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform2) {
  var scale = transform2(identity2, identity2), exponent = 1;
  function rescale() {
    return exponent === 1 ? transform2(identity2, identity2) : exponent === 0.5 ? transform2(transformSqrt, transformSquare) : transform2(transformPow(exponent), transformPow(1 / exponent));
  }
  scale.exponent = function(_10) {
    return arguments.length ? (exponent = +_10, rescale()) : exponent;
  };
  return linearish(scale);
}
function pow() {
  var scale = powish(transformer());
  scale.copy = function() {
    return copy(scale, pow()).exponent(scale.exponent());
  };
  initRange.apply(scale, arguments);
  return scale;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-time/src/interval.js
var t0 = new Date();
var t1 = new Date();
function newInterval(floori, offseti, count2, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
  }
  interval2.floor = function(date) {
    return floori(date = new Date(+date)), date;
  };
  interval2.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = function(date) {
    var d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = function(start2, stop, step) {
    var range = [], previous;
    start2 = interval2.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop) || !(step > 0))
      return range;
    do
      range.push(previous = new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop);
    return range;
  };
  interval2.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count2) {
    interval2.count = function(start2, end) {
      t0.setTime(+start2), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count2(t0, t1));
    };
    interval2.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? function(d2) {
        return field(d2) % step === 0;
      } : function(d2) {
        return interval2.count(0, d2) % step === 0;
      });
    };
  }
  return interval2;
}

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/day.js
var day = newInterval((date) => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay, (date) => date.getDate() - 1);
var day_default = day;
var days = day.range;

// node_modules/d3-time/src/week.js
function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start2, end) {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/d3-time/src/year.js
var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start2, end) {
  return end.getFullYear() - start2.getFullYear();
}, function(date) {
  return date.getFullYear();
});
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var year_default = year;
var years = year.range;

// node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start2, end) {
  return (end - start2) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/d3-time/src/utcWeek.js
function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start2, end) {
    return (end - start2) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start2, end) {
  return end.getUTCFullYear() - start2.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/d3-time-format/src/locale.js
function localDate(d2) {
  if (0 <= d2.y && d2.y < 100) {
    var date = new Date(-1, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L);
    date.setFullYear(d2.y);
    return date;
  }
  return new Date(d2.y, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L);
}
function utcDate(d2) {
  if (0 <= d2.y && d2.y < 100) {
    var date = new Date(Date.UTC(-1, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L));
    date.setUTCFullYear(d2.y);
    return date;
  }
  return new Date(Date.UTC(d2.y, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L));
}
function newDate(y3, m4, d2) {
  return { y: y3, m: m4, d: d2, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j3 = 0, n2 = specifier.length, c3, pad2, format2;
      if (!(date instanceof Date))
        date = new Date(+date);
      while (++i < n2) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j3, i));
          if ((pad2 = pads[c3 = specifier.charAt(++i)]) != null)
            c3 = specifier.charAt(++i);
          else
            pad2 = c3 === "e" ? " " : "0";
          if (format2 = formats2[c3])
            c3 = format2(date, pad2);
          string.push(c3);
          j3 = i + 1;
        }
      }
      string.push(specifier.slice(j3, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d2 = newDate(1900, void 0, 1), i = parseSpecifier(d2, specifier, string += "", 0), week, day2;
      if (i != string.length)
        return null;
      if ("Q" in d2)
        return new Date(d2.Q);
      if ("s" in d2)
        return new Date(d2.s * 1e3 + ("L" in d2 ? d2.L : 0));
      if (Z && !("Z" in d2))
        d2.Z = 0;
      if ("p" in d2)
        d2.H = d2.H % 12 + d2.p * 12;
      if (d2.m === void 0)
        d2.m = "q" in d2 ? d2.q : 0;
      if ("V" in d2) {
        if (d2.V < 1 || d2.V > 53)
          return null;
        if (!("w" in d2))
          d2.w = 1;
        if ("Z" in d2) {
          week = utcDate(newDate(d2.y, 0, 1)), day2 = week.getUTCDay();
          week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay_default.offset(week, (d2.V - 1) * 7);
          d2.y = week.getUTCFullYear();
          d2.m = week.getUTCMonth();
          d2.d = week.getUTCDate() + (d2.w + 6) % 7;
        } else {
          week = localDate(newDate(d2.y, 0, 1)), day2 = week.getDay();
          week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d2.V - 1) * 7);
          d2.y = week.getFullYear();
          d2.m = week.getMonth();
          d2.d = week.getDate() + (d2.w + 6) % 7;
        }
      } else if ("W" in d2 || "U" in d2) {
        if (!("w" in d2))
          d2.w = "u" in d2 ? d2.u % 7 : "W" in d2 ? 1 : 0;
        day2 = "Z" in d2 ? utcDate(newDate(d2.y, 0, 1)).getUTCDay() : localDate(newDate(d2.y, 0, 1)).getDay();
        d2.m = 0;
        d2.d = "W" in d2 ? (d2.w + 6) % 7 + d2.W * 7 - (day2 + 5) % 7 : d2.w + d2.U * 7 - (day2 + 6) % 7;
      }
      if ("Z" in d2) {
        d2.H += d2.Z / 100 | 0;
        d2.M += d2.Z % 100;
        return utcDate(d2);
      }
      return localDate(d2);
    };
  }
  function parseSpecifier(d2, specifier, string, j3) {
    var i = 0, n2 = specifier.length, m4 = string.length, c3, parse;
    while (i < n2) {
      if (j3 >= m4)
        return -1;
      c3 = specifier.charCodeAt(i++);
      if (c3 === 37) {
        c3 = specifier.charAt(i++);
        parse = parses[c3 in pads ? specifier.charAt(i++) : c3];
        if (!parse || (j3 = parse(d2, string, j3)) < 0)
          return -1;
      } else if (c3 != string.charCodeAt(j3++)) {
        return -1;
      }
    }
    return j3;
  }
  function parsePeriod(d2, string, i) {
    var n2 = periodRe.exec(string.slice(i));
    return n2 ? (d2.p = periodLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortWeekday(d2, string, i) {
    var n2 = shortWeekdayRe.exec(string.slice(i));
    return n2 ? (d2.w = shortWeekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseWeekday(d2, string, i) {
    var n2 = weekdayRe.exec(string.slice(i));
    return n2 ? (d2.w = weekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortMonth(d2, string, i) {
    var n2 = shortMonthRe.exec(string.slice(i));
    return n2 ? (d2.m = shortMonthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseMonth(d2, string, i) {
    var n2 = monthRe.exec(string.slice(i));
    return n2 ? (d2.m = monthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseLocaleDateTime(d2, string, i) {
    return parseSpecifier(d2, locale_dateTime, string, i);
  }
  function parseLocaleDate(d2, string, i) {
    return parseSpecifier(d2, locale_date, string, i);
  }
  function parseLocaleTime(d2, string, i) {
    return parseSpecifier(d2, locale_time, string, i);
  }
  function formatShortWeekday(d2) {
    return locale_shortWeekdays[d2.getDay()];
  }
  function formatWeekday(d2) {
    return locale_weekdays[d2.getDay()];
  }
  function formatShortMonth(d2) {
    return locale_shortMonths[d2.getMonth()];
  }
  function formatMonth(d2) {
    return locale_months[d2.getMonth()];
  }
  function formatPeriod(d2) {
    return locale_periods[+(d2.getHours() >= 12)];
  }
  function formatQuarter(d2) {
    return 1 + ~~(d2.getMonth() / 3);
  }
  function formatUTCShortWeekday(d2) {
    return locale_shortWeekdays[d2.getUTCDay()];
  }
  function formatUTCWeekday(d2) {
    return locale_weekdays[d2.getUTCDay()];
  }
  function formatUTCShortMonth(d2) {
    return locale_shortMonths[d2.getUTCMonth()];
  }
  function formatUTCMonth(d2) {
    return locale_months[d2.getUTCMonth()];
  }
  function formatUTCPeriod(d2) {
    return locale_periods[+(d2.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d2) {
    return 1 + ~~(d2.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f2 = newFormat(specifier += "", formats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    parse: function(specifier) {
      var p2 = newParse(specifier += "", false);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    },
    utcFormat: function(specifier) {
      var f2 = newFormat(specifier += "", utcFormats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    utcParse: function(specifier) {
      var p2 = newParse(specifier += "", true);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width2) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width2 ? new Array(width2 - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d2.w = +n2[0], i + n2[0].length) : -1;
}
function parseWeekdayNumberMonday(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d2.u = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberSunday(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.U = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberISO(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.V = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberMonday(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.W = +n2[0], i + n2[0].length) : -1;
}
function parseFullYear(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 4));
  return n2 ? (d2.y = +n2[0], i + n2[0].length) : -1;
}
function parseYear(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.y = +n2[0] + (+n2[0] > 68 ? 1900 : 2e3), i + n2[0].length) : -1;
}
function parseZone(d2, string, i) {
  var n2 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n2 ? (d2.Z = n2[1] ? 0 : -(n2[2] + (n2[3] || "00")), i + n2[0].length) : -1;
}
function parseQuarter(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d2.q = n2[0] * 3 - 3, i + n2[0].length) : -1;
}
function parseMonthNumber(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.m = n2[0] - 1, i + n2[0].length) : -1;
}
function parseDayOfMonth(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.d = +n2[0], i + n2[0].length) : -1;
}
function parseDayOfYear(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 3));
  return n2 ? (d2.m = 0, d2.d = +n2[0], i + n2[0].length) : -1;
}
function parseHour24(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.H = +n2[0], i + n2[0].length) : -1;
}
function parseMinutes(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.M = +n2[0], i + n2[0].length) : -1;
}
function parseSeconds(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d2.S = +n2[0], i + n2[0].length) : -1;
}
function parseMilliseconds(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 3));
  return n2 ? (d2.L = +n2[0], i + n2[0].length) : -1;
}
function parseMicroseconds(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 6));
  return n2 ? (d2.L = Math.floor(n2[0] / 1e3), i + n2[0].length) : -1;
}
function parseLiteralPercent(d2, string, i) {
  var n2 = percentRe.exec(string.slice(i, i + 1));
  return n2 ? i + n2[0].length : -1;
}
function parseUnixTimestamp(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i));
  return n2 ? (d2.Q = +n2[0], i + n2[0].length) : -1;
}
function parseUnixTimestampSeconds(d2, string, i) {
  var n2 = numberRe.exec(string.slice(i));
  return n2 ? (d2.s = +n2[0], i + n2[0].length) : -1;
}
function formatDayOfMonth(d2, p2) {
  return pad(d2.getDate(), p2, 2);
}
function formatHour24(d2, p2) {
  return pad(d2.getHours(), p2, 2);
}
function formatHour12(d2, p2) {
  return pad(d2.getHours() % 12 || 12, p2, 2);
}
function formatDayOfYear(d2, p2) {
  return pad(1 + day_default.count(year_default(d2), d2), p2, 3);
}
function formatMilliseconds(d2, p2) {
  return pad(d2.getMilliseconds(), p2, 3);
}
function formatMicroseconds(d2, p2) {
  return formatMilliseconds(d2, p2) + "000";
}
function formatMonthNumber(d2, p2) {
  return pad(d2.getMonth() + 1, p2, 2);
}
function formatMinutes(d2, p2) {
  return pad(d2.getMinutes(), p2, 2);
}
function formatSeconds(d2, p2) {
  return pad(d2.getSeconds(), p2, 2);
}
function formatWeekdayNumberMonday(d2) {
  var day2 = d2.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d2, p2) {
  return pad(sunday.count(year_default(d2) - 1, d2), p2, 2);
}
function dISO(d2) {
  var day2 = d2.getDay();
  return day2 >= 4 || day2 === 0 ? thursday(d2) : thursday.ceil(d2);
}
function formatWeekNumberISO(d2, p2) {
  d2 = dISO(d2);
  return pad(thursday.count(year_default(d2), d2) + (year_default(d2).getDay() === 4), p2, 2);
}
function formatWeekdayNumberSunday(d2) {
  return d2.getDay();
}
function formatWeekNumberMonday(d2, p2) {
  return pad(monday.count(year_default(d2) - 1, d2), p2, 2);
}
function formatYear(d2, p2) {
  return pad(d2.getFullYear() % 100, p2, 2);
}
function formatYearISO(d2, p2) {
  d2 = dISO(d2);
  return pad(d2.getFullYear() % 100, p2, 2);
}
function formatFullYear(d2, p2) {
  return pad(d2.getFullYear() % 1e4, p2, 4);
}
function formatFullYearISO(d2, p2) {
  var day2 = d2.getDay();
  d2 = day2 >= 4 || day2 === 0 ? thursday(d2) : thursday.ceil(d2);
  return pad(d2.getFullYear() % 1e4, p2, 4);
}
function formatZone(d2) {
  var z = d2.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d2, p2) {
  return pad(d2.getUTCDate(), p2, 2);
}
function formatUTCHour24(d2, p2) {
  return pad(d2.getUTCHours(), p2, 2);
}
function formatUTCHour12(d2, p2) {
  return pad(d2.getUTCHours() % 12 || 12, p2, 2);
}
function formatUTCDayOfYear(d2, p2) {
  return pad(1 + utcDay_default.count(utcYear_default(d2), d2), p2, 3);
}
function formatUTCMilliseconds(d2, p2) {
  return pad(d2.getUTCMilliseconds(), p2, 3);
}
function formatUTCMicroseconds(d2, p2) {
  return formatUTCMilliseconds(d2, p2) + "000";
}
function formatUTCMonthNumber(d2, p2) {
  return pad(d2.getUTCMonth() + 1, p2, 2);
}
function formatUTCMinutes(d2, p2) {
  return pad(d2.getUTCMinutes(), p2, 2);
}
function formatUTCSeconds(d2, p2) {
  return pad(d2.getUTCSeconds(), p2, 2);
}
function formatUTCWeekdayNumberMonday(d2) {
  var dow = d2.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d2, p2) {
  return pad(utcSunday.count(utcYear_default(d2) - 1, d2), p2, 2);
}
function UTCdISO(d2) {
  var day2 = d2.getUTCDay();
  return day2 >= 4 || day2 === 0 ? utcThursday(d2) : utcThursday.ceil(d2);
}
function formatUTCWeekNumberISO(d2, p2) {
  d2 = UTCdISO(d2);
  return pad(utcThursday.count(utcYear_default(d2), d2) + (utcYear_default(d2).getUTCDay() === 4), p2, 2);
}
function formatUTCWeekdayNumberSunday(d2) {
  return d2.getUTCDay();
}
function formatUTCWeekNumberMonday(d2, p2) {
  return pad(utcMonday.count(utcYear_default(d2) - 1, d2), p2, 2);
}
function formatUTCYear(d2, p2) {
  return pad(d2.getUTCFullYear() % 100, p2, 2);
}
function formatUTCYearISO(d2, p2) {
  d2 = UTCdISO(d2);
  return pad(d2.getUTCFullYear() % 100, p2, 2);
}
function formatUTCFullYear(d2, p2) {
  return pad(d2.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCFullYearISO(d2, p2) {
  var day2 = d2.getUTCDay();
  d2 = day2 >= 4 || day2 === 0 ? utcThursday(d2) : utcThursday.ceil(d2);
  return pad(d2.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d2) {
  return +d2;
}
function formatUnixTimestampSeconds(d2) {
  return Math.floor(+d2 / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-zoom/src/transform.js
function Transform(k, x2, y3) {
  this.k = k;
  this.x = x2;
  this.y = y3;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x2, y3) {
    return x2 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y3);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y3) {
    return y3 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y3) {
    return (y3 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y3) {
    return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity3 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity3;
  return node.__zoom;
}

// src/Tree.tsx
var import_countBy = __toModule(require_countBy());
var import_maxBy = __toModule(require_maxBy());
var import_entries = __toModule(require_entries());
var import_uniqBy = __toModule(require_uniqBy());
var import_flatten = __toModule(require_flatten());

// src/language-colors.json
var bsl = "#814CCC";
var os = "#814CCC";
var _dm = "#004289";
var abap = "#E8274B";
var asddls = "#555e25";
var ash = "#B9D9FF";
var aidl = "#34EB6B";
var al = "#0298c3";
var ampl = "#E6EFBB";
var mod = "#0060ac";
var g4 = "#9DC3FF";
var apib = "#2ACCA8";
var apl = "#5A8164";
var dyalog = "#5A8164";
var asax = "#9400ff";
var ascx = "#9400ff";
var ashx = "#9400ff";
var asmx = "#9400ff";
var aspx = "#9400ff";
var axd = "#9400ff";
var dats = "#1ac620";
var hats = "#1ac620";
var sats = "#1ac620";
var as = "#C7D7DC";
var adb = "#02f88c";
var ada = "#02f88c";
var ads = "#02f88c";
var afm = "#fa0f00";
var agda = "#315665";
var als = "#64C800";
var OutJob = "#A89663";
var PcbDoc = "#A89663";
var PrjPCB = "#A89663";
var SchDoc = "#A89663";
var angelscript = "#C7D7DC";
var apacheconf = "#d12127";
var vhost = "#009639";
var cls = "#867db1";
var agc = "#0B3D91";
var applescript = "#101F1F";
var scpt = "#101F1F";
var arc = "#aa2afe";
var asciidoc = "#73a0c5";
var adoc = "#73a0c5";
var aj = "#a957b0";
var asm = "#005daa";
var a51 = "#6E4C13";
var inc = "#f69e1d";
var nasm = "#6E4C13";
var astro = "#ff5a03";
var aug = "#9CC134";
var ahk = "#6594b9";
var ahkl = "#6594b9";
var au3 = "#1C3552";
var avdl = "#0040FF";
var awk = "#c30e9b";
var auk = "#c30e9b";
var gawk = "#c30e9b";
var mawk = "#c30e9b";
var nawk = "#c30e9b";
var bas = "#867db1";
var bal = "#FF5000";
var bat = "#C1F12E";
var cmd = "#C1F12E";
var bib = "#778899";
var bibtex = "#778899";
var bicep = "#519aba";
var bison = "#6A463F";
var bb = "#00FFAE";
var blade = "#f7523f";
var blade_php = "#f7523f";
var decls = "#00FFAE";
var bmx = "#cd6400";
var bsv = "#12223c";
var boo = "#d4bec1";
var bpl = "#c80fa0";
var brs = "#662D91";
var c2 = "#555555";
var cats = "#555555";
var h = "#438eff";
var idc = "#555555";
var cs = "#596706";
var cake = "#244776";
var csx = "#178600";
var linq = "#178600";
var cpp = "#f34b7d";
var c__ = "#f34b7d";
var cc = "#f34b7d";
var cp = "#B0CE4E";
var cxx = "#f34b7d";
var h__ = "#f34b7d";
var hh = "#878787";
var hpp = "#f34b7d";
var hxx = "#f34b7d";
var inl = "#f34b7d";
var ino = "#f34b7d";
var ipp = "#f34b7d";
var re2 = "#ff5847";
var tcc = "#f34b7d";
var tpp = "#f34b7d";
var clp = "#00A300";
var cmake = "#DA3434";
var cmake_in = "#DA3434";
var dae = "#F1A42B";
var cson = "#244776";
var css = "#563d7c";
var csv = "#237346";
var w = "#5ce600";
var cabal = "#483465";
var capnp = "#c42727";
var ceylon = "#dfa535";
var chpl = "#8dc63f";
var ch = "#403a40";
var ck = "#3f8000";
var cirru = "#ccccff";
var clw = "#db901e";
var asp = "#6a40fd";
var icl = "#3F85AF";
var dcl = "#3F85AF";
var click = "#E4E6F3";
var clj = "#db5855";
var boot = "#db5855";
var cl2 = "#db5855";
var cljc = "#db5855";
var cljs = "#db5855";
var cljs_hl = "#db5855";
var cljscm = "#db5855";
var cljx = "#db5855";
var hic = "#db5855";
var soy = "#0d948f";
var ql = "#140f46";
var qll = "#140f46";
var coffee = "#244776";
var _coffee = "#244776";
var cjsx = "#244776";
var iced = "#244776";
var cfm = "#ed2cd6";
var cfml = "#ed2cd6";
var cfc = "#ed2cd6";
var lisp = "#87AED7";
var asd = "#3fb68b";
var cl = "#ed2e2d";
var l = "#ecdebe";
var lsp = "#87AED7";
var ny = "#3fb68b";
var podsl = "#3fb68b";
var sexp = "#3fb68b";
var cwl = "#B5314C";
var cps = "#B0CE4E";
var coq = "#d0b68c";
var v = "#b2b7f8";
var cr = "#000100";
var orc = "#1a1a1a";
var udo = "#1a1a1a";
var csd = "#1a1a1a";
var sco = "#1a1a1a";
var cu = "#3A4E3A";
var cuh = "#3A4E3A";
var pyx = "#fedf5b";
var pxd = "#fedf5b";
var pxi = "#fedf5b";
var d = "#427819";
var di = "#ba595e";
var dm = "#447265";
var dfy = "#FFEC25";
var darcspatch = "#8eff23";
var dpatch = "#8eff23";
var dart = "#00B4AB";
var dwl = "#003a52";
var dhall = "#dfafff";
var dockerfile = "#384d54";
var djs = "#cca760";
var dylan = "#6c616e";
var dyl = "#6c616e";
var intr = "#6c616e";
var lid = "#6c616e";
var E = "#ccce35";
var ecl = "#001d9d";
var eclxml = "#8a1267";
var ejs = "#a91e50";
var ect = "#a91e50";
var jst = "#a91e50";
var eq = "#a78649";
var sch = "#0060ac";
var brd = "#2f4aab";
var eb = "#069406";
var epj = "#913960";
var e = "#4d6977";
var ex = "#6e4a7e";
var exs = "#6e4a7e";
var elm = "#60B5CC";
var el = "#c065db";
var emacs = "#c065db";
var emacs_desktop = "#c065db";
var em = "#FFF4F3";
var emberscript = "#FFF4F3";
var erl = "#B83998";
var app_src = "#B83998";
var es = "#f1e05a";
var escript = "#B83998";
var hrl = "#B83998";
var xrl = "#B83998";
var yrl = "#B83998";
var fs2 = "#5686a5";
var fsi = "#b845fc";
var fsx = "#b845fc";
var fst = "#572e30";
var flf = "#FFDDBB";
var fx = "#aace60";
var flux = "#88ccff";
var factor = "#636746";
var fy = "#7b9db4";
var fancypack = "#7b9db4";
var fan = "#14253c";
var fnl = "#fff3d7";
var f = "#4d41b1";
var ftl = "#0050b2";
var for2 = "#4d41b1";
var fth = "#341708";
var _th = "#341708";
var forth = "#341708";
var frt = "#341708";
var f77 = "#4d41b1";
var fpp = "#4d41b1";
var f90 = "#4d41b1";
var f03 = "#4d41b1";
var f08 = "#4d41b1";
var f95 = "#4d41b1";
var bi = "#867db1";
var fut = "#5f021f";
var g = "#0000cc";
var cnc = "#D08CF2";
var gco = "#D08CF2";
var gcode = "#D08CF2";
var gaml = "#FFC766";
var gms = "#f49a22";
var gap = "#0000cc";
var gd = "#355570";
var gi = "#0000cc";
var tst = "#ca0f21";
var md = "#083fa1";
var ged = "#003058";
var glsl = "#5686a5";
var fp = "#5686a5";
var frag = "#f1e05a";
var frg = "#5686a5";
var fsh = "#5686a5";
var fshader = "#5686a5";
var geo = "#5686a5";
var geom = "#5686a5";
var glslf = "#5686a5";
var glslv = "#5686a5";
var gs = "#f1e05a";
var gshader = "#5686a5";
var shader = "#222c37";
var tesc = "#5686a5";
var tese = "#5686a5";
var vert = "#5686a5";
var vrx = "#5686a5";
var vsh = "#5686a5";
var vshader = "#5686a5";
var gml = "#0060ac";
var kid = "#951531";
var ebuild = "#9400ff";
var eclass = "#9400ff";
var gbr = "#d20b00";
var cmp = "#d20b00";
var gbl = "#d20b00";
var gbo = "#d20b00";
var gbp = "#d20b00";
var gbs = "#d20b00";
var gko = "#d20b00";
var gpb = "#d20b00";
var gpt = "#d20b00";
var gtl = "#d20b00";
var gto = "#d20b00";
var gtp = "#d20b00";
var gts = "#d20b00";
var ncl = "#0060ac";
var sol = "#AA6746";
var feature = "#5B2063";
var story = "#5B2063";
var gitconfig = "#F44D27";
var glf = "#c1ac7f";
var gp = "#f0a9f0";
var gnu = "#f0a9f0";
var gnuplot = "#f0a9f0";
var p = "#5ce600";
var plot = "#f0a9f0";
var plt = "#f0a9f0";
var go = "#00ADD8";
var golo = "#88562A";
var gst = "#0060ac";
var gsx = "#82937f";
var vark = "#82937f";
var grace = "#615f8b";
var gradle = "#02303a";
var gf = "#ff0000";
var graphql = "#e10098";
var gql = "#e10098";
var graphqls = "#e10098";
var dot = "#2596be";
var gv = "#2596be";
var groovy = "#4298b8";
var grt = "#4298b8";
var gtpl = "#4298b8";
var gvy = "#4298b8";
var gsp = "#4298b8";
var cfg = "#d1dbe0";
var workflow = "#0060ac";
var hlsl = "#aace60";
var cginc = "#aace60";
var fxh = "#aace60";
var hlsli = "#aace60";
var html = "#e34c26";
var htm = "#e34c26";
var html_hl = "#e34c26";
var xht = "#e34c26";
var xhtml2 = "#e34c26";
var ecr = "#2e1052";
var eex = "#6e4a7e";
var html_leex = "#6e4a7e";
var erb = "#701516";
var erb_deface = "#701516";
var rhtml = "#701516";
var phtml = "#4f5d95";
var cshtml = "#512be4";
var razor = "#512be4";
var http = "#005C9C";
var hxml = "#f68712";
var hack = "#878787";
var hhi = "#878787";
var php = "#4F5D95";
var haml = "#ece2a9";
var haml_deface = "#ece2a9";
var handlebars = "#f7931e";
var hbs = "#f7931e";
var hb = "#0e60e3";
var hs = "#5e5086";
var hs_boot = "#5e5086";
var hsc = "#5e5086";
var hx = "#df7900";
var hxsl = "#df7900";
var q = "#0040cd";
var hql = "#dce200";
var hc = "#ffefaf";
var hy = "#7790B2";
var dlm = "#a3522f";
var ipf = "#0000cc";
var ini = "#d1dbe0";
var dof = "#d1dbe0";
var lektorproject = "#d1dbe0";
var prefs = "#d1dbe0";
var properties = "#2A6277";
var idr = "#b30000";
var lidr = "#b30000";
var gitignore = "#000000";
var ijm = "#99AAFF";
var iss = "#264b99";
var isl = "#264b99";
var io = "#a9188d";
var ik = "#078193";
var thy = "#FEFE00";
var ijs = "#9EEDFF";
var flex = "#DBCA00";
var jflex = "#DBCA00";
var json = "#292929";
var avsc = "#292929";
var geojson = "#292929";
var gltf = "#292929";
var har = "#292929";
var ice = "#003fa2";
var JSON_tmLanguage = "#292929";
var jsonl = "#292929";
var mcmeta = "#292929";
var tfstate = "#292929";
var tfstate_backup = "#292929";
var topojson = "#292929";
var webapp = "#292929";
var webmanifest = "#292929";
var yy = "#4B6C4B";
var yyp = "#292929";
var jsonc = "#292929";
var sublime_build = "#292929";
var sublime_commands = "#292929";
var sublime_completions = "#292929";
var sublime_keymap = "#292929";
var sublime_macro = "#292929";
var sublime_menu = "#292929";
var sublime_mousemap = "#292929";
var sublime_project = "#292929";
var sublime_settings = "#292929";
var sublime_theme = "#292929";
var sublime_workspace = "#292929";
var sublime_metrics = "#292929";
var sublime_session = "#292929";
var json5 = "#267CB9";
var jsonld = "#0c479c";
var jq = "#c7254e";
var j = "#ff0c5a";
var java = "#b07219";
var jav = "#b07219";
var jsp = "#2A6277";
var js = "#f1e05a";
var _js = "#f1e05a";
var bones = "#f1e05a";
var cjs = "#f1e05a";
var es6 = "#f1e05a";
var jake = "#f1e05a";
var javascript = "#f1e05a";
var jsb = "#f1e05a";
var jscad = "#f1e05a";
var jsfl = "#f1e05a";
var jsm = "#f1e05a";
var jss = "#f1e05a";
var jsx = "#f1e05a";
var mjs = "#f1e05a";
var njs = "#f1e05a";
var pac = "#f1e05a";
var sjs = "#f1e05a";
var ssjs = "#f1e05a";
var xsjs = "#f1e05a";
var xsjslib = "#f1e05a";
var js_erb = "#f1e05a";
var jinja = "#a52a22";
var j2 = "#a52a22";
var jinja2 = "#a52a22";
var jison = "#56b3cb";
var jisonlex = "#56b3cb";
var ol = "#843179";
var iol = "#843179";
var jsonnet = "#0064bd";
var libsonnet = "#0064bd";
var jl = "#a270ba";
var ipynb = "#DA5B0B";
var krl = "#28430A";
var ksy = "#773b37";
var kak = "#6f8042";
var kicad_pcb = "#2f4aab";
var kicad_mod = "#2f4aab";
var kicad_wks = "#2f4aab";
var kt = "#A97BFF";
var ktm = "#A97BFF";
var kts = "#A97BFF";
var csl = "#0060ac";
var lfe = "#4C3023";
var ll = "#185619";
var lol = "#cc9900";
var lsl = "#3d9970";
var lslp = "#3d9970";
var lvproj = "#fede06";
var lvlib = "#fede06";
var lark = "#2980B9";
var lasso = "#999999";
var las = "#999999";
var lasso8 = "#999999";
var lasso9 = "#999999";
var latte = "#f2a542";
var less = "#1d365d";
var lex = "#DBCA00";
var ly = "#9ccc7c";
var ily = "#9ccc7c";
var m2 = "#438eff";
var liquid = "#67b8de";
var lagda = "#315665";
var litcoffee = "#244776";
var coffee_md = "#244776";
var lhs = "#5e5086";
var _ls = "#499886";
var lgt = "#295b9a";
var logtalk = "#295b9a";
var lookml = "#652B81";
var model_lkml = "#652B81";
var view_lkml = "#652B81";
var lua = "#000080";
var fcgi = "#89e051";
var nse = "#000080";
var p8 = "#000080";
var pd_lua = "#000080";
var rbxs = "#000080";
var rockspec = "#000080";
var wlua = "#000080";
var matlab = "#e16737";
var mcr = "#00a6a6";
var mlir = "#5EC8DB";
var mq4 = "#62A8D6";
var mqh = "#4A76B8";
var mq5 = "#4A76B8";
var mtml = "#b7e1f4";
var m22 = "#d8ffff";
var mak = "#427819";
var make = "#427819";
var mk = "#427819";
var mkfile = "#427819";
var mako = "#7e858d";
var mao = "#7e858d";
var markdown = "#083fa1";
var mdown = "#083fa1";
var mdwn = "#083fa1";
var mdx = "#083fa1";
var mkd = "#083fa1";
var mkdn = "#083fa1";
var mkdown = "#083fa1";
var ronn = "#083fa1";
var scd = "#46390b";
var workbook = "#083fa1";
var marko = "#42bff2";
var mask = "#222c37";
var mathematica = "#dd1100";
var cdf = "#dd1100";
var ma = "#dd1100";
var mt = "#dd1100";
var nbp = "#dd1100";
var wl = "#dd1100";
var wlt = "#dd1100";
var maxpat = "#c4a79c";
var maxhelp = "#c4a79c";
var maxproj = "#c4a79c";
var mxt = "#c4a79c";
var pat = "#c4a79c";
var metal = "#8f14e9";
var druby = "#c7a938";
var duby = "#c7a938";
var mirah = "#c7a938";
var mo = "#de1d31";
var i3 = "#223388";
var ig = "#223388";
var m3 = "#223388";
var mg = "#223388";
var moon = "#ff4585";
var x68 = "#005daa";
var mustache = "#724b3b";
var nl = "#87AED7";
var nss = "#111522";
var ne = "#990000";
var nearley = "#990000";
var n = "#ecdebe";
var axs = "#0aa0ff";
var axi = "#0aa0ff";
var axs_erb = "#747faa";
var axi_erb = "#747faa";
var nlogo = "#ff6375";
var nf = "#3ac486";
var nginx = "#009639";
var nginxconf = "#009639";
var nim = "#ffc200";
var nim_cfg = "#ffc200";
var nimble = "#ffc200";
var nimrod = "#ffc200";
var nims = "#ffc200";
var nit = "#009917";
var nix = "#7e7eff";
var nu = "#c9df40";
var numpy = "#9C8AF9";
var numpyw = "#9C8AF9";
var numsc = "#9C8AF9";
var njk = "#3d8137";
var ml = "#dc566d";
var eliom = "#3be133";
var eliomi = "#3be133";
var ml4 = "#3be133";
var mli = "#3be133";
var mll = "#3be133";
var mly = "#3be133";
var odin = "#60AFFE";
var mm = "#0060ac";
var sj = "#ff0c5a";
var omgrofl = "#cabbff";
var opal = "#f7ede0";
var rego = "#7d9199";
var opencl = "#ed2e2d";
var qasm = "#AA70FF";
var scad = "#e5cd45";
var plist = "#0060ac";
var org = "#77aa99";
var oxygene = "#cdd0e3";
var oz = "#fab738";
var p4 = "#7055b5";
var pegjs = "#234d6b";
var aw = "#4F5D95";
var ctp = "#4F5D95";
var php3 = "#4F5D95";
var php4 = "#4F5D95";
var php5 = "#4F5D95";
var phps = "#4F5D95";
var phpt = "#4F5D95";
var pls = "#dad8d8";
var bdy = "#dad8d8";
var ddl = "#e38c00";
var fnc = "#dad8d8";
var pck = "#dad8d8";
var pkb = "#dad8d8";
var pks = "#dad8d8";
var plb = "#dad8d8";
var plsql = "#dad8d8";
var prc = "#e38c00";
var spc = "#dad8d8";
var sql = "#e38c00";
var tpb = "#dad8d8";
var tps = "#dad8d8";
var trg = "#dad8d8";
var vw = "#dad8d8";
var pgsql = "#336790";
var pov = "#6bac65";
var pan = "#cc0000";
var psc = "#6600cc";
var parrot = "#f3ca0a";
var pas = "#E3F171";
var dfm = "#E3F171";
var dpr = "#E3F171";
var lpr = "#E3F171";
var pascal = "#E3F171";
var pp = "#302B6D";
var pwn = "#dbb284";
var sma = "#dbb284";
var pep = "#C76F5B";
var pl = "#0000fb";
var cgi = "#89e051";
var perl = "#0298c3";
var ph = "#0298c3";
var plx = "#0298c3";
var psgi = "#0298c3";
var t = "#cf142b";
var pig = "#fcd7de";
var pike = "#005390";
var pmod = "#005390";
var pogo = "#d80074";
var pcss = "#dc3a0c";
var postcss = "#dc3a0c";
var ps = "#da291c";
var eps = "#da291c";
var epsi = "#da291c";
var pfa = "#da291c";
var pbt = "#8f0f8d";
var sra = "#8f0f8d";
var sru = "#8f0f8d";
var srw = "#8f0f8d";
var ps1 = "#012456";
var psd1 = "#012456";
var psm1 = "#012456";
var prisma = "#0c344b";
var pde = "#0096D8";
var prolog = "#74283c";
var yap = "#74283c";
var spin = "#7fa2a7";
var jade = "#a86454";
var pug = "#a86454";
var pb = "#5a6986";
var pbi = "#5a6986";
var purs = "#1D222D";
var py = "#3572A5";
var gyp = "#3572A5";
var gypi = "#3572A5";
var lmi = "#3572A5";
var py3 = "#3572A5";
var pyde = "#3572A5";
var pyi = "#3572A5";
var pyp = "#3572A5";
var pyt = "#3572A5";
var pyw = "#3572A5";
var rpy = "#ff7f7f";
var smk = "#3572A5";
var spec = "#701516";
var tac = "#3572A5";
var wsgi = "#3572A5";
var xpy = "#3572A5";
var pytb = "#3572A5";
var qs = "#00b841";
var qml = "#44a51c";
var qbs = "#44a51c";
var r = "#358a5b";
var rd = "#198CE7";
var rsx = "#198CE7";
var raml = "#77d9fb";
var rdoc = "#701516";
var rexx = "#d90e09";
var pprx = "#d90e09";
var rex = "#d90e09";
var rmd = "#198ce7";
var rnh = "#665a4e";
var rno = "#ecdebe";
var rkt = "#3c5caa";
var rktd = "#3c5caa";
var rktl = "#3c5caa";
var scrbl = "#3c5caa";
var rl = "#9d5200";
var _pl = "#0000fb";
var _pm = "#0000fb";
var nqp = "#0000fb";
var p6 = "#0000fb";
var p6l = "#0000fb";
var p6m = "#0000fb";
var pl6 = "#0000fb";
var pm6 = "#0000fb";
var raku = "#0000fb";
var rakumod = "#0000fb";
var rsc = "#fffaa0";
var res = "#0060ac";
var rei = "#ff5847";
var reb = "#358a5b";
var r2 = "#358a5b";
var r3 = "#358a5b";
var rebol = "#358a5b";
var red = "#f50000";
var reds = "#f50000";
var regexp = "#009a00";
var regex = "#009a00";
var rs = "#0060ac";
var ring = "#2D54CB";
var riot = "#A71E49";
var robot = "#00c0b5";
var roff = "#ecdebe";
var _ = "#ecdebe";
var _in = "#ecdebe";
var _m = "#ecdebe";
var _x = "#ecdebe";
var _2 = "#ecdebe";
var _3 = "#ecdebe";
var _in2 = "#ecdebe";
var _m2 = "#ecdebe";
var _p = "#ecdebe";
var _pm2 = "#ecdebe";
var _qt = "#ecdebe";
var _x2 = "#ecdebe";
var _4 = "#ecdebe";
var _5 = "#ecdebe";
var _6 = "#ecdebe";
var _7 = "#ecdebe";
var _8 = "#ecdebe";
var _9 = "#ecdebe";
var man = "#ecdebe";
var mdoc = "#ecdebe";
var me = "#ecdebe";
var nr = "#ecdebe";
var tmac = "#ecdebe";
var rg = "#cc0088";
var rb = "#701516";
var builder = "#701516";
var eye = "#701516";
var gemspec = "#701516";
var god = "#701516";
var jbuilder = "#701516";
var mspec = "#701516";
var pluginspec = "#0060ac";
var podspec = "#701516";
var prawn = "#701516";
var rabl = "#701516";
var rake = "#701516";
var rbi = "#701516";
var rbuild = "#701516";
var rbw = "#701516";
var rbx = "#701516";
var ru = "#701516";
var ruby = "#701516";
var thor = "#701516";
var watchr = "#701516";
var rs_in = "#dea584";
var sas = "#B34936";
var scss = "#c6538c";
var sparql = "#0C4597";
var rq = "#0C4597";
var sqf = "#3F3F3F";
var hqf = "#3F3F3F";
var cql = "#e38c00";
var mysql = "#e38c00";
var tab = "#e38c00";
var udf = "#e38c00";
var viw = "#e38c00";
var db2 = "#e38c00";
var srt = "#9e0101";
var svg = "#ff9900";
var sls = "#1e4aec";
var sass = "#a53b70";
var scala = "#c22d40";
var kojo = "#c22d40";
var sbt = "#c22d40";
var sc = "#46390b";
var scaml = "#bd181a";
var scm = "#1e4aec";
var sld = "#1e4aec";
var sps = "#1e4aec";
var ss = "#1e4aec";
var sci = "#ca0f21";
var sce = "#ca0f21";
var self2 = "#0579aa";
var sh = "#89e051";
var bash = "#89e051";
var bats = "#89e051";
var command = "#89e051";
var env = "#89e051";
var ksh = "#89e051";
var sh_in = "#89e051";
var tmux = "#89e051";
var tool = "#89e051";
var zsh = "#89e051";
var shen = "#120F14";
var sl = "#007eff";
var slim = "#2b2b2b";
var cocci = "#c94949";
var st = "#3fb34f";
var tpl = "#f0c040";
var sp = "#f69e1d";
var nut = "#800000";
var stan = "#b2011d";
var fun = "#dc566d";
var sig = "#dc566d";
var sml = "#dc566d";
var bzl = "#76d275";
var do2 = "#1a5f91";
var ado = "#1a5f91";
var doh = "#1a5f91";
var ihlp = "#1a5f91";
var mata = "#1a5f91";
var matah = "#1a5f91";
var sthlp = "#1a5f91";
var styl = "#ff6347";
var sss = "#2fcc9f";
var svelte = "#ff3e00";
var swift = "#F05138";
var sv = "#DAE1C2";
var svh = "#DAE1C2";
var vh = "#DAE1C2";
var _xp = "#A0AA87";
var _xk = "#A0AA87";
var _xk_txt = "#A0AA87";
var _xp_txt = "#A0AA87";
var tla = "#4b0079";
var toml = "#9c4221";
var tsv = "#237346";
var tsx = "#0060ac";
var txl = "#0178b8";
var tcl = "#e4cc98";
var adp = "#e4cc98";
var tm = "#e4cc98";
var tex = "#3D6117";
var aux = "#3D6117";
var bbx = "#3D6117";
var cbx = "#3D6117";
var dtx = "#3D6117";
var ins = "#3D6117";
var lbx = "#3D6117";
var ltx = "#3D6117";
var mkii = "#3D6117";
var mkiv = "#3D6117";
var mkvi = "#3D6117";
var sty = "#3D6117";
var toc = "#f7e43f";
var txt = "#199f4b";
var textile = "#ffe7ac";
var thrift = "#D12127";
var tu = "#cf142b";
var twig = "#c1d026";
var ts = "#0060ac";
var upc = "#4e3617";
var anim = "#222c37";
var asset = "#222c37";
var mat = "#222c37";
var meta = "#222c37";
var prefab = "#222c37";
var unity = "#222c37";
var uno = "#9933cc";
var uc = "#a54c4d";
var ur = "#ccccee";
var urs = "#ccccee";
var frm = "#867db1";
var frx = "#867db1";
var vba = "#199f4b";
var vbs = "#15dcdc";
var vcl = "#148AA8";
var vhdl = "#adb2cb";
var vhd = "#adb2cb";
var vhf = "#adb2cb";
var vhi = "#adb2cb";
var vho = "#adb2cb";
var vhs = "#adb2cb";
var vht = "#adb2cb";
var vhw = "#adb2cb";
var vala = "#fbe5cd";
var vapi = "#fbe5cd";
var vdf = "#f26025";
var veo = "#b2b7f8";
var snip = "#199f4b";
var snippet = "#199f4b";
var snippets = "#199f4b";
var vim = "#199f4b";
var vmb = "#199f4b";
var vb = "#945db7";
var vbhtml = "#945db7";
var volt = "#1F1F1F";
var vue = "#41b883";
var owl = "#5b70bd";
var wast = "#04133b";
var wat = "#04133b";
var mediawiki = "#fc5757";
var wiki = "#fc5757";
var wikitext = "#fc5757";
var reg = "#52d5ff";
var wlk = "#a23738";
var x10 = "#4B6BEF";
var xc = "#99DA07";
var xml = "#0060ac";
var adml = "#0060ac";
var admx = "#0060ac";
var ant = "#0060ac";
var axml = "#0060ac";
var builds = "#0060ac";
var ccproj = "#0060ac";
var ccxml = "#0060ac";
var clixml = "#0060ac";
var cproject = "#0060ac";
var cscfg = "#0060ac";
var csdef = "#0060ac";
var csproj = "#0060ac";
var ct = "#0060ac";
var depproj = "#0060ac";
var dita = "#0060ac";
var ditamap = "#0060ac";
var ditaval = "#0060ac";
var dll_config = "#0060ac";
var dotsettings = "#0060ac";
var filters = "#0060ac";
var fsproj = "#0060ac";
var fxml = "#0060ac";
var glade = "#0060ac";
var gmx = "#0060ac";
var grxml = "#0060ac";
var iml = "#0060ac";
var ivy = "#0060ac";
var jelly = "#0060ac";
var jsproj = "#0060ac";
var kml = "#0060ac";
var launch = "#0060ac";
var mdpolicy = "#0060ac";
var mjml = "#0060ac";
var mxml = "#0060ac";
var natvis = "#0060ac";
var ndproj = "#0060ac";
var nproj = "#0060ac";
var nuspec = "#0060ac";
var odd = "#0060ac";
var osm = "#0060ac";
var pkgproj = "#0060ac";
var proj = "#0060ac";
var props = "#0060ac";
var ps1xml = "#0060ac";
var psc1 = "#0060ac";
var pt = "#0060ac";
var rdf = "#0060ac";
var resx = "#0060ac";
var rss = "#0060ac";
var scxml = "#0060ac";
var sfproj = "#0060ac";
var shproj = "#0060ac";
var srdf = "#0060ac";
var storyboard = "#0060ac";
var sublime_snippet = "#0060ac";
var targets = "#0060ac";
var tml = "#0060ac";
var ui = "#0060ac";
var urdf = "#0060ac";
var ux = "#0060ac";
var vbproj = "#0060ac";
var vcxproj = "#0060ac";
var vsixmanifest = "#0060ac";
var vssettings = "#0060ac";
var vstemplate = "#0060ac";
var vxml = "#0060ac";
var wixproj = "#0060ac";
var wsdl = "#0060ac";
var wsf = "#0060ac";
var wxi = "#0060ac";
var wxl = "#0060ac";
var wxs = "#0060ac";
var x3d = "#0060ac";
var xacro = "#0060ac";
var xaml = "#0060ac";
var xib = "#0060ac";
var xlf = "#0060ac";
var xliff = "#0060ac";
var xmi = "#0060ac";
var xml_dist = "#0060ac";
var xmp = "#0060ac";
var xproj = "#0060ac";
var xsd = "#0060ac";
var xspec = "#0060ac";
var xul = "#0060ac";
var zcml = "#0060ac";
var stTheme = "#0060ac";
var tmCommand = "#0060ac";
var tmLanguage = "#0060ac";
var tmPreferences = "#0060ac";
var tmSnippet = "#0060ac";
var tmTheme = "#0060ac";
var xquery = "#5232e7";
var xq = "#5232e7";
var xql = "#5232e7";
var xqm = "#5232e7";
var xqy = "#5232e7";
var xslt = "#EB8CEB";
var xsl = "#EB8CEB";
var xojo_code = "#81bd41";
var xojo_menu = "#81bd41";
var xojo_report = "#81bd41";
var xojo_script = "#81bd41";
var xojo_toolbar = "#81bd41";
var xojo_window = "#81bd41";
var xsh = "#285EEF";
var xtend = "#24255d";
var yml = "#cb171e";
var mir = "#cb171e";
var reek = "#cb171e";
var rviz = "#cb171e";
var sublime_syntax = "#cb171e";
var syntax = "#cb171e";
var yaml = "#cb171e";
var yaml_tmlanguage = "#cb171e";
var yaml_sed = "#cb171e";
var yml_mysql = "#cb171e";
var yar = "#220000";
var yara = "#220000";
var yasnippet = "#32AB90";
var y2 = "#4B6C4B";
var yacc = "#4B6C4B";
var zap = "#0d665e";
var xzap = "#0d665e";
var zil = "#dc75e5";
var mud = "#dc75e5";
var zs = "#00BCD1";
var zep = "#118f9e";
var zig = "#ec915c";
var zimpl = "#d67711";
var zmpl = "#d67711";
var zpl = "#d67711";
var ec = "#913960";
var eh = "#913960";
var fish = "#4aae47";
var mrc = "#3d57c3";
var mcfunction = "#E22837";
var mu = "#244963";
var nanorc = "#2d004d";
var nc = "#94B0C7";
var ooc = "#b0b77e";
var rst = "#141414";
var rest = "#141414";
var rest_txt = "#141414";
var rst_txt = "#141414";
var sed = "#64b970";
var wdl = "#42f1f4";
var wisp = "#7582D1";
var prg = "#403a40";
var prw = "#403a40";
var language_colors_default = {
  bsl,
  os,
  "4dm": _dm,
  abap,
  asddls,
  ash,
  aidl,
  al,
  ampl,
  mod,
  g4,
  apib,
  apl,
  dyalog,
  asax,
  ascx,
  ashx,
  asmx,
  aspx,
  axd,
  dats,
  hats,
  sats,
  as,
  adb,
  ada,
  ads,
  afm,
  agda,
  als,
  OutJob,
  PcbDoc,
  PrjPCB,
  SchDoc,
  angelscript,
  apacheconf,
  vhost,
  cls,
  agc,
  applescript,
  scpt,
  arc,
  asciidoc,
  adoc,
  aj,
  asm,
  a51,
  inc,
  nasm,
  astro,
  aug,
  ahk,
  ahkl,
  au3,
  avdl,
  awk,
  auk,
  gawk,
  mawk,
  nawk,
  bas,
  bal,
  bat,
  cmd,
  bib,
  bibtex,
  bicep,
  bison,
  bb,
  blade,
  "blade.php": blade_php,
  decls,
  bmx,
  bsv,
  boo,
  bpl,
  brs,
  c: c2,
  cats,
  h,
  idc,
  cs,
  cake,
  csx,
  linq,
  cpp,
  "c++": c__,
  cc,
  cp,
  cxx,
  "h++": h__,
  hh,
  hpp,
  hxx,
  inl,
  ino,
  ipp,
  re: re2,
  tcc,
  tpp,
  clp,
  cmake,
  "cmake.in": cmake_in,
  dae,
  cson,
  css,
  csv,
  w,
  cabal,
  capnp,
  ceylon,
  chpl,
  ch,
  ck,
  cirru,
  clw,
  asp,
  icl,
  dcl,
  click,
  clj,
  boot,
  cl2,
  cljc,
  cljs,
  "cljs.hl": cljs_hl,
  cljscm,
  cljx,
  hic,
  soy,
  ql,
  qll,
  coffee,
  _coffee,
  cjsx,
  iced,
  cfm,
  cfml,
  cfc,
  lisp,
  asd,
  cl,
  l,
  lsp,
  ny,
  podsl,
  sexp,
  cwl,
  cps,
  coq,
  v,
  cr,
  orc,
  udo,
  csd,
  sco,
  cu,
  cuh,
  pyx,
  pxd,
  pxi,
  d,
  di,
  dm,
  dfy,
  darcspatch,
  dpatch,
  dart,
  dwl,
  dhall,
  dockerfile,
  djs,
  dylan,
  dyl,
  intr,
  lid,
  E,
  ecl,
  eclxml,
  ejs,
  ect,
  jst,
  eq,
  sch,
  brd,
  eb,
  epj,
  e,
  ex,
  exs,
  elm,
  el,
  emacs,
  "emacs.desktop": emacs_desktop,
  em,
  emberscript,
  erl,
  "app.src": app_src,
  es,
  escript,
  hrl,
  xrl,
  yrl,
  fs: fs2,
  fsi,
  fsx,
  fst,
  flf,
  fx,
  flux,
  factor,
  fy,
  fancypack,
  fan,
  fnl,
  f,
  ftl,
  for: for2,
  fth,
  "4th": _th,
  forth,
  frt,
  f77,
  fpp,
  f90,
  f03,
  f08,
  f95,
  bi,
  fut,
  g,
  cnc,
  gco,
  gcode,
  gaml,
  gms,
  gap,
  gd,
  gi,
  tst,
  md,
  ged,
  glsl,
  fp,
  frag,
  frg,
  fsh,
  fshader,
  geo,
  geom,
  glslf,
  glslv,
  gs,
  gshader,
  shader,
  tesc,
  tese,
  vert,
  vrx,
  vsh,
  vshader,
  gml,
  kid,
  ebuild,
  eclass,
  gbr,
  cmp,
  gbl,
  gbo,
  gbp,
  gbs,
  gko,
  gpb,
  gpt,
  gtl,
  gto,
  gtp,
  gts,
  ncl,
  sol,
  feature,
  story,
  gitconfig,
  glf,
  gp,
  gnu,
  gnuplot,
  p,
  plot,
  plt,
  go,
  golo,
  gst,
  gsx,
  vark,
  grace,
  gradle,
  gf,
  graphql,
  gql,
  graphqls,
  dot,
  gv,
  groovy,
  grt,
  gtpl,
  gvy,
  gsp,
  cfg,
  workflow,
  hlsl,
  cginc,
  fxh,
  hlsli,
  html,
  htm,
  "html.hl": html_hl,
  xht,
  xhtml: xhtml2,
  ecr,
  eex,
  "html.leex": html_leex,
  erb,
  "erb.deface": erb_deface,
  rhtml,
  phtml,
  cshtml,
  razor,
  http,
  hxml,
  hack,
  hhi,
  php,
  haml,
  "haml.deface": haml_deface,
  handlebars,
  hbs,
  hb,
  hs,
  "hs-boot": hs_boot,
  hsc,
  hx,
  hxsl,
  q,
  hql,
  hc,
  hy,
  dlm,
  ipf,
  ini,
  dof,
  lektorproject,
  prefs,
  properties,
  idr,
  lidr,
  gitignore,
  ijm,
  iss,
  isl,
  io,
  ik,
  thy,
  ijs,
  flex,
  jflex,
  json,
  avsc,
  geojson,
  gltf,
  har,
  ice,
  "JSON-tmLanguage": JSON_tmLanguage,
  jsonl,
  mcmeta,
  tfstate,
  "tfstate.backup": tfstate_backup,
  topojson,
  webapp,
  webmanifest,
  yy,
  yyp,
  jsonc,
  "sublime-build": sublime_build,
  "sublime-commands": sublime_commands,
  "sublime-completions": sublime_completions,
  "sublime-keymap": sublime_keymap,
  "sublime-macro": sublime_macro,
  "sublime-menu": sublime_menu,
  "sublime-mousemap": sublime_mousemap,
  "sublime-project": sublime_project,
  "sublime-settings": sublime_settings,
  "sublime-theme": sublime_theme,
  "sublime-workspace": sublime_workspace,
  sublime_metrics,
  sublime_session,
  json5,
  jsonld,
  jq,
  j,
  java,
  jav,
  jsp,
  js,
  _js,
  bones,
  cjs,
  es6,
  jake,
  javascript,
  jsb,
  jscad,
  jsfl,
  jsm,
  jss,
  jsx,
  mjs,
  njs,
  pac,
  sjs,
  ssjs,
  xsjs,
  xsjslib,
  "js.erb": js_erb,
  jinja,
  j2,
  jinja2,
  jison,
  jisonlex,
  ol,
  iol,
  jsonnet,
  libsonnet,
  jl,
  ipynb,
  krl,
  ksy,
  kak,
  kicad_pcb,
  kicad_mod,
  kicad_wks,
  kt,
  ktm,
  kts,
  csl,
  lfe,
  ll,
  lol,
  lsl,
  lslp,
  lvproj,
  lvlib,
  lark,
  lasso,
  las,
  lasso8,
  lasso9,
  latte,
  less,
  lex,
  ly,
  ily,
  m: m2,
  liquid,
  lagda,
  litcoffee,
  "coffee.md": coffee_md,
  lhs,
  _ls,
  lgt,
  logtalk,
  lookml,
  "model.lkml": model_lkml,
  "view.lkml": view_lkml,
  lua,
  fcgi,
  nse,
  p8,
  pd_lua,
  rbxs,
  rockspec,
  wlua,
  matlab,
  mcr,
  mlir,
  mq4,
  mqh,
  mq5,
  mtml,
  m2: m22,
  mak,
  make,
  mk,
  mkfile,
  mako,
  mao,
  markdown,
  mdown,
  mdwn,
  mdx,
  mkd,
  mkdn,
  mkdown,
  ronn,
  scd,
  workbook,
  marko,
  mask,
  mathematica,
  cdf,
  ma,
  mt,
  nbp,
  wl,
  wlt,
  maxpat,
  maxhelp,
  maxproj,
  mxt,
  pat,
  metal,
  druby,
  duby,
  mirah,
  mo,
  i3,
  ig,
  m3,
  mg,
  moon,
  x68,
  mustache,
  nl,
  nss,
  ne,
  nearley,
  n,
  axs,
  axi,
  "axs.erb": axs_erb,
  "axi.erb": axi_erb,
  nlogo,
  nf,
  nginx,
  nginxconf,
  nim,
  "nim.cfg": nim_cfg,
  nimble,
  nimrod,
  nims,
  nit,
  nix,
  nu,
  numpy,
  numpyw,
  numsc,
  njk,
  ml,
  eliom,
  eliomi,
  ml4,
  mli,
  mll,
  mly,
  odin,
  mm,
  sj,
  omgrofl,
  opal,
  rego,
  opencl,
  qasm,
  scad,
  plist,
  org,
  oxygene,
  oz,
  p4,
  pegjs,
  aw,
  ctp,
  php3,
  php4,
  php5,
  phps,
  phpt,
  pls,
  bdy,
  ddl,
  fnc,
  pck,
  pkb,
  pks,
  plb,
  plsql,
  prc,
  spc,
  sql,
  tpb,
  tps,
  trg,
  vw,
  pgsql,
  pov,
  pan,
  psc,
  parrot,
  pas,
  dfm,
  dpr,
  lpr,
  pascal,
  pp,
  pwn,
  sma,
  pep,
  pl,
  cgi,
  perl,
  ph,
  plx,
  psgi,
  t,
  pig,
  pike,
  pmod,
  pogo,
  pcss,
  postcss,
  ps,
  eps,
  epsi,
  pfa,
  pbt,
  sra,
  sru,
  srw,
  ps1,
  psd1,
  psm1,
  prisma,
  pde,
  prolog,
  yap,
  spin,
  jade,
  pug,
  pb,
  pbi,
  purs,
  py,
  gyp,
  gypi,
  lmi,
  py3,
  pyde,
  pyi,
  pyp,
  pyt,
  pyw,
  rpy,
  smk,
  spec,
  tac,
  wsgi,
  xpy,
  pytb,
  qs,
  qml,
  qbs,
  r,
  rd,
  rsx,
  raml,
  rdoc,
  rexx,
  pprx,
  rex,
  rmd,
  rnh,
  rno,
  rkt,
  rktd,
  rktl,
  scrbl,
  rl,
  "6pl": _pl,
  "6pm": _pm,
  nqp,
  p6,
  p6l,
  p6m,
  pl6,
  pm6,
  raku,
  rakumod,
  rsc,
  res,
  rei,
  reb,
  r2,
  r3,
  rebol,
  red,
  reds,
  regexp,
  regex,
  rs,
  ring,
  riot,
  robot,
  roff,
  "1": _,
  "1in": _in,
  "1m": _m,
  "1x": _x,
  "2": _2,
  "3": _3,
  "3in": _in2,
  "3m": _m2,
  "3p": _p,
  "3pm": _pm2,
  "3qt": _qt,
  "3x": _x2,
  "4": _4,
  "5": _5,
  "6": _6,
  "7": _7,
  "8": _8,
  "9": _9,
  man,
  mdoc,
  me,
  nr,
  tmac,
  rg,
  rb,
  builder,
  eye,
  gemspec,
  god,
  jbuilder,
  mspec,
  pluginspec,
  podspec,
  prawn,
  rabl,
  rake,
  rbi,
  rbuild,
  rbw,
  rbx,
  ru,
  ruby,
  thor,
  watchr,
  "rs.in": rs_in,
  sas,
  scss,
  sparql,
  rq,
  sqf,
  hqf,
  cql,
  mysql,
  tab,
  udf,
  viw,
  db2,
  srt,
  svg,
  sls,
  sass,
  scala,
  kojo,
  sbt,
  sc,
  scaml,
  scm,
  sld,
  sps,
  ss,
  sci,
  sce,
  self: self2,
  sh,
  bash,
  bats,
  command,
  env,
  ksh,
  "sh.in": sh_in,
  tmux,
  tool,
  zsh,
  shen,
  sl,
  slim,
  cocci,
  st,
  tpl,
  sp,
  nut,
  stan,
  fun,
  sig,
  sml,
  bzl,
  do: do2,
  ado,
  doh,
  ihlp,
  mata,
  matah,
  sthlp,
  styl,
  sss,
  svelte,
  swift,
  sv,
  svh,
  vh,
  "8xp": _xp,
  "8xk": _xk,
  "8xk.txt": _xk_txt,
  "8xp.txt": _xp_txt,
  tla,
  toml,
  tsv,
  tsx,
  txl,
  tcl,
  adp,
  tm,
  tex,
  aux,
  bbx,
  cbx,
  dtx,
  ins,
  lbx,
  ltx,
  mkii,
  mkiv,
  mkvi,
  sty,
  toc,
  txt,
  textile,
  thrift,
  tu,
  twig,
  ts,
  upc,
  anim,
  asset,
  mat,
  meta,
  prefab,
  unity,
  uno,
  uc,
  ur,
  urs,
  frm,
  frx,
  vba,
  vbs,
  vcl,
  vhdl,
  vhd,
  vhf,
  vhi,
  vho,
  vhs,
  vht,
  vhw,
  vala,
  vapi,
  vdf,
  veo,
  snip,
  snippet,
  snippets,
  vim,
  vmb,
  vb,
  vbhtml,
  volt,
  vue,
  owl,
  wast,
  wat,
  mediawiki,
  wiki,
  wikitext,
  reg,
  wlk,
  x10,
  xc,
  xml,
  adml,
  admx,
  ant,
  axml,
  builds,
  ccproj,
  ccxml,
  clixml,
  cproject,
  cscfg,
  csdef,
  csproj,
  ct,
  depproj,
  dita,
  ditamap,
  ditaval,
  "dll.config": dll_config,
  dotsettings,
  filters,
  fsproj,
  fxml,
  glade,
  gmx,
  grxml,
  iml,
  ivy,
  jelly,
  jsproj,
  kml,
  launch,
  mdpolicy,
  mjml,
  mxml,
  natvis,
  ndproj,
  nproj,
  nuspec,
  odd,
  osm,
  pkgproj,
  proj,
  props,
  ps1xml,
  psc1,
  pt,
  rdf,
  resx,
  rss,
  scxml,
  sfproj,
  shproj,
  srdf,
  storyboard,
  "sublime-snippet": sublime_snippet,
  targets,
  tml,
  ui,
  urdf,
  ux,
  vbproj,
  vcxproj,
  vsixmanifest,
  vssettings,
  vstemplate,
  vxml,
  wixproj,
  wsdl,
  wsf,
  wxi,
  wxl,
  wxs,
  x3d,
  xacro,
  xaml,
  xib,
  xlf,
  xliff,
  xmi,
  "xml.dist": xml_dist,
  xmp,
  xproj,
  xsd,
  xspec,
  xul,
  zcml,
  stTheme,
  tmCommand,
  tmLanguage,
  tmPreferences,
  tmSnippet,
  tmTheme,
  xquery,
  xq,
  xql,
  xqm,
  xqy,
  xslt,
  xsl,
  xojo_code,
  xojo_menu,
  xojo_report,
  xojo_script,
  xojo_toolbar,
  xojo_window,
  xsh,
  xtend,
  yml,
  mir,
  reek,
  rviz,
  "sublime-syntax": sublime_syntax,
  syntax,
  yaml,
  "yaml-tmlanguage": yaml_tmlanguage,
  "yaml.sed": yaml_sed,
  "yml.mysql": yml_mysql,
  yar,
  yara,
  yasnippet,
  y: y2,
  yacc,
  zap,
  xzap,
  zil,
  mud,
  zs,
  zep,
  zig,
  zimpl,
  zmpl,
  zpl,
  ec,
  eh,
  fish,
  mrc,
  mcfunction,
  mu,
  nanorc,
  nc,
  ooc,
  rst,
  rest,
  "rest.txt": rest_txt,
  "rst.txt": rst_txt,
  sed,
  wdl,
  wisp,
  prg,
  prw
};

// src/CircleText.tsx
var import_uniqueId = __toModule(require_uniqueId());
var import_react = __toModule(require_react());
var CircleText = ({
  r: r4 = 10,
  rotate = 0,
  text = "",
  ...props2
}) => {
  const id2 = (0, import_react.useMemo)(() => (0, import_uniqueId.default)("CircleText--"), []);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("path", {
    fill: "none",
    d: [
      ["M", 0, r4].join(" "),
      ["A", r4, r4, 0, 0, 1, 0, -r4].join(" "),
      ["A", r4, r4, 0, 0, 1, 0, r4].join(" ")
    ].join(" "),
    id: id2,
    transform: `rotate(${rotate})`,
    style: { pointerEvents: "none" }
  }), /* @__PURE__ */ import_react.default.createElement("text", {
    textAnchor: "middle",
    ...props2
  }, /* @__PURE__ */ import_react.default.createElement("textPath", {
    href: `#${id2}`,
    startOffset: "50%"
  }, text)));
};

// src/utils.ts
var truncateString = (string = "", length = 20) => {
  return string.length > length + 3 ? string.substring(0, length) + "..." : string;
};
var keepBetween = (min, max, value) => {
  return Math.max(min, Math.min(max, value));
};
var getPositionFromAngleAndDistance = (angle, distance) => {
  const radians = angle / 180 * Math.PI;
  return [
    Math.cos(radians) * distance,
    Math.sin(radians) * distance
  ];
};
var getAngleFromPosition = (x2, y3) => {
  return Math.atan2(y3, x2) * 180 / Math.PI;
};
var keepCircleInsideCircle = (parentR, parentPosition, childR, childPosition, isParent = false) => {
  const distance = Math.sqrt(Math.pow(parentPosition[0] - childPosition[0], 2) + Math.pow(parentPosition[1] - childPosition[1], 2));
  const angle = getAngleFromPosition(childPosition[0] - parentPosition[0], childPosition[1] - parentPosition[1]);
  const padding = Math.min(angle < -20 && angle > -100 && isParent ? 13 : 3, parentR * 0.2);
  if (distance > parentR - childR - padding) {
    const diff = getPositionFromAngleAndDistance(angle, parentR - childR - padding);
    return [
      parentPosition[0] + diff[0],
      parentPosition[1] + diff[1]
    ];
  }
  return childPosition;
};

// src/Tree.tsx
var looseFilesId = "__structure_loose_file__";
var width = 1e3;
var height = 1e3;
var maxChildren = 9e3;
var lastCommitAccessor = (d2) => {
  var _a, _b;
  return new Date(((_b = (_a = d2.commits) == null ? void 0 : _a[0]) == null ? void 0 : _b.date) + "0");
};
var numberOfCommitsAccessor = (d2) => {
  var _a;
  return ((_a = d2 == null ? void 0 : d2.commits) == null ? void 0 : _a.length) || 0;
};
var Tree = ({ data, filesChanged = [], maxDepth = 9, colorEncoding = "type" }) => {
  const [selectedNodeId, setSelectedNodeId] = (0, import_react2.useState)(null);
  const cachedPositions = (0, import_react2.useRef)({});
  const cachedOrders = (0, import_react2.useRef)({});
  const { colorScale, colorExtent } = (0, import_react2.useMemo)(() => {
    if (!data)
      return { colorScale: () => {
      }, colorExtent: [0, 0] };
    const flattenTree = (d2) => {
      return d2.children ? (0, import_flatten.default)(d2.children.map(flattenTree)) : d2;
    };
    const items = flattenTree(data);
    const flatTree = colorEncoding === "last-change" ? items.map(lastCommitAccessor).sort((a2, b) => b - a2).slice(0, -8) : items.map(numberOfCommitsAccessor).sort((a2, b) => b - a2).slice(2, -2);
    const colorExtent2 = extent_default(flatTree);
    const colors = [
      "#f4f4f4",
      "#f4f4f4",
      "#f4f4f4",
      colorEncoding === "last-change" ? "#C7ECEE" : "#FEEAA7",
      colorEncoding === "number-of-changes" ? "#3C40C6" : "#823471"
    ];
    const colorScale2 = linear2().domain(range_default(0, colors.length).map((i) => +colorExtent2[0] + (colorExtent2[1] - colorExtent2[0]) * i / (colors.length - 1))).range(colors).clamp(true);
    return { colorScale: colorScale2, colorExtent: colorExtent2 };
  }, [data]);
  const getColor = (d2) => {
    var _a;
    if (colorEncoding === "type") {
      const isParent = d2.children;
      if (isParent) {
        const extensions = (0, import_countBy.default)(d2.children, (c3) => c3.extension);
        const mainExtension = (_a = (0, import_maxBy.default)((0, import_entries.default)(extensions), ([k, v2]) => v2)) == null ? void 0 : _a[0];
        return language_colors_default[mainExtension] || "#CED6E0";
      }
      return language_colors_default[d2.extension] || "#CED6E0";
    } else if (colorEncoding === "number-of-changes") {
      return colorScale(numberOfCommitsAccessor(d2)) || "#f4f4f4";
    } else if (colorEncoding === "last-change") {
      return colorScale(lastCommitAccessor(d2)) || "#f4f4f4";
    }
  };
  const packedData = (0, import_react2.useMemo)(() => {
    if (!data)
      return [];
    const hierarchicalData = hierarchy(processChild(data, getColor, cachedOrders.current)).sum((d2) => d2.value).sort((a2, b) => {
      if (b.data.path.startsWith("src/fonts")) {
      }
      return b.data.sortOrder - a2.data.sortOrder || (b.data.name > a2.data.name ? 1 : -1);
    });
    let packedTree = pack_default().size([width, height * 1.3]).padding((d2) => {
      if (d2.depth <= 0)
        return 0;
      const hasChildWithNoChildren = d2.children.filter((d3) => {
        var _a;
        return !((_a = d3.children) == null ? void 0 : _a.length);
      }).length > 1;
      if (hasChildWithNoChildren)
        return 5;
      return 13;
    })(hierarchicalData);
    packedTree.children = reflowSiblings(packedTree.children, cachedPositions.current, maxDepth);
    const children2 = packedTree.descendants();
    cachedOrders.current = {};
    cachedPositions.current = {};
    const saveCachedPositionForItem = (item) => {
      cachedOrders.current[item.data.path] = item.data.sortOrder;
      if (item.children) {
        item.children.forEach(saveCachedPositionForItem);
      }
    };
    saveCachedPositionForItem(packedTree);
    children2.forEach((d2) => {
      cachedPositions.current[d2.data.path] = [d2.x, d2.y];
    });
    return children2.slice(0, maxChildren);
  }, [data]);
  const selectedNode = selectedNodeId && packedData.find((d2) => d2.data.path === selectedNodeId);
  const fileTypes = (0, import_uniqBy.default)(packedData.map((d2) => language_colors_default[d2.data.extension] && d2.data.extension)).sort().filter(Boolean);
  return /* @__PURE__ */ import_react2.default.createElement("svg", {
    width,
    height,
    style: {
      background: "white",
      fontFamily: "sans-serif",
      overflow: "visible"
    },
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("filter", {
    id: "glow",
    x: "-50%",
    y: "-50%",
    width: "200%",
    height: "200%"
  }, /* @__PURE__ */ import_react2.default.createElement("feGaussianBlur", {
    stdDeviation: "4",
    result: "coloredBlur"
  }), /* @__PURE__ */ import_react2.default.createElement("feMerge", null, /* @__PURE__ */ import_react2.default.createElement("feMergeNode", {
    in: "coloredBlur"
  }), /* @__PURE__ */ import_react2.default.createElement("feMergeNode", {
    in: "SourceGraphic"
  })))), packedData.map(({ x: x2, y: y3, r: r4, depth, data: data2, children: children2, ...d2 }) => {
    if (depth <= 0)
      return null;
    if (depth > maxDepth)
      return null;
    const isOutOfDepth = depth >= maxDepth;
    const isParent = !!children2;
    let runningR = r4;
    if (data2.path === looseFilesId)
      return null;
    const isHighlighted = filesChanged.includes(data2.path);
    const doHighlight = !!filesChanged.length;
    return /* @__PURE__ */ import_react2.default.createElement("g", {
      key: data2.path,
      style: {
        fill: doHighlight ? isHighlighted ? "#FCE68A" : "#ECEAEB" : data2.color,
        transition: `transform ${isHighlighted ? "0.5s" : "0s"} ease-out, fill 0.1s ease-out`
      },
      transform: `translate(${x2}, ${y3})`
    }, isParent ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("circle", {
      r: r4,
      style: { transition: "all 0.5s ease-out" },
      stroke: "#290819",
      strokeOpacity: "0.2",
      strokeWidth: "1",
      fill: "white"
    })) : /* @__PURE__ */ import_react2.default.createElement("circle", {
      style: {
        filter: isHighlighted ? "url(#glow)" : void 0,
        transition: "all 0.5s ease-out"
      },
      r: runningR,
      strokeWidth: selectedNodeId === data2.path ? 3 : 0,
      stroke: "#374151"
    }));
  }), packedData.map(({ x: x2, y: y3, r: r4, depth, data: data2, children: children2 }) => {
    if (depth <= 0)
      return null;
    if (depth > maxDepth)
      return null;
    const isParent = !!children2 && depth !== maxDepth;
    if (!isParent)
      return null;
    if (data2.path === looseFilesId)
      return null;
    if (r4 < 16 && selectedNodeId !== data2.path)
      return null;
    if (data2.label.length > r4 * 0.5)
      return null;
    const label = truncateString(data2.label, r4 < 30 ? Math.floor(r4 / 2.7) + 3 : 100);
    let offsetR = r4 + 12 - depth * 4;
    const fontSize = 16 - depth;
    return /* @__PURE__ */ import_react2.default.createElement("g", {
      key: data2.path,
      style: { pointerEvents: "none", transition: "all 0.5s ease-out" },
      transform: `translate(${x2}, ${y3})`
    }, /* @__PURE__ */ import_react2.default.createElement(CircleText, {
      style: { fontSize, transition: "all 0.5s ease-out" },
      r: Math.max(20, offsetR - 3),
      fill: "#374151",
      stroke: "white",
      strokeWidth: "6",
      rotate: depth * 1 - 0,
      text: label
    }), /* @__PURE__ */ import_react2.default.createElement(CircleText, {
      style: { fontSize, transition: "all 0.5s ease-out" },
      fill: "#374151",
      rotate: depth * 1 - 0,
      r: Math.max(20, offsetR - 3),
      text: label
    }));
  }), packedData.map(({ x: x2, y: y3, r: r4, depth, data: data2, children: children2 }) => {
    if (depth <= 0)
      return null;
    if (depth > maxDepth)
      return null;
    const isParent = !!children2;
    if (data2.path === looseFilesId)
      return null;
    const isHighlighted = filesChanged.includes(data2.path);
    const doHighlight = !!filesChanged.length;
    if (isParent && !isHighlighted)
      return null;
    if (selectedNodeId === data2.path && !isHighlighted)
      return null;
    if (!(isHighlighted || !doHighlight && !selectedNode && r4 > 22)) {
      return null;
    }
    const label = isHighlighted ? data2.label : truncateString(data2.label, Math.floor(r4 / 4) + 3);
    return /* @__PURE__ */ import_react2.default.createElement("g", {
      key: data2.path,
      style: {
        fill: doHighlight ? isHighlighted ? "#FCE68A" : "#29081916" : data2.color,
        transition: `transform ${isHighlighted ? "0.5s" : "0s"} ease-out`
      },
      transform: `translate(${x2}, ${y3})`
    }, /* @__PURE__ */ import_react2.default.createElement("text", {
      style: {
        pointerEvents: "none",
        opacity: 0.9,
        fontSize: "14px",
        fontWeight: 500,
        transition: "all 0.5s ease-out"
      },
      fill: "#4B5563",
      textAnchor: "middle",
      dominantBaseline: "middle",
      stroke: "white",
      strokeWidth: "3",
      strokeLinejoin: "round"
    }, label), /* @__PURE__ */ import_react2.default.createElement("text", {
      style: {
        pointerEvents: "none",
        opacity: 1,
        fontSize: "14px",
        fontWeight: 500,
        transition: "all 0.5s ease-out"
      },
      textAnchor: "middle",
      dominantBaseline: "middle"
    }, label), /* @__PURE__ */ import_react2.default.createElement("text", {
      style: {
        pointerEvents: "none",
        opacity: 0.9,
        fontSize: "14px",
        fontWeight: 500,
        mixBlendMode: "color-burn",
        transition: "all 0.5s ease-out"
      },
      fill: "#110101",
      textAnchor: "middle",
      dominantBaseline: "middle"
    }, label));
  }), !filesChanged.length && colorEncoding === "type" && /* @__PURE__ */ import_react2.default.createElement(Legend, {
    fileTypes
  }), !filesChanged.length && colorEncoding !== "type" && /* @__PURE__ */ import_react2.default.createElement(ColorLegend, {
    scale: colorScale,
    extent: colorExtent,
    colorEncoding
  }));
};
var formatD = (d2) => typeof d2 === "number" ? d2 : timeFormat("%b %Y")(d2);
var ColorLegend = ({ scale, extent, colorEncoding }) => {
  if (!scale || !scale.ticks)
    return null;
  const ticks = scale.ticks(10);
  return /* @__PURE__ */ import_react2.default.createElement("g", {
    transform: `translate(${width - 160}, ${height - 90})`
  }, /* @__PURE__ */ import_react2.default.createElement("text", {
    x: 50,
    y: "-5",
    fontSize: "10",
    textAnchor: "middle"
  }, colorEncoding === "number-of-changes" ? "Number of changes" : "Last change date"), /* @__PURE__ */ import_react2.default.createElement("linearGradient", {
    id: "gradient"
  }, ticks.map((tick, i) => {
    const color2 = scale(tick);
    return /* @__PURE__ */ import_react2.default.createElement("stop", {
      offset: i / (ticks.length - 1),
      stopColor: color2,
      key: i
    });
  })), /* @__PURE__ */ import_react2.default.createElement("rect", {
    x: "0",
    width: "100",
    height: "13",
    fill: "url(#gradient)"
  }), extent.map((d2, i) => /* @__PURE__ */ import_react2.default.createElement("text", {
    key: i,
    x: i ? 100 : 0,
    y: "23",
    fontSize: "10",
    textAnchor: i ? "end" : "start"
  }, formatD(d2))));
};
var Legend = ({ fileTypes = [] }) => {
  return /* @__PURE__ */ import_react2.default.createElement("g", {
    transform: `translate(${width - 60}, ${height - fileTypes.length * 15 - 20})`
  }, fileTypes.map((extension, i) => /* @__PURE__ */ import_react2.default.createElement("g", {
    key: i,
    transform: `translate(0, ${i * 15})`
  }, /* @__PURE__ */ import_react2.default.createElement("circle", {
    r: "5",
    fill: language_colors_default[extension]
  }), /* @__PURE__ */ import_react2.default.createElement("text", {
    x: "10",
    style: { fontSize: "14px", fontWeight: 300 },
    dominantBaseline: "middle"
  }, ".", extension))), /* @__PURE__ */ import_react2.default.createElement("g", {
    fill: "#9CA3AF",
    style: {
      fontWeight: 300,
      fontStyle: "italic",
      fontSize: 12
    }
  }, "each dot sized by file size"));
};
var processChild = (child, getColor, cachedOrders, i = 0) => {
  var _a;
  if (!child)
    return;
  const isRoot = !child.path;
  let name = child.name;
  let path = child.path;
  let children2 = (_a = child == null ? void 0 : child.children) == null ? void 0 : _a.map((c3, i2) => processChild(c3, getColor, cachedOrders, i2));
  if ((children2 == null ? void 0 : children2.length) === 1) {
    name = `${name}/${children2[0].name}`;
    path = children2[0].path;
    children2 = children2[0].children;
  }
  const pathWithoutExtension = path == null ? void 0 : path.split(".").slice(0, -1).join(".");
  const extension = name == null ? void 0 : name.split(".").slice(-1)[0];
  const hasExtension = !!language_colors_default[extension];
  if (isRoot && children2) {
    const looseChildren = children2 == null ? void 0 : children2.filter((d2) => {
      var _a2;
      return !((_a2 = d2.children) == null ? void 0 : _a2.length);
    });
    children2 = [
      ...children2 == null ? void 0 : children2.filter((d2) => {
        var _a2;
        return (_a2 = d2.children) == null ? void 0 : _a2.length;
      }),
      {
        name: looseFilesId,
        path: looseFilesId,
        size: 0,
        children: looseChildren
      }
    ];
  }
  let extendedChild = {
    ...child,
    name,
    path,
    label: name,
    extension,
    pathWithoutExtension,
    size: (["woff", "woff2", "ttf", "otf", "png", "jpg", "svg"].includes(extension) ? 100 : Math.min(15e3, hasExtension ? child.size : Math.min(child.size, 9e3))) + i,
    value: (["woff", "woff2", "ttf", "otf", "png", "jpg", "svg"].includes(extension) ? 100 : Math.min(15e3, hasExtension ? child.size : Math.min(child.size, 9e3))) + i,
    color: "#fff",
    children: children2
  };
  extendedChild.color = getColor(extendedChild);
  extendedChild.sortOrder = getSortOrder(extendedChild, cachedOrders, i);
  return extendedChild;
};
var reflowSiblings = (siblings, cachedPositions = {}, maxDepth, parentRadius, parentPosition) => {
  if (!siblings)
    return;
  let items = [...siblings.map((d2) => {
    var _a, _b;
    return {
      ...d2,
      x: ((_a = cachedPositions[d2.data.path]) == null ? void 0 : _a[0]) || d2.x,
      y: ((_b = cachedPositions[d2.data.path]) == null ? void 0 : _b[1]) || d2.y,
      originalX: d2.x,
      originalY: d2.y
    };
  })];
  const paddingScale = sqrt().domain([maxDepth, 1]).range([3, 8]).clamp(true);
  let simulation = simulation_default(items).force("centerX", x_default2(width / 2).strength(items[0].depth <= 2 ? 0.01 : 0)).force("centerY", y_default2(height / 2).strength(items[0].depth <= 2 ? 0.01 : 0)).force("centerX2", x_default2(parentPosition == null ? void 0 : parentPosition[0]).strength(parentPosition ? 0.3 : 0)).force("centerY2", y_default2(parentPosition == null ? void 0 : parentPosition[1]).strength(parentPosition ? 0.8 : 0)).force("x", x_default2((d2) => {
    var _a;
    return ((_a = cachedPositions[d2.data.path]) == null ? void 0 : _a[0]) || width / 2;
  }).strength((d2) => {
    var _a;
    return ((_a = cachedPositions[d2.data.path]) == null ? void 0 : _a[1]) ? 0.5 : width / height * 0.3;
  })).force("y", y_default2((d2) => {
    var _a;
    return ((_a = cachedPositions[d2.data.path]) == null ? void 0 : _a[1]) || height / 2;
  }).strength((d2) => {
    var _a;
    return ((_a = cachedPositions[d2.data.path]) == null ? void 0 : _a[0]) ? 0.5 : height / width * 0.3;
  })).force("collide", collide_default((d2) => d2.children ? d2.r + paddingScale(d2.depth) : d2.r + 1.6).iterations(8).strength(1)).stop();
  for (let i = 0; i < 280; i++) {
    simulation.tick();
    items.forEach((d2) => {
      var _a;
      d2.x = keepBetween(d2.r, d2.x, width - d2.r);
      d2.y = keepBetween(d2.r, d2.y, height - d2.r);
      if (parentPosition && parentRadius) {
        const containedPosition = keepCircleInsideCircle(parentRadius, parentPosition, d2.r, [d2.x, d2.y], !!((_a = d2.children) == null ? void 0 : _a.length));
        d2.x = containedPosition[0];
        d2.y = containedPosition[1];
      }
    });
  }
  const repositionChildren = (d2, xDiff, yDiff) => {
    let newD = { ...d2 };
    newD.x += xDiff;
    newD.y += yDiff;
    if (newD.children) {
      newD.children = newD.children.map((c3) => repositionChildren(c3, xDiff, yDiff));
    }
    return newD;
  };
  for (const item of items) {
    const itemCachedPosition = cachedPositions[item.data.path] || [item.x, item.y];
    const itemPositionDiffFromCached = [
      item.x - itemCachedPosition[0],
      item.y - itemCachedPosition[1]
    ];
    if (item.children) {
      let repositionedCachedPositions = { ...cachedPositions };
      const itemReflowDiff = [
        item.x - item.originalX,
        item.y - item.originalY
      ];
      item.children = item.children.map((child) => repositionChildren(child, itemReflowDiff[0], itemReflowDiff[1]));
      if (item.children.length > 4) {
        if (item.depth > maxDepth)
          return;
        item.children.forEach((child) => {
          const childCachedPosition = repositionedCachedPositions[child.data.path];
          if (childCachedPosition) {
            repositionedCachedPositions[child.data.path] = [
              childCachedPosition[0] + itemPositionDiffFromCached[0],
              childCachedPosition[1] + itemPositionDiffFromCached[1]
            ];
          } else {
            repositionedCachedPositions[child.data.path] = [
              child.x,
              child.y
            ];
          }
        });
        item.children = reflowSiblings(item.children, repositionedCachedPositions, maxDepth, item.r, [item.x, item.y]);
      }
    }
  }
  return items;
};
var getSortOrder = (item, cachedOrders, i = 0) => {
  var _a, _b, _c;
  if (cachedOrders[item.path])
    return cachedOrders[item.path];
  if (cachedOrders[(_c = (_b = (_a = item.path) == null ? void 0 : _a.split("/")) == null ? void 0 : _b.slice(0, -1)) == null ? void 0 : _c.join("/")]) {
    return -1e8;
  }
  if (item.name === "public")
    return -1e6;
  return item.value + -i;
};

// src/index.jsx
var main = async () => {
  core.info("[INFO] Usage https://github.com/githubocto/repo-visualizer#readme");
  const rootPath = core.getInput("root_path") || "./";
  const maxDepth = core.getInput("max_depth") || 9;
  const colorEncoding = core.getInput("color_encoding") || "type";
  const commitMessage = core.getInput("commit_message") || "Repo visualizer: updated diagram";
  const excludedPathsString = core.getInput("excluded_paths") || "node_modules,bower_components,dist,out,build,eject,.next,.netlify,.yarn,.git,.vscode,package-lock.json,yarn.lock";
  const excludedPaths = excludedPathsString.split(",").map((str) => str.trim());
  const branch = core.getInput("branch");
  const data = await processDir(rootPath, excludedPaths);
  const componentCodeString = import_server.default.renderToStaticMarkup(/* @__PURE__ */ import_react3.default.createElement(Tree, {
    data,
    maxDepth: +maxDepth,
    colorEncoding
  }));
  const outputFile = core.getInput("output_file") || "./diagram.svg";
  await import_fs2.default.writeFileSync(outputFile, componentCodeString);
  let doesBranchExist = true;
  console.log("All set!");
};
main();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v17.0.2
 * react-dom-server.node.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-dom-server.node.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
