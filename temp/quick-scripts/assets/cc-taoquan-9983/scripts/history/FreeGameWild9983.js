(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/history/FreeGameWild9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e3345FvW+5O86IzKfsrT9y8', 'FreeGameWild9983', __filename);
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
        //# sourceMappingURL=FreeGameWild9983.js.map
        