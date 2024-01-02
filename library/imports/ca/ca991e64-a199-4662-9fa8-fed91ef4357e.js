"use strict";
cc._RF.push(module, 'ca9915koZlGYp+o/tke9DV+', 'ScaleAlignViewport');
// cc-common/cc-share-v1/common/viewComponent/ScaleAlignViewport.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var viewSize = cc.view.getVisibleSize();
        var ratioX = viewSize.height / this.node.height;
        var ratioY = viewSize.width / this.node.width;
        if (ratioX > ratioY) {
            this.node.scale = ratioX;
        } else {
            this.node.scale = ratioY;
        }
    }
});

cc._RF.pop();