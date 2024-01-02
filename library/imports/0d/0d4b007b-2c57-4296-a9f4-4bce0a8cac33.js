"use strict";
cc._RF.push(module, '0d4b0B7LFdClqn0S84KjKwz', 'SlotHistorySummary9983');
// cc-taoquan-9983/scripts/history/SlotHistorySummary9983.js

"use strict";

cc.Class({
    extends: require("SlotHistorySummaryImagesv2"),
    updateData: function updateData(data) {
        var _this = this;

        this.node.opacity = 0;
        this.resetLabelTotalDetail();
        var sessionId = data.sessionId,
            totalWinAmount = data.totalWinAmount,
            totalNormalWinAmount = data.totalNormalWinAmount,
            totalFreeWinAmount = data.totalFreeWinAmount,
            totalJpWinAmount = data.totalJpWinAmount,
            totalBonusWinAmount = data.totalBonusWinAmount,
            jpInfo = data.jpInfo;


        var totalJPGrand = 0;
        var totalJPGMajor = 0;
        if (jpInfo) {
            jpInfo.forEach(function (jp) {
                if (jp.id.includes("GRAND")) {
                    totalJPGrand += jp.amt;
                }
                if (jp.id.includes("MAJOR")) {
                    totalJPGMajor += jp.amt;
                }
            });
        }
        sessionId = data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);

        this.totalWinLabel.string = this.getWinMoney(totalWinAmount);

        this.sessionLabel.node.active = true;
        this.sessionLabel.string = "#" + sessionId;

        this.updateWinAmount('NORMAL', totalNormalWinAmount);
        this.updateWinAmount('FREE', totalFreeWinAmount);
        if (totalJPGrand + totalJPGMajor === totalJpWinAmount) {
            this.updateWinAmount('JACKPOT_GRAND', totalJPGrand);
            this.updateWinAmount('JACKPOT_MAJOR', totalJPGMajor);
        }
        this.updateWinAmount('BONUS', totalBonusWinAmount);

        this.node.opacity = 1;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, 0.02);
    }
});

cc._RF.pop();