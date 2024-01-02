"use strict";
cc._RF.push(module, '4e10cNEhKlAZa0yU+eUIapC', 'GameModeBasic');
// cc-common/cc-slotbase-v2/component/GameModeBasic.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        winAmount: cc.Node,
        introTips: cc.Node
    },
    onLoad: function onLoad() {
        this.node.hide = this.hide.bind(this);
        this.node.show = this.show.bind(this);
        this.node.getWinAmount = this.getWinAmount.bind(this);
        this.node.on("HIDE_INTRO", this.hideIntro.bind(this));
    },
    getWinAmount: function getWinAmount() {
        return this.winAmount;
    },
    hide: function hide() {
        this.node.emit('GAME_HIDE');
        this.node.active = false;
    },
    show: function show() {
        this.node.emit('GAME_SHOW');
        this.node.active = true;
        this.node.opacity = 255;
    },
    hideIntro: function hideIntro() {
        this.introTips && this.introTips.emit("HIDE_INTRO");
    }
});

cc._RF.pop();