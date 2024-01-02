(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/utils/testUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a691q9M6xODZl8DasFWNzj', 'testUtils', __filename);
// cc-common/cc-slot-base-test/utils/testUtils.js

"use strict";

function createLabel(string) {
    var node = new cc.Node();
    var label = node.addComponent(cc.Label);
    label.string = string;
    return label;
}

module.exports = {
    createLabel: createLabel
};

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
        //# sourceMappingURL=testUtils.js.map
        