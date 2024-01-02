"use strict";
cc._RF.push(module, '68cc4Wj6BlOL6lWc1LIqwLR', 'TotalWinPanelv2');
// cc-common/cc-slotbase-v2/g9000/cutscene/TotalWinPanelv2.js

'use strict';

var cutsceneMode = require('CutsceneMode');

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cutsceneMode,

    properties: {
        winAmount: cc.Node,
        closeBtn: cc.Node,
        titleLabel: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
    },
    start: function start() {
        this.localizeText();
    },
    localizeText: function localizeText() {
        if (this.titleLabel && this.node.config.MESSAGE_DIALOG) {
            this.titleLabel.getComponent(cc.Label).string = this.node.config.MESSAGE_DIALOG.YOU_WON;
        }
    },
    enter: function enter() {
        var _this = this;

        this.canClose = false;
        this.winAmount.getComponent(cc.Label).string = '';
        //Overwrite this when extends
        this.node.runAction(cc.sequence(cc.callFunc(function () {
            var winAmount = _this.node.gSlotDataStore.playSession.winAmount;

            _this.winAmount.getComponent(cc.Label).string = formatMoney(winAmount);
            _this.callback && _this.callback();
            _this.callback = null;
        }), cc.delayTime(0.5), cc.callFunc(function () {
            _this.canClose = true;
            _this.closeBtn.getComponent(cc.Button).interactable = true;
        }), cc.delayTime(3.5), cc.callFunc(function () {
            _this.exit();
        })));
    },
    close: function close() {
        var _this2 = this;

        if (!this.canClose) return;
        this.canClose = false;
        this.closeBtn.getComponent(cc.Button).interactable = false;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            // this.node.soundPlayer.stopWinJackpot();
            _this2.exit();
        })));
    },
    exit: function exit() {
        this.closeBtn.getComponent(cc.Button).interactable = false;
        this.callback && this.callback();
        this.callback = null;
        if (this.node.mainDirector) {
            this.node.mainDirector.onIngameEvent("ON_CUTSCENE_CLOSE");
        }
        this.node.emit("STOP");
        this.node.active = false;
    }
});

cc._RF.pop();