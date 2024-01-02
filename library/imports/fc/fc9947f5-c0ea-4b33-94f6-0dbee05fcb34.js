"use strict";
cc._RF.push(module, 'fc994f1wOpLM5T2Db7gX8s0', 'ItemWinHistory');
// cc-common/cc-slotbase-v2/slotGame/BetHistory/ItemWinHistory.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        valueWin: cc.Node,
        typeWin: "NORMAL"
    },

    onLoad: function onLoad() {
        this.node.on("UPDATE_WIN", this.updateWin.bind(this));
        this.node.on("RESET_DATA", this.reset.bind(this));
        this.node.typeWin = this.typeWin;
        this.currentWin = 0;
    },
    reset: function reset() {
        this.currentWin = 0;
        this.updateWin(0);
    },
    updateWin: function updateWin() {
        var winAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.currentWin += winAmount;
        this.valueWin.getComponent(cc.Label).string = this.getWinMoney(this.currentWin);
    },
    getWinMoney: function getWinMoney() {
        var money = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return formatMoney(money);
    }
});

cc._RF.pop();