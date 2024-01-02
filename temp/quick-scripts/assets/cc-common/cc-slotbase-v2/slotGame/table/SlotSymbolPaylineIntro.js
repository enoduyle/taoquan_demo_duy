(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotSymbolPaylineIntro.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3514bOawsdKo6R5BwvbPwAn', 'SlotSymbolPaylineIntro', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotSymbolPaylineIntro.js

"use strict";

cc.Class({
    extends: require("SlotSymbolPaylinev2"),

    onLoad: function onLoad() {
        this._super();
        this.animation = this.spineNode.getComponent(sp.Skeleton);
    },
    init: function init(symbolName) {
        var asset = this.assets[symbolName];
        this.symbolName = symbolName;
        var skeData = this.findSymbolSpineData(symbolName);
        this.havingAnim = skeData != undefined;
        if (asset) {
            this.staticSymbol.active = true;
            this.staticSymbol.getComponent(cc.Sprite).spriteFrame = asset;
        } else {
            this.staticSymbol.active = false;
        }
        if (skeData) {
            this.spineNode.active = true;
            this.spineNode.getComponent(sp.Skeleton).skeletonData = skeData.spine;
            this.animation = this.spineNode.getComponent(sp.Skeleton);
        } else {
            this.spineNode.active = false;
        }
    },
    playAnimation: function playAnimation() {
        var isLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (this.havingAnim) {
            this.isPlaying = true;
            this.spineNode.active = true;
            this.animation.setAnimation(0, "animation", isLoop);
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
        //# sourceMappingURL=SlotSymbolPaylineIntro.js.map
        