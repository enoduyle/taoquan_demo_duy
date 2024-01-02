(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/Wallet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '858deW8+iFA8ZFi01uixalq', 'Wallet', __filename);
// cc-common/cc-slotbase-v2/gui/Wallet.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        isFormatWallet: true
    },
    onLoad: function onLoad() {
        this.node.walletController = this;
        this.isShowMoney = false;
        this.node.on("UPDATE_WALLET", this.callbackUpdateWallet, this);
        this.node.callbackUpdateWallet = this.callbackUpdateWallet.bind(this);
    },
    callbackUpdateWallet: function callbackUpdateWallet(data) {
        var amount = data.amount;

        this.node.gSlotDataStore.slotBetDataStore.updateWallet(amount);
        if (!this.isShowMoney) {
            this.isShowMoney = true;
            this.updateMoneyWallet();
        }
    },
    updateMoneyWallet: function updateMoneyWallet() {
        var wallet = this.node.gSlotDataStore.slotBetDataStore.data.wallet;

        if (this.isFormatWallet) {
            this.node.emit("UPDATE_WALLET_STYLE", { value: wallet });
        } else {
            this.node.emit("UPDATE_ANIMATE_STYLE", { value: wallet });
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
        //# sourceMappingURL=Wallet.js.map
        