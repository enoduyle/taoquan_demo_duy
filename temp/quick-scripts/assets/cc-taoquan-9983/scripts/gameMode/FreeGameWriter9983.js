(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/gameMode/FreeGameWriter9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce711EBwylOybpzFHOs7rHU', 'FreeGameWriter9983', __filename);
// cc-taoquan-9983/scripts/gameMode/FreeGameWriter9983.js

"use strict";

var SlotGameWriter = require('SlotGameWriter');
cc.Class({
    extends: SlotGameWriter,

    makeScriptGameStart: function makeScriptGameStart() {
        var listScript = [];
        var winAmount = this.node.gSlotDataStore.playSession.winAmount;

        if (winAmount && winAmount > 0) {
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmount, time: 300 }
            });
        }
        listScript.push({
            command: "_gameStart"
        });
        return listScript;
    },
    makeScriptSpinClick: function makeScriptSpinClick() {
        var listScript = [];
        var freeGameRemain = this.node.gSlotDataStore.playSession.freeGameRemain;

        var availableSpinTimes = freeGameRemain - 1;
        this.node.gSlotDataStore.spinTimes = availableSpinTimes;
        listScript.push({
            command: "_clearPaylines"
        });
        listScript.push({
            command: "_updateSpinTimes",
            data: availableSpinTimes
        });
        listScript.push({
            command: "_updateLastWin",
            data: false
        });
        listScript.push({
            command: "_sendSpinToNetwork"
        });
        listScript.push({
            command: "_spinClick"
        });
        return listScript;
    },
    makeScriptResultReceive: function makeScriptResultReceive() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.lastEvent,
            matrix = _node$gSlotDataStore$.matrix,
            fwm = _node$gSlotDataStore$.fwm,
            type = _node$gSlotDataStore$.type,
            fsoi = _node$gSlotDataStore$.fsoi,
            fSubSym1 = _node$gSlotDataStore$.fSubSym1,
            fSubSym2 = _node$gSlotDataStore$.fSubSym2,
            jpInfo = _node$gSlotDataStore$.jpInfo;
        var freeGameRemain = this.node.gSlotDataStore.playSession.freeGameRemain;

        if (matrix) {
            matrix[0].unshift("1");
            matrix[4].unshift("1");
        }
        // to Hue: ma trận này nó trả 3 4 4 4 3 thì f2r tụi nó ko thể dừng cùng lúc với cùng speed
        // e đã khô máu cho ra ma trận 4 4 4 4 4, với 2 symbols ko liên quan trong game

        if (type == 'freeSpinOptionResult') {
            var listScript = [];
            this.node.gSlotDataStore.spinTimes = freeGameRemain;
            this.node.gSlotDataStore.fsoi = fsoi;
            listScript.push({
                command: "_updateWildType",
                data: fsoi
            });
            listScript.push({
                command: "_updateSpinTimes",
                data: freeGameRemain
            });
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
                data: { matrix: matrix, fwm: fwm, fSubSym1: fSubSym1, fSubSym2: fSubSym2 }
            });
            _listScript.push({
                command: "_showResult",
                data: matrix
            });
            return _listScript;
        }
    },
    makeScriptShowResults: function makeScriptShowResults() {
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.lastEvent,
            matrix = _node$gSlotDataStore$2.matrix,
            winAmount = _node$gSlotDataStore$2.winAmount,
            payLines = _node$gSlotDataStore$2.payLines,
            fsor = _node$gSlotDataStore$2.fsor,
            fwm = _node$gSlotDataStore$2.fwm,
            fsolr = _node$gSlotDataStore$2.fsolr,
            jpInfo = _node$gSlotDataStore$2.jpInfo;
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.playSession,
            freeGameRemain = _node$gSlotDataStore$3.freeGameRemain,
            extend = _node$gSlotDataStore$3.extend,
            freeGameTotal = _node$gSlotDataStore$3.freeGameTotal;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        var winAmountPlaySession = this.node.gSlotDataStore.playSession.winAmount;
        var gameSpeed = this.node.gSlotDataStore.gameSpeed;

        var isFTR = gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        var listScript = [];

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
                command: "_resumeUpdateJP"
            });
            listScript.push({
                command: "_hideSubSymbolPayLine"
            });
        }

        if (payLines && payLines.length > 0) {

            var showBigWin = winAmount && winAmount >= currentBetData * 10 && !jpInfo;
            if (showBigWin) {
                listScript.push({
                    command: "_showAllPayLine"
                });
                if (fwm) {
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                fwm: fwm,
                                isNormal: false
                            }
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
                    data: { winAmount: winAmountPlaySession, time: isFTR ? 50 : 300 }
                });
            } else {

                if (fwm) {
                    listScript.push({
                        command: "_showAllPayLine"
                    });
                    listScript.push({
                        command: "_showWildTransition",
                        data: {
                            name: "WildTransition",
                            content: {
                                matrix: matrix,
                                fwm: fwm,
                                isNormal: false
                            }
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
                listScript.push({
                    command: "_addWinningAmount",
                    data: { winAmount: winAmountPlaySession, time: isFTR ? 50 : 300 }
                });
            }
            listScript.push({
                command: "_showEachPayLineSync"
            });
        }

        if (fsolr) {
            listScript.push({
                command: "_showScatterPayLine"
            });
            listScript.push({
                command: "_showCutscene",
                data: {
                    name: "ScatterTransition",
                    content: {
                        matrix: matrix,
                        isNormal: false
                    }
                }
            });
            if (!fsor) {
                listScript.push({
                    command: "_updateOptionRemain",
                    data: 1
                });
            } else {
                if (!freeGameRemain || freeGameRemain <= 0) {
                    listScript.push({
                        command: "_updateOptionRemain",
                        data: fsor + 1
                    });
                } else {
                    listScript.push({
                        command: "_updateOptionRemain",
                        data: fsor
                    });
                }
            }
        }

        this.node.gSlotDataStore.spinTimes = freeGameRemain;
        listScript.push({
            command: "_updateSpinTimes",
            data: freeGameRemain
        });

        if (!freeGameRemain || freeGameRemain <= 0) {
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmountPlaySession, time: isFTR ? 50 : 300 }
            });
            listScript.push({
                command: "_delayTimeScript",
                data: 1
            });
            listScript.push({
                command: "_clearPaylines"
            });
            if (extend && !extend.fgo) {
                listScript.push({
                    command: "_showCutscene",
                    data: {
                        name: "TotalWinDialog",
                        content: {
                            winAmount: winAmountPlaySession,
                            freeGameTotal: freeGameTotal
                        }
                    }
                });
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
            }

            if (extend && extend.fgo) {
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
                    command: "_updateOptionRemain",
                    data: fsor
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
                    command: "_delayTimeScript",
                    data: 1
                });
                listScript.push({
                    command: "_gameRestart"
                });
            } else {
                listScript.push({
                    command: "_gameExit"
                });
            }
        } else {
            listScript.push({
                command: "_gameRestart"
            });
        }
        return listScript;
    },
    makeScriptGameRestart: function makeScriptGameRestart() {
        var listScript = [];
        var winAmount = this.node.gSlotDataStore.playSession.winAmount;
        var _node$gSlotDataStore = this.node.gSlotDataStore,
            spinTimes = _node$gSlotDataStore.spinTimes,
            gameSpeed = _node$gSlotDataStore.gameSpeed;

        var isFTR = gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        if (winAmount && winAmount > 0) {
            if (winAmount > 0) {
                listScript.push({
                    command: "_updateWinningAmount",
                    data: { winAmount: winAmount, time: isFTR ? 50 : 300 }
                });
            }
            listScript.push({
                command: "_updateLastWin",
                data: false
            });
        }
        if (spinTimes && spinTimes > 0) {
            listScript.push({
                command: "_runAutoSpin"
            });
        }
        return listScript;
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
        //# sourceMappingURL=FreeGameWriter9983.js.map
        