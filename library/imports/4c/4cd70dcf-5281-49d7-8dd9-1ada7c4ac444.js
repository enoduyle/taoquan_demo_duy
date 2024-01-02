"use strict";
cc._RF.push(module, '4cd703PUoFJ143ZGtp8SsRE', 'CustomDataType');
// cc-common/cc-share-v1/common/CustomDataType.js

'use strict';

var jackpotStatic = cc.Class({
    name: 'jackpotStatic',
    properties: {
        name: {
            default: ''
        },
        static: {
            type: cc.SpriteFrame,
            default: null
        }
    }
});

var BettingChipMapping = cc.Class({
    name: 'BettingChip',
    properties: {
        value: 500,
        static: {
            type: cc.SpriteFrame,
            default: null
        }
    }
});

var DynamicSpine = cc.Class({
    name: 'DynamicSpineData',
    properties: {
        name: {
            default: ''
        },
        texture: {
            type: cc.Texture2D,
            default: null
        },
        atlas: {
            type: cc.Asset,
            default: null
        },
        jsonFileName: {
            default: ''
        }
    }
});

var ButtonAsset = cc.Class({
    name: 'ButtonAsset',
    properties: {
        name: {
            default: ''
        },
        normalSprite: {
            type: cc.SpriteFrame,
            default: null
        },
        pressedSprite: {
            type: cc.SpriteFrame,
            default: null
        },
        hoverSprite: {
            type: cc.SpriteFrame,
            default: null
        },
        disabledSprite: {
            type: cc.SpriteFrame,
            default: null
        }
    }
});

module.exports = {
    jackpotStatic: jackpotStatic,
    BettingChipMapping: BettingChipMapping,
    DynamicSpine: DynamicSpine,
    ButtonAsset: ButtonAsset
};

cc._RF.pop();