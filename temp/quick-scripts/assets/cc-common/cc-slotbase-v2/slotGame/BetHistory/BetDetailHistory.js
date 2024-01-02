(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/BetDetailHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'be238AqeuxNGp8gZctiIsAF', 'BetDetailHistory', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/BetDetailHistory.js

'use strict';

var globalNetwork = require('globalNetwork');
var serviceRest = require('serviceRest');
var arrayTypeJackpot = ["MINI", "MINOR", "MAJOR", "GRAND"];

var _require = require("utils"),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        table: require("SlotTableHistory"),
        backBtn: cc.Node,
        nextBtn: cc.Node,
        loading: cc.Node,
        scrollItem: cc.Prefab,
        scrollContainer: cc.Node,
        highlight: cc.Node,
        scrollView: cc.ScrollView,
        errorMessage: cc.Node,
        noBetDetail: cc.Node,
        hasFreespinOption: false,
        displayItem: 3,
        labelTotalWin: cc.Label,
        summaryNode: cc.Node,

        titleJP: cc.Node,
        listJP: [cc.SpriteFrame],
        titleWinAmt: cc.Node,
        titleLayout: cc.Node,
        nameBetHistoryScrollItem: "BetHistoryScrollItem",
        closeButton: cc.Node,
        normalName: "Normal",
        freeGameName: "FreeGame",
        topUpName: "Topup",
        bonusName: "Chọn Hũ",
        jackpotName: "Thắng Hũ",
        summaryName: "Tổng Kết"
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('OPEN_BET_DETAIL', function (sessionData) {
            _this.nextBtn.getComponent(cc.Button).interactable = false;
            _this.backBtn.getComponent(cc.Button).interactable = false;

            _this.resetBoard();
            _this.scrollView.scrollTo(cc.v2(0, 0), 0.0);
            _this.sessionData = sessionData;

            if (_this.summaryNode) _this.summaryNode.opacity = 0;
            if (_this.table) _this.table.node.opacity = 0;
            if (_this.loading) _this.loading.active = true;
            if (_this.title) _this.title.string = "";
            if (_this.errorMessage) _this.errorMessage.active = false;
            if (_this.noBetDetail) _this.noBetDetail.active = false;
            _this.requestTotalPage();
        });
        this.node.on('ON_SCROLL_CLICK', function (ev) {
            ev.stopPropagation();
            var userData = ev.getUserData();
            if (userData.index != _this.currentPage) {
                _this.currentPage = userData.index;

                if (userData.index >= 0) _this.requestDetail(_this.sessionId, userData.index);else {
                    _this.renderTotalPage();
                }
            }
        });

        this.node.on("DISABLE_CLOSE", this.disableClose.bind(this));
        this.node.on("CLOSE_NOTICE", this.closeNotice, this);
        this.node.active = false;
        this.currentPage = -1;
        this.itemPerPage = 1;
        this.curHighLight = -1;

        this.serverMessage = cc.instantiate(this.errorMessage);
        this.serverMessage.setParent(this.errorMessage.parent);
        this.serverMessage.active = false;
        this.showElement();
    },
    start: function start() {
        this.modeItem = new cc.NodePool();
        for (var i = 0; i < 10; i++) {
            this.modeItem.put(cc.instantiate(this.scrollItem));
        }
        this.localizeText();
    },
    localizeText: function localizeText() {
        if (this.node.config.MESSAGE_DIALOG) {
            this.normalName = this.node.config.MESSAGE_DIALOG.NORMAL_GAME;
            this.freeGameName = this.node.config.MESSAGE_DIALOG.FREE_GAME;
            this.topUpName = this.node.config.MESSAGE_DIALOG.TOPUP_GAME;
            this.bonusName = this.node.config.MESSAGE_DIALOG.BONUS_GAME;
            this.jackpotName = this.node.config.MESSAGE_DIALOG.JACKPOT;
            this.summaryName = this.node.config.MESSAGE_DIALOG.SUMMARY;
            var errorText = this.errorMessage ? this.errorMessage.getComponentInChildren(cc.Label) : null;
            if (errorText) {
                errorText.string = this.node.config.MESSAGE_DIALOG.ERROR_CONNECTION_HISTORY;
            }
            var noBetDetail = this.noBetDetail ? this.noBetDetail.getComponentInChildren(cc.Label) : null;
            if (noBetDetail) {
                noBetDetail.string = this.node.config.MESSAGE_DIALOG.NO_BET_HISTORY;
            }
        }
    },
    getModeItem: function getModeItem() {
        var item = this.modeItem.get();
        if (!item) {
            item = cc.instantiate(this.scrollItem);
        }
        return item;
    },
    onEnable: function onEnable() {
        this.serverMessage.active = false;
        this.showElement();
    },
    requestTotalPage: function requestTotalPage() {
        var token = this.token || globalNetwork.getToken();
        var headers = {
            Authorization: token
        };

        headers['token-type'] = 'user';
        if (this.tokenType) {
            headers['token-type'] = this.tokenType;
        }
        if (this.userId) {
            headers['user-id'] = this.userId;
        }
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
        // this.requestDetail(this.sessionData.sessionId, 0);
        if (this.titleJP) this.titleJP.active = false;
        this.resetWinAmt();
    },
    onTotalDetailResponse: function onTotalDetailResponse(res) {
        if (res.error && res.error.msg) {
            if (this.table) this.table.clearTable();
            if (this.loading) this.loading.active = false;
            this.serverMessage.active = true;
            this.noBetDetail.active = false;
            this.hideElement();
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
        if (this.loading) this.loading.active = false;
        if (this.table) {
            this.table.node.opacity = 255;
            this.table.node.active = false;
        }
        if (this.title) this.title.string = "";
        this.updateHighlight(-1);
        this.backBtn.getComponent(cc.Button).interactable = false;
        this.nextBtn.getComponent(cc.Button).interactable = true;

        if (this.summaryNode) {
            this.summaryNode.opacity = 255;
            this.summaryNode.active = true;
            this.summaryNode.emit('DISPLAY_DATA', this.sessionData.summaryData);
        }

        // init scroll bar
        this.loadModeItem({ scroll: this.sessionData.scroll });

        if (this.titleJP) this.titleJP.active = false;
        this.resetWinAmt();
    },
    playLoading: function playLoading() {
        if (this.errorMessage) this.errorMessage.active = false;
        if (this.noBetDetail) this.noBetDetail.active = false;
        this.scrollContainer.stopAllActions();
        if (this.loading) this.loading.active = true;
        this.serverMessage.active = false;
    },
    requestDetail: function requestDetail(sessionId, page) {
        var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "history/getHistoryUserSpinDetails";

        this.playLoading();
        this.nextBtn.getComponent(cc.Button).interactable = false;
        this.backBtn.getComponent(cc.Button).interactable = false;
        var from = page * this.itemPerPage;
        this.sessionId = sessionId;
        var token = this.token || globalNetwork.getToken();
        var headers = {
            Authorization: token
        };

        headers['token-type'] = 'user';
        if (this.tokenType) {
            headers['token-type'] = this.tokenType;
        }
        if (this.userId) {
            headers['user-id'] = this.userId;
        }

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
            callback: this.onRequestResponse.bind(this),
            callbackErr: this.requestErr.bind(this),
            headers: headers
        });
    },
    onRequestResponse: function onRequestResponse(res) {
        if (this.loading) this.loading.active = false;
        this.resetWinAmt();
        if (res.error && res.error.msg) {
            if (this.table) this.table.clearTable();
            this.serverMessage.active = true;
            this.noBetDetail.active = false;
            this.hideElement();
            this.serverMessage.getComponentInChildren(cc.Label).string = res.error.msg;
            return;
        } else if (res.error || !res.data || res.data.resultList.length <= 0) {
            if (!this.errorMessage.active) this.noBetDetail.active = true;
            return;
        } else {
            this.noBetDetail.active = false;
        }

        if (this.currentPage == -1) {
            this.loadModeItem(res.data);
            return;
        }

        this.nextBtn.getComponent(cc.Button).interactable = true;
        this.backBtn.getComponent(cc.Button).interactable = true;

        if (res.data.total <= this.currentPage * this.itemPerPage + 1) {
            this.nextBtn.getComponent(cc.Button).interactable = false;
        }

        this.updateHighlight(this.currentPage);
        this.updateScroller();
        if (this.summaryNode) this.summaryNode.active = false;
        if (this.table) {
            this.table.node.active = true;
            this.table.renderResult(res.data.resultList[0]);
        }
        this.updateTitle(res.data.resultList[0]);
        this.updateTitleJP(res.data.resultList[0]);

        var latestWinJackpotInfo = res.data.resultList[0].latestWinJackpotInfo;

        var jackpotAmount = latestWinJackpotInfo && latestWinJackpotInfo.jackpotAmount ? latestWinJackpotInfo.jackpotAmount : 0;

        var mode = res.data.resultList[0].mode;
        var winAmount = res.data.resultList[0].winAmount;
        if (mode === 'free' || mode === 'topup') winAmount = res.data.resultList[0].winAmount + jackpotAmount;
        if (winAmount && winAmount > 0 && mode !== 'normal') {
            this.updateWinAmt(': ' + formatMoney(winAmount));
        }
    },
    loadModeItem: function loadModeItem(data) {
        var scroll = data.scroll;

        var lastMode = '';
        this.timeCount = [];
        this.scrollList = [];

        this.cleanScrollList();
        this.addButtonTotalPage();

        var countFreeSpin = 0;

        for (var i = 0; i < scroll.length; i++) {

            var parsedData = scroll[i].split(':');
            var indexPage = parseInt(parsedData[0]);
            var mode = parsedData[1];
            this.scrollList.push(mode);
            var count = lastMode != mode ? 1 : this.timeCount[i - 1] + 1;
            this.timeCount[i] = count;
            lastMode = mode;

            switch (mode) {
                case "normal":
                    mode = this.normalName || "normal";
                    break;
                case "free":
                    if (this.hasFreespinOption) {
                        countFreeSpin++;
                        mode = (this.freeGameName || "Free") + " " + countFreeSpin;
                    } else {
                        countFreeSpin++;
                        if (parsedData[2] == 1) mode = (this.freeGameName || "Free") + " " + countFreeSpin;else mode = (this.topUpName || "Topup") + " " + countFreeSpin;
                    }
                    break;
                case "bonus":
                    mode = (this.bonusName || "Bonus") + " " + this.timeCount[i];
                    break;
            }

            if (mode == "free_option") {
                countFreeSpin = 0;
            } else {
                var labelScroll = null;
                var item = this.getModeItem();
                item.parent = this.scrollContainer;
                if (item.getComponent(cc.Label)) {
                    labelScroll = item.getComponent(cc.Label);
                } else {
                    labelScroll = item.getComponentInChildren(cc.Label);
                }
                if (labelScroll) labelScroll.string = mode;
                item.getComponent(this.nameBetHistoryScrollItem).setIndex(indexPage);
            }
        }

        this.updateHighlight(-1);
    },
    updateHighlight: function updateHighlight(pos) {
        for (var i = 0; i < this.scrollContainer.children.length; i++) {
            var item = this.scrollContainer.children[i];
            var labelScroll = null;
            var scrollItem = item.getComponent(this.nameBetHistoryScrollItem);
            if (item.getComponent(cc.Label)) {
                labelScroll = item.getComponent(cc.Label);
            } else {
                labelScroll = item.getComponentInChildren(cc.Label);
            }
            if (scrollItem && scrollItem.index == pos) {
                this.highlight.parent = item;
                this.highlight.position = cc.v2(0, 0);
                this.highlight.active = true;
                this.curHighLight = i;
                if (pos !== -1 && labelScroll) this.updateTitle(labelScroll.string);
                return;
            }
        }
        this.updateScroller();
    },
    cleanScrollList: function cleanScrollList() {
        while (this.scrollContainer.children.length > 0) {
            this.modeItem.put(this.scrollContainer.children[0]);
        }
    },
    addButtonTotalPage: function addButtonTotalPage() {
        var totalResultItem = cc.instantiate(this.scrollItem);
        var labelScroll = null;
        totalResultItem.getComponent(this.nameBetHistoryScrollItem).setIndex(-1);
        totalResultItem.parent = this.scrollContainer;
        if (totalResultItem.getComponent(cc.Label)) {
            labelScroll = totalResultItem.getComponent(cc.Label);
        } else {
            labelScroll = totalResultItem.getComponentInChildren(cc.Label);
        }
        if (labelScroll) labelScroll.string = this.summaryName;
    },
    updateTitle: function updateTitle(data) {
        var titleMode = this.title.string;
        if (data) {
            if (data.mode && data.mode === 'normal') {
                titleMode = this.normalName;
            }
            if (!data.mode) {
                titleMode = data;
            }
        }
        this.title.string = titleMode;
    },
    requestErr: function requestErr() {
        cc.log("err");
        if (this.table) this.table.clearTable();
        if (this.loading) this.loading.active = false;
        if (this.errorMessage) {
            this.errorMessage.active = true;
            this.noBetDetail.active = false;
            this.hideElement();
        }
    },
    onNextButton: function onNextButton() {
        this.currentPage += 1;
        this.curHighLight += 1;
        if (this.scrollList[this.currentPage] == "free_option") {
            this.currentPage += 1;
        }
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.requestDetail(this.sessionId, this.currentPage);
    },
    onBackButton: function onBackButton() {
        this.currentPage = this.currentPage - 1;
        if (this.scrollList[this.currentPage] == "free_option") {
            this.currentPage -= 1;
        }
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        if (this.curHighLight >= 0) this.curHighLight -= 1;
        if (this.currentPage >= 0) {
            this.requestDetail(this.sessionId, this.currentPage);
        } else {
            this.updateScroller();
            this.renderTotalPage();
        }
    },
    updateScroller: function updateScroller() {
        this.scrollView.stopAutoScroll();
        if (this.curHighLight >= 1 && this.curHighLight + 1 <= this.scrollContainer.children.length) {
            var itemLength = this.scrollContainer.children[0].width;
            var offsetX = (this.curHighLight - 1) * itemLength;
            this.scrollView.scrollToOffset(cc.v2(offsetX, 0));
        } else if (this.curHighLight == 0) {
            this.scrollView.scrollToOffset(cc.v2(0, 0));
        }
    },
    resetBoard: function resetBoard() {
        this.currentPage = 0;
        if (this.summaryNode) this.summaryNode.opacity = 0;
        while (this.scrollContainer.children.length > 0) {
            this.modeItem.put(this.scrollContainer.children[0]);
        }
        if (this.table) {
            this.table.node.opacity = 0;
            this.table.clearTable();
        }
        if (this.labelTotalWin) {
            this.labelTotalWin.node.active = false;
            this.labelTotalWin.string = "";
        }
    },
    setToken: function setToken(token, type, userId) {
        this.token = token;
        this.tokenType = type;
        this.userId = userId;
    },
    onClose: function onClose() {
        this.resetBoard();
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        if (this.summaryNode) this.summaryNode.emit('CLEAR_TOTAL_DETAIL_DATA');
        this.node.emit("SHOW_BET_HISTORY");
        this.node.active = false;
    },
    disableClose: function disableClose() {
        if (this.closeButton) this.closeButton.active = false;
    },
    updateTitleJP: function updateTitleJP(data) {
        if (this.titleLayout) this.titleLayout.active = false;
        if (this.titleJP && this.listJP && this.listJP.length > 0) {
            var latestWinJackpotInfo = data.latestWinJackpotInfo;

            if (latestWinJackpotInfo) {
                var idJP = -1;
                arrayTypeJackpot.forEach(function (it, index) {
                    if (latestWinJackpotInfo.jackpotId.indexOf(it) >= 0) idJP = index;
                });
                if (this.listJP.length <= arrayTypeJackpot.length && idJP != -1) {
                    this.titleJP.getComponent(cc.Sprite).spriteFrame = this.listJP[idJP];
                    this.titleJP.active = true;
                    this.updateTitle(data);
                    var tt = this.title.getComponent(cc.Label).string;
                    this.title.getComponent(cc.Label).string = tt + " + ";
                }
            } else {
                this.titleJP.active = false;
            }
        } else {
            var _latestWinJackpotInfo = data.latestWinJackpotInfo;

            if (_latestWinJackpotInfo && data.mode != "normal") {
                this.updateTitle(data);
                var _tt = this.title.getComponent(cc.Label).string;
                this.title.getComponent(cc.Label).string = _tt + " + " + this.jackpotName;
            }
        }
        if (this.titleLayout) this.titleLayout.active = true;
    },
    closeNotice: function closeNotice() {
        if (this.errorMessage) this.errorMessage.active = false;
    },
    getTypeJackpot: function getTypeJackpot(jackpotId) {
        for (var index = 0; index < arrayTypeJackpot.length; index++) {
            var jp = arrayTypeJackpot[index];
            if (jackpotId.includes(jp)) {
                return index + 1;
            }
        }
        return 0;
    },
    updateWinAmt: function updateWinAmt(value) {
        if (this.titleLayout) this.titleLayout.active = false;
        if (value && this.titleWinAmt) {
            this.titleWinAmt.getComponent(cc.Label).string = value;
            this.titleWinAmt.active = true;
            if (this.titleLayout) this.titleLayout.active = true;
        }
    },
    resetWinAmt: function resetWinAmt() {
        if (this.titleWinAmt) {
            this.titleWinAmt.getComponent(cc.Label).string = '';
            this.titleWinAmt.active = false;
        }
    },
    hideElement: function hideElement() {
        if (this.titleLayout) this.titleLayout.active = false;
        this.table.node.active = false;
        if (this.summaryNode) this.summaryNode.active = false;
        this.scrollView.node.active = false;
    },
    showElement: function showElement() {
        if (this.titleLayout) this.titleLayout.active = true;
        this.table.node.active = true;
        if (this.summaryNode) this.summaryNode.active = true;
        this.scrollView.node.active = true;
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
        //# sourceMappingURL=BetDetailHistory.js.map
        