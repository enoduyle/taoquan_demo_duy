"use strict";
cc._RF.push(module, 'c052eKpwNJF07FmvIAajcE0', 'BetHistoryMgr');
// cc-common/cc-slotbase-v2/g9000/BetHistoryMgr.js

'use strict';

var _require = require('utils'),
    updateUtilConfig = _require.updateUtilConfig;

cc.Class({
    extends: cc.Component,

    properties: {
        betHistoryPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);

        this.playSession = urlParams.get('psId');
        this.token = urlParams.get('token');
        this.tokenType = urlParams.get('tokenType');
        this.userId = urlParams.get('userId');
        this.currencyCode = urlParams.get('c');

        if (this.currencyCode) {
            this._updateCurrencyConfig();
        }
        if (this.betHistoryPrefab && this.playSession) {
            this.betInstance = cc.instantiate(this.betHistoryPrefab);
            this.betInstance.parent = this.node;
            this.betInstance.opacity = 255;
            this.betInstance.setPosition(0, 0);

            var clickAndShowComp = this.betInstance.getComponent('ClickAndShow');
            clickAndShowComp && clickAndShowComp.enter();

            this.betHistory = this.betInstance.getComponent('BetHistory');
            this.betHistory.setToken(this.token, this.tokenType, this.userId);
            this.betHistory.showBetDetail({ sessionId: this.playSession });
            this.betHistory.disableCloseDetail();
        } else {
            console.warn('Cant get history prefab for game ' + this.gameId);
        }
    },
    _updateCurrencyConfig: function _updateCurrencyConfig() {
        if (!this.node.gSlotDataStore || !this.node.config || !this.node.config.CURRENCY_CONFIG || !this.node.config.IS_SUPPORT_MULTI_CURRENCY) return;
        this.node.gSlotDataStore.currencyCode = this.currencyCode;
        var currencyConfig = this.node.config.CURRENCY_CONFIG[this.currencyCode];
        if (currencyConfig && updateUtilConfig) {
            updateUtilConfig('CURRENCY_CONFIG', currencyConfig.MONEY_FORMAT);
        }
    }
});

cc._RF.pop();