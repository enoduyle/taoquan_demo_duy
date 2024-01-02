"use strict";
cc._RF.push(module, '9a62dJm7NdJIqgX1ztgWZNa', 'DataStore');
// cc-common/cc-slotbase-v2/component/DataStore.js

'use strict';

var BetDataStore = require('MoneyDataStore');

var _require = require('utils'),
    convertSlotMatrixTBLR = _require.convertSlotMatrixTBLR,
    convertPayLine = _require.convertPayLine;

cc.Class({
    extends: cc.Component,
    properties: {
        isEnableBGM: false,
        isEnableSFX: true
    },
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
        this.node.gSlotDataStore.convertPayLine = convertPayLine.bind(this);
    },
    formatData: function formatData(playSession) {
        var TABLE_FORMAT = this.node.config.TABLE_FORMAT;

        this.node.gSlotDataStore.playSession = playSession;
        var lastEvent = void 0;

        var _playSession$lastEven = playSession.lastEvent,
            normalGameResult = _playSession$lastEven.normalGameResult,
            freeGameResult = _playSession$lastEven.freeGameResult,
            bonusGameResult = _playSession$lastEven.bonusGameResult;

        var tableFormat = TABLE_FORMAT;
        if (bonusGameResult) {
            lastEvent = bonusGameResult;
            lastEvent.type = "bonusGame";
        } else if (freeGameResult) {
            lastEvent = freeGameResult;
            lastEvent.type = "freeGame";

            var freeGameTableFormat = this.node.gSlotDataStore.playSession.freeGameTableFormat;

            if (freeGameTableFormat) tableFormat = freeGameTableFormat;
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
        if (lastEvent.payLineJackPot) {
            lastEvent.payLineJackPot = this.node.gSlotDataStore.convertPayLine(lastEvent.payLineJackPot);
        }

        this.node.gSlotDataStore.lastEvent = lastEvent;
        return lastEvent;
    }
});

cc._RF.pop();