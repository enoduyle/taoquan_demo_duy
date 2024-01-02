(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/SpineSkeletonDatabase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '177c7PExixPFZ62u3EnIvJW', 'SpineSkeletonDatabase', __filename);
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
        //# sourceMappingURL=SpineSkeletonDatabase.js.map
        