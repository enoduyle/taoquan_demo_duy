(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/trial/TrialButtonv2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '21c1aTgmrtNkIcfxXAZ+DiF', 'TrialButtonv2', __filename);
// cc-common/cc-slotbase-v2/trial/TrialButtonv2.js

"use strict";

cc.Class({
    extends: require('TrialButton'),

    properties: {
        animationBtn: sp.Skeleton,
        blockInput: cc.Node,
        enterTrial: "Press_ChoiThu",
        idleTrial: "Idle_ChoiThu",
        enterReal: "Press_ChoiThat",
        idleReal: "Idle_ChoiThat",
        noAnimReal: "Idle_ChoiThat_NoAnim"
    },

    onLoad: function onLoad() {
        this._super();
        this.completeTrialSessionCount = 0;
        this.node.on("CAN_SWITCH_MODE", this.canSwitchMode, this);
        this.node.on("SHOW_BLOCK_INPUTS", this.showBlock, this);
        this.onEnableButtons(false);
        this.showBlock();
    },
    showBlock: function showBlock() {
        var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.blockInput) this.blockInput.active = isOn;
    },
    canSwitchMode: function canSwitchMode() {
        this.node.canClick = true;
    },
    start: function start() {
        if (this.animationBtn) {
            this.animationBtn.setAnimation(0, this.idleTrial, true);
        }
    },
    onPlayTrialButtonClicked: function onPlayTrialButtonClicked() {
        var _this = this;

        if (!this.node.canClick) return;
        this.playSoundClick();
        this._super();
        if (this.completeTrialSessionCount < 2) {
            this.displayRootNode.active = true;
            this.displayRootNode.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.8, 150), cc.fadeTo(0.8, 255))));
        } else {
            this.displayRootNode.stopAllActions();
            this.displayRootNode.opacity = 255;
        }
        if (this.playRealButton) {
            this.playRealButton.getComponent(cc.Button).interactable = false;
            this.node.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc(function () {
                _this.playRealButton.getComponent(cc.Button).interactable = true;
            })));
        }

        this.playAnimTrialButton();
    },
    playAnimTrialButton: function playAnimTrialButton() {
        if (this.animationBtn) {
            if (this.completeTrialSessionCount < 2) {
                this.animationBtn.setAnimation(0, this.enterTrial, false);
                this.animationBtn.addAnimation(0, this.idleReal, true);
            } else {
                this.animationBtn.setAnimation(0, this.enterTrial, false);
                this.animationBtn.addAnimation(0, this.noAnimReal, true);
            }
        }
    },
    onPlayRealButtonClicked: function onPlayRealButtonClicked() {
        var _this2 = this;

        if (!this.node.canClick) return;
        this.playSoundClick();
        this._super();
        if (this.playTrialButton) {
            this.playTrialButton.getComponent(cc.Button).interactable = false;
            this.node.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc(function () {
                _this2.playTrialButton.getComponent(cc.Button).interactable = true;
            })));
        }
        this.playAnimRealButton();
        this.completeTrialSessionCount++;
    },
    playAnimRealButton: function playAnimRealButton() {
        if (this.animationBtn) {
            if (this.completeTrialSessionCount < 2) {
                this.animationBtn.setAnimation(0, this.enterReal, false);
                this.animationBtn.addAnimation(0, this.idleTrial, true);
            } else {
                this.animationBtn.setAnimation(0, this.enterReal, false);
                this.animationBtn.addAnimation(0, this.idleTrial, false);
            }
        }
    },
    playSoundClick: function playSoundClick() {
        if (this.node.soundPlayer && this.node.soundPlayer.playSFXTrialButton) {
            this.node.soundPlayer.playSFXTrialButton();
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
        //# sourceMappingURL=TrialButtonv2.js.map
        