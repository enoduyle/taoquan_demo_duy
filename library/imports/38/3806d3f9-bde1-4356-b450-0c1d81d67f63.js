"use strict";
cc._RF.push(module, '3806dP5veFDVrRQDB2B1n9j', 'SlotGameWriter');
// cc-common/cc-slotbase-v2/slotGame/SlotGameWriter.js

'use strict';

var _require = require('utils'),
    findKeyByValue = _require.findKeyByValue,
    floatUtils = _require.floatUtils;

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.writer = this;
    },
    makeScriptResume: function makeScriptResume() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.playSession,
            normalGameTableFormat = _node$gSlotDataStore$.normalGameTableFormat,
            bonusGameMatrix = _node$gSlotDataStore$.bonusGameMatrix,
            normalGameMatrix = _node$gSlotDataStore$.normalGameMatrix,
            normalGamePayLines = _node$gSlotDataStore$.normalGamePayLines,
            bonusGameRemain = _node$gSlotDataStore$.bonusGameRemain,
            freeGameRemain = _node$gSlotDataStore$.freeGameRemain,
            freeGameMatrix = _node$gSlotDataStore$.freeGameMatrix,
            winAmount = _node$gSlotDataStore$.winAmount,
            betId = _node$gSlotDataStore$.betId,
            freeGameTableFormat = _node$gSlotDataStore$.freeGameTableFormat,
            currentBonusCredits = _node$gSlotDataStore$.currentBonusCredits,
            isFinished = _node$gSlotDataStore$.isFinished;
        var freeSpinOption = this.node.gSlotDataStore.playSession.extend.fsor;

        var normalSpinMatrix = this.node.gSlotDataStore.convertSlotMatrix(normalGameMatrix, normalGameTableFormat);
        var normalPayLines = this.node.gSlotDataStore.convertPayLine(normalGamePayLines);
        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;

        var listBet = String(betId).split('');
        var betIndex = listBet[0];
        var betValue = steps[betIndex];
        var isBonusGameInNormal = bonusGameRemain && bonusGameRemain > 0 && !freeGameMatrix;
        var isBonusGameInFree = bonusGameRemain && bonusGameRemain > 0 && !isBonusGameInNormal;
        var isFreeGame = freeGameRemain && freeGameRemain > 0 || isBonusGameInFree;
        var _node$gSlotDataStore = this.node.gSlotDataStore,
            promotion = _node$gSlotDataStore.promotion,
            promotionRemain = _node$gSlotDataStore.promotionRemain,
            promotionTotal = _node$gSlotDataStore.promotionTotal;


        var listScript = [];

        listScript.push({
            command: "_updateBet",
            data: betValue
        });
        listScript.push({
            command: "_disableBet"
        });
        listScript.push({
            command: "_showTrialButtons",
            data: false
        });
        listScript.push({
            command: "_updateBet",
            data: betValue
        });
        listScript.push({
            command: "_updateMatrix",
            data: { matrix: normalSpinMatrix }
        });
        listScript.push({
            command: "_setUpPaylines",
            data: { matrix: normalSpinMatrix, payLines: normalPayLines }
        });
        if (!isFinished) {
            listScript.push({
                command: "_hideAnimIntro"
            });
        }
        var updatedWinAmount = winAmount - betValue * currentBonusCredits;
        if (updatedWinAmount && updatedWinAmount > 0) {
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: updatedWinAmount, time: 0 }
            });
        }
        if (isBonusGameInNormal) {
            listScript.push({
                command: "_showBonusPayLine"
            });
            listScript.push({
                command: "_newGameMode",
                data: {
                    name: "bonusGame",
                    data: bonusGameMatrix
                }
            });
            listScript.push({
                command: "_resumeGameMode",
                data: { name: "normalGame" }
            });
        }
        if (freeSpinOption && freeSpinOption > 0) {
            listScript.push({
                command: "_showScatterPayLine"
            });
            listScript.push({
                command: "_showCutscene",
                data: {
                    name: "FreeGameOption"
                }
            });
        }
        if (isFreeGame || isBonusGameInFree) {
            var freeSpinMatrix = normalSpinMatrix;
            if (freeGameMatrix) {
                freeSpinMatrix = this.node.gSlotDataStore.convertSlotMatrix(freeGameMatrix, freeGameTableFormat);
            }
            listScript.push({
                command: "_showScatterPayLine"
            });
            if (isBonusGameInFree) {
                listScript.push({
                    command: "_newGameMode",
                    data: {
                        name: "bonusGame",
                        data: bonusGameMatrix
                    }
                });
            }
            if (freeGameRemain && freeGameRemain > 0) listScript.push({
                command: "_newGameMode",
                data: { name: "freeGame", data: freeSpinMatrix }
            });
            listScript.push({
                command: "_resumeGameMode",
                data: { name: "normalGame" }
            });
        }
        if (normalPayLines && normalPayLines.length > 0) {
            listScript.push({
                command: "_showNormalSymbolPayLine"
            });
        } else {
            listScript.push({
                command: "_clearPaylines"
            });
        }
        listScript.push({
            command: "_gameFinish"
        });
        listScript.push({
            command: "_gameRestart"
        });

        if (promotion === true && promotionRemain && promotionTotal && promotionRemain > 0) {
            listScript.push({
                command: "_showPromotionPopup"
            });
        }

        return listScript;
    },
    makeScriptUpdateWalletData: function makeScriptUpdateWalletData(wallet) {
        var listScript = [];
        var currentWallet = this.node.gSlotDataStore.slotBetDataStore.data.wallet;

        if (!floatUtils.isEqual(currentWallet, wallet)) {
            listScript.push({
                command: "_updateWallet"
            });
            this.node.gSlotDataStore.slotBetDataStore.updateWallet(wallet);
        }
        return listScript;
    },
    makeScriptGameStart: function makeScriptGameStart() {
        var listScript = [];

        listScript.push({
            command: "_gameStart"
        });
        return listScript;
    },
    makeScriptSwitchMode: function makeScriptSwitchMode() {
        this.node.gSlotDataStore.playSession.winAmount = 0;
        var listScript = [];
        listScript.push({
            command: "_forceToClearPaylines"
        });
        listScript.push({
            command: "_updateLastWin",
            data: false
        });
        listScript.push({
            command: "_clearWinAmount"
        });
        listScript.push({
            command: "_updateJackpot"
        });
        return listScript;
    },
    makeScriptSpinClick: function makeScriptSpinClick() {
        var listScript = [];
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$2.currentBetData,
            steps = _node$gSlotDataStore$2.steps,
            currentExtraBetData = _node$gSlotDataStore$2.currentExtraBetData,
            extraSteps = _node$gSlotDataStore$2.extraSteps;

        var betIndex = findKeyByValue(steps, currentBetData);
        var extraBetIndex = findKeyByValue(extraSteps, currentExtraBetData);
        var _node$gSlotDataStore2 = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore2.spinTimes,
            isAutoSpin = _node$gSlotDataStore2.isAutoSpin,
            promotion = _node$gSlotDataStore2.promotion,
            promotionBetId = _node$gSlotDataStore2.promotionBetId,
            promotionRemain = _node$gSlotDataStore2.promotionRemain;
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.playSession,
            freeGameRemain = _node$gSlotDataStore$3.freeGameRemain,
            winAmount = _node$gSlotDataStore$3.winAmount;

        var availableSpinTimes = '';
        var totalBetAmount = this._getTotalBetAmount();

        if (freeGameRemain && freeGameRemain > 0) {
            availableSpinTimes = freeGameRemain - 1;
        } else if (promotion && promotionRemain > 0) {
            availableSpinTimes = promotionRemain - 1;
            listScript.push({
                command: "_updatePromotionRemain",
                data: availableSpinTimes
            });
        } else if (isAutoSpin) {
            if (spinTimes && spinTimes > 0) {
                availableSpinTimes = spinTimes - 1;
            }
        } else {
            availableSpinTimes = 0;
        }
        this.node.gSlotDataStore.spinTimes = availableSpinTimes;

        var canISpin = this.node.gSlotDataStore.slotBetDataStore.calculateWalletAfterClickSpin(totalBetAmount);
        listScript.push({
            command: "_showTrialButtons",
            data: false
        });
        if (this.node.mainDirector.trialMode) {
            if (this._canSpinTrial()) {
                if (winAmount > 0 && (!freeGameRemain || freeGameRemain <= 0) && !promotion) {
                    listScript.push({
                        command: "_updateLastWin",
                        data: true
                    });
                }
                if (!freeGameRemain) listScript.push({
                    command: '_clearWinAmount'
                });
                listScript.push({
                    command: "_clearPaylines"
                });
                listScript.push({
                    command: "_updateSpinTimes",
                    data: availableSpinTimes
                });
                if (!freeGameRemain) {
                    listScript.push({
                        command: "_updateWalletOnTrialSpinClick"
                    });
                }
                if (!promotion) {
                    listScript.push({
                        command: "_sendSpinToNetwork",
                        data: { currentBetData: betIndex + "" + extraBetIndex }
                    });
                }

                listScript.push({
                    command: "_disableBet"
                });
                listScript.push({
                    command: "_spinClick"
                });
                return listScript;
            } else {
                this.node.gSlotDataStore.spinTimes = 0;
                this.node.gSlotDataStore.isAutoSpin = false;
                listScript = [{
                    command: "_enableBet"
                }, {
                    command: "_clearPaylines"
                }, {
                    command: '_resetSpinButton'
                }, {
                    command: "_showTrialButtons",
                    data: true
                }, {
                    command: "_showMessageNoMoney"
                }];
                return listScript;
            }
        } else if (canISpin >= 0 || freeGameRemain > 0 || promotion === true) {
            if (canISpin >= 0 && !promotion && !freeGameRemain) {
                this.node.gSlotDataStore.slotBetDataStore.updateWalletAfterClickSpin(totalBetAmount);
            }
            listScript.push({
                command: '_disableBet'
            });
            if (winAmount > 0 && (!freeGameRemain || freeGameRemain <= 0)) {
                listScript.push({
                    command: '_updateLastWin',
                    data: true
                });
            }
            listScript.push({
                command: "_clearPaylines"
            });
            if (!freeGameRemain) listScript.push({
                command: '_clearWinAmount'
            });
            listScript.push({
                command: "_updateSpinTimes",
                data: availableSpinTimes
            });
            if (!freeGameRemain) {
                listScript.push({
                    command: "_updateWallet"
                });
            }
            if (promotion) {
                listScript.push({
                    command: "_sendSpinToNetwork",
                    data: { currentBetData: promotionBetId }
                });
            } else {
                listScript.push({
                    command: "_sendSpinToNetwork",
                    data: { currentBetData: betIndex + "" + extraBetIndex }
                });
            }
            listScript.push({
                command: "_spinClick"
            });
        } else {
            this.node.gSlotDataStore.spinTimes = 0;
            this.node.gSlotDataStore.isAutoSpin = false;
            listScript = [{
                command: "_enableBet"
            }, {
                command: "_clearPaylines"
            }, {
                command: '_resetSpinButton'
            }, {
                command: "_showTrialButtons",
                data: true
            }, {
                command: "_showMessageNoMoney"
            }];
        }
        return listScript;
    },
    makeScriptResultReceive: function makeScriptResultReceive() {
        var _node$gSlotDataStore$4 = this.node.gSlotDataStore.lastEvent,
            matrix = _node$gSlotDataStore$4.matrix,
            jpInfo = _node$gSlotDataStore$4.jpInfo;


        var listScript = [];

        if (jpInfo) {
            listScript.push({
                command: "_pauseUpdateJP"
            });
        }

        listScript.push({
            command: "_resultReceive",
            data: matrix
        });

        listScript.push({
            command: "_showResult",
            data: matrix
        });

        return listScript;
    },
    makeScriptShowResults: function makeScriptShowResults() {
        var _node$gSlotDataStore$5 = this.node.gSlotDataStore.lastEvent,
            type = _node$gSlotDataStore$5.type,
            matrix = _node$gSlotDataStore$5.matrix,
            winAmount = _node$gSlotDataStore$5.winAmount,
            payLines = _node$gSlotDataStore$5.payLines,
            payLineJackPot = _node$gSlotDataStore$5.payLineJackPot,
            bonusGame = _node$gSlotDataStore$5.bonusGame,
            freeGame = _node$gSlotDataStore$5.freeGame;
        var _node$gSlotDataStore$6 = this.node.gSlotDataStore.playSession,
            winAmountPlaySession = _node$gSlotDataStore$6.winAmount,
            freeGameRemain = _node$gSlotDataStore$6.freeGameRemain,
            winJackpotAmount = _node$gSlotDataStore$6.winJackpotAmount;
        var freeSpinOption = this.node.gSlotDataStore.playSession.extend.fsor;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        var listScript = [];
        var isSessionEnded = !bonusGame && !freeGameRemain;
        var isBigwin = winAmount && winAmount >= currentBetData * 20 && !isJackpotWin;
        var isJackpotWin = winJackpotAmount && winJackpotAmount > 0;
        var _node$gSlotDataStore3 = this.node.gSlotDataStore,
            isAutoSpin = _node$gSlotDataStore3.isAutoSpin,
            modeTurbo = _node$gSlotDataStore3.modeTurbo;

        this.isFastResult = false;

        if (type != 'freeGameOptionResult') {
            listScript.push({
                command: "_setUpPaylines",
                data: { matrix: matrix, payLines: payLines }
            });
        } else {
            listScript.push({
                command: "_hideCutscene",
                data: {
                    name: "FreeGameOption"
                }
            });
        }

        //TODO: jackpot
        if (isJackpotWin) {
            listScript.push({
                command: "_showJackpotPayLine",
                data: payLineJackPot
            });
            listScript.push({
                command: "_showUnskippedCutscene",
                data: {
                    name: "JackpotWin",
                    content: {
                        winAmount: winJackpotAmount,
                        currentBetData: currentBetData
                    }
                }
            });
            listScript.push({
                command: "_resumeUpdateJP"
            });
        } else {
            if (isBigwin) {
                if (isSessionEnded && modeTurbo && !isAutoSpin && !this.isFastResult) {
                    this.isFastResult = true;
                    listScript.push({
                        command: "_gameRestart"
                    });
                }

                listScript.push({
                    command: "_blinkAllPaylines"
                });
                listScript.push({
                    command: "_showCutscene",
                    data: {
                        name: "WinEffect",
                        content: {
                            winAmount: winAmount,
                            currentBetData: currentBetData
                        }
                    }
                });
            }
        }

        if (type == "normalGame") {
            var spinTimes = this.node.gSlotDataStore.spinTimes;

            if (bonusGame && bonusGame > 0) {
                listScript.push({ command: '_updateLastWin', data: false });
                if (winAmount && winAmount > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPlaySession,
                            time: 300
                        }
                    });
                } else {
                    listScript.push({
                        command: '_clearWinAmount'
                    });
                }
                listScript.push({
                    command: "_showBonusPayLine"
                });
                listScript.push({
                    command: "_newGameMode",
                    data: { name: "bonusGame" }
                });
                listScript.push({
                    command: "_resumeGameMode",
                    data: { name: "normalGame" }
                });
                if (!freeGame && spinTimes && spinTimes > 0) {
                    listScript.push({
                        command: "_resumeSpinTime",
                        data: spinTimes
                    });
                }
            }

            if (freeSpinOption && freeSpinOption > 0 || freeGame && freeGame > 0) {
                var _spinTimes = this.node.gSlotDataStore.spinTimes;

                listScript.push({
                    command: '_updateLastWin',
                    data: false
                });
                if (!bonusGame) {
                    if (winAmountPlaySession && winAmountPlaySession > 0) {
                        listScript.push({
                            command: '_updateWinningAmount',
                            data: { winAmount: winAmountPlaySession, time: 10 }
                        });
                    } else {
                        listScript.push({
                            command: '_clearWinAmount'
                        });
                    }
                }
                listScript.push({
                    command: "_showScatterPayLine"
                });
                if (freeSpinOption && freeSpinOption > 0) {
                    listScript.push({
                        command: "_showCutscene",
                        data: {
                            name: "FreeGameOption"
                        }
                    });
                }
                listScript.push({
                    command: "_newGameMode",
                    data: { name: "freeGame", data: matrix }
                });
                listScript.push({
                    command: "_resumeGameMode",
                    data: { name: "normalGame" }
                });

                if (_spinTimes && _spinTimes > 0) {
                    listScript.push({
                        command: "_resumeSpinTime",
                        data: _spinTimes
                    });
                }
            }
            if (!isAutoSpin && !this.isFastResult) {
                if (!isBigwin || !isSessionEnded || !modeTurbo) {
                    this.isFastResult = true;
                    listScript.push({
                        command: "_gameRestart"
                    });
                }
            }
            if (payLines && payLines.length > 0) {
                if (!isBigwin) {
                    listScript.push({
                        command: "_blinkAllPaylines"
                    });
                }
                listScript.push({
                    command: "_showNormalPayline"
                });
            } else {
                listScript.push({
                    command: "_clearPaylines"
                });
            }
            listScript.push({
                command: "_gameEnd"
            });
            listScript.push({
                command: "_gameFinish"
            });
            if (!this.isFastResult) {
                listScript.push({
                    command: "_gameRestart"
                });
            }
        } else if (type == "freeGame") {
            if (bonusGame && bonusGame > 0) {
                if (winAmount && winAmount > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPlaySession,
                            time: 300
                        }
                    });
                }
                listScript.push({
                    command: "_showBonusPayLine"
                });
                listScript.push({
                    command: "_newGameMode",
                    data: { name: "bonusGame" }
                });
                listScript.push({
                    command: "_resumeGameMode",
                    data: { name: "freeGame" }
                });
            }

            if (payLines && payLines.length > 0) {
                listScript.push({
                    command: "_blinkAllPaylines"
                });
                listScript.push({
                    command: "_showFreePayline"
                });
            } else {
                listScript.push({
                    command: "_clearPaylines"
                });
            }
            listScript.push({
                command: "_gameEnd"
            });

            if (!freeGameRemain || freeGameRemain <= 0) {
                if (winAmountPlaySession && winAmountPlaySession > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPlaySession,
                            time: 300
                        }
                    });
                }
                listScript.push({
                    command: "_delayTimeScript",
                    data: 0.3
                });
                listScript.push({
                    command: "_showUnskippedCutscene",
                    data: {
                        name: "TotalWinPanel",
                        content: {}
                    }
                });
                listScript.push({
                    command: "_gameExit"
                });
            } else {
                listScript.push({
                    command: "_gameRestart"
                });
            }
        }

        return listScript;
    },
    makeScriptGameEnd: function makeScriptGameEnd() {
        return [];
    },
    makeScriptGameFinish: function makeScriptGameFinish() {
        var winAmount = this.node.gSlotDataStore.playSession.winAmount;

        var listScript = [];

        if (this.node.mainDirector.trialMode && winAmount) {
            listScript.push({
                command: '_updateTrialWallet',
                data: winAmount
            });
        }

        return listScript;
    },
    makeScriptSetUpBet: function makeScriptSetUpBet(value) {
        return [{
            command: "_updateBet",
            data: value
        }];
    },
    scriptUpdateWinAmount: function scriptUpdateWinAmount(listScript) {
        var winAmountPlaySession = this.node.gSlotDataStore.playSession.winAmount;
        var winAmount = this.node.gSlotDataStore.lastEvent.winAmount;

        if (winAmount && winAmount > 0) {
            if (winAmountPlaySession == winAmount) {
                listScript.push({
                    command: "_clearWinAmount"
                });
                listScript.push({
                    command: "_updateLastWin",
                    data: false
                });
            }
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmountPlaySession, time: 300 }
            });
        }
    },
    makeScriptGameRestart: function makeScriptGameRestart() {
        var listScript = [];
        var freeGameRemain = this.node.gSlotDataStore.playSession.freeGameRemain;
        var _node$gSlotDataStore4 = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore4.spinTimes,
            promotion = _node$gSlotDataStore4.promotion,
            promotionRemain = _node$gSlotDataStore4.promotionRemain;


        this.scriptUpdateWinAmount(listScript);
        if (promotion && promotion > 0) {
            listScript.push({
                command: "_showTrialButtons",
                data: false
            });
            listScript.push({
                command: "_resetPromotionButtons"
            });
        }

        if (spinTimes && spinTimes > 0) {
            if (freeGameRemain && freeGameRemain > 0) {
                listScript.push({
                    command: "_runAutoSpin"
                });
            } else if (!promotion) {
                listScript.push({
                    command: "_runAutoSpin"
                });
            }
        } else {
            if (!promotionRemain || promotionRemain <= 0) {
                listScript.push({
                    command: '_enableBet'
                });
                listScript.push({
                    command: "_exitPromotionMode"
                });
                listScript.push({
                    command: "_showTrialButtons",
                    data: true
                });
            }
        }
        return listScript;
    },


    //AUTO SPINS
    makeScriptSpinByTimes: function makeScriptSpinByTimes(times) {
        this.node.gSlotDataStore.isAutoSpin = true;
        this.node.gSlotDataStore.spinTimes = times;
        return [{
            command: "_runAutoSpin"
        }];
    },
    makeScriptDisableAutoSpin: function makeScriptDisableAutoSpin() {
        this.node.gSlotDataStore.isAutoSpin = false;
        this.node.gSlotDataStore.spinTimes = 0;
        var listScript = [];
        listScript.push({
            command: "_updateSpinTimes",
            data: 0
        });
        return listScript;
    },
    _canSpinTrial: function _canSpinTrial() {
        var freeGameRemain = this.node.gSlotDataStore.playSession.freeGameRemain;

        if (freeGameRemain) return true;
        if (!this.node.gSlotDataStore.isPlayDemo) return true;
        var trialWallet = this.node.gSlotDataStore.trialWallet;

        var totalBet = this._getTotalBetAmount();
        return trialWallet >= totalBet;
    },
    _getTotalBetAmount: function _getTotalBetAmount() {
        var _node$gSlotDataStore$7 = this.node.gSlotDataStore.slotBetDataStore.data,
            displayingBetData = _node$gSlotDataStore$7.displayingBetData,
            currentExtraBetData = _node$gSlotDataStore$7.currentExtraBetData,
            currentBetData = _node$gSlotDataStore$7.currentBetData;

        if (displayingBetData) return displayingBetData;
        if (currentExtraBetData && currentBetData) return currentExtraBetData * currentBetData;
        if (currentBetData) return currentBetData;
        return 0;
    }
});

cc._RF.pop();