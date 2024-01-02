"use strict";
cc._RF.push(module, '28275ayMeBMhZeDg/A+t1mv', 'BG_Water');
// cc-taoquan-9983/data/VFX/9983_BG_Water/BG_Water.js

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
        this.time = 0;
    },
    update: function update(dt) {
        if (!this.material) return;
        this.material.setProperty('iTime', this.time);
        this.time += this.speed * dt;
    }
});

cc._RF.pop();