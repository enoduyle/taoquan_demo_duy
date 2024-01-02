"use strict";
cc._RF.push(module, '1f7b36VXy5HJYc4M3y2DN7M', 'ExtendSlotGameDirector');
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotGameDirector.js

'use strict';

cc.Class({
    extends: require('SlotGameDirector'),

    extendInit: function extendInit() {
        this.listScriptAsync = [];
        this.guiMgr = this.node.mainDirector.guiMgr;
    },
    switchToTrial: function switchToTrial() {
        this.resetAsyncScript();
        this._super();
    },
    fastToResultClick: function fastToResultClick() {
        this._super();
        this.resetAsyncScript();
    },
    skipAllEffects: function skipAllEffects() {
        this.resetAsyncScript();
        this._super();
    },
    canStoreAsyncScript: function canStoreAsyncScript() {
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        var isValid = isFinished === true && !isAutoSpin;
        return isValid;
    },
    storeAsyncScript: function storeAsyncScript(script, data) {
        this.listScriptAsync.push(data);
        this.executeNextScript(script);
    },
    resetAsyncScript: function resetAsyncScript() {
        if (!this.listScriptAsync || !this.listScriptAsync.length) return;
        this.isResetAsyncScript = true;
        while (this.listScriptAsync.length > 0) {
            var command = this.listScriptAsync.shift();
            if (command) {
                var callback = command.callback,
                    isSkippable = command.isSkippable,
                    name = command.name;

                if (!isSkippable) {
                    if (name) cc.log(this.name + ' run resetAsyncScript: ', name);
                    callback && callback(true);
                }
            }
        }
        this.isResetAsyncScript = false;
    },
    _runAsyncScript: function _runAsyncScript(script) {
        this.executeNextScript(script);
        this.runAsyncScript();
    },
    runAsyncScript: function runAsyncScript() {
        if (this.isResetAsyncScript) return;
        var command = this.listScriptAsync.shift();
        if (command) {
            var callback = command.callback,
                name = command.name;

            if (name) cc.log(this.name + ' run AsyncScript: ', name);
            callback && callback();
        }
    },
    _showResult: function _showResult(script) {
        this.hasPayline = true;
        this._super(script);
    },
    _blinkAllPaylines: function _blinkAllPaylines(script) {
        var _this = this;

        if (this.canStoreAsyncScript()) {
            var callback = function callback() {
                _this.table.emit("BLINK_ALL_NORMAL_PAYLINES", _this.runAsyncScript.bind(_this));
            };
            this.storeAsyncScript(script, { callback: callback, name: "_blinkAllPaylines", isSkippable: true });
        } else {
            this.table.emit("BLINK_ALL_NORMAL_PAYLINES", this.executeNextScript.bind(this, script));
        }
    },
    _showNormalPayline: function _showNormalPayline(script) {
        var _this2 = this;

        if (this.canStoreAsyncScript()) {
            var callback = function callback() {
                _this2.node.mainDirector.onIngameEvent("SHOW_NORMAL_PAYLINE");
                _this2.table.emit("SHOW_ALL_NORMAL_PAYLINES");
                _this2.runAsyncScript();
                _this2.node.mainDirector.onIngameEvent("ON_SHOW_NORMAL_PAYLINE");
            };
            this.storeAsyncScript(script, { callback: callback, name: "_showNormalPayline", isSkippable: true });
        } else {
            this.table.emit("SHOW_ALL_NORMAL_PAYLINES");
            this.executeNextScript(script);
        }
    },
    _updateWinningAmount: function _updateWinningAmount(script, _ref) {
        var _this3 = this;

        var winAmount = _ref.winAmount,
            time = _ref.time;

        if (this.canStoreAsyncScript()) {
            var callback = function callback() {
                _this3.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
                _this3.runAsyncScript();
            };
            this.storeAsyncScript(script, { callback: callback, name: "_updateWinningAmount", isSkippable: false });
        } else {
            this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
            this.executeNextScript(script);
        }
    },
    _showCutscene: function _showCutscene(script, _ref2) {
        var _this4 = this;

        var name = _ref2.name,
            content = _ref2.content;

        if (this.canStoreAsyncScript() && name !== 'DialogMessage') {
            var callback = function callback() {
                if (_this4.node.mainDirector) {
                    _this4.node.mainDirector.showCutscene(name, content, function () {
                        _this4.runAsyncScript();
                    });
                }
            };
            this.storeAsyncScript(script, { callback: callback, name: "_showCutscene", isSkippable: true });
        } else {
            this._super(script, { name: name, content: content });
        }
    }
});

cc._RF.pop();