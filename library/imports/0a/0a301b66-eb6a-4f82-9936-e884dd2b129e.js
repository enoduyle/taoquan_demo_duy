"use strict";
cc._RF.push(module, '0a301tm62pPgpk26ITdKxKe', 'DissolveBlurControl');
// cc-common/cc-share-v1/shader/shader-metaGear/Utils/DissolveBlurControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        normalTransitionDuration: 1,
        fastTransitionDuration: 0.3,
        maxStrength: 1,
        resolutionPropName: "iResolution",
        thresholdPropName: "threshold",
        strengthPropName: "strength",
        fadePropName: "fadeType",
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
    },
    start: function start() {
        if (this._mainMaterial && this._sprite) {
            var iResolution = new cc.Vec3(this._sprite.node.width, this._sprite.node.height, 0);
            this._mainMaterial.setProperty(this.resolutionPropName, iResolution);
        }
        if (this.lerpOnStart) {
            this.lerpTransition(true, 0);
        }
        this._timer = 0;
        this.transitionDuration = this.normalTransitionDuration;
    },
    onEnable: function onEnable() {
        this._transitionFactor = 0;
        this._blurFactor = 0;
        this.fadeType = 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.thresholdPropName, this.fadeType > 0 ? this._transitionFactor : 1 - this._transitionFactor);
        this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
    },
    startFadeIn: function startFadeIn() {
        var isTurbo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.transitionDuration = isTurbo ? this.fastTransitionDuration : this.normalTransitionDuration;
        this.lerpTransition(true, 1);
    },
    startFadeOut: function startFadeOut() {
        var isTurbo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.transitionDuration = isTurbo ? this.fastTransitionDuration : this.normalTransitionDuration;
        this.lerpTransition(true, 0);
    },
    update: function update(dt) {
        if (this._isLerping) {
            this._timer += dt;

            // this._transitionFactor+= dt*(1/this.transitionDuration);
            this._transitionFactor = this.cubicEasingIn(this._timer, 0, 1, this.transitionDuration);
            var blurFactor = this.cubicEasingIn(this._timer, 0, this.maxStrength, this.transitionDuration);
            if (this.fadeType > 0) {
                this._blurFactor = this.maxStrength - blurFactor;
            } else {
                this._blurFactor = blurFactor;
            }
            if (this._timer > this.transitionDuration) {
                if (this.isLoop) {
                    this._transitionFactor = 0;
                    this._blurFactor = 0;
                } else {
                    this._isLerping = false;
                    this.node.emit("DISSOLVE_BLUR_COMPLETE");
                }
                this._timer = 0;
            }
            this._mainMaterial = this._sprite.getMaterial(0);
            this._mainMaterial.setProperty(this.thresholdPropName, this.fadeType > 0 ? this._transitionFactor : 1 - this._transitionFactor);
            this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
        }
    },
    lerpTransition: function lerpTransition(isLerping, fadeType) {
        if (this.isLerping) {
            this._sprite.setMaterial(0, this.customMaterial);
        }
        this.fadeType = fadeType;
        this._isLerping = isLerping;
        this._transitionFactor = 0;
        this._blurFactor = this.fadeType > 0 ? this.maxStrength : 0;
        this._timer = 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.thresholdPropName, this.fadeType > 0 ? this._transitionFactor : 1 - this._transitionFactor);
        this._mainMaterial.setProperty(this.strengthPropName, this._blurFactor);
        this._mainMaterial.setProperty(this.fadePropName, fadeType);
    },
    cubicEasingIn: function cubicEasingIn(time, beginVal, changeVal, duration) {
        time /= duration;
        return changeVal * time * time * time + beginVal;
    }
});

cc._RF.pop();