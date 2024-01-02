(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/animateNumberZoom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b572d6R5MCqsZXKClMhJB', 'animateNumberZoom', __filename);
// cc-common/cc-share-v1/common/viewComponent/animateNumberZoom.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        startSize: 0,
        maxSize: 1.2,
        minSize: 0.8,
        target: cc.Node
    },

    spawn: function spawn(text) {
        var _this = this;

        this.node.active = true;
        this.target.getComponent(cc.Label).string = "x" + text;
        this.target.scaleX = this.startSize;
        this.target.scaleY = this.startSize;
        this.target.runAction(cc.sequence(cc.scaleTo(0.5, this.maxSize, this.maxSize), cc.callFunc(function () {
            _this.target.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, _this.minSize, _this.minSize), cc.scaleTo(0.4, _this.maxSize, _this.maxSize))));
        })));
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
        //# sourceMappingURL=animateNumberZoom.js.map
        