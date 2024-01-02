"use strict";
cc._RF.push(module, 'fc6a1+yt+9EKZYDvmQEtyx6', 'BetHistoryScrollItem');
// cc-common/cc-slotbase-v2/slotGame/BetHistory/BetHistoryScrollItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.setIndex = this.setIndex.bind(this);
    },
    onClick: function onClick() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.clickItemEvent = new cc.Event.EventCustom('ON_SCROLL_CLICK', true);
        // let index = this.index || 0;
        this.clickItemEvent.setUserData({
            index: this.index
        });
        this.node.dispatchEvent(this.clickItemEvent);
    },
    setIndex: function setIndex(index) {
        this.index = index;
    }
});

cc._RF.pop();