(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/ToastInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '93868qtTIJOTZCbM+XXUTS3', 'ToastInfo', __filename);
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
        //# sourceMappingURL=ToastInfo.js.map
        