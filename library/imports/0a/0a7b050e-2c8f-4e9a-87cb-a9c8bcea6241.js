"use strict";
cc._RF.push(module, '0a7b0UOLI9OmofLqci86mJB', 'Writer');
// cc-common/cc-slotbase-v2/component/Writer.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.writer = this;
    },
    makeScriptResume: function makeScriptResume(data) {
        this.node.gSlotDataStore.formatData(data);
        return [{
            command: "_stateResume"
        }];
    },
    makeScriptUpdate: function makeScriptUpdate(data) {
        this.node.gSlotDataStore.formatData(data);
        return [{
            command: "_stateUpdate"
        }];
    }
});

cc._RF.pop();