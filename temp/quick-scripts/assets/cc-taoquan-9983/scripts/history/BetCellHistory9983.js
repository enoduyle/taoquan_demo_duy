(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/history/BetCellHistory9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6cbe12NrlNqK0/WpJlLGtW', 'BetCellHistory9983', __filename);
// cc-taoquan-9983/scripts/history/BetCellHistory9983.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: require("BetCellHistory"),

    properties: {
        dotBonus: cc.Node,
        dotFree: cc.Node,
        dotJackpot: cc.Node,
        positionNodes: {
            default: [],
            type: cc.Node
        }
    },

    updateData: function updateData(data) {
        var _this = this;

        this.detailBtn.active = false;

        this.listMode = [];
        this.dotBonus.active = false;
        this.dotFree.active = false;
        this.dotJackpot.active = false;

        var totalBonusWinAmount = data.totalBonusWinAmount,
            freeGameTotal = data.freeGameTotal,
            totalJpWinAmount = data.totalJpWinAmount;


        if (totalJpWinAmount && totalJpWinAmount > 0) {
            this.dotJackpot.active = true;
            this.listMode.push(this.dotJackpot);
        }
        if (freeGameTotal) {
            this.dotFree.active = true;
            this.listMode.push(this.dotFree);
        }
        if (totalBonusWinAmount && totalBonusWinAmount > 0) {
            this.dotBonus.active = true;
            this.listMode.push(this.dotBonus);
        }
        if (this.listMode.length > 0 && this.positionNodes.length > 0) {
            this.listMode.forEach(function (item, index) {
                var position = _this.positionNodes[index].position;
                item.setPosition(position);
            });
        }
        if (!data) return;
        this.playSessionId = data.sessionId;
        this.session.getComponent(cc.Label).string = "#" + data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);
        this.time.getComponent(cc.Label).string = this.formatTimeStamp(Number(data.time));
        this.totalbet.getComponent(cc.Label).string = formatMoney(Number(data.totalBetAmount));
        this.winAmount.getComponent(cc.Label).string = formatMoney(data.totalWinAmount);
        if (this.node.config.PAY_LINE_ALLWAYS) this.betLines.getComponent(cc.Label).string = this.totalLineCount;else {
            this.betLines.getComponent(cc.Label).string = (data.bettingLines.match(/,/g) || []).length + 1;
        }
        this.detailBtn.active = true;
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
        //# sourceMappingURL=BetCellHistory9983.js.map
        