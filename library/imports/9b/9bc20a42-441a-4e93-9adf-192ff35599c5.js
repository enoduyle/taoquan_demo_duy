"use strict";
cc._RF.push(module, '9bc20pCRBpOk5rfGS/zVZnF', 'GetConfigFromParentNode');
// cc-common/cc-slotbase-v2/component/GetConfigFromParentNode.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        if (this.node.parent.config) {
            this.node.config = this.node.parent.config;
        } else {
            cc.error("There is no config from parent");
        }
    }
});

cc._RF.pop();