(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/ButtonsControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ff0dkFG+pP15VScUblncLK', 'ButtonsControl', __filename);
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
        //# sourceMappingURL=ButtonsControl.js.map
        