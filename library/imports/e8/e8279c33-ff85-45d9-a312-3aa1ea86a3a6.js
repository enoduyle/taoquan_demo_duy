"use strict";
cc._RF.push(module, 'e8279wz/4VF2aMSOqHqhqOm', 'CircleReel');
// cc-common/cc-slot-base-test/coin-flip/CircleReel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        rotateSpeed: 100,
        radius: 100,
        slotNum: 10,
        reelSymbols: 5,
        symbolPrefab: {
            type: cc.Prefab,
            default: null
        },
        cameraZ: 300
    },

    onLoad: function onLoad() {
        var _this = this;

        this.deltaAngle = 360 / this.slotNum;
        this.reelAngleX = Math.floor(this.reelSymbols / 2) * this.deltaAngle - 360;
        this.startAngleX = this.reelAngleX;
        this.symbols = [];

        for (var i = 0; i < this.reelSymbols; i++) {
            var symbol = cc.instantiate(this.symbolPrefab);
            symbol.setParent(this.node);
            symbol.slotNum = i;
            this.symbols.push(symbol);
        }

        this.scheduleOnce(function () {
            _this.isSpining = true;
        }, 3);
        this.lastStep = 0;
    },
    start: function start() {
        this.maxSkew = -(this.node.x / 100);
        this.updateSymbols();
    },
    update: function update(dt) {
        if (this.isSpining) {
            this.reelAngleX -= this.rotateSpeed * dt;
            this.updateSymbols();
            this.step = Math.floor(Math.abs((this.reelAngleX - this.startAngleX) / this.deltaAngle));
            if (this.step > this.lastStep) {
                this.circularSymbols();
                this.lastStep = this.step;
            }
        }
    },
    circularSymbols: function circularSymbols() {
        var topSlot = this.symbols[0].slotNum > 0 ? this.symbols[0].slotNum - 1 : this.slotNum - 1;
        var lastSymbol = this.symbols.pop();
        lastSymbol.slotNum = topSlot;
        this.symbols.unshift(lastSymbol);
    },
    updateSymbols: function updateSymbols() {
        for (var i = 0; i < this.node.children.length; i++) {
            var symbol = this.node.children[i];
            var position3d = this.getPosition3D(symbol.slotNum);
            var scale = this.cameraZ / (this.cameraZ - position3d.z);
            var posX = position3d.x * scale;
            var posY = position3d.y * scale;
            symbol.scale = scale;
            symbol.setPosition(posX, posY, 0);
            symbol.zIndex = position3d.z;
            symbol.eulerAngles = new cc.Vec3(-position3d.angle, 0, 0);

            var anglePos = Math.abs((position3d.angle / 360).toFixed(2));

            if (anglePos > 0 && anglePos < 0.25) {
                symbol.skewX = -10 * anglePos * this.maxSkew;
                symbol.opacity = 255;
            } else if (anglePos >= 0.75 && anglePos < 1) {
                symbol.skewX = 10 * (1 - anglePos) * this.maxSkew;
                symbol.opacity = 255;
            } else if (anglePos > 0.25 && anglePos < 0.75) {
                symbol.opacity = 0;
            } else {
                symbol.skewX = 0;
                symbol.opacity = 255;
            }

            //debug info
            //symbol.getComponentInChildren(cc.Label).string = (position3d.angle / 360).toFixed(2);
        }
    },
    getPosition3D: function getPosition3D(slotNum) {
        var angle = (this.reelAngleX - slotNum * this.deltaAngle) % 360;
        var radian = angle * Math.PI / 180;
        var z = Math.cos(radian) * this.radius;
        var y = Math.sin(radian) * this.radius;
        return { x: this.node.position.x, y: y, z: z, angle: angle };
    }
});

cc._RF.pop();