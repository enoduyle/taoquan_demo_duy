(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/SoundPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d808xIdR1Gs5cj8pTKFNBs', 'SoundPlayer', __filename);
// cc-common/cc-share-v1/common/SoundPlayer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        sfxClick: {
            default: null,
            type: cc.AudioClip
        },
        bgmMain: {
            default: null,
            type: cc.AudioClip
        },
        storageKeyBGM: "enableBackgroundMusic",
        storageKeySFX: "enableSound"
    },

    onLoad: function onLoad() {
        this.setDefaultVolume();
        this.isEnableBGM = false;
        this.isEnableSFX = false;
        this.node.on("PLAY_SOUND", this.playSound, this);
        this.node.on("STOP_SOUND", this.stopSound, this);
        this.node.on("PLAY_CLICK", this.playSFXClick, this);
        this.node.on("PLAY_SFX", this.playSFX, this);
        this.emit = this.node.emit;
        this.node.soundPlayer = this;
        this.isWebSoundClient2 = cc.sys.isNative && typeof closeCreatorGame === 'function';
        this.storageKeyBGM = this.isWebSoundClient2 ? "user_bg_music" : this.storageKeyBGM;
        this.storageKeySFX = this.isWebSoundClient2 ? "user_fx_sound" : this.storageKeySFX;
        this.isEnableBGM = this.readBGMKey();
        this.isEnableSFX = this.readSFXKey();
        this.onExtendedLoad();
    },
    readBGMKey: function readBGMKey() {
        var isEnableBGM = cc.sys.localStorage.getItem(this.storageKeyBGM);
        var result = isEnableBGM != null ? JSON.parse(isEnableBGM) : true;
        return result;
    },
    readSFXKey: function readSFXKey() {
        var isEnableSFX = cc.sys.localStorage.getItem(this.storageKeySFX);
        var result = isEnableSFX != null ? JSON.parse(isEnableSFX) : true;
        return result;
    },
    setDefaultVolume: function setDefaultVolume() {
        var _ref = this.node.config || {},
            MUSIC_VOLUME = _ref.MUSIC_VOLUME,
            SOUND_EFFECT_VOLUME = _ref.SOUND_EFFECT_VOLUME;

        this.MUSIC_VOLUME = MUSIC_VOLUME || 0.5;
        this.SOUND_EFFECT_VOLUME = SOUND_EFFECT_VOLUME || 1;
        cc.audioEngine.setEffectsVolume(this.SOUND_EFFECT_VOLUME);
        cc.audioEngine.setMusicVolume(this.MUSIC_VOLUME);
    },
    onExtendedLoad: function onExtendedLoad() {},
    start: function start() {},
    sfxToggle: function sfxToggle() {
        this.isEnableSFX = !this.isEnableSFX;
        if (this.node.gSlotDataStore) this.node.gSlotDataStore.isEnableSFX = this.isEnableSFX;

        if (this.isWebSoundClient2) {
            cc.sys.localStorage.setItem(this.storageKeySFX, this.isEnableSFX ? "1" : "0");
        } else {
            cc.sys.localStorage.setItem(this.storageKeySFX, this.isEnableSFX);
        }

        if (!this.isEnableSFX) {
            cc.audioEngine.stopAllEffects();
        }
    },
    bgmToggle: function bgmToggle() {
        this.isEnableBGM = !this.isEnableBGM;
        if (this.node.gSlotDataStore) this.node.gSlotDataStore.isEnableBGM = this.isEnableBGM;

        if (this.isWebSoundClient2) {
            cc.sys.localStorage.setItem(this.storageKeyBGM, this.isEnableBGM ? "1" : "0");
        } else {
            cc.sys.localStorage.setItem(this.storageKeyBGM, this.isEnableBGM);
        }

        if (this.isEnableBGM) {
            this.playMainBGM();
        } else {
            cc.audioEngine.pauseMusic();
        }
    },
    playMusic: function playMusic(audio) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.MUSIC_VOLUME;

        if (!this.isEnableBGM) return;
        if (cc.audioEngine.isMusicPlaying() && this.currentBGM === audio) {
            return; // return if this bgm audio is playing
        }
        cc.audioEngine.playMusic(audio, loop);
        cc.audioEngine.setMusicVolume(volume);
        this.currentBGM = audio;
    },
    playSFXClick: function playSFXClick() {
        if (!this.isEnableSFX) return;
        cc.audioEngine.playEffect(this.sfxClick);
    },
    playSFX: function playSFX(sfx) {
        if (!this.isEnableSFX) return;
        return cc.audioEngine.playEffect(sfx);
    },
    playMainBGM: function playMainBGM() {
        if (!this.isEnableBGM) return;
        this.playMusic(this.bgmMain, true);
    },
    playSound: function playSound(sound) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.SOUND_EFFECT_VOLUME;

        if (!this.isEnableSFX) return;
        return cc.audioEngine.play(sound, loop, volume);
    },
    stopSound: function stopSound(soundkey) {
        cc.audioEngine.stop(soundkey);
    },
    stopAllAudio: function stopAllAudio() {
        cc.audioEngine.stopAll();
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
        //# sourceMappingURL=SoundPlayer.js.map
        