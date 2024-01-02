"use strict";
cc._RF.push(module, '8046flWgu1Ap7HG5By86Ady', 'CloudTransition9983');
// cc-taoquan-9983/scripts/cutScene/CloudTransition9983.js

"use strict";

var cutsceneMode = require('CutsceneMode');

cc.Class({
    extends: cutsceneMode,
    properties: {},

    exit: function exit() {
        var _this = this;

        if (this.callback && typeof this.callback == "function") {
            this.node.emit("STOP");
            this.callback();
        }
        this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this.node.active = false;
        })));
    },
    onCompletedntroAnim: function onCompletedntroAnim() {
        this.exit();
    },
    speedUp: function speedUp() {
        this.animIntro.speed = 4;
    },
    enter: function enter() {
        cc.log("Cutscene contents: ", this.content);
        this.animIntro = this.getComponent(cc.Animation).play('CloudTransition9983');
        this.animIntro.speed = 1;
    }
});

cc._RF.pop();