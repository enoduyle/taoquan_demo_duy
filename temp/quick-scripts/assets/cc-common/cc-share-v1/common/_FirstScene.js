(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/_FirstScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd60e9TxeFZJwLxBLfuGUtOb', '_FirstScene', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=_FirstScene.js.map
        