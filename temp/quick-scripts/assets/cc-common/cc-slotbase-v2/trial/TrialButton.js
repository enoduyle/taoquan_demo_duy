(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/trial/TrialButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3670b+Jn0RAcYqp7Bqv48MK', 'TrialButton', __filename);
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
        //# sourceMappingURL=TrialButton.js.map
        