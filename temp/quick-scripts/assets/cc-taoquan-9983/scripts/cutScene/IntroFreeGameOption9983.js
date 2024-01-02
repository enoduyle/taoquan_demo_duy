(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/cutScene/IntroFreeGameOption9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bde7bPZV5pMPpCau9S9bmWt', 'IntroFreeGameOption9983', __filename);
// cc-taoquan-9983/scripts/cutScene/IntroFreeGameOption9983.js

'use strict';

var cutsceneMode = require('CutsceneMode');

cc.Class({
    extends: cutsceneMode,
    properties: {},

    onCompletedntroAnim: function onCompletedntroAnim() {
        this.exit();
    },
    speedUp: function speedUp() {
        this.animIntro.speed = 4;
    },
    enter: function enter() {
        cc.log("Cutscene contents: ", this.content);
        this.animIntro = this.getComponent(cc.Animation).play('IntroFreeGameOption9983');
        this.animIntro.speed = 1;
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
        //# sourceMappingURL=IntroFreeGameOption9983.js.map
        