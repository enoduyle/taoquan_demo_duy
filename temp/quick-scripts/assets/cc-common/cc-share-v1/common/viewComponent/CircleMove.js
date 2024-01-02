(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/CircleMove.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8dc3bARPU9JLqQ/2t39LDI+', 'CircleMove', __filename);
// cc-common/cc-share-v1/common/viewComponent/CircleMove.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        radius: 100,
        offsetWidthHeight: 10,
        speed: 20 // degree per frame 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._particleSystem = this.node.getComponent(cc.ParticleSystem);
        this._angle = 0;
    },
    onDisable: function onDisable() {
        this._particleSystem.resetSystem();
    },
    update: function update(dt) {
        this._angle += Math.PI / 180 * this.speed * dt; // angle in radian
        var x = Math.cos(this._angle) * this.radius;
        var y = Math.sin(this._angle) * (this.radius - this.offsetWidthHeight);
        this.node.position = new cc.Vec2(x, y);
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
        //# sourceMappingURL=CircleMove.js.map
        