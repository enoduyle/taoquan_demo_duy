"use strict";
cc._RF.push(module, 'bfd0bhgWrFDvLUBBsHmKOYY', 'toggle');
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