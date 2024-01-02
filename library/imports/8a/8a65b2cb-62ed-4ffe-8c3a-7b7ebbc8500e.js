"use strict";
cc._RF.push(module, '8a65bLLYu1P/ow6e367yFAO', 'VersionSlot');
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