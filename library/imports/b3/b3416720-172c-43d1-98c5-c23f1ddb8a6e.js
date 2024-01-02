"use strict";
cc._RF.push(module, 'b3416cgFyxD0ZjFwj8d24pu', 'lightEffect');
// cc-common/cc-share-v1/shader/shaderEffect/lightEffect.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1.0
    },

    start: function start() {
        var sprite = this.node.getComponent(cc.Sprite);
        if (sprite) {
            this.material = sprite.getMaterial(0);
        } else {
            var spine = this.node.getComponent(sp.Skeleton);
            if (spine) {
                this.material = spine.getMaterial(0);
            }
        }
        this.iTime = 0;
        cc.tween(this).repeatForever(cc.tween().to(1.0 / this.speed, { iTime: 0.5 }).delay(1.0 / this.speed).to(1.0 / this.speed, { iTime: 0.0 }).delay(1.0 / this.speed * 1.5)).start();
    },
    update: function update() {
        if (!this.material) return;
        this.material.setProperty('iTime', this.iTime);
        // this.iTime += this.speed * dt;
    }
});

cc._RF.pop();