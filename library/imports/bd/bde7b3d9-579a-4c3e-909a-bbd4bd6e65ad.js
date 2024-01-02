"use strict";
cc._RF.push(module, 'bde7bPZV5pMPpCau9S9bmWt', 'IntroFreeGameOption9983');
// cc-taoquan-9983/scripts/cutScene/IntroFreeGameOption9983.js

'use strict';

var cutsceneMode = require('CutsceneMode');

cc.Class({
    extends: cutsceneMode,
    properties: {},

    onCompletedntroAnim: function onCompletedntroAnim() {
        this.exit();
    },
    speedUp: function speedUp() {
        this.animIntro.speed = 4;
    },
    enter: function enter() {
        cc.log("Cutscene contents: ", this.content);
        this.animIntro = this.getComponent(cc.Animation).play('IntroFreeGameOption9983');
        this.animIntro.speed = 1;
    }
});

cc._RF.pop();