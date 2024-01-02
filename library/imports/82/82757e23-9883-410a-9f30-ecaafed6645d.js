"use strict";
cc._RF.push(module, '827574jmINBCp8w7Kr+1mRd', 'TestReel');
// cc-common/cc-slot-base-test/TestReel/TestReel.js

'use strict';

cc.Class({
    extends: require('SlotReelv2'),
    properties: {
        symbolPrefab: cc.Node
    },
    onLoad: function onLoad() {
        window.test = this;
        this._super();
        this.initTest();
        this.remainStep = Number.MAX_SAFE_INTEGER;
    },
    initTest: function initTest() {
        var showNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
        var gameConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var isFreeMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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
        this.symbols = this.reel.children.slice();
        this.reset();
    },
    startSpinningWithDelay: function startSpinningWithDelay(evt) {
        var _this = this;

        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var matrix = ["2", "3", "4"].reverse();
        this._super(delay);
        this.scheduleOnce(function () {
            _this.stopSpinningWithDelay(0, matrix, // fake data result
            function () {});
        }, .2); // time to get response from server: about 200ms
    },
    setMode: function setMode(evt, mode) {
        this.mode = mode;
    }
});

cc._RF.pop();