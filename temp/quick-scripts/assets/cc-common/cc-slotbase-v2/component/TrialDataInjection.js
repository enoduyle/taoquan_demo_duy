(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/TrialDataInjection.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca17c59o15Fw6cT018CjEO4', 'TrialDataInjection', __filename);
// cc-common/cc-slotbase-v2/component/TrialDataInjection.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        trialDataName: cc.String
    },

    onLoad: function onLoad() {
        this._trialData = require(this.trialDataName);
        this.node.trialData = this._trialData;
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
        //# sourceMappingURL=TrialDataInjection.js.map
        