(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/TestReel/TurboTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ecc822dKAZPj66c1Guyy20G', 'TurboTest', __filename);
// cc-common/cc-slot-base-test/TestReel/TurboTest.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btnTurboOn: cc.Button,
        btnTurboOff: cc.Button
    },

    onLoad: function onLoad() {
        this.turboOff();
    },
    turboOn: function turboOn() {
        this.btnTurboOn.interactable = false;
        this.btnTurboOff.interactable = true;
    },
    turboOff: function turboOff() {
        this.btnTurboOn.interactable = true;
        this.btnTurboOff.interactable = false;
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
        //# sourceMappingURL=TurboTest.js.map
        