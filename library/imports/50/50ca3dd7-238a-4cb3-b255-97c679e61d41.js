"use strict";
cc._RF.push(module, '50ca33XI4pMs7JVl8Z55h1B', 'DataStorev2');
// cc-common/cc-slotbase-v2/component/DataStorev2.js

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var BetDataStore = require('MoneyDataStore');

var _require = require('utils'),
    convertSlotMatrixTBLR = _require.convertSlotMatrixTBLR,
    convertPayLine = _require.convertPayLine,
    convertPayLineAllways = _require.convertPayLineAllways;

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
            lastedNormalPaylines: {},
            modeTurbo: false,
            isAutoSpin: false,
            spinTimes: 0,
            gameId: "9984",
            isEnableBGM: false,
            isEnableSFX: false,
            betValueWithGame: [].concat(_toConsumableArray(Array(this.node.config.PAY_LINE_LENGTH).keys())).map(function (i) {
                return i + 1;
            }) // Store selected paylines
        };
        this.node.gSlotDataStore.gameId = this.gameId;
        this.node.gSlotDataStore.isEnableBGM = this.isEnableBGM;
        this.node.gSlotDataStore.isEnableSFX = this.isEnableSFX;
        this.node.gSlotDataStore.slotBetDataStore.createDefaultBet(this.node.config);

        this.node.gSlotDataStore.formatData = this.formatData.bind(this);
        this.node.gSlotDataStore.convertSlotMatrix = convertSlotMatrixTBLR.bind(this);

        if (this.node.config.PAY_LINE_ALLWAYS) {
            this.node.gSlotDataStore.convertPayLine = convertPayLineAllways.bind(this);
        } else {
            this.node.gSlotDataStore.convertPayLine = convertPayLine.bind(this);
        }
    },
    formatData: function formatData(playSession) {
        var _this = this;

        var TABLE_FORMAT = this.node.config.TABLE_FORMAT;

        this.node.gSlotDataStore.playSession = playSession;
        var lastEvent = void 0;

        var _playSession$lastEven = playSession.lastEvent,
            normalGameResult = _playSession$lastEven.normalGameResult,
            freeGameResult = _playSession$lastEven.freeGameResult,
            bonusGameResult = _playSession$lastEven.bonusGameResult,
            freeSpinOptionResult = _playSession$lastEven.freeSpinOptionResult;
        var bonusGameRemain = playSession.bonusGameRemain,
            extend = playSession.extend,
            bonusGameMatrix = playSession.bonusGameMatrix;

        var tableFormat = TABLE_FORMAT;

        if (bonusGameResult) {
            lastEvent = bonusGameResult;
            lastEvent.type = "bonusGame";
        } else if (freeSpinOptionResult) {
            lastEvent = freeSpinOptionResult;
            lastEvent.type = "freeGameOptionResult";
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

        lastEvent = this._mapNewKeys(lastEvent);

        if (lastEvent.matrix) {
            lastEvent.matrix = this.node.gSlotDataStore.convertSlotMatrix(lastEvent.matrix, tableFormat);
        }

        if (lastEvent.payLines) {
            lastEvent.payLines = this.node.gSlotDataStore.convertPayLine(lastEvent.payLines);
        }

        this.node.gSlotDataStore.playSession.currentBonusCredits = 0;
        if (bonusGameRemain > 0 && bonusGameRemain != extend.cfPlayBonus && bonusGameMatrix) {
            this.node.gSlotDataStore.playSession.bonusGameMatrix.forEach(function (it) {
                if (it > 0) _this.node.gSlotDataStore.playSession.currentBonusCredits += it;
            });
        }

        this.node.gSlotDataStore.lastEvent = lastEvent;
        cc.warn("%c data-update ", "color: red", this.node.gSlotDataStore.playSession);
        return lastEvent;
    },
    _mapNewKeys: function _mapNewKeys(lastEvent) {
        var mapKeys = {
            pLines: 'payLines',
            bg: 'bonusGame',
            fg: 'freeGame',
            wAmt: 'winAmount',
            jpInfo: 'jackpotJnfo'
        };

        Object.keys(lastEvent).forEach(function (key) {
            if (mapKeys[key]) {
                var newKey = mapKeys[key];
                lastEvent[newKey] = lastEvent[key];
            }
        });

        return lastEvent;
    }
});

cc._RF.pop();