"use strict";
cc._RF.push(module, '80d325c+ohPk4OvKvi4eNYY', 'SlotTableHistory');
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotTableHistory.js

"use strict";

var _require = require('utils'),
    formatWalletMoney = _require.formatWalletMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        freeGame: cc.Node,
        normalGame: cc.Node,
        bonusGame: cc.Node,
        topupGame: cc.Node,
        symbolNode: cc.Node,
        symbolPrefab: cc.Prefab,
        symbolBonus: cc.Prefab,
        scaleRate: 1,
        scaleNode: cc.Node,
        paylineInfo: cc.Node,
        isFormatMatrix: false
    },

    onLoad: function onLoad() {
        this.symbolPool = new cc.NodePool("SymbolPool");
        this.bonusPool = new cc.NodePool("BonusPool");
        this.bonusPositions = this.bonusGame ? this.bonusGame.getChildByName("Position") : null;
        this.currentFree = 0;
        this.paylineTime = 2;
    },
    setFreePage: function setFreePage(page) {
        this.currentFree = page;
    },
    renderResult: function renderResult(data) {
        this.normalGame.active = false;
        this.freeGame.active = false;
        if (this.bonusGame) this.bonusGame.active = false;
        if (this.topupGame) this.topupGame.active = false;
        this.clearTable();
        this.betDenom = data.betDenom;
        this.currentMode = data.mode;
        this.martrixFormat = data.matrixFormat;
        switch (data.mode) {
            case "normal":
                this.normalGame.active = true;
                this.renderGameTable(data.matrixResult, data.matrixFormat);
                this.renderExtendData(data);
                this.scaleNode.scale = this.scaleRate;
                break;
            case "free":
                this.freeGame.active = true;
                this.renderGameTable(data.matrixResult, data.matrixFormat);
                this.renderExtendData(data);
                this.scaleNode.scale = this.scaleRate;
                break;
            case "bonus":
                this.bonusGame.active = true;
                this.renderBonusTable(data.matrixResult, data.matrixFormat, data.betDenom, data.bettingLines);
                this.renderExtendBonusData(data);
                this.scaleNode.scale = this.scaleRate;
                break;
            case "topup":
                if (this.topupGame) {
                    this.topupGame.active = true;
                    this.renderGameTable(data.matrixResult, data.matrixFormat);
                    this.renderExtendData(data);
                    this.scaleNode.scale = this.scaleRate;
                }
                break;
        }
    },
    renderGameTable: function renderGameTable(matrix, format) {
        var startX = (-format.length / 2 + 0.5) * this.node.config.SYMBOL_WIDTH;
        var count = 0;
        for (var i = 0; i < format.length; i++) {
            var startY = (format[i] / 2 - 0.5) * this.node.config.SYMBOL_HEIGHT;
            for (var j = 0; j < format[i]; j++) {
                var symbol = this.getSymbol(this.currentMode);
                symbol.parent = this.symbolNode;
                symbol.setPosition(startX + i * this.node.config.SYMBOL_WIDTH, startY - j * this.node.config.SYMBOL_HEIGHT);
                symbol.changeToSymbol(matrix[count]);
                symbol.col = i;
                symbol.row = j;
                symbol.val = matrix[count];
                count++;
            }
        }
    },
    renderExtendData: function renderExtendData() {},
    renderExtendBonusData: function renderExtendBonusData() {},
    renderBonusTable: function renderBonusTable(matrix, format, denom, totalLines) {
        var startX = (-format.length / 2 + 0.5) * this.node.config.SYMBOL_WIDTH;
        var count = 0;
        for (var i = 0; i < format.length; i++) {
            var startY = (format[i] / 2 - 0.5) * this.node.config.SYMBOL_HEIGHT;
            for (var j = 0; j < format[i]; j++) {
                var symbol = this.getSymbol(this.currentMode);
                symbol.parent = this.symbolNode;
                symbol.setPosition(startX + i * this.node.config.SYMBOL_WIDTH, startY - j * this.node.config.SYMBOL_HEIGHT);
                symbol.unOpen();
                var credit = parseInt(matrix[count]);
                var value = credit * Number(denom) * Number(totalLines);
                if (value >= 0) symbol.setScore(formatWalletMoney(value));
                if (this.bonusPositions && this.bonusPositions.children[count]) {
                    symbol.setPosition(this.bonusPositions.children[count].position);
                }
                count++;
            }
        }
    },


    /*showNextPayline() {
        let paylineInfo = this.paylines[this.paylineIndex];
        if (!paylineInfo.betDenom) paylineInfo.betDenom = this.betDenom;
        if (this.node.config.PAY_LINE_ALLWAYS) {
            this.showPaylineAllWay(paylineInfo);
        }
        else {
            this.showPaylinePerline(paylineInfo);
        }
        this.paylineInfo.emit('SHOW_PAYLINE',{line: this.paylines[this.paylineIndex]});
        this.paylineIndex = (this.paylineIndex + 1) % this.paylines.length;
        this.paylineTime = 2;
    },*/

    showPaylinePerline: function showPaylinePerline(_ref) {
        var payLineID = _ref.payLineID,
            payLineWinNumbers = _ref.payLineWinNumbers;

        var payline = this.node.config.PAY_LINE_MATRIX[payLineID];
        var count = 0;
        this.symbolNode.children.forEach(function (it) {
            it.opacity = 100;
        });
        for (var i = 0; i < payLineWinNumbers; i++) {
            var symbol = this.symbolNode.children[count + payline[i]];
            if (symbol) symbol.opacity = 255;
            count += this.martrixFormat[i];
        }
    },
    showPaylineAllWay: function showPaylineAllWay(_ref2) {
        var symbolId = _ref2.symbolId,
            symbolCount = _ref2.symbolCount;

        this.symbolNode.children.forEach(function (it) {
            if (it.val == symbolId && it.col < symbolCount) {
                it.opacity = 255;
            } else {
                it.opacity = 100;
            }
        });
    },
    clearPayline: function clearPayline() {
        this.symbolNode.children.forEach(function (it) {
            return it.opacity = 255;
        });
    },


    /*update(dt) {
        if (this.paylineTime > 0 && this.showingPayline)
        {
            this.paylineTime -= dt;
            if (this.paylineTime <= 0)
            {
                this.showNextPayline();
            }
        }
    },*/

    clearTable: function clearTable() {
        var pool = this.symbolPool;
        if (this.currentMode == "bonus") pool = this.bonusPool;
        this.showingPayline = false;
        while (this.symbolNode.children.length > 0) {
            pool.put(this.symbolNode.children[0]);
        }
        this.paylineInfo.emit('HIDE_PAYLINE');
    },
    getSymbol: function getSymbol(type) {
        var pool = this.symbolPool;
        var prefab = this.symbolPrefab;
        if (type == "bonus") {
            pool = this.bonusPool;
            prefab = this.symbolBonus;
        }
        var result = pool.get();
        if (!result) {
            result = cc.instantiate(prefab);
        }
        return result;
    }
});

cc._RF.pop();