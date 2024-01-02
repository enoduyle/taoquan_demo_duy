(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummaryImagesv2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '90176Rk6TBP7oy7tEDoCxTc', 'SlotHistorySummaryImagesv2', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotHistorySummaryImagesv2.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        sessionLabel: cc.Label,
        totalWinLabel: cc.Label,

        content: cc.Node
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('DISPLAY_DATA', this.updateData, this);
        this.node.on('CLEAR_TOTAL_DETAIL_DATA', this.resetLabelTotalDetail, this);
        this.mapItem = {};
        this.content.children.forEach(function (it) {
            _this.mapItem[it.getComponent("ItemWinHistory").typeWin] = it;
        });
    },
    resetLabelTotalDetail: function resetLabelTotalDetail() {
        this.scrollView && this.scrollView.scrollToTop();
        this.totalWinLabel.string = this.getWinMoney(0);
        this.content.children.forEach(function (it) {
            it.emit("RESET_DATA");
            it.active = false;
        });
        this.showItem('NORMAL');
        this.showItem('FREE');
        this.showItem('JACKPOT');
        this.showItem('BONUS');
    },
    getWinMoney: function getWinMoney() {
        var money = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return formatMoney(money);
    },
    updateData: function updateData(data) {
        var _this2 = this;

        this.node.opacity = 0;
        this.resetLabelTotalDetail();
        var sessionId = data.sessionId,
            totalWinAmount = data.totalWinAmount,
            freeSummary = data.freeSummary,
            totalNormalWinAmount = data.totalNormalWinAmount,
            totalFreeWinAmount = data.totalFreeWinAmount,
            totalJpWinAmount = data.totalJpWinAmount,
            totalBonusWinAmount = data.totalBonusWinAmount;


        sessionId = data.sessionId.substring(data.sessionId.length - 8, data.sessionId.length);

        this.totalWinLabel.string = this.getWinMoney(totalWinAmount);

        this.sessionLabel.node.active = true;
        this.sessionLabel.string = '#' + sessionId;

        this.updateWinAmount('NORMAL', totalNormalWinAmount);
        this.updateWinAmount('FREE', totalFreeWinAmount);
        this.updateWinAmount('JACKPOT', totalJpWinAmount);
        this.updateWinAmount('BONUS', totalBonusWinAmount);

        if (freeSummary && freeSummary.length > 0) {
            freeSummary.forEach(function (it) {
                if (it.selectOption > 0) {
                    //support for top up game
                    _this2.showItem('FREE', false);
                    var mode = 'FREE_' + it.selectOption;
                    _this2.updateWinAmount(mode, it.winAmount, it.winAmount >= 0);
                }
            });
        }

        this.node.opacity = 1;
        this.scheduleOnce(function () {
            _this2.node.opacity = 255;
        }, 0.02);
    },
    updateWinAmount: function updateWinAmount() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var winAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var isShow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var itemWinHistoryNode = this.mapItem[mode];
        if (itemWinHistoryNode) {
            itemWinHistoryNode.active = isShow;
            itemWinHistoryNode.emit("UPDATE_WIN", winAmount);
        }
    },
    showItem: function showItem() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var isShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var itemWinHistoryNode = this.mapItem[mode];
        if (itemWinHistoryNode) itemWinHistoryNode.active = isShow;
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
        //# sourceMappingURL=SlotHistorySummaryImagesv2.js.map
        