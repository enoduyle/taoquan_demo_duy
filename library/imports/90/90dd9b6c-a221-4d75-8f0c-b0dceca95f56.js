"use strict";
cc._RF.push(module, '90dd9tsoiFNdY8MsNzsqV9W', 'SlotTableNearWinEffect9983');
// cc-taoquan-9983/scripts/table/SlotTableNearWinEffect9983.js

'use strict';

var NodePool = require('NodePool9983');
cc.Class({
    extends: require('SlotTableNearWinEffect'),

    properties: {
        paylineSymbol: cc.Prefab,
        nearWinHolderNode: cc.Node,
        tableNode: cc.Node,
        isNormalMode: false
    },

    start: function start() {
        this.node.on("REEL_STOP_NEARWIN", this.reelStopNearWin, this);
        this.node.on("TABLE_START_NEARWIN", this.reelReset, this);
        this.node.on("REEL_ABOUT_TO_STOP_NEARWIN", this.adjustReelDelay, this);
        this.reelReset();
        this.paylineSymbolPool = new NodePool('SlotSymbolPayline9983');
        this.paylineSymbolPool.init(this.paylineSymbol, 15);
        this.usingObj = [];
    },
    reelReset: function reelReset() {
        this.getFirstNearWin = false;
    },
    adjustReelDelay: function adjustReelDelay(_ref) {
        var data = _ref.data,
            subSym = _ref.subSym;

        var countSubSymbol = 0;
        this.stopNearWinReel = 0;
        this.nearWinList = [];

        for (var col = 0; col < data.length; ++col) {
            var isNearWinSubSymbol = countSubSymbol >= 0;
            if (countSubSymbol != col) {
                isNearWinSubSymbol = false;
            }
            var isNearWin = isNearWinSubSymbol;
            for (var row = 0; row < data[col].length; ++row) {
                var symbolValue = data[col][row];
                if (subSym && subSym.indexOf(col * 3 + row) >= 0) {
                    countSubSymbol++;
                    this.createPaylineSymbol(this.node.reels[col], symbolValue, col, row, true);
                }
            }
            if (isNearWin) {
                this.nearWinList[col] = { isNearWinSubSymbol: isNearWinSubSymbol, isNearWin: isNearWin };
            }
        }
    },
    reelStopNearWin: function reelStopNearWin(_ref2) {
        var count = _ref2.count,
            context = _ref2.context;

        if (this.nearWinList[count] && this.nearWinList[count].isNearWin && !context.isFastToResult) {
            for (var i = count; i < this.node.reels.length; i++) {
                this.node.reels[i].adjustReelSpeed(this.node.config.SUPER_TURBO);
            }
            if (count === this.node.reels.length - 1) {
                cc.director.getScheduler().schedule(function () {
                    this.node.reels[count].adjustReelSpeed(this.node.curentConfig.TIME);
                }, this, 0, 0, 1, false);
            }

            if (this.nearWinList[count].isNearWinSubSymbol) {
                this.runAnimationNearWin('subSymbol', count);
            }
        }
        if (count >= this.node.reels.length) {
            this.clearSymbolPaylines();
        }
    },
    getXPosition: function getXPosition(index) {
        return (this.node.config.SYMBOL_WIDTH + this.node.config.SYMBOL_MARGIN_RIGHT) * index + this.node.config.SYMBOL_WIDTH / 2;
    },
    createPaylineSymbol: function createPaylineSymbol(reel, symbol, col, row) {
        var isSubSymbol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        var neawWinSymbol = void 0;

        neawWinSymbol = this.paylineSymbolPool.getObj();
        this.usingObj.push(neawWinSymbol);
        neawWinSymbol.parent = this.nearWinHolderNode;
        neawWinSymbol.init(symbol);
        neawWinSymbol.symbol = symbol;
        neawWinSymbol.isSubSymbol = isSubSymbol;
        neawWinSymbol.col = col;
        neawWinSymbol.row = row;
        neawWinSymbol.x = this.getXPosition(col);
        neawWinSymbol.y = (reel.showNumber - row + 0) * this.node.config.SYMBOL_HEIGHT - this.node.config.SYMBOL_HEIGHT / 2;
        neawWinSymbol.disableHighlight();
        neawWinSymbol.stopAnimation();

        return neawWinSymbol;
    },
    clearSymbolPaylines: function clearSymbolPaylines() {
        this.nearWinHolderNode.removeAllChildren(true);
        this.tableNode.children.forEach(function (reel) {
            reel.children[0].children.forEach(function (symbolReel) {
                symbolReel.opacity = 255;
            });
        });
        for (var i = 0; i < this.usingObj.length; i++) {
            this.usingObj[i].remove();
        }
        this.usingObj = [];
    },
    runAnimationNearWin: function runAnimationNearWin(symbolName, currentIndex) {
        var _this = this;

        this.nearWinHolderNode.children.forEach(function (symbol) {
            if ((symbolName === 'subSymbol' && symbol.isSubSymbol || symbol.symbol === symbolName) && symbol.col < currentIndex) {
                symbol.opacity = 255;
                symbol.enableHighlight();
                symbol.playAnimation();
                _this.tableNode.children[symbol.col].children[0].children[symbol.row + 1].opacity = 0;
            }
        });
    }
});

cc._RF.pop();