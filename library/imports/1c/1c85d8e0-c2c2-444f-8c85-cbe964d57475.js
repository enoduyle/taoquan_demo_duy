"use strict";
cc._RF.push(module, '1c85djgwsJET4yFy+lk1XR1', 'LoopRotation');
// cc-common/cc-slotbase-v2/component/LoopRotation.js

'use strict';

var _require = require('CustomType'),
    RotatingObject = _require.RotatingObject;

cc.Class({
    extends: cc.Component,

    properties: {
        targetNodes: {
            type: RotatingObject,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {
        for (var i = 0; i < this.targetNodes.length; i++) {
            var node = this.targetNodes[i].node;
            var speed = this.targetNodes[i].speed;
            var minAngle = this.targetNodes[i].minAngle;
            var maxAngle = this.targetNodes[i].maxAngle;
            var varSpeed = (Math.random() - 0.5) * 2 * this.targetNodes[i].speedVar;
            if (node != null && node !== undefined) {
                node.angle += this.targetNodes[i].clockwise * (speed + varSpeed) * dt;
                if (node.angle <= minAngle && this.targetNodes[i].clockwise < 0) {
                    this.targetNodes[i].clockwise = -this.targetNodes[i].clockwise;
                }

                if (node.angle >= maxAngle && this.targetNodes[i].clockwise > 0) {
                    this.targetNodes[i].clockwise = -this.targetNodes[i].clockwise;
                }
            }
        }
    }
});

cc._RF.pop();