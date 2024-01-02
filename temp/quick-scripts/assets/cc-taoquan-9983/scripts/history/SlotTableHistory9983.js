(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/history/SlotTableHistory9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a02cd4tJfBI/oKax8foUfan', 'SlotTableHistory9983', __filename);
// cc-taoquan-9983/scripts/history/SlotTableHistory9983.js

"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

cc.Class({
    extends: require("SlotTableHistory"),

    properties: {
        normalSymbolNode: cc.Node,
        freeSymbolNode234: cc.Node,
        freeSymbolNode15: cc.Node,

        normalMultiplyNode: cc.Node,
        freeMultiplyNode: cc.Node,

        wildOptionNode: cc.Node
    },

    onLoad: function onLoad() {
        this._super();

        this.highCostSymbols = ["2", "3", "4", "5", "6"];
        this.lowCostSymbols = ["7", "8", "9", "10", "J", "Q"];

        this.isShowFree = false;
        this.listSymbol = [];
    },
    hideAllSymbolNode: function hideAllSymbolNode() {
        this.freeGame.active = false;
        this.normalGame.active = false;
    },
    renderResult: function renderResult(data) {
        var matrixResult = data.matrixResult.slice();
        if (data.mode == "free") {
            matrixResult.splice(15, 0, "1");
            matrixResult.splice(0, 0, "1");
        }

        this.hideAllSymbolNode();
        this.clearTable();
        this.betDenom = data.betDenom;
        this.currentMode = data.mode;

        this.subSymGrandNormal = [];
        this.subSymMajorNormal = [];
        this.subSymGrandFree = [];
        this.subSymMajorFree = [];
        var result = data.result;


        if (result && result.extraData) {
            if (result.extraData.subSymGrandNormal) {
                this.subSymGrandNormal = [].concat(_toConsumableArray(result.extraData.subSymGrandNormal));
            }
            if (result.extraData.subSymMajorNormal) {
                this.subSymMajorNormal = [].concat(_toConsumableArray(result.extraData.subSymMajorNormal));
            }
            if (result.extraData.subSymGrandFree) {
                this.subSymGrandFree = [].concat(_toConsumableArray(result.extraData.subSymGrandFree));
                for (var i = 0; i < this.subSymGrandFree.length; i++) {
                    if (this.subSymGrandFree[i] >= 15) {
                        this.subSymGrandFree[i] += 2;
                    } else {
                        this.subSymGrandFree[i] += 1;
                    }
                }
            }
            if (result.extraData.subSymMajorFree) {
                this.subSymMajorFree = [].concat(_toConsumableArray(result.extraData.subSymMajorFree));
                for (var _i = 0; _i < this.subSymMajorFree.length; _i++) {
                    if (this.subSymMajorFree[_i] >= 15) {
                        this.subSymMajorFree[_i] += 2;
                    } else {
                        this.subSymMajorFree[_i] += 1;
                    }
                }
            }
        }

        this.gameMode = data.mode;

        switch (data.mode) {
            case "normal":
                this.martrixFormat = this.node.config.TABLE_FORMAT;
                this.normalSymbolNode.active = true;
                this.freeSymbolNode234.active = false;
                this.freeSymbolNode15.active = false;
                this.isShowFree = false;
                this.normalGame.active = true;
                this.normalGame.opacity = 255;

                this.renderGameTable(matrixResult, this.martrixFormat);
                this.renderExtendData(data);

                break;
            case "free":
                this.martrixFormat = this.node.config.TABLE_FORMAT_FREE;
                this.normalSymbolNode.active = false;
                this.freeSymbolNode234.active = true;
                this.freeSymbolNode15.active = true;
                this.isShowFree = true;
                this.freeGame.active = true;
                this.freeGame.opacity = 255;

                this.renderGameTable(matrixResult, this.martrixFormat, data.selectedOption);
                this.renderExtendData(data);

                break;
        }

        this.normalMultiplyNode.emit("HIDE_FAST");
        this.freeMultiplyNode.emit("HIDE_FAST");
        if (data.paylines) {
            data.paylines = data.paylines.replace(/\s+/g, "");
            var stringArr = data.paylines.slice(1, data.paylines.length - 1).split(",");
            this.paylines = this.node.gSlotDataStore.convertPayLine(stringArr);
            this.paylineIndex = 0;
            this.showingPayline = true;

            if (result && result['metaData']) {
                var metaData = result.metaData;

                if (metaData) {
                    var wildFreeMulplier = metaData.wildFreeMulplier,
                        wildNormalMulplier = metaData.wildNormalMulplier;


                    if (wildNormalMulplier && wildNormalMulplier > 1) {
                        this.normalMultiplyNode.emit("ACTIVE_FAST", wildNormalMulplier, 7);
                    }
                    if (wildFreeMulplier && wildFreeMulplier > 1) {
                        this.freeMultiplyNode.emit("ACTIVE_FAST", wildFreeMulplier, data.selectedOption);
                    }
                }
            }
        }
    },
    getMultiplier: function getMultiplier(paylines) {
        var mul = 1;
        for (var i = 0; i < paylines.length; i++) {
            if (mul < Number(paylines[i].wildMultiplier)) {
                mul = Number(paylines[i].wildMultiplier);
            }
        }
        return mul;
    },
    renderGameTable: function renderGameTable(matrix, format) {
        var _this = this;

        var fgOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var symbolWidth = this.node.config.SYMBOL_WIDTH;
        var symbolHeight = this.node.config.SYMBOL_HEIGHT;

        var count = 0;
        if (fgOption > 0) {
            this.wildOptionNode.changeToSymbol(fgOption);
        }
        this.listSymbol = [];
        for (var i = 0; i < format.length; i++) {
            for (var j = 0; j < format[i]; j++) {
                var symbol = this.getSymbol(this.currentMode);
                if (this.gameMode == "normal") {
                    var startX = (-format.length / 2 + 0.5) * (symbolWidth - 10);
                    var startY = (format[i] / 2 - 0.5) * symbolHeight;

                    symbol.parent = this.normalSymbolNode;
                    symbol.setPosition(startX + i * (symbolWidth - 10), startY - j * symbolHeight);
                } else {
                    var _startX = (-format.length / 2 + 0.5) * (symbolWidth - 5);
                    var _startY = (format[i] / 2 - 0.5) * (symbolHeight - 10);

                    if (i == 0 || i == 4) {
                        // 1 5
                        symbol.parent = this.freeSymbolNode15;
                    } else {
                        // 2 3 4
                        symbol.parent = this.freeSymbolNode234;
                    }
                    symbol.setPosition(_startX + i * (symbolWidth - 5), _startY - j * (symbolHeight - 10));
                }
                symbol.removeSubSymbol();
                var symbolName = matrix[count];
                if (symbolName === 'K' && this.gameMode == "free" && fgOption) {
                    symbolName = "" + symbolName + fgOption;
                }
                symbol.changeToSymbol(symbolName);

                symbol.col = i;
                symbol.row = j;
                symbol.val = symbolName;

                if (this.highCostSymbols.indexOf(symbolName) > -1) {
                    symbol.zIndex = 3;
                } else if (this.lowCostSymbols.indexOf(symbolName) > -1) {
                    symbol.zIndex = 2;
                } else if (symbolName == "A") {
                    symbol.zIndex = 1;
                } else {
                    symbol.zIndex = 0;
                }
                this.listSymbol.push(symbol);
                count++;
            }
        }

        // add sub symbol
        if (this.gameMode == "normal") {
            if (this.subSymGrandNormal) {
                this.subSymGrandNormal.forEach(function (subSymbol) {
                    var symbol = _this.listSymbol[subSymbol];
                    symbol.showSmallSubSymbol('s1');
                });
            }
            if (this.subSymMajorNormal) {
                this.subSymMajorNormal.forEach(function (subSymbol) {
                    var symbol = _this.listSymbol[subSymbol];
                    symbol.showSmallSubSymbol('s2');
                });
            }
        } else {
            if (this.subSymGrandFree) {
                this.subSymGrandFree.forEach(function (subSymbol) {
                    var symbol = _this.listSymbol[subSymbol];
                    symbol.showSmallSubSymbol('s1');
                });
            }
            if (this.subSymMajorFree) {
                this.subSymMajorFree.forEach(function (subSymbol) {
                    var symbol = _this.listSymbol[subSymbol];
                    symbol.showSmallSubSymbol('s2');
                });
            }
        }
    },
    clearTable: function clearTable() {
        for (var i = 0; i < this.listSymbol.length; i++) {
            //   this.listSymbol[i].recoverSubSymbol();
        }
        this.clearSymbol(this.normalSymbolNode);
        this.clearSymbol(this.freeSymbolNode234);
        this.clearSymbol(this.freeSymbolNode15);
    },
    clearSymbol: function clearSymbol(symbolNode) {
        var pool = this.symbolPool;
        while (symbolNode.children.length > 0) {
            pool.put(symbolNode.children[0]);
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
        //# sourceMappingURL=SlotTableHistory9983.js.map
        