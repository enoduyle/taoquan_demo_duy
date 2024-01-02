(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/ScrollViewOptimize.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d2bbLurztAeKS27i8o63wP', 'ScrollViewOptimize', __filename);
// cc-common/cc-share-v1/common/ScrollViewOptimize.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        view: cc.Node,
        content: cc.Node
    },

    update: function update() {
        var viewRect = cc.rect(-this.content.x - this.view.width * this.view.anchorX, -this.content.y - this.view.height * this.view.anchorY, this.view.width, this.view.height);
        for (var i = 0; i < this.content.children.length; i++) {
            var node = this.content.children[i];
            if (viewRect.intersects(node.getBoundingBox())) {
                node.opacity = 255;
            } else {
                node.opacity = 0;
            }
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
        //# sourceMappingURL=ScrollViewOptimize.js.map
        