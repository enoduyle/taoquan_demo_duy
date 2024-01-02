"use strict";
cc._RF.push(module, 'ff10eftk4hCfazdVpz6EgfI', 'SlotTablePayline9983');
// cc-taoquan-9983/scripts/table/SlotTablePayline9983.js

'use strict';

var NodePool = require('NodePool9983');
cc.Class({
    extends: require('SlotTablePaylinev2'),

    properties: {
        isFreeMode: true,
        winLineHolderNode: cc.Node,
        winLinePrefab: cc.Prefab
    },
    start: function start() {
        this._super();
        this.node.on("SHOW_SUB_SYMBOL_PAYLINE", this.showSubSymbolPayLine, this);
        this.node.on("HIDE_SUB_SYMBOL_PAYLINE", this.hideSubSymbolPayLine, this);
        this.node.on("HIDE_PAYLINES", this.hideAllPaylines, this);
    },
    onLoad: function onLoad() {
        this._super();
        this.paylineSymbolPool = new NodePool('SlotSymbolPayline9983');
        this.paylineSymbolPool.init(this.paylineNormalSymbol, 5);

        this.winLinePool = new NodePool("WinLine9983");
        this.winLinePool.init(this.winLinePrefab, 12);

        this.usingObj = [];
        if (this.isFreeMode) {
            this.tempMatrix = [[-1, 0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10], [11, 12, 13, 14], [-1, 15, 16, 17]];
        } else {
            this.tempMatrix = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14]];
        }
        this.subSymbolHolderNode = [];
        this.isValidScatter = [true, false, false, false, false];
        if (!this.isFreeMode) {
            this.tableFormat = this.node.config.TABLE_FORMAT;
        } else {
            this.tableFormat = this.node.config.TABLE_FORMAT_FREE;
        }
    },
    setupPaylines: function setupPaylines(matrix, payLines) {
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.paylineHolderNode.active = true;
        this.payLineNormals = payLines;
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.bonusHolderNode = [];
        this.wildHolderNode = [];
        this.subSymbolHolderNode = [];
        this.isValidScatter = [true, false, false, false, false];
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.lastEvent,
            subSym1 = _node$gSlotDataStore$.subSym1,
            subSym2 = _node$gSlotDataStore$.subSym2;
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.lastEvent,
            fSubSym1 = _node$gSlotDataStore$2.fSubSym1,
            fSubSym2 = _node$gSlotDataStore$2.fSubSym2;


        var count = this.tableFormat * this.tableFormat[0];
        for (var col = 0; col < this.node.reels.length; ++col) {
            this.paylinesMatrix[col] = [];
            for (var row = 0; row < this.node.reels[col].showSymbols.length; ++row) {
                var symbol = this.node.reels[col].showSymbols[row];
                var paylineSymbol = this.createPaylineSymbol(this.node.reels[col], symbol.symbol, col, row);
                count--;
                paylineSymbol.setSiblingIndex(count);
                paylineSymbol.currentIndex = count;
                var payline = { symbol: symbol, paylineSymbol: paylineSymbol };
                this.paylinesMatrix[col][row] = payline;
                if (symbol.symbol == "A") {
                    if (col > 0) {
                        this.isValidScatter[col] = this.isValidScatter[col - 1] == true;
                    }
                    this.scatterHolderNode.push(payline);
                } else if (symbol.symbol[0] == "K") {
                    this.wildHolderNode.push(payline);
                }
                if (subSym1 && subSym1.indexOf(this.tempMatrix[col][row]) >= 0) {
                    this.subSymbolHolderNode.push(payline);
                }
                if (subSym2 && subSym2.indexOf(this.tempMatrix[col][row]) >= 0) {
                    this.subSymbolHolderNode.push(payline);
                }
                if (fSubSym1 && fSubSym1.indexOf(this.tempMatrix[col][row]) >= 0) {
                    this.subSymbolHolderNode.push(payline);
                }
                if (fSubSym2 && fSubSym2.indexOf(this.tempMatrix[col][row]) >= 0) {
                    this.subSymbolHolderNode.push(payline);
                }
            }
        }
        this.paylineHolderNode.opacity = 0;
    },
    createPaylineSymbol: function createPaylineSymbol(reel, symbol, col, row) {
        var paylineSymbol = void 0;
        paylineSymbol = this.paylineSymbolPool.getObj();
        this.usingObj.push(paylineSymbol);
        paylineSymbol.parent = this.paylineHolderNode;
        paylineSymbol.x = this.getXPosition(col);
        paylineSymbol.y = (reel.showNumber / 2 - row - 0.5) * this.node.config.SYMBOL_HEIGHT;
        paylineSymbol.disableHighlight();
        paylineSymbol.currentCol = col;
        paylineSymbol.init(symbol);
        this._createWinLine(paylineSymbol);
        return paylineSymbol;
    },
    _createWinLine: function _createWinLine(paylineSymbol) {
        var winLine = this.winLinePool.getObj();
        winLine.parent = this.winLineHolderNode;
        winLine.x = paylineSymbol.x;
        winLine.y = paylineSymbol.y;
        paylineSymbol.winLine = winLine;
        winLine.active = false;
    },
    getXPosition: function getXPosition(index) {
        var startX = -(this.tableFormat.length / 2 - 0.5) * this.node.config.SYMBOL_WIDTH;
        return startX + this.node.config.SYMBOL_WIDTH * index;
    },
    showSubSymbolPayLine: function showSubSymbolPayLine(data, callback) {
        var _this = this;

        if (data == 0) {
            this.node.dispatchEvent(new cc.Event.EventCustom('PLAY_SUBSYMBOL_MAJOR', true));
        } else if (data == 1) {
            this.node.dispatchEvent(new cc.Event.EventCustom('PLAY_SUBSYMBOL_GRAND', true));
        }
        this.paylineHolderNode.opacity = 255;
        this.disableHighlightNormalPaylines();
        this.subSymbolHolderNode.forEach(function (child) {
            child.symbol.enableHighlight();
            child.symbol.playAnimation();
            child.paylineSymbol.enableHighlight();
            child.paylineSymbol.playAnimationSubSymbol(data);
        });
        this.scheduleOnce(function () {
            _this.subSymbolHolderNode.opacity = 0;
            if (callback && typeof callback == "function") {
                callback();
            }
        }, this.node.curentConfig.ANIMATION_DURATION);
    },
    hideSubSymbolPayLine: function hideSubSymbolPayLine() {
        this.subSymbolHolderNode.forEach(function (child) {
            child.paylineSymbol.hideAnimationSubSymbol();
            child.symbol.addSmallSubSymbol();
        });
    },
    showNormalPaylineAllLine: function showNormalPaylineAllLine(_ref) {
        var symbolId = _ref.payLineSymbol,
            paylineMaxColumn = _ref.paylineMaxColumn;

        this.disableHighlightNormalPaylines();
        for (var col = 0; col < paylineMaxColumn; col++) {
            if (this.paylinesMatrix[col] && this.paylinesMatrix[col].length) {
                for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                    var _paylinesMatrix$col$r = this.paylinesMatrix[col][row],
                        symbol = _paylinesMatrix$col$r.symbol,
                        paylineSymbol = _paylinesMatrix$col$r.paylineSymbol;

                    if (symbol && paylineSymbol) {
                        if (symbol.symbol == symbolId || symbol.symbol[0] == "K") {
                            if (symbol.symbol[0] == "K") {
                                symbol.blinkHighlight();
                                paylineSymbol.setSiblingIndex(paylineSymbol.currentIndex || 0);
                            } else {
                                symbol.enableHighlight(paylineSymbol.isSpineSymbol());
                                symbol.playAnimation();
                                paylineSymbol.enableHighlight();
                                paylineSymbol.setSiblingIndex(paylineSymbol.currentIndex || 0);
                                paylineSymbol.playAnimation();
                            }
                            this._playWinLine(paylineSymbol);
                        }
                    }
                }
            }
        }
    },
    blinkNormalPaylineAllline: function blinkNormalPaylineAllline(_ref2) {
        var symbolId = _ref2.payLineSymbol,
            paylineMaxColumn = _ref2.paylineMaxColumn;

        for (var col = 0; col < paylineMaxColumn; col++) {
            if (this.paylinesMatrix[col] && this.paylinesMatrix[col].length) {
                for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                    var _paylinesMatrix$col$r2 = this.paylinesMatrix[col][row],
                        symbol = _paylinesMatrix$col$r2.symbol,
                        paylineSymbol = _paylinesMatrix$col$r2.paylineSymbol;

                    if (symbol.symbol == symbolId || symbol.symbol[0] == "K") {
                        if (symbol.symbol[0] == "K") {
                            symbol.blinkHighlight();
                        } else {
                            symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
                            paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
                        }
                        this._playWinLine(paylineSymbol);
                    }
                }
            }
        }
    },
    disableHighlightNormalPaylines: function disableHighlightNormalPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            if (this.paylinesMatrix[col] && this.paylinesMatrix[col].length) {
                for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                    var _paylinesMatrix$col$r3 = this.paylinesMatrix[col][row],
                        symbol = _paylinesMatrix$col$r3.symbol,
                        paylineSymbol = _paylinesMatrix$col$r3.paylineSymbol;

                    symbol.active = true;
                    symbol.disableHighlight();
                    if (symbol.symbol[0] == 'K') {
                        paylineSymbol.hideWinLineEffect();
                    } else {
                        symbol.stopAnimation();
                        paylineSymbol.disableHighlight();
                        paylineSymbol.stopAnimation();
                        if (paylineSymbol.winLine) {
                            paylineSymbol.winLine.active = false;
                        }
                    }
                }
            }
        }
    },
    clearPaylines: function clearPaylines() {
        this._super();
        for (var i = 0; i < this.usingObj.length; i++) {
            // this.usingObj[i].remove();
            if (this.usingObj[i].winLine) {
                this.winLinePool.put(this.usingObj[i].winLine);
                this.paylineSymbolPool.put(this.usingObj[i]);
                this.usingObj[i].winLine = null;
            }
        }
        this.usingObj = [];
    },
    showSpecialPayline: function showSpecialPayline(node, callback) {
        var _this2 = this;

        this.showingPayline = false;
        this.paylineTime = 0;
        this.tablePaylineInfo.emit('HIDE_PAYLINE');
        this.paylineHolderNode.opacity = 255;
        this.disableHighlightNormalPaylines();
        node.forEach(function (child) {
            if (_this2.isValidScatter[child.paylineSymbol.currentCol]) {
                child.symbol.enableHighlight(true);
                child.symbol.playAnimation();
                child.paylineSymbol.enableHighlight();
                child.paylineSymbol.playAnimation();
                _this2._playWinLine(child.paylineSymbol);
            }
        });
        this.scheduleOnce(function () {
            node.opacity = 0;
            callback && callback();
        }, this.node.curentConfig.ANIMATION_DURATION);
    },
    _playWinLine: function _playWinLine(paylineSymbol) {
        if (paylineSymbol.winLine) {
            paylineSymbol.winLine.active = true;
            var spine = paylineSymbol.winLine.getComponent(sp.Skeleton);
            if (spine) {
                var animation = this.isFreeMode ? "FreeG" : "MainG";
                spine.setAnimation(0, animation, true);
            }
        }
    },
    hideAllPaylines: function hideAllPaylines() {
        this.showingPayline = false;
        this.paylineTime = 0;
        this.tablePaylineInfo.emit('HIDE_PAYLINE');
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            if (this.paylinesMatrix[col] && this.paylinesMatrix[col].length) {
                for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                    var _paylinesMatrix$col$r4 = this.paylinesMatrix[col][row],
                        symbol = _paylinesMatrix$col$r4.symbol,
                        paylineSymbol = _paylinesMatrix$col$r4.paylineSymbol;

                    symbol.active = true;
                    symbol.disableHighlight();
                    symbol.stopAnimation();
                    symbol.reset();
                    paylineSymbol.disableHighlight();
                    paylineSymbol.stopAnimation();
                    if (paylineSymbol.winLine) {
                        paylineSymbol.winLine.active = false;
                    }
                }
            }
        }
    }
});

cc._RF.pop();