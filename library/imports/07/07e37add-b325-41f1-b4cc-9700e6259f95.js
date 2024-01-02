"use strict";
cc._RF.push(module, '07e37rdsyVB8bTMlwDmJZ+V', 'animateNumberLabel');
// cc-common/cc-share-v1/common/viewComponent/animateNumberLabel.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney,
    formatWalletMoney = _require.formatWalletMoney,
    getUtilConfig = _require.getUtilConfig,
    formatCoin = _require.formatCoin;

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.onUpdateValue = this.onUpdateValue.bind(this);
        this.node.onUpdateWallet = this.onUpdateWallet.bind(this);
        this.node.onUpdateWinValue = this.onUpdateWinValue.bind(this);
        this.node.onUpdateCredit = this.onUpdateCredit.bind(this);
        this.node.setDecimalCount = this.setDecimalCount.bind(this);
        this.node.resetValue = this.resetValue.bind(this);
        this.currentValue = 0;
        this.decimalCount = null;
    },
    setDecimalCount: function setDecimalCount() {
        var decimalCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.decimalCount = decimalCount;
    },
    resetValue: function resetValue() {
        if (!this.node) return;
        clearInterval(this.timer);
        var label = this.node.getComponent(cc.Label);
        label.string = '';
        this.currentValue = 0;

        var utilConfig = getUtilConfig && getUtilConfig();
        if (utilConfig && utilConfig.CURRENCY_CONFIG && label["_tweenMoney"]) {
            label["_tweenMoney"].stop();
        }
    },
    tweenMoneyByCurrency: function tweenMoneyByCurrency(label, duration, endValue) {
        var _this = this;

        if (label["_tweenMoney"]) label["_tweenMoney"].stop(); // stop if on tween;

        var currentVal = this.currentValue || 0;
        this.currentValue = currentVal;
        var _target = { value: currentVal };
        var tweenMoney = cc.tween(_target).to(duration, { value: endValue }, {
            progress: function progress(start, end, current, ratio) {
                _this.currentValue = current;
                label.string = formatMoney(Number(current), _this.decimalCount);
                return start + (end - start) * ratio;
            }
        }).call(function () {
            _this.currentValue = endValue;
            label.string = formatMoney(endValue, _this.decimalCount);
            label["_tweenMoney"] = null;
        }).start();
        label["_tweenMoney"] = tweenMoney;
        return tweenMoney;
    },
    onUpdateValue: function onUpdateValue() {
        var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var animationDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
        var acceptRunDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var _this2 = this;

        var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var suffixes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

        clearInterval(this.timer);
        if (!this.node) return;

        var utilConfig = getUtilConfig && getUtilConfig();
        if (utilConfig && utilConfig.CURRENCY_CONFIG && end >= 0) {
            var _label = this.node.getComponent(cc.Label);
            var _start = this.currentValue ? this.currentValue : 0;
            if (!acceptRunDown && end < _start) {
                this.currentValue = end;
                _label.string = formatMoney(this.currentValue, this.decimalCount);
                return;
            }
            this._tweenMoney = this.tweenMoneyByCurrency(_label, animationDuration / 1000, end);
            return;
        } else {
            end = parseInt(end);
        }
        var label = this.node.getComponent(cc.Label);
        var start = this.currentValue ? this.currentValue : 0;

        if (!acceptRunDown && end < start) {
            this.currentValue = end;
            label.string = prefix + formatMoney(this.currentValue) + suffixes;
            return;
        }

        // assumes integer values for start and end
        var range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        var minTimer = 50;
        // calc step time to show all interediate values
        var stepTime = Math.abs(Math.floor(animationDuration / range));
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        // get current time and calculate desired end time
        var startTime = new Date().getTime();
        var endTime = startTime + animationDuration;
        this.timer;

        var run = function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / animationDuration, 0);
            var value = Math.round(end - remaining * range);
            _this2.currentValue = value;
            label.string = prefix + formatMoney(value) + suffixes;
            if (value == end) {
                clearInterval(_this2.timer);
            }
        };
        this.timer = setInterval(run, stepTime);
        run();
    },
    onUpdateWinValue: function onUpdateWinValue() {
        var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var animationDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
        var callbackWin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var isSkip = arguments[3];
        var millisecond = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
        var timeUpdate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;

        var _this3 = this;

        var superWinRate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 50;
        var megaWinRate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 30;

        clearInterval(this.timer);
        if (!this.node) return;
        var label = this.node.getComponent(cc.Label);
        var timeRate = millisecond / timeUpdate;
        this.currentValue = this.currentValue || 0;
        var valuePerTimes = Math.round(end / (animationDuration / millisecond * timeRate));
        // a = ((s - v0 * t) * 2) / t^2
        var valueAccelerator = (end - valuePerTimes * timeUpdate) * 2 / Math.pow(timeUpdate, 2);
        var run = function run() {
            _this3.currentValue = Math.round(_this3.currentValue <= end / 2 ? _this3.currentValue + valuePerTimes + valueAccelerator : _this3.currentValue + valuePerTimes - valueAccelerator);
            var value = _this3.currentValue;
            label.string = formatMoney(value >= end ? end : value);

            var isSuper = end >= callbackWin.currentBetData * superWinRate;
            var isMega = end >= callbackWin.currentBetData * megaWinRate;
            var finalWin = isSuper ? 'super' : isMega ? 'mega' : 'big';

            var per = value / end;
            per = per > 1 ? 1 : per;
            callbackWin.enterFrame(per, finalWin);

            if (value >= callbackWin.currentBetData * superWinRate && !isSkip) {
                callbackWin.runSuperWin();
            } else if (value >= callbackWin.currentBetData * megaWinRate && !isSkip) {
                callbackWin.runMegaWin();
            } else if (value + callbackWin.currentBetData * 2 == end && !isSkip) {
                callbackWin.runFinishBigWin();
            }
            if (value >= end) {
                callbackWin.runFinishWin();
                clearInterval(_this3.timer);
            }
        };
        this.timer = setInterval(run, timeUpdate);
        run();
    },
    onUpdateWallet: function onUpdateWallet(end) {
        var _this4 = this;

        var animationDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

        clearInterval(this.timer);
        if (!this.node) return;

        var utilConfig = getUtilConfig && getUtilConfig();
        if (utilConfig && utilConfig.CURRENCY_CONFIG) {
            var _label2 = this.node.getComponent(cc.Label);
            this._tweenWallet = this.tweenWalletByCurrency(_label2, animationDuration / 1000, end);
            return;
        } else {
            end = parseInt(end);
        }

        var label = this.node.getComponent(cc.Label);
        var start = this.currentValue ? this.currentValue : 0;
        // assumes integer values for start and end
        var range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        var minTimer = 50;
        // calc step time to show all interediate values
        var stepTime = Math.abs(Math.floor(animationDuration / range));
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        // get current time and calculate desired end time
        var startTime = new Date().getTime();
        var endTime = startTime + animationDuration;
        this.timer;

        var run = function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / animationDuration, 0);
            var value = Math.round(end - remaining * range);
            _this4.currentValue = value;
            label.string = formatWalletMoney(value);
            if (value == end) {
                clearInterval(_this4.timer);
            }
        };
        this.timer = setInterval(run, stepTime);
        run();
    },
    tweenWalletByCurrency: function tweenWalletByCurrency(label, duration, endValue) {
        var _this5 = this;

        if (label["_tweenMoney"]) label["_tweenMoney"].stop();
        var currentVal = this.currentValue || 0;
        this.currentValue = currentVal;
        var _target = { value: currentVal };
        var tweenMoney = cc.tween(_target).to(duration, { value: endValue }, {
            progress: function progress(start, end, current, ratio) {
                _this5.currentValue = Number(current);
                label.string = formatWalletMoney(Number(_this5.currentValue));
                return start + (end - start) * ratio;
            }
        }).call(function () {
            _this5.currentValue = endValue;
            label.string = formatWalletMoney(endValue, _this5.decimalCount);
            label["_tweenMoney"] = null;
        }).start();
        label["_tweenMoney"] = tweenMoney;
        return tweenMoney;
    },
    onDestroy: function onDestroy() {
        this._tweenMoney && this._tweenMoney.stop();
        this._tweenWallet && this._tweenWallet.stop();
        this._tweenCredit && this._tweenCredit.stop();
        clearInterval(this.timer);
    },
    onUpdateCredit: function onUpdateCredit() {
        var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var animationDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
        var acceptRunDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var suffixes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

        if (!this.node) return;
        var utilConfig = getUtilConfig && getUtilConfig();
        if (utilConfig && utilConfig.CURRENCY_CONFIG && end >= 0) {
            var label = this.node.getComponent(cc.Label);
            var start = this.currentValue ? this.currentValue : 0;
            if (!acceptRunDown && end < start) {
                this.currentValue = end;
                label.string = formatCoin(this.currentValue);
                return;
            }
            this._tweenCredit = this.tweenCredit(label, animationDuration / 1000, end);
            return;
        } else {
            this.onUpdateValue(end, animationDuration, acceptRunDown, prefix, suffixes);
        }
    },
    tweenCredit: function tweenCredit(label, duration, endValue) {
        var _this6 = this;

        if (label["_tweenMoney"]) label["_tweenMoney"].stop(); // stop if on tween;

        var currentVal = this.currentValue || 0;
        this.currentValue = currentVal;
        var _target = { value: currentVal };
        var tweenMoney = cc.tween(_target).to(duration, { value: endValue }, {
            progress: function progress(start, end, current, ratio) {
                label.string = formatCoin(Number(current));
                return start + (end - start) * ratio;
            }
        }).call(function () {
            _this6.currentValue = endValue;
            label.string = formatCoin(endValue);
            label["_tweenMoney"] = null;
        }).start();
        label["_tweenMoney"] = tweenMoney;
        return tweenMoney;
    }
});

cc._RF.pop();