(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GetDataStoreFromParentNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2d865939w1KP4ZHbeTJmGd9', 'GetDataStoreFromParentNode', __filename);
// cc-common/cc-slotbase-v2/component/GetDataStoreFromParentNode.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        if (this.node.parent.gSlotDataStore) {
            this.node.gSlotDataStore = this.node.parent.gSlotDataStore;
        } else {
            cc.error("There is no datastore from parent");
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
        //# sourceMappingURL=GetDataStoreFromParentNode.js.map
        