"use strict";
cc._RF.push(module, 'bc533ZVkZRHaZlRI7Jc+nqs', 'MoneyDataStore');
// cc-common/cc-share-v1/common/MoneyDataStore.js

'use strict';

var _require = require('utils'),
    convertObjectToArray = _require.convertObjectToArray,
    formatMoney = _require.formatMoney,
    subtractDecimals = _require.subtractDecimals,
    getUtilConfig = _require.getUtilConfig,
    floatUtils = _require.floatUtils;

cc.Class({
    createDefaultBet: function createDefaultBet(slotConfig, dynamicBet) {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        var STEPS = slotConfig.STEPS,
            DEFAULT_BET = slotConfig.DEFAULT_BET,
            EXTRA_BET_STEPS = slotConfig.EXTRA_BET_STEPS,
            DEFAULT_EXTRA_BET = slotConfig.DEFAULT_EXTRA_BET,
            DEFAULT_BET_IFRAME = slotConfig.DEFAULT_BET_IFRAME,
            STEPS_IFRAME = slotConfig.STEPS_IFRAME;

        var dataDefault = {};
        if (dynamicBet) {
            dataDefault = {
                currentBetData: convertObjectToArray(dynamicBet)[0],
                steps: dynamicBet,
                currentExtraBetData: DEFAULT_EXTRA_BET ? DEFAULT_EXTRA_BET : 0,
                extraSteps: EXTRA_BET_STEPS
            };
        } else if (LOGIN_IFRAME && DEFAULT_BET_IFRAME && STEPS_IFRAME) {
            dataDefault = {
                currentBetData: DEFAULT_BET_IFRAME,
                steps: STEPS_IFRAME,
                currentExtraBetData: DEFAULT_EXTRA_BET ? DEFAULT_EXTRA_BET : 0,
                extraSteps: EXTRA_BET_STEPS
            };
        } else {
            dataDefault = {
                currentBetData: DEFAULT_BET,
                steps: STEPS,
                currentExtraBetData: DEFAULT_EXTRA_BET ? DEFAULT_EXTRA_BET : 0,
                extraSteps: EXTRA_BET_STEPS
            };
        }
        this.data = Object.assign({}, dataDefault);
        return this.data;
    },
    updateCurrentBet: function updateCurrentBet(value) {
        this.data.currentBetData = value;
    },
    updateCurrentExtraBet: function updateCurrentExtraBet(value) {
        this.data.currentExtraBetData = value;
    },
    updateWallet: function updateWallet(value) {
        if (!floatUtils.isEqual(value, this.data.wallet)) {
            var diff = floatUtils.minus(value, this.data.wallet);
            var sign = diff > 0 ? "+" : "";
            cc.log("%cWallet change: ", "color:red;", this.data.wallet, sign, diff, "=", value);
        }
        this.data.wallet = value;
    },
    calculateWalletAfterClickSpin: function calculateWalletAfterClickSpin(totalBetData) {
        var _data = this.data,
            wallet = _data.wallet,
            currentBetData = _data.currentBetData;

        return floatUtils.minus(wallet, totalBetData || currentBetData);
    },
    updateWalletAfterClickSpin: function updateWalletAfterClickSpin(totalBetData) {
        var _data2 = this.data,
            wallet = _data2.wallet,
            currentBetData = _data2.currentBetData;

        if (wallet >= currentBetData) {
            this.data.wallet = floatUtils.minus(wallet, totalBetData || currentBetData);
            cc.log("%cWallet change on Spin:", "color:red;", wallet, " - " + currentBetData + " =", this.data.wallet);
            return this.data.wallet;
        }
        return wallet;
    }
});

cc._RF.pop();