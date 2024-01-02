(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/JackpotMultiply.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '061085dfUlBz5bfjK8PWHmh', 'JackpotMultiply', __filename);
// cc-common/cc-slotbase-v2/gui/JackpotMultiply.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        frameAnimation: cc.Node,
        multiplyAnimation: cc.Node,
        skinIdle: 'Idle',
        skinJackpot: 'Jackpot',
        skinMultiply: 'Multiply',
        animIde: 'Idle',
        animAppear: 'Appear',
        animDisAppear: 'Disappear',
        jackpotUIAnims: [cc.Node],
        jackpotNotice: cc.Node,
        jackpotLabelMask: cc.Node,
        jackpotLabelHolder: cc.Node,
        jackpotWinUsername: cc.Node,
        jackpotWinAmount: cc.Node,
        particleAppear: cc.Node,
        particleBG: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on("PLAY_ANIM_MULTIPLY", this.playAnimMultiply, this);
        this.node.on("STOP_ANIM_MULTIPLY", this.stopAnimMultiply, this);
        this.node.on("SHOW_ANIM_NOTICE_WIN_JP", this.showAnimNoticeWinJP, this);
        this.node.on("RESET_ANIM_NOTICE", this.resetAnimNotice, this);
        this.isRunningAppearAnim = false;
        this.isRunningDisappearAnim = false;
    },
    playAnimMultiply: function playAnimMultiply(multiply) {
        var _this = this;

        if (this.frameAnimation && !this.isRunningAppearAnim) {
            if (this.tweenFrame) this.tweenFrame.stop();
            this.tweenFrame = cc.tween(this.frameAnimation).delay(0.2).call(function () {
                _this.frameAnimation.getComponent(sp.Skeleton).setSkin(_this.skinMultiply);
                _this.frameAnimation.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
            }).start();
        }

        if (this.multiplyAnimation) {
            var id = 'X' + multiply;
            this.multiplyAnimation.getComponent(sp.Skeleton).setSkin(id);
            if (!this.isRunningAppearAnim) {
                if (this.tweenMultiply) this.tweenMultiply.stop();
                this.multiplyAnimation.getComponent(sp.Skeleton).setSkin(id);
                this.multiplyAnimation.getComponent(sp.Skeleton).setAnimation(0, this.animAppear, false);

                this.tweenMultiply = cc.tween(this.multiplyAnimation).to(0.2, { opacity: 255 }).call(function () {
                    _this.multiplyAnimation.getComponent(sp.Skeleton).setAnimation(0, _this.animIde, true);
                }).delay(0.1).call(function () {
                    if (_this.particleAppear) {
                        _this.particleAppear.getComponent(cc.ParticleSystem).resetSystem();
                        _this.particleAppear.opacity = 255;
                    }
                    if (_this.particleBG) {
                        _this.particleBG.getComponent(cc.ParticleSystem).resetSystem();
                        _this.particleBG.opacity = 255;
                    }
                }).delay(0.4).call(function () {
                    if (_this.particleAppear) _this.particleAppear.opacity = 0;
                }).start();
            }
        }

        if (!this.isRunningAppearAnim) this.isRunningAppearAnim = true;
        this.isRunningDisappearAnim = false;
    },
    stopAnimMultiply: function stopAnimMultiply() {
        if (this.isRunningDisappearAnim) return;

        if (this.frameAnimation) {
            if (this.tweenFrame) this.tweenFrame.stop();
            this.frameAnimation.getComponent(sp.Skeleton).setSkin(this.skinIdle);
            this.frameAnimation.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
        }

        if (this.multiplyAnimation) {
            if (this.tweenMultiply) this.tweenMultiply.stop();
            if (this.multiplyAnimation.opacity !== 0) this.multiplyAnimation.getComponent(sp.Skeleton).setAnimation(0, this.animDisAppear, true);

            if (this.particleAppear) {
                this.particleAppear.getComponent(cc.ParticleSystem).stopSystem();
                this.particleAppear.opacity = 0;
            }
            if (this.particleBG) {
                this.particleBG.getComponent(cc.ParticleSystem).stopSystem();
                this.particleBG.opacity = 0;
            }
            this.tweenMultiply = cc.tween(this.multiplyAnimation).delay(0.5).to(0.2, { opacity: 0 }).start();
        }

        this.isRunningAppearAnim = false;
        this.isRunningDisappearAnim = true;
    },
    showAnimNoticeWinJP: function showAnimNoticeWinJP(jpAmount) {
        var _this2 = this;

        var dn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var lv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (!this.jackpotNotice || !this.jackpotWinUsername || !this.jackpotWinAmount) return;
        if (this.jackpotWinUsername) this.jackpotWinUsername.getComponent(cc.Label).string = dn;
        if (this.jackpotWinAmount) this.jackpotWinAmount.getComponent(cc.Label).string = (lv > 1 ? 'x' + lv + ' ' : '') + formatMoney(jpAmount);
        if (this.jackpotLabelHolder && this.jackpotLabelMask) {
            if (this.tweenjackpotNotice) this.jackpotNoticeTween.stop();
            if (this.tweenJackPotLabelHolder) this.tweenJackPotLabelHolder.stop();

            this.startX = 0;
            this.jackpotNoticeTween = cc.tween(this.jackpotNotice).delay(0.5).to(0.2, { opacity: 255 }).call(function () {
                if (_this2.frameAnimation) {
                    _this2.tweenFrame = cc.tween(_this2.frameAnimation).call(function () {
                        _this2.frameAnimation.getComponent(sp.Skeleton).setSkin(_this2.skinJackpot);
                        _this2.frameAnimation.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
                    }).start();
                }

                if (_this2.jackpotUIAnims && _this2.jackpotUIAnims.length) {
                    _this2.jackpotUIAnims.forEach(function (item) {
                        cc.tween(item).to(0.2, { opacity: 255 }).start();
                    });
                }

                var labelHolderWidth = _this2.jackpotLabelHolder.children.reduce(function (acc, obj) {
                    return acc + obj.width;
                }, 0) + 5 * (_this2.jackpotLabelHolder.children.length - 1);
                if (_this2.jackpotLabelMask.width < _this2.jackpotLabelHolder.width) {
                    _this2.startX = _this2.jackpotLabelHolder.x - (labelHolderWidth - _this2.jackpotLabelMask.width);
                    _this2.startX = parseInt(_this2.startX);
                }
                _this2.tweenJackPotLabelHolder = cc.tween(_this2.jackpotLabelHolder).to(2, { position: cc.v2(_this2.startX, _this2.jackpotLabelHolder.y) }).start();
            }).start();
        }
    },
    resetAnimNotice: function resetAnimNotice() {
        if (this.tweenFrame) this.tweenFrame.stop();
        if (this.tweenjackpotNotice) this.jackpotNoticeTween.stop();
        if (this.tweenJackPotLabelHolder) this.tweenJackPotLabelHolder.stop();

        if (this.jackpotLabelHolder) this.jackpotLabelHolder.x = 0;
        if (this.jackpotNotice) {
            cc.tween(this.jackpotNotice).to(0.2, { opacity: 0 }).start();
        }

        if (this.frameAnimation) {
            this.frameAnimation.getComponent(sp.Skeleton).setSkin(this.skinIdle);
            this.frameAnimation.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
        }

        if (this.jackpotUIAnims && this.jackpotUIAnims.length) {
            this.jackpotUIAnims.forEach(function (item) {
                cc.tween(item).to(0.2, { opacity: 0 }).start();
            });
        }

        this.isRunningAppearAnim = false;
        this.isRunningDisappearAnim = false;
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
        //# sourceMappingURL=JackpotMultiply.js.map
        