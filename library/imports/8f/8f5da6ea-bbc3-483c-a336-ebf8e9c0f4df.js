"use strict";
cc._RF.push(module, '8f5dabqu8NIPKM26/jpwPTf', 'FreeGameOption9983');
// cc-taoquan-9983/scripts/cutScene/FreeGameOption9983.js

"use strict";

var cutsceneMode = require('CutsceneMode');
var skinMapping = ["chep_bac", "chep_do", "chep_den", "chep_xanhduong", "chep_vang", "chep_xanhla", "chep_tim"];
var flySkinMapping = ["Ca_Bac", "Ca_Do", "Ca_Den", "Ca_XanhDuong", "Ca_Vang", "Ca_XanhLa", "Ca_Tim"];

var OPTION = [1, 2, 3, 7, 4, 5, 6];

cc.Class({
    extends: cutsceneMode,
    properties: {
        optionList: [cc.Node],
        koiAnim: sp.Skeleton,
        particleKoi: cc.ParticleSystem,
        godKitchen: cc.Node,
        godKitchenNoKoi: cc.Node,
        optionPrefab: cc.Prefab,
        optionHolder: cc.Node,
        spinNumberSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        wildMultiplySprites: {
            default: [],
            type: cc.SpriteFrame
        },
        backgroundSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        scrollSprites: {
            default: [],
            type: cc.SpriteFrame
        },
        frameDecor: cc.Node,
        godKitchenFly: require("Bezier3D")
    },

    onLoad: function onLoad() {
        this.node.on("PLAY", this.play, this);
        this.node.on("HIDE", this.exit, this);
        this.node.opacity = 0;
        this.node.active = false;
        this.listOptions = [];
    },
    start: function start() {
        this.createOptions();
        this.koiPositionCache = this.godKitchen.position;
    },
    createOptions: function createOptions() {
        if (!this.listOptions || !this.listOptions.length) {
            for (var i = 0; i < this.scrollSprites.length; i++) {
                var option = cc.instantiate(this.optionPrefab);
                this.optionHolder.addChild(option);
                var scriptItem = option.getComponent('OptionController9983');
                if (scriptItem) {
                    scriptItem.updateData({
                        spinNumber: this.spinNumberSprites[i],
                        index: OPTION[i],
                        wildMultiply: this.wildMultiplySprites[i],
                        background: this.backgroundSprites[i],
                        scroll: this.scrollSprites[i],
                        spinImageList: this.spinNumberSprites,
                        wildMultiplyImageList: this.wildMultiplySprites
                    });
                    scriptItem.attachEvent(OPTION[i], this.selectOption.bind(this));
                    this.listOptions.push(option);
                }
            }
        }
    },
    resetCutscene: function resetCutscene() {
        this.isReady = false;
        this.clicked = false;
        if (this.listOptions && this.listOptions.length) {
            this.listOptions[3].emit('RESET_MYSTERY');
        }
    },
    play: function play(content, callback) {

        this.content = content;
        this.callback = callback;
        this.show();
        this.enter(content.mode);
    },
    enter: function enter() {
        var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "normal";

        this.gameSpeed = this.node.mainDirector.getGameSpeed();
        this.godKitchen.active = false;
        this.godKitchenNoKoi.active = true;
        this.godKitchenNoKoi.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        this.optionList.forEach(function (it) {
            it.opacity = 255;
            it.active = true;
        });
        this.randomList = [0, 1, 2, 3, 4, 5];
        this.resetCutscene();
        if (from == "normal" && this.gameSpeed < 2) {
            //if (this.node.soundPlayer) this.node.soundPlayer.playSFXMoveCamera();
            var animState = this.node.getComponent(cc.Animation).play("IntroFreeGameOption9983");
            animState.speed = 1 + this.gameSpeed;
        } else {
            this.node.getComponent(cc.Animation).play("FreeGameOptionNoIntro");
        }
        if (this.node.soundPlayer) this.node.soundPlayer.playSBGChooseOption();
        this.frameDecor.runAction(cc.fadeIn(0.2));
    },
    playOptionAnimation: function playOptionAnimation() {
        var _this = this;

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(0.8), cc.callFunc(function () {
            _this.autoSelectFunc = setTimeout(function () {
                _this.selectOption(Math.floor(Math.random() * 7) + 1);
            }, 11000);
            _this.isReady = true;
            _this.listOptions.forEach(function (item) {
                item.emit('CAN_CLICK', true);
            });
        })));
        this.listOptions.forEach(function (item) {
            item.emit('SCROLLING_ROLL');
        });
    },
    onCompletedntroAnim: function onCompletedntroAnim() {
        this.playOptionAnimation();
    },
    selectOption: function selectOption(option) {
        if (!this.isReady || this.clicked) return;
        this.option = option;
        this.clicked = true;
        this.listOptions.forEach(function (item) {
            item.emit('CAN_CLICK', false);
        });
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXPickOption();
        this.node.gSlotDataStore.freeSpinOption = this.option;
        this.node.mainDirector.gameStateManager.triggerFreeSpinOption(this.option);
        if (option == 7) {
            if (this.node.soundPlayer) this.node.soundPlayer.playSFXRandomOption();
            this.listOptions[3].emit('ROLL_MYSTERY');
        }

        if (this.autoSelectFunc) {
            clearTimeout(this.autoSelectFunc);
        }
    },
    hideNode: function hideNode() {
        var _this2 = this;

        if (this.callback && typeof this.callback == "function") {
            this.node.emit("STOP");
            this.callback();
        }
        this.clicked = false;
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this2.listOptions.forEach(function (item) {
                item.emit('RESET_DATA');
            });
            _this2.node.active = false;
            if (_this2.node.gSlotDataStore.currentGameMode == 'freeGame') {
                if (_this2.node.soundPlayer) _this2.node.soundPlayer.stopAllAudio();
                if (_this2.node.soundPlayer) _this2.node.soundPlayer.playMainBGM();
            }
        })));
    },
    exit: function exit() {
        var fsoi = this.node.gSlotDataStore.fsoi;

        var fsoiArr = fsoi.split(';');
        var freeSpinList = { //TODO: need to request BE to send id instead.
            "25": 1,
            "20": 2,
            "15": 3,
            "13": 4,
            "10": 5,
            "6": 6
        };
        this.playChoseAnim(fsoiArr[1], fsoiArr[2], freeSpinList[fsoiArr[0]]);
    },
    playChoseAnim: function playChoseAnim(choseOption, multiId, spinTimeId) {
        var delayEach = 0.2;
        for (var i = 0; i < this.listOptions.length; i++) {
            var option = this.listOptions[i];
            // let optionName = option.name;
            if (OPTION[i] != choseOption) {
                // let fadeTime = this.getRandomDelay() * delayEach;
                // option.runAction(cc.fadeOut(fadeTime));
                option.opacity = 120;
            } else {
                this.chooseOption = option;
            }
        }

        if (choseOption == '7') {
            this.chooseOption.emit('STOP_MYSTERY', multiId, spinTimeId, this.playParticleKoi.bind(this));
        } else {
            this.node.stopAllActions();
            this.node.runAction(cc.sequence(cc.delayTime(this.listOptions.length * delayEach), cc.callFunc(this.playParticleKoi.bind(this))));
        }
    },
    playParticleKoi: function playParticleKoi() {
        var _this3 = this;

        if (this.gameSpeed == 2) {
            this.hideNode();
        } else {
            var moveTime = 0.5 / (1 + this.gameSpeed);
            if (this.node.soundPlayer) this.node.soundPlayer.playSFXParticleKoi();
            this.particleKoi.node.position = this.node.parent.convertToNodeSpaceAR(this.chooseOption.parent.convertToWorldSpaceAR(this.chooseOption));
            var endPosition = this.godKitchenNoKoi.position;
            this.particleKoi.node.active = true;
            this.particleKoi.node.opacity = 0;
            this.particleKoi.resetSystem();
            this.particleKoi.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
                _this3.particleKoi.node.opacity = 255;
            }), cc.moveTo(moveTime, endPosition), cc.callFunc(function () {
                _this3.koiMoveOut();
            })));
        }
    },
    setGodKitchenType: function setGodKitchenType() {
        var skeleton = this.godKitchen.getComponent(sp.Skeleton);
        skeleton.setSkin(skinMapping[Number(this.option) - 1]);
        skeleton.setSlotsToSetupPose();
        this.godKitchenFly.node.active = true;
        var flySkeleton = this.godKitchenFly.node.getComponent(sp.Skeleton);
        flySkeleton.setSkin(flySkinMapping[Number(this.option) - 1]);
        flySkeleton.setSlotsToSetupPose();
        flySkeleton.setAnimation(0, 'animation', true);
        flySkeleton.timeScale = 2;
        skeleton.setAnimation(0, "Appear", false);
        skeleton.addAnimation(0, "Idle", true);
    },
    koiMoveOut: function koiMoveOut() {
        var _this4 = this;

        if (this.node.soundPlayer) this.node.soundPlayer.playSFXMoveKoi();
        console.log("Koi move out");
        this.particleKoi.node.active = false;
        this.godKitchen.active = true;
        this.setGodKitchenType();
        this.godKitchenNoKoi.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            _this4.godKitchenNoKoi.opacity = 255;
            _this4.godKitchenNoKoi.active = false;
        })));
        this.node.runAction(cc.sequence(cc.delayTime(0.6), cc.callFunc(function () {
            _this4.listOptions.forEach(function (option) {
                option.runAction(cc.fadeOut(0.2));
            });
            _this4.frameDecor.runAction(cc.fadeOut(0.2), cc.callFunc(function () {}));
            var animState = _this4.node.getComponent(cc.Animation).play("KoiMoveOut");
            animState.speed = 0.2 + 0.2 * _this4.gameSpeed;
        })));
    },
    onKoiMoveOut: function onKoiMoveOut() {
        var _this5 = this;

        this.godKitchenFly.tween(function () {
            _this5.godKitchen.active = false;
            _this5.godKitchen.position = _this5.koiPositionCache;
            _this5.hideNode();
        }, 2 - this.gameSpeed);
        //this.node.mainDirector.gameStateManager.triggerFreeSpinOption(this.option);
    },
    getRandomDelay: function getRandomDelay() {
        var random = Math.floor(Math.random() * this.randomList.length);
        return this.randomList.splice(random, 1);
    }
});

cc._RF.pop();