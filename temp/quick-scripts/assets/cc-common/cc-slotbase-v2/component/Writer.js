(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/Writer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a7b0UOLI9OmofLqci86mJB', 'Writer', __filename);
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
        //# sourceMappingURL=Writer.js.map
        