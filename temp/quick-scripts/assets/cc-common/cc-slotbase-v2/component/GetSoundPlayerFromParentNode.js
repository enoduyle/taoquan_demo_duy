(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GetSoundPlayerFromParentNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '55cefQ6n8VFlIyccFMYQhsZ', 'GetSoundPlayerFromParentNode', __filename);
// cc-common/cc-slotbase-v2/component/GetSoundPlayerFromParentNode.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        if (this.node.parent.soundPlayer) {
            this.node.soundPlayer = this.node.parent.soundPlayer;
        } else {
            this.node.soundPlayer = this.node;
            cc.error("There is no sound player from parent");
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
        //# sourceMappingURL=GetSoundPlayerFromParentNode.js.map
        