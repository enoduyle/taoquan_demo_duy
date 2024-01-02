(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/betLines/BetLineNumberHolder.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd03e0wEGdVHpqIRkfhAAWVy', 'BetLineNumberHolder', __filename);
// cc-common/cc-slotbase-v2/gui/betLines/BetLineNumberHolder.js

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

cc.Class({
    extends: cc.Component,

    properties: {
        betLineNumberPrefab: cc.Prefab,
        isLeftColumn: true,
        startPosX: 0,
        startPosY: 0,
        spacing: 0,
        textHolderNode: cc.Node,
        betLineNumberText: 'BetLineNumber9976'
    },

    onLoad: function onLoad() {
        this.betLines = [];
        if (this.isLeftColumn) {
            this.betLines = [6, 2, 8, 5, 1, 4, 10, 7, 3, 9];
        } else {
            this.betLines = [16, 12, 19, 14, 13, 17, 18, 15, 11, 20];
        }
        this.selectedBetLines = [];
        this.initBetlineNumbers();

        this.node.on('UPDATE_BET_LINES', this.updateBetLines, this);
    },
    updateBetLines: function updateBetLines() {
        var betLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.selectedBetLines = [].concat(_toConsumableArray(betLines));
        this._updateBetLineNumbers();
    },
    initBetlineNumbers: function initBetlineNumbers() {
        for (var i = 0; i < this.betLines.length; i++) {
            var betLineItem = cc.instantiate(this.betLineNumberPrefab);
            betLineItem.active = true;
            var betLineComponent = betLineItem.getComponent(this.betLineNumberText);
            betLineComponent.setActiveBackground(true);
            betLineComponent.setText(this.betLines[i]);
            betLineItem.x = this.startPosX;
            betLineItem.y = this.startPosY - this.spacing * i;
            betLineItem.parent = this.node;
            //change parent
            var textLabel = betLineItem.getComponentInChildren(cc.Label);
            var textLabelPos = betLineItem.convertToWorldSpaceAR(textLabel.node.position);
            betLineItem.getComponentInChildren(cc.Label).node.parent = this.textHolderNode;
            textLabel.node.setPosition(this.textHolderNode.convertToNodeSpaceAR(textLabelPos));
        }
    },
    _updateBetLineNumbers: function _updateBetLineNumbers() {
        for (var i = 0; i < this.betLines.length; i++) {
            var betLineItem = this.node.children[i];
            var betLineComponent = betLineItem.getComponent(this.betLineNumberText);
            var isActive = false;
            if (!this.selectedBetLines.length || this.selectedBetLines.indexOf(this.betLines[i]) !== -1) {
                isActive = true;
            }
            betLineComponent.setActiveBackground(isActive);
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
        //# sourceMappingURL=BetLineNumberHolder.js.map
        