"use strict";
cc._RF.push(module, 'e3367x0L5VC3L/JOx522ND+', 'BonusGameDirector');
// cc-common/cc-slotbase-v2/slotGame/BonusGameDirector.js

'use strict';

var baseDirector = require('BaseDirectorV2');
var TurnBaseFSM = require('turnBaseFSM');

cc.Class({
    extends: baseDirector,

    onExtendedLoad: function onExtendedLoad() {
        this.node.on("GAME_UPDATE", this.stateUpdate, this);
        this.node.on("GAME_ENTER", this.enter, this);
        this.node.on("GAME_INIT", this.init, this);
    },
    init: function init() {
        this.fsm = new TurnBaseFSM();
        this.extendInit();
    },
    extendInit: function extendInit() {
        //Add your overwrite code here!
    },
    enter: function enter() {
        this.fsm.gameStart();
        this.onGameEnter();
    },
    exit: function exit() {
        this.fsm.gameEnd();
        this.node.exit();
    },
    stateUpdate: function stateUpdate() {
        if (!this.fsm.can('resultReceive')) return;
        this.fsm.resultReceive();
        this.onGameUpdate();
        this.fsm.gameRestart();
    },
    sendBonusGameToNetwork: function sendBonusGameToNetwork(event, data) {
        if (!this.fsm.can('actionTrigger')) return;
        this.fsm.actionTrigger();
        this.node.mainDirector.gameStateManager.triggerMiniGame(data);
        this.onGameAction();
    },


    //Update these functions when extend from this
    onGameEnter: function onGameEnter() {},
    onGameUpdate: function onGameUpdate() {},
    onGameAction: function onGameAction() {}
});

cc._RF.pop();