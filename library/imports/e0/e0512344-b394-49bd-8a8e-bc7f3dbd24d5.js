"use strict";
cc._RF.push(module, 'e0512NEs5RJvYqOvH89vSTV', 'vintageFadeIn');
// cc-common/cc-share-v1/shader/shaderEffect/vintageFadeIn.js

'use strict';

var START_R_M = 30;
var MAX_BLUR_STR = 0.125;

cc.Class({
    extends: cc.Component,

    properties: {
        transitionDur: 1.0,
        blurDur: 0.5
    },

    onLoad: function onLoad() {
        this.init();
        this.node.activeTransition = this.activeTransition.bind(this);
        this.node.startFadeIn = this.startFadeIn.bind(this);
        this.node.stopBlur = this.stopBlur.bind(this);
    },
    init: function init() {
        var sprite = this.node.getComponent(cc.Sprite);
        if (sprite) {
            this.material = sprite.getMaterial(0);
        }
        this.timePassed = 0;
        this.blurStr = MAX_BLUR_STR;
        this.material.setProperty('Strength', MAX_BLUR_STR);
        this.material.setProperty('radiusMultiple', 9999);
    },
    activeTransition: function activeTransition() {
        var _this = this;

        this.startFadeIn();
        this.node.runAction(cc.sequence(cc.delayTime(this.transitionDur), cc.callFunc(function () {
            _this.stopBlur();
        })));
    },
    update: function update() {
        if (!this.material) return;
        this.material.setProperty('Strength', this.blurStr);
        if (this.transitionActived) {
            var radiusMultiple = Math.max(0.0, START_R_M - this.timePassed);
            this.material.setProperty('radiusMultiple', radiusMultiple);
        }
    },
    startFadeIn: function startFadeIn() {
        this.init();
        this.transitionActived = true;
        this.timePassed = 0;
        cc.tween(this).to(this.transitionDur, { timePassed: START_R_M }, { easing: 'cubicOut' }).start();
    },
    stopBlur: function stopBlur() {
        cc.tween(this).to(this.blurDur, { blurStr: 0 }).start();
        // this.node.runAction(cc.scaleTo(this.transitionDur, 3));
    }
});

cc._RF.pop();