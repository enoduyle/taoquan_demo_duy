(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/SpinTimes9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1343baanNlKBqeDlhc4gpIx', 'SpinTimes9983', __filename);
// cc-taoquan-9983/scripts/common/SpinTimes9983.js

'use strict';

cc.Class({
    extends: require('SpinTimes'),
    properties: {},

    activeSpintimes: function activeSpintimes() {},
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
        //# sourceMappingURL=SpinTimes9983.js.map
        