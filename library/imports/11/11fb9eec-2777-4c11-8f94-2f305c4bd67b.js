"use strict";
cc._RF.push(module, '11fb97sJ3dMEY+ULzBcS9Z7', 'BackToLobby');
// cc-common/cc-slotbase-v2/gui/BackToLobby.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        lobbySceneName: "lobby"
    },
    onLoad: function onLoad() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        if (LOGIN_IFRAME) {
            var gameCommonUtils = require('gameCommonUtils');
            var isEnableBtn = gameCommonUtils.checkConditionCloseGameIframe();
            if (!isEnableBtn) {
                var button = this.node.getChildByName('Button');
                if (button) {
                    button.active = false;
                }
            }
        } else {
            this.node.on("BACK_TO_LOBBY", this.trigger, this);
        }
    },
    trigger: function trigger() {
        var _this = this;

        if (this.node.mainDirector && this.node.mainDirector.director.waitingScene) {
            this.node.mainDirector.director.showWaitingCutScene();
        }
        if (this.node.soundPlayer && !this._backToLobbyCallback) {
            this.node.soundPlayer.playSFXClick();
        }
        if (this._backToLobbyCallback) {
            this.unschedule(this._backToLobbyCallback);
            this._backToLobbyCallback = null;
        }
        var delaySoundClick = 0.1;
        this._backToLobbyCallback = function () {
            _this._backToLobbyCallback = null;
            if (cc.sys.isNative && typeof closeCreatorGame === 'function') {
                //
            } else {
                if (_this.node.soundPlayer) {
                    _this.node.soundPlayer.stopAllAudio();
                }
            }
            var gameCommonUtils = require('gameCommonUtils');
            gameCommonUtils.handleCloseGameIframe();
        };
        if (cc.sys.isNative && typeof closeCreatorGame === 'function') {
            this._backToLobbyCallback();
        } else {
            this.scheduleOnce(this._backToLobbyCallback, delaySoundClick);
        }
    }
});

cc._RF.pop();