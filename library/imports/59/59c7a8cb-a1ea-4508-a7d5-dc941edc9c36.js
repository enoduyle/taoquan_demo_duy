"use strict";
cc._RF.push(module, '59c7ajLoepFCKfV3JQe3Jw2', 'MiniBaseTable');
// cc-common/cc-slotbase-v2/g9000/template-minigame/mini-table/MiniBaseTable.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        colNumber: 5,
        rowNumber: 3,
        WIDTH_STEP: 250,
        HEIGHT_STEP: 250,
        itemPrefab: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on("INIT_TABLE", this.initItems, this);
        this.node.on("OPEN_PICKED_ITEM", this.openPickedItem, this);
        this.node.on("OPEN_ALL_ITEMS", this.openAllItems, this);
        this.node.on("RESUME_MINI_GAME", this.resumeTable, this);
        this.node.on("RESET_MINI_TABLE", this.resetTable, this);
        this.node.on("AUTO_OPEN_BOX", this.autoClick, this);
    },
    randRange: function randRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    start: function start() {
        this.startX = -this.colNumber / 2 * this.WIDTH_STEP + this.WIDTH_STEP / 2;
        this.startY = this.rowNumber / 2 * this.HEIGHT_STEP - this.HEIGHT_STEP / 2;
    },
    initItems: function initItems() {
        this.MAX_BOXES = this.colNumber * this.rowNumber;
        this.listItem = [];
        for (var i = 0; i < this.MAX_BOXES; i++) {
            var item = cc.instantiate(this.itemPrefab);
            this.node.addChild(item);
            item.active = true;
            item.itemId = i;
            this.listItem.push(item);
            item.setPosition(this.getPosByIndex(i));
            // DebugItemId:{
            //     let textNode = new cc.Node();
            //     item.addChild(textNode)
            //     textNode.addComponent(cc.Label).string = item.itemId;
            // }
        }
        this.setPositionItems();
    },
    setPositionItems: function setPositionItems() {
        //customize items positions
    },
    resumeTable: function resumeTable(data, defaultValue) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] !== defaultValue) {
                this.listItem[i].itemController.playAnimOpen(data[i]);
            }
        }
    },
    resetTable: function resetTable() {
        for (var i = 0; i < this.listItem.length; i++) {
            this.listItem[i].itemController.resetItem();
        }
    },
    autoClick: function autoClick() {
        var index = this.randRange(0, this.listItem.length);
        this.listItem[index].isOpen ? this.autoClick() : this.listItem[index].itemController.onClickItem(null, true);
    },
    openPickedItem: function openPickedItem(data, callback) {
        var index = data.index,
            value = data.value;

        this.listItem[index].itemController.playAnimOpen(value, callback);
    },
    openAllItems: function openAllItems(result, callback) {
        this.result = result;
        this.updateCurrentMatrix();
        for (var i = 0; i < this.listItem.length; i++) {
            if (this.listItem[i].isOpen === false) {
                var randValue = this.getRandomValue();
                this.listItem[i].itemController.playAnimOpen(randValue);
                cc.tween(this.listItem[i]).to(0.5, { opacity: 100 }).start();
            }
        }
        if (callback && typeof callback === 'function') {
            cc.tween(this.node).delay(1).call(function () {
                callback();
            }).start();
        }
    },
    updateCurrentMatrix: function updateCurrentMatrix() {
        var _this = this;

        var TREASURE_VALUE = this.node.config.TREASURE_VALUE;

        this.listScore = TREASURE_VALUE.map(function (item) {
            return { value: item.value, count: item.count, currentCount: 0 };
        });

        var _loop = function _loop(index) {
            if (_this.listItem[index].isOpen) {
                var item = _this.listScore.find(function (item) {
                    return item.value === _this.result[index];
                });
                if (item) {
                    item.currentCount++;
                } else {
                    cc.log("Cant find item with result value " + _this.result[index]);
                }
            }
        };

        for (var index = 0; index < this.listItem.length; index++) {
            _loop(index);
        }
    },
    getRandomValue: function getRandomValue() {
        var index = this.randRange(0, this.listScore.length);
        var _listScore$index = this.listScore[index],
            currentCount = _listScore$index.currentCount,
            count = _listScore$index.count;

        if (currentCount < count) {
            this.listScore[index].currentCount++;
            return this.listScore[index].value;
        } else {
            return this.getRandomValue();
        }
    },
    getPosByIndex: function getPosByIndex(index) {
        var x = this.startX + this.WIDTH_STEP * Math.floor(index / this.rowNumber);
        var y = this.startY - this.HEIGHT_STEP * (index % this.rowNumber);
        return cc.v2(x, y);
    }
});

cc._RF.pop();