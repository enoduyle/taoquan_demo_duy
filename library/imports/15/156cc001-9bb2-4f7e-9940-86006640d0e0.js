"use strict";
cc._RF.push(module, '156ccABm7JPfplAhgBmQNDg', 'SlotTableMergeSymbol9000');
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