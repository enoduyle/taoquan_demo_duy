(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/JackpotWinv2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba155yhT0tGgqxGFyDJvh7C', 'JackpotWinv2', __filename);
// cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/JackpotWinv2.js

'use strict';

var _require = require('globalAnimationLibrary'),
    reverseEasing = _require.reverseEasing;

var _require2 = require('utils'),
    formatMoney = _require2.formatMoney;

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        winAmount: cc.Node,
        title: cc.Node,
        winInfo: cc.Node,
        coinsEffect: cc.Node,
        delayShowTime: 2,
        hideTime: 0.5,
        animDuration: 10,
        extendFinishDelayTime: 15
    },

    onLoad: function onLoad() {
        this._super();
        this.label = this.winAmount.getComponentInChildren(cc.Label);
    },
    enter: function enter() {
        this.playSoundStart();
        var scaleTime = 0.2;
        this.winAmount.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(scaleTime, 1.2), cc.scaleTo(scaleTime, 1))));
        if (this.title) {
            this.title.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }
        this.initValue();
        this.startParticle();
        this.startUpdateWinAmount();
    },
    playSoundStart: function playSoundStart() {},
    playSoundEnd: function playSoundEnd() {},
    initValue: function initValue() {
        this.winInfo.scale = 1;
        this.currentValue = 0;
        this.currentTitle = 0;
        this.label.string = '';
        this.isUpdating = true;
        this.speedUp = false;
        this.bindQuickShow();
    },
    bindQuickShow: function bindQuickShow() {
        var _this = this;

        this.skippable = false;
        this.node.runAction(cc.sequence(cc.delayTime(this.hideTime), cc.callFunc(function () {
            _this.skippable = true;
        })));
    },
    startParticle: function startParticle() {
        this.coinsEffect.emit('START_PARTICLE');
        this.coinsEffect.emit('DROP_MONEY');
    },
    startUpdateWinAmount: function startUpdateWinAmount() {
        var _this2 = this;

        var speedUpEasing = function speedUpEasing(t) {
            return t * t;
        }; // constant accelerated
        var slowDownEasing = reverseEasing(function (t) {
            return t * t;
        });
        var halfAmount = 0.5 * this.content.winAmount;
        var extendFinishDelayTime = this.node.gSlotDataStore && this.node.gSlotDataStore.isAutoSpin ? this.extendFinishDelayTime : 0;
        this.currentTween = cc.tween(this);
        this.currentTween.to(0.5 * this.animDuration, { currentValue: halfAmount }, { easing: speedUpEasing }).to(0.5 * this.animDuration, { currentValue: this.content.winAmount }, { easing: slowDownEasing }).delay(extendFinishDelayTime).call(function () {
            if (_this2.node.gSlotDataStore && _this2.node.gSlotDataStore.isAutoSpin) {
                _this2.playSoundEnd();
                _this2.skippable = false;
                _this2.currentTween = null;
                _this2.finish();
            }
        });
        this.currentTween.start();
    },
    update: function update() {
        if (!this.isUpdating) return;
        this.label.string = formatMoney(this.currentValue);
    },
    onClick: function onClick() {
        var _this3 = this;

        if (!this.isUpdating || this.speedUp) return;
        if (!this.skippable) return;

        this.speedUp = true;
        this.winAmount.stopAllActions();
        var scaleTime = 0.13;
        this.winAmount.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(scaleTime, 1.2), cc.scaleTo(scaleTime, 1))));

        this.playSoundEnd();

        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
        }
        cc.tween(this).to(1, { currentValue: this.content.winAmount }).call(function () {
            _this3.finish();
        }).start();
    },
    stopParticle: function stopParticle() {
        this.coinsEffect.emit('STOP_PARTICLE');
    },
    finish: function finish() {
        var _this4 = this;

        this.isUpdating = false;
        this.label.string = formatMoney(this.content.winAmount);
        this.winAmount.stopAllActions();
        this.stopParticle();
        this.winInfo.runAction(cc.sequence(cc.delayTime(this.delayShowTime), cc.scaleTo(this.hideTime, 0), cc.callFunc(function () {
            //this.node.soundPlayer.playBackgroundMusic();
            _this4.label.string = '';
            _this4.exit(); // exit cutscene
        })));
    },
    onDisable: function onDisable() {
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
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
        //# sourceMappingURL=JackpotWinv2.js.map
        