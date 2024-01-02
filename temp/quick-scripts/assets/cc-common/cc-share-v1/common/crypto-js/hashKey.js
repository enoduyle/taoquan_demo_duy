(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/crypto-js/hashKey.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '797a9cXHgBFWpfxNrLlQGZ6', 'hashKey', __filename);
// cc-common/cc-share-v1/common/crypto-js/hashKey.js

'use strict';

/* eslint-disable no-unused-vars */
var CryptoJS = require('./crypto-core');
var md5 = require('./md5');
var sha1 = require('./sha1');
var sha256 = require('./sha256');
var sha224 = require('./sha224');
var x64 = require("./x64-core");
var sha512 = require('./sha512');

var hash = function hash() {
    var cipherMethodKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!cipherMethodKey) {
        return '';
    }
    var upperCaseCipherMethodKey = cipherMethodKey.trim().toUpperCase();
    if (upperCaseCipherMethodKey.length < 3) {
        return '';
    }
    return CryptoJS[upperCaseCipherMethodKey](message).toString();
};

module.exports = {
    hash: hash
};

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
        //# sourceMappingURL=hashKey.js.map
        