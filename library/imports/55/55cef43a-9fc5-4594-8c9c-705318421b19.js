"use strict";
cc._RF.push(module, '55cefQ6n8VFlIyccFMYQhsZ', 'GetSoundPlayerFromParentNode');
// cc-common/cc-slotbase-v2/component/GetSoundPlayerFromParentNode.js

"use strict";

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        if (this.node.parent.soundPlayer) {
            this.node.soundPlayer = this.node.parent.soundPlayer;
        } else {
            this.node.soundPlayer = this.node;
            cc.error("There is no sound player from parent");
        }
    }
});

cc._RF.pop();