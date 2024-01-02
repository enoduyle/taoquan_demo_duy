"use strict";
cc._RF.push(module, '95fa961OeNDsJNUtmMHwDM6', 'SlotReelv2');
// cc-common/cc-slotbase-v2/slotGame/table/SlotReelv2.js

'use strict';

var lodash = require('lodash');

cc.Class({
    extends: require('SlotReel'),
    properties: {
        usingMotionBlur: false,
        animSymbol: cc.Prefab
    },
    onLoad: function onLoad() {
        this.node.mainComponent = this;
        this.MAX_STEP = Number.MAX_SAFE_INTEGER;
    },
    init: function init(showNumber, gameConfig, col, symbolPrefab) {
        var isFreeMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        this.col = col;
        this.config = gameConfig;
        if (isFreeMode) {
            this.symbolList = this.config.SYMBOL_NAME_LIST_FREE[col];
        } else {
            this.symbolList = this.config.SYMBOL_NAME_LIST[col];
        }
        this.symbolPrefab = symbolPrefab;
        this.showNumber = showNumber;
        this.showSymbols = [];
        this.totalNumber = this.showNumber + this.config.TABLE_SYMBOL_BUFFER.TOP + this.config.TABLE_SYMBOL_BUFFER.BOT;
        this.isFreeMode = isFreeMode;
        this.symbolStartY = -(this.config.TABLE_FORMAT[col] / 2 + this.config.TABLE_SYMBOL_BUFFER.BOT - 0.5) * this.config.SYMBOL_HEIGHT;
        for (var i = 0; i < this.totalNumber; ++i) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.name = "Symbol_" + i;
            symbol.parent = this.reel;
            symbol.setPosition(0, this.symbolStartY + i * this.config.SYMBOL_HEIGHT);
            symbol.changeToSymbol(this.getRandomSymbolName());
            if (i >= this.config.TABLE_SYMBOL_BUFFER.BOT && this.showSymbols.length < this.showNumber) {
                this.showSymbols.unshift(symbol);
            }
        }

        this.mode = 'FAST';
        this.curentConfig = this.config.STATS[this.mode];
        this.index = 0;
        this.reset();
    },
    initSymbolBetHistory: function initSymbolBetHistory(showNumber, gameConfig, col, symbolPrefab) {
        var isFreeMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        this.col = col;
        this.config = gameConfig;

        if (isFreeMode) {
            this.symbolList = this.config.SYMBOL_NAME_LIST_FREE[col];
        } else {
            this.symbolList = this.config.SYMBOL_NAME_LIST[col];
        }

        this.symbolPrefab = symbolPrefab;
        this.showNumber = showNumber;
        this.showSymbols = [];
        this.totalNumber = this.showNumber;

        this.symbolStartY = -(this.config.TABLE_FORMAT[col] / 2 - 0.5) * this.config.SYMBOL_HEIGHT_HISTORY;
        for (var i = 0; i < this.totalNumber; ++i) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.name = "Symbol_" + i;
            symbol.parent = this.reel;
            symbol.setPosition(0, this.symbolStartY + i * this.config.SYMBOL_HEIGHT_HISTORY);
            symbol.changeToSymbol(this.getRandomSymbolName());
            if (i >= 0 && this.showSymbols.length < this.showNumber) {
                this.showSymbols.unshift(symbol);
            }
        }

        this.index = 0;
        this.curentConfig = this.config.STATS[this.mode];
        this.reset();
    },
    getRandomSymbolName: function getRandomSymbolName() {
        return this.symbolList[Math.floor(Math.random() * this.symbolList.length)];
    },
    getRandomSymbol: function getRandomSymbol() {
        var _this = this;

        var listSymbol = lodash.cloneDeep(this.symbolList);
        if (typeof this.config.SUB_SYMBOL !== 'undefined') {
            listSymbol = listSymbol.filter(function (i) {
                return !_this.config.SUB_SYMBOL.includes(i);
            });
        }
        if (!listSymbol[Math.floor(Math.random() * listSymbol.length)]) {
            cc.log("Error");
        }
        return listSymbol[Math.floor(Math.random() * listSymbol.length)];
    },
    stopReelRoll: function stopReelRoll() {
        this.reel.stopAllActions();
    },
    reset: function reset() {
        var _this2 = this;

        this.reel.children.forEach(function (child) {
            child.y += _this2.reel.y;
        });
        this.reel.y = 0;
        this.index = this.index % this.totalNumber;
        this.stop = 0;
        this.step = this.MAX_STEP;
        this.showResult = 0;
        this.matrix = [];
    },
    setMode: function setMode(mode) {
        this.mode = mode;
    },
    startSpinningWithDelay: function startSpinningWithDelay(delay) {
        var _this3 = this;

        this.step = this.MAX_STEP - 1;
        this.isFastToResult = false;
        this.curentConfig = this.config.STATS[this.mode];
        this.currentSpeed = this.curentConfig.TIME;
        var action3 = cc.sequence(cc.delayTime(delay * this.curentConfig.REEL_DELAY_START), cc.moveBy(this.currentSpeed, 0, 25), cc.moveBy(this.currentSpeed, 0, -25), cc.callFunc(function () {
            _this3.runSpinning();
        }));
        this.reel.runAction(action3);
    },
    runSpinning: function runSpinning() {
        var _this4 = this;

        this.runSpinningAnimation(function () {
            if (_this4.step > _this4.showNumber) {
                _this4.runSpinning();
                _this4.step--;
                if (_this4.step < _this4.totalNumber) {
                    _this4.showResult = 1;
                }
            } else if (_this4.step == _this4.showNumber) {
                // check last reel, near win and not fast to result
                if (_this4.delayIndex === _this4.config.TABLE_FORMAT.length - 1 && _this4.isNearWin && !_this4.isFastToResult) {
                    _this4.runStopAnimation(50, 0.2);
                } else {
                    _this4.runStopAnimation(_this4.curentConfig.REEL_EASING_DISTANCE, _this4.curentConfig.REEL_EASING_TIME);
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

        //Add 2 more symbol to apply near miss
        this.matrix.unshift(this.getRandomSymbolNameWithException('A'));

        if (this.config.TABLE_SYMBOL_BUFFER.BOT > 0) this.matrix.push(this.getRandomSymbolNameWithException('R'));
        // this.matrix.unshift("2");
        // this.matrix.push("3");
    },
    adjustReelSpeed: function adjustReelSpeed(speed) {
        this.currentSpeed = speed;
    },
    extendTimeToStop: function extendTimeToStop(nearWin) {
        //this.isNearWin = true;
        var reelDelayStop = 0;

        if (nearWin) reelDelayStop = (this.curentConfig.REEL_DELAY_STOP + this.curentConfig.NEAR_WIN_DELAY_TIME) * this.delay;else reelDelayStop = (this.curentConfig.REEL_DELAY_STOP + this.curentConfig.NEAR_WIN_DELAY_TIME) * (this.delay - 1) + this.curentConfig.REEL_DELAY_STOP;

        if (nearWin && this.delay === this.config.TABLE_FORMAT.length - 1) {
            reelDelayStop = reelDelayStop + this.curentConfig.NEAR_WIN_DELAY_TIME_LAST_REEL;
        }
        cc.director.getScheduler().unschedule(this.setStepToStop, this);
        cc.director.getScheduler().schedule(this.setStepToStop, this, 0, 0, reelDelayStop, false);
    },
    setStepToStop: function setStepToStop() {
        this.step = this.curentConfig.STEP_STOP * 2 - this.totalNumber;
    },
    fastStopSpinning: function fastStopSpinning() {
        // check step is reset will not do anything.
        if (this.step === this.MAX_STEP) return;
        this.isFastToResult = true;
        cc.director.getScheduler().unschedule(this.setStepToStop, this);
        this.showResult = 1;
        this.currentSpeed = this.currentSpeed / 3;
    },
    runStopAnimation: function runStopAnimation(indexNearWin, time) {
        var _this5 = this;

        var timer = time ? time : this.curentConfig.TIME;
        this.onReelStop();
        var action3 = cc.sequence(cc.moveBy(timer, 0, -indexNearWin), cc.moveBy(timer, 0, indexNearWin), cc.callFunc(function () {
            _this5.reset();
            _this5.callbackStopReel();
            /// stop schedule when reel is stopped
            cc.director.getScheduler().unschedule(_this5.setStepToStop, _this5);
            _this5.currentSpeed = _this5.curentConfig.TIME;
        }));
        this.reel.runAction(action3);
    },
    onReelStop: function onReelStop() {
        this.reel.children.forEach(function (child) {
            child.changeToSymbol(child.symbol);
        });
    },
    runSpinningAnimation: function runSpinningAnimation(callback) {
        var time = this.currentSpeed + this.currentSpeed * this.stop / 4;
        var action0 = cc.sequence(cc.moveBy(time, 0, -1 * this.config.SYMBOL_HEIGHT), cc.callFunc(this.circularSymbols, this), cc.callFunc(callback));
        this.reel.runAction(action0);
    },
    circularSymbols: function circularSymbols() {
        var lastSymbol = this.reel.children[this.index % this.totalNumber];
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
                lastSymbol.changeToBlurSymbol(symbolValue);
            }
            this.stop++;
        }
        lastSymbol.y = lastSymbol.y + this.config.SYMBOL_HEIGHT * this.totalNumber;
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
    updateSymbols: function updateSymbols(listSymbol) {
        var _this6 = this;

        this.showSymbols.forEach(function (it, index) {
            var nameSymbol = listSymbol[index];
            it.changeToSymbol(nameSymbol);
            var hasAnim = _this6.node.config.SYMBOL_HAVE_ANIM.indexOf(nameSymbol) >= 0;
            if (hasAnim) {
                var slotSymbolPaylineIntro = cc.instantiate(_this6.animSymbol);
                it.addAnimIntro(slotSymbolPaylineIntro);
                slotSymbolPaylineIntro.init(nameSymbol);
                slotSymbolPaylineIntro.emit("PLAY_ANIMATION", true);
            }
        });
    },
    hideAnimIntro: function hideAnimIntro() {
        this.showSymbols.forEach(function (it) {
            it.hideAnimIntro();
        });
    },
    updateIntroScatterToReal: function updateIntroScatterToReal() {
        this.showSymbols.forEach(function (it) {
            it.updateIntroScatterToReal();
        });
    }
});

cc._RF.pop();