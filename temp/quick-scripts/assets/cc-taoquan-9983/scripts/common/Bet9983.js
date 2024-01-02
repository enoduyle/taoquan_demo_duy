(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/Bet9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b5070CIy/tNmLu1quCQaVas', 'Bet9983', __filename);
// cc-taoquan-9983/scripts/common/Bet9983.js

"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

cc.Class({
    extends: require("Bet"),
    updateBet: function updateBet(currentBetData) {
        this._super(currentBetData);
        if (!this.isCircular) this.blockCircularBet();
    },
    enableBetBtn: function enableBetBtn() {
        this._enableBet = true;
        this._super();
        if (!this.isCircular) this.blockCircularBet();
    },
    disableBetBtn: function disableBetBtn() {
        this._enableBet = false;
        this._super();
    },
    blockCircularBet: function blockCircularBet() {
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.slotBetDataStore.data,
            steps = _node$gSlotDataStore$.steps,
            currentBetData = _node$gSlotDataStore$.currentBetData;

        var maxBet = Math.max.apply(Math, _toConsumableArray(Object.values(steps)));
        var minBet = Math.min.apply(Math, _toConsumableArray(Object.values(steps)));
        this.increaseButton.interactable = this._enableBet && currentBetData !== maxBet;
        this.decreaseButton.interactable = this._enableBet && currentBetData !== minBet;
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
        //# sourceMappingURL=Bet9983.js.map
        