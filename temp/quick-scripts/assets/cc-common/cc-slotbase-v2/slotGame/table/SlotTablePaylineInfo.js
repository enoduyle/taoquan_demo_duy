(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotTablePaylineInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cdbee8Oym9JJZ3oLM0z0mgD', 'SlotTablePaylineInfo', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotTablePaylineInfo.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

var _require2 = require('utils'),
    formatMoney = _require2.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        smallSymbolPrefix: "symbol_small_",
        smallSymbols: {
            type: cc.SpriteFrame,
            default: []
        },
        lbLeft: {
            type: cc.Label,
            default: null
        },
        lbRight: {
            type: cc.Label,
            default: null
        },
        imgSymbol: {
            type: cc.Sprite,
            default: null
        }
    },
    onLoad: function onLoad() {
        this.assets = convertAssetArrayToObject(this.smallSymbols);
        if (this.node.config && this.node.config.PAY_LINE_ALLWAYS) this.showPaylineInfo = this.showPaylineInfoAllways;else if (!this.showPaylineInfo) {
            this.showPaylineInfo = this.showPaylineInfoLine;
        }
    },
    start: function start() {
        this.node.on("SHOW_PAYLINE", this.showPaylineInfo, this);
        this.node.on("HIDE_PAYLINE", this.hidePaylineInfo, this);
        this.hidePaylineInfo();
        this.localizeText();
    },
    localizeText: function localizeText() {
        this.winText = 'th\u1EAFng';
        this.lineText = 'Line';
        if (!this.node.config) return;

        var _node$config = this.node.config,
            MESSAGE_DIALOG = _node$config.MESSAGE_DIALOG,
            PAY_LINE_ALLWAYS = _node$config.PAY_LINE_ALLWAYS;


        this.lineText = this.node.config.MESSAGE_DIALOG.LINE;
        if (PAY_LINE_ALLWAYS) {
            this.winText = MESSAGE_DIALOG.WIN.toLowerCase();
        } else {
            this.winText = MESSAGE_DIALOG.WIN_TEXT_1.toLowerCase();
        }
    },
    showPaylineInfoLine: function showPaylineInfoLine(_ref) {
        var line = _ref.line;
        var payLineID = line.payLineID,
            payLineWinNumbers = line.payLineWinNumbers,
            payLineWinAmount = line.payLineWinAmount,
            payLineSymbol = line.payLineSymbol;


        this.lbLeft.string = this.lineText + ' ' + payLineID + ' ' + this.winText + ' ' + payLineWinNumbers + " x";
        this.lbRight.string = " = " + formatMoney(payLineWinAmount) + "";
        this.imgSymbol.getComponent(cc.Sprite).spriteFrame = this.assets[this.smallSymbolPrefix + payLineSymbol];
        this.node.active = true;
    },
    showPaylineInfoAllways: function showPaylineInfoAllways(_ref2) {
        var line = _ref2.line;
        var symbolId = line.symbolId,
            totalWinAmount = line.totalWinAmount,
            symbolCount = line.symbolCount,
            combination = line.combination,
            payableSymbol = line.payableSymbol;

        var betDenom = this.calculateBetDenom();

        this.lbLeft.string = Number(symbolCount);
        this.imgSymbol.getComponent(cc.Sprite).spriteFrame = this.assets[this.smallSymbolPrefix + symbolId];

        var symbolPayTableString = this.winText + ' ' + payableSymbol;
        var combinationString = combination > 1 ? ' (x' + combination + ')' : '';
        var calculateDenom = ' = ' + formatMoney(payableSymbol * combination) + ' xu x ' + formatMoney(betDenom) + ' = ';
        var winAmount = formatMoney(totalWinAmount) + 'đ';
        this.lbRight.string = symbolPayTableString + combinationString + calculateDenom + winAmount;
        this.node.active = true;
    },
    calculateBetDenom: function calculateBetDenom() {
        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;
        var TOTAL_BET_CREDIT = this.node.config.TOTAL_BET_CREDIT;

        var betIds = this.node.gSlotDataStore.playSession.betId;
        var betIndex = Object.keys(steps).find(function (key) {
            return key == betIds[0];
        });
        return Number(steps[betIndex]) / TOTAL_BET_CREDIT;
    },
    hidePaylineInfo: function hidePaylineInfo() {
        this.node.active = false;
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
        //# sourceMappingURL=SlotTablePaylineInfo.js.map
        