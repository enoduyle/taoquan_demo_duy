"use strict";
cc._RF.push(module, 'ba2062/UH5OeI71kEHLu9pJ', 'MiniBaseWriter');
// cc-common/cc-slotbase-v2/g9000/template-minigame/MiniBaseWriter.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.writer = this;
    },
    makeScriptMiniGameStart: function makeScriptMiniGameStart() {
        var listScript = [];

        listScript.push({
            command: "_miniGameStart"
        });
        return listScript;
    },
    makeScriptMiniGameClick: function makeScriptMiniGameClick() {
        var itemId = this.node.currentPick;
        return [{ command: "_sendRequestPlayMiniGame", data: { openCell: itemId } }];
    },
    makeScriptResultReceive: function makeScriptResultReceive() {
        return [{ command: "_showResult" }];
    },
    makeScriptShowResult: function makeScriptShowResult() {
        var listScript = [];
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.playSession,
            winAmount = _node$gSlotDataStore$.winAmount,
            bonusPlayRemain = _node$gSlotDataStore$.bonusPlayRemain,
            bonusGameMatrix = _node$gSlotDataStore$.bonusGameMatrix;
        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;
        var symV = this.node.gSlotDataStore.lastEvent.symV;


        var itemId = this.node.currentPick;
        listScript.push({
            command: "_openPickedItem",
            data: { index: itemId, value: symV }
        });

        if (winAmount && winAmount > 0) {
            listScript.push({
                command: "_updateWinningAmount",
                data: { winAmount: winAmount }
            });
        }

        if (bonusPlayRemain) {
            listScript.push({
                command: "_miniGameRestart"
            });
            return listScript;
        } else {
            listScript.push({
                command: "_openAllItems",
                data: bonusGameMatrix
            });
            if (!this.node.gSlotDataStore.modeTurbo) {
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
            } else {
                listScript.push({
                    command: "_showCutscene",
                    data: {
                        name: "TotalWinPanel",
                        content: {}
                    }
                });
            }
            listScript.push({
                command: "_gameExit"
            });
            return listScript;
        }
    }
});

cc._RF.pop();