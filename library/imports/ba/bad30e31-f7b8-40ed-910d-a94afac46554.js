"use strict";
cc._RF.push(module, 'bad304x97hA7ZENqUr6xGVU', 'CanvasScale');
// cc-common/cc-share-v1/common/viewComponent/CanvasScale.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var viewSize = cc.view.getVisibleSize();
        var ratio = viewSize.height / viewSize.width;
        var canvas = this.node.getComponent(cc.Canvas);
        if (ratio <= 0.5625) {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        } else {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        }
    }
});

cc._RF.pop();