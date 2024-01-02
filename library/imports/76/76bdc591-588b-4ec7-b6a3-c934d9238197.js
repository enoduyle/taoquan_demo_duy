"use strict";
cc._RF.push(module, '76bdcWRWItOx7ajyTTZI4GX', 'SlotTablePaylinev2');
// cc-common/cc-slotbase-v2/slotGame/table/SlotTablePaylinev2.js

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
        this.showNormalPayline = this.node.config.PAY_LINE_ALLWAYS ? this.showNormalPaylineAllLine : this.showNormalPaylinePerline;
        this.blinkNormalPayline = this.node.config.PAY_LINE_ALLWAYS ? this.blinkNormalPaylineAllline : this.blinkNormalPaylinePerline;
        this.paylineTime = 0;
        this.node.on("SETUP_PAYLINES", this.setupPaylines, this);
        this.node.on("BLINK_ALL_NORMAL_PAYLINES", this.blinkHighlightPaylines, this);
        this.node.on("SHOW_ALL_NORMAL_PAYLINES", this.showAllNormalPayLines, this);
        this.node.on("SHOW_ALL_FREE_PAYLINES", this.showAllFreePaylines, this);
        this.node.on("SHOW_SCATTER_PAYLINE", this.showScatterPayLine, this);
        this.node.on("SHOW_BONUS_PAYLINE", this.showBonusPayLine, this);
        this.node.on("SHOW_JACKPOT_PAYLINE", this.showJackpotPayLine, this);
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
        this.jackpotHolderNode = [];

        for (var col = 0; col < this.node.reels.length; ++col) {
            this.paylinesMatrix[col] = [];
            for (var row = 0; row < this.node.reels[col].showSymbols.length; ++row) {
                var symbol = this.node.reels[col].showSymbols[row];
                var paylineSymbol = this.createPaylineSymbol(this.node.reels[col], symbol.symbol, col, row);
                var payline = {
                    symbol: symbol, paylineSymbol: paylineSymbol
                };
                this.paylinesMatrix[col][row] = payline;
                if (symbol.symbol == "A") {
                    this.scatterHolderNode.push(payline);
                } else if (symbol.symbol == "R") {
                    this.bonusHolderNode.push(payline);
                } else if (symbol.symbol == "K") {
                    this.wildHolderNode.push(payline);
                } else if (symbol.symbol == "JP") {
                    this.jackpotHolderNode.push(payline);
                }
            }
        }

        this.paylineHolderNode.opacity = 0;
    },
    getXPosition: function getXPosition(index) {
        var startX = -(this.node.config.TABLE_FORMAT.length / 2 - 0.5) * this.node.config.SYMBOL_WIDTH;
        return startX + this.node.config.SYMBOL_WIDTH * index;
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
        paylineSymbol.y = (reel.showNumber / 2 - row - 0.5) * this.node.config.SYMBOL_HEIGHT;
        paylineSymbol.changeToSymbol(symbol);
        paylineSymbol.disableHighlight();
        return paylineSymbol;
    },


    //Show each line for ANIMATION_DURATION time
    showAllNormalPayLines: function showAllNormalPayLines(callback) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!this.payLineNormals) {
            callback && callback();
            return;
        }
        this.paylineIndex = index;
        this.showingPayline = true;
        this.paylineType = 'normal';
        this.callbackShowPayline = callback;
        if (this.node.config.PAY_LINE_ALLWAYS && this.node.gSlotDataStore && !this.node.gSlotDataStore.isAutoSpin) {
            this.nextPaylineTime = this.node.curentConfig.EXPECT_PAYLINE_ALLWAYS_TIME;
        } else {
            this.nextPaylineTime = Math.max(this.node.curentConfig.EXPECT_PAYLINE_TIME / this.payLineNormals.length, this.node.curentConfig.MIN_TIME_EACH_PAYLINE);
        }
        this.showNextPayline();
    },
    showAllFreePaylines: function showAllFreePaylines(callback) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!this.payLineNormals) {
            callback && callback();
            return;
        }
        this.paylineIndex = index;
        this.showingPayline = true;
        this.paylineType = 'free';
        this.callbackShowPayline = callback;
        this.nextPaylineTime = Math.max(this.node.curentConfig.EXPECT_PAYLINE_TIME / this.payLineNormals.length, this.node.curentConfig.MIN_TIME_EACH_PAYLINE);
        this.showNextPayline();
    },
    resetSymbolPaylines: function resetSymbolPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                this.paylinesMatrix[col][row].symbol.active = true;
                this.paylinesMatrix[col][row].symbol.reset();
                this.paylinesMatrix[col][row].paylineSymbol.reset();
            }
        }
    },
    disableHighlightNormalPaylines: function disableHighlightNormalPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                this.paylinesMatrix[col][row].symbol.active = true;
                this.paylinesMatrix[col][row].symbol.disableHighlight();
                this.paylinesMatrix[col][row].symbol.stopAnimation();
                this.paylinesMatrix[col][row].paylineSymbol.disableHighlight();
                this.paylinesMatrix[col][row].paylineSymbol.stopAnimation();
            }
        }
    },
    blinkNormalPaylinePerline: function blinkNormalPaylinePerline(_ref) {
        var payLineID = _ref.payLineID,
            payLineWinNumbers = _ref.payLineWinNumbers;

        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        for (var paylinePos = 0; paylinePos < payLineWinNumbers; ++paylinePos) {
            var row = payline[paylinePos];
            var col = paylinePos;
            this.paylinesMatrix[col][row].symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
            this.paylinesMatrix[col][row].paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
        }
    },
    blinkNormalPaylineAllline: function blinkNormalPaylineAllline(_ref2) {
        var symbolId = _ref2.symbolId,
            symbolCount = _ref2.symbolCount;

        for (var col = 0; col < symbolCount; col++) {
            for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                if (this.paylinesMatrix[col][row].symbol.symbol == symbolId || this.paylinesMatrix[col][row].symbol.symbol == "K") //remove hardcore K ?
                    {
                        this.paylinesMatrix[col][row].symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
                        this.paylinesMatrix[col][row].paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
                    }
            }
        }
    },
    showNormalPaylinePerline: function showNormalPaylinePerline(_ref3) {
        var payLineID = _ref3.payLineID,
            payLineWinNumbers = _ref3.payLineWinNumbers;

        this.disableHighlightNormalPaylines();
        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        if (payline && payline.length > 0 && this.paylinesMatrix && this.paylinesMatrix.length > 0) {
            for (var paylinePos = 0; paylinePos < payLineWinNumbers; ++paylinePos) {
                var row = payline[paylinePos];
                var col = paylinePos;
                this.paylinesMatrix[col][row].symbol.active = false;
                this.paylinesMatrix[col][row].paylineSymbol.enableHighlight();
                this.paylinesMatrix[col][row].paylineSymbol.playAnimation();
            }
        }
    },
    showNormalPaylineAllLine: function showNormalPaylineAllLine(_ref4) {
        var symbolId = _ref4.symbolId,
            symbolCount = _ref4.symbolCount;

        this.disableHighlightNormalPaylines();
        for (var col = 0; col < symbolCount; col++) {
            for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                if (this.paylinesMatrix[col][row].symbol.symbol == symbolId || this.paylinesMatrix[col][row].symbol.symbol == "K") //remove hardcore K ?
                    {
                        this.paylinesMatrix[col][row].symbol.active = false;
                        this.paylinesMatrix[col][row].paylineSymbol.enableHighlight();
                        this.paylinesMatrix[col][row].paylineSymbol.playAnimation();
                    }
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
    showJackpotPayLine: function showJackpotPayLine(callback) {
        this.showSpecialPayline(this.jackpotHolderNode, callback);
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
        if (this._blinkingCallback) {
            this.unschedule(this._blinkingCallback);
            this._blinkingCallback = null;
        }
        this.showingPayline = false;
        this.paylineTime = 0;
        this.resetSymbolPaylines();
        this.paylineHolderNode.removeAllChildren();
        this.paylineHolderNode.active = false;
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.bonusHolderNode = [];
        this.wildHolderNode = [];
        this.jackpotHolderNode = [];
        this.tablePaylineInfo.emit('HIDE_PAYLINE');
    },
    blinkHighlightPaylines: function blinkHighlightPaylines(callback) {
        var _this = this;

        this._blinkingCallback = function () {
            callback && callback();
            _this._blinkingCallback = null;
        };
        this.paylineHolderNode.opacity = 255;
        this.disableHighlightNormalPaylines();
        for (var i = 0; i < this.payLineNormals.length; ++i) {
            this.blinkNormalPayline(this.payLineNormals[i]);
        }
        this.node.emit('BLINK_ALL_PAYLINE');
        this.scheduleOnce(this._blinkingCallback, this.node.curentConfig.BLINKS * this.node.curentConfig.BLINK_DURATION);
    },
    update: function update(dt) {
        if (this.paylineTime > 0 && this.showingPayline) {
            this.paylineTime -= dt;
            if (this.paylineTime <= 0) {
                this.showNextPayline();
            }
        }
    },
    showNextPayline: function showNextPayline() {
        this.paylineHolderNode.opacity = 255;
        if (!this.payLineNormals || !this.payLineNormals[this.paylineIndex]) {
            if (this.paylineType === 'free') {
                this.showingPayline = false;
            }
            this.paylineIndex = 0;
            this.callbackShowPayline && this.callbackShowPayline();
            this.callbackShowPayline = null;
        }
        if (this.payLineNormals && this.payLineNormals[this.paylineIndex] && this.showingPayline) {
            var paylineInfo = this.payLineNormals[this.paylineIndex];
            this.showNormalPayline(paylineInfo);
            this.tablePaylineInfo.emit('SHOW_PAYLINE', { line: paylineInfo });
            this.extShowPayline();
            this.paylineIndex += 1;
            this.paylineTime = this.nextPaylineTime;
        }
    },
    extShowPayline: function extShowPayline() {}
});

cc._RF.pop();