"use strict";
cc._RF.push(module, 'b67709oBRZN5qQBonDqgXgg', 'WinAmountv2');
// cc-common/cc-slotbase-v2/gui/WinAmountv2.js

"use strict";

var _require = require("utils"),
    formatMoney = _require.formatMoney;

var lodash = require('lodash');
cc.Class({
    extends: require("WinAmount"),

    properties: {
        labelWinAmount: cc.Label,
        _currentValue: 0,
        currentValue: {
            get: function get() {
                return this._currentValue;
            },
            set: function set(value) {
                if (this._currentValue !== value) {
                    this._currentValue = value;
                    this._updateLabelWinAmount();
                }
            },

            visible: false
        }
    },

    onLoad: function onLoad() {
        this._super();
        this.node.on("FAST_UPDATE_WIN_AMOUNT", this.fastUpdateWinAmount, this);
        this.node.on("RESET_NUMBER", this.clearWinAmount, this);
        this.node.on("FADE_OUT_NUMBER", this.fadeOutNumber, this);
        this.node.getCurrentWinValue = this.getCurrentWinValue.bind(this);
        this.gameDirector = this.node.mainDirector ? this.node.mainDirector.director : null;
    },
    getCurrentWinValue: function getCurrentWinValue() {
        return this._winValue;
    },
    updateWinAmount: function updateWinAmount(_ref, callback) {
        var value = _ref.value,
            time = _ref.time,
            isLastest = _ref.isLastest;

        if (isLastest && this.node.gSlotDataStore) {
            value = this.node.gSlotDataStore.playSession.winAmount;
        }
        if (value < this._currentValue || value < this._winValue) {
            cc.log("Logic fail somewhere, script clear winamount have not ran yet", { current: this._currentValue, endValue: this._winValue, fastUpdateValue: value });
            this.clearWinAmount();
        }
        this._callBackOnComplete = callback;
        this._winValue = value;
        time = this._currentValue === value ? 0 : time;
        this._tweenWinAmount(value, time);
        cc.log("run updateWinAmount", { value: value, time: time, isLastest: isLastest });
    },
    fastUpdateWinAmount: function fastUpdateWinAmount(_ref2) {
        var value = _ref2.value,
            time = _ref2.time;

        if (!value) value = this._winValue;
        if (value < this._currentValue || value < this._winValue) {
            cc.error("Logic fail: Could not speed up to the smaller value", { current: this._currentValue, endValue: this._winValue, fastUpdateValue: value });
            return;
        }

        this._tweenWinAmount(value, time);
        cc.log("run fastUpdateWinAmount", { value: value, time: time });
    },
    _tweenWinAmount: function _tweenWinAmount(value, time) {
        var _this = this;

        this._resetLabel();
        if (time === 0) {
            this._tweenValue && this._tweenValue.stop();
            this._tweenValue = null;
            this.currentValue = value;
            this._callBackOnComplete && this._callBackOnComplete();
            this._callBackOnComplete = null;
            this._updateWallet();
            cc.log("show win Amount instantly", { value: value, time: time });
            return;
        }

        this._tweenValue && this._tweenValue.stop();
        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.isUpdateWinAmount = true;
        }
        this._tweenValue = cc.tween(this).to(time / 1000, { currentValue: value }, { easing: 'sineInOut' }).call(function () {
            _this._updateWallet();
            _this._callBackOnComplete && _this._callBackOnComplete();
            _this._callBackOnComplete = null;
            _this._tweenValue = null;
        });
        this._tweenValue.start();
        cc.log("_tweenWinAmount", { value: value, time: time });
    },
    clearWinAmount: function clearWinAmount() {
        this._resetLabel();
        this.currentValue = 0;
        this._winValue = 0;
    },
    _updateLabelWinAmount: function _updateLabelWinAmount() {
        this.labelWinAmount.string = this.currentValue > 0 ? formatMoney(this._currentValue) : "";
    },
    _updateWallet: function _updateWallet() {
        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.isUpdateWinAmount = false;
        }
        if (this.gameDirector) {
            var wallet = this.gameDirector.gameStateManager.getCurrentWallet();
            if (wallet && lodash.isNumber(wallet) && !lodash.isNaN(wallet)) {
                this.node.gSlotDataStore.slotBetDataStore.updateWallet(wallet);
            }
            if (this.gameDirector.trialMode) {
                this.gameDirector.updateTrialWallet();
            } else {
                this.gameDirector.updateWallet();
            }
        }
    },
    fadeOutNumber: function fadeOutNumber() {
        var _this2 = this;

        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (!this.labelWinAmount) return;
        this.node.isFading = true;
        if (this._tweenValue) {
            this._tweenValue.stop();
            this._tweenValue = null;
            this.currentValue = this._winValue;
        }
        if (this._callBackOnComplete) {
            this._callBackOnComplete();
            this._callBackOnComplete = null;
        }
        if (this.node.gSlotDataStore) {
            this.node.gSlotDataStore.isUpdateWinAmount = false;
        }
        this.labelWinAmount.node.stopAllActions();
        this.labelWinAmount.node.runAction(cc.sequence(cc.fadeOut(time), cc.callFunc(function () {
            _this2.node.isFading = false;
            _this2.clearWinAmount();
        })));
    },
    _resetLabel: function _resetLabel() {
        this.labelWinAmount.node.stopAllActions();
        this.labelWinAmount.node.opacity = 255;
        this.node.isFading = false;
    },
    onDestroy: function onDestroy() {
        this._tweenValue && this._tweenValue.stop();
    }
});

cc._RF.pop();