"use strict";
cc._RF.push(module, '5008e9tDuxHb7s2/vY90OrX', 'TestLobby');
// cc-common/cc-slot-base-test/TestLobby/TestLobby.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttonLabel: cc.Label,
        inputLabel: cc.Label
    },

    loadScene: function loadScene() {
        this.sceneName = this.inputLabel.string;
        cc.director.loadScene(this.sceneName);
    }
});

cc._RF.pop();