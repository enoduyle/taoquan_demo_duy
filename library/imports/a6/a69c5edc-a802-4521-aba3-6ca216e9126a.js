"use strict";
cc._RF.push(module, 'a69c57cqAJFIaujbKIW6RJq', 'CircleTable');
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