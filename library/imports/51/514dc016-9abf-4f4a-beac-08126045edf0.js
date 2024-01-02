"use strict";
cc._RF.push(module, '514dcAWmr9PSr6sCBJgRe3w', 'TestSymbol');
// cc-common/cc-slot-base-test/TestReel/TestSymbol.js

'use strict';

cc.Class({
    extends: require('SlotSymbol'),
    playAnimation: function playAnimation() {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.3, 150), cc.fadeTo(0.3, 255))));
    }
});

cc._RF.pop();