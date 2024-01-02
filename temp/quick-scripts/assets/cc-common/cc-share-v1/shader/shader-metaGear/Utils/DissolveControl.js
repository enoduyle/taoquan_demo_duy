(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shader-metaGear/Utils/DissolveControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ff485wp2/1AlJ0MrrOomzob', 'DissolveControl', __filename);
// cc-common/cc-share-v1/shader/shader-metaGear/Utils/DissolveControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        normalTransitionDuration: 1,
        fastTransitionDuration: 0.3,
        lerpOnStart: true,
        isLoop: false,
        propName: "threshold",
        useLinear: false,
        useCubicEaseIn: false,
        useCubicEaseOut: false,
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
        if (this.lerpOnStart) {
            this.lerpTransition(true);
        }
        this._timer = 0;
        this.transitionDuration = this.normalTransitionDuration;
    },
    onEnable: function onEnable() {
        this._transitionFactor = 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.propName, 1 - this._transitionFactor);
    },
    update: function update(dt) {
        if (this._isLerping) {
            if (this.useLinear) {
                this._transitionFactor += dt * (1 / this.transitionDuration);
            } else if (this.useCubicEaseIn) {
                this._timer += dt;
                this._transitionFactor = this.cubicEasingIn(this._timer, 0, 1, this.transitionDuration);
            } else if (this.useCubicEaseOut) {
                this._timer += dt;
                this._transitionFactor = this.cubicEasingOut(this._timer, 0, 1, this.transitionDuration);
            } else {
                this._isLerping = false;
                return;
            }

            if (this._transitionFactor > 1) {
                if (this.isLoop) {
                    this._transitionFactor = 0;
                } else {
                    this._isLerping = false;
                    this.node.emit("TRANSITION_COMPLETE");
                }
                this._timer = 0;
            }
            this._mainMaterial = this._sprite.getMaterial(0);
            this._mainMaterial.setProperty(this.propName, 1 - this._transitionFactor);
        }
    },
    startFadeIn: function startFadeIn() {
        var isTurbo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.transitionDuration = isTurbo ? this.fastTransitionDuration : this.normalTransitionDuration;
        this.lerpTransition(true);
    },
    startFadeOut: function startFadeOut() {
        var isTurbo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.transitionDuration = isTurbo ? this.fastTransitionDuration : this.normalTransitionDuration;
        this.lerpTransition(false);
    },
    lerpTransition: function lerpTransition(isLerping) {
        if (isLerping) {
            this._sprite.setMaterial(0, this.customMaterial);
        }
        this._isLerping = isLerping;
        this._transitionFactor = 0;
        this._timer = 0;
        this._mainMaterial = this._sprite.getMaterial(0);
        this._mainMaterial.setProperty(this.propName, 1 - this._transitionFactor);
    },
    cubicEasingIn: function cubicEasingIn(time, beginVal, changeVal, duration) {
        time /= duration;
        return changeVal * time * time * time + beginVal;
    },
    cubicEasingOut: function cubicEasingOut(time, beginVal, changeVal, duration) {
        time /= duration;
        time--;
        return changeVal * (time * time * time + 1) + beginVal;
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
        //# sourceMappingURL=DissolveControl.js.map
        