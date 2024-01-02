"use strict";
cc._RF.push(module, 'eeac0jDgF1G1JJ0N9sMTmq8', 'WinAmount');
// cc-common/cc-slotbase-v2/gui/WinAmount.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        win: {
            default: null,
            type: cc.SpriteFrame
        },
        lastWin: {
            default: null,
            type: cc.SpriteFrame
        },
        textWin: 'THẮNG',
        textLastWin: 'MỚI THẮNG'
    },

    onLoad: function onLoad() {
        this.node.on("UPDATE_WIN_AMOUNT", this.updateWinAmount, this);
        this.node.on("CHANGE_TO_LAST_WIN", this.updateBgToLastWin, this);
        this.node.on("CHANGE_TO_WIN", this.updateBgToWin, this);
    },
    updateWinAmount: function updateWinAmount(_ref) {
        var value = _ref.value,
            time = _ref.time;

        this.node.emit("UPDATE_ANIMATE_STYLE", { value: value, time: time });
    },
    updateBgToWin: function updateBgToWin() {
        if (this.bg.getComponent(cc.Sprite)) {
            this.bg.getComponent(cc.Sprite).spriteFrame = this.win;
        } else if (this.bg.getComponent(cc.Label)) {
            this.bg.getComponent(cc.Label).string = this.textWin;
        }
    },
    updateBgToLastWin: function updateBgToLastWin() {
        if (this.bg.getComponent(cc.Sprite)) {
            this.bg.getComponent(cc.Sprite).spriteFrame = this.lastWin;
        } else if (this.bg.getComponent(cc.Label)) {
            this.bg.getComponent(cc.Label).string = this.textLastWin;
        }
    }
});

cc._RF.pop();