"use strict";
cc._RF.push(module, '858deW8+iFA8ZFi01uixalq', 'Wallet');
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