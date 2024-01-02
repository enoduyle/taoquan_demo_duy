"use strict";
cc._RF.push(module, 'f3fe37eilZD+pK9lkkhX10J', 'AnimTwirlAround9983');
// cc-taoquan-9983/scripts/common/AnimTwirlAround9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        duration: 2
    },
    onLoad: function onLoad() {
        cc.tween(this.node).by(this.duration, { angle: -360 }).repeatForever().start();
    }
});

cc._RF.pop();