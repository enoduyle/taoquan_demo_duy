(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotTable.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '91b9bzxxwFLGLgFMyM8OvCb', 'SlotTable', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotTable.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        table: cc.Node,
        reelPrefab: cc.Prefab,
        symbolPrefab: cc.Prefab,
        isFreeMode: false
    },
    onLoad: function onLoad() {
        if (!this.table) this.table = this.node;

        this.node.on("INIT", this.init, this);
        this.node.on("SET_MODE", this.setMode, this);
        this.node.on("START_SPINNING", this.startSpinning, this);
        this.node.on("STOP_SPINNING", this.stopSpinning, this);
        this.node.on("FAST_TO_RESULT", this.fastToResult, this);
        this.node.on("CHANGE_MATRIX", this.changeMatrix, this);

        this.node.on("STOP_REEL_ROOL", this.stopReelRoll, this);
        this.node.on("STOP_REEL_WITH_RANDOM_MATRIX", this.stopReeWithRandomMatrix, this);

        this.node.mode = 'FAST';
    },
    init: function init() {
        this.isFastToResult = false;
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.node.reels = [];
        this.tableFormat = this.node.config.TABLE_FORMAT;
        for (var col = 0; col < this.tableFormat.length; ++col) {
            var reel = cc.instantiate(this.reelPrefab);
            //Must attach to node so component can be loadded
            reel.name = "Reel_" + col;
            reel.parent = this.table;
            //Then we can use this
            reel.mainComponent.init(this.tableFormat[col], this.node.config, col, this.symbolPrefab);
            reel.x = this.getXPosition(col);
            reel.y += -1 * (this.tableFormat[col] - 3) * this.node.config.SYMBOL_HEIGHT / 2;
            this.node.reels[col] = reel.mainComponent;
        }
    },
    getXPosition: function getXPosition(index) {
        return (this.node.config.SYMBOL_WIDTH + this.node.config.SYMBOL_MARGIN_RIGHT) * index;
    },
    setMode: function setMode(mode) {
        this.node.mode = mode;
    },
    changeMatrix: function changeMatrix(_ref) {
        var matrix = _ref.matrix,
            _ref$rowOffset = _ref.rowOffset,
            rowOffset = _ref$rowOffset === undefined ? 0 : _ref$rowOffset;

        this.matrix = matrix;
        for (var col = 0; col < this.tableFormat.length; ++col) {
            for (var row = 0; row < this.tableFormat[col]; ++row) {
                this.node.reels[col].showSymbols[row + rowOffset].changeToSymbol(this.matrix[col][row]);
            }
        }
    },
    stopReelRoll: function stopReelRoll() {
        for (var col = 0; col < this.node.reels.length; ++col) {
            this.node.reels[col].stopReelRoll();
        }
    },
    startSpinning: function startSpinning() {
        this.isFastToResult = false;
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        for (var col = 0; col < this.node.reels.length; ++col) {
            this.node.reels[col].setMode(this.node.mode);
            this.node.reels[col].startSpinningWithDelay(col);
        }
        this.node.emit('TABLE_START_NEARWIN');
        this.node.emit('TABLE_START_SOUND');
        this.node.emit('TABLE_START_EFFECT');
        this.node.emit('TABLE_START_MISC');
    },
    stopReeWithRandomMatrix: function stopReeWithRandomMatrix() {
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
        this.stopSpinning(this.matrixRandom, function () {});
    },
    stopSpinning: function stopSpinning(data, callback) {
        this.matrix = data;
        this.node.bigSymbols = [];
        this.stopSpinningCallbackCount = 0;

        for (var col = 0; col < this.tableFormat.length; ++col) {
            var currentCol = this.matrix[col];
            var matrix = [];
            for (var row = currentCol.length - 1; row >= 0; --row) {
                var symbolValue = currentCol[row];

                this.node.emit('CHECK_MEGA_SYMBOL', symbolValue, col, row);

                matrix.push(symbolValue);
            }
            this.node.reels[col].stopSpinningWithDelay(col, matrix, this.checkStopSpinningCallback.bind(this, matrix, callback));
        }

        if (this.table) {
            this.table.bigSymbols = this.node.bigSymbols;
        }

        this.node.emit('REEL_ABOUT_TO_STOP_NEARWIN', { reels: this.node.reels, data: data, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_SOUND', { reels: this.node.reels, data: data, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_EFFECT', { reels: this.node.reels, data: data, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_MISC', { reels: this.node.reels, data: data, context: this });
    },
    checkStopSpinningCallback: function checkStopSpinningCallback(matrix, callback) {
        this.stopSpinningCallbackCount++;
        var count = this.stopSpinningCallbackCount;

        if (count >= this.node.reels.length && callback && typeof callback == "function") {
            this.node.runAction(cc.sequence([cc.delayTime(this.node.curentConfig.REEL_EASING_TIME * 2), cc.callFunc(function () {
                callback();
            })]));
        }

        this.node.emit('REEL_STOP_NEARWIN', { matrix: matrix, count: count, context: this });
        this.node.emit('REEL_STOP_SOUND', { matrix: matrix, count: count, context: this });
        this.node.emit('REEL_STOP_EFFECT', { matrix: matrix, count: count, context: this });
        this.node.emit('REEL_STOP_MISC', { matrix: matrix, count: count, context: this });
    },
    fastToResult: function fastToResult() {
        if (this.stopSpinningCallbackCount < this.node.reels.length) {
            this.isFastToResult = true;
            for (var col = 0; col < this.node.reels.length; ++col) {
                this.node.reels[col].fastStopSpinning();
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
        //# sourceMappingURL=SlotTable.js.map
        