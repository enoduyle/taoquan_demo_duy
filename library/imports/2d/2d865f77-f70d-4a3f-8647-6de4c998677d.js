"use strict";
cc._RF.push(module, '2d865939w1KP4ZHbeTJmGd9', 'GetDataStoreFromParentNode');
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