(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/SlotButton9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1c279lYZodLyYlq1uPx6Wgx', 'SlotButton9983', __filename);
// cc-taoquan-9983/scripts/common/SlotButton9983.js

"use strict";

cc.Class({
    extends: require('SlotButtonV2'),

    properties: {
        spinEffect: cc.Node
    },

    showSpin: function showSpin() {
        this._super();
        if (this.spinEffect) {
            this.spinEffect.emit("ON_SPIN_SHOW");
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
        //# sourceMappingURL=SlotButton9983.js.map
        