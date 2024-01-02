"use strict";
cc._RF.push(module, '3afd8X/D2tD8LtXWrHoHsvt', 'gameStateSlot');
// cc-common/cc-slotbase-v2/game-state/gameStateSlot.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gameNetwork = window.GameNetwork || require('game-network');
var CommandManager = gameNetwork.CommandManager;
var EventManager = gameNetwork.EventManager;
var messageManager = gameNetwork.MessageManager.getInstance();
var lodash = require('lodash');
var playInfo = gameNetwork.PlayerInfoStateManager.getInstance();
var _gameNetwork$lib = gameNetwork.lib,
    logger = _gameNetwork$lib.logger,
    uuid = _gameNetwork$lib.uuid;

var _require = require('utils'),
    mapObjectKey = _require.mapObjectKey;

var keyMapConfig = require('MsgKeyMapping');

var SLOT_STRATEGY = {
    'client-join-game-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'jg': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },

    'client-normal-spin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'ng': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-free-spin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'fg': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'ngt': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "PANIC"
    },
    'fgt': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "PANIC"
    },
    'mgt': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "PANIC"
    },
    'client-lightning-spin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-powerup-spin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },

    'client-mini-game-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'mg': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-free-spin-option-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'fo': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-gamble-spin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-respin-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'rg': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'glt': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "PANIC"
    },
    'client-join-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-normal-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-free-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-bonus-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-free-game-option-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'fot': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-respin-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "DIE"
    },
    'rgt': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "DIE"
    },
    'client-gamble-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-lightning-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-powerup-game-trial-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 10000,
        recoverEvent: "DIE"
    },
    'client-free-spin-option-event-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    },
    'client-free-spin-event-request': {
        resendCount: 100, shouldWaitForACK: true, canBeDuplicated: false,
        timeWaitForEvent: 5000,
        recoverEvent: "PANIC"
    }
};

var NEW_EVENT = {
    'client-normal-spin-request': 'ng',
    'client-free-spin-request': 'fg',
    'client-mini-game-request': 'mg',
    'client-free-spin-option-request': 'fo',
    'client-respin-request': 'rg',
    'client-join-game-request': 'jg',
    'client-normal-game-trial-request': 'ngt',
    'client-free-game-trial-request': 'fgt',
    'client-bonus-game-trial-request': 'mgt',
    'client-free-game-option-trial-request': 'fot',
    'client-respin-trial-request': 'rgt'
};

var GameStateManager = function () {
    function GameStateManager(_ref) {
        var _this = this;

        var gameData = _ref.gameData;

        _classCallCheck(this, GameStateManager);

        var gameId = gameData.gameId,
            gameTrialData = gameData.gameTrialData,
            tutorialData = gameData.tutorialData,
            useShortParam = gameData.useShortParam,
            serverVersion = gameData.serverVersion;

        this._playerInfoStateManager = playInfo;
        this._state = GameStateManager.STATE_NORMAL;
        this.gameData = gameData;
        this.serviceId = gameId;
        this.token = this._playerInfoStateManager.getToken();
        this._commandManager = new CommandManager(gameId, 1, useShortParam ? 'cId' : 'commandId');
        this._eventManager = new EventManager();
        this.lastSuccessCommandId = '';
        this.gameCommandId = '';
        this.waitForEventData = {};
        this._lastCommandIds = [];
        this.gltCounting = 0;
        this.useShortParam = useShortParam;
        this.serverVersion = serverVersion;

        messageManager.registerGame(gameId, {
            onAck: this._commandManager.onAck.bind(this._commandManager),
            onCannotSendMessage: this._commandManager.onCannotSendMessage.bind(this._commandManager)
        }, {
            onCannotConnect: function onCannotConnect() {
                _this._gotoDieMode(EventManager.CAN_NOT_CONNECT);
            },
            onCannotAuthen: function onCannotAuthen() {
                _this._cleanUp();
                cc.log('AUTHEN FAILED');
                if (typeof _this.gameData.authFailed === 'function') {
                    _this.gameData.authFailed();
                }
            },
            onNetworkWarning: function onNetworkWarning() {
                if (typeof _this.gameData.onNetworkWarning === 'function') {
                    _this.gameData.onNetworkWarning();
                }
            },
            onShowPopupDisconnected: function onShowPopupDisconnected() {
                if (typeof _this.gameData.onShowPopupDisconnected === 'function') {
                    _this.gameData.onShowPopupDisconnected();
                }
            },
            onConnected: function onConnected() {
                if (typeof _this.gameData.onNetworkConnected === 'function') {
                    _this.gameData.onNetworkConnected();
                }
            },
            onEvent: this._eventManager.onEvent.bind(this._eventManager)
        });
        this._trialMode = false;
        this._spinTrialDataIndex = 0;
        this._spinTrialData = gameTrialData;
        this._spinTutorialData = tutorialData;
        this._setUpEventListener();
        this._handleNetworkStatusEvent();
    }

    _createClass(GameStateManager, [{
        key: 'getCurrentWallet',
        value: function getCurrentWallet() {
            return this._playerInfoStateManager.getWalletBalance();
        }
    }, {
        key: 'switchToTrial',
        value: function switchToTrial() {
            if (this._spinTrialData && this._spinTrialData.length > 0) {
                cc.warn("TrialData is not set");
            }
            this._trialMode = true;
            this._spinTutorialIndex = 0;

            return this._trialMode;
        }
    }, {
        key: 'skipTutorial',
        value: function skipTutorial() {
            this._spinTutorialIndex = 999;
        }
    }, {
        key: 'switchToReal',
        value: function switchToReal() {
            this._trialMode = false;
        }
    }, {
        key: 'triggerJoinTrial',
        value: function triggerJoinTrial() {
            this._clientSendRequest({
                event: 'client-join-game-trial-request'
            });
        }
    }, {
        key: 'triggerSpinRequest',
        value: function triggerSpinRequest(betId, betLines) {
            var sendData = {
                betId: betId,
                l: window.languageCode || 'VI'
            };
            if (betLines) {
                sendData.betLines = betLines;
            }
            if (this._trialMode) {
                if (this._getNewTrialPS()) {
                    this._returnTrialPS();
                } else {
                    this._clientSendRequest({
                        event: 'client-normal-game-trial-request',
                        data: sendData
                    });
                }
            } else {
                this.requestingNewPS = true;
                this._clientSendRequest({
                    event: 'client-normal-spin-request',
                    data: sendData
                });
            }
        }
    }, {
        key: 'triggerSpinRequestBatch1',
        value: function triggerSpinRequestBatch1(currentBetValue) {
            if (this._trialMode) {
                if (this._getNewTrialPS()) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-normal-game-trial-request',
                        data: { totalBet: currentBetValue, betId: '' }
                    });
                }
            } else {
                this.requestingNewPS = true;
                this._clientSendRequest({
                    event: 'client-normal-spin-request',
                    data: { totalBet: currentBetValue, betId: '' }
                });
            }
        }
    }, {
        key: '_getNewTrialPS',
        value: function _getNewTrialPS() {
            if (this._spinTutorialData && this._spinTutorialIndex < this._spinTutorialData.length) {
                this.trialPS = lodash.cloneDeep(this._spinTutorialData[this._spinTutorialIndex]);
                this._spinTutorialIndex++;
            } else if (this._spinTrialData) {
                this.trialPS = lodash.cloneDeep(this._spinTrialData[Math.floor(Math.random() * this._spinTrialData.length)]);
            } else {
                this.trialPS = null;
            }
            this._spinTrialDataIndex = 0;

            return this.trialPS != null;
        }
    }, {
        key: '_returnTrialPS',
        value: function _returnTrialPS() {
            var _this2 = this;

            this.lastTrialPS = this.trialPS.shift();
            if (!this.lastTrialPS) return;
            var response = {};
            response.data = this.lastTrialPS;

            cc.log("___TRIAL: response", response);
            this.gameCommandId = uuid();
            if (this.useShortParam) response.data[this.serviceId].data.cId = this.gameCommandId;else response.data[this.serviceId].data.commandId = this.gameCommandId;
            clearTimeout(this.spinTimer);
            this.spinTimer = setTimeout(function () {
                if (_this2.useShortParam) {
                    _this2._fireEventStateUpdated(response.data[_this2.serviceId]);
                } else {
                    _this2._fireEventStateUpdated(response);
                }
                _this2._spinTrialDataIndex++;
            }, 300);
        }
    }, {
        key: 'triggerFreeSpinRequest',
        value: function triggerFreeSpinRequest() {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-free-game-trial-request',
                        data: {}
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-free-spin-request',
                    data: {}
                });
            }
        }
    }, {
        key: 'triggerFreeSpinEventRequest',
        value: function triggerFreeSpinEventRequest() {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-free-game-trial-request',
                        data: {}
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-free-spin-event-request',
                    data: {}
                });
            }
        }
    }, {
        key: 'triggerFreeSpinOption',
        value: function triggerFreeSpinOption(option) {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-free-game-option-trial-request',
                        data: { option: option }
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-free-spin-option-request',
                    data: { option: option }
                });
            }
        }
    }, {
        key: 'triggerFreeSpinEventOption',
        value: function triggerFreeSpinEventOption(option) {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-free-game-option-trial-request',
                        data: { option: option }
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-free-spin-option-event-request',
                    data: { option: option }
                });
            }
        }
    }, {
        key: 'triggerMiniGame',
        value: function triggerMiniGame(openCell) {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-bonus-game-trial-request',
                        data: { openCell: openCell }
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-mini-game-request',
                    data: { openCell: openCell }
                });
            }
        }
    }, {
        key: 'triggerLightningSpinRequest',
        value: function triggerLightningSpinRequest() {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-lightning-game-trial-request',
                        data: {}
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-lightning-spin-request',
                    data: {}
                });
            }
        }
    }, {
        key: 'triggerPowerUpSpinRequest',
        value: function triggerPowerUpSpinRequest(openCell) {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-powerup-game-trial-request',
                        data: { openCell: openCell }
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-powerup-spin-request',
                    data: { openCell: openCell }
                });
            }
        }
    }, {
        key: 'triggerGambleSpinRequest',
        value: function triggerGambleSpinRequest(openCell, totalBet) {
            if (this._trialMode) {
                if (this.trialPS) {
                    if (totalBet > 0) this.trialPS.shift();
                    this._returnTrialPS();
                } else {
                    this._clientSendRequest({
                        event: 'client-gamble-game-trial-request',
                        data: { openCell: openCell, totalBet: totalBet }
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-gamble-spin-request',
                    data: { openCell: openCell, totalBet: totalBet }
                });
            }
        }
    }, {
        key: 'triggerRespinRequest',
        value: function triggerRespinRequest() {
            if (this._trialMode) {
                if (this.trialPS) this._returnTrialPS();else {
                    this._clientSendRequest({
                        event: 'client-respin-trial-request',
                        data: {}
                    });
                }
            } else {
                this._clientSendRequest({
                    event: 'client-respin-request',
                    data: {}
                });
            }
        }
    }, {
        key: '_triggerGetLatestStatePrivate',
        value: function _triggerGetLatestStatePrivate(metaData) {
            var stateType = metaData.stateType,
                serviceId = metaData.serviceId,
                objectId = metaData.objectId;
            //Ensure do not repeat call latest state the same type

            var data = {
                serviceId: serviceId,
                objectId: objectId,
                stateType: stateType
            };

            this._clientSendRequest({
                event: 'glt',
                data: data
            });
        }
    }, {
        key: 'cleanUpForGame',
        value: function cleanUpForGame() {
            this._commandManager.cleanUp();
            this._eventManager.cleanUp();
            this._playerInfoStateManager.removeEvent('user-logged-out', this._fireEventUserLogOutFunc);
            if (this.timeoutLastedState) {
                clearTimeout(this.timeoutLastedState);
            }
        }
    }, {
        key: 'cleanUpNetWork',
        value: function cleanUpNetWork() {
            this._commandManager.clearRemainingCommand();
            this._eventManager.removeWaitingQueue();
            if (this.timeoutLastedState) {
                clearTimeout(this.timeoutLastedState);
            }
        }
    }, {
        key: 'outGame',
        value: function outGame() {
            if (this._outGame) return;
            this.cleanUpForGame();
            this._commandManager.unSubscribe(this.groupChannelName);
            messageManager.unregisterGame(this.serviceId);
            this._outGame = true;
        }
    }, {
        key: 'networkCallbackJP',
        value: function networkCallbackJP(callbackJP) {
            if (this.useShortParam) {
                this._eventManager.registerEvent('jud', function (_ref2) {
                    var data = _ref2.data;

                    callbackJP(data);
                });
            } else {
                this._eventManager.registerEvent('jackpot-updated', function (_ref3) {
                    var data = _ref3.data;

                    callbackJP(data);
                });
            }
        }
    }, {
        key: 'gameOnPause',
        value: function gameOnPause() {
            logger.debug('gameOnPause');
        }
    }, {
        key: 'gameOnResume',
        value: function gameOnResume() {
            logger.debug('gameOnResume');
            if (this.gameCommandId) {
                logger.debug('_resumeApp has this.gameCommandId: %s', this.gameCommandId);
            }
        }
    }, {
        key: '_subscribeJPChannel',
        value: function _subscribeJPChannel(groupChannelName) {
            if (groupChannelName) {
                this.groupChannelName = groupChannelName;
                this._commandManager.subscribe(this.groupChannelName);
            }
        }
    }, {
        key: '_verifyExpectedEvent',
        value: function _verifyExpectedEvent(eventData) {
            var result = false;
            var convertEvent = ['f', 'n', 'nor', 'fre', 'frO', 'bon', 'b', 'gam', 'lig', 'pow', 'adv', 'o', 'r'];
            var index = convertEvent.indexOf(eventData.event);
            if (this.useShortParam) {
                if (index >= 0) eventData.event = 'state-updated';
                eventData = mapObjectKey(eventData, keyMapConfig);
            }
            if (eventData.event === 'client-join-game-result') {
                var data = eventData.data;
                result = data.commandId === this.latestExecuteCommandResult && this.gameCommandId === data.commandId;
            } else if (eventData.event === 'client-join-trial-game-result') {
                var _data = eventData.data;
                result = _data.commandId === this.latestExecuteCommandResult && this.gameCommandId === _data.commandId;
            } else if (eventData.event === 'state-updated' && this._state === GameStateManager.STATE_NORMAL) {
                var _data2 = null;
                if (this.useShortParam) {
                    _data2 = eventData.data;
                } else {
                    _data2 = eventData.data[this.serviceId].data;
                }
                // force get latested state
                if (this.isForceGetLatestedState) {
                    return false;
                }
                result = _data2.commandId === this.latestExecuteCommandResult && this.gameCommandId === _data2.commandId;
            } else if (eventData.event === 'state-pushed' && this._state === GameStateManager.STATE_PANIC) {
                var _data3 = eventData.data;
                // check last event map with this.gameCommandId
                if (this.useShortParam) {
                    result = _data3.gameCommandId === this.gameCommandId;
                } else {
                    if (_data3 && _data3.lastEvent) {
                        result = _data3.commandId === this.latestExecuteCommandResult && _data3.lastEvent.commandId === this.gameCommandId;
                    } else {
                        result = false;
                    }
                }
            } else if (eventData.event === 'error-pushed' && this._state === GameStateManager.STATE_NORMAL && eventData.data && eventData.data[0]) {
                var _data4 = eventData.data;
                result = _data4[0].commandId === this.latestExecuteCommandResult;
                if (this.isForceGetLatestedState) {
                    return false;
                }
            }

            if (result == true && typeof this.gameData.onNetworkResume === 'function') {
                this.gameData.onNetworkResume();
            }

            return result;
        }
    }, {
        key: '_checkMismatchData',
        value: function _checkMismatchData(eventData) {
            var isMismatch = false;
            //if (eventData.event === 'state-updated')
            {
                if (!this.currentPSData) //resume case
                    {
                        this.currentPSData = {};
                        this.currentPSData.id = eventData.id;
                        this.currentPSData.version = eventData.version;
                        this.requestingNewPS = false;
                        return;
                    }

                if (this.requestingNewPS) {
                    if (eventData.version > 1) {
                        cc.log("Mismatch data new PS, event version is " + eventData.version);
                        isMismatch = true;
                    } else {
                        this.currentPSData = { id: eventData.id, version: eventData.version };
                        cc.log('Pass new PS request');
                        this.requestingNewPS = false;
                    }
                } else {
                    if (eventData.id == this.currentPSData.id) {
                        if (eventData.version == this.currentPSData.version + 1) this.currentPSData.version = eventData.version;else {
                            cc.log("Mismatch data, event version is " + eventData.version);
                            isMismatch = true;
                        }
                    }
                }
            }
            if (isMismatch) {
                cc.log('Mismatch');
                this._gotoDieMode(EventManager.MISMATCH_DATA_VERSION);
            }
        }
    }, {
        key: '_gotoNormalMode',
        value: function _gotoNormalMode() {
            if (this._outGame) return;
            cc.log('NORMAL MODE');
            this._eventManager.removeWaitingQueue();
            this._commandManager.clearRemainingCommand();
            if (typeof this.gameData.onNetworkResume === 'function') this.gameData.onNetworkResume();
        }
    }, {
        key: '_gotoPanicMode',
        value: function _gotoPanicMode() {
            if (this._outGame) return;
            cc.log('PANIC MODE');
            this._eventManager.removeWaitingQueue();
            this._commandManager.clearRemainingCommand();
            var playerUserId = this._playerInfoStateManager.getUserId();
            this._triggerGetLatestStatePrivate({ stateType: this.serviceId, serviceId: this.serviceId, objectId: playerUserId });
        }
    }, {
        key: '_gotoDieMode',
        value: function _gotoDieMode(reason) {
            var sendGameMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this._outGame) return;
            cc.log('DIE MODE');
            if (sendGameMessage && typeof this.gameData.onNetworkFailed === 'function') {
                this.gameData.onNetworkFailed(reason);
            }
            this._cleanUp();
        }
    }, {
        key: '_cleanUp',
        value: function _cleanUp() {
            if (this._outGame) return;
            this._outGame = true;
            this.cleanUpForGame();
            messageManager.unregisterGame(this.serviceId);
        }
    }, {
        key: '_timeoutExpectedEventHandler',
        value: function _timeoutExpectedEventHandler(event) {
            var eventRecover = SLOT_STRATEGY[event].recoverEvent;
            this._state = eventRecover;
            if (eventRecover === GameStateManager.STATE_PANIC) {
                this._gotoPanicMode();
            } else if (eventRecover === GameStateManager.STATE_DIE) {
                this._gotoDieMode(EventManager.EXPECTED_EVENT_TIMEOUT, event === 'client-join-game-request' || event === 'jg');
            }
        }
    }, {
        key: '_clientSendRequest',
        value: function _clientSendRequest(_ref4) {
            var event = _ref4.event,
                _ref4$data = _ref4.data,
                data = _ref4$data === undefined ? {} : _ref4$data;


            var version = this.serverVersion;
            var strategy = lodash.pick(SLOT_STRATEGY[event], ['resendCount', 'shouldWaitForACK', 'canBeDuplicated']);
            data = Object.assign(data, { token: this.token, serviceId: this.serviceId });
            if (this.useShortParam) {
                data = mapObjectKey(data, keyMapConfig);
                event = NEW_EVENT && NEW_EVENT[event] ? NEW_EVENT[event] : event;
            }

            var commandId = this._commandManager.executeCommand({ event: event, data: data, version: version }, strategy, this.useShortParam, !this.useShortParam);

            if (commandId === CommandManager.COMMAND_FAILED_CONC_OVER_LIMIT) {
                logger.error('onEnterInit -> CommandManager.COMMAND_FAILED_CONC_OVER_LIMIT');
            } else if (commandId === CommandManager.COMMAND_FAILED_DUPLICATE) {
                logger.error('onEnterInit -> CommandManager.COMMAND_FAILED_DUPLICATE');
            } else {
                this.latestExecuteCommandResult = commandId;

                this._waitForNetwork(event);
            }
        }
    }, {
        key: '_waitForEvent',
        value: function _waitForEvent(event) {
            var waitForEventId = this._eventManager.waitForEvent(SLOT_STRATEGY[event].timeWaitForEvent, this._verifyExpectedEvent.bind(this), this._timeoutExpectedEventHandler.bind(this, event));

            if (this.gameCommandId) {
                this.waitForEventData = {
                    waitForEventId: waitForEventId,
                    event: event
                };
            }
        }
    }, {
        key: '_waitForNetwork',
        value: function _waitForNetwork(event) {
            var _this3 = this;

            this._eventManager.waitForEvent(SLOT_STRATEGY[event].timeWaitForEvent, this._verifyExpectedEvent.bind(this), function () {
                if ((event === 'jg' || event === 'client-join-game-request') && _this3.hasJoinGameAck) {
                    return;
                }
                if (typeof _this3.gameData.onNetworkDisconnect === 'function') _this3.gameData.onNetworkDisconnect();
            });
        }
    }, {
        key: '_setUpEventListener',
        value: function _setUpEventListener() {
            var code = '';
            var loadConfigAsync = require('loadConfigAsync');

            var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
                LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME,
                URL_CODE = _loadConfigAsync$getC.URL_CODE;

            var env = 1;
            if (LOGIN_IFRAME) {
                var _require2 = require('gameCommonUtils'),
                    getUrlParam = _require2.getUrlParam;

                code = getUrlParam(URL_CODE);
                env = 2;
            }
            this.hasJoinGameAck = false;
            this._clientSendRequest({
                event: 'client-join-game-request',
                data: { code: code, env: env }
            });
            this._bindingEvents();
        }
    }, {
        key: '_bindingEvents',
        value: function _bindingEvents() {
            var self = this;
            this._fireEventUserLogOutFunc = function () {
                self.isLogOut = true;
                if (typeof self.gameData.userLogout === 'function') {
                    self.gameData.userLogout();
                }
                self._cleanUp();
            };
            this._playerInfoStateManager.registerEvent('user-logged-out', this._fireEventUserLogOutFunc);
            this._eventManager.registerEvent('client-join-game-result', this._fireEventJoinGameResult.bind(this));
            this._eventManager.registerEvent('join-game-denied', this._fireEventJoinGameDenied.bind(this));
            this._eventManager.registerEvent('state-updated', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('nor', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('fre', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('n', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('f', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('r', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('o', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('frO', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('bon', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('b', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('gam', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('lig', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('pow', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('adv', this._fireEventStateUpdated.bind(this));
            this._eventManager.registerEvent('state-pushed', this._fireEventStatePushed.bind(this));
            this._eventManager.registerEvent('error-pushed', this._fireEventErrorPushed.bind(this));
            this._eventManager.registerEvent('request-denied', this._fireEventRequestDenied.bind(this));
            if (this.useShortParam) {
                this._eventManager.registerEvent('jackpot-win', this._fireEventNoticeJackpotWin.bind(this));
                this._eventManager.registerEvent('JPA', this._fireEventJackpotWin.bind(this));
            } else {
                this._eventManager.registerEvent('jackpot-win', this._fireEventJackpotWin.bind(this));
                this._eventManager.registerEvent('JPA', this._fireEventNoticeUserWinJackpot.bind(this));
            }
            this._commandManager.registerEvent(CommandManager.COMMAND_SEND_SUCCESSFULLY, this._handleCommandSendSuccessfully.bind(this));
        }
    }, {
        key: '_handleCommandSendSuccessfully',
        value: function _handleCommandSendSuccessfully(commandPayload) {
            var commandId = commandPayload.data.commandId || commandPayload.data.cId;
            var event = commandPayload.event;
            if (event !== 'glt') {
                this.gameCommandId = commandId;
            }
            if (event === 'jg' || event === 'client-join-game-request') {
                this.hasJoinGameAck = true;
            }
            if (commandId === this.latestExecuteCommandResult) {
                this._saveNewCommandId(commandId);
                this._waitForEvent(event);
            }
        }
    }, {
        key: '_saveNewCommandId',
        value: function _saveNewCommandId(commandId) {
            if (this._lastCommandIds.length >= 10) {
                this._lastCommandIds.shift();
            }
            this._lastCommandIds.push(commandId);
        }
    }, {
        key: '_handleNetworkStatusEvent',
        value: function _handleNetworkStatusEvent() {
            var _this4 = this;

            this._eventManager.registerEvent(EventManager.CAN_NOT_CONNECT, function () {
                _this4._state = GameStateManager.STATE_DIE;
                _this4._gotoDieMode(EventManager.CAN_NOT_CONNECT);
            });
            this._eventManager.registerEvent(EventManager.CONNECTED, function () {});
        }
    }, {
        key: '_fireEventErrorPushed',
        value: function _fireEventErrorPushed(_ref5) {
            var data = _ref5.data;

            if (this.isForceGetLatestedState) return;
            if (this.useShortParam) {
                data = mapObjectKey(data, keyMapConfig);
            }
            if (lodash.isArray(data) && data[0]) {
                var errorCode = data[0].code;
                var metaData = data[0].metaData;
                //wallet error
                if (errorCode[0] == 'W' || errorCode == '0000' || errorCode == '0001') {
                    this.gameData.onNetworkError(errorCode, metaData);
                    this._state = GameStateManager.STATE_NORMAL;
                    if (this.timeoutLastedState) {
                        clearTimeout(this.timeoutLastedState);
                    }
                    this._gotoNormalMode();
                } else if (errorCode == '0030' && this._state == GameStateManager.STATE_PANIC) {
                    //server is inprogress
                    this.gltCounting = 0;
                } else {
                    this._state = GameStateManager.STATE_NORMAL;
                    this.gameCommandId = '';this.waitForEventData = {};

                    if (typeof this.gameData.onNetworkError === 'function') {
                        this.gameData.onNetworkError(errorCode, metaData);
                        if (this.timeoutLastedState) {
                            clearTimeout(this.timeoutLastedState);
                        }
                    }
                }
            }
        }
    }, {
        key: '_fireEventJoinGameResult',
        value: function _fireEventJoinGameResult(_ref6) {
            var data = _ref6.data;

            if (this.useShortParam) {
                data = mapObjectKey(data, keyMapConfig);
            }
            this._state = GameStateManager.STATE_NORMAL;
            if (typeof this.gameData.joinGameSuccess === 'function' && data.commandId === this.gameCommandId) {
                var playerUserId = this._playerInfoStateManager.getUserId();
                var _data5 = data,
                    extendData = _data5.extendData;


                this._subscribeJPChannel(data.groupChannelName);
                var dataJoinGame = lodash.cloneDeep(data);
                if (dataJoinGame[playerUserId] && dataJoinGame[playerUserId].isFinished === false) {
                    dataJoinGame.dataResume = dataJoinGame[playerUserId];
                    this.currentPSData = {};
                    this.currentPSData.id = dataJoinGame.dataResume.id;
                    this.currentPSData.version = dataJoinGame.dataResume.version;
                    this.requestingNewPS = false;
                }

                if (this.useShortParam) {
                    if (lodash.isEmpty(extendData.metaDataUser) || !extendData.metaDataUser) {
                        dataJoinGame.extendData.metaDataUser = {};
                        dataJoinGame.extendData.metaDataUser.currentWalletAmount = this.getCurrentWallet() || 0;
                    }
                    if (!lodash.isEmpty(extendData.metaDataPromotion) && !extendData.metaDataPromotion.status) {
                        dataJoinGame.metaDataPromotion = extendData.metaDataPromotion;
                    }
                } else {
                    if (!lodash.isEmpty(extendData.metaDataPromotion) && extendData.metaDataPromotion.status === 0) {
                        dataJoinGame.metaDataPromotion = extendData.metaDataPromotion;
                    }
                }

                // if (CC_DEV) {
                //     dataJoinGame.metaDataPromotion = {
                //         betId: '43',
                //         serviceId: '9990',
                //         promotionRemain: 3,
                //         promotionTotal: 3,
                //         promotionCode: '1234'
                //     };
                // };

                delete dataJoinGame[playerUserId];
                this.gameCommandId = '';this.waitForEventData = {};
                this.gameData.joinGameSuccess(dataJoinGame);
            }
        }
    }, {
        key: '_fireEventJoinGameDenied',
        value: function _fireEventJoinGameDenied() {
            this.outGame();
            this.gameData.onJoinGameDenied();
        }
    }, {
        key: '_fireEventRequestDenied',
        value: function _fireEventRequestDenied() {
            this.outGame();
            this.gameData.onRequestDenied();
        }
    }, {
        key: '_fireEventStateUpdated',
        value: function _fireEventStateUpdated(_ref7) {
            var data = _ref7.data;

            if (this.useShortParam) {
                data = mapObjectKey(data, keyMapConfig);
            }
            if (this._state === GameStateManager.STATE_NORMAL && typeof this.gameData.stateUpdate === 'function') {
                var commandId = '';
                if (this.useShortParam) {
                    commandId = data.commandId;
                } else {
                    commandId = data[this.serviceId].data.commandId;
                }
                // force get latest state
                if (this.isForceGetLatestedState) return;
                if (this.gameCommandId === commandId) {
                    this.lastSuccessCommandId = this.gameCommandId;
                    this.gameCommandId = '';this.waitForEventData = {};
                    this.latestExecuteCommandResult = '';
                    var dataRes = null;
                    if (this.useShortParam) {
                        dataRes = data;
                    } else {
                        dataRes = data[this.serviceId].data;
                    }
                    this.gameData.stateUpdate(dataRes);
                    if (!this._trialMode) this._checkMismatchData(dataRes);
                }
            }
        }
    }, {
        key: '_fireEventNoticeJackpotWin',
        value: function _fireEventNoticeJackpotWin(_ref8) {
            var data = _ref8.data;

            if (this._state === GameStateManager.STATE_NORMAL && typeof this.gameData.onNoticeJackpotWin === 'function') {
                var commandId = data.jpInfo[0].cmdId || data.jpInfo[0].cId;
                var isMe = this._lastCommandIds.includes(commandId);
                this.gameData.onNoticeJackpotWin(data, isMe);
            }
        }
    }, {
        key: '_fireEventJackpotWin',
        value: function _fireEventJackpotWin(_ref9) {
            var data = _ref9.data;

            if (this._state === GameStateManager.STATE_NORMAL && typeof this.gameData.onJackpotWin === 'function') {
                var commandId = data.jpInfo[0].cmdId || data.jpInfo[0].cId;
                var isMe = this._lastCommandIds.includes(commandId);
                this.gameData.onJackpotWin(data, isMe);
            }
        }
    }, {
        key: '_fireEventNoticeUserWinJackpot',
        value: function _fireEventNoticeUserWinJackpot(_ref10) {
            var data = _ref10.data;

            if (this._state === GameStateManager.STATE_NORMAL && typeof this.gameData.onJackpotWin === 'function') {
                var commandId = data.jpInfo[0].cmdId || data.jpInfo[0].cId;
                var isMe = this._lastCommandIds.includes(commandId);
                this.gameData.onNoticeUserWinJackpot(data, isMe);
            }
        }
    }, {
        key: '_fireEventStatePushed',
        value: function _fireEventStatePushed(_ref11) {
            var _this5 = this;

            var data = _ref11.data;

            var gameCommandId = null;
            if (this.useShortParam) {
                data = mapObjectKey(data, keyMapConfig);
                gameCommandId = data.gameCommandId;
            } else {
                if (data && data.lastEvent) {
                    gameCommandId = data.lastEvent.commandId;
                } else if (data && data.error && data.error[0]) {
                    gameCommandId = data.error[0].commandId;
                }
            }
            if (this._state === GameStateManager.STATE_PANIC && typeof this.gameData.stateUpdate === 'function' && gameCommandId) {

                if (gameCommandId === this.gameCommandId) {
                    this.gltCounting = 0;
                    this.lastSuccessCommandId = this.gameCommandId;
                    this._state = GameStateManager.STATE_NORMAL;
                    this.gameCommandId = '';this.waitForEventData = {};
                    this._gotoNormalMode();
                    var _data6 = data,
                        error = _data6.error;

                    if (lodash.isArray(error) && error[0] && typeof this.gameData.onNetworkError === 'function') {
                        var errorCode = error[0].code;
                        var metaData = error[0].metaData;
                        this.gameData.onNetworkError(errorCode, metaData);
                    } else {
                        this.gameData.stateUpdate(data);
                        this.currentPSData = {};
                        this.currentPSData.id = data.id;
                        this.currentPSData.version = data.version;
                    }
                    this.requestingNewPS = false;
                    if (this.timeoutLastedState) {
                        clearTimeout(this.timeoutLastedState);
                    }
                } else if (this.gltCounting < 10) {
                    this.gltCounting += 1;
                    this.timeoutLastedState = setTimeout(function () {
                        _this5._gotoPanicMode();
                    }, 2000);
                } else {
                    var commandId = this.useShortParam ? data.commandId : data.lastEvent.commandId;
                    cc.log("Mismatch command " + " lasted " + this.lastSuccessCommandId + " current " + commandId);
                    this._gotoDieMode(EventManager.MISMATCH_COMMAND_ID);
                }
            }
        }
    }, {
        key: 'onForceGetLatestedState',
        value: function onForceGetLatestedState() {
            var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.isForceGetLatestedState = isOn;
            cc.log('To click force get latested state: ', isOn);
        }
    }]);

    return GameStateManager;
}();

GameStateManager.STATE_NORMAL = 'NORMAL';
GameStateManager.STATE_PANIC = 'PANIC';
GameStateManager.STATE_DIE = 'DIE';

module.exports = GameStateManager;

cc._RF.pop();