"use strict";
cc._RF.push(module, '3fff1mGAi9NnqFdnPuk1pHM', 'DataStore9983');
// cc-taoquan-9983/scripts/common/DataStore9983.js

'use strict';

var BetDataStore = require('MoneyDataStore');

var _require = require('utils'),
    convertSlotMatrixTBLR = _require.convertSlotMatrixTBLR;

cc.Class({
    extends: require('DataStore'),
    properties: {},

    onLoad: function onLoad() {
        this.node.gSlotDataStore = {
            slotBetDataStore: new BetDataStore(),
            playSession: {},
            lastEvent: {},
            modeTurbo: false,
            isAutoSpin: false,
            spinTimes: 0,
            gameId: "9000",
            isEnableBGM: false,
            isEnableSFX: false
        };
        this.node.gSlotDataStore.gameId = this.gameId;
        this.node.gSlotDataStore.isEnableBGM = this.isEnableBGM;
        this.node.gSlotDataStore.isEnableSFX = this.isEnableSFX;
        this.node.gSlotDataStore.slotBetDataStore.createDefaultBet(this.node.config);

        this.node.gSlotDataStore.formatData = this.formatData.bind(this);
        this.node.gSlotDataStore.convertSlotMatrix = convertSlotMatrixTBLR.bind(this);
        this.node.gSlotDataStore.convertPayLine = this.convertPayLine.bind(this);
    },
    convertPayLine: function convertPayLine() {
        var payLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var listNewPL = [];
        for (var i = 0; i < payLines.length; i++) {
            var dataSplit = payLines[i].split(';');
            if (dataSplit.length >= 3) {
                listNewPL.push({
                    payLineSymbol: dataSplit[0],
                    payLineWinAmount: dataSplit[1],
                    paylineMaxColumn: dataSplit[2],
                    payLineWinNumbers: parseInt(dataSplit[3]),
                    payableSymbol: dataSplit[4],
                    wildMultiplier: dataSplit[5]
                });
            }
        }
        return listNewPL;
    },
    formatData: function formatData(playSession) {
        var TABLE_FORMAT = this.node.config.TABLE_FORMAT;

        this.node.gSlotDataStore.playSession = playSession;
        var lastEvent = void 0;

        var _playSession$lastEven = playSession.lastEvent,
            normalGameResult = _playSession$lastEven.normalGameResult,
            freeGameResult = _playSession$lastEven.freeGameResult,
            freeSpinOptionResult = _playSession$lastEven.freeSpinOptionResult;

        var tableFormat = TABLE_FORMAT;
        if (freeGameResult) {
            lastEvent = freeGameResult;
            lastEvent.type = "freeGame";

            var freeGameTableFormat = this.node.gSlotDataStore.playSession.freeGameTableFormat;

            if (freeGameTableFormat) tableFormat = freeGameTableFormat;
        } else if (freeSpinOptionResult) {
            lastEvent = freeSpinOptionResult;
            lastEvent.type = "freeSpinOptionResult";
        } else {
            lastEvent = normalGameResult;
            lastEvent.type = "normalGame";
            var normalGameTableFormat = this.node.gSlotDataStore.playSession.normalGameTableFormat;

            if (normalGameTableFormat) tableFormat = normalGameTableFormat;
        }

        if (lastEvent.matrix) {
            lastEvent.matrix = this.node.gSlotDataStore.convertSlotMatrix(lastEvent.matrix, tableFormat);
        }
        if (lastEvent.matrixTransform0) {
            lastEvent.matrixTransform0 = this.node.gSlotDataStore.convertSlotMatrix(lastEvent.matrixTransform0, tableFormat);
        }
        if (lastEvent.matrixTransform1) {
            lastEvent.matrixTransform1 = this.node.gSlotDataStore.convertSlotMatrix(lastEvent.matrixTransform1, tableFormat);
        }
        if (lastEvent.matrixTransform2) {
            lastEvent.matrixTransform2 = this.node.gSlotDataStore.convertSlotMatrix(lastEvent.matrixTransform2, tableFormat);
        }
        if (lastEvent.payLines) {
            lastEvent.payLines = this.node.gSlotDataStore.convertPayLine(lastEvent.payLines);
        }

        this.node.gSlotDataStore.lastEvent = lastEvent;
        return lastEvent;
    }
});

cc._RF.pop();