(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/CanvasScale.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bad304x97hA7ZENqUr6xGVU', 'CanvasScale', __filename);
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
        //# sourceMappingURL=CanvasScale.js.map
        