(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotTable.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8b4ebDg4B9PNLiQagackmMP', 'ExtendSlotTable', __filename);
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
        //# sourceMappingURL=ExtendSlotTable.js.map
        