(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/SoundPlayer9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3b970Ra43JCM4Ay4pfS5w8z', 'SoundPlayer9983', __filename);
// cc-taoquan-9983/scripts/common/SoundPlayer9983.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: require('WebSoundPlayer').WebSoundPlayer,

    properties: {
        bgmFree: {
            default: null,
            type: cc.AudioClip
        },
        winAnimationLoop: {
            default: null,
            type: cc.AudioClip
        },
        winAnimationEnd: {
            default: null,
            type: cc.AudioClip
        },
        sfxMultiplier: {
            default: [],
            type: cc.AudioClip
        },
        sfxParticleMultiplier: {
            default: null,
            type: cc.AudioClip
        },
        sfxTotalWin: {
            default: null,
            type: cc.AudioClip
        },
        sfxLenChau: {
            default: null,
            type: cc.AudioClip
        },
        sfxCloud1: {
            default: null,
            type: cc.AudioClip
        },
        sfxCloud2: {
            default: null,
            type: cc.AudioClip
        },
        sfxPickOption: {
            default: null,
            type: cc.AudioClip
        },
        sbgChooseOption: {
            default: null,
            type: cc.AudioClip
        },
        sfxRandomOption: {
            default: null,
            type: cc.AudioClip
        },
        sfx_free_pick_end: {
            default: null,
            type: cc.AudioClip
        },
        sfxParticleKoi: {
            default: null,
            type: cc.AudioClip
        },
        sfxMoveKoi: {
            default: null,
            type: cc.AudioClip
        },
        sfxSubsymbolGrand: {
            default: null,
            type: cc.AudioClip
        },
        sfxSubsymbolMajor: {
            default: null,
            type: cc.AudioClip
        },
        sfxScatter: {
            default: [],
            type: cc.AudioClip
        },
        sfxWinLine: {
            default: [],
            type: cc.AudioClip
        },
        vfxFishFakeMiss: { default: null, type: cc.AudioClip },
        vfxFishRealMiss: { default: null, type: cc.AudioClip },
        vfxFishSilverMoving: { default: null, type: cc.AudioClip },
        vfxFishSilverWin: { default: null, type: cc.AudioClip },
        vfxFishGoldMoving: { default: null, type: cc.AudioClip },
        vfxFishGoldWin: { default: null, type: cc.AudioClip }
    },
    onExtendedLoad: function onExtendedLoad() {
        var _this = this;

        this.sfxMultiplierList = convertAssetArrayToObject(this.sfxMultiplier);
        this.node.on("STOP_ALL_AUDIO", this.stopAllAudio, this);
        this.node.on("PLAY_WIN_LOOP", this.playWinLoop, this);
        this.node.on("STOP_WIN_LOOP", this.stopWinLoop, this);
        this.node.on("PLAY_WIN_END", this.playWinEnd, this);
        this.node.on("PLAY_SOUND_BACKGROUND", this.playMainBGM, this);
        this.node.on("PLAY_SUBSYMBOL_MAJOR", function (ev) {
            _this.playSubsymbolMajor();
            ev.stopPropagation();
        });
        this.node.on("PLAY_SUBSYMBOL_GRAND", function (ev) {
            _this.playSubsymbolGrand();
            ev.stopPropagation();
        });
    },
    playMainBGM: function playMainBGM(gameMode) {
        var currentGameMode = gameMode || this.node.gSlotDataStore.currentGameMode;
        var sound = this.bgmMain;
        if (currentGameMode === 'freeGame') {
            if (this.bgmFree) sound = this.bgmFree;
        }
        this.playMusic(sound, true, this.MUSIC_VOLUME);
    },
    playWinLoop: function playWinLoop() {
        if (!this.isEnableSFX) return;
        if (this.audioWinLoopValue) {
            this.stopSound(this.audioWinLoopValue);
        }
        this.audioWinLoopValue = this.playSound(this.winAnimationLoop, true, 1);
    },
    stopWinLoop: function stopWinLoop() {
        this.stopSound(this.audioWinLoopValue);
    },
    playWinEnd: function playWinEnd() {
        if (!this.isEnableSFX) return;
        if (this.audioWinEndValue) {
            this.stopSound(this.audioWinEndValue);
        }
        this.audioWinEndValue = this.playSound(this.winAnimationEnd, false, 1);
    },
    stopWinEnd: function stopWinEnd() {
        this.stopSound(this.audioWinEndValue);
    },
    playSFXWinLine: function playSFXWinLine() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (!this.isEnableSFX) return;
        this.playSound(this.sfxWinLine[index - 1], false, 1);
    },
    playParticleMultiplier: function playParticleMultiplier() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxParticleMultiplier, false, 1);
    },
    playMultiplier: function playMultiplier() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

        if (!this.isEnableSFX) return;
        this.playSound(this.sfxMultiplierList['wildx' + value], false, 1);
    },
    playSFXTotalWin: function playSFXTotalWin() {
        if (!this.isEnableSFX) return;
        this.audioTotalWin = this.playSound(this.sfxTotalWin, false, 1);
    },
    stopSFXTotalWin: function stopSFXTotalWin() {
        if (this.audioTotalWin) {
            this.stopSound(this.audioTotalWin);
            this.audioTotalWin = null;
        }
    },
    playSFXLenChau: function playSFXLenChau() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxLenChau, false, 1);
    },
    playSFXCloud1: function playSFXCloud1() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxCloud1, false, 1);
    },
    playSFXCloud2: function playSFXCloud2() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxCloud2, false, 1);
    },
    playSFXPickOption: function playSFXPickOption() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxPickOption, false, 1);
    },
    playSBGChooseOption: function playSBGChooseOption() {
        if (!this.isEnableBGM) return;
        this.playMusic(this.sbgChooseOption, true, this.MUSIC_VOLUME);
    },
    playSFXRandomOption: function playSFXRandomOption() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxRandomOption, false, 1);
    },
    playSFXOptionPickEnd: function playSFXOptionPickEnd() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfx_free_pick_end, false, 1);
    },
    playSFXParticleKoi: function playSFXParticleKoi() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxParticleKoi, false, 1);
    },
    playSFXMoveKoi: function playSFXMoveKoi() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxMoveKoi, false, 1);
    },
    playSubsymbolGrand: function playSubsymbolGrand() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxSubsymbolGrand, false, 1);
    },
    playSubsymbolMajor: function playSubsymbolMajor() {
        if (!this.isEnableSFX) return;
        this.playSound(this.sfxSubsymbolMajor, false, 1);
    },
    playSFXScatter: function playSFXScatter() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (!this.isEnableSFX) return;
        this.playSound(this.sfxScatter[index], false, 1);
    },
    playSfxFishFlying: function playSfxFishFlying() {
        var isGoldFish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!this.isEnableSFX) return;
        this.playSFX(isGoldFish ? this.vfxFishGoldMoving : this.vfxFishSilverMoving);
    },
    playSfxGoldFishWin: function playSfxGoldFishWin() {
        if (!this.isEnableSFX) return;
        this.playSFX(this.vfxFishGoldWin);
    },
    playSfxSilverFishWin: function playSfxSilverFishWin() {
        if (!this.isEnableSFX) return;
        this.playSFX(this.vfxFishSilverWin);
    },
    playSfxRealFishMiss: function playSfxRealFishMiss() {
        if (!this.isEnableSFX) return;
        this.playSFX(this.vfxFishRealMiss);
    },
    playSfxFakeFishMiss: function playSfxFakeFishMiss() {
        if (!this.isEnableSFX) return;
        this.playSFX(this.vfxFishFakeMiss);
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
        //# sourceMappingURL=SoundPlayer9983.js.map
        