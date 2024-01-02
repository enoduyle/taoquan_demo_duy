"use strict";
cc._RF.push(module, '0659bqf5gZJJLmv7W8VPgtA', 'SlotTablePaylineInfo9983');
// cc-taoquan-9983/scripts/table/SlotTablePaylineInfo9983.js

"use strict";

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject,
    formatMoney = _require.formatMoney,
    floatUtils = _require.floatUtils;

if (!floatUtils) {
    floatUtils = {
        div: function div(a, b) {
            return a / b;
        }
    };
}

cc.Class({
    extends: cc.Component,

    properties: {
        numOfSymbols: cc.Label,
        symbol: cc.Sprite,
        winAmount: cc.Label,
        equalSymbol: cc.Node,
        combinationString: cc.Label,
        imageList: [cc.SpriteFrame],

        winText: cc.Label
    },

    start: function start() {
        this.node.on("SHOW_PAYLINE", this.showPaylineInfo, this);
        this.node.on("HIDE_PAYLINE", this.hidePaylineInfo, this);
        this.assets = convertAssetArrayToObject(this.imageList);
        this.node.active = false;
        this.localizeText();
    },
    localizeText: function localizeText() {
        this.winText.string = "th\u1EAFng";
        this.lineText = 'Line';
        if (!this.node.config) return;
        var _node$config = this.node.config,
            MESSAGE_DIALOG = _node$config.MESSAGE_DIALOG,
            PAY_LINE_ALLWAYS = _node$config.PAY_LINE_ALLWAYS;
        var _MESSAGE_DIALOG$LINE = MESSAGE_DIALOG.LINE,
            LINE = _MESSAGE_DIALOG$LINE === undefined ? 'Line' : _MESSAGE_DIALOG$LINE,
            _MESSAGE_DIALOG$WIN = MESSAGE_DIALOG.WIN,
            WIN = _MESSAGE_DIALOG$WIN === undefined ? "Thắng" : _MESSAGE_DIALOG$WIN,
            _MESSAGE_DIALOG$WIN_T = MESSAGE_DIALOG.WIN_TEXT_1,
            WIN_TEXT_1 = _MESSAGE_DIALOG$WIN_T === undefined ? "thắng" : _MESSAGE_DIALOG$WIN_T;


        this.lineText = LINE;
        if (PAY_LINE_ALLWAYS) {
            this.winText.string = WIN.toLowerCase();
        } else {
            this.winText.string = WIN_TEXT_1.toLowerCase();
        }
    },
    showPaylineInfo: function showPaylineInfo(_ref) {
        var line = _ref.line;

        this.node.active = true;
        var payLineSymbol = line.payLineSymbol,
            payLineWinNumbers = line.payLineWinNumbers,
            payLineWinAmount = line.payLineWinAmount,
            paylineMaxColumn = line.paylineMaxColumn,
            wildMultiplier = line.wildMultiplier;

        this.equalSymbol.active = false;

        this.combinationString.node.active = false;

        this.numOfSymbols.string = Number(paylineMaxColumn);
        this.symbol.spriteFrame = this.assets[payLineSymbol];
        this.winAmount.string = formatMoney(payLineWinAmount);

        if (Number(payLineWinNumbers) > 1) {
            this.equalSymbol.active = true;
            var divVal = floatUtils.div(payLineWinAmount, payLineWinNumbers);
            var winPerline = formatMoney(floatUtils.div(divVal, wildMultiplier));
            this.combinationString.node.active = true;
            this.combinationString.string = winPerline + " x " + payLineWinNumbers;
            if (wildMultiplier > 1) {
                this.combinationString.string += " x " + Number(wildMultiplier);
            }
        } else if (wildMultiplier > 1) {
            this.equalSymbol.active = true;
            var _winPerline = formatMoney(floatUtils.div(payLineWinAmount, wildMultiplier));
            this.combinationString.node.active = true;
            this.combinationString.string = _winPerline + " x " + Number(wildMultiplier);
        }
    },
    hidePaylineInfo: function hidePaylineInfo() {
        this.node.active = false;
    }
});

cc._RF.pop();