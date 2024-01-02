(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/localization/LocalizedLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9617LTPf5OMIsm+Pd5vjIx', 'LocalizedLabel', __filename);
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
        //# sourceMappingURL=LocalizedLabel.js.map
        