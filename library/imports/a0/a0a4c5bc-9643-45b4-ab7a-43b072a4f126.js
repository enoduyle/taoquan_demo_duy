"use strict";
cc._RF.push(module, 'a0a4cW8lkNFtKt6Q7BypPEm', 'BetDetailHistoryPortrail');
// cc-common/cc-slotbase-v2/portrailGame/History/BetDetailHistoryPortrail.js

'use strict';

var globalNetwork = require('globalNetwork');
var serviceRest = require('serviceRest');
var BetHistoryDetailPage = require("BetHistoryDetailPage");

var CANVAS_WIDTH = 720;
var TITLE = {
    NORMAL: "Quay Thường",
    FREE: "Quay Miễn Phí"
};

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        time: cc.Label,

        backBtn: cc.Node,
        nextBtn: cc.Node,
        loading: cc.Node,
        errorMessage: cc.Node,
        noBetDetail: cc.Node,
        closeButton: cc.Node,

        detailPages: [BetHistoryDetailPage],
        durationTransition: 0.3,

        //error message
        serverMessage: cc.Node
    },

    onEnable: function onEnable() {
        if (this.serverMessage) this.serverMessage.active = false;
    },
    onLoad: function onLoad() {
        this.node.on("OPEN_BET_DETAIL", this.openBetDetail, this);
        this.node.on("DISABLE_CLOSE", this.disableClose.bind(this));
        this.node.on("CLOSE_NOTICE", this.closeNotice, this);

        this.node.setToken = this.setToken.bind(this);

        this.node.active = false;
        this.assignVariable();
    },
    assignVariable: function assignVariable() {
        this.lastDetailPage = null;
        this.currentDetailPage = null;
        this.currentPage = -1;
        this.lastPage = -1;
        this.itemPerPage = 5;
        this.totalPages = 0;
        this.timeFormat = "DD/MM hh:mm:ss";
        this.indexUsedPage = 0;

        //save data bet history from server
        this.listResultData = new Map();
    },
    setToken: function setToken(token, type, userId) {
        this.token = token;
        this.tokenType = type;
        this.userId = userId;
    },
    openLastBetDetail: function openLastBetDetail() {
        if (this.currentPage == 0) {
            this.openBetDetail(this.sessionData, null);
        } else {
            this.closeNotice();
            this.node.opacity = 255;
            if (this.totalPages == 1) {
                this.nextBtn.active = false;
                this.backBtn.active = false;
            } else if (this.currentPage == this.totalPages - 1) {
                this.nextBtn.getComponent(cc.Button).interactable = false;
                this.nextBtn.active = false;
                this.backBtn.active = true;
                this.backBtn.getComponent(cc.Button).interactable = true;
            } else if (this.currentPage == 0) {
                this.backBtn.getComponent(cc.Button).interactable = false;
                this.backBtn.active = false;
                this.nextBtn.active = true;
                this.nextBtn.getComponent(cc.Button).interactable = true;
            } else {
                this.backBtn.active = true;
                this.nextBtn.active = true;
                this.nextBtn.getComponent(cc.Button).interactable = true;
                this.backBtn.getComponent(cc.Button).interactable = true;
            }
        }
    },


    //#region summary bet history
    openBetDetail: function openBetDetail(sessionData) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.nextBtn.getComponent(cc.Button).interactable = false;
        this.backBtn.getComponent(cc.Button).interactable = false;

        this.sessionData = sessionData;

        this.node.opacity = 255;
        if (this._closeTween) {
            this._closeTween.stop();
            this._closeTween = null;
        }
        this.resetBoard();
        this.resetDetailPages();
        this.requestTotalPage();
        this.renderFirstDetailPage(callback);
    },
    resetBoard: function resetBoard() {
        this.currentPage = -1;
        this.lastPage = -1;
        this.totalPages = 0;
        this.indexUsedPage = 0;
        this.listResultData = new Map();
    },
    requestTotalPage: function requestTotalPage() {
        var token = this.token || globalNetwork.getToken();
        var headers = {
            Authorization: token
        };

        headers['token-type'] = 'user';
        if (this.tokenType) headers['token-type'] = this.tokenType;
        if (this.userId) headers['user-id'] = this.userId;

        var requestParams = {
            serviceId: this.node.config.GAME_ID,
            psId: this.sessionData.sessionId
        };
        serviceRest.getWithHeader({
            url: "history/getHistoryUserSpinSummary",
            params: requestParams,
            callback: this.onTotalDetailResponse.bind(this),
            callbackErr: this.requestErr.bind(this),
            headers: headers
        });
        this.currentPage = -1;
        this.sessionId = this.sessionData.sessionId;
    },
    onTotalDetailResponse: function onTotalDetailResponse(res) {
        if (res.error && res.error.msg) {
            if (this.table) this.table.clearTable();
            if (this.loading) this.loading.active = false;
            this.serverMessage.active = true;
            this.serverMessage.getComponentInChildren(cc.Label).string = res.error.msg;
        } else if (res.data && res.data.resultList && res.data.resultList.length > 0) {
            this.sessionData.summaryData = res.data.resultList[0];
            this.sessionData.scroll = res.data.scroll;
            this.sessionData.summaryData.sessionId = this.sessionData.sessionId;
            this.renderTotalPage();
        } else {
            if (this.sessionData) {
                throw new Error('Null summary data: ' + this.sessionData.sessionId);
            }
            this.requestErr();
        }
    },
    renderTotalPage: function renderTotalPage() {
        // no totalPage

    },

    //#endregion

    //#region page detail
    renderFirstDetailPage: function renderFirstDetailPage() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        // call page detail index
        this.currentPage = 0;
        this.nextBtn.active = false;
        this.backBtn.active = false;

        this.requestDetail(this.sessionId, this.currentPage);

        // tween detail page to overlay bethistory
        this.node.opacity = 255;
        cc.tween(this.node).to(this.durationTransition, { position: cc.v2(0, 0) }).call(function () {
            callback && callback();
        }).start();
    },
    onNextDetailPage: function onNextDetailPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.requestDetail(this.sessionId, this.currentPage);
        }
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
    },
    onPreviousDetailPage: function onPreviousDetailPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.requestDetail(this.sessionId, this.currentPage);
        }
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
    },
    requestDetail: function requestDetail(sessionId, page) {
        var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "history/getHistoryUserSpinDetails";

        this.playLoading();
        this.nextBtn.getComponent(cc.Button).interactable = false;
        this.backBtn.getComponent(cc.Button).interactable = false;

        if (this.listResultData && this.listResultData.has(page)) {
            if (this.loading) this.loading.active = false;
            this.renderDetailPage();
            return;
        }

        this.sessionId = sessionId;

        var from = page;
        var token = this.token || globalNetwork.getToken();
        var headers = { Authorization: token };

        headers['token-type'] = 'user';
        if (this.tokenType) headers['token-type'] = this.tokenType;
        if (this.userId) headers['user-id'] = this.userId;

        var requestParams = {
            serviceId: this.node.config.GAME_ID,
            from: from,
            size: this.itemPerPage,
            psId: sessionId,
            scroll: true
        };

        serviceRest.getWithHeader({
            url: url,
            params: requestParams,
            callback: this.onRequestDetailResponse.bind(this),
            callbackErr: this.requestErr.bind(this),
            headers: headers
        });
    },
    onRequestDetailResponse: function onRequestDetailResponse(res) {
        if (this.loading) this.loading.active = false;

        if (res.error && res.error.msg) {
            this.serverMessage.active = true;
            this.serverMessage.getComponentInChildren(cc.Label).string = res.error.msg;
            return;
        } else if (res.error || !res.data || res.data.resultList.length <= 0) {
            this.noBetDetail.active = true;
            return;
        } else {
            this.noBetDetail.active = false;
        }

        this.totalPages = res.data.total;
        this.currentPage = res.data.from;

        var indexPage = res.data.from;
        for (var i = 0; i < res.data.resultList.length; i++) {
            if (!this.listResultData.has(indexPage)) {
                this.listResultData.set(indexPage, res.data.resultList[i]);
            }
            indexPage++;
        }

        this.renderDetailPage();
    },

    //#endregion

    //#region common
    resetDetailPages: function resetDetailPages() {
        for (var i = 0; i < this.detailPages.length; i++) {
            this.detailPages[i].node.position = new cc.Vec2(i * CANVAS_WIDTH, 0);
            this.detailPages[i].hideInfoDetailPage();
        }
        this.currentDetailPage = null;

        this.lastPage = this.currentPage = -1;
    },
    requestErr: function requestErr() {
        cc.log("err");
        if (this.loading) this.loading.active = false;
        if (this.errorMessage) this.errorMessage.active = true;
    },
    renderDetailPage: function renderDetailPage() {
        var _this = this;

        if (!this.listResultData) return;

        var data = this.listResultData.get(this.currentPage);
        if (!data) {
            //no date in listResultData
            console.warn("check logic renderDetailPage");
            return;
        }

        var mode = data.mode,
            timestamp = data.timestamp;

        if (mode) this.title.string = mode == "normal" ? TITLE.NORMAL : TITLE.FREE;
        if (timestamp) this.time.string = this.formatTimeStamp(timestamp);

        // create extend data
        var lastedWonSymbol = void 0,
            lastedNumberWinFeatures = void 0;
        var previousSpinData = this.listResultData.get(this.currentPage - 1);
        if (previousSpinData) {
            lastedWonSymbol = previousSpinData.result.totalWinSymbol;
            lastedNumberWinFeatures = previousSpinData.result.numberWinFeatures;
        }

        var extendData = {
            lastedNumberWinFeatures: lastedNumberWinFeatures,
            lastedWonSymbol: lastedWonSymbol,
            currentPage: this.currentPage,
            totalPages: this.totalPages
        };

        if (!this.currentDetailPage) {
            this.indexUsedPage = 0;

            this.currentDetailPage = this.detailPages[0];
            this.currentDetailPage.hideInfoDetailPage();
            this.currentDetailPage.updateData(data, this.sessionData.summaryData, extendData);
            this.currentDetailPage.node.opacity = 255;
            this.lastPage = this.currentPage;
            this.lastDetailPage = this.currentDetailPage;
        } else {
            this.lastDetailPage = this.currentDetailPage;

            this.indexUsedPage = (this.indexUsedPage + 1) % this.detailPages.length;
            this.currentDetailPage = this.detailPages[this.indexUsedPage];
            this.currentDetailPage.hideInfoDetailPage();
            this.currentDetailPage.updateData(data, this.sessionData.summaryData, extendData);

            // do transition display
            if (this.lastPage > this.currentPage) {
                // left to right
                var tartgetLastDetailPage = new cc.Vec2(CANVAS_WIDTH, 0);
                cc.tween(this.lastDetailPage.node).to(this.durationTransition, { position: tartgetLastDetailPage }).call(function () {
                    _this.lastDetailPage.hideInfoDetailPage();
                    _this.lastDetailPage.node.opacity = 0;
                }).start();

                this.currentDetailPage.node.position = new cc.Vec2(-CANVAS_WIDTH, 0);
                this.currentDetailPage.node.opacity = 255;

                var tartgetCurrentDetailPage = new cc.Vec2(0, 0);
                cc.tween(this.currentDetailPage.node).to(this.durationTransition, { position: tartgetCurrentDetailPage }).start();
            } else {
                // right to left
                var _tartgetLastDetailPage = new cc.Vec2(-CANVAS_WIDTH, 0);
                cc.tween(this.lastDetailPage.node).to(this.durationTransition, { position: _tartgetLastDetailPage }).call(function () {
                    _this.lastDetailPage.hideInfoDetailPage();
                    _this.lastDetailPage.node.opacity = 0;
                }).start();

                this.currentDetailPage.node.position = new cc.Vec2(CANVAS_WIDTH, 0);
                this.currentDetailPage.node.opacity = 255;

                var _tartgetCurrentDetailPage = new cc.Vec2(0, 0);
                cc.tween(this.currentDetailPage.node).to(this.durationTransition, { position: _tartgetCurrentDetailPage }).start();
            }
            this.lastPage = this.currentPage;
        }

        cc.tween(this.node).delay(this.durationTransition).call(function () {
            if (_this.totalPages == 1) {
                _this.nextBtn.active = false;
                _this.backBtn.active = false;
            } else if (_this.currentPage == _this.totalPages - 1) {
                _this.nextBtn.getComponent(cc.Button).interactable = false;
                _this.nextBtn.active = false;
                _this.backBtn.active = true;
                _this.backBtn.getComponent(cc.Button).interactable = true;
            } else if (_this.currentPage == 0) {
                _this.backBtn.getComponent(cc.Button).interactable = false;
                _this.backBtn.active = false;
                _this.nextBtn.active = true;
                _this.nextBtn.getComponent(cc.Button).interactable = true;
            } else {
                _this.backBtn.active = true;
                _this.nextBtn.active = true;
                _this.nextBtn.getComponent(cc.Button).interactable = true;
                _this.backBtn.getComponent(cc.Button).interactable = true;
            }
        }).start();
    },
    disableClose: function disableClose() {
        if (this.closeButton) this.closeButton.active = false;
    },
    closeNotice: function closeNotice() {
        if (this.errorMessage) this.errorMessage.active = false;
    },
    playLoading: function playLoading() {
        if (this.errorMessage) this.errorMessage.active = false;
        if (this.noBetDetail) this.noBetDetail.active = false;
        if (this.loading) this.loading.active = true;
        this.serverMessage.active = false;
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
    },
    onClose: function onClose() {
        var _this2 = this;

        this.resetBoard();
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();

        var evt = new cc.Event.EventCustom("ON_BET_DETAIL_CLOSED", true);
        this.node.dispatchEvent(evt);
        if (this._closeTween) {
            this._closeTween.stop();
            this._closeTween = null;
        }
        this._closeTween = cc.tween(this.node).to(this.durationTransition, { position: cc.v2(CANVAS_WIDTH, 0) }).call(function () {
            _this2.node.opacity = 0;
            _this2._closeTween = null;
        });
        this._closeTween.start();
    }
}
//#endregion

);

cc._RF.pop();