(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/BlinkSpine9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c447aXXRq9Feq0XDSu+/AG2', 'BlinkSpine9983', __filename);
// cc-taoquan-9983/scripts/common/BlinkSpine9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        delay: 1,
        animationName: "animation",
        loop: false
    },
    onLoad: function onLoad() {
        //this.node.getComponent(sp.Skeleton).setAnimation(0, this.animationName, this.loop);
    },
    start: function start() {
        var _this = this;

        this.node.runAction(cc.sequence(cc.callFunc(function () {
            _this.node.getComponent(sp.Skeleton).setAnimation(0, _this.animationName, _this.loop);
        }), cc.delayTime(this.delay)).repeatForever());
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
        //# sourceMappingURL=BlinkSpine9983.js.map
        