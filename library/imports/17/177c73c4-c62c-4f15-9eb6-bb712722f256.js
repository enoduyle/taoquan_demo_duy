"use strict";
cc._RF.push(module, '177c7PExixPFZ62u3EnIvJW', 'SpineSkeletonDatabase');
// cc-common/cc-slotbase-v2/component/SpineSkeletonDatabase.js

'use strict';

var _require = require('SlotCustomDataType'),
    SymbolSpineDefine = _require.SymbolSpineDefine;

cc.Class({
    extends: cc.Component,

    properties: {
        spineDataList: {
            type: SymbolSpineDefine,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable: function onEnable() {
        var customEvt = new cc.Event.EventCustom('SET_UP_SPINE_DATABASE', true);
        customEvt.detail = { spineSkeletonDatabase: this };
        this.node.dispatchEvent(customEvt);
    },
    onDisable: function onDisable() {
        var customEvt = new cc.Event.EventCustom('SET_UP_SPINE_DATABASE', true);
        customEvt.detail = { spineSkeletonDatabase: null };
        this.node.dispatchEvent(customEvt);
    },
    getSpineSkeletonData: function getSpineSkeletonData(spineName) {
        for (var i = 0; i < this.spineDataList.length; i++) {
            if (this.spineDataList[i].name === spineName) {
                return this.spineDataList[i].spine;
            }
        }
        return null;
    }
});

cc._RF.pop();