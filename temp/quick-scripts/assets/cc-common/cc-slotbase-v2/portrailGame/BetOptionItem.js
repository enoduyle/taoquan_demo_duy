(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/BetOptionItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8fafaUfQr9KN4Im+2zip/kK', 'BetOptionItem', __filename);
// cc-common/cc-slotbase-v2/portrailGame/BetOptionItem.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        betOptionValue: cc.Label
    },

    onLoad: function onLoad() {
        this.node.on('UPDATE_DATA', this.updateData, this);
        this.node.updateData = this.updateData.bind(this);
    },
    updateData: function updateData(values, index, controller) {
        this.controller = controller;
        this.betOptionValue.string = formatMoney(values);
        this.itemIndex = index;
    },
    onClick: function onClick() {
        if (!this.controller.getSelectBlocked()) {
            this.controller.setStopTouchUp();
            this.controller.selectBet(this.itemIndex, 0.5);
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
        //# sourceMappingURL=BetOptionItem.js.map
        