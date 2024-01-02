"use strict";
cc._RF.push(module, '901a4/U+I1MmLW2e2VqkVlT', 'MLLabel');
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