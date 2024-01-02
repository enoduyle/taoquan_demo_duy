(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/cutscene/TotalFreeGameWiningCutscene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5437aVVtoZL/LbFi4bGovEc', 'TotalFreeGameWiningCutscene', __filename);
// cc-common/cc-slotbase-v2/g9000/cutscene/TotalFreeGameWiningCutscene.js

'use strict';

var CutsceneMode = require('CutsceneMode');

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: CutsceneMode,

    properties: {
        overlayNode: cc.Node,
        contentNode: cc.Node,
        particleNode: cc.Node,
        winAmountLabel: cc.Label,
        freeSpinTimesLabel: cc.Label,
        appearingDuration: 4,
        winText: cc.Label
    },

    onLoad: function onLoad() {
        this._super();
        this._isShow = false;
    },
    start: function start() {
        this.localizeText();
    },
    localizeText: function localizeText() {
        if (this.winText && this.node.config.MESSAGE_DIALOG.YOU_WON) {
            this.winText.string = this.node.config.MESSAGE_DIALOG.YOU_WON;
        }
    },
    show: function show() {
        var _content = this.content,
            totalFreeWinAmount = _content.totalFreeWinAmount,
            totalFreeSpinTime = _content.totalFreeSpinTime;


        if (totalFreeWinAmount) {
            var convertedAmount = formatMoney(totalFreeWinAmount);
            if (convertedAmount) {
                this.winAmountLabel.string = convertedAmount;
            } else {
                this.winAmountLabel.string = totalFreeWinAmount;
            }
        } else {
            this.winAmountLabel.string = "0";
        }

        if (totalFreeSpinTime) {
            this.freeSpinTimesLabel.string = totalFreeSpinTime;
        }
        this._super();
        this.overlayNode.opacity = 0;
        this.playShowingAnimation();
        this._isShow = true;
    },
    enter: function enter() {},
    bindButtonClicked: function bindButtonClicked() {
        var _this = this;

        this._appearingAction = cc.sequence(cc.delayTime(this.appearingDuration), cc.callFunc(function () {
            _this.onExitButtonClicked();
        }));

        this.node.runAction(this._appearingAction);
    },
    onExitButtonClicked: function onExitButtonClicked() {
        var _this2 = this;

        if (!this._isShow) {
            return;
        }

        this._isShow = false;
        this.playClosingAnimation(function () {
            _this2.resetNode();
            _this2.exit();
        });
    },
    playShowingAnimation: function playShowingAnimation() {
        cc.log('Play Free Winning Cutscene Showing Animation');
        this._showContent();
    },
    _showContent: function _showContent() {
        var _this3 = this;

        this.overlayNode.runAction(cc.fadeTo(0.3, 220));
        this.contentNode.scale = 0;
        this.tweenShow = cc.tween(this.contentNode).delay(0.5).call(function () {
            if (_this3.node.soundPlayer) {
                _this3.node.soundPlayer.playSoundSumFreeStart();
            }
            if (_this3.content.totalFreeWinAmount > 0) {
                _this3._playParticle();
            }
        }).to(0.5, { scale: 1 }, { easing: "backOut" }).call(function () {
            _this3.bindButtonClicked();
        });

        this.tweenShow.start();
    },
    _hideContent: function _hideContent() {
        var _this4 = this;

        if (this.node.soundPlayer) {
            this.node.soundPlayer.stopSoundSumFreeStart();
            this.node.soundPlayer.playSoundSumFreeEnd();
        }
        this.tweenHide = cc.tween(this.contentNode).to(0.5, { scale: 0 }, { easing: "backIn" }).call(function () {
            _this4.overlayNode.runAction(cc.fadeOut(0.5));
        });

        this.tweenHide.start();
    },
    _playParticle: function _playParticle() {
        this._isPlayParticle = true;
        this.particleNode.active = true;
        this.particleNode.getComponent(cc.ParticleSystem).resetSystem();
    },
    _stopParticle: function _stopParticle() {
        this._isPlayParticle = false;
        this.particleNode.getComponent(cc.ParticleSystem).stopSystem();
    },
    playClosingAnimation: function playClosingAnimation(callback) {
        cc.log('Play Free Winning Cutscene Closing Animation');
        if (this._isPlayParticle) {
            this._stopParticle();
        }
        this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this._hideContent.bind(this)), cc.delayTime(1), cc.callFunc(function () {
            callback && callback();
        })));
    },
    resetNode: function resetNode() {
        this.particleNode.active = false;
        if (this._appearingAction) {
            this.node.stopAction(this._appearingAction);
            this._appearingAction = null;
        }

        if (this.tweenShow) {
            this.tweenShow.stop();
            this.tweenShow = null;
        }

        if (this.tweenHide) {
            this.tweenHide.stop();
            this.tweenHide = null;
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
        //# sourceMappingURL=TotalFreeGameWiningCutscene.js.map
        