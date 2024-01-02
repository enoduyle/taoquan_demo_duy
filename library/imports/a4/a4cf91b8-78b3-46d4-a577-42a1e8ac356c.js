"use strict";
cc._RF.push(module, 'a4cf9G4eLNG1KV3QqHorDVs', 'SlotReelTransformSymbol9000');
// cc-common/cc-slotbase-v2/g9000/SlotReelTransformSymbol9000.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function onLoad() {
        this.node.hasBigWild = true;
    },
    start: function start() {
        this.node.transformSymbol = this.transformSymbol.bind(this);
    },
    transformSymbol: function transformSymbol(symbolValue, col, row) {
        var newSymbol = symbolValue;
        if (symbolValue == "K") {
            if (col == 1) {
                newSymbol = "KST";
            } else if (col == 3) {
                newSymbol = "KTT";
            } else {
                newSymbol = "KMN";
            }
        }

        this.node.parent.bigSymbols.map(function (bigSymbol) {
            if (row >= bigSymbol.row && row < bigSymbol.row + bigSymbol.height && col >= bigSymbol.col && col < bigSymbol.col + bigSymbol.width) {
                newSymbol = "";
            }
            if (row == bigSymbol.row && col == bigSymbol.col) {
                newSymbol = bigSymbol.value;
            }
        });

        return newSymbol;
    }
});

cc._RF.pop();