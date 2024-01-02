(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendDataStore.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'efc40R/ENdIcaloEJ9U4PGs', 'ExtendDataStore', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendDataStore.js

"use strict";

cc.Class({
    extends: require('DataStorev2'),

    formatData: function formatData(playSession) {
        var TABLE_FORMAT = this.node.config.TABLE_FORMAT;

        this.node.gSlotDataStore.playSession = playSession;

        var _playSession = playSession,
            matrix = _playSession.matrix,
            freeGameMatrix = _playSession.freeGameMatrix,
            normalGameMatrix = _playSession.normalGameMatrix,
            bonusGameMatrix = _playSession.bonusGameMatrix;

        var tableFormat = TABLE_FORMAT;
        playSession = this._mapNewKeys(playSession);
        if (matrix) {
            playSession.matrix = this.node.gSlotDataStore.convertSlotMatrix(matrix, tableFormat);
        } else if (freeGameMatrix) {
            playSession.matrix = this.node.gSlotDataStore.convertSlotMatrix(freeGameMatrix, tableFormat);
        } else if (normalGameMatrix) {
            playSession.matrix = this.node.gSlotDataStore.convertSlotMatrix(normalGameMatrix, tableFormat);
        } else if (bonusGameMatrix) {
            playSession.bonusGameMatrix = bonusGameMatrix;
        }

        if (playSession.payLines) {
            playSession.payLines = this.node.gSlotDataStore.convertPayLine(playSession.payLines);
        }

        this.node.gSlotDataStore.playSession = playSession;
        cc.warn("%c data-update ", "color: red", this.node.gSlotDataStore.playSession);
        return playSession;
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
        //# sourceMappingURL=ExtendDataStore.js.map
        