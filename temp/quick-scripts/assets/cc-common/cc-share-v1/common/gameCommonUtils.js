(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/gameCommonUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e32b0u9l3BIgLi8zBq/6lQs', 'gameCommonUtils', __filename);
// cc-common/cc-share-v1/common/gameCommonUtils.js

'use strict';

/* global closeCreatorGame */

var lodash = require('lodash');

var _require = require('utils'),
    setDeviceOrientation = _require.setDeviceOrientation,
    updateUtilConfig = _require.updateUtilConfig;

function gameCommonUtils() {

    var getUrlParam = function getUrlParam(name) {
        if (cc.sys.isNative) return null;
        var url = new URL(window.location);
        return url.searchParams.get(name);
    };

    var addUrlParam = function addUrlParam(key, value) {
        if (cc.sys.isNative) return null;
        var url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    };

    var checkConditionCloseGameIframe = function checkConditionCloseGameIframe() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        if (!LOGIN_IFRAME) {
            return true;
        }
        var returnUrl = getUrlParam('ru');
        return returnUrl && LOGIN_IFRAME;
    };

    var handleBackLobbyNativeClient = function handleBackLobbyNativeClient() {
        if (cc.sys.isNative) {
            var vjsb = window['vjsb'];
            if (typeof closeCreatorGame === 'function') {
                if (!cc.isCallCloseCreator) {
                    closeCreatorGame();
                    //@ts-ignore
                    if (middleware && middleware.MiddlewareManager && cc.sys.os === cc.sys.OS_ANDROID) {
                        middleware.MiddlewareManager.destroyInstance();
                    }
                }
                cc.isCallCloseCreator = true;
                return true;
            } else if (vjsb) {
                var globalNetwork = require('globalNetwork');
                globalNetwork.triggerUserLogout();
                var CC_CMD = {
                    CMD_HOME: 1,
                    CMD_TEST: 2
                };
                cc.log('on home -- ' + vjsb.js2cMessage);
                vjsb.js2cMessage(JSON.stringify({
                    cmd: CC_CMD.CMD_HOME,
                    data: {}
                }));
                return true;
            }
        }
        return false;
    };

    var handleCloseGameIframe = function handleCloseGameIframe() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC2 = loadConfigAsync.getConfig(),
            LOBBY_SCENE_NAME = _loadConfigAsync$getC2.LOBBY_SCENE_NAME,
            LOGIN_IFRAME = _loadConfigAsync$getC2.LOGIN_IFRAME,
            IS_PRODUCTION = _loadConfigAsync$getC2.IS_PRODUCTION;

        var isBackLobbyClient = handleBackLobbyNativeClient();
        if (isBackLobbyClient) return;

        if (!LOGIN_IFRAME) {
            if (!IS_PRODUCTION) {
                setDeviceOrientation(false);
            }
            updateUtilConfig('CURRENCY_CONFIG', null);
            cc.director.preloadScene(LOBBY_SCENE_NAME, function () {
                cc.director.loadScene(LOBBY_SCENE_NAME);
            });
            return;
        }

        var returnUrl = getUrlParam('ru');
        if (returnUrl && LOGIN_IFRAME) {
            if (returnUrl.trim() === 'close') {
                window.close();
            } else {
                window.location.href = returnUrl;
            }
        } else {
            location.reload();
            // window.close();
        }
    };

    var handleFlowOutGame = function handleFlowOutGame() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC3 = loadConfigAsync.getConfig(),
            LOBBY_SCENE_NAME = _loadConfigAsync$getC3.LOBBY_SCENE_NAME,
            LOGIN_IFRAME = _loadConfigAsync$getC3.LOGIN_IFRAME,
            IS_PRODUCTION = _loadConfigAsync$getC3.IS_PRODUCTION;

        var isBackLobbyClient = handleBackLobbyNativeClient();
        if (isBackLobbyClient) return;

        if (LOGIN_IFRAME) {
            if (window && window.location) {
                window.location.reload();
            }
        } else {
            if (!IS_PRODUCTION) {
                setDeviceOrientation(false);
            }
            cc.director.preloadScene(LOBBY_SCENE_NAME, function () {
                cc.director.loadScene(LOBBY_SCENE_NAME);
            });
        }
    };
    var handleBackLogin = function handleBackLogin() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC4 = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC4.LOGIN_IFRAME,
            LOBBY_SCENE_NAME = _loadConfigAsync$getC4.LOBBY_SCENE_NAME,
            IS_PRODUCTION = _loadConfigAsync$getC4.IS_PRODUCTION,
            LOGIN_SCENE_NAME = _loadConfigAsync$getC4.LOGIN_SCENE_NAME;

        var isBackLobbyClient = handleBackLobbyNativeClient();
        if (isBackLobbyClient) return;

        if (LOGIN_IFRAME) {
            if (window && window.location) {
                window.location.reload();
            }
        } else {
            if (IS_PRODUCTION) {
                cc.director.preloadScene(LOBBY_SCENE_NAME, function () {
                    cc.director.loadScene(LOBBY_SCENE_NAME);
                });
            } else {
                var nodePersist = cc.director.getScene().getChildByName('OverlayPersistent');
                if (nodePersist) {
                    cc.game.removePersistRootNode(nodePersist);
                }
                setDeviceOrientation(false);
                cc.director.preloadScene(LOGIN_SCENE_NAME, function () {
                    cc.director.loadScene(LOGIN_SCENE_NAME);
                });
            }
        }
    };
    var getMessageSlot = function getMessageSlot() {
        var mess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var i18n = require('LanguageData');
        return i18n.getMessageSlot(mess) || {};
    };
    var getBetValueWithGame = function getBetValueWithGame(gameId) {
        var listBet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (!gameId) return '';

        var betValue = cc.sys.localStorage.getItem('betValueWithGame');
        if (lodash.isEmpty(betValue)) {
            var newObj = {};
            newObj[gameId] = '';
            cc.sys.localStorage.setItem('betValueWithGame', JSON.stringify(newObj));
        } else {
            betValue = JSON.parse(betValue);
            if (lodash.isEmpty(listBet)) {
                return betValue[gameId];
            } else {
                if (lodash.isArray(listBet) && listBet.includes(betValue[gameId])) {
                    return betValue[gameId];
                } else {
                    var isExist = false;
                    Object.keys(listBet).map(function (betId) {
                        if (listBet[betId] === betValue[gameId]) {
                            isExist = true;
                        }
                    });
                    if (isExist) {
                        return betValue[gameId];
                    }
                }
            }
        }
        return '';
    };

    var setBetValueWithGame = function setBetValueWithGame(gameId, betId) {
        var betValue = cc.sys.localStorage.getItem('betValueWithGame');
        if (lodash.isEmpty(betValue)) {
            var newObj = {};
            newObj[gameId] = betId;
            cc.sys.localStorage.setItem('betValueWithGame', JSON.stringify(newObj));
        } else {
            betValue = JSON.parse(betValue);
            betValue[gameId] = betId;
            cc.sys.localStorage.setItem('betValueWithGame', JSON.stringify(betValue));
        }
    };

    var getKeyWithGame = function getKeyWithGame(gameId, key) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        if (!gameId || !key) return '';

        var betLinesValue = cc.sys.localStorage.getItem(key);
        if (lodash.isEmpty(betLinesValue)) {
            var newObj = {};
            newObj[gameId] = value;
            cc.sys.localStorage.setItem(key, JSON.stringify(newObj));
        } else {
            betLinesValue = JSON.parse(betLinesValue);
            return betLinesValue[gameId] ? betLinesValue[gameId] : value;
        }
        return value;
    };

    var setKeyWithGame = function setKeyWithGame(gameId, key) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        if (!gameId || !key) return '';

        var betLinesValue = cc.sys.localStorage.getItem(key);
        if (lodash.isEmpty(betLinesValue)) {
            var newObj = {};
            newObj[gameId] = value;
            cc.sys.localStorage.setItem(key, JSON.stringify(newObj));
        } else {
            betLinesValue = JSON.parse(betLinesValue);
            betLinesValue[gameId] = value;
            cc.sys.localStorage.setItem(key, JSON.stringify(betLinesValue));
        }
    };

    var optimizeScrollView = function optimizeScrollView(listView) {
        var view = listView.parent;
        var viewRect = cc.rect(-view.width / 2, -listView.y - view.height, view.width, view.height);
        for (var i = 0; i < listView.children.length; i++) {
            var node = listView.children[i];
            if (viewRect.intersects(node.getBoundingBox())) {
                node.opacity = 255;
            } else {
                node.opacity = 0;
            }
        }
    };

    return {
        checkConditionCloseGameIframe: checkConditionCloseGameIframe,
        handleCloseGameIframe: handleCloseGameIframe,
        setBetValueWithGame: setBetValueWithGame,
        getBetValueWithGame: getBetValueWithGame,
        handleBackLogin: handleBackLogin,
        handleFlowOutGame: handleFlowOutGame,
        getMessageSlot: getMessageSlot,
        getUrlParam: getUrlParam,
        optimizeScrollView: optimizeScrollView,
        getKeyWithGame: getKeyWithGame,
        setKeyWithGame: setKeyWithGame,
        addUrlParam: addUrlParam
    };
}

module.exports = new gameCommonUtils();

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
        //# sourceMappingURL=gameCommonUtils.js.map
        