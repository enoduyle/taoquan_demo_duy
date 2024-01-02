"use strict";
cc._RF.push(module, '2084b+QZOZJArcHgBMQpK2e', 'GarbageCollector');
// cc-common/cc-slotbase-v2/component/GarbageCollector.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        collectByTime: false,
        collectAtStart: false,
        timeInterval: 60
    },

    onLoad: function onLoad() {
        this.node.on("GARBAGE_COLLECT", this.runGC, this);
    },
    start: function start() {
        var _this = this;

        this._gcAction = cc.repeatForever(cc.sequence(cc.delayTime(this.timeInterval), cc.callFunc(function () {
            _this.runGC();
        })));
        if (this.collectAtStart) {
            this.runGC();
        }
        if (cc.sys.isNative && this.collectByTime == true) {
            this.node.runAction(this._gcAction);
        }
    },
    runGC: function runGC() {
        if (cc.sys.isNative) {
            cc.sys.garbageCollect();
            cc.log("Run Garbage Collector On Native");
        }
    },
    onDisable: function onDisable() {
        if (this._gcAction && this._gcAction.target != null) {
            this.node.stopAction(this._gcAction);
        }
        this.runGC();
        this.node.off("GARBAGE_COLLECT", this.runGC, this);
    }
});

cc._RF.pop();