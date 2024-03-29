"use strict";
cc._RF.push(module, '874b7FgTiZF37U635w/DstC', 'CutsceneMode');
// cc-common/cc-slotbase-v2/component/CutsceneMode.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.on("PLAY", this.play, this);
        this.node.on("HIDE", this.exit, this);
        this.node.on("INIT", this.init, this);
        this.node.on("SKIP", this.skip, this);
        this.node.opacity = 0;
        this.node.active = false;
        this.node.fullDisplay = true;
    },
    init: function init(mainDirector) {
        this.node.mainDirector = mainDirector;
    },
    play: function play(content, callback) {
        this.content = content;
        this.callback = callback;
        this.show();
        this.enter();
    },
    show: function show() {
        this.node.opacity = 255;
        this.node.active = true;
    },
    enter: function enter() {
        //Overwrite this when extends
    },
    skip: function skip() {},
    exit: function exit() {
        if (this.callback && typeof this.callback == "function") {
            if (this.node.mainDirector) {
                this.node.mainDirector.onIngameEvent("ON_CUTSCENE_CLOSE", this.node.name);
            }
            this.node.emit("STOP");
            this.callback();
        }
        this.node.active = false;
    }
});

cc._RF.pop();