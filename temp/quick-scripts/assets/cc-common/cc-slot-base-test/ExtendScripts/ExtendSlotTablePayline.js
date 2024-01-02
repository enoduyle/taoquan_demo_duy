(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotTablePayline.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '79cf9wOjRBMX4WFpE/8QkaX', 'ExtendSlotTablePayline', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotTablePayline.js

'use strict';

cc.Class({
    extends: require('SlotTablePaylinev2'),

    properties: {
        winLineFramePrefabName: 'WinlineFrame'
    },

    onLoad: function onLoad() {
        this._super();
        this.node.on("SET_UP_PAYLINE_AT_REEL", this.setUpPaylineAtReel, this);
        this.node.on("SHOW_INTRO_SYMBOLS", this.showIntroSymbols, this);
        this.exendInit();
    },
    exendInit: function exendInit() {
        this.usingObj = [];
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.bonusHolderNode = [];
        this.wildHolderNode = [];
        this.jackpotHolderNode = [];
    },
    setUpPaylineAtReel: function setUpPaylineAtReel(col, payLines) {
        var _this = this;

        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.paylineHolderNode.active = true;
        this.payLineNormals = payLines;
        this.paylinesMatrix[col] = [];

        this.node.reels[col].showSymbols.forEach(function (symbol, row) {
            var paylineSymbol = _this.createPaylineSymbol(_this.node.reels[col], symbol.symbol, col, row);
            var winLineFrame = _this.createWinLineFrame(col, row, _this.node.reels[col]);
            var payline = { symbol: symbol, paylineSymbol: paylineSymbol, winLineFrame: winLineFrame };
            symbol.emit("INIT_FOR_PAYLINE", paylineSymbol.isSymbolAnimated);
            _this.paylinesMatrix[col][row] = payline;
            paylineSymbol.isSpecialSymbol = true;
            if (symbol.symbol == "A") {
                _this.scatterHolderNode.push(payline);
            } else if (symbol.symbol == "R") {
                _this.bonusHolderNode.push(payline);
            } else if (symbol.symbol == "K") {
                _this.wildHolderNode.push(payline);
            } else if (symbol.symbol == "JP") {
                _this.jackpotHolderNode.push(payline);
            } else {
                paylineSymbol.isSpecialSymbol = false;
            }

            if (paylineSymbol.isSpecialSymbol) {
                _this.playSpecialSymbolAppear(payline);
            }
        });
    },
    setupPaylines: function setupPaylines(matrix, payLines) {
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.paylineHolderNode.active = true;
        this.payLineNormals = payLines;
        this.paylinesMatrix = [];
        this.scatterHolderNode = [];
        this.wildHolderNode = [];

        for (var col = 0; col < this.node.reels.length; ++col) {
            this.paylinesMatrix[col] = [];
            for (var row = 0; row < this.node.reels[col].showSymbols.length; ++row) {
                var symbol = this.node.reels[col].showSymbols[row];
                var paylineSymbol = this.createPaylineSymbol(this.node.reels[col], symbol.symbol, col, row);
                var winLineFrame = this.createWinLineFrame(col, row, this.node.reels[col]);
                var payline = { symbol: symbol, paylineSymbol: paylineSymbol, winLineFrame: winLineFrame };
                symbol.emit("INIT_FOR_PAYLINE", paylineSymbol.isSymbolAnimated);
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
    },
    createPaylineSymbol: function createPaylineSymbol(reel, symbol, col, row) {
        var parentNode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        if (!this.node.poolFactory) {
            cc.warn('Do not having pool factory');
            return this._super(reel, symbol, col, row, parentNode);
        }
        var paylineSymbol = this.node.poolFactory.getObject(this.symbolSpinePrefabName);
        paylineSymbol.active = true;
        paylineSymbol.parent = parentNode || this.paylineHolderNode;
        paylineSymbol.x = this.getXPosition(col);
        paylineSymbol.y = (reel.showNumber / 2 - row - 0.5) * this.node.config.SYMBOL_HEIGHT;
        paylineSymbol.changeToSymbol(symbol);
        paylineSymbol.disableHighlight();
        this.usingObj.push(paylineSymbol);
        return paylineSymbol;
    },
    createWinLineFrame: function createWinLineFrame(col, row, reel) {
        var isWinLineFront = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!this.node.poolFactory) {
            cc.warn('Do not having pool factory');
            return null;
        }
        var prefabName = this.winLineFramePrefabName;
        var winLineFrame = this.node.poolFactory.getObject(prefabName);
        if (winLineFrame) {
            winLineFrame.active = false;
            winLineFrame.parent = isWinLineFront ? this.winLineFrameFrontHolder : this.winLineFrameHolder;
            winLineFrame.x = this.getXPosition(col);
            winLineFrame.y = (reel.showNumber / 2 - row - 0.5) * this.node.config.SYMBOL_HEIGHT;
            winLineFrame.animationClip = winLineFrame.getComponent(cc.Animation);
            this.usingObj.push(winLineFrame);
        }
        return winLineFrame;
    },
    blinkNormalPaylinePerline: function blinkNormalPaylinePerline(_ref) {
        var payLineID = _ref.payLineID,
            payLineWinNumbers = _ref.payLineWinNumbers;

        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        for (var paylinePos = 0; paylinePos < payLineWinNumbers; ++paylinePos) {
            var row = payline[paylinePos];
            var col = paylinePos;
            var _paylinesMatrix$col$r = this.paylinesMatrix[col][row],
                symbol = _paylinesMatrix$col$r.symbol,
                paylineSymbol = _paylinesMatrix$col$r.paylineSymbol;

            symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
            paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
        }
    },
    blinkNormalPaylineAllline: function blinkNormalPaylineAllline(_ref2) {
        var symbolId = _ref2.symbolId,
            symbolCount = _ref2.symbolCount;

        for (var col = 0; col < symbolCount; col++) {
            for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                var _paylinesMatrix$col$r2 = this.paylinesMatrix[col][row],
                    symbol = _paylinesMatrix$col$r2.symbol,
                    paylineSymbol = _paylinesMatrix$col$r2.paylineSymbol;

                if (symbol.symbol == symbolId || symbol.symbol == "K") {
                    symbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
                    paylineSymbol.blinkHighlight(this.node.curentConfig.BLINK_DURATION, this.node.curentConfig.BLINKS);
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
                var _paylinesMatrix$col$r3 = this.paylinesMatrix[col][row],
                    symbol = _paylinesMatrix$col$r3.symbol,
                    paylineSymbol = _paylinesMatrix$col$r3.paylineSymbol;

                symbol.enableHighlight();
                paylineSymbol.enableHighlight();
                paylineSymbol.playAnimation();
            }
        }
    },
    showNormalPaylineAllLine: function showNormalPaylineAllLine(_ref4) {
        var symbolId = _ref4.symbolId,
            symbolCount = _ref4.symbolCount;

        this.disableHighlightNormalPaylines();
        for (var col = 0; col < symbolCount; col++) {
            for (var row = 0; row < this.paylinesMatrix[col].length; row++) {
                var _paylinesMatrix$col$r4 = this.paylinesMatrix[col][row],
                    symbol = _paylinesMatrix$col$r4.symbol,
                    paylineSymbol = _paylinesMatrix$col$r4.paylineSymbol;

                if (symbol.symbol == symbolId || symbol.symbol == "K") {
                    symbol.enableHighlight();
                    paylineSymbol.enableHighlight();
                    paylineSymbol.playAnimation();
                }
            }
        }
    },
    disableHighlightNormalPaylines: function disableHighlightNormalPaylines() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                var _paylinesMatrix$col$r5 = this.paylinesMatrix[col][row],
                    symbol = _paylinesMatrix$col$r5.symbol,
                    paylineSymbol = _paylinesMatrix$col$r5.paylineSymbol;

                symbol.disableHighlight();
                paylineSymbol.disableHighlight();
            }
        }
    },
    playSpecialSymbolAppear: function playSpecialSymbolAppear(payline) {
        var symbol = payline.symbol,
            paylineSymbol = payline.paylineSymbol;

        if (symbol && paylineSymbol && paylineSymbol.isSymbolAnimated) {
            symbol.enableHighlight();
            symbol.playAnimation();
            paylineSymbol.enableHighlight();
            paylineSymbol.playSpecialSymbolAppear();
        }
    },
    clearPaylines: function clearPaylines() {
        for (var i = 0; i < this.usingObj.length; i++) {
            var removedObj = this.usingObj[i];
            removedObj.stopAllActions();
            this.node.poolFactory.removeObject(removedObj);
        }
        this.usingObj = [];
        this._super();
    },
    showIntroSymbols: function showIntroSymbols() {
        for (var col = 0; col < this.paylinesMatrix.length; ++col) {
            for (var row = 0; row < this.paylinesMatrix[col].length; ++row) {
                var _paylinesMatrix$col$r6 = this.paylinesMatrix[col][row],
                    symbol = _paylinesMatrix$col$r6.symbol,
                    paylineSymbol = _paylinesMatrix$col$r6.paylineSymbol;

                if (symbol && paylineSymbol) {
                    symbol.enableHighlight();
                    paylineSymbol.enableHighlight();
                    paylineSymbol.playAnimation();
                }
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
        //# sourceMappingURL=ExtendSlotTablePayline.js.map
        