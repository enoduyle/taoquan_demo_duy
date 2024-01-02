(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/Bet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fc1e4E+qURG9aOxDMiFUCMK', 'Bet', __filename);
// cc-common/cc-slotbase-v2/gui/Bet.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney,
    formatWalletMoney = _require.formatWalletMoney,
    findKeyByValue = _require.findKeyByValue,
    convertObjectToArrayKey = _require.convertObjectToArrayKey,
    convertObjectToArray = _require.convertObjectToArray;

var _require2 = require('gameCommonUtils'),
    getBetValueWithGame = _require2.getBetValueWithGame,
    setBetValueWithGame = _require2.setBetValueWithGame;

cc.Class({
    extends: cc.Component,
    properties: {
        bg: cc.Node,
        bgBetNormal: {
            default: null,
            type: cc.SpriteFrame
        },
        bgBetMin: {
            default: null,
            type: cc.SpriteFrame
        },
        bgBetMax: {
            default: null,
            type: cc.SpriteFrame
        },
        betSFX: {
            default: null,
            type: cc.AudioClip
        },
        decreaseSFX: {
            default: null,
            type: cc.AudioClip
        },
        increaseSFX: {
            default: null,
            type: cc.AudioClip
        },
        betDenomLabel: cc.Node,
        isCircular: true,
        increaseButton: cc.Button,
        decreaseButton: cc.Button
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on("UPDATE_BET", this.updateBet, this);
        this.node.on("LOAD_BET", this.loadBet, this);
        this.node.on('ENABLE_BET', this.enableBetBtn, this);
        this.node.on('DISABLE_BET', this.disableBetBtn, this);
        this.node.on('UPDATE_BET_VALUE', this.updateBetValue, this);
        this.node.on('SWITCH_MODE', function (isTrial) {
            _this.trialMode = isTrial;
        });
        this.increaseBetEvent = new cc.Event.EventCustom("INGAME_EVENT_RAISED", true);
        this.increaseBetEvent.setUserData({ trigger: "BET_INCREASE" });
    },
    checkColorChange: function checkColorChange() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$.currentBetData,
            steps = _node$gSlotDataStore$.steps;

        var minBet = 0;
        var maxBet = 0;
        if (Array.isArray(steps)) {
            minBet = steps[0];
            maxBet = steps[steps.length - 1];
        } else {
            var newSteps = convertObjectToArray(steps);
            minBet = newSteps[0];
            maxBet = newSteps[newSteps.length - 1];
        }
        if (this.bg) {
            if (currentBetData === minBet) {
                this.bg.getComponent(cc.Sprite).spriteFrame = this.bgBetMin;
            } else if (currentBetData === maxBet) {
                this.bg.getComponent(cc.Sprite).spriteFrame = this.bgBetMax;
            } else {
                this.bg.getComponent(cc.Sprite).spriteFrame = this.bgBetNormal;
            }
        }
    },
    loadBet: function loadBet(_ref) {
        var gameId = _ref.gameId;
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.slotBetDataStore.data,
            steps = _node$gSlotDataStore$2.steps,
            currentBetData = _node$gSlotDataStore$2.currentBetData;

        if (gameId) {
            this.gameId = gameId;
        }
        var defaultBet = getBetValueWithGame(gameId, steps) || currentBetData;

        this.updateBet(defaultBet);
    },
    updateBet: function updateBet(betId) {
        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;

        if (!findKeyByValue(steps, betId)) {
            return;
        }
        if (!this.trialMode) setBetValueWithGame(this.gameId, betId);
        this.node.gSlotDataStore.slotBetDataStore.updateCurrentBet(betId);
        this.updateBetValue(betId);
        this.checkColorChange();
        this.node.emit('BET_CHANGE', betId);

        // if (!this.isCircular) this.checkDisableButtons(currentBetData, maxBet, minBet);
    },
    reduceBet: function reduceBet() {
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$3.currentBetData,
            steps = _node$gSlotDataStore$3.steps;

        var stepIndex = findKeyByValue(steps, currentBetData);
        if (!stepIndex) {
            return;
        }
        var arrayBetIndex = convertObjectToArrayKey(steps);
        var minBet = steps[arrayBetIndex[0]];
        var maxBet = steps[arrayBetIndex[arrayBetIndex.length - 1]];
        var newBet = maxBet;
        if (currentBetData > minBet) {
            newBet = steps[arrayBetIndex[arrayBetIndex.indexOf(stepIndex) - 1]];
        }
        this.updateBet(newBet);

        // if (!this.isCircular) this.checkDisableButtons(newBet, maxBet, minBet);
        if (this.node.soundPlayer) this.node.soundPlayer.playSFX(this.decreaseSFX || this.betSFX);
    },
    increaseBet: function increaseBet() {
        var _node$gSlotDataStore$4 = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$4.currentBetData,
            steps = _node$gSlotDataStore$4.steps;

        var stepIndex = findKeyByValue(steps, currentBetData);
        if (!stepIndex) {
            return;
        }
        var arrayBetIndex = convertObjectToArrayKey(steps);
        var minBet = steps[arrayBetIndex[0]];
        var maxBet = steps[arrayBetIndex[arrayBetIndex.length - 1]];
        var newBet = minBet;
        if (currentBetData < maxBet) {
            newBet = steps[arrayBetIndex[arrayBetIndex.indexOf(stepIndex) + 1]];
        }
        this.updateBet(newBet);
        // if (!this.isCircular) this.checkDisableButtons(newBet, maxBet, minBet);
        if (this.node.soundPlayer) this.node.soundPlayer.playSFX(this.increaseSFX || this.betSFX);
        this.increaseBetEvent.unuse();
        this.increaseBetEvent.reuse("INGAME_EVENT_RAISED", true);
        this.node.dispatchEvent(this.increaseBetEvent);
    },
    disableBetBtn: function disableBetBtn() {
        if (this.increaseButton) {
            this.increaseButton.interactable = false;
        }
        if (this.decreaseButton) {
            this.decreaseButton.interactable = false;
        }
    },
    enableBetBtn: function enableBetBtn() {
        if (this.increaseButton) {
            this.increaseButton.interactable = true;
        }
        if (this.decreaseButton) {
            this.decreaseButton.interactable = true;
        }
    },
    checkDisableButtons: function checkDisableButtons(current, max, min) {
        this.increaseButton.interactable = true;
        this.decreaseButton.interactable = true;

        if (current == max) this.increaseButton.interactable = false;

        if (current == min) this.decreaseButton.interactable = false;
    },
    updateBetValue: function updateBetValue(value) {
        if (this.betDenomLabel && this.node.config) {
            var PAY_LINE_LENGTH = this.node.config.PAY_LINE_LENGTH;

            this.betDenomLabel.getComponent(cc.Label).string = '' + formatWalletMoney(Number(value) / Number(PAY_LINE_LENGTH));
            var formatFunc = formatWalletMoney;
            var decimalCount = void 0;
            if (this.node.config.IS_SUPPORT_MULTI_CURRENCY) {
                var currencyConfig = this.node.config.CURRENCY_CONFIG[this.node.gSlotDataStore.currencyCode];
                var betFormat = currencyConfig && currencyConfig.BET_FORMAT;
                formatFunc = betFormat && betFormat.IS_SHORT_FORMAT ? formatWalletMoney : formatMoney;
                decimalCount = betFormat ? betFormat.DECIMAL_COUNT : decimalCount;
            }
            this.node.emit("UPDATE_STRING", { value: formatFunc(value, decimalCount) });
        } else {
            this.node.emit("UPDATE_STRING", { value: formatMoney(value) });
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
        //# sourceMappingURL=Bet.js.map
        