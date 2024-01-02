(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shaderEffect/vintageFadeOut.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '45bd25IHxFMTrVXhSSxLZg0', 'vintageFadeOut', __filename);
// cc-common/cc-share-v1/shader/shaderEffect/vintageFadeOut.js

'use strict';

var START_R_M = 30;
var MAX_BLUR_STR = 1;

cc.Class({
    extends: cc.Component,

    properties: {
        transitionDur: 1.0,
        blurDur: 0.2
    },

    onLoad: function onLoad() {
        this.node.activeTransition = this.activeTransition.bind(this);
    },
    start: function start() {
        var sprite = this.node.getComponent(cc.Sprite);
        if (sprite) {
            this.material = sprite.getMaterial(0);
        }
        this.timePassed = 0;
        this.material.setProperty('Strength', 0);
        this.material.setProperty('radiusMultiple', 0);
    },
    activeTransition: function activeTransition() {
        var _this = this;

        this.material.setProperty('Strength', 0);
        this.material.setProperty('radiusMultiple', 0);
        this.startBlur();
        this.node.runAction(cc.sequence(cc.delayTime(this.blurDur), cc.callFunc(function () {
            _this.startFadeOut();
        })));
        return this.transitionDur + this.blurDur;
    },
    update: function update() {
        if (!this.material) return;
        if (this.blurActived) {
            this.material.setProperty('Strength', this.blurStr);
        }
        if (this.transitionActived) {
            var radiusMultiple = Math.max(0.0, START_R_M - this.timePassed);
            this.material.setProperty('radiusMultiple', radiusMultiple);
        }
    },
    startFadeOut: function startFadeOut() {
        var _this2 = this;

        this.transitionActived = true;
        this.timePassed = 0;
        cc.tween(this).to(this.transitionDur, { timePassed: START_R_M }, { easing: 'cubicOut' }).call(function () {
            _this2.transitionActived = false;
        }).start();
    },
    startBlur: function startBlur() {
        this.blurStr = 0;
        this.blurActived = true;
        cc.tween(this).to(this.transitionDur, { blurStr: MAX_BLUR_STR }).start();
        this.node.runAction(cc.scaleTo(this.transitionDur, 3));
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
        //# sourceMappingURL=vintageFadeOut.js.map
        