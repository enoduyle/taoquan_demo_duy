(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/floatUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bbc34bI4NlLYZDlgy0UBOTI', 'floatUtils', __filename);
// cc-common/cc-share-v1/common/floatUtils.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Big = require("big");

function _verifyNumbers() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.forEach(function (num, index) {
        if ((typeof num === "undefined" ? "undefined" : _typeof(num)) === "object" || num === void 0 || isNaN(+num)) {
            cc.warn("invalid number: " + index, num);
        }
    });
}

function plus(a, b) {
    _verifyNumbers(a, b);
    return Big(a || 0).plus(b || 0).toNumber();
}
function minus(a, b) {
    _verifyNumbers(a, b);
    return Big(a || 0).minus(b || 0).toNumber();
}
function mul(a, b) {
    _verifyNumbers(a, b);
    return Big(a || 0).times(b || 0).toNumber();
}
function div(a, b) {
    _verifyNumbers(a, b);
    return Big(a || 0).div(b || 1).toNumber();
}
function sum() {
    for (var _len2 = arguments.length, numbers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        numbers[_key2] = arguments[_key2];
    }

    _verifyNumbers.apply(undefined, numbers);
    var result = Big(0);
    numbers.forEach(function (num) {
        result = result.plus(num);
    });
    return result.toNumber();
}
function product() {
    for (var _len3 = arguments.length, numbers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        numbers[_key3] = arguments[_key3];
    }

    _verifyNumbers.apply(undefined, numbers);
    var result = Big(1);
    numbers.forEach(function (num) {
        result = result.times(num);
    });
    return result.toNumber();
}
function isEqual(a, b) {
    _verifyNumbers(a, b);
    return Math.abs(a - b) < 1e-12;
}

module.exports = {
    plus: plus, minus: minus, mul: mul, div: div, sum: sum, product: product, isEqual: isEqual
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
        //# sourceMappingURL=floatUtils.js.map
        