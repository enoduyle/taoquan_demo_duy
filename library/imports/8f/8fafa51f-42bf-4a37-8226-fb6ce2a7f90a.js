"use strict";
cc._RF.push(module, '8fafaUfQr9KN4Im+2zip/kK', 'BetOptionItem');
// cc-common/cc-slotbase-v2/portrailGame/BetOptionItem.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        betOptionValue: cc.Label
    },

    onLoad: function onLoad() {
        this.node.on('UPDATE_DATA', this.updateData, this);
        this.node.updateData = this.updateData.bind(this);
    },
    updateData: function updateData(values, index, controller) {
        this.controller = controller;
        this.betOptionValue.string = formatMoney(values);
        this.itemIndex = index;
    },
    onClick: function onClick() {
        if (!this.controller.getSelectBlocked()) {
            this.controller.setStopTouchUp();
            this.controller.selectBet(this.itemIndex, 0.5);
        }
    }
});

cc._RF.pop();