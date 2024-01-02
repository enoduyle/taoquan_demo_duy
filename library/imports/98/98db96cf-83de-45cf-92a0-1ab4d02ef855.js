"use strict";
cc._RF.push(module, '98db9bPg95Fz5KgGrTQLvhV', 'SlotHistorySummaryImages');
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummaryImages.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var arrayTypeJackpot = ["MINI", "MINOR", "MAJOR", "GRAND"];

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        sessionLabel: cc.Label,
        totalWinLabel: cc.Label,
        totalWinNormal: cc.Node,
        totalJackpotAllModes: cc.Node,
        totalWinFree: cc.Node,
        totalWinTopUp: cc.Node,
        totalWinFreeAllModes: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on('DISPLAY_DATA', this.updateData, this);
        this.node.on('CLEAR_TOTAL_DETAIL_DATA', this.resetLabelTotalDetail, this);
    },
    resetLabelTotalDetail: function resetLabelTotalDetail() {
        this.scrollView.scrollToTop();
        this.totalWinLabel.string = this.getWinMoney(0);
        this.totalWinNormal.emit("RESET_DATA");
        this.totalJackpotAllModes.emit("RESET_DATA");
        this.totalWinFree.emit("RESET_DATA");
        this.totalWinTopUp.emit("RESET_DATA");
        this.totalWinFreeAllModes.emit("RESET_DATA");

        this.totalWinFree.active = false;
        this.totalWinTopUp.active = false;
        this.totalWinFreeAllModes.active = true;
        this.totalJackpotAllModes.active = true;
    },
    getWinMoney: function getWinMoney() {
        var money = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return formatMoney(money);
    },
    updateData: function updateData(data) {
        var _this = this;

        this.node.opacity = 0;
        this.resetLabelTotalDetail();
        console.warn("response summary " + JSON.stringify(data));
        var sessionId = data.sessionId,
            totalWinAmount = data.totalWinAmount,
            freeSummary = data.freeSummary,
            totalFreeWinAmount = data.totalFreeWinAmount,
            totalJpWinAmount = data.totalJpWinAmount,
            jpInfo = data.jpInfo;


        this.initAllJackpot(jpInfo);

        sessionId = data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);

        var normalWin = totalWinAmount - (totalFreeWinAmount || 0) - (totalJpWinAmount || 0);

        this.totalWinLabel.string = this.getWinMoney(totalWinAmount);

        this.sessionLabel.node.active = true;
        this.sessionLabel.string = "#" + sessionId;

        this.totalWinNormal.emit("UPDATE_WIN", normalWin);

        if (this.jackpotBonus) {
            this.updateWinJackpot(this.jackpotBonus.amt);
        }

        if (this.jackpotNormal) {
            this.updateWinJackpot(this.jackpotNormal.amt);
        }

        if (freeSummary && freeSummary.length > 0) {
            this.totalWinFreeAllModes.active = false;
            freeSummary.forEach(function (it) {
                if (it.selectOption == 1) {
                    _this.totalWinFree.emit("UPDATE_WIN", it.winAmount);
                    _this.totalWinFree.active = it.winAmount > 0;
                } else if (it.selectOption == 2) {
                    _this.totalWinTopUp.emit("UPDATE_WIN", it.winAmount);
                    _this.totalWinTopUp.active = it.winAmount > 0;
                }
            });
        }

        if (this.jackpotFreeList && this.jackpotFreeList.length > 0) {
            for (var i = 0; i < this.jackpotFreeList.length; i++) {
                this.updateWinJackpot(this.jackpotFreeList[i].amt);
            }
        }

        this.node.opacity = 1;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, 0.02);
    },
    updateWinJackpot: function updateWinJackpot() {
        var winAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.totalJackpotAllModes.active = true;
        this.totalJackpotAllModes.emit("UPDATE_WIN", winAmount);
    },
    initAllJackpot: function initAllJackpot(jpInfo) {
        this.jackpotNormal = null;
        this.jackpotBonus = null;
        this.jackpotFreeList = [];

        if (jpInfo) {
            for (var i = 0; i < jpInfo.length; i++) {
                if (jpInfo[i].mode == "bonus") {
                    this.jackpotBonus = jpInfo[i];
                } else if (jpInfo[i].mode == "normal") {
                    this.jackpotNormal = jpInfo[i];
                } else {
                    this.jackpotFreeList.push(jpInfo[i]);
                }
            }
        }
    },
    getTypeJackpot: function getTypeJackpot(jackpotId) {
        for (var index = 0; index < arrayTypeJackpot.length; index++) {
            var jp = arrayTypeJackpot[index];
            if (jackpotId.includes(jp)) {
                return index;
            }
        }
        return -1;
    }
});

cc._RF.pop();