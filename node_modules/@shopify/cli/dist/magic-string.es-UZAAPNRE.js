import {
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../../node_modules/.pnpm/magic-string@0.30.17/node_modules/magic-string/dist/magic-string.es.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.5.0/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
init_cjs_shims();
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", intToChar = new Uint8Array(64), charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  let c = chars.charCodeAt(i);
  intToChar[i] = c, charToInt[c] = i;
}
function encodeInteger(builder, num, relative) {
  let delta = num - relative;
  delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
  do {
    let clamped = delta & 31;
    delta >>>= 5, delta > 0 && (clamped |= 32), builder.write(intToChar[clamped]);
  } while (delta > 0);
  return num;
}
var bufLength = 1024 * 16, td = typeof TextDecoder < "u" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer < "u" ? {
  decode(buf) {
    return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++)
      out += String.fromCharCode(buf[i]);
    return out;
  }
}, StringWriter = class {
  constructor() {
    this.pos = 0, this.out = "", this.buffer = new Uint8Array(bufLength);
  }
  write(v) {
    let { buffer } = this;
    buffer[this.pos++] = v, this.pos === bufLength && (this.out += td.decode(buffer), this.pos = 0);
  }
  flush() {
    let { buffer, out, pos } = this;
    return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
  }
};
function encode(decoded) {
  let writer = new StringWriter(), sourcesIndex = 0, sourceLine = 0, sourceColumn = 0, namesIndex = 0;
  for (let i = 0; i < decoded.length; i++) {
    let line = decoded[i];
    if (i > 0 && writer.write(59), line.length === 0)
      continue;
    let genColumn = 0;
    for (let j = 0; j < line.length; j++) {
      let segment = line[j];
      j > 0 && writer.write(44), genColumn = encodeInteger(writer, segment[0], genColumn), segment.length !== 1 && (sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex), sourceLine = encodeInteger(writer, segment[2], sourceLine), sourceColumn = encodeInteger(writer, segment[3], sourceColumn), segment.length !== 4 && (namesIndex = encodeInteger(writer, segment[4], namesIndex)));
    }
  }
  return writer.flush();
}

// ../../node_modules/.pnpm/magic-string@0.30.17/node_modules/magic-string/dist/magic-string.es.mjs
var BitSet = class _BitSet {
  constructor(arg) {
    this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
  }
  add(n2) {
    this.bits[n2 >> 5] |= 1 << (n2 & 31);
  }
  has(n2) {
    return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
  }
}, Chunk = class _Chunk {
  constructor(start, end, content) {
    this.start = start, this.end = end, this.original = content, this.intro = "", this.outro = "", this.content = content, this.storeName = !1, this.edited = !1, this.previous = null, this.next = null;
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    let chunk = new _Chunk(this.start, this.end, this.original);
    return chunk.intro = this.intro, chunk.outro = this.outro, chunk.content = this.content, chunk.storeName = this.storeName, chunk.edited = this.edited, chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    for (; chunk; )
      fn(chunk), chunk = chunk.next;
  }
  eachPrevious(fn) {
    let chunk = this;
    for (; chunk; )
      fn(chunk), chunk = chunk.previous;
  }
  edit(content, storeName, contentOnly) {
    return this.content = content, contentOnly || (this.intro = "", this.outro = ""), this.storeName = storeName, this.edited = !0, this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "", this.outro = "", this.edited && (this.content = this.original, this.storeName = !1, this.edited = !1);
  }
  split(index) {
    let sliceIndex = index - this.start, originalBefore = this.original.slice(0, sliceIndex), originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    let newChunk = new _Chunk(index, this.end, originalAfter);
    return newChunk.outro = this.outro, this.outro = "", this.end = index, this.edited ? (newChunk.edit("", !1), this.content = "") : this.content = originalBefore, newChunk.next = this.next, newChunk.next && (newChunk.next.previous = newChunk), newChunk.previous = this, this.next = newChunk, newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    if (this.outro = this.outro.replace(rx, ""), this.outro.length) return !0;
    let trimmed = this.content.replace(rx, "");
    if (trimmed.length)
      return trimmed !== this.content && (this.split(this.start + trimmed.length).edit("", void 0, !0), this.edited && this.edit(trimmed, this.storeName, !0)), !0;
    if (this.edit("", void 0, !0), this.intro = this.intro.replace(rx, ""), this.intro.length) return !0;
  }
  trimStart(rx) {
    if (this.intro = this.intro.replace(rx, ""), this.intro.length) return !0;
    let trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        let newChunk = this.split(this.end - trimmed.length);
        this.edited && newChunk.edit(trimmed, this.storeName, !0), this.edit("", void 0, !0);
      }
      return !0;
    } else if (this.edit("", void 0, !0), this.outro = this.outro.replace(rx, ""), this.outro.length) return !0;
  }
};
function getBtoa() {
  return typeof globalThis < "u" && typeof globalThis.btoa == "function" ? (str) => globalThis.btoa(unescape(encodeURIComponent(str))) : typeof Buffer == "function" ? (str) => Buffer.from(str, "utf-8").toString("base64") : () => {
    throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
  };
}
var btoa = /* @__PURE__ */ getBtoa(), SourceMap = class {
  constructor(properties) {
    this.version = 3, this.file = properties.file, this.sources = properties.sources, this.sourcesContent = properties.sourcesContent, this.names = properties.names, this.mappings = encode(properties.mappings), typeof properties.x_google_ignoreList < "u" && (this.x_google_ignoreList = properties.x_google_ignoreList), typeof properties.debugId < "u" && (this.debugId = properties.debugId);
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  let lines = code.split(`
`), tabbed = lines.filter((line) => /^\t+/.test(line)), spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0)
    return null;
  if (tabbed.length >= spaced.length)
    return "	";
  let min = spaced.reduce((previous, current) => {
    let numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, 1 / 0);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  let fromParts = from.split(/[/\\]/), toParts = to.split(/[/\\]/);
  for (fromParts.pop(); fromParts[0] === toParts[0]; )
    fromParts.shift(), toParts.shift();
  if (fromParts.length) {
    let i = fromParts.length;
    for (; i--; ) fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject(thing) {
  return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
  let originalLines = source.split(`
`), lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++)
    lineOffsets.push(pos), pos += originalLines[i].length + 1;
  return function(index) {
    let i = 0, j = lineOffsets.length;
    for (; i < j; ) {
      let m = i + j >> 1;
      index < lineOffsets[m] ? j = m : i = m + 1;
    }
    let line = i - 1, column = index - lineOffsets[line];
    return { line, column };
  };
}
var wordRegex = /\w/, Mappings = class {
  constructor(hires) {
    this.hires = hires, this.generatedCodeLine = 0, this.generatedCodeColumn = 0, this.raw = [], this.rawSegments = this.raw[this.generatedCodeLine] = [], this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      let contentLengthMinusOne = content.length - 1, contentLineEnd = content.indexOf(`
`, 0), previousContentLineEnd = -1;
      for (; contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd; ) {
        let segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        nameIndex >= 0 && segment2.push(nameIndex), this.rawSegments.push(segment2), this.generatedCodeLine += 1, this.raw[this.generatedCodeLine] = this.rawSegments = [], this.generatedCodeColumn = 0, previousContentLineEnd = contentLineEnd, contentLineEnd = content.indexOf(`
`, contentLineEnd + 1);
      }
      let segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      nameIndex >= 0 && segment.push(nameIndex), this.rawSegments.push(segment), this.advance(content.slice(previousContentLineEnd + 1));
    } else this.pending && (this.rawSegments.push(this.pending), this.advance(content));
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start, first = !0, charInHiresBoundary = !1;
    for (; originalCharIndex < chunk.end; ) {
      if (original[originalCharIndex] === `
`)
        loc.line += 1, loc.column = 0, this.generatedCodeLine += 1, this.raw[this.generatedCodeLine] = this.rawSegments = [], this.generatedCodeColumn = 0, first = !0, charInHiresBoundary = !1;
      else {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          let segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          this.hires === "boundary" ? wordRegex.test(original[originalCharIndex]) ? charInHiresBoundary || (this.rawSegments.push(segment), charInHiresBoundary = !0) : (this.rawSegments.push(segment), charInHiresBoundary = !1) : this.rawSegments.push(segment);
        }
        loc.column += 1, this.generatedCodeColumn += 1, first = !1;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str) return;
    let lines = str.split(`
`);
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++)
        this.generatedCodeLine++, this.raw[this.generatedCodeLine] = this.rawSegments = [];
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
}, n = `
`, warned = {
  insertLeft: !1,
  insertRight: !1,
  storeName: !1
}, MagicString = class _MagicString {
  constructor(string, options = {}) {
    let chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: !0, value: string },
      outro: { writable: !0, value: "" },
      intro: { writable: !0, value: "" },
      firstChunk: { writable: !0, value: chunk },
      lastChunk: { writable: !0, value: chunk },
      lastSearchedChunk: { writable: !0, value: chunk },
      byStart: { writable: !0, value: {} },
      byEnd: { writable: !0, value: {} },
      filename: { writable: !0, value: options.filename },
      indentExclusionRanges: { writable: !0, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: !0, value: new BitSet() },
      storedNames: { writable: !0, value: {} },
      indentStr: { writable: !0, value: void 0 },
      ignoreList: { writable: !0, value: options.ignoreList },
      offset: { writable: !0, value: options.offset || 0 }
    }), this.byStart[0] = chunk, this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content != "string") throw new TypeError("outro content must be a string");
    return this.outro += content, this;
  }
  appendLeft(index, content) {
    if (index = index + this.offset, typeof content != "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    let chunk = this.byEnd[index];
    return chunk ? chunk.appendLeft(content) : this.intro += content, this;
  }
  appendRight(index, content) {
    if (index = index + this.offset, typeof content != "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    let chunk = this.byStart[index];
    return chunk ? chunk.appendRight(content) : this.outro += content, this;
  }
  clone() {
    let cloned = new _MagicString(this.original, { filename: this.filename, offset: this.offset }), originalChunk = this.firstChunk, clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    for (; originalChunk; ) {
      cloned.byStart[clonedChunk.start] = clonedChunk, cloned.byEnd[clonedChunk.end] = clonedChunk;
      let nextOriginalChunk = originalChunk.next, nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      nextClonedChunk && (clonedChunk.next = nextClonedChunk, nextClonedChunk.previous = clonedChunk, clonedChunk = nextClonedChunk), originalChunk = nextOriginalChunk;
    }
    return cloned.lastChunk = clonedChunk, this.indentExclusionRanges && (cloned.indentExclusionRanges = this.indentExclusionRanges.slice()), cloned.sourcemapLocations = new BitSet(this.sourcemapLocations), cloned.intro = this.intro, cloned.outro = this.outro, cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    let sourceIndex = 0, names = Object.keys(this.storedNames), mappings = new Mappings(options.hires), locate = getLocator(this.original);
    return this.intro && mappings.advance(this.intro), this.firstChunk.eachNext((chunk) => {
      let loc = locate(chunk.start);
      chunk.intro.length && mappings.advance(chunk.intro), chunk.edited ? mappings.addEdit(
        sourceIndex,
        chunk.content,
        loc,
        chunk.storeName ? names.indexOf(chunk.original) : -1
      ) : mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations), chunk.outro.length && mappings.advance(chunk.outro);
    }), {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : void 0,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    this.indentStr === void 0 && (this.indentStr = guessIndent(this.original));
  }
  _getRawIndentString() {
    return this._ensureindentStr(), this.indentStr;
  }
  getIndentString() {
    return this._ensureindentStr(), this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    let pattern = /^[^\r\n]/gm;
    if (isObject(indentStr) && (options = indentStr, indentStr = void 0), indentStr === void 0 && (this._ensureindentStr(), indentStr = this.indentStr || "	"), indentStr === "") return this;
    options = options || {};
    let isExcluded = {};
    options.exclude && (typeof options.exclude[0] == "number" ? [options.exclude] : options.exclude).forEach((exclusion) => {
      for (let i = exclusion[0]; i < exclusion[1]; i += 1)
        isExcluded[i] = !0;
    });
    let shouldIndentNextCharacter = options.indentStart !== !1, replacer = (match) => shouldIndentNextCharacter ? `${indentStr}${match}` : (shouldIndentNextCharacter = !0, match);
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0, chunk = this.firstChunk;
    for (; chunk; ) {
      let end = chunk.end;
      if (chunk.edited)
        isExcluded[charIndex] || (chunk.content = chunk.content.replace(pattern, replacer), chunk.content.length && (shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === `
`));
      else
        for (charIndex = chunk.start; charIndex < end; ) {
          if (!isExcluded[charIndex]) {
            let char = this.original[charIndex];
            char === `
` ? shouldIndentNextCharacter = !0 : char !== "\r" && shouldIndentNextCharacter && (shouldIndentNextCharacter = !1, charIndex === chunk.start || (this._splitChunk(chunk, charIndex), chunk = chunk.next), chunk.prependRight(indentStr));
          }
          charIndex += 1;
        }
      charIndex = chunk.end, chunk = chunk.next;
    }
    return this.outro = this.outro.replace(pattern, replacer), this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    return warned.insertLeft || (console.warn(
      "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
    ), warned.insertLeft = !0), this.appendLeft(index, content);
  }
  insertRight(index, content) {
    return warned.insertRight || (console.warn(
      "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
    ), warned.insertRight = !0), this.prependRight(index, content);
  }
  move(start, end, index) {
    if (start = start + this.offset, end = end + this.offset, index = index + this.offset, index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
    this._split(start), this._split(end), this._split(index);
    let first = this.byStart[start], last = this.byEnd[end], oldLeft = first.previous, oldRight = last.next, newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk) return this;
    let newLeft = newRight ? newRight.previous : this.lastChunk;
    return oldLeft && (oldLeft.next = oldRight), oldRight && (oldRight.previous = oldLeft), newLeft && (newLeft.next = first), newRight && (newRight.previous = last), first.previous || (this.firstChunk = last.next), last.next || (this.lastChunk = first.previous, this.lastChunk.next = null), first.previous = newLeft, last.next = newRight || null, newLeft || (this.firstChunk = first), newRight || (this.lastChunk = last), this;
  }
  overwrite(start, end, content, options) {
    return options = options || {}, this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    if (start = start + this.offset, end = end + this.offset, typeof content != "string") throw new TypeError("replacement content must be a string");
    if (this.original.length !== 0) {
      for (; start < 0; ) start += this.original.length;
      for (; end < 0; ) end += this.original.length;
    }
    if (end > this.original.length) throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start), this._split(end), options === !0 && (warned.storeName || (console.warn(
      "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
    ), warned.storeName = !0), options = { storeName: !0 });
    let storeName = options !== void 0 ? options.storeName : !1, overwrite = options !== void 0 ? options.overwrite : !1;
    if (storeName) {
      let original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: !0,
        value: !0,
        enumerable: !0
      });
    }
    let first = this.byStart[start], last = this.byEnd[end];
    if (first) {
      let chunk = first;
      for (; chunk !== last; ) {
        if (chunk.next !== this.byStart[chunk.end])
          throw new Error("Cannot overwrite across a split point");
        chunk = chunk.next, chunk.edit("", !1);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      let newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk, newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content != "string") throw new TypeError("outro content must be a string");
    return this.intro = content + this.intro, this;
  }
  prependLeft(index, content) {
    if (index = index + this.offset, typeof content != "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    let chunk = this.byEnd[index];
    return chunk ? chunk.prependLeft(content) : this.intro = content + this.intro, this;
  }
  prependRight(index, content) {
    if (index = index + this.offset, typeof content != "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    let chunk = this.byStart[index];
    return chunk ? chunk.prependRight(content) : this.outro = content + this.outro, this;
  }
  remove(start, end) {
    if (start = start + this.offset, end = end + this.offset, this.original.length !== 0) {
      for (; start < 0; ) start += this.original.length;
      for (; end < 0; ) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start), this._split(end);
    let chunk = this.byStart[start];
    for (; chunk; )
      chunk.intro = "", chunk.outro = "", chunk.edit(""), chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    return this;
  }
  reset(start, end) {
    if (start = start + this.offset, end = end + this.offset, this.original.length !== 0) {
      for (; start < 0; ) start += this.original.length;
      for (; end < 0; ) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start), this._split(end);
    let chunk = this.byStart[start];
    for (; chunk; )
      chunk.reset(), chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    return this;
  }
  lastChar() {
    if (this.outro.length) return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length) return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    return this.intro.length ? this.intro[this.intro.length - 1] : "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro, chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        if (lineIndex = chunk.outro.lastIndexOf(n), lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        if (lineIndex = chunk.content.lastIndexOf(n), lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        if (lineIndex = chunk.intro.lastIndexOf(n), lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    return lineIndex = this.intro.lastIndexOf(n), lineIndex !== -1 ? this.intro.substr(lineIndex + 1) + lineStr : this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length - this.offset) {
    if (start = start + this.offset, end = end + this.offset, this.original.length !== 0) {
      for (; start < 0; ) start += this.original.length;
      for (; end < 0; ) end += this.original.length;
    }
    let result = "", chunk = this.firstChunk;
    for (; chunk && (chunk.start > start || chunk.end <= start); ) {
      if (chunk.start < end && chunk.end >= end)
        return result;
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    let startChunk = chunk;
    for (; chunk; ) {
      chunk.intro && (startChunk !== chunk || chunk.start === start) && (result += chunk.intro);
      let containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      let sliceStart = startChunk === chunk ? start - chunk.start : 0, sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      if (result += chunk.content.slice(sliceStart, sliceEnd), chunk.outro && (!containsEnd || chunk.end === end) && (result += chunk.outro), containsEnd)
        break;
      chunk = chunk.next;
    }
    return result;
  }
  // TODO deprecate this? not really very useful
  snip(start, end) {
    let clone = this.clone();
    return clone.remove(0, start), clone.remove(end, clone.original.length), clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index]) return;
    let chunk = this.lastSearchedChunk, searchForward = index > chunk.end;
    for (; chunk; ) {
      if (chunk.contains(index)) return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      let loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    let newChunk = chunk.split(index);
    return this.byEnd[index] = chunk, this.byStart[index] = newChunk, this.byEnd[newChunk.end] = newChunk, chunk === this.lastChunk && (this.lastChunk = newChunk), this.lastSearchedChunk = chunk, !0;
  }
  toString() {
    let str = this.intro, chunk = this.firstChunk;
    for (; chunk; )
      str += chunk.toString(), chunk = chunk.next;
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return !1;
    while (chunk = chunk.next);
    return !0;
  }
  length() {
    let chunk = this.firstChunk, length = 0;
    do
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    let rx = new RegExp((charType || "\\s") + "+$");
    if (this.outro = this.outro.replace(rx, ""), this.outro.length) return !0;
    let chunk = this.lastChunk;
    do {
      let end = chunk.end, aborted = chunk.trimEnd(rx);
      if (chunk.end !== end && (this.lastChunk === chunk && (this.lastChunk = chunk.next), this.byEnd[chunk.end] = chunk, this.byStart[chunk.next.start] = chunk.next, this.byEnd[chunk.next.end] = chunk.next), aborted) return !0;
      chunk = chunk.previous;
    } while (chunk);
    return !1;
  }
  trimEnd(charType) {
    return this.trimEndAborted(charType), this;
  }
  trimStartAborted(charType) {
    let rx = new RegExp("^" + (charType || "\\s") + "+");
    if (this.intro = this.intro.replace(rx, ""), this.intro.length) return !0;
    let chunk = this.firstChunk;
    do {
      let end = chunk.end, aborted = chunk.trimStart(rx);
      if (chunk.end !== end && (chunk === this.lastChunk && (this.lastChunk = chunk.next), this.byEnd[chunk.end] = chunk, this.byStart[chunk.next.start] = chunk.next, this.byEnd[chunk.next.end] = chunk.next), aborted) return !0;
      chunk = chunk.next;
    } while (chunk);
    return !1;
  }
  trimStart(charType) {
    return this.trimStartAborted(charType), this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      return typeof replacement == "string" ? replacement.replace(/\$(\$|&|\d+)/g, (_, i) => i === "$" ? "$" : i === "&" ? match[0] : +i < match.length ? match[+i] : `$${i}`) : replacement(...match, match.index, str, match.groups);
    }
    function matchAll(re, str) {
      let match, matches = [];
      for (; match = re.exec(str); )
        matches.push(match);
      return matches;
    }
    if (searchValue.global)
      matchAll(searchValue, this.original).forEach((match) => {
        if (match.index != null) {
          let replacement2 = getReplacement(match, this.original);
          replacement2 !== match[0] && this.overwrite(match.index, match.index + match[0].length, replacement2);
        }
      });
    else {
      let match = this.original.match(searchValue);
      if (match && match.index != null) {
        let replacement2 = getReplacement(match, this.original);
        replacement2 !== match[0] && this.overwrite(match.index, match.index + match[0].length, replacement2);
      }
    }
    return this;
  }
  _replaceString(string, replacement) {
    let { original } = this, index = original.indexOf(string);
    return index !== -1 && this.overwrite(index, index + string.length, replacement), this;
  }
  replace(searchValue, replacement) {
    return typeof searchValue == "string" ? this._replaceString(searchValue, replacement) : this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    let { original } = this, stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength))
      original.slice(index, index + stringLength) !== replacement && this.overwrite(index, index + stringLength, replacement);
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue == "string")
      return this._replaceAllString(searchValue, replacement);
    if (!searchValue.global)
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    return this._replaceRegexp(searchValue, replacement);
  }
}, hasOwnProp = Object.prototype.hasOwnProperty, Bundle = class _Bundle {
  constructor(options = {}) {
    this.intro = options.intro || "", this.separator = options.separator !== void 0 ? options.separator : `
`, this.sources = [], this.uniqueSources = [], this.uniqueSourceIndexByFilename = {};
  }
  addSource(source) {
    if (source instanceof MagicString)
      return this.addSource({
        content: source,
        filename: source.filename,
        separator: this.separator
      });
    if (!isObject(source) || !source.content)
      throw new Error(
        "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
      );
    if (["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((option) => {
      hasOwnProp.call(source, option) || (source[option] = source.content[option]);
    }), source.separator === void 0 && (source.separator = this.separator), source.filename)
      if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename))
        this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length, this.uniqueSources.push({ filename: source.filename, content: source.content.original });
      else {
        let uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
        if (source.content.original !== uniqueSource.content)
          throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
      }
    return this.sources.push(source), this;
  }
  append(str, options) {
    return this.addSource({
      content: new MagicString(str),
      separator: options && options.separator || ""
    }), this;
  }
  clone() {
    let bundle = new _Bundle({
      intro: this.intro,
      separator: this.separator
    });
    return this.sources.forEach((source) => {
      bundle.addSource({
        filename: source.filename,
        content: source.content.clone(),
        separator: source.separator
      });
    }), bundle;
  }
  generateDecodedMap(options = {}) {
    let names = [], x_google_ignoreList;
    this.sources.forEach((source) => {
      Object.keys(source.content.storedNames).forEach((name) => {
        ~names.indexOf(name) || names.push(name);
      });
    });
    let mappings = new Mappings(options.hires);
    return this.intro && mappings.advance(this.intro), this.sources.forEach((source, i) => {
      i > 0 && mappings.advance(this.separator);
      let sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1, magicString = source.content, locate = getLocator(magicString.original);
      magicString.intro && mappings.advance(magicString.intro), magicString.firstChunk.eachNext((chunk) => {
        let loc = locate(chunk.start);
        chunk.intro.length && mappings.advance(chunk.intro), source.filename ? chunk.edited ? mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        ) : mappings.addUneditedChunk(
          sourceIndex,
          chunk,
          magicString.original,
          loc,
          magicString.sourcemapLocations
        ) : mappings.advance(chunk.content), chunk.outro.length && mappings.advance(chunk.outro);
      }), magicString.outro && mappings.advance(magicString.outro), source.ignoreList && sourceIndex !== -1 && (x_google_ignoreList === void 0 && (x_google_ignoreList = []), x_google_ignoreList.push(sourceIndex));
    }), {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: this.uniqueSources.map((source) => options.file ? getRelativePath(options.file, source.filename) : source.filename),
      sourcesContent: this.uniqueSources.map((source) => options.includeContent ? source.content : null),
      names,
      mappings: mappings.raw,
      x_google_ignoreList
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  getIndentString() {
    let indentStringCounts = {};
    return this.sources.forEach((source) => {
      let indentStr = source.content._getRawIndentString();
      indentStr !== null && (indentStringCounts[indentStr] || (indentStringCounts[indentStr] = 0), indentStringCounts[indentStr] += 1);
    }), Object.keys(indentStringCounts).sort((a, b) => indentStringCounts[a] - indentStringCounts[b])[0] || "	";
  }
  indent(indentStr) {
    if (arguments.length || (indentStr = this.getIndentString()), indentStr === "") return this;
    let trailingNewline = !this.intro || this.intro.slice(-1) === `
`;
    return this.sources.forEach((source, i) => {
      let separator = source.separator !== void 0 ? source.separator : this.separator, indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
      source.content.indent(indentStr, {
        exclude: source.indentExclusionRanges,
        indentStart
        //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
      }), trailingNewline = source.content.lastChar() === `
`;
    }), this.intro && (this.intro = indentStr + this.intro.replace(/^[^\n]/gm, (match, index) => index > 0 ? indentStr + match : match)), this;
  }
  prepend(str) {
    return this.intro = str + this.intro, this;
  }
  toString() {
    let body = this.sources.map((source, i) => {
      let separator = source.separator !== void 0 ? source.separator : this.separator;
      return (i > 0 ? separator : "") + source.content.toString();
    }).join("");
    return this.intro + body;
  }
  isEmpty() {
    return !(this.intro.length && this.intro.trim() || this.sources.some((source) => !source.content.isEmpty()));
  }
  length() {
    return this.sources.reduce(
      (length, source) => length + source.content.length(),
      this.intro.length
    );
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimStart(charType) {
    let rx = new RegExp("^" + (charType || "\\s") + "+");
    if (this.intro = this.intro.replace(rx, ""), !this.intro) {
      let source, i = 0;
      do
        if (source = this.sources[i++], !source)
          break;
      while (!source.content.trimStartAborted(charType));
    }
    return this;
  }
  trimEnd(charType) {
    let rx = new RegExp((charType || "\\s") + "+$"), source, i = this.sources.length - 1;
    do
      if (source = this.sources[i--], !source) {
        this.intro = this.intro.replace(rx, "");
        break;
      }
    while (!source.content.trimEndAborted(charType));
    return this;
  }
};
export {
  Bundle,
  SourceMap,
  MagicString as default
};
//# sourceMappingURL=magic-string.es-UZAAPNRE.js.map
