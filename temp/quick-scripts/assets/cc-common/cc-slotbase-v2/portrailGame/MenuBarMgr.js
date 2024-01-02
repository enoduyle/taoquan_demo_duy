(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/MenuBarMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04fd43gGINEPoHeQt1g28Kh', 'MenuBarMgr', __filename);
// cc-common/cc-slotbase-v2/portrailGame/MenuBarMgr.js

'use strict';

var TweenView = require('TweenView');

var _require = require("gameCommonUtils"),
    checkConditionCloseGameIframe = _require.checkConditionCloseGameIframe;

cc.Class({
    extends: TweenView,

    properties: {
        exitGameNode: cc.Node,

        btnSoundOn: cc.Node,
        btnSoundOff: cc.Node,

        btnMusicOn: cc.Node,
        btnMusicOff: cc.Node,

        overlay: cc.Node,

        borderOverlayList: [cc.Node]
    },

    onLoad: function onLoad() {
        this._super();
        this.node.init = this.init.bind(this);
        this.node.clickPlayTrial = this.clickPlayTrial.bind(this);
        this.node.clickPlayReal = this.clickPlayReal.bind(this);

        this.checkGameInApp();
    },
    show: function show() {
        var _this = this;

        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.overlay != null) this.overlay.active = true;
        this._super(onStartCB, function () {
            _this.activeBorderOverlayList(true);
            _this.scheduleOnce(function () {
                onCompleteCB && onCompleteCB();
            }, 0.5);
            var isAutoSpin = _this.node.gSlotDataStore.isAutoSpin;
            var isFinished = _this.node.gSlotDataStore.playSession.isFinished;

            if (_this.overlay != null) {
                _this.overlay.active = isAutoSpin || isFinished === false;
            }
        });
    },
    hide: function hide() {
        var _this2 = this;

        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var completeCallBack = function completeCallBack() {
            onCompleteCB && onCompleteCB();
            _this2.activeBorderOverlayList(false);
        };
        this._super(onStartCB, completeCallBack);
        if (this.overlay != null) this.overlay.active = false;
    },
    checkGameInApp: function checkGameInApp() {
        if (this.exitGameNode) {
            var isEnableBtn = checkConditionCloseGameIframe();

            if (isEnableBtn) {
                this.exitGameNode.getComponent(cc.Button).interactable = true;
            } else {
                this.exitGameNode.getComponent(cc.Button).interactable = false;
            }
        }
    },
    onExitGame: function onExitGame() {
        var _this3 = this;

        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();

        if (cc.sys.isNative && typeof closeCreatorGame === 'function') {
            if (this.exitGameNode) {
                this.exitGameNode.emit("BACK_TO_LOBBY");
            }
        } else {
            this.scheduleOnce(function () {
                if (_this3.exitGameNode) {
                    _this3.exitGameNode.emit("BACK_TO_LOBBY");
                }
            }, 0.5);
        }
    },
    init: function init() {
        // sound setting
        if (this.node.soundPlayer) {
            this.btnSoundOn.active = this.node.soundPlayer.isEnableSFX;
            this.btnSoundOff.active = !this.node.soundPlayer.isEnableSFX;

            this.btnMusicOn.active = this.node.soundPlayer.isEnableBGM;
            this.btnMusicOff.active = !this.node.soundPlayer.isEnableBGM;
        }
    },
    clickSoundOn: function clickSoundOn() {
        // turn off sound
        if (this.btnSoundOff) this.btnSoundOff.active = true;
        if (this.btnSoundOn) this.btnSoundOn.active = false;
        if (!this.node.soundPlayer) {
            cc.warn('[SOUND_EVENT] No sound player found');
            return;
        }

        this.node.soundPlayer.setEffectEnable(false);
    },
    clickSoundOff: function clickSoundOff() {
        // turn on sound
        if (this.btnSoundOff) this.btnSoundOff.active = false;
        if (this.btnSoundOn) this.btnSoundOn.active = true;
        if (!this.node.soundPlayer) {
            cc.warn('[SOUND_EVENT] No sound player found');
            return;
        }
        this.node.soundPlayer.setEffectEnable(true);
        this.node.soundPlayer.playSFXClick();
    },
    clickMusicOn: function clickMusicOn() {
        // turn off sound
        if (this.btnMusicOff) this.btnMusicOff.active = true;
        if (this.btnMusicOn) this.btnMusicOn.active = false;
        if (!this.node.soundPlayer) {
            cc.warn('[SOUND_EVENT] No sound player found');
            return;
        }
        this.node.soundPlayer.stopMainBGM();
        this.node.soundPlayer.playSFXClick();
    },
    clickMusicOff: function clickMusicOff() {
        // turn on sound
        if (this.btnMusicOff) this.btnMusicOff.active = false;
        if (this.btnMusicOn) this.btnMusicOn.active = true;
        if (!this.node.soundPlayer) {
            cc.warn('[SOUND_EVENT] No sound player found');
            return;
        }
        this.node.soundPlayer.setBgmEnable(true);
        this.node.soundPlayer.playSFXClick();
    },
    clickPlayTrial: function clickPlayTrial() {},
    clickPlayReal: function clickPlayReal() {},
    activeBorderOverlayList: function activeBorderOverlayList(isActive) {
        for (var i = 0; i < this.borderOverlayList.length; i++) {
            var borderNode = this.borderOverlayList[i];
            borderNode.active = isActive;
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
        //# sourceMappingURL=MenuBarMgr.js.map
        