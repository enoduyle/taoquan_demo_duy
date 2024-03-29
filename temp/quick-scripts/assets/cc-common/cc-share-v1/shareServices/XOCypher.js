(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shareServices/XOCypher.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b4635rv19pGzYjq5AbHvM8P', 'XOCypher', __filename);
// cc-common/cc-share-v1/shareServices/XOCypher.js

"use strict";

var XORCipher = {
    encode: function encode(key, data) {
        data = xor_encrypt(key, data);
        return b64_encode(data);
    },
    decode: function decode(key, data) {
        data = b64_decode(data);
        return xor_decrypt(key, data);
    },
    encode_new: function encode_new(key, data) {
        data = xor_encrypt_new(key, data);
        return b64_encode(data);
    },
    decode_new: function decode_new(key, data) {
        data = b64_decode(data);
        return xor_decrypt_new(key, data);
    },

    encode_tutorial: function encode_tutorial(data) {
        var key = randomString(10);
        data = xor_encrypt_new(key, data);
        return b64_encode(data) + key;
    },

    decode_tutorial: function decode_tutorial(data) {
        var key = data.slice(-10);
        data = b64_decode(data.slice(0, -10));
        return xor_decrypt_new(key, data);
    }
};

function stringToUtf8ByteArray(str) {
    var out = [],
        p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        } else if (c < 2048) {
            out[p++] = c >> 6 | 192;
            out[p++] = c & 63 | 128;
        } else if ((c & 0xFC00) == 0xD800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xFC00) == 0xDC00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            out[p++] = c >> 18 | 240;
            out[p++] = c >> 12 & 63 | 128;
            out[p++] = c >> 6 & 63 | 128;
            out[p++] = c & 63 | 128;
        } else {
            out[p++] = c >> 12 | 224;
            out[p++] = c >> 6 & 63 | 128;
            out[p++] = c & 63 | 128;
        }
    }
    return out;
}

function utf8ByteArrayToString(bytes) {
    // array of bytes
    var out = [],
        pos = 0,
        c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++]; // eslint-disable-line
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
        } else {
            var c2 = bytes[pos++]; // eslint-disable-line
            var c3 = bytes[pos++]; // eslint-disable-line
            out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
    }
    return out.join('');
}

var b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function b64_encode(data) {
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        r,
        i = 0,
        enc = "";
    if (!data) {
        return data;
    }
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += b64_table.charAt(h1) + b64_table.charAt(h2) + b64_table.charAt(h3) + b64_table.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}

function b64_decode(data) {
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        result = [];
    if (!data) {
        return data;
    }
    data += "";
    do {
        h1 = b64_table.indexOf(data.charAt(i++));
        h2 = b64_table.indexOf(data.charAt(i++));
        h3 = b64_table.indexOf(data.charAt(i++));
        h4 = b64_table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64) {
                result.push(o3);
            }
        }
    } while (i < data.length);
    return result;
}

function xor_encrypt(key, data) {
    key = stringToUtf8ByteArray(key);
    return stringToUtf8ByteArray(data).map(function (c, i) {
        return c ^ Math.floor(i % key.length);
    });
}

function xor_decrypt(key, data) {
    key = stringToUtf8ByteArray(key);
    return utf8ByteArrayToString(data.map(function (c, i) {
        return c ^ Math.floor(i % key.length);
    }));
}

function xor_encrypt_new(key, data) {
    key = stringToUtf8ByteArray(key);
    return stringToUtf8ByteArray(data).map(function (c, i) {
        return c ^ key[Math.floor(i % key.length)];
    });
}

function xor_decrypt_new(key, data) {
    key = stringToUtf8ByteArray(key);
    return utf8ByteArrayToString(data.map(function (c, i) {
        return c ^ key[Math.floor(i % key.length)];
    }));
}

function randomString() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    var lettersLength = letters.length;

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * lettersLength);
        result += letters.charAt(randomIndex);
    }

    return result;
}

module.exports = XORCipher;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=XOCypher.js.map
        