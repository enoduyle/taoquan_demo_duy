"use strict";
cc._RF.push(module, '2ee0b/L+DVCx4dyS8KOwC6r', 'TrialWallet');
// cc-common/cc-slotbase-v2/trial/TrialWallet.js

"use strict";

var _require = require("utils"),
    formatWalletMoney = _require.formatWalletMoney,
    formatMoney = _require.formatMoney,
    floatUtils = _require.floatUtils;

cc.Class({
    extends: cc.Component,
    properties: {
        isFormatWallet: true,
        _walletValue: 0,
        walletValue: {
            get: function get() {
                return this._walletValue;
            },
            set: function set(value) {
                this._walletValue = value;
                if (this.getComponent(cc.Label)) {
                    this.getComponent(cc.Label).string = this.isFormatWallet ? formatWalletMoney(Number(this._walletValue)) : formatMoney(Number(this._walletValue));
                }
            },
            visible: false
        },
        timeTweenWallet: 0.3
    },
    onLoad: function onLoad() {
        this.isInit = false;
        this.node.controller = this;
    },
    setDefaultValue: function setDefaultValue(defaultWallet, defaultBet) {
        this.defaultWallet = window._trialWallet || defaultWallet;
        this.defaultBet = defaultBet;
    },
    resetTrialValue: function resetTrialValue() {
        this.walletValue = this.defaultWallet;
        this.lastValue = Number(this.walletValue);
        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.trialWallet = this.lastValue;
        }
    },
    hide: function hide() {
        this.node.active = false;
    },
    _tweenCoin: function _tweenCoin(coinValue) {
        this.tweenCoin && this.tweenCoin.stop();
        this.tweenCoin = cc.tween(this).to(this.timeTweenWallet, { walletValue: coinValue });
        this.tweenCoin.start();
        cc.log("%c TrialMoney Update: ", "color: red;", formatMoney(coinValue));
    },
    updateBet: function updateBet(betId) {
        this.defaultBet = betId;
    },
    updateWalletOnTrialSpinClick: function updateWalletOnTrialSpinClick() {
        this.lastValue = floatUtils.minus(this.lastValue, this.defaultBet);

        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.trialWallet = this.lastValue;
        }
        cc.log("%cTrial Wallet change on Spin: - ", "color:red;", +this.defaultBet, "=", this.lastValue);
        this._tweenCoin(this.lastValue);
    },
    updateTrialWallet: function updateTrialWallet(winAmount) {
        var isUpdateWinAmount = this.node.gSlotDataStore ? this.node.gSlotDataStore.isUpdateWinAmount : false;
        winAmount = winAmount || 0;
        this.lastValue = floatUtils.plus(this.lastValue, winAmount);
        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.trialWallet = this.lastValue;
        }
        cc.log("%cTrial Wallet change: + ", "color:red;", winAmount, "=", this.lastValue);
        if (!isUpdateWinAmount) {
            this._tweenCoin(this.lastValue);
        }
    },
    onDisable: function onDisable() {
        if (this.tweenCoin) {
            this.tweenCoin.stop();
        }
    }
});

cc._RF.pop();