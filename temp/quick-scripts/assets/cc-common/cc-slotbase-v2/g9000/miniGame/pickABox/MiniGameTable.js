(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/MiniGameTable.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '31a2fP8dEtED49ZRhwMVDCM', 'MiniGameTable', __filename);
// cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/MiniGameTable.js

'use strict';

var _require = require('globalAnimationLibrary'),
    showScoreOnScreen = _require.showScoreOnScreen;

var _require2 = require('utils'),
    convertAssetArrayToObject = _require2.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        scorePrefab: cc.Prefab,
        treasures: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    onLoad: function onLoad() {
        this.node.mainComponent = this;
        this.assets = convertAssetArrayToObject(this.treasures);
    },
    createMiniGame: function createMiniGame(data, callbackMiniGame) {
        this.removeAllNode();

        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            for (var j = 0; j < row.length; j++) {
                var dataClick = { row: i + 1, col: j + 1 };
                // const x = j * 270 - 680 + j * 17;
                // const y = 140 - 250 * i;
                var x = j * 336;
                var y = i * -240;

                var newItems = cc.instantiate(this.itemPrefab);
                newItems.parent = this.node;
                newItems.mainComponent.init({
                    data: dataClick,
                    callbackMiniGame: callbackMiniGame,
                    itemValue: row[j]
                });
                newItems.setPosition(x, y);
                newItems.opacity = 0;
                newItems.runAction(cc.fadeIn(0.2));
                this.itemTreasure[i + 1 + '' + (j + 1)] = newItems;
                newItems.mainComponent.initLoopingAnimation();
            }
        }
    },
    getCurrentNode: function getCurrentNode(data) {
        var _data$node = data.node,
            row = _data$node.row,
            col = _data$node.col;

        return this.itemTreasure[row + '' + col];
    },
    rewriteSprite: function rewriteSprite(data, callback) {
        var _this = this;

        var _data$node2 = data.node,
            row = _data$node2.row,
            col = _data$node2.col,
            bonus = data.bonus,
            count = data.count;

        var spriteFrame = this.assets['treasure' + bonus];
        this.itemTreasure[row + '' + col].mainComponent.replaceSpriteFrame(spriteFrame, bonus, this.assets, count, function (score, currentSymbol) {
            _this.showScore(score, currentSymbol, 0, .7, callback);
        });
    },
    removeAllNode: function removeAllNode() {
        this.itemTreasure = {};
        this.node.removeAllChildren();
    },
    showScore: function showScore(score, itemNode, delay, dur, callback) {
        var miniGameLayout = this.node.parent;
        var moneyFrame = miniGameLayout.getChildByName("MoneyFrame");
        var rate = miniGameLayout.getChildByName("MoneyFrame").getChildByName("Rate");
        var bonus = itemNode.currentSymbol.getChildByName("Bonus");

        var startX = this.node.x + itemNode.x + bonus.x;
        var startY = this.node.y + itemNode.y + bonus.y + 25;
        var endX = moneyFrame.x + rate.x + rate.width / 2;
        var endY = moneyFrame.y + rate.y;

        showScoreOnScreen(miniGameLayout, this.scorePrefab, { "delay": delay, "dur": dur, "score": score, "startX": startX, "startY": startY, "endX": endX, "endY": endY });

        if (callback && typeof callback == "function") {
            callback();
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
        //# sourceMappingURL=MiniGameTable.js.map
        