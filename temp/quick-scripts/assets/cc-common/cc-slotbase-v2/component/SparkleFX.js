(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/SparkleFX.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60097zt5TtIeIpVsGDUzhSz', 'SparkleFX', __filename);
// cc-common/cc-slotbase-v2/component/SparkleFX.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        delayTimeMin: 0.5,
        delayTimeMax: 2,
        durationMin: 0.5,
        durationMax: 2,
        repeatForever: true
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.resetEffect();
    },
    playEffect: function playEffect() {
        var _this = this;

        var delay = Math.random() * (this.delayTimeMax - this.delayTimeMin) + this.delayTimeMin;
        var duration = Math.random() * (this.durationMax - this.durationMin) + this.durationMin;
        var angle = Math.random() * 360 - 180;
        this._action = cc.sequence(cc.delayTime(delay), cc.spawn(cc.scaleTo(duration / 2, 1, 1).easing(cc.easeBackOut()), cc.fadeIn(duration / 2), cc.rotateTo(duration / 2, angle / 2)), cc.rotateTo(duration, angle), cc.delayTime(delay), cc.spawn(cc.scaleTo(duration / 2, 0, 0).easing(cc.easeBackOut()), cc.fadeOut(duration / 2)), cc.callFunc(function () {
            _this.resetEffect();
            if (_this.repeatForever) {
                _this.playEffect();
            }
        }));

        this.node.runAction(this._action);
    },
    resetEffect: function resetEffect() {
        this.node.scale = 0;
        this.node.angle = 0;
        this.node.opacity = 0;
    },
    stopEffect: function stopEffect() {
        if (this._action && this._action.target != null) {
            this.node.stopAction(this._action);
            this._action = null;
        }
        this.resetEffect();
    },
    onDestroy: function onDestroy() {
        this.stopEffect();
    }

    // update (dt) {},

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
        //# sourceMappingURL=SparkleFX.js.map
        