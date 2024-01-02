(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/SpinTimes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '85796vv1rlAw5rZWpUJwfVG', 'SpinTimes', __filename);
// cc-common/cc-slotbase-v2/gui/SpinTimes.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Node,
        labelPromotion: cc.Label
    },

    onLoad: function onLoad() {
        this.node.on("UPDATE_SPINTIMES", this.updateSpintimes, this);
        this.node.on("RESET_SPINTIMES", this.resetSpintimes, this);
        this.node.active = false;
    },
    start: function start() {},
    resetSpintimes: function resetSpintimes() {
        this.label.getComponent(cc.Label).string = '';
        if (this.labelPromotion) {
            this.labelPromotion.string = '';
        }
        this.node.active = false;
    },
    updateSpintimes: function updateSpintimes() {
        var spinTimes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _node$gSlotDataStore = this.node.gSlotDataStore,
            isAutoSpin = _node$gSlotDataStore.isAutoSpin,
            promotion = _node$gSlotDataStore.promotion;

        if (spinTimes >= 0 && isAutoSpin || promotion) {
            this.node.active = true;
        } else {
            this.node.active = false;
        }

        if (spinTimes > 100) {
            this.label.getComponent(cc.Label).string = "∞";
        } else {
            this.label.getComponent(cc.Label).string = spinTimes;
            if (this.labelPromotion) {
                this.labelPromotion.string = spinTimes;
            }
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
        //# sourceMappingURL=SpinTimes.js.map
        