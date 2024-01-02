(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/promotion/SpinButtonRotate9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '49d01T2FZtH+K+qmegKcfOA', 'SpinButtonRotate9983', __filename);
// cc-taoquan-9983/scripts/promotion/SpinButtonRotate9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        normalSpeed: 10,
        highSpeed: 20,
        isClockwise: false
    },

    onLoad: function onLoad() {
        this._speed = 0;
        this.node.on("ON_SPIN_CLICK", this.onSpinClick, this);
        this.node.on("ON_SPIN_SHOW", this.onSpinShow, this);
    },
    start: function start() {
        this._speed = this.normalSpeed;
    },
    update: function update(dt) {
        this.node.angle += (this.isClockwise ? -1 : 1) * this._speed * dt;
        if (this.node.angle >= 720 || this.node.angle <= -720) {
            this.node.angle = 0;
        }
    },
    onSpinClick: function onSpinClick() {
        this._speed = this.highSpeed;
    },
    onSpinShow: function onSpinShow() {
        this._speed = this.normalSpeed;
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
        //# sourceMappingURL=SpinButtonRotate9983.js.map
        