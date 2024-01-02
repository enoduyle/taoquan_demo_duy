"use strict";
cc._RF.push(module, '0b127pIA99IzYP+euU5Io1q', 'MiniGameDirector');
// cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/MiniGameDirector.js

'use strict';

var turnBaseFSM = require('turnBaseFSM');

var _require = require('utils'),
    getRandomInt = _require.getRandomInt;

var baseDirector = require('BaseDirectorV2');

cc.Class({
    extends: baseDirector,
    onExtendedLoad: function onExtendedLoad() {
        this.node.on("GAME_UPDATE", this.stateUpdate, this);
        this.node.on("GAME_RESUME", this.stateResume, this);
        this.node.on("GAME_ENTER", this.enter, this);
        this.node.on("GAME_INIT", this.init, this);
        this.node.on("UPDATE_WINAMOUNT", this.setWinAmount, this);
    },
    init: function init() {
        this.controls = {
            table: this.node.getChildByName('TableMiniGame'),
            tableComponent: this.node.getChildByName('TableMiniGame').mainComponent,
            winRate: this.node.getChildByName('MoneyFrame').getChildByName('Rate').getComponent(cc.Label)
        };

        this.fsm = new turnBaseFSM();
        this.timerCount = 15 * 1000;
    },
    stateUpdate: function stateUpdate() {
        this.miniGameResultReceive();
    },
    stateResume: function stateResume() {
        this.miniGameResultReceive();
    },
    enter: function enter(data) {
        if (!data) {
            data = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        }

        this.data = data;
        this.countMiniGame = 0;
        this.currentWinRate = 0;
        this.count = 0;
        this.fsm.gameStart();
        this.listClickedMiniGame = [];
        this.setTriggerMiniGame({ timer: this.timerCount });
        // this.soundManager.stopBGAudio();
        // //waiting for 2s before play a sound bg for mini game.
        // setTimeout(() => {
        //     this.soundManager.playBGMiniGame();
        // }, 2000);

        this.runAnimationEnter();
    },
    runAnimationEnter: function runAnimationEnter() {
        var _controls = this.controls,
            tableComponent = _controls.tableComponent,
            winRate = _controls.winRate;


        winRate.string = '0';
        tableComponent.createMiniGame(this.data, this.miniGameClick.bind(this));

        //Resume
        for (var i = 0; i < this.data.length; i++) {
            var row = this.data[i];
            for (var j = 0; j < row.length; j++) {
                if (row[j] > 0) this.miniGameOpenWhenResume(i + 1, j + 1, row[j]);
            }
        }
    },
    exit: function exit() {
        var _controls2 = this.controls,
            tableComponent = _controls2.tableComponent,
            winRate = _controls2.winRate;

        this.currentWinRate = 0;

        winRate.string = '0';
        tableComponent.removeAllNode();
        this.listClickedMiniGame = [];
        clearTimeout(this.timeoutTriggerMiniGame);

        // this.soundManager.playBGAudio();

        this.node.exit();
    },
    setWinAmount: function setWinAmount(_ref) {
        var winAmount = _ref.winAmount;

        if (this.winAmount) this.winAmount.getComponent('TextControl').updateValue({ value: winAmount, time: 0 });
    },
    openBoxItemMiniGame: function openBoxItemMiniGame(dataForMiniGame) {
        var _this = this;

        this.count++;
        dataForMiniGame['count'] = this.count;
        var tableComponent = this.controls.tableComponent;

        tableComponent.rewriteSprite(dataForMiniGame, function () {
            _this.updateWinRate(dataForMiniGame.bonus);
        });
    },
    setTriggerMiniGame: function setTriggerMiniGame(_ref2) {
        var _this2 = this;

        var timer = _ref2.timer;

        var row = getRandomInt(1, 3);
        var col = getRandomInt(1, 5);
        if (this.listClickedMiniGame.includes(row + '' + col)) {
            this.setTriggerMiniGame({ timer: timer });
        } else {
            this.timeoutTriggerMiniGame = setTimeout(function () {
                _this2.miniGameClick({ row: row, col: col }, true);
            }, timer);
        }
    },
    miniGameResultReceive: function miniGameResultReceive() {
        if (!this.fsm.can('resultReceive')) return;

        var bonusPlayRemain = this.node.gSlotDataStore.playSession.bonusPlayRemain;
        var miniResult = this.node.gSlotDataStore.lastEvent.miniResult;

        var bonus = 100;
        if (miniResult == "B") {
            bonus = 200;
        } else if (miniResult == "C") {
            bonus = 400;
        }

        this.fsm.resultReceive();
        /// show animation open treasure
        this.count++;
        var dataForMiniGame = {
            node: this.miniGamePost,
            bonus: bonus,
            count: this.count
        };
        var tableComponent = this.controls.tableComponent;
        var _dataForMiniGame$node = dataForMiniGame.node,
            row = _dataForMiniGame$node.row,
            col = _dataForMiniGame$node.col;

        var clickedMiniGame = tableComponent.getCurrentNode({ node: { row: row, col: col } });
        clickedMiniGame.stopAllActions();
        tableComponent.rewriteSprite(dataForMiniGame);
        this.data[row - 1][col - 1] = dataForMiniGame.bonus;
        this.fsm.gameRestart();
        this.setTriggerMiniGame({ timer: this.timerCount - 5000 });

        this.updateWinRate(dataForMiniGame.bonus || 0);
        //play sound when open cell.
        //param = bonus
        // this.soundManager.playMiniGameOpenCell(dataForMiniGame.bonus);

        if (!bonusPlayRemain || bonusPlayRemain <= 0) {
            cc.director.getScheduler().schedule(function () {
                this.exit();
            }, this, 0, 0, 2, false);
        }
    },
    miniGameClick: function miniGameClick(dataUpdate) {
        var isAutoTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var row = dataUpdate.row,
            col = dataUpdate.col;

        var openCell = (row - 1) * 5 + col - 1;

        if (this.fsm.can('actionTrigger') && this.countMiniGame < 3 && this.data[row - 1][col - 1] == '0') {
            this.countMiniGame++;
            this.fsm.actionTrigger();
            this.miniGamePost = dataUpdate;
            // store command id to data store
            var tableComponent = this.controls.tableComponent;

            //sharing cell

            var clickedMiniGame = tableComponent.getCurrentNode({ node: { row: row, col: col } });
            this.runAnimation(clickedMiniGame);

            this.listClickedMiniGame.push(row + '' + col);
            this.node.mainDirector.gameStateManager.triggerMiniGame(openCell);
            if (!isAutoTrigger) {
                clearTimeout(this.timeoutTriggerMiniGame);
            }
        }
    },
    miniGameOpenWhenResume: function miniGameOpenWhenResume(row, col, bonus) {
        this.countMiniGame++;
        var dataForMiniGame = {
            node: { row: row, col: col },
            bonus: bonus
        };
        this.openBoxItemMiniGame(dataForMiniGame);
        this.listClickedMiniGame.push(row + '' + col);
    },
    runAnimation: function runAnimation(clickedMiniGame) {
        var repeater = cc.repeatForever(cc.sequence(cc.moveTo(0.02, cc.v2(clickedMiniGame.x - 10, clickedMiniGame.y)), cc.moveTo(0.02, cc.v2(clickedMiniGame.x, clickedMiniGame.y)), cc.moveTo(0.02, cc.v2(clickedMiniGame.x + 10, clickedMiniGame.y)), cc.moveTo(0.02, cc.v2(clickedMiniGame.x, clickedMiniGame.y))));
        clickedMiniGame.runAction(repeater);
    },
    updateWinRate: function updateWinRate(value) {
        var winRate = this.controls.winRate;

        if (value) {
            this.currentWinRate += Number(value);
            winRate.string = 'X' + this.currentWinRate;
        }
    },
    forceStopSpinning: function forceStopSpinning() {},
    stopAutoSpinClick: function stopAutoSpinClick() {}

    // update (dt) {},

});

cc._RF.pop();