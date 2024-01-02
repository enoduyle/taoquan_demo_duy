"use strict";
cc._RF.push(module, 'd86013QzyVHJb3Lk+aVwnhU', 'SlotReelTest');
// cc-common/cc-slot-base-test/dynamicLoadingAssets/SlotReelTest.js

'use strict';

var lodash = require('lodash');

cc.Class({
    extends: cc.Component,
    properties: {},
    start: function start() {
        this.node.emit('INIT');
    }
});

cc._RF.pop();