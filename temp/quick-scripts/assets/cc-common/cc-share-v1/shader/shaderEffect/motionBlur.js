(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shaderEffect/motionBlur.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '776cfnOpI9Cl7gj9kqak2qt', 'motionBlur', __filename);
// cc-common/cc-share-v1/shader/shaderEffect/motionBlur.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1.0
    },

    onLoad: function onLoad() {
        this.node.on('ACTIVE_BLUR', this.activeBlur, this);
        this.node.on('STOP_BLUR', this.stopBlur, this);
        this.node.on('STOP_BLUR_SMOOTH', this.stopBlurSmooth, this);
    },
    start: function start() {
        var sprite = this.node.getComponent(cc.Sprite);
        if (sprite) {
            this.material = sprite.getMaterial(0);
        }
        this.strength = 0;
        this.decreasing = false;
    },
    update: function update(dt) {
        if (!this.material) return;
        this.material.setProperty('strength', this.strength);
        if (this.decreasing) {
            if (this.strength > 0) {
                this.strength -= this.speed * dt;
            } else {
                this.strength = 0;
                this.decreasing = false;
            }
        }
    },
    stopBlur: function stopBlur() {
        this.strength = 0;
    },
    activeBlur: function activeBlur() {
        var strength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.8;

        this.strength = strength;
    },
    stopBlurSmooth: function stopBlurSmooth() {
        this.decreasing = true;
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
        //# sourceMappingURL=motionBlur.js.map
        