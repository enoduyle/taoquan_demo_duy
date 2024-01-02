(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/History/Scripts/BetCellHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1602cOFw+VKPJ98V/r0AgKG', 'BetCellHistory', __filename);
// cc-common/cc-share-v1/History/Scripts/BetCellHistory.js

"use strict";

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: require("BaseCellHistory"),

    properties: {
        session: cc.Node,
        betDenom: cc.Node,
        betLines: cc.Node,
        totalbet: cc.Node,
        detailBtn: cc.Node,
        featureGroup: cc.Node,

        freeCircle: cc.Node, //yellow
        bonusCircle: cc.Node, //blue
        topUpCircle: cc.Node, //green 
        jackpotCircle: cc.Node, //red
        positionCircles: [cc.Node]
    },

    onLoad: function onLoad() {
        this._super();
        if (this.node.config.PAY_LINE_ALLWAYS) {
            if (JSON.stringify(this.node.config.TABLE_FORMAT) === "[3,3,3,3,3]") this.totalLineCount = '243';else this.totalLineCount = 'All ways';
        }
        if (this.freeCircle) this.freeCircle.active = false;
        if (this.bonusCircle) this.bonusCircle.active = false;
        if (this.topUpCircle) this.topUpCircle.active = false;
        if (this.jackpotCircle) this.jackpotCircle.active = false;
    },
    updateData: function updateData(data) {
        this.detailBtn.active = false;

        if (!data) return;
        this.playSessionId = data.sessionId;
        this.session.getComponent(cc.Label).string = "#" + data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);
        this.time.getComponent(cc.Label).string = this.formatTimeStamp(parseInt(data.time));
        if (this.betDenom) this.betDenom.getComponent(cc.Label).string = Number(data.betDenom);
        this.totalbet.getComponent(cc.Label).string = formatMoney(Number(data.totalBetAmount));
        this.winAmount.getComponent(cc.Label).string = formatMoney(data.totalWinAmount);

        if (this.node.config.PAY_LINE_ALLWAYS) this.betLines.getComponent(cc.Label).string = this.totalLineCount;else {
            this.betLines.getComponent(cc.Label).string = (data.bettingLines.match(/,/g) || []).length + 1;
        }

        this.detailBtn.active = true;

        this.dataDetail = data;
        if (this.featureGroup) {
            this.freeCircle.active = data.freeGameTotal > 0;
            this.bonusCircle.active = data.totalBonusWinAmount > 0;
        }
        this.addCircle(data);
    },
    onClickDetail: function onClickDetail() {
        if (this.node.opacity < 255) return;
        this.clickItemEvent = new cc.Event.EventCustom('OPEN_BET_DETAIL', true);
        this.clickItemEvent.setUserData({
            sessionId: this.playSessionId,
            summaryData: this.dataDetail
        });
        this.node.dispatchEvent(this.clickItemEvent);
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
    },
    addCircle: function addCircle(data) {
        var _this = this;

        if (!data) return;
        var listMode = [];
        if (this.freeCircle) this.freeCircle.active = false;
        if (this.bonusCircle) this.bonusCircle.active = false;
        if (this.topUpCircle) this.topUpCircle.active = false;
        if (this.jackpotCircle) this.jackpotCircle.active = false;

        var freeGameTotal = data.freeGameTotal,
            totalJpWinAmount = data.totalJpWinAmount,
            totalBonusWinAmount = data.totalBonusWinAmount;


        if (totalJpWinAmount && totalJpWinAmount > 0 && this.jackpotCircle) {
            this.jackpotCircle.active = true;
            listMode.push(this.jackpotCircle);
        }
        if (totalBonusWinAmount && totalBonusWinAmount > 0 && this.bonusCircle) {
            this.bonusCircle.active = true;
            listMode.push(this.bonusCircle);
        }

        if (freeGameTotal && this.freeCircle) {
            this.freeCircle.active = true;
            listMode.push(this.freeCircle);
        }

        if (listMode.length > 0 && this.positionCircles.length > 0) {
            listMode.forEach(function (item, index) {
                var position = _this.positionCircles[index].position;
                item.setPosition(position);
            });
        }
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
        //# sourceMappingURL=BetCellHistory.js.map
        