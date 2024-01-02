"use strict";
cc._RF.push(module, 'fa3d7tZe/ZFjp638pcevsZF', 'MLRichText');
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