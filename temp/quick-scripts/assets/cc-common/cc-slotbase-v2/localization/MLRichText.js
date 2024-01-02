(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/localization/MLRichText.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa3d7tZe/ZFjp638pcevsZF', 'MLRichText', __filename);
// cc-common/cc-slotbase-v2/localization/MLRichText.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        textAsset: {
            type: cc.Asset,
            default: null
        },
        isAutoChange: true
    },

    onLoad: function onLoad() {
        this.updateDefaultLanguage();
    },
    updateDefaultLanguage: function updateDefaultLanguage() {
        if (!this.node.config) {
            var config = this.node.addComponent("GetGameConfig");
            this.updateLanguage();
        } else {
            this.updateLanguage();
        }
    },
    updateLanguage: function updateLanguage() {
        if (!this.isAutoChange) return;
        this.richTextComp = this.node.getComponent(cc.RichText);
        if (this.richTextComp) {
            this.richTextComp.string = this.textAsset.text;
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
        //# sourceMappingURL=MLRichText.js.map
        