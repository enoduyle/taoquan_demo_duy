"use strict";
cc._RF.push(module, 'c804cUhtwtATp/LCquvXUfy', 'InfoView');
// cc-common/cc-slotbase-v2/portrailGame/InfoView.js

'use strict';

cc.Class({
    extends: require('BaseViewPopup'),

    properties: {
        scrollView: cc.ScrollView
    },

    enter: function enter() {
        this._super();
        if (this.scrollView) {
            this.scrollView.scrollToTop();
        }
    },
    exit: function exit() {
        this._super();
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
    }
});

cc._RF.pop();