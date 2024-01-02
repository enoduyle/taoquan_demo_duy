(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/gameMode/NormalGameDirector9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'da66e9jcGpJbbqapz2UEcS6', 'NormalGameDirector9983', __filename);
// cc-taoquan-9983/scripts/gameMode/NormalGameDirector9983.js

'use strict';

var BaseSlotGameDirector = require('SlotGameDirector');
cc.Class({
    extends: BaseSlotGameDirector,
    properties: {
        wildMultiplier: cc.Node
    },

    extendInit: function extendInit() {
        this.listExcuteNextScriptAsync = [];
    },
    onSpacePressed: function onSpacePressed() {
        if (this.node.mainDirector.introGame.active) return;
        if (!this.node.mainDirector.isDisplayDialog() && !this.node.mainDirector.isDisplayCutscene()) this.spinClick();
    },
    forceStopSpinning: function forceStopSpinning() {
        this.table.emit("HIDE_SUB_SYMBOL_PAYLINE");
        this._super();
    },
    _spinClick: function _spinClick(script) {
        this._super(script);
        this.wildMultiplier.emit('HIDE');
    },
    _showSoundWinAnimation: function _showSoundWinAnimation(script, data) {
        var currentBetData = data.currentBetData,
            winAmount = data.winAmount;
        var gameSpeed = this.node.gSlotDataStore.gameSpeed;

        var isFTR = gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        if (data && this.node.soundPlayer && !isFTR) {
            if (winAmount >= currentBetData * 5 && winAmount < currentBetData * 10) {
                this.node.soundPlayer.playSFXWinLine(3);
            } else if (winAmount >= currentBetData && winAmount < currentBetData * 5) {
                this.node.soundPlayer.playSFXWinLine(2);
            } else if (winAmount > 0 && winAmount < currentBetData) {
                this.node.soundPlayer.playSFXWinLine(1);
            }
        }
        this.executeNextScript(script);
    },
    _gameRestart: function _gameRestart(script) {
        this.node.isFastToResult = 0;
        this._super(script);
    },
    _showScatterPayLine: function _showScatterPayLine(script) {
        // if (this.node.soundPlayer) this.node.soundPlayer.playSFXScatterWin();
        this._super(script);
    },
    _playSFXLenChau: function _playSFXLenChau(script) {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXLenChau();
        this.executeNextScript(script);
    },
    _playSFXLenChau_2: function _playSFXLenChau_2(script) {
        this.executeNextScript(script);
    },
    _playSFXCloud1: function _playSFXCloud1(script) {
        this.node.soundPlayer.stopAllAudio();
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXCloud1();
        this.executeNextScript(script);
    },
    _playSFXCloud1_2: function _playSFXCloud1_2(script) {
        this.executeNextScript(script);
    },
    _playSFXCloud2: function _playSFXCloud2(script) {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXCloud2();
        this.executeNextScript(script);
    },
    _playSFXCloud2_2: function _playSFXCloud2_2(script) {
        this.executeNextScript(script);
    },
    _resumeGameMode: function _resumeGameMode(script, _ref) {
        var _this = this;

        var name = _ref.name,
            data = _ref.data;

        if (this.node.mainDirector) {
            this.node.mainDirector.resumeGameMode({ name: name, data: data }, function () {
                //if (this.node.soundPlayer) this.node.soundPlayer.stopAllAudio();
                if (_this.node.soundPlayer) _this.node.soundPlayer.playMainBGM();
                _this.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to resume game mode');
            this.executeNextScript(script);
        }
        if (!this._autoSpin) {
            this.buttons.emit('SPIN_SHOW');
            this.buttons.emit('SPIN_ENABLE');
            this.buttons.emit('FAST_TO_RESULT_HIDE');
            this.buttons.emit('STOP_AUTO_SPIN_HIDE', true);
        }
    },
    _newGameMode: function _newGameMode(script, _ref2) {
        var _this2 = this;

        var name = _ref2.name,
            data = _ref2.data;

        if (this.node.mainDirector) {
            this.node.soundPlayer.stopAllAudio();
            if (this.node.soundPlayer) this.node.soundPlayer.playSFXCloud1();
            this.node.mainDirector.showCutscene('IntroFreeGame', {}, function () {
                _this2.node.mainDirector.newGameMode({ name: name, data: data }, function () {
                    _this2.executeNextScript(script);
                });
            });
        } else {
            cc.error('There is no main Director to new game mode');
            this.executeNextScript(script);
        }
    },
    _showAllPayLine: function _showAllPayLine(script) {
        this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {});
        this.executeNextScript(script);
    },
    _showAllPayLineSync: function _showAllPayLineSync(script) {
        var _this3 = this;

        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this3.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {
                    _this3.runAsyncScript();
                });
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_showAllPayLineSync" });
            this.executeNextScript(script);
        } else {
            this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {
                _this3.executeNextScript(script);
            });
        }
    },
    _showEachPayLine: function _showEachPayLine(script) {
        var _this4 = this;

        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this4.table.emit("SHOW_ALL_NORMAL_PAYLINES");
                _this4.runAsyncScript();
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_showEachPayLine" });
            this.executeNextScript(script);
        } else {
            this.table.emit("SHOW_ALL_NORMAL_PAYLINES");
            this.executeNextScript(script);
        }
    },
    _showAllPayLine_2: function _showAllPayLine_2(script) {
        this.executeNextScript(script);
    },
    _showAllPayLineSync_2: function _showAllPayLineSync_2(script) {
        this.executeNextScript(script);
    },


    // _showEachPayLine_2(script) {
    //     this.table.emit("HIDE_PAYLINES");
    //     this.executeNextScript(script);
    // },

    _showFreeGameOption: function _showFreeGameOption(script, _ref3) {
        var _this5 = this;

        var name = _ref3.name,
            content = _ref3.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this5.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _hideCutscene: function _hideCutscene(script, _ref4) {
        var _this6 = this;

        var name = _ref4.name;

        if (this.node.mainDirector) {
            this.node.mainDirector.hideCutscene(name, function () {
                _this6.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _showSubSymbolPayLine: function _showSubSymbolPayLine(script, data) {
        var _this7 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_SUB_SYMBOL_PAYLINE", data, function () {
            _this7.executeNextScript(script);
        });
    },
    _hideSubSymbolPayLine: function _hideSubSymbolPayLine(script) {
        this.table.emit("HIDE_SUB_SYMBOL_PAYLINE");
        this.executeNextScript(script);
    },
    _showSubSymbolPayLine_2: function _showSubSymbolPayLine_2(script) {
        this.executeNextScript(script);
    },
    _updateValueJP: function _updateValueJP(script, data) {
        this.node.mainDirector.updateValueJackpot(data.isGrand, data.value);
        this.executeNextScript(script);
    },
    _updateWinningAmount: function _updateWinningAmount(script, _ref5) {
        var _this8 = this;

        var winAmount = _ref5.winAmount,
            time = _ref5.time;
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this8.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
                _this8.runAsyncScript();
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: false, name: "_updateWinningAmount" });
            this.executeNextScript(script);
        } else {
            this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
            this.executeNextScript(script);
        }
    },
    _showEachPayLineSync: function _showEachPayLineSync(script) {
        var _this9 = this;

        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this9.table.emit("SHOW_ALL_NORMAL_PAYLINES", function () {
                    _this9.runAsyncScript();
                });
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_showEachPayLineSync" });
            this.executeNextScript(script);
        } else {
            this.table.emit("SHOW_ALL_NORMAL_PAYLINES", function () {
                _this9.executeNextScript(script);
            });
        }
    },

    // _showEachPayLineSync_2(script) {
    //     this.table.emit("HIDE_PAYLINES");
    //     this.executeNextScript(script);
    // },

    autoSpinClick: function autoSpinClick() {
        if (!this.node || !this.node.director || !this.node.director.fsm || !this.node.director.fsm.can('actionTrigger') || !this.node.mainDirector.readyToPlay) return;
        this.buttons.emit("AUTO_SPIN_CLICK");
    },
    multiSpin4Click: function multiSpin4Click() {
        this._super();
        this.node.mainDirector.gui.emit('BET_DISABLE');
    },
    _clearWinAmount: function _clearWinAmount(script) {
        this.winAmount.emit("FADE_OUT_NUMBER", this.node.gSlotDataStore.modeTurbo ? 0.3 : 0.6);
        this.executeNextScript(script);
    },
    fastToResultClick: function fastToResultClick() {
        this.skipAllEffects();
        this._super();
    },
    spinClick: function spinClick() {
        if (this._canFastUpdateWinAmount && this._winValue > 0) {
            this._callbackUpdateWinAmount = null;
            this._canFastUpdateWinAmount = false;
            this.winAmount.emit("FAST_UPDATE_WIN_AMOUNT", { value: this._winValue, time: 0 });
        }
        this.skipAllEffects();
        this._super();
    },
    runAsyncScript: function runAsyncScript() {
        if (this.isResetAsyncScript) return;
        var command = this.listExcuteNextScriptAsync.shift();
        if (command) {
            var callback = command.callback,
                name = command.name;

            if (name) cc.log(this.name + ' run AsyncScript: ', name);
            callback && callback();
        }
    },
    resetAsyncScript: function resetAsyncScript() {
        if (!this.listExcuteNextScriptAsync) return;
        this.isResetAsyncScript = true;
        while (this.listExcuteNextScriptAsync.length > 0) {
            var command = this.listExcuteNextScriptAsync.shift();
            if (command) {
                var callback = command.callback,
                    isSkippable = command.isSkippable,
                    name = command.name;

                if (!isSkippable) {
                    if (name) cc.log(this.name + ' run resetAsyncScript: ', name);
                    callback && callback();
                }
            }
        }
        this.isResetAsyncScript = false;
    },
    _runAsyncScript: function _runAsyncScript(script) {
        this.executeNextScript(script);
        this.runAsyncScript();
    },
    skipAllEffects: function skipAllEffects() {
        this.resetAsyncScript();
        this.wildMultiplier.emit('SHOW_LAST_RESULT');
        this._super();
        if (this.delayTimeCallback) {
            this.unschedule(this.delayTimeCallback);
            this.delayTimeCallback();
        }
    },
    _showWinEffect: function _showWinEffect(script, _ref6) {
        var _this10 = this;

        var name = _ref6.name,
            content = _ref6.content;
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                if (_this10.node.mainDirector) {
                    _this10.node.mainDirector.showCutscene(name, content, function () {
                        _this10.runAsyncScript();
                    });
                } else {
                    cc.error('There is no main Director to play cutscenes');
                    _this10.runAsyncScript();
                }
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_showWinEffect" });
            this.executeNextScript(script);
        } else {
            if (this.node.mainDirector) {
                this.node.mainDirector.showCutscene(name, content, function () {
                    _this10.executeNextScript(script);
                });
            } else {
                cc.error('There is no main Director to play cutscenes');
                this.executeNextScript(script);
            }
        }
    },
    _showWinEffect_2: function _showWinEffect_2(script) {
        this.executeNextScript(script);
    },
    _animMultiplierWild: function _animMultiplierWild(script) {
        this.executeNextScript(script);
    },
    _updateWinningAmountSync: function _updateWinningAmountSync(script, _ref7) {
        var _this11 = this;

        var winAmount = _ref7.winAmount,
            time = _ref7.time;

        this._canFastUpdateWinAmount = true;
        this._winValue = winAmount;
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this11.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time }, function () {
                    _this11._canFastUpdateWinAmount = false;
                    _this11._winValue = 0;
                });
                _this11.runAsyncScript();
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: false, name: "_updateWinningAmountSync" });
            this.executeNextScript(script);
        } else {
            this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time }, function () {
                _this11._canFastUpdateWinAmount = false;
                _this11._winValue = 0;
            });
            this.executeNextScript(script);
        }
    },
    _showWildTransition: function _showWildTransition(script, _ref8) {
        var _this12 = this;

        var name = _ref8.name,
            content = _ref8.content;

        var color = 7;
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                if (_this12.node.mainDirector) {
                    _this12.node.mainDirector.showCutscene(name, content, function (isSkip) {
                        if (isSkip) {
                            _this12.wildMultiplier.emit('ACTIVE_FAST', content.nwm, color);
                            _this12.runAsyncScript();
                        } else {
                            if (_this12.node.soundPlayer) _this12.node.soundPlayer.playMultiplier(content.nwm);
                            _this12.wildMultiplier.emit('ACTIVE_MULTIPLIER', content.nwm, color, false, function () {
                                _this12.runAsyncScript();
                            });
                        }
                    });
                }
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_showWildTransition" });
            this.executeNextScript(script);
        } else {
            this.node.mainDirector.showCutscene(name, content, function (isSkip) {
                if (isSkip) {
                    _this12.wildMultiplier.emit('ACTIVE_FAST', content.nwm, color);
                    _this12.executeNextScript(script);
                } else {
                    if (_this12.node.soundPlayer) _this12.node.soundPlayer.playMultiplier(content.nwm);
                    _this12.wildMultiplier.emit('ACTIVE_MULTIPLIER', content.nwm, color, isAutoSpin, function () {
                        _this12.executeNextScript(script);
                    });
                }
            });
        }
    },
    _showWildTransition_2: function _showWildTransition_2(script, _ref9) {
        var content = _ref9.content;

        var color = 7;
        this.wildMultiplier.emit('ACTIVE_FAST', content.nwm, color);
        this.executeNextScript(script);
    },
    _delayTimeScript: function _delayTimeScript(script, time) {
        var _this13 = this;

        var isFinished = this.node.gSlotDataStore.playSession.isFinished;
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;

        if (isFinished && !isAutoSpin) {
            var callback = function callback() {
                _this13.delayTimeCallback = function () {
                    _this13.delayTimeCallback = null;
                    _this13.runAsyncScript();
                };
                _this13.scheduleOnce(_this13.delayTimeCallback, time);
            };
            this.listExcuteNextScriptAsync.push({ callback: callback, isSkippable: true, name: "_delayTimeScript" });
            this.executeNextScript(script);
        } else {
            this.delayTimeCallback = function () {
                _this13.delayTimeCallback = null;
                _this13.executeNextScript(script);
            };
            this.scheduleOnce(this.delayTimeCallback, time);
        }
    },
    _pauseWallet: function _pauseWallet(script) {
        this.node.gSlotDataStore.isUpdateWinAmount = true;
        this.executeNextScript(script);
    },
    _resumeWallet: function _resumeWallet(script) {
        this.node.gSlotDataStore.isUpdateWinAmount = false;
        this.executeNextScript(script);
    },
    _resumeMultiply: function _resumeMultiply(script, multiply) {
        var color = 7;
        this.wildMultiplier.emit('ACTIVE_FAST', multiply, color);
        this.executeNextScript(script);
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
        //# sourceMappingURL=NormalGameDirector9983.js.map
        