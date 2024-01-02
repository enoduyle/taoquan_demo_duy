"use strict";
cc._RF.push(module, '6c7db/uNOVNSqGKfq1J+TDJ', 'BetSelectionPanelController');
// cc-common/cc-slotbase-v2/portrailGame/BetSelectionPanelController.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney,
    findKeyByValue = _require.findKeyByValue,
    convertObjectToArrayKey = _require.convertObjectToArrayKey;

cc.Class({
    extends: cc.Component,

    properties: {
        gameId: 9948,
        btnConfirm: cc.Node,
        btnClose: cc.Node,
        btnMaxBet: cc.Node,
        betOption: cc.Node,
        lblWinAmount: cc.Node,
        lblWallet: cc.Node,
        lblCurrentBet: cc.Node,
        lblMax: cc.Node,
        colorSelectedConfirm: cc.Color,
        colorSelectedMaxBet: cc.Color,
        colorUnSelected: cc.Color,
        selectedValue: -1
    },

    onLoad: function onLoad() {
        this.node.on('UPDATE_VALUE', this.updateValue, this);
        this.node.on('CLEAR_ALL_BET', this.clearAllBets, this);
    },
    start: function start() {
        // const list = [1000, 5000, 10000, 20000, 50000, 100000, 200000];
        // list.sort((a, b) => { return b - a; });
        // this.betOption.emit('UPDATE_DATA', list, 5000, this);
    },
    updateValue: function updateValue() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$.currentBetData,
            steps = _node$gSlotDataStore$.steps;

        var stepIndex = findKeyByValue(steps, currentBetData);
        if (!stepIndex) {
            return;
        }
        var betValues = Object.values(steps);
        betValues.sort(function (a, b) {
            return b - a;
        });
        this.betOption.emit('UPDATE_DATA', betValues, currentBetData, this);
        var isMaxBet = betValues[0] == currentBetData;
        this.btnMaxBet.getComponent(cc.Button).interactable = !isMaxBet;
        this.unSetSelectColorButtons(isMaxBet);
        this.updateBottomLabelValue();
    },
    updateBottomLabelValue: function updateBottomLabelValue() {
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$2.currentBetData,
            wallet = _node$gSlotDataStore$2.wallet;
        var winAmountPS = this.node.gSlotDataStore.playSession.winAmountPS;


        this.lblWinAmount && (this.lblWinAmount.getComponent(cc.Label).string = formatMoney(winAmountPS));

        this.lblCurrentBet && (this.lblCurrentBet.getComponent(cc.Label).string = formatMoney(currentBetData));

        if (!this.node.gSlotDataStore.isTrialMode) {
            this.lblWallet && (this.lblWallet.getComponent(cc.Label).string = formatMoney(wallet));
        } else {
            this.lblWallet && (this.lblWallet.getComponent(cc.Label).string = formatMoney(this.node.mainDirector.director.trialWalletAmount.controller.lastValue));
        }
    },
    setSelectedBet: function setSelectedBet(value) {
        var isMaxBet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // console.warn('hhh setSelectedBet ' + value + ' isMaxBet ' + isMaxBet);
        this.selectedBet = value;
        this.btnMaxBet.getComponent(cc.Button).interactable = !isMaxBet;
    },
    setSelectColorButtons: function setSelectColorButtons() {
        this.btnMaxBet.getComponent(cc.Button).target.color = this.colorSelectedMaxBet;
        this.btnConfirm.getComponent(cc.Button).target.color = this.colorSelectedConfirm;
        this.btnClose.getComponent(cc.Button).target.color = this.colorSelectedConfirm;
        this.lblMax.color = this.colorSelectedMaxBet;
    },
    unSetSelectColorButtons: function unSetSelectColorButtons() {
        var isMaxBet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!isMaxBet) {
            this.btnMaxBet.getComponent(cc.Button).target.color = this.colorUnSelected;
            this.lblMax.color = this.colorUnSelected;
        } else {
            this.btnMaxBet.getComponent(cc.Button).target.color = this.colorSelectedMaxBet;
            this.lblMax.color = this.colorSelectedMaxBet;
        }

        this.btnConfirm.getComponent(cc.Button).target.color = this.colorUnSelected;
        this.btnClose.getComponent(cc.Button).target.color = this.colorUnSelected;
    },
    clickBtnConfirm: function clickBtnConfirm() {
        // this.node.emit('HIDE');
        this.selectBetEvent = new cc.Event.EventCustom('SELECT_BET_EVENT', true);
        this.selectBetEvent.setUserData({
            betValue: this.selectedBet
        });
        this.node.dispatchEvent(this.selectBetEvent);
    },
    onClickSelectBet: function onClickSelectBet(evt, id) {
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$3.currentBetData,
            steps = _node$gSlotDataStore$3.steps;

        var stepIndex = findKeyByValue(steps, currentBetData);
        if (!stepIndex) return;

        id--;
        var arrayBetIndex = convertObjectToArrayKey(steps);
        this.selectedBet = steps[arrayBetIndex[id]];
        if (this.selectedBet === steps[arrayBetIndex[arrayBetIndex.length - 1]]) {
            this.btnMaxBet.getComponent(cc.Button).interactable = false;
        } else this.btnMaxBet.getComponent(cc.Button).interactable = true;
    },
    onClickMaxBet: function onClickMaxBet() {
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.betOption.emit('SELECT_MAX_BET');
    },
    clickBtnClose: function clickBtnClose() {
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.node.parent.emit("HIDE");
    },
    clearAllBets: function clearAllBets() {
        this.betOption.emit('CLEAR_ALL_BET');
    }
});

cc._RF.pop();