"use strict";
cc._RF.push(module, '38becQJlTpI3ptsIKgyYKXe', 'BaseHistory');
// cc-common/cc-share-v1/History/Scripts/BaseHistory.js

'use strict';

var serviceRest = require('serviceRest');

cc.Class({
    extends: cc.Component,

    properties: {
        table: cc.Node,
        pageIndexView: cc.Node,
        itemPerPage: 7,
        loading: cc.Node,
        backBtn: cc.Node,
        nextBtn: cc.Node,
        errorMessage: cc.Node,
        hasExtraBet: false
    },

    onLoad: function onLoad() {
        this.initBase();
        this.isError = false;
    },
    initBase: function initBase() {
        this.currentPage = 1;
        this.totalPage = 1;
        this.pageDefault = 1;
        this.stopLoading();
        this.node.on("CLOSE_NOTICE", this.closeNotice, this);
        if (this.node.soundPlayer) {
            this.playSoundClick = this.node.soundPlayer.playSFXClick.bind(this.node.soundPlayer);
        }
        this.table.getComponent('BaseTableHistory').initCells(this.itemPerPage);

        this.serverMessage = cc.instantiate(this.errorMessage);
        this.serverMessage.setParent(this.errorMessage.parent);
        this.serverMessage.active = false;

        this.nextBtn.on(cc.Node.EventType.TOUCH_START, this.onNextPage.bind(this));
        this.nextBtn.on(cc.Node.EventType.TOUCH_END, this.cancelChangePage.bind(this));
        this.nextBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelChangePage.bind(this));
        this.nextBtn.on(cc.Node.EventType.MOUSE_LEAVE, this.cancelChangePage.bind(this));

        this.backBtn.on(cc.Node.EventType.TOUCH_START, this.onPrevPage.bind(this));
        this.backBtn.on(cc.Node.EventType.TOUCH_END, this.cancelChangePage.bind(this));
        this.backBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelChangePage.bind(this));
        this.backBtn.on(cc.Node.EventType.MOUSE_LEAVE, this.cancelChangePage.bind(this));
    },
    onNextPage: function onNextPage() {
        if (this.nextBtn.getComponent(cc.Button).interactable) {
            this.backBtn.getComponent(cc.Button).interactable = false;
        }
    },
    onPrevPage: function onPrevPage() {
        if (this.backBtn.getComponent(cc.Button).interactable) {
            this.nextBtn.getComponent(cc.Button).interactable = false;
        }
    },
    cancelChangePage: function cancelChangePage() {
        if (this.currentPage !== 1) this.backBtn.getComponent(cc.Button).interactable = true;
        if (this.currentPage < this.totalPage) this.nextBtn.getComponent(cc.Button).interactable = true;
    },
    openPanel: function openPanel() {
        this.node.active = true;
        this.node.opacity = 255;
        if (this.table) this.table.opacity = 0;
        this.currentPage = 1;
        if (this.currentPage == 1) {
            this.backBtn.getComponent(cc.Button).interactable = false;
            this.nextBtn.getComponent(cc.Button).interactable = false;
        }
        this.updatePageIndexView(this.currentPage);
        if (this.errorMessage) this.errorMessage.active = false;
        this.playLoading();
        this.requestDataPage(this.currentPage, this.itemPerPage, this.onRequestResponse.bind(this), this.requestErr.bind(this));
    },
    setDynamicBet: function setDynamicBet() {
        var mBet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var listDataBet = mBet.split(',');
        var listBetId = listDataBet.map(function (item) {
            return item.split(';')[0];
        });
        this.betIds = listBetId.join('-');
    },
    playLoading: function playLoading() {
        this.loading.active = true;
        var anim = this.loading.getComponent(cc.Animation);
        anim.wrapMode = cc.WrapMode.Loop;
        anim.play('animLoading');
    },
    stopLoading: function stopLoading() {
        this.loading.active = false;
        var anim = this.loading.getComponent(cc.Animation);
        anim.stop('animLoading');
    },
    onNextButton: function onNextButton() {
        if (this.playSoundClick) this.playSoundClick();
        this.nextBtn.getComponent(cc.Button).interactable = false;
        if (!this.isError) this.pageDefault = this.currentPage;
        this.currentPage += 1;
        if (this.isError) this.currentPage = this.pageDefault;
        this.playLoading();
        this.requestDataPage(this.currentPage, this.itemPerPage, this.onRequestResponse.bind(this), this.requestErr.bind(this));
    },
    onPreviousButton: function onPreviousButton() {
        if (this.playSoundClick) this.playSoundClick();
        if (this.currentPage == 1) return;
        this.backBtn.getComponent(cc.Button).interactable = false;
        if (!this.isError) this.pageDefault = this.currentPage;
        this.currentPage -= 1;
        if (this.isError) this.currentPage = this.pageDefault;
        this.playLoading();
        this.requestDataPage(this.currentPage, this.itemPerPage, this.onRequestResponse.bind(this), this.requestErr.bind(this));
    },
    requestDataPage: function requestDataPage(page, quantity, callback, callbackErr) {
        var from = (page - 1) * quantity;
        var betIds = this.betIds;
        if (this.betIds && this.hasExtraBet && this.node.gSlotDataStore && this.node.gSlotDataStore.slotBetDataStore && this.node.gSlotDataStore.slotBetDataStore.data.extraSteps) {
            var listBetIds = this.betIds.split('-');
            var extraSteps = this.node.gSlotDataStore.slotBetDataStore.data.extraSteps;
            betIds = '';
            Object.keys(extraSteps).forEach(function (key, index) {
                listBetIds = listBetIds.map(function (item) {
                    return item[0] + '' + key;
                });
                if (index > 0) {
                    betIds += '-';
                }
                betIds += listBetIds.join('-');
            });
        }

        var requestParams = {
            serviceId: this.jpPrefix + this.gameId,
            from: from,
            size: quantity,
            type: this.jpList,
            betIds: betIds
        };
        if (this.errorMessage) this.errorMessage.active = false;
        this.requestHistory(requestParams, callback, callbackErr);
    },
    requestHistory: function requestHistory() {
        var requestParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments[1];
        var callbackErr = arguments[2];
        var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        if (!this.gameId) {
            cc.warn("GameId has not been set");
            callback({});
            return;
        }

        var currencyCode = this.getCurrencyCode();
        if (currencyCode) {
            requestParams.c = currencyCode;
        }
        if (headers) {
            serviceRest.getWithHeader({
                url: this.url,
                params: requestParams,
                callback: callback,
                callbackErr: callbackErr,
                headers: headers
            });
        } else {
            serviceRest.get({
                url: this.url,
                params: requestParams,
                callback: callback,
                callbackErr: callbackErr
            });
        }
    },
    requestErr: function requestErr() {
        this.totalPage = 1;
        this.stopLoading();
        if (this.errorMessage) {
            this.errorMessage.active = true;
            this.isError = true;
            this.nextBtn.getComponent(cc.Button).interactable = false;
            this.backBtn.getComponent(cc.Button).interactable = false;
            this.table.emit('CLEAR_DATA');
        }
    },
    onRequestResponse: function onRequestResponse(res) {
        if (res.total) {
            this.totalPage = Math.ceil(res.total / this.itemPerPage);
        }
        this.stopLoading();
        if (!res.error) {
            this.isError = false;
            if (Object.keys(res).length > 0 && res.data && res.data.length > 0) {
                this.nextBtn.getComponent(cc.Button).interactable = true;
                this.backBtn.getComponent(cc.Button).interactable = true;
                this.updatePageIndexView(this.currentPage);
                if (this.table) this.table.opacity = 255;
                this.table.emit('UPDATE_DATA', res.data);
                if (this.currentPage == 1) {
                    this.backBtn.getComponent(cc.Button).interactable = false;
                }
                if (res.total <= this.currentPage * this.itemPerPage || res.data.length < this.itemPerPage) {
                    this.nextBtn.getComponent(cc.Button).interactable = false;
                    return;
                }
            } else {
                // Clear old history items if use tool
                this.nextBtn.getComponent(cc.Button).interactable = false;
                this.backBtn.getComponent(cc.Button).interactable = false;
                this.updatePageIndexView(1);
                this.currentPage = 1;
                this.totalPage = 0;
                this.table.emit('UPDATE_DATA', res.data);
            }
        }
    },
    updatePageIndexView: function updatePageIndexView(content) {
        this.pageIndexView.getComponent(cc.Label).string = content;
    },
    closeNotice: function closeNotice() {
        if (this.errorMessage) this.errorMessage.active = false;
    },
    getCurrencyCode: function getCurrencyCode() {
        if (this.node.gSlotDataStore && this.node.gSlotDataStore.currencyCode) {
            return this.node.gSlotDataStore.currencyCode;
        }
        return null;
    }
});

cc._RF.pop();