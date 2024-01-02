"use strict";
cc._RF.push(module, 'c8ea2H2pIFAIJ2gfQAedmor', 'TotalWinDialog9983');
// cc-taoquan-9983/scripts/cutScene/TotalWinDialog9983.js

'use strict';

var cutsceneMode = require('CutsceneMode');

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cutsceneMode,

    properties: {
        overlay: cc.Node,
        spineGlow: sp.Skeleton,
        spineFrame: sp.Skeleton,
        winAmount: cc.Node
    },
    /* //*test
    onLoad(){
        this._super();
        window._test = () => {
            this.node.emit("PLAY", { winAmount: 1000000 });
        };
    },
    //*/
    enter: function enter() {
        var _this = this;

        this.isShow = true;
        this.winAmount.getComponent(cc.Label).string = '';
        if (this.node.soundPlayer) this.node.soundPlayer.stopAllAudio();
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXTotalWin();
        this.spineGlow.setAnimation(0, "Appear", false);
        this.spineGlow.addAnimation(0, "Idle", true);

        this.spineFrame.setAnimation(0, "Appear", false);
        this.spineFrame.addAnimation(0, "Idle", true);
        this.winAmount.scale = 0;
        this.node.runAction(cc.sequence(cc.callFunc(function () {
            _this.winAmount.runAction(cc.scaleTo(0.5, 1).easing(cc.easeBackOut()));
            _this.winAmount.runAction(cc.fadeIn(0.3));
            _this.winAmount.getComponent(cc.Label).string = formatMoney(_this.content.winAmount);
        }), cc.fadeIn(0.5), cc.delayTime(4), cc.callFunc(function () {
            _this.close();
        })));
    },
    bindButtonQuickShow: function bindButtonQuickShow() {
        var _this2 = this;

        this.bindButtonAnimation = cc.sequence(cc.delayTime(1), cc.callFunc(function () {
            _this2.overlay.on('click', function () {
                if (_this2.isShow) {
                    _this2.quickShow();
                }
            });
        }));
        this.overlay.runAction(this.bindButtonAnimation);
    },
    close: function close() {
        var _this3 = this;

        this.isShow = false;
        this.winAmount.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this3.spineFrame._animationQueue = [];
            _this3.spineGlow._animationQueue = [];
            _this3.spineGlow.setAnimation(0, "Disappear", false);
            _this3.spineFrame.setAnimation(0, "Disappear", false);
        }), cc.spawn(cc.fadeOut(0.4), cc.scaleTo(0.5, 0).easing(cc.easeBackIn())), cc.callFunc(function () {
            if (_this3.node.soundPlayer) _this3.node.soundPlayer.stopSFXTotalWin();
            _this3.winAmount.getComponent(cc.Label).string = '';
            _this3.exit();
        })));
    },
    quickShow: function quickShow() {
        if (!this.isShow) return;
        this.node.stopAllActions();
        this.overlay.off('click');
        this.overlay.stopAction(this.bindButtonAnimation);
        this.winAmount.stopAllActions();
        this.close();
    },
    show: function show() {
        this.node.active = true;
        this.node.opacity = 0;
        this.bindButtonQuickShow();
    }
});

cc._RF.pop();