(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/FadeTransition.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '459e4yn81hL9aeE2bn+RjBV', 'FadeTransition', __filename);
// cc-common/cc-slotbase-v2/component/FadeTransition.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        speed: 1
    },
    start: function start() {
        this.node.on("GAME_HIDE", this.fadeOut, this);
        this.node.on("GAME_SHOW", this.fadeIn, this);
    },
    fadeOut: function fadeOut(callback) {
        this.node.opacity = 255;
        this.node.runAction(cc.sequence(cc.fadeOut(this.speed), cc.callFunc(callback)));
    },
    fadeIn: function fadeIn(callback) {
        this.node.opacity = 0;
        this.node.runAction(cc.sequence(cc.fadeIn(this.speed), cc.callFunc(callback)));
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
        //# sourceMappingURL=FadeTransition.js.map
        