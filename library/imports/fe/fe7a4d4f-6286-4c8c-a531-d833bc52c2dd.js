"use strict";
cc._RF.push(module, 'fe7a41PYoZMjKUx2DO8UsLd', 'baseDirector');
// cc-common/cc-share-v1/common/baseComponent/baseDirector.js

"use strict";

cc.Class({
    switchMode: function switchMode() {
        if (!this.gameTrialSupport) return;

        if (!this.trialMode) {
            cc.log("Switch To Trial");
            this.trialMode = true;
            this.gameStateManager.switchToTrial();
        } else {
            cc.log("Switch Back To Real");
            this.trialMode = false;
            this.gameStateManager.switchToReal();
        }
    },
    runAction: function runAction(actionName, data) {
        if (!this.writer || typeof this.writer['makeScript' + actionName] !== 'function') return;
        var script = this.writer['makeScript' + actionName](data);
        this.script = script;
        this.executeNextScript(script);
    },
    executeNextScript: function executeNextScript(script) {
        if (!script || script.length == 0) return;

        var _script$shift = script.shift(),
            command = _script$shift.command,
            data = _script$shift.data;

        if (this[command] && typeof this[command] === 'function') {
            //cc.log('run command ',command, data, script);
            this[command](script, data);
        }
    },
    destroyData: function destroyData() {
        this.runAction = function () {};
        this.executeNextScript = function () {};
        this.script = [];
    }
});

cc._RF.pop();