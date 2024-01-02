"use strict";
cc._RF.push(module, '43899L+WR9Gb7wh0ViezMTF', 'dizzyness');
// cc-common/cc-share-v1/shader/shaderEffect/dizzyness.js

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
        }
        this.iTime = 0;
    },
    update: function update(dt) {
        if (!this.material) return;
        this.material.setProperty('iTime', this.iTime);
        this.iTime += this.speed * dt;
    }
});

cc._RF.pop();