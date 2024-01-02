(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotTablePayline.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f8879cZGNpJJqNTGwQtKLHj', 'SlotTablePayline', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotTablePayline.js

"use strict";

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        paylineHolderNode: cc.Node,
        tablePaylineInfo: cc.Node,
        paylineNormalSymbol: cc.Prefab,
        paylineSpecialSymbols: {
            type: cc.Prefab,
            default: []
        }
    },
    onLoad: function onLoad() {
        this.node.hasPayline = false;
        if (!this.tablePaylineInfo) this.tablePaylineInfo = this.node;
        this.paylinesMatrix = [];
        this.paylineSpecial = convertAssetArrayToObject(this.paylineSpecialSymbols);
        this.node.on("SETUP_PAYLINES", this.setupPaylines, this);
        this.node.on("BLINK_ALL_NORMAL_PAYLINES", this.blinkHighlightPaylines, this);
        this.node.on("SHOW_ALL_NORMAL_PAYLINES", this.showAllNormalPayLines, this);
        this.node.on("SHOW_SCATTER_PAYLINE", this.showScatterPayLine, this);
        this.node.on("SHOW_BONUS_PAYLINE", this.showBonusPayLine, this);
        this.node.on("SHOW_WILD_PAYLINE", this.showWildPayLine, this);
        this.node.on("CLEAR_PAYLINES", this.clearPaylines, this);
    },
    start: function start() {
        this.node.hasPayline = true;
    },
    setupPaylines: function setupPaylines(matrix, payLines) {
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.paylineHolderNode.active = true;
        this.payLineNormals = payLines;
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.bonusHolderNode = [];
        this.wildHolderNode = [];

        for (var col = 0; col < this.node.reels.length; ++col) {
            this.paylinesMatrix[col] = [];
            for (var row = 1; row < this.node.reels[col].showSymbols.length - 1; ++row) {
                var symbol = this.node.reels[col].showSymbols[row];
                var paylineSymbol = this.createPaylineSymbol(this.node.reels[col], symbol.symbol, col, row);
                var payline = {
                    symbol: symbol, paylineSymbol: paylineSymbol
                };
                this.paylinesMatrix[col][row - 1] = payline;
                if (symbol.symbol == "A") {
                    this.scatterHolderNode.push(payline);
                } else if (symbol.symbol == "R") {
                    this.bonusHolderNode.push(payline);
                } else if (symbol.symbol == "K") {
                    this.wildHolderNode.push(payline);
                }
            }
        }

        this.paylineHolderNode.opacity = 0;
    },
    getXPosition: function getXPosition(index) {
        return (this.node.config.SYMBOL_WIDTH + this.node.config.SYMBOL_MARGIN_RIGHT) * index + this.node.config.SYMBOL_WIDTH / 2;
    },
    createPaylineSymbol: function createPaylineSymbol(reel, symbol, col, row) {
        var paylineSymbol = void 0;
        if (this.paylineSpecial[symbol]) {
            paylineSymbol = cc.instantiate(this.paylineSpecial[symbol]);
        } else {
            paylineSymbol = cc.instantiate(this.paylineNormalSymbol);
        }
        paylineSymbol.parent = this.paylineHolderNode;
        paylineSymbol.x = this.getXPosition(col);
        paylineSymbol.y = (reel.showNumber - row + 1) * this.node.config.SYMBOL_HEIGHT - this.node.config.SYMBOL_HEIGHT / 2 - (reel.showNumber - 3) * this.node.config.SYMBOL_HEIGHT / 2;
        paylineSymbol.disableHighlight();
        return paylineSymbol;
    },


    //Show each line for ANIMATION_DURATION time
    showAllNormalPayLines: function showAllNormalPayLines() {
        var _this = this;

        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.paylineHolderNode.opacity = 255;
        if (!this.payLineNormals[index]) {
            index = 0;
        }
        var _payLineNormals$index = this.payLineNormals[index],
            payLineID = _payLineNormals$index.payLineID,
            payLineWinNumbers = _payLineNormals$index.payLineWinNumbers;


        this.showNormalPayline(payLineID, payLineWinNumbers);

        this.tablePaylineInfo.emit('SHOW_PAYLINE', { line: this.payLineNormals[index] });
        //Recursive time, do we need to? or just use action sequence???
        if (this.timeoutPayLine) {
            clearTimeout(this.timeoutPayLine);
        }
        this.timeoutPayLine = setTimeout(function () {
            _this.showAllNormalPayLines(++index);
        }, this.node.curentConfig.ANIMATION_DURATION * 1000);
    },
    resetSymbolPaylines: function resetSymbolPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                this.paylinesMatrix[col][row].symbol.reset();
                this.paylinesMatrix[col][row].paylineSymbol.reset();
            }
        }
    },
    disableHighlightNormalPaylines: function disableHighlightNormalPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                this.paylinesMatrix[col][row].symbol.disableHighlight();
                this.paylinesMatrix[col][row].symbol.stopAnimation();
                this.paylinesMatrix[col][row].paylineSymbol.disableHighlight();
                this.paylinesMatrix[col][row].paylineSymbol.stopAnimation();
            }
        }
    },
    blinkNormalPayline: function blinkNormalPayline(payLineID, payLineWinNumbers) {
        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        for (var paylinePos = 0; paylinePos < payLineWinNumbers; ++paylinePos) {
            var row = payline[paylinePos];
            var col = paylinePos;
            this.paylinesMatrix[col][row].symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
            this.paylinesMatrix[col][row].paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
        }
    },
    showNormalPayline: function showNormalPayline(payLineID, payLineWinNumbers) {
        this.disableHighlightNormalPaylines();
        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        if (payline && payline.length > 0 && this.paylinesMatrix && this.paylinesMatrix.length > 0) {
            for (var paylinePos = 0; paylinePos < payLineWinNumbers; ++paylinePos) {
                var row = payline[paylinePos];
                var col = paylinePos;
                this.paylinesMatrix[col][row].symbol.enableHighlight();
                this.paylinesMatrix[col][row].symbol.playAnimation();
                this.paylinesMatrix[col][row].paylineSymbol.enableHighlight();
                this.paylinesMatrix[col][row].paylineSymbol.playAnimation();
            }
        }
    },
    showScatterPayLine: function showScatterPayLine(callback) {
        this.showSpecialPayline(this.scatterHolderNode, callback);
    },
    showBonusPayLine: function showBonusPayLine(callback) {
        this.showSpecialPayline(this.bonusHolderNode, callback);
    },
    showWildPayLine: function showWildPayLine(callback) {
        this.showSpecialPayline(this.wildHolderNode, callback);
    },
    showSpecialPayline: function showSpecialPayline(node, callback) {
        this.paylineHolderNode.opacity = 255;
        this.disableHighlightNormalPaylines();
        node.forEach(function (child) {
            child.symbol.enableHighlight();
            child.symbol.playAnimation();
            child.paylineSymbol.enableHighlight();
            child.paylineSymbol.playAnimation();
        });
        cc.director.getScheduler().schedule(function () {
            node.opacity = 0;
            if (callback && typeof callback == "function") {
                callback();
            }
        }, this, 0, 0, this.node.curentConfig.ANIMATION_DURATION, false);
    },
    clearPaylines: function clearPaylines() {
        if (this.timeoutPayLine) {
            clearTimeout(this.timeoutPayLine);
        }
        this.resetSymbolPaylines();
        this.paylineHolderNode.removeAllChildren();
        this.paylineHolderNode.active = false;
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.bonusHolderNode = [];
        this.wildHolderNode = [];
        this.tablePaylineInfo.emit('HIDE_PAYLINE');
    },
    onDestroy: function onDestroy() {
        clearTimeout(this.timeoutPayLine);
    },
    onDisable: function onDisable() {
        if (this.timeoutPayLine) {
            clearTimeout(this.timeoutPayLine);
        }
    },
    blinkHighlightPaylines: function blinkHighlightPaylines(callback) {
        this.paylineHolderNode.opacity = 255;
        this.disableHighlightNormalPaylines();
        for (var i = 0; i < this.payLineNormals.length; ++i) {
            var _payLineNormals$i = this.payLineNormals[i],
                payLineID = _payLineNormals$i.payLineID,
                payLineWinNumbers = _payLineNormals$i.payLineWinNumbers;

            this.blinkNormalPayline(payLineID, payLineWinNumbers);
        }
        this.node.emit('BLINK_ALL_PAYLINE');
        cc.director.getScheduler().schedule(callback, this, 0, 0, this.node.curentConfig.BLINKS * this.node.curentConfig.BLINK_DURATION, false);
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
        //# sourceMappingURL=SlotTablePayline.js.map
        