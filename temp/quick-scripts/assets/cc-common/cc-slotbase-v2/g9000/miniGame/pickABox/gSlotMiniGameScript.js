(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/gSlotMiniGameScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1cb6aLKkHZELqkWpzM/A2TA', 'gSlotMiniGameScript', __filename);
// cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/gSlotMiniGameScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function onLoad() {
        this.node.gSlotMiniGameScript = this;
    },
    attachEvent: function attachEvent(data, callbackMiniGame) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "gSlotMiniGameScript";
        clickEventHandler.handler = "callback";
        // clickEventHandler.customEventData = "foobar";
        this.data = data;
        this.callbackMiniGame = callbackMiniGame;

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function callback() {
        this.callbackMiniGame(this.data);
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
        //# sourceMappingURL=gSlotMiniGameScript.js.map
        