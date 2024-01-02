(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/TestLobby/TestLobby.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5008e9tDuxHb7s2/vY90OrX', 'TestLobby', __filename);
// cc-common/cc-slot-base-test/TestLobby/TestLobby.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttonLabel: cc.Label,
        inputLabel: cc.Label
    },

    loadScene: function loadScene() {
        this.sceneName = this.inputLabel.string;
        cc.director.loadScene(this.sceneName);
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
        //# sourceMappingURL=TestLobby.js.map
        