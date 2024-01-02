(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/BetHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43437qV3B9F6Z6NhYZA1/xX', 'BetHistory', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/BetHistory.js

"use strict";

var globalNetwork = require('globalNetwork');

cc.Class({
    extends: require("BaseHistory"),

    properties: {
        noBetHistoryText: cc.Node,
        betHistoryNode: cc.Node,
        betDetailNode: cc.Node,
        closeButton: cc.Node,
        pageIndex: cc.Node
    },

    onLoad: function onLoad() {
        var _this = this;

        this._super();
        this.extendOnload();
        this.node.on("CLOSE_NOTICE", this.closeNotice, this);
        this.node.on("OPEN_BET_DETAIL", this.openBetDetail, this);
        this.betDetailNode.on("SHOW_BET_HISTORY", function () {
            _this.showBetHistory();
        });
    },
    start: function start() {
        this.localizeText();
    },
    localizeText: function localizeText() {
        if (this.node.config.MESSAGE_DIALOG) {
            if (this.node.config.MESSAGE_DIALOG.NO_BET_HISTORY) {
                this.noBetHistoryText.getComponentInChildren(cc.Label).string = this.node.config.MESSAGE_DIALOG.NO_BET_HISTORY;
            }
            if (this.node.config.MESSAGE_DIALOG.ERROR_CONNECTION_HISTORY) {
                this.errorMessage.getComponentInChildren(cc.Label).string = this.node.config.MESSAGE_DIALOG.ERROR_CONNECTION_HISTORY;
            }
            if (this.pageIndex && this.node.config.MESSAGE_DIALOG.HISTORY_PAGE) {
                this.pageIndex.getComponentInChildren(cc.Label).string = this.node.config.MESSAGE_DIALOG.HISTORY_PAGE;
            }
        }
    },
    extendOnload: function extendOnload() {
        this.init(this.node.config.GAME_ID);
    },
    initBase: function initBase() {
        this._super();
        this.currentPage = 1;
    },
    init: function init(gameId) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "history/getHistoryUserSpins";

        this.gameId = gameId;
        this.url = url;
    },
    openPanel: function openPanel() {
        this.showBetHistory();
        this._super();
        if (this.pageIndex) this.pageIndex.active = false;
    },
    showBetHistory: function showBetHistory() {
        this.betHistoryNode.active = true;
        this.betHistoryNode.opacity = 255;
        this.betDetailNode.active = false;
    },
    requestDataPage: function requestDataPage(page, quantity, callback, callbackErr) {
        var from = (page - 1) * quantity;
        var token = globalNetwork.getToken();
        var headers = {
            Authorization: token
        };
        var requestParams = {
            serviceId: this.gameId,
            from: from,
            size: quantity
        };
        if (this.errorMessage) this.errorMessage.active = false;
        this.requestHistory(requestParams, callback, callbackErr, headers);
    },
    onRequestResponse: function onRequestResponse(res) {
        this.stopLoading();
        this.table.emit('CLEAR_DATA');
        if (res.error && res.error.msg) {
            this.serverMessage.active = true;
            this.serverMessage.getComponentInChildren(cc.Label).string = res.error.msg;
            this.isError = true;
            this.nextBtn.getComponent(cc.Button).interactable = false;
            this.backBtn.getComponent(cc.Button).interactable = false;
        } else if (!res.error && Object.keys(res).length > 0 && res.data && res.data.resultList.length > 0) {
            if (res.data && res.data.total) this.totalPage = Math.ceil(res.data.total / this.itemPerPage);

            this.isError = false;
            if (this.pageIndex) this.pageIndex.active = true;
            this.nextBtn.getComponent(cc.Button).interactable = true;
            this.backBtn.getComponent(cc.Button).interactable = true;
            this.updatePageIndexView(this.currentPage);
            if (this.table) this.table.opacity = 255;
            this.table.emit('UPDATE_DATA', res.data.resultList);
            if (this.currentPage == 1) {
                this.backBtn.getComponent(cc.Button).interactable = false;
            }
            if (this.currentPage * this.itemPerPage >= res.data.total) {
                this.nextBtn.getComponent(cc.Button).interactable = false;
                return;
            }
        } else if (res.error || !res.data || res.data.resultList.length <= 0) {
            this.noBetHistoryText.active = true;
            if (this.pageIndex) this.pageIndex.active = false;
        } else {
            this.noBetHistoryText.active = false;
            if (this.pageIndex) this.pageIndex.active = true;
        }
    },
    playLoading: function playLoading() {
        this._super();
        this.serverMessage.active = false;
        this.noBetHistoryText.active = false;
    },
    openBetDetail: function openBetDetail(ev) {
        if (this.loading.active) return;
        ev.stopPropagation();
        var data = ev.getUserData();
        this.showBetDetail(data);
    },
    showBetDetail: function showBetDetail(data) {
        this.betHistoryNode.active = false;
        this.betDetailNode.active = true;
        this.betDetailNode.emit("OPEN_BET_DETAIL", data);
    },
    setToken: function setToken(token) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user';
        var userId = arguments[2];

        this.token = token;
        this.tokenType = type;
        this.userId = userId;
        this.betDetailNode.getComponent('BetDetailHistory').setToken(token, type, userId);
    },
    disableCloseDetail: function disableCloseDetail() {
        this.betDetailNode.emit("DISABLE_CLOSE");
    },
    closeNotice: function closeNotice() {
        if (this.errorMessage) this.errorMessage.active = false;
        this.betDetailNode.emit("CLOSE_NOTICE");
    },
    requestErr: function requestErr() {
        this._super();
        this.noBetHistoryText.active = false;
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
        //# sourceMappingURL=BetHistory.js.map
        