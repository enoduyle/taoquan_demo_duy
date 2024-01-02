"use strict";
cc._RF.push(module, '1326eTUqg9M+IjCIzpVNc8/', 'BottomBarMgr');
// cc-common/cc-slotbase-v2/portrailGame/BottomBarMgr.js

'use strict';

var TweenView = require('TweenView');
cc.Class({
    extends: TweenView,

    properties: {
        movingGroup: cc.Node
    },

    show: function show() {
        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.movingGroup) {
            this.movingGroup.show();
        }
        this._super(onStartCB, onCompleteCB);
    },
    hide: function hide() {
        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (this.movingGroup) {
            this.movingGroup.hide();
        }
        this._super(onStartCB, onCompleteCB);
    }
});

cc._RF.pop();