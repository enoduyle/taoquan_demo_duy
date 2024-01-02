"use strict";
cc._RF.push(module, '77569nzH8dPI4LgG0IBWag9', 'StackReel');
// cc-common/cc-slot-base-test/StackTable/StackReel.js

"use strict";

cc.Class({
    extends: require('SlotReelv2'),

    /**
     * @LIFE_CYCLE
     */
    onLoad: function onLoad() {
        this._super();
        this.stackFormat = {};
        this.stackSymbolName = "A";
        this.stackSize = 6;
        this._remainStep = this.maxStep;
        this._countStack = 0;
    },

    /** 
     * @API
     */
    init: function init() {
        this._super.apply(this, arguments);
        this._symbols = this.reel.children.slice();
    },
    processStack: function processStack(stackFormat) {
        // {size = 6, format: 0: step : 3}
        this.stackFormat = stackFormat;
    },
    fastStopSpinning: function fastStopSpinning(maxStep) {
        cc.director.getScheduler().unschedule(this.setStepToStop, this);
        this.currentSpeed = this.currentSpeed / 3;
        if (this.showResult === 1) return;
        if (maxStep < this.totalNumber) {
            this.step = this.totalNumber;
        } else if (this.step > maxStep) {
            this.step = maxStep;
        }
        this.remainStep = this.step;
    },


    /**
     * @private
     */
    getRandomSymbolName: function getRandomSymbolName() {
        var randomSymbol = this.symbolList[Math.floor(Math.random() * this.symbolList.length)];
        return randomSymbol === this.stackSymbolName ? this.getRandomSymbolName() : randomSymbol;
    },
    circularSymbols: function circularSymbols() {
        var lastSymbol = this._symbols[this.index % this.totalNumber];
        if (!this.showResult) {
            this.remainStep = this.step;
            lastSymbol.changeToBlurSymbol(this.getRandomSymbolName());
        } else if (this.stop < this.totalNumber) {
            this.remainStep = this.totalNumber - 1 - this.stop;
            var isRealSymbol = this.stop >= this.config.TABLE_SYMBOL_BUFFER.TOP && this.stop < this.showNumber + this.config.TABLE_SYMBOL_BUFFER.TOP;
            var symbolValue = this.matrix[this.stop];
            this.step = this.totalNumber + this.showNumber - (this.stop + this.config.TABLE_SYMBOL_BUFFER.BOT);
            if (isRealSymbol) {
                lastSymbol.changeToSymbol(symbolValue);
                this.showSymbols.unshift(lastSymbol);
            } else {
                lastSymbol.changeToBlurSymbol(symbolValue);
            }
            this.stop++;
        }
        this._processStackSymbol(lastSymbol);
        lastSymbol.y = lastSymbol.y + this.config.SYMBOL_HEIGHT * this.totalNumber;
        this.index++;
    },
    setStepToStop: function setStepToStop() {
        this._super();
        this.remainStep = this.step;
    },
    _processStackSymbol: function _processStackSymbol(lastSymbol) {
        if (this.remainStep === this.stackFormat.step) {
            lastSymbol.changeToSymbol(this.stackSymbolName);
            this._countStack = 1;
            return;
        }
        if (this._countStack > 0 && this._countStack < this.stackSize) {
            lastSymbol.changeToSymbol(this.stackSymbolName);
            this._countStack++;
            return;
        }
        if (this._countStack === this.stackSize) {
            this._countStack = 0;
            return;
        }
    },
    reset: function reset() {
        this._super();
        this.remainStep = this.MAX_STEP;
        this.stackFormat = {};
    }
});

cc._RF.pop();