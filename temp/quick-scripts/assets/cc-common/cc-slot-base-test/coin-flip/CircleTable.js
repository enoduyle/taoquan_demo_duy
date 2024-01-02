(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/coin-flip/CircleTable.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a69c57cqAJFIaujbKIW6RJq', 'CircleTable', __filename);
// cc-common/cc-slot-base-test/coin-flip/CircleTable.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        reelNum: 5,
        reelPrefab: cc.Prefab,
        reelWidth: 100,
        reelHolder: cc.Node,
        cameraZ: 100
    },

    onLoad: function onLoad() {
        for (var i = 0; i < this.reelNum; i++) {
            var reel = cc.instantiate(this.reelPrefab);
            reel.setParent(this.reelHolder);
            reel.setPosition((i - Math.floor(this.reelNum / 2)) * this.reelWidth, 0, 0);
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
        //# sourceMappingURL=CircleTable.js.map
        