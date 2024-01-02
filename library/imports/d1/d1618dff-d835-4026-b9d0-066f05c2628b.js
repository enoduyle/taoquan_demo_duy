"use strict";
cc._RF.push(module, 'd16183/2DVAJrnQBm8FwmKL', 'BetOptionScrollView');
// cc-common/cc-slotbase-v2/portrailGame/BetOptionScrollView.js

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PoolFactory = require('PoolFactory');
cc.Class({
    extends: cc.Component,

    properties: {
        poolFactory: {
            type: PoolFactory,
            default: null,
            visible: false
        },
        scrollView: cc.Node,
        content: cc.Node,
        view: cc.Node,
        betSelectPrefabName: ''
    },

    onLoad: function onLoad() {
        this.scrollView.on('scroll-ended', this.scrollEnded, this);
        this.scrollView.on('touch-up', this.touchUp, this);
        this.scrollView.on('scrolling', this.scrollingView, this);

        this.initPos = this.view.height / 2;
        this.heightItem = 60;
        this.node.on('UPDATE_DATA', this.updateData, this);
        this.node.on('SELECT_MAX_BET', this.selectMaxBet, this);
        this.node.on('CLEAR_ALL_BET', this.clearAllBets, this);

        this.view.on(cc.Node.EventType.TOUCH_END, this.touchViewEnded.bind(this));
        this.view.on(cc.Node.EventType.TOUCH_START, this.touchViewStart.bind(this));
        this.view.on(cc.Node.EventType.TOUCH_MOVE, this.touchViewMove.bind(this));
        this.view.on(cc.Node.EventType.TOUCH_CANCEL, this.touchViewCancel.bind(this));

        this.view.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel.bind(this));

        this.listItems = [];
        this.currentIndex = 0;
        if (this.node.mainDirector) {
            this.poolFactory = this.node.mainDirector.getComponent(PoolFactory);
        }
    },
    scrollingView: function scrollingView() {
        if (this.content.y <= this.limitBottom || this.content.y >= this.limitTop) return;
        if (this.touchViewStart) this.content.y = this.getCorrectPositionY(this.content.y);
    },
    touchViewMove: function touchViewMove() {
        if (this.touchViewStart) this.content.y = this.getCorrectPositionY(this.content.y);
        if (this.isTouchStarted && !this.isDelayChangeColorButton) {
            this.controller.setSelectColorButtons();
        }
    },
    touchViewEnded: function touchViewEnded() {
        this.isTouchStarted = false;
        if (this.getIsScrolling() === false) this.controller.unSetSelectColorButtons(this.currentIndex == 0);
    },
    touchViewStart: function touchViewStart() {
        this.isTouchStarted = true;
        this.isDelayChangeColorButton = true;
        this.delayTimeChangeColorButton = 0.15;
    },
    touchViewCancel: function touchViewCancel() {
        if (this.getIsScrolling() === false) this.controller.unSetSelectColorButtons(this.currentIndex == 0);
        this.isTouchUp = false;
        this.calculateScroll();
    },
    getIsScrolling: function getIsScrolling() {
        return this.scrollView.getComponent(cc.ScrollView).isScrolling();
    },
    getSelectBlocked: function getSelectBlocked() {
        return this.isSelectBlocked;
    },
    update: function update(dt) {
        if (this.isDelayChangeColorButton) {
            this.delayTimeChangeColorButton -= dt;
            if (this.delayTimeChangeColorButton < 0) {
                this.isDelayChangeColorButton = false;
            }
        }
    },
    mouseWheel: function mouseWheel() {
        var _this = this;

        if (parseInt(this.content.y) >= parseInt(this.limitTop)) this.content.y = this.limitTop;
        if (parseInt(this.content.y) <= parseInt(this.limitBottom)) this.content.y = this.limitBottom;
        if (this.content.y <= this.limitBottom || this.content.y >= this.limitTop) return;
        if (!this.countWheel) this.countWheel = 0;
        if (!this.content.prevPos) this.content.prevPos = this.content.getPosition();
        if (this.countWheel >= 3) {
            this.scrollDirection = this.content.y - this.content.prevPos.y > 0 ? 1 : -1;
            this.content.y = this.getCorrectPositionY(this.content.y + this.scrollDirection * 25);
            this.countWheel = 0;
        }
        // cc.warn('mouseWheel this.content.y ' + this.content.y + ' this.limitTop ' + this.limitTop + ' this.limitBottom ' + this.limitBottom)
        this.isTouchUp = false;
        this.node.tween && this.node.tween.stop();
        this.node.tween = cc.tween(this.node).delay(0.101).call(function () {
            _this.calculateScroll();
        }).start();
        this.content.prevPos = this.content.getPosition();
        this.countWheel++;
    },
    clearAllBets: function clearAllBets() {
        for (var i = 0; i < this.listItems.length; i++) {
            var removedObj = this.listItems[i];
            if (this.poolFactory) this.poolFactory.removeObject(removedObj);
        }
        this.listItems = [];
    },
    updateData: function updateData() {
        var listBetValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var currentBetData = arguments[1];
        var controller = arguments[2];

        this.controller = controller;
        this.clearAllBets();
        this.listBetValues = [].concat(_toConsumableArray(listBetValues));
        this.maxBet = this.listBetValues[0];

        for (var i = 0; i < listBetValues.length; i++) {
            var item = this.poolFactory && this.poolFactory.getObject(this.betSelectPrefabName);
            if (item) {
                item.active = true;
                item.parent = this.content;
                item.emit('UPDATE_DATA', this.listBetValues[i], i, this);
                item.setSiblingIndex(2);
                this.heightItem = item.height;
                this.listItems.push(item);
            }
        }
        var found = this.listBetValues.findIndex(function (it) {
            if (it === currentBetData) return true;
        });
        var reserveFound = this.listBetValues.length - 1 - found;
        this.content.getComponent(cc.Layout).updateLayout();
        this.currentIndex = found;
        this.selectItemInAction(0.1, reserveFound, this.currentIndex == 0);
        this.limitBottom = this.heightItem * 3;
        this.limitTop = this.content.height - this.heightItem * 3;
    },
    getCorrectPositionY: function getCorrectPositionY(newY) {
        if (this.content.y <= this.limitBottom) return this.limitBottom;else if (this.content.y >= this.limitTop) return this.limitTop;
        return newY;
    },
    setStopTouchUp: function setStopTouchUp() {
        this.isTouchUp = false;
    },
    touchUp: function touchUp() {
        this.isTouchUp = true;
    },
    selectBet: function selectBet() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var timeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

        this.controller.setSelectedBet(this.listBetValues[index], index === 0);
        var reserveIndex = this.listBetValues.length - 1 - index;
        this.currentIndex = index;
        this.selectItemInAction(timeScroll, reserveIndex, true);
        this.controller.unSetSelectColorButtons(this.currentIndex == 0);
    },
    selectMaxBet: function selectMaxBet() {
        this.selectBet(0);
    },
    selectItemInAction: function selectItemInAction() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.15;

        var _this2 = this;

        var index = arguments[1];
        var isMaxBet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.isSelectBlocked) return;
        this.isSelectBlocked = true;
        this.controller.unSetSelectColorButtons(isMaxBet);
        var nextPos = this.initPos + index * this.heightItem;
        this.content.tweenMove && this.content.tweenMove.stop();
        this.content.tweenMove = cc.tween(this.content).to(time, { position: cc.v2(0, nextPos) }, { easing: "expoOut" }).start();
        this.content.tweenUnBlock && this.content.tweenUnBlock.stop();
        this.content.tweenUnBlock = cc.tween(this.content).delay(0.1).call(function () {
            _this2.isSelectBlocked = false;
        }).start();
    },
    scrollEnded: function scrollEnded() {
        if (this.isTouchUp) {
            this.calculateScroll(0.15);
        }
    },
    calculateScroll: function calculateScroll() {
        var timeScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;

        var offset = this.content.y - this.initPos;
        var index = Math.round(offset / this.heightItem);
        if (index < 0) index = 0;else if (index >= this.listBetValues.length) index = this.listBetValues.length - 1;

        var reserveIndex = this.listBetValues.length - 1 - index;
        this.currentIndex = reserveIndex;
        var isMaxBet = reserveIndex == 0;
        this.controller.setSelectedBet(this.listBetValues[reserveIndex], isMaxBet);
        this.selectItemInAction(timeScroll, index, isMaxBet);
        this.isTouchUp = false;
        this.controller.unSetSelectColorButtons(this.currentIndex == 0);
    },
    onDestroy: function onDestroy() {
        this.content.tweenUnBlock && this.content.tweenUnBlock.stop();
        this.content.tweenMove && this.content.tweenMove.stop();
        this.node.tween && this.node.tween.stop();
    }
});

cc._RF.pop();