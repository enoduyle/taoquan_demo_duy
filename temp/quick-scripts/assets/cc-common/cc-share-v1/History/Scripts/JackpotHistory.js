(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/History/Scripts/JackpotHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a0a8dgrEbFI5pG+aixG8SAj', 'JackpotHistory', __filename);
// cc-common/cc-share-v1/History/Scripts/JackpotHistory.js

"use strict";

cc.Class({
    extends: require("BaseHistory"),

    properties: {
        noJackpotText: cc.Node,
        isMiniGame: false,
        initialized: false,
        jpList: "GRAND-MAJOR",
        pageIndex: cc.Node
    },

    onLoad: function onLoad() {
        this.initBase();
    },
    start: function start() {
        this.localizeText();
    },
    localizeText: function localizeText() {
        if (this.node.config.MESSAGE_DIALOG) {
            if (this.node.config.MESSAGE_DIALOG.NO_JACKPOT_HISTORY) {
                this.noJackpotText.getComponentInChildren(cc.Label).string = this.node.config.MESSAGE_DIALOG.NO_JACKPOT_HISTORY;
            }
            if (this.node.config.MESSAGE_DIALOG.ERROR_CONNECTION_HISTORY && this.errorMessage) {
                var label = this.errorMessage.getComponentInChildren(cc.Label) || this.errorMessage.getComponent(cc.Label);
                if (label) {
                    label.string = this.node.config.MESSAGE_DIALOG.ERROR_CONNECTION_HISTORY;
                }
            }
            if (this.pageIndex && this.node.config.MESSAGE_DIALOG.HISTORY_PAGE) {
                this.pageIndex.getComponentInChildren(cc.Label).string = this.node.config.MESSAGE_DIALOG.HISTORY_PAGE;
            }
        }
    },
    openPanel: function openPanel() {
        this.table.emit('CLEAR_DATA');
        if (this.serverMessage) this.serverMessage.active = false;
        this._super();
        if (this.pageIndex) this.pageIndex.active = false;
    },
    initBase: function initBase() {
        if (this.initialized) return;
        this._super();
        this.url = "jackpothistory/slot";
        this.noJackpotText.active = false;
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        if (this.node.config) {
            var betIds = this.node.config.BET_IDS;
            if (LOGIN_IFRAME) {
                betIds = this.node.config.BET_IDS_IFRAME;
            }
            if (this.node.config.JP_LIST_HISTORY) this.jpList = this.node.config.JP_LIST_HISTORY;
            this.init(this.node.config.GAME_ID, null, betIds, this.jpList);
        }
        //
        this.initialized = true;
    },


    //slot v1
    init: function init(gameId, soundPlayer, betIds) {
        var jpList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GRAND-MAJOR";
        var jpPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "kts_";
        var url = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "jackpothistory/slot";

        this.gameId = gameId;
        this.jpList = jpList;
        this.betIds = betIds;
        this.jpPrefix = jpPrefix;
        if (this.isMiniGame) {
            this.jpPrefix = 'ktmn_';
        }
        this.url = url;

        if (!this.node.soundPlayer && soundPlayer != null) this.node.soundPlayer = soundPlayer;

        if (soundPlayer) this.playSoundClick = soundPlayer.playClickButton.bind(soundPlayer);
    },


    // fish-client
    initObj: function initObj() {
        //this.node.emit(DTConstantsVariable.PANEL_EVENT.Show);
        this.openPanel();
    },
    clickFromMain: function clickFromMain() {
        if (cc.sys.os != cc.sys.OS_IOS || !cc.sys.isBrowser) {
            this.node.emit("SHOW_PANEL");
            this.openPanel();
        }
    },
    playLoading: function playLoading() {
        this._super();
        this.serverMessage.active = false;
        this.noJackpotText.active = false;
    },
    onRequestResponse: function onRequestResponse(res) {
        this._super(res);
        if (res.error && res.error.msg) {
            this.table.emit('CLEAR_DATA');
            this.serverMessage.active = true;
            this.serverMessage.getComponentInChildren(cc.Label).string = res.error.msg;
            if (this.pageIndex) this.pageIndex.active = false;
        } else if (res.error || Object.keys(res).length <= 0 || !res.data || res.data.length <= 0) {
            this.noJackpotText.active = true;
            if (this.pageIndex) this.pageIndex.active = false;
        } else {
            this.noJackpotText.active = false;
            if (this.pageIndex) this.pageIndex.active = true;
        }
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
        //# sourceMappingURL=JackpotHistory.js.map
        