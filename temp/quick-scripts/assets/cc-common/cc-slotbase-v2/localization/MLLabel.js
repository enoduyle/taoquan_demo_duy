(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/localization/MLLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '901a4/U+I1MmLW2e2VqkVlT', 'MLLabel', __filename);
// cc-common/cc-slotbase-v2/localization/MLLabel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        textId: ""
    },

    onLoad: function onLoad() {
        this.updateDefaultLanguage();
    },
    updateDefaultLanguage: function updateDefaultLanguage() {
        if (!this.node.config) {
            this.node.addComponent("GetGameConfig");
            this.updateLanguage();
        } else {
            this.updateLanguage();
        }
    },
    updateLanguage: function updateLanguage() {
        this.labelComp = this.node.getComponent(cc.Label);

        this.messageDialog = this.node.config['MESSAGE_DIALOG'];
        this.gameText = this.node.config['GAME_TEXT'];

        var content = this.messageDialog[this.textId] || this.gameText[this.textId] || "";
        if (content != "" && this.labelComp) this.labelComp.string = content;
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
        //# sourceMappingURL=MLLabel.js.map
        