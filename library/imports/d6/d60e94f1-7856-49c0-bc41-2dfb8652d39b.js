"use strict";
cc._RF.push(module, 'd60e9TxeFZJwLxBLfuGUtOb', '_FirstScene');
// cc-common/cc-share-v1/common/_FirstScene.js

'use strict';

/* global onFirstSceneLaunched */

cc.Class({
    extends: cc.Component,

    update: function update() {
        var globalState = require('globalState');
        var firstSceneLoad = globalState.getStatusFirstSceneLoad();
        if (firstSceneLoad && typeof onFirstSceneLaunched === 'function') {
            this.node.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(function () {
                onFirstSceneLaunched();
            })));
            globalState.setStatusFirstSceneLoad(false);
        }
    }
});

cc._RF.pop();