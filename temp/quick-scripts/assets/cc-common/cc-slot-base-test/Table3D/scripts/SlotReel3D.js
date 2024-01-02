(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/Table3D/scripts/SlotReel3D.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0ae2cwaHpJCkbdSvL+mumYe', 'SlotReel3D', __filename);
// cc-common/cc-slot-base-test/Table3D/scripts/SlotReel3D.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        reel: cc.Node
    },

    onLoad: function onLoad() {
        this.node.mainComponent = this;
        this.MAX_STEP = Number.MAX_SAFE_INTEGER;
        this._symbols = [];
    },
    init: function init(showNumber, gameConfig, col, symbolPrefab) {
        var CIRCLE_ANGLE = gameConfig.CIRCLE_ANGLE,
            SYMBOLS_PER_REEL = gameConfig.SYMBOLS_PER_REEL,
            SYMBOL_HEIGHT = gameConfig.SYMBOL_HEIGHT,
            SYMBOL_NAME_LIST = gameConfig.SYMBOL_NAME_LIST;

        this.col = col;
        this.config = gameConfig;
        this.symbolList = SYMBOL_NAME_LIST[col];
        this.symbolPrefab = symbolPrefab;
        this.showNumber = showNumber;
        this.showSymbols = [];
        var bufferSymbols = this.config.TABLE_SYMBOL_BUFFER.TOP + this.config.TABLE_SYMBOL_BUFFER.BOT;
        this.totalNumber = this.showNumber + bufferSymbols;
        this.symbolStartY = -(this.config.TABLE_FORMAT[col] / 2 + this.config.TABLE_SYMBOL_BUFFER.BOT - 0.5) * SYMBOL_HEIGHT;
        this.slotAngle = CIRCLE_ANGLE / SYMBOLS_PER_REEL;
        this.startAngle = -this.slotAngle * bufferSymbols;
        this.symbolsPerReel = SYMBOLS_PER_REEL;
        // calculate reel radius
        this.reelRadius = Math.round(SYMBOL_HEIGHT / 2 / Math.tan(Math.PI / this.symbolsPerReel));
        for (var index = 0; index < this.totalNumber; ++index) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.name = "Symbol_" + index;
            symbol.parent = this.reel;

            this.setSymbolValue(symbol, index);
            symbol.changeToSymbol(this.getRandomSymbolName());
            this._symbols.unshift(symbol);
        }

        this.mode = 'FAST';
        this.curentConfig = this.config.STATS[this.mode];
        this.index = 0;
        this.reset();
    },
    setSymbolValue: function setSymbolValue(symbol, index) {
        var angle = this.getAngle(index);
        symbol.y = this.getCircleY(-angle, this.reelRadius);
        symbol.z = this.getCircleZ(-angle, this.reelRadius);
        symbol.eulerAngles = cc.v3(angle, 0, 0);
        symbol.eulerAngles = cc.v3(angle, 0, 0);
    },
    getCircleZ: function getCircleZ(angle, radius) {
        var radian = angle * Math.PI / 180;
        return Math.cos(radian) * radius;
    },
    getCircleY: function getCircleY(angle, radius) {
        var radian = angle * Math.PI / 180;
        return Math.sin(radian) * radius;
    },
    getAngle: function getAngle(index) {
        var angle = this.startAngle + this.slotAngle * index;
        return angle;
    },
    getRandomSymbolName: function getRandomSymbolName() {
        return this.symbolList[Math.floor(Math.random() * this.symbolList.length)];
    },
    reset: function reset() {
        this.stop = 0;
        this.step = this.MAX_STEP;
        this.showResult = 0;
        this.matrix = [];
    },
    setMode: function setMode(mode) {
        this.mode = mode;
    },
    calculateAngle: function calculateAngle(pixel) {
        return pixel / this.config.SYMBOL_HEIGHT * this.slotAngle;
    },
    startSpinningWithDelay: function startSpinningWithDelay(delay) {
        var _this = this;

        this.step = this.MAX_STEP - 1;
        this.isFastToResult = false;
        this.curentConfig = this.config.STATS[this.mode];
        this.currentSpeed = this.curentConfig.TIME;

        var angle = this.calculateAngle(25);
        this.tweenSpinning = cc.tween(this.reel).delay(delay * this.curentConfig.REEL_DELAY_START).by(this.currentSpeed, { eulerAngles: cc.v3(-angle, 0, 0) }).by(this.currentSpeed, { eulerAngles: cc.v3(angle, 0, 0) }).call(function () {
            _this.runSpinning();
        }).start();
    },
    runSpinning: function runSpinning() {
        var _this2 = this;

        this.runSpinningAnimation(function () {
            if (_this2.step > _this2.showNumber) {
                _this2.runSpinning();
                _this2.step--;
                if (_this2.step < _this2.totalNumber) {
                    _this2.showResult = 1;
                }
            } else if (_this2.step == _this2.showNumber) {
                // check last reel, near win and not fast to result
                if (_this2.delayIndex === _this2.config.TABLE_FORMAT.length - 1 && _this2.isNearWin && !_this2.isFastToResult) {
                    _this2.runStopAnimation(50, 0.2);
                } else {
                    _this2.runStopAnimation(_this2.curentConfig.REEL_EASING_DISTANCE, _this2.curentConfig.REEL_EASING_TIME);
                }
            }
        });
    },
    stopSpinningWithDelay: function stopSpinningWithDelay(delay) {
        var matrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var callback = arguments[2];

        this.delayIndex = delay;
        this.showSymbols = [];
        this.matrix = matrix;
        this.callbackStopReel = callback ? callback : function () {};
        var reelDelayStop = delay * this.curentConfig.REEL_DELAY_STOP;
        this.isNearWin = false;

        this.delay = delay;
        cc.director.getScheduler().schedule(this.setStepToStop, this, 0, 0, reelDelayStop, false);

        this.matrix.unshift(this.getRandomSymbolNameWithException('2'));

        if (this.config.TABLE_SYMBOL_BUFFER.BOT > 0) {
            this.matrix.push(this.getRandomSymbolNameWithException('3'));
        }
    },
    setStepToStop: function setStepToStop() {
        this.step = this.curentConfig.STEP_STOP * 2 - this.totalNumber;
    },
    fastStopSpinning: function fastStopSpinning() {
        if (this.step === this.MAX_STEP) return;
        this.isFastToResult = true;
        cc.director.getScheduler().unschedule(this.setStepToStop, this);
        this.showResult = 1;
        this.currentSpeed = this.currentSpeed / 3;
    },
    runStopAnimation: function runStopAnimation(indexNearWin, time) {
        var _this3 = this;

        var angle = this.calculateAngle(indexNearWin);
        var timer = time ? time : this.curentConfig.TIME;
        this.onReelStop();
        this.tweenSpinning = cc.tween(this.reel).by(timer, { eulerAngles: cc.v3(angle, 0, 0) }).by(timer, { eulerAngles: cc.v3(-angle, 0, 0) }).call(function () {
            _this3.reset();
            _this3.callbackStopReel();
            cc.director.getScheduler().unschedule(_this3.setStepToStop, _this3);
            _this3.currentSpeed = _this3.curentConfig.TIME;
        }).start();
    },
    onReelStop: function onReelStop() {},
    runSpinningAnimation: function runSpinningAnimation(callback) {
        var _this4 = this;

        var time = this.currentSpeed + this.currentSpeed * this.stop / 4;
        this.tweenSpinning = cc.tween(this.reel).by(time, { eulerAngles: cc.v3(this.slotAngle, 0, 0) }).call(function () {
            _this4.circularSymbols();
            callback && callback();
        }).start();
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
                lastSymbol.changeToBlurSymbol(this.getRandomSymbolName());
                lastSymbol.changeToSymbol(symbolValue);
                this.showSymbols.unshift(lastSymbol);
            } else {
                lastSymbol.changeToBlurSymbol(symbolValue);
            }
            this.stop++;
        }
        this.setSymbolValue(lastSymbol, this.symbolsPerReel - this.index - 1);
        this.index++;
    },
    getShowSymbol: function getShowSymbol(index) {
        return this.showSymbols[index];
    },
    getRandomSymbolNameWithException: function getRandomSymbolNameWithException(exceptionSymbol) {
        var symbol = this.symbolList[Math.floor(Math.random() * this.symbolList.length)];
        if (symbol == exceptionSymbol) {
            symbol = this.getRandomSymbolNameWithException(exceptionSymbol);
        }

        return symbol;
    },
    getRandomSymbolNameWithExceptions: function getRandomSymbolNameWithExceptions(exceptionSymbols) {
        var remainSymbols = [];
        var defaultSymbol = '3';
        if (!this.symbolList) return defaultSymbol; //case haven't init;
        for (var i = 0; i < this.symbolList.length; i++) {
            var _symbol = this.symbolList[i];
            var res = true;
            for (var j = 0; j < exceptionSymbols.length; j++) {
                var exception = exceptionSymbols[j];
                if (_symbol == exception) {
                    res = false;
                    break;
                }
            }
            if (res) {
                remainSymbols.push(_symbol);
            }
        }
        var symbol = remainSymbols[Math.floor(Math.random() * remainSymbols.length)];
        return symbol;
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
        //# sourceMappingURL=SlotReel3D.js.map
        