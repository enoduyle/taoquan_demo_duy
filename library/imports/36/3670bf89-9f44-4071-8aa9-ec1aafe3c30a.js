"use strict";
cc._RF.push(module, '3670b+Jn0RAcYqp7Bqv48MK', 'TrialButton');
// cc-common/cc-slotbase-v2/trial/TrialButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        playTrialButton: cc.Node,
        playRealButton: cc.Node,
        displayRootNode: cc.Node
    },

    onLoad: function onLoad() {
        if (this.playTrialButton) {
            this.playTrialButton.active = true;
        }
        if (this.playRealButton) {
            this.playRealButton.active = false;
        }

        if (this.displayRootNode) {
            this.displayRootNode.active = false;
        }
        this.node.on("ENABLE_BUTTONS", this.onEnableButtons, this);
        this.buttons = this.node.getComponentsInChildren(cc.Button);
        this.node.setPlayDemoMode = this.setPlayDemoMode.bind(this);
    },
    setPlayDemoMode: function setPlayDemoMode() {
        this.playingDemo = true;
        if (this.playRealButton) {
            this.playRealButton.active = false;
        }

        if (this.playTrialButton) {
            this.playTrialButton.active = true;
        }
        this.onEnableButtons(false);
    },
    onPlayTrialButtonClicked: function onPlayTrialButtonClicked() {
        if (this.playingDemo) return;
        if (this.playRealButton) {
            this.playRealButton.active = true;
        }

        if (this.playTrialButton) {
            this.playTrialButton.active = false;
        }

        if (this.displayRootNode) {
            this.displayRootNode.active = true;
        }
    },
    onPlayRealButtonClicked: function onPlayRealButtonClicked() {
        if (this.playingDemo) return;
        cc.warn('Back To Real Mode');
        if (this.playTrialButton) {
            this.playTrialButton.active = true;
        }

        if (this.playRealButton) {
            this.playRealButton.active = false;
        }

        if (this.displayRootNode) {
            this.displayRootNode.active = false;
        }
    },
    onEnableButtons: function onEnableButtons(isOn) {
        if (this.playingDemo) isOn = false;
        cc.log('_showTrialButtons', isOn);
        this.buttons.forEach(function (bt) {
            bt.interactable = isOn;
        });
    }
});

cc._RF.pop();