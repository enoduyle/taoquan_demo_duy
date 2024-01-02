"use strict";
cc._RF.push(module, 'ca17c59o15Fw6cT018CjEO4', 'TrialDataInjection');
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