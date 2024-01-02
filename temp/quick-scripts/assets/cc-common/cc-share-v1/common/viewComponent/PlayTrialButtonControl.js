(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/PlayTrialButtonControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '15c39HxubZMvqYfNyfnMEyY', 'PlayTrialButtonControl', __filename);
// cc-common/cc-share-v1/common/viewComponent/PlayTrialButtonControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playTrialButton: cc.Node,
        playRealButton: cc.Node,
        buttonRoot: cc.Node,
        displayRootNode: cc.Node,
        buttonIsHideIfDisable: true
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
    },
    triggerTrialMode: function triggerTrialMode() {
        this.node.emit("TRIAL_TRIGGER");
    },
    onPlayTrialButtonClicked: function onPlayTrialButtonClicked() {
        if (this.playRealButton) {
            this.playRealButton.active = true;
        }

        if (this.playTrialButton) {
            this.playTrialButton.active = false;
        }

        if (this.displayRootNode) {
            this.displayRootNode.active = true;
        }

        this.triggerTrialMode();
    },
    onPlayRealButtonClicked: function onPlayRealButtonClicked() {
        if (this.playTrialButton) {
            this.playTrialButton.active = true;
        }

        if (this.playRealButton) {
            this.playRealButton.active = false;
        }

        if (this.displayRootNode) {
            this.displayRootNode.active = false;
        }

        this.triggerTrialMode();
    },
    onEnableButtons: function onEnableButtons(isOn) {
        if (this.buttonIsHideIfDisable == true) {
            if (this.buttonRoot) {
                this.buttonRoot.active = isOn;
            }
        } else {
            if (this.playTrialButton) {
                this.playTrialButton.getComponent(cc.Button).interactable = isOn;
            }
            if (this.playRealButton) {
                this.playRealButton.getComponent(cc.Button).interactable = isOn;
            }
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
        //# sourceMappingURL=PlayTrialButtonControl.js.map
        