"use strict";
cc._RF.push(module, 'e3345FvW+5O86IzKfsrT9y8', 'FreeGameWild9983');
// cc-taoquan-9983/scripts/history/FreeGameWild9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        symbols: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    onLoad: function onLoad() {
        this.node.changeToSymbol = this.changeToSymbol.bind(this);
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        this.node.active = false;
        if (this.symbols[symbolName - 1]) {
            this.node.active = true;
            this.node.getComponent(cc.Sprite).spriteFrame = this.symbols[symbolName - 1];
        }
    }
});

cc._RF.pop();