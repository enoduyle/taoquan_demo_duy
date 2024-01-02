"use strict";
cc._RF.push(module, 'cc0c2LVYv5IOL5AoYs706A2', 'TutorialMgr');
// cc-common/cc-slotbase-v2/Tutorial/TutorialMgr.js

"use strict";

var lodash = require('lodash');
var XORCipher = require("XOCypher");
var INDICATOR_ANGEL = {
    TOP: 180,
    LEFT: -90,
    RIGHT: 90
};
cc.Class({
    extends: cc.Component,

    properties: {
        dialog: require("TutorialDialog"),
        gradientBot: cc.Node,
        gradientTop: cc.Node,
        tutorialSteps: {
            type: cc.Asset,
            default: null
        },
        indicator: cc.Node,
        tutorialText: {
            type: cc.Asset,
            default: null
        },
        buttonSkip: cc.Node,
        jackpot: cc.Node,
        timeDelayStart: 0,
        isDebug: false,
        tutorialDataConfigs: {
            default: [],
            type: require('SlotCustomDataType').TutorialDataConfig
        }
    },

    onLoad: function onLoad() {
        if (typeof this.inited === 'undefined') this.inited = false;
        this.finished = true;
        if (!this.inited) {
            this.node.active = false;
        }

        this.listLockedObjects = [];
        this.listLockedObjectData = [];
        this.trialSessionCount = 0;
    },
    start: function start() {
        this.maxDemoTime = this.node.config.MAX_PLAY_DEMO || 10;
    },
    startTutorial: function startTutorial() {
        var _this = this;

        if (this.waitForStart) return;

        if (!this.inited) {
            this.init();
        }
        this.node.active = true;
        this.node.opacity = 255;
        this.endTutorialData = false;
        this._isSpinning = false;
        this.initJackpot();
        this.slotButtons.forEach(function (sb) {
            sb.node.emit("ENABLE_SPIN_KEY", false);
        });
        this._lockTouch();
        this.waitForStart = true;
        this.node.stopAllActions();
        if (this.mainDirector && this.mainDirector.node) {
            this.mainDirector.node.emit('DISABLE_BUTTON_CONTROL');
            this.mainDirector.currentGameMode.emit('SPIN_DISABLE');
            this.mainDirector.disableBet(true);
        }
        this.node.runAction(cc.sequence(cc.delayTime(this.timeDelayStart), cc.callFunc(function () {
            _this.finished = false;
            _this.reset();
            _this._unlockTouch();
            if (_this.forceSkipTutorial) {
                _this.skipTutorial();
            } else {
                _this.run();
            }
            if (_this.mainDirector && _this.mainDirector.node) {
                _this.mainDirector.currentGameMode.emit('SPIN_ENABLE');
            }
            _this.waitForStart = false;
        })));
    },
    init: function init() {
        if (this.node.config.IS_SUPPORT_MULTI_CURRENCY && this.tutorialDataConfigs.length) {
            var currencyCode = this.mainDirector.currencyCode.toUpperCase();
            var dataConfig = this.tutorialDataConfigs.find(function (config) {
                return config.currencyCode.toUpperCase() == currencyCode;
            }) || {};
            this.tutorialData = dataConfig.tutorialData && dataConfig.tutorialData.json;
            this.tutorialSteps = dataConfig.tutorialSteps || this.tutorialSteps;
            this.tutorialText = dataConfig.tutorialText || this.tutorialText;
            var tutorialData = lodash.get(this.mainDirector, 'gameStateManager._spinTutorialData');
            if (tutorialData && this.tutorialData) {
                this.mainDirector.gameStateManager._spinTutorialData = this.tutorialData;
            } else {
                this.forceSkipTutorial = true;
            }
        }
        if (this.tutorialData) {
            var _tutorialData = this.tutorialData,
                encryptData = _tutorialData.data,
                isEncrypted = _tutorialData.isEncrypted;

            if (isEncrypted) {
                var decryptData = XORCipher.decode_tutorial(encryptData);
                this.tutorialData = JSON.parse(decryptData);
                this.mainDirector.gameStateManager._spinTutorialData = this.tutorialData;
            }
        }

        this.canvas = cc.find("Canvas");
        this.inited = true;
        this.flags = [];
        this.unlockAll();
        this.jackpotComponent = this.jackpot.getComponent("Jackpot");
        this.slotButtons = this.mainDirector.getComponentsInChildren("SlotButtonBase");
        this.jackpotComponent.initData();
        this.jackpotReset = false;
    },
    initJackpot: function initJackpot() {
        var _this2 = this;

        this.jackpot.active = true;
        this.jackpot.opacity = 255;
        var jackpots = Object.keys(this.node.config.DEFAULT_TRIAL_JACKPOT);
        jackpots.forEach(function (jp) {
            var value = _this2.node.config.DEFAULT_TRIAL_JACKPOT[jp];
            _this2.jackpotComponent.callbackJackpotUpdate(jp, value);
        });
    },
    playIndicatorAnim: function playIndicatorAnim() {
        var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.indicator.stopAllActions();
        switch (angle) {
            case INDICATOR_ANGEL.RIGHT:
                this.indicator.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 50, 0), cc.moveBy(0.5, -50, 0))));
                break;
            case INDICATOR_ANGEL.LEFT:
                this.indicator.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, -50, 0), cc.moveBy(0.5, 50, 0))));
                break;
            case INDICATOR_ANGEL.TOP:
                this.indicator.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 50), cc.moveBy(0.5, 0, -50))));
                break;
            default:
                this.indicator.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, -50), cc.moveBy(0.5, 0, 50))));
                break;
        }
    },
    reset: function reset() {
        this.index = 0;
        this.spinIndex = 0;
        this.showing = true;
        this.pauseGameMode = false;
        this.buttonSkip.active = true;
        this.flags = [];
    },
    _lockAtButton: function _lockAtButton(_ref) {
        var objPath = _ref.objPath;

        var obj = cc.find(objPath);
        if (obj) {
            this.doLockObject(obj);
        } else {
            cc.warn("TutorialMgr cant find object with path " + objPath);
        }
    },
    _lockAtObjects: function _lockAtObjects(_ref2) {
        var _this3 = this;

        var listPath = _ref2.listPath;

        if (this.listLockedObjects && this.listLockedObjects.length) {
            this._unlockAllObjects();
        }
        if (listPath && listPath.length) {
            listPath.forEach(function (objPath) {
                var lockObject = cc.find(objPath);
                var lockObjectPosition = lockObject.parent.convertToWorldSpaceAR(lockObject.position);
                _this3.listLockedObjects.unshift(lockObject);
                _this3.listLockedObjectData.unshift({
                    lockObjectActive: lockObject.active,
                    lockObjectColor: lockObject.color,
                    lockObjectParent: lockObject.parent,
                    lockObjectLocalPos: lockObject.position,
                    lockObjectPosition: lockObjectPosition,
                    lockObjectIndex: lockObject.getSiblingIndex(),
                    lockObjetOpacity: lockObject.opacity
                });
                lockObject.parent = _this3.node;
                lockObject.setSiblingIndex(_this3.gradientTop.getSiblingIndex());
                lockObject.position = _this3.node.convertToNodeSpaceAR(lockObjectPosition);
                lockObject.active = true;
                lockObject.color = cc.Color.WHITE;
                lockObject.opacity = 255;
            });
            this.gradientBot.active = true;
            this.gradientBot.opacity = 0;
            this.gradientBot.runAction(cc.fadeTo(0.1, 160));
        }
    },
    _unlockAllObjects: function _unlockAllObjects() {
        var _this4 = this;

        if (this.listLockedObjects && this.listLockedObjects.length) {
            this.gradientBot.active = false;
            this.listLockedObjects.forEach(function (lockObject, index) {
                var lockObjectData = _this4.listLockedObjectData[index];
                lockObject.parent = lockObjectData.lockObjectParent;
                lockObject.position = lockObjectData.lockObjectLocalPos;
                lockObject.setSiblingIndex(lockObjectData.lockObjectIndex);
                lockObject.active = lockObjectData.lockObjectActive;
                lockObject.color = lockObjectData.lockObjectColor;
                lockObject.opacity = lockObjectData.lockObjetOpacity;
            });
            this.listLockedObjects = [];
            this.listLockedObjectData = [];
        }
    },
    doLockObject: function doLockObject(obj) {
        if (this.lockObject) this._unlockButton();
        this.lockObject = obj;
        this.lockObjectActive = obj.active;
        this.lockObjectColor = obj.color;
        this.lockObjectParent = this.lockObject.parent;
        this.lockObjectLocalPos = this.lockObject.position;
        this.lockObjectPosition = this.lockObjectParent.convertToWorldSpaceAR(this.lockObjectLocalPos);
        this.lockObjectIndex = this.lockObject.getSiblingIndex();
        this.lockObjetOpacity = this.lockObject.opacity;

        this.lockObject.parent = this.node;
        this.lockObject.setSiblingIndex(this.gradientTop.getSiblingIndex());
        this.lockObject.position = this.node.convertToNodeSpaceAR(this.lockObjectPosition);
        this.lockObject.active = true;
        this.lockObject.color = cc.Color.WHITE;
        this.lockObject.opacity = 255;

        this.gradientBot.active = true;
        this.gradientBot.opacity = 0;
        this.gradientBot.runAction(cc.fadeTo(0.1, 160));
    },
    _unlockButton: function _unlockButton() {
        if (this.lockObject) {
            this.gradientBot.active = false;
            this.lockObject.parent = this.lockObjectParent;
            this.lockObject.position = this.lockObjectLocalPos;
            this.lockObject.setSiblingIndex(this.lockObjectIndex);
            this.lockObject.active = this.lockObjectActive;
            this.lockObject.color = this.lockObjectColor;
            this.lockObject.opacity = this.lockObjetOpacity;
            this.lockObject = null;
        }
    },
    _lockAtSymbol: function _lockAtSymbol(_ref3) {
        var x = _ref3.x,
            y = _ref3.y,
            _ref3$path = _ref3.path,
            path = _ref3$path === undefined ? "SlotTable/Table/Reel_" : _ref3$path,
            extendPath = _ref3.extendPath;

        var reel = cc.find(path + y, this.mainDirector.currentGameMode);
        var symbol = reel.getComponent("SlotReel").getShowSymbol(x);
        var obj = null;

        if (extendPath) {
            obj = cc.find(extendPath, symbol);
        } else {
            obj = symbol;
        }
        obj && this.doLockObject(obj);
    },
    _lockTouch: function _lockTouch(data) {
        this.gradientTop.opacity = data && data.gradient ? 180 : 0;
        this.gradientTop.active = true;
    },
    _unlockTouch: function _unlockTouch() {
        this.gradientTop.active = false;
    },
    _showDialog: function _showDialog(_ref4) {
        var title = _ref4.title,
            content = _ref4.content,
            position = _ref4.position,
            arrow = _ref4.arrow,
            arrow1 = _ref4.arrow1,
            backgroundReverse = _ref4.backgroundReverse;

        var titleText = this.getText(title);
        var contentText = this.getText(content);
        this.dialog.node.position = position || cc.v2(0, 0);
        this.dialog.show(titleText, contentText, arrow, arrow1);
        this.dialog.node.scale = 0.1;
        this.dialog.node.runAction(cc.sequence(cc.scaleTo(0.2, 1.2), cc.scaleTo(0.1, 0.9), cc.scaleTo(0.1, 1)));
        var bg = this.dialog.node.getChildByName('Bg');
        if (bg) {
            bg.scaleY = backgroundReverse ? -1 : 1;
        }
    },
    _hideDialog: function _hideDialog() {
        this.dialog.hide();
    },
    _showIndicator: function _showIndicator(_ref5) {
        var rotation = _ref5.rotation,
            position = _ref5.position;

        this.indicator.active = true;
        this.indicator.angle = rotation;
        this.indicator.position = position;
        this.playIndicatorAnim(rotation);
    },
    _pauseGameMode: function _pauseGameMode(_ref6) {
        var pause = _ref6.pause;

        this.pauseGameMode = pause;
    },
    _hideIndicator: function _hideIndicator() {
        this.indicator.active = false;
        this.indicator.stopAllActions();
    },
    _startFreespin: function _startFreespin() {
        if (this.mainDirector && this.mainDirector.currentGameMode.name == "FreeGamePrefab") {
            this.mainDirector.currentGameMode.getComponent("SlotGameDirector").runAction('SpinByTimes', 999999);
        }
    },
    _addBoolFlag: function _addBoolFlag(_ref7) {
        var flag = _ref7.flag;

        this.flags.push(flag);
    },
    _removeBoolFlag: function _removeBoolFlag(_ref8) {
        var flag = _ref8.flag;

        this.flags = this.flags.filter(function (it) {
            return it != flag;
        });
    },
    _resumeCurrentScript: function _resumeCurrentScript() {
        this.mainDirector && this.mainDirector.currentGameMode.emit('RUN_CONTINUE_SCRIPT');
    },
    _setLockedButtonPos: function _setLockedButtonPos(_ref9) {
        var x = _ref9.x,
            y = _ref9.y;

        if (this.lockObject) {
            this.lockObject.x = x;
            this.lockObject.y = y;
        }
    },
    _setJackpotActive: function _setJackpotActive(_ref10) {
        var active = _ref10.active;

        if (this.jackpot) this.jackpot.active = active;
    },
    _activeBet: function _activeBet(_ref11) {
        var active = _ref11.active;

        if (active) this.mainDirector.enableBet(true);else this.mainDirector.disableBet(true);
    },
    _setBetValue: function _setBetValue(_ref12) {
        var value = _ref12.value;

        this.mainDirector.bet.emit("UPDATE_BET", value);
    },
    _enableButton: function _enableButton(_ref13) {
        var objPath = _ref13.objPath;

        var button = cc.find(objPath);
        if (button) {
            button.getComponent(cc.Button).interactable = true;
        }
    },
    _disableButton: function _disableButton(_ref14) {
        var objPath = _ref14.objPath;

        var button = cc.find(objPath);
        if (button) {
            button.getComponent(cc.Button).interactable = false;
        }
    },
    _updateJackpot: function _updateJackpot() {
        this.jackpotComponent && this.jackpotComponent.renderJackpotBet();
    },
    _enableTrialButtons: function _enableTrialButtons() {
        this.mainDirector.trialButton.emit("ENABLE_BUTTONS", true);
    },
    isContainFlag: function isContainFlag(flag) {
        return this.flags.indexOf(flag) >= 0;
    },
    trigger: function trigger(action) {
        if (this.waitingTrigger && this.waitingTrigger.some(function (trigger) {
            return trigger === action;
        })) {
            this.index += 1;
            if (this.index < this.tutorialSteps.json.Steps.length) this.run();else this.hideTutorial();
        }
        if (action == "ON_CUTSCENE_CLOSE" && this.jackpotReset) {
            this.runJackpot();
            this.jackpotReset = false;
        }

        if (action === "GAME_RESET_SESSION") {
            this._isSpinning = false;
            if (this.doActionAfterFinishSpin) {
                this._activeBet({ active: true });
                this.endTutorialData = true;
                this.finished = true;
                this.doActionAfterFinishSpin = false;
            }
            if (this.trialSessionCount >= this.maxDemoTime) {
                this.mainDirector.showPopupRedirect();
                this.trialSessionCount = 0;
            }
        }

        if (action === 'NORMAL_GAME_RESTART') {
            this.trialSessionCount += 1;
        }

        if (action === "SPIN_CLICK") {
            this._isSpinning = true;
        }
    },
    run: function run() {
        this.currentStepData = this.tutorialSteps.json.Steps[this.index];
        if (!this.currentStepData) {
            cc.log("something wrong");
        }

        while (this.currentStepData.command != "_waitFor") {
            this.resolve(this.currentStepData);
            this.index += 1;
            if (this.index < this.tutorialSteps.json.Steps.length) this.currentStepData = this.tutorialSteps.json.Steps[this.index];else break;
        }
        if (this.index >= this.tutorialSteps.json.Steps.length) {
            this.hideTutorial();
        } else {
            this.waitingTrigger = this.currentStepData.data["trigger"];
            this.isDebug && cc.warn("%c waiting", "color:red;", this.waitingTrigger);
        }
    },
    resolve: function resolve(stepData) {
        if (this[stepData.command] && typeof this[stepData.command] === "function") {
            this.isDebug && cc.warn(stepData.command, JSON.stringify(stepData.data, null, "\t"));
            this[stepData.command](stepData.data);
        } else {
            cc.error("Cant find command " + stepData.command);
        }
    },
    isShowing: function isShowing() {
        return this.inited && this.showing;
    },
    onTutorialClick: function onTutorialClick() {
        this.trigger("TUTORIAL_CLICK");
    },
    onTutorialFinish: function onTutorialFinish() {
        if (this.finished) return;
        this.finished = true;
        this.doActionAfterFinishSpin = false;
    },
    unlockAll: function unlockAll() {
        this._hideDialog();
        this._hideIndicator();
        this._unlockButton();
        this._unlockTouch();
        this._unlockAllObjects();
        this.buttonSkip.active = false;
        this.gradientBot.active = false;
    },
    getText: function getText(id) {
        if (this.tutorialText && this.tutorialText.json && this.tutorialText.json[id]) {
            return this.tutorialText.json[id];
        }
        return id;
    },
    setMainGameMgr: function setMainGameMgr(director) {
        this.mainDirector = director;
    },
    skipTutorial: function skipTutorial(evt) {
        if (this.node.soundPlayer) {
            if (evt) this.node.soundPlayer.playSFXClick();
        }
        this.index = this.tutorialSteps.json.Steps.length;
        this.showing = false;

        if (this.isContainFlag("pauseFreeGame")) {
            this._startFreespin();
        }

        if (this._isSpinning) {
            this.doActionAfterFinishSpin = true;
        } else {
            this.endTutorialData = true;
            this.finished = true;
            this._activeBet({ active: true });
        }

        if (this.mainDirector && this.mainDirector.node) {
            this.mainDirector.node.emit('ENABLE_BUTTON_CONTROL');
            this.mainDirector.skipTutorialMode();
        }
        this.node.stopAllActions();
        this.hideTutorial();
    },
    hideTutorial: function hideTutorial() {
        this.unlockAll();
        this.waitingTrigger = [];
        this.showing = false;
        this.slotButtons.forEach(function (sb) {
            sb.node.emit("ENABLE_SPIN_KEY", true);
        });
        if (this.endTutorialData) this.onTutorialFinish();
        this.mainDirector.node.emit('HIDE_TUTORIAL');
        this.mainDirector.node.emit('ENABLE_BUTTON_CONTROL');
        this.flags = [];
        this._resumeCurrentScript();
    },
    playAnimSwitchToReal: function playAnimSwitchToReal() {
        var _this5 = this;

        var havingDirector = this.mainDirector && this.mainDirector.node;
        this.jackpot.active = false;
        this._lockTouch();
        this.node.stopAllActions();
        this._activeBet({ active: false });
        this.slotButtons.forEach(function (sb) {
            sb.node.emit("ENABLE_SPIN_KEY", false);
        });
        if (havingDirector) {
            this.mainDirector.node.emit('DISABLE_BUTTON_CONTROL');
        }
        this.node.runAction(cc.sequence(cc.delayTime(this.timeDelayStart), cc.callFunc(function () {
            _this5._activeBet({ active: true });
            _this5.slotButtons.forEach(function (sb) {
                sb.node.emit("ENABLE_SPIN_KEY", true);
            });
            if (havingDirector) {
                _this5.mainDirector.node.emit('ENABLE_BUTTON_CONTROL');
            }
            _this5._unlockTouch();
            _this5.node.active = false;
        })));
    },
    isFinished: function isFinished() {
        return !this.inited || this.finished;
    },
    onStateUpdate: function onStateUpdate(data) {
        cc.log(data);
        this.jackpotComponent = this.jackpot.getComponent("Jackpot");
        if (data.trialJpl) {
            if (data.winJackpotAmount || data.jackpot) {
                if (data.trialJplWin && data.trialJplWin.length) {
                    var trialJpl = data.trialJpl,
                        trialJplWin = data.trialJplWin;

                    var isTutorialData = data.trialJplWin.length > 1;
                    this.trialJpl = isTutorialData ? data.trialJplWin : this.getLatestJackpot(trialJpl, trialJplWin);
                    this.runJackpot();
                }
                this.trialJpl = data.trialJpl;
                this.jackpotReset = true;
            } else {
                this.trialJpl = data.trialJpl;
                this.runJackpot();
            }
        }
        if (data.isFinishedTutorial) {
            this.endTutorialData = true;
            if (!this.showing) this.onTutorialFinish();
        }
    },
    getLatestJackpot: function getLatestJackpot(trialJpl, trialJplWin) {
        var jackpotName = trialJplWin[0].split(';')[0];
        return trialJpl.map(function (item) {
            return item.includes(jackpotName) ? trialJplWin[0] : item;
        });
    },
    runJackpot: function runJackpot() {
        for (var i = 0; i < this.trialJpl.length; i++) {
            var jackpotData = this.trialJpl[i].split(';');
            var jackpotAmount = Number(jackpotData[1]);
            var jackpotName = jackpotData[0].replace(this.node.config.JP_PREFIX_EVENT, "");
            this.jackpotComponent.callbackJackpotUpdate(jackpotName, jackpotAmount);
        }
    },
    onEnable: function onEnable() {
        this.jackpot.active = true;
    },
    enableSkipBtn: function enableSkipBtn() {
        var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.buttonSkip.getComponent(cc.Button).interactable = isOn;
    },
    displaySkipBtn: function displaySkipBtn() {
        var isActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.buttonSkip.active = isActive;
    }
});

cc._RF.pop();