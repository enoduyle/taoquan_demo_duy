(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/crypto-js/sha224.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '23c20t95NdGa67T9fnwb0mD', 'sha224', __filename);
// cc-common/cc-share-v1/common/crypto-js/sha224.js

'use strict';

var CryptoJS = require('./crypto-core');

// Shortcuts
var C = CryptoJS;
var C_lib = C.lib;
var WordArray = C_lib.WordArray;
var C_algo = C.algo;
var SHA256 = C_algo.SHA256;

/**
 * SHA-224 hash algorithm.
 */
var SHA224 = C_algo.SHA224 = SHA256.extend({
    _doReset: function _doReset() {
        this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
    },

    _doFinalize: function _doFinalize() {
        var hash = SHA256._doFinalize.call(this);

        hash.sigBytes -= 4;

        return hash;
    }
});

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA224('message');
 *     var hash = CryptoJS.SHA224(wordArray);
 */
C.SHA224 = SHA256._createHelper(SHA224);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA224(message, key);
 */
C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
module.exports = SHA224;

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
        //# sourceMappingURL=sha224.js.map
        