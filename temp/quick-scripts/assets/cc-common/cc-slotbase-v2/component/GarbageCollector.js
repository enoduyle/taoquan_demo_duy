(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GarbageCollector.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2084b+QZOZJArcHgBMQpK2e', 'GarbageCollector', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GarbageCollector.js.map
        