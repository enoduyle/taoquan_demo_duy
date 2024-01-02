"use strict";
cc._RF.push(module, '3ff0dkFG+pP15VScUblncLK', 'ButtonsControl');
// cc-common/cc-slotbase-v2/component/ButtonsControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttons: {
            default: [],
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        this.node.on("ENABLE_BUTTONS", this.enable, this);
        this.node.on("DISABLE_BUTTONS", this.disable, this);
        // this.node..ru
    },
    enable: function enable() {
        if (this.buttons && this.buttons.length) {
            this.buttons.map(function (btn) {
                if (btn) btn.getComponent(cc.Button).interactable = true;
            });
        }
    },
    disable: function disable() {
        if (this.buttons && this.buttons.length) {
            this.buttons.map(function (btn) {
                if (btn) btn.getComponent(cc.Button).interactable = false;
            });
        }
    }
});

cc._RF.pop();