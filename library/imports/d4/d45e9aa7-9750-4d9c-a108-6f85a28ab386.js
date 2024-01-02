"use strict";
cc._RF.push(module, 'd45e9qnl1BNnKEIb4WiirOG', 'TestReelMixPhysics');
// cc-common/cc-slot-base-test/TestReel/TestReelMixPhysics.js

"use strict";

var _require = require("testUtils"),
    createLabel = _require.createLabel;

cc.Class({
    extends: require('SlotReelv2'),
    properties: {
        symbolPrefab: cc.Node,
        specialSymbolPrefab: cc.Node
    },
    onLoad: function onLoad() {
        window.test = this;
        this._super();
        this._symbols = [];
        this.initTest();
    },
    initTest: function initTest() {
        var showNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var gameConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var symbolPrefab = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var isFreeMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        this.col = col;
        this.config = gameConfig || this.node.config;
        if (isFreeMode) {
            this.symbolList = this.config.SYMBOL_NAME_LIST_FREE[col];
        } else {
            this.symbolList = this.config.SYMBOL_NAME_LIST[col];
        }
        // this.symbolPrefab = symbolPrefab;
        this.showNumber = showNumber;
        this.showSymbols = [];
        this.totalNumber = this.showNumber + this.config.TABLE_SYMBOL_BUFFER.TOP + this.config.TABLE_SYMBOL_BUFFER.BOT;
        this.isFreeMode = isFreeMode;
        this.symbolStartShowY = (this.config.TABLE_FORMAT[col] / 2 - 0.5) * this.config.SYMBOL_HEIGHT;

        this.symbolStartY = -(this.config.TABLE_FORMAT[col] / 2 + this.config.TABLE_SYMBOL_BUFFER.BOT - 0.5) * this.config.SYMBOL_HEIGHT;
        for (var i = 0; i < this.totalNumber; ++i) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.name = "Symbol_" + i;
            symbol.parent = this.reel;
            symbol.setPosition(0, this.symbolStartY + i * this.config.SYMBOL_HEIGHT);
            symbol.changeToSymbol(this.getRandomSymbolName());
            this._symbols.push(symbol);
            if (i === 0) {
                this._bottomSymbol = symbol;
            }if (i >= this.config.TABLE_SYMBOL_BUFFER.BOT && this.showSymbols.length < this.showNumber) {
                this.showSymbols.unshift(symbol);
            } else if (i === this.totalNumber - 1) {
                this._topSymbol = symbol;
            }
        }

        this.mode = 'FAST';
        this.curentConfig = this.config.STATS[this.mode];
        this.index = 0;
        this.reset();
    },
    startSpinningWithDelay: function startSpinningWithDelay(evt) {
        var _this = this;

        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this._super(delay);
        this.scheduleOnce(function () {
            _this.stopSpinningWithDelay(0, ["2", "3", "4", "5", "6"].reverse(), // fake data result
            function () {});
        }, 0.2); // time to get response from server: about 200ms
    },
    setMode: function setMode(evt, mode) {
        this.mode = mode;
    },
    startRespinWithDelay: function startRespinWithDelay(evt) {
        var _this2 = this;

        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
        var rows = arguments[2];

        this._tick++;
        this.processRespinData(rows);
        this.fadeOutWinSymbols(delay);

        var _loop = function _loop(index) {
            var symbol = _this2.fallingSymbols[index];
            symbol._showY = _this2._getSymbolShowY(index);
            var time = _this2._getFallingTime(symbol._hideY - symbol._showY);
            symbol.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
                symbol.opacity = 255;
            }), cc.moveTo(time, symbol.x, symbol._showY).easing(cc.easeQuadraticActionIn()), cc.moveTo(_this2.curentConfig.TIME / 2, symbol.x, symbol._showY + 15).easing(cc.easeQuadraticActionIn()), cc.moveTo(_this2.curentConfig.TIME / 2, symbol.x, symbol._showY).easing(cc.easeQuadraticActionIn()), cc.callFunc(function () {
                if (index === 0) {
                    _this2._arrangeSymbols();
                }
            })));
        };

        for (var index = 0; index < this.fallingSymbols.length; index++) {
            _loop(index);
        }
    },
    fadeOutWinSymbols: function fadeOutWinSymbols(time) {
        var _this3 = this;

        this._toHideSymbols.forEach(function (sb) {
            return sb.runAction(cc.sequence(cc.spawn(cc.fadeOut(time), cc.scaleTo(time, 0.5)), cc.callFunc(function () {
                sb.y = sb._hideY;
                // sb.opacity = 255;
                sb.scale = 1;
                sb.changeToSymbol(_this3.getRandomSymbolName());
            })));
        });
    },
    _randomRows: function _randomRows() {
        var rows = [];
        for (var i = 0; i < 5; i++) {
            var isWin = Math.random() > 0.5;
            if (isWin) rows.push(i);
        }
        if (rows.length === 0) {
            rows = [1, 3];
        }
        return rows;
    },
    processRespinData: function processRespinData(rows) {
        rows = this._randomRows();
        this._maxIndex = Math.max.apply(null, rows);
        var _toHideSymbols = [],
            _toFallSymbols = [],
            _toStaySymbols = [];

        var count = 0;
        for (var index = 0; index < this.showSymbols.length; index++) {
            var _symbol = this.showSymbols[index];
            // symbol._currentRow = index;
            if (rows.indexOf(index) > -1) {
                count++;
                _symbol._hideY = this.symbolStartShowY + count * (this.config.SYMBOL_HEIGHT + 100);
                _toHideSymbols.unshift(_symbol);
            } else if (index < this._maxIndex) {
                _toFallSymbols.push(_symbol);
                _symbol._hideY = _symbol.y;
            } else {
                _toStaySymbols.push(_symbol);
            }
        }
        this._toHideSymbols = _toHideSymbols;
        this.showSymbols = _toHideSymbols.concat(_toFallSymbols).concat(_toStaySymbols);
        this.fallingSymbols = _toHideSymbols.concat(_toFallSymbols);
    },
    _getSymbolShowY: function _getSymbolShowY(row) {
        return this.symbolStartShowY - row * this.config.SYMBOL_HEIGHT;
    },
    _getFallingTime: function _getFallingTime(height) {
        return height / this.config.SYMBOL_HEIGHT * this.curentConfig.TIME * 2;
    },
    _arrangeSymbols: function _arrangeSymbols() {
        this._symbols.sort(function (a, b) {
            return a.y - b.y;
        });
        this.index = 0;
    },
    circularSymbols: function circularSymbols() {
        var lastSymbol = this._symbols[this.index % this.totalNumber];
        if (!this.showResult) {
            lastSymbol.changeToBlurSymbol(this.getRandomSymbolName());
        } else if (this.stop < this.totalNumber) {
            var isRealSymbol = this.stop >= this.config.TABLE_SYMBOL_BUFFER.TOP && this.stop < this.showNumber + this.config.TABLE_SYMBOL_BUFFER.TOP;
            var symbolValue = this.matrix[this.stop];
            this.step = this.totalNumber + this.showNumber - (this.stop + this.config.TABLE_SYMBOL_BUFFER.BOT);
            if (isRealSymbol) {
                lastSymbol.changeToSymbol(symbolValue);
                this.usingMotionBlur && lastSymbol.stopBlur();
                this.showSymbols.unshift(lastSymbol);
            } else {
                if (this.stop === 0) {
                    this._bottomSymbol = lastSymbol;
                } else if (this.stop === this.totalNumber - 1) {
                    this._topSymbol = lastSymbol;
                }
                lastSymbol.changeToBlurSymbol(symbolValue);
            }
            this.stop++;
        }
        lastSymbol.y = lastSymbol.y + this.config.SYMBOL_HEIGHT * this.totalNumber;
        this.index++;
    }
});

cc._RF.pop();