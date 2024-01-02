(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/table/ParticleSymbolControl9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce1b5x2SpJFR6ZtWBbUUzkr', 'ParticleSymbolControl9983', __filename);
// cc-taoquan-9983/scripts/table/ParticleSymbolControl9983.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        animationName: 'winEff9983'
    },

    onLoad: function onLoad() {
        this.node.controller = this;
        var anim = this.node.getComponent(cc.Animation);
        anim.play(this.animationName);
        this.node.opacity = 0;
    },
    playEffect: function playEffect() {
        this.node.opacity = 255;
    },
    stopEffect: function stopEffect() {
        this.node.opacity = 0;
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
        //# sourceMappingURL=ParticleSymbolControl9983.js.map
        