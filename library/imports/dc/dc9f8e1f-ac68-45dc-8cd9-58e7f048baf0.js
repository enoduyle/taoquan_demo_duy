"use strict";
cc._RF.push(module, 'dc9f84frGhF3IzZWOfwSLrw', 'SlotSymbolPaylinev2');
// cc-common/cc-slotbase-v2/slotGame/table/SlotSymbolPaylinev2.js

'use strict';

cc.Class({
    extends: require("SlotSymbolPayline"),

    properties: {
        spineNode: cc.Node,
        winEffect: cc.Node,
        spineList: {
            default: [],
            type: require('SlotCustomDataType').SymbolSpineDefine
        }
    },

    onLoad: function onLoad() {
        this._super();
        this.node.init = this.init.bind(this);
        this.animation = this.spineNode.getComponent(sp.Skeleton);
        this.currentScale = this.staticSymbol.scale;
    },
    init: function init(symbolName) {
        var asset = this.assets[symbolName];
        this.node.symbol = symbolName; // for easy debug
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
        } else {
            this.spineNode.active = false;
        }
        this.staticSymbol.opacity = 0;
        this.spineNode.opacity = 0;
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        this.staticSymbol.active = false;
        this.spineNode.active = false;
        this.havingAnim = false;
        this.node.symbol = symbolName;

        var symbolStatic = this.assets[symbolName];
        this.symbolAnim = this.findSymbolSpineData(symbolName);

        if (this.symbolAnim) {
            this.animation.skeletonData = this.symbolAnim.spine;
            this.havingAnim = true;
        } else if (this.assets[symbolName]) {
            this.staticSymbol.active = true;
            this.staticSymbol.getComponent(cc.Sprite).spriteFrame = symbolStatic;
        } else {
            cc.log('Must set anim or static for symbol ' + symbolName);
        }

        this.staticSymbol.opacity = 0;
        this.spineNode.opacity = 0;
    },
    playAnimation: function playAnimation() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var isNearWin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var NORMAL_DURATION = 2;
        if (this.havingAnim) {
            this.spineNode.opacity = 255;
            this.spineNode.active = true;
            this.staticSymbol.opacity = 0;
            if (this.animation.findAnimation("animation")) {
                this.animation.setAnimation(0, "animation", isNearWin);
                this.animation.timeScale = NORMAL_DURATION / duration;
            } else {
                cc.warn("wrong animation name on spine: ", this.animation.skeletonData.name);
            }
        } else {
            this.staticSymbol.opacity = 255;
            this.staticSymbol.active = true;
            this.spineNode.opacity = 0;
            var seq = cc.repeat(cc.sequence(cc.scaleTo(0.2, 1.05 * this.currentScale), cc.scaleTo(0.2, 0.95 * this.currentScale), cc.scaleTo(0.2, 1 * this.currentScale)), 2);
            this.staticSymbol.runAction(seq);
        }
    },
    stopAnimation: function stopAnimation() {
        this.staticSymbol.stopAllActions();
        this.staticSymbol.scale = 1;
        this.winEffect.scale = 1;
        this.staticSymbol.active = false;
        this.spineNode.active = false;
    },
    findSymbolSpineData: function findSymbolSpineData(symbolName) {
        return this.spineList.find(function (spine) {
            return spine.name === symbolName;
        }) || null;
    }
});

cc._RF.pop();