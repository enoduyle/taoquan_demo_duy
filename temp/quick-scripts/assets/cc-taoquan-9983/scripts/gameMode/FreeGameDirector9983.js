(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/gameMode/FreeGameDirector9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b12fdQSBkhGyYDfC3P9GJ2U', 'FreeGameDirector9983', __filename);
// cc-taoquan-9983/scripts/gameMode/FreeGameDirector9983.js

'use strict';

var BaseSlotGameDirector = require('SlotGameDirector');
cc.Class({
    extends: BaseSlotGameDirector,
    properties: {
        optionRemain: cc.Label,
        wildMultiplier: cc.Node
    },

    extendInit: function extendInit() {
        this.table.active = false;
    },
    ready: function ready(data) {
        var _this = this;

        if (this.node.soundPlayer) this.node.soundPlayer.stopAllAudio();
        if (this.node.soundPlayer) this.node.soundPlayer.playMainBGM();
        var fsoi = this.node.gSlotDataStore.fsoi;

        this.table.active = true;
        if (data && data.matrix) {
            this.table.emit("CHANGE_MATRIX", { matrix: data.matrix });
        }
        if (data && data.fgoi) {
            this.updateWildType(data.fgoi);
        } else if (fsoi) {
            var fsoiArr = fsoi.split(';');
            this.updateWildType(fsoiArr[1]);
        }
        if (data && data.fsor) {
            this.updateOptionRemain(data.fsor);
        }
        if (data && data.fwm && data.fwm > 1 && data.fgoi) {
            this.wildMultiplier.emit('ACTIVE_FAST', data.fwm, data.fgoi);
        }
        this.buttons.emit('SPIN_SHOW');
        this.buttons.emit('SPIN_ENABLE');
        this.buttons.emit('STOP_AUTO_SPIN_HIDE');
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.playSession,
            winAmount = _node$gSlotDataStore$.winAmount,
            freeGameRemain = _node$gSlotDataStore$.freeGameRemain;

        if (!winAmount || winAmount && winAmount == 0) {
            this.winAmount.emit("RESET_NUMBER");
        }

        this.node.gSlotDataStore.isAutoSpin = true;
        this.spinTimes.emit("UPDATE_SPINTIMES", freeGameRemain);

        this.scheduleOnce(function () {
            _this.runAction('SpinByTimes', freeGameRemain);
        }, 1);
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
    _sendSpinToNetwork: function _sendSpinToNetwork(script) {
        this.node.mainDirector.enableCheckForever();
        this.node.mainDirector.gameStateManager.triggerFreeSpinRequest();
        this.executeNextScript(script);
    },
    _gameExit: function _gameExit(script) {
        var _this2 = this;

        if (!this.fsm.can('gameRestart')) return;
        this.fsm.gameRestart();
        this.spinTimes.emit("RESET_SPINTIMES");
        this.buttons.emit('SPIN_SHOW');
        this.buttons.emit('SPIN_ENABLE');
        this.resetMode();
        this.node.exit(function () {
            _this2.executeNextScript(script);
        });
    },
    resetMode: function resetMode() {
        this.table.active = false;
        this.wildMultiplier.emit('HIDE');
    },
    _resumeGameMode: function _resumeGameMode(script, _ref) {
        var _this3 = this;

        var name = _ref.name,
            data = _ref.data;

        if (this.node.mainDirector) {
            this.node.mainDirector.resumeGameMode({ name: name, data: data }, function () {
                if (_this3.node.soundPlayer) _this3.node.soundPlayer.stopAllAudio();
                if (_this3.node.soundPlayer) _this3.node.soundPlayer.playMainBGM();
                _this3.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to resume game mode');
            this.executeNextScript(script);
        }
    },
    _showFreeGameOption: function _showFreeGameOption(script, _ref2) {
        var _this4 = this;

        var name = _ref2.name,
            content = _ref2.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this4.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _hideCutscene: function _hideCutscene(script, _ref3) {
        var _this5 = this;

        var name = _ref3.name;

        if (this.node.mainDirector) {
            this.node.mainDirector.hideCutscene(name, function () {
                _this5.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    updateOptionRemain: function updateOptionRemain(data) {
        if (data) {
            this.optionRemain.node.parent.active = true;
            this.optionRemain.string = '+' + data;
        } else {
            this.optionRemain.node.parent.active = false;
        }
    },
    _updateOptionRemain: function _updateOptionRemain(script, data) {
        this.updateOptionRemain(data);
        this.executeNextScript(script);
    },
    _updateWildMultiplier: function _updateWildMultiplier(script, data) {
        var _this6 = this;

        var fgoi = this.node.gSlotDataStore.playSession.extend.fgoi;

        if (this.node.soundPlayer) this.node.soundPlayer.playMultiplier(data.fwm);
        this.wildMultiplier.emit('ACTIVE_MULTIPLIER', data.fwm, fgoi, true, function () {
            _this6.executeNextScript(script);
        });
    },
    _updateWildMultiplier_2: function _updateWildMultiplier_2(script, data) {
        var fgoi = this.node.gSlotDataStore.playSession.extend.fgoi;
        //if (this.node.soundPlayer) this.node.soundPlayer.playMultiplier(data);

        this.wildMultiplier.emit('ACTIVE_FAST', data.fwm, fgoi);
        this.executeNextScript(script);
    },
    _showWildTransition: function _showWildTransition(script, _ref4) {
        var _this7 = this;

        var name = _ref4.name,
            content = _ref4.content;
        var fgoi = this.node.gSlotDataStore.playSession.extend.fgoi;

        this.node.mainDirector.showCutscene(name, content, function (isSkip) {
            if (isSkip) {
                _this7.wildMultiplier.emit('ACTIVE_FAST', content.fwm, fgoi);
                _this7.executeNextScript(script);
            } else {
                if (_this7.node.soundPlayer) _this7.node.soundPlayer.playMultiplier(content.fwm);
                _this7.wildMultiplier.emit('ACTIVE_MULTIPLIER', content.fwm, fgoi, true, function () {
                    _this7.executeNextScript(script);
                });
            }
        });
    },
    _showWildTransition_2: function _showWildTransition_2(script, _ref5) {
        var content = _ref5.content;
        var fgoi = this.node.gSlotDataStore.playSession.extend.fgoi;

        this.wildMultiplier.emit('ACTIVE_FAST', content.fwm, fgoi);
        this.executeNextScript(script);
    },
    _updateWildType: function _updateWildType(script, data) {
        var fsoiArr = data.split(';');
        this.updateWildType(fsoiArr[1]);
        this.executeNextScript(script);
    },
    updateWildType: function updateWildType(type) {
        this.table.emit("SET_WILD_TYPE", type);
    },
    _showAllPayLine: function _showAllPayLine(script) {
        this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {});
        this.executeNextScript(script);
    },
    _showAllPayLineSync: function _showAllPayLineSync(script) {
        var _this8 = this;

        this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {
            _this8.executeNextScript(script);
        });
    },
    _showEachPayLineSync: function _showEachPayLineSync(script) {
        this.table.emit("SHOW_ALL_NORMAL_PAYLINES");
        this.executeNextScript(script);
    },
    _showAllPayLine_2: function _showAllPayLine_2(script) {
        this.executeNextScript(script);
    },
    _showAllPayLineSync_2: function _showAllPayLineSync_2(script) {
        this.executeNextScript(script);
    },


    // _showEachPayLineSync_2(script) {
    //     this.table.emit("HIDE_PAYLINES");
    //     this.executeNextScript(script);
    // },

    _showSubSymbolPayLine: function _showSubSymbolPayLine(script, data) {
        var _this9 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_SUB_SYMBOL_PAYLINE", data, function () {
            _this9.executeNextScript(script);
        });
    },
    _hideSubSymbolPayLine: function _hideSubSymbolPayLine(script) {
        this.table.emit("HIDE_SUB_SYMBOL_PAYLINE");
        this.executeNextScript(script);
    },
    _showSubSymbolPayLine_2: function _showSubSymbolPayLine_2(script) {
        this.executeNextScript(script);
    },
    _playSFXCloud2: function _playSFXCloud2(script) {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXCloud2();
        this.executeNextScript(script);
    },
    _playSFXCloud2_2: function _playSFXCloud2_2(script) {
        this.executeNextScript(script);
    },
    skipAllEffects: function skipAllEffects() {
        this.wildMultiplier.emit('SHOW_LAST_RESULT');
        this._super();
    },
    fastToResultClick: function fastToResultClick() {
        this.skipAllEffects();
        this._super();
    },
    spinClick: function spinClick() {
        this.skipAllEffects();
        this._super();
    },
    _updateValueJP: function _updateValueJP(script, data) {
        this.node.mainDirector.updateValueJackpot(data.isGrand, data.value);
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
        //# sourceMappingURL=FreeGameDirector9983.js.map
        