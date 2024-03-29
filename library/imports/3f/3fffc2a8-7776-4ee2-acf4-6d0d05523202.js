"use strict";
cc._RF.push(module, '3fffcKod3ZO4qz0bQ0FUjIC', 'SlotSymbolPayline');
// cc-common/cc-slotbase-v2/slotGame/table/SlotSymbolPayline.js

"use strict";

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        staticSymbol: cc.Node,
        symbols: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    onLoad: function onLoad() {
        this.assets = convertAssetArrayToObject(this.symbols);

        this.node.mainComponent = this;
        this.node.changeToSymbol = this.changeToSymbol.bind(this);
        this.node.playAnimation = this.playAnimation.bind(this);
        this.node.stopAnimation = this.stopAnimation.bind(this);
        this.node.blinkHighlight = this.blinkHighlight.bind(this);
        this.node.enableHighlight = this.enableHighlight.bind(this);
        this.node.disableHighlight = this.disableHighlight.bind(this);
        this.node.reset = this.reset.bind(this);

        this.node.on("CHANGE_TO_SYMBOL", this.changeToSymbol, this);
        this.node.on("PLAY_ANIMATION", this.playAnimation, this);
        this.node.on("STOP_ANIMATION", this.stopAnimation, this);
        this.node.on("BLINK_HIGHLIGHT", this.blinkHighlight, this);
        this.node.on("ENABLE_HIGHLIGHT", this.enableHighlight, this);
        this.node.on("DISABLE_HIGHLIGHT", this.disableHighlight, this);
        this.node.on("RESET", this.reset, this);
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        var asset = this.assets[symbolName];
        if (this.assets[symbolName]) {
            this.node.symbol = symbolName; // for easy debug
            this.staticSymbol.opacity = 255;
            this.staticSymbol.getComponent(cc.Sprite).spriteFrame = asset;
            this.staticSymbol.width = asset.getOriginalSize().width;
            this.staticSymbol.height = asset.getOriginalSize().height;
        } else {
            this.staticSymbol.opacity = 0;
        }
    },
    playAnimation: function playAnimation() {},
    stopAnimation: function stopAnimation() {},
    blinkHighlight: function blinkHighlight(duration, blinks) {
        this.node.opacity = 255;
        var action = cc.blink(duration * blinks, blinks);
        this.staticSymbol.active = true;
        this.staticSymbol.runAction(action);
    },
    enableHighlight: function enableHighlight() {
        this.node.opacity = 255;
    },
    disableHighlight: function disableHighlight() {
        this.node.opacity = 0;
    },
    reset: function reset() {
        this.node.opacity = 255;
    }
});

cc._RF.pop();