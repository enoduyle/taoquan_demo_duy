(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/WinEffectv2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '96730TdSwJHWrPoL0RdIHeV', 'WinEffectv2', __filename);
// cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/WinEffectv2.js

'use strict';

var _require = require('globalAnimationLibrary'),
    reverseEasing = _require.reverseEasing;

var _require2 = require('utils'),
    formatMoney = _require2.formatMoney;

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        megaRate: 25,
        superRate: 40,
        winAmount: cc.Node,
        overlayNode: cc.Node,
        fastParticle: cc.ParticleSystem,
        title: cc.Node,
        titleFrame: [cc.SpriteFrame],
        winInfo: cc.Node,
        coinsEffect: cc.Node,
        delayShowTime: 2,
        hideTime: 0.5,
        animDuration: 9
    },

    onLoad: function onLoad() {
        this._super();
        this.label = this.winAmount.getComponentInChildren(cc.Label);
        this.isShowFastEffect = false;
        this.isShowNormalEffect = false;
    },
    enter: function enter() {
        this.node.stopAllActions();
        var modeTurbo = false;
        if (this.node.gSlotDataStore) modeTurbo = this.node.gSlotDataStore.modeTurbo;
        modeTurbo ? this.showFastEffectWin() : this.showEffectWin();
        this.node.fullDisplay = !modeTurbo;
    },
    showFastEffectWin: function showFastEffectWin() {
        var _this = this;

        // turbo
        if (this.isShowFastEffect) {
            this.callback && this.callback();
            this.callback = null;
            return;
        }
        this.isShowFastEffect = true;
        this.winInfo.opacity = 0;
        if (this.overlayNode) {
            this.overlayNode.active = false;
        }
        this.fastParticle.node.opacity = 0;
        this.fastParticle.node.stopAllActions();
        this.fastParticle.node.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeIn(0.1)));
        this.fastParticle.resetSystem();
        this.callback && this.callback();
        this.callback = null;
        if (this._fastEffectAction) {
            this.node.stopAction(this._fastEffectAction);
        }
        this._fastEffectAction = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            _this.fastParticle.stopSystem();
        }), cc.delayTime(2), cc.callFunc(function () {
            _this.exit();
        }));
        this.node.runAction(this._fastEffectAction);
    },
    showEffectWin: function showEffectWin() {
        this.isShowNormalEffect = true;
        if (this.overlayNode) {
            this.overlayNode.active = true;
        }
        this.winInfo.opacity = 255;
        this.playSoundStart();
        var scaleTime = 0.2;
        this.winAmount.stopAllActions();
        this.winAmount.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(scaleTime, 1.2), cc.scaleTo(scaleTime, 1))));
        if (this.title) {
            this.title.stopAllActions();
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
        if (this.title) {
            this.title.getComponent(cc.Sprite).spriteFrame = this.titleFrame[0];
        }
        this.megaWinAmount = this.content.currentBetData * this.megaRate;
        this.superWinAmount = this.content.currentBetData * this.superRate;
        this.isUpdating = true;
        this.speedUp = false;
        this.bindQuickShow();
    },
    bindQuickShow: function bindQuickShow() {
        var _this2 = this;

        this.skippable = false;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(this.hideTime), cc.callFunc(function () {
            _this2.skippable = true;
        }), cc.delayTime(this.animDuration - this.delayShowTime), cc.callFunc(function () {
            _this2.skippable = false;
        })));
    },
    startParticle: function startParticle() {
        this.coinsEffect.emit('START_PARTICLE');
        if (this.content.winAmount > this.megaWinAmount) {
            this.coinsEffect.emit('DROP_MONEY');
        }
    },
    startUpdateWinAmount: function startUpdateWinAmount() {
        var _this3 = this;

        var speedUpEasing = function speedUpEasing(t) {
            return t * t;
        }; // constant accelerated
        var slowDownEasing = reverseEasing(function (t) {
            return t * t;
        });
        var halfAmount = 0.5 * this.content.winAmount;
        this.currentTween = cc.tween(this);
        this.currentTween.to(0.5 * this.animDuration, { currentValue: halfAmount }, { easing: speedUpEasing }).to(0.5 * this.animDuration, { currentValue: this.content.winAmount }, { easing: slowDownEasing }).delay(0.5).call(function () {
            _this3.skippable = false;
            _this3.currentTween = null;
            _this3.finish();
        });
        this.currentTween.start();
    },
    update: function update() {
        if (!this.isUpdating) return;
        this.label.string = formatMoney(this.currentValue);
        if (this.currentValue >= this.superWinAmount && this.currentTitle == 1) {
            this.changeTitle(2);
        } else if (this.currentValue >= this.megaWinAmount && this.currentTitle == 0) {
            this.changeTitle(1);
        }
    },
    changeTitle: function changeTitle(index) {
        var _this4 = this;

        this.currentTitle = index;
        if (!this.title) return;
        this.title.stopAllActions();
        cc.tween(this.title).to(0.3, { scale: 2, opacity: 0 }).call(function () {
            _this4.title.getComponent(cc.Sprite).spriteFrame = _this4.titleFrame[index];
        }).to(0.3, { scale: 1, opacity: 255 }).call(function () {
            _this4.title.stopAllActions();
            _this4.title.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
        }).start();
    },
    onClick: function onClick() {
        var _this5 = this;

        if (!this.isUpdating || this.speedUp) return;
        if (!this.skippable) return;

        this.speedUp = true;
        this.winAmount.stopAllActions();
        var scaleTime = 0.13;
        this.winAmount.stopAllActions();
        this.winAmount.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(scaleTime, 1.2), cc.scaleTo(scaleTime, 1))));

        this.playSoundEnd();

        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
        }
        cc.tween(this).to(1, { currentValue: this.content.winAmount }).call(function () {
            _this5.finish();
        }).start();
    },
    stopParticle: function stopParticle() {
        this.coinsEffect.emit('STOP_PARTICLE');
    },
    finish: function finish() {
        var _this6 = this;

        this.isUpdating = false;
        this.label.string = formatMoney(this.content.winAmount);
        this.winAmount.stopAllActions();
        this.stopParticle();
        this.winInfo.stopAllActions();
        this.winInfo.runAction(cc.sequence(cc.delayTime(this.delayShowTime), cc.scaleTo(this.hideTime, 0), cc.callFunc(function () {
            //this.node.soundPlayer.playBackgroundMusic();
            _this6.label.string = '';
            _this6.winInfo.opacity = 0;
            _this6.exit(); // exit cutscene
        })));
    },
    exit: function exit() {
        this.isShowFastEffect = false;
        this.isShowNormalEffect = false;
        this.callback && this.callback();
        this.callback = null;
        this.node.emit("STOP");
        if (this.node.mainDirector && this.node.mainDirector.onIngameEvent) {
            this.node.mainDirector.onIngameEvent("ON_CUTSCENE_CLOSE");
        }
        this.node.active = false;
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
        //# sourceMappingURL=WinEffectv2.js.map
        