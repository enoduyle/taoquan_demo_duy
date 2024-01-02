"use strict";
cc._RF.push(module, '1cb6aLKkHZELqkWpzM/A2TA', 'gSlotMiniGameScript');
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