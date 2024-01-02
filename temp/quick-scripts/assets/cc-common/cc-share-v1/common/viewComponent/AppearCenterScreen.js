(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/AppearCenterScreen.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc965t6jUBFca2FHhugRjy8', 'AppearCenterScreen', __filename);
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
        //# sourceMappingURL=AppearCenterScreen.js.map
        