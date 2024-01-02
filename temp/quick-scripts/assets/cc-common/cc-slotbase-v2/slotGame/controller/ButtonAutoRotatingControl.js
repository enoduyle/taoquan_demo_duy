(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/controller/ButtonAutoRotatingControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b739052J8JF2rt/PyjAdn7K', 'ButtonAutoRotatingControl', __filename);
// cc-common/cc-slotbase-v2/slotGame/controller/ButtonAutoRotatingControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        radius: 50,
        normalSpeed: 10,
        highSpeed: 20,
        rotatingSpeed: 5,
        isClockwise: false,
        circleMovingNodes: [cc.Node],
        highSpeedColor: cc.Color,
        normalSpeedColor: cc.Color,
        highSpeedColorVarStar: cc.Color,
        normalSpeedColorVarStar: cc.Color
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._timer = 0;
        this._speed = 0;
        if (this.circleMovingNodes && this.circleMovingNodes.length > 0) {
            this._segmentAngle = 2 * Math.PI / this.circleMovingNodes.length;
        }
        this.node.on("ON_SPIN_CLICK", this.onSpinClick, this);
        this.node.on("ON_SPIN_SHOW", this.onSpinShow, this);
    },
    start: function start() {
        this._speed = this.normalSpeed;
        this.rotateNodes();
        this._parentRotating = false;
    },
    update: function update(dt) {
        this.rotateNodes(dt, true);
        if (this._parentRotating) {
            this.node.angle += (this.isClockwise ? -1 : 1) * this.rotatingSpeed * dt;
        }
    },
    rotateNodes: function rotateNodes(dt) {
        var isRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.circleMovingNodes && this.circleMovingNodes.length > 0) {
            for (var i = 0; i < this.circleMovingNodes.length; i++) {
                if (!isRotate) {
                    this.circleMovingNodes[i]._rotateAngle = i * this._segmentAngle;
                } else {
                    this.circleMovingNodes[i]._rotateAngle += (this.isClockwise ? -1 : 1) * this._speed * dt;
                }
                var x = Math.cos(this.circleMovingNodes[i]._rotateAngle) * this.radius;
                var y = Math.sin(this.circleMovingNodes[i]._rotateAngle) * this.radius;
                this.circleMovingNodes[i].position = new cc.Vec2(x, y);
            }
        }
    },
    onSpinClick: function onSpinClick() {
        this._speed = this.highSpeed;
        this._parentRotating = true;
        if (this.circleMovingNodes && this.circleMovingNodes.length > 0) {
            for (var i = 0; i < this.circleMovingNodes.length; i++) {
                var particle = this.circleMovingNodes[i].getComponent(cc.ParticleSystem);
                if (particle) {
                    particle.startColor = this.highSpeedColor;
                    particle.endColor = this.highSpeedColor;
                    particle.startColorVar = this.highSpeedColorVarStar;
                }
            }
        }
    },
    onSpinShow: function onSpinShow() {
        this._speed = this.normalSpeed;
        this._parentRotating = false;
        for (var i = 0; i < this.circleMovingNodes.length; i++) {
            var particle = this.circleMovingNodes[i].getComponent(cc.ParticleSystem);
            if (particle) {
                particle.startColor = this.normalSpeedColor;
                particle.endColor = this.normalSpeedColor;
                particle.startColorVar = this.normalSpeedColorVarStar;
            }
        }
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
        //# sourceMappingURL=ButtonAutoRotatingControl.js.map
        