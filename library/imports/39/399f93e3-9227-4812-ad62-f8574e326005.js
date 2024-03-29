"use strict";
cc._RF.push(module, '399f9PjkidIEq1i+FdOMmAF', 'TouchBlocker');
// cc-common/cc-slotbase-v2/component/TouchBlocker.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        touchDelay: 0.5,
        block: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.block.active = false;
        var canvas = cc.find('Canvas');
        var buttons = canvas.getComponentsInChildren(cc.Button);
        this.currentTarget = null;
        buttons.forEach(function (bt) {
            bt.node.on('touchstart', function () {
                _this.currentTarget = bt.node;
                _this.onTouchStart();
            });
            bt.node.on('touchend', function () {
                _this.onTouchEnd();
            });
            bt.node.on('touchcancel', function () {
                _this.onTouchEnd();
            });
        });
    },
    onTouchStart: function onTouchStart() {
        var _this2 = this;

        this.block.active = true;
        this.checkActive = true;
        this._unlockFunc = function () {
            _this2.block.active = false;
            _this2.checkActive = false;
            _this2._unlockFunc = null;
        };
        this.scheduleOnce(this._unlockFunc, this.touchDelay);
    },
    onTouchEnd: function onTouchEnd() {
        if (this._unlockFunc) {
            this.unschedule(this._unlockFunc);
            this._unlockFunc();
        }
    }
});

cc._RF.pop();