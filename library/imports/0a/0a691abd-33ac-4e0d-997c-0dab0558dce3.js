"use strict";
cc._RF.push(module, '0a691q9M6xODZl8DasFWNzj', 'testUtils');
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