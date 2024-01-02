"use strict";
cc._RF.push(module, 'cba318awl1ECZdhGhKgX8rR', 'WinEffectEmpty');
// cc-common/cc-slotbase-v2/g9000/cutscene/winEffect/WinEffectEmpty.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        winAmount: cc.Node,
        coinEffect: cc.Node,
        blockInputs: [cc.Node],
        bigWinDuration: 20,
        megaWinDuration: 36,
        superWinDuration: 72
    },

    onLoad: function onLoad() {
        this._super();
        this.delayTimeToSkip = 2;
        this.duration = 10;
        this.timeHide = 1;
        this.delaySkip = 0.5;
    },
    enter: function enter() {
        this.resetValue();
        this.toggleBlockInputs(true);
        this.isX100 = this.content.winAmount / this.content.currentBetData >= 100;
        var currentSlotDirector = this.node.mainDirector.currentGameMode.director;
        if (currentSlotDirector && currentSlotDirector.buttons) {
            currentSlotDirector.buttons.emit('ENABLE_SPIN_KEY', false);
        }
        this.isForceSkip = false;
        this.showEffectWin();
    },
    toggleBlockInputs: function toggleBlockInputs() {
        var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.blockInputs.forEach(function (item) {
            item.active = isOn;
        });
    },
    resetValue: function resetValue() {
        this.skippable = false;
        this.isSpeedUp = false;
    },
    showEffectWin: function showEffectWin() {
        var _this = this;

        var isFTR = this.node.gSlotDataStore.gameSpeed === this.node.config.GAME_SPEED.INSTANTLY;
        if (this.overlayNode) {
            this.overlayNode.active = true;
        }
        if (isFTR) {
            this._showFastBigWin();
        } else {
            var _content = this.content,
                winAmount = _content.winAmount,
                currentBetData = _content.currentBetData;

            this.duration = this.bigWinDuration;
            if (winAmount / currentBetData >= 50) {
                this.duration = this.megaWinDuration;
            } else if (winAmount / currentBetData >= 100) {
                this.duration = this.superWinDuration;
            }
            this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: this.duration * 1000 });
            this.coinEffect.emit("PLAY_COIN_EFFECT");
            this.playSoundStart();
            // bind quick show
            this._actionBindQuickShow = cc.sequence(cc.callFunc(function () {
                _this.skippable = true;
            }), cc.delayTime(this.duration), cc.callFunc(function () {
                _this.finish();
                _this.skippable = false;
            }));
            this.node.runAction(this._actionBindQuickShow);
        }
        var isAutoSpin = this.node.gSlotDataStore.isAutoSpin;
        var isFinished = this.node.gSlotDataStore.playSession.isFinished;

        if (!isAutoSpin && isFinished) {
            this.callback && this.callback();
            this.callback = null;
        }
    },
    _showFastBigWin: function _showFastBigWin() {
        var winAmount = this.content.winAmount;

        this.duration = 0.02;
        this.winAmount.emit("PLAY_COIN_PARTICLE");
        this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: this.duration * 1000 });
        this.exit();
    },
    playSoundStart: function playSoundStart() {},
    playSoundEnd: function playSoundEnd() {},
    onClick: function onClick() {
        if (!this.skippable) return;
        if (this.isSpeedUp) return;
        this.skippable = false;
        cc.log("SKIP BIG WIN");
        this.isSpeedUp = true;
        var winAmount = this.content.winAmount;

        this.winAmount.emit("FAST_UPDATE_WIN_AMOUNT", { value: winAmount, time: 0 });
        this.finish();
    },
    finish: function finish() {
        var _this2 = this;

        this.coinEffect.emit("STOP_COIN_EFFECT");
        this.playSoundEnd();
        this.toggleBlockInputs();
        this.node.stopAllActions();
        if (this.isForceSkip) {
            if (this.node.soundPlayer) {
                this.node.soundPlayer.stopAllAudio();
                this.node.soundPlayer.playMainBGM();
            }
            this.exit();
        } else {
            this.node.runAction(cc.sequence(cc.fadeOut(this.timeHide), cc.callFunc(function () {
                if (_this2.node.soundPlayer) {
                    _this2.node.soundPlayer.stopAllAudio();
                    _this2.node.soundPlayer.playMainBGM();
                }
                _this2.exit();
            })));
        }
    },
    skip: function skip() {
        this.isForceSkip = true;
        this.onClick();
    },
    exit: function exit() {
        this.callback && this.callback();
        this.callback = null;
        var currentSlotDirector = this.node.mainDirector.currentGameMode.director;
        if (currentSlotDirector && currentSlotDirector.buttons && !this.node.mainDirector.isTutorialShowing()) {
            currentSlotDirector.buttons.emit('ENABLE_SPIN_KEY', true);
        }

        if (this.node.mainDirector) {
            this.node.mainDirector.onIngameEvent("ON_FINISH_BIG_WIN", this.node.name);
        }
        this.node.active = false;
        this.isForceSkip = false;
    }
});

cc._RF.pop();