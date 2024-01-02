"use strict";
cc._RF.push(module, 'ecc822dKAZPj66c1Guyy20G', 'TurboTest');
// cc-common/cc-slot-base-test/TestReel/TurboTest.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btnTurboOn: cc.Button,
        btnTurboOff: cc.Button
    },

    onLoad: function onLoad() {
        this.turboOff();
    },
    turboOn: function turboOn() {
        this.btnTurboOn.interactable = false;
        this.btnTurboOff.interactable = true;
    },
    turboOff: function turboOff() {
        this.btnTurboOn.interactable = true;
        this.btnTurboOff.interactable = false;
    }
});

cc._RF.pop();