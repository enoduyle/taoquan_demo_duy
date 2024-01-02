"use strict";
cc._RF.push(module, '594e7Qu+qNOubAcDh5fwdEi', 'WalletTrial');
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