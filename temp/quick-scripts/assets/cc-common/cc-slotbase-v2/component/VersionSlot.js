(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/VersionSlot.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a65bLLYu1P/ow6e367yFAO', 'VersionSlot', __filename);
// cc-common/cc-slotbase-v2/component/VersionSlot.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        versionFile: {
            type: cc.Asset,
            default: null
        },
        versionText: cc.Label
    },

    onLoad: function onLoad() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            IS_PRODUCTION = _loadConfigAsync$getC.IS_PRODUCTION;

        if (IS_PRODUCTION) {
            this.node.active = false;
        }
    },
    start: function start() {
        cc.log(this.versionFile);
        this.versionText.string = this.versionFile.json.version;
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
        //# sourceMappingURL=VersionSlot.js.map
        