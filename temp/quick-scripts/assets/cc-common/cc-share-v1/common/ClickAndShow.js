(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/ClickAndShow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6759cNbR+tPBKXN4o0zmLB1', 'ClickAndShow', __filename);
// cc-common/cc-share-v1/common/ClickAndShow.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        panel: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on("SHOW_PANEL", this.enter, this);
        this.node.on("HIDE_PANEL", this.exit, this);
        this.node.on("CLOSE_PANEL", this.closePanel, this);
        this.panel.active = false;
        this.fadeSpeed = 0.2;
        this.isShowing = false;
    },
    enter: function enter() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.isShowing = true;
        this.panel.active = true;
        this.panel.runAction(cc.fadeIn(this.fadeSpeed));
    },
    exit: function exit() {
        if (!this.isShowing) return;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.closePanel();
    },
    closePanel: function closePanel() {
        var _this = this;

        this.isShowing = false;
        this.panel.runAction(cc.sequence(cc.fadeOut(this.fadeSpeed), cc.callFunc(function () {
            _this.panel.active = false;
        })));
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
        //# sourceMappingURL=ClickAndShow.js.map
        