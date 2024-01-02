"use strict";
cc._RF.push(module, '5500bYaDTtAUIIi1caHjyFL', 'SlotHistorySummary');
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummary.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var arrayTypeJackpot = ["MINI", "MINOR", "MAJOR", "GRAND"];

cc.Class({
    extends: cc.Component,

    properties: {
        sessionLabel: cc.Label,
        totalBetLabel: cc.Label,
        totalWinLabel: cc.Label,
        // left pannel
        detailTotalBetLabel: cc.Label,

        // right pannel
        summaryLabel: cc.Label,
        normalSummaryLabel: cc.Label,
        detailNormalSummaryLabel: cc.Label,
        bonusSummaryLabel: cc.Label,
        detailBonusSummaryLabel: cc.Label,
        freeSummaryLabel: cc.Label,
        detailFreeSummaryLabel: cc.Label
    },

    onLoad: function onLoad() {
        this.node.on('DISPLAY_DATA', this.updateData, this);
        this.node.on('CLEAR_TOTAL_DETAIL_DATA', this.resetLabelTotalDetail, this);
    },
    resetLabelTotalDetail: function resetLabelTotalDetail() {
        // left pannel
        this.sessionLabel.string = "";
        this.totalBetLabel.string = "";
        this.detailTotalBetLabel.string = "";
        this.totalWinLabel.string = "";
        // right pannel
        this.summaryLabel.string = "";
        this.normalSummaryLabel.string = "";
        this.detailNormalSummaryLabel.string = "";
        this.bonusSummaryLabel.string = "";
        this.detailBonusSummaryLabel.string = "";
        this.freeSummaryLabel.string = "";
        this.detailFreeSummaryLabel.string = "";

        this.totalBetLabel.node.active = false;
        this.detailTotalBetLabel.node.active = false;
        this.totalWinLabel.node.active = false;

        this.summaryLabel.node.active = false;
        this.normalSummaryLabel.node.active = false;
        this.detailNormalSummaryLabel.node.active = false;
        this.bonusSummaryLabel.node.active = false;
        this.detailBonusSummaryLabel.node.active = false;
        this.freeSummaryLabel.node.active = false;
        this.detailFreeSummaryLabel.node.active = false;
    },
    updateData: function updateData(data) {
        var _this = this;

        this.node.opacity = 0;
        this.resetLabelTotalDetail();

        var sessionId = data.sessionId,
            totalBetAmount = data.totalBetAmount,
            betDenom = data.betDenom,
            totalWinAmount = data.totalWinAmount,
            freeGameTotal = data.freeGameTotal,
            totalBonusWinAmount = data.totalBonusWinAmount,
            totalFreeWinAmount = data.totalFreeWinAmount,
            selectedOption = data.selectedOption,
            totalJpWinAmount = data.totalJpWinAmount,
            aAmt = data.aAmt,
            jpInfo = data.jpInfo;


        this.initAllJackpot(jpInfo);

        sessionId = data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);

        var mBetAmount = formatMoney(totalBetAmount / betDenom);
        var normalWin = formatMoney(totalWinAmount - (totalFreeWinAmount || 0) - (totalJpWinAmount || 0));

        totalBetAmount = formatMoney(totalBetAmount);
        totalWinAmount = formatMoney(totalWinAmount);

        this.sessionLabel.node.active = true;
        this.sessionLabel.string = "Phi\xEAn #" + sessionId;
        // left pannel
        this.totalBetLabel.node.active = true;
        this.totalBetLabel.string = "- T\u1ED5ng c\u01B0\u1EE3c: " + totalBetAmount;

        this.detailTotalBetLabel.node.active = true;
        this.detailTotalBetLabel.string = "+ Mua: " + mBetAmount;
        this.detailTotalBetLabel.string += "\n" + ("+ C\u01B0\u1EE3c: x" + betDenom);

        this.totalWinLabel.node.active = true;
        this.totalWinLabel.string = "- T\u1ED5ng th\u1EAFng: " + totalWinAmount;

        // right pannel
        this.summaryLabel.node.active = true;
        this.summaryLabel.string = "Chi tiết:";

        this.normalSummaryLabel.node.active = true;
        this.normalSummaryLabel.string = "- Quay th\u01B0\u1EDDng: " + normalWin;

        var bonusWin = totalBonusWinAmount || 0;
        if (bonusWin > 0) {
            if (this.jackpotBonus) {
                var indexTypeJP = this.getTypeJackpot(this.jackpotBonus.id);
                this.bonusSummaryLabel.node.active = true;
                this.bonusSummaryLabel.string = "- Ch\u1ECDn h\u0169: " + arrayTypeJackpot[indexTypeJP];
                this.bonusSummaryLabel.string += " " + formatMoney(bonusWin);
            }
        }

        if (totalFreeWinAmount) {
            var freeWinTotal = totalFreeWinAmount || 0;

            this.freeSummaryLabel.node.active = true;
            this.detailFreeSummaryLabel.node.active = true;

            this.freeSummaryLabel.string = "- Quay miễn phí: ";

            // detail free
            if (selectedOption && selectedOption == 1) {
                //FREE 8
                this.detailFreeSummaryLabel.string += "+ Chọn FreeGame \n";
                this.detailFreeSummaryLabel.string += "+ Số lần quay: " + freeGameTotal + "\n";
            } else if (selectedOption && selectedOption == 2) {
                //TOPUP
                this.detailFreeSummaryLabel.string += "+ Chọn Topup \n";
                this.detailFreeSummaryLabel.string += "+ Số lần quay: " + freeGameTotal + "\n";
            }

            //scatter win

            var freeWin = freeWinTotal;
            if (aAmt) {
                var amtA1 = aAmt.amtA1,
                    amtA2 = aAmt.amtA2,
                    amtA = aAmt.amtA;

                var totalScatterWinAmount = (amtA1 || 0) + (amtA2 || 0) + (amtA || 0);
                this.detailFreeSummaryLabel.string += "+ Thắng ngọc: " + formatMoney(totalScatterWinAmount) + "\n";
                freeWin = freeWinTotal - totalScatterWinAmount;
            }

            if (selectedOption && selectedOption == 1) {
                this.detailFreeSummaryLabel.string += "+ Thắng Free: " + formatMoney(freeWin) + "\n";
            }
            if (this.jackpotFreeList && this.jackpotFreeList.length > 0) {
                for (var i = 0; i < this.jackpotFreeList.length; i++) {
                    var _indexTypeJP = this.getTypeJackpot(this.jackpotFreeList[i].id);
                    if (_indexTypeJP >= 0) {
                        this.detailFreeSummaryLabel.string += "+ Thắng hũ: " + arrayTypeJackpot[_indexTypeJP] + " " + formatMoney(this.jackpotFreeList[i].amt) + "\n";
                    }
                }
            }
        }
        this.node.opacity = 1;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, 0.02);
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