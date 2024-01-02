"use strict";
cc._RF.push(module, 'efc40R/ENdIcaloEJ9U4PGs', 'ExtendDataStore');
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