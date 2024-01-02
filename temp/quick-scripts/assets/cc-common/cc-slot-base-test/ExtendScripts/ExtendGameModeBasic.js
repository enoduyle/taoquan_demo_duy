(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ExtendScripts/ExtendGameModeBasic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '17710Sfo/xOPqTx4LAzT6xT', 'ExtendGameModeBasic', __filename);
// cc-common/cc-slot-base-test/ExtendScripts/ExtendGameModeBasic.js

'use strict';

cc.Class({
    extends: require('GameModeBasic'),

    onLoad: function onLoad() {
        this.node.guiMgr = this;
        this._super();
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
        //# sourceMappingURL=ExtendGameModeBasic.js.map
        