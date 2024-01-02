"use strict";
cc._RF.push(module, '75666zK6yxLRJL8c690ibT6', 'SlotReel');
// cc-common/cc-slotbase-v2/slotGame/table/SlotReel.js

'use strict';

var lodash = require('lodash');

cc.Class({
  extends: cc.Component,
  properties: {
    reel: cc.Node
  },
  onLoad: function onLoad() {
    this.node.mainComponent = this;
    this.MAX_STEP = Number.MAX_SAFE_INTEGER;
  },
  init: function init(showNumber, gameConfig, col, symbolPrefab) {
    this.col = col;
    this.CONFIG = gameConfig;
    this.symbolList = this.CONFIG.SYMBOL_NAME_LIST[col];
    this.symbolPrefab = symbolPrefab;
    this.showNumber = showNumber;
    this.showSymbols = [];
    this.bufferSpace = 1;
    this.totalNumber = this.showNumber + 2;
    if (this.node.hasBigWild) {
      //If there is big wild, there must be enough space for them to roll
      this.bufferSpace = this.showNumber;
      this.totalNumber += this.showNumber - 1;
    }

    for (var i = 0; i < this.totalNumber; ++i) {
      var symbol = cc.instantiate(this.symbolPrefab);
      symbol.name = 'Symbol_' + i;
      symbol.parent = this.reel;
      symbol.x = this.CONFIG.SYMBOL_WIDTH / 2;
      symbol.y = i * this.CONFIG.SYMBOL_HEIGHT + this.CONFIG.SYMBOL_HEIGHT / 2;
      symbol.changeToSymbol(this.getRandomSymbolName());
      if (i >= this.bufferSpace && this.showSymbols.length < this.showNumber) {
        this.showSymbols.unshift(symbol);
      }
    }

    this.node.width = this.CONFIG.SYMBOL_WIDTH;
    this.node.height = this.CONFIG.SYMBOL_HEIGHT * (this.showNumber + 2);

    this.mode = 'FAST';
    this.curentConfig = this.CONFIG.STATS[this.mode];
    this.index = 0;
    this.reset();

    this.node.y = -1 * this.CONFIG.SYMBOL_HEIGHT * this.bufferSpace;
  },
  getRandomSymbolName: function getRandomSymbolName() {
    return this.symbolList[Math.floor(Math.random() * this.symbolList.length)];
  },
  getRandomSymbol: function getRandomSymbol() {
    var _this = this;

    var listSymbol = lodash.cloneDeep(this.symbolList);
    if (typeof this.CONFIG.SUB_SYMBOL !== 'undefined') {
      listSymbol = listSymbol.filter(function (i) {
        return !_this.CONFIG.SUB_SYMBOL.includes(i);
      });
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
    this.curentConfig = this.CONFIG.STATS[this.mode];
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
        if (_this4.delayIndex === _this4.CONFIG.TABLE_FORMAT.length - 1 && _this4.isNearWin && !_this4.isFastToResult) {
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

    this.curentConfig = this.CONFIG.STATS[this.mode];
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
    this.matrix.push(this.getRandomSymbolNameWithException('A'));
    // this.matrix.unshift("2");
    // this.matrix.push("3");
  },
  adjustReelSpeed: function adjustReelSpeed(speed) {
    this.currentSpeed = speed;
  },
  extendTimeToStop: function extendTimeToStop() {
    var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.isNearWin = true;
    var reelDelayStop = (this.curentConfig.REEL_DELAY_STOP + this.curentConfig.NEAR_WIN_DELAY_TIME) * (this.delay + extra);
    if (this.delay === this.CONFIG.TABLE_FORMAT.length - 1) {
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
    indexNearWin = this.CONFIG.IS_CUSTOM_EASING ? -indexNearWin : indexNearWin;
    this.onReelStop();
    var action3 = cc.sequence(cc.callFunc(function () {
      _this5.callbackStopReel();
    }), cc.moveBy(timer, 0, -indexNearWin), cc.moveBy(timer, 0, indexNearWin), cc.callFunc(function () {
      _this5.reset();
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
    var action0 = cc.sequence(cc.moveBy(time, 0, -1 * this.CONFIG.SYMBOL_HEIGHT), cc.callFunc(this.circularSymbols, this), cc.callFunc(callback));
    this.reel.runAction(action0);
  },
  circularSymbols: function circularSymbols() {
    var lastSymbol = this.reel.children[this.index % this.totalNumber];
    if (!this.showResult) {
      lastSymbol.changeToBlurSymbol(this.getRandomSymbolName());
    } else if (this.stop < this.showNumber + 2) {
      // buffer = 2
      var symbolValue = this.matrix[this.stop];
      if (this.node.transformSymbol && typeof this.node.transformSymbol == 'function') {
        //Apply special wild in specific col, or near miss or big wild,.. etcs
        symbolValue = this.node.transformSymbol(symbolValue, this.col, this.stop);
      }
      /**@todo check this condition if buffer !== 2 */
      if (this.stop === 0) {
        lastSymbol.changeToBlurSymbol(symbolValue);
      } else {
        lastSymbol.changeToSymbol(symbolValue);
      }
      this.showSymbols.unshift(lastSymbol);
      this.step = this.totalNumber - this.stop + (this.showNumber - this.bufferSpace);
      this.stop++;
    }
    lastSymbol.y = lastSymbol.y + this.CONFIG.SYMBOL_HEIGHT * this.totalNumber;
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