"use strict";
cc._RF.push(module, '7ff6euHVABF4K/mYU3m7MKe', 'SlotReelPhysics');
// cc-common/cc-slotbase-v2/template/physics-reel/SlotReelPhysics.js

'use strict';

var STATE = cc.Enum({
    IDLE: 0,
    FALL_OUT: 1,
    FALL_OUT_DONE: 2,
    FALL_IN: 3,
    EASING: 4
});
var SYMBOL_SCATTER = 'A';
cc.Class({
    extends: require('SlotReelv2'),

    properties: {
        symbolPrefab: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this._easingRatio = [0.25, 0.13, 0.05];
        this.specialSymbolNames = '2,3,4,A,K';
        this._specialSymbol = [];
        this.matrix = [];
    },
    init: function init() {
        var showNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
        var gameConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var symbolPrefab = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var isFreeMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        this.col = col;
        // this.config = gameConfig;
        this.config = gameConfig;
        if (isFreeMode) {
            this.symbolList = this.config.SYMBOL_NAME_LIST_FREE[col];
        } else {
            this.symbolList = this.config.SYMBOL_NAME_LIST[col];
        }
        this.isFreeMode = isFreeMode;

        this.showNumber = showNumber;
        this.totalNumber = this.showNumber * 2;

        this.symbolPrefab = symbolPrefab;
        this.showSymbols = [];
        this.hideSymbols = [];

        this.symbolStartShowY = this.config.SYMBOL_HEIGHT;
        this.symbolStartHideY = (this.showNumber + 1.5) * this.config.SYMBOL_HEIGHT;

        for (var i = 0; i < this.totalNumber; ++i) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.name = "Symbol_" + i;
            symbol.parent = this.reel;
            symbol.storeCol = col;
            symbol.changeToSymbol(this.getRandomSymbolNameWithException(SYMBOL_SCATTER));
            if (i >= showNumber) {
                this.showSymbols.push(symbol);
                symbol.y = this._getSymbolShowY(i % this.showNumber);
            } else {
                this.hideSymbols.push(symbol);
                symbol.y = this._getSymbolHideY(i);
            }
        } // 0 -> 5; top -> bot
        this.mode = 'FAST';
        this.durationFall = 1;
        this.index = 0;
        this.curentConfig = this.config.STATS[this.mode];
        this._state = STATE.IDLE;
        this._setupMode();
    },
    _setupMode: function _setupMode() {
        this._dur = this.curentConfig.DURATION;
        this._gravity = this.config.SYMBOL_HEIGHT / (this._dur * this._dur);
    },
    _getEasingDis: function _getEasingDis(row) {
        return this._easingRatio[row] * this.config.SYMBOL_HEIGHT;
    },
    _getEasingDur: function _getEasingDur(row) {
        return 2 * this._getEasingDis(row) / Math.pow(this._gravity, 1) / 2;
    },
    _getSymbolShowY: function _getSymbolShowY(row) {
        // 0,1,2
        return this.symbolStartShowY - row * this.config.SYMBOL_HEIGHT;
    },
    _getSymbolHideY: function _getSymbolHideY(row) {
        // 0,1,2
        return this.symbolStartHideY - row * this.config.SYMBOL_HEIGHT;
    },
    startSpinningWithDelay: function startSpinningWithDelay(delay) {
        var _this = this;

        this._state = STATE.FALL_OUT;
        this._isStopping = false;
        this.matrix = [];
        this.curentConfig = this.config.STATS[this.mode];
        var reelDelayStart = delay * this.curentConfig.REEL_DELAY_START;
        this.isFastToResult = false;
        this.curentConfig = this.config.STATS[this.mode];
        this._setupMode();

        var _loop = function _loop(row) {
            var symbol = _this.showSymbols[row];
            symbol._actionFallHire = cc.sequence(cc.delayTime(reelDelayStart), cc.moveBy(_this._dur, 0, -3.5 * _this.config.SYMBOL_HEIGHT).easing(cc.easeQuadraticActionIn()), cc.callFunc(function () {
                if (row === _this.showSymbols.length - 1) {
                    _this._state = STATE.FALL_OUT_DONE;
                    if (_this.matrix.length === _this.showNumber) {
                        _this._stopSpinning();
                    }
                }
            }));
            symbol.stopAllActions();
            symbol.runAction(symbol._actionFallHire);
        };

        for (var row = 0; row < this.showSymbols.length; row++) {
            _loop(row);
        }
    },
    stopSpinningWithDelay: function stopSpinningWithDelay(delay) {
        var matrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var callback = arguments[2];

        this.matrix = matrix;
        this.callbackStopReel = callback ? callback : function () {};
    },
    update: function update() {
        if (this._isStopping) return;
        if (this.matrix.length === this.showNumber /* got data */ && this._state === STATE.FALL_OUT_DONE) {
            var delay = this.col * this.curentConfig.REEL_DELAY_START;
            this._stopSpinning(delay);
        }
    },
    _stopSpinning: function _stopSpinning() {
        var _this2 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this._isStopping === true) return;
        this._isStopping = true;
        this._state = STATE.FALL_IN;

        var _loop2 = function _loop2(row) {
            var symbol = _this2.hideSymbols[row];
            // symbol.active = true;
            symbol.changeToSymbol(_this2.matrix[row]);
            var easingY = _this2._getEasingDis(row);
            var easingDur = _this2._getEasingDur(row);
            !symbol.isWinJp && (symbol.opacity = 255);
            symbol._actionFallIn = cc.sequence(cc.delayTime(delay + easingDur), cc.moveTo(_this2._dur, symbol.x, _this2._getSymbolShowY(row)).easing(cc.easeQuadraticActionIn()), cc.moveTo(easingDur, symbol.x, _this2._getSymbolShowY(row) + easingY).easing(cc.easeQuadraticActionOut()), cc.moveTo(easingDur, symbol.x, _this2._getSymbolShowY(row)).easing(cc.easeQuadraticActionIn()), cc.callFunc(function () {
                // save the symbol need to change parent to on top layer
                if (_this2.specialSymbolNames.indexOf(symbol.symbol) > -1) {
                    _this2._specialSymbol.unshift(symbol);
                }
                if (row === 0) {
                    _this2.onReelStop();
                    _this2.callbackStopReel && _this2.callbackStopReel();
                }
                if (row === 2) {
                    var eventOnReelDown = new cc.Event.EventCustom('REEL_TOUCH_GROUND', true);
                    eventOnReelDown.setUserData({ col: _this2.col });
                    _this2.node.dispatchEvent(eventOnReelDown);
                }
            }));
            symbol.stopAllActions();
            symbol.runAction(symbol._actionFallIn);
            if (_this2.isFastToResult && symbol._actionFallIn) {
                symbol._actionFallIn.speed(4);
            }
        };

        for (var row = this.hideSymbols.length - 1; row >= 0; row--) {
            _loop2(row);
        }
    },
    onReelStop: function onReelStop() {
        this._state = STATE.IDLE;
        for (var row = 0; row < this.showSymbols.length; row++) {
            var _symbol = this.showSymbols[row];
            _symbol.y = this._getSymbolHideY(row);
        }
        // switch 2 arrays: showSymbols with hideSymbols 
        // for next Spin and show payline
        var _hideSymbols = this.hideSymbols;
        this.hideSymbols = this.showSymbols;
        this.showSymbols = _hideSymbols;
        this._storeSymbols();
    },
    _storeSymbols: function _storeSymbols() {
        for (var i = 0; i < this._specialSymbol.length; i++) {
            var _symbol2 = this.showSymbols[i];
            if (this.slotTable) {
                this.slotTable.storeSpecialSymbols(_symbol2, this.reel);
            }
        }
    },
    fastStopSpinning: function fastStopSpinning() {
        this.isFastToResult = true;
        this.showSymbols.forEach(function (symbol) {
            symbol._actionFallHire && symbol._actionFallHire.speed(4);
        });
        this.hideSymbols.forEach(function (symbol) {
            symbol._actionFallIn && symbol._actionFallIn.speed(4);
        });
    },
    fadeOutShowSymbols: function fadeOutShowSymbols() {
        this.showSymbols.forEach(function (symbol) {
            symbol.opacity !== 0 && symbol.runAction(cc.fadeOut(0.5));
        });
    },
    resetSymbols: function resetSymbols() {
        this.showSymbols.forEach(function (symbol) {
            symbol.opacity = 255;
        });
        this.hideSymbols.forEach(function (symbol) {
            symbol.opacity = 255;
        });
    },
    reset: function reset() {
        this._specialSymbol = [];
    },
    bindTable: function bindTable(table) {
        this.slotTable = table;
    },
    processSymbolOnWinJackpot: function processSymbolOnWinJackpot() {
        this.hideSymbols.forEach(function (symbol) {
            symbol.isWinJp = true;
            symbol.opacity = 0;
        });
    }
});

cc._RF.pop();