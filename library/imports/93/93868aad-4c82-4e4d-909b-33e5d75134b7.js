"use strict";
cc._RF.push(module, '93868qtTIJOTZCbM+XXUTS3', 'ToastInfo');
// cc-common/cc-share-v1/common/ToastInfo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        lblNotify: cc.Label,
        delayTime: 1.5
    },

    onLoad: function onLoad() {
        this.node.on("SHOW_TOAST_MESSAGE", this.showMessage.bind(this));
        this.node.active = false;
    },
    showMessage: function showMessage(val, anchor) {
        var _this = this;

        this.lblNotify.string = val;
        this.node.opacity = 255;
        this.node.active = true;
        this.node.stopAllActions();
        this.node.scale = 0.5;
        this.node.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.delayTime(this.delayTime), cc.callFunc(function () {
            _this.node.active = anchor ? true : false;
        })));
    },
    onDestroy: function onDestroy() {
        this.node.off("SHOW_TOAST_MESSAGE", this.showMessage.bind(this));
    },
    stopShowMessage: function stopShowMessage() {
        this.node.active = false;
    }
});

cc._RF.pop();