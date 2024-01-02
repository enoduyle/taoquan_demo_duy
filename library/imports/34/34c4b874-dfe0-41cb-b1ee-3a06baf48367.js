"use strict";
cc._RF.push(module, '34c4bh03+BBy7HuOga69INn', 'Director');
// cc-common/cc-slotbase-v2/component/Director.js

'use strict';

/* global Sentry, finishDemoCallBack, CC_DEBUG */
var baseDirector = require('BaseDirectorV2');
var globalNetwork = require('globalNetwork');

var _require = require("gameCommonUtils"),
    handleFlowOutGame = _require.handleFlowOutGame,
    handleBackLogin = _require.handleBackLogin,
    getUrlParam = _require.getUrlParam,
    handleCloseGameIframe = _require.handleCloseGameIframe;

var _require2 = require('utils'),
    formatWalletMoney = _require2.formatWalletMoney,
    findKeyByValue = _require2.findKeyByValue,
    updateUtilConfig = _require2.updateUtilConfig;

var lodash = require('lodash');
var tutorialManager = require("TutorialMgr");
var gameNetwork = window.GameNetwork || require('game-network');
var EventManager = gameNetwork.EventManager;
var PROMOTION_ERROR = {
    WRONG_BET: '0016',
    EXPIRED: '0042',
    RESET: '0043',
    NEW: '0044'
};

cc.Class({
    extends: baseDirector,

    properties: {
        backToLobby: cc.Node,
        info: cc.Node,
        setting: cc.Node,
        bet: cc.Node,
        turbo: cc.Node,
        jackpot: cc.Node,
        wallet: cc.Node,
        gui: cc.Node,
        cutscene: cc.Node,
        normalGame: cc.Node,
        freeGame: cc.Node,
        bonusGame: cc.Node,
        gameText: cc.JsonAsset,
        gameTrialSupport: {
            default: false
        },
        realWalletAmount: {
            default: null,
            type: cc.Node
        },
        trialWalletAmount: {
            default: null,
            type: cc.Node
        },
        trialButton: {
            default: null,
            type: cc.Node
        },
        realButton: {
            default: null,
            type: cc.Node
        },
        jackpotHistory: cc.Node,
        betHistory: cc.Node,
        backgroundLoading: cc.Node,
        tutorialData: {
            type: cc.Asset,
            default: null
        },
        tutorialMgr: tutorialManager,
        toastMessage: require("ToastInfo"),
        waitingScene: cc.Node,
        demoGroup: cc.Node,
        isGamePrefab: false
    },

    onLoad: function onLoad() {
        var _this = this;

        this._super();
        this.gameTrialData = this.node.trialData || null;
        if (this.tutorialData) this.tutorialSpinData = this.tutorialData.json;
        // @TODO: Refactor this code
        if (this.backgroundLoading) {
            this.backgroundLoading.active = true;
        }
        this.node.on("INGAME_EVENT_RAISED", function (ev) {
            var evName = ev.getUserData().trigger;
            _this.onIngameEvent(evName);
            ev.stopPropagation();
        });
        if (this.tutorialMgr) this.tutorialMgr.setMainGameMgr(this);
        this.node.on("ENABLE_BUTTON_CONTROL", this.enableButtonControl, this);
        this.node.on("DISABLE_BUTTON_CONTROL", this.disableButtonControl, this);
        this.node.on("HIDE_TUTORIAL", this.hideTutorial, this);
        this.node.on('SET_UP_SPINE_DATABASE', this.setUpSpineDatabase.bind(this));
        this.setupGameMode();
        this.showMessageForceClose = false;
        this.networkWarningTime = 0;
        this.joinGameSuccess = false;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        if (LOGIN_IFRAME) {
            this.playingDemo = getUrlParam('trialMode') === 'true';
        }
        this._setUpGameVersion();

        this.usingPopups = [this.setting, this.info, this.jackpotHistory, this.betHistory];
    },
    start: function start() {
        this._super();
        this.loadText();
    },
    loadText: function loadText() {
        if (this.gameText) {
            this.node.config.GAME_TEXT = this.gameText.json;
        }
        this.promotionMessage = this.node.config.MESSAGE_DIALOG.PROMOTION_MESSAGE;
        this.promotionReset = this.node.config.MESSAGE_DIALOG.PROMOTION_RESET;
        this.promotionNew = this.node.config.MESSAGE_DIALOG.PROMOTION_NEW;
    },
    _setUpGameVersion: function _setUpGameVersion() {
        var versionSlot = this.node.getComponentInChildren("VersionSlot");
        if (versionSlot && versionSlot.versionFile && versionSlot.versionFile.json.version) {
            if (typeof Sentry !== 'undefined') {
                Sentry.configureScope(function (scope) {
                    scope.setExtra("gameVersion", versionSlot.versionFile.json.version);
                });
            }
        }
    },
    onIngameEvent: function onIngameEvent(evName) {
        this.trialMode && this.tutorialMgr && this.tutorialMgr.trigger(evName);
    },
    getGameId: function getGameId() {
        return this.node.gSlotDataStore.gameId;
    },
    getGameMeta: function getGameMeta() {
        //TODO implement game meta;
        var cutSceneMgr = this.cutscene.getComponent("CutsceneControl");
        return {
            'gameMode': this.currentGameMode.name,
            'cutScene': cutSceneMgr.getDisplayCutscene(),
            'lastCommand': this.currentGameMode.getComponent('SlotGameDirector').getLastCommand(),
            'scripts': this.currentGameMode.getComponent('SlotGameDirector').getRemainScripts()
        };
    },
    init: function init() {
        var _this2 = this;

        // @TODO: Refactor this code
        if (this.backgroundLoading) {
            this.backgroundLoading.runAction(cc.fadeTo(0.3, 0));
        }
        if (!this.wallet) this.wallet = this.node;
        if (!this.bet) this.bet = this.node;
        if (!this.jackpot) this.jackpot = this.node;
        if (!this.turbo) this.turbo = this.node;
        if (!this.setting) this.setting = this.node;
        if (!this.cutscene) this.cutscene = this.node;
        this.readyToPlay = false;
        this.trialMode = false;

        //Register actors
        this.turbo.on("TURBO_TOGGLE", this.toggleModeTurbo, this);
        this.setting.emit("INIT");
        this.cutscene.children.forEach(function (element) {
            var cutsceneMode = element.getComponent('CutsceneMode');
            cutsceneMode && cutsceneMode.init(_this2);
        });
    },
    setUpSpineDatabase: function setUpSpineDatabase(evt) {
        evt.propagationStopped = true;
        if (evt.detail) {
            this.spineSkeletonDatabase = evt.detail.spineSkeletonDatabase;
        }
    },
    getSpineSkeletonData: function getSpineSkeletonData(spineName) {
        if (this.node && this.spineSkeletonDatabase && this.spineSkeletonDatabase.getSpineSkeletonData) {
            return this.spineSkeletonDatabase.getSpineSkeletonData(spineName);
        }
        return null;
    },
    setupGameMode: function setupGameMode() {
        this.gameModeList = [];
        if (this.normalGame) this.gameModeList.push(this.normalGame);
        if (this.freeGame) this.gameModeList.push(this.freeGame);
        if (this.bonusGame) this.gameModeList.push(this.bonusGame);
    },
    isTutorialShowing: function isTutorialShowing() {
        return this.tutorialMgr && this.tutorialMgr.isShowing();
    },
    isTutorialFinished: function isTutorialFinished() {
        return !this.tutorialMgr || this.tutorialMgr.isFinished();
    },
    enableTrialButton: function enableTrialButton(enable) {
        if (this.trialButton) this.trialButton.emit("ENABLE_BUTTONS", enable);
    },

    /// do not remove this function!
    enableCheckForever: function enableCheckForever() {},
    getServerVersion: function getServerVersion() {
        var _require3 = require('gameCommonUtils'),
            getUrlParam = _require3.getUrlParam;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC2 = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC2.LOGIN_IFRAME;

        var version = this.node.config.SERVER_VERSION || '';
        if (LOGIN_IFRAME) {
            version = getUrlParam('gameVersion') || version;
        }
        if (this.playingDemo) return 2;
        return version;
    },
    setUpGame: function setUpGame() {
        this.resumeDelay = 0.3;
        var serverVersion = this.getServerVersion();
        this.gameStateManager = globalNetwork.registerGame({
            gameId: this.node.gSlotDataStore.gameId,
            isSlotGame: true,
            serverVersion: serverVersion,
            stateUpdate: this.stateUpdate.bind(this),
            userLogout: this.userLogout.bind(this),
            joinGameSuccess: this.initJP.bind(this),
            onJackpotWin: this.playJackpotWin.bind(this), //
            onNoticeJackpotWin: this.noticeJackpotWin.bind(this), //
            authFailed: this.showMessageAuthFailed.bind(this),
            tutorialData: this.tutorialSpinData,
            onNetworkFailed: this.onNetworkFailed.bind(this),
            onNetworkError: this.onNetworkError.bind(this),
            onNetworkDisconnect: this.onNetworkDisconnect.bind(this),
            onNetworkResume: this.onNetworkResume.bind(this),
            onNetworkWarning: this.onNetworkWarning.bind(this),
            onShowPopupDisconnected: this.onShowPopupDisconnected.bind(this),
            onNetworkConnected: this.onNetworkConnected.bind(this),
            onJoinGameDenied: this.onJoinGameDenied.bind(this),
            onRequestDenied: this.onRequestDenied.bind(this),
            useShortParam: this.node.config.USE_SHORT_PARAM,
            onNoticeUserWinJackpot: this.onNoticeUserWinJackpot.bind(this)
        });
        this.isHidden = false;
        cc.game.on(cc.game.EVENT_HIDE, this.onEventHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onEventShow, this);
        if (this.playingDemo) {
            this.trialButton.setPlayDemoMode();
            if (this.demoGroup) this.demoGroup.active = true;
        }
    },
    onEventHide: function onEventHide() {
        cc.log("GAME_HIDE");
        this.isHidden = true;
        if (this.gameStateManager) {
            this.gameStateManager.gameOnPause();
        }
    },
    onEventShow: function onEventShow() {
        cc.log("GAME_SHOW");
        this.isHidden = false;
        if (this.gameStateManager) {
            this.gameStateManager.gameOnResume();
        }
    },
    initGameMode: function initGameMode() {
        //Binding game modes
        if (this.normalGame) this.normalGame.init(this, true);
        if (this.freeGame) this.freeGame.init(this);
        if (this.bonusGame) this.bonusGame.init(this);

        //3 modes: normalGame, freeGame, bonusGame
        this.node.gSlotDataStore.currentGameMode = "normalGame";
        this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];

        this.gui.show();
        this.currentGameMode.enter();
    },
    extendInit: function extendInit(meta) {// eslint-disable-line
        //Add Override here
    },
    enableButtonInteraction: function enableButtonInteraction() {
        if (this.normalGame) this.normalGame.emit("ENABLE_BUTTON_INTERACTION");
        if (this.freeGame) this.freeGame.emit("ENABLE_BUTTON_INTERACTION");
        if (this.bonusGame) this.bonusGame.emit("ENABLE_BUTTON_INTERACTION");
    },
    initJP: function initJP(meta) {
        var _this3 = this;

        //Register event with server
        this.enableButtonInteraction();
        var wallet = 0;
        var extendData = meta.extendData,
            dataResume = meta.dataResume,
            metaDataPromotion = meta.metaDataPromotion;

        if (!lodash.isEmpty(extendData)) {
            var extendCommon = extendData.ec;

            if (extendCommon) {
                this.extendCommonData = this.parseExtendCommonData(extendCommon);
            }
            if (this.extendCommonData && this.node.config.IS_SUPPORT_MULTI_CURRENCY) {
                this._updateCurrencyConfig();
            }
            if (this._isCurrencyError) return;
        }

        this.joinGameSuccess = true;
        if (!lodash.isEmpty(extendData) && !lodash.isEmpty(extendData.metaDataUser) && extendData.metaDataUser.currentWalletAmount) {
            wallet = extendData.metaDataUser.currentWalletAmount;
        }
        if (!lodash.isEmpty(extendData) && !lodash.isEmpty(extendData.mBet)) {
            var listDataBet = extendData.mBet.split(',');
            var steps = {};
            listDataBet.forEach(function (item) {
                steps[item.split(';')[0][0]] = Number(item.split(';')[1]);
            });
            this.node.gSlotDataStore.slotBetDataStore.createDefaultBet(this.node.config, steps);
            this.updateJackpotHistoryBet(extendData.mBet);
        }
        this.bet.emit("LOAD_BET", { gameId: this.node.config.GAME_ID, betId: this.node.config.DEFAULT_BET });

        this.bet.on('BET_CHANGE', function (betId) {
            _this3.jackpot.emit("CHANGE_JACKPOT");
            _this3.tutorialMgr && _this3.tutorialMgr._updateJackpot();
            if (_this3.trialMode && betId) {
                _this3.updateTrialBet(betId);
            }
            _this3.changeBetCallback(betId);
        });
        this.jackpot.emit("REGISTER_JACKPOT", this.node.gSlotDataStore.gameId, meta, this.gameStateManager);
        this.readyToPlay = true;
        this.wallet.emit("UPDATE_WALLET", { amount: wallet });
        this.jackpotHistory && this.jackpotHistory.emit('ENABLE_BUTTONS');
        this.trialButton && this.trialButton.emit('CAN_SWITCH_MODE');

        this.extendInit(lodash.clone(meta));
        // resume from join game
        if (dataResume) {
            this.normalGame.emit("SPIN_DISABLE");
            this.disableBet();
            this.extendActionForResume();
            this.runAction('Resume', dataResume);
            if (metaDataPromotion) {
                var isResume = true;
                this.promotionUpdate(metaDataPromotion, isResume);
            }
        } else {
            this.normalGame.emit("SPIN_ENABLE");
            if (metaDataPromotion) {
                this.promotionUpdate(metaDataPromotion);
            } else {
                this.enableBet();
                this.enableTrialButton(true);
            }
        }
        var havingDirector = this.currentGameMode && this.currentGameMode.director;
        if (havingDirector && dataResume) {
            this.currentGameMode.director.hideAnimIntro();
        }
        if (this.playingDemo) {
            this.node.gSlotDataStore.isPlayDemo = true;
            this.setupPlayDemo();
        }
        if (this.setting) {
            this.setting.emit('ADD_TOGGLE_SWITCH_NETWORK', this.gameStateManager);
        }
    },
    setupPlayDemo: function setupPlayDemo() {
        this.countF2R = 0;
        this.switchToTrialMode();
        this.tutorialMgr.skipTutorial();
        this._listenActionOnButtons();
        this._detectAFK();
    },
    _listenActionOnButtons: function _listenActionOnButtons() {
        var _this4 = this;

        this._allButtons = this.node.getComponentsInChildren(cc.Button);
        this._allButtons.forEach(function (btn) {
            btn.node.on(cc.Node.EventType.TOUCH_START, function () {
                if (btn.interactable) {
                    _this4.node.gSlotDataStore.lastActionTime = Date.now();
                }
            });
        });
    },
    _detectAFK: function _detectAFK() {
        var _this5 = this;

        this.node.gSlotDataStore.timerAFK = 0;
        this.tweenDetectAFK = cc.tween(this).delay(1).call(function () {
            _this5.node.gSlotDataStore.timerAFK++;
            var _node$gSlotDataStore = _this5.node.gSlotDataStore,
                isAutoSpin = _node$gSlotDataStore.isAutoSpin,
                currentGameMode = _node$gSlotDataStore.currentGameMode,
                timerAFK = _node$gSlotDataStore.timerAFK;

            if (currentGameMode !== 'normalGame') return;
            if (isAutoSpin) return;
            if (timerAFK > 30) _this5.showPopupRedirect();
        }).union().repeatForever().start();
    },
    showPopupRedirect: function showPopupRedirect() {
        var _this6 = this;

        if (!this.playingDemo) return;
        var _node$gSlotDataStore2 = this.node.gSlotDataStore,
            isAutoSpin = _node$gSlotDataStore2.isAutoSpin,
            currentGameMode = _node$gSlotDataStore2.currentGameMode;

        if (this._isShowPopupRedirect) return;
        this._isShowPopupRedirect = true;
        if (currentGameMode === 'normalGame' && isAutoSpin) {
            this.currentGameMode.director.stopAutoSpinClick();
        }
        var _node$config$MESSAGE_ = this.node.config.MESSAGE_DIALOG,
            NAME = _node$config$MESSAGE_.NAME,
            FINISH_DEMO = _node$config$MESSAGE_.FINISH_DEMO;

        this.showCutscene(NAME, {
            strText: FINISH_DEMO,
            actionBtnOK: function actionBtnOK() {
                _this6._isShowPopupRedirect = false;
                _this6.node.gSlotDataStore.timerAFK = 0;
                _this6.showWaitingCutScene();
                _this6.scheduleOnce(function () {
                    if (typeof finishDemoCallBack === 'function') {
                        finishDemoCallBack();
                    } else {
                        handleCloseGameIframe();
                    }
                }, 0.5);
            },
            actionCancel: function actionCancel() {
                _this6._isShowPopupRedirect = false;
                _this6.node.gSlotDataStore.timerAFK = 0;
            }
        });
    },
    countingFastToResult: function countingFastToResult() {
        if (!this.playingDemo) return;
        if (this.node.gSlotDataStore.modeTurbo === true) return;
        if (this.countF2R === null) return;
        this.countF2R++;
        if (this.countF2R === 3) {
            this.showPopupSuggestTurbo();
            this.countF2R = null;
        }
    },
    showPopupSuggestTurbo: function showPopupSuggestTurbo() {
        var _this7 = this;

        var _node$config$MESSAGE_2 = this.node.config.MESSAGE_DIALOG,
            NAME = _node$config$MESSAGE_2.NAME,
            SUGGEST_TURBO = _node$config$MESSAGE_2.SUGGEST_TURBO;

        this.showCutscene(NAME, {
            strText: SUGGEST_TURBO,
            actionBtnOK: function actionBtnOK() {
                _this7.turbo.emit("TURN_ON");
            },
            actionCancel: function actionCancel() {}
        });
    },
    playJackpotWin: function playJackpotWin(data, isMe) {
        if (!this.canNotifyJackpot(data)) return;
        if (isMe) return this.pauseJackpot();
        this.jackpot.emit("PLAY_JACKPOT_EXPLOSION", data.jpInfo);
        cc.warn('%cjackppot-win', "color: #red", JSON.stringify(data.jpInfo));
    },
    noticeJackpotWin: function noticeJackpotWin(data, isMe) {
        if (!this.canNotifyJackpot(data)) return;
        if (isMe) return this.pauseJackpot();
        this.jackpot.emit("NOTICE_JACKPOT_WIN", data.jpInfo);
    },
    onNoticeUserWinJackpot: function onNoticeUserWinJackpot(data, isMe) {},
    canNotifyJackpot: function canNotifyJackpot(data) {
        if (!data || !data.jpInfo || !this.node.config.IS_SHOW_JACKPOT_EXPLOSION || this.isHidden || this.trialMode || this.node.gSlotDataStore.currentGameMode === "bonusGame") return false;
        return true;
    },
    stopJackpotWin: function stopJackpotWin() {
        if (!this.node.config.IS_SHOW_JACKPOT_EXPLOSION) return;
        if (!this.trialMode) {
            this.jackpot.emit("STOP_JACKPOT_EXPLOSION");
        }
    },
    extendActionForResume: function extendActionForResume() {
        //Add your overwrite code here!
    },


    //data recieve start from here
    stateUpdate: function stateUpdate(data) {
        this.runAction('Update', data);
        if (this.tutorialMgr && this.trialMode) {
            this.tutorialMgr.onStateUpdate(data);
        }
    },
    stopSpinCurrentMode: function stopSpinCurrentMode() {
        if (this.currentGameMode && this.currentGameMode.director && this.currentGameMode.director.forceStopSpinning) {
            this.currentGameMode.director.forceStopSpinning();
        }
    },
    userLogout: function userLogout() {
        var _this8 = this;

        this.logOutUser = true;
        if (!this.node) return;
        this.node.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            var ANOTHER_ACCOUNT = _this8.node.config.MESSAGE_DIALOG.ANOTHER_ACCOUNT;

            _this8.showPopupHandleOutGame(ANOTHER_ACCOUNT, handleBackLogin);
            if (_this8.currentGameMode && _this8.currentGameMode.director && _this8.currentGameMode.director.table) {
                _this8.currentGameMode.director.forceStopSpinning();
                _this8.currentGameMode.director.table.emit('STOP_REEL_ROOL');
            }
        })));
    },
    isUserLogout: function isUserLogout() {
        return this.logOutUser;
    },
    showWaitingCutScene: function showWaitingCutScene() {
        this.isShowWaitingCutScene = true;
        this.showCutscene('waitingScene');
    },
    showPopupHandleOutGame: function showPopupHandleOutGame(text, cbHandler) {
        var _this9 = this;

        var NAME = this.node.config.MESSAGE_DIALOG.NAME;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC3 = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC3.LOGIN_IFRAME;

        if (LOGIN_IFRAME) {
            var gameCommonUtils = require('gameCommonUtils');
            var isEnableBtn = gameCommonUtils.checkConditionCloseGameIframe();
            if (isEnableBtn) {
                this.showCutscene(NAME, {
                    strText: text, actionBtnOK: function actionBtnOK() {
                        _this9.showWaitingCutScene();
                        _this9.scheduleOnce(function () {
                            gameCommonUtils.handleCloseGameIframe();
                        }, 0.5);
                    }
                });
            } else {
                this.showCutscene(NAME, {
                    strText: text
                });
            }
        } else {
            this.showCutscene(NAME, {
                strText: text, actionBtnOK: function actionBtnOK() {
                    _this9.showWaitingCutScene();
                    if (cc.sys.isNative && typeof closeCreatorGame === 'function') {
                        cbHandler();
                    } else {
                        _this9.scheduleOnce(function () {
                            cbHandler();
                        }, 0.5);
                    }
                }
            });
        }
    },
    showMessageAuthFailed: function showMessageAuthFailed() {
        var _this10 = this;

        if (!this.node) return;
        this.node.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            var AUTHEN_FAILED = _this10.node.config.MESSAGE_DIALOG.AUTHEN_FAILED;

            _this10.showPopupHandleOutGame(AUTHEN_FAILED, handleBackLogin);
        })));
    },
    onJoinGameDenied: function onJoinGameDenied() {
        var _this11 = this;

        if (!this.node) return;
        this.node.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            var ACCOUNT_BLOCKED = _this11.node.config.MESSAGE_DIALOG.ACCOUNT_BLOCKED;

            _this11.showPopupHandleOutGame(ACCOUNT_BLOCKED, handleBackLogin);
        })));
    },
    onRequestDenied: function onRequestDenied() {
        var _this12 = this;

        if (!this.node) return;
        this.node.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            var REQUEST_DENIED = _this12.node.config.MESSAGE_DIALOG.REQUEST_DENIED;

            _this12.showPopupHandleOutGame(REQUEST_DENIED, handleBackLogin);
        })));
    },
    onNetworkProblem: function onNetworkProblem(reason) {
        if (this.logOutUser) return;

        if (reason == 'mismatch-command') {
            var MISMATCH_DATA = this.node.config.MESSAGE_DIALOG.MISMATCH_DATA;

            this.showPopupHandleOutGame(MISMATCH_DATA, handleFlowOutGame);
        }
        if (this.currentGameMode && this.currentGameMode.director && this.currentGameMode.director.table) {
            this.currentGameMode.director.table.emit('STOP_REEL_ROOL');
        }
    },
    promotionUpdate: function promotionUpdate(metaData) {
        var _this13 = this;

        var isResume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (metaData) {
            this.disableBet();
            if (this.node && this.node.gSlotDataStore) {
                var betId = metaData.betId,
                    promotionRemain = metaData.promotionRemain,
                    promotionTotal = metaData.promotionTotal;

                this.node.gSlotDataStore.promotion = true;
                this.node.gSlotDataStore.promotionRemain = promotionRemain;
                this.node.gSlotDataStore.promotionBetId = betId;
                this.node.gSlotDataStore.promotionTotal = promotionTotal;
                this.runDelayPromtion(isResume);
            } else {
                this.node.runAction(cc.sequence(cc.delayTime(this.resumeDelay), cc.callFunc(function () {
                    _this13.currentGameMode.director.updatePromotionData(metaData);
                    _this13.showPromotionPopup(isResume);
                })));
                return;
            }
        }
    },
    runDelayPromtion: function runDelayPromtion(isResume) {
        var _this14 = this;

        this.node.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
            if (_this14.currentGameMode && _this14.currentGameMode.director) {
                _this14.showPromotionPopup(isResume);
            } else {
                _this14.runDelayPromtion(isResume);
            }
        })));
    },
    showPromotionPopup: function showPromotionPopup(isResume) {
        var _this15 = this;

        if (isResume) return;
        var _node$gSlotDataStore3 = this.node.gSlotDataStore,
            promotionRemain = _node$gSlotDataStore3.promotionRemain,
            promotionBetId = _node$gSlotDataStore3.promotionBetId,
            promotionErrorCode = _node$gSlotDataStore3.promotionErrorCode;
        var NAME = this.node.config.MESSAGE_DIALOG.NAME;

        var totalBetValue = this.currentGameMode.director.getTotalBetValue(promotionBetId);

        var message = this.promotionMessage.replace("{1}", promotionRemain).replace("{2}", formatWalletMoney(totalBetValue));
        if (promotionErrorCode) {
            switch (promotionErrorCode) {
                case PROMOTION_ERROR.RESET:
                    message = this.promotionReset.replace("{1}", promotionRemain).replace("{2}", formatWalletMoney(totalBetValue));
                    break;
                case PROMOTION_ERROR.NEW:
                    message = this.promotionNew.replace("{1}", promotionRemain).replace("{2}", formatWalletMoney(totalBetValue));
                    break;
            }
            this.node.gSlotDataStore.promotionErrorCode = null;
        }
        this.setUpPromotion();
        this.showCutscene(NAME, {
            strText: message, actionBtnOK: function actionBtnOK() {
                _this15.stopPromotionAnim();
            }
        });
        this.showPopupPromotionAnim = cc.sequence(cc.delayTime(5), cc.callFunc(function () {
            _this15.cutscene.emit("CLOSE_CUTSCENE", NAME);
        }));
        if (this.showPopupPromotionAnim) {
            this.node.runAction(this.showPopupPromotionAnim);
        }
    },
    stopPromotionAnim: function stopPromotionAnim() {
        if (this.node && this.showPopupPromotionAnim) {
            this.node.stopAction(this.showPopupPromotionAnim);
        }
    },
    setUpPromotion: function setUpPromotion() {
        this.currentGameMode.director.runPromotionSpin();
    },
    sendSpinToNetwork: function sendSpinToNetwork(currentBetData) {
        if (this.node.gSlotDataStore.currentGameMode == "freeGame") {
            this.gameStateManager.triggerFreeSpinRequest();
        } else {
            this.gameStateManager.triggerSpinRequest(currentBetData);
        }
    },
    spinPromotion: function spinPromotion() {
        // const {promotionRemain} = this.node.gSlotDataStore;
        // this.currentGameMode.director.triggerPromotionSpin(promotionRemain);
    },


    //Preparation and transition Make modes readyss
    newGameMode: function newGameMode(_ref, callback) {
        var name = _ref.name,
            data = _ref.data;

        if (this[name]) {
            this.stopJackpotWin();
            this.currentGameMode.hide();
            this.node.gSlotDataStore.currentGameMode = name;
            this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];
            this.currentGameMode.enter(data, callback);
        }
    },
    resumeGameMode: function resumeGameMode(_ref2, callback) {
        var name = _ref2.name;

        if (this[name]) {
            this.node.gSlotDataStore.currentGameMode = name;
            this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];
            this.currentGameMode.show(callback);
        }
    },
    showCutscene: function showCutscene(name, content, callback) {
        this.cutscene.emit("PLAY_CUTSCENE", name, content, callback);
    },
    toggleModeTurbo: function toggleModeTurbo(isCheck) {
        this.onIngameEvent('TURBO_CLICK');
        this.node.gSlotDataStore.modeTurbo = isCheck;
    },
    setModeTurbo: function setModeTurbo() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.node.gSlotDataStore.modeTurbo = value;
    },
    updateBet: function updateBet(_ref3) {
        var _ref3$betId = _ref3.betId,
            betId = _ref3$betId === undefined ? this.node.config.DEFAULT_BET : _ref3$betId;

        this.bet.emit("UPDATE_BET", betId);
    },
    disableBet: function disableBet() {
        var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.isTutorialFinished() || forced) this.bet.emit("DISABLE_BET");
    },
    enableBet: function enableBet() {
        var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (this.isTutorialFinished() || forced) this.bet.emit("ENABLE_BET");
    },
    _stateUpdate: function _stateUpdate(script) {
        var _this16 = this;

        this.currentGameMode.stateUpdate(function () {
            _this16.executeNextScript(script);
        });
    },
    _stateResume: function _stateResume(script) {
        var _this17 = this;

        this.node.runAction(cc.sequence(cc.delayTime(this.resumeDelay), cc.callFunc(function () {
            _this17.currentGameMode.stateResume(function () {
                _this17.executeNextScript(script);
            });
        })));
    },
    haveMessageDialog: function haveMessageDialog() {
        return this.node && this.node.config && this.node.config.MESSAGE_DIALOG && this.node.config.MESSAGE_DIALOG.NAME;
    },
    isDisplayDialog: function isDisplayDialog() {
        var cutSceneMgr = this.cutscene.getComponent("CutsceneControl");
        return cutSceneMgr && cutSceneMgr.isDisplayDialog();
    },
    isDisplayCutscene: function isDisplayCutscene() {
        var cutSceneMgr = this.cutscene.getComponent("CutsceneControl");
        return cutSceneMgr && cutSceneMgr.isDisplayCutscene();
    },
    updateWallet: function updateWallet() {
        if (!this.logOutUser && !this.node.gSlotDataStore.isUpdateWinAmount) this.wallet.walletController.updateMoneyWallet();
    },
    onDestroy: function onDestroy() {
        this.stopPromotionAnim();
        if (cc.sys.isNative && typeof closeCreatorGame !== 'function') {
            cc.audioEngine.stopAll();
        }
        cc.game.off(cc.game.EVENT_HIDE, this.onEventHide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.onEventShow, this);
    },
    setTimeScale: function setTimeScale(scale) {
        cc.director.getScheduler().setTimeScale(scale);
    },
    switchMode: function switchMode() {
        if (!this.gameTrialSupport || !this.readyToPlay) return;

        if (!this.trialMode) {
            this.switchToTrialMode();
            this.hideCurrentPopups();
        } else {
            this.switchToRealMode();
        }
        this.bet.emit('SWITCH_MODE', this.trialMode);
    },
    isTrialMode: function isTrialMode() {
        return this.trialMode;
    },
    updateJackpot: function updateJackpot() {
        this.jackpot.emit("CHANGE_JACKPOT");
    },
    skipTutorialMode: function skipTutorialMode() {
        // support GD to review feature
        var useTutorialData = getUrlParam('useTutorialData') === 'true';
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC4 = loadConfigAsync.getConfig(),
            IS_PRODUCTION = _loadConfigAsync$getC4.IS_PRODUCTION;

        if (!IS_PRODUCTION && CC_DEBUG && useTutorialData) {
            return;
        }
        if (this.trialMode) {
            this.gameStateManager.skipTutorial();
        }
    },
    switchToTrialMode: function switchToTrialMode() {
        var _node$config = this.node.config,
            MAX_BET = _node$config.MAX_BET,
            DEFAULT_TRIAL_WALLET = _node$config.DEFAULT_TRIAL_WALLET;

        this.trialWalletAmount.active = true;
        this.realWalletAmount.active = false;

        this.trialMode = this.node.gSlotDataStore.isTrialMode = true;
        this.gameStateManager.switchToTrial();

        if (this.trialWalletAmount.controller && this.trialWalletAmount.controller.isInit === false) {
            this.trialWalletAmount.controller.setDefaultValue(DEFAULT_TRIAL_WALLET, MAX_BET);
        }
        if (this.trialWalletAmount.controller) {
            this.trialWalletAmount.controller.resetTrialValue();
            this.node.gSlotDataStore.trialWallet = this.trialWalletAmount.controller.lastValue;
        }

        this.normalGame.emit("SWITCH_TO_TRIAL");
        if (this.tutorialMgr) {
            this.tutorialMgr.node.active = true;
            this.tutorialMgr.startTutorial();
        }
        this.disableBet();
        this.trialButton.emit('SHOW_BLOCK_INPUTS', true);
        this.jackpot.opacity = 0;
        this.storeForCheckStatusTurbo = this.node.gSlotDataStore.modeTurbo;
        if (this.node.gSlotDataStore.modeTurbo) {
            this.turbo.emit('TURN_OFF');
        }
    },
    switchToRealMode: function switchToRealMode() {
        if (this.playingDemo) {
            this.showPopupRedirect();
            return;
        }
        this.trialMode = this.node.gSlotDataStore.isTrialMode = false;
        this.gameStateManager.switchToReal();
        this.normalGame.emit("SWITCH_TO_REAL");
        this.realWalletAmount.active = true;
        this.trialWalletAmount.active = false;
        if (this.tutorialMgr) {
            this.tutorialMgr.onTutorialFinish();
            this.tutorialMgr.playAnimSwitchToReal();
        }
        if (this.storeForCheckStatusTurbo) {
            this.turbo.emit('TURN_ON');
        } else {
            this.turbo.emit('TURN_OFF');
        }
        this.jackpot.opacity = 255;

        if (this.node.config.CAN_BACK_TO_REAL_MODE) {
            this.forceBackToRealMode();
        }
    },
    forceBackToRealMode: function forceBackToRealMode() {
        var _this18 = this;

        this.gameStateManager.cleanUpNetWork();
        var currentGameMode = this.node.gSlotDataStore.currentGameMode;

        this.node.gSlotDataStore.isAutoSpin = false;
        this.node.gSlotDataStore.spinTimes = 0;
        if (this.node.gSlotDataStore.playSession) {
            this.node.gSlotDataStore.playSession.freeGame = 0;
            this.node.gSlotDataStore.playSession.bonusGame = 0;
            this.node.gSlotDataStore.playSession.freeGameRemain = 0;
            this.node.gSlotDataStore.playSession.bonusGameRemain = 0;
        }
        var isResumeNormal = currentGameMode !== "normalGame";
        this.forceResetSoundNormalGame(isResumeNormal);
        if (isResumeNormal) {
            this.scheduleOnce(function () {
                _this18.resumeGameMode({ name: "normalGame" }, function () {});
            }, 1);
            if (this.bonusGame) {
                this.bonusGame.emit('FORCE_RESET_GAME_MODE', 'bonusGame');
            }
            if (this.freeGame) {
                this.freeGame.emit('FORCE_RESET_GAME_MODE', 'freeGame');
            }
        }
        if (this.normalGame) {
            this.normalGame.emit('FORCE_RESET_GAME_MODE', 'normalGame');
        }
        this.tutorialMgr && this.tutorialMgr.trigger("GAME_RESET_SESSION");
    },
    forceResetSoundNormalGame: function forceResetSoundNormalGame(isResumeNormal) {
        if (this.node.soundPlayer) {
            this.node.soundPlayer.stopAllEffects();
            if (isResumeNormal) {
                this.node.soundPlayer.playMainBGM();
            }
        }
    },
    showTrialButtons: function showTrialButtons(isOn) {
        if (this.trialButton) {
            this.trialButton.emit("ENABLE_BUTTONS", isOn);
        }
    },
    updateWalletOnTrialSpinClick: function updateWalletOnTrialSpinClick() {
        if (this.trialWalletAmount) {
            this.trialWalletAmount.controller.updateWalletOnTrialSpinClick();
            this.node.gSlotDataStore.trialWallet = this.trialWalletAmount.controller.lastValue;
        }
    },
    updateTrialWallet: function updateTrialWallet() {
        var winAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.trialWalletAmount) {
            this.trialWalletAmount.controller.updateTrialWallet(winAmount);
            this.node.gSlotDataStore.trialWallet = this.trialWalletAmount.controller.lastValue;
        }
    },
    updateJackpotHistoryBet: function updateJackpotHistoryBet(mBet) {
        if (this.jackpotHistory && this.jackpotHistory.getComponent('JackpotHistory')) {
            this.jackpotHistory.getComponent('JackpotHistory').setDynamicBet(mBet);
        }
    },
    isPauseTutorialFlag: function isPauseTutorialFlag(flag) {
        return this.isTutorialShowing() && this.tutorialMgr.isContainFlag(flag);
    },
    checkPauseTutorial: function checkPauseTutorial(flag) {
        // override this function to check condition
        return this.isPauseTutorialFlag(flag) && this.trialMode;
    },
    enableButtonControl: function enableButtonControl() {
        this.setting && this.setting.emit('ENABLE_BUTTONS');
        this.jackpotHistory && this.jackpotHistory.emit('ENABLE_BUTTONS');
        this.backToLobby && this.backToLobby.emit('ENABLE_BUTTONS');
        this.info && this.info.emit('ENABLE_BUTTONS');
        this.turbo && this.turbo.emit('ENABLE_BUTTONS');
    },
    disableButtonControl: function disableButtonControl() {
        this.setting && this.setting.emit('DISABLE_BUTTONS');
        this.jackpotHistory && this.jackpotHistory.emit('DISABLE_BUTTONS');
        this.backToLobby && this.backToLobby.emit('DISABLE_BUTTONS');
        this.info && this.info.emit('DISABLE_BUTTONS');
        this.turbo && this.turbo.emit('DISABLE_BUTTONS');
    },
    hideCurrentPopups: function hideCurrentPopups() {
        this.info && this.info.emit('HIDE_PANEL');
        this.setting && this.setting.emit('HIDE_PANEL');
        this.jackpotHistory && this.jackpotHistory.emit('HIDE_PANEL');

        this.setting && this.setting.emit('DISABLE_BUTTONS');
        this.jackpotHistory && this.jackpotHistory.emit('DISABLE_BUTTONS');
    },
    updateTrialBet: function updateTrialBet(betId) {
        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;

        if (!findKeyByValue(steps, betId)) {
            return;
        }
        this.trialWalletAmount.controller.updateBet(betId);
    },
    pauseJackpot: function pauseJackpot() {
        cc.log("jackpot paused");
        this.jackpot.emit("PAUSE_JACKPOT");
    },
    resumeJackpot: function resumeJackpot() {
        cc.log("jackpot resume");
        this.jackpot.emit("RESUME_JACKPOT");
    },
    onNetworkFailed: function onNetworkFailed(reason) {
        cc.log('onNetworkFailed');
        if (this.showMessageForceClose) return;

        var MESSAGE_DIALOG = this.node.config.MESSAGE_DIALOG;

        var message = MESSAGE_DIALOG.SYSTEM_ERROR;
        switch (reason) {
            case EventManager.CAN_NOT_CONNECT:
                message = MESSAGE_DIALOG.SYSTEM_ERROR;
                break;

            case EventManager.MISMATCH_DATA_VERSION:
                message = MESSAGE_DIALOG.MISMATCH_DATA;
                break;
            case EventManager.MISMATCH_COMMAND_ID:
                message = MESSAGE_DIALOG.MISMATCH_DATA;
                break;
            case EventManager.EXPECTED_EVENT_TIMEOUT:
                message = MESSAGE_DIALOG.SYSTEM_ERROR;
        }
        this.stopSpinCurrentMode();
        this.showPopupHandleOutGame(message, handleFlowOutGame);
        this.showMessageForceClose = true;
    },
    onNetworkError: function onNetworkError(code, metaData) {
        var _this19 = this;

        cc.log('onNetworkError');
        if (this.showMessageForceClose) return;
        var MESSAGE_DIALOG = this.node.config.MESSAGE_DIALOG;

        var message = MESSAGE_DIALOG.SYSTEM_ERROR;
        var interruptGame = false;
        var isPromotionError = false;

        switch (code) {
            case '0000':
                code = 1000;
                interruptGame = true;
                message = MESSAGE_DIALOG.SYSTEM_ERROR;
                break;

            case 'W2408':
            case 'W2500':
            case 'W29999':
            case 'W2008':
                message = MESSAGE_DIALOG.SYSTEM_ERROR;
                break;

            case '0001':
                message = MESSAGE_DIALOG.NO_MONEY;
                break;
            case '0007':
                message = MESSAGE_DIALOG.NO_PLAYSESSION;
                interruptGame = true;
                break;
            case '0029':
                message = MESSAGE_DIALOG.GROUP_MAINTAIN;
                interruptGame = true;
                break;
            case '0014':
                message = MESSAGE_DIALOG.NO_FREESPIN_OPTION;
                interruptGame = true;
                break;
            case PROMOTION_ERROR.WRONG_BET:
            case PROMOTION_ERROR.RESET:
            case PROMOTION_ERROR.NEW:
            case PROMOTION_ERROR.EXPIRED:
                isPromotionError = true;
                break;
            case '0026':
                message = MESSAGE_DIALOG.MISMATCH_DATA;
                interruptGame = true;
                break;
            case '0035':
                message = MESSAGE_DIALOG.EVENT_ENDED;
                interruptGame = true;
                break;
            case 'W2001':
            case 'W2004':
                message = MESSAGE_DIALOG.SPIN_UNSUCCESS;
                break;
            case 'W2006':
            case 'W2007':
                message = MESSAGE_DIALOG.ACCOUNT_BLOCKED;
                break;
        }

        message = message + ('\n(' + code + ')');

        if (isPromotionError) {
            this.handlePromotionError(metaData, code);
        } else if (interruptGame) {
            this.stopSpinCurrentMode();
            this.showPopupHandleOutGame(message, handleFlowOutGame);
            this.showMessageForceClose = true;
        } else {
            this.node.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
                _this19.showCutscene(MESSAGE_DIALOG.NAME, {
                    strText: message, actionBtnOK: function actionBtnOK() {}
                });
                _this19.stopSpinCurrentMode();
                _this19.showTrialButtons(true);
            })));
        }
    },
    handlePromotionError: function handlePromotionError() {
        var metaData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var MESSAGE_DIALOG = this.node.config.MESSAGE_DIALOG;

        var message = MESSAGE_DIALOG.SYSTEM_ERROR;
        var propertyPath = this.node.config.USE_SHORT_PARAM ? 'promotion' : 'fields.promotion.stringValue';
        var promotionString = lodash.get(metaData, propertyPath);
        switch (code) {
            case PROMOTION_ERROR.WRONG_BET:
            case PROMOTION_ERROR.RESET:
            case PROMOTION_ERROR.NEW:
                if (promotionString) {
                    var promotionData = promotionString.split(';');
                    var updatedData = {
                        betId: promotionData[0],
                        promotionRemain: promotionData[1],
                        promotionTotal: promotionData[2]
                    };
                    this.node.gSlotDataStore.promotionErrorCode = code;
                    this.stopSpinCurrentMode();
                    this.promotionUpdate(updatedData);
                }
                break;
            case PROMOTION_ERROR.EXPIRED:
                message = MESSAGE_DIALOG.PROMOTION_EXPIRED + ('\n(' + code + ')');
                this.node.gSlotDataStore.promotion = false;
                this.node.gSlotDataStore.promotionRemain = 0;
                this.node.gSlotDataStore.promotionTotal = 0;
                this.stopSpinCurrentMode();
                this.showCutscene(MESSAGE_DIALOG.NAME, {
                    strText: message, actionBtnOK: function actionBtnOK() {}
                });
                break;
        }
    },
    onNetworkDisconnect: function onNetworkDisconnect() {
        if (this.logOutUser || this.showMessageForceClose || this.networkWaiting) return;
        var DISCONNECT = this.node.config.MESSAGE_DIALOG.DISCONNECT;

        this.showPopupHandleOutGame(DISCONNECT, handleFlowOutGame);
        this.networkWaiting = true;
    },
    onNetworkResume: function onNetworkResume() {
        if (this.showMessageForceClose) return;
        if (this.networkWaiting) {
            var NAME = this.node.config.MESSAGE_DIALOG.NAME;

            this.cutscene.emit("CLOSE_CUTSCENE", NAME);
            this.networkWaiting = false;
        }
        if (this.isShowWaitingCutScene) {
            this.isShowWaitingCutScene = false;
            this.cutscene.emit("CLOSE_CUTSCENE", 'waitingScene');
        }
    },
    onShowPopupDisconnected: function onShowPopupDisconnected() {
        if (this.logOutUser || !this.joinGameSuccess || this.networkWaiting || !this.isTutorialFinished()) return;
        var MESSAGE_DIALOG = this.node.config.MESSAGE_DIALOG;

        this.networkWaiting = true;
        this.showPopupHandleOutGame(MESSAGE_DIALOG.NETWORK_DISCONNECT, handleFlowOutGame);
    },
    onNetworkWarning: function onNetworkWarning() {
        if (this.logOutUser || !this.joinGameSuccess || this.networkWaiting || !this.isTutorialFinished()) return;
        var MESSAGE_DIALOG = this.node.config.MESSAGE_DIALOG;

        cc.log('Show toast message disconnect');
        if (!this.showMessageForceClose && this.toastMessage) {
            this.toastMessage.showMessage(MESSAGE_DIALOG.NETWORK_WARNING);
        }
    },
    onNetworkConnected: function onNetworkConnected() {
        if (!this.joinGameSuccess) return;
        this.networkWarningTime = 0;
        if (!this.showMessageForceClose && this.networkWaiting) {
            var NAME = this.node.config.MESSAGE_DIALOG.NAME;

            this.cutscene.emit("CLOSE_CUTSCENE", NAME);
            this.cutscene.emit("CLOSE_ALL_NOTICES");
            this.networkWaiting = false;
        }
        if (this.isShowWaitingCutScene) {
            this.isShowWaitingCutScene = false;
            this.cutscene.emit("CLOSE_CUTSCENE", 'waitingScene');
        }
    },
    hideTutorial: function hideTutorial() {
        this.trialButton.emit('SHOW_BLOCK_INPUTS', false);
    },
    changeBetCallback: function changeBetCallback() {
        // TO DO
    },
    onDisable: function onDisable() {
        if (this.tweenDetectAFK) this.this.tweenDetectAFK.stop();
        this.tweenDetectAFK = null;
    },


    // parse ec="c:usd#l:vn" => extendCommonData { c: 'usd', l: 'vn' }
    parseExtendCommonData: function parseExtendCommonData(extendCommon) {
        var properties = extendCommon.split('#');
        var extendCommonData = {};
        properties.forEach(function (stringValue) {
            var property = stringValue.split(':');
            var key = property[0];
            var value = property[1];
            extendCommonData[key] = value;
        });
        return extendCommonData;
    },
    _updateCurrencyConfig: function _updateCurrencyConfig() {
        this.currencyCode = this._getCurrency();
        this.node.gSlotDataStore.currencyCode = this.currencyCode;

        if (this.currencyCode === this.defaultCurrency || !this.currencyCode) return;
        this._updateGameConfig();

        var currencyConfig = this.node.config.MONEY_FORMAT;
        updateUtilConfig('CURRENCY_CONFIG', currencyConfig);
    },
    _getCurrency: function _getCurrency() {
        this.defaultCurrency = this.node.config.DEFAULT_CURRENCY || 'VND';
        var serverCurrency = this.getServerCurrency();
        var clientCurrency = this.getClientCurrency();
        if (serverCurrency !== clientCurrency) return this.showCurrencyErrorPopup();
        return serverCurrency.toUpperCase();
    },
    getServerCurrency: function getServerCurrency() {
        return this.extendCommonData.c && this.extendCommonData.c.toUpperCase();
    },
    _updateGameConfig: function _updateGameConfig() {
        var CURRENCY_CONFIG = this.node.config.CURRENCY_CONFIG;

        if (!CURRENCY_CONFIG) return;
        var currencyConfig = CURRENCY_CONFIG[this.currencyCode.toUpperCase()];
        var updatedConfig = Object.assign(this.node.config, currencyConfig);
        this.node.config = updatedConfig;
    },
    showCurrencyErrorPopup: function showCurrencyErrorPopup() {
        var _this20 = this;

        this._isCurrencyError = true;
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC5 = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC5.LOGIN_IFRAME;

        if (LOGIN_IFRAME) {
            var _node$config$MESSAGE_3 = this.node.config.MESSAGE_DIALOG,
                NAME = _node$config$MESSAGE_3.NAME,
                CURRENCY_NOT_SUPPORTED = _node$config$MESSAGE_3.CURRENCY_NOT_SUPPORTED;

            var actionOK = function actionOK() {
                _this20._isCurrencyError = false;
                handleCloseGameIframe();
            };
            this.showMessageForceClose = true;
            this.showCutscene(NAME, {
                strText: CURRENCY_NOT_SUPPORTED, actionBtnOK: actionOK
            });
        };
    },
    getClientCurrency: function getClientCurrency() {
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC6 = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC6.LOGIN_IFRAME;

        if (!this.node.config.IS_SUPPORT_MULTI_CURRENCY) return '';
        var currencyCode = '';
        if (LOGIN_IFRAME) {
            currencyCode = getUrlParam('c') || this.defaultCurrency;
        } else {
            currencyCode = cc.sys.localStorage.getItem('c') || this.defaultCurrency;
        }
        return currencyCode.toUpperCase();
    },
    closePopups: function closePopups() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.usingPopups.forEach(function (popup) {
            popup && popup.emit("CLOSE_PANEL");
        });
    }
});

cc._RF.pop();