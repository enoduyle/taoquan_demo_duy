(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/BonusItemHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bdbddkvdRtB+YFlhZXOeffA', 'BonusItemHistory', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/BonusItemHistory.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        openSprite: [cc.SpriteFrame],
        unOpenSprite: [cc.SpriteFrame],
        static: cc.Sprite,
        value: cc.Label
    },

    onLoad: function onLoad() {
        this.node.setScore = this.setScore.bind(this);
        this.node.unOpen = this.unOpen.bind(this);
        this.node.setResult = this.setResult.bind(this);
        this.resultList = convertAssetArrayToObject(this.openSprite);
    },
    onStart: function onStart() {
        this.static.spriteFrame = this.unOpenSprite[0];
    },
    unOpen: function unOpen() {
        this.static.spriteFrame = this.unOpenSprite[0];
        this.value.node.active = false;
    },
    setScore: function setScore(value) {
        this.value.string = value;
        this.value.node.active = true;
    },
    setResult: function setResult(spriteName) {
        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.static.spriteFrame = this.resultList[spriteName];
        this.static.node.active = active;
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
        //# sourceMappingURL=BonusItemHistory.js.map
        