(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotGameWriter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '469aav5mu1LDY5i7MZGvSnX', 'ExtendSlotGameWriter', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotGameWriter.js

'use strict';

var StateGameMode = {
    NormalGame: 1,
    FreeGame: 2,
    FreespinOption: 3,
    BonusGame: 4,
    Others: 9
};

cc.Class({
    extends: require('SlotGameWriter'),

    makeScriptResultReceive: function makeScriptResultReceive() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.playSession,
            matrix = _node$gSlotDataStore$.matrix,
            jackpot = _node$gSlotDataStore$.jackpot,
            state = _node$gSlotDataStore$.state;


        var listScript = [];

        if (jackpot && state !== StateGameMode.FreespinOption) {
            var jpInfo = jackpot[jackpot.length - 1].split(';');
            var jpType = jpInfo[0].split('_')[2];
            listScript.push({
                command: "_updateValueJP",
                data: {
                    jpValue: Number(jpInfo[1]),
                    jpType: jpType
                }
            });
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
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.playSession,
            state = _node$gSlotDataStore$2.state,
            matrix = _node$gSlotDataStore$2.matrix,
            winAmount = _node$gSlotDataStore$2.winAmount,
            payLines = _node$gSlotDataStore$2.payLines,
            payLineJackPot = _node$gSlotDataStore$2.payLineJackPot,
            freeSpinOption = _node$gSlotDataStore$2.freeSpinOption,
            jackpot = _node$gSlotDataStore$2.jackpot,
            bonusGame = _node$gSlotDataStore$2.bonusGame,
            freeGame = _node$gSlotDataStore$2.freeGame,
            winAmountPS = _node$gSlotDataStore$2.winAmountPS,
            freeGameRemain = _node$gSlotDataStore$2.freeGameRemain;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        var listScript = [];
        var isBigwin = winAmount && winAmount >= currentBetData * 20 && !isJackpotWin;
        var isJackpotWin = jackpot && jackpot.length > 0;
        this.isFastResult = false;

        if (state === StateGameMode.FreespinOption) {
            listScript.push({
                command: "_hideCutscene",
                data: {
                    name: "FreeGameOption"
                }
            });
        } else {
            listScript.push({
                command: "_setUpPaylines",
                data: { matrix: matrix, payLines: payLines }
            });
        }

        if (isJackpotWin) {
            listScript.push({
                command: "_showJackpotPayLine",
                data: payLineJackPot
            });
            var jpInfo = jackpot[jackpot.length - 1].split(';');
            var jpType = jpInfo[0].split('_')[2];
            listScript.push({
                command: "_showUnskippedCutscene",
                data: {
                    name: "JackpotWin",
                    content: {
                        winAmount: Number(jpInfo[1]),
                        jackpotType: jpType
                    }
                }
            });
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: Number(jpInfo[1]), time: 100 }
            });
            listScript.push({
                command: "_resumeUpdateJP"
            });
        } else if (isBigwin) {
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
        if (state == StateGameMode.NormalGame) {
            var spinTimes = this.node.gSlotDataStore.spinTimes;

            if (bonusGame && bonusGame > 0) {
                listScript.push({ command: '_updateLastWin', data: false });
                if (winAmount && winAmount > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPS,
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
                    if (winAmountPS && winAmountPS > 0) {
                        listScript.push({
                            command: '_updateWinningAmount',
                            data: { winAmount: winAmountPS, time: 10 }
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
            listScript.push({
                command: "_gameRestart"
            });
        } else if (state == StateGameMode.FreeGame) {
            if (bonusGame && bonusGame > 0) {
                if (winAmount && winAmount > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPS,
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
                if (winAmountPS && winAmountPS > 0) {
                    listScript.push({
                        command: '_updateWinningAmount',
                        data: {
                            winAmount: winAmountPS,
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
    makeScriptGameRestart: function makeScriptGameRestart() {
        var listScript = [];
        var freeGameRemain = this.node.gSlotDataStore.playSession.freeGameRemain;
        var _node$gSlotDataStore = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore.spinTimes,
            promotion = _node$gSlotDataStore.promotion,
            promotionRemain = _node$gSlotDataStore.promotionRemain;


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
        listScript.push({
            command: "_runAsyncScript"
        });
        return listScript;
    },
    scriptUpdateWinAmount: function scriptUpdateWinAmount(listScript) {
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.playSession,
            winAmount = _node$gSlotDataStore$3.winAmount,
            winAmountPS = _node$gSlotDataStore$3.winAmountPS;

        if (winAmount && winAmount > 0) {
            if (winAmountPS == winAmount) {
                listScript.push({
                    command: "_clearWinAmount"
                });
            }
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmountPS, time: 300 }
            });
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
        //# sourceMappingURL=ExtendSlotGameWriter.js.map
        