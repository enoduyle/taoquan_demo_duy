"use strict";
cc._RF.push(module, '5aa60El74pOI692dgYl4HKd', 'BaseCellHistory');
// cc-common/cc-share-v1/History/Scripts/BaseCellHistory.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var _require2 = require('utils'),
    formatUserName = _require2.formatUserName;

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

cc.Class({
    extends: cc.Component,

    properties: {
        time: cc.Node,
        account: cc.Node,
        bet: cc.Node,
        winAmount: cc.Node,
        timeFormat: "DD/MM hh:mm:ss"
    },

    onLoad: function onLoad() {
        this.node.updateData = this.updateData.bind(this);
    },
    updateData: function updateData(data) {
        if (!data) return;
        this.time.getComponent(cc.Label).string = this.formatTimeStamp(data.time);
        this.account.getComponent(cc.Label).string = formatUserName(data.dn);
        this.bet.getComponent(cc.Label).string = formatMoney(data.betAmt);
        this.winAmount.getComponent(cc.Label).string = formatMoney(data.jpAmt);
    },
    formatTimeStamp: function formatTimeStamp(ts) {
        var date = new Date(ts);
        var time = '';

        var year = date.getFullYear();
        var month = addZero(date.getMonth() + 1);
        var day = addZero(date.getDate());

        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var seconds = addZero(date.getSeconds());

        if (this.timeFormat) {
            time = this.timeFormat.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
        } else {
            time = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return time;
    }
});

cc._RF.pop();