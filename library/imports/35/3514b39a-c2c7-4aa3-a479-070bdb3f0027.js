"use strict";
cc._RF.push(module, '3514bOawsdKo6R5BwvbPwAn', 'SlotSymbolPaylineIntro');
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