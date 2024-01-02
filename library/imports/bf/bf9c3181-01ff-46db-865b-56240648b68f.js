"use strict";
cc._RF.push(module, 'bf9c3GBAf9G24ZbViQGSLaP', 'SlotSymbol3D');
// cc-common/cc-slot-base-test/Table3D/scripts/SlotSymbol3D.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        staticSymbol: cc.Node,
        symbols: [cc.SpriteFrame],
        blurSymbols: [cc.SpriteFrame]
    },

    onLoad: function onLoad() {
        this.assets = convertAssetArrayToObject(this.symbols);
        this.blurAssets = convertAssetArrayToObject(this.blurSymbols);
        this.node.mainComponent = this;
        this.node.changeToSymbol = this.changeToSymbol.bind(this);
        this.node.changeToBlurSymbol = this.changeToBlurSymbol.bind(this);
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        var asset = this.assets[symbolName];
        this.symbolName = symbolName;
        if (this.assets[symbolName]) {
            this.node.symbol = symbolName;
            this.staticSymbol.opacity = 255;
            this.staticSymbol.getComponent(cc.Sprite).spriteFrame = asset;
        } else {
            this.staticSymbol.opacity = 0;
        }
    },
    changeToBlurSymbol: function changeToBlurSymbol(symbolName) {
        var name = 'blur_' + symbolName;
        if (this.blurAssets[name]) {
            this.node.symbol = symbolName;
            this.staticSymbol.opacity = 255;
            this.staticSymbol.getComponent(cc.Sprite).spriteFrame = this.blurAssets[name];
        } else {
            this.changeToSymbol(symbolName);
        }
    }
});

cc._RF.pop();