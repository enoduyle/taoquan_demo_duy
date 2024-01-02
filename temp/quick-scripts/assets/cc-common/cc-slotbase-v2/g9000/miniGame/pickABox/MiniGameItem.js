(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/MiniGameItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '07274PIgT1Px7HeoW6Da+H0', 'MiniGameItem', __filename);
// cc-common/cc-slotbase-v2/g9000/miniGame/pickABox/MiniGameItem.js

'use strict';

var _require = require('globalAnimationLibrary'),
    tweenObject = _require.tweenObject;

cc.Class({
    extends: cc.Component,

    properties: {
        symbolPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.node.mainComponent = this;
    },
    init: function init() {
        var _arguments$ = arguments[0],
            data = _arguments$.data,
            callbackMiniGame = _arguments$.callbackMiniGame,
            itemValue = _arguments$.itemValue;

        var symbol = this.createSymbol(this.symbolPrefab);
        symbol.parent = this.node;
        this.itemValue = itemValue;
        var scriptItem = symbol.getComponent('gSlotMiniGameScript');
        scriptItem.attachEvent(data, callbackMiniGame);
        this.currentSymbol = symbol;

        return symbol;
    },
    createSymbol: function createSymbol() {
        var symbol = cc.instantiate(this.symbolPrefab);
        // const item = symbol.getChildByName('Treasure');
        // symbol.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        return symbol;
    },
    initLoopingAnimation: function initLoopingAnimation() {
        var lightEff = this.currentSymbol.getChildByName('LightEff');
        var treasureLit = this.currentSymbol.getChildByName('TreasureLit');
        var dur = .3;
        var easing = cc.easeBackInOut();

        treasureLit.initY = treasureLit.y;
        var repeater = cc.repeatForever(cc.sequence(new cc.DelayTime(Math.random()), cc.moveTo(dur, cc.v2(treasureLit.x, treasureLit.y + 5)).easing(easing), cc.moveTo(dur, cc.v2(treasureLit.x, treasureLit.initY)).easing(easing)));
        treasureLit.runAction(repeater);

        //
        this.lightingInterVal = setInterval(function () {
            lightEff.getChildByName('light').angle -= .2;
        }, 60 / 100);
    },
    replaceSpriteFrame: function replaceSpriteFrame(spriteFrame, bonus, assets, count, _callback) {
        var _this = this;

        this.itemValue = bonus;

        var treasureLit = this.currentSymbol.getChildByName('TreasureLit');
        // const treasureTop = this.currentSymbol.getChildByName('TreasureTop');
        var bonusNode = this.currentSymbol.getChildByName('Bonus');
        var lightEff = this.currentSymbol.getChildByName('LightEff');
        var particalEff = this.currentSymbol.getChildByName('ParticalEff');
        var score = this.currentSymbol.getChildByName('Score');

        var dur = .3;
        var easing = cc.easeSineOut();

        score.getComponent(cc.Sprite).spriteFrame = assets['miniGame-' + bonus];
        score.active = true;

        lightEff.active = true;
        lightEff.getChildByName('light').getComponent(cc.Sprite).spriteFrame = assets['LIGHT-' + bonus];

        bonusNode.scaleX = bonusNode.scaleY = .5;
        bonusNode.active = true;
        bonusNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        treasureLit.stopAllActions();
        this.isShowScore = false;

        if (bonus && count <= 3) {
            this.isShowScore = true;
            score.scaleX = score.scaleY = 0;
            tweenObject(lightEff, { "dur": dur, "dy": 150, "scale": 1, "easing": easing });
            tweenObject(treasureLit, { "dur": dur, "dx": 180, "dy": 260, "rotate": -30, "opacity": 0, "easing": easing });
            tweenObject(score, { "dur": dur, "delay": .1, "scale": 1, "easing": cc.easeBackOut() });
        } else {
            dur = 0;
            this.stopAllAnimation();
            particalEff.destroy();
            treasureLit.destroy();
            lightEff.destroy();
            this.currentSymbol.opacity = 140;
        }

        tweenObject(bonusNode, { "dur": dur, "dy": 60, "scale": 1, "easing": easing, "callback": function callback() {
                if (_this.isShowScore) {
                    if (_callback && typeof _callback === 'function') {
                        _callback(bonus, _this);
                    }
                }
            } });
    },
    replaceWithText: function replaceWithText(bonus) {
        this.itemValue = bonus;
        if (bonus) {
            this.currentSymbol.getComponent(cc.Sprite).spriteFrame = null;
            this.currentSymbol.getChildByName('LabelNumber').getComponent(cc.Label).string = bonus;
        }
    },
    stopAllAnimation: function stopAllAnimation() {
        if (this.lightingInterVal !== undefined) {
            clearInterval(this.lightingInterVal);
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
        //# sourceMappingURL=MiniGameItem.js.map
        