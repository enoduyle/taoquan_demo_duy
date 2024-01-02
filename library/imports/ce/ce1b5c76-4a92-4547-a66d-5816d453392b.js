"use strict";
cc._RF.push(module, 'ce1b5x2SpJFR6ZtWBbUUzkr', 'ParticleSymbolControl9983');
// cc-taoquan-9983/scripts/table/ParticleSymbolControl9983.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        animationName: 'winEff9983'
    },

    onLoad: function onLoad() {
        this.node.controller = this;
        var anim = this.node.getComponent(cc.Animation);
        anim.play(this.animationName);
        this.node.opacity = 0;
    },
    playEffect: function playEffect() {
        this.node.opacity = 255;
    },
    stopEffect: function stopEffect() {
        this.node.opacity = 0;
    }
});

cc._RF.pop();