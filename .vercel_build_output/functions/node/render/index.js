var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_fs = __toModule(require("fs"));
    import_node_path = __toModule(require("path"));
    import_node_worker_threads = __toModule(require("worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("http"));
    import_node_https = __toModule(require("https"));
    import_node_zlib = __toModule(require("zlib"));
    import_node_stream = __toModule(require("stream"));
    import_node_util = __toModule(require("util"));
    import_node_url = __toModule(require("url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data12) {
        let i2 = 0;
        const length_ = data12.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data12.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data12);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data12.length, data12);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data12[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data12[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data12[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data12 = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data12, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data12) {
  if (data12[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data12.url}`);
  }
  data12[INTERNALS$2].disturbed = true;
  if (data12[INTERNALS$2].error) {
    throw data12[INTERNALS$2].error;
  }
  const { body } = data12;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data12.size > 0 && accumBytes + chunk.length > data12.size) {
        const error2 = new FetchError(`content size at ${data12.url} over limit: ${data12.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data12.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data12.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data12.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data12 = dataUriToBuffer(request.url);
      const response2 = new Response2(data12, { headers: { "Content-Type": data12.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function __fetch_polyfill() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http2 = __toModule(require("http"));
    import_node_https2 = __toModule(require("https"));
    import_node_zlib2 = __toModule(require("zlib"));
    import_node_stream2 = __toModule(require("stream"));
    import_node_util2 = __toModule(require("util"));
    import_node_url2 = __toModule(require("url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry21 = this._queue.shift();
              this._queueTotalSize -= entry21.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry21.buffer, entry21.byteOffset, entry21.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          const size = init === null || init === void 0 ? void 0 : init.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable, "readable", "ReadableWritablePair");
          assertReadableStream(readable, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable._state === "errored") {
              throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data12 = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data12.set(chunk, offset);
          offset += chunk.length;
        }
        return data12.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers2) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null)
          ;
        else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers2(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-f16625c7.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function custom_event(type, detail, bubbles = false) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, false, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css47) => css47.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${style_object[key]};`).join(" ");
}
var current_component, boolean_attributes, invalid_attribute_name_character, escaped, missing_component, on_destroy;
var init_index_f16625c7 = __esm({
  ".svelte-kit/output/server/chunks/index-f16625c7.js"() {
    Promise.resolve();
    boolean_attributes = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/tabbable/dist/index.js
var require_dist = __commonJS({
  "node_modules/tabbable/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
    var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
    var matches = typeof Element === "undefined" ? function() {
    } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    var getCandidates = function getCandidates2(el, includeContainer, filter) {
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }
      candidates = candidates.filter(filter);
      return candidates;
    };
    var isContentEditable = function isContentEditable2(node) {
      return node.contentEditable === "true";
    };
    var getTabindex = function getTabindex2(node) {
      var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
      if (!isNaN(tabindexAttr)) {
        return tabindexAttr;
      }
      if (isContentEditable(node)) {
        return 0;
      }
      if ((node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
        return 0;
      }
      return node.tabIndex;
    };
    var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
      return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
    };
    var isInput = function isInput2(node) {
      return node.tagName === "INPUT";
    };
    var isHiddenInput = function isHiddenInput2(node) {
      return isInput(node) && node.type === "hidden";
    };
    var isDetailsWithSummary = function isDetailsWithSummary2(node) {
      var r2 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === "SUMMARY";
      });
      return r2;
    };
    var getCheckedRadio = function getCheckedRadio2(nodes, form) {
      for (var i2 = 0; i2 < nodes.length; i2++) {
        if (nodes[i2].checked && nodes[i2].form === form) {
          return nodes[i2];
        }
      }
    };
    var isTabbableRadio = function isTabbableRadio2(node) {
      if (!node.name) {
        return true;
      }
      var radioScope = node.form || node.ownerDocument;
      var queryRadios = function queryRadios2(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
      };
      var radioSet;
      if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
        radioSet = queryRadios(window.CSS.escape(node.name));
      } else {
        try {
          radioSet = queryRadios(node.name);
        } catch (err) {
          console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
          return false;
        }
      }
      var checked = getCheckedRadio(radioSet, node.form);
      return !checked || checked === node;
    };
    var isRadio = function isRadio2(node) {
      return isInput(node) && node.type === "radio";
    };
    var isNonTabbableRadio = function isNonTabbableRadio2(node) {
      return isRadio(node) && !isTabbableRadio(node);
    };
    var isHidden = function isHidden2(node, displayCheck) {
      if (getComputedStyle(node).visibility === "hidden") {
        return true;
      }
      var isDirectSummary = matches.call(node, "details>summary:first-of-type");
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
      if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
        return true;
      }
      if (!displayCheck || displayCheck === "full") {
        while (node) {
          if (getComputedStyle(node).display === "none") {
            return true;
          }
          node = node.parentElement;
        }
      } else if (displayCheck === "non-zero-area") {
        var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
        return width === 0 && height === 0;
      }
      return false;
    };
    var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
      if (isInput(node) || node.tagName === "SELECT" || node.tagName === "TEXTAREA" || node.tagName === "BUTTON") {
        var parentNode = node.parentElement;
        while (parentNode) {
          if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
            for (var i2 = 0; i2 < parentNode.children.length; i2++) {
              var child = parentNode.children.item(i2);
              if (child.tagName === "LEGEND") {
                if (child.contains(node)) {
                  return false;
                }
                return true;
              }
            }
            return true;
          }
          parentNode = parentNode.parentElement;
        }
      }
      return false;
    };
    var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
      if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }
      return true;
    };
    var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
      if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
        return false;
      }
      return true;
    };
    var tabbable2 = function tabbable3(el, options) {
      options = options || {};
      var regularTabbables = [];
      var orderedTabbables = [];
      var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
      candidates.forEach(function(candidate, i2) {
        var candidateTabindex = getTabindex(candidate);
        if (candidateTabindex === 0) {
          regularTabbables.push(candidate);
        } else {
          orderedTabbables.push({
            documentOrder: i2,
            tabIndex: candidateTabindex,
            node: candidate
          });
        }
      });
      var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function(a) {
        return a.node;
      }).concat(regularTabbables);
      return tabbableNodes;
    };
    var focusable = function focusable2(el, options) {
      options = options || {};
      var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
      return candidates;
    };
    var isTabbable2 = function isTabbable3(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, candidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorTabbable(options, node);
    };
    var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
    var isFocusable = function isFocusable2(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorFocusable(options, node);
    };
    exports.focusable = focusable;
    exports.isFocusable = isFocusable;
    exports.isTabbable = isTabbable2;
    exports.tabbable = tabbable2;
  }
});

// .svelte-kit/output/server/chunks/ContextMenu.svelte_svelte_type_style_lang-24a7f719.js
function uid(prefix) {
  return prefix + String.fromCharCode(Math.floor(Math.random() * 26) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).split(".")[0];
}
function createEventForwarder(component, exclude = []) {
  let $on;
  let events = [];
  component.$on = (eventType, callback) => {
    let destructor = () => {
    };
    if (exclude.includes(eventType)) {
      const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    return () => destructor();
  };
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    const forward = (e2) => bubble(component, e2);
    $on = (eventType, callback) => {
      let handler = callback;
      let options = false;
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (const event of events) {
      $on(event[0], event[1]);
    }
    return {
      destroy: () => {
        for (const destructor of destructors) {
          destructor();
        }
        for (let entry21 of Object.entries(forwardDestructors)) {
          entry21[1]();
        }
      }
    };
  };
}
var init_ContextMenu_svelte_svelte_type_style_lang_24a7f719 = __esm({
  ".svelte-kit/output/server/chunks/ContextMenu.svelte_svelte_type_style_lang-24a7f719.js"() {
    init_index_f16625c7();
  }
});

// .svelte-kit/output/server/chunks/TooltipWrapper-9548af36.js
var css$1, TooltipSurface, css, TooltipWrapper;
var init_TooltipWrapper_9548af36 = __esm({
  ".svelte-kit/output/server/chunks/TooltipWrapper-9548af36.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css$1 = {
      code: ".tooltip.svelte-r7762s{align-items:center;background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-control-corner-radius);box-shadow:var(--fds-tooltip-shadow);box-sizing:border-box;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:-webkit-max-content;inline-size:-moz-max-content;inline-size:max-content;justify-content:center;line-height:20px;max-inline-size:320px;padding-block:5px 7px;padding-inline:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
      map: null
    };
    TooltipSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$1);
      return `<div${spread([
        { class: "tooltip " + escape(className) },
        { role: "tooltip" },
        escape_object($$restProps)
      ], { classes: "svelte-r7762s" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
    });
    css = {
      code: ".tooltip-wrapper.svelte-e2a5n0{display:block;position:relative}.tooltip-anchor.svelte-e2a5n0{pointer-events:none;position:absolute;z-index:100}.tooltip-anchor.placement-top.svelte-e2a5n0{bottom:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-bottom.svelte-e2a5n0{top:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-left.svelte-e2a5n0{right:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-right.svelte-e2a5n0{left:calc(100% + var(--fds-tooltip-offset))}.tooltip-anchor.placement-bottom.alignment-start.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-start.svelte-e2a5n0{inset-inline-start:0}.tooltip-anchor.placement-bottom.alignment-end.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-end.svelte-e2a5n0{inset-inline-end:0}.tooltip-anchor.placement-bottom.alignment-center.svelte-e2a5n0,.tooltip-anchor.placement-top.alignment-center.svelte-e2a5n0{inset-inline-start:50%;transform:translateX(-50%)}.tooltip-anchor.placement-left.alignment-start.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-start.svelte-e2a5n0{inset-block-start:0}.tooltip-anchor.placement-left.alignment-end.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-end.svelte-e2a5n0{inset-block-end:0}.tooltip-anchor.placement-left.alignment-center.svelte-e2a5n0,.tooltip-anchor.placement-right.alignment-center.svelte-e2a5n0{inset-block-start:50%;transform:translateY(-50%)}.tooltip-anchor.placement-auto.svelte-e2a5n0{transform:translateY(-100%)}.tooltip-anchor.placement-auto.alignment-center.svelte-e2a5n0{transform:translate(-50%,-100%)}.tooltip-anchor.placement-auto.alignment-end.svelte-e2a5n0{transform:translate(-100%,-100%)}",
      map: null
    };
    TooltipWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "text",
        "offset",
        "placement",
        "alignment",
        "followCursor",
        "persistent",
        "visible",
        "delay",
        "tooltipElement",
        "anchorElement",
        "wrapperElement"
      ]);
      let { text = "" } = $$props;
      let { offset = 24 } = $$props;
      let { placement = "auto" } = $$props;
      let { alignment = "center" } = $$props;
      let { followCursor = false } = $$props;
      let { persistent = false } = $$props;
      let { visible = false } = $$props;
      let { delay = 1e3 } = $$props;
      let { tooltipElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { wrapperElement = null } = $$props;
      let currentPosition = { x: 0, y: 0 };
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.alignment === void 0 && $$bindings.alignment && alignment !== void 0)
        $$bindings.alignment(alignment);
      if ($$props.followCursor === void 0 && $$bindings.followCursor && followCursor !== void 0)
        $$bindings.followCursor(followCursor);
      if ($$props.persistent === void 0 && $$bindings.persistent && persistent !== void 0)
        $$bindings.persistent(persistent);
      if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
        $$bindings.visible(visible);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      if ($$props.tooltipElement === void 0 && $$bindings.tooltipElement && tooltipElement !== void 0)
        $$bindings.tooltipElement(tooltipElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      $$result.css.add(css);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `

<div class="${"tooltip-wrapper svelte-e2a5n0"}"${add_attribute("title", text, 0)}${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}

	${visible ? `<div class="${"tooltip-anchor placement-" + escape(placement) + " alignment-" + escape(alignment) + " svelte-e2a5n0"}" style="${escape(placement === "auto" ? `top: calc(${currentPosition.y}px - var(--fds-tooltip-offset));
				   left: ${currentPosition.x}px;` : "") + " --fds-tooltip-offset: " + escape(offset) + "px"}"${add_attribute("this", anchorElement, 0)}>${validate_component(TooltipSurface, "TooltipSurface").$$render($$result, Object.assign($$restProps, { element: tooltipElement }), {
          element: ($$value) => {
            tooltipElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${escape(text)}
				${slots.tooltip ? slots.tooltip({}) : ``}`;
          }
        })}</div>` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/chunks/IconButton-302c6ea8.js
var css2, IconButton;
var init_IconButton_302c6ea8 = __esm({
  ".svelte-kit/output/server/chunks/IconButton-302c6ea8.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css2 = {
      code: ".icon-button.svelte-1iys5lx{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);display:inline-flex;justify-content:center;min-block-size:30px;min-inline-size:30px;outline:none;padding:8px}.icon-button.svelte-1iys5lx:focus-visible{box-shadow:var(--fds-focus-stroke)}.icon-button.svelte-1iys5lx:hover{background-color:var(--fds-subtle-fill-secondary)}.icon-button.svelte-1iys5lx:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.icon-button.svelte-1iys5lx:disabled{background-color:var(--fds-subtle-fill-disabled);color:var(--fds-text-disabled)}.icon-button.svelte-1iys5lx svg{fill:currentColor;block-size:auto;inline-size:16px}",
      map: null
    };
    IconButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "disabled", "class", "element"]);
      let { href = "" } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css2);
      return `${href && !disabled ? `<a${spread([
        {
          class: "icon-button " + escape(className)
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1iys5lx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<button${spread([
        {
          class: "icon-button " + escape(className)
        },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1iys5lx"
      })}>${slots.default ? slots.default({}) : ``}</button>`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/stores-56a134e1.js
var getStores, page;
var init_stores_56a134e1 = __esm({
  ".svelte-kit/output/server/chunks/stores-56a134e1.js"() {
    init_index_f16625c7();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/chunks/TextBlock-b8b64333.js
var css3, TextBlock;
var init_TextBlock_b8b64333 = __esm({
  ".svelte-kit/output/server/chunks/TextBlock-b8b64333.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css3 = {
      code: ".text-block.svelte-zxj483{color:currentColor;display:inline-block;margin:0;padding:0}.text-block.type-display.svelte-zxj483,.text-block.type-subtitle.svelte-zxj483,.text-block.type-title.svelte-zxj483,.text-block.type-title-large.svelte-zxj483{font-family:var(--fds-font-family-display);font-weight:600}.text-block.type-body.svelte-zxj483,.text-block.type-body-large.svelte-zxj483,.text-block.type-body-strong.svelte-zxj483{font-family:var(--fds-font-family-text)}.text-block.type-caption.svelte-zxj483{font-family:var(--fds-font-family-small);font-size:var(--fds-caption-font-size);font-weight:400;line-height:16px}.text-block.type-body.svelte-zxj483,.text-block.type-body-large.svelte-zxj483,.text-block.type-body-strong.svelte-zxj483{font-size:var(--fds-body-font-size);font-weight:400;line-height:20px}.text-block.type-body-strong.svelte-zxj483{font-weight:600}.text-block.type-body-large.svelte-zxj483{font-size:var(--fds-body-large-font-size);line-height:24px}.text-block.type-subtitle.svelte-zxj483{font-size:var(--fds-subtitle-font-size);line-height:28px}.text-block.type-title.svelte-zxj483{font-size:var(--fds-title-font-size);line-height:36px}.text-block.type-title-large.svelte-zxj483{font-size:var(--fds-title-large-font-size);line-height:52px}.text-block.type-display.svelte-zxj483{font-size:var(--fds-display-font-size);line-height:92px}",
      map: null
    };
    TextBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["variant", "class", "element"]);
      let { variant = "body" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css3);
      return `${variant === "caption" ? `<span${spread([
        {
          class: "text-block type-caption " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${variant === "body" ? `<span${spread([
        {
          class: "text-block type-body " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${variant === "bodyStrong" ? `<h6${spread([
        {
          class: "text-block type-body-strong " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${variant === "bodyLarge" ? `<h5${spread([
        {
          class: "text-block type-body-large " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${variant === "subtitle" ? `<h4${spread([
        {
          class: "text-block type-subtitle " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${variant === "title" ? `<h3${spread([
        {
          class: "text-block type-title " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${variant === "titleLarge" ? `<h2${spread([
        {
          class: "text-block type-title-large " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${variant === "display" ? `<h1${spread([
        {
          class: "text-block type-display " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-zxj483" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : ``}`}`}`}`}`}`}`}`;
    });
  }
});

// node_modules/wheel/index.js
var require_wheel = __commonJS({
  "node_modules/wheel/index.js"(exports, module2) {
    module2.exports = addWheelListener;
    module2.exports.addWheelListener = addWheelListener;
    module2.exports.removeWheelListener = removeWheelListener;
    function addWheelListener(element, listener, useCapture) {
      element.addEventListener("wheel", listener, useCapture);
    }
    function removeWheelListener(element, listener, useCapture) {
      element.removeEventListener("wheel", listener, useCapture);
    }
  }
});

// node_modules/bezier-easing/src/index.js
var require_src = __commonJS({
  "node_modules/bezier-easing/src/index.js"(exports, module2) {
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 1e-3;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A2(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A2(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A2(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i2 = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i2 < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i2 = 0; i2 < NEWTON_ITERATIONS; ++i2) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function LinearEasing(x2) {
      return x2;
    }
    module2.exports = function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
      }
      var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      for (var i2 = 0; i2 < kSplineTableSize; ++i2) {
        sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function BezierEasing(x2) {
        if (x2 === 0) {
          return 0;
        }
        if (x2 === 1) {
          return 1;
        }
        return calcBezier(getTForX(x2), mY1, mY2);
      };
    };
  }
});

// node_modules/amator/index.js
var require_amator = __commonJS({
  "node_modules/amator/index.js"(exports, module2) {
    var BezierEasing = require_src();
    var animations = {
      ease: BezierEasing(0.25, 0.1, 0.25, 1),
      easeIn: BezierEasing(0.42, 0, 1, 1),
      easeOut: BezierEasing(0, 0, 0.58, 1),
      easeInOut: BezierEasing(0.42, 0, 0.58, 1),
      linear: BezierEasing(0, 0, 1, 1)
    };
    module2.exports = animate;
    module2.exports.makeAggregateRaf = makeAggregateRaf;
    module2.exports.sharedScheduler = makeAggregateRaf();
    function animate(source, target, options) {
      var start = Object.create(null);
      var diff = Object.create(null);
      options = options || {};
      var easing = typeof options.easing === "function" ? options.easing : animations[options.easing];
      if (!easing) {
        if (options.easing) {
          console.warn("Unknown easing function in amator: " + options.easing);
        }
        easing = animations.ease;
      }
      var step = typeof options.step === "function" ? options.step : noop4;
      var done = typeof options.done === "function" ? options.done : noop4;
      var scheduler = getScheduler(options.scheduler);
      var keys = Object.keys(target);
      keys.forEach(function(key) {
        start[key] = source[key];
        diff[key] = target[key] - source[key];
      });
      var durationInMs = typeof options.duration === "number" ? options.duration : 400;
      var durationInFrames = Math.max(1, durationInMs * 0.06);
      var previousAnimationId;
      var frame = 0;
      previousAnimationId = scheduler.next(loop);
      return {
        cancel
      };
      function cancel() {
        scheduler.cancel(previousAnimationId);
        previousAnimationId = 0;
      }
      function loop() {
        var t2 = easing(frame / durationInFrames);
        frame += 1;
        setValues(t2);
        if (frame <= durationInFrames) {
          previousAnimationId = scheduler.next(loop);
          step(source);
        } else {
          previousAnimationId = 0;
          setTimeout(function() {
            done(source);
          }, 0);
        }
      }
      function setValues(t2) {
        keys.forEach(function(key) {
          source[key] = diff[key] * t2 + start[key];
        });
      }
    }
    function noop4() {
    }
    function getScheduler(scheduler) {
      if (!scheduler) {
        var canRaf = typeof window !== "undefined" && window.requestAnimationFrame;
        return canRaf ? rafScheduler() : timeoutScheduler();
      }
      if (typeof scheduler.next !== "function")
        throw new Error("Scheduler is supposed to have next(cb) function");
      if (typeof scheduler.cancel !== "function")
        throw new Error("Scheduler is supposed to have cancel(handle) function");
      return scheduler;
    }
    function rafScheduler() {
      return {
        next: window.requestAnimationFrame.bind(window),
        cancel: window.cancelAnimationFrame.bind(window)
      };
    }
    function timeoutScheduler() {
      return {
        next: function(cb) {
          return setTimeout(cb, 1e3 / 60);
        },
        cancel: function(id) {
          return clearTimeout(id);
        }
      };
    }
    function makeAggregateRaf() {
      var frontBuffer = new Set();
      var backBuffer = new Set();
      var frameToken = 0;
      return {
        next,
        cancel: next,
        clearAll
      };
      function clearAll() {
        frontBuffer.clear();
        backBuffer.clear();
        cancelAnimationFrame(frameToken);
        frameToken = 0;
      }
      function next(callback) {
        backBuffer.add(callback);
        renderNextFrame();
      }
      function renderNextFrame() {
        if (!frameToken)
          frameToken = requestAnimationFrame(renderFrame);
      }
      function renderFrame() {
        frameToken = 0;
        var t2 = backBuffer;
        backBuffer = frontBuffer;
        frontBuffer = t2;
        frontBuffer.forEach(function(callback) {
          callback();
        });
        frontBuffer.clear();
      }
      function cancel(callback) {
        backBuffer.delete(callback);
      }
    }
  }
});

// node_modules/ngraph.events/index.js
var require_ngraph = __commonJS({
  "node_modules/ngraph.events/index.js"(exports, module2) {
    module2.exports = function eventify(subject) {
      validateSubject(subject);
      var eventsStorage = createEventsStorage(subject);
      subject.on = eventsStorage.on;
      subject.off = eventsStorage.off;
      subject.fire = eventsStorage.fire;
      return subject;
    };
    function createEventsStorage(subject) {
      var registeredEvents = Object.create(null);
      return {
        on: function(eventName, callback, ctx) {
          if (typeof callback !== "function") {
            throw new Error("callback is expected to be a function");
          }
          var handlers = registeredEvents[eventName];
          if (!handlers) {
            handlers = registeredEvents[eventName] = [];
          }
          handlers.push({ callback, ctx });
          return subject;
        },
        off: function(eventName, callback) {
          var wantToRemoveAll = typeof eventName === "undefined";
          if (wantToRemoveAll) {
            registeredEvents = Object.create(null);
            return subject;
          }
          if (registeredEvents[eventName]) {
            var deleteAllCallbacksForEvent = typeof callback !== "function";
            if (deleteAllCallbacksForEvent) {
              delete registeredEvents[eventName];
            } else {
              var callbacks = registeredEvents[eventName];
              for (var i2 = 0; i2 < callbacks.length; ++i2) {
                if (callbacks[i2].callback === callback) {
                  callbacks.splice(i2, 1);
                }
              }
            }
          }
          return subject;
        },
        fire: function(eventName) {
          var callbacks = registeredEvents[eventName];
          if (!callbacks) {
            return subject;
          }
          var fireArguments;
          if (arguments.length > 1) {
            fireArguments = Array.prototype.splice.call(arguments, 1);
          }
          for (var i2 = 0; i2 < callbacks.length; ++i2) {
            var callbackInfo = callbacks[i2];
            callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
          }
          return subject;
        }
      };
    }
    function validateSubject(subject) {
      if (!subject) {
        throw new Error("Eventify cannot use falsy object as events subject");
      }
      var reservedWords = ["on", "fire", "off"];
      for (var i2 = 0; i2 < reservedWords.length; ++i2) {
        if (subject.hasOwnProperty(reservedWords[i2])) {
          throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i2] + "'");
        }
      }
    }
  }
});

// node_modules/panzoom/lib/kinetic.js
var require_kinetic = __commonJS({
  "node_modules/panzoom/lib/kinetic.js"(exports, module2) {
    module2.exports = kinetic;
    function kinetic(getPoint, scroll, settings) {
      if (typeof settings !== "object") {
        settings = {};
      }
      var minVelocity = typeof settings.minVelocity === "number" ? settings.minVelocity : 5;
      var amplitude = typeof settings.amplitude === "number" ? settings.amplitude : 0.25;
      var cancelAnimationFrame2 = typeof settings.cancelAnimationFrame === "function" ? settings.cancelAnimationFrame : getCancelAnimationFrame();
      var requestAnimationFrame2 = typeof settings.requestAnimationFrame === "function" ? settings.requestAnimationFrame : getRequestAnimationFrame();
      var lastPoint;
      var timestamp;
      var timeConstant = 342;
      var ticker;
      var vx, targetX, ax;
      var vy, targetY, ay;
      var raf;
      return {
        start,
        stop,
        cancel: dispose
      };
      function dispose() {
        cancelAnimationFrame2(ticker);
        cancelAnimationFrame2(raf);
      }
      function start() {
        lastPoint = getPoint();
        ax = ay = vx = vy = 0;
        timestamp = new Date();
        cancelAnimationFrame2(ticker);
        cancelAnimationFrame2(raf);
        ticker = requestAnimationFrame2(track);
      }
      function track() {
        var now = Date.now();
        var elapsed = now - timestamp;
        timestamp = now;
        var currentPoint = getPoint();
        var dx = currentPoint.x - lastPoint.x;
        var dy = currentPoint.y - lastPoint.y;
        lastPoint = currentPoint;
        var dt = 1e3 / (1 + elapsed);
        vx = 0.8 * dx * dt + 0.2 * vx;
        vy = 0.8 * dy * dt + 0.2 * vy;
        ticker = requestAnimationFrame2(track);
      }
      function stop() {
        cancelAnimationFrame2(ticker);
        cancelAnimationFrame2(raf);
        var currentPoint = getPoint();
        targetX = currentPoint.x;
        targetY = currentPoint.y;
        timestamp = Date.now();
        if (vx < -minVelocity || vx > minVelocity) {
          ax = amplitude * vx;
          targetX += ax;
        }
        if (vy < -minVelocity || vy > minVelocity) {
          ay = amplitude * vy;
          targetY += ay;
        }
        raf = requestAnimationFrame2(autoScroll);
      }
      function autoScroll() {
        var elapsed = Date.now() - timestamp;
        var moving = false;
        var dx = 0;
        var dy = 0;
        if (ax) {
          dx = -ax * Math.exp(-elapsed / timeConstant);
          if (dx > 0.5 || dx < -0.5)
            moving = true;
          else
            dx = ax = 0;
        }
        if (ay) {
          dy = -ay * Math.exp(-elapsed / timeConstant);
          if (dy > 0.5 || dy < -0.5)
            moving = true;
          else
            dy = ay = 0;
        }
        if (moving) {
          scroll(targetX + dx, targetY + dy);
          raf = requestAnimationFrame2(autoScroll);
        }
      }
    }
    function getCancelAnimationFrame() {
      if (typeof cancelAnimationFrame === "function")
        return cancelAnimationFrame;
      return clearTimeout;
    }
    function getRequestAnimationFrame() {
      if (typeof requestAnimationFrame === "function")
        return requestAnimationFrame;
      return function(handler) {
        return setTimeout(handler, 16);
      };
    }
  }
});

// node_modules/panzoom/lib/createTextSelectionInterceptor.js
var require_createTextSelectionInterceptor = __commonJS({
  "node_modules/panzoom/lib/createTextSelectionInterceptor.js"(exports, module2) {
    module2.exports = createTextSelectionInterceptor;
    function createTextSelectionInterceptor(useFake) {
      if (useFake) {
        return {
          capture: noop4,
          release: noop4
        };
      }
      var dragObject;
      var prevSelectStart;
      var prevDragStart;
      var wasCaptured = false;
      return {
        capture,
        release
      };
      function capture(domObject) {
        wasCaptured = true;
        prevSelectStart = window.document.onselectstart;
        prevDragStart = window.document.ondragstart;
        window.document.onselectstart = disabled;
        dragObject = domObject;
        dragObject.ondragstart = disabled;
      }
      function release() {
        if (!wasCaptured)
          return;
        wasCaptured = false;
        window.document.onselectstart = prevSelectStart;
        if (dragObject)
          dragObject.ondragstart = prevDragStart;
      }
    }
    function disabled(e2) {
      e2.stopPropagation();
      return false;
    }
    function noop4() {
    }
  }
});

// node_modules/panzoom/lib/transform.js
var require_transform = __commonJS({
  "node_modules/panzoom/lib/transform.js"(exports, module2) {
    module2.exports = Transform;
    function Transform() {
      this.x = 0;
      this.y = 0;
      this.scale = 1;
    }
  }
});

// node_modules/panzoom/lib/svgController.js
var require_svgController = __commonJS({
  "node_modules/panzoom/lib/svgController.js"(exports, module2) {
    module2.exports = makeSvgController;
    module2.exports.canAttach = isSVGElement;
    function makeSvgController(svgElement, options) {
      if (!isSVGElement(svgElement)) {
        throw new Error("svg element is required for svg.panzoom to work");
      }
      var owner = svgElement.ownerSVGElement;
      if (!owner) {
        throw new Error("Do not apply panzoom to the root <svg> element. Use its child instead (e.g. <g></g>). As of March 2016 only FireFox supported transform on the root element");
      }
      if (!options.disableKeyboardInteraction) {
        owner.setAttribute("tabindex", 0);
      }
      var api = {
        getBBox,
        getScreenCTM,
        getOwner,
        applyTransform,
        initTransform
      };
      return api;
      function getOwner() {
        return owner;
      }
      function getBBox() {
        var bbox = svgElement.getBBox();
        return {
          left: bbox.x,
          top: bbox.y,
          width: bbox.width,
          height: bbox.height
        };
      }
      function getScreenCTM() {
        var ctm = owner.getCTM();
        if (!ctm) {
          return owner.getScreenCTM();
        }
        return ctm;
      }
      function initTransform(transform) {
        var screenCTM = svgElement.getCTM();
        if (screenCTM === null) {
          screenCTM = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
        }
        transform.x = screenCTM.e;
        transform.y = screenCTM.f;
        transform.scale = screenCTM.a;
        owner.removeAttributeNS(null, "viewBox");
      }
      function applyTransform(transform) {
        svgElement.setAttribute("transform", "matrix(" + transform.scale + " 0 0 " + transform.scale + " " + transform.x + " " + transform.y + ")");
      }
    }
    function isSVGElement(element) {
      return element && element.ownerSVGElement && element.getCTM;
    }
  }
});

// node_modules/panzoom/lib/domController.js
var require_domController = __commonJS({
  "node_modules/panzoom/lib/domController.js"(exports, module2) {
    module2.exports = makeDomController;
    module2.exports.canAttach = isDomElement;
    function makeDomController(domElement, options) {
      var elementValid = isDomElement(domElement);
      if (!elementValid) {
        throw new Error("panzoom requires DOM element to be attached to the DOM tree");
      }
      var owner = domElement.parentElement;
      domElement.scrollTop = 0;
      if (!options.disableKeyboardInteraction) {
        owner.setAttribute("tabindex", 0);
      }
      var api = {
        getBBox,
        getOwner,
        applyTransform
      };
      return api;
      function getOwner() {
        return owner;
      }
      function getBBox() {
        return {
          left: 0,
          top: 0,
          width: domElement.clientWidth,
          height: domElement.clientHeight
        };
      }
      function applyTransform(transform) {
        domElement.style.transformOrigin = "0 0 0";
        domElement.style.transform = "matrix(" + transform.scale + ", 0, 0, " + transform.scale + ", " + transform.x + ", " + transform.y + ")";
      }
    }
    function isDomElement(element) {
      return element && element.parentElement && element.style;
    }
  }
});

// node_modules/panzoom/index.js
var require_panzoom = __commonJS({
  "node_modules/panzoom/index.js"(exports, module2) {
    "use strict";
    var wheel = require_wheel();
    var animate = require_amator();
    var eventify = require_ngraph();
    var kinetic = require_kinetic();
    var createTextSelectionInterceptor = require_createTextSelectionInterceptor();
    var domTextSelectionInterceptor = createTextSelectionInterceptor();
    var fakeTextSelectorInterceptor = createTextSelectionInterceptor(true);
    var Transform = require_transform();
    var makeSvgController = require_svgController();
    var makeDomController = require_domController();
    var defaultZoomSpeed = 1;
    var defaultDoubleTapZoomSpeed = 1.75;
    var doubleTapSpeedInMS = 300;
    module2.exports = createPanZoom;
    function createPanZoom(domElement, options) {
      options = options || {};
      var panController = options.controller;
      if (!panController) {
        if (makeSvgController.canAttach(domElement)) {
          panController = makeSvgController(domElement, options);
        } else if (makeDomController.canAttach(domElement)) {
          panController = makeDomController(domElement, options);
        }
      }
      if (!panController) {
        throw new Error("Cannot create panzoom for the current type of dom element");
      }
      var owner = panController.getOwner();
      var storedCTMResult = { x: 0, y: 0 };
      var isDirty = false;
      var transform = new Transform();
      if (panController.initTransform) {
        panController.initTransform(transform);
      }
      var filterKey = typeof options.filterKey === "function" ? options.filterKey : noop4;
      var pinchSpeed = typeof options.pinchSpeed === "number" ? options.pinchSpeed : 1;
      var bounds = options.bounds;
      var maxZoom = typeof options.maxZoom === "number" ? options.maxZoom : Number.POSITIVE_INFINITY;
      var minZoom = typeof options.minZoom === "number" ? options.minZoom : 0;
      var boundsPadding = typeof options.boundsPadding === "number" ? options.boundsPadding : 0.05;
      var zoomDoubleClickSpeed = typeof options.zoomDoubleClickSpeed === "number" ? options.zoomDoubleClickSpeed : defaultDoubleTapZoomSpeed;
      var beforeWheel = options.beforeWheel || noop4;
      var beforeMouseDown = options.beforeMouseDown || noop4;
      var speed = typeof options.zoomSpeed === "number" ? options.zoomSpeed : defaultZoomSpeed;
      var transformOrigin = parseTransformOrigin(options.transformOrigin);
      var textSelection = options.enableTextSelection ? fakeTextSelectorInterceptor : domTextSelectionInterceptor;
      validateBounds(bounds);
      if (options.autocenter) {
        autocenter();
      }
      var frameAnimation;
      var lastTouchEndTime = 0;
      var lastSingleFingerOffset;
      var touchInProgress = false;
      var panstartFired = false;
      var mouseX;
      var mouseY;
      var pinchZoomLength;
      var smoothScroll;
      if ("smoothScroll" in options && !options.smoothScroll) {
        smoothScroll = rigidScroll();
      } else {
        smoothScroll = kinetic(getPoint, scroll, options.smoothScroll);
      }
      var moveByAnimation;
      var zoomToAnimation;
      var multiTouch;
      var paused = false;
      listenForEvents();
      var api = {
        dispose,
        moveBy: internalMoveBy,
        moveTo,
        smoothMoveTo,
        centerOn,
        zoomTo: publicZoomTo,
        zoomAbs,
        smoothZoom,
        smoothZoomAbs,
        showRectangle,
        pause,
        resume,
        isPaused,
        getTransform: getTransformModel,
        getMinZoom,
        setMinZoom,
        getMaxZoom,
        setMaxZoom,
        getTransformOrigin,
        setTransformOrigin,
        getZoomSpeed,
        setZoomSpeed
      };
      eventify(api);
      var initialX = typeof options.initialX === "number" ? options.initialX : transform.x;
      var initialY = typeof options.initialY === "number" ? options.initialY : transform.y;
      var initialZoom = typeof options.initialZoom === "number" ? options.initialZoom : transform.scale;
      if (initialX != transform.x || initialY != transform.y || initialZoom != transform.scale) {
        zoomAbs(initialX, initialY, initialZoom);
      }
      return api;
      function pause() {
        releaseEvents();
        paused = true;
      }
      function resume() {
        if (paused) {
          listenForEvents();
          paused = false;
        }
      }
      function isPaused() {
        return paused;
      }
      function showRectangle(rect) {
        var clientRect = owner.getBoundingClientRect();
        var size = transformToScreen(clientRect.width, clientRect.height);
        var rectWidth = rect.right - rect.left;
        var rectHeight = rect.bottom - rect.top;
        if (!Number.isFinite(rectWidth) || !Number.isFinite(rectHeight)) {
          throw new Error("Invalid rectangle");
        }
        var dw = size.x / rectWidth;
        var dh = size.y / rectHeight;
        var scale = Math.min(dw, dh);
        transform.x = -(rect.left + rectWidth / 2) * scale + size.x / 2;
        transform.y = -(rect.top + rectHeight / 2) * scale + size.y / 2;
        transform.scale = scale;
      }
      function transformToScreen(x2, y) {
        if (panController.getScreenCTM) {
          var parentCTM = panController.getScreenCTM();
          var parentScaleX = parentCTM.a;
          var parentScaleY = parentCTM.d;
          var parentOffsetX = parentCTM.e;
          var parentOffsetY = parentCTM.f;
          storedCTMResult.x = x2 * parentScaleX - parentOffsetX;
          storedCTMResult.y = y * parentScaleY - parentOffsetY;
        } else {
          storedCTMResult.x = x2;
          storedCTMResult.y = y;
        }
        return storedCTMResult;
      }
      function autocenter() {
        var w;
        var h2;
        var left = 0;
        var top = 0;
        var sceneBoundingBox = getBoundingBox();
        if (sceneBoundingBox) {
          left = sceneBoundingBox.left;
          top = sceneBoundingBox.top;
          w = sceneBoundingBox.right - sceneBoundingBox.left;
          h2 = sceneBoundingBox.bottom - sceneBoundingBox.top;
        } else {
          var ownerRect = owner.getBoundingClientRect();
          w = ownerRect.width;
          h2 = ownerRect.height;
        }
        var bbox = panController.getBBox();
        if (bbox.width === 0 || bbox.height === 0) {
          return;
        }
        var dh = h2 / bbox.height;
        var dw = w / bbox.width;
        var scale = Math.min(dw, dh);
        transform.x = -(bbox.left + bbox.width / 2) * scale + w / 2 + left;
        transform.y = -(bbox.top + bbox.height / 2) * scale + h2 / 2 + top;
        transform.scale = scale;
      }
      function getTransformModel() {
        return transform;
      }
      function getMinZoom() {
        return minZoom;
      }
      function setMinZoom(newMinZoom) {
        minZoom = newMinZoom;
      }
      function getMaxZoom() {
        return maxZoom;
      }
      function setMaxZoom(newMaxZoom) {
        maxZoom = newMaxZoom;
      }
      function getTransformOrigin() {
        return transformOrigin;
      }
      function setTransformOrigin(newTransformOrigin) {
        transformOrigin = parseTransformOrigin(newTransformOrigin);
      }
      function getZoomSpeed() {
        return speed;
      }
      function setZoomSpeed(newSpeed) {
        if (!Number.isFinite(newSpeed)) {
          throw new Error("Zoom speed should be a number");
        }
        speed = newSpeed;
      }
      function getPoint() {
        return {
          x: transform.x,
          y: transform.y
        };
      }
      function moveTo(x2, y) {
        transform.x = x2;
        transform.y = y;
        keepTransformInsideBounds();
        triggerEvent("pan");
        makeDirty();
      }
      function moveBy(dx, dy) {
        moveTo(transform.x + dx, transform.y + dy);
      }
      function keepTransformInsideBounds() {
        var boundingBox = getBoundingBox();
        if (!boundingBox)
          return;
        var adjusted = false;
        var clientRect = getClientRect();
        var diff = boundingBox.left - clientRect.right;
        if (diff > 0) {
          transform.x += diff;
          adjusted = true;
        }
        diff = boundingBox.right - clientRect.left;
        if (diff < 0) {
          transform.x += diff;
          adjusted = true;
        }
        diff = boundingBox.top - clientRect.bottom;
        if (diff > 0) {
          transform.y += diff;
          adjusted = true;
        }
        diff = boundingBox.bottom - clientRect.top;
        if (diff < 0) {
          transform.y += diff;
          adjusted = true;
        }
        return adjusted;
      }
      function getBoundingBox() {
        if (!bounds)
          return;
        if (typeof bounds === "boolean") {
          var ownerRect = owner.getBoundingClientRect();
          var sceneWidth = ownerRect.width;
          var sceneHeight = ownerRect.height;
          return {
            left: sceneWidth * boundsPadding,
            top: sceneHeight * boundsPadding,
            right: sceneWidth * (1 - boundsPadding),
            bottom: sceneHeight * (1 - boundsPadding)
          };
        }
        return bounds;
      }
      function getClientRect() {
        var bbox = panController.getBBox();
        var leftTop = client(bbox.left, bbox.top);
        return {
          left: leftTop.x,
          top: leftTop.y,
          right: bbox.width * transform.scale + leftTop.x,
          bottom: bbox.height * transform.scale + leftTop.y
        };
      }
      function client(x2, y) {
        return {
          x: x2 * transform.scale + transform.x,
          y: y * transform.scale + transform.y
        };
      }
      function makeDirty() {
        isDirty = true;
        frameAnimation = window.requestAnimationFrame(frame);
      }
      function zoomByRatio(clientX, clientY, ratio) {
        if (isNaN2(clientX) || isNaN2(clientY) || isNaN2(ratio)) {
          throw new Error("zoom requires valid numbers");
        }
        var newScale = transform.scale * ratio;
        if (newScale < minZoom) {
          if (transform.scale === minZoom)
            return;
          ratio = minZoom / transform.scale;
        }
        if (newScale > maxZoom) {
          if (transform.scale === maxZoom)
            return;
          ratio = maxZoom / transform.scale;
        }
        var size = transformToScreen(clientX, clientY);
        transform.x = size.x - ratio * (size.x - transform.x);
        transform.y = size.y - ratio * (size.y - transform.y);
        if (bounds && boundsPadding === 1 && minZoom === 1) {
          transform.scale *= ratio;
          keepTransformInsideBounds();
        } else {
          var transformAdjusted = keepTransformInsideBounds();
          if (!transformAdjusted)
            transform.scale *= ratio;
        }
        triggerEvent("zoom");
        makeDirty();
      }
      function zoomAbs(clientX, clientY, zoomLevel) {
        var ratio = zoomLevel / transform.scale;
        zoomByRatio(clientX, clientY, ratio);
      }
      function centerOn(ui) {
        var parent = ui.ownerSVGElement;
        if (!parent)
          throw new Error("ui element is required to be within the scene");
        var clientRect = ui.getBoundingClientRect();
        var cx = clientRect.left + clientRect.width / 2;
        var cy = clientRect.top + clientRect.height / 2;
        var container = parent.getBoundingClientRect();
        var dx = container.width / 2 - cx;
        var dy = container.height / 2 - cy;
        internalMoveBy(dx, dy, true);
      }
      function smoothMoveTo(x2, y) {
        internalMoveBy(x2 - transform.x, y - transform.y, true);
      }
      function internalMoveBy(dx, dy, smooth) {
        if (!smooth) {
          return moveBy(dx, dy);
        }
        if (moveByAnimation)
          moveByAnimation.cancel();
        var from = { x: 0, y: 0 };
        var to = { x: dx, y: dy };
        var lastX = 0;
        var lastY = 0;
        moveByAnimation = animate(from, to, {
          step: function(v) {
            moveBy(v.x - lastX, v.y - lastY);
            lastX = v.x;
            lastY = v.y;
          }
        });
      }
      function scroll(x2, y) {
        cancelZoomAnimation();
        moveTo(x2, y);
      }
      function dispose() {
        releaseEvents();
      }
      function listenForEvents() {
        owner.addEventListener("mousedown", onMouseDown, { passive: false });
        owner.addEventListener("dblclick", onDoubleClick, { passive: false });
        owner.addEventListener("touchstart", onTouch, { passive: false });
        owner.addEventListener("keydown", onKeyDown, { passive: false });
        wheel.addWheelListener(owner, onMouseWheel, { passive: false });
        makeDirty();
      }
      function releaseEvents() {
        wheel.removeWheelListener(owner, onMouseWheel);
        owner.removeEventListener("mousedown", onMouseDown);
        owner.removeEventListener("keydown", onKeyDown);
        owner.removeEventListener("dblclick", onDoubleClick);
        owner.removeEventListener("touchstart", onTouch);
        if (frameAnimation) {
          window.cancelAnimationFrame(frameAnimation);
          frameAnimation = 0;
        }
        smoothScroll.cancel();
        releaseDocumentMouse();
        releaseTouches();
        textSelection.release();
        triggerPanEnd();
      }
      function frame() {
        if (isDirty)
          applyTransform();
      }
      function applyTransform() {
        isDirty = false;
        panController.applyTransform(transform);
        triggerEvent("transform");
        frameAnimation = 0;
      }
      function onKeyDown(e2) {
        var x2 = 0, y = 0, z = 0;
        if (e2.keyCode === 38) {
          y = 1;
        } else if (e2.keyCode === 40) {
          y = -1;
        } else if (e2.keyCode === 37) {
          x2 = 1;
        } else if (e2.keyCode === 39) {
          x2 = -1;
        } else if (e2.keyCode === 189 || e2.keyCode === 109) {
          z = 1;
        } else if (e2.keyCode === 187 || e2.keyCode === 107) {
          z = -1;
        }
        if (filterKey(e2, x2, y, z)) {
          return;
        }
        if (x2 || y) {
          e2.preventDefault();
          e2.stopPropagation();
          var clientRect = owner.getBoundingClientRect();
          var offset = Math.min(clientRect.width, clientRect.height);
          var moveSpeedRatio = 0.05;
          var dx = offset * moveSpeedRatio * x2;
          var dy = offset * moveSpeedRatio * y;
          internalMoveBy(dx, dy);
        }
        if (z) {
          var scaleMultiplier = getScaleMultiplier(z * 100);
          var offset = transformOrigin ? getTransformOriginOffset() : midPoint();
          publicZoomTo(offset.x, offset.y, scaleMultiplier);
        }
      }
      function midPoint() {
        var ownerRect = owner.getBoundingClientRect();
        return {
          x: ownerRect.width / 2,
          y: ownerRect.height / 2
        };
      }
      function onTouch(e2) {
        beforeTouch(e2);
        if (e2.touches.length === 1) {
          return handleSingleFingerTouch(e2, e2.touches[0]);
        } else if (e2.touches.length === 2) {
          pinchZoomLength = getPinchZoomLength(e2.touches[0], e2.touches[1]);
          multiTouch = true;
          startTouchListenerIfNeeded();
        }
      }
      function beforeTouch(e2) {
        if (options.onTouch && !options.onTouch(e2)) {
          return;
        }
        e2.stopPropagation();
        e2.preventDefault();
      }
      function beforeDoubleClick(e2) {
        if (options.onDoubleClick && !options.onDoubleClick(e2)) {
          return;
        }
        e2.preventDefault();
        e2.stopPropagation();
      }
      function handleSingleFingerTouch(e2) {
        var touch = e2.touches[0];
        var offset = getOffsetXY(touch);
        lastSingleFingerOffset = offset;
        var point = transformToScreen(offset.x, offset.y);
        mouseX = point.x;
        mouseY = point.y;
        smoothScroll.cancel();
        startTouchListenerIfNeeded();
      }
      function startTouchListenerIfNeeded() {
        if (touchInProgress) {
          return;
        }
        touchInProgress = true;
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
        document.addEventListener("touchcancel", handleTouchEnd);
      }
      function handleTouchMove(e2) {
        if (e2.touches.length === 1) {
          e2.stopPropagation();
          var touch = e2.touches[0];
          var offset = getOffsetXY(touch);
          var point = transformToScreen(offset.x, offset.y);
          var dx = point.x - mouseX;
          var dy = point.y - mouseY;
          if (dx !== 0 && dy !== 0) {
            triggerPanStart();
          }
          mouseX = point.x;
          mouseY = point.y;
          internalMoveBy(dx, dy);
        } else if (e2.touches.length === 2) {
          multiTouch = true;
          var t1 = e2.touches[0];
          var t2 = e2.touches[1];
          var currentPinchLength = getPinchZoomLength(t1, t2);
          var scaleMultiplier = 1 + (currentPinchLength / pinchZoomLength - 1) * pinchSpeed;
          var firstTouchPoint = getOffsetXY(t1);
          var secondTouchPoint = getOffsetXY(t2);
          mouseX = (firstTouchPoint.x + secondTouchPoint.x) / 2;
          mouseY = (firstTouchPoint.y + secondTouchPoint.y) / 2;
          if (transformOrigin) {
            var offset = getTransformOriginOffset();
            mouseX = offset.x;
            mouseY = offset.y;
          }
          publicZoomTo(mouseX, mouseY, scaleMultiplier);
          pinchZoomLength = currentPinchLength;
          e2.stopPropagation();
          e2.preventDefault();
        }
      }
      function handleTouchEnd(e2) {
        if (e2.touches.length > 0) {
          var offset = getOffsetXY(e2.touches[0]);
          var point = transformToScreen(offset.x, offset.y);
          mouseX = point.x;
          mouseY = point.y;
        } else {
          var now = new Date();
          if (now - lastTouchEndTime < doubleTapSpeedInMS) {
            if (transformOrigin) {
              var offset = getTransformOriginOffset();
              smoothZoom(offset.x, offset.y, zoomDoubleClickSpeed);
            } else {
              smoothZoom(lastSingleFingerOffset.x, lastSingleFingerOffset.y, zoomDoubleClickSpeed);
            }
          }
          lastTouchEndTime = now;
          triggerPanEnd();
          releaseTouches();
        }
      }
      function getPinchZoomLength(finger1, finger2) {
        var dx = finger1.clientX - finger2.clientX;
        var dy = finger1.clientY - finger2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }
      function onDoubleClick(e2) {
        beforeDoubleClick(e2);
        var offset = getOffsetXY(e2);
        if (transformOrigin) {
          offset = getTransformOriginOffset();
        }
        smoothZoom(offset.x, offset.y, zoomDoubleClickSpeed);
      }
      function onMouseDown(e2) {
        if (beforeMouseDown(e2))
          return;
        if (touchInProgress) {
          e2.stopPropagation();
          return false;
        }
        var isLeftButton = e2.button === 1 && window.event !== null || e2.button === 0;
        if (!isLeftButton)
          return;
        smoothScroll.cancel();
        var offset = getOffsetXY(e2);
        var point = transformToScreen(offset.x, offset.y);
        mouseX = point.x;
        mouseY = point.y;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        textSelection.capture(e2.target || e2.srcElement);
        return false;
      }
      function onMouseMove(e2) {
        if (touchInProgress)
          return;
        triggerPanStart();
        var offset = getOffsetXY(e2);
        var point = transformToScreen(offset.x, offset.y);
        var dx = point.x - mouseX;
        var dy = point.y - mouseY;
        mouseX = point.x;
        mouseY = point.y;
        internalMoveBy(dx, dy);
      }
      function onMouseUp() {
        textSelection.release();
        triggerPanEnd();
        releaseDocumentMouse();
      }
      function releaseDocumentMouse() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        panstartFired = false;
      }
      function releaseTouches() {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener("touchcancel", handleTouchEnd);
        panstartFired = false;
        multiTouch = false;
        touchInProgress = false;
      }
      function onMouseWheel(e2) {
        if (beforeWheel(e2))
          return;
        smoothScroll.cancel();
        var delta = e2.deltaY;
        if (e2.deltaMode > 0)
          delta *= 100;
        var scaleMultiplier = getScaleMultiplier(delta);
        if (scaleMultiplier !== 1) {
          var offset = transformOrigin ? getTransformOriginOffset() : getOffsetXY(e2);
          publicZoomTo(offset.x, offset.y, scaleMultiplier);
          e2.preventDefault();
        }
      }
      function getOffsetXY(e2) {
        var offsetX, offsetY;
        var ownerRect = owner.getBoundingClientRect();
        offsetX = e2.clientX - ownerRect.left;
        offsetY = e2.clientY - ownerRect.top;
        return { x: offsetX, y: offsetY };
      }
      function smoothZoom(clientX, clientY, scaleMultiplier) {
        var fromValue = transform.scale;
        var from = { scale: fromValue };
        var to = { scale: scaleMultiplier * fromValue };
        smoothScroll.cancel();
        cancelZoomAnimation();
        zoomToAnimation = animate(from, to, {
          step: function(v) {
            zoomAbs(clientX, clientY, v.scale);
          },
          done: triggerZoomEnd
        });
      }
      function smoothZoomAbs(clientX, clientY, toScaleValue) {
        var fromValue = transform.scale;
        var from = { scale: fromValue };
        var to = { scale: toScaleValue };
        smoothScroll.cancel();
        cancelZoomAnimation();
        zoomToAnimation = animate(from, to, {
          step: function(v) {
            zoomAbs(clientX, clientY, v.scale);
          }
        });
      }
      function getTransformOriginOffset() {
        var ownerRect = owner.getBoundingClientRect();
        return {
          x: ownerRect.width * transformOrigin.x,
          y: ownerRect.height * transformOrigin.y
        };
      }
      function publicZoomTo(clientX, clientY, scaleMultiplier) {
        smoothScroll.cancel();
        cancelZoomAnimation();
        return zoomByRatio(clientX, clientY, scaleMultiplier);
      }
      function cancelZoomAnimation() {
        if (zoomToAnimation) {
          zoomToAnimation.cancel();
          zoomToAnimation = null;
        }
      }
      function getScaleMultiplier(delta) {
        var sign = Math.sign(delta);
        var deltaAdjustedSpeed = Math.min(0.25, Math.abs(speed * delta / 128));
        return 1 - sign * deltaAdjustedSpeed;
      }
      function triggerPanStart() {
        if (!panstartFired) {
          triggerEvent("panstart");
          panstartFired = true;
          smoothScroll.start();
        }
      }
      function triggerPanEnd() {
        if (panstartFired) {
          if (!multiTouch)
            smoothScroll.stop();
          triggerEvent("panend");
        }
      }
      function triggerZoomEnd() {
        triggerEvent("zoomend");
      }
      function triggerEvent(name) {
        api.fire(name, api);
      }
    }
    function parseTransformOrigin(options) {
      if (!options)
        return;
      if (typeof options === "object") {
        if (!isNumber(options.x) || !isNumber(options.y))
          failTransformOrigin(options);
        return options;
      }
      failTransformOrigin();
    }
    function failTransformOrigin(options) {
      console.error(options);
      throw new Error([
        "Cannot parse transform origin.",
        "Some good examples:",
        '  "center center" can be achieved with {x: 0.5, y: 0.5}',
        '  "top center" can be achieved with {x: 0.5, y: 0}',
        '  "bottom right" can be achieved with {x: 1, y: 1}'
      ].join("\n"));
    }
    function noop4() {
    }
    function validateBounds(bounds) {
      var boundsType = typeof bounds;
      if (boundsType === "undefined" || boundsType === "boolean")
        return;
      var validBounds = isNumber(bounds.left) && isNumber(bounds.top) && isNumber(bounds.bottom) && isNumber(bounds.right);
      if (!validBounds)
        throw new Error("Bounds object is not valid. It can be: undefined, boolean (true|false) or an object {left, top, right, bottom}");
    }
    function isNumber(x2) {
      return Number.isFinite(x2);
    }
    function isNaN2(value) {
      if (Number.isNaN) {
        return Number.isNaN(value);
      }
      return value !== value;
    }
    function rigidScroll() {
      return {
        start: noop4,
        stop: noop4,
        cancel: noop4
      };
    }
    function autoRun() {
      if (typeof document === "undefined")
        return;
      var scripts = document.getElementsByTagName("script");
      if (!scripts)
        return;
      var panzoomScript;
      for (var i2 = 0; i2 < scripts.length; ++i2) {
        var x2 = scripts[i2];
        if (x2.src && x2.src.match(/\bpanzoom(\.min)?\.js/)) {
          panzoomScript = x2;
          break;
        }
      }
      if (!panzoomScript)
        return;
      var query = panzoomScript.getAttribute("query");
      if (!query)
        return;
      var globalName = panzoomScript.getAttribute("name") || "pz";
      var started = Date.now();
      tryAttach();
      function tryAttach() {
        var el = document.querySelector(query);
        if (!el) {
          var now = Date.now();
          var elapsed = now - started;
          if (elapsed < 2e3) {
            setTimeout(tryAttach, 100);
            return;
          }
          console.error("Cannot find the panzoom element", globalName);
          return;
        }
        var options = collectOptions(panzoomScript);
        console.log(options);
        window[globalName] = createPanZoom(el, options);
      }
      function collectOptions(script) {
        var attrs = script.attributes;
        var options = {};
        for (var j = 0; j < attrs.length; ++j) {
          var attr = attrs[j];
          var nameValue = getPanzoomAttributeNameValue(attr);
          if (nameValue) {
            options[nameValue.name] = nameValue.value;
          }
        }
        return options;
      }
      function getPanzoomAttributeNameValue(attr) {
        if (!attr.name)
          return;
        var isPanZoomAttribute = attr.name[0] === "p" && attr.name[1] === "z" && attr.name[2] === "-";
        if (!isPanZoomAttribute)
          return;
        var name = attr.name.substr(3);
        var value = JSON.parse(attr.value);
        return { name, value };
      }
    }
    autoRun();
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var import_panzoom, css$12, Navbar, News, css4, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    init_stores_56a134e1();
    init_TextBlock_b8b64333();
    import_panzoom = __toModule(require_panzoom());
    css$12 = {
      code: ".navbar.svelte-39ftwm.svelte-39ftwm{-webkit-backdrop-filter:blur(60px);backdrop-filter:blur(60px);background-clip:padding-box;background-color:var(--fds-layer-background-default);border-bottom:1px solid var(--fds-surface-stroke-flyout);box-sizing:border-box;inset-block-start:0;inset-inline-start:0;justify-content:center;min-block-size:56px;position:fixed;z-index:1000}.navbar.svelte-39ftwm.svelte-39ftwm,.navbar-inner.svelte-39ftwm.svelte-39ftwm{align-items:center;display:flex;inline-size:100%}.navbar-inner.svelte-39ftwm.svelte-39ftwm{margin:0 auto;max-inline-size:1440px;padding-inline:18px 12px}.navbar.svelte-39ftwm a.svelte-39ftwm:focus-visible{box-shadow:var(--fds-focus-stroke);outline:none}.navbar.svelte-39ftwm nav.svelte-39ftwm{flex:1 1 auto;gap:12px;justify-content:flex-end;padding:0 16px}.navbar.svelte-39ftwm nav.svelte-39ftwm,.navbar.svelte-39ftwm nav a.svelte-39ftwm{align-items:center;display:flex}.navbar.svelte-39ftwm nav a.svelte-39ftwm{border-radius:var(--fds-control-corner-radius);color:var(--fds-text-primary);justify-content:center;padding:5px 11px;position:relative;text-decoration:none;transition:var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.navbar.svelte-39ftwm nav a.selected.svelte-39ftwm,.navbar.svelte-39ftwm nav a.svelte-39ftwm:hover{background-color:var(--fds-subtle-fill-secondary)}.navbar.svelte-39ftwm nav a.svelte-39ftwm:active{background-color:var(--fds-subtle-fill-tertiary)}.navbar.svelte-39ftwm nav a.selected.svelte-39ftwm{color:var(--fds-accent-text-primary)}.navbar.svelte-39ftwm nav a.svelte-39ftwm>svg{fill:currentColor;block-size:auto;inline-size:calc(var(--fds-body-font-size) + 2px);margin-right:8px}.buttons.svelte-39ftwm.svelte-39ftwm,.logo.svelte-39ftwm.svelte-39ftwm{flex:0 0 auto}.logo.svelte-39ftwm.svelte-39ftwm{align-items:center;color:var(--fds-text-primary);display:flex;font-family:var(--fds-font-family-display);font-size:20px;font-weight:600;justify-content:center;position:relative;text-decoration:none;transition:var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.logo.svelte-39ftwm.svelte-39ftwm:hover{color:var(--fds-text-secondary)}.logo.svelte-39ftwm>img.svelte-39ftwm{-webkit-margin-end:14px;height:32px;margin-inline-end:14px;width:auto}.logo.svelte-39ftwm .text-block{-webkit-margin-start:6px;color:var(--fds-text-secondary);margin-inline-start:6px;position:relative;top:1px}.buttons.svelte-39ftwm.svelte-39ftwm{align-items:center;display:flex;gap:8px}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { items } = $$props;
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      $$result.css.add(css$12);
      $$unsubscribe_page();
      return `<header class="${"navbar svelte-39ftwm"}"><div class="${"navbar-inner svelte-39ftwm"}"><a class="${"logo svelte-39ftwm"}" href="${"/"}"><img src="${"/logo.svg"}" width="${"32"}" height="${"32"}" alt="${"Fluent logo"}" class="${"svelte-39ftwm"}">
			Former Fluent Svelte - ProjectWiki ${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "caption" }, {}, {
        default: () => {
          return `ALPHA`;
        }
      })}</a>
		<nav class="${"svelte-39ftwm"}">${each(items, ({ href, name, icon }) => {
        return `<a${add_attribute("href", href, 0)} sveltekit:prefetch class="${[
          "svelte-39ftwm",
          $page.url.pathname === href || $page.url.pathname.split("/").length > 1 && href.split("/").length > 1 && $page.url.pathname.startsWith(href) && !(href === "" || href === "/") || href === "/" && $page.url.pathname === "" ? "selected" : ""
        ].join(" ").trim()}">${icon ? `<!-- HTML_TAG_START -->${icon}<!-- HTML_TAG_END -->` : ``}
					${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(name)}`;
          }
        })}
				</a>`;
      })}</nav>
		<div class="${"buttons svelte-39ftwm"}">${slots.buttons ? slots.buttons({}) : ``}</div></div>
</header>`;
    });
    News = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 20H5.25a3.25 3.25 0 01-3.24-3.07L2 16.75V6.25c0-1.2.93-2.17 2.1-2.24L4.25 4h12.5c1.2 0 2.17.93 2.24 2.1l.01.15V7h.75c1.2 0 2.17.93 2.24 2.1l.01.15v7.5a3.25 3.25 0 01-3.07 3.24l-.18.01H5.25h13.5zm-13.5-1.5h13.5c.92 0 1.67-.7 1.74-1.6l.01-.15v-7.5c0-.38-.28-.7-.65-.74l-.1-.01H19v7.75c0 .38-.28.7-.65.74l-.1.01a.75.75 0 01-.74-.65l-.01-.1v-10c0-.38-.28-.7-.65-.74l-.1-.01H4.25c-.38 0-.7.28-.74.65l-.01.1v10.5c0 .92.7 1.67 1.6 1.74l.15.01h13.5-13.5zm7-4h3a.75.75 0 01.1 1.5h-3.1a.75.75 0 01-.1-1.5h3.1-3zm-3-3.5c.4 0 .74.34.74.75v3.5c0 .41-.33.75-.75.75h-3.5a.75.75 0 01-.74-.75v-3.5c0-.41.33-.75.75-.75h3.5zm-.76 1.5h-2v2h2v-2zm3.76-1.5h3a.75.75 0 01.1 1.5h-3.1a.75.75 0 01-.1-1.49h3.1-3zm-6.5-3.5h9.5a.75.75 0 01.1 1.5h-9.6a.75.75 0 01-.1-1.5h9.6-9.5z"/></svg>';
    css4 = {
      code: '*,:after,:before{-webkit-user-drag:none;box-sizing:border-box}:root{--fds-font-family-monospace:"Cascadia Code","Fira Code","Consolas",monospace}@media(prefers-color-scheme:dark){:root{color-scheme:dark}}html{font-size:62.5%}body{background-color:var(--fds-solid-background-base);color:var(--fds-text-primary);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;height:100vh;line-height:20px;margin:0;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:revert;-moz-user-select:revert;-ms-user-select:revert;user-select:revert}@media(prefers-color-scheme:light){code{color:#393a34}code .cdata,code .comment,code .doctype,code .prolog{color:green;font-style:italic}code .namespace{opacity:.7}code .string{color:#a31515}code .operator,code .punctuation{color:#393a34}code .boolean,code .constant,code .inserted,code .number,code .symbol,code .url,code .variable{color:#36acaa}code .atrule,code .attr-value,code .keyword,code .language-autohotkey .selector,code .language-json .boolean,code .language-json .number,code[class*=language-css]{color:#00f}code .function{color:#393a34}code .deleted,code .language-autohotkey .tag{color:#9a050f}code .language-autohotkey .keyword,code .selector{color:#00009f}code .important{color:#e90}code .bold,code .important{font-weight:700}code .italic{font-style:italic}code .class-name,code .language-json .property{color:#2b91af}code .selector,code .tag{color:maroon}code .attr-name,code .entity,code .property,code .regex{color:red}code .directive.tag .tag{background:#ff0;color:#393a34}code .line-numbers .line-numbers-rows{border-inline-end-color:#a5a5a5}code .line-numbers-rows>span:before{color:#2b91af}}@media(prefers-color-scheme:dark){code{color:#d4d4d4}code[class*=language-javascript],code[class*=language-jsx],code[class*=language-tsx],code[class*=language-typescript]{color:#9cdcfe}code[class*=language-css]{color:#ce9178}code[class*=language-html]{color:#d4d4d4}code .language-regex .anchor{color:#dcdcaa}code .language-html .punctuation{color:grey}code .namespace{opacity:.7}code .doctype .doctype-tag{color:#569cd6}code .doctype .name{color:#9cdcfe}code .comment,code .prolog{color:#6a9955}code .language-html .language-css .punctuation,code .language-html .language-javascript .punctuation,code .punctuation{color:#d4d4d4}code .boolean,code .constant,code .inserted,code .number,code .property,code .symbol,code .tag,code .unit{color:#b5cea8}code .attr-name,code .builtin,code .char,code .deleted,code .selector,code .string{color:#ce9178}code .language-css .string.url{text-decoration:underline}code .entity,code .operator{color:#d4d4d4}code .operator.arrow{color:#569cd6}code .atrule{color:#ce9178}code .atrule .rule{color:#c586c0}code .atrule .url{color:#9cdcfe}code .atrule .url .function{color:#dcdcaa}code .atrule .url .punctuation{color:#d4d4d4}code .keyword{color:#569cd6}code .keyword.control-flow,code .keyword.module{color:#c586c0}code .function,code .function .maybe-class-name{color:#dcdcaa}code .regex{color:#d16969}code .important{color:#569cd6}code .italic{font-style:italic}code .constant{color:#9cdcfe}code .class-name,code .maybe-class-name{color:#4ec9b0}code .console{color:#9cdcfe}code .parameter{color:#9cdcfe}code .interpolation{color:#9cdcfe}code .punctuation.interpolation-punctuation{color:#569cd6}code .boolean{color:#569cd6}code .exports .maybe-class-name,code .imports .maybe-class-name,code .property,code .variable{color:#9cdcfe}code .selector{color:#d7ba7d}code .escape{color:#d7ba7d}code .tag{color:#569cd6}code .tag .punctuation{color:grey}code .cdata{color:grey}code .attr-name{color:#9cdcfe}code .attr-value,code .attr-value .punctuation{color:#ce9178}code .attr-value .punctuation.attr-equals{color:#d4d4d4}code .entity{color:#569cd6}code .namespace{color:#4ec9b0}}',
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let items = [{ name: "Docs", href: "/docs", icon: News }];
      $$result.css.add(css4);
      return `${validate_component(Navbar, "Navbar").$$render($$result, { items }, {}, {
        buttons: () => {
          return `${validate_component(TooltipWrapper, "Tooltip").$$render($$result, {
            slot: "buttons",
            placement: "left",
            offset: 8,
            text: "View GitHub"
          }, {}, {
            default: () => {
              return `${validate_component(IconButton, "IconButton").$$render($$result, {}, {}, {
                default: () => {
                  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 16 16"}" width="${"16"}" height="${"16"}"><path fill-rule="${"evenodd"}" d="${"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"}"></path></svg>`;
                }
              })}`;
            }
          })}`;
        }
      })}
<main>${slots.default ? slots.default({}) : ``}
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css5,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css5;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-8102d46b.js";
    js = ["pages/__layout.svelte-8102d46b.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/stores-c96b2e8c.js", "chunks/TextBlock-d5339f0f.js"];
    css5 = ["assets/pages/__layout.svelte-1930ab7d.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/theme-22ec604e.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/error.svelte.js"() {
    init_index_f16625c7();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css6,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css6;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-b5879b7e.js";
    js2 = ["error.svelte-b5879b7e.js", "chunks/vendor-9c551f02.js"];
    css6 = [];
  }
});

// .svelte-kit/output/server/chunks/Button-4c34ff2d.js
var css7, Button;
var init_Button_4c34ff2d = __esm({
  ".svelte-kit/output/server/chunks/Button-4c34ff2d.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css7 = {
      code: ".button.svelte-1ulhukx{align-items:center;border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;cursor:default;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;justify-content:center;line-height:20px;outline:none;padding-block:4px 6px;padding-inline:11px;position:relative;text-decoration:none;transition:var(--fds-control-faster-duration) ease background;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button.svelte-1ulhukx:focus-visible{box-shadow:var(--fds-focus-stroke)}.button.style-standard.svelte-1ulhukx{background-clip:padding-box;background-color:var(--fds-control-fill-default);border:1px solid;border-color:var(--fds-control-border-default);color:var(--fds-text-primary)}.button.style-standard.svelte-1ulhukx:hover{background-color:var(--fds-control-fill-secondary)}.button.style-standard.svelte-1ulhukx:active{background-color:var(--fds-control-fill-tertiary);border-color:var(--fds-control-stroke-default);color:var(--fds-text-secondary)}.button.style-standard.disabled.svelte-1ulhukx{background-color:var(--fds-control-fill-disabled);border-color:var(--fds-control-stroke-default);color:var(--fds-text-disabled)}.button.style-accent.svelte-1ulhukx{background-color:var(--fds-accent-default);border:1px solid var(--fds-control-stroke-on-accent-default);border-bottom-color:var(--fds-control-stroke-on-accent-secondary);color:var(--fds-text-on-accent-primary);transition:var(--fds-control-faster-duration) ease border-color}.button.style-accent.svelte-1ulhukx:hover{background-color:var(--fds-accent-secondary)}.button.style-accent.svelte-1ulhukx:active{background-color:var(--fds-accent-tertiary);border-color:transparent;color:var(--fds-text-on-accent-secondary)}.button.style-accent.disabled.svelte-1ulhukx{background-color:var(--fds-accent-disabled);border-color:transparent;color:var(--fds-text-on-accent-disabled)}.button.style-hyperlink.svelte-1ulhukx{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-accent-text-primary);cursor:pointer}.button.style-hyperlink.svelte-1ulhukx:hover{background-color:var(--fds-subtle-fill-secondary)}.button.style-hyperlink.svelte-1ulhukx:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-accent-text-tertiary)}.button.style-hyperlink.disabled.svelte-1ulhukx{color:var(--fds-accent-text-disabled)}.button.disabled.svelte-1ulhukx{pointer-events:none}",
      map: null
    };
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["variant", "href", "disabled", "class", "element"]);
      let { variant = "standard" } = $$props;
      let { href = "" } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css7);
      return `
${href && !disabled ? `<a${spread([
        { role: "button" },
        {
          class: "button style-" + escape(variant) + " " + escape(className)
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1ulhukx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<button${spread([
        {
          class: "button style-" + escape(variant) + " " + escape(className)
        },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " svelte-1ulhukx"
      })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</button>`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/TextBoxButton-fef51e87.js
var css$13, TextBox, css8, TextBoxButton;
var init_TextBoxButton_fef51e87 = __esm({
  ".svelte-kit/output/server/chunks/TextBoxButton-fef51e87.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css$13 = {
      code: '.text-box.svelte-8l6kgi.svelte-8l6kgi{background-color:transparent;border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:unset;flex:1 1 auto;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:100%;line-height:20px;margin:0;min-block-size:30px;outline:none;padding-inline:10px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.text-box.svelte-8l6kgi.svelte-8l6kgi::-moz-placeholder{color:var(--fds-text-secondary);-moz-user-select:none;user-select:none}.text-box.svelte-8l6kgi.svelte-8l6kgi:-ms-input-placeholder{color:var(--fds-text-secondary);-ms-user-select:none;user-select:none}.text-box.svelte-8l6kgi.svelte-8l6kgi::placeholder{color:var(--fds-text-secondary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.text-box.svelte-8l6kgi.svelte-8l6kgi::-webkit-search-cancel-button,.text-box.svelte-8l6kgi.svelte-8l6kgi::-webkit-search-decoration,.text-box.svelte-8l6kgi.svelte-8l6kgi::-webkit-search-results-button,.text-box.svelte-8l6kgi.svelte-8l6kgi::-webkit-search-results-decoration{-webkit-appearance:none}.text-box.svelte-8l6kgi.svelte-8l6kgi::-ms-reveal{display:none}.text-box.svelte-8l6kgi.svelte-8l6kgi:disabled{color:var(--fds-text-disabled)}.text-box.svelte-8l6kgi.svelte-8l6kgi:disabled::-moz-placeholder{color:var(--fds-text-disabled)}.text-box.svelte-8l6kgi.svelte-8l6kgi:disabled:-ms-input-placeholder{color:var(--fds-text-disabled)}.text-box.svelte-8l6kgi.svelte-8l6kgi:disabled::placeholder{color:var(--fds-text-disabled)}.text-box-container.svelte-8l6kgi.svelte-8l6kgi{align-items:center;background-clip:padding-box;background-color:var(--fds-control-fill-default);border:1px solid var(--fds-control-stroke-default);border-radius:var(--fds-control-corner-radius);cursor:text;display:flex;inline-size:100%;position:relative}.text-box-container.svelte-8l6kgi.svelte-8l6kgi:hover{background-color:var(--fds-control-fill-secondary)}.text-box-container.disabled.svelte-8l6kgi.svelte-8l6kgi{background-color:var(--fds-control-fill-disabled);cursor:default}.text-box-container.disabled.svelte-8l6kgi .text-box-underline.svelte-8l6kgi{display:none}.text-box-container.svelte-8l6kgi.svelte-8l6kgi:focus-within{background-color:var(--fds-control-fill-input-active)}.text-box-container.svelte-8l6kgi:focus-within .text-box.svelte-8l6kgi::-moz-placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8l6kgi:focus-within .text-box.svelte-8l6kgi:-ms-input-placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8l6kgi:focus-within .text-box.svelte-8l6kgi::placeholder{color:var(--fds-text-tertiary)}.text-box-container.svelte-8l6kgi:focus-within .text-box-underline.svelte-8l6kgi:after{border-bottom:2px solid var(--fds-accent-default)}.text-box-container.svelte-8l6kgi:focus-within .text-box-clear-button{display:flex}.text-box-underline.svelte-8l6kgi.svelte-8l6kgi{block-size:calc(100% + 2px);border-radius:var(--fds-control-corner-radius);inline-size:calc(100% + 2px);inset-block-start:-1px;inset-inline-start:-1px;overflow:hidden;pointer-events:none;position:absolute}.text-box-underline.svelte-8l6kgi.svelte-8l6kgi:after{block-size:100%;border-bottom:1px solid var(--fds-control-strong-stroke-default);box-sizing:border-box;content:"";inline-size:100%;inset-block-end:0;inset-inline-start:0;position:absolute}.text-box-buttons.svelte-8l6kgi.svelte-8l6kgi{align-items:center;cursor:default;display:flex;flex:0 0 auto}.text-box-buttons.svelte-8l6kgi>.text-box-button{-webkit-margin-start:6px;margin-inline-start:6px}.text-box-buttons.svelte-8l6kgi>.text-box-button:first-of-type{-webkit-margin-start:0;margin-inline-start:0}.text-box-buttons.svelte-8l6kgi>.text-box-button:last-of-type{-webkit-margin-end:4px;margin-inline-end:4px}.text-box-buttons.svelte-8l6kgi .text-box-clear-button{display:none}',
      map: null
    };
    TextBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "value",
        "type",
        "placeholder",
        "clearButton",
        "searchButton",
        "revealButton",
        "readonly",
        "disabled",
        "class",
        "inputElement",
        "containerElement",
        "buttonsContainerElement",
        "clearButtonElement",
        "searchButtonElement",
        "revealButtonElement"
      ]);
      let { value = "" } = $$props;
      let { type = "text" } = $$props;
      let { placeholder = void 0 } = $$props;
      let { clearButton = true } = $$props;
      let { searchButton = true } = $$props;
      let { revealButton = true } = $$props;
      let { readonly = false } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { buttonsContainerElement = null } = $$props;
      let { clearButtonElement = null } = $$props;
      let { searchButtonElement = null } = $$props;
      let { revealButtonElement = null } = $$props;
      createEventDispatcher();
      createEventForwarder(get_current_component(), ["clear", "search", "reveal", "outermousedown"]);
      const inputProps = __spreadValues({
        class: "text-box",
        disabled: disabled || void 0,
        readonly: readonly || void 0,
        placeholder: placeholder || void 0
      }, $$restProps);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.clearButton === void 0 && $$bindings.clearButton && clearButton !== void 0)
        $$bindings.clearButton(clearButton);
      if ($$props.searchButton === void 0 && $$bindings.searchButton && searchButton !== void 0)
        $$bindings.searchButton(searchButton);
      if ($$props.revealButton === void 0 && $$bindings.revealButton && revealButton !== void 0)
        $$bindings.revealButton(revealButton);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.buttonsContainerElement === void 0 && $$bindings.buttonsContainerElement && buttonsContainerElement !== void 0)
        $$bindings.buttonsContainerElement(buttonsContainerElement);
      if ($$props.clearButtonElement === void 0 && $$bindings.clearButtonElement && clearButtonElement !== void 0)
        $$bindings.clearButtonElement(clearButtonElement);
      if ($$props.searchButtonElement === void 0 && $$bindings.searchButtonElement && searchButtonElement !== void 0)
        $$bindings.searchButtonElement(searchButtonElement);
      if ($$props.revealButtonElement === void 0 && $$bindings.revealButtonElement && revealButtonElement !== void 0)
        $$bindings.revealButtonElement(revealButtonElement);
      $$result.css.add(css$13);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="${[
          "text-box-container " + escape(className) + " svelte-8l6kgi",
          disabled ? "disabled" : ""
        ].join(" ").trim()}"${add_attribute("this", containerElement, 0)}>
	
	${type === "text" ? `<input${spread([{ type: "text" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "number" ? `<input${spread([{ type: "number" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "search" ? `<input${spread([{ type: "search" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "password" ? `<input${spread([{ type: "password" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "email" ? `<input${spread([{ type: "email" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "tel" ? `<input${spread([{ type: "tel" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "url" ? `<input${spread([{ type: "url" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "date" ? `<input${spread([{ type: "date" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "datetime-local" ? `<input${spread([{ type: "datetime-local" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "month" ? `<input${spread([{ type: "month" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "time" ? `<input${spread([{ type: "time" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : `${type === "week" ? `<input${spread([{ type: "week" }, escape_object(inputProps)], { classes: "svelte-8l6kgi" })}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>` : ``}`}`}`}`}`}`}`}`}`}`}`}
	<div class="${"text-box-underline svelte-8l6kgi"}"></div>
	<div class="${"text-box-buttons svelte-8l6kgi"}"${add_attribute("this", buttonsContainerElement, 0)}>${clearButton && value && !readonly ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          class: "text-box-clear-button",
          "aria-label": "Clear value",
          element: clearButtonElement
        }, {
          element: ($$value) => {
            clearButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path fill="${"currentColor"}" d="${"M2.08859 2.21569L2.14645 2.14645C2.32001 1.97288 2.58944 1.9536 2.78431 2.08859L2.85355 2.14645L6 5.293L9.14645 2.14645C9.34171 1.95118 9.65829 1.95118 9.85355 2.14645C10.0488 2.34171 10.0488 2.65829 9.85355 2.85355L6.707 6L9.85355 9.14645C10.0271 9.32001 10.0464 9.58944 9.91141 9.78431L9.85355 9.85355C9.67999 10.0271 9.41056 10.0464 9.21569 9.91141L9.14645 9.85355L6 6.707L2.85355 9.85355C2.65829 10.0488 2.34171 10.0488 2.14645 9.85355C1.95118 9.65829 1.95118 9.34171 2.14645 9.14645L5.293 6L2.14645 2.85355C1.97288 2.67999 1.9536 2.41056 2.08859 2.21569L2.14645 2.14645L2.08859 2.21569Z"}"></path></svg>`;
          }
        })}` : ``}
		${type === "search" && searchButton ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          "aria-label": "Search",
          element: searchButtonElement
        }, {
          element: ($$value) => {
            searchButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path d="${"M5.00038 1C2.79103 1 1 2.7909 1 5.00008C1 7.20927 2.79103 9.00017 5.00038 9.00017C5.92463 9.00017 6.77568 8.68675 7.45302 8.1604L10.1464 10.8536C10.3416 11.0488 10.6583 11.0488 10.8535 10.8536C11.0488 10.6583 11.0488 10.3417 10.8535 10.1464L8.16028 7.45337C8.68705 6.77595 9.00075 5.92465 9.00075 5.00008C9.00075 2.7909 7.20972 1 5.00038 1ZM2.00009 5.00008C2.00009 3.34319 3.34337 2.00002 5.00038 2.00002C6.65739 2.00002 8.00066 3.34319 8.00066 5.00008C8.00066 6.65697 6.65739 8.00015 5.00038 8.00015C3.34337 8.00015 2.00009 6.65697 2.00009 5.00008Z"}" fill="${"currentColor"}"></path></svg>`;
          }
        })}` : ``}
		${type === "password" && value && revealButton ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
          "aria-label": "Reveal password",
          element: revealButtonElement
        }, {
          element: ($$value) => {
            revealButtonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"10"}" height="${"10"}" viewBox="${"0 171 1024 683"}"><path d="${"M0,554.5C0,550.833 0.5,547.167 1.5,543.5C11.5,505.833 25.75,470.417 44.25,437.25C62.75,404.083 84.5833,373.667 109.75,346C134.917,318.333 162.75,293.667 193.25,272C223.75,250.333 256.25,231.917 290.75,216.75C325.25,201.583 361.167,190.083 398.5,182.25C435.833,174.417 473.667,170.5 512,170.5C550,170.5 587.583,174.417 624.75,182.25C661.917,190.083 697.75,201.5 732.25,216.5C766.75,231.5 799.417,249.917 830.25,271.75C861.083,293.583 889.083,318.25 914.25,345.75C939.417,373.25 961.25,403.5 979.75,436.5C998.25,469.5 1012.5,504.833 1022.5,542.5C1023.5,546.167 1024,550 1024,554C1024,566 1019.92,576.083 1011.75,584.25C1003.58,592.417 993.5,596.5 981.5,596.5C971.5,596.5 962.917,593.667 955.75,588C948.583,582.333 943.333,574.833 940,565.5C937,556.167 934.083,547.5 931.25,539.5C928.417,531.5 925.5,523.583 922.5,515.75C919.5,507.917 916.167,500.167 912.5,492.5C908.833,484.833 904.333,476.667 899,468C879.333,435 855.583,405.417 827.75,379.25C799.917,353.083 769.333,330.917 736,312.75C702.667,294.583 667.417,280.583 630.25,270.75C593.083,260.917 555.5,256 517.5,256L506.5,256C468.5,256 430.917,260.917 393.75,270.75C356.583,280.583 321.333,294.667 288,313C254.667,331.333 224,353.583 196,379.75C168,405.917 144.333,435.5 125,468.5C119.667,477.167 115.167,485.417 111.5,493.25C107.833,501.083 104.5,508.833 101.5,516.5C98.5,524.167 95.5833,532 92.75,540C89.9167,548 87,556.667 84,566C80.6667,575.333 75.5,582.917 68.5,588.75C61.5,594.583 52.8333,597.5 42.5,597.5C36.8333,597.5 31.4167,596.333 26.25,594C21.0833,591.667 16.5833,588.583 12.75,584.75C8.91667,580.917 5.83333,576.417 3.5,571.25C1.16667,566.083 0,560.5 0,554.5ZM256,597.5L256,592.5C256,557.833 262.917,525.25 276.75,494.75C290.583,464.25 309.25,437.667 332.75,415C356.25,392.333 383.417,374.417 414.25,361.25C445.083,348.083 477.667,341.5 512,341.5C547.333,341.5 580.583,348.167 611.75,361.5C642.917,374.833 670.083,393.083 693.25,416.25C716.417,439.417 734.667,466.583 748,497.75C761.333,528.917 768,562.167 768,597.5C768,632.833 761.333,666.083 748,697.25C734.667,728.417 716.417,755.583 693.25,778.75C670.083,801.917 642.917,820.167 611.75,833.5C580.583,846.833 547.333,853.5 512,853.5C476.667,853.5 443.417,846.833 412.25,833.5C381.083,820.167 353.917,801.917 330.75,778.75C307.583,755.583 289.333,728.417 276,697.25C262.667,666.083 256,632.833 256,597.5ZM682.5,597.5L682.5,594C682.5,571 677.917,549.333 668.75,529C659.583,508.667 647.167,490.917 631.5,475.75C615.833,460.583 597.667,448.583 577,439.75C556.333,430.917 534.667,426.5 512,426.5C488.333,426.5 466.167,431 445.5,440C424.833,449 406.833,461.25 391.5,476.75C376.167,492.25 364,510.417 355,531.25C346,552.083 341.5,574.167 341.5,597.5C341.5,621.167 346,643.333 355,664C364,684.667 376.167,702.667 391.5,718C406.833,733.333 424.833,745.5 445.5,754.5C466.167,763.5 488.333,768 512,768C535.333,768 557.417,763.5 578.25,754.5C599.083,745.5 617.167,733.333 632.5,718C647.833,702.667 660,684.667 669,664C678,643.333 682.5,621.167 682.5,597.5Z"}" fill="${"currentColor"}"></path></svg>`;
          }
        })}` : ``}
		${slots.buttons ? slots.buttons({}) : ``}</div>
	${slots.default ? slots.default({}) : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css8 = {
      code: ".text-box-button.svelte-159a5xt{align-items:center;background-color:var(--fds-subtle-fill-transparent);border:none;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-secondary);display:flex;justify-content:center;min-block-size:22px;min-inline-size:26px;outline:none;padding:3px 5px}.text-box-button.svelte-159a5xt:focus-visible{box-shadow:var(--fds-focus-stroke)}.text-box-button.svelte-159a5xt:hover{background-color:var(--fds-subtle-fill-secondary)}.text-box-button.svelte-159a5xt:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-tertiary)}.text-box-button.svelte-159a5xt:disabled{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-disabled)}.text-box-button.svelte-159a5xt svg{fill:currentColor;min-block-size:12px;min-inline-size:12px;pointer-events:none}",
      map: null
    };
    TextBoxButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["type", "class", "element"]);
      let { type = "button" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css8);
      return `<button${spread([
        {
          class: "text-box-button " + escape(className)
        },
        { type: escape_attribute_value(type) },
        escape_object($$restProps)
      ], { classes: "svelte-159a5xt" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</button>`;
    });
  }
});

// .svelte-kit/output/server/chunks/CopyBox-1ee6d65d.js
var Clipboard, css9, CopyBox;
var init_CopyBox_1ee6d65d = __esm({
  ".svelte-kit/output/server/chunks/CopyBox-1ee6d65d.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBoxButton_fef51e87();
    Clipboard = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.09 2c.2-.58.76-1 1.41-1h3c.65 0 1.2.42 1.41 1h.59c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 013 13.5v-10C3 2.67 3.67 2 4.5 2h.59zM6.5 2a.5.5 0 000 1h3a.5.5 0 000-1h-3zM5.09 3H4.5a.5.5 0 00-.5.5v10c0 .28.22.5.5.5h7a.5.5 0 00.5-.5v-10a.5.5 0 00-.5-.5h-.59c-.2.58-.76 1-1.41 1h-3a1.5 1.5 0 01-1.41-1z"/></svg>';
    css9 = {
      code: ".copy-box input{padding:8px 12px}",
      map: null
    };
    CopyBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["value"]);
      let { value = "" } = $$props;
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      $$result.css.add(css9);
      return `${validate_component(TextBox, "TextBox").$$render($$result, Object.assign({ class: "copy-box" }, { readonly: true }, { value }, $$restProps), {}, {
        buttons: () => {
          return `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {}, {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Clipboard}<!-- HTML_TAG_END -->`;
            }
          })}
		${slots.buttons ? slots.buttons({}) : ``}`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Metadata-11ce4912.js
var Metadata;
var init_Metadata_11ce4912 = __esm({
  ".svelte-kit/output/server/chunks/Metadata-11ce4912.js"() {
    init_index_f16625c7();
    Metadata = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title = "" } = $$props;
      let { description = "" } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.description === void 0 && $$bindings.description && description !== void 0)
        $$bindings.description(description);
      return `${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta${add_attribute("content", title, 0)} name="${"og:title"}" data-svelte="svelte-1eqyb4r"><meta${add_attribute("content", title, 0)} name="${"twitter:title"}" data-svelte="svelte-1eqyb4r"><meta${add_attribute("content", description, 0)} name="${"description"}" data-svelte="svelte-1eqyb4r"><meta${add_attribute("content", description, 0)} name="${"og:description"}" data-svelte="svelte-1eqyb4r"><meta${add_attribute("content", description, 0)} name="${"twitter:description"}" data-svelte="svelte-1eqyb4r">`, ""}`;
    });
  }
});

// .svelte-kit/output/server/chunks/PageSection-96ebbfe7.js
var css10, PageSection;
var init_PageSection_96ebbfe7 = __esm({
  ".svelte-kit/output/server/chunks/PageSection-96ebbfe7.js"() {
    init_index_f16625c7();
    css10 = {
      code: ".page-section-inner.svelte-plce45{margin:0 auto;max-width:1440px;padding:72px;width:100%}.page-section.svelte-plce45 h1,.page-section.svelte-plce45 h2,.page-section.svelte-plce45 h3{color:var(--fds-text-primary);font-family:var(--fds-font-family-display);font-weight:600;line-height:normal;margin:0}.page-section.svelte-plce45 h1{font-size:7.2rem}.page-section.svelte-plce45 h2{font-size:4.8rem}.page-section.svelte-plce45 h3{font-size:3.2rem}.page-section.svelte-plce45 p:not([class]){color:var(--fds-text-secondary);font-size:1.6rem;font-weight:400;line-height:1.65;margin-block:12px 24px;max-width:65ch}@media(prefers-color-scheme:dark){.page-section.svelte-plce45 p:not([class]){color:var(--fds-text-tertiary)}}.page-section.svelte-plce45 hr:not([class]){-webkit-border-before:1px solid var(--fds-divider-default);border:none;border-block-start:1px solid var(--fds-divider-default);margin:0 0 24px}.page-section.svelte-plce45 .buttons-spacer{display:inline-flex;flex-wrap:wrap;gap:8px}",
      map: null
    };
    PageSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      $$result.css.add(css10);
      return `<section${spread([{ class: "page-section" }, escape_object($$restProps)], { classes: "svelte-plce45" })}><div class="${"page-section-inner svelte-plce45"}">${slots.default ? slots.default({}) : ``}</div>
	${slots.outer ? slots.outer({}) : ``}
</section>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
var import_panzoom2, css$14, HeroCard, Box, Book, Open, css11, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBlock_b8b64333();
    init_IconButton_302c6ea8();
    init_CopyBox_1ee6d65d();
    init_Metadata_11ce4912();
    init_PageSection_96ebbfe7();
    import_panzoom2 = __toModule(require_panzoom());
    init_TextBoxButton_fef51e87();
    css$14 = {
      code: ".hero-card.svelte-1yofkn9.svelte-1yofkn9{-webkit-backdrop-filter:blur(60px) saturate(125%);backdrop-filter:blur(60px) saturate(125%);background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-card-shadow);box-sizing:border-box;display:flex;flex-direction:column;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;padding:12px;transition:var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.hero-card.svelte-1yofkn9.svelte-1yofkn9:hover{box-shadow:var(--fds-flyout-shadow);transform:translateY(-4px)}.hero-card.svelte-1yofkn9 header.svelte-1yofkn9{display:flex;justify-content:space-between;margin-bottom:12px}",
      map: null
    };
    HeroCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { class: className = "" } = $$props;
      let element;
      const getElement = () => element;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
        $$bindings.getElement(getElement);
      $$result.css.add(css$14);
      return `<div class="${"hero-card " + escape(className) + " svelte-1yofkn9"}"${add_attribute("this", element, 0)}><header class="${"svelte-1yofkn9"}">${slots.header ? slots.header({}) : ``}</header>
	${slots.default ? slots.default({}) : ``}
</div>`;
    });
    Box = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.92 1.38a3 3 0 012.16 0l4.96 1.9c.58.23.96.79.96 1.4v6.63a1.5 1.5 0 01-.96 1.4l-4.96 1.91a3 3 0 01-2.16 0l-4.96-1.9a1.5 1.5 0 01-.96-1.4V4.68c0-.62.38-1.18.96-1.4l4.96-1.91zm1.8.93a2 2 0 00-1.44 0l-1.38.53 5.59 2.12 1.95-.83L8.72 2.3zM14 4.97L8.5 7.33v6.43l.22-.07 4.96-1.91a.5.5 0 00.32-.47V4.97zm-6.5 8.79V7.33L2 4.97v6.34c0 .21.13.4.32.47l4.96 1.9c.07.04.15.06.22.08zM2.56 4.13L8 6.46l2.16-.93L4.5 3.38l-1.94.75z"/></svg>';
    Book = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V6zm1.5 1.5h7v-1h-7v1z"/><path d="M4 4.5A2.5 2.5 0 016.5 2H18a2.5 2.5 0 012.5 2.5v14.25c0 .41-.34.75-.75.75H5.5a1 1 0 001 1h13.25a.75.75 0 010 1.5H6.5A2.5 2.5 0 014 19.5v-15zM5.5 18H19V4.5a1 1 0 00-1-1H6.5a1 1 0 00-1 1V18z"/></svg>';
    Open = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 3C3.67 3 3 3.67 3 4.5v7c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V9.27a.5.5 0 011 0v2.23a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 11.5v-7A2.5 2.5 0 014.5 2h2.23a.5.5 0 010 1H4.5zm4.27-.5c0-.28.22-.5.5-.5h4.23c.28 0 .5.22.5.5v4.23a.5.5 0 01-1 0V3.71L9.62 7.08a.5.5 0 11-.7-.7L12.29 3H9.27a.5.5 0 01-.5-.5z"/></svg>';
    css11 = {
      code: "#hero-section{align-items:center;background:url(/bloom-mica-light.png) 50%/170% no-repeat;display:flex;flex-direction:column;justify-content:center;min-block-size:596px;position:relative;text-align:center}@media(prefers-color-scheme:dark){#hero-section{background-image:url(/bloom-mica-dark.png)}}#hero-section>.page-section-inner{align-items:center;display:flex;flex-direction:column;padding-block:58px 128px;position:relative}#hero-section h1{font-size:5.4rem}#hero-section .hero-card .text-box-container{-webkit-margin-before:4px;-webkit-margin-after:14px;margin-block-end:14px;margin-block-start:4px}#hero-section .hero-card .copy-box{font-family:var(--fds-font-family-monospace)}#hero-section .hero-card header>.icon-button{inset-block-start:6px;inset-inline-end:6px;position:absolute}#hero-section .buttons-spacer .button{min-width:128px}.hero-cards.svelte-v89b53.svelte-v89b53,.hero-contents.svelte-v89b53.svelte-v89b53{position:relative}.hero-cards.svelte-v89b53.svelte-v89b53{grid-gap:24px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));inline-size:100%;inline-size:90vw;inset-block-start:calc(100% - 48px);max-inline-size:1160px;padding:0 72px;position:absolute;text-align:left}.editor-body.svelte-v89b53.svelte-v89b53{display:flex;flex:1 1 auto;flex-direction:column;font-family:var(--fds-font-family-monospace);font-size:var(--fds-body-font-size);line-height:18px;max-height:100%;min-height:0}.editor-body.svelte-v89b53 .editor-tabs.svelte-v89b53{align-items:center;display:flex;flex:0 0 auto;margin:0;padding:0}.editor-body.svelte-v89b53 .editor-tabs li.svelte-v89b53{-webkit-border-before:2px solid #ff3e00;background-color:var(--fds-solid-background-base);border:1px solid var(--fds-divider-stroke-default);border-block-start:2px solid #ff3e00;border-bottom:none;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;list-style-type:none;margin:0;padding:6px 12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.editor-body.svelte-v89b53 .editor.svelte-v89b53{background-color:var(--fds-solid-background-base);border:1px solid var(--fds-divider-stroke-default);border-radius:var(--fds-control-corner-radius);border-top-left-radius:0;display:flex;flex:1 1 auto;max-height:100%;min-height:0;overflow:auto;overflow:overlay}.editor-body.svelte-v89b53 .editor pre.svelte-v89b53{margin:0;padding:4px;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.editor-body.svelte-v89b53 .editor pre code.svelte-v89b53{line-height:inherit}.editor-body.svelte-v89b53 .line-numbers.svelte-v89b53{-webkit-border-end:1px solid var(--fds-divider-stroke-default);align-self:flex-start;background-color:var(--fds-solid-background-base);border-inline-end:1px solid var(--fds-divider-stroke-default);color:var(--fds-text-secondary);flex:0 0 auto;font-weight:400;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;left:0;min-inline-size:32px;padding:4px 6px;position:-webkit-sticky;position:sticky;text-align:right;z-index:1}.editor-body.svelte-v89b53 .line-numbers span.svelte-v89b53{display:block}.example-app.svelte-v89b53.svelte-v89b53{align-items:center;display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-bottom:32px}.example-app.svelte-v89b53>div.svelte-v89b53{margin-top:12px}",
      map: null
    };
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let exampleCount = 0;
      const example = `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> TextBlock <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token string">"fluent-svelte/theme.css"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextBlock</span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>display<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token language-javascript"><span class="token punctuation">{</span>count<span class="token punctuation">}</span></span>.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>TextBlock</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>accent<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> count<span class="token operator">++</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span>Increase Counter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span>Reset Counter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>`;
      $$result.css.add(css11);
      return `${validate_component(Metadata, "Metadata").$$render($$result, {
        title: "Handyempfehlungen",
        description: "description located at /src/routes/index.svelte"
      }, {}, {})}

${validate_component(PageSection, "PageSection").$$render($$result, { id: "hero-section" }, {}, {
        default: () => {
          return `<div class="${"hero-contents svelte-v89b53"}"><h1>Handyempfehlungen</h1>
		<p>paragraph located at /src/routes/index.svelte.</p>
		<div class="${"buttons-spacer"}">${validate_component(Button, "Button").$$render($$result, { variant: "accent", href: "/docs" }, {}, {
            default: () => {
              return `Los geht&#39;s`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, {
            href: "https://github.com/Niktendo/Home",
            target: "_blank",
            rel: "noreferrer noopener"
          }, {}, {
            default: () => {
              return `Source Code`;
            }
          })}</div></div>

	<div class="${"hero-cards svelte-v89b53"}">${validate_component(HeroCard, "HeroCard").$$render($$result, {}, {}, {
            header: () => {
              return `${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyStrong" }, {}, {
                default: () => {
                  return `1. Install`;
                }
              })}
				${validate_component(IconButton, "IconButton").$$render($$result, {
                href: "https://npmjs.com/package/fluent-svelte",
                target: "_blank",
                rel: "noreferrer noopener"
              }, {}, {
                default: () => {
                  return `<!-- HTML_TAG_START -->${Box}<!-- HTML_TAG_END -->`;
                }
              })}
			`;
            },
            default: () => {
              return `${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
                default: () => {
                  return `npm`;
                }
              })}
			${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "npm i --save-dev fluent-svelte" }, {}, {})}

			${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
                default: () => {
                  return `using pnpm`;
                }
              })}
			${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "pnpm i --save-dev fluent-svelte" }, {}, {})}

			${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
                default: () => {
                  return `...or with yarn`;
                }
              })}
			${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "yarn add --dev fluent-svelte" }, {}, {})}

			${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                default: () => {
                  return `Learn More`;
                }
              })}`;
            }
          })}
		${validate_component(HeroCard, "HeroCard").$$render($$result, {}, {}, {
            header: () => {
              return `${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyStrong" }, {}, {
                default: () => {
                  return `2. Build`;
                }
              })}
				${validate_component(IconButton, "IconButton").$$render($$result, { href: "/docs" }, {}, {
                default: () => {
                  return `<!-- HTML_TAG_START -->${Book}<!-- HTML_TAG_END -->`;
                }
              })}
			`;
            },
            default: () => {
              return `<div class="${"editor-body svelte-v89b53"}"><ul class="${"editor-tabs svelte-v89b53"}"><li class="${"svelte-v89b53"}">index.svelte</li></ul>
				<div class="${"editor svelte-v89b53"}"><aside class="${"line-numbers svelte-v89b53"}">${each(example.split(/\r\n|\r|\n/), (line, i2) => {
                return `<span class="${"svelte-v89b53"}">${escape(i2 + 1)}</span>`;
              })}</aside>
					<pre class="${"svelte-v89b53"}"><code class="${"svelte-v89b53"}"><!-- HTML_TAG_START -->${example}<!-- HTML_TAG_END --></code></pre></div></div>`;
            }
          })}
		${validate_component(HeroCard, "HeroCard").$$render($$result, {}, {}, {
            header: () => {
              return `${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyStrong" }, {}, {
                default: () => {
                  return `3. View`;
                }
              })}
				${validate_component(IconButton, "IconButton").$$render($$result, {
                href: "https://svelte.dev/repl/b90fb12e06e84aabb303121f713d1296",
                target: "_blank",
                rel: "noreferrer noopener"
              }, {}, {
                default: () => {
                  return `<!-- HTML_TAG_START -->${Open}<!-- HTML_TAG_END -->`;
                }
              })}
			`;
            },
            default: () => {
              return `<div class="${"example-app svelte-v89b53"}">${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "display" }, {}, {
                default: () => {
                  return `${escape(exampleCount)}`;
                }
              })}
				<div class="${"svelte-v89b53"}">${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                default: () => {
                  return `Increase Count`;
                }
              })}
					${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `Reset Count`;
                }
              })}</div></div>`;
            }
          })}</div>`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css12,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css12;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-ea777d97.js";
    js3 = ["pages/index.svelte-ea777d97.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/TextBlock-d5339f0f.js", "chunks/IconButton-c8cc9811.js", "chunks/CopyBox-4b49697f.js", "chunks/TextBoxButton-cdab09ab.js", "chunks/Metadata-60edf1d7.js", "chunks/PageSection-65bb6614.js"];
    css12 = ["assets/pages/index.svelte-f90efed5.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module2) {
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        manual: _self2.Prism && _self2.Prism.manual,
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone2;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone2 = {};
                visited[id] = clone2;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone2[key] = deepClone(o[key], visited);
                  }
                }
                return clone2;
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone2 = [];
                visited[id] = clone2;
                o.forEach(function(v, i2) {
                  clone2[i2] = deepClone(v, visited);
                });
                return clone2;
              default:
                return o;
            }
          },
          getLanguage: function(element) {
            while (element) {
              var m2 = lang.exec(element.className);
              if (m2) {
                return m2[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document && 1 < 2) {
              return document.currentScript;
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i2 in scripts) {
                  if (scripts[i2].src == src) {
                    return scripts[i2];
                  }
                }
              }
              return null;
            }
          },
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        languages: {
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          insertBefore: function(inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i2 in o) {
              if (o.hasOwnProperty(i2)) {
                callback.call(o, i2, o[i2], type || i2);
                var property = o[i2];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i2, visited);
                }
              }
            }
          }
        },
        plugins: {},
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i2 = 0, element; element = env.elements[i2++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        hooks: {
          all: {},
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i2 = 0, callback; callback = callbacks[i2++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s3 = "";
          o.forEach(function(e2) {
            s3 += stringify(e2, language);
          });
          return s3;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i2 = 0; i2 < count && next !== list.tail; i2++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i2;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    }(_self);
    if (typeof module2 !== "undefined" && module2.exports) {
      module2.exports = Prism2;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism2;
    }
    Prism2.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
    Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
    Prism2.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
      value: function addInlined2(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism2.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism2.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism2.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
      value: function(attrName, lang) {
        Prism2.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism2.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism2.languages.html = Prism2.languages.markup;
    Prism2.languages.mathml = Prism2.languages.markup;
    Prism2.languages.svg = Prism2.languages.markup;
    Prism2.languages.xml = Prism2.languages.extend("markup", {});
    Prism2.languages.ssml = Prism2.languages.xml;
    Prism2.languages.atom = Prism2.languages.xml;
    Prism2.languages.rss = Prism2.languages.xml;
    (function(Prism3) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism3.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
          }
        },
        "url": {
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
      var markup = Prism3.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism2);
    Prism2.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism2.languages.javascript = Prism2.languages.extend("clike", {
      "class-name": [
        Prism2.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism2.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism2.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism2.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism2.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism2.languages.markup) {
      Prism2.languages.markup.tag.addInlined("script", "javascript");
      Prism2.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
    }
    Prism2.languages.js = Prism2.languages.javascript;
    (function() {
      if (typeof Prism2 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error2) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error2(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error2(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m2 = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m2) {
          var start = Number(m2[1]);
          var comma = m2[2];
          var end = m2[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism2.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism2.hooks.add("before-sanity-check", function(env) {
        var pre = env.element;
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism2.util.setLanguage(code, language);
          Prism2.util.setLanguage(pre, language);
          var autoloader = Prism2.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(src, function(text) {
            pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
            var range = parseRange(pre.getAttribute("data-range"));
            if (range) {
              var lines = text.split(/\r\n?|\n/g);
              var start = range[0];
              var end = range[1] == null ? lines.length : range[1];
              if (start < 0) {
                start += lines.length;
              }
              start = Math.max(0, Math.min(start - 1, lines.length));
              if (end < 0) {
                end += lines.length;
              }
              end = Math.max(0, Math.min(end, lines.length));
              text = lines.slice(start, end).join("\n");
              if (!pre.hasAttribute("data-start")) {
                pre.setAttribute("data-start", String(start + 1));
              }
            }
            code.textContent = text;
            Prism2.highlightElement(code);
          }, function(error2) {
            pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
            code.textContent = error2;
          });
        }
      });
      Prism2.plugins.fileHighlight = {
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i2 = 0, element; element = elements[i2++]; ) {
            Prism2.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism2.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// .svelte-kit/output/server/chunks/ListItem-8cad2fba.js
var css13, ListItem;
var init_ListItem_8cad2fba = __esm({
  ".svelte-kit/output/server/chunks/ListItem-8cad2fba.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBlock_b8b64333();
    css13 = {
      code: '.list-item.svelte-1ye4o7x{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:34px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;inline-size:calc(100% - 10px);margin:3px 5px;outline:none;padding-inline:12px;position:relative;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.list-item.svelte-1ye4o7x:before{background-color:var(--fds-accent-default);block-size:16px;border-radius:3px;content:"";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transform:scaleY(0);transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.list-item.selected.svelte-1ye4o7x:before{opacity:1;transform:scaleY(1)}.list-item.svelte-1ye4o7x:focus-visible{box-shadow:var(--fds-focus-stroke)}.list-item.selected.svelte-1ye4o7x,.list-item.svelte-1ye4o7x:hover{background-color:var(--fds-subtle-fill-secondary)}.list-item.svelte-1ye4o7x:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.list-item.svelte-1ye4o7x:active:before{transform:scaleY(.625)}.list-item.disabled.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.list-item.disabled.selected.svelte-1ye4o7x{background-color:var(--fds-subtle-fill-secondary)}.list-item.disabled.selected.svelte-1ye4o7x:before{background-color:var(--fds-accent-disabled)}.list-item.svelte-1ye4o7x>svg{fill:currentColor;-webkit-margin-end:16px;block-size:auto;inline-size:16px;margin-inline-end:16px}',
      map: null
    };
    ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["selected", "disabled", "href", "role", "class", "element"]);
      let { selected = false } = $$props;
      let { disabled = false } = $$props;
      let { href = "" } = $$props;
      let { role = "listitem" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component(), ["select"]);
      const dispatch = createEventDispatcher();
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css13);
      {
        if (selected)
          dispatch("select");
      }
      return `
${href && !disabled ? `<a${spread([
        {
          tabindex: escape_attribute_value(disabled ? -1 : 0)
        },
        {
          "aria-selected": escape_attribute_value(selected)
        },
        { class: "list-item " + escape(className) },
        { href: escape_attribute_value(href) },
        { role: escape_attribute_value(role) },
        escape_object($$restProps)
      ], {
        classes: (selected ? "selected" : "") + " " + (disabled ? "disabled" : "") + " svelte-1ye4o7x"
      })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}</a>` : `<li${spread([
        {
          tabindex: escape_attribute_value(disabled ? -1 : 0)
        },
        {
          "aria-selected": escape_attribute_value(selected)
        },
        { class: "list-item " + escape(className) },
        { href: escape_attribute_value(href) },
        { role: escape_attribute_value(role) },
        escape_object($$restProps)
      ], {
        classes: (selected ? "selected" : "") + " " + (disabled ? "disabled" : "") + " svelte-1ye4o7x"
      })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${validate_component(TextBlock, "TextBlock").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}</li>`}`;
    });
  }
});

// .svelte-kit/output/server/chunks/AutoSuggestBox-edef6fd8.js
var css14, AutoSuggestBox;
var init_AutoSuggestBox_edef6fd8 = __esm({
  ".svelte-kit/output/server/chunks/AutoSuggestBox-edef6fd8.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBoxButton_fef51e87();
    init_ListItem_8cad2fba();
    css14 = {
      code: '.auto-suggest-box-flyout.svelte-1jjpcxg{background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:0 0 var(--fds-overlay-corner-radius) var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);box-sizing:border-box;color:var(--fds-text-primary);inline-size:calc(100% + 2px);inset-block-start:calc(100% + 1px);inset-inline-start:-1px;margin:0;max-block-size:472px;overflow:auto;padding:0;padding-block:2px;position:absolute;z-index:100}.auto-suggest-box.open{background-color:var(--fds-control-fill-input-active)!important}.auto-suggest-box.open .text-box-underline:after{border-bottom:2px solid var(--fds-accent-default);content:""}.auto-suggest-box.open input::-moz-placeholder{color:var(--fds-text-tertiary)}.auto-suggest-box.open input:-ms-input-placeholder{color:var(--fds-text-tertiary)}.auto-suggest-box.open input::placeholder{color:var(--fds-text-tertiary)}.auto-suggest-box.open .text-box-underline{border-bottom-left-radius:0;border-bottom-right-radius:0}',
      map: null
    };
    AutoSuggestBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let matches;
      let $$restProps = compute_rest_props($$props, [
        "value",
        "items",
        "open",
        "selection",
        "class",
        "inputElement",
        "containerElement",
        "buttonsContainerElement",
        "clearButtonElement",
        "searchButtonElement"
      ]);
      let { value = "" } = $$props;
      let { items = [] } = $$props;
      let { open = false } = $$props;
      let { selection = 0 } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { buttonsContainerElement = null } = $$props;
      let { clearButtonElement = null } = $$props;
      let { searchButtonElement = null } = $$props;
      let typedValue = "";
      const dispatch = createEventDispatcher();
      const flyoutId = uid("fds-auto-suggest-flyout-");
      function dispatchSelect() {
        dispatch("select", { item: items[selection], index: selection });
      }
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.selection === void 0 && $$bindings.selection && selection !== void 0)
        $$bindings.selection(selection);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.buttonsContainerElement === void 0 && $$bindings.buttonsContainerElement && buttonsContainerElement !== void 0)
        $$bindings.buttonsContainerElement(buttonsContainerElement);
      if ($$props.clearButtonElement === void 0 && $$bindings.clearButtonElement && clearButtonElement !== void 0)
        $$bindings.clearButtonElement(clearButtonElement);
      if ($$props.searchButtonElement === void 0 && $$bindings.searchButtonElement && searchButtonElement !== void 0)
        $$bindings.searchButtonElement(searchButtonElement);
      $$result.css.add(css14);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        matches = items.filter((item) => item.toLowerCase().includes(typedValue.toLowerCase()));
        {
          dispatchSelect();
        }
        $$rendered = `${validate_component(TextBox, "TextBox").$$render($$result, Object.assign({ type: "search" }, {
          class: "auto-suggest-box " + (open && matches.length > 0 ? "open" : "") + " " + className
        }, { "aria-autocomplete": "list" }, {
          "aria-activedescendant": open && matches.length > 0 ? `${flyoutId}-item-${items.indexOf(matches[selection])}` : ""
        }, {
          "aria-expanded": open && matches.length > 0
        }, { "aria-controls": flyoutId }, $$restProps, { inputElement }, { containerElement }, { clearButtonElement }, { searchButtonElement }, { buttonsContainerElement }, { value }), {
          inputElement: ($$value) => {
            inputElement = $$value;
            $$settled = false;
          },
          containerElement: ($$value) => {
            containerElement = $$value;
            $$settled = false;
          },
          clearButtonElement: ($$value) => {
            clearButtonElement = $$value;
            $$settled = false;
          },
          searchButtonElement: ($$value) => {
            searchButtonElement = $$value;
            $$settled = false;
          },
          buttonsContainerElement: ($$value) => {
            buttonsContainerElement = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {
          buttons: () => {
            return `${slots.buttons ? slots.buttons({ slot: "buttons" }) : ``}`;
          },
          default: () => {
            return `${open && matches.length > 0 ? `<ul${add_attribute("id", flyoutId, 0)} role="${"listbox"}" class="${"auto-suggest-box-flyout svelte-1jjpcxg"}">${each(matches, (item, index) => {
              return `${slots["item-template"] ? slots["item-template"]({
                id: "" + (flyoutId + "-item-" + index),
                value,
                matches,
                selection,
                item,
                index
              }) : `
					${validate_component(ListItem, "ListItem").$$render($$result, {
                id: flyoutId + "-item-" + index,
                role: "option",
                selected: selection === index
              }, {}, {
                default: () => {
                  return `${escape(item)}`;
                }
              })}
				`}`;
            })}</ul>` : ``}

	${slots.default ? slots.default({}) : ``}`;
          }
        })}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/__layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => _layout2,
  load: () => load2,
  prerender: () => prerender
});
function filterPages(docsStructure) {
  if (Array.isArray(docsStructure)) {
    return docsStructure.map((page2) => filterPages(page2)).flat(Infinity);
  } else {
    if (docsStructure.type === "category") {
      return docsStructure.pages.map((page2) => filterPages(page2)).flat(Infinity);
    } else {
      return [docsStructure];
    }
  }
}
var import_prismjs, import_panzoom3, css$2, TreeView, css$15, Toc, docsMap, docsPages, blocks, loadExampleModules, css15, prerender, load2, _layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/__layout.svelte.js"() {
    init_index_f16625c7();
    import_prismjs = __toModule(require_prism());
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_AutoSuggestBox_edef6fd8();
    init_TextBlock_b8b64333();
    init_ListItem_8cad2fba();
    init_Metadata_11ce4912();
    init_stores_56a134e1();
    import_panzoom3 = __toModule(require_panzoom());
    init_TextBoxButton_fef51e87();
    css$2 = {
      code: ".subtree-items.svelte-1bk9dfq{-webkit-padding-start:24px;padding-inline-start:24px}.tree-view.svelte-1bk9dfq .category-header{inline-size:100%;padding:10px 16px}",
      map: null
    };
    TreeView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { tree = [] } = $$props;
      let { __depth = 0 } = $$props;
      let treeViewState;
      const id = (s3) => s3.toLowerCase().split(" ").join("-");
      if ($$props.tree === void 0 && $$bindings.tree && tree !== void 0)
        $$bindings.tree(tree);
      if ($$props.__depth === void 0 && $$bindings.__depth && __depth !== void 0)
        $$bindings.__depth(__depth);
      $$result.css.add(css$2);
      $$unsubscribe_page();
      return `<div class="${"tree-view svelte-1bk9dfq"}">${each(tree, ({ name, path, type, pages, icon }) => {
        return `${type === "category" ? `${__depth > 0 ? `<div class="${["subtree", (treeViewState == null ? void 0 : treeViewState[id(name)]) ? "expanded" : ""].join(" ").trim()}">${validate_component(ListItem, "ListItem").$$render($$result, {
          type: "expander",
          expanded: treeViewState == null ? void 0 : treeViewState[id(name)]
        }, {}, {
          icon: () => {
            return `<!-- HTML_TAG_START -->${icon || ""}<!-- HTML_TAG_END -->
						`;
          },
          default: () => {
            return `${escape(name)}
					`;
          }
        })}
					${(treeViewState == null ? void 0 : treeViewState[id(name)]) ? `<div class="${"subtree-items svelte-1bk9dfq"}">${validate_component(TreeView, "svelte:self").$$render($$result, { __depth: __depth + 1, tree: pages }, {}, {})}
						</div>` : ``}
				</div>` : `${validate_component(TextBlock, "TextBlock").$$render($$result, {
          class: "category-header",
          variant: "bodyStrong"
        }, {}, {
          default: () => {
            return `${escape(name)}`;
          }
        })}
				${validate_component(TreeView, "svelte:self").$$render($$result, { __depth: __depth + 1, tree: pages }, {}, {})}`}` : `${validate_component(ListItem, "ListItem").$$render($$result, {
          type: "navigation",
          selected: `/docs${path}` === $page.url.pathname,
          href: "/docs" + path
        }, {}, {
          icon: () => {
            return `<!-- HTML_TAG_START -->${icon || ""}<!-- HTML_TAG_END -->
				`;
          },
          default: () => {
            return `${escape(name)}
			`;
          }
        })}`}`;
      })}
</div>`;
    });
    css$15 = {
      code: ".table-of-contents.svelte-r7q6zd li.svelte-r7q6zd{list-style-type:none;margin:0;margin-left:calc(12px*var(--fds-depth));padding:0}.table-of-contents.svelte-r7q6zd .list-item{block-size:28px;inline-size:100%;margin-inline:0}.table-of-contents.svelte-r7q6zd .list-item .text-block{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      map: null
    };
    Toc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => value);
      let { target } = $$props;
      let headings = [];
      let activeHeading;
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      $$result.css.add(css$15);
      {
        headings = target && Array.from(target.querySelectorAll("h1, h2, h3")).filter((node) => !node.closest(".component-showcase-grid"));
      }
      $$unsubscribe_page();
      return `${target ? `<nav class="${"table-of-contents svelte-r7q6zd"}">${each(headings, ({ tagName, innerText }, i2) => {
        return `<li style="${"--fds-depth: " + escape(+tagName[1] - 1) + ";"}" class="${"svelte-r7q6zd"}">${validate_component(ListItem, "ListItem").$$render($$result, { selected: activeHeading === headings[i2] }, {}, {
          default: () => {
            return `${escape(innerText)}
				`;
          }
        })}
			</li>`;
      })}</nav>` : ``}`;
    });
    docsMap = [
      {
        name: "\xDCbersicht/Handyempfehlungen",
        path: "",
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7 12C6.72386 12 6.5 12.2239 6.5 12.5C6.5 12.7761 6.72386 13 7 13H9C9.27614 13 9.5 12.7761 9.5 12.5C9.5 12.2239 9.27614 12 9 12H7ZM5.75 1C4.7835 1 4 1.7835 4 2.75V13.25C4 14.2165 4.7835 15 5.75 15H10.25C11.2165 15 12 14.2165 12 13.25V2.75C12 1.7835 11.2165 1 10.25 1H5.75ZM5 2.75C5 2.33579 5.33579 2 5.75 2H10.25C10.6642 2 11 2.33579 11 2.75V13.25C11 13.6642 10.6642 14 10.25 14H5.75C5.33579 14 5 13.6642 5 13.25V2.75Z"/>
		</svg>`
      },
      {
        name: "Getting Started",
        path: "/getting-started",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 1.5C13 1.22386 12.7761 1 12.5 1C12.2239 1 12 1.22386 12 1.5V3H10.5C10.2239 3 10 3.22386 10 3.5C10 3.77614 10.2239 4 10.5 4H12V5.5C12 5.77614 12.2239 6 12.5 6C12.7761 6 13 5.77614 13 5.5V4H14.5C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3H13V1.5ZM3.75 2C2.7835 2 2 2.7835 2 3.75V12.25C2 13.2165 2.7835 14 3.75 14H12.25C13.2165 14 14 13.2165 14 12.25V9.25C14 8.2835 13.2165 7.5 12.25 7.5H8.5V3.75C8.5 2.7835 7.7165 2 6.75 2H3.75ZM7.5 8.5V13H3.75C3.33579 13 3 12.6642 3 12.25V8.5H7.5ZM7.5 3.75V7.5H3V3.75C3 3.33579 3.33579 3 3.75 3H6.75C7.16421 3 7.5 3.33579 7.5 3.75ZM12.25 13H8.5V8.5H12.25C12.6642 8.5 13 8.83579 13 9.25V12.25C13 12.6642 12.6642 13 12.25 13Z"/></svg>`
      },
      {
        type: "category",
        name: "Components",
        pages: [
          {
            name: "Spielwiese",
            path: "/components/playground"
          },
          {
            name: "Button",
            path: "/components/button",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1 5c0-1.1.9-2 2-2h10a2 2 0 012 2v5a2 2 0 01-1.16 1.82 1.5 1.5 0 00-.28-.38l-.45-.45A1 1 0 0014 10V5a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h4v1H3a2 2 0 01-2-2V5z"/><path d="M8.85 8.15A.5.5 0 008 8.5v6a.5.5 0 00.9.3l1.35-1.8h2.25a.5.5 0 00.35-.85l-4-4zM9 13V9.7l2.3 2.3H10a.5.5 0 00-.4.2L9 13z"/></svg>`
          },
          {
            name: "Checkbox",
            path: "/components/checkbox",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8536 6.85355C11.0488 6.65829 11.0488 6.34171 10.8536 6.14645C10.6583 5.95118 10.3417 5.95118 10.1464 6.14645L7 9.29289L5.85355 8.14645C5.65829 7.95118 5.34171 7.95118 5.14645 8.14645C4.95118 8.34171 4.95118 8.65829 5.14645 8.85355L6.64645 10.3536C6.84171 10.5488 7.15829 10.5488 7.35355 10.3536L10.8536 6.85355ZM3 4.5C3 3.67157 3.67157 3 4.5 3H11.5C12.3284 3 13 3.67157 13 4.5V11.5C13 12.3284 12.3284 13 11.5 13H4.5C3.67157 13 3 12.3284 3 11.5V4.5ZM11.5 4H4.5C4.22386 4 4 4.22386 4 4.5V11.5C4 11.7761 4.22386 12 4.5 12H11.5C11.7761 12 12 11.7761 12 11.5V4.5C12 4.22386 11.7761 4 11.5 4Z" /></svg>`
          },
          {
            name: "ToggleSwitch",
            path: "/components/toggleswitch",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10C3.89543 10 3 9.10457 3 8C3 6.89543 3.89543 6 5 6C6.10457 6 7 6.89543 7 8C7 9.10457 6.10457 10 5 10Z"/><path d="M15 8C15 5.79086 13.2091 4 11 4H5C2.79086 4 1 5.79086 1 8C1 10.2091 2.79086 12 5 12H11C13.2091 12 15 10.2091 15 8ZM11 5C12.6569 5 14 6.34315 14 8C14 9.65685 12.6569 11 11 11H5C3.34315 11 2 9.65685 2 8C2 6.34315 3.34315 5 5 5H11Z"/></svg>`
          },
          {
            name: "RadioButton",
            path: "/components/radiobutton",
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"/><path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"/></svg>`
          },
          {
            name: "Slider",
            path: "/components/slider",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9C6.93191 9 7.71496 9.63738 7.93699 10.5L13.5 10.5C13.7761 10.5 14 10.7239 14 11C14 11.2455 13.8231 11.4496 13.5899 11.4919L13.5 11.5L7.93673 11.501C7.71435 12.3631 6.93155 13 6 13C5.06845 13 4.28565 12.3631 4.06327 11.501L2.5 11.5C2.22386 11.5 2 11.2761 2 11C2 10.7545 2.17688 10.5504 2.41012 10.5081L2.5 10.5L4.06301 10.5C4.28504 9.63738 5.06809 9 6 9ZM6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10ZM10 3C10.9319 3 11.715 3.63738 11.937 4.49998L13.5 4.5C13.7761 4.5 14 4.72386 14 5C14 5.24546 13.8231 5.44961 13.5899 5.49194L13.5 5.5L11.9367 5.50102C11.7144 6.36312 10.9316 7 10 7C9.06845 7 8.28565 6.36312 8.06327 5.50102L2.5 5.5C2.22386 5.5 2 5.27614 2 5C2 4.75454 2.17688 4.55039 2.41012 4.50806L2.5 4.5L8.06301 4.49998C8.28504 3.63738 9.06809 3 10 3ZM10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4Z"/></svg>`
          },
          {
            name: "Expander",
            path: "/components/expander",
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 11.1741L11.3737 10.1756C11.5556 9.96781 11.8714 9.94675 12.0793 10.1286C12.2871 10.3104 12.3081 10.6263 12.1263 10.8341L10.3763 12.8341C10.2814 12.9426 10.1442 13.0049 10 13.0049C9.85583 13.0049 9.71866 12.9426 9.62372 12.8341L7.87372 10.8341C7.69188 10.6263 7.71294 10.3104 7.92075 10.1286C8.12857 9.94675 8.44445 9.96781 8.6263 10.1756L9.50001 11.1742L9.50001 7.49512C9.50001 7.21898 9.72387 6.99512 10 6.99512C10.2762 6.99512 10.5 7.21898 10.5 7.49512L10.5 11.1741ZM4 16C2.89543 16 2 15.1046 2 14V6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V14C18 15.1046 17.1046 16 16 16H4ZM3 14C3 14.5523 3.44772 15 4 15H16C16.5523 15 17 14.5523 17 14V9H11.5V8H17V6C17 5.44771 16.5523 5 16 5H4C3.44772 5 3 5.44772 3 6V8H8.50003V9H3V14Z"/></svg>`
          },
          {
            name: "ContentDialog",
            path: "/components/contentdialog",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.5 2C3.11929 2 2 3.11929 2 4.5V9.5C2 10.8807 3.11929 12 4.5 12H9.5C10.8807 12 12 10.8807 12 9.5V4.5C12 3.11929 10.8807 2 9.5 2H4.5ZM10.9146 4H3.08535C3.29127 3.4174 3.84689 3 4.5 3H9.5C10.1531 3 10.7087 3.4174 10.9146 4ZM3 5H11V9.5C11 10.3284 10.3284 11 9.5 11H4.5C3.67157 11 3 10.3284 3 9.5V5ZM6.50018 13.9999C5.68227 13.9999 4.9561 13.6072 4.5 12.9999H10.0002C11.657 12.9999 13.0002 11.6568 13.0002 9.99994V4.49976C13.6074 4.95586 14.0002 5.68203 14.0002 6.49994V9.99994C14.0002 12.2091 12.2093 13.9999 10.0002 13.9999H6.50018Z" fill="currentColor"/></svg>`
          },
          {
            name: "InfoBar",
            path: "/components/infobar",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.59971 3H3.5C2.67157 3 2 3.67157 2 4.5V9.5C2 10.3284 2.67157 11 3.5 11H5V13.8981L8.31213 11H12.5C13.2392 11 13.8536 10.4653 13.9773 9.7615C14.366 9.44393 14.7105 9.07424 15 8.66308V9.5C15 10.8807 13.8807 12 12.5 12H8.68787L5.62533 14.6797C4.99168 15.2342 4 14.7842 4 13.9422V12H3.5C2.11929 12 1 10.8807 1 9.5V4.5C1 3.11929 2.11929 2 3.5 2H6.25716C6.00353 2.30711 5.78261 2.64222 5.59971 3ZM10.5 10C12.9853 10 15 7.98528 15 5.5C15 3.01472 12.9853 1 10.5 1C8.01472 1 6 3.01472 6 5.5C6 7.98528 8.01472 10 10.5 10ZM10 3.5C10 3.22386 10.2239 3 10.5 3C10.7761 3 11 3.22386 11 3.5V5.5C11 5.77614 10.7761 6 10.5 6C10.2239 6 10 5.77614 10 5.5V3.5ZM11.125 7.5C11.125 7.84518 10.8452 8.125 10.5 8.125C10.1548 8.125 9.875 7.84518 9.875 7.5C9.875 7.15482 10.1548 6.875 10.5 6.875C10.8452 6.875 11.125 7.15482 11.125 7.5Z"/></svg>`
          },
          {
            name: "InfoBadge",
            path: "/components/infobadge",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM8 10C8.41421 10 8.75 10.3358 8.75 10.75C8.75 11.1642 8.41421 11.5 8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75C7.25 10.3358 7.58579 10 8 10ZM8 4.5C8.24546 4.5 8.44961 4.67688 8.49194 4.91012L8.5 5V8.5C8.5 8.77614 8.27614 9 8 9C7.75454 9 7.55039 8.82312 7.50806 8.58988L7.5 8.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z"/></svg>`
          },
          {
            name: "ProgressRing",
            path: "/components/progressring",
            icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8C3 5.23858 5.23858 3 8 3C9.63582 3 11.0882 3.78555 12.0004 5H10C9.72386 5 9.5 5.22386 9.5 5.5C9.5 5.77614 9.72386 6 10 6H13C13.2761 6 13.5 5.77614 13.5 5.5V2.5C13.5 2.22386 13.2761 2 13 2C12.7239 2 12.5 2.22386 12.5 2.5V4.03126C11.4006 2.78563 9.79204 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 7.72386 13.7761 7.5 13.5 7.5C13.2239 7.5 13 7.72386 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8Z"/></svg>`
          },
          {
            name: "ListItem",
            path: "/components/listitem",
            icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 3.5C2 2.67157 2.67157 2 3.5 2H4.5C5.32843 2 6 2.67157 6 3.5V4.5C6 5.32843 5.32843 6 4.5 6H3.5C2.67157 6 2 5.32843 2 4.5V3.5ZM3.5 3C3.22386 3 3 3.22386 3 3.5V4.5C3 4.77614 3.22386 5 3.5 5H4.5C4.77614 5 5 4.77614 5 4.5V3.5C5 3.22386 4.77614 3 4.5 3H3.5Z"/>
					<path d="M2 9.5C2 8.67157 2.67157 8 3.5 8H4.5C5.32843 8 6 8.67157 6 9.5V10.5C6 11.3284 5.32843 12 4.5 12H3.5C2.67157 12 2 11.3284 2 10.5V9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5V10.5C3 10.7761 3.22386 11 3.5 11H4.5C4.77614 11 5 10.7761 5 10.5V9.5C5 9.22386 4.77614 9 4.5 9H3.5Z"/>
					<path d="M2 15.5C2 14.6716 2.67157 14 3.5 14H4.5C5.32843 14 6 14.6716 6 15.5V16.5C6 17.3284 5.32843 18 4.5 18H3.5C2.67157 18 2 17.3284 2 16.5V15.5ZM3.5 15C3.22386 15 3 15.2239 3 15.5V16.5C3 16.7761 3.22386 17 3.5 17H4.5C4.77614 17 5 16.7761 5 16.5V15.5C5 15.2239 4.77614 15 4.5 15H3.5Z"/>
					<path d="M8 4.5C8 4.22386 8.22386 4 8.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H8.5C8.22386 5 8 4.77614 8 4.5Z"/>
					<path d="M8 10.5C8 10.2239 8.22386 10 8.5 10H17.5C17.7761 10 18 10.2239 18 10.5C18 10.7761 17.7761 11 17.5 11H8.5C8.22386 11 8 10.7761 8 10.5Z"/>
					<path d="M8 16.5C8 16.2239 8.22386 16 8.5 16H17.5C17.7761 16 18 16.2239 18 16.5C18 16.7761 17.7761 17 17.5 17H8.5C8.22386 17 8 16.7761 8 16.5Z"/>
				</svg>`
          }
        ]
      },
      {
        type: "category",
        name: "Internals",
        pages: []
      }
    ];
    docsPages = filterPages(docsMap);
    blocks = "(if|else if|await|then|catch|each|html|debug)";
    Prism.languages.svelte = Prism.languages.extend("markup", {
      each: {
        pattern: new RegExp("{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),
        inside: {
          "language-javascript": [
            {
              pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
              lookbehind: true,
              inside: Prism.languages["javascript"]
            },
            {
              pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
              lookbehind: true,
              inside: Prism.languages["javascript"]
            },
            {
              pattern: /(#each[\s]*)[\s\S]*(?=as)/,
              lookbehind: true,
              inside: Prism.languages["javascript"]
            }
          ],
          keyword: /[#/]each|as/,
          punctuation: /{|}/
        }
      },
      block: {
        pattern: new RegExp("{[#:/@]/s" + blocks + "(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),
        inside: {
          punctuation: /^{|}$/,
          keyword: [new RegExp("[#:/@]" + blocks + "( )*"), /as/, /then/],
          "language-javascript": {
            pattern: /[\s\S]*/,
            inside: Prism.languages["javascript"]
          }
        }
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "language-javascript": {
            pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
            inside: Prism.languages["javascript"]
          },
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: {
              punctuation: [
                /^=/,
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ],
              "language-javascript": {
                pattern: /{[\s\S]+}/,
                inside: Prism.languages["javascript"]
              }
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      "language-javascript": {
        pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
        lookbehind: true,
        inside: Prism.languages["javascript"]
      }
    });
    Prism.languages.svelte["tag"].inside["attr-value"].inside["entity"] = Prism.languages.svelte["entity"];
    Prism.hooks.add("wrap", (env) => {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism.languages.svelte.tag, "addInlined", {
      value: function addInlined(tagName, lang) {
        const includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        const inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism.languages[lang]
        };
        const def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism.languages.insertBefore("svelte", "cdata", def);
      }
    });
    Prism.languages.svelte.tag.addInlined("style", "css");
    Prism.languages.svelte.tag.addInlined("script", "javascript");
    loadExampleModules = async (path) => {
      const componentFiles = {};
      const examples = await Promise.all(Object.entries(componentFiles).map(async ([path2, module2]) => {
        return true;
      }));
      return examples.filter((example) => example.path === path).sort((a, b) => a.index - b.index);
    };
    css15 = {
      code: ".markdown-body{color:var(--fds-text-primary);font-size:1.4rem;line-height:1.45}.markdown-body>:first-child{-webkit-margin-before:0!important;margin-block-start:0!important}.markdown-body>:last-child{-webkit-margin-after:0!important;margin-block-end:0!important}.markdown-body>:only-child{margin:0!important}.markdown-body blockquote,.markdown-body details,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{-webkit-margin-before:0;-webkit-margin-after:16px;margin-block-end:16px;margin-block-start:0}.markdown-body figure{margin-block:16px}.markdown-body figure.margin-top{margin:48px 0 16px}.markdown-body figure.margin-bottom{margin:16px 0 48px}.markdown-body figure img{border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);height:auto;max-width:100%}.markdown-body figure figcaption{color:var(--fds-text-secondary)}.markdown-body h1,.markdown-body h2{-webkit-padding-before:1.5em;-webkit-padding-after:.3em;padding-block-end:.3em;padding-block-start:1.5em}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{-webkit-margin-before:24px;-webkit-margin-after:16px;color:var(--fds-text-primary);font-family:var(--fds-font-family-display);font-weight:600;line-height:1.25;margin-block-end:16px;margin-block-start:24px}.markdown-body h1{font-size:var(--fds-display-font-size)}.markdown-body h2{font-size:var(--fds-title-large-font-size)}.markdown-body h3{font-size:var(--fds-title-font-size)}.markdown-body h4{font-size:1em}.markdown-body h5{font-size:.875em}.markdown-body h6{color:var(--fds-text-tertiary);font-size:.85em}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{-webkit-margin-before:0;-webkit-margin-after:0;margin-block-end:0;margin-block-start:0}.markdown-body li+li{-webkit-margin-before:.25em;margin-block-start:.25em}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ol,.markdown-body ul{-webkit-padding-start:2em;padding-inline-start:2em}.markdown-body code,.markdown-body kbd{word-wrap:break-word;background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);font-family:var(--fds-font-family-monospace);font-size:85%;margin:0;padding-block:.2em;padding-inline:.4em}.markdown-body kbd{box-shadow:inset 0 -.2em 0 var(--fds-subtle-fill-secondary);color:#3a3b35;padding-block:.3em;padding-inline:.4em}@media(prefers-color-scheme:dark){.markdown-body kbd{color:#d4d4d4}}.markdown-body pre{background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);font-size:1em;overflow:auto;padding-block:12px;padding-inline:16px}.markdown-body pre code{background-color:transparent;border:none;padding:0}.markdown-body blockquote{-webkit-border-start:.25em solid var(--fds-subtle-fill-secondary);border-inline-start:.25em solid var(--fds-subtle-fill-secondary);color:var(--fds-text-disabled);margin:0;padding:0 1em}.markdown-body a:not(.icon-button):not(.button){color:var(--fds-accent-text-primary);text-decoration:underline;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.markdown-body a:not(.icon-button):not(.button):active,.markdown-body a:not(.icon-button):not(.button):hover{text-decoration:none}.markdown-body a:not(.icon-button):not(.button):hover{color:var(--fds-accent-text-tertiary)}.markdown-body a:not(.icon-button):not(.button):active{color:var(--fds-accent-text-secondary)}.markdown-body hr:not([class]){-webkit-border-before:1px solid var(--fds-divider-stroke-default);border:none;border-block-start:1px solid var(--fds-divider-stroke-default);margin:24px 0}.markdown-body table{background-clip:padding-box;border:1px solid var(--fds-card-stroke-default);border-collapse:collapse;border-radius:var(--fds-control-corner-radius);display:inline-block;overflow:hidden;text-align:left}.markdown-body table button{width:100%}.markdown-body table td,.markdown-body table th{padding-block:6px;padding-inline:12px}.markdown-body table td{-webkit-border-before:1px solid var(--fds-card-stroke-default);border-block-start:1px solid var(--fds-card-stroke-default)}.markdown-body table th{background-color:var(--fds-card-background-secondary);font-weight:600;white-space:nowrap}.markdown-body table tr{background-color:var(--fds-card-background-default);vertical-align:middle}.markdown-body table .info-bar{-webkit-margin-after:0;margin-block-end:0}.markdown-body .copy-box,.markdown-body .info-bar{-webkit-margin-after:24px;margin-block-end:24px}.markdown-body .copy-box{-webkit-margin-before:8px;margin-block-start:8px}.docs-container{background:url(/bloom-mica-light.png) 50%/170% no-repeat fixed;box-shadow:inset 0 0 0 100vmax var(--fds-card-background-secondary)}@media(prefers-color-scheme:dark){.docs-container{background-image:url(/bloom-mica-dark.png)}}.docs-container-inner{display:flex;justify-content:center;margin-inline:auto;max-width:1440px;min-height:100vh}.docs-search{-webkit-margin-after:12px;margin-block-end:12px;margin-inline:4px}.code-example{display:flex;flex-direction:column}.code-example .example-preview,.code-example pre{padding:12px}.code-example .example-preview{-webkit-border-after:none;background-clip:padding-box;background-color:var(--fds-solid-background-tertiary);border:1px solid var(--fds-card-stroke-default);border-block-end:none;border-radius:var(--fds-overlay-corner-radius) var(--fds-overlay-corner-radius) 0 0}.code-example pre{border-radius:0 0 var(--fds-overlay-corner-radius) var(--fds-overlay-corner-radius)}aside{-webkit-padding-before:12px;align-self:start;flex:0 0 auto;padding-block-start:12px;padding-inline:4px;position:-webkit-sticky;position:sticky;top:56px;width:280px}aside:last-child{-webkit-padding-before:44px;-webkit-padding-end:12px;padding-block-start:44px;padding-inline-end:12px;width:220px}aside:last-child .text-block.type-body-strong{margin-bottom:12px}@media only screen and (max-width:1096px){aside:last-child{display:none}}article{-webkit-margin-before:56px;-webkit-border-start:1px solid var(--fds-card-stroke-default);border-inline-start:1px solid var(--fds-card-stroke-default);flex:1 1 auto;margin-block-start:56px;max-inline-size:100%;min-inline-size:0;padding:44px 56px;position:relative;z-index:1}article header{align-items:flex-start;display:flex;justify-content:space-between}article header h1:first-child{-webkit-margin-before:0;font-size:48px;margin-block-start:0;padding:0}",
      map: null
    };
    prerender = true;
    load2 = async ({ url }) => {
      const path = url.pathname.replace(/\/$/gi, "").replace("/docs", "");
      const currentPage = docsPages.find((p) => p.path === path);
      if (currentPage === null || currentPage === void 0 ? void 0 : currentPage.examples) {
        const examples = await loadExampleModules(currentPage.path);
        return { props: { currentPage, examples } };
      }
      return { props: { currentPage } };
    };
    _layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { currentPage } = $$props;
      let { examples = [] } = $$props;
      let article;
      let searchValue = "";
      let searchSelection = 0;
      let searchFlyoutOpen = false;
      let searchItems = docsPages.map((page2) => page2.name);
      if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
        $$bindings.currentPage(currentPage);
      if ($$props.examples === void 0 && $$bindings.examples && examples !== void 0)
        $$bindings.examples(examples);
      $$result.css.add(css15);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${validate_component(Metadata, "Metadata").$$render($$result, {
          title: "Handyempfehlungen - Docs - " + (currentPage == null ? void 0 : currentPage.name),
          description: ""
        }, {}, {})}

<main class="${"docs-container"}"><div class="${"docs-container-inner"}"><aside><div class="${"docs-search"}">${validate_component(AutoSuggestBox, "AutoSuggestBox").$$render($$result, {
          placeholder: "Search Docs",
          open: searchFlyoutOpen,
          value: searchValue,
          selection: searchSelection,
          items: searchItems
        }, {
          open: ($$value) => {
            searchFlyoutOpen = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            searchValue = $$value;
            $$settled = false;
          },
          selection: ($$value) => {
            searchSelection = $$value;
            $$settled = false;
          },
          items: ($$value) => {
            searchItems = $$value;
            $$settled = false;
          }
        }, {
          "item-template": ({ selection, index, id, item }) => {
            return `${validate_component(ListItem, "ListItem").$$render($$result, {
              selected: selection === index,
              href: `/docs${docsPages.find((p) => p.name === item).path}`,
              id
            }, {}, {
              icon: () => {
                return `${docsPages.find((p) => p.name === item) ? `<!-- HTML_TAG_START -->${docsPages.find((p) => p.name === item).icon}<!-- HTML_TAG_END -->` : ``}
                            `;
              },
              default: () => {
                return `${escape(item)}`;
              }
            })}`;
          }
        })}</div>
			${validate_component(TreeView, "TreeView").$$render($$result, { tree: docsMap }, {}, {})}</aside>

		<article class="${"markdown-body"}"${add_attribute("this", article, 0)}><header><h1>${escape(currentPage == null ? void 0 : currentPage.name)}</h1>
				${validate_component(Button, "Button").$$render($$result, {
          href: "https://github.com/Niktendo/Home/edit/main/src/routes/docs" + ((currentPage == null ? void 0 : currentPage.path) || "/index") + ".md",
          rel: "noreferrer noopener",
          target: "_blank",
          variant: "hyperlink"
        }, {}, {
          default: () => {
            return `Diese Seite bearbeiten`;
          }
        })}</header>
			${slots.default ? slots.default({}) : ``}
			${(currentPage == null ? void 0 : currentPage.examples) ? `<h2>Examples</h2>
				${each(examples, (example) => {
          return `<h4>${escape(example.name)}</h4>
					<div class="${"code-example"}"><div class="${"example-preview"}">${validate_component(example.mod || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>
						<pre><code><!-- HTML_TAG_START -->${example.src}<!-- HTML_TAG_END -->
							</code></pre>
					</div>`;
        })}` : ``}</article>

		<aside>${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyStrong" }, {}, {
          default: () => {
            return `Inhalt`;
          }
        })}
			${validate_component(Toc, "Toc").$$render($$result, { target: article }, {}, {})}</aside></div>
</main>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css16,
  entry: () => entry4,
  js: () => js4,
  module: () => layout_svelte_exports2
});
var entry4, js4, css16;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_layout_svelte2();
    entry4 = "pages/docs/__layout.svelte-0057cff2.js";
    js4 = ["pages/docs/__layout.svelte-0057cff2.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/AutoSuggestBox-fbbf55e9.js", "chunks/TextBoxButton-cdab09ab.js", "chunks/ListItem-3fe40cc9.js", "chunks/TextBlock-d5339f0f.js", "chunks/Metadata-60edf1d7.js", "chunks/stores-c96b2e8c.js"];
    css16 = ["assets/pages/docs/__layout.svelte-d7307fc4.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/InfoBar-70c602a0.js
var css$16, InfoBadge, css17, InfoBar;
var init_InfoBar_70c602a0 = __esm({
  ".svelte-kit/output/server/chunks/InfoBar-70c602a0.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css$16 = {
      code: ".info-badge.svelte-106nxdf{align-items:center;border-radius:16px;box-sizing:border-box;color:var(--fds-text-on-accent-primary);display:inline-flex;font-family:var(--fds-font-family-small);font-size:var(--fds-caption-font-size);justify-content:center;line-height:var(--fds-caption-font-size);min-block-size:16px;min-inline-size:16px;padding:2px 4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.info-badge.severity-attention.svelte-106nxdf{background-color:var(--fds-system-attention)}.info-badge.severity-success.svelte-106nxdf{background-color:var(--fds-system-success)}.info-badge.severity-caution.svelte-106nxdf{background-color:var(--fds-system-caution)}.info-badge.severity-critical.svelte-106nxdf{background-color:var(--fds-system-critical)}.info-badge.severity-information.svelte-106nxdf{background-color:var(--fds-system-solid-neutral)}.info-badge.svelte-106nxdf svg{fill:currentColor;block-size:8px;inline-size:8px}",
      map: null
    };
    InfoBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["severity", "class", "element"]);
      let { severity = "attention" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      const svgProps = {
        "aria-hidden": true,
        xmlns: "http://www.w3.org/2000/svg"
      };
      if ($$props.severity === void 0 && $$bindings.severity && severity !== void 0)
        $$bindings.severity(severity);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$16);
      return `
<span${spread([
        {
          class: "info-badge severity-" + escape(severity) + " " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-106nxdf" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : `
		${severity === "attention" ? `<svg${spread([escape_object(svgProps), { viewBox: "162 118 701 789" }], { classes: "svelte-106nxdf" })}><path fill="${"currentColor"}" d="${"M862.5,680C862.5,687.333 861.083,694.25 858.25,700.75C855.417,707.25 851.583,712.917 846.75,717.75C841.917,722.583 836.25,726.417 829.75,729.25C823.25,732.083 816.333,733.5 809,733.5C800,733.5 791.333,731.167 783,726.5L565.5,603.5L565.5,853.5C565.5,860.833 564.083,867.75 561.25,874.25C558.417,880.75 554.583,886.333 549.75,891C544.917,895.667 539.25,899.417 532.75,902.25C526.25,905.083 519.333,906.5 512,906.5C504.667,906.5 497.75,905.083 491.25,902.25C484.75,899.417 479.083,895.667 474.25,891C469.417,886.333 465.583,880.75 462.75,874.25C459.917,867.75 458.5,860.833 458.5,853.5L458.5,603.5L241,726.5C232.667,731.167 224,733.5 215,733.5C207.667,733.5 200.75,732.083 194.25,729.25C187.75,726.417 182.083,722.583 177.25,717.75C172.417,712.917 168.583,707.25 165.75,700.75C162.917,694.25 161.5,687.333 161.5,680C161.5,670.667 164,661.75 169,653.25C174,644.75 180.5,638.167 188.5,633.5L403.5,512L188.5,390.5C180.5,385.833 174,379.25 169,370.75C164,362.25 161.5,353.333 161.5,344C161.5,336.667 162.917,329.75 165.75,323.25C168.583,316.75 172.417,311.083 177.25,306.25C182.083,301.417 187.75,297.583 194.25,294.75C200.75,291.917 207.667,290.5 215,290.5C224.667,290.5 233.333,292.833 241,297.5L458.5,420.5L458.5,170.5C458.5,163.167 459.917,156.25 462.75,149.75C465.583,143.25 469.417,137.667 474.25,133C479.083,128.333 484.75,124.583 491.25,121.75C497.75,118.917 504.667,117.5 512,117.5C519.333,117.5 526.25,118.917 532.75,121.75C539.25,124.583 544.917,128.333 549.75,133C554.583,137.667 558.417,143.25 561.25,149.75C564.083,156.25 565.5,163.167 565.5,170.5L565.5,420.5L783,297.5C791.333,292.833 800,290.5 809,290.5C816.333,290.5 823.25,291.917 829.75,294.75C836.25,297.583 841.917,301.417 846.75,306.25C851.583,311.083 855.417,316.75 858.25,323.25C861.083,329.75 862.5,336.667 862.5,344C862.5,353.333 860,362.25 855,370.75C850,379.25 843.5,385.833 835.5,390.5L620.5,512L835.5,633.5C843.5,638.167 850,644.75 855,653.25C860,661.75 862.5,670.667 862.5,680Z"}"></path></svg>` : `${severity === "success" ? `<svg${spread([escape_object(svgProps), { viewBox: "118 245 790 577" }], { classes: "svelte-106nxdf" })}><path fill="${"currentColor"}" d="${"M117.5,554.5C117.5,547.167 118.917,540.25 121.75,533.75C124.583,527.25 128.417,521.583 133.25,516.75C138.083,511.917 143.75,508.083 150.25,505.25C156.75,502.417 163.667,501 171,501C185.333,501 197.833,506.333 208.5,517L384,692.5L815.5,261C826.167,250.333 838.833,245 853.5,245C860.833,245 867.75,246.417 874.25,249.25C880.75,252.083 886.417,256 891.25,261C896.083,266 899.917,271.75 902.75,278.25C905.583,284.75 907,291.5 907,298.5C907,313.167 901.667,325.833 891,336.5L421.5,805.5C416.5,810.5 410.75,814.417 404.25,817.25C397.75,820.083 391,821.5 384,821.5C369.667,821.5 357.167,816.167 346.5,805.5L133,592.5C122.667,582.167 117.5,569.5 117.5,554.5Z"}"></path></svg>` : `${severity === "caution" ? `<svg${spread([escape_object(svgProps), { viewBox: "406 86 213 875" }], { classes: "svelte-106nxdf" })}><path fill="${"currentColor"}" d="${"M426.5,512L426.5,170.5C426.5,158.833 428.75,147.833 433.25,137.5C437.75,127.167 443.917,118.167 451.75,110.5C459.583,102.833 468.667,96.75 479,92.25C489.333,87.75 500.333,85.5 512,85.5C523.667,85.5 534.667,87.75 545,92.25C555.333,96.75 564.417,102.833 572.25,110.5C580.083,118.167 586.25,127.167 590.75,137.5C595.25,147.833 597.5,158.833 597.5,170.5L597.5,512C597.5,523.667 595.25,534.667 590.75,545C586.25,555.333 580.083,564.417 572.25,572.25C564.417,580.083 555.333,586.25 545,590.75C534.667,595.25 523.667,597.5 512,597.5C500.333,597.5 489.333,595.25 479,590.75C468.667,586.25 459.583,580.083 451.75,572.25C443.917,564.417 437.75,555.333 433.25,545C428.75,534.667 426.5,523.667 426.5,512ZM405.5,853.5C405.5,838.833 408.333,825 414,812C419.667,799 427.333,787.667 437,778C446.667,768.333 457.917,760.667 470.75,755C483.583,749.333 497.333,746.5 512,746.5C526.667,746.5 540.417,749.333 553.25,755C566.083,760.667 577.333,768.333 587,778C596.667,787.667 604.333,799 610,812C615.667,825 618.5,838.833 618.5,853.5C618.5,868.167 615.667,881.917 610,894.75C604.333,907.583 596.667,918.833 587,928.5C577.333,938.167 566,945.833 553,951.5C540,957.167 526.333,960 512,960C497.333,960 483.583,957.167 470.75,951.5C457.917,945.833 446.667,938.167 437,928.5C427.333,918.833 419.667,907.583 414,894.75C408.333,881.917 405.5,868.167 405.5,853.5Z"}"></path></svg>` : `${severity === "critical" ? `<svg${spread([escape_object(svgProps), { viewBox: "172 171 683 683" }], { classes: "svelte-106nxdf" })}><path fill="${"currentColor"}" d="${"M512.5,587.5L262.5,838C252.167,848.333 239.5,853.5 224.5,853.5C209.5,853.5 196.917,848.417 186.75,838.25C176.583,828.083 171.5,815.5 171.5,800.5C171.5,785.5 176.667,772.833 187,762.5L437,512L187,262C176.667,251.667 171.5,239.167 171.5,224.5C171.5,217.167 172.833,210.167 175.5,203.5C178.167,196.833 181.917,191.167 186.75,186.5C191.583,181.833 197.167,178.083 203.5,175.25C209.833,172.417 216.833,171 224.5,171C239.167,171 251.667,176.167 262,186.5L512.5,437L762.5,186.5C773.167,175.833 785.833,170.5 800.5,170.5C807.833,170.5 814.75,171.917 821.25,174.75C827.75,177.583 833.417,181.417 838.25,186.25C843.083,191.083 846.833,196.75 849.5,203.25C852.167,209.75 853.5,216.667 853.5,224C853.5,238.667 848.333,251.167 838,261.5L587.5,512L838,762.5C848.667,773.167 854,785.833 854,800.5C854,807.833 852.583,814.667 849.75,821C846.917,827.333 843.083,832.917 838.25,837.75C833.417,842.583 827.75,846.417 821.25,849.25C814.75,852.083 807.833,853.5 800.5,853.5C785.5,853.5 772.833,848.333 762.5,838Z"}"></path></svg>` : `${severity === "information" ? `<svg${spread([escape_object(svgProps), { viewBox: "406 64 213 875" }], { classes: "svelte-106nxdf" })}><path fill="${"currentColor"}" d="${"M405.5,170.5C405.5,156.167 408.333,142.5 414,129.5C419.667,116.5 427.333,105.167 437,95.5C446.667,85.8334 457.917,78.1667 470.75,72.5C483.583,66.8334 497.333,64.0001 512,64C526.333,64.0001 540,66.8334 553,72.5C566,78.1667 577.333,85.8334 587,95.5C596.667,105.167 604.333,116.5 610,129.5C615.667,142.5 618.5,156.167 618.5,170.5C618.5,185.167 615.667,199 610,212C604.333,225 596.667,236.333 587,246C577.333,255.667 566.083,263.333 553.25,269C540.417,274.667 526.667,277.5 512,277.5C497.333,277.5 483.583,274.667 470.75,269C457.917,263.333 446.667,255.667 437,246C427.333,236.333 419.667,225 414,212C408.333,199 405.5,185.167 405.5,170.5ZM426.5,853.5L426.5,512C426.5,500.333 428.75,489.333 433.25,479C437.75,468.667 443.917,459.583 451.75,451.75C459.583,443.917 468.667,437.75 479,433.25C489.333,428.75 500.333,426.5 512,426.5C523.667,426.5 534.667,428.75 545,433.25C555.333,437.75 564.417,443.917 572.25,451.75C580.083,459.583 586.25,468.667 590.75,479C595.25,489.333 597.5,500.333 597.5,512L597.5,853.5C597.5,865.167 595.25,876.167 590.75,886.5C586.25,896.833 580.083,905.833 572.25,913.5C564.417,921.167 555.333,927.25 545,931.75C534.667,936.25 523.667,938.5 512,938.5C500.333,938.5 489.333,936.25 479,931.75C468.667,927.25 459.583,921.167 451.75,913.5C443.917,905.833 437.75,896.833 433.25,886.5C428.75,876.167 426.5,865.167 426.5,853.5Z"}"></path></svg>` : ``}`}`}`}`}
	`}
</span>`;
    });
    css17 = {
      code: ".info-bar.svelte-fp4fp6.svelte-fp4fp6{-webkit-padding-start:15px;align-items:center;background-clip:padding-box;border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);box-sizing:border-box;display:flex;font-family:var(--fds-font-family-text);min-block-size:48px;padding-inline-start:15px;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.info-bar.severity-information.svelte-fp4fp6.svelte-fp4fp6{background-color:var(--fds-card-background-secondary)}.info-bar.severity-success.svelte-fp4fp6.svelte-fp4fp6{background-color:var(--fds-system-background-success)}.info-bar.severity-caution.svelte-fp4fp6.svelte-fp4fp6{background-color:var(--fds-system-background-caution)}.info-bar.severity-critical.svelte-fp4fp6.svelte-fp4fp6{background-color:var(--fds-system-background-critical)}.info-bar.severity-attention.svelte-fp4fp6.svelte-fp4fp6{background-color:var(--fds-system-background-attention)}.info-bar-icon.svelte-fp4fp6.svelte-fp4fp6{-webkit-margin-before:16px;align-self:flex-start;display:flex;flex:0 0 auto;margin-block-start:16px}.info-bar-content.svelte-fp4fp6.svelte-fp4fp6{-webkit-margin-start:13px;-webkit-margin-before:7px;-webkit-margin-after:7px;align-items:center;box-sizing:border-box;display:flex;flex:1 1 auto;flex-wrap:wrap;margin-block-end:7px;margin-block-start:7px;margin-inline-start:13px;position:relative}.info-bar-content.action-wrapped.svelte-fp4fp6.svelte-fp4fp6,.info-bar-content.message-wrapped.svelte-fp4fp6.svelte-fp4fp6{-webkit-margin-before:13px;-webkit-margin-after:15px;margin-block-end:15px;margin-block-start:13px}.info-bar-content.message-wrapped.svelte-fp4fp6 h5.svelte-fp4fp6,.info-bar-content.message-wrapped.svelte-fp4fp6 p.svelte-fp4fp6{align-self:flex-start}.info-bar-content.message-wrapped.svelte-fp4fp6 .info-bar-action.svelte-fp4fp6{-webkit-margin-end:50%;margin-inline-end:50%}.info-bar-content.action-wrapped.svelte-fp4fp6 .info-bar-action.svelte-fp4fp6{-webkit-padding-before:16px;padding-block-start:16px}.info-bar.svelte-fp4fp6 h5.svelte-fp4fp6,.info-bar.svelte-fp4fp6 p.svelte-fp4fp6{color:var(--fds-text-primary);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;margin:0}.info-bar.svelte-fp4fp6 h5.svelte-fp4fp6{-webkit-margin-end:12px;font-weight:600;margin-inline-end:12px}.info-bar.svelte-fp4fp6 p.svelte-fp4fp6{-webkit-margin-end:15px;flex:1 1 auto;margin-inline-end:15px}.info-bar-action.svelte-fp4fp6.svelte-fp4fp6{-webkit-margin-end:4px;margin-inline-end:4px}.info-bar-action.svelte-fp4fp6.svelte-fp4fp6,.info-bar-close-button.svelte-fp4fp6.svelte-fp4fp6{align-items:center;align-self:flex-start;display:flex}.info-bar-close-button.svelte-fp4fp6.svelte-fp4fp6{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--fds-subtle-fill-transparent);block-size:38px;border:none;border-radius:var(--fds-control-corner-radius);color:var(--fds-text-primary);flex:0 0 auto;inline-size:38px;justify-content:center;margin:4px;outline:none;transition:var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.info-bar-close-button.svelte-fp4fp6.svelte-fp4fp6:focus-visible{box-shadow:var(--fds-focus-stroke)}.info-bar-close-button.svelte-fp4fp6.svelte-fp4fp6:hover{background-color:var(--fds-subtle-fill-secondary)}.info-bar-close-button.svelte-fp4fp6.svelte-fp4fp6:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.info-bar-close-button.svelte-fp4fp6 svg.svelte-fp4fp6{fill:currentColor;block-size:12px;inline-size:12px}",
      map: null
    };
    InfoBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let actionWrapped;
      let messageWrapped;
      let $$restProps = compute_rest_props($$props, [
        "open",
        "closable",
        "severity",
        "title",
        "message",
        "class",
        "element",
        "titleElement",
        "messageElement",
        "actionElement",
        "closeButtonElement"
      ]);
      let $$slots = compute_slots(slots);
      let { open = true } = $$props;
      let { closable = true } = $$props;
      let { severity = "information" } = $$props;
      let { title = "" } = $$props;
      let { message = "" } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { titleElement = null } = $$props;
      let { messageElement = null } = $$props;
      let { actionElement = null } = $$props;
      let { closeButtonElement = null } = $$props;
      let clientHeight = 0;
      const dispatch = createEventDispatcher();
      createEventForwarder(get_current_component());
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
        $$bindings.closable(closable);
      if ($$props.severity === void 0 && $$bindings.severity && severity !== void 0)
        $$bindings.severity(severity);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.message === void 0 && $$bindings.message && message !== void 0)
        $$bindings.message(message);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.titleElement === void 0 && $$bindings.titleElement && titleElement !== void 0)
        $$bindings.titleElement(titleElement);
      if ($$props.messageElement === void 0 && $$bindings.messageElement && messageElement !== void 0)
        $$bindings.messageElement(messageElement);
      if ($$props.actionElement === void 0 && $$bindings.actionElement && actionElement !== void 0)
        $$bindings.actionElement(actionElement);
      if ($$props.closeButtonElement === void 0 && $$bindings.closeButtonElement && closeButtonElement !== void 0)
        $$bindings.closeButtonElement(closeButtonElement);
      $$result.css.add(css17);
      actionWrapped = clientHeight;
      messageWrapped = clientHeight;
      {
        if (open) {
          dispatch("open");
        } else {
          dispatch("close");
        }
      }
      return `
${open ? `<div${spread([
        {
          class: "info-bar severity-" + escape(severity) + " " + escape(className)
        },
        { role: "alert" },
        escape_object($$restProps)
      ], { classes: "svelte-fp4fp6" })}${add_attribute("this", element, 0)}><div class="${"info-bar-icon svelte-fp4fp6"}">${slots.icon ? slots.icon({}) : `
				${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity }, {}, {})}
			`}</div>
		<div class="${[
        "info-bar-content svelte-fp4fp6",
        " " + ($$slots.action ? "action-visible" : "") + " " + (actionWrapped ? "action-wrapped" : "") + " " + (messageWrapped ? "message-wrapped" : "")
      ].join(" ").trim()}">${title ? `<h5 class="${"svelte-fp4fp6"}"${add_attribute("this", titleElement, 0)}>${escape(title)}</h5>` : ``}
			${message || $$slots.default ? `<p class="${"svelte-fp4fp6"}"${add_attribute("this", messageElement, 0)}>${escape(message)}
					${slots.default ? slots.default({}) : ``}</p>` : ``}
			${$$slots.action ? `<div class="${"info-bar-action svelte-fp4fp6"}"${add_attribute("this", actionElement, 0)}>${slots.action ? slots.action({}) : ``}</div>` : ``}</div>
		${closable ? `<button class="${"info-bar-close-button svelte-fp4fp6"}" type="${"button"}" aria-label="${"Close"}"${add_attribute("this", closeButtonElement, 0)}><svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 1024 1024"}" class="${"svelte-fp4fp6"}"><path fill="${"currentColor"}" d="${"M512,584.5L87.5,1009C77.5,1019 65.5,1024 51.5,1024C36.8333,1024 24.5833,1019.08 14.75,1009.25C4.91667,999.417 0,987.167 0,972.5C0,958.5 5,946.5 15,936.5L439.5,512L15,87.5C5,77.5 0,65.3334 0,51C0,44 1.33333,37.3334 4,31C6.66667,24.6667 10.3333,19.25 15,14.75C19.6667,10.25 25.1667,6.66669 31.5,4C37.8333,1.33337 44.5,0 51.5,0C65.5,0 77.5,5 87.5,15L512,439.5L936.5,15C946.5,5 958.667,0 973,0C980,0 986.583,1.33337 992.75,4C998.917,6.66669 1004.33,10.3334 1009,15C1013.67,19.6667 1017.33,25.0834 1020,31.25C1022.67,37.4167 1024,44 1024,51C1024,65.3334 1019,77.5 1009,87.5L584.5,512L1009,936.5C1019,946.5 1024,958.5 1024,972.5C1024,979.5 1022.67,986.167 1020,992.5C1017.33,998.833 1013.75,1004.33 1009.25,1009C1004.75,1013.67 999.333,1017.33 993,1020C986.667,1022.67 980,1024 973,1024C958.667,1024 946.5,1019 936.5,1009Z"}"></path></svg></button>` : ``}</div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/index.md.js
var index_md_exports = {};
__export(index_md_exports, {
  default: () => Docs
});
var Docs;
var init_index_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/index.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    Docs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>Willkommen bei den Handyempfehlungen! Das ist Text im <code>Standardformat</code>.
Hier habe ich ausf\xFChrlich meine aktuellen Smartphone-Favoriten aufgelistet, sowie deren St\xE4rken und Schw\xE4chen. Wer direkt zur Zusammenfassung will, einfach <a href="${"#Fazit"}">hier</a> klicken.</p>
<h3 id="${"handys"}">Handys</h3>
<p>Da w\xE4ren</p>
<ul><li><p>das <a href="${"https://www.poco.net/global/poco-f2-pro/specs/"}" rel="${"nofollow"}">(Xiaomi) <strong>Poco F2 Pro</strong></a> [absoluter <strong>Flaggschiff-Killer</strong> f\xFCr 500\u20AC; \xE4hnliche Merkmale wie Mi 10; Klon des Redmi K30 Pro] - <strong>aktuell ganz klare Kaufempfehlung!</strong></p></li>
<li><p>das <a href="${"https://www.mi.com/de/mi-10/specs/"}" rel="${"nofollow"}"><strong>Xiaomi Mi 10 / Mi 10 Pro</strong></a> [sehr teuer; absolute Top-Spezifikationen, sprich schnellen Speicher (UFS 3.0), schneller Prozessor (SD 865), 108 MP Frontkamera]</p></li></ul>
<p>-&gt; Vergleich Editionen: <a href="${"https://www.gsmarena.com/compare.php3?idPhone1=10082&idPhone2=10055#diff-"}" rel="${"nofollow"}">https://www.gsmarena.com/compare.php3?idPhone1=10082&amp;idPhone2=10055#diff-</a></p>
<br>
<ul><li>das <a href="${"https://www.mi.com/de/mi-note-10/specs/"}" rel="${"nofollow"}"><strong>Xiaomi Mi Note 10 / Note 10 Pro</strong></a> [beide: obere Mittelklasse mit 108 MP; Note 10 Pro: mehr Arbeitsspeicher (RAM) + Speicher]</li></ul>
<p>-&gt; Vergleich Editionen: <a href="${"https://www.gsmarena.com/compare.php3?&idPhone1=9936&idPhone2=9945&idPhone3=10183#diff-"}" rel="${"nofollow"}">https://www.gsmarena.com/compare.php3?&amp;idPhone1=9936&amp;idPhone2=9945&amp;idPhone3=10183#diff-</a></p>
<br>
<ul><li>das <a href="${"https://www.mi.com/de/redmi-note-9s/specs/"}" rel="${"nofollow"}">(Xiaomi) <strong>Redmi Note 9 [Low-End] / Note 9S [Mittelklasse] / Note 9 Pro [oberste Mittelklasse]</strong></a></li></ul>
<p>-&gt; Vergleich Editionen: <a href="${"https://www.gsmarena.com/compare.php3?idPhone1=10217&idPhone2=10147&idPhone3=10192#diff-"}" rel="${"nofollow"}">https://www.gsmarena.com/compare.php3?idPhone1=10217&amp;idPhone2=10147&amp;idPhone3=10192#diff-</a></p>
<br>
<ul><li>das <a href="${"https://www.oneplus.com/de/8/specs"}" rel="${"nofollow"}"><strong>OnePlus 7T, 8 / 8 Pro</strong></a> [7T: \xE4ltere Gen., Prozessor (SD 855+, Preis-Leistung besser)]</li></ul>
<p>-&gt; Vergleich Editionen: <a href="${"https://www.gsmarena.com/compare.php3?&idPhone1=9816&idPhone2=10161&idPhone3=9919#diff-"}" rel="${"nofollow"}">https://www.gsmarena.com/compare.php3?&amp;idPhone1=9816&amp;idPhone2=10161&amp;idPhone3=9919#diff-</a></p>
<br>
<ul><li>das <a href="${"https://store.google.com/product/pixel_4_specs"}" rel="${"nofollow"}"><strong>Google Pixel 4 / Pixel 4 XL</strong></a> [f\xFCr ~500\u20AC, immer mal wieder f\xFCr 450\u20AC; beide: \xE4lterer Prozessor (SD 855); XL: gr\xF6\xDFeres Display + Akku]</li></ul>
<h4 id="${"meine-favoriten--mi-10-oneplus-8-pixel-4-im-vergleich"}">Meine Favoriten  (Mi 10, OnePlus 8, Pixel 4) im Vergleich</h4>
<p><a href="${"https://www.gsmarena.com/compare.php3?idPhone1=10082&idPhone2=10161&idPhone3="}" rel="${"nofollow"}">https://www.gsmarena.com/compare.php3?idPhone1=10082&amp;idPhone2=10161&amp;idPhone3=9896#diff-</a></p>
<h3 id="${"prozessoren"}">Prozessoren</h3>
<p>MediaTek: Prozessoren von Low-End bis Mittelklasse-Ger\xE4ten, eher langsam, keine direkte Empfehlung
Qualcomm Snapdragon 6XX, 7XX: Prozessoren der Mittelklasse bzw. oberen Mittelklasse
Qualcomm Snapdragon 855 (Ende 2018), 855+ (Mitte 2019), 865 (Ende 2019): High-End-Prozessoren</p>
<h3 id="${"kameras"}">Kameras</h3>
<p><strong>Es gilt: Megapixel sind nicht alles, aber vieles!</strong></p>
<p>Ein gutes Foto-Smartphone sollte haben:</p>
<ul><li><p>Eine gute Kamera-Software (auch im Low-Light): Hier f\xFChrt Google mir der Google Kamera, die sich aber v.a. bei Xiaomi-Smartphones leicht nachinstallieren l\xE4sst</p></li>
<li><p>Mindestens einen SD 7XX, bei 108 MP meiner Meinung nach mindestens einen 8XX, vor allem f\xFCr 8K, fl\xFCssiges 4K und eine schnelle Verarbeitungszeit</p></li>
<li><p>Ein gutes Kameramodul: 64 MP (dann aber ein sehr gutes) oder 108MP, dann aber mit entsprechender Hardware (sprich weniger das Mi Note 10, da es einen SD 730G hat)
Ausnahme:  <strong>Pixel 4</strong>, hier holt die Software alles der \u201Cnur\u201D 16 MP heraus</p></li></ul>
<h3 id="${"display"}">Display</h3>
<ul><li><p>Full-HD (1080p) sollte ausreichen, 2K oder 4K sind besser; \u201CNur-HD\u201D (720p) sollte vermieden werden, genauso wie geringe Pixeldichten</p></li>
<li><p>OLED/AMOLED ist die \u201Cbessere\u201D aber auch die teurere Displaytechnologie im Vergleich zu LCD - die Schwarzwerte sind besser, Farben werden nat\xFCrlicher wiedergegeben und sie sind energiesparender als LC-Displays</p></li>
<li><p>Bildwiederholungsrate: Bei Mittelklasse-Ger\xE4ten reicht 60Hz (normal), wer aber einmal ein 90Hz-Display in der Hand gehabt hat, der m\xF6chte nicht mehr auf ein \u201Cruckeligeres\u201D Nutzererlebnis zur\xFCck wechseln - Im High-End-Segment gilt: 90Hz und 120Hz sind fast schon Standard, da h\xF6here Wiederholungsraten aber auch mehr Akku kosten, schaltet die Software nur nach Bedarf auf h\xF6here Wiederholungsraten</p></li></ul>
<h3 id="${"speichergeschwindigkeit"}">Speichergeschwindigkeit</h3>
<p>Die Speichergeschwindigkeit wird oftmals vergessen, ist aber ebenfalls sehr wichtig beim Performance-Vergleich:
Es gibt UFS 2.X und 3.X wobei der gro\xDFe Versionssprung einen erheblichen Geschwindigkeits-Boost bringt.</p>
<a name="${"Fazit"}"></a>
<h3 id="${"fazit"}">Fazit</h3>
<p><strong>Wem 64 MP und 60Hz reichen</strong> und trotzdem topaktuelle Hardware zu einem gigantischen Preis haben m\xF6chte, ist hier perfekt bedient mit dem <strong>Poco F2 Pro</strong>. Es besitzt den aktuellsten Qualcomm-Prozessor, schnellen RAM und Speicher (LPDDR5 und UFS 3.1, allerdings nur in der 8GB + 256GB-Variante) und einen sehr aktuellen Fotosensor. Ansonsten besitzt es einen sehr gro\xDFen Speicher, ein neuartiges K\xFChlungssystem, einen Klinkenanschluss und sogar NFC, ein AMOLED-Panel, 5G was f\xFCr diese Preisklasse beinahe einmalig ist. Daher der <strong>Flaggschiff-Killer 2020</strong> schlechthin.</p>
<p><strong>Wer bereit ist, viel Geld auszugeben</strong>, bekommt mit dem  <strong>Mi 10 (Pro)</strong>  auch  <strong>sehr viel zur\xFCck</strong>  - topaktuelle Spezifikationen und durch das Nachinstallieren der Google Kamera auch im Low Light prima Fotos und Videos auch 8K). Allerdings ist zu beachten, das hier eine stark von Xiaomi angepasste Version von Android l\xE4uft (MIUI), welche aber beinahe genauso schnell Updates wie die Pixel-Smartphones, welche direkt von Google kommen, erhalten.</p>
<p><strong>Wer eher einen guten Mix aus aktueller Hardware und fast-Original-Android</strong>  w\xFCnscht, der macht mit dem  <strong>OnePlus 8 (Pro)</strong>  nichts falsch. Die 48MP-Kamera macht fast so gigantische Aufnahmen wie die des Mi 10, weil OnePlus ab Werk eine relativ gute Kamera-App mitliefert, welche aber auch im Low-Light ihre Schw\xE4chen zeigt (ausf\xFChrlicher Testbericht (8 Pro): <a href="${"https://www.gsmarena.com/oneplus_8_pro_review-review-2106.php"}" rel="${"nofollow"}">https://www.gsmarena.com/oneplus_8_pro_review-review-2106.php</a>), wobei die Pro-Version eine noch h\xF6here Wiederholungsrate bietet und damit ein noch fl\xFCssigeres Nutzungserlebnis.</p>
<p><strong>Wer sehen m\xF6chte, dass die Software</strong>  beinahe schon wichtiger als Megapixel ist, zeigt das  <strong>Google Pixel 4 (XL)</strong>  - sehr sch\xF6ne Aufnahmen mit guter Low-Light-Performance, daf\xFCr 4K nur bei 30 Bildern pro Sekunde, einem etwas altem Prozessor und langsamerem Speicher (UFS 2.0), daf\xFCr sitzt man Softwaretechnisch quasi \u201Can der Quelle\u201D und bekommt als erstes Android-Versions -und Sicherheitsupdates direkt von Google. Allerdings ist das Smartphone nur bei einem Preis von 450-500\u20AC zu empfehlen, damit das Preis-Leistungsverh\xE4ltnis stimmt, da der Akku und sonstige Hardwareeigenschaften zu w\xFCnschen \xFCbrig lassen, ganz anders die Software.</p>
<p><strong>Wer gute Mittelklasse-Smartphones</strong>  sucht, ist mit dem <strong>Mi Note 10 (Pro) und dem Redmi Note 9S / Pro</strong> sehr gut bedient, wobei letzteres brandneu ist und noch nicht verf\xFCgbar ist. Beim Mi Note 10 hat man Kameratechnisch High-End-Hardware, allerdings ist der Prozessor \u201Cnur\u201D ein Prozessor der oberen Mittelklasse, d.h. im 108MP-Kameramodus muss man m\xF6glicherweise l\xE4ngere Ladezeiten in Kauf nehmen. Preis-Leistungstechnisch sind die Redmis die bessere Wahl, wenn man keine High-End-Hardware w\xFCnscht.</p>
<p><strong>Wer die beste Hardware zum besten Preis mit (noch) schlechter Software</strong>  w\xFCnscht, wird mit dem  <strong><a href="${"https://eu.redmagic.gg/pages/redmagic-5g-specs"}" rel="${"nofollow"}">ZTE nubia Red Magic 5G</a> (Gaming-Smartphone)</strong>  zufrieden - Preis-Leistungstechnisch ein absoluter Knaller, 144Hz, 64 MP und 5G f\xFCr ~550\u20AC, wenn da nicht die teilweise unvollst\xE4ndig \xFCbersetzte Software mit einer nur \u201Cakzeptablen\u201D Kamera-App w\xE4re - hier sollte nubia bzw. ZTE dringend per Update nachpatchen (Testbericht: <a href="${"https://www.gsmarena.com/nubia_red_magic_5g-review-2092.php"}" rel="${"nofollow"}">https://www.gsmarena.com/nubia_red_magic_5g-review-2092.php</a>).</p>
<p><strong>Ansonsten</strong>  gibt es noch das Realme X50 Pro und das OPPO Find X2 Pro, sie geh\xF6ren wie OnePlus und vivo zum BBK-Konzern und sind ebenalls aktuelle Flagschiffe. Mit diesen aber auch anderen Ger\xE4ten wie zum Beispiel der Marke Samsung oder LG habe ich aber zu wenig Erfahrung, weswegen ich sie hier nicht liste.</p>


<p><strong>Angek\xFCndigt</strong> ist das neue Smartphone-Lineup von Nokia; Google wird Anfang Juni sein neues Mittelklasse-Smartphone, das Pixel 4a vorstellen, was, wenn sich die Preise beruhigt haben, ein solides Mittelklasse-Smartphone werden wird.</p>
<p>Ich hoffe, ich konnte hiermit ein bisschen Klarheit bringen, meiner Meinung nach sollte man aber bei High-End-Ger\xE4ten nicht von den Preisen zur\xFCckschrecken, da man hier sehr viel geboten bekommt (ggfs. einfach auf ein passendes Angebot warten).
Als Zweithandy ist ein Handy der (oberen) Mittelklasse sicherlich keine schlechte Wahl, doch sollten hier die Erwartungen nicht besonders hoch sein.
Letzten Endes muss jeder f\xFCr sich entscheiden, was er Preis-/Hardware-/ und Softwaretechnisch will.</p>
${validate_component(InfoBar, "InfoBar").$$render($$result, {
        severity: "caution",
        title: "Achtung",
        message: "Kaufe niemals ein Smartphone mit einem Tarif, wenn dieser nicht gerade zu einem Super-Aktionspreis in einem guten Mobilnetz zu haben ist - Ansonsten wird man oftmals \xFCber den Tisch gezogen und zahlt am Ende mehr als die UVP des Herstellers!"
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css18,
  entry: () => entry5,
  js: () => js5,
  module: () => index_md_exports
});
var entry5, js5, css18;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_md();
    entry5 = "pages/docs/index.md-32f37ff2.js";
    js5 = ["pages/docs/index.md-32f37ff2.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/InfoBar-c9f740b0.js"];
    css18 = ["assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/getting-started.md.js
var getting_started_md_exports = {};
__export(getting_started_md_exports, {
  default: () => Getting_started
});
var import_panzoom4, css19, Getting_started;
var init_getting_started_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/getting-started.md.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    init_CopyBox_1ee6d65d();
    import_panzoom4 = __toModule(require_panzoom());
    init_TextBoxButton_fef51e87();
    css19 = {
      code: "h3.svelte-dqkg8w{-webkit-margin-before:72px!important;margin-block-start:72px!important}label.svelte-dqkg8w{font-weight:600}",
      map: null
    };
    Getting_started = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css19);
      return `<p>This page will guide you through the process of adding fluent-svelte to your existing Svelte project. If you don\u2019t have a Svelte or SvelteKit project already, you can create one using <a href="${"https://svelte.dev/blog/the-easiest-way-to-get-started"}" rel="${"nofollow"}">this guide</a>.</p>
${validate_component(InfoBar, "InfoBar").$$render($$result, {
        severity: "attention",
        title: "Before We Start",
        message: "This tutorial assumes you have basic knowledge of Svelte."
      }, {}, {
        action: () => {
          return `${validate_component(Button, "Button").$$render($$result, { slot: "action", variant: "accent" }, {}, {
            default: () => {
              return `Learn Svelte
    `;
            }
          })}`;
        }
      })}
<h3 id="${"step-1-install-the-library"}" class="${"svelte-dqkg8w"}">Step 1: Install the Library</h3>
<p>This will install fluent-svelte and it\u2019s required dependencies. This can be done using a package manager of your choice.</p>
<label class="${"svelte-dqkg8w"}">npm
    ${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "npm i --save-dev fluent-svelte" }, {}, {})}</label>
<label class="${"svelte-dqkg8w"}">pnpm
    ${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "pnpm i --save-dev fluent-svelte" }, {}, {})}</label>
<label class="${"svelte-dqkg8w"}">yarn
    ${validate_component(CopyBox, "CopyBox").$$render($$result, { value: "yarn add --dev fluent-svelte" }, {}, {})}</label>
<h3 id="${"step-2-add-theme-file"}" class="${"svelte-dqkg8w"}">Step 2: Add Theme File</h3>
<p>Fluent Svelte components use a set of common resources to style their elements. These values are defined in a theme file that must be imported into your project before components can render properly.</p>
<p><code>src/App.svelte</code> (or <code>src/routes/__layout.svelte</code> if using SvelteKit)</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token string">"fluent-svelte/theme.css"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(InfoBar, "InfoBar").$$render($$result, {
        title: "Bundler Support",
        severity: "caution"
      }, {}, {
        default: () => {
          return `In some cases, your bundler may not have the capability to resolve CSS files. Both the default Svelte template and the SvelteKit starter project (Vite) have this ability, however you might need to install a <a href="${"https://gist.github.com/Tropix126/6306afeffbcc551425d5658b856e8c4c"}" target="${"_blank"}" rel="${"noreferrer noopener"}">dedicated bundler plugin</a> to import CSS.
`;
        }
      })}
<p>Alternatively, you can import the theme file from a CDN (though this generally isn\u2019t recommended).</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"https://unpkg.com/fluent-svelte/theme.css"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
	<span class="token comment">/* ...or @import url("https://cdn.jsdelivr.net/npm/fluent-svelte/theme.css"); */</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"step-3-importing-a-component"}" class="${"svelte-dqkg8w"}">Step 3: Importing a Component</h3>
<p>Components are exported from a single index file in the library. They can be imported and used in your project like so:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button<span class="token punctuation">,</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span><span class="token punctuation">></span></span>Check me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Checkbox</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Alternatively you can import under a namespace:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Fluent <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Fluent.Button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Fluent.Button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Fluent.Checkbox</span><span class="token punctuation">></span></span>Check me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Fluent.Checkbox</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"svelte-repl-usage"}" class="${"svelte-dqkg8w"}">Svelte REPL Usage</h3>
<p><code>fluent-svelte</code> components can also be imported into the <a href="${"https://svelte.dev/repl/"}" rel="${"nofollow"}">Svelte REPL</a>.</p>
<p>In the REPL, packages are automatically installed by name when using an <code>import</code> statement, so the installation step can be skipped. Because the REPL doesn\u2019t support importing CSS in <code>node_modules</code>, we\u2019ll need to import the theme file through a CDN.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button<span class="token punctuation">,</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"https://unpkg.com/fluent-svelte/theme.css"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>

	<span class="token comment">/* Some base styles to get things looking right. */</span>
	<span class="token selector">:global(body)</span> <span class="token punctuation">&#123;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--fds-solid-background-base<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--fds-text-primary<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Button, "Button").$$render($$result, {
        variant: "hyperlink",
        href: "https://svelte.dev/repl/2a30b6d202d24fb6b14783132b86b706",
        target: "_blank",
        rel: "noreferrer noopener"
      }, {}, {
        default: () => {
          return `View this in the REPL`;
        }
      })}`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  css: () => css20,
  entry: () => entry6,
  js: () => js6,
  module: () => getting_started_md_exports
});
var entry6, js6, css20;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_getting_started_md();
    entry6 = "pages/docs/getting-started.md-3d81e4d1.js";
    js6 = ["pages/docs/getting-started.md-3d81e4d1.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/InfoBar-c9f740b0.js", "chunks/CopyBox-4b49697f.js", "chunks/TextBoxButton-cdab09ab.js"];
    css20 = ["assets/pages/docs/getting-started.md-9925ce34.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/ContentDialog-ad82f69b.js
var css21, ContentDialog;
var init_ContentDialog_ad82f69b = __esm({
  ".svelte-kit/output/server/chunks/ContentDialog-ad82f69b.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBlock_b8b64333();
    css21 = {
      code: ".content-dialog.svelte-1szmc6y{-webkit-animation:dialog-inner var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing);animation:dialog-inner var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing);background-clip:padding-box;background-color:var(--fds-solid-background-base);border:1px solid var(--fds-surface-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-dialog-shadow);box-sizing:border-box;max-inline-size:calc(100% - 24px);overflow:hidden;position:fixed}.content-dialog.size-min.svelte-1szmc6y{inline-size:320px}.content-dialog.size-standard.svelte-1szmc6y{inline-size:448px}.content-dialog.size-max.svelte-1szmc6y{inline-size:540px}.content-dialog-smoke.svelte-1szmc6y{align-items:center;block-size:100%;display:flex;flex-direction:column;inline-size:100%;inset-block-start:0;inset-inline-start:0;justify-content:center;position:fixed;z-index:101}.content-dialog-smoke.darken.svelte-1szmc6y{background-color:var(--fds-smoke-background-default)}.content-dialog.svelte-1szmc6y .content-dialog-title{color:var(--fds-text-primary);display:block;margin-bottom:12px}.content-dialog-body.svelte-1szmc6y,.content-dialog-footer.svelte-1szmc6y{padding:24px}.content-dialog-body.svelte-1szmc6y{background-color:var(--fds-layer-background-default);color:var(--fds-text-primary);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.content-dialog-footer.svelte-1szmc6y{grid-gap:8px;-webkit-border-before:1px solid var(--fds-card-stroke-default);border-block-start:1px solid var(--fds-card-stroke-default);display:grid;grid-auto-flow:column;grid-auto-rows:1fr;white-space:nowrap}.content-dialog-footer.svelte-1szmc6y>.button:only-child{inline-size:50%;justify-self:end}",
      map: null
    };
    ContentDialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "open",
        "title",
        "size",
        "closable",
        "append",
        "darken",
        "trapFocus",
        "class",
        "element",
        "backdropElement",
        "bodyElement",
        "footerElement"
      ]);
      let $$slots = compute_slots(slots);
      let { open = false } = $$props;
      let { title = "" } = $$props;
      let { size = "standard" } = $$props;
      let { closable = true } = $$props;
      let { append = void 0 } = $$props;
      let { darken = true } = $$props;
      let { trapFocus = true } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { backdropElement = null } = $$props;
      let { bodyElement = null } = $$props;
      let { footerElement = null } = $$props;
      createEventForwarder(get_current_component(), ["open", "close"]);
      const dispatch = createEventDispatcher();
      const titleId = uid("fds-dialog-title-");
      const bodyId = uid("fds-dialog-body-");
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
        $$bindings.closable(closable);
      if ($$props.append === void 0 && $$bindings.append && append !== void 0)
        $$bindings.append(append);
      if ($$props.darken === void 0 && $$bindings.darken && darken !== void 0)
        $$bindings.darken(darken);
      if ($$props.trapFocus === void 0 && $$bindings.trapFocus && trapFocus !== void 0)
        $$bindings.trapFocus(trapFocus);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.backdropElement === void 0 && $$bindings.backdropElement && backdropElement !== void 0)
        $$bindings.backdropElement(backdropElement);
      if ($$props.bodyElement === void 0 && $$bindings.bodyElement && bodyElement !== void 0)
        $$bindings.bodyElement(bodyElement);
      if ($$props.footerElement === void 0 && $$bindings.footerElement && footerElement !== void 0)
        $$bindings.footerElement(footerElement);
      $$result.css.add(css21);
      {
        if (!open)
          dispatch("close");
      }
      return `

${open ? `<div class="${["content-dialog-smoke svelte-1szmc6y", darken ? "darken" : ""].join(" ").trim()}"${add_attribute("this", backdropElement, 0)}><div${spread([
        {
          class: "content-dialog size-" + escape(size) + " " + escape(className)
        },
        { role: "dialog" },
        { "aria-modal": "true" },
        {
          "aria-labelledby": escape_attribute_value(title && titleId)
        },
        {
          "aria-describedby": escape_attribute_value(bodyId)
        },
        escape_object($$restProps)
      ], { classes: "svelte-1szmc6y" })}${add_attribute("this", element, 0)}><div class="${"content-dialog-body svelte-1szmc6y"}"${add_attribute("id", bodyId, 0)}${add_attribute("this", bodyElement, 0)}>${title ? `${validate_component(TextBlock, "TextBlock").$$render($$result, {
        variant: "subtitle",
        class: "content-dialog-title",
        id: titleId
      }, {}, {
        default: () => {
          return `${escape(title)}`;
        }
      })}` : ``}
				${slots.default ? slots.default({}) : ``}</div>
			${$$slots.footer ? `<footer class="${"content-dialog-footer svelte-1szmc6y"}"${add_attribute("this", footerElement, 0)}>${slots.footer ? slots.footer({}) : ``}</footer>` : ``}</div>
		${slots.outer ? slots.outer({}) : ``}</div>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Showcase-4ad8ba4a.js
var import_panzoom5, Edit, css22, Showcase;
var init_Showcase_4ad8ba4a = __esm({
  ".svelte-kit/output/server/chunks/Showcase-4ad8ba4a.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom5 = __toModule(require_panzoom());
    Edit = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.42 2.58a2 2 0 010 2.82l-7.36 7.36c-.32.32-.72.54-1.16.65l-2.28.57a.5.5 0 01-.6-.6l.57-2.28c.1-.44.33-.84.65-1.16l7.36-7.36a2 2 0 012.82 0zM9.89 4.7l-5.94 5.95c-.2.19-.33.43-.4.69l-.37 1.48 1.48-.37c.26-.07.5-.2.7-.4l5.94-5.94L9.9 4.7zm1.41-1.41l-.7.7L12 5.4l.71-.7a1 1 0 00-1.4-1.41z"/></svg>';
    css22 = {
      code: ".component-showcase.svelte-5u2yp0{background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-card-shadow);contain:layout;inline-size:100%;min-block-size:240px;outline:none;overflow:hidden;padding:24px;position:relative;z-index:1}.component-showcase.svelte-5u2yp0:focus-visible{box-shadow:var(--fds-focus-stroke)}.component-showcase-grid.svelte-5u2yp0{grid-gap:12px;display:grid;margin:24px;place-items:center;position:relative}.component-showcase-backdrop.svelte-5u2yp0,.component-showcase-inner.svelte-5u2yp0{align-items:center;block-size:100%;display:flex;inline-size:100%;inset-block-start:0;inset-inline-start:0;justify-content:center;position:absolute}.component-showcase-backdrop.svelte-5u2yp0{block-size:600%;inline-size:600%;transform:translate(-50%,-50%);z-index:-1}.component-showcase-buttons.svelte-5u2yp0{inset-block-end:12px;inset-inline-end:12px;position:absolute}.component-showcase.svelte-5u2yp0 .info-bar{-webkit-margin-after:0;inline-size:100%;margin-block-end:0}",
      map: null
    };
    Showcase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["columns", "columnWidth", "repl", "class"]);
      let { columns = 1 } = $$props;
      let { columnWidth = "1fr" } = $$props;
      let { repl = "" } = $$props;
      let { class: className = "" } = $$props;
      if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
        $$bindings.columns(columns);
      if ($$props.columnWidth === void 0 && $$bindings.columnWidth && columnWidth !== void 0)
        $$bindings.columnWidth(columnWidth);
      if ($$props.repl === void 0 && $$bindings.repl && repl !== void 0)
        $$bindings.repl(repl);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      $$result.css.add(css22);
      return `<div${spread([
        {
          class: "component-showcase " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-5u2yp0" })}><div class="${"component-showcase-inner svelte-5u2yp0"}"><div class="${"component-showcase-grid svelte-5u2yp0"}" style="${"grid-template-columns: " + escape(`${columnWidth} `.repeat(columns))}">${slots.default ? slots.default({}) : ``}</div>
		<svg class="${"component-showcase-backdrop svelte-5u2yp0"}"><pattern id="${"pattern-14333"}" x="${"5.800038310074086"}" y="${"6.229276141719765"}" width="${"11.17258097342026"}" height="${"11.17258097342026"}" patternUnits="${"userSpaceOnUse"}"><circle cx="${"0.2979354926245403"}" cy="${"0.2979354926245403"}" r="${"0.2979354926245403"}" fill="${"var(--fds-text-disabled)"}"></circle></pattern><rect x="${"0"}" y="${"0"}" width="${"100%"}" height="${"100%"}" fill="${"url(#pattern-14333)"}"></rect></svg></div>
	<div class="${"component-showcase-buttons svelte-5u2yp0"}">${repl ? `${validate_component(TooltipWrapper, "Tooltip").$$render($$result, {
        text: "Edit in Svelte REPL",
        offset: 8,
        placement: "left"
      }, {}, {
        default: () => {
          return `${validate_component(IconButton, "IconButton").$$render($$result, {
            href: "https://svelte.dev/repl/" + repl,
            target: "blank",
            rel: "noreferrer noopener"
          }, {}, {
            default: () => {
              return `<!-- HTML_TAG_START -->${Edit}<!-- HTML_TAG_END -->`;
            }
          })}`;
        }
      })}` : ``}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/APIDocs-156cf58d.js
var css23, APIDocs;
var init_APIDocs_156cf58d = __esm({
  ".svelte-kit/output/server/chunks/APIDocs-156cf58d.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    css23 = {
      code: ".forwarded.svelte-1t9onud{-webkit-margin-end:4px;-webkit-margin-after:4px;display:inline-flex;margin-block-end:4px;margin-inline-end:4px}",
      map: null
    };
    APIDocs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data: data12 } = $$props;
      let { manualForward = false } = $$props;
      const forwardedEvents = data12.events.filter((e2) => e2.type === "forwarded");
      const dispatchedEvents = data12.events.filter((e2) => e2.type === "dispatched");
      if ($$props.data === void 0 && $$bindings.data && data12 !== void 0)
        $$bindings.data(data12);
      if ($$props.manualForward === void 0 && $$bindings.manualForward && manualForward !== void 0)
        $$bindings.manualForward(manualForward);
      $$result.css.add(css23);
      return `API docs automatically generated by <a href="${"https://github.com/carbon-design-system/sveld/"}" target="${"_blank"}" rel="${"noreffer noopener"}">sveld</a>
and
<a href="${"https://github.com/mattjennings/vite-plugin-sveld/"}" target="${"_blank"}" rel="${"noreffer noopener"}">vite-plugin-sveld</a>.

<h3>Props</h3>
${data12.props.length > 0 ? `<table><thead><tr><th>Name</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
		<tbody>${each(data12.props, ({ name, type, value, description }) => {
        return `${!name.startsWith("__") ? `<tr><td>${typeof name !== "undefined" ? `<code>${escape(name)}</code>` : `Unknown`}</td>
						<td>${typeof type !== "undefined" ? `<code>${escape(type)}</code>` : `Unknown`}</td>
						<td><code>${escape(value ?? "undefined")}</code></td>
						<td>${escape(description ?? "None")}</td>
					</tr>` : ``}`;
      })}</tbody></table>` : `None`}

${data12.rest_props ? `${validate_component(InfoBar, "InfoBar").$$render($$result, {
        severity: "information",
        title: "This component uses $$restProps."
      }, {}, {
        action: () => {
          return `${validate_component(Button, "Button").$$render($$result, {
            slot: "action",
            variant: "accent",
            href: "https://svelte.dev/docs#template-syntax-attributes-and-props"
          }, {}, {
            default: () => {
              return `More Info`;
            }
          })}`;
        },
        default: () => {
          return `All unused props will be passed through to the underlying <!-- HTML_TAG_START -->${data12.rest_props.name.includes(" | ") ? new Intl.ListFormat({ style: "short" }).format(data12.rest_props.name.split(" | ").map((name) => `<code>${name}</code>`)) : `<code>${data12.rest_props.name}</code>`}<!-- HTML_TAG_END -->
		${escape(data12.rest_props.type.toLowerCase())}${escape(data12.rest_props.name.includes(" | ") ? "s" : "")} as regular
		attributes.
		`;
        }
      })}` : ``}

<h3>Slots</h3>
${data12.slots.length > 0 ? `<table><thead><tr><th>Name</th><th>Slot Props</th><th>Fallback</th></tr></thead>
		<tbody>${each(data12.slots, ({ name, slot_props, fallback }) => {
        return `<tr><td>${typeof name !== "undefined" ? `<code>${escape(name === "__default__" ? "Unnamed (Default)" : name)}</code>` : `Unknown`}</td>
					<td>${slot_props ? `<code>${escape(slot_props)}</code>` : `None`}</td>
					<td>${typeof fallback !== "undefined" ? `<code>${escape(fallback.substr(0, 300))}</code>${escape(fallback.length > 300 ? "\u2026" : "")}` : `Empty`}</td>
				</tr>`;
      })}</tbody></table>` : `None`}

<h3>Events</h3>
${manualForward ? `<h4>Forwarded Events</h4>
	${forwardedEvents.length > 0 ? `${each(forwardedEvents, ({ name }) => {
        return `<code class="${"forwarded svelte-1t9onud"}"><a href="${"https://developer.mozilla.org/en-US/docs/Web/API/Element/" + escape(name) + "_event"}" target="${"_blank"}" rel="${"noreferrer noopener"}">${escape(name.trim())}</a>
			</code>`;
      })}` : `None`}` : `<p>All DOM events are forwarded to this component&#39;s respective elements by default. <a href="${"#todo"}">Learn More</a></p>`}

<h4>Dispatched Events</h4>
${dispatchedEvents.length > 0 ? `<table><thead><tr><th>Name</th><th>Detail</th></tr></thead>
		<tbody>${each(dispatchedEvents, ({ name, detail }) => {
        return `<tr><td>${typeof name !== "undefined" ? `<code>${escape(name)}</code>` : `Unknown`}</td>
					<td>${typeof detail !== "undefined" ? `<code>${escape(detail)}</code>` : `None`}</td>
				</tr>`;
      })}</tbody></table>` : `<p>None</p>`}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/contentdialog.md.js
var contentdialog_md_exports = {};
__export(contentdialog_md_exports, {
  default: () => Contentdialog
});
var import_panzoom6, data, css24, Contentdialog;
var init_contentdialog_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/contentdialog.md.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    init_ContentDialog_ad82f69b();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TextBlock_b8b64333();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom6 = __toModule(require_panzoom());
    data = { "props": [{ "name": "open", "kind": "let", "description": "Determines whether the dialog is open or not.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "title", "kind": "let", "description": "Title text displayed as the dialog header.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "size", "kind": "let", "description": "Specifies the visual size of the dialog.", "type": "string", "value": '"standard"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "closable", "kind": "let", "description": "Determines whether the dialog can be conventially closed using the escape key.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "append", "kind": "let", "description": "Determines the node the dialog should be appended to.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "darken", "kind": "let", "description": "Determines if the dialog should darken the contents behind it.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "trapFocus", "kind": "let", "description": "Determines if keyboard focus should be locked to the dialog's contents.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the inner dialog element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "backdropElement", "kind": "let", "description": "Obtains a bound DOM reference to the dialog's backdrop container element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "bodyElement", "kind": "let", "description": "Obtains a bound DOM reference to the dialog's inner body element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "footerElement", "kind": "let", "description": "Obtains a bound DOM reference to the dialog's footer element.", "type": "null | HTMLElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }, { "name": "footer", "default": false, "slot_props": "{}" }, { "name": "outer", "default": false, "slot_props": "{}" }], "events": [{ "type": "dispatched", "name": "backdropclick" }, { "type": "dispatched", "name": "backdropmousedown" }, { "type": "dispatched", "name": "close" }, { "type": "dispatched", "name": "open" }], "typedefs": [], "rest_props": { "type": "Element", "name": "div" } };
    css24 = {
      code: ".dialog-sizes.svelte-jq50ox{grid-gap:24px;-webkit-margin-after:64px;display:grid;justify-content:start;margin-block-end:64px}.dialog-sizes.svelte-jq50ox .content-dialog{position:relative}.dialog-sizes.svelte-jq50ox .content-dialog-smoke{display:contents}",
      map: null
    };
    Contentdialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let open = true;
      const sizes = { min: 320, standard: 448, max: 540 };
      $$result.css.add(css24);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<p>Dialog controls are modal UI overlays that provide contextual app information. They block interactions with the app window until being explicitly dismissed. They often request some kind of action from the user.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ContentDialog <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
          style: "block-size: 360px;",
          repl: "0fde4983fdc841d8b7320143ee3d50d7"
        }, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Open
    `;
              }
            })}
    ${validate_component(ContentDialog, "ContentDialog").$$render($$result, {
              trapFocus: false,
              darken: false,
              title: "Dialog Title",
              open
            }, {
              open: ($$value) => {
                open = $$value;
                $$settled = false;
              }
            }, {
              footer: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Button 1
            `;
                  }
                })}
            ${validate_component(Button, "Button").$$render($$result, {}, {}, {
                  default: () => {
                    return `Button 2
            `;
                  }
                })}
        `;
              },
              default: () => {
                return `Some text
        `;
              }
            })}`;
          }
        })}
<h2 id="${"usage"}">Usage</h2>
<h3 id="${"opening-and-closing"}">Opening and Closing</h3>
<p>Dialogs are not rendered into the DOM initially. They need to be <em>opened</em> first, by setting the <code>open</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ContentDialog</span> <span class="token attr-name">open</span><span class="token punctuation">></span></span>
    This dialog is open by default.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ContentDialog</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>If you wish to control a dialog opening from a trigger button, you can two-way bind the <code>open</code> property to a variable.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ContentDialog<span class="token punctuation">,</span> Button <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> open <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

&lt;Button on:click=&#123;() => open = true&#125;>Open<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ContentDialog</span> <span class="token attr-name"><span class="token namespace">bind:</span>open</span><span class="token punctuation">></span></span>
    I have been opened by a button click.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ContentDialog</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Additionally, dialogs can be closed by pressing the escape key. If you wish to disable this behavior, you can set the <code>closable</code> property to <code>false</code>.</p>
<h3 id="${"titles"}">Titles</h3>
<p>While not strictly required, it is recommended that you give the dialog a title to describe it\u2019s purpose using the <code>title</code> property. This both visually adds a title at the top of the content area, and adds an accessible label through ARIA attributes for usage with assistive technologies.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ContentDialog</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>I have a title.<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(InfoBar, "InfoBar").$$render($$result, { title: "A11Y Note", severity: "caution" }, {}, {
          default: () => {
            return `The ARIA 1.2 specification requires a dialog title in order to comply with the <a href="${"https://www.w3.org/TR/wai-aria-practices/#dialog_modal"}" target="${"_blank"}" rel="${"noreferrer noopener"}">modal dialog pattern</a>.
`;
          }
        })}
<h3 id="${"footers"}">Footers</h3>
<p>You can use the <code>footer</code> slot to insert various actions at the bottom of the dialog.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ContentDialog<span class="token punctuation">,</span> Button <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> open <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ContentDialog</span> <span class="token attr-name"><span class="token namespace">bind:</span>open</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Dialog with action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    &lt;Button slot="footer" on:click=&#123;() => open = false&#125;>Close Dialog<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ContentDialog</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"size"}">Size</h3>
<p>Dialogs come in three sizes - <code>min</code>, <code>standard</code>, and <code>max</code>. You can set the dialog\u2019s size using the <code>size</code> property. With this in mind, dialogs will always responsively scale down if their width exceeds the viewport size.</p>
<div class="${"dialog-sizes svelte-jq50ox"}">${each(["min", "standard", "max"], (size) => {
          return `${validate_component(ContentDialog, "ContentDialog").$$render($$result, {
            title: "This is a " + size + "-sized dialog.",
            trapFocus: false,
            size,
            open: true
          }, {}, {
            footer: () => {
              return `${validate_component(Button, "Button").$$render($$result, { slot: "footer" }, {}, {
                default: () => {
                  return `Action`;
                }
              })}`;
            },
            default: () => {
              return `It has a width of ${escape(sizes[size])}px.
            
        `;
            }
          })}`;
        })}</div>
<h3 id="${"dialog-backdrops"}">Dialog Backdrops</h3>
<p>The default behavior of a dialog is to open with a backdrop (\u201Csmoke\u201D) layer which prevents user interaction and darkens the contents of the page behind the dialog.</p>
<ul><li>You can disable backdrop darkening by setting the <code>darken</code> property to <code>false</code>.</li>
<li>You can configure the backdrop to close the dialog when it is clicked using the <code>on:backdropclick</code> and <code>on:backdropmousedown</code> events dispatched from the component.</li></ul>
<h3 id="${"focus-behavior"}">Focus Behavior</h3>
<p>In accordance to <a href="${"https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7"}" rel="${"nofollow"}">WAI-ARIA Authoring Practices</a>, dialogs utilize a focus trap, which restricts keyboard navigation focus to only the dialog\u2019s content. If you wish to disable this behavior, you can set the <code>trapFocus</code> property to <code>false</code>.</p>
<h3 id="${"appending"}">Appending</h3>
<p>There are some situations where you might want the dialog\u2019s elements to open appended to a specific element, separate from your markup structure. This can be useful if you want to trigger the dialog from inside a container element that has <code>overflow: hidden;</code> styles set, or if you want a single source of where dialogs should be opened from.</p>
<p>To do this, you can set the <code>append</code> property to any valid <a href="${"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"}" rel="${"nofollow"}">HTMLElement</a>. This will append the dialog to the specified element when opened, rather than the position specified in your markup.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ContentDialog</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Appended Dialog<span class="token punctuation">"</span></span> <span class="token attr-name">append</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;document.body&#125;</span><span class="token punctuation">></span></span>
    When opened, I will be appended to this page's <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span> tag.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ContentDialog</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(InfoBar, "InfoBar").$$render($$result, {
          severity: "information",
          title: "Information"
        }, {}, {
          default: () => {
            return `If you are familliar with React, this is essentially a <a href="${"https://reactjs.org/docs/portals.html"}" target="${"_blank"}" rel="${"noreferrer noopener"}">portal</a>.
`;
          }
        })}
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data }, {}, {})}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  css: () => css25,
  entry: () => entry7,
  js: () => js7,
  module: () => contentdialog_md_exports
});
var entry7, js7, css25;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_contentdialog_md();
    entry7 = "pages/docs/components/contentdialog.md-be2c2e04.js";
    js7 = ["pages/docs/components/contentdialog.md-be2c2e04.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/InfoBar-c9f740b0.js", "chunks/ContentDialog-05bc6549.js", "chunks/TextBlock-d5339f0f.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js"];
    css25 = ["assets/pages/docs/components/contentdialog.md-1684ce16.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/NumberBox-ceefabee.js
var css$17, ProgressRing, css26, NumberBox;
var init_NumberBox_ceefabee = __esm({
  ".svelte-kit/output/server/chunks/NumberBox-ceefabee.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBoxButton_fef51e87();
    css$17 = {
      code: "@-webkit-keyframes svelte-32f9k0-progress-ring-indeterminate{0%{stroke-dasharray:.01px 43.97px;transform:rotate(0)}50%{stroke-dasharray:21.99px 21.99px;transform:rotate(450deg)}to{stroke-dasharray:.01px 43.97px;transform:rotate(3turn)}}@keyframes svelte-32f9k0-progress-ring-indeterminate{0%{stroke-dasharray:.01px 43.97px;transform:rotate(0)}50%{stroke-dasharray:21.99px 21.99px;transform:rotate(450deg)}to{stroke-dasharray:.01px 43.97px;transform:rotate(3turn)}}.progress-ring.svelte-32f9k0.svelte-32f9k0{min-block-size:16px;min-inline-size:16px;outline:none}.progress-ring.svelte-32f9k0 circle.svelte-32f9k0{fill:none;stroke:var(--fds-accent-default);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:43.97;transform:rotate(-90deg);transform-origin:50% 50%;transition:all var(--fds-control-normal-duration) linear}.progress-ring.indeterminate.svelte-32f9k0 circle.svelte-32f9k0{-webkit-animation:svelte-32f9k0-progress-ring-indeterminate 2s linear infinite;animation:svelte-32f9k0-progress-ring-indeterminate 2s linear infinite}",
      map: null
    };
    ProgressRing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let indeterminate;
      let $$restProps = compute_rest_props($$props, ["value", "size", "class", "element", "circleElement"]);
      let { value = void 0 } = $$props;
      let { size = 32 } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { circleElement = null } = $$props;
      createEventForwarder(get_current_component(), ["change"]);
      const dispatch = createEventDispatcher();
      let circumference;
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.circleElement === void 0 && $$bindings.circleElement && circleElement !== void 0)
        $$bindings.circleElement(circleElement);
      $$result.css.add(css$17);
      {
        if (value < 0) {
          value = 0;
        } else if (value > 100) {
          value = 100;
        }
      }
      indeterminate = typeof value === "undefined" || value === null || Number.isNaN(value);
      {
        dispatch("change", value);
      }
      {
        if (circleElement)
          circumference = Math.PI * (circleElement.r.baseVal.value * 2);
      }
      return `
<svg${spread([
        { tabindex: "-1" },
        {
          class: "progress-ring " + escape(className)
        },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        { viewBox: "0 0 16 16" },
        {
          role: escape_attribute_value(value ? "progressbar" : "status")
        },
        {
          "aria-valuemin": escape_attribute_value(!indeterminate ? 0 : void 0)
        },
        {
          "aria-valuemax": escape_attribute_value(!indeterminate ? 100 : void 0)
        },
        {
          "aria-valuenow": escape_attribute_value(value)
        },
        escape_object($$restProps)
      ], {
        classes: (indeterminate ? "indeterminate" : "") + " svelte-32f9k0"
      })}${add_attribute("this", element, 0)}><circle cx="${"50%"}" cy="${"50%"}" r="${"7"}" stroke-dasharray="${"3"}"${add_attribute("stroke-dashoffset", (100 - value) / 100 * circumference, 0)} class="${"svelte-32f9k0"}"${add_attribute("this", circleElement, 0)}></circle></svg>`;
    });
    css26 = {
      code: ".number-box input{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.number-box input::-webkit-inner-spin-button,.number-box input::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}.number-box-spinner-flyout.svelte-67f3cc{background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);box-sizing:border-box;display:flex;flex-direction:column;inset-inline-end:-16px;padding:2px 4px;position:absolute;z-index:100}.number-box-spinner-flyout.svelte-67f3cc .number-box-spinner{block-size:36px;inline-size:36px;margin:2px 1px}",
      map: null
    };
    NumberBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let spinUpButtonDisabled;
      let spinDownButtonDisabled;
      let $$restProps = compute_rest_props($$props, [
        "inline",
        "value",
        "min",
        "max",
        "step",
        "disabled",
        "class",
        "inputElement",
        "containerElement",
        "buttonsContainerElement",
        "spinUpButtonElement",
        "clearButtonElement",
        "spinDownButtonElement",
        "spinnerFlyoutElement",
        "stepUp",
        "stepDown"
      ]);
      let { inline = false } = $$props;
      let { value = "" } = $$props;
      let { min = void 0 } = $$props;
      let { max = void 0 } = $$props;
      let { step = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { buttonsContainerElement = null } = $$props;
      let { spinUpButtonElement = null } = $$props;
      let { clearButtonElement = null } = $$props;
      let { spinDownButtonElement = null } = $$props;
      let { spinnerFlyoutElement = null } = $$props;
      let spinUpTimeout;
      let spinDownTimeout;
      let spinUpInterval;
      let spinDownInterval;
      function stopSpinIntervals() {
        clearTimeout(spinUpTimeout);
        clearInterval(spinUpInterval);
        clearTimeout(spinDownTimeout);
        clearInterval(spinDownInterval);
      }
      function stepUp() {
        inputElement.stepUp();
        value = inputElement.value;
      }
      function stepDown() {
        inputElement.stepDown();
        value = inputElement.value;
      }
      if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
        $$bindings.inline(inline);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.min === void 0 && $$bindings.min && min !== void 0)
        $$bindings.min(min);
      if ($$props.max === void 0 && $$bindings.max && max !== void 0)
        $$bindings.max(max);
      if ($$props.step === void 0 && $$bindings.step && step !== void 0)
        $$bindings.step(step);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.buttonsContainerElement === void 0 && $$bindings.buttonsContainerElement && buttonsContainerElement !== void 0)
        $$bindings.buttonsContainerElement(buttonsContainerElement);
      if ($$props.spinUpButtonElement === void 0 && $$bindings.spinUpButtonElement && spinUpButtonElement !== void 0)
        $$bindings.spinUpButtonElement(spinUpButtonElement);
      if ($$props.clearButtonElement === void 0 && $$bindings.clearButtonElement && clearButtonElement !== void 0)
        $$bindings.clearButtonElement(clearButtonElement);
      if ($$props.spinDownButtonElement === void 0 && $$bindings.spinDownButtonElement && spinDownButtonElement !== void 0)
        $$bindings.spinDownButtonElement(spinDownButtonElement);
      if ($$props.spinnerFlyoutElement === void 0 && $$bindings.spinnerFlyoutElement && spinnerFlyoutElement !== void 0)
        $$bindings.spinnerFlyoutElement(spinnerFlyoutElement);
      if ($$props.stepUp === void 0 && $$bindings.stepUp && stepUp !== void 0)
        $$bindings.stepUp(stepUp);
      if ($$props.stepDown === void 0 && $$bindings.stepDown && stepDown !== void 0)
        $$bindings.stepDown(stepDown);
      $$result.css.add(css26);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          if ((value === null || value === void 0 ? void 0 : value.toString()) === (max === null || max === void 0 ? void 0 : max.toString()) || (value === null || value === void 0 ? void 0 : value.toString()) === (min === null || min === void 0 ? void 0 : min.toString()))
            stopSpinIntervals();
        }
        spinUpButtonDisabled = disabled || (value === null || value === void 0 ? void 0 : value.toString()) === (max === null || max === void 0 ? void 0 : max.toString());
        spinDownButtonDisabled = disabled || (value === null || value === void 0 ? void 0 : value.toString()) === (min === null || min === void 0 ? void 0 : min.toString());
        $$rendered = `

${validate_component(TextBox, "TextBox").$$render($$result, Object.assign({ class: "number-box " + (className ?? "") }, { type: "number" }, { min }, { max }, { step }, $$restProps, { inputElement }, { containerElement }, { buttonsContainerElement }, { clearButtonElement }, { value }), {
          inputElement: ($$value) => {
            inputElement = $$value;
            $$settled = false;
          },
          containerElement: ($$value) => {
            containerElement = $$value;
            $$settled = false;
          },
          buttonsContainerElement: ($$value) => {
            buttonsContainerElement = $$value;
            $$settled = false;
          },
          clearButtonElement: ($$value) => {
            clearButtonElement = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        }, {
          buttons: () => {
            return `${inline ? `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
              tabindex: "-1",
              "aria-label": "Increase number",
              disabled: spinUpButtonDisabled,
              class: "number-box-spinner",
              element: spinUpButtonElement
            }, {
              element: ($$value) => {
                spinUpButtonElement = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path fill="${"currentColor"}" d="${"M2.14645 7.35355C2.34171 7.54882 2.65829 7.54882 2.85355 7.35355L6 4.20711L9.14645 7.35355C9.34171 7.54882 9.65829 7.54882 9.85355 7.35355C10.0488 7.15829 10.0488 6.84171 9.85355 6.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645L2.14645 6.64645C1.95118 6.84171 1.95118 7.15829 2.14645 7.35355Z"}"></path></svg>`;
              }
            })}
			${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
              tabindex: "-1",
              "aria-label": "Decrease number",
              class: "number-box-spinner",
              disabled: spinDownButtonDisabled,
              element: spinDownButtonElement
            }, {
              element: ($$value) => {
                spinDownButtonElement = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}"><path fill="${"currentColor"}" d="${"M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"}"></path></svg>`;
              }
            })}` : `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
              class: "number-box-spinner-compact",
              tabindex: "-1"
            }, {}, {
              default: () => {
                return `<svg aria-hidden="${"true"}" xmlns="${"http://www.w3.org/2000/svg"}" height="${"12"}" width="${"100%"}" viewBox="${"128 0 768 1024"}"><path fill="${"currentColor"}" d="${"M128,384C128,375.333 131.167,367.833 137.5,361.5L487,10.5C494,3.5 502.333,0 512,0C521.667,0 530,3.5 537,10.5L886.5,361.5C892.833,367.833 896,375.333 896,384C896,392.667 892.833,400.167 886.5,406.5C880.167,412.833 872.667,416 864,416C855.333,416 847.833,412.833 841.5,406.5L512,76L182.5,406.5C176.167,412.833 168.667,416 160,416C151.333,416 143.833,412.833 137.5,406.5C131.167,400.167 128,392.667 128,384ZM128,640C128,631.333 131.167,623.833 137.5,617.5C143.833,611.167 151.333,608 160,608C168.667,608 176.167,611.167 182.5,617.5L512,948L841.5,617.5C847.833,611.167 855.333,608 864,608C872.667,608 880.167,611.167 886.5,617.5C892.833,623.833 896,631.333 896,640C896,648.667 892.833,656.167 886.5,662.5L537,1013.5C530,1020.5 521.667,1024 512,1024C502.333,1024 494,1020.5 487,1013.5L137.5,662.5C131.167,656.167 128,648.667 128,640Z"}"></path></svg>`;
              }
            })}
			${``}`}

		${slots.buttons ? slots.buttons({}) : ``}
	`;
          },
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        })}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/progressring.md.js
var progressring_md_exports = {};
__export(progressring_md_exports, {
  default: () => Progressring
});
var import_panzoom7, data2, css27, Progressring;
var init_progressring_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/progressring.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_NumberBox_ceefabee();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TextBoxButton_fef51e87();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom7 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data2 = { "props": [{ "name": "value", "kind": "let", "description": "Determines a completion amount in percentage (0-100). If no value or an invalid value is provided, the ring will be indeterminate.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "size", "kind": "let", "description": "The size (diameter) of the ring in pixels.", "type": "number", "value": "32", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the ring's SVG element.", "type": "null | HTMLElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "circleElement", "kind": "let", "description": "Obtains a bound DOM reference to the ring's fill circle element.", "type": "null | HTMLElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [], "events": [{ "type": "dispatched", "name": "change" }], "typedefs": [], "rest_props": { "type": "Element", "name": "svg" } };
    css27 = {
      code: ".ring-spacer.svelte-whfwqb{grid-gap:12px;display:grid;grid-template-columns:1fr 1fr}.component-showcase .component-showcase-grid>.example-ring-input{-webkit-margin-before:12px;inline-size:108px;margin-block-start:12px}",
      map: null
    };
    Progressring = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let value = Math.floor(Math.random() * 100);
      $$result.css.add(css27);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<p>ProgressRing provides visual feedback to to the user that a long-running operation is underway. It can mean that the user cannot interact with the app when the progress indicator is visible, and can also indicate how long the wait time might be.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ProgressRing <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, { repl: "" }, {}, {
          default: () => {
            return `<div class="${"ring-spacer svelte-whfwqb"}">${validate_component(ProgressRing, "ProgressRing").$$render($$result, {}, {}, {})}
        ${validate_component(ProgressRing, "ProgressRing").$$render($$result, { value }, {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            }, {})}</div>
    ${validate_component(NumberBox, "NumberBox").$$render($$result, {
              class: "example-ring-input",
              placeholder: "%",
              clearButton: false,
              min: 0,
              max: 100,
              inline: true,
              value
            }, {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            }, {})}`;
          }
        })}
<h2 id="${"usage"}">Usage</h2>
<h3 id="${"completion-value"}">Completion Value</h3>
<p>The <code>value</code> property takes in a number between <code>0</code> to <code>100</code> that represents the percentage of a task that is completed.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ProgressRing</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;50&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>ProgressRings have two primary states - <em>determinate</em> and <em>indeterminate</em>.</p>
<p>A ProgressRing is indeterminate under the following conditions:</p>
<ul><li>No <code>value</code> is provided.</li>
<li>A <code>value</code> is passed in, but it is <code>undefined</code>, <code>null</code>, or <code>NaN</code>.</li></ul>
<p>A determinate ProgressRing displays a completion percentage by filling the ring gradually, while an indeterminate ProgressRing plays a looping spinner animation.</p>
<h3 id="${"size"}">Size</h3>
<p>You can control the diameter of the ring in pixels by setting the <code>size</code> property. The default size is <code>32</code>.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ProgressRing</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;64&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data2 }, {}, {})}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  css: () => css28,
  entry: () => entry8,
  js: () => js8,
  module: () => progressring_md_exports
});
var entry8, js8, css28;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_progressring_md();
    entry8 = "pages/docs/components/progressring.md-acf7aec9.js";
    js8 = ["pages/docs/components/progressring.md-acf7aec9.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/NumberBox-66139323.js", "chunks/TextBoxButton-cdab09ab.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css28 = ["assets/pages/docs/components/progressring.md-34ddb354.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/ToggleSwitch-f23f3d10.js
var css29, ToggleSwitch;
var init_ToggleSwitch_f23f3d10 = __esm({
  ".svelte-kit/output/server/chunks/ToggleSwitch-f23f3d10.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css29 = {
      code: '.toggle-switch.svelte-16ydm79.svelte-16ydm79{align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--fds-control-alt-fill-secondary);block-size:20px;border:1px solid var(--fds-control-strong-stroke-default);border-radius:20px;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:40px;line-height:20px;margin:0;outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.toggle-switch.svelte-16ydm79.svelte-16ydm79:before{background-color:var(--fds-text-secondary);block-size:12px;border-radius:7px;content:"";inline-size:12px;inset-inline-start:3px;position:absolute;transition:var(--fds-control-fast-duration) ease-in-out transform,var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) height,var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) width,var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) margin,var(--fds-control-faster-duration) linear background}.toggle-switch.svelte-16ydm79.svelte-16ydm79:focus-visible{box-shadow:var(--fds-focus-stroke)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:hover{background-color:var(--fds-control-alt-fill-tertiary)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:hover:before{block-size:14px;inline-size:14px}.toggle-switch.svelte-16ydm79.svelte-16ydm79:active{background-color:var(--fds-control-alt-fill-quarternary)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:active:before{block-size:14px;inline-size:17px}.toggle-switch.svelte-16ydm79.svelte-16ydm79:disabled{background-color:var(--fds-control-alt-fill-disabled);border-color:var(--fds-control-strong-stroke-disabled)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:disabled:before{background-color:var(--fds-text-disabled);block-size:12px;box-shadow:none;inline-size:12px;margin:0!important}.toggle-switch.svelte-16ydm79:disabled+span.svelte-16ydm79{color:var(--fds-text-disabled)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked{background-color:var(--fds-accent-default);border:none}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:before{background-color:var(--fds-text-on-accent-primary);box-shadow:0 0 0 1px solid var(--fds-control-stroke-default);transform:translateX(20px)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:hover{background-color:var(--fds-accent-secondary)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:hover:before{-webkit-margin-start:-1px;margin-inline-start:-1px}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:active{background-color:var(--fds-accent-tertiary)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:active:before{-webkit-margin-start:-4px;margin-inline-start:-4px}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:disabled{background-color:var(--fds-accent-disabled)}.toggle-switch.svelte-16ydm79.svelte-16ydm79:checked:disabled:before{background-color:var(--fds-text-on-accent-disabled);box-shadow:none}.toggle-switch-container.svelte-16ydm79.svelte-16ydm79{align-items:center;color:var(--fds-text-primary);display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;min-block-size:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.toggle-switch-container.svelte-16ydm79>span.svelte-16ydm79{-webkit-padding-start:8px;padding-inline-start:8px}',
      map: null
    };
    ToggleSwitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["checked", "value", "disabled", "class", "inputElement", "containerElement"]);
      let $$slots = compute_slots(slots);
      let { checked = false } = $$props;
      let { value = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      $$result.css.add(css29);
      return `
<label class="${"toggle-switch-container svelte-16ydm79"}"${add_attribute("this", containerElement, 0)}><input${spread([
        {
          class: "toggle-switch " + escape(className)
        },
        { type: "checkbox" },
        { value: escape_attribute_value(value) },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], { classes: "svelte-16ydm79" })}${add_attribute("checked", checked, 1)}${add_attribute("this", inputElement, 0)}>
	${$$slots.default ? `<span class="${"svelte-16ydm79"}">${slots.default ? slots.default({}) : ``}</span>` : ``}
</label>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/toggleswitch.md.js
var toggleswitch_md_exports = {};
__export(toggleswitch_md_exports, {
  default: () => Toggleswitch
});
var import_panzoom8, data3, Toggleswitch;
var init_toggleswitch_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/toggleswitch.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_ToggleSwitch_f23f3d10();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom8 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data3 = { "props": [{ "name": "checked", "kind": "let", "description": "Controls whether the switch is toggled or not.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "value", "kind": "let", "description": "Sets the input element's native `value` attribute for usage in forms.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the switch is intended for user interaction, and styles it accordingly.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "inputElement", "kind": "let", "description": "Obtains a bound DOM reference to the switch's <input /> element.", "type": "null | HTMLInputElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "containerElement", "kind": "let", "description": "Obtains a bound DOM reference to the switch's outer container element.", "type": "null | HTMLLabelElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }], "events": [], "typedefs": [], "rest_props": { "type": "Element", "name": "input" } };
    Toggleswitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>The toggle switch represents a physical switch that allows users to turn things on or off, like a light switch. Use toggle switch controls to present users with two mutually exclusive options (such as on/off), where choosing an option provides immediate results.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ToggleSwitch <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        columns: 2,
        repl: "4b7217ee24294302937ec6c69db1bbc0"
      }, {}, {
        default: () => {
          return `${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, {}, {}, {
            default: () => {
              return `ToggleSwitch`;
            }
          })}
    ${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { checked: true }, {}, {
            default: () => {
              return `ToggleSwitch`;
            }
          })}
    ${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { disabled: true }, {}, {
            default: () => {
              return `ToggleSwitch`;
            }
          })}
    ${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { checked: true, disabled: true }, {}, {
            default: () => {
              return `ToggleSwitch`;
            }
          })}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<p><code>&lt;ToggleSwitch /&gt;</code> is a wrapper around HTML\u2019s <code>&lt;input /&gt;</code> checkbox type. As such, the APIs share some similarities.</p>
<h3 id="${"checking-and-unchecking"}">Checking and Unchecking</h3>
<p>You can programmatically control if the ToggleSwitch is in it\u2019s checked state by setting the <code>checked</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ToggleSwitch</span> <span class="token attr-name">checked</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Additionally, you can use svelte\u2019s two-way binding syntax to bind the checked state to a variable.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ToggleSwitch <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> checked <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ToggleSwitch</span> <span class="token attr-name"><span class="token namespace">bind:</span>checked</span> <span class="token punctuation">/></span></span>

Current state: &#123;checked ? "checked" : "unchecked"&#125;</code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"labels"}">Labels</h3>
<p>Passing in content to the ToggleSwitch\u2019s slot will cause that content to be rendered into a label for the control.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ToggleSwitch</span><span class="token punctuation">></span></span>I have a label!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ToggleSwitch</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"value"}">Value</h3>
<p>For usage in forms, you can set a <code>value</code> property which will set the <a href="${"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value"}" rel="${"nofollow"}">value</a> of the ToggleSwitch\u2019s <code>&lt;input&gt;</code> element.</p>
<h3 id="${"disabled-toggleswitches"}">Disabled ToggleSwitches</h3>
<p>If the ToggleSwitch is not meant to be clicked, you can use the <code>disabled</code> property to visually indicate this. If a ToggleSwitch is disabled, it will be unclickable.</p>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data3 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  css: () => css30,
  entry: () => entry9,
  js: () => js9,
  module: () => toggleswitch_md_exports
});
var entry9, js9, css30;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_toggleswitch_md();
    entry9 = "pages/docs/components/toggleswitch.md-935e5a93.js";
    js9 = ["pages/docs/components/toggleswitch.md-935e5a93.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/ToggleSwitch-d4a933f6.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css30 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/RadioButton-c9d34efc.js
var css31, RadioButton;
var init_RadioButton_c9d34efc = __esm({
  ".svelte-kit/output/server/chunks/RadioButton-c9d34efc.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css31 = {
      code: '.radio-button.svelte-hhkzib.svelte-hhkzib{align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-clip:padding-box;background-color:var(--fds-control-alt-fill-secondary);block-size:20px;border:1px solid var(--fds-control-strong-stroke-default);border-radius:20px;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:20px;justify-content:center;line-height:20px;margin:0;outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.radio-button.svelte-hhkzib.svelte-hhkzib:before{background-color:var(--fds-text-on-accent-primary);block-size:4px;border-radius:12px;content:"";inline-size:4px;position:absolute;visibility:hidden}.radio-button.svelte-hhkzib.svelte-hhkzib:focus-visible{box-shadow:var(--fds-focus-stroke)}.radio-button.svelte-hhkzib.svelte-hhkzib:hover{background-color:var(--fds-control-alt-fill-tertiary)}.radio-button.svelte-hhkzib.svelte-hhkzib:active{background-color:var(--fds-control-alt-fill-quarternary);border-color:var(--fds-control-strong-stroke-disabled)}.radio-button.svelte-hhkzib.svelte-hhkzib:active:before{block-size:10px;inline-size:10px;transition:var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);visibility:visible}.radio-button.svelte-hhkzib.svelte-hhkzib:disabled{background-color:var(--fds-control-alt-fill-disabled);border-color:var(--fds-control-strong-stroke-disabled)}.radio-button.svelte-hhkzib.svelte-hhkzib:disabled:before{visibility:hidden}.radio-button.svelte-hhkzib:disabled+span.svelte-hhkzib{color:var(--fds-text-disabled)}.radio-button.svelte-hhkzib.svelte-hhkzib:checked{background-color:var(--fds-accent-default);border:none}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:before{block-size:12px;box-shadow:0 0 0 1px var(--fds-control-stroke-default);inline-size:12px;transition:var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);visibility:visible}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:hover{background-color:var(--fds-accent-secondary)}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:hover:before{block-size:14px;inline-size:14px}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:active{background-color:var(--fds-accent-tertiary)}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:active:before{block-size:10px;inline-size:10px}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:disabled{background-color:var(--fds-accent-disabled)}.radio-button.svelte-hhkzib.svelte-hhkzib:checked:disabled:before{block-size:12px;box-shadow:none;inline-size:12px}.radio-button-container.svelte-hhkzib.svelte-hhkzib{align-items:center;color:var(--fds-text-primary);display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;min-block-size:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.radio-button-container.svelte-hhkzib>span.svelte-hhkzib{-webkit-padding-start:8px;padding-inline-start:8px}',
      map: null
    };
    RadioButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["group", "checked", "value", "disabled", "class", "inputElement", "containerElement"]);
      let $$slots = compute_slots(slots);
      let { group = void 0 } = $$props;
      let { checked = false } = $$props;
      let { value = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.group === void 0 && $$bindings.group && group !== void 0)
        $$bindings.group(group);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      $$result.css.add(css31);
      return `
<label class="${"radio-button-container svelte-hhkzib"}"${add_attribute("this", containerElement, 0)}><input${spread([
        { type: "radio" },
        {
          class: "radio-button " + escape(className)
        },
        { value: escape_attribute_value(value) },
        { checked: checked || null },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], { classes: "svelte-hhkzib" })}${value === group ? add_attribute("checked", true, 1) : ""}${add_attribute("this", inputElement, 0)}>
	${$$slots.default ? `<span class="${"svelte-hhkzib"}">${slots.default ? slots.default({}) : ``}</span>` : ``}
</label>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/radiobutton.md.js
var radiobutton_md_exports = {};
__export(radiobutton_md_exports, {
  default: () => Radiobutton
});
var import_panzoom9, data4, Radiobutton;
var init_radiobutton_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/radiobutton.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_RadioButton_c9d34efc();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom9 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data4 = { "props": [{ "name": "group", "kind": "let", "description": "Bindable value representing a group of radio inputs that the input will be bound to.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "checked", "kind": "let", "description": "Controls whether the radio is checked or not. Only valid is `group` is not bound.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "value", "kind": "let", "description": "Sets the input element's native `value` attribute for usage in forms.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the radio is intended for user interaction, and styles it accordingly.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "inputElement", "kind": "let", "description": "Obtains a bound DOM reference to the checkbox's <input /> element.", "type": "null | HTMLInputElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "containerElement", "kind": "let", "description": "Obtains a bound DOM reference to the checkbox's outer container element.", "type": "null | HTMLLabelElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }], "events": [], "typedefs": [], "rest_props": { "type": "Element", "name": "input" } };
    Radiobutton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let group = 1;
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<p>Radio buttons, also called option buttons, let users select one option from a collection of two or more mutually exclusive, but related, options. The singular behavior of a RadioButtons group distinguishes it from check boxes, which support multi-selection and deselection, or clearing.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RadioButton <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
          columns: 3,
          repl: "b3c4c774b4b84f948a8a6747e5cf7226"
        }, {}, {
          default: () => {
            return `${validate_component(RadioButton, "RadioButton").$$render($$result, { value: 1, group }, {
              group: ($$value) => {
                group = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option 1`;
              }
            })}
    ${validate_component(RadioButton, "RadioButton").$$render($$result, { value: 2, group }, {
              group: ($$value) => {
                group = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option 2`;
              }
            })}
    ${validate_component(RadioButton, "RadioButton").$$render($$result, { value: 3, disabled: true, group }, {
              group: ($$value) => {
                group = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option 3`;
              }
            })}
    ${validate_component(RadioButton, "RadioButton").$$render($$result, { checked: true }, {}, {
              default: () => {
                return `RadioButton`;
              }
            })}
    ${validate_component(RadioButton, "RadioButton").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `RadioButton`;
              }
            })}
    ${validate_component(RadioButton, "RadioButton").$$render($$result, { disabled: true, checked: true }, {}, {
              default: () => {
                return `RadioButton`;
              }
            })}`;
          }
        })}
<h2 id="${"usage"}">Usage</h2>
<p><code>&lt;RadioButton /&gt;</code> is a wrapper around HTML\u2019s <code>&lt;input /&gt;</code> radio type. As such, the APIs share some similarities.</p>
<h3 id="${"labels"}">Labels</h3>
<p>Passing in content to the RadioButton\u2019s slot will cause that content to be rendered into a label for the control.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span><span class="token punctuation">></span></span>I have a label!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"value"}">Value</h3>
<p>The <code>value</code> property is used to determine the piece of data that is associated with the radio. This serves two primary purposes:</p>
<ul><li>For usage in forms, this <a href="${"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value"}" rel="${"nofollow"}">value</a> is submitted with the form as <a href="${"https://developer.mozilla.org/en-US/docs/Web/API/FormData"}" rel="${"nofollow"}"><code>FormData</code></a>.</li>
<li>If a <a href="${"#radio-groups"}">group binding</a> is used, the radio\u2019s <code>value</code> will be used to determine which radio in the group is currently selected. </li></ul>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;1&#125;</span><span class="token punctuation">></span></span>Option 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"radio-groups"}">Radio Groups</h3>
<p>Radio Buttons can be grouped together as a mutually-exclusive list of options using a <em>group binding</em>. Group bindings bind to a variable who\u2019s value corresponds to the value property of the currently selected item.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RadioButton <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> flavor <span class="token operator">=</span> <span class="token string">"chocolate"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span> <span class="token attr-name"><span class="token namespace">bind:</span>group</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;flavor&#125;</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>chocolate<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Chocolate<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span> <span class="token attr-name"><span class="token namespace">bind:</span>group</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;flavor&#125;</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vanilla<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Vanilla<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span> <span class="token attr-name"><span class="token namespace">bind:</span>group</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;flavor&#125;</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>strawberry<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Strawberry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>When a RadioButton is selected, it will deselect all other RadioButtons in the same group, then set the bound variable to the selected item\u2019s <code>value</code> property. If you do not wish to set a default option, the bound variable can simply be initialized without a value.</p>
<h3 id="${"manually-controlling-state"}">Manually Controlling State</h3>
<p>If <code>group</code> is not set, you also have access to a <code>checked</code> property that allows you to manually set the initial state of the Radio.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RadioButton</span> <span class="token attr-name">checked</span><span class="token punctuation">></span></span>I am checked by default.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RadioButton</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data4 }, {}, {})}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  css: () => css32,
  entry: () => entry10,
  js: () => js10,
  module: () => radiobutton_md_exports
});
var entry10, js10, css32;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_radiobutton_md();
    entry10 = "pages/docs/components/radiobutton.md-3de024cd.js";
    js10 = ["pages/docs/components/radiobutton.md-3de024cd.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/RadioButton-f8305108.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css32 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/Expander-274dc980.js
var css33, Expander;
var init_Expander_274dc980 = __esm({
  ".svelte-kit/output/server/chunks/Expander-274dc980.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css33 = {
      code: ".expander.svelte-4s96zv.svelte-4s96zv{border-radius:var(--fds-control-corner-radius);color:var(--fds-text-primary);display:flex;flex-direction:column;inline-size:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.expander.direction-down.svelte-4s96zv .expander-content.svelte-4s96zv{border-radius:0 0 var(--fds-control-corner-radius) var(--fds-control-corner-radius);border-top:none;transform:translateY(-100%)}.expander.direction-down.expanded.svelte-4s96zv .expander-header.svelte-4s96zv,.expander.direction-up.svelte-4s96zv .expander-content.svelte-4s96zv{border-radius:var(--fds-control-corner-radius) var(--fds-control-corner-radius) 0 0}.expander.direction-up.svelte-4s96zv .expander-content.svelte-4s96zv{border-bottom:none;transform:translateY(100%)}.expander.direction-up.svelte-4s96zv .expander-content-anchor.svelte-4s96zv{order:-1}.expander.direction-up.expanded.svelte-4s96zv .expander-header.svelte-4s96zv{border-radius:0 0 var(--fds-control-corner-radius) var(--fds-control-corner-radius)}.expander.expanded.svelte-4s96zv .expander-content.svelte-4s96zv{transform:none;transition:var(--fds-control-slow-duration) var(--fds-control-fast-out-slow-in-easing) transform}.expander.expanded.svelte-4s96zv .expander-content-anchor.svelte-4s96zv{max-block-size:6.019999999999999e+23vmax;transition:none}.expander.expanded.svelte-4s96zv .expander-chevron svg.svelte-4s96zv{transform:rotate(180deg)}.expander.svelte-4s96zv>h3.svelte-4s96zv{display:contents}.expander-icon.svelte-4s96zv.svelte-4s96zv{-webkit-margin-end:16px;block-size:16px;color:var(--fds-text-primary);flex:0 0 auto;inline-size:16px;margin-inline-end:16px}.expander-icon.svelte-4s96zv>svg{fill:currentColor;block-size:auto;inline-size:16px}.expander-header.svelte-4s96zv.svelte-4s96zv{-webkit-padding-start:16px;align-items:center;background-clip:padding-box;background-color:var(--fds-card-background-default);border:1px solid var(--fds-card-stroke-default);border-radius:var(--fds-control-corner-radius);box-sizing:border-box;display:flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;outline:none;padding:8px;padding-inline-start:16px;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.expander-header-title.svelte-4s96zv.svelte-4s96zv{flex:1 1 auto}.expander-header.svelte-4s96zv.svelte-4s96zv:focus-visible{box-shadow:var(--fds-focus-stroke)}.expander-header.svelte-4s96zv:hover .expander-chevron.svelte-4s96zv{background-color:var(--fds-subtle-fill-secondary)}.expander-header.svelte-4s96zv:active .expander-chevron.svelte-4s96zv{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.expander-chevron.svelte-4s96zv.svelte-4s96zv{-webkit-margin-start:20px;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--fds-subtle-fill-transparent);block-size:32px;border:none;border-radius:var(--fds-control-corner-radius);color:var(--fds-text-primary);display:flex;flex:0 0 auto;inline-size:32px;justify-content:center;margin-inline-start:20px;outline:none}.expander-chevron.svelte-4s96zv.svelte-4s96zv:focus-visible{box-shadow:var(--fds-focus-stroke)}.expander-chevron.svelte-4s96zv svg.svelte-4s96zv{fill:currentColor;block-size:12px;inline-size:12px;transition:calc(var(--fds-control-faster-duration)*1.2) linear transform var(--fds-control-faster-duration)}.expander-content.svelte-4s96zv.svelte-4s96zv{background-clip:padding-box;background-color:var(--fds-card-background-secondary);border:1px solid var(--fds-card-stroke-default);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;padding:16px;transition:var(--fds-control-fast-duration) cubic-bezier(1,1,0,1) transform;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.expander-content-anchor.svelte-4s96zv.svelte-4s96zv{max-height:0;overflow:hidden;position:relative;transition:0ms linear var(--fds-control-slow-duration) max-height}",
      map: null
    };
    Expander = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "expanded",
        "direction",
        "class",
        "containerElement",
        "headerElement",
        "contentElement"
      ]);
      let $$slots = compute_slots(slots);
      let { expanded = false } = $$props;
      let { direction = "down" } = $$props;
      let { class: className = "" } = $$props;
      let { containerElement = null } = $$props;
      let { headerElement = null } = $$props;
      let { contentElement = null } = $$props;
      const dispatch = createEventDispatcher();
      createEventForwarder(get_current_component(), ["expand", "collapse"]);
      const headerId = uid("fds-expander-header-");
      const contentId = uid("fds-expander-content-");
      if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
        $$bindings.expanded(expanded);
      if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
        $$bindings.direction(direction);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.headerElement === void 0 && $$bindings.headerElement && headerElement !== void 0)
        $$bindings.headerElement(headerElement);
      if ($$props.contentElement === void 0 && $$bindings.contentElement && contentElement !== void 0)
        $$bindings.contentElement(contentElement);
      $$result.css.add(css33);
      {
        if (expanded) {
          dispatch("expand");
        } else {
          dispatch("collapse");
        }
      }
      return `
<div${spread([
        {
          class: "expander direction-" + escape(direction) + " " + escape(className)
        },
        { role: "region" },
        escape_object($$restProps)
      ], {
        classes: (expanded ? "expanded" : "") + " svelte-4s96zv"
      })}${add_attribute("this", containerElement, 0)}><h3 class="${"svelte-4s96zv"}"><div role="${"button"}"${add_attribute("id", headerId, 0)}${add_attribute("aria-controls", contentId, 0)} class="${"expander-header svelte-4s96zv"}"${add_attribute("aria-expanded", expanded, 0)} tabindex="${"0"}"${add_attribute("this", headerElement, 0)}>${$$slots.icon ? `<div class="${"expander-icon svelte-4s96zv"}">${slots.icon ? slots.icon({}) : ``}</div>` : ``}
			<span class="${"expander-header-title svelte-4s96zv"}">${slots.default ? slots.default({}) : ``}</span>
			<button class="${"expander-chevron svelte-4s96zv"}" tabindex="${"-1"}"${add_attribute("id", contentId, 0)}${add_attribute("aria-labelledby", headerId, 0)}><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}" class="${"svelte-4s96zv"}">${direction === "down" ? `<path fill="${"currentColor"}" d="${"M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"}"></path>` : `<path fill="${"currentColor"}" d="${"M2.14645 7.35355C2.34171 7.54882 2.65829 7.54882 2.85355 7.35355L6 4.20711L9.14645 7.35355C9.34171 7.54882 9.65829 7.54882 9.85355 7.35355C10.0488 7.15829 10.0488 6.84171 9.85355 6.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645L2.14645 6.64645C1.95118 6.84171 1.95118 7.15829 2.14645 7.35355Z"}"></path>`}</svg></button></div></h3>
	<div class="${"expander-content-anchor svelte-4s96zv"}"><div class="${"expander-content svelte-4s96zv"}"${add_attribute("this", contentElement, 0)}>${slots.content ? slots.content({}) : ``}</div></div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/circle_16_regular-be646c52.js
var Circle;
var init_circle_16_regular_be646c52 = __esm({
  ".svelte-kit/output/server/chunks/circle_16_regular-be646c52.js"() {
    Circle = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 14A6 6 0 108 2a6 6 0 000 12zm0-1A5 5 0 118 3a5 5 0 010 10z"/></svg>';
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/playground.md.js
var playground_md_exports = {};
__export(playground_md_exports, {
  default: () => Playground
});
var import_panzoom10, Playground;
var init_playground_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/playground.md.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_ContentDialog_ad82f69b();
    init_Expander_274dc980();
    init_Showcase_4ad8ba4a();
    init_circle_16_regular_be646c52();
    init_TextBlock_b8b64333();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom10 = __toModule(require_panzoom());
    Playground = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let open = true;
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<p>Expander + ContentDialog.</p>
${validate_component(Showcase, "Showcase").$$render($$result, {
          style: "block-size: 360px;",
          repl: "78aa3269aba34022a958311963520428"
        }, {}, {
          default: () => {
            return `${validate_component(Expander, "Expander").$$render($$result, {}, {}, {
              content: () => {
                return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
              },
              default: () => {
                return `Expander
        `;
              }
            })}
    ${validate_component(Expander, "Expander").$$render($$result, {}, {}, {
              content: () => {
                return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
              },
              icon: () => {
                return `<!-- HTML_TAG_START -->${Circle}<!-- HTML_TAG_END -->
        `;
              },
              default: () => {
                return `Expander
        `;
              }
            })}
    ${validate_component(Expander, "Expander").$$render($$result, { direction: "up" }, {}, {
              content: () => {
                return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
              },
              default: () => {
                return `Expander
        `;
              }
            })}`;
          }
        })}
Button.
${validate_component(Showcase, "Showcase").$$render($$result, {
          columns: 3,
          repl: "0c6ca42e2c5c4868a7a8c1a1a45759eb"
        }, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { variant: "standard" }, {}, {
              default: () => {
                return `Button`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
              default: () => {
                return `Button`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink" }, {}, {
              default: () => {
                return `Button`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "standard", disabled: true }, {}, {
              default: () => {
                return `Button`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "accent", disabled: true }, {}, {
              default: () => {
                return `Button`;
              }
            })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink", disabled: true }, {}, {
              default: () => {
                return `Button`;
              }
            })}`;
          }
        })}
ContentDialog. let open = true;
${validate_component(Showcase, "Showcase").$$render($$result, {
          style: "block-size: 360px;",
          repl: "0fde4983fdc841d8b7320143ee3d50d7"
        }, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Open
    `;
              }
            })}
    ${validate_component(ContentDialog, "ContentDialog").$$render($$result, {
              trapFocus: false,
              darken: false,
              title: "Dialog Title",
              open
            }, {
              open: ($$value) => {
                open = $$value;
                $$settled = false;
              }
            }, {
              footer: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Button 1
            `;
                  }
                })}
        `;
              },
              default: () => {
                return `Some text
        `;
              }
            })}`;
          }
        })}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  css: () => css34,
  entry: () => entry11,
  js: () => js11,
  module: () => playground_md_exports
});
var entry11, js11, css34;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_playground_md();
    entry11 = "pages/docs/components/playground.md-2278bfd9.js";
    js11 = ["pages/docs/components/playground.md-2278bfd9.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/ContentDialog-05bc6549.js", "chunks/TextBlock-d5339f0f.js", "chunks/Expander-e69a98d3.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js"];
    css34 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/infobadge.md.js
var infobadge_md_exports = {};
__export(infobadge_md_exports, {
  default: () => Infobadge
});
var import_panzoom11, data5, Infobadge;
var init_infobadge_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/infobadge.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom11 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    data5 = { "props": [{ "name": "severity", "kind": "let", "description": "Indicates the severity color of the badge.", "type": "string", "value": '"attention"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the badge's element.", "type": "null | HTMLSpanElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "fallback": '{#if severity === "attention"}\n			<svg {...svgProps} viewBox="162 118 701 789">\n				<path\n					fill="currentColor"\n					d="M862.5,680C862.5,687.333 861.083,694.25 858.25,700.75C855.417,707.25 851.583,712.917 846.75,717.75C841.917,722.583 836.25,726.417 829.75,729.25C823.25,732.083 816.333,733.5 809,733.5C800,733.5 791.333,731.167 783,726.5L565.5,603.5L565.5,853.5C565.5,860.833 564.083,867.75 561.25,874.25C558.417,880.75 554.583,886.333 549.75,891C544.917,895.667 539.25,899.417 532.75,902.25C526.25,905.083 519.333,906.5 512,906.5C504.667,906.5 497.75,905.083 491.25,902.25C484.75,899.417 479.083,895.667 474.25,891C469.417,886.333 465.583,880.75 462.75,874.25C459.917,867.75 458.5,860.833 458.5,853.5L458.5,603.5L241,726.5C232.667,731.167 224,733.5 215,733.5C207.667,733.5 200.75,732.083 194.25,729.25C187.75,726.417 182.083,722.583 177.25,717.75C172.417,712.917 168.583,707.25 165.75,700.75C162.917,694.25 161.5,687.333 161.5,680C161.5,670.667 164,661.75 169,653.25C174,644.75 180.5,638.167 188.5,633.5L403.5,512L188.5,390.5C180.5,385.833 174,379.25 169,370.75C164,362.25 161.5,353.333 161.5,344C161.5,336.667 162.917,329.75 165.75,323.25C168.583,316.75 172.417,311.083 177.25,306.25C182.083,301.417 187.75,297.583 194.25,294.75C200.75,291.917 207.667,290.5 215,290.5C224.667,290.5 233.333,292.833 241,297.5L458.5,420.5L458.5,170.5C458.5,163.167 459.917,156.25 462.75,149.75C465.583,143.25 469.417,137.667 474.25,133C479.083,128.333 484.75,124.583 491.25,121.75C497.75,118.917 504.667,117.5 512,117.5C519.333,117.5 526.25,118.917 532.75,121.75C539.25,124.583 544.917,128.333 549.75,133C554.583,137.667 558.417,143.25 561.25,149.75C564.083,156.25 565.5,163.167 565.5,170.5L565.5,420.5L783,297.5C791.333,292.833 800,290.5 809,290.5C816.333,290.5 823.25,291.917 829.75,294.75C836.25,297.583 841.917,301.417 846.75,306.25C851.583,311.083 855.417,316.75 858.25,323.25C861.083,329.75 862.5,336.667 862.5,344C862.5,353.333 860,362.25 855,370.75C850,379.25 843.5,385.833 835.5,390.5L620.5,512L835.5,633.5C843.5,638.167 850,644.75 855,653.25C860,661.75 862.5,670.667 862.5,680Z"\n				/>\n			</svg>\n		{:else if severity === "success"}\n			<svg {...svgProps} viewBox="118 245 790 577">\n				<path\n					fill="currentColor"\n					d="M117.5,554.5C117.5,547.167 118.917,540.25 121.75,533.75C124.583,527.25 128.417,521.583 133.25,516.75C138.083,511.917 143.75,508.083 150.25,505.25C156.75,502.417 163.667,501 171,501C185.333,501 197.833,506.333 208.5,517L384,692.5L815.5,261C826.167,250.333 838.833,245 853.5,245C860.833,245 867.75,246.417 874.25,249.25C880.75,252.083 886.417,256 891.25,261C896.083,266 899.917,271.75 902.75,278.25C905.583,284.75 907,291.5 907,298.5C907,313.167 901.667,325.833 891,336.5L421.5,805.5C416.5,810.5 410.75,814.417 404.25,817.25C397.75,820.083 391,821.5 384,821.5C369.667,821.5 357.167,816.167 346.5,805.5L133,592.5C122.667,582.167 117.5,569.5 117.5,554.5Z"\n				/>\n			</svg>\n		{:else if severity === "caution"}\n			<svg {...svgProps} viewBox="406 86 213 875">\n				<path\n					fill="currentColor"\n					d="M426.5,512L426.5,170.5C426.5,158.833 428.75,147.833 433.25,137.5C437.75,127.167 443.917,118.167 451.75,110.5C459.583,102.833 468.667,96.75 479,92.25C489.333,87.75 500.333,85.5 512,85.5C523.667,85.5 534.667,87.75 545,92.25C555.333,96.75 564.417,102.833 572.25,110.5C580.083,118.167 586.25,127.167 590.75,137.5C595.25,147.833 597.5,158.833 597.5,170.5L597.5,512C597.5,523.667 595.25,534.667 590.75,545C586.25,555.333 580.083,564.417 572.25,572.25C564.417,580.083 555.333,586.25 545,590.75C534.667,595.25 523.667,597.5 512,597.5C500.333,597.5 489.333,595.25 479,590.75C468.667,586.25 459.583,580.083 451.75,572.25C443.917,564.417 437.75,555.333 433.25,545C428.75,534.667 426.5,523.667 426.5,512ZM405.5,853.5C405.5,838.833 408.333,825 414,812C419.667,799 427.333,787.667 437,778C446.667,768.333 457.917,760.667 470.75,755C483.583,749.333 497.333,746.5 512,746.5C526.667,746.5 540.417,749.333 553.25,755C566.083,760.667 577.333,768.333 587,778C596.667,787.667 604.333,799 610,812C615.667,825 618.5,838.833 618.5,853.5C618.5,868.167 615.667,881.917 610,894.75C604.333,907.583 596.667,918.833 587,928.5C577.333,938.167 566,945.833 553,951.5C540,957.167 526.333,960 512,960C497.333,960 483.583,957.167 470.75,951.5C457.917,945.833 446.667,938.167 437,928.5C427.333,918.833 419.667,907.583 414,894.75C408.333,881.917 405.5,868.167 405.5,853.5Z"\n				/>\n			</svg>\n		{:else if severity === "critical"}\n			<svg {...svgProps} viewBox="172 171 683 683">\n				<path\n					fill="currentColor"\n					d="M512.5,587.5L262.5,838C252.167,848.333 239.5,853.5 224.5,853.5C209.5,853.5 196.917,848.417 186.75,838.25C176.583,828.083 171.5,815.5 171.5,800.5C171.5,785.5 176.667,772.833 187,762.5L437,512L187,262C176.667,251.667 171.5,239.167 171.5,224.5C171.5,217.167 172.833,210.167 175.5,203.5C178.167,196.833 181.917,191.167 186.75,186.5C191.583,181.833 197.167,178.083 203.5,175.25C209.833,172.417 216.833,171 224.5,171C239.167,171 251.667,176.167 262,186.5L512.5,437L762.5,186.5C773.167,175.833 785.833,170.5 800.5,170.5C807.833,170.5 814.75,171.917 821.25,174.75C827.75,177.583 833.417,181.417 838.25,186.25C843.083,191.083 846.833,196.75 849.5,203.25C852.167,209.75 853.5,216.667 853.5,224C853.5,238.667 848.333,251.167 838,261.5L587.5,512L838,762.5C848.667,773.167 854,785.833 854,800.5C854,807.833 852.583,814.667 849.75,821C846.917,827.333 843.083,832.917 838.25,837.75C833.417,842.583 827.75,846.417 821.25,849.25C814.75,852.083 807.833,853.5 800.5,853.5C785.5,853.5 772.833,848.333 762.5,838Z"\n				/>\n			</svg>\n		{:else if severity === "information"}\n			<svg {...svgProps} viewBox="406 64 213 875">\n				<path\n					fill="currentColor"\n					d="M405.5,170.5C405.5,156.167 408.333,142.5 414,129.5C419.667,116.5 427.333,105.167 437,95.5C446.667,85.8334 457.917,78.1667 470.75,72.5C483.583,66.8334 497.333,64.0001 512,64C526.333,64.0001 540,66.8334 553,72.5C566,78.1667 577.333,85.8334 587,95.5C596.667,105.167 604.333,116.5 610,129.5C615.667,142.5 618.5,156.167 618.5,170.5C618.5,185.167 615.667,199 610,212C604.333,225 596.667,236.333 587,246C577.333,255.667 566.083,263.333 553.25,269C540.417,274.667 526.667,277.5 512,277.5C497.333,277.5 483.583,274.667 470.75,269C457.917,263.333 446.667,255.667 437,246C427.333,236.333 419.667,225 414,212C408.333,199 405.5,185.167 405.5,170.5ZM426.5,853.5L426.5,512C426.5,500.333 428.75,489.333 433.25,479C437.75,468.667 443.917,459.583 451.75,451.75C459.583,443.917 468.667,437.75 479,433.25C489.333,428.75 500.333,426.5 512,426.5C523.667,426.5 534.667,428.75 545,433.25C555.333,437.75 564.417,443.917 572.25,451.75C580.083,459.583 586.25,468.667 590.75,479C595.25,489.333 597.5,500.333 597.5,512L597.5,853.5C597.5,865.167 595.25,876.167 590.75,886.5C586.25,896.833 580.083,905.833 572.25,913.5C564.417,921.167 555.333,927.25 545,931.75C534.667,936.25 523.667,938.5 512,938.5C500.333,938.5 489.333,936.25 479,931.75C468.667,927.25 459.583,921.167 451.75,913.5C443.917,905.833 437.75,896.833 433.25,886.5C428.75,876.167 426.5,865.167 426.5,853.5Z"\n				/>\n			</svg>\n		{/if}', "slot_props": "{}" }], "events": [], "typedefs": [], "rest_props": { "type": "Element", "name": "span" } };
    Infobadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const severities = ["information", "attention", "success", "caution", "critical"];
      return `<p>InfoBadges are a non-intrusive and intuitive way to display notifications or bring focus to an area within an app - whether that be for notifications, indicating new content, or showing an alert.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> InfoBadge <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        repl: "ce7c58c352e24e84ad6838663e6dcd4e",
        columns: 5
      }, {}, {
        default: () => {
          return `${each(severities, (severity) => {
            return `${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity }, {}, {})}`;
          })}
    ${each(severities, (severity) => {
            return `${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}`;
          })}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<h3 id="${"severity"}">Severity</h3>
<p>InfoBadges can take in a <code>severity</code> prop, which represent the type of information you wish to convey to the user. The default severity is <code>attention</code>.</p>
<table><thead><tr><th>Severity</th>
<th>Preview</th></tr></thead>
<tbody><tr><td><code>attention</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "attention" }, {}, {})}</td></tr>
<tr><td><code>information</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "information" }, {}, {})}</td></tr>
<tr><td><code>success</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "success" }, {}, {})}</td></tr>
<tr><td><code>caution</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "caution" }, {}, {})}</td></tr>
<tr><td><code>critical</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "critical" }, {}, {})}</td></tr></tbody></table>
<h3 id="${"custom-content"}">Custom Content</h3>
<p>The default badge glyph can be overrided with your own content. This can be useful if you wish display text, or an alert count. Passing HTML content into the default slot will override the glyph with said content.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBadge</span><span class="token punctuation">></span></span>99<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBadge</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBadge</span> <span class="token attr-name">severity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>critical<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>bazinga<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBadge</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data5 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  css: () => css35,
  entry: () => entry12,
  js: () => js12,
  module: () => infobadge_md_exports
});
var entry12, js12, css35;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_infobadge_md();
    entry12 = "pages/docs/components/infobadge.md-0e3ee392.js";
    js12 = ["pages/docs/components/infobadge.md-0e3ee392.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/InfoBar-c9f740b0.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js"];
    css35 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/Checkbox-88a6042d.js
var css36, Checkbox;
var init_Checkbox_88a6042d = __esm({
  ".svelte-kit/output/server/chunks/Checkbox-88a6042d.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    css36 = {
      code: ".checkbox.svelte-4ss5hf.svelte-4ss5hf{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-clip:padding-box;background-color:var(--fds-control-alt-fill-secondary);block-size:20px;border:1px solid var(--fds-control-strong-stroke-default);border-radius:var(--fds-control-corner-radius);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:20px;line-height:20px;margin:0;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.checkbox.svelte-4ss5hf.svelte-4ss5hf:focus-visible{box-shadow:var(--fds-focus-stroke)}.checkbox.svelte-4ss5hf.svelte-4ss5hf:hover{background-color:var(--fds-control-alt-fill-tertiary)}.checkbox.svelte-4ss5hf.svelte-4ss5hf:active{background-color:var(--fds-control-alt-fill-quarternary);border-color:var(--fds-control-strong-stroke-disabled)}.checkbox.svelte-4ss5hf:active+.checkbox-glyph.svelte-4ss5hf{color:var(--fds-text-on-accent-secondary)}.checkbox.svelte-4ss5hf.svelte-4ss5hf:disabled{background-color:var(--fds-control-alt-fill-disabled);border-color:var(--fds-control-strong-stroke-disabled);pointer-events:none}.checkbox.svelte-4ss5hf.svelte-4ss5hf:checked,.checkbox.svelte-4ss5hf.svelte-4ss5hf:indeterminate{background-color:var(--fds-accent-default);border:none}.checkbox.svelte-4ss5hf.svelte-4ss5hf:checked:hover,.checkbox.svelte-4ss5hf.svelte-4ss5hf:indeterminate:hover{background-color:var(--fds-accent-secondary)}.checkbox.svelte-4ss5hf.svelte-4ss5hf:checked:active,.checkbox.svelte-4ss5hf.svelte-4ss5hf:indeterminate:active{background-color:var(--fds-accent-tertiary)}.checkbox.svelte-4ss5hf.svelte-4ss5hf:checked:disabled,.checkbox.svelte-4ss5hf.svelte-4ss5hf:indeterminate:disabled{background-color:var(--fds-accent-disabled);border-color:var(--fds-control-strong-stroke-disabled)}.checkbox.svelte-4ss5hf:checked:disabled+.checkbox-glyph.svelte-4ss5hf,.checkbox.svelte-4ss5hf:indeterminate:disabled+.checkbox-glyph.svelte-4ss5hf{color:var(--fds-text-on-accent-disabled)}.checkbox:checked+.checkbox-glyph.svelte-4ss5hf .path-checkmark.svelte-4ss5hf,.checkbox:indeterminate+.checkbox-glyph.svelte-4ss5hf .path-checkmark.svelte-4ss5hf{stroke-dashoffset:0;transition:var(--fds-control-normal-duration) cubic-bezier(.55,0,0,1) stroke-dashoffset}.checkbox-container.svelte-4ss5hf.svelte-4ss5hf{align-items:center;color:var(--fds-text-primary);display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;min-block-size:32px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.checkbox-container.svelte-4ss5hf>span.svelte-4ss5hf{-webkit-padding-start:8px;padding-inline-start:8px}.checkbox-container.disabled.svelte-4ss5hf>span.svelte-4ss5hf{color:var(--fds-text-disabled)}.checkbox-inner.svelte-4ss5hf.svelte-4ss5hf{align-items:center;display:flex;justify-content:center;position:relative}.checkbox-glyph.svelte-4ss5hf.svelte-4ss5hf{block-size:12px;color:inherit;color:var(--fds-text-on-accent-primary);inline-size:12px;position:absolute}.checkbox-glyph.svelte-4ss5hf path.svelte-4ss5hf{transform-origin:center}.checkbox-glyph.svelte-4ss5hf .path-checkmark.svelte-4ss5hf{stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:20.5;stroke-dashoffset:20.5;transform:scale(1.2)}.checkbox-glyph.svelte-4ss5hf .path-indeterminate.svelte-4ss5hf{fill:currentColor;transform:scale(.6666666667) translateX(80px) translateY(240px)}",
      map: null
    };
    Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "checked",
        "indeterminate",
        "value",
        "disabled",
        "class",
        "inputElement",
        "containerElement"
      ]);
      let $$slots = compute_slots(slots);
      let { checked = false } = $$props;
      let { indeterminate = false } = $$props;
      let { value = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
        $$bindings.indeterminate(indeterminate);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      $$result.css.add(css36);
      return `


<label class="${[
        "checkbox-container svelte-4ss5hf",
        (disabled ? "disabled" : "") + " " + (indeterminate ? "indeterminate" : "")
      ].join(" ").trim()}"${add_attribute("this", containerElement, 0)}><div class="${"checkbox-inner svelte-4ss5hf"}"><input${spread([
        { type: "checkbox" },
        { class: "checkbox " + escape(className) },
        { value: escape_attribute_value(value) },
        { disabled: disabled || null },
        escape_object($$restProps)
      ], { classes: "svelte-4ss5hf" })}${add_attribute("checked", checked, 1)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("this", inputElement, 0)}>
		<svg aria-hidden="${"true"}" class="${"checkbox-glyph svelte-4ss5hf"}"${add_attribute("viewBox", indeterminate ? "171 470 683 85" : "0 0 24 24", 0)}>${indeterminate ? `<path class="${"path-indeterminate svelte-4ss5hf"}" d="${"M213.5,554.5C207.5,554.5 201.917,553.417 196.75,551.25C191.583,549.083 187.083,546.083 183.25,542.25C179.417,538.417 176.333,533.917 174,528.75C171.667,523.583 170.5,518 170.5,512C170.5,506 171.667,500.417 174,495.25C176.333,490.083 179.417,485.583 183.25,481.75C187.083,477.917 191.583,474.917 196.75,472.75C201.917,470.583 207.5,469.5 213.5,469.5L810.5,469.5C816.5,469.5 822.083,470.583 827.25,472.75C832.417,474.917 836.917,477.917 840.75,481.75C844.583,485.583 847.667,490.083 850,495.25C852.333,500.417 853.5,506 853.5,512C853.5,518 852.333,523.583 850,528.75C847.667,533.917 844.583,538.417 840.75,542.25C836.917,546.083 832.417,549.083 827.25,551.25C822.083,553.417 816.5,554.5 810.5,554.5Z"}"></path>` : `<path class="${"path-checkmark svelte-4ss5hf"}" d="${"M 4.5303 12.9697 L 8.5 16.9393 L 18.9697 6.4697"}" fill="${"none"}"></path>`}</svg></div>
	${$$slots.default ? `<span class="${"svelte-4ss5hf"}">${slots.default ? slots.default({}) : ``}</span>` : ``}
</label>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/checkbox.md.js
var checkbox_md_exports = {};
__export(checkbox_md_exports, {
  default: () => Checkbox_1
});
var import_panzoom12, data6, Checkbox_1;
var init_checkbox_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/checkbox.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_Checkbox_88a6042d();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom12 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data6 = { "props": [{ "name": "checked", "kind": "let", "description": "Controls whether the checkbox is checked or not.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "indeterminate", "kind": "let", "description": "Controls whether the checkbox is in an indeterminate state.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "value", "kind": "let", "description": "Sets the input element's native `value` attribute for usage in forms.", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the checkbox is intended for user interaction, and styles it accordingly.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "inputElement", "kind": "let", "description": "Obtains a bound DOM reference to the checkbox's <input /> element.", "type": "null | HTMLInputElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "containerElement", "kind": "let", "description": "Obtains a bound DOM reference to the checkbox's outer container element.", "type": "null | HTMLLabelElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }], "events": [], "typedefs": [], "rest_props": { "type": "Element", "name": "input" } };
    Checkbox_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>Checkboxes represent a control that a user can select (check) or clear (uncheck). A Checkbox can also report its value as indeterminate.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        columns: 3,
        repl: "f749a248f8924ea3a90db238cc2c2415"
      }, {}, {
        default: () => {
          return `${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}
    ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true }, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}
    ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true, indeterminate: true }, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}
    ${validate_component(Checkbox, "Checkbox").$$render($$result, { disabled: true }, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}
    ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true, disabled: true }, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}
    ${validate_component(Checkbox, "Checkbox").$$render($$result, {
            checked: true,
            disabled: true,
            indeterminate: true
          }, {}, {
            default: () => {
              return `Checkbox`;
            }
          })}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<p><code>&lt;Checkbox /&gt;</code> is a wrapper around HTML\u2019s <code>&lt;input /&gt;</code> checkbox type. As such, the APIs share some similarities.</p>
<h3 id="${"checking-and-unchecking"}">Checking and Unchecking</h3>
<p>You can programmatically control if the checkbox is in it\u2019s checked state by setting the <code>checked</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span> <span class="token attr-name">checked</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Additionally, you can use svelte\u2019s two-way binding syntax to bind the checked state to a variable.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> checked <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span> <span class="token attr-name"><span class="token namespace">bind:</span>checked</span> <span class="token punctuation">/></span></span>

Current state: &#123;checked ? "checked" : "unchecked"&#125;</code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"indeterminate-states"}">Indeterminate States</h3>
<p>If the checkbox cannot be represented as either checked or unchecked, it can be marked as <em>indeterminate</em> using the <code>indeterminate</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span> <span class="token attr-name">indeterminate</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"labels"}">Labels</h3>
<p>Passing in content to the checkbox\u2019s slot will cause that content to be rendered into a label for the control.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span><span class="token punctuation">></span></span>I have a label!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Checkbox</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"value"}">Value</h3>
<p>For usage in forms, you can set a <code>value</code> property which will set the <a href="${"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value"}" rel="${"nofollow"}">value</a> of the Checkbox\u2019s <code>&lt;input&gt;</code> element.</p>
<h3 id="${"disabled-checkboxes"}">Disabled Checkboxes</h3>
<p>If the checkbox is not meant to be clicked, you can use the <code>disabled</code> property to visually indicate this. If a checkbox is disabled, it will be unclickable.</p>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data6 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  css: () => css37,
  entry: () => entry13,
  js: () => js13,
  module: () => checkbox_md_exports
});
var entry13, js13, css37;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_checkbox_md();
    entry13 = "pages/docs/components/checkbox.md-b50fd942.js";
    js13 = ["pages/docs/components/checkbox.md-b50fd942.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/Checkbox-5f7c1302.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css37 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/expander.md.js
var expander_md_exports = {};
__export(expander_md_exports, {
  default: () => Expander_1
});
var import_panzoom13, data7, Expander_1;
var init_expander_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/expander.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_Expander_274dc980();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_circle_16_regular_be646c52();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom13 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data7 = { "props": [{ "name": "expanded", "kind": "let", "description": "Determines whether the expander is expanded (open) or not.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "direction", "kind": "let", "description": "Determines the direction that the expander will extend to.", "type": "string", "value": '"down"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "containerElement", "kind": "let", "description": "Obtains a bound DOM reference to the expander's container element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "headerElement", "kind": "let", "description": "Obtains a bound DOM reference to the expander's header button element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "contentElement", "kind": "let", "description": "Obtains a bound DOM reference to the expander's content container.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }, { "name": "content", "default": false, "slot_props": "{}" }, { "name": "icon", "default": false, "slot_props": "{}" }], "events": [{ "type": "dispatched", "name": "expand" }, { "type": "dispatched", "name": "collapse" }], "typedefs": [], "rest_props": { "type": "Element", "name": "div" } };
    Expander_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Expander <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        style: "block-size: 360px;",
        repl: "78aa3269aba34022a958311963520428"
      }, {}, {
        default: () => {
          return `${validate_component(Expander, "Expander").$$render($$result, {}, {}, {
            content: () => {
              return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
            },
            default: () => {
              return `Expander
        `;
            }
          })}
    ${validate_component(Expander, "Expander").$$render($$result, {}, {}, {
            content: () => {
              return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
            },
            icon: () => {
              return `<!-- HTML_TAG_START -->${Circle}<!-- HTML_TAG_END -->
        `;
            },
            default: () => {
              return `Expander
        `;
            }
          })}
    ${validate_component(Expander, "Expander").$$render($$result, { direction: "up" }, {}, {
            content: () => {
              return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        `;
            },
            default: () => {
              return `Expander
        `;
            }
          })}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<p>A basic expander expects a header and contents. The expander\u2019s default slot will be rendered into the header, while content can be rendered into the <code>content</code> slot.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span><span class="token punctuation">></span></span>
    Header
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>fragment</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        Content
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">svelte:</span>fragment</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"controlling-expansion"}">Controlling Expansion</h3>
<p>Expanders can be either expanded or collapsed. This can be controlled by setting the <code>expanded</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span> <span class="token attr-name">expanded</span><span class="token punctuation">></span></span>
    I am expanded by default.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"directions"}">Directions</h3>
<p>An expander doesn\u2019t have to expand downwards. You can control an expander\u2019s expansion direction using the <code>direction</code> property. To create an upwards-expanding expander, set <code>direction</code> to <code>up</code>.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span> <span class="token attr-name">direction</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>up<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    I am expanded by default.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"adding-an-icon"}">Adding an Icon</h3>
<p>You can easily add an icon to an expander\u2019s header using the <code>icon</code> slot. Passing in an SVG element will render it into the header with 16x16 dimensions.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://github.com/microsoft/fluentui-system-icons --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 16 16<span class="token punctuation">"</span></span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
    Expander
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>fragment</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">svelte:</span>fragment</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data7 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  css: () => css38,
  entry: () => entry14,
  js: () => js14,
  module: () => expander_md_exports
});
var entry14, js14, css38;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_expander_md();
    entry14 = "pages/docs/components/expander.md-be19cee2.js";
    js14 = ["pages/docs/components/expander.md-be19cee2.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/Expander-e69a98d3.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css38 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/listitem.md.js
var listitem_md_exports = {};
__export(listitem_md_exports, {
  default: () => Listitem
});
var import_panzoom14, data8, Listitem;
var init_listitem_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/listitem.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_ListItem_8cad2fba();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_circle_16_regular_be646c52();
    init_TextBlock_b8b64333();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom14 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data8 = { "props": [{ "name": "selected", "kind": "let", "description": "Controls whether the item is selected or not.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the item is intended for user interaction, and styles it accordingly.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "href", "kind": "let", "description": "Sets an href value and converts the list element into an anchor.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "role", "kind": "let", "description": "Specifies an ARIA role for the item.", "type": "string", "value": '"listitem"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the item's element.", "type": "null | HTMLAnchorElement | HTMLLIElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }, { "name": "icon", "default": false, "slot_props": "{}" }], "events": [{ "type": "dispatched", "name": "select" }], "typedefs": [], "rest_props": { "type": "Element", "name": "button | a" } };
    Listitem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>List Items display data stacked vertically in a single column. List Items work better for items that have text as a focal point, and for collections that are meant to be read top to bottom (i.e. alphabetically ordered). A few common use cases for List Items include lists of messages and search results.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ListItem <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, { repl: "" }, {}, {
        default: () => {
          return `<div style="${"inline-size: 240px"}">${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
            default: () => {
              return `ListItem`;
            }
          })}
        ${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
            icon: () => {
              return `<!-- HTML_TAG_START -->${Circle}<!-- HTML_TAG_END -->
            `;
            },
            default: () => {
              return `ListItem
        `;
            }
          })}
        ${validate_component(ListItem, "ListItem").$$render($$result, { selected: true }, {}, {
            default: () => {
              return `ListItem`;
            }
          })}
        ${validate_component(ListItem, "ListItem").$$render($$result, { disabled: true }, {}, {
            default: () => {
              return `ListItem`;
            }
          })}</div>`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<p>A ListItem is either a general-purpose item or a link. By default, an item will be rendered as a standard HTML <code>&lt;li&gt;</code> element. If an <code>href</code> property is provided, the item will be converted into an <code>&lt;a&gt;</code> tag.</p>
<h3 id="${"selecting-items"}">Selecting Items</h3>
<p>An item can be marked as <em>selected</em> to indicate that it a currently active option. To do this, use the <code>selected</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span> <span class="token attr-name">selected</span><span class="token punctuation">></span></span>Text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>You can also listen to the <code>select</code> event, which is dispatched when the <code>selected</code> property is changed to a truthy value.</p>
<h3 id="${"disabled-items"}">Disabled Items</h3>
<p>If the item is not meant to be clicked, you can use the <code>disabled</code> property to visually indicate this. If an item is disabled, it will be unclickable and the <code>href</code> prop will be ignored.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span> <span class="token attr-name">disabled</span><span class="token punctuation">></span></span>Text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"adding-an-icon"}">Adding an Icon</h3>
<p>You can easily add an icon to an item using the <code>icon</code> slot. Passing in an SVG element will render it before any contents with 16x16 dimensions.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://github.com/microsoft/fluentui-system-icons --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 16 16<span class="token punctuation">"</span></span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
    Text
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"aria-roles"}">ARIA Roles</h3>
<p>For the purposes of accessibly adapting ListItems to certain use-cases, a <code>role</code> property has been exposed to override the default <a href="${"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques"}" rel="${"nofollow"}">ARIA role</a> of the item, which is <code>listitem</code>.</p>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data8 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  css: () => css39,
  entry: () => entry15,
  js: () => js15,
  module: () => listitem_md_exports
});
var entry15, js15, css39;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_listitem_md();
    entry15 = "pages/docs/components/listitem.md-64becdb0.js";
    js15 = ["pages/docs/components/listitem.md-64becdb0.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/ListItem-3fe40cc9.js", "chunks/TextBlock-d5339f0f.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css39 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/infobar.md.js
var infobar_md_exports = {};
__export(infobar_md_exports, {
  default: () => Infobar
});
var import_panzoom15, data9, Infobar;
var init_infobar_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/infobar.md.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_InfoBar_70c602a0();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom15 = __toModule(require_panzoom());
    data9 = { "props": [{ "name": "open", "kind": "let", "description": "Determines whether the bar is open (rendered).", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "closable", "kind": "let", "description": "Determines whether the close button is used or not.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "severity", "kind": "let", "description": "Indicates the severity color of the bar.", "type": "string", "value": '"information"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "title", "kind": "let", "description": "Title of the Infobar.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "message", "kind": "let", "description": "Description text shown next to or below the title.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the bar's container element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "titleElement", "kind": "let", "description": "Obtains a bound DOM reference to the bar's title element.", "type": "null | HTMLHeadingElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "messageElement", "kind": "let", "description": "Obtains a bound DOM reference to the bar's message (paragraph) element.", "type": "null | HTMLParagraphElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "actionElement", "kind": "let", "description": "Obtains a bound DOM reference to the bar's action wrapper element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "closeButtonElement", "kind": "let", "description": "Obtains a bound DOM reference to the bar's close button element.", "type": "null | HTMLButtonElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }, { "name": "action", "default": false, "slot_props": "{}" }, { "name": "icon", "default": false, "fallback": "<InfoBadge {severity} />", "slot_props": "{}" }], "events": [{ "type": "dispatched", "name": "open" }, { "type": "dispatched", "name": "close" }], "typedefs": [], "rest_props": { "type": "Element", "name": "div" } };
    Infobar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>The InfoBar control is for displaying app-wide status messages to users that are highly visible yet non-intrusive. There are built-in security levels to easily indicate the type of message shown as well as the option to include your own call to action or hyperlink button.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> InfoBar <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        repl: "789be6a7b377455aab6f44e123885423",
        columns: 2
      }, {}, {
        default: () => {
          return `${validate_component(InfoBar, "InfoBar").$$render($$result, { title: "Title", message: "Message" }, {}, {
            action: () => {
              return `${validate_component(Button, "Button").$$render($$result, { slot: "action" }, {}, {
                default: () => {
                  return `Action`;
                }
              })}`;
            }
          })}
    ${validate_component(InfoBar, "InfoBar").$$render($$result, {
            title: "Title",
            message: "Message",
            severity: "attention"
          }, {}, {
            action: () => {
              return `${validate_component(Button, "Button").$$render($$result, { slot: "action", variant: "accent" }, {}, {
                default: () => {
                  return `Action`;
                }
              })}`;
            }
          })}
    ${validate_component(InfoBar, "InfoBar").$$render($$result, {
            title: "Title",
            message: "Message",
            closable: false
          }, {}, {})}
    ${validate_component(InfoBar, "InfoBar").$$render($$result, {
            title: "Title",
            message: "Message",
            severity: "success"
          }, {}, {})}
    ${validate_component(InfoBar, "InfoBar").$$render($$result, {
            title: "Title",
            message: "Message",
            severity: "caution"
          }, {}, {})}
    ${validate_component(InfoBar, "InfoBar").$$render($$result, {
            title: "Title",
            message: "Message",
            severity: "critical"
          }, {}, {})}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<h3 id="${"text-contents---title-and-message"}">Text Contents - <code>title</code> and <code>message</code></h3>
<p>There are two areas of text that can be customized - the title and the message. Both are optional, but at least one is recommended.</p>
<ul><li>You can specify a title for the InfoBar using <code>title</code> property.</li>
<li>You can set the InfoBar\u2019s message using the <code>message</code> property.</li></ul>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBar</span>
    <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Title<span class="token punctuation">"</span></span>
    <span class="token attr-name">message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Message<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>If you need to include HTML content into the message, you can also just use the default slot.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBar</span><span class="token punctuation">></span></span>
    Visit <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://fluent-svelte.vercel.app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Fluent Svelte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span> for some neat fluent design components!
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBar</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"severity"}">Severity</h3>
<p>InfoBars can take in a <code>severity</code> prop, which represent the type of information you wish to convey to the user. The default severity is <code>information</code>.</p>
<table><thead><tr><th>Severity</th>
<th>Badge</th>
<th>Usage</th>
<th>Preview</th></tr></thead>
<tbody><tr><td><code>information</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "information" }, {}, {})}</td>
<td>Non-critical messages containing general information.</td>
<td>${validate_component(InfoBar, "InfoBar").$$render($$result, {
        severity: "information",
        title: "Information"
      }, {}, {})}</td></tr>
<tr><td><code>attention</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "attention" }, {}, {})}</td>
<td>Messages that are non-critical, but still important to the user.</td>
<td>${validate_component(InfoBar, "InfoBar").$$render($$result, {
        severity: "attention",
        title: "Attention"
      }, {}, {})}</td></tr>
<tr><td><code>success</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "success" }, {}, {})}</td>
<td>Messages that convey an action that has postively been completed.</td>
<td>${validate_component(InfoBar, "InfoBar").$$render($$result, { severity: "success", title: "Success" }, {}, {})}</td></tr>
<tr><td><code>caution</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "caution" }, {}, {})}</td>
<td>Messages that serve to warn the user of a potentially dangerous action.</td>
<td>${validate_component(InfoBar, "InfoBar").$$render($$result, { severity: "caution", title: "Caution" }, {}, {})}</td></tr>
<tr><td><code>critical</code></td>
<td>${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "critical" }, {}, {})}</td>
<td>Higher-severity messages that convey a dangerous or failed action.</td>
<td>${validate_component(InfoBar, "InfoBar").$$render($$result, { severity: "critical", title: "Critical" }, {}, {})}</td></tr></tbody></table>
<h3 id="${"action-buttons"}">Action Buttons</h3>
<p>An action button can be passed in using the <code>action</code> slot. It\u2019s recommended that you use the <a href="${"/docs/components/button"}">Button</a> component for this, but any HTML element is valid.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Infobar</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Title<span class="token punctuation">"</span></span> <span class="token attr-name">message</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Message<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Action<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBar</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"controlling-visibility"}">Controlling Visibility</h3>
<p>Flyouts by default are <code>open</code>. This means that they are rendered into the DOM. When the close button is pressed, they will be removed from the DOM and the <code>open</code> property will be set to false.</p>
<p>You can configure a flyout\u2019s default visibility state when it is rendered by setting the <code>open</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBar</span> <span class="token attr-name">open</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;false&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>You can also use two-way binding to programatically control a bar\u2019s visibility.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> InfoBar<span class="token punctuation">,</span> Button <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> open <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

&lt;Button on:click=&#123;() => open = !open&#125;>Toggle InfoBar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBar</span> <span class="token attr-name"><span class="token namespace">bind:</span>open</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>If you don\u2019t want an InfoBar to be closable by the user, you can set the <code>closable</code> property to <code>false</code> which will hide the close button.</p>
<h3 id="${"custom-icons"}">Custom Icons</h3>
<p>The <code>icon</code> slot can be used to override the default badge for the InfoBar and provide your own.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBar</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://github.com/microsoft/fluentui-system-icons --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 16 16<span class="token punctuation">"</span></span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBar</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data9 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  css: () => css40,
  entry: () => entry16,
  js: () => js16,
  module: () => infobar_md_exports
});
var entry16, js16, css40;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_infobar_md();
    entry16 = "pages/docs/components/infobar.md-1d45ef6f.js";
    js16 = ["pages/docs/components/infobar.md-1d45ef6f.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/InfoBar-c9f740b0.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js"];
    css40 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/button.md.js
var button_md_exports = {};
__export(button_md_exports, {
  default: () => Button_1
});
var import_panzoom16, data10, Button_1;
var init_button_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/button.md.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom16 = __toModule(require_panzoom());
    init_InfoBar_70c602a0();
    data10 = { "props": [{ "name": "variant", "kind": "let", "description": "Specifies the visual styling of the button.", "type": "string", "value": '"standard"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "href", "kind": "let", "description": "Sets an href value and converts the button element into an anchor/", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the button is intended for user interaction, and styles it accordingly.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "element", "kind": "let", "description": "Obtains a bound DOM reference to the button or anchor element.", "type": "null | HTMLAnchorElement | HTMLButtonElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }], "slots": [{ "name": "__default__", "default": true, "slot_props": "{}" }], "events": [], "typedefs": [], "rest_props": { "type": "Element", "name": "button | a" } };
    Button_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        columns: 3,
        repl: "0c6ca42e2c5c4868a7a8c1a1a45759eb"
      }, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { variant: "standard" }, {}, {
            default: () => {
              return `Button`;
            }
          })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
            default: () => {
              return `Button`;
            }
          })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink" }, {}, {
            default: () => {
              return `Button`;
            }
          })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "standard", disabled: true }, {}, {
            default: () => {
              return `Button`;
            }
          })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "accent", disabled: true }, {}, {
            default: () => {
              return `Button`;
            }
          })}
    ${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink", disabled: true }, {}, {
            default: () => {
              return `Button`;
            }
          })}`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<p>A button can either be a clickable action or a link. By default, a button will be rendered as a standard HTML <code>&lt;button&gt;</code> element. If an <code>href</code> property is provided, the button will be converted into an <code>&lt;a&gt;</code> tag.</p>
<h3 id="${"styles"}">Styles</h3>
<p>Buttons come in three possible <em>variants</em> - <code>standard</code>, <code>accent</code> and <code>hyperlink</code>. Variants can be specified using the <code>variant</code> property.</p>
<table><thead><tr><th>Variant</th>
<th>Preview</th>
<th>Usage</th></tr></thead>
<tbody><tr><td><code>standard</code></td>
<td>${validate_component(Button, "Button").$$render($$result, { variant: "standard" }, {}, {
        default: () => {
          return `Standard Button`;
        }
      })}</td>
<td>Secondary or alternative actions that are not important to the user.</td></tr>
<tr><td><code>accent</code></td>
<td>${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
        default: () => {
          return `Accent Button`;
        }
      })}</td>
<td>Actions that are important to the user, or are the primary focus a decision.</td></tr>
<tr><td><code>hyperlink</code></td>
<td>${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink" }, {}, {
        default: () => {
          return `Hyperlink Button`;
        }
      })}</td>
<td>Low-emphasis, tertiary actions that link to an external resource.</td></tr></tbody></table>
<h3 id="${"disabled-buttons"}">Disabled Buttons</h3>
<p>If the button is not meant to be clicked, you can use the <code>disabled</code> property to visually indicate this. If a button is disabled, it will be unclickable and the <code>href</code> property will be ignored.</p>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data10 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  css: () => css41,
  entry: () => entry17,
  js: () => js17,
  module: () => button_md_exports
});
var entry17, js17, css41;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    init_button_md();
    entry17 = "pages/docs/components/button.md-f6f4729f.js";
    js17 = ["pages/docs/components/button.md-f6f4729f.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/Showcase-188efe60.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/InfoBar-c9f740b0.js"];
    css41 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/chunks/Slider-864f386c.js
var css42, Slider;
var init_Slider_864f386c = __esm({
  ".svelte-kit/output/server/chunks/Slider-864f386c.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TooltipWrapper_9548af36();
    css42 = {
      code: '.slider.svelte-13uqtr.svelte-13uqtr{align-items:center;border-radius:var(--fds-control-corner-radius);display:flex;justify-content:center;min-block-size:32px;min-inline-size:32px;position:relative}.slider.svelte-13uqtr.svelte-13uqtr:focus-visible{box-shadow:var(--fds-focus-stroke);outline:none}.slider-thumb.svelte-13uqtr:active .slider-tooltip,.slider.svelte-13uqtr:active .slider-tooltip,.slider.svelte-13uqtr:focus-visible .slider-tooltip{opacity:1}.slider.orientation-horizontal.svelte-13uqtr.svelte-13uqtr{block-size:32px;inline-size:100%}.slider.orientation-horizontal.svelte-13uqtr .slider-rail.svelte-13uqtr{block-size:4px;inline-size:100%;justify-content:flex-start}.slider.orientation-horizontal.svelte-13uqtr .slider-track.svelte-13uqtr{block-size:100%;inline-size:var(--fds-slider-percentage)}.slider.orientation-horizontal.svelte-13uqtr .slider-thumb.svelte-13uqtr{inset-inline-start:var(--fds-slider-percentage);transform:translateX(-50%)}.slider.orientation-horizontal.svelte-13uqtr .slider-tick.svelte-13uqtr{flex-direction:column;height:100%;inset-inline-start:var(--fds-slider-tick-percentage);padding:6px 0}.slider.orientation-horizontal.svelte-13uqtr .slider-tick.svelte-13uqtr:after,.slider.orientation-horizontal.svelte-13uqtr .slider-tick.svelte-13uqtr:before{-webkit-border-start:1px solid var(--fds-control-strong-fill-default);border-inline-start:1px solid var(--fds-control-strong-fill-default);height:4px;width:1px}.slider.orientation-horizontal.reverse.svelte-13uqtr .slider-rail.svelte-13uqtr{justify-content:flex-end}.slider.orientation-horizontal.reverse.svelte-13uqtr .slider-thumb.svelte-13uqtr{inset-inline-end:var(--fds-slider-percentage);inset-inline-start:unset;transform:translateX(50%)}.slider.orientation-horizontal.reverse.svelte-13uqtr .slider-tick.svelte-13uqtr{inset-inline-end:var(--fds-slider-tick-percentage);inset-inline-start:unset}.slider.orientation-vertical.svelte-13uqtr.svelte-13uqtr{block-size:100%;inline-size:32px}.slider.orientation-vertical.svelte-13uqtr .slider-rail.svelte-13uqtr{align-items:flex-end;block-size:100%;inline-size:4px}.slider.orientation-vertical.svelte-13uqtr .slider-track.svelte-13uqtr{block-size:var(--fds-slider-percentage);inline-size:100%}.slider.orientation-vertical.svelte-13uqtr .slider-thumb.svelte-13uqtr{inset-block-end:var(--fds-slider-percentage);transform:translateY(50%)}.slider.orientation-vertical.svelte-13uqtr .slider-tick.svelte-13uqtr{inset-block-end:var(--fds-slider-tick-percentage);padding:0 6px;width:100%}.slider.orientation-vertical.svelte-13uqtr .slider-tick.svelte-13uqtr:after,.slider.orientation-vertical.svelte-13uqtr .slider-tick.svelte-13uqtr:before{border-top:1px solid var(--fds-control-strong-fill-default);height:1px;width:4px}.slider.orientation-vertical.reverse.svelte-13uqtr .slider-rail.svelte-13uqtr{align-items:flex-start}.slider.orientation-vertical.reverse.svelte-13uqtr .slider-thumb.svelte-13uqtr{inset-block-end:unset;inset-block-start:var(--fds-slider-percentage);transform:translateY(-50%)}.slider.orientation-vertical.reverse.svelte-13uqtr .slider-tick.svelte-13uqtr{inset-block-end:unset;inset-block-start:var(--fds-slider-tick-percentage)}.slider.disabled.svelte-13uqtr .slider-rail.svelte-13uqtr,.slider.disabled.svelte-13uqtr .slider-thumb.svelte-13uqtr:before,.slider.disabled.svelte-13uqtr .slider-track.svelte-13uqtr{background-color:var(--fds-accent-disabled)}.slider.disabled.svelte-13uqtr .slider-thumb.svelte-13uqtr:before{transform:none}.slider.disabled.svelte-13uqtr .slider-tick.svelte-13uqtr:after,.slider.disabled.svelte-13uqtr .slider-tick.svelte-13uqtr:before{border-color:var(--fds-control-fill-disabled)}.slider-rail.svelte-13uqtr.svelte-13uqtr{align-items:center;background-color:var(--fds-control-strong-fill-default);border-radius:50px;display:flex;overflow:hidden}.slider-track.svelte-13uqtr.svelte-13uqtr{background-color:var(--fds-accent-default)}.slider-tick-bar.svelte-13uqtr.svelte-13uqtr{height:100%;inset-block-start:0;inset-inline-start:0;position:absolute;width:100%;z-index:-1}.slider-tick-bar.placement-after.svelte-13uqtr .slider-tick.svelte-13uqtr:before,.slider-tick-bar.placement-before.svelte-13uqtr .slider-tick.svelte-13uqtr:after{visibility:hidden}.slider-tick.svelte-13uqtr.svelte-13uqtr{align-items:center;box-sizing:border-box;display:flex;justify-content:space-between;position:absolute}.slider-tick.svelte-13uqtr.svelte-13uqtr:after,.slider-tick.svelte-13uqtr.svelte-13uqtr:before{content:""}.slider-thumb.svelte-13uqtr.svelte-13uqtr{align-items:center;background-color:var(--fds-control-solid-fill-default);block-size:20px;box-shadow:0 0 0 1px var(--fds-control-stroke-default);display:flex;inline-size:20px;justify-content:center;z-index:100}.slider-thumb.svelte-13uqtr.svelte-13uqtr,.slider-thumb.svelte-13uqtr.svelte-13uqtr:before{border-radius:100%;position:absolute}.slider-thumb.svelte-13uqtr.svelte-13uqtr:before{background-color:var(--fds-accent-default);block-size:12px;content:"";inline-size:12px;transition:var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) transform}.slider-thumb.svelte-13uqtr.svelte-13uqtr:hover:before{transform:scale(1.167)}.slider-thumb.svelte-13uqtr:hover .slider-tooltip{opacity:1;transition-delay:1s}.slider-thumb.svelte-13uqtr.svelte-13uqtr:active:before{background-color:var(--fds-accent-tertiary);transform:scale(.833)}.slider.svelte-13uqtr .slider-tooltip{inset-block-end:calc(100% + 18px);inset-inline-start:50%;max-inline-size:unset;opacity:0;pointer-events:none;position:absolute;transform:translateX(-50%);transition:var(--fds-control-fast-duration) linear opacity;white-space:nowrap;z-index:100}',
      map: null
    };
    Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let percentage;
      let $$restProps = compute_rest_props($$props, [
        "value",
        "min",
        "max",
        "step",
        "ticks",
        "tickPlacement",
        "tooltip",
        "prefix",
        "suffix",
        "track",
        "orientation",
        "reverse",
        "disabled",
        "class",
        "inputElement",
        "containerElement",
        "tickBarElement",
        "thumbElement",
        "railElement",
        "trackElement",
        "stepUp",
        "stepDown"
      ]);
      let { value = 0 } = $$props;
      let { min = 0 } = $$props;
      let { max = 100 } = $$props;
      let { step = 1 } = $$props;
      let { ticks = [] } = $$props;
      let { tickPlacement = "around" } = $$props;
      let { tooltip = true } = $$props;
      let { prefix = "" } = $$props;
      let { suffix = "" } = $$props;
      let { track = true } = $$props;
      let { orientation = "horizontal" } = $$props;
      let { reverse = false } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { tickBarElement = null } = $$props;
      let { thumbElement = null } = $$props;
      let { railElement = null } = $$props;
      let { trackElement = null } = $$props;
      createEventForwarder(get_current_component(), ["input", "change", "beforeinput"]);
      const valueToPercentage = (v) => (v - min) / (max - min) * 100;
      function stepUp() {
        value += step;
        if (value > max)
          value = max;
      }
      function stepDown() {
        value -= step;
        if (value < min)
          value = min;
      }
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.min === void 0 && $$bindings.min && min !== void 0)
        $$bindings.min(min);
      if ($$props.max === void 0 && $$bindings.max && max !== void 0)
        $$bindings.max(max);
      if ($$props.step === void 0 && $$bindings.step && step !== void 0)
        $$bindings.step(step);
      if ($$props.ticks === void 0 && $$bindings.ticks && ticks !== void 0)
        $$bindings.ticks(ticks);
      if ($$props.tickPlacement === void 0 && $$bindings.tickPlacement && tickPlacement !== void 0)
        $$bindings.tickPlacement(tickPlacement);
      if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
        $$bindings.tooltip(tooltip);
      if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
        $$bindings.prefix(prefix);
      if ($$props.suffix === void 0 && $$bindings.suffix && suffix !== void 0)
        $$bindings.suffix(suffix);
      if ($$props.track === void 0 && $$bindings.track && track !== void 0)
        $$bindings.track(track);
      if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
        $$bindings.orientation(orientation);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
        $$bindings.reverse(reverse);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.tickBarElement === void 0 && $$bindings.tickBarElement && tickBarElement !== void 0)
        $$bindings.tickBarElement(tickBarElement);
      if ($$props.thumbElement === void 0 && $$bindings.thumbElement && thumbElement !== void 0)
        $$bindings.thumbElement(thumbElement);
      if ($$props.railElement === void 0 && $$bindings.railElement && railElement !== void 0)
        $$bindings.railElement(railElement);
      if ($$props.trackElement === void 0 && $$bindings.trackElement && trackElement !== void 0)
        $$bindings.trackElement(trackElement);
      if ($$props.stepUp === void 0 && $$bindings.stepUp && stepUp !== void 0)
        $$bindings.stepUp(stepUp);
      if ($$props.stepDown === void 0 && $$bindings.stepDown && stepDown !== void 0)
        $$bindings.stepDown(stepDown);
      $$result.css.add(css42);
      {
        {
          if (value <= min)
            value = min;
          else if (value >= max)
            value = max;
        }
      }
      percentage = valueToPercentage(value);
      return `


<div${spread([
        {
          tabindex: escape_attribute_value(disabled ? -1 : 0)
        },
        {
          style: "--fds-slider-percentage: " + escape(percentage) + "%"
        },
        {
          class: "slider orientation-" + escape(orientation) + " " + escape(className)
        },
        escape_object($$restProps)
      ], {
        classes: (disabled ? "disabled" : "") + " " + (reverse ? "reverse" : "") + " svelte-13uqtr"
      })}${add_attribute("this", containerElement, 0)}><div class="${"slider-thumb svelte-13uqtr"}" role="${"slider"}"${add_attribute("aria-valuemin", min, 0)}${add_attribute("aria-valuemax", max, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("this", thumbElement, 0)}>${tooltip && !disabled ? `${validate_component(TooltipSurface, "TooltipSurface").$$render($$result, { class: "slider-tooltip" }, {}, {
        default: () => {
          return `${slots.tooltip ? slots.tooltip({ prefix, suffix, value }) : `
                    ${escape(prefix)}${escape(value)}${escape(suffix)}
                `}`;
        }
      })}` : ``}</div>

	<div class="${"slider-rail svelte-13uqtr"}"${add_attribute("this", railElement, 0)}>${track ? `<div class="${"slider-track svelte-13uqtr"}"${add_attribute("this", trackElement, 0)}></div>` : ``}</div>

	${ticks ? `<div class="${"slider-tick-bar placement-" + escape(tickPlacement) + " svelte-13uqtr"}"${add_attribute("this", tickBarElement, 0)}>${each(ticks, (tick) => {
        return `<div class="${"slider-tick svelte-13uqtr"}" style="${"--fds-slider-tick-percentage: " + escape(valueToPercentage(tick)) + "%"}"></div>`;
      })}</div>` : ``}

	<input type="${"range"}" hidden${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)} ${disabled ? "disabled" : ""}${add_attribute("value", value, 0)}${add_attribute("this", inputElement, 0)}>
</div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/docs/components/slider.md.js
var slider_md_exports = {};
__export(slider_md_exports, {
  default: () => Slider_1
});
var import_panzoom17, data11, Slider_1;
var init_slider_md = __esm({
  ".svelte-kit/output/server/entries/pages/docs/components/slider.md.js"() {
    init_index_f16625c7();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_Slider_864f386c();
    init_Showcase_4ad8ba4a();
    init_APIDocs_156cf58d();
    init_TooltipWrapper_9548af36();
    init_IconButton_302c6ea8();
    import_panzoom17 = __toModule(require_panzoom());
    init_Button_4c34ff2d();
    init_InfoBar_70c602a0();
    data11 = { "props": [{ "name": "value", "kind": "let", "description": "The slider's current value.", "type": "number", "value": "0", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "min", "kind": "let", "description": "The minimum value of the slider.", "type": "number", "value": "0", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "max", "kind": "let", "description": "The maximum value of the slider.", "type": "number", "value": "100", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "step", "kind": "let", "description": "Determines how much the slider's value should increase per step.", "type": "number", "value": "1", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "ticks", "kind": "let", "description": "Determines the position of slider ticks along the min and max of the track.", "type": "[]", "value": "[]", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "tickPlacement", "kind": "let", "description": "Determines the placement of slider ticks around the track.", "type": "string", "value": '"around"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "tooltip", "kind": "let", "description": "Determines if the slider's value tooltip will be shown.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "prefix", "kind": "let", "description": "Text placed before the slider's value tooltip.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "suffix", "kind": "let", "description": "Text placed after the slider's value tooltip.", "type": "string", "value": '""', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "track", "kind": "let", "description": "Determines if the slider's fill track will be visible or not.", "type": "boolean", "value": "true", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "orientation", "kind": "let", "description": "Determines the slider's orientation.", "type": "string", "value": '"horizontal"', "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "reverse", "kind": "let", "description": "Determines if the slider track will be in reverse direction.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "disabled", "kind": "let", "description": "Controls whether the slider is disabled.", "type": "boolean", "value": "false", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": false }, { "name": "inputElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's input element.", "type": "null | HTMLInputElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "containerElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's outer container element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "tickBarElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's tick container element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "thumbElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's thumb element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "railElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's outer rail element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "trackElement", "kind": "let", "description": "Obtains a bound DOM reference to the slider's track (fill) element.", "type": "null | HTMLDivElement", "value": "null", "isFunction": false, "isFunctionDeclaration": false, "constant": false, "reactive": true }, { "name": "stepUp", "kind": "function", "type": "() => any", "value": "() => {     value += step;     if (value > max)         value = max; }", "isFunction": true, "isFunctionDeclaration": true, "constant": false, "reactive": false }, { "name": "stepDown", "kind": "function", "type": "() => any", "value": "() => {     value -= step;     if (value < min)         value = min; }", "isFunction": true, "isFunctionDeclaration": true, "constant": false, "reactive": false }], "slots": [{ "name": "tooltip", "default": false, "fallback": "{prefix}{value}{suffix}", "slot_props": "{ prefix: string, suffix: string, value: number }" }], "events": [{ "type": "forwarded", "name": "change", "element": "input" }, { "type": "forwarded", "name": "input", "element": "input" }, { "type": "forwarded", "name": "beforeinput", "element": "input" }], "typedefs": [], "rest_props": { "type": "Element", "name": "div" } };
    Slider_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p>A slider is a control that lets the user select from a range of values by moving a thumb control along a track.</p>
<pre class="${"language-ts"}"><!-- HTML_TAG_START -->${`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Slider <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Showcase, "Showcase").$$render($$result, {
        columns: 4,
        columnWidth: "120px",
        repl: "461bd056ac7b4c7a920354256560b0a4"
      }, {}, {
        default: () => {
          return `<div style="${"display: contents"}">${validate_component(Slider, "Slider").$$render($$result, {}, {}, {})}
        ${validate_component(Slider, "Slider").$$render($$result, {
            value: 1e4,
            step: 1e4,
            max: 3e4,
            ticks: [1e4, 2e4],
            suffix: "cm"
          }, {}, {})}
        ${validate_component(Slider, "Slider").$$render($$result, { value: 80, max: 200, reverse: true }, {}, {})}
        ${validate_component(Slider, "Slider").$$render($$result, { value: 50, disabled: true }, {}, {})}
        <div style="${"block-size: 72px;"}">${validate_component(Slider, "Slider").$$render($$result, { orientation: "vertical", value: 24 }, {}, {})}</div>
        ${validate_component(Slider, "Slider").$$render($$result, {
            orientation: "vertical",
            value: 50,
            reverse: true
          }, {}, {})}
        ${validate_component(Slider, "Slider").$$render($$result, {
            orientation: "vertical",
            value: 76,
            track: false,
            ticks: [24, 50, 76],
            tickPlacement: "after"
          }, {}, {})}
        ${validate_component(Slider, "Slider").$$render($$result, {
            orientation: "vertical",
            value: 24,
            disabled: true
          }, {}, {})}</div>`;
        }
      })}
<h2 id="${"usage"}">Usage</h2>
<h3 id="${"controlling-value"}">Controlling Value</h3>
<p>By default, sliders are created with a value of <code>0</code>. This starts the slider thumb at 0% of the track. You can set the initial value of the slider by setting the <code>value</code> property.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;20&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Additionally, you can use svelte\u2019s two-way binding syntax to bind the value to a variable.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Slider <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name"><span class="token namespace">bind:</span>value</span> <span class="token punctuation">/></span></span>

Current value: &#123;value&#125;</code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"minimum-and-maximum-values"}">Minimum and Maximum Values</h3>
<p>Sliders can normally only take in <code>value</code>s ranging from <code>0</code> to <code>100</code>. This can be changed by setting the <code>min</code> and <code>max</code> properties.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;100&#125;</span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;500&#125;</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;250&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"step"}">Step</h3>
<p>A <code>step</code> property can be set to control the granularity of the slider. For example, if you set the <code>step</code> to <code>10</code>, the slider will only allow values that are multiples of <code>10</code>. The default step of <code>1</code> means that the slider can take any whole-number value.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">step</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;10&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"using-ticks"}">Using Ticks</h3>
<p>Slider ticks are small markers along the slider rail that mark a significant value. Ticks are purely visual, and do not alter user interaction. You can add slider ticks by passing an array of numbers within the slider\u2019s value range into the <code>ticks</code> property:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">ticks</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;[0,</span> <span class="token attr-name">50,</span> <span class="token attr-name">100]&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Slider, "Slider").$$render($$result, { ticks: [0, 50, 100] }, {}, {})}
<p>You can also customize the appearance of the slider\u2019s ticks. The <code>tickPlacement</code> property will control how the ticks are displayed on the slider rail. The default value is <code>around</code>, which shows the ticks at both sides of the rail vertically. Tick placement can be either <code>around</code>, <code>before</code>, or <code>after</code>.</p>
<h3 id="${"tooltips"}">Tooltips</h3>
<p>All sliders are accompanied by a tooltip that displays the current value of the slider. If you do not wish to display a tooltip, you can set the <code>tooltip</code> property to <code>false</code>.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">tooltip</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>&#123;false&#125;</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Tooltip text can also be customized through the <code>prefix</code> and <code>suffix</code> properties, which will add a string respectively before or after the tooltip\u2019s text. This is useful if you want to convey units of measurement or other information about the slider\u2019s value.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">prefix</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">suffix</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span> meters<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>If you require further tooltip configuration, the tooltip\u2019s content can also be entirely overrided with your own using the <code>tooltip</code> slot.</p>
<p>The <code>tooltip</code> slot has three slot props: <code>value</code>, <code>prefix</code> and <code>suffix</code> which grant you access to the current value and the prefix/suffix strings respectively.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>fragment</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tooltip<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">let:</span>value</span> <span class="token attr-name"><span class="token namespace">let:</span>prefix</span> <span class="token attr-name"><span class="token namespace">let:</span>suffix</span><span class="token punctuation">></span></span>
        &#123;prefix&#125;&#123;value&#125;&#123;suffix&#125;
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>
            Custom HTML content!
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">svelte:</span>fragment</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slider</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h3 id="${"direction-and-orientation"}">Direction and Orientation</h3>
<p>Sliders can be displayed in either a horizontal (left and right) or vertical orientation (up and down). By default, sliders are displayed in a horizontal orientation. You can change this by setting the <code>orientation</code> property to <code>vertical</code>.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">orientation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vertical<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
<div style="${"margin-block: 24px; inline-size: fit-content; block-size: 128px;"}">${validate_component(Slider, "Slider").$$render($$result, { orientation: "vertical" }, {}, {})}</div>
<p>Slider tracks can also be reversed using the <code>reverse</code> property. This will change the direction of the slider\u2019s track. For example, if the slider is horizontal and the <code>reverse</code> property is set to <code>true</code>, the track will be displayed from right to left.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slider</span> <span class="token attr-name">reverse</span> <span class="token punctuation">/></span></span></code>`}<!-- HTML_TAG_END --></pre>
${validate_component(Slider, "Slider").$$render($$result, { reverse: true }, {}, {})}
<h3 id="${"trackless-sliders"}">Trackless Sliders</h3>
<p>A slider\u2019s fill indication can be removed by setting the <code>track</code> property to <code>false</code>. This will only hide the <em>track</em>, not the rail or thumb.</p>
<h3 id="${"disabled-sliders"}">Disabled Sliders</h3>
<p>If the slider is not meant to be clicked, you can use the <code>disabled</code> property to visually indicate this. If a slider is disabled, it will be unclickable.</p>
<h2 id="${"component-api"}">Component API</h2>
${validate_component(APIDocs, "APIDocs").$$render($$result, { data: data11 }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  css: () => css43,
  entry: () => entry18,
  js: () => js18,
  module: () => slider_md_exports
});
var entry18, js18, css43;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    init_slider_md();
    entry18 = "pages/docs/components/slider.md-c8f3a101.js";
    js18 = ["pages/docs/components/slider.md-c8f3a101.js", "chunks/vendor-9c551f02.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/Slider-8c5a299b.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/Showcase-188efe60.js", "chunks/IconButton-c8cc9811.js", "chunks/APIDocs-0423bc85.js", "chunks/Button-a7276b10.js", "chunks/InfoBar-c9f740b0.js"];
    css43 = ["assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/output/server/entries/pages/docs/internals/index.md.js
var index_md_exports2 = {};
__export(index_md_exports2, {
  default: () => Internals
});
var Internals;
var init_index_md2 = __esm({
  ".svelte-kit/output/server/entries/pages/docs/internals/index.md.js"() {
    init_index_f16625c7();
    Internals = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  css: () => css44,
  entry: () => entry19,
  js: () => js19,
  module: () => index_md_exports2
});
var entry19, js19, css44;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    init_index_md2();
    entry19 = "pages/docs/internals/index.md-8e66ff1a.js";
    js19 = ["pages/docs/internals/index.md-8e66ff1a.js", "chunks/vendor-9c551f02.js"];
    css44 = [];
  }
});

// .svelte-kit/output/server/entries/pages/test.svelte.js
var test_svelte_exports = {};
__export(test_svelte_exports, {
  default: () => Test
});
function writable2(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var import_tabbable, import_panzoom18, css$d, ComboBoxItem, css$c, FlyoutSurface, css$b, MenuFlyoutSurface, css$a, ProgressBar, css$9, itemHeight, ComboBox, css$8, FlyoutWrapper, css$7, PersonPicture, css$6, MenuBar, subscriber_queue2, currentMenu, css$5, MenuBarItem, css$4, MenuFlyoutWrapper, css$3, MenuFlyoutItem, css$22, MenuFlyoutDivider, css$18, ContextMenu, ArrowLeft, ArrowRight, ArrowClockwise, SaveEdit, Print, Cast, Send, ScanTable, ReadAloud, Collections, Share, CopySelect, CameraEdit, css45, Test;
var init_test_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/test.svelte.js"() {
    init_index_f16625c7();
    init_Button_4c34ff2d();
    init_Checkbox_88a6042d();
    init_ToggleSwitch_f23f3d10();
    init_RadioButton_c9d34efc();
    init_NumberBox_ceefabee();
    init_ContextMenu_svelte_svelte_type_style_lang_24a7f719();
    init_TextBoxButton_fef51e87();
    import_tabbable = __toModule(require_dist());
    init_InfoBar_70c602a0();
    init_AutoSuggestBox_edef6fd8();
    init_Slider_864f386c();
    init_TooltipWrapper_9548af36();
    init_ContentDialog_ad82f69b();
    init_Expander_274dc980();
    init_TextBlock_b8b64333();
    init_IconButton_302c6ea8();
    init_ListItem_8cad2fba();
    init_PageSection_96ebbfe7();
    import_panzoom18 = __toModule(require_panzoom());
    css$d = {
      code: '.combo-box-item.svelte-and1le.svelte-and1le{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:32px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;margin:4px;outline:none;padding:0 11px;position:relative;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.combo-box-item.svelte-and1le.svelte-and1le:before{background-color:var(--fds-accent-default);block-size:0;border-radius:3px;content:"";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.combo-box-item.svelte-and1le.svelte-and1le:focus-visible{box-shadow:var(--fds-focus-stroke)}.combo-box-item.selected.svelte-and1le.svelte-and1le,.combo-box-item.svelte-and1le.svelte-and1le:hover{background-color:var(--fds-subtle-fill-secondary)}.combo-box-item.svelte-and1le.svelte-and1le:active{background-color:var(--fds-subtle-fill-tertiary);color:var(--fds-text-secondary)}.combo-box-item.svelte-and1le.svelte-and1le:active:before{transform:scaleY(.625)}.combo-box-item.disabled.svelte-and1le.svelte-and1le{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.combo-box-item.disabled.selected.svelte-and1le.svelte-and1le{background-color:var(--fds-subtle-fill-secondary)}.combo-box-item.disabled.selected.svelte-and1le.svelte-and1le:before{background-color:var(--fds-accent-disabled)}.combo-box-item.selected.svelte-and1le.svelte-and1le:before{block-size:16px;opacity:1}.combo-box-item.svelte-and1le>span.svelte-and1le{flex:1 1 auto;max-inline-size:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.combo-box-item.svelte-and1le>svg{fill:currentColor;-webkit-margin-end:16px;block-size:auto;inline-size:16px;margin-inline-end:16px}',
      map: null
    };
    ComboBoxItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["selected", "disabled", "class"]);
      let { selected = false } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      $$result.css.add(css$d);
      return `<li${spread([
        { tabindex: "0" },
        {
          class: "combo-box-item " + escape(className)
        },
        escape_object($$restProps)
      ], {
        classes: (selected ? "selected" : "") + " " + (disabled ? "disabled" : "") + " svelte-and1le"
      })}>${slots.icon ? slots.icon({}) : ``}
	<span class="${"svelte-and1le"}">${slots.default ? slots.default({}) : ``}</span>
</li>`;
    });
    css$c = {
      code: "@-webkit-keyframes svelte-1xxic22-flyout-in{0%{opacity:0;transform:var(--fds-flyout-transition-offset,translateY(12px))}to{opacity:1;transform:none}}@keyframes svelte-1xxic22-flyout-in{0%{opacity:0;transform:var(--fds-flyout-transition-offset,translateY(12px))}to{opacity:1;transform:none}}.flyout.svelte-1xxic22{-webkit-animation:svelte-1xxic22-flyout-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);animation:svelte-1xxic22-flyout-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);box-sizing:border-box;color:var(--fds-text-primary);font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;min-inline-size:320px;padding:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
      map: null
    };
    FlyoutSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      createEventForwarder(get_current_component());
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$c);
      return `<div${spread([{ class: "flyout " + escape(className) }, escape_object($$restProps)], { classes: "svelte-1xxic22" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
    });
    css$b = {
      code: "@-webkit-keyframes svelte-otnc85-menu-open{0%{transform:translateY(var(--fds-menu-flyout-transition-offset,-50%))}to{transform:none}}@keyframes svelte-otnc85-menu-open{0%{transform:translateY(var(--fds-menu-flyout-transition-offset,-50%))}to{transform:none}}@-webkit-keyframes svelte-otnc85-menu-shadow{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}@keyframes svelte-otnc85-menu-shadow{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}.menu-flyout.svelte-otnc85{-webkit-animation:svelte-otnc85-menu-open var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-otnc85-menu-shadow var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration) forwards;animation:svelte-otnc85-menu-open var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-otnc85-menu-shadow var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration) forwards;background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);display:flex;flex-direction:column;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;margin:0;max-block-size:100vh;max-inline-size:100%;min-inline-size:120px;padding:0;padding-block:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.menu-flyout-surface-container.svelte-otnc85{overflow:hidden}",
      map: null
    };
    MenuFlyoutSurface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$b);
      return `<div class="${"menu-flyout-surface-container svelte-otnc85"}"${add_attribute("style", void 0, 0)}><ul${spread([
        {
          class: "menu-flyout " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-otnc85" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}</ul>
</div>`;
    });
    css$a = {
      code: "@-webkit-keyframes svelte-1jjv56o-indeterminate-1{0%{opacity:1;transform:translateX(-100%)}75%{opacity:1;transform:translateX(300%)}75.01%{opacity:0}to{opacity:0;transform:translateX(300%)}}@keyframes svelte-1jjv56o-indeterminate-1{0%{opacity:1;transform:translateX(-100%)}75%{opacity:1;transform:translateX(300%)}75.01%{opacity:0}to{opacity:0;transform:translateX(300%)}}@-webkit-keyframes svelte-1jjv56o-indeterminate-2{0%{opacity:0;transform:translateX(-150%)}37.49%{opacity:0}37.5%{opacity:1;transform:translateX(-150%)}to{opacity:1;transform:translateX(166.66%)}}@keyframes svelte-1jjv56o-indeterminate-2{0%{opacity:0;transform:translateX(-150%)}37.49%{opacity:0}37.5%{opacity:1;transform:translateX(-150%)}to{opacity:1;transform:translateX(166.66%)}}.progress-bar.svelte-1jjv56o.svelte-1jjv56o{align-items:center;display:flex;min-block-size:3px;width:100%}.progress-bar-track.svelte-1jjv56o.svelte-1jjv56o{fill:var(--fds-accent-default);height:3px;max-width:50%;transition:var(--fds-control-fast-duration) linear fill}.progress-bar-rail.svelte-1jjv56o.svelte-1jjv56o{fill:var(--fds-control-strong-stroke-default);height:1px;width:100%}.progress-bar.indeterminate.svelte-1jjv56o .progress-bar-rail.svelte-1jjv56o{display:none}.progress-bar.indeterminate.svelte-1jjv56o .progress-bar-track.svelte-1jjv56o{-webkit-animation-timing-function:cubic-bezier(.4,0,.6,1);animation-timing-function:cubic-bezier(.4,0,.6,1)}.progress-bar.indeterminate.svelte-1jjv56o .progress-bar-track.svelte-1jjv56o:first-of-type{-webkit-animation:svelte-1jjv56o-indeterminate-1 2s infinite;animation:svelte-1jjv56o-indeterminate-1 2s infinite;width:40%}.progress-bar.indeterminate.svelte-1jjv56o .progress-bar-track.svelte-1jjv56o:nth-of-type(2){-webkit-animation:svelte-1jjv56o-indeterminate-2 2s infinite;animation:svelte-1jjv56o-indeterminate-2 2s infinite;width:60%}",
      map: null
    };
    ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["value", "class", "element", "railElement", "trackElement", "secondaryTrackElement"]);
      let { value = void 0 } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { railElement = null } = $$props;
      let { trackElement = null } = $$props;
      let { secondaryTrackElement = null } = $$props;
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.railElement === void 0 && $$bindings.railElement && railElement !== void 0)
        $$bindings.railElement(railElement);
      if ($$props.trackElement === void 0 && $$bindings.trackElement && trackElement !== void 0)
        $$bindings.trackElement(trackElement);
      if ($$props.secondaryTrackElement === void 0 && $$bindings.secondaryTrackElement && secondaryTrackElement !== void 0)
        $$bindings.secondaryTrackElement(secondaryTrackElement);
      $$result.css.add(css$a);
      return `<svg${spread([
        {
          class: "progress-bar " + escape(className)
        },
        { role: "progressbar" },
        { width: "100%" },
        { height: "3" },
        {
          "aria-valuemin": escape_attribute_value(value ? 0 : void 0)
        },
        {
          "aria-valuemax": escape_attribute_value(value ? 100 : void 0)
        },
        {
          "aria-valuenow": escape_attribute_value(value)
        },
        escape_object($$restProps)
      ], {
        classes: (!value ? "indeterminate" : "") + " svelte-1jjv56o"
      })}${add_attribute("this", element, 0)}>${value ? `<rect height="${"1"}" rx="${"0.5"}" y="${"1"}" width="${"100%"}" class="${"progress-bar-rail svelte-1jjv56o"}"${add_attribute("this", railElement, 0)}></rect>` : `<rect height="${"3"}" ry="${"3"}" class="${"progress-bar-track svelte-1jjv56o"}"${add_attribute("this", secondaryTrackElement, 0)}></rect>`}<rect${add_attribute("width", value ? `${value}%` : void 0, 0)} height="${"3"}" rx="${"1.5"}" class="${"progress-bar-track svelte-1jjv56o"}"${add_attribute("this", trackElement, 0)}></rect></svg>`;
    });
    css$9 = {
      code: '@-webkit-keyframes svelte-xf3pat-menu-in{0%{-webkit-clip-path:var(--fds-grow-clip-path);clip-path:var(--fds-grow-clip-path)}to{-webkit-clip-path:polygon(0 0,100% 0,100% 100%,0 100%);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}@keyframes svelte-xf3pat-menu-in{0%{-webkit-clip-path:var(--fds-grow-clip-path);clip-path:var(--fds-grow-clip-path)}to{-webkit-clip-path:polygon(0 0,100% 0,100% 100%,0 100%);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}@-webkit-keyframes svelte-xf3pat-shadow-in{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}@keyframes svelte-xf3pat-shadow-in{0%{box-shadow:none}to{box-shadow:var(--fds-flyout-shadow)}}.combo-box.svelte-xf3pat.svelte-xf3pat{display:inline-flex;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.combo-box.svelte-xf3pat .button,.combo-box.svelte-xf3pat .text-box{flex:1 1 auto}.combo-box.svelte-xf3pat .text-box{border-color:var(--fds-control-border-default)}.combo-box.svelte-xf3pat .text-box-underline:after{border-color:transparent}.combo-box.svelte-xf3pat .text-box-container{cursor:default}.combo-box.svelte-xf3pat .text-box-container:focus-visible{cursor:text}.combo-box.editable.svelte-xf3pat .combo-box-textbox:not(:focus-within){border-color:var(--fds-control-border-default);cursor:default}.combo-box.editable.svelte-xf3pat .combo-box-textbox:not(:focus-within) .text-box-underline:after{content:none}.combo-box.editable.svelte-xf3pat .combo-box-textbox.disabled{border-color:var(--fds-control-stroke-default)}.combo-box.editable.open.svelte-xf3pat .combo-box-textbox{background-color:var(--fds-control-fill-input-active);cursor:text}.combo-box.editable.open.svelte-xf3pat .combo-box-textbox .text-box-underline:after{border-bottom:2px solid var(--fds-accent-default);content:""}.combo-box.editable.open.svelte-xf3pat .combo-box-textbox input::-moz-placeholder{color:var(--fds-text-tertiary)}.combo-box.editable.open.svelte-xf3pat .combo-box-textbox input:-ms-input-placeholder{color:var(--fds-text-tertiary)}.combo-box.editable.open.svelte-xf3pat .combo-box-textbox input::placeholder{color:var(--fds-text-tertiary)}.combo-box.editable.open.svelte-xf3pat .text-box-underline{border-bottom-left-radius:0;border-bottom-right-radius:0}.combo-box.editable.svelte-xf3pat .combo-box-dropdown.svelte-xf3pat{border-radius:0 0 var(--fds-overlay-corner-radius) var(--fds-overlay-corner-radius);inline-size:100%;inset-block-start:100%;inset-inline-start:0;margin:0}.combo-box.editable.svelte-xf3pat .combo-box-icon.svelte-xf3pat{margin:0}.combo-box-label.svelte-xf3pat.svelte-xf3pat{flex:1 1 auto;min-block-size:20px;text-align:left}.combo-box-label.placeholder.svelte-xf3pat.svelte-xf3pat{color:var(--fds-text-secondary)}.combo-box.disabled.svelte-xf3pat .placeholder.svelte-xf3pat{color:var(--fds-text-disabled)}.combo-box-icon.svelte-xf3pat.svelte-xf3pat{-webkit-margin-start:8px;block-size:12px;inline-size:12px;margin-inline-start:8px}.combo-box-dropdown.svelte-xf3pat.svelte-xf3pat{-webkit-margin-before:-6px;-webkit-margin-start:-5px;-webkit-animation:svelte-xf3pat-menu-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-xf3pat-shadow-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration);animation:svelte-xf3pat-menu-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing),svelte-xf3pat-shadow-in var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing) var(--fds-control-normal-duration);background-clip:padding-box;background-color:var(--fds-flyout-fallback-background-default);border:1px solid var(--fds-surface-stroke-flyout);border-radius:var(--fds-overlay-corner-radius);box-shadow:var(--fds-flyout-shadow);box-sizing:border-box;inline-size:calc(100% + 8px);inset-block-start:var(--fds-menu-offset,0);inset-inline-start:0;margin:0;margin-block-start:-6px;margin-inline-start:-5px;max-block-size:504px;overflow:auto;padding:1px;position:absolute;z-index:100}@supports (overflow:overlay){.combo-box-dropdown.svelte-xf3pat.svelte-xf3pat{overflow:overlay}}.combo-box-dropdown.direction-top.svelte-xf3pat.svelte-xf3pat{--fds-grow-clip-path:polygon(0 0,100% 0,100% 25%,0 25%)}.combo-box-dropdown.direction-center.svelte-xf3pat.svelte-xf3pat{--fds-grow-clip-path:polygon(0 25%,100% 24%,100% 75%,0 75%)}.combo-box-dropdown.direction-bottom.svelte-xf3pat.svelte-xf3pat{--fds-grow-clip-path:polygon(0 75%,100% 75%,100% 100%,0 100%)}',
      map: null
    };
    itemHeight = 36;
    ComboBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let selection;
      let menuGrowDirection;
      let $$restProps = compute_rest_props($$props, [
        "value",
        "placeholder",
        "items",
        "editable",
        "disabled",
        "open",
        "class",
        "inputElement",
        "containerElement",
        "menuElement",
        "buttonElement"
      ]);
      let { value = void 0 } = $$props;
      let { placeholder = "" } = $$props;
      let { items = [] } = $$props;
      let { editable = false } = $$props;
      let { disabled = false } = $$props;
      let { open = false } = $$props;
      let { class: className = "" } = $$props;
      let { inputElement = null } = $$props;
      let { containerElement = null } = $$props;
      let { menuElement = null } = $$props;
      let { buttonElement = null } = $$props;
      createEventForwarder(get_current_component(), ["open", "close", "select", "change", "input", "beforeinput", "keydown"]);
      const dispatch = createEventDispatcher();
      const buttonId = uid("fds-combo-box-button-");
      const dropdownId = uid("fds-combo-box-dropdown-");
      let inputFocused = false;
      let menuOffset = itemHeight * -(selection ? items.indexOf(selection) : Math.floor(items.length / 2));
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
        $$bindings.editable(editable);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      if ($$props.buttonElement === void 0 && $$bindings.buttonElement && buttonElement !== void 0)
        $$bindings.buttonElement(buttonElement);
      $$result.css.add(css$9);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        items.filter((item) => !item.disabled);
        selection = items.find((i2) => i2.name === value);
        {
          if (menuElement && menuElement.children.length > 0 && !editable) {
            if (selection) {
              menuElement.children[items.indexOf(selection)].focus();
            } else {
              menuElement.children[0].focus();
            }
          }
        }
        {
          if (items.length > 0) {
            if (open) {
              dispatch("open");
            } else {
              dispatch("close");
            }
          }
        }
        {
          dispatch("select", selection);
        }
        menuGrowDirection = !selection || items[items.indexOf(selection)] === items[Math.floor(items.length / 2)] ? "center" : items.indexOf(selection) < items.indexOf(items[Math.floor(items.length / 2)]) ? "top" : "bottom";
        $$rendered = `
<div${spread([{ class: "combo-box " + escape(className) }, escape_object($$restProps)], {
          classes: (disabled ? "disabled" : "") + " " + (editable ? "editable" : "") + " " + (open ? "open" : "") + " svelte-xf3pat"
        })}${add_attribute("this", containerElement, 0)}>${editable ? `${validate_component(TextBox, "TextBox").$$render($$result, {
          clearButton: false,
          class: "combo-box-textbox",
          role: "combobox",
          "aria-activedescendant": inputFocused,
          "aria-autocomplete": "both",
          "aria-controls": dropdownId,
          "aria-expanded": open,
          "aria-haspopup": open ? "listbox" : void 0,
          placeholder,
          disabled,
          value,
          inputElement
        }, {
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          },
          inputElement: ($$value) => {
            inputElement = $$value;
            $$settled = false;
          }
        }, {
          buttons: () => {
            return `${validate_component(TextBoxButton, "TextBoxButton").$$render($$result, {
              "aria-expanded": open,
              "aria-label": "Open dropdown",
              "aria-controls": dropdownId,
              class: "combo-box-dropdown-button",
              slot: "buttons",
              element: buttonElement
            }, {
              element: ($$value) => {
                buttonElement = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `<svg aria-hidden="${"true"}" class="${"combo-box-icon svelte-xf3pat"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"48"}" height="${"48"}" viewBox="${"0 0 48 48"}"><path fill="${"currentColor"}" d="${"M8.36612 16.1161C7.87796 16.6043 7.87796 17.3957 8.36612 17.8839L23.1161 32.6339C23.6043 33.122 24.3957 33.122 24.8839 32.6339L39.6339 17.8839C40.122 17.3957 40.122 16.6043 39.6339 16.1161C39.1457 15.628 38.3543 15.628 37.8661 16.1161L24 29.9822L10.1339 16.1161C9.64573 15.628 8.85427 15.628 8.36612 16.1161Z"}"></path></svg>`;
              }
            })}`;
          }
        })}` : `${validate_component(Button, "Button").$$render($$result, {
          class: "combo-box-button",
          id: buttonId,
          "aria-labelledby": buttonId,
          "aria-haspopup": open ? "listbox" : void 0,
          "aria-controls": dropdownId,
          disabled,
          element: buttonElement
        }, {
          element: ($$value) => {
            buttonElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `<span class="${["combo-box-label svelte-xf3pat", !selection ? "placeholder" : ""].join(" ").trim()}">${escape(value || placeholder)}</span>
			<svg aria-hidden="${"true"}" class="${"combo-box-icon svelte-xf3pat"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"48"}" height="${"48"}" viewBox="${"0 0 48 48"}"><path fill="${"currentColor"}" d="${"M8.36612 16.1161C7.87796 16.6043 7.87796 17.3957 8.36612 17.8839L23.1161 32.6339C23.6043 33.122 24.3957 33.122 24.8839 32.6339L39.6339 17.8839C40.122 17.3957 40.122 16.6043 39.6339 16.1161C39.1457 15.628 38.3543 15.628 37.8661 16.1161L24 29.9822L10.1339 16.1161C9.64573 15.628 8.85427 15.628 8.36612 16.1161Z"}"></path></svg>`;
          }
        })}`}
	${!disabled && items.length > 0 ? `${open ? `<ul${add_attribute("id", dropdownId, 0)}${add_attribute("aria-labelledby", buttonId, 0)}${add_attribute("aria-activedescendant", editable ? void 0 : `${dropdownId}-item-${items.indexOf(selection)}`, 0)} role="${"listbox"}" class="${"combo-box-dropdown direction-" + escape(!editable ? menuGrowDirection ?? "center" : "top") + " svelte-xf3pat"}" style="${"--fds-menu-offset: " + escape(menuOffset) + "px;"}"${add_attribute("this", menuElement, 0)}>${each(items, (item, i2) => {
          return `${validate_component(ComboBoxItem, "ComboBoxItem").$$render($$result, {
            role: "option",
            selected: item.name === value,
            disabled: item.disabled,
            id: dropdownId + "-item-" + i2
          }, {}, {
            default: () => {
              return `${escape(item.name)}
					`;
            }
          })}`;
        })}</ul>` : ``}

		${!editable ? `<input type="${"hidden"}" aria-hidden="${"true"}"${add_attribute("this", inputElement, 0)}${add_attribute("value", value, 0)}>` : ``}
		${slots.default ? slots.default({}) : ``}` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$8 = {
      code: ".flyout-wrapper.svelte-ttxom6{display:inline-block;height:auto;position:relative}.flyout-backdrop.svelte-ttxom6{height:100%;left:0;position:fixed;top:0;width:100%;z-index:9999}.flyout-anchor.svelte-ttxom6{position:absolute;z-index:10000}.flyout-anchor.placement-top.svelte-ttxom6{--fds-flyout-transition-offset:translateY(12px);bottom:calc(100% + var(--fds-flyout-offset))}.flyout-anchor.placement-bottom.svelte-ttxom6{--fds-flyout-transition-offset:translateY(-12px);top:calc(100% + var(--fds-flyout-offset))}.flyout-anchor.placement-left.svelte-ttxom6{--fds-flyout-transition-offset:translateX(12px);right:calc(100% + var(--fds-flyout-offset))}.flyout-anchor.placement-right.svelte-ttxom6{--fds-flyout-transition-offset:translateX(-12px);left:calc(100% + var(--fds-flyout-offset))}.flyout-anchor.placement-bottom.alignment-start.svelte-ttxom6,.flyout-anchor.placement-top.alignment-start.svelte-ttxom6{inset-inline-start:0}.flyout-anchor.placement-bottom.alignment-end.svelte-ttxom6,.flyout-anchor.placement-top.alignment-end.svelte-ttxom6{inset-inline-end:0}.flyout-anchor.placement-bottom.alignment-center.svelte-ttxom6,.flyout-anchor.placement-top.alignment-center.svelte-ttxom6{inset-inline-start:50%;transform:translateX(-50%)}.flyout-anchor.placement-left.alignment-start.svelte-ttxom6,.flyout-anchor.placement-right.alignment-start.svelte-ttxom6{inset-block-start:0}.flyout-anchor.placement-left.alignment-end.svelte-ttxom6,.flyout-anchor.placement-right.alignment-end.svelte-ttxom6{inset-block-end:0}.flyout-anchor.placement-left.alignment-center.svelte-ttxom6,.flyout-anchor.placement-right.alignment-center.svelte-ttxom6{inset-block-start:50%;transform:translateY(-50%)}",
      map: null
    };
    FlyoutWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "open",
        "closable",
        "placement",
        "alignment",
        "offset",
        "class",
        "wrapperElement",
        "anchorElement",
        "menuElement",
        "backdropElement"
      ]);
      let { open = false } = $$props;
      let { closable = true } = $$props;
      let { placement = "top" } = $$props;
      let { alignment = "center" } = $$props;
      let { offset = 4 } = $$props;
      let { class: className = "" } = $$props;
      let { wrapperElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { menuElement = null } = $$props;
      let { backdropElement = null } = $$props;
      const dispatch = createEventDispatcher();
      const menuId = uid("fds-flyout-anchor-");
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
        $$bindings.closable(closable);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.alignment === void 0 && $$bindings.alignment && alignment !== void 0)
        $$bindings.alignment(alignment);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      if ($$props.backdropElement === void 0 && $$bindings.backdropElement && backdropElement !== void 0)
        $$bindings.backdropElement(backdropElement);
      $$result.css.add(css$8);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        $$rendered = `

<div class="${"flyout-wrapper svelte-ttxom6"}"${add_attribute("aria-expanded", open, 0)}${add_attribute("aria-haspopup", open, 0)}${add_attribute("aria-controls", menuId, 0)}${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}
	${open ? `${slots.override ? slots.override({}) : `
			<div${add_attribute("id", menuId, 0)} class="${"flyout-anchor placement-" + escape(placement) + " alignment-" + escape(alignment) + " svelte-ttxom6"}" style="${"--fds-flyout-offset: " + escape(offset) + "px;"}"${add_attribute("this", anchorElement, 0)}>${validate_component(FlyoutSurface, "FlyoutSurface").$$render($$result, Object.assign({ class: className ?? "" }, $$restProps, { element: menuElement }), {
          element: ($$value) => {
            menuElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>
			<div class="${"flyout-backdrop svelte-ttxom6"}"${add_attribute("this", backdropElement, 0)}></div>
		`}` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$7 = {
      code: ".person-picture.svelte-p3ps28{align-items:center;background-clip:padding-box;background-color:var(--fds-control-alt-fill-quarternary);block-size:100%;border:1px solid var(--fds-card-stroke-default);border-radius:50%;box-sizing:border-box;display:flex;flex:0 0 auto;font-family:var(--fds-font-family-display);font-size:calc(var(--fds-person-picture-size)*.41667);font-weight:600;inline-size:100%;justify-content:center;overflow:hidden;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.person-picture-container.svelte-p3ps28{block-size:var(--fds-person-picture-size);display:flex;inline-size:var(--fds-person-picture-size);position:relative}.person-picture-badge.svelte-p3ps28{align-items:flex-end;block-size:100%;display:flex;flex-direction:column;inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}",
      map: null
    };
    PersonPicture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "src", "alt", "class", "element", "containerElement"]);
      let $$slots = compute_slots(slots);
      let { size = 72 } = $$props;
      let { src = void 0 } = $$props;
      let { alt = void 0 } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { containerElement = null } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
        $$bindings.alt(alt);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.containerElement === void 0 && $$bindings.containerElement && containerElement !== void 0)
        $$bindings.containerElement(containerElement);
      $$result.css.add(css$7);
      return `<div class="${"person-picture-container svelte-p3ps28"}" style="${"--fds-person-picture-size: " + escape(size) + "px"}"${add_attribute("this", containerElement, 0)}>${src ? `<img${spread([
        {
          class: "person-picture " + escape(className)
        },
        { width: escape_attribute_value(size) },
        { height: escape_attribute_value(size) },
        { src: escape_attribute_value(src) },
        { alt: escape_attribute_value(alt) },
        escape_object($$restProps)
      ], { classes: "svelte-p3ps28" })}${add_attribute("this", element, 0)}>` : `<div${spread([
        {
          class: "person-picture " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-p3ps28" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : `
				${escape(alt.split(" ").map((i2) => i2.charAt(0)).join("").toUpperCase())}
			`}</div>`}
	${$$slots.badge ? `<span class="${"person-picture-badge svelte-p3ps28"}">${slots.badge ? slots.badge({}) : ``}</span>` : ``}
</div>`;
    });
    css$6 = {
      code: ".menu-bar.svelte-7u58hw{align-items:center;block-size:40px;cursor:default;display:flex;margin:0;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
      map: null
    };
    MenuBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      setContext("sideNavigation", (event, activeItem) => {
        const { key } = event;
        let tabOrder = [];
        for (const child of Array.from(element.children)) {
          if ((0, import_tabbable.isTabbable)(child))
            tabOrder.push(child);
        }
        const activeIndex = tabOrder.indexOf(activeItem);
        if (tabOrder.length < 0)
          return;
        if (key === "ArrowLeft" || key === "ArrowRight")
          event.preventDefault();
        if (key === "ArrowLeft") {
          if (tabOrder[0] === activeItem) {
            tabOrder[tabOrder.length - 1].focus();
          } else if (tabOrder.includes(activeItem)) {
            tabOrder[activeIndex - 1].focus();
          }
        } else if (key === "ArrowRight") {
          if (tabOrder[tabOrder.length - 1] === activeItem) {
            tabOrder[0].focus();
          } else if (tabOrder.includes(activeItem)) {
            tabOrder[activeIndex + 1].focus();
          }
        }
      });
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$6);
      return `<ul${spread([
        { class: "menu-bar " + escape(className) },
        { role: "menubar" },
        escape_object($$restProps)
      ], { classes: "svelte-7u58hw" })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</ul>`;
    });
    subscriber_queue2 = [];
    currentMenu = writable2(null);
    css$5 = {
      code: ".menu-bar-item.svelte-1r3ld34{align-items:center;background-color:var(--fds-subtle-fill-transparent);border-radius:var(--fds-control-corner-radius);color:var(--fds-text-primary);cursor:default;display:inline-flex;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;line-height:20px;margin:4px;padding:5px 11px;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.menu-bar-item.svelte-1r3ld34:hover{background-color:var(--fds-subtle-fill-secondary)}.menu-bar-item.svelte-1r3ld34:active,.menu-bar-item[aria-expanded=true].svelte-1r3ld34{background-color:var(--fds-subtle-fill-tertiary)}.menu-bar-item.svelte-1r3ld34:active:hover,.menu-bar-item[aria-expanded=true].svelte-1r3ld34:hover{background-color:var(--fds-subtle-fill-secondary)}.menu-bar-item.svelte-1r3ld34:active{color:var(--fds-text-secondary)}.menu-bar-item.disabled.svelte-1r3ld34{background-color:var(--fds-subtle-fill-disabled)!important;color:var(--fds-text-disabled)}.menu-flyout-anchor.svelte-1r3ld34{inset-block-start:100%;inset-inline-start:0;position:absolute;z-index:10000}",
      map: null
    };
    MenuBarItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["open", "disabled", "class", "element", "anchorElement", "menuElement"]);
      let $$slots = compute_slots(slots);
      let $currentMenu, $$unsubscribe_currentMenu;
      $$unsubscribe_currentMenu = subscribe(currentMenu, (value) => $currentMenu = value);
      let { open = false } = $$props;
      let { disabled = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { anchorElement = null } = $$props;
      let { menuElement = null } = $$props;
      let menu;
      createEventForwarder(get_current_component(), ["open", "close", "select"]);
      const dispatch = createEventDispatcher();
      const menuId = uid("fds-menu-flyout-anchor-");
      getContext("sideNavigation");
      function focusFirstItem() {
        if (open && menu && (0, import_tabbable.tabbable)(menuElement).length > 0)
          (0, import_tabbable.tabbable)(menuElement)[0].focus();
      }
      setContext("closeFlyout", (event) => {
        dispatch("select");
        event.stopPropagation();
        open = false;
      });
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      $$result.css.add(css$5);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          if (menu) {
            focusFirstItem();
            set_store_value(currentMenu, $currentMenu = menu, $currentMenu);
          } else {
            set_store_value(currentMenu, $currentMenu = null, $currentMenu);
          }
        }
        {
          if ($currentMenu !== menu)
            open = false;
        }
        {
          if (!menu && element)
            element.focus();
        }
        {
          if ($$slots.flyout && open && !disabled) {
            if (open) {
              dispatch("open");
            } else {
              dispatch("close");
            }
          }
        }
        $$rendered = `

<li${spread([
          {
            class: "menu-bar-item " + escape(className)
          },
          { role: "menuitem" },
          {
            tabindex: escape_attribute_value(disabled ? -1 : 0)
          },
          {
            "aria-expanded": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-haspopup": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-controls": escape_attribute_value($$slots.flyout && !disabled && menuId)
          },
          escape_object($$restProps)
        ], {
          classes: (disabled ? "disabled" : "") + " svelte-1r3ld34"
        })}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
	${$$slots.flyout && open && !disabled ? `<div class="${"menu-flyout-anchor svelte-1r3ld34"}"${add_attribute("this", anchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, { element: menuElement, this: menu }, {
          element: ($$value) => {
            menuElement = $$value;
            $$settled = false;
          },
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>` : ``}
</li>`;
      } while (!$$settled);
      $$unsubscribe_currentMenu();
      return $$rendered;
    });
    css$4 = {
      code: ".menu-flyout-wrapper.svelte-as1gqa{display:inline-block;height:auto;position:relative}.menu-flyout-backdrop.svelte-as1gqa{height:100%;left:0;position:fixed;top:0;width:100%;z-index:9999}.menu-flyout-anchor.svelte-as1gqa{position:absolute;z-index:10000}.menu-flyout-anchor.placement-top.svelte-as1gqa{--fds-menu-flyout-transition-offset:50%;bottom:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-bottom.svelte-as1gqa{top:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-left.svelte-as1gqa{right:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-right.svelte-as1gqa{left:calc(100% + var(--fds-menu-flyout-offset))}.menu-flyout-anchor.placement-bottom.alignment-start.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-start.svelte-as1gqa{inset-inline-start:0}.menu-flyout-anchor.placement-bottom.alignment-end.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-end.svelte-as1gqa{inset-inline-end:0}.menu-flyout-anchor.placement-bottom.alignment-center.svelte-as1gqa,.menu-flyout-anchor.placement-top.alignment-center.svelte-as1gqa{inset-inline-start:50%;transform:translateX(-50%)}.menu-flyout-anchor.placement-left.alignment-start.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-start.svelte-as1gqa{inset-block-start:0}.menu-flyout-anchor.placement-left.alignment-end.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-end.svelte-as1gqa{inset-block-end:0}.menu-flyout-anchor.placement-left.alignment-center.svelte-as1gqa,.menu-flyout-anchor.placement-right.alignment-center.svelte-as1gqa{inset-block-start:50%;transform:translateY(-50%)}",
      map: null
    };
    MenuFlyoutWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "open",
        "closable",
        "closeOnSelect",
        "placement",
        "alignment",
        "offset",
        "class",
        "wrapperElement",
        "anchorElement",
        "menuElement",
        "backdropElement"
      ]);
      let { open = false } = $$props;
      let { closable = true } = $$props;
      let { closeOnSelect = true } = $$props;
      let { placement = "top" } = $$props;
      let { alignment = "center" } = $$props;
      let { offset = 4 } = $$props;
      let { class: className = "" } = $$props;
      let { wrapperElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { menuElement = null } = $$props;
      let { backdropElement = null } = $$props;
      const dispatch = createEventDispatcher();
      const menuId = uid("fds-menu-flyout-anchor-");
      let menu = null;
      setContext("closeFlyout", (event) => {
        dispatch("select");
        if (closeOnSelect && closable) {
          event.stopPropagation();
          open = false;
        }
      });
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.closable === void 0 && $$bindings.closable && closable !== void 0)
        $$bindings.closable(closable);
      if ($$props.closeOnSelect === void 0 && $$bindings.closeOnSelect && closeOnSelect !== void 0)
        $$bindings.closeOnSelect(closeOnSelect);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.alignment === void 0 && $$bindings.alignment && alignment !== void 0)
        $$bindings.alignment(alignment);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      if ($$props.backdropElement === void 0 && $$bindings.backdropElement && backdropElement !== void 0)
        $$bindings.backdropElement(backdropElement);
      $$result.css.add(css$4);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        {
          if (menu && (0, import_tabbable.tabbable)(menuElement).length > 0)
            (0, import_tabbable.tabbable)(menuElement)[0].focus();
        }
        $$rendered = `

<div class="${"menu-flyout-wrapper svelte-as1gqa"}"${add_attribute("aria-expanded", open, 0)}${add_attribute("aria-haspopup", open, 0)}${add_attribute("aria-controls", menuId, 0)}${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}
	${open ? `<div${add_attribute("id", menuId, 0)} class="${"menu-flyout-anchor placement-" + escape(placement) + " alignment-" + escape(alignment) + " svelte-as1gqa"}" style="${"--fds-menu-flyout-offset: " + escape(offset) + "px;"}" tabindex="${"-1"}"${add_attribute("this", anchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, Object.assign({ class: className ?? "" }, $$restProps, { element: menuElement }, { this: menu }), {
          element: ($$value) => {
            menuElement = $$value;
            $$settled = false;
          },
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>
		<div class="${"menu-flyout-backdrop svelte-as1gqa"}"${add_attribute("this", backdropElement, 0)}></div>` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$3 = {
      code: '.menu-flyout-item.svelte-1g03adg.svelte-1g03adg{align-items:center;background-color:var(--fds-subtle-fill-transparent);block-size:28px;border-radius:var(--fds-control-corner-radius);box-sizing:border-box;color:var(--fds-text-primary);cursor:default;display:flex;flex:0 0 auto;font-family:var(--fds-font-family-text);font-size:var(--fds-body-font-size);font-weight:400;inline-size:calc(100% - 8px);line-height:20px;margin:2px 4px;outline:none;padding-inline:12px;position:relative;text-decoration:none;text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.menu-flyout-item.svelte-1g03adg.svelte-1g03adg:before{background-color:var(--fds-accent-default);block-size:0;border-radius:3px;content:"";inline-size:3px;inset-inline-start:0;opacity:0;position:absolute;transition:transform var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing)}.menu-flyout-item.svelte-1g03adg.svelte-1g03adg:focus-visible{box-shadow:var(--fds-focus-stroke)}.menu-flyout-item.selected.svelte-1g03adg.svelte-1g03adg,.menu-flyout-item.svelte-1g03adg.svelte-1g03adg:hover,.menu-flyout-item[aria-expanded=true].svelte-1g03adg.svelte-1g03adg{background-color:var(--fds-subtle-fill-secondary)}.menu-flyout-item.checked.svelte-1g03adg .menu-flyout-item-bullet,.menu-flyout-item.checked.svelte-1g03adg .menu-flyout-item-checkmark{visibility:visible}.menu-flyout-item.svelte-1g03adg.svelte-1g03adg:active{background-color:var(--fds-subtle-fill-tertiary)}.menu-flyout-item.svelte-1g03adg.svelte-1g03adg:active:before{transform:scaleY(.625)}.menu-flyout-item.disabled.svelte-1g03adg.svelte-1g03adg{background-color:var(--fds-subtle-fill-transparent);color:var(--fds-text-disabled);pointer-events:none}.menu-flyout-item.disabled.selected.svelte-1g03adg.svelte-1g03adg{background-color:var(--fds-subtle-fill-secondary)}.menu-flyout-item.disabled.selected.svelte-1g03adg.svelte-1g03adg:before{background-color:var(--fds-accent-disabled)}.menu-flyout-item.disabled.svelte-1g03adg>.menu-flyout-item-hint{color:var(--fds-text-disabled)}.menu-flyout-item.selected.svelte-1g03adg.svelte-1g03adg:before{block-size:16px;opacity:1}.menu-flyout-item.indented.svelte-1g03adg.svelte-1g03adg{-webkit-padding-start:40px;padding-inline-start:40px}.menu-flyout-item-bullet.svelte-1g03adg.svelte-1g03adg,.menu-flyout-item-checkmark.svelte-1g03adg.svelte-1g03adg{visibility:hidden}.menu-flyout-item.svelte-1g03adg .menu-flyout-item-arrow.svelte-1g03adg{-webkit-margin-end:0;-webkit-margin-start:auto;-webkit-padding-start:24px;block-size:12px;box-sizing:content-box;inline-size:12px;margin-inline-end:0;margin-inline-start:auto;padding-inline-start:24px}.menu-flyout-item-checkmark.svelte-1g03adg.svelte-1g03adg{-webkit-margin-start:2px;-webkit-margin-end:14px;align-items:center;block-size:12px;display:flex;inline-size:12px;justify-content:center;margin-inline-end:14px;margin-inline-start:2px}.menu-flyout-item-bullet.svelte-1g03adg.svelte-1g03adg{-webkit-margin-start:6px;-webkit-margin-end:18px;background-color:currentColor;block-size:4px;border-radius:4px;inline-size:4px;margin-inline-end:18px;margin-inline-start:6px}.menu-flyout-item-input-label.svelte-1g03adg.svelte-1g03adg{display:contents}.menu-flyout-item.svelte-1g03adg>svg{fill:currentColor;-webkit-margin-end:12px;block-size:auto;inline-size:16px;margin-inline-end:12px}.menu-flyout-item.svelte-1g03adg>.menu-flyout-item-hint{color:var(--fds-text-secondary);flex:1 1 auto;overflow:hidden;padding-left:24px;text-align:right;text-overflow:ellipsis}.menu-flyout-submenu-anchor.svelte-1g03adg.svelte-1g03adg{--fds-menu-flyout-transition-offset:-50%;inset-block-start:0;inset-inline-start:100%;position:absolute;z-index:10000}',
      map: null
    };
    MenuFlyoutItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "variant",
        "cascading",
        "hint",
        "selected",
        "checked",
        "indented",
        "group",
        "value",
        "disabled",
        "open",
        "__depth",
        "class",
        "element",
        "inputElement",
        "inputLabelElement",
        "subMenuAnchorElement",
        "subMenuElement"
      ]);
      let $$slots = compute_slots(slots);
      let { variant = "standard" } = $$props;
      let { cascading = false } = $$props;
      let { hint = void 0 } = $$props;
      let { selected = false } = $$props;
      let { checked = false } = $$props;
      let { indented = false } = $$props;
      let { group = [] } = $$props;
      let { value = void 0 } = $$props;
      let { disabled = false } = $$props;
      let { open = false } = $$props;
      let { __depth = false } = $$props;
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      let { inputElement = null } = $$props;
      let { inputLabelElement = null } = $$props;
      let { subMenuAnchorElement = null } = $$props;
      let { subMenuElement = null } = $$props;
      createEventForwarder(get_current_component());
      const dispatch = createEventDispatcher();
      getContext("closeFlyout");
      const menuId = uid("fds-menu-flyout-submenu-");
      let menu = null;
      if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
        $$bindings.variant(variant);
      if ($$props.cascading === void 0 && $$bindings.cascading && cascading !== void 0)
        $$bindings.cascading(cascading);
      if ($$props.hint === void 0 && $$bindings.hint && hint !== void 0)
        $$bindings.hint(hint);
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.indented === void 0 && $$bindings.indented && indented !== void 0)
        $$bindings.indented(indented);
      if ($$props.group === void 0 && $$bindings.group && group !== void 0)
        $$bindings.group(group);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.__depth === void 0 && $$bindings.__depth && __depth !== void 0)
        $$bindings.__depth(__depth);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      if ($$props.inputElement === void 0 && $$bindings.inputElement && inputElement !== void 0)
        $$bindings.inputElement(inputElement);
      if ($$props.inputLabelElement === void 0 && $$bindings.inputLabelElement && inputLabelElement !== void 0)
        $$bindings.inputLabelElement(inputLabelElement);
      if ($$props.subMenuAnchorElement === void 0 && $$bindings.subMenuAnchorElement && subMenuAnchorElement !== void 0)
        $$bindings.subMenuAnchorElement(subMenuAnchorElement);
      if ($$props.subMenuElement === void 0 && $$bindings.subMenuElement && subMenuElement !== void 0)
        $$bindings.subMenuElement(subMenuElement);
      $$result.css.add(css$3);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        {
          if (open && menu && (0, import_tabbable.tabbable)(subMenuElement).length > 0)
            (0, import_tabbable.tabbable)(subMenuElement)[0].focus();
        }
        $$rendered = `${variant === "standard" || __depth ? `<li${spread([
          {
            tabindex: escape_attribute_value(disabled ? -1 : 0)
          },
          { role: "menuitem" },
          {
            "aria-expanded": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-haspopup": escape_attribute_value($$slots.flyout && !disabled && open)
          },
          {
            "aria-controls": escape_attribute_value($$slots.flyout && !disabled && menuId)
          },
          {
            "aria-selected": escape_attribute_value(selected || checked)
          },
          {
            class: "menu-flyout-item type-" + escape(variant) + " " + escape(className)
          },
          escape_object($$restProps)
        ], {
          classes: (cascading ? "cascading" : "") + " " + (selected ? "selected" : "") + " " + (checked ? "checked" : "") + " " + (disabled ? "disabled" : "") + " " + (indented ? "indented" : "") + " svelte-1g03adg"
        })}${add_attribute("this", element, 0)}>${slots.icon ? slots.icon({}) : ``}
		${slots.default ? slots.default({}) : ``}
		${hint ? `${validate_component(TextBlock, "TextBlock").$$render($$result, {
          class: "menu-flyout-item-hint",
          variant: "caption"
        }, {}, {
          default: () => {
            return `${escape(hint)}`;
          }
        })}` : ``}
		${cascading ? `<svg class="${"menu-flyout-item-arrow svelte-1g03adg"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}" fill="${"none"}"><path d="${"M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z"}" fill="${"currentColor"}"></path></svg>
			${open && $$slots.flyout && !disabled ? `<div${add_attribute("id", menuId, 0)} class="${"menu-flyout-submenu-anchor svelte-1g03adg"}"${add_attribute("this", subMenuAnchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, { element: subMenuElement, this: menu }, {
          element: ($$value) => {
            subMenuElement = $$value;
            $$settled = false;
          },
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.flyout ? slots.flyout({}) : ``}`;
          }
        })}</div>` : ``}` : ``}</li>` : `${variant === "radio" || variant === "toggle" ? `
	<label class="${"menu-flyout-item-input-label svelte-1g03adg"}"${add_attribute("this", inputLabelElement, 0)}>${validate_component(MenuFlyoutItem, "svelte:self").$$render($$result, {
          checked: checked || group === value,
          selected,
          variant,
          indented,
          group,
          disabled,
          __depth: true
        }, {}, {
          icon: () => {
            return `${slots.icon ? slots.icon({ slot: "icon" }) : ``}`;
          },
          default: () => {
            return `<div class="${"menu-flyout-item-" + escape(variant === "radio" ? "bullet" : "checkmark") + " svelte-1g03adg"}">${variant === "toggle" ? `<svg width="${"12"}" height="${"12"}" viewBox="${"0 0 12 12"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M9.85355 3.14645C10.0488 3.34171 10.0488 3.65829 9.85355 3.85355L5.35355 8.35355C5.15829 8.54882 4.84171 8.54882 4.64645 8.35355L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L5 7.29289L9.14645 3.14645C9.34171 2.95118 9.65829 2.95118 9.85355 3.14645Z"}" fill="${"currentColor"}"></path></svg>` : ``}</div>
			${slots.default ? slots.default({}) : ``}`;
          }
        })}

		${variant === "radio" ? `<input type="${"radio"}" hidden${add_attribute("value", value, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${value === group ? add_attribute("checked", true, 1) : ""}${add_attribute("this", inputElement, 0)}>` : `<input type="${"checkbox"}" hidden ${disabled ? "disabled" : ""}${add_attribute("this", inputElement, 0)}${add_attribute("checked", checked, 1)}${add_attribute("value", value, 0)}>`}</label>` : ``}`}`;
      } while (!$$settled);
      return $$rendered;
    });
    css$22 = {
      code: ".menu-flyout-divider.svelte-1fs8gxj{-webkit-border-before:1px solid var(--fds-divider-stroke-default);block-size:1px;border:none;border-block-start:1px solid var(--fds-divider-stroke-default);inline-size:100%;margin-block:2px}",
      map: null
    };
    MenuFlyoutDivider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["class", "element"]);
      let { class: className = "" } = $$props;
      let { element = null } = $$props;
      if ($$props.class === void 0 && $$bindings.class && className !== void 0)
        $$bindings.class(className);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      $$result.css.add(css$22);
      return `<hr${spread([
        {
          class: "menu-flyout-divider " + escape(className)
        },
        escape_object($$restProps)
      ], { classes: "svelte-1fs8gxj" })}${add_attribute("this", element, 0)}>`;
    });
    css$18 = {
      code: ".context-menu-wrapper.svelte-s5j1tt{display:contents}.context-menu-anchor.svelte-s5j1tt{position:fixed;z-index:10000}",
      map: null
    };
    ContextMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["closeOnSelect", "open", "wrapperElement", "anchorElement", "menuElement"]);
      let { closeOnSelect = true } = $$props;
      let { open = false } = $$props;
      let { wrapperElement = null } = $$props;
      let { anchorElement = null } = $$props;
      let { menuElement = null } = $$props;
      const dispatch = createEventDispatcher();
      let menu;
      let menuPosition = { x: 0, y: 0 };
      let mousePosition = { x: 0, y: 0 };
      setContext("closeFlyout", (event) => {
        dispatch("select");
        if (closeOnSelect)
          open = false;
      });
      if ($$props.closeOnSelect === void 0 && $$bindings.closeOnSelect && closeOnSelect !== void 0)
        $$bindings.closeOnSelect(closeOnSelect);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.wrapperElement === void 0 && $$bindings.wrapperElement && wrapperElement !== void 0)
        $$bindings.wrapperElement(wrapperElement);
      if ($$props.anchorElement === void 0 && $$bindings.anchorElement && anchorElement !== void 0)
        $$bindings.anchorElement(anchorElement);
      if ($$props.menuElement === void 0 && $$bindings.menuElement && menuElement !== void 0)
        $$bindings.menuElement(menuElement);
      $$result.css.add(css$18);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          dispatch(open ? "open" : "close");
        }
        {
          if (menu && (0, import_tabbable.tabbable)(menuElement).length > 0)
            (0, import_tabbable.tabbable)(menuElement)[0].focus();
        }
        {
          if (anchorElement) {
            const { width, height } = anchorElement.getBoundingClientRect();
            menuPosition.x = Math.min(window.innerWidth - width, mousePosition.x);
            menuPosition.y = mousePosition.y > window.innerHeight - height ? mousePosition.y -= height : mousePosition.y;
            if (menuPosition.y < 0)
              menuPosition.y = 0;
          }
        }
        $$rendered = `

<div class="${"context-menu-wrapper svelte-s5j1tt"}"${add_attribute("this", wrapperElement, 0)}>${slots.default ? slots.default({}) : ``}
	${open ? `<div class="${"context-menu-anchor svelte-s5j1tt"}" style="${"top: " + escape(menuPosition.y) + "px; left: " + escape(menuPosition.x) + "px;"}"${add_attribute("this", anchorElement, 0)}>${validate_component(MenuFlyoutSurface, "MenuFlyoutSurface").$$render($$result, Object.assign($$restProps, { this: menu }, { element: menuElement }), {
          this: ($$value) => {
            menu = $$value;
            $$settled = false;
          },
          element: ($$value) => {
            menuElement = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.menu ? slots.menu({}) : ``}`;
          }
        })}</div>` : ``}
</div>`;
      } while (!$$settled);
      return $$rendered;
    });
    ArrowLeft = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 8.5a.5.5 0 000-1H3.8l4.03-3.63a.5.5 0 10-.66-.74l-5 4.5a.5.5 0 000 .74l5 4.5a.5.5 0 10.66-.74L3.8 8.5h9.7z"/></svg>';
    ArrowRight = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8.5a.5.5 0 010-1h9.7L8.17 3.87a.5.5 0 11.66-.74l5 4.5a.5.5 0 010 .74l-5 4.5a.5.5 0 11-.66-.74L12.2 8.5H2.5z"/></svg>';
    ArrowClockwise = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 8a5 5 0 019-3h-2a.5.5 0 000 1h3a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0v1.53A5.99 5.99 0 002 8a6 6 0 0012 0 .5.5 0 00-1 0A5 5 0 013 8z"/></svg>';
    SaveEdit = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v10c0 1.1.9 2 2 2h3l.06-.35.16-.65H6v-4.5c0-.28.22-.5.5-.5h5.44l1-1H6.5c-.83 0-1.5.67-1.5 1.5V16a1 1 0 01-1-1V5a1 1 0 011-1h1v2.5C6 7.33 6.67 8 7.5 8h4c.83 0 1.5-.67 1.5-1.5V4h.38a1 1 0 01.7.3l1.63 1.61a1 1 0 01.29.71V8c.34-.01.68.03 1 .13v-1.5a2 2 0 00-.59-1.42L14.8 3.59A2 2 0 0013.38 3H5zm2 3.5V4h5v2.5a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5z"/><path d="M14.8 9.55l-4.82 4.83a2.2 2.2 0 00-.58 1.02l-.37 1.5a.89.89 0 001.08 1.07l1.5-.37c.38-.1.73-.3 1.01-.58l4.83-4.83a1.87 1.87 0 00-2.64-2.64z"/></svg>';
    Print = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 3.5C4 2.67 4.67 2 5.5 2h5c.83 0 1.5.67 1.5 1.5V4h1a2 2 0 012 2v4.5c0 .83-.67 1.5-1.5 1.5h-1.4v.5c0 .83-.67 1.5-1.5 1.5H5.5A1.5 1.5 0 014 12.5V12H2.5A1.5 1.5 0 011 10.5V6c0-1.1.9-2 2-2h1v-.5zm7 .5v-.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5V4h6zM4 5H3a1 1 0 00-1 1v4.5c0 .28.22.5.5.5H4v-.5C4 9.67 4.67 9 5.5 9h5.1c.83 0 1.5.67 1.5 1.5v.5h1.4a.5.5 0 00.5-.5V6a1 1 0 00-1-1H4zm1.5 5a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h5.1a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5H5.5z"/></svg>';
    Cast = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.5C2 4.67 2.67 4 3.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 012 14.5v-9zM3.5 5a.5.5 0 00-.5.5v9c0 .28.22.5.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-13z"/><path d="M5.5 13.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/><path d="M4 10.5c0-.28.22-.5.5-.5A3.5 3.5 0 018 13.5a.5.5 0 11-1 0A2.5 2.5 0 004.5 11a.5.5 0 01-.5-.5z"/><path d="M4 8c0-.28.22-.5.5-.5a6 6 0 016 6 .5.5 0 01-1 0 5 5 0 00-5-5A.5.5 0 014 8z"/></svg>';
    Send = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1.18 1.12a.5.5 0 01.54-.07l13 6.5a.5.5 0 010 .9l-13 6.5a.5.5 0 01-.7-.6L2.98 8 1.02 1.65a.5.5 0 01.16-.53zM3.87 8.5l-1.55 5.03L13.38 8 2.32 2.47 3.87 7.5H9.5a.5.5 0 010 1H3.87z"/></svg>';
    ScanTable = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.75 15c.38 0 .7.28.74.65v3.6l.01.13c.06.59.53 1.06 1.12 1.12h3.73a.75.75 0 010 1.5H4.58A2.75 2.75 0 012 19.43V15.65a.75.75 0 01.75-.65zm18.5 0c.38 0 .7.28.74.65v3.6A2.75 2.75 0 0119.42 22h-3.66a.75.75 0 01-.1-1.5h3.6c.64 0 1.18-.49 1.24-1.12v-3.63c0-.41.34-.75.76-.75zm-6-9A2.75 2.75 0 0118 8.58v6.67A2.75 2.75 0 0115.42 18H8.75a2.75 2.75 0 01-2.74-2.58L6 15.25v-6.5a2.75 2.75 0 012.58-2.74L8.75 6h6.5zm1.25 5h-9v4.25c0 .65.5 1.18 1.12 1.24l.13.01h6.5c.65 0 1.18-.5 1.24-1.12l.01-.13v-4.26zm-1.25-3.5h-6.5c-.65 0-1.18.5-1.24 1.12l-.01.13v.74h9v-.74c0-.65-.5-1.18-1.12-1.24l-.13-.01zm-7-5.5a.75.75 0 01.1 1.5h-3.6c-.65 0-1.18.5-1.25 1.12v3.63a.75.75 0 01-1.5.1v-3.6a2.75 2.75 0 012.58-2.74L4.75 2h3.5zm11 0h.16A2.75 2.75 0 0122 4.59v3.77a.75.75 0 01-1.49 0V4.62a1.25 1.25 0 00-1.13-1.11l-.12-.01h-3.6a.75.75 0 010-1.5h3.6z"/></svg>';
    ReadAloud = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10.03 1.32a.5.5 0 01.65-.29l.02.01a2.25 2.25 0 01.19.08l.5.27c.4.25.94.63 1.47 1.2A8.3 8.3 0 0115 8.5a.5.5 0 01-1 0c0-2.61-.95-4.24-1.86-5.22a6.07 6.07 0 00-1.81-1.31.5.5 0 01-.3-.65zm-3.07 2a.5.5 0 00-.92 0l-4 10a.5.5 0 10.92.37L4.04 11h4.92l1.08 2.69a.5.5 0 10.92-.38l-4-10zM8.56 10H4.44L6.5 4.85 8.56 10zm1.66-6.45a.5.5 0 00-.45.9h.01a1.54 1.54 0 01.24.15 3.45 3.45 0 011.48 2.9.5.5 0 001 0 4.45 4.45 0 00-2.24-3.93l-.02-.01h-.01s.15.08 0 0zm-.45.9z"/></svg>';
    Collections = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 7A2.5 2.5 0 0118 9.34v6.16a2.5 2.5 0 01-2.34 2.5H9.5A2.5 2.5 0 017 15.66V9.5A2.5 2.5 0 019.34 7h6.16zm0 1h-6c-.78 0-1.42.6-1.5 1.36v6.14c0 .78.6 1.42 1.36 1.5h6.14c.78 0 1.42-.6 1.5-1.36V9.5c0-.78-.6-1.42-1.36-1.5h-.14zm-3 1a.5.5 0 01.5.41V12h2.5a.5.5 0 01.09 1H13v2.5a.5.5 0 01-1 .09V13H9.5a.5.5 0 01-.09-1H12V9.5c0-.28.22-.5.5-.5zm.16-5.3l.05.15.57 2.15h-1.03l-.5-1.89a1.5 1.5 0 00-1.7-1.09l-.14.03L4.1 4.6a1.5 1.5 0 00-1.09 1.7l.03.14 1.55 5.8a1.5 1.5 0 001.4 1.1v1a2.5 2.5 0 01-2.31-1.67l-.05-.18L2.08 6.7A2.5 2.5 0 013.7 3.69l.15-.05 5.8-1.56a2.5 2.5 0 012.96 1.46l.05.16z"/></svg>';
    Share = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10.85 2.15a.5.5 0 00-.85.35v1.51c-1.6.1-2.82.61-3.69 1.52a6.45 6.45 0 00-1.56 3.92.5.5 0 00.85.4c.95-.94 1.81-1.4 2.6-1.62A6.77 6.77 0 0110 8v1.5a.5.5 0 00.85.35l3.5-3.5a.5.5 0 000-.7l-3.5-3.5zM11 4.5v-.8L13.3 6 11 8.3v-.8a.5.5 0 00-.5-.5h-.02c-.74 0-1.61 0-2.55.27-.63.18-1.28.47-1.95.95.22-.82.57-1.49 1.06-2C7.76 5.47 8.84 5 10.5 5a.5.5 0 00.5-.5zm-8 1C3 4.67 3.67 4 4.5 4h1a.5.5 0 000-1h-1A2.5 2.5 0 002 5.5v6A2.5 2.5 0 004.5 14h6a2.5 2.5 0 002.5-2.5v-1a.5.5 0 00-1 0v1c0 .83-.67 1.5-1.5 1.5h-6A1.5 1.5 0 013 11.5v-6z"/></svg>';
    CopySelect = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 3a1 1 0 00-1 1v.5a.5.5 0 01-1 0V4c0-1.1.9-2 2-2h.5a.5.5 0 010 1H8z"/><path d="M7 12a1 1 0 001 1h.5a.5.5 0 010 1H8a2 2 0 01-2-2v-.5a.5.5 0 011 0v.5z"/><path d="M7 6.5a.5.5 0 00-1 0v3a.5.5 0 001 0v-3z"/><path d="M16 3a1 1 0 011 1v.5a.5.5 0 001 0V4a2 2 0 00-2-2h-.5a.5.5 0 000 1h.5z"/><path d="M16 13a1 1 0 001-1v-.5a.5.5 0 011 0v.5a2 2 0 01-2 2h-.5a.5.5 0 010-1h.5z"/><path d="M17.5 6a.5.5 0 00-.5.5v3a.5.5 0 001 0v-3a.5.5 0 00-.5-.5z"/><path d="M10.5 2a.5.5 0 000 1h3a.5.5 0 000-1h-3z"/><path d="M10 13.5c0-.28.22-.5.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z"/><path d="M4 6h1v1H4a1 1 0 00-1 1v6.5A2.5 2.5 0 005.5 17H12a1 1 0 001-1v-1h1v1a2 2 0 01-2 2H5.5A3.5 3.5 0 012 14.5V8c0-1.1.9-2 2-2z"/></svg>';
    CameraEdit = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.78 2.83c.26-.51.78-.83 1.34-.83h3.77c.57 0 1.08.32 1.34.83L13.8 4h1.7A2.5 2.5 0 0118 6.5v2.2c-.3-.26-.65-.45-1-.56V6.5c0-.83-.68-1.5-1.5-1.5h-2a.5.5 0 01-.45-.28l-.73-1.44A.5.5 0 0011.9 3H8.12a.5.5 0 00-.44.28l-.73 1.44A.5.5 0 016.5 5h-2C3.68 5 3 5.67 3 6.5v8c0 .83.68 1.5 1.5 1.5h3.72l-.16.65L8 17H4.5A2.5 2.5 0 012 14.5v-8A2.5 2.5 0 014.5 4h1.7l.58-1.17z"/><path d="M13.89 9.06a4 4 0 10-4.82 4.83l.2-.22.67-.67A3 3 0 1113 9.94l.89-.88z"/><path d="M14.8 9.55l-4.82 4.83a2.2 2.2 0 00-.58 1.02l-.37 1.5a.89.89 0 001.08 1.07l1.5-.37c.38-.1.73-.3 1.01-.58l4.83-4.83a1.87 1.87 0 00-2.64-2.64z"/></svg>';
    css45 = {
      code: "a.svelte-qnzlri{color:var(--fds-accent-default)}h3.svelte-qnzlri{-webkit-margin-after:12px!important;-webkit-margin-before:24px!important;margin-block-end:12px!important;margin-block-start:24px!important}.showcase-group.svelte-qnzlri{-webkit-margin-after:12px;display:flex;gap:12px;margin-block-end:12px}",
      map: null
    };
    Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let progressRingValue = Math.floor(Math.random() * 101);
      let normalRadioGroup = 0;
      let disabledRadioGroup = 0;
      let nonClosableFlyoutOpen = false;
      let flyoutTopOpen = false;
      let flyoutBottomOpen = false;
      let flyoutLeftOpen = false;
      let flyoutRightOpen = false;
      let dialogOpen = false;
      let dialogResult = "";
      let value;
      let menuGroup = 0;
      $$result.css.add(css45);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div style="${"height: 56px;"}"></div>

${validate_component(PageSection, "PageSection").$$render($$result, {}, {}, {
          default: () => {
            return `<h2>fluent-svelte test page</h2>
	<p>Made with <a href="${"https://kit.svelte.dev"}" class="${"svelte-qnzlri"}">SvelteKit</a></p>

	<h3 class="${"svelte-qnzlri"}">Buttons</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Button`;
              }
            })}
		${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
              default: () => {
                return `Button`;
              }
            })}
		${validate_component(Button, "Button").$$render($$result, { variant: "hyperlink" }, {}, {
              default: () => {
                return `Button`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Button, "Button").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `Button`;
              }
            })}
		${validate_component(Button, "Button").$$render($$result, { disabled: true, variant: "accent" }, {}, {
              default: () => {
                return `Button`;
              }
            })}
		${validate_component(Button, "Button").$$render($$result, { disabled: true, variant: "hyperlink" }, {}, {
              default: () => {
                return `Button`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Checkboxes</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}
		${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true }, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}
		${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true, indeterminate: true }, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Checkbox, "Checkbox").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}
		${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true, disabled: true }, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}
		${validate_component(Checkbox, "Checkbox").$$render($$result, {
              checked: true,
              disabled: true,
              indeterminate: true
            }, {}, {
              default: () => {
                return `Checkbox`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Switches</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, {}, {}, {
              default: () => {
                return `Switch`;
              }
            })}
		${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { checked: true }, {}, {
              default: () => {
                return `Switch`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `Switch`;
              }
            })}
		${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { checked: true, disabled: true }, {}, {
              default: () => {
                return `Switch`;
              }
            })}</div>
	<h3 class="${"svelte-qnzlri"}">Radio Button</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(RadioButton, "RadioButton").$$render($$result, { value: 0, group: normalRadioGroup }, {
              group: ($$value) => {
                normalRadioGroup = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option`;
              }
            })}
		${validate_component(RadioButton, "RadioButton").$$render($$result, { value: 1, group: normalRadioGroup }, {
              group: ($$value) => {
                normalRadioGroup = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(RadioButton, "RadioButton").$$render($$result, {
              disabled: true,
              value: 0,
              group: disabledRadioGroup
            }, {
              group: ($$value) => {
                disabledRadioGroup = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option`;
              }
            })}
		${validate_component(RadioButton, "RadioButton").$$render($$result, {
              disabled: true,
              value: 1,
              group: disabledRadioGroup
            }, {
              group: ($$value) => {
                disabledRadioGroup = $$value;
                $$settled = false;
              }
            }, {
              default: () => {
                return `Option`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">ComboBox</h3>
	${validate_component(ComboBox, "ComboBox").$$render($$result, {
              placeholder: "ComboBox",
              items: [
                { name: "Item 1" },
                { name: "Item 2" },
                { name: "Item 3", disabled: true },
                { name: "Item 4" }
              ]
            }, {}, {})}

	${validate_component(ComboBox, "ComboBox").$$render($$result, {
              editable: true,
              placeholder: "ComboBox",
              items: [
                { name: "Item 1", disabled: true },
                { name: "Item 2" },
                { name: "Item 3" },
                { name: "Item 4" }
              ]
            }, {}, {})}

	${validate_component(ComboBox, "ComboBox").$$render($$result, {
              placeholder: "ComboBox",
              disabled: true,
              items: [
                { name: "Item 1" },
                { name: "Item 2" },
                { name: "Item 3" },
                { name: "Item 4" }
              ]
            }, {}, {})}

	<h3 class="${"svelte-qnzlri"}">Progress Ring</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(ProgressRing, "ProgressRing").$$render($$result, {}, {}, {})}
		${validate_component(ProgressRing, "ProgressRing").$$render($$result, { value: progressRingValue }, {
              value: ($$value) => {
                progressRingValue = $$value;
                $$settled = false;
              }
            }, {})}
		${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Randomize Value`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(ProgressRing, "ProgressRing").$$render($$result, { size: 60 }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">InfoBadge</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "attention" }, {}, {})}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "success" }, {}, {})}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "caution" }, {}, {})}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "critical" }, {}, {})}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "information" }, {}, {})}</div>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "attention" }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "success" }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "caution" }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "critical" }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}
		${validate_component(InfoBadge, "InfoBadge").$$render($$result, { severity: "information" }, {}, {
              default: () => {
                return `${escape(Math.floor(Math.random() * 10))}`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Progress Bar</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(ProgressBar, "ProgressBar").$$render($$result, { value: 50 }, {}, {})}
		${validate_component(ProgressBar, "ProgressBar").$$render($$result, {}, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Flyout</h3>
	<div class="${"showcase-group svelte-qnzlri"}" style="${"display: flex; justify-content: center;"}">${validate_component(FlyoutWrapper, "Flyout").$$render($$result, {
              closable: false,
              open: nonClosableFlyoutOpen
            }, {
              open: ($$value) => {
                nonClosableFlyoutOpen = $$value;
                $$settled = false;
              }
            }, {
              flyout: () => {
                return `You can&#39;t close me &gt;:)`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Non-closasble Flyout`;
                  }
                })}`;
              }
            })}</div>
	<div class="${"showcase-group svelte-qnzlri"}" style="${"display: flex; justify-content: center; align-items: center;"}">${validate_component(FlyoutWrapper, "Flyout").$$render($$result, { placement: "top", open: flyoutTopOpen }, {
              open: ($$value) => {
                flyoutTopOpen = $$value;
                $$settled = false;
              }
            }, {
              flyout: () => {
                return `Flyout Content`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Top Flyout`;
                  }
                })}`;
              }
            })}
		${validate_component(FlyoutWrapper, "Flyout").$$render($$result, {
              placement: "bottom",
              open: flyoutBottomOpen
            }, {
              open: ($$value) => {
                flyoutBottomOpen = $$value;
                $$settled = false;
              }
            }, {
              flyout: () => {
                return `Flyout Content`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Bottom Flyout`;
                  }
                })}`;
              }
            })}
		${validate_component(FlyoutWrapper, "Flyout").$$render($$result, { placement: "left", open: flyoutLeftOpen }, {
              open: ($$value) => {
                flyoutLeftOpen = $$value;
                $$settled = false;
              }
            }, {
              flyout: () => {
                return `Flyout Content`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Left Flyout`;
                  }
                })}`;
              }
            })}
		${validate_component(FlyoutWrapper, "Flyout").$$render($$result, {
              placement: "right",
              open: flyoutRightOpen
            }, {
              open: ($$value) => {
                flyoutRightOpen = $$value;
                $$settled = false;
              }
            }, {
              flyout: () => {
                return `Flyout Content`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Right Flyout`;
                  }
                })}`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Info Bar</h3>
	<div class="${"showcase-group svelte-qnzlri"}" style="${"flex-direction: column"}">${validate_component(InfoBar, "InfoBar").$$render($$result, {
              closable: false,
              severity: "information",
              title: "Info",
              message: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
            }, {}, {
              action: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Action`;
                  }
                })}`;
              }
            })}
		${validate_component(InfoBar, "InfoBar").$$render($$result, {
              severity: "attention",
              title: "Attention",
              message: "Something is happening."
            }, {}, {
              action: () => {
                return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
                  default: () => {
                    return `Action`;
                  }
                })}`;
              }
            })}
		${validate_component(InfoBar, "InfoBar").$$render($$result, {
              severity: "success",
              title: "Success",
              message: "Nothing bad happened!"
            }, {}, {})}
		${validate_component(InfoBar, "InfoBar").$$render($$result, {
              severity: "caution",
              title: "Caution",
              message: "Don't do this or something bad will happen."
            }, {}, {})}
		${validate_component(InfoBar, "InfoBar").$$render($$result, {
              severity: "critical",
              title: "Error",
              message: "Something bad happened :("
            }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Text Box</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(TextBox, "TextBox").$$render($$result, { placeholder: "TextBox", value }, {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            }, {})}
		${validate_component(TextBox, "TextBox").$$render($$result, { disabled: true, placeholder: "TextBox" }, {}, {})}
		${validate_component(TextBox, "TextBox").$$render($$result, { type: "password", placeholder: "TextBox" }, {}, {})}
		${validate_component(TextBox, "TextBox").$$render($$result, { type: "search", placeholder: "TextBox" }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Number Box</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(NumberBox, "NumberBox").$$render($$result, {
              value: 1,
              min: 0,
              max: 10,
              placeholder: "NumberBox"
            }, {}, {})}
		${validate_component(NumberBox, "NumberBox").$$render($$result, {
              size: 50,
              placeholder: "NumberBox",
              inline: true
            }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Tooltip</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(TooltipWrapper, "Tooltip").$$render($$result, { text: "test" }, {}, {
              default: () => {
                return `<div${add_attribute("tabindex", -1, 0)} style="${"width:80px;height:80px;border:2px dotted var(--fds-divider-stroke-default);margin:0;"}"></div>`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Person Picture</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(PersonPicture, "PersonPicture").$$render($$result, { size: 24 }, {}, {
              default: () => {
                return `${escape(Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2))}`;
              }
            })}
		${validate_component(PersonPicture, "PersonPicture").$$render($$result, {
              src: "https://thispersondoesnotexist.com/image",
              size: 32
            }, {}, {
              default: () => {
                return `${escape(Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2))}`;
              }
            })}
		${validate_component(PersonPicture, "PersonPicture").$$render($$result, { size: 48 }, {}, {
              badge: () => {
                return `${validate_component(InfoBadge, "InfoBadge").$$render($$result, {}, {}, {
                  default: () => {
                    return `1`;
                  }
                })}
			`;
              },
              default: () => {
                return `${escape(Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2))}`;
              }
            })}
		${validate_component(PersonPicture, "PersonPicture").$$render($$result, { alt: "a a a a", size: 96 }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Dialog</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Open`;
              }
            })}
		${validate_component(ContentDialog, "ContentDialog").$$render($$result, { title: "Add new alarm", open: dialogOpen }, {
              open: ($$value) => {
                dialogOpen = $$value;
                $$settled = false;
              }
            }, {
              footer: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "accent" }, {}, {
                  default: () => {
                    return `Save`;
                  }
                })}
				${validate_component(Button, "Button").$$render($$result, {}, {}, {
                  default: () => {
                    return `Cancel`;
                  }
                })}
			`;
              },
              default: () => {
                return `<div style="${"display: flex; flex-direction: column; gap: 12px; margin: 0;"}">${validate_component(TextBox, "TextBox").$$render($$result, { placeholder: "Alarm name" }, {}, {})}
				${validate_component(ComboBox, "ComboBox").$$render($$result, {
                  value: 1,
                  items: [
                    { name: "Disabled" },
                    { name: "10 minutes" },
                    { name: "20 minutes" },
                    { name: "30 minutes" },
                    { name: "1 hour" }
                  ]
                }, {}, {})}
				${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
                  default: () => {
                    return `Repeat alarm`;
                  }
                })}</div>`;
              }
            })}</div>

	<p>Result: ${escape(dialogResult)}</p>

	<h3 class="${"svelte-qnzlri"}">Slider</h3>

	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Slider, "Slider").$$render($$result, {}, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 50, max: 9e6, step: 20 }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 2500, min: 1e3, max: 5e3 }, {}, {})}</div>

	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Slider, "Slider").$$render($$result, { value: 50, ticks: [20, 40, 60, 80] }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              value: 50,
              ticks: [20, 40, 60, 80],
              tickPlacement: "before"
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              value: 50,
              ticks: [20, 40, 60, 80],
              tickPlacement: "after"
            }, {}, {})}</div>

	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Slider, "Slider").$$render($$result, { value: 50, tooltip: false }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 50, prefix: "$" }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 50, suffix: "%" }, {}, {})}</div>

	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Slider, "Slider").$$render($$result, { value: 50, reverse: true }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 50, disabled: true }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, { value: 50, track: false }, {}, {})}</div>

	<div class="${"showcase-group svelte-qnzlri"}" style="${"height: 250px"}">${validate_component(Slider, "Slider").$$render($$result, { orientation: "vertical" }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              step: 20
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 2500,
              min: 1e3,
              max: 5e3
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              ticks: [20, 40, 60, 80]
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              ticks: [20, 40, 60, 80],
              tickPlacement: "before"
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              ticks: [20, 40, 60, 80],
              tickPlacement: "after"
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              reverse: true
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              disabled: true
            }, {}, {})}
		${validate_component(Slider, "Slider").$$render($$result, {
              orientation: "vertical",
              value: 50,
              track: false
            }, {}, {})}</div>

	<h3 class="${"svelte-qnzlri"}">Expander</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(Expander, "Expander").$$render($$result, {}, {}, {
              content: () => {
                return `hihihihi`;
              },
              icon: () => {
                return `<svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"16"}" height="${"16"}" viewBox="${"0 0 16 16"}"><path d="${"M11.8105 2.44911C11.2248 1.86332 10.275 1.86332 9.68922 2.44911L7.96197 4.17636C7.81383 3.50372 7.21422 3.00044 6.49707 3.00044H3.49707C2.66864 3.00044 1.99707 3.67202 1.99707 4.50044V12.4985C1.99707 13.0088 2.25188 13.4595 2.64121 13.7305C2.88446 13.9006 3.18051 14.0004 3.49988 14.0004H11.4999C12.3283 14.0004 12.9999 13.3289 12.9999 12.5004V9.50044C12.9999 8.80142 12.5217 8.21408 11.8746 8.04764L13.5812 6.34109C14.167 5.7553 14.167 4.80555 13.5812 4.21977L11.8105 2.44911ZM9.57791 8.00044H7.99707V6.4196L9.57791 8.00044ZM10.3963 3.15621C10.5916 2.96095 10.9082 2.96095 11.1034 3.15621L12.8741 4.92687C13.0694 5.12214 13.0694 5.43872 12.8741 5.63398L11.1034 7.40464C10.9082 7.59991 10.5916 7.59991 10.3963 7.40464L8.62566 5.63398C8.4304 5.43872 8.4304 5.12214 8.62566 4.92687L10.3963 3.15621ZM6.99707 4.50044V8.00044L2.99707 8.00044V4.50044C2.99707 4.2243 3.22093 4.00044 3.49707 4.00044H6.49707C6.77321 4.00044 6.99707 4.2243 6.99707 4.50044ZM2.99988 12.5004L2.99988 9.00044H6.99707V12.9985H3.49707C3.3909 12.9985 3.29245 12.9654 3.21149 12.9089C3.08346 12.8184 2.99988 12.6692 2.99988 12.5004ZM7.99707 9.00044H11.4999C11.776 9.00044 11.9999 9.2243 11.9999 9.50044V12.5004C11.9999 12.7766 11.776 13.0004 11.4999 13.0004H7.99707V9.00044Z"}" fill="${"currentColor"}"></path></svg>
			`;
              },
              default: () => {
                return `Expander Down (Icon)
			`;
              }
            })}
		${validate_component(Expander, "Expander").$$render($$result, { direction: "up" }, {}, {
              content: () => {
                return `hihihihi`;
              },
              default: () => {
                return `Expander Up
			`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Text Block</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "caption" }, {}, {
              default: () => {
                return `Caption`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "body" }, {}, {
              default: () => {
                return `Body`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyStrong" }, {}, {
              default: () => {
                return `Body Strong`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "bodyLarge" }, {}, {
              default: () => {
                return `Body Large`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "subtitle" }, {}, {
              default: () => {
                return `Subtitle`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "title" }, {}, {
              default: () => {
                return `Title`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "titleLarge" }, {}, {
              default: () => {
                return `Title Large`;
              }
            })}
		${validate_component(TextBlock, "TextBlock").$$render($$result, { variant: "display" }, {}, {
              default: () => {
                return `Display`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Icon Button</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(IconButton, "IconButton").$$render($$result, {}, {}, {
              default: () => {
                return `<svg xmlns="${"http://www.w3.org/2000/svg"}" height="${"16"}" viewBox="${"0 0 1024 1024"}" width="${"16"}"><path fill="${"currentColor"}" d="${"M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"}"></path></svg>`;
              }
            })}
		${validate_component(IconButton, "IconButton").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `<svg xmlns="${"http://www.w3.org/2000/svg"}" height="${"16"}" viewBox="${"0 0 1024 1024"}" width="${"16"}"><path fill="${"currentColor"}" d="${"M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"}"></path></svg>`;
              }
            })}</div>
	<h3 class="${"svelte-qnzlri"}">List Item</h3>
	<div style="${"display: flex; flex-direction: column;"}">${validate_component(ListItem, "ListItem").$$render($$result, {}, {}, {
              icon: () => {
                return `<svg slot="${"icon"}" xmlns="${"http://www.w3.org/2000/svg"}" height="${"16"}" viewBox="${"0 0 1024 1024"}" width="${"16"}"><path fill="${"currentColor"}" d="${"M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"}"></path></svg>`;
              },
              default: () => {
                return `Hello World
		`;
              }
            })}
		${validate_component(ListItem, "ListItem").$$render($$result, { disabled: true }, {}, {
              default: () => {
                return `Hello World`;
              }
            })}
		${validate_component(ListItem, "ListItem").$$render($$result, { selected: true }, {}, {
              default: () => {
                return `Hello World`;
              }
            })}</div>

	<h3 class="${"svelte-qnzlri"}">Menu Bar</h3>
	${validate_component(MenuBar, "MenuBar").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(MenuBarItem, "MenuBarItem").$$render($$result, {}, {}, {
                  flyout: () => {
                    return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+N" }, {}, {
                      default: () => {
                        return `New`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Shift+N" }, {}, {
                      default: () => {
                        return `New window`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+O" }, {}, {
                      default: () => {
                        return `Open`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+S" }, {}, {
                      default: () => {
                        return `Save`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Shift+S" }, {}, {
                      default: () => {
                        return `Save as`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `Page setup`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+P" }, {}, {
                      default: () => {
                        return `Print`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `Exit`;
                      }
                    })}
			`;
                  },
                  default: () => {
                    return `File
			`;
                  }
                })}
		${validate_component(MenuBarItem, "MenuBarItem").$$render($$result, {}, {}, {
                  flyout: () => {
                    return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Z" }, {}, {
                      default: () => {
                        return `Undo`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+X" }, {}, {
                      default: () => {
                        return `Cut`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+C" }, {}, {
                      default: () => {
                        return `Copy`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+V" }, {}, {
                      default: () => {
                        return `Paste`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Del" }, {}, {
                      default: () => {
                        return `Delete`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+F" }, {}, {
                      default: () => {
                        return `Find`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "F3" }, {}, {
                      default: () => {
                        return `Find next`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Shift+F3" }, {}, {
                      default: () => {
                        return `Find previous`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+H" }, {}, {
                      default: () => {
                        return `Replace`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+G" }, {}, {
                      default: () => {
                        return `Go to`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+A" }, {}, {
                      default: () => {
                        return `Select all`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "F5" }, {}, {
                      default: () => {
                        return `Time/Date`;
                      }
                    })}
				${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `Font`;
                      }
                    })}
			`;
                  },
                  default: () => {
                    return `Edit
			`;
                  }
                })}
		${validate_component(MenuBarItem, "MenuBarItem").$$render($$result, { disabled: true }, {}, {
                  default: () => {
                    return `Format`;
                  }
                })}
		${validate_component(MenuBarItem, "MenuBarItem").$$render($$result, {}, {}, {
                  flyout: () => {
                    return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { indented: true, cascading: true }, {}, {
                      flyout: () => {
                        return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Plus" }, {}, {
                          default: () => {
                            return `Zoom in`;
                          }
                        })}
						${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Minus" }, {}, {
                          default: () => {
                            return `Zoom out`;
                          }
                        })}
						${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+0" }, {}, {
                          default: () => {
                            return `Restore default zoom`;
                          }
                        })}
					`;
                      },
                      default: () => {
                        return `Zoom
					`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { variant: "toggle", checked: true }, {}, {
                      default: () => {
                        return `Status bar`;
                      }
                    })}
				${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { variant: "toggle", checked: true }, {}, {
                      default: () => {
                        return `Word wrap`;
                      }
                    })}
			`;
                  },
                  default: () => {
                    return `View
			`;
                  }
                })}
		${validate_component(MenuBarItem, "MenuBarItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `Help`;
                  }
                })}`;
              }
            })}

	<h3 class="${"svelte-qnzlri"}">MenuFlyout</h3>
	${validate_component(MenuFlyoutWrapper, "MenuFlyout").$$render($$result, { alignment: "start" }, {}, {
              flyout: () => {
                return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  icon: () => {
                    return `<svg slot="${"icon"}" xmlns="${"http://www.w3.org/2000/svg"}" height="${"16"}" viewBox="${"0 0 1024 1024"}" width="${"16"}"><path fill="${"currentColor"}" d="${"M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"}"></path></svg>`;
                  },
                  default: () => {
                    return `Standard Option
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { indented: true, hint: "Ctrl + Z" }, {}, {
                  icon: () => {
                    return `<svg slot="${"icon"}" xmlns="${"http://www.w3.org/2000/svg"}" height="${"16"}" viewBox="${"0 0 1024 1024"}" width="${"16"}"><path fill="${"currentColor"}" d="${"M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"}"></path></svg>`;
                  },
                  default: () => {
                    return `Standard Option (Indented)
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { indented: true, selected: true }, {}, {
                  default: () => {
                    return `Standard Option (Selected)`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {
                  indented: true,
                  disabled: true,
                  selected: true
                }, {}, {
                  default: () => {
                    return `Standard Option (Disabled Selected)`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { indented: true, disabled: true }, {}, {
                  default: () => {
                    return `Standard Option Disabled`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {
                  variant: "radio",
                  value: 0,
                  group: menuGroup
                }, {
                  group: ($$value) => {
                    menuGroup = $$value;
                    $$settled = false;
                  }
                }, {
                  default: () => {
                    return `Radio Option 0
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {
                  variant: "radio",
                  value: 1,
                  group: menuGroup
                }, {
                  group: ($$value) => {
                    menuGroup = $$value;
                    $$settled = false;
                  }
                }, {
                  default: () => {
                    return `Radio Option 1
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { checked: true, variant: "toggle" }, {}, {
                  default: () => {
                    return `Toggle Option 0`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { variant: "toggle" }, {}, {
                  default: () => {
                    return `Toggle Option 1`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {
                  indented: true,
                  cascading: true,
                  hint: "hint"
                }, {}, {
                  flyout: () => {
                    return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `subitem 1
                    `;
                      }
                    })}
                    ${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `subitem 2
                    `;
                      }
                    })}
                    ${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                      default: () => {
                        return `subitem 3
                    `;
                      }
                    })}
                `;
                  },
                  default: () => {
                    return `cascading
                `;
                  }
                })}
		`;
              },
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
                  default: () => {
                    return `Open`;
                  }
                })}`;
              }
            })}

	<h3 class="${"svelte-qnzlri"}">Context Menu</h3>
	${validate_component(ContextMenu, "ContextMenu").$$render($$result, {}, {}, {
              menu: () => {
                return `${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Alt+Left arrow" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${ArrowLeft}<!-- HTML_TAG_END -->
				Back
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Alt+Left arrow" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${ArrowRight}<!-- HTML_TAG_END -->
				Forward
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+R" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${ArrowClockwise}<!-- HTML_TAG_END -->
				Reload
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+S" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${SaveEdit}<!-- HTML_TAG_END -->
				Save image as
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+P" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${Print}<!-- HTML_TAG_END -->
				Print
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${Cast}<!-- HTML_TAG_END -->
				Cast as media to device
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { cascading: true }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${Send}<!-- HTML_TAG_END -->
				Send page to your devices
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${ScanTable}<!-- HTML_TAG_END -->
				Create QR Code for this page
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Shift+U" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${ReadAloud}<!-- HTML_TAG_END -->
				Read aloud
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${Collections}<!-- HTML_TAG_END -->
				Add page to Collections
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${Share}<!-- HTML_TAG_END -->
				Share
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+Shift+X" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${CopySelect}<!-- HTML_TAG_END -->
				Web select
			`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { hint: "Ctrl+S" }, {}, {
                  default: () => {
                    return `<!-- HTML_TAG_START -->${CameraEdit}<!-- HTML_TAG_END -->
				Web capture
			`;
                  }
                })}
			${validate_component(MenuFlyoutDivider, "MenuFlyoutDivider").$$render($$result, {}, {}, {})}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, { indented: true, hint: "Ctrl+U" }, {}, {
                  default: () => {
                    return `View page source`;
                  }
                })}
			${validate_component(MenuFlyoutItem, "MenuFlyoutItem").$$render($$result, {}, {}, {
                  default: () => {
                    return `<svg width="${"16"}" height="${"16"}" viewBox="${"0 0 16 16"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M1 5c0-1.1.9-2 2-2h10a2 2 0 012 2v5a2 2 0 01-1.16 1.82 1.5 1.5 0 00-.28-.38l-.45-.45A1 1 0 0014 10V5a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h4v1H3a2 2 0 01-2-2V5z"}"></path><path d="${"M8.85 8.15A.5.5 0 008 8.5v6a.5.5 0 00.9.3l1.35-1.8h2.25a.5.5 0 00.35-.85l-4-4zM9 13V9.7l2.3 2.3H10a.5.5 0 00-.4.2L9 13z"}"></path></svg>
				Inspect
			`;
                  }
                })}
		`;
              },
              default: () => {
                return `<div style="${"background-color: var(--fds-solid-background-secondary); width: 200px; height: 200px;"}"></div>`;
              }
            })}

	<h3 class="${"svelte-qnzlri"}">Auto Suggest Box</h3>
	<div class="${"showcase-group svelte-qnzlri"}">${validate_component(AutoSuggestBox, "AutoSuggestBox").$$render($$result, {
              placeholder: "Search fruits",
              items: [
                "Apple",
                "Orange",
                "Grape",
                "Mango",
                "Pear",
                "Banana",
                "Strawberry",
                "Watermelon",
                "Cherry"
              ]
            }, {}, {})}

		${validate_component(AutoSuggestBox, "AutoSuggestBox").$$render($$result, {
              placeholder: "Custom item template",
              items: [
                "Apple",
                "Orange",
                "Grape",
                "Mango",
                "Pear",
                "Banana",
                "Strawberry",
                "Watermelon",
                "Cherry"
              ]
            }, {}, {
              "item-template": ({ index, selection, item, id }) => {
                return `<li slot="${"item-template"}"${add_attribute("id", id, 0)}${add_attribute("style", selection === index ? "background-color: red" : "", 0)}>${escape(item)}</li>`;
              }
            })}</div>`;
          }
        })}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports20 = {};
__export(__exports20, {
  css: () => css46,
  entry: () => entry20,
  js: () => js20,
  module: () => test_svelte_exports
});
var entry20, js20, css46;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    init_test_svelte();
    entry20 = "pages/test.svelte-8412c2c1.js";
    js20 = ["pages/test.svelte-8412c2c1.js", "chunks/vendor-9c551f02.js", "chunks/Button-a7276b10.js", "chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js", "chunks/Checkbox-5f7c1302.js", "chunks/ToggleSwitch-d4a933f6.js", "chunks/RadioButton-f8305108.js", "chunks/NumberBox-66139323.js", "chunks/TextBoxButton-cdab09ab.js", "chunks/InfoBar-c9f740b0.js", "chunks/AutoSuggestBox-fbbf55e9.js", "chunks/ListItem-3fe40cc9.js", "chunks/TextBlock-d5339f0f.js", "chunks/Slider-8c5a299b.js", "chunks/TooltipWrapper-3e5457be.js", "chunks/ContentDialog-05bc6549.js", "chunks/Expander-e69a98d3.js", "chunks/IconButton-c8cc9811.js", "chunks/PageSection-65bb6614.js"];
    css46 = ["assets/pages/test.svelte-ccd0186f.css", "assets/APIDocs.svelte_svelte_type_style_lang-04bfd427.css", "assets/theme-22ec604e.css", "assets/ContextMenu.svelte_svelte_type_style_lang-264ea951.css"];
  }
});

// .svelte-kit/vercel-tmp/entry.js
__export(exports, {
  default: () => entry_default
});
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data12 = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data12.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data12.length + chunk.length);
        new_data.set(data12, 0);
        new_data.set(chunk, data12.length);
        data12 = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data12);
    });
  });
}

// .svelte-kit/output/server/app.js
init_index_f16625c7();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  let { props_3 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
    $$bindings.props_3(props_3);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${components[3] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
            default: () => {
              return `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}`;
            }
          })}` : `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  request.params = route.params ? decode_params(route.params(match)) : {};
  const response = await handler(request);
  const preface = `Invalid response from route ${request.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    return;
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry21) {
    return entry21[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry21, i2) {
    names.set(entry21[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params,
  ssr,
  stuff
}) {
  const css47 = new Set(options.manifest._.entry.css);
  const js21 = new Set(options.manifest._.entry.js);
  const styles = new Map();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => css47.add(url2));
      if (node.js)
        node.js.forEach((url2) => js21.add(url2));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: {
        url: state.prerender ? create_prerendering_url_proxy(url) : url,
        params,
        status,
        error: error2,
        stuff
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  if (options.amp) {
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${inlined_style}
${rendered.css.code}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      head += `
	<style${options.dev ? " data-svelte" : ""}>${inlined_style}</style>`;
    }
    head += Array.from(css47).map((dep) => `
	<link${styles.has(dep) ? " disabled" : ""} rel="stylesheet" href="${options.prefix + dep}">`).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(js21).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      head += `
			<script type="module">
				import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
				start({
					target: ${options.target ? `document.querySelector(${s2(options.target)})` : "document.body"},
					paths: ${s2(options.paths)},
					session: ${try_serialize($session, (error3) => {
        throw new Error(`Failed to serialize session data: ${error3.message}`);
      })},
					route: ${!!page_config.router},
					spa: ${!ssr},
					trailing_slash: ${s2(options.trailing_slash)},
					hydrate: ${ssr && page_config.hydrate ? `{
						status: ${status},
						error: ${serialize_error(error2)},
						nodes: [
							${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
						],
						url: new URL(${s2(url.href)}),
						params: ${devalue(params)}
					}` : "null"}
				});
			<\/script>${options.service_worker ? `
			<script>
				if ('serviceWorker' in navigator) {
					navigator.serviceWorker.register('${options.service_worker}');
				}
			<\/script>` : ""}`;
      body += serialized_data.map(({ url: url2, body: body2, json }) => {
        let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
        if (body2)
          attributes += ` data-body="${hash(body2)}"`;
        return `<script ${attributes}>${json}<\/script>`;
      }).join("\n\n	");
    }
  }
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  const segments = url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  return {
    status,
    headers,
    body: options.template({
      head,
      body,
      assets: assets2
    })
  };
}
function try_serialize(data12, fail) {
  try {
    return devalue(data12);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  request,
  options,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(url) : url,
      params,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        const resolved = resolve(request.url.pathname, requested.split("?")[0]);
        let response;
        const prefix = options.paths.assets || options.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            if (request.headers.cookie) {
              opts.headers.set("cookie", request.headers.cookie);
            }
            if (request.headers.authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", request.headers.authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const rendered = await respond({
            url: new URL(requested, request.url),
            method: opts.method || "GET",
            headers: Object.fromEntries(opts.headers),
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body)
          }, options, {
            fetched: requested,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          } else {
            return fetch(new URL(requested, request.url).href, {
              method: opts.method || "GET",
              headers: opts.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${request.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            opts.headers.set("cookie", request.headers.cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: requested,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else {
    loaded = {};
  }
  if (loaded.fallthrough && !is_error) {
    return;
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({
  request,
  options,
  state,
  $session,
  status,
  error: error2,
  ssr
}) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const params = {};
    const layout_loaded = await load_node({
      request,
      options,
      state,
      route: null,
      url: request.url,
      params,
      node: default_layout,
      $session,
      stuff: {},
      is_error: false
    });
    const error_loaded = await load_node({
      request,
      options,
      state,
      route: null,
      url: request.url,
      params,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      is_error: true,
      status,
      error: error2
    });
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      url: request.url,
      params,
      ssr
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1(opts) {
  const { request, options, state, $session, route, ssr } = opts;
  let nodes;
  if (!ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      url: request.url,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return await respond_with_error({
      request,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      ssr
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              url: request.url,
              node,
              stuff,
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, request);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    url: request.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options,
              state,
              $session,
              status,
              error: error2,
              ssr
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      url: request.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs#hooks-handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options, state, ssr) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.url.pathname}`
    };
  }
  const params = route.params ? decode_params(route.params(match)) : {};
  const $session = await options.hooks.getSession(request);
  const response = await respond$1({
    request,
    options,
    state,
    $session,
    route,
    params,
    ssr
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      const existing_values = map.get(key);
      if (existing_values) {
        existing_values.push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd2(this, _map, void 0);
    __privateSet2(this, _map, map);
  }
  get(key) {
    const value = __privateGet2(this, _map).get(key);
    if (!value) {
      return null;
    }
    return value[0];
  }
  getAll(key) {
    return __privateGet2(this, _map).get(key) || [];
  }
  has(key) {
    return __privateGet2(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet2(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield value[i2];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data: data12, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data12;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data: data12, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data12;
}
async function respond(incoming, options, state = {}) {
  var _a4;
  if (incoming.url.pathname !== "/" && options.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.url.pathname.endsWith("/");
    if (has_trailing_slash && options.trailing_slash === "never" || !has_trailing_slash && options.trailing_slash === "always" && !(incoming.url.pathname.split("/").pop() || "").includes(".")) {
      incoming.url.pathname = has_trailing_slash ? incoming.url.pathname.slice(0, -1) : incoming.url.pathname + "/";
      if (incoming.url.search === "?")
        incoming.url.search = "";
      return {
        status: 301,
        headers: {
          location: incoming.url.pathname + incoming.url.search
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = __spreadProps(__spreadValues({}, incoming), {
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  });
  const { parameter, allowed } = options.method_override;
  const method_override = (_a4 = incoming.url.searchParams.get(parameter)) == null ? void 0 : _a4.toUpperCase();
  if (method_override) {
    if (request.method.toUpperCase() === "POST") {
      if (allowed.includes(method_override)) {
        request.method = method_override;
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs#configuration-methodoverride`;
        return {
          status: 400,
          headers: {},
          body
        };
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  const print_error = (property, replacement) => {
    Object.defineProperty(request, property, {
      get: () => {
        throw new Error(`request.${property} has been replaced by request.url.${replacement}`);
      }
    });
  };
  print_error("origin", "origin");
  print_error("path", "pathname");
  print_error("query", "searchParams");
  let ssr = true;
  try {
    return await options.hooks.handle({
      request,
      resolve: async (request2, opts) => {
        if (opts && "ssr" in opts)
          ssr = opts.ssr;
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: request2.url,
            params: request2.params,
            options,
            state,
            $session: await options.hooks.getSession(request2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            branch: [],
            ssr: false
          });
        }
        let decoded = decodeURI(request2.url.pathname);
        if (options.paths.base) {
          if (!decoded.startsWith(options.paths.base))
            return;
          decoded = decoded.slice(options.paths.base.length) || "/";
        }
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options, state, ssr);
          if (response) {
            if (response.status === 200 && !response.headers.etag) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  const headers2 = { etag };
                  for (const key of [
                    "cache-control",
                    "content-location",
                    "date",
                    "expires",
                    "vary"
                  ]) {
                    if (key in response.headers) {
                      headers2[key] = response.headers[key];
                    }
                  }
                  return {
                    status: 304,
                    headers: headers2
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(request2);
          return await respond_with_error({
            request: request2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${request2.url.pathname}`),
            ssr
          });
        }
      }
    });
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, request);
    try {
      const $session = await options.hooks.getSession(request);
      return await respond_with_error({
        request,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        ssr
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return {
        status: 500,
        headers: {},
        body: options.dev ? error3.stack : error3.message
      };
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body, assets: assets2 }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/logo.svg" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var default_protocol = "https";
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, request) => {
        hooks.handleError({ error: error2, request });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      target: "body",
      template,
      trailing_slash: "never"
    };
  }
  render(request, {
    prerender: prerender2
  } = {}) {
    if (Object.keys(request).sort().join() !== "headers,method,rawBody,url") {
      throw new Error("Adapters should call app.render({ url, method, headers, rawBody })");
    }
    const host = request.headers["host"];
    const protocol = default_protocol;
    return respond(__spreadProps(__spreadValues({}, request), { url: new URL(request.url, protocol + "://" + host) }), this.options, { prerender: prerender2 });
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["bloom-mica-dark.png", "bloom-mica-light.png", "logo.svg"]),
  _: {
    mime: { ".png": "image/png", ".svg": "image/svg+xml" },
    entry: { "file": "start-d1273797.js", "js": ["start-d1273797.js", "chunks/vendor-9c551f02.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15)),
      () => Promise.resolve().then(() => (init__16(), __exports16)),
      () => Promise.resolve().then(() => (init__17(), __exports17)),
      () => Promise.resolve().then(() => (init__18(), __exports18)),
      () => Promise.resolve().then(() => (init__19(), __exports19)),
      () => Promise.resolve().then(() => (init__20(), __exports20))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/?$/,
        params: null,
        path: "/docs",
        a: [0, 3, 4],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/getting-started\/?$/,
        params: null,
        path: "/docs/getting-started",
        a: [0, 3, 5],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/contentdialog\/?$/,
        params: null,
        path: "/docs/components/contentdialog",
        a: [0, 3, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/progressring\/?$/,
        params: null,
        path: "/docs/components/progressring",
        a: [0, 3, 7],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/toggleswitch\/?$/,
        params: null,
        path: "/docs/components/toggleswitch",
        a: [0, 3, 8],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/radiobutton\/?$/,
        params: null,
        path: "/docs/components/radiobutton",
        a: [0, 3, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/playground\/?$/,
        params: null,
        path: "/docs/components/playground",
        a: [0, 3, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/infobadge\/?$/,
        params: null,
        path: "/docs/components/infobadge",
        a: [0, 3, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/checkbox\/?$/,
        params: null,
        path: "/docs/components/checkbox",
        a: [0, 3, 12],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/expander\/?$/,
        params: null,
        path: "/docs/components/expander",
        a: [0, 3, 13],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/listitem\/?$/,
        params: null,
        path: "/docs/components/listitem",
        a: [0, 3, 14],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/infobar\/?$/,
        params: null,
        path: "/docs/components/infobar",
        a: [0, 3, 15],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/button\/?$/,
        params: null,
        path: "/docs/components/button",
        a: [0, 3, 16],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/components\/slider\/?$/,
        params: null,
        path: "/docs/components/slider",
        a: [0, 3, 17],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/docs\/internals\/?$/,
        params: null,
        path: "/docs/internals",
        a: [0, 3, 18],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/test\/?$/,
        params: null,
        path: "/test",
        a: [0, 19],
        b: [1]
      }
    ]
  }
};

// .svelte-kit/vercel-tmp/entry.js
__fetch_polyfill();
var app = new App(manifest);
var entry_default = async (req, res) => {
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await app.render({
    url: req.url,
    method: req.method,
    headers: req.headers,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
