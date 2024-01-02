(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/WinEffectCutscene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9172e+QCEBHyJzWkpKS32p3', 'WinEffectCutscene', __filename);
// cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/WinEffectCutscene.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        megaWinRate: 30,
        superWinRate: 50
    },
    onLoad: function onLoad() {
        this.milisecondRate = 1000;
        this.isSuperWinShow = false;
        this.isBigWinShow = false;
        this.isMegaWinShow = false;
        this.duration = 9000;
        this.node.opacity = 0;
        this.node.active = false;
        this.gSlotWinEffect = this.node.gSlotWinEffect;
        this.winAmount = this.node.getChildByName("WinAmount");
        this.soundPlayer = this.node.soundPlayer ? this.node.soundPlayer : this.node;
        this.node.on("PLAY", this.show, this);
    },
    show: function show(data, callback) {
        var _this = this;

        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        this.soundPlayer.node.emit("STOP_ALL_AUDIO");
        this.isShow = true;
        this.callback = callback;
        this.value = data.winAmount;
        this.currentBetData = data.currentBetData;
        this.node.active = true;
        this.node.opacity = 255;

        var gSlotWinEffect = this.node.gSlotWinEffect;
        gSlotWinEffect.init(0, this.spriteData);

        this.calbackWin = {
            currentBetData: this.currentBetData,
            enterFrame: function enterFrame(per, finalWin) {
                _this.enterFrame(gSlotWinEffect, per, finalWin);
            },
            runMegaWin: function runMegaWin() {
                _this.runMegaWin(gSlotWinEffect);
            },
            runSuperWin: function runSuperWin() {
                _this.runSuperWin(gSlotWinEffect);
            },
            runFinishBigWin: function runFinishBigWin() {
                _this.runFinishBigWin();
            },
            runFinishWin: function runFinishWin() {
                _this.runFinishWin(gSlotWinEffect);
            }
        };

        setTimeout(function () {
            if (_this.isShow) {
                _this.node.on('click', function () {
                    _this.quickShow(gSlotWinEffect);
                });
            }
        }, 500);

        this.showWinAnimation();
    },
    showWinAnimation: function showWinAnimation() {
        var _this2 = this;

        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        this.soundPlayer.node.emit("PLAY_WIN_START");
        this.timeOutSoundLoop = setTimeout(function () {
            _this2.soundPlayer.node.emit("PLAY_WIN_LOOP");
        }, 1000);

        this.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function () {
            _this2.winAmount.onUpdateWinValue(_this2.value, _this2.duration, _this2.calbackWin, false, 1000, 50, _this2.superWinRate, _this2.megaWinRate);
        })));
    },
    quickShow: function quickShow(gSlotWinEffect) {
        var _this3 = this;

        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        if (!this.isShow) {
            return;
        }
        if (this.timeOutSoundLoop) {
            clearTimeout(this.timeOutSoundLoop);
        }
        this.isShow = false;
        this.calbackWin = {
            enterFrame: function enterFrame(per, finalWin) {
                _this3.enterFrame(gSlotWinEffect, per, finalWin);
            },
            runFinishWin: function runFinishWin() {
                _this3.runFinishWin(gSlotWinEffect);
            }
        };
        var start = Number(this.winAmount.string);
        var range = this.value - start;
        var animationDuration = 1000;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.callFunc(function () {
            if (range / _this3.currentBetData * _this3.milisecondRate < animationDuration) {
                animationDuration = range;
            }
            _this3.soundPlayer.node.emit("STOP_WIN_LOOP");
            _this3.soundPlayer.node.emit("PLAY_WIN_END");
            _this3.winAmount.onUpdateWinValue(_this3.value, animationDuration, _this3.calbackWin, true);
        }), cc.callFunc(function () {
            if (_this3.value >= _this3.currentBetData * _this3.superWinRate) {
                _this3.runSuperWin(gSlotWinEffect);
            } else if (_this3.value >= _this3.currentBetData * _this3.megaWinRate) {
                _this3.runMegaWin(gSlotWinEffect);
            } else {
                _this3.runFinishBigWin();
            }
        })));
    },
    enterFrame: function enterFrame(gSlotWinEffect, per, finalWin) {
        gSlotWinEffect.enterFrame(per, finalWin);
    },
    runMegaWin: function runMegaWin(gSlotWinEffect) {
        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        if (this.isMegaWinShow) {
            return;
        }
        this.isMegaWinShow = true;
        gSlotWinEffect.setWinEff(1);
    },
    runSuperWin: function runSuperWin(gSlotWinEffect) {
        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        if (this.isSuperWinShow) {
            return;
        }
        this.isSuperWinShow = true;
        gSlotWinEffect.setWinEff(2);
    },
    runFinishBigWin: function runFinishBigWin() {
        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        if (this.isBigWinShow) {
            return;
        }
        this.isBigWinShow = true;
    },
    runFinishWin: function runFinishWin(gSlotWinEffect) {
        var _this4 = this;

        if (this.node == null || this.node == 'undefined' || this.node._children == null || this.node._children == 'undefined') {
            return;
        }
        if (this.isShow) {
            this.soundPlayer.node.emit("STOP_WIN_LOOP");
            this.soundPlayer.node.emit("PLAY_WIN_END");
        }
        this.isSuperWinShow = false;
        this.isMegaWinShow = false;
        this.isBigWinShow = false;
        this.node.off('click');
        gSlotWinEffect.hideFn(function () {
            if (_this4.node.gSlotDataStore) _this4.soundPlayer.node.emit("PLAY_SOUND_BACKGROUND", _this4.node.gSlotDataStore.currentGameMode);
            _this4.winAmount.resetValue();
            if (_this4.callback && typeof _this4.callback == "function") {
                _this4.callback();
            }
        });
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
        //# sourceMappingURL=WinEffectCutscene.js.map
        