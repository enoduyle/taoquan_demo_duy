(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/WalletTrial.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '594e7Qu+qNOubAcDh5fwdEi', 'WalletTrial', __filename);
// cc-common/cc-share-v1/common/WalletTrial.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Label,
        animateNumber: require("animateNumberLabel")
    },

    initValue: function initValue(value) {
        this.currentValue = value;
        this.animateNumber.onUpdateWallet(this.currentValue, 0);
    },
    addValue: function addValue(value) {
        if (value) {
            this.currentValue += value;
            this.animateNumber.onUpdateWallet(this.currentValue, 100);
        }
    }
});

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
        //# sourceMappingURL=WalletTrial.js.map
        