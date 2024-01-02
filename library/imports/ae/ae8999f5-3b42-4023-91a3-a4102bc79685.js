"use strict";
cc._RF.push(module, 'ae899n1O0JAI5GjpBArx5aF', 'BetLineNumber');
// cc-common/cc-slotbase-v2/gui/betLines/BetLineNumber.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        background: cc.Node,
        label: cc.Label
    },

    setActiveBackground: function setActiveBackground(isActive) {
        this.background.active = isActive;
    },
    setText: function setText() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.label.string = text;
    }
});

cc._RF.pop();