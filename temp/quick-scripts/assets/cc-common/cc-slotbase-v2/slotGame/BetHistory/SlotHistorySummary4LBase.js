(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummary4LBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3af80p72ItICqCUul6WYybi', 'SlotHistorySummary4LBase', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummary4LBase.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var arrayTypeJackpot = ["MINI", "MINOR", "MAJOR", "GRAND"];
cc.Class({
    extends: require("SlotHistorySummary"),

    properties: {
        normalName: "Quay Thường",
        freeGameName: "FreeGame",
        topUpName: "Topup"
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
            scatterAmount = data.scatterAmount,
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
        this.totalBetLabel.string = "T\u1ED5ng c\u01B0\u1EE3c: " + totalBetAmount;

        this.detailTotalBetLabel.node.active = true;
        this.detailTotalBetLabel.string = "- Mua: " + mBetAmount;
        this.detailTotalBetLabel.string += "\n" + ("- C\u01B0\u1EE3c: x" + betDenom);

        this.totalWinLabel.node.active = true;
        this.totalWinLabel.string = "T\u1ED5ng th\u1EAFng: " + totalWinAmount;

        // right pannel
        this.summaryLabel.node.active = true;
        this.summaryLabel.string = "Chi tiết:";

        this.normalSummaryLabel.node.active = true;
        this.normalSummaryLabel.string = "- Quay th\u01B0\u1EDDng: " + normalWin;

        if (this.jackpotNormal) {
            this.detailNormalSummaryLabel.node.active = true;
            this.detailNormalSummaryLabel.string += "+ Thắng hũ: " + arrayTypeJackpot[this.getTypeJackpot(this.jackpotNormal.id)] + " " + formatMoney(this.jackpotNormal.amt) + "\n";
        }

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

            this.freeSummaryLabel.string = "- Thưởng đặc biệt: ";

            // detail free
            if (selectedOption && selectedOption == 1) {
                //FREE 8
                this.detailFreeSummaryLabel.string += "+ Chọn " + this.freeGameName + ". \n";
                this.detailFreeSummaryLabel.string += "+ Số lần quay: " + freeGameTotal + "\n";
            } else if (selectedOption && selectedOption == 2) {
                //TOPUP
                this.detailFreeSummaryLabel.string += "+ Chọn " + this.topUpName + ". \n";
                this.detailFreeSummaryLabel.string += "+ Số lần quay: " + freeGameTotal + "\n";
            }
            //scatter win

            var freeWin = freeWinTotal;
            if (scatterAmount) {
                var amtA1 = scatterAmount.amtA1,
                    amtA2 = scatterAmount.amtA2,
                    amtA = scatterAmount.amtA;

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
        //# sourceMappingURL=SlotHistorySummary4LBase.js.map
        