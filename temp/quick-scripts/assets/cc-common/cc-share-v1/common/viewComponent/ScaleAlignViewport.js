(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/ScaleAlignViewport.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca9915koZlGYp+o/tke9DV+', 'ScaleAlignViewport', __filename);
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
        //# sourceMappingURL=ScaleAlignViewport.js.map
        