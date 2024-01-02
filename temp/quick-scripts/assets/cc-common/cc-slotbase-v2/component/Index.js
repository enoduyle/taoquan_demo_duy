(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/Index.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a35479Cy1NO7Z4FR3DR5KvX', 'Index', __filename);
// cc-common/cc-slotbase-v2/component/Index.js

'use strict';

var _connect = require('connectNetwork');
cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function onLoad() {
        this.node.index = this;
        if (cc.sys.isBrowser) {
            this._updateLanguageConfig();
        }
    },
    start: function start() {
        if (!this || !this.node || !this.node.director) return;
        this.gameId = this.node.config.GAME_ID;
        this.node.gSlotDataStore.gameId = this.gameId;
        this.node.director.init();
        this.connect();
        this._isOnStarted = false;
    },
    update: function update() {
        if (!this._isOnStarted) {
            this._isOnStarted = true;
            this.node.director.initGameMode();
        }
    },
    connect: function connect() {
        var autoConnect = new _connect();
        autoConnect.loginScene({
            callback: this.init.bind(this),
            gameId: this.gameId,
            gameNode: this.node,
            callbackAuthFailed: this.authFailed.bind(this)
        });
    },
    init: function init() {
        if (!this || !this.node || !this.node.director) return;
        this.node.director.setUpGame();
    },
    authFailed: function authFailed() {
        if (!this || !this.node || !this.node.director) return;
        this.node.director.showMessageAuthFailed();
    },
    _updateLanguageConfig: function _updateLanguageConfig() {
        this.languageCode = this._getLanguage();
        window.languageCode = this.languageCode;
    },
    _getLanguage: function _getLanguage() {
        var _require = require("gameCommonUtils"),
            getUrlParam = _require.getUrlParam;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        var defaultLanguage = window.defaultLanguage || 'VI';
        var language = '';
        if (LOGIN_IFRAME) {
            language = getUrlParam('l') || defaultLanguage;
            if (!CC_PREVIEW) {
                var folderLanguage = settings ? settings.folderLanguage : undefined;
                if (folderLanguage && folderLanguage !== 'all') {
                    //priority get folder language on preprod
                    language = folderLanguage;
                }
            }
        } else {
            language = cc.sys.localStorage.getItem('l') || defaultLanguage;
        }
        return language.toUpperCase();
    },
    onDestroy: function onDestroy() {
        if (cc.sys.isNative && typeof closeCreatorGame !== 'function') {
            cc.audioEngine.stopAll();
        }
        if (this.node.director && this.node.director.gameStateManager) {
            this.node.director.gameStateManager.outGame();
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
        //# sourceMappingURL=Index.js.map
        