(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/TextControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '66f3cwsvVZDhKSnLw+Rfr4O', 'TextControl', __filename);
// cc-common/cc-slotbase-v2/component/TextControl.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Node
    },
    onLoad: function onLoad() {
        this.node.on("UPDATE_ANIMATE_STYLE", this.updateValue, this);
        this.node.on("UPDATE_WALLET_STYLE", this.updateWallet, this);
        this.node.on("UPDATE_STRING", this.updateString, this);
        this.node.on("RESET_NUMBER", this.resetNumber, this);
    },
    resetNumber: function resetNumber() {
        this.label.resetValue();
    },
    updateString: function updateString(_ref) {
        var _ref$value = _ref.value,
            value = _ref$value === undefined ? "" : _ref$value;

        this.label.getComponent(cc.Label).string = value;
    },
    updateValue: function updateValue(_ref2) {
        var _ref2$value = _ref2.value,
            value = _ref2$value === undefined ? "" : _ref2$value,
            _ref2$time = _ref2.time,
            time = _ref2$time === undefined ? 300 : _ref2$time;

        this.label.onUpdateValue(value, time);
    },
    updateWallet: function updateWallet(_ref3) {
        var _ref3$value = _ref3.value,
            value = _ref3$value === undefined ? "" : _ref3$value,
            _ref3$time = _ref3.time,
            time = _ref3$time === undefined ? 300 : _ref3$time;

        this.label.onUpdateWallet(value, time);
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
        //# sourceMappingURL=TextControl.js.map
        