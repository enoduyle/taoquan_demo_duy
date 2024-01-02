"use strict";
cc._RF.push(module, '36813caLvtOg5wk8cZxO73G', 'SlotCustomDataType');
// cc-common/cc-slotbase-v2/component/SlotCustomDataType.js

'use strict';

var SymbolSpineDefine = cc.Class({
    name: 'SymbolSpineDefine',
    properties: {
        name: {
            default: ''
        },
        spine: {
            type: sp.SkeletonData,
            default: null
        }
    }
});

var TutorialDataConfig = cc.Class({
    name: 'TutorialDataConfig',
    properties: {
        currencyCode: {
            default: ''
        },
        tutorialData: {
            type: cc.Asset,
            default: null
        },
        tutorialSteps: {
            type: cc.Asset,
            default: null
        },
        tutorialText: {
            type: cc.Asset,
            default: null
        }
    }
});

var InfoCurrencyConfig = cc.Class({
    name: 'InfoCurrencyConfig',
    properties: {
        currencyCode: {
            default: ''
        },
        infos: {
            default: [],
            type: cc.SpriteFrame
        }
    }
});

module.exports = {
    SymbolSpineDefine: SymbolSpineDefine,
    TutorialDataConfig: TutorialDataConfig,
    InfoCurrencyConfig: InfoCurrencyConfig
};

cc._RF.pop();