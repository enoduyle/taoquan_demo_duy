"use strict";
cc._RF.push(module, 'd1542xp7zJKzpIWZ6u6AP/w', 'InitSocketComponent');
// cc-common/cc-share-v1/common/InitSocketComponent.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        token: {
            default: "",
            visible: false
        }
    },

    init: function init(token) {
        var globalNetwork = require('globalNetwork');
        globalNetwork.init(token);
    }
});

cc._RF.pop();