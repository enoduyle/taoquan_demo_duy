"use strict";
cc._RF.push(module, '17710Sfo/xOPqTx4LAzT6xT', 'ExtendGameModeBasic');
// cc-common/cc-slot-base-test/ExtendScripts/ExtendGameModeBasic.js

'use strict';

cc.Class({
    extends: require('GameModeBasic'),

    onLoad: function onLoad() {
        this.node.guiMgr = this;
        this._super();
    }
});

cc._RF.pop();