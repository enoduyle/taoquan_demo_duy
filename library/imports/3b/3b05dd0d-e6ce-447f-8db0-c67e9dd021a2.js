"use strict";
cc._RF.push(module, '3b05d0N5s5Ef42wxn6d0CGi', 'BaseViewPopup');
// cc-common/cc-slotbase-v2/portrailGame/BaseViewPopup.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    show: function show() {
        this._super();

        // diplay transition
        this.node.show();
    },
    enter: function enter() {
        this._super();
    },
    exit: function exit() {
        var _this = this;

        // overide exit
        // must have TweenView component

        var startCB = function startCB() {};
        var endCB = function endCB() {
            _this.node.opacity = 0;
            _this.node.active = false;
        };
        this.node.hide(startCB, endCB);
    }
});

cc._RF.pop();