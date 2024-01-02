(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/CoinsEffectv2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b438fduwbBNoJBzxFHQXLfB', 'CoinsEffectv2', __filename);
// cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/CoinsEffectv2.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        coinSpawnerCount: 3,
        coinDropper: cc.Node,
        diamondDropper: cc.Node,
        moneySpawner: cc.Node,
        moneyPrefab: cc.Prefab,
        coinPiles: [cc.Node],
        diamondPiles: [cc.Node],
        coinPipeDelayTime: 1.3
    },

    onLoad: function onLoad() {
        this.initValue();
        this.node.on('START_PARTICLE', this.startParticle, this);
        this.node.on('STOP_PARTICLE', this.stopParticle, this);
        this.node.on('DROP_MONEY', this.randomDropMoney, this);
        this.node.on('DROP_DIAMOND', this.dropDiamond, this);
        this.duration = 10;
    },
    initValue: function initValue() {
        if (!this.moneyPrefab) {
            return;
        }

        this.moneyPool = [];
        for (var i = 0; i < 20; ++i) {
            var money = cc.instantiate(this.moneyPrefab);
            money.parent = this.moneySpawner;
            money.opacity = 0;
            this.moneyPool.push(money);
        }
        this.moneySpawner.opacity = 0;
    },
    startParticle: function startParticle() {
        var _this = this;

        this.coinDropper.opacity = 0;
        this.coinDropper.stopAllActions();
        this.coinDropper.getComponent(cc.ParticleSystem).resetSystem();
        this.coinDropper.runAction(cc.sequence(cc.delayTime(0.2), cc.fadeIn(0.1)));

        this.coinPiles.forEach(function (pile) {
            pile.opacity = 0;
            pile.stopAllActions();
            pile.setPosition(0, -cc.view.getVisibleSize().height / 2 - 20);
            pile.runAction(cc.sequence(cc.delayTime(_this.coinPipeDelayTime), cc.callFunc(function () {
                pile.getComponent(cc.ParticleSystem).resetSystem();
            }), cc.delayTime(0.2), cc.fadeIn(0.1), cc.moveBy(_this.duration, 0, 200)));
        });
    },
    stopParticle: function stopParticle() {
        this.coinDropper.stopAllActions();
        this.coinDropper.getComponent(cc.ParticleSystem).stopSystem();
        this.coinPiles.forEach(function (pile) {
            pile.stopAllActions();
            pile.getComponent(cc.ParticleSystem).stopSystem();
        });
        this.moneySpawner.stopAllActions();
        if (this.diamondDropper) {
            this.diamondDropper.getComponent(cc.ParticleSystem).resetSystem();
            this.diamondDropper.getComponent(cc.ParticleSystem).stopSystem();
            this.diamondPiles.forEach(function (pile) {
                pile.getComponent(cc.ParticleSystem).resetSystem();
                pile.getComponent(cc.ParticleSystem).stopSystem();
            });
        }
    },
    randomDropMoney: function randomDropMoney() {
        var _this2 = this;

        if (!this.moneyPrefab) {
            return;
        }
        this.moneyIndex = 0;
        this.moneySpawner.opacity = 255;
        this.moneySpawner.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            _this2.dropMoney();
        }))));
    },
    dropMoney: function dropMoney() {
        var money = this.moneyPool[this.moneyIndex];
        this.moneyIndex = (this.moneyIndex + 1) % this.moneyPool.length;
        money.x = (Math.random() - 0.5) * cc.view.getVisibleSize().width;
        var randomAnimIdx = Math.random() * 3 | 0 + 1;
        var animName = 'TienRoi' + randomAnimIdx;
        money.opacity = 255;
        money.getComponent(sp.Skeleton).setAnimation(0, animName, false);
    },
    dropDiamond: function dropDiamond() {
        this.diamondDropper.opacity = 0;
        this.diamondDropper.getComponent(cc.ParticleSystem).resetSystem();
        this.diamondDropper.runAction(cc.sequence(cc.delayTime(0.2), cc.fadeIn(0.1)));
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
        //# sourceMappingURL=CoinsEffectv2.js.map
        