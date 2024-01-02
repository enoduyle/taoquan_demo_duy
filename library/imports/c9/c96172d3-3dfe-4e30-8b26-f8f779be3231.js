"use strict";
cc._RF.push(module, 'c9617LTPf5OMIsm+Pd5vjIx', 'LocalizedLabel');
// cc-common/cc-slotbase-v2/localization/LocalizedLabel.js

'use strict';

var i18n = require('LanguageData');
cc.Class({
    extends: cc.Component,

    properties: {
        dataID: ''
    },

    onLoad: function onLoad() {
        this.label = this.node.getComponent(cc.Label);
        this.updateLabel();
    },
    updateLabel: function updateLabel() {
        if (!this.dataID) return;
        var localizedString = i18n.getLocalizedString(this.dataID);
        if (localizedString) {
            this.label.string = localizedString;
        }
    }
});

cc._RF.pop();