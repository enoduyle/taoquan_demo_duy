(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/FadeOutNumber9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6aa3e8eSgdMX5QxSMKG5Knz', 'FadeOutNumber9983', __filename);
// cc-taoquan-9983/scripts/common/FadeOutNumber9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        labelWinAmount: cc.Label
    },

    onLoad: function onLoad() {
        this.node.on("FADE_OUT_NUMBER", this.fadeOutNumber, this);
        this.node.on("FADE_OUT_NUMBER_FAST", this.fadeOutNumberFast, this);
        this.node.on("STOP_FADING", this.stopFading, this);
    },
    fadeOutNumberFast: function fadeOutNumberFast() {
        if (!this.labelWinAmount.string) return;
        if (this.fadeAction != null) {
            this.node.stopAction(this.fadeAction);
            this.fadeAction = null;
        }
        this.node.isFading = false;
        this.node.emit("RESET_NUMBER");
        this.labelWinAmount.node.opacity = 255;
    },
    fadeOutNumber: function fadeOutNumber() {
        var _this = this;

        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (!this.labelWinAmount.string) return;
        this.node.isFading = true;

        this.fadeAction = cc.sequence(cc.fadeOut(time), cc.callFunc(function () {
            _this.node.isFading = false;
            _this.node.emit("RESET_NUMBER");
            _this.labelWinAmount.node.opacity = 255;
        }));
        this.labelWinAmount.node.runAction(this.fadeAction);
    },
    stopFading: function stopFading() {
        if (this.fadeAction != null && this.node.isFading) {
            this.node.stopAction(this.fadeAction);
            this.fadeAction = null;
            this.node.isFading = false;
            this.labelWinAmount.node.opacity = 255;
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
        //# sourceMappingURL=FadeOutNumber9983.js.map
        