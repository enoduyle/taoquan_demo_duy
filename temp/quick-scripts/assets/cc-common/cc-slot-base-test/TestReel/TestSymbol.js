(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/TestReel/TestSymbol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '514dcAWmr9PSr6sCBJgRe3w', 'TestSymbol', __filename);
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
        //# sourceMappingURL=TestSymbol.js.map
        