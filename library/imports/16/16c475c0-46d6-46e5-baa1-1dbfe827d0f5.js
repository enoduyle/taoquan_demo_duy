"use strict";
cc._RF.push(module, '16c47XARtZG5bqhHb/oJ9D1', 'PageInfoCurrency');
// cc-common/cc-slotbase-v2/component/PageInfoCurrency.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        infoNodes: [cc.Node],
        infoConfigs: {
            default: [],
            type: require('SlotCustomDataType').InfoCurrencyConfig
        }
    },

    start: function start() {
        var _node = this.node,
            config = _node.config,
            mainDirector = _node.mainDirector;

        if (!config || !config.IS_SUPPORT_MULTI_CURRENCY || !mainDirector) return;
        var currencyCode = mainDirector.director.getClientCurrency() || '';
        var infoConfig = this.infoConfigs.find(function (config) {
            return config.currencyCode.toUpperCase() == currencyCode.toUpperCase();
        }) || {};
        infoConfig && this.setupInfoPages(infoConfig.infos);
    },
    setupInfoPages: function setupInfoPages(infoData) {
        if (!infoData || !infoData.length) return;
        for (var i = 0; i < infoData.length; i++) {
            this.infoNodes[i].getComponent(cc.Sprite).spriteFrame = infoData[i];
        }
    }
});

cc._RF.pop();