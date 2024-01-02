(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shader-metaGear/Utils/RadientBlurControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f675ezazO1MMoNnUmD6w9xG', 'RadientBlurControl', __filename);
// cc-common/cc-share-v1/shader/shader-metaGear/Utils/RadientBlurControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        normalTransitionDuration: 1,
        fastTransitionDuration: 0.3,
        maxStrength: 0.125,
        resolutionPropName: "iResolution",
        thresholdPropName: "threshold",
        strengthPropName: "strength",
        lerpOnStart: true,
        isLoop: false,
        customMaterial: {
            type: cc.Material,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._sprite = this.node.getComponent(cc.Sprite);
        this._mainMaterial = this._sprite.getMaterial(0);
        this._transitionFactor = 0;
        this._isLerping = false;
        this._blurAtStart = true;
    },
    start: function start() {
        if (this._mainMaterial && this._sprite) {
            var iResolution = new cc.Vec3(this._sprite.node.width, this._sprite.node.height, 0);
            this._mainMaterial.setProperty(this.resolutionPropName, iResolution);
        }
        if (this.lerpOnStart) {
            this.lerpTransition(true);
        }
        this._timer = 0;
        this.transitionDuration = this.normalTransitionDuration;
    },
    onEnable: function onEnable() {
        this._transitionFactor = 0;
        this._blurFactor = this._blurAtStart ? this.maxStrength : 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.thresholdPropName, this._transitionFactor);
        this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
    },
    update: function update(dt) {
        if (this._isLerping) {
            this._timer += dt;

            // this._transitionFactor+= dt*(1/this.transitionDuration);
            this._transitionFactor = this.cubicEasingIn(this._timer, 0, 1, this.transitionDuration);
            var blurFactor = this.cubicEasingIn(this._timer, 0, this.maxStrength, this.transitionDuration);

            this._blurFactor = this._blurAtStart ? this.maxStrength - blurFactor : blurFactor;

            if (this._transitionFactor > 1) {
                if (this.isLoop) {
                    this._transitionFactor = 0;
                } else {
                    this._isLerping = false;
                    this.node.emit("RADIENT_BLUR_COMPLETE");
                }
                this._timer = 0;
            }
            this._mainMaterial = this._sprite.getMaterial(0);
            this._mainMaterial.setProperty(this.thresholdPropName, this._transitionFactor);
            this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
        }
    },
    lerpTransition: function lerpTransition(isLerping, blurAtStart) {
        var isTurbo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.transitionDuration = isTurbo ? this.fastTransitionDuration : this.normalTransitionDuration;
        if (this.isLerping) {
            this._sprite.setMaterial(0, this.customMaterial);
        }
        this._isLerping = isLerping;
        this._transitionFactor = 0;
        this._timer = 0;
        this._blurAtStart = blurAtStart;
        this._blurFactor = this._blurAtStart ? this.maxStrength : 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.thresholdPropName, this._transitionFactor);
        this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
    },
    cubicEasingIn: function cubicEasingIn(time, beginVal, changeVal, duration) {
        time /= duration;
        return changeVal * time * time * time + beginVal;
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
        //# sourceMappingURL=RadientBlurControl.js.map
        