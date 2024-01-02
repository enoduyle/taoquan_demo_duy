"use strict";
cc._RF.push(module, '8b4ebDg4B9PNLiQagackmMP', 'ExtendSlotTable');
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotTable.js

"use strict";

cc.Class({
    extends: require('SlotTablev2'),

    showAnimIntro: function showAnimIntro() {
        this.isShowAnimIntro = true;
        var matrix = this.getBeautyMatrixRandom();
        for (var col = 0; col < this.tableFormat.length; ++col) {
            var reel = this.node.reels[col];
            for (var row = 0; row < this.tableFormat[col]; ++row) {
                if (reel) {
                    var symbol = reel.showSymbols[row];
                    if (symbol) {
                        var symbolName = matrix[col][row];
                        symbol.changeToSymbol(symbolName);
                    }
                }
            }
        }
        this.node.emit("SETUP_PAYLINES", null, null);
        this.node.emit("SHOW_INTRO_SYMBOLS", matrix);
    },
    hideAnimIntro: function hideAnimIntro() {
        if (!this.isShowAnimIntro) return;
        this.isShowAnimIntro = false;
        this.node.emit('CLEAR_PAYLINES');
    },
    checkStopSpinningCallback: function checkStopSpinningCallback(matrix, callback) {
        this.setUpPaylineAtReel();
        this._super(matrix, callback);
    },
    setUpPaylineAtReel: function setUpPaylineAtReel() {
        var playSession = this.node.gSlotDataStore.playSession;

        if (playSession) {
            var payLines = playSession.payLines;

            this.node.emit('SET_UP_PAYLINE_AT_REEL', this.stopSpinningCallbackCount, payLines);
        }
    }
});

cc._RF.pop();