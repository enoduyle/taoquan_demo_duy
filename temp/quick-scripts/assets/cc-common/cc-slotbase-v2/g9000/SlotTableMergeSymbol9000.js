(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/SlotTableMergeSymbol9000.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '156ccABm7JPfplAhgBmQNDg', 'SlotTableMergeSymbol9000', __filename);
// cc-common/cc-slotbase-v2/g9000/SlotTableMergeSymbol9000.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function start() {
        this.node.on("CHECK_MEGA_SYMBOL", this.mergeSymbol, this);
    },
    mergeSymbol: function mergeSymbol(symbolValue, col, row) {
        if (symbolValue == "K") {
            if (row == 1 && col == 1) {
                this.node.bigSymbols.push({
                    value: "wildSymbol_KST",
                    width: 1,
                    height: 3,
                    row: row,
                    col: col
                });
            }
            if (row == 1 && col == 3) {
                this.node.bigSymbols.push({
                    value: "wildSymbol_KTT",
                    width: 1,
                    height: 3,
                    row: row,
                    col: col
                });
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
        //# sourceMappingURL=SlotTableMergeSymbol9000.js.map
        