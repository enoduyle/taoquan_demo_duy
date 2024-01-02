(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/Table3D/scripts/SlotTable3D.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '571e5/XplNH/IUE1hiInAv8', 'SlotTable3D', __filename);
// cc-common/cc-slot-base-test/Table3D/scripts/SlotTable3D.js

'use strict';

var TABLE_STATE = {
    SPINNING: 0,
    GOT_RESULT: 1,
    FAST_TO_RESULT: 2,
    IDLE: 3
};
cc.Class({
    extends: cc.Component,

    properties: {
        reelPrefab: cc.Prefab,
        symbolPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.init();
        this.node.mode = 'FAST';
    },
    init: function init() {
        this.isFastToResult = false;
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.node.reels = [];
        this.tableFormat = this.node.config.TABLE_FORMAT;
        for (var col = 0; col < this.tableFormat.length; ++col) {
            var reel = cc.instantiate(this.reelPrefab);
            reel.name = "Reel_" + col;
            reel.parent = this.node;
            reel.mainComponent.init(this.tableFormat[col], this.node.config, col, this.symbolPrefab);
            reel.setPosition(this.getXPosition(col), 0);
            this.node.reels[col] = reel.mainComponent;
        }
        this.currentState = TABLE_STATE.IDLE;
    },
    setMode: function setMode(mode) {
        this.node.mode = mode;
    },
    getXPosition: function getXPosition(index) {
        var startX = -(this.tableFormat.length / 2 - 0.5) * this.node.config.SYMBOL_WIDTH;
        return startX + this.node.config.SYMBOL_WIDTH * index;
    },
    startSpinning: function startSpinning() {
        var _this = this;

        if (this.currentState !== TABLE_STATE.IDLE) return cc.log('Table is spinning');
        this.currentState = TABLE_STATE.SPINNING;
        this.isStop = false;
        this.isFastToResult = false;
        this.canFTR = false;
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        for (var col = 0; col < this.node.reels.length; ++col) {
            this.node.reels[col].setMode(this.node.mode);
            this.node.reels[col].startSpinningWithDelay(col);
        }
        this.scheduleOnce(function () {
            _this.currentState = TABLE_STATE.GOT_RESULT;
            cc.log('Stop with random matrix');
            _this.stopReeWithRandomMatrix(function () {
                _this.currentState = TABLE_STATE.IDLE;
                cc.log('All reel stopped');
            });
        }, 0.2);
    },
    stopReeWithRandomMatrix: function stopReeWithRandomMatrix(callback) {
        this.matrixRandom = [];
        for (var col = 0; col < this.tableFormat.length; ++col) {
            this.matrixRandom[col] = [];
            for (var row = this.tableFormat[col] - 1; row >= 0; --row) {
                var reel = this.node.reels[col];
                if (reel && reel.getRandomSymbolNameWithExceptions) {
                    this.matrixRandom[col][row] = reel.getRandomSymbolNameWithExceptions(['A', 'R', 'K']);
                } else {
                    this.matrixRandom[col][row] = "3";
                }
            }
        }
        this.stopSpinning(this.matrixRandom, function () {
            callback && callback();
        });
    },
    stopSpinning: function stopSpinning(data, callback) {
        var _this2 = this;

        this.matrix = data;
        this.stopSpinningCallbackCount = 0;
        console.table(this.matrix);
        this.node.reels.forEach(function (reel, col) {
            var currentCol = _this2.matrix[col];
            var matrix = [];
            for (var row = currentCol.length - 1; row >= 0; --row) {
                var symbolValue = currentCol[row];
                matrix.push(symbolValue);
            }
            reel.stopSpinningWithDelay(col, matrix, _this2.checkStopSpinningCallback.bind(_this2, matrix, callback));
        });
    },
    checkStopSpinningCallback: function checkStopSpinningCallback(matrix, callback) {
        this.stopSpinningCallbackCount++;
        var count = this.stopSpinningCallbackCount;

        if (count >= this.node.reels.length && callback && typeof callback == "function") {
            callback();
        }
    },
    fastToResult: function fastToResult() {
        if (this.stopSpinningCallbackCount < this.node.reels.length && this.currentState === TABLE_STATE.GOT_RESULT) {
            this.currentState = TABLE_STATE.FAST_TO_RESULT;
            this.isFastToResult = true;
            for (var col = 0; col < this.node.reels.length; ++col) {
                this.node.reels[col].fastStopSpinning();
            }
        } else {
            cc.log('Can not fast to result');
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
        //# sourceMappingURL=SlotTable3D.js.map
        