"use strict";
cc._RF.push(module, '8de9675XTJNrq33wjRXYjNq', 'CustomProgressBar');
// cc-common/cc-slotbase-v2/component/CustomProgressBar.js

'use strict';

var BarBorder = cc.Class({
    name: 'BarBorder',
    properties: {
        Left: 2,
        Right: 2,
        Top: 2,
        Bottom: 2
    }
});
cc.Class({
    extends: cc.ProgressBar,

    properties: {
        border: {
            default: null,
            type: BarBorder,
            notify: function notify() {
                this._updateBarStatus();
            }
        }

    },

    _updateBarStatus: function _updateBarStatus() {
        this._super();
        if (this.border) {
            var nodeWidth = this.barSprite.node.width + this.border.Left + this.border.Right;
            var nodeHeight = this.barSprite.node.height + this.border.Top + this.border.Bottom;
            var parentAnchorPoint = this.node.getAnchorPoint();
            if (this.mode === 0) {
                // horizontal
                nodeWidth = this.totalLength + this.border.Left + this.border.Right;
                this.barSprite.node.x = -parentAnchorPoint.x * nodeWidth + this.border.Left;
                this.barSprite.node.y = 0;
            } else if (this.mode === 1) {
                // vertical
                nodeHeight = this.totalLength + this.border.Top + this.border.Bottom;
                this.barSprite.node.y = -parentAnchorPoint.y * nodeHeight + this.border.Bottom;
                this.barSprite.node.x = 0;
            }
            var nodeSize = cc.size(nodeWidth, nodeHeight);
            this.node.setContentSize(nodeSize);
        }
    }

});

cc._RF.pop();