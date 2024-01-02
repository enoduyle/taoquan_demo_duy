(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/CustomPageViewIndicator.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e49bbE43vtH06TYp3Sal/x/', 'CustomPageViewIndicator', __filename);
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
        //# sourceMappingURL=CustomPageViewIndicator.js.map
        