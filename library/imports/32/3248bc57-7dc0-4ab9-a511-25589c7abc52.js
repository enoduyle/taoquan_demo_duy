"use strict";
cc._RF.push(module, '3248bxXfcBKuaURJVicerxS', 'SlotGameDirector');
// cc-common/cc-slotbase-v2/slotGame/SlotGameDirector.js

'use strict';

/* global ingameDeposit */

var baseDirector = require('BaseDirectorV2');
var TurnBaseFSM = require('turnBaseFSM');
var lodash = require('lodash');

cc.Class({
    extends: baseDirector,

    properties: {
        winAmount: cc.Node,
        buttons: cc.Node,
        table: cc.Node,
        spinTimes: cc.Node,
        isAlwaysAutoSpin: false,
        autoSpin: {
            get: function get() {
                return this._autoSpin;
            },
            set: function set(value) {
                this._autoSpin = value;
            },


            visible: false
        },

        beginToExit: {
            get: function get() {
                return this._beginToExit;
            },
            set: function set(value) {
                this._beginToExit = value;
            },


            visible: false
        }
    },
    onExtendedLoad: function onExtendedLoad() {
        this.node.on("GAME_UPDATE", this.stateUpdate, this);
        this.node.on("GAME_RESUME", this.stateResume, this);
        this.node.on("GAME_ENTER", this.ready, this);
        this.node.on("GAME_INIT", this.init, this);
        this.node.on("SWITCH_TO_TRIAL", this.switchToTrial, this);
        this.node.on("SWITCH_TO_REAL", this.switchToReal, this);
        this.node.on("ENABLE_BUTTON_INTERACTION", this.enableButtonInteraction, this);
        this.node.on("SPIN_DISABLE", this.disableSpin, this);
        this.node.on("SPIN_ENABLE", this.enableSpin, this);
        this.node.on("RUN_CONTINUE_SCRIPT", this.runContinueScript, this);
        this.node.on("FORCE_TO_EXIT", this.forceToExit, this);
        this.node.on("UPDATE_TEXT_WIN", this.updateTextWin, this);
        this.node.on("TRIGGER_FREE_SPIN_OPTION", this.freeSpinOptionTrigger, this);
        this.node.on("FORCE_RESET_GAME_MODE", this.forceResetGameMode, this);
        this._resetStoreScript();
    },
    init: function init() {
        this.fsm = new TurnBaseFSM();
        this.fsm.GAME_MODE = this.node.name; // for debug state-machine
        this.writer = this.node.writer;

        if (!this.spinTimes) this.spinTimes = this.node;
        if (!this.winAmount) this.winAmount = this.node.mainDirector.gui.getWinAmount();

        if (!this.table) this.table = this.node;
        this.table.emit("INIT");

        if (!this.payline) this.payline = this.node;

        //We are ready
        this.runAction('GameStart');
        this.extendInit();

        this._autoSpin = false;
        this._beginToExit = false;
        this.isStopRunning = true;
    },
    extendInit: function extendInit() {
        //Add your overwrite code here!
    },
    enableButtonInteraction: function enableButtonInteraction() {
        if (!this.buttons) this.buttons = this.node;
        this.buttons.on("SPIN_CLICK", this.spinClick, this);
        this.buttons.on("SPACE_PRESSED", this.onSpacePressed, this);
        this.buttons.on("FAST_TO_RESULT_CLICK", this.fastToResultClick, this);
        this.buttons.on("MULTI_SPIN_1_CLICK", this.multiSpin1Click, this);
        this.buttons.on("MULTI_SPIN_2_CLICK", this.multiSpin2Click, this);
        this.buttons.on("MULTI_SPIN_3_CLICK", this.multiSpin3Click, this);
        this.buttons.on("MULTI_SPIN_4_CLICK", this.multiSpin4Click, this);
        this.buttons.on("STOP_AUTO_SPIN_CLICK", this.stopAutoSpinClick, this);
        this.buttons.on("CHECK_AUTO_SPIN_FLAG", this.checkAutoSpinFlag, this);
        this.buttons.on("ON_TOUCH_START", this.onTouchStartSpinButton, this);
        this.buttons.on("ON_TOUCH_CANCEL", this.onTouchCancelSpinButton, this);
    },
    onTouchStartSpinButton: function onTouchStartSpinButton() {
        this._showTrialButtons(null, false);
        this.node.mainDirector.disableBet();
        if (this._callBackEnableButtons) {
            this.unschedule(this._callBackEnableButtons);
        }
    },
    onTouchCancelSpinButton: function onTouchCancelSpinButton() {
        var _this = this;

        if (this._callBackEnableButtons) {
            this.unschedule(this._callBackEnableButtons);
        }
        this._callBackEnableButtons = function () {
            if (_this.node.gSlotDataStore.playSession.isFinished !== false && _this.isStopRunning) {
                _this.node.mainDirector.enableBet();
                _this._showTrialButtons(null, true);
            }
            _this._callBackEnableButtons = null;
        };
        this.scheduleOnce(this._callBackEnableButtons, 0.2);
    },
    stateUpdate: function stateUpdate(callback) {
        this.callbackStateUpdate = callback;
        this.runAction('ResultReceive');
    },
    stateResume: function stateResume() {
        this.fsm.gameResume();
        this.runAction('Resume');
    },
    switchToTrial: function switchToTrial() {
        var MAX_BET = this.node.config.MAX_BET;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        this._realBetData = Number(currentBetData);
        this.node.gSlotDataStore.slotBetDataStore.updateCurrentBet(MAX_BET);
        this.node.mainDirector.bet.emit("UPDATE_BET_VALUE", MAX_BET);

        this.runAction("SwitchMode");
    },
    switchToReal: function switchToReal() {
        this.node.gSlotDataStore.slotBetDataStore.updateCurrentBet(this._realBetData);
        this.node.mainDirector.bet.emit("UPDATE_BET_VALUE", this._realBetData);
        this.runAction("SwitchMode");
    },
    forceStopSpinning: function forceStopSpinning() {
        var _this2 = this;

        this.stopAutoSpinClick();

        var _node$gSlotDataStore = this.node.gSlotDataStore,
            promotion = _node$gSlotDataStore.promotion,
            promotionRemain = _node$gSlotDataStore.promotionRemain,
            promotionTotal = _node$gSlotDataStore.promotionTotal;

        if (promotionTotal && promotion && this.node.gSlotDataStore.currentGameMode == "normalGame") {
            var spinTimes = promotionTotal == promotionRemain ? Number(promotionTotal) : Number(promotionRemain || 0) + 1;
            this.spinTimes.emit("UPDATE_SPINTIMES", spinTimes);
            this.node.gSlotDataStore.promotionRemain = spinTimes;
        }
        this.node.gSlotDataStore.isUpdateWinAmount = false;

        if (this._callBackAutoSpin) {
            this.unschedule(this._callBackAutoSpin);
        }
        this.resetPlaysessionDataLastSpin();
        this.table.emit('STOP_REEL_WITH_RANDOM_MATRIX', function () {
            _this2.isStopRunning = true;
        });
        this.fsm.resultReceive();
        this.fastToResultClick();
        this.runAction('GameFinish');
        this.scheduleOnce(function () {
            _this2._gameRestart();
        }, this.node.config.DELAY_FORCE_STOP_SPINNING ? this.node.config.DELAY_FORCE_STOP_SPINNING : 0.6);
    },
    resetPlaysessionDataLastSpin: function resetPlaysessionDataLastSpin() {
        // Reset data last spin here
        if (!this.node.gSlotDataStore.playSession) return;
        if (this.node.gSlotDataStore.playSession.winAmount) {
            this.node.gSlotDataStore.playSession.winAmount = 0;
        }
        if (this.node.gSlotDataStore.playSession.winAmountPS) {
            this.node.gSlotDataStore.playSession.winAmountPS = 0;
        }
    },
    forceSpinning: function forceSpinning() {
        this.fsm.actionTrigger();
        this.node.mainDirector.disableBet();
        this.table.emit('START_SPINNING');
    },
    _updateJackpot: function _updateJackpot(script) {
        this.node.mainDirector.updateJackpot();
        this.executeNextScript(script);
    },

    //This to ensure next script was tirgger after game mode state update
    runCallbackStateUpdate: function runCallbackStateUpdate() {
        if (this.callbackStateUpdate && typeof this.callbackStateUpdate == "function") {
            this.callbackStateUpdate();
            this.callbackStateUpdate = null;
        }
    },
    ready: function ready(matrix) {
        if (matrix) {
            this.table.emit("CHANGE_MATRIX", { matrix: matrix });
            this.table.emit("CLEAR_PAYLINES");
        }
        // this.runAction('GameStart');
        //NEED TO CHECK WHEN RESUME??? OR RENAME IT TO INIT SETUP
        this.buttons.emit('SPIN_SHOW');
        this.buttons.emit('SPIN_ENABLE');
        this.buttons.emit('STOP_AUTO_SPIN_HIDE');

        //Turn on when enter
        if (this.isAlwaysAutoSpin) {
            this.runAction('SpinByTimes', 999999);
        } else {
            this.buttons.emit('FAST_TO_RESULT_HIDE');
        }
        this.node.mainDirector.onIngameEvent("ENTER_GAME_MODE");
    },
    checkStatusRunning: function checkStatusRunning() {
        return this.isStopRunning;
    },


    //Binding methods that called from controller
    stopAutoSpinClick: function stopAutoSpinClick() {
        this.buttons.emit('STOP_AUTO_SPIN_HIDE');
        this.runAction('DisableAutoSpin');
        this._autoSpin = false;
        this.spinTimes.emit("RESET_SPINTIMES");
        if (this._callBackAutoSpin) {
            this.unschedule(this._callBackAutoSpin);
            var isFinished = this.node.gSlotDataStore.playSession.isFinished;

            if (isFinished === undefined || isFinished === true) {
                this._resetSpinButton();
                this._showTrialButtons(null, true);
                this.node.mainDirector.enableBet();
            }
        }
    },
    onSpacePressed: function onSpacePressed() {
        if (!this.node.mainDirector.isDisplayDialog() && !this.node.mainDirector.isDisplayCutscene()) this.spinClick();
    },
    spinClick: function spinClick() {
        if (!this.node || !this.node.director || !this.node.director.fsm || !this.node.director.fsm.can('actionTrigger') || !this.node.mainDirector.readyToPlay) return;
        this.skipAllEffects();
        this.node.mainDirector.gui.emit("HIDE_INTRO");
        this.table.emit("HIDE_ANIM_INTRO");
        this.runAction('SpinClick');
    },
    fastToResultClick: function fastToResultClick() {
        if (!this.node.active || this.node.opacity == 0) return;
        this.setGameSpeedMode("INSTANTLY");
        this.table.emit("FAST_TO_RESULT");
    },
    multiSpin1Click: function multiSpin1Click() {
        this.node.mainDirector && this.node.mainDirector.onIngameEvent("AUTO_SPIN_CLICK");
        this.runAction('SpinByTimes', 10);
        this._autoSpin = true;
    },
    multiSpin2Click: function multiSpin2Click() {
        this.node.mainDirector && this.node.mainDirector.onIngameEvent("AUTO_SPIN_CLICK");
        this.runAction('SpinByTimes', 25);
        this._autoSpin = true;
    },
    multiSpin3Click: function multiSpin3Click() {
        this.node.mainDirector && this.node.mainDirector.onIngameEvent("AUTO_SPIN_CLICK");
        this.runAction('SpinByTimes', 50);
        this._autoSpin = true;
    },
    multiSpin4Click: function multiSpin4Click() {
        this.node.mainDirector.showTrialButtons(false);
        this.node.mainDirector && this.node.mainDirector.onIngameEvent("AUTO_SPIN_CLICK");
        this.runAction('SpinByTimes', 999999);
        this._autoSpin = true;
    },
    forceToExit: function forceToExit(script) {
        this._super(script);
        this.fsm.actionTrigger();
        this.fsm.resultReceive();
    },
    updateTextWin: function updateTextWin(isWin) {
        if (this.winAmount) {
            if (isWin) this.winAmount.getComponent('WinAmount').updateBgToWin();else this.winAmount.getComponent('WinAmount').updateBgToLastWin();
        }
    },
    runPromotionSpin: function runPromotionSpin() {
        var _node$gSlotDataStore2 = this.node.gSlotDataStore,
            promotionBetId = _node$gSlotDataStore2.promotionBetId,
            promotionRemain = _node$gSlotDataStore2.promotionRemain;

        this.buttons.emit('SHOW_ALL_PROMOTION_BUTTONS');
        this.spinTimes.emit("UPDATE_SPINTIMES", promotionRemain);
        this.spinTimes.opacity = 0;
        this.isRunPromotion = true;

        // set Bet id with promotionBetId
        this.runAction('SetUpBet', this.getTotalBetValue(promotionBetId));
    },
    _updatePromotionRemain: function _updatePromotionRemain(script, number) {
        this.node.gSlotDataStore.promotionRemain = number;
        this.buttons.emit('PROMOTION_STOP_SPIN_SHOW');
        this.buttons.emit('PROMOTION_SPIN_HIDE');
        this.buttons.emit('HIDE_PROMOTION_SPIN_EFFECT');
        this.executeNextScript(script);
    },
    _resetPromotionButtons: function _resetPromotionButtons(script) {
        this.buttons.emit('PROMOTION_SPIN_SHOW');
        this.buttons.emit('PROMOTION_STOP_SPIN_HIDE');
        this.buttons.emit('SHOW_PROMOTION_SPIN_EFFECT', 2);
        this.executeNextScript(script);
    },
    updatePromotionData: function updatePromotionData(data) {
        var betId = data.betId,
            promotionRemain = data.promotionRemain,
            promotionTotal = data.promotionTotal;

        this.node.gSlotDataStore.promotion = true;
        this.node.gSlotDataStore.promotionRemain = promotionRemain;
        this.node.gSlotDataStore.promotionBetId = betId;
        this.node.gSlotDataStore.promotionTotal = promotionTotal;
    },
    getTotalBetValue: function getTotalBetValue(betId) {
        var DEFAULT_BET = this.node.config.DEFAULT_BET;
        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;

        var betValue = String(betId).split('');
        return steps[betValue[0]] || DEFAULT_BET;
    },
    _exitPromotionMode: function _exitPromotionMode(script) {
        if (this.isRunPromotion) {
            this.isRunPromotion = false;
            this.buttons.emit('HIDE_ALL_PROMOTION_BUTTONS');
            this.spinTimes.emit("RESET_SPINTIMES");
            this.node.gSlotDataStore.promotion = false;
            this.spinTimes.opacity = 255;
            this.executeNextScript(script);
        } else {
            this.executeNextScript(script);
        }
    },
    _showPromotionPopup: function _showPromotionPopup(script) {
        this.node.mainDirector.showPromotionPopup();
        this.executeNextScript(script);
    },
    _showCurrencyErrorPopup: function _showCurrencyErrorPopup(script) {
        this.node.mainDirector.showCurrencyErrorPopup();
        this.executeNextScript(script);
    },


    //Send data to network
    _sendSpinToNetwork: function _sendSpinToNetwork(script, _ref) {
        var currentBetData = _ref.currentBetData;

        this.node.mainDirector.sendSpinToNetwork(currentBetData);
        this.node.mainDirector.gui.emit("HIDE_INTRO");
        this.table.emit("HIDE_ANIM_INTRO");
        this.executeNextScript(script);
    },


    //Trigger other mode
    _newGameMode: function _newGameMode(script, _ref2) {
        var _this3 = this;

        var name = _ref2.name,
            data = _ref2.data;

        this.resetGameSpeed();
        if (this.node.mainDirector) {
            this.node.mainDirector.newGameMode({ name: name, data: data }, function () {
                _this3.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to new game mode');
            this.executeNextScript(script);
        }
    },
    _resumeGameMode: function _resumeGameMode(script, _ref3) {
        var _this4 = this;

        var name = _ref3.name,
            data = _ref3.data;

        this.resetGameSpeed();
        if (!this.hasTable) {
            this.hasTable = true;
        }
        if (this.node.mainDirector) {
            this.node.mainDirector.resumeGameMode({ name: name, data: data }, function () {
                _this4.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to resume game mode');
            this.executeNextScript(script);
        }

        if (!this._autoSpin) {
            this.buttons.emit('SPIN_SHOW');
            this.buttons.emit('SPIN_ENABLE');
            this.buttons.emit('FAST_TO_RESULT_HIDE');
            this.buttons.emit('STOP_AUTO_SPIN_HIDE', true);
        }
    },


    //Game flow methods
    _gameStart: function _gameStart(script) {
        if (!this.fsm.can('gameStart')) return;
        this.fsm.gameStart();
        this.hasTable = false;
        this.hasPayline = false;
        if (this.table && this.table.active === true) {
            this.hasTable = true;
        }
        if (this.table && this.table.hasPayline === true) {
            this.hasPayline = true;
        }
        this.executeNextScript(script);
    },
    _gameFinish: function _gameFinish(script) {
        //Finish will show big win animation
        this.node.mainDirector.onIngameEvent("GAME_RESET_SESSION");
        this.node.gSlotDataStore.timerAFK = 0;
        this.runAction('GameFinish');
        this.executeNextScript(script);
    },
    _gameEnd: function _gameEnd(script) {
        this.runAction('GameEnd');
        this.executeNextScript(script);
    },
    _gameRestart: function _gameRestart(script) {
        var isSkip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.node.gSlotDataStore.currentGameMode == 'normalGame') {
            this.node.mainDirector.onIngameEvent("NORMAL_GAME_RESTART");
        }
        if (!this.fsm.can('gameRestart')) return;
        this.fsm.gameRestart();
        if (!this.node.gSlotDataStore.isAutoSpin) {
            this.buttons.emit('SPIN_SHOW');
            this.buttons.emit('SPIN_ENABLE');
        }

        if (!this.isAlwaysAutoSpin) {
            this.buttons.emit('FAST_TO_RESULT_HIDE');
        }
        this.runAction('GameRestart');
        var GAME_SPEED = this.node.config.GAME_SPEED;

        var isF2R = GAME_SPEED && this.node.gSlotDataStore.gameSpeed === GAME_SPEED.INSTANTLY;
        if (!isSkip && !isF2R) {
            this.resetGameSpeed();
        }

        this.executeNextScript(script);
    },
    _gameExit: function _gameExit(script) {
        var _this5 = this;

        if (!this.fsm.can('gameRestart')) return;
        this.fsm.gameRestart();
        this.buttons.emit('SPIN_SHOW');
        this.buttons.emit('SPIN_ENABLE');

        if (this.forceToExitMode) {
            this.node.gSlotDataStore.playSession.freeGameRemain = 0;
            this.node.gSlotDataStore.playSession.bonusGameRemain = 0;
            this.node.gSlotDataStore.lastEvent = {};
            this.node.gSlotDataStore.isAutoSpin = false;
            this.forceToExitMode = false;
        }

        //Turn off before swicth mode, because 2 mode use same code, hehe
        if (this.isAlwaysAutoSpin) {
            this.runAction('DisableAutoSpin');
        } else {
            this.buttons.emit('FAST_TO_RESULT_HIDE');
        }

        this.table.emit("GAME_EXIT");

        this.node.exit(function () {
            _this5.executeNextScript(script);
        });
        this._beginToExit = false;
    },


    //Update game settings
    _setTurboMode: function _setTurboMode() {
        if (this.node.gSlotDataStore.modeTurbo) {
            this._setMode('TURBO');
        } else {
            this._setMode('FAST');
        }
    },
    _setMode: function _setMode(mode) {
        this.table.emit("SET_MODE", mode);
    },
    _updateMatrix: function _updateMatrix(script, _ref4) {
        var matrix = _ref4.matrix,
            rowOffset = _ref4.rowOffset;

        this.table.emit("CHANGE_MATRIX", { matrix: matrix, rowOffset: rowOffset });
        this.executeNextScript(script);
    },
    _resumeSpinTime: function _resumeSpinTime(script, spinTimes) {
        if (this._autoSpin == true) {
            this.node.gSlotDataStore.isAutoSpin = true;
            this.node.gSlotDataStore.spinTimes = spinTimes;
        }
        this.executeNextScript(script);
    },
    _updateSpinTimes: function _updateSpinTimes(script, spinTimes) {
        this.spinTimes.emit("UPDATE_SPINTIMES", spinTimes);
        this.executeNextScript(script);
    },
    _updateLastWin: function _updateLastWin(script, data) {
        if (data) {
            this.winAmount.emit("CHANGE_TO_LAST_WIN");
        } else {
            this.winAmount.emit("CHANGE_TO_WIN");
        }
        this.executeNextScript(script);
    },
    _updateWinningAmount: function _updateWinningAmount(script, _ref5) {
        var winAmount = _ref5.winAmount,
            time = _ref5.time;

        this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
        this.executeNextScript(script);
    },


    //TODO remove it
    _addWinningAmount: function _addWinningAmount(script, _ref6) {
        var winAmount = _ref6.winAmount,
            time = _ref6.time;

        this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
        this.executeNextScript(script);
    },

    //Only when resume
    _updateBet: function _updateBet(script, betValue) {
        if (this.node.mainDirector) {
            this.node.mainDirector.updateBet({ betId: betValue });
        } else {
            cc.error('There is no main Director to update bet');
        }
        this.executeNextScript(script);
    },


    //NORMAL SPIN FLOW
    _runAutoSpin: function _runAutoSpin(script) {
        var _this6 = this;

        if (!this.isAlwaysAutoSpin /*normal*/ && this.node.gSlotDataStore.isAutoSpin) {
            this.buttons.emit('STOP_AUTO_SPIN_SHOW');
        }
        this.node.mainDirector.gui.emit("HIDE_INTRO");
        this.table.emit("HIDE_ANIM_INTRO");
        this.skipAllEffects();
        this.buttons.emit('SPIN_DISABLE');
        this._showTrialButtons(null, false);
        this._callBackAutoSpin = function () {
            _this6.runAction('SpinClick');
            _this6.executeNextScript(script);
            _this6._callBackAutoSpin = null;
        };
        this.scheduleOnce(this._callBackAutoSpin, 0.5);
    },
    _spinClick: function _spinClick(script) {
        if (!this.fsm.can('actionTrigger')) return;
        this.fsm.actionTrigger();
        this._setTurboMode();
        this.resetGameSpeed();
        this._showTrialButtons(null, false);
        this.buttons.emit('SPIN_DISABLE');
        this.buttons.emit('SPIN_HIDE');
        this.buttons.emit('FAST_TO_RESULT_DISABLE');
        this.buttons.emit('DISABLE_PROMOTION_STOP_SPIN');
        this.buttons.emit('FAST_TO_RESULT_SHOW');

        if (!this.hasTable) {
            this.executeNextScript(script);
            return;
        }
        this.isStopRunning = false;
        this.table.emit("START_SPINNING");
        this.node.mainDirector.onIngameEvent("SPIN_CLICK");
        this.executeNextScript(script);
    },
    _resultReceive: function _resultReceive(script, data) {
        var _this7 = this;

        if (!this.fsm.can('resultReceive')) return;
        this.fsm.resultReceive();
        this.buttons.emit('FAST_TO_RESULT_ENABLE');
        this.buttons.emit('ENABLE_PROMOTION_STOP_SPIN');
        if (this.node.mainDirector.trialMode && this.node.gSlotDataStore.currentGameMode !== "normalGame") {
            this._showTrialButtons(null, true);
        }
        //Check if we have table to show or not.... or should we use base interface????
        //Anyways,... I can decoupling table from game mode, thats good enough for v2
        if (!this.hasTable) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("STOP_SPINNING", data, function () {
            _this7.node.mainDirector.onIngameEvent("SPIN_STOPPED");
            _this7.isStopRunning = true;
            _this7.executeNextScript(script);
        });
    },
    _showResult: function _showResult(script) {
        var isFTR = this.node.gSlotDataStore.gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        if (isFTR) this.node.mainDirector.countingFastToResult();
        this.runAction('ShowResults');
        this.executeNextScript(script);
    },
    _triggerWinEffect: function _triggerWinEffect(script) {
        this.executeNextScript(script);
    },
    _triggerSmallWinEffect: function _triggerSmallWinEffect(script) {
        this.executeNextScript(script);
    },


    //PAYLINES
    _setUpPaylines: function _setUpPaylines(script, _ref7) {
        var matrix = _ref7.matrix,
            payLines = _ref7.payLines;

        this.hasPayline = true;
        this.table.emit("SETUP_PAYLINES", matrix, payLines);
        this.executeNextScript(script);
    },
    _showNormalSymbolPayLine: function _showNormalSymbolPayLine(script, payLines) {
        var _this8 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {
            _this8.table.emit("SHOW_ALL_NORMAL_PAYLINES", payLines);
            _this8.executeNextScript(script);
        });
    },
    _showNormalPayline: function _showNormalPayline(script) {
        var _this9 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_ALL_NORMAL_PAYLINES", function () {
            _this9.executeNextScript(script);
        });
    },
    _showFreePayline: function _showFreePayline(script) {
        var _this10 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_ALL_FREE_PAYLINES", function () {
            _this10.executeNextScript(script);
        });
    },
    _blinkAllPaylines: function _blinkAllPaylines(script) {
        var _this11 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("BLINK_ALL_NORMAL_PAYLINES", function () {
            _this11.executeNextScript(script);
        });
    },
    _blinkAllPaylines_2: function _blinkAllPaylines_2(script) {
        this.executeNextScript(script);
    },
    _showBonusPayLine: function _showBonusPayLine(script) {
        var _this12 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_BONUS_PAYLINE", function () {
            _this12.node.mainDirector.onIngameEvent("ON_FINISH_BONUS_PAYLINE");
            _this12.executeNextScript(script);
        });
    },
    _showScatterPayLine: function _showScatterPayLine(script) {
        var _this13 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_SCATTER_PAYLINE", function () {
            _this13.node.mainDirector.onIngameEvent("ON_FINISH_SCATTER_PAYLINE");
            _this13.executeNextScript(script);
        });
    },
    _showJackpotPayLine: function _showJackpotPayLine(script) {
        var _this14 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_JACKPOT_PAYLINE", function () {
            _this14.node.mainDirector.onIngameEvent("ON_FINISH_JACKPOT_PAYLINE");
            _this14.executeNextScript(script);
        });
    },
    _showWildPayLine: function _showWildPayLine(script) {
        var _this15 = this;

        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.table.emit("SHOW_WILD_PAYLINE", function () {
            _this15.executeNextScript(script);
        });
    },
    _clearPaylines: function _clearPaylines(script) {
        if (!this.hasPayline) {
            this.executeNextScript(script);
            return;
        }
        this.hasPayline = false;
        this.table.emit("CLEAR_PAYLINES");
        this.executeNextScript(script);
    },
    _forceToClearPaylines: function _forceToClearPaylines(script) {
        this.table.emit("CLEAR_PAYLINES");
        this.hasPayline = false;
        this.executeNextScript(script);
    },
    _delayTimeScript: function _delayTimeScript(script, time) {
        var _this16 = this;

        if (this.node.mainDirector.node) {
            this.node.mainDirector.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
                _this16.executeNextScript(script);
            })));
        } else {
            this.executeNextScript(script);
        }
    },
    _showJackpotCutscene: function _showJackpotCutscene(script, _ref8) {
        var _this17 = this;

        var name = _ref8.name,
            content = _ref8.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this17.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },


    //Cutscenes
    _showCutscene: function _showCutscene(script, _ref9) {
        var _this18 = this;

        var name = _ref9.name,
            content = _ref9.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this18.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _showCutscene_2: function _showCutscene_2(script) {
        this.executeNextScript(script);
    },
    _showUnskippedCutscene: function _showUnskippedCutscene(script, _ref10) {
        var _this19 = this;

        var name = _ref10.name,
            content = _ref10.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this19.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _hideCutscene: function _hideCutscene(script, _ref11) {
        var name = _ref11.name;

        if (this.node.mainDirector) {
            this.node.mainDirector.cutscene.emit("CLOSE_CUTSCENE", name);
        } else {
            cc.error('There is no main Director to play cutscenes');
        }
    },
    _openInfo: function _openInfo(script, _ref12) {
        var _this20 = this;

        var name = _ref12.name,
            content = _ref12.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this20.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _openInfo_2: function _openInfo_2(script, _ref13) {
        var _this21 = this;

        var name = _ref13.name,
            content = _ref13.content;

        if (this.node.mainDirector) {
            var _content = Object.assign({}, content);
            _content.instantly = true;
            this.node.mainDirector.showCutscene(name, _content, function () {
                _this21.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _clearWinAmount: function _clearWinAmount(script) {
        this.winAmount.emit("RESET_NUMBER");
        this.executeNextScript(script);
    },
    update: function update() {
        if (!this.node.mainDirector || !this.node.mainDirector.gameStateManager) return;

        var wallet = this.node.mainDirector.gameStateManager.getCurrentWallet();
        if (!lodash.isNumber(wallet) || lodash.isNaN(wallet)) return;

        if (this.node.director.fsm.can('actionTrigger') && this.node.mainDirector.joinGameSuccess) {
            this.runAction('UpdateWalletData', wallet);
        }
    },
    _updateWallet: function _updateWallet(script) {
        if (this.node.mainDirector) {
            this.node.mainDirector.updateWallet();
            this.executeNextScript(script);
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _updateWalletOnTrialSpinClick: function _updateWalletOnTrialSpinClick(script) {
        if (this.node.mainDirector) {
            this.node.mainDirector.updateWalletOnTrialSpinClick();
            this.executeNextScript(script);
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _updateTrialWallet: function _updateTrialWallet(script, data) {
        if (this.node.mainDirector) {
            this.node.mainDirector.updateTrialWallet(data);
            this.executeNextScript(script);
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },
    _showTrialButtons: function _showTrialButtons(script, isOn) {
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;
        var isNormalGame = this.node.gSlotDataStore.currentGameMode === "normalGame";
        if (this.node.mainDirector) {
            var trialMode = this.node.mainDirector.trialMode;

            if (trialMode && !isNormalGame && !this.forceToExitMode) {
                this.node.mainDirector.showTrialButtons(isOn);
            } else {
                var turnOn = isOn && !isAutoSpin && this.isStopRunning;
                this.node.mainDirector.showTrialButtons(turnOn);
            }
        }
        if (this.node.mainDirector.trialMode && this.node.config.CAN_BACK_TO_REAL_MODE) {
            this.node.mainDirector.showTrialButtons(true);
        }
        this.executeNextScript(script);
    },
    _showMessageNoMoney: function _showMessageNoMoney(script, data) {
        if (this.node.mainDirector.isUserLogout()) return;
        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

        var _node$config$MESSAGE_ = this.node.config.MESSAGE_DIALOG,
            NO_MONEY = _node$config$MESSAGE_.NO_MONEY,
            DEPOSIT_MONEY = _node$config$MESSAGE_.DEPOSIT_MONEY;


        var message = {
            name: "DialogMessage"
        };

        if (LOGIN_IFRAME && typeof ingameDeposit === 'function') {
            message.content = { strText: DEPOSIT_MONEY, actionBtnOK: function actionBtnOK() {
                    ingameDeposit();
                }, actionCancel: function actionCancel() {} };
            cc.log("Show Deposit");
        } else {
            message.content = { strText: NO_MONEY, actionBtnOK: function actionBtnOK() {
                    data && data.callback && data.callback();
                } };
            cc.log("Show No Money");
        }
        this._showCutscene(script, message);
    },
    _resetSpinButton: function _resetSpinButton(script) {
        this.buttons.emit('SPIN_SHOW');
        this.buttons.emit('SPIN_ENABLE');
        this.buttons.emit('STOP_AUTO_SPIN_HIDE');
        this.buttons.emit('FAST_TO_RESULT_HIDE');
        var promotion = this.node.gSlotDataStore.promotion;

        if (!promotion) {
            this.spinTimes.emit("RESET_SPINTIMES");
        }
        this._autoSpin = false;
        this.executeNextScript(script);
    },
    disableSpin: function disableSpin() {
        this.buttons.emit("SPIN_DISABLE");
    },
    enableSpin: function enableSpin() {
        this.buttons.emit("SPIN_ENABLE");
    },
    runContinueScript: function runContinueScript() {
        var _storeNextScripts = this.storeNextScripts,
            data = _storeNextScripts.data,
            script = _storeNextScripts.script;

        this[this.storeCurrentScripts] && this[this.storeCurrentScripts](script, data);
        this._resetStoreScript();
    },
    _resetStoreScript: function _resetStoreScript() {
        this.storeCurrentScripts = '';
        this.storeNextScripts = {
            script: [],
            data: {}
        };
    },
    _checkPauseTutorial: function _checkPauseTutorial(flag) {
        var mainDirector = this.node.mainDirector;

        return mainDirector && mainDirector.checkPauseTutorial(flag);
    },
    checkAutoSpinFlag: function checkAutoSpinFlag(flag) {
        var isPauseAutoSpin = this._checkPauseTutorial(flag);
        this.buttons.emit('PAUSE_AUTO_SPIN', isPauseAutoSpin);
    },
    _pauseUpdateJP: function _pauseUpdateJP(script) {
        this.node.mainDirector.pauseJackpot();
        this.executeNextScript(script);
    },
    _resumeUpdateJP: function _resumeUpdateJP(script) {
        this.node.mainDirector.resumeJackpot();
        this.executeNextScript(script);
    },
    _disableBet: function _disableBet(script) {
        this.node.mainDirector.disableBet();
        this.executeNextScript(script);
    },
    _enableBet: function _enableBet(script) {
        this.node.mainDirector.enableBet();
        this.executeNextScript(script);
    },
    _stopAutoSpin: function _stopAutoSpin(script) {
        this.stopAutoSpinClick();
        this.executeNextScript(script);
    },
    _enableSkipTutorial: function _enableSkipTutorial(script, isOn) {
        if (this.node.mainDirector.isTutorialShowing()) {
            this.node.mainDirector.tutorialMgr.enableSkipBtn(isOn);
        }
        this.executeNextScript(script);
    },
    _sendFreeSpinToNetwork: function _sendFreeSpinToNetwork(script) {
        this.node.mainDirector.gameStateManager.triggerFreeSpinRequest();
        this.executeNextScript(script);
    },
    freeSpinOptionTrigger: function freeSpinOptionTrigger(optionIndex) {
        if (this.node.mainDirector) {
            this.node.mainDirector.gameStateManager.triggerFreeSpinOption(optionIndex);
            this.fsm.gameRestart();
            this.hasTable = false;
            this.fsm.actionTrigger();
        }
    },
    skipAllEffects: function skipAllEffects() {
        if (this.node.mainDirector) {
            this.node.mainDirector.cutscene.emit("SKIP_CUTSCENES");
        } else {
            cc.error('There is no main Director to skip cutscenes');
        }
    },
    _updateWinningAmountSync: function _updateWinningAmountSync(script, _ref14) {
        var _this22 = this;

        var winAmount = _ref14.winAmount,
            time = _ref14.time,
            rate = _ref14.rate,
            isSessionEnded = _ref14.isSessionEnded;
        var _node$gSlotDataStore3 = this.node.gSlotDataStore,
            isAutoSpin = _node$gSlotDataStore3.isAutoSpin,
            gameSpeed = _node$gSlotDataStore3.gameSpeed;

        var isFTR = gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        var timeShow = isFTR ? 20 : time;
        this._canFastUpdateWinAmount = true;
        this._winValue = winAmount;
        var runScript = false;
        if (!isFTR) {
            this.playSoundWin(rate);
        }
        this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: timeShow }, function () {
            _this22._canFastUpdateWinAmount = false;
            _this22._winValue = 0;
            _this22.stopSoundWin();
            (!isSessionEnded || !runScript) && _this22.executeNextScript(script);
        });
        if (isSessionEnded && !isAutoSpin) {
            runScript = true;
            this.executeNextScript(script);
        }
    },
    playSoundWin: function playSoundWin() {
        /**@override to play sound */
        // if (this.node.soundPlayer) this.node.soundPlayer.playSoundWinLine(rate);
    },
    stopSoundWin: function stopSoundWin() {
        /**@override to stop sound */
        // if (this.node.soundPlayer) this.node.soundPlayer.stopSoundWinLine();
    },
    _showAnimIntro: function _showAnimIntro(script) {
        this.showAnimIntro();
        this.executeNextScript(script);
    },
    _hideAnimIntro: function _hideAnimIntro(script) {
        this.hideAnimIntro();
        this.executeNextScript(script);
    },
    showAnimIntro: function showAnimIntro() {
        this.table.emit("SHOW_ANIM_INTRO");
    },
    hideAnimIntro: function hideAnimIntro() {
        this.node.mainDirector.gui.emit("HIDE_INTRO");
        this.table.emit("HIDE_ANIM_INTRO");
    },


    // handle back to real mode or force reset game mode
    forceResetGameMode: function forceResetGameMode(gameMode) {
        this.isSkipAllScrips = true;

        this.forceStopAutoSpining();
        this.forceResetTable();

        if (gameMode === 'bonusGame') {
            this.forceResetBonusGame();
        }
        if (gameMode === 'freeGame') {
            this.forceResetFreeGame();
        }
        if (gameMode === 'normalGame') {
            this.forceResetNormalGame();
        }
        this.forceResetExtend();
        this.forceResetEffect();
    },
    forceStopAutoSpining: function forceStopAutoSpining() {
        if (this.buttons) this.buttons.emit('STOP_AUTO_SPIN_HIDE');
        if (this.spinTimes) this.spinTimes.emit("RESET_SPINTIMES");
        this._autoSpin = false;
        if (this._callBackAutoSpin) {
            this.unschedule(this._callBackAutoSpin);
        }
    },
    forceResetTable: function forceResetTable() {
        var _this23 = this;

        if (!this.table) return;
        if (!this.isStopRunning) {
            this.table.emit('STOP_REEL_WITH_RANDOM_MATRIX', function () {
                _this23.isStopRunning = true;
            });
        }
        this.table.emit('FORCE_RESET_TABLE_EFFECT');
        this.fsm.resultReceive();
        this.fastToResultClick();
    },
    forceResetNormalGame: function forceResetNormalGame() {
        var _this24 = this;

        this.scheduleOnce(function () {
            _this24.fsm.reboot();
            _this24.fsm.gameStart();
            _this24.isSkipAllScrips = false;
            _this24._resetSpinButton();
            _this24._showTrialButtons(null, true);
            _this24.node.mainDirector.enableBet();
        }, 1);
    },
    forceResetFreeGame: function forceResetFreeGame() {
        var _this25 = this;

        this.node.resetCallbackWhenHide();
        this.scheduleOnce(function () {
            _this25.isSkipAllScrips = false;
            _this25.table.emit("GAME_EXIT");
            _this25.fsm.reboot();
            _this25.fsm.gameStart();
            _this25.node.exit(function () {});
        }, 1);
    },
    forceResetBonusGame: function forceResetBonusGame() {
        var _this26 = this;

        this.node.resetCallbackWhenHide();
        this.scheduleOnce(function () {
            _this26.fsm.reboot();
            _this26.fsm.gameStart();
            _this26.isSkipAllScrips = false;
            _this26.node.exit(function () {});
        }, 1);
    },
    forceResetExtend: function forceResetExtend() {
        // reset topup, gamble, etc...
    },
    forceResetEffect: function forceResetEffect() {
        // override it to stop action, tween, schedule or cutscenes
    }
});

cc._RF.pop();