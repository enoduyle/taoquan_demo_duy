"use strict";
cc._RF.push(module, '875262f3vpPMZyK+ogVUnQ3', 'SlotTable9983');
// cc-taoquan-9983/scripts/table/SlotTable9983.js

"use strict";

cc.Class({
    extends: require('SlotTablev2'),

    properties: {
        fishFlyingController: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this.node.on("SET_WILD_TYPE", this.setWildType, this);
    },
    init: function init() {
        this.isFastToResult = false;
        this.node.isFreeMode = this.isFreeMode;
        this.node.curentConfig = this.node.config.STATS[this.node.mode];
        this.node.reels = [];
        this.tableFormat = this.isFreeMode ? this.node.config.TABLE_FORMAT_FREE : this.node.config.TABLE_FORMAT;
        for (var col = 0; col < this.tableFormat.length; ++col) {
            var reel = cc.instantiate(this.reelPrefab);
            //Must attach to node so component can be loadded
            reel.name = "Reel_" + col;
            reel.parent = this.table;
            //Then we can use this
            reel.zIndex = this.tableFormat.length - 1 - col;
            reel.mainComponent.init(this.tableFormat[col], this.node.config, col, this.symbolPrefab, this.isFreeMode);
            reel.setPosition(this.getXPosition(col), 0);
            this.node.reels[col] = reel.mainComponent;
            reel.mainComponent.initTable(this);
        }
    },
    startSpinning: function startSpinning() {
        this.isStopRunning = false;
        this.isHavingFakeWild = false;
        this._super();
    },
    stopReeWithRandomMatrix: function stopReeWithRandomMatrix(callback) {
        var matrixRandom = [];
        for (var col = 0; col < this.tableFormat.length; ++col) {
            matrixRandom[col] = [];
            for (var row = this.tableFormat[col] - 1; row >= 0; --row) {
                matrixRandom[col][row] = this.node.reels[col].getRandomSymbolNameWithException(["A", "K", "s1", "s2"]);
            }
        }
        this.stopSpinning({ matrix: matrixRandom, subSym: [] }, function () {
            callback && callback();
        });
    },
    stopSpinning: function stopSpinning(data, callback) {
        var matrix = data.matrix,
            subSym = data.subSym;

        this.tableData = data;
        this.matrix = matrix;
        this.subSym = subSym;
        this.node.bigSymbols = [];
        this.stopSpinningCallbackCount = 0;
        this.countSoundScatter = 0;
        for (var col = 0; col < this.tableFormat.length; ++col) {
            var currentCol = this.matrix[col];
            var _matrix = [];
            var checkAdd = false;
            for (var row = currentCol.length - 1; row >= 0; --row) {
                var symbolValue = currentCol[row];
                this.node.emit('CHECK_MEGA_SYMBOL', symbolValue, col, row);
                _matrix.push(symbolValue);
                if (symbolValue == 'A' && checkAdd == false) {
                    checkAdd = true;
                    this.countSoundScatter = this.countSoundScatter + 1;
                }
            }
            this.node.reels[col].stopSpinningWithDelay(col, _matrix, data, this.checkStopSpinningCallback.bind(this, _matrix, callback), this.isMissWild(this.matrix));
        }

        if (this.table) {
            this.table.bigSymbols = this.node.bigSymbols;
        }

        this.node.emit('REEL_ABOUT_TO_STOP_NEARWIN', { reels: this.node.reels, data: matrix, subSym: subSym, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_SOUND', { reels: this.node.reels, data: matrix, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_EFFECT', { reels: this.node.reels, data: matrix, context: this });
        this.node.emit('REEL_ABOUT_TO_STOP_MISC', { reels: this.node.reels, data: matrix, context: this });
    },
    isMissWild: function isMissWild(matrix) {
        if (this.isFreeMode) return;
        this.lastWildColumn = -1;
        var countWild = 0;
        for (var col = 0; col < matrix.length; col++) {
            for (var row = 0; row < matrix[col].length; row++) {
                if (matrix[col][row] === 'K') {
                    countWild++;
                    this.lastWildColumn = col;
                }
            }
        }
        return countWild === 0;
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
    checkStopSpinningCallback: function checkStopSpinningCallback(matrix, callback) {
        this._super(matrix, callback);
        if (this.fishFlyingController && !this.isFastToResult) {
            this.fishFlyingController.emit('PLAY_SOUND_FISH_FLYING_END', this.stopSpinningCallbackCount - 1);
        }
        if (this.stopSpinningCallbackCount >= this.node.reels.length && callback && typeof callback == "function") {
            this.node.emit('STOP_SPINNING_SOUND');
            this.fishFlyingController.emit('STOP_FISH_FLYING_EFFECT');
        }
    },
    setWildType: function setWildType(type) {
        for (var col = 0; col < this.tableFormat.length; ++col) {
            this.node.reels[col].setWildType(type);
        }
    },
    playFishFlyingAnimation: function playFishFlyingAnimation(fishFlyingData) {
        fishFlyingData.isTurbo = this.node.mode === 'TURBO';
        fishFlyingData.lastWildColumn = this.lastWildColumn;
        this.fishFlyingController.emit('PLAY_FISH_FLYING_EFFECT', fishFlyingData);
    },
    speedUpFishFlyingEffect: function speedUpFishFlyingEffect(fishFlyingData) {
        this.fishFlyingController.emit('SPEED_UP_FISH_FLYING_EFFECT', fishFlyingData);
    }
});

cc._RF.pop();