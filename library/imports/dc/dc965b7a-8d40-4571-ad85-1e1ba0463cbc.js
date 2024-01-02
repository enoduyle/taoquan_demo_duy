"use strict";
cc._RF.push(module, 'dc965t6jUBFca2FHhugRjy8', 'AppearCenterScreen');
// cc-common/cc-share-v1/common/viewComponent/AppearCenterScreen.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var viewSize = cc.view.getVisibleSize();
        var newPos = this.node.convertToWorldSpaceAR(this.node.position);
        this.node.setPosition(cc.v2(viewSize.width / 2 - newPos.x, viewSize.height / 2 - newPos.y));
    }
});

cc._RF.pop();