(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/toggle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bfd0bhgWrFDvLUBBsHmKOYY', 'toggle', __filename);
// cc-common/cc-share-v1/common/viewComponent/toggle.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        spriteActive: {
            type: cc.SpriteFrame,
            default: null
        },
        spriteInactive: {
            type: cc.SpriteFrame,
            default: null
        }
    },
    check: function check() {
        this.getComponent(cc.Sprite).spriteFrame = this.spriteActive;
    },
    uncheck: function uncheck() {
        this.getComponent(cc.Sprite).spriteFrame = this.spriteInactive;
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
        //# sourceMappingURL=toggle.js.map
        