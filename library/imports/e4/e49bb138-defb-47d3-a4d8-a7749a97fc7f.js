"use strict";
cc._RF.push(module, 'e49bbE43vtH06TYp3Sal/x/', 'CustomPageViewIndicator');
// cc-common/cc-slotbase-v2/component/CustomPageViewIndicator.js

"use strict";

cc.Class({
    extends: cc.PageViewIndicator,

    properties: {
        unSelectedSpriteFrame: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    _changedState: function _changedState() {
        var indicators = this._indicators;
        if (indicators.length === 0) return;
        var idx = this._pageView._curPageIdx;
        if (idx >= indicators.length) return;
        for (var i = 0; i < indicators.length; ++i) {
            var node = indicators[i];
            if (node) {
                var sprite = node.getComponent(cc.Sprite);
                if (sprite) {
                    sprite.spriteFrame = this.unSelectedSpriteFrame;
                }
            }
        }
        this.setSpriteFrame({ indicators: indicators, idx: idx });
    },

    setSpriteFrame: function setSpriteFrame(_ref) {
        var indicators = _ref.indicators,
            idx = _ref.idx;

        var node = indicators[idx];
        if (node) {
            var sprite = node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.spriteFrame = this.spriteFrame;
            }
        }
    }
});

cc._RF.pop();