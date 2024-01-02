(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/AnimTwirlAround9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3fe37eilZD+pK9lkkhX10J', 'AnimTwirlAround9983', __filename);
// cc-taoquan-9983/scripts/common/AnimTwirlAround9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        duration: 2
    },
    onLoad: function onLoad() {
        cc.tween(this.node).by(this.duration, { angle: -360 }).repeatForever().start();
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
        //# sourceMappingURL=AnimTwirlAround9983.js.map
        