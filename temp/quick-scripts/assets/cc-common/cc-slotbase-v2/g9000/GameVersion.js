(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/GameVersion.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '67a16DF+XhAIr+pozT2ARbr', 'GameVersion', __filename);
// cc-common/cc-slotbase-v2/g9000/GameVersion.js

"use strict";

// const CONST = require('loadConfigAsync');

cc.Class({
    extends: cc.Component,

    properties: {
        GameVersionLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // this.GameVersionLabel.string = CONST.APP_VERSION;
        // cc.log(CONST.APP_VERSION);
    }
}

// start () {

// },

// update (dt) {},
);

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
        //# sourceMappingURL=GameVersion.js.map
        