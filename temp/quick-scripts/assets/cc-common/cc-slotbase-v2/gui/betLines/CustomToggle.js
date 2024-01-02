(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/betLines/CustomToggle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7563fY7BQtF1bE6bfhzwB2Z', 'CustomToggle', __filename);
// cc-common/cc-slotbase-v2/gui/betLines/CustomToggle.js

"use strict";

cc.Class({
    extends: cc.Toggle,

    properties: {
        checkedSprite: cc.SpriteFrame,
        unCheckedSprite: cc.SpriteFrame
    },
    onLoad: function onLoad() {
        if (this.target) {
            this._unCheckedTarget = this.node.children[0];
        }

        if (this.checkMark) {
            this._checkedTarget = this.node.children[1];
        }
    },
    _updateCheckMark: function _updateCheckMark() {
        this._super();
        if (!this._unCheckedTarget) {
            if (this.target) {
                this._unCheckedTarget = this.node.children[0];
            }
        }

        if (!this._checkedTarget) {
            if (this.checkMark) {
                this._checkedTarget = this.node.children[1];
            }
        }
        this.target = this.isChecked ? this._checkedTarget : this._unCheckedTarget;
        this.normalSprite = this.isChecked ? this.checkedSprite : this.unCheckedSprite;
    },
    toggle: function toggle() {
        if (this.isChecked) return;
        this.isChecked = !this.isChecked;
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
        //# sourceMappingURL=CustomToggle.js.map
        