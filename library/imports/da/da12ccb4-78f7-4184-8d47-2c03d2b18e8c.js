"use strict";
cc._RF.push(module, 'da12cy0ePdBhI1HLAPSsY6M', 'CloudMovingControl');
// cc-common/cc-slotbase-v2/component/CloudMovingControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        clouds: [cc.Node],
        minSpeed: 50,
        maxSpeed: 150,
        leftBorderX: -1200,
        rightBorderX: 1200,
        minPosY: -100,
        maxPosY: 100,
        playOnStart: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on("PLAY_EFFECT", this.playEffect, this);
        this.node.on("STOP_EFFECT", this.stopEffect, this);
    },
    start: function start() {
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].speed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
        }
        if (this.playOnStart) {
            this.playEffect();
        }
    },
    playEffect: function playEffect() {
        this._isPlaying = true;
    },
    stopEffect: function stopEffect() {
        this._isPlaying = false;
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].speed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
        }
    },
    update: function update(dt) {
        if (this._isPlaying) {
            for (var i = 0; i < this.clouds.length; i++) {
                var cloud = this.clouds[i];
                cloud.x += cloud.speed * dt;

                if (cloud.x > this.rightBorderX) {
                    cloud.x = this.leftBorderX;
                    cloud.y = Math.random() * (this.maxPosY - this.minPosY) + this.minPosY;
                } else if (cloud.x < this.leftBorderX) {
                    cloud.x = this.rightBorderX;
                    cloud.y = Math.random() * (this.maxPosY - this.minPosY) + this.minPosY;
                }
            }
        }
    }
});

cc._RF.pop();