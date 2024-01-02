(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotSymbolPayline.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c67136pJCJEKLi2pD1QCcUN', 'ExtendSlotSymbolPayline', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotSymbolPayline.js

'use strict';

var DIM_COLOR = new cc.Color(100, 100, 100);
var WHITE_COLOR = cc.Color.WHITE;

cc.Class({
    extends: require('SlotSymbolPaylinev2'),

    onLoad: function onLoad() {
        this.staticSymbol = { scale: 1 };
        this.node.playSpecialSymbolAppear = this.playSpecialSymbolAppear.bind(this);
        if (this.winEffect) {
            this.winEffect.active = false;
        }
        this._super();
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        this.spineNode.active = false;
        this.havingAnim = false;
        this._symbolName = symbolName;
        this.node.symbol = symbolName;
        this._isPlaying = false;
        this.symbolAnim = this.findSymbolSpineData(symbolName);

        if (this.symbolAnim) {
            this.animation.skeletonData = this.symbolAnim.spine;
            this.havingAnim = true;
        }
        this.node.isSymbolAnimated = this.havingAnim;
    },
    playAnimation: function playAnimation() {
        if (this.havingAnim && !this._isPlaying) {
            this._isPlaying = true;
            this.spineNode.opacity = 255;
            this.spineNode.active = true;
            if (this.animation.findAnimation('animation')) {
                this.animation.setAnimation(0, "animation", true);
            } else {
                cc.warn("wrong animation name on spine: ", this.animation.skeletonData.name);
            }
        }
    },
    playSpecialSymbolAppear: function playSpecialSymbolAppear() {
        if (!this.havingAnim) return;
        this.spineNode.opacity = 255;
        this.spineNode.active = true;
        if (this.animation.findAnimation('Appear')) {
            this.animation.setAnimation(0, "Appear", false);
            this.animation.addAnimation(0, "Idle", true);
        }if (this.animation.findAnimation('animation')) {
            this.animation.setAnimation(0, "animation", true);
        } else {
            cc.warn("wrong animation name on spine: ", this.animation.skeletonData.name);
        }
    },
    stopAnimation: function stopAnimation() {
        this.spineNode.active = false;
    },
    blinkHighlight: function blinkHighlight() {
        this._isPlaying = false;
        this.spineNode.active = false;
    },
    enableHighlight: function enableHighlight() {
        this.spineNode.color = WHITE_COLOR;
    },
    disableHighlight: function disableHighlight() {
        if (!this._isPlaying && !this.node.isSpecialSymbol) {
            this.spineNode.active = false;
        }
        this.spineNode.color = DIM_COLOR;
    },
    reset: function reset() {
        this.spineNode.color = WHITE_COLOR;
        this.node.isSpecialSymbol = false;
        this._isPlaying = false;
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
        //# sourceMappingURL=ExtendSlotSymbolPayline.js.map
        