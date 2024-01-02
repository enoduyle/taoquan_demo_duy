"use strict";
cc._RF.push(module, '1c279lYZodLyYlq1uPx6Wgx', 'SlotButton9983');
// cc-taoquan-9983/scripts/common/SlotButton9983.js

"use strict";

cc.Class({
    extends: require('SlotButtonV2'),

    properties: {
        spinEffect: cc.Node
    },

    showSpin: function showSpin() {
        this._super();
        if (this.spinEffect) {
            this.spinEffect.emit("ON_SPIN_SHOW");
        }
    }
});

cc._RF.pop();