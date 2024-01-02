"use strict";
cc._RF.push(module, '2a37325kWlFJIxlV8cY9voU', 'JackpotWinEffect9983');
// cc-taoquan-9983/scripts/cutScene/JackpotWinEffect9983.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var WIN_ANIM = {
    0: 'jackpot_Tai',
    1: 'jackpot_Loc'
};
var PARTICLE_CONFIG = {
    0: { spawn: 8, interval: 0.2, minSpeed: 400, maxSpeed: 800 },
    1: { spawn: 6, interval: 0.25, minSpeed: 400, maxSpeed: 750 }
};

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        winAnim: cc.Node,
        winAmount: cc.Node,
        phaoHoaParticle: cc.Node,
        phaoHoaLeft: cc.Node,
        phaoHoaRight: cc.Node,
        listBGAmount: {
            default: [],
            type: cc.SpriteFrame
        },
        bgAmount: cc.Node,
        _coinValue: 0,
        coinValue: {
            visible: false,
            get: function get() {
                return this._coinValue;
            },
            set: function set(value) {
                this._coinValue = value;
                this._updateCoinWin();
            }
        }
    },

    onLoad: function onLoad() {
        this._super();
        this.soundPlayer = this.node.soundPlayer ? this.node.soundPlayer : this.node;
        this.rateMega = 30;
        this.rateSuper = 50;
        this.duration = 10;
        this.extendTime = 14;
        this.typeWin = 0;
    },
    _updateCoinWin: function _updateCoinWin() {
        this.winAmount.getComponent(cc.Label).string = formatMoney(Number(this._coinValue));
    },
    quickShow: function quickShow() {
        if (this.coinValue === this.winValue) {
            this.node.stopAllActions();
            this.tweenCoin.stop();
            this.hideFn();
            return;
        }
        this.node.getComponent(cc.Button).interactable = false;

        this.node.stopAllActions();
        this.tweenCoin.stop();
        this.tweenCoin = cc.tween(this).to(0.8, { coinValue: this.winValue }, { easing: "quadOut" }).delay(1).call(this.hideFn.bind(this)).start();
    },
    enter: function enter() {},
    config3DParticle: function config3DParticle(type) {
        var par3D = this.node.getChildByName('3dParticle');
        var conf = PARTICLE_CONFIG[type];
        par3D.setSpawnRate(conf.spawn);
        par3D.setItemSpeed(conf.minSpeed, conf.maxSpeed);
        par3D.setSpawnInterval(conf.interval);
    },
    show: function show() {
        this._super();
        var data = this.content;
        this.bgAmount.getComponent(cc.Sprite).spriteFrame = this.listBGAmount[data.jackpotId];
        this.currentBetData = data.currentBetData;
        this.winValue = data.jackpotAmount;
        this.winAnim.getComponent(sp.Skeleton).setSkin(WIN_ANIM[parseInt(data.jackpotId)]);
        this.winAnim.getComponent(sp.Skeleton).setSlotsToSetupPose();
        this.winAnim.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
        this.config3DParticle(parseInt(data.jackpotId));
        this.showEffectWin();
    },
    showEffectWin: function showEffectWin() {
        var _this = this;

        this.soundPlayer.node.emit("STOP_ALL_AUDIO");
        this.soundPlayer.node.emit("PLAY_WIN_LOOP");

        this.phaoHoaParticle.getComponent(cc.ParticleSystem).resetSystem();
        this.phaoHoaLeft.active = true;
        this.phaoHoaRight.active = true;
        this.phaoHoaLeft.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
        this.phaoHoaRight.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
        cc.tween(this.node).delay(0.5).call(function () {
            _this.node.getComponent(cc.Button).interactable = true;
        }).start();
        this._tweenCoin(this.winValue);
    },


    /**
     * @effect
     **/
    _tweenCoin: function _tweenCoin(winAmount) {
        var _this2 = this;

        var superValue = this.winValue * 0.75;
        var megaValue = this.winValue * 0.5;
        var extendDelayTime = this.node.gSlotDataStore && this.node.gSlotDataStore.isAutoSpin ? this.extendTime : 0;
        this.tweenCoin = cc.tween(this).to(this.duration / 3, { coinValue: megaValue }, { easing: "sineInOut" }).to(this.duration / 3, { coinValue: superValue }, { easing: "sineInOut" }).to(this.duration / 3, { coinValue: winAmount }, { easing: "sineInOut" }).delay(extendDelayTime).call(function () {
            if (_this2.node.gSlotDataStore && _this2.node.gSlotDataStore.isAutoSpin) {
                _this2.hideFn();
            }
        });
        this.tweenCoin.start();
    },
    resetEffectWin: function resetEffectWin() {

        var par3D = this.node.getChildByName('3dParticle');
        this.config3DParticle(0);
        par3D.exit();

        this.coinValue = 0;
        this.typeWin = 0;
        this.winAmount.getComponent(cc.Label).string = "";
        this.winAnim.getComponent(sp.Skeleton).clearTrack(0);
        this.phaoHoaParticle.getComponent(cc.ParticleSystem).stopSystem();
        this.phaoHoaLeft.active = false;
        this.phaoHoaRight.active = false;

        if (this._hideAction != null && this._hideAction.target != null) {
            this.node.stopAction(this._hideAction);
            this._hideAction = null;
        }
    },
    hideFn: function hideFn() {
        var _this3 = this;

        this._hideAction = cc.sequence(cc.delayTime(0.5), cc.fadeOut(0.5), cc.callFunc(function () {
            _this3.soundPlayer.node.emit("STOP_WIN_LOOP");
            _this3.soundPlayer.node.emit("PLAY_SOUND_BACKGROUND");
            _this3.resetEffectWin();
            _this3.exit();
        }));
        this.node.runAction(this._hideAction);
    },
    onDisable: function onDisable() {
        this.node.stopAllActions();
        if (this.tweenCoin) {
            this.tweenCoin.stop();
        }
    }
});

cc._RF.pop();