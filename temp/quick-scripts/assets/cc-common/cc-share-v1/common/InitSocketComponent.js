(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/InitSocketComponent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1542xp7zJKzpIWZ6u6AP/w', 'InitSocketComponent', __filename);
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
        //# sourceMappingURL=InitSocketComponent.js.map
        