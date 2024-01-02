"use strict";
cc._RF.push(module, 'c7dadLYbwhCZYmQI/AJCKr9', 'StackTable');
// cc-common/cc-slot-base-test/StackTable/StackTable.js

'use strict';

var _require = require('utils'),
    randRange = _require.randRange,
    getRandomElement = _require.getRandomElement;

var fakeFormats = [3, 9, 4, 9, 5, 9, 3, 4, 5];
cc.Class({
    extends: require('SlotTablev2'),

    onLoad: function onLoad() {
        this._super();
        this.init();
        this.showNumber = this.node.config.TABLE_FORMAT[0];
        this.stackSize = 6;
        this._testIndex = 0;
    },

    /**
     * @public 
     */
    startSpinning: function startSpinning() {
        this._super();
        this._testResultReceive();
    },
    setupStack: function setupStack() {
        var _this = this;

        var stackFormats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.stackFormats = stackFormats;
        this.node.reels.forEach(function (reel, col) {
            return reel.processStack(_this.stackFormats[col]);
        });
    },
    setMode: function setMode(evt, mode) {
        this.node.mode = mode || evt;
    },
    fastToResult: function fastToResult() {
        if (this.stopSpinningCallbackCount >= 5) return;
        if (!this.stackFormats) return;
        if (this.isFastToResult) return;
        this.isFastToResult = true;
        var remainSteps = this.stackFormats.map(function (format) {
            return format.step;
        });
        var maxStep = Math.max.apply(null, remainSteps);
        this.node.reels.forEach(function (slotReel) {
            return slotReel.fastStopSpinning(maxStep);
        });
    },

    /**
     * @private 
     */
    _processStack: function _processStack(formats) {
        var _this2 = this;

        var stackFormats = formats.map(function (format) {
            if (format === 9) format = getRandomElement(fakeFormats);
            // format = 0 // !hard code test
            var step = _this2._getStep(format);
            return { format: format, step: step };
        });
        // console.table(stackFormats);
        return stackFormats;
    },
    _getStep: function _getStep(format) {
        if (format === 9) return null;
        if (format > 0) return format + this.stackSize;
        if (format < 0) return this.showNumber + format;
        if (format === 0) return randRange(this.showNumber, this.stackSize);
    },

    /**
     * @TEST 
     * @fakeData
     */
    _testResultReceive: function _testResultReceive() {
        var _this3 = this;

        this.scheduleOnce(function () {
            _this3.setupStack(_this3._getTestFormats());
            var matrix = _this3._getTestMatrix();
            _this3.stopSpinning(matrix, function () {});
        }, 0.2);
    },
    _getTestFormats: function _getTestFormats() {
        var testFormats = [[9, 9, 9, 9, 9], [9, 9, 9, 9, 9]];
        var format = testFormats[this._testIndex %= testFormats.length];
        this._testIndex++;
        return this._processStack(format);
    },
    _getTestMatrix: function _getTestMatrix() {
        return [["3", "A", "R"], ["A", "3", "3"], ["A", "2", "4"], ["3", "2", "3"], ["2", "3", "7"]];
    }
});

cc._RF.pop();