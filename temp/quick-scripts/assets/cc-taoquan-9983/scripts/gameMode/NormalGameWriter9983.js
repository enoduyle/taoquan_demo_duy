(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/gameMode/NormalGameWriter9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30075VeWcZK36u12gZmJzy+', 'NormalGameWriter9983', __filename);
// cc-taoquan-9983/scripts/gameMode/NormalGameWriter9983.js

'use strict';

var SlotGameWriter = require('SlotGameWriter');

var _require = require('utils'),
    findKeyByValue = _require.findKeyByValue;

cc.Class({
    extends: SlotGameWriter,

    makeScriptResume: function makeScriptResume() {
        var listScript = [];
        var data = this.node.gSlotDataStore.playSession;
        var freeGameMatrix = data.freeGameMatrix,
            freeGameRemain = data.freeGameRemain,
            betId = data.betId,
            winAmount = data.winAmount,
            normalGameMatrix = data.normalGameMatrix,
            normalGamePayLines = data.normalGamePayLines;
        var _data$extend = data.extend,
            fsor = _data$extend.fsor,
            fgoi = _data$extend.fgoi,
            fgo = _data$extend.fgo,
            nwm = _data$extend.nwm,
            fwm = _data$extend.fwm;
        var _node$gSlotDataStore = this.node.gSlotDataStore,
            promotion = _node$gSlotDataStore.promotion,
            promotionRemain = _node$gSlotDataStore.promotionRemain,
            promotionTotal = _node$gSlotDataStore.promotionTotal;

        listScript.push({
            command: "_showCutscene",
            data: {
                name: "Resume"
            }
        });

        var steps = this.node.gSlotDataStore.slotBetDataStore.data.steps;

        var listBet = String(betId).split('');
        var betIndex = listBet[0];
        var betValue = steps[betIndex];
        listScript.push({
            command: "_updateBet",
            data: betValue
        });
        listScript.push({
            command: "_disableBet"
        });

        var normalGameTableFormat = this.node.gSlotDataStore.playSession.normalGameTableFormat;

        var normalSpinMatrix = this.node.gSlotDataStore.convertSlotMatrix(normalGameMatrix, normalGameTableFormat);
        var normalPayLines = this.node.gSlotDataStore.convertPayLine(normalGamePayLines);
        listScript.push({
            command: "_updateMatrix",
            data: { matrix: normalSpinMatrix }
        });
        listScript.push({
            command: "_setUpPaylines",
            data: { matrix: normalSpinMatrix, payLines: normalPayLines }
        });

        if (nwm && nwm > 1) {
            listScript.push({
                command: "_resumeMultiply",
                data: nwm
            });
        }
        if (winAmount && winAmount > 0) {
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmount, time: 300 }
            });
        }

        if (fgo && data.freeGameTotal) {
            listScript.push({
                command: "_playSFXCloud2"
            });
            listScript.push({
                command: "_showCutscene",
                data: {
                    name: "CloudTransition",
                    content: {}
                }
            });
            listScript.push({
                command: "_showFreeGameOption",
                data: {
                    name: "FreeGameOption",
                    content: {
                        mode: "free"
                    }
                }
            });
            listScript.push({
                command: "_newGameMode",
                data: { name: "freeGame", data: { fsor: fsor, fgoi: fgoi, fwm: fwm } }
            });
            listScript.push({
                command: "_resumeGameMode",
                data: { name: "normalGame" }
            });
        } else if (fgo) {
            listScript.push({
                command: "_playSFXLenChau"
            });
            listScript.push({
                command: "_showScatterPayLine"
            });

            listScript.push({
                command: "_showCutscene",
                data: {
                    name: "ScatterTransition",
                    content: {
                        matrix: normalSpinMatrix,
                        isNormal: true
                    }
                }
            });
            listScript.push({
                command: "_playSFXCloud1"
            });
            listScript.push({
                command: "_showCutscene",
                data: {
                    name: "CloudTransition",
                    content: {}
                }
            });

            listScript.push({
                command: "_showFreeGameOption",
                data: {
                    name: "FreeGameOption",
                    content: {
                        mode: "normal"
                    }
                }
            });
            listScript.push({
                command: "_newGameMode",
                data: { name: "freeGame", data: { fsor: fsor, fgoi: fgoi, fwm: fwm } }
            });
            listScript.push({
                command: "_resumeGameMode",
                data: { name: "normalGame" }
            });
        } else if (freeGameRemain && freeGameRemain > 0) {
            var freeSpinMatrix = void 0;
            if (freeGameMatrix) {
                var freeGameTableFormat = this.node.gSlotDataStore.playSession.freeGameTableFormat;

                freeSpinMatrix = this.node.gSlotDataStore.convertSlotMatrix(freeGameMatrix, freeGameTableFormat);
            }

            listScript.push({
                command: "_showScatterPayLine"
            });
            if (freeSpinMatrix) {
                freeSpinMatrix[0].unshift("1");
                freeSpinMatrix[4].unshift("1");
            }
            listScript.push({
                command: "_newGameMode",
                data: { name: "freeGame", data: { matrix: freeSpinMatrix, fsor: fsor, fgoi: fgoi, fwm: fwm } }
            });
            listScript.push({
                command: "_resumeGameMode",
                data: { name: "normalGame" }
            });
        }
        if (normalPayLines && normalPayLines.length > 0) {
            listScript.push({
                command: "_showEachPayLine"
            });
        } else {
            listScript.push({
                command: "_clearPaylines"
            });
        }
        listScript.push({
            command: "_resumeWallet"
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
    makeScriptSpinClick: function makeScriptSpinClick() {
        var listScript = [];
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$.currentBetData,
            steps = _node$gSlotDataStore$.steps,
            currentExtraBetData = _node$gSlotDataStore$.currentExtraBetData,
            extraSteps = _node$gSlotDataStore$.extraSteps;
        var winAmount = this.node.gSlotDataStore.playSession.winAmount;

        var betIndex = findKeyByValue(steps, currentBetData);
        var extraBetIndex = findKeyByValue(extraSteps, currentExtraBetData);
        var _node$gSlotDataStore2 = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore2.spinTimes,
            isAutoSpin = _node$gSlotDataStore2.isAutoSpin,
            promotion = _node$gSlotDataStore2.promotion,
            promotionBetId = _node$gSlotDataStore2.promotionBetId,
            promotionRemain = _node$gSlotDataStore2.promotionRemain;

        var availableSpinTimes = '';

        if (promotion && promotionRemain > 0) {
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

        var canISpin = this.node.gSlotDataStore.slotBetDataStore.calculateWalletAfterClickSpin();

        if (canISpin >= 0 || promotion === true) {
            if (canISpin >= 0 && !promotion) {
                this.node.gSlotDataStore.slotBetDataStore.updateWalletAfterClickSpin();
            }
            if (winAmount > 0) {
                listScript.push({
                    command: "_updateLastWin",
                    data: true
                });
            }
            listScript.push({
                command: "_clearPaylines"
            });
            listScript.push({
                command: "_updateSpinTimes",
                data: availableSpinTimes
            });
            listScript.push({
                command: "_updateWallet"
            });
            listScript.push({
                command: '_clearWinAmount'
            });
            listScript.push({
                command: "_showTrialButtons",
                data: false
            });
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
                command: "_disableBet"
            });
            listScript.push({
                command: "_spinClick"
            });
            return listScript;
        } else {
            this.node.gSlotDataStore.spinTimes = 0;
            listScript = [{
                command: "_enableBet"
            }, {
                command: "_resetSpinButton"
            }, {
                command: "_clearPaylines"
            }, {
                command: "_showMessageNoMoney"
            }];
            return listScript;
        }
    },
    makeScriptResultReceive: function makeScriptResultReceive() {
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.lastEvent,
            matrix = _node$gSlotDataStore$2.matrix,
            subSym1 = _node$gSlotDataStore$2.subSym1,
            subSym2 = _node$gSlotDataStore$2.subSym2,
            nwm = _node$gSlotDataStore$2.nwm,
            type = _node$gSlotDataStore$2.type,
            fsoi = _node$gSlotDataStore$2.fsoi,
            jpInfo = _node$gSlotDataStore$2.jpInfo;

        if (type == 'freeSpinOptionResult') {
            this.node.gSlotDataStore.fsoi = fsoi;
            var listScript = [];
            listScript.push({
                command: "_hideCutscene",
                data: {
                    name: "FreeGameOption"
                }
            });
            return listScript;
        } else {
            var _listScript = [];
            if (jpInfo) {
                var jackpotInfoArr = jpInfo.split(';');
                var jackpotAmount = Number(jackpotInfoArr[1]);
                var jackpotId = jackpotInfoArr[0];
                _listScript.push({
                    command: "_updateValueJP",
                    data: {
                        isGrand: jackpotId == '0' ? true : false,
                        value: jackpotAmount
                    }
                });
                _listScript.push({
                    command: "_pauseUpdateJP"
                });
            }
            _listScript.push({
                command: "_resultReceive",
                data: { matrix: matrix, subSym1: subSym1, subSym2: subSym2, nwm: nwm }
            });
            _listScript.push({
                command: "_showResult",
                data: matrix
            });
            return _listScript;
        }
    },
    makeScriptShowResults: function makeScriptShowResults() {
        var listScript = [];
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.lastEvent,
            payLines = _node$gSlotDataStore$3.payLines,
            matrix = _node$gSlotDataStore$3.matrix,
            fgo = _node$gSlotDataStore$3.fgo,
            jpInfo = _node$gSlotDataStore$3.jpInfo;


        listScript.push({
            command: "_clearPaylines"
        });
        listScript.push({
            command: "_setUpPaylines",
            data: { matrix: matrix, payLines: payLines }
        });
        if (!jpInfo) {
            listScript.push({
                command: "_hideSubSymbolPayLine"
            });
        } else {
            var jackpotInfoArr = jpInfo.split(';');
            var jackpotAmount = Number(jackpotInfoArr[1]);
            var jackpotId = jackpotInfoArr[0];

            listScript.push({
                command: "_showSubSymbolPayLine",
                data: jackpotId
            });

            listScript.push({
                command: "_showUnskippedCutscene",
                data: {
                    name: "JackpotWin",
                    content: {
                        jackpotId: jackpotId,
                        jackpotAmount: jackpotAmount
                    }
                }
            });

            listScript.push({
                command: "_addWinningAmount",
                data: { winAmount: jackpotAmount, time: 300 }
            });
            listScript.push({
                command: "_resumeUpdateJP"
            });
            listScript.push({
                command: "_hideSubSymbolPayLine"
            });
        }

        if (fgo) {

            this.scriptNormalGameAndFreeGameOption(listScript);
        } else if (payLines && payLines.length > 0) {
            this.scriptNormalGame(listScript);
        } else {
            listScript.push({
                command: "_clearPaylines"
            });
            listScript.push({
                command: "_gameRestart"
            });
        }

        return listScript;
    },


    //Function Support
    scriptNormalGameAndFreeGameOption: function scriptNormalGameAndFreeGameOption(listScript) {
        var _node$gSlotDataStore$4 = this.node.gSlotDataStore.lastEvent,
            payLines = _node$gSlotDataStore$4.payLines,
            winAmount = _node$gSlotDataStore$4.winAmount,
            jpInfo = _node$gSlotDataStore$4.jpInfo,
            nwm = _node$gSlotDataStore$4.nwm,
            matrix = _node$gSlotDataStore$4.matrix;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;
        var spinTimes = this.node.gSlotDataStore.spinTimes;

        var winAmountPlaySession = this.node.gSlotDataStore.playSession.winAmount;

        if (payLines && payLines.length > 0) {
            var showBigWin = winAmount && winAmount >= currentBetData * 10 && !jpInfo;
            if (showBigWin) {
                listScript.push({
                    command: "_showAllPayLine"
                });
                if (nwm && nwm > 1) {
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                isNormal: true,
                                nwm: nwm,
                                isShowBigwin: showBigWin
                            }
                        }
                    });
                    listScript.push({
                        command: "_animMultiplierWild",
                        data: {
                            nwm: nwm,
                            isShowBigwin: showBigWin
                        }
                    });
                }
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
                listScript.push({
                    command: "_addWinningAmount",
                    data: { winAmount: winAmount, time: 300 }
                });
            } else {
                if (nwm && nwm > 1) {
                    listScript.push({
                        command: "_showAllPayLine"
                    });
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                isNormal: true,
                                nwm: nwm,
                                isShowBigwin: showBigWin
                            }
                        }
                    });
                    listScript.push({
                        command: "_animMultiplierWild",
                        data: {
                            nwm: nwm,
                            isShowBigwin: showBigWin
                        }
                    });
                } else {
                    listScript.push({
                        command: "_showAllPayLineSync"
                    });
                }
                if (winAmount && winAmount < currentBetData * 10) {
                    listScript.push({
                        command: "_showSoundWinAnimation",
                        data: {
                            currentBetData: currentBetData,
                            winAmount: winAmount
                        }
                    });
                }
            }
            listScript.push({
                command: "_showEachPayLineSync"
            });
        }
        if (winAmountPlaySession) {
            listScript.push({
                command: "_addWinningAmount",
                data: { winAmount: winAmountPlaySession, time: 300 }
            });
        }

        listScript.push({
            command: "_playSFXLenChau"
        });
        listScript.push({
            command: "_showScatterPayLine"
        });

        listScript.push({
            command: "_showCutscene",
            data: {
                name: "ScatterTransition",
                content: {
                    matrix: matrix,
                    isNormal: true
                }
            }
        });
        listScript.push({
            command: "_playSFXCloud1"
        });
        listScript.push({
            command: "_showCutscene",
            data: {
                name: "CloudTransition",
                content: {}
            }
        });

        listScript.push({
            command: "_showFreeGameOption",
            data: {
                name: "FreeGameOption",
                content: {
                    mode: "normal"
                }
            }
        });
        listScript.push({
            command: "_newGameMode",
            data: { name: "freeGame", data: matrix }
        });
        listScript.push({
            command: "_resumeGameMode",
            data: { name: "normalGame" }
        });
        if (spinTimes && spinTimes > 0) {
            listScript.push({
                command: "_resumeSpinTime",
                data: spinTimes
            });
        }

        if (payLines && payLines.length > 0) {
            listScript.push({
                command: "_showEachPayLine"
            });
        } else {
            listScript.push({
                command: "_clearPaylines"
            });
        }
        listScript.push({
            command: "_updateWallet"
        });
        listScript.push({
            command: "_gameRestart"
        });
    },
    scriptNormalGame: function scriptNormalGame(listScript) {
        var _node$gSlotDataStore$5 = this.node.gSlotDataStore.lastEvent,
            payLines = _node$gSlotDataStore$5.payLines,
            winAmount = _node$gSlotDataStore$5.winAmount,
            jpInfo = _node$gSlotDataStore$5.jpInfo,
            nwm = _node$gSlotDataStore$5.nwm,
            matrix = _node$gSlotDataStore$5.matrix;

        var winAmountPlaySession = this.node.gSlotDataStore.playSession.winAmount;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;
        var _node$gSlotDataStore3 = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore3.spinTimes,
            gameSpeed = _node$gSlotDataStore3.gameSpeed;

        var isFTR = gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;

        if (spinTimes && spinTimes > 0) {
            listScript.push({
                command: "_resumeSpinTime",
                data: spinTimes
            });
        }
        if (payLines && payLines.length > 0) {
            var showBigWin = winAmount && winAmount >= currentBetData * 10 && !jpInfo;
            if (showBigWin) {
                listScript.push({
                    command: "_showAllPayLine"
                });
                if (nwm && nwm > 1) {
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                isNormal: true,
                                nwm: nwm,
                                isShowBigwin: showBigWin
                            }
                        }
                    });
                    listScript.push({
                        command: "_animMultiplierWild",
                        data: {
                            nwm: nwm,
                            isShowBigwin: showBigWin
                        }
                    });
                    if (showBigWin && !this.node.gSlotDataStore.modeTurbo) {
                        listScript.push({
                            command: "_delayTimeScript",
                            data: 1.5
                        });
                    }
                }
                listScript.push({
                    command: "_showWinEffect",
                    data: {
                        name: "WinEffect",
                        content: {
                            winAmount: winAmount,
                            currentBetData: currentBetData
                        }
                    }
                });
                if (!this.node.gSlotDataStore.modeTurbo && !isFTR) {
                    listScript.push({
                        command: "_updateWinningAmountSync",
                        data: { winAmount: winAmountPlaySession, time: 300 }
                    });
                }
            } else {
                if (nwm && nwm > 1) {
                    listScript.push({
                        command: "_showAllPayLine"
                    });
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                isNormal: true,
                                nwm: nwm,
                                isShowBigwin: showBigWin
                            }
                        }
                    });
                    listScript.push({
                        command: "_animMultiplierWild",
                        data: {
                            nwm: nwm,
                            isShowBigwin: showBigWin
                        }
                    });
                } else {
                    listScript.push({
                        command: "_showAllPayLineSync"
                    });
                }
                if (winAmount && winAmount < currentBetData * 10) {
                    listScript.push({
                        command: "_showSoundWinAnimation",
                        data: {
                            currentBetData: currentBetData,
                            winAmount: winAmount
                        }
                    });
                }
            }
            listScript.push({
                command: "_showEachPayLine"
            });
        } else {
            listScript.push({
                command: "_clearPaylines"
            });
        }
        if (winAmount > 0) {
            listScript.push({
                command: "_updateWinningAmountSync",
                data: { winAmount: winAmountPlaySession, time: isFTR ? 50 : 300 }
            });
        }
        listScript.push({
            command: "_pauseWallet"
        });
        listScript.push({
            command: "_gameRestart"
        });
    },
    makeScriptGameRestart: function makeScriptGameRestart() {
        var listScript = [];
        var _node$gSlotDataStore4 = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore4.spinTimes,
            isAutoSpin = _node$gSlotDataStore4.isAutoSpin,
            promotion = _node$gSlotDataStore4.promotion,
            promotionRemain = _node$gSlotDataStore4.promotionRemain;


        if (promotion) {
            listScript.push({
                command: "_resetPromotionButtons"
            });
        }
        if (spinTimes && spinTimes > 0 && !promotion) {
            listScript.push({
                command: "_runAutoSpin"
            });
        } else {
            if (!promotionRemain || promotionRemain <= 0) {
                listScript.push({
                    command: "_enableBet"
                });
                listScript.push({
                    command: "_exitPromotionMode"
                });
            }
            if (isAutoSpin) {
                this.node.gSlotDataStore.isAutoSpin = false;
                listScript.push({
                    command: "_resetSpinButton"
                });
            }
        }
        listScript.push({
            command: "_runAsyncScript"
        });
        return listScript;
    },
    makeScriptSetUpBet: function makeScriptSetUpBet(value) {
        return [{
            command: "_updateBet",
            data: value
        }];
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
        //# sourceMappingURL=NormalGameWriter9983.js.map
        