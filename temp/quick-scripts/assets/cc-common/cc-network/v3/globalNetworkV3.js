(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-network/v3/globalNetworkV3.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9842erIB6dNrp19BS5Tjira', 'globalNetworkV3', __filename);
// cc-common/cc-network/v3/globalNetworkV3.js

'use strict';

/* global Sentry */

var gameNetwork = window.GameNetwork || require('game-network');
var MessageManager = gameNetwork.MessageManager;
var messageManager = MessageManager.getInstance();
var ServiceRest = gameNetwork.ServiceRest;
var serviceRest = ServiceRest.getInstance('cc');
var logger = gameNetwork.lib.logger;

function globalNetworkV3() {
    var _this = this;

    this.gamesData = {};
    this.token = null;
    this.init = function (token) {
        var envId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'portal';
        var gameIdSocket = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all';

        cc.log("Network using V3");
        _this.token = token;
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            SOCKET_URL = _loadConfigAsync$getC.SOCKET_URL,
            API_URL = _loadConfigAsync$getC.API_URL;

        var deviceInfo = {
            os: cc.sys.os,
            osVersion: cc.sys.osVersion,
            platform: cc.sys.platform,
            browser: cc.sys.browserType,
            browserVersion: cc.sys.browserVersion,
            language: cc.sys.language
        };
        logger.updateLogger(cc.log, cc.log, cc.warn);
        messageManager.initSocket({
            socketUrl: SOCKET_URL,
            token: token,
            apiUrl: API_URL,
            urlVerifyToken: 'auth/token/login',
            games: gameIdSocket,
            env: envId,
            device: deviceInfo,
            serviceRest: serviceRest
        });
        loadConfigAsync.setUpSentry();
    };

    this.getToken = function () {
        return _this.token;
    };

    this.registerGame = function (gameData) {
        var gameId = gameData.gameId,
            isSlotGame = gameData.isSlotGame;

        var gameState = void 0;
        if (typeof Sentry !== 'undefined') {
            Sentry.configureScope(function (scope) {
                scope.setExtra("gameId", gameId);
            });
        }
        if (isSlotGame) {
            gameState = require('gameStateSlot');
        } else {
            gameState = require('gameState' + gameId);
        }
        if (!gameState) return;

        return new gameState({ gameData: gameData });
    };

    this.triggerUserLogout = function () {
        messageManager.closeAndCleanUp();
    };

    this.outGame = function () {};
}

module.exports = globalNetworkV3;

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
        //# sourceMappingURL=globalNetworkV3.js.map
        