"use strict";
cc._RF.push(module, '8fc6dLcqUdIXJCjiDSkUBVo', 'ExtendSlotSoundPlayer');
// cc-common/cc-slot-base-test/ExtendScripts/ExtendSlotSoundPlayer.js

'use strict';

cc.Class({
    extends: require('SlotSoundPlayer'),

    playMainBGM: function playMainBGM(gameMode) {
        var currentGameMode = gameMode || this.node.gSlotDataStore.currentGameMode;
        var sound = this.bgmMain;
        var musicVolume = this.MUSIC_VOLUME;

        if (currentGameMode === "freeGame") {
            // if (this.bgmFreeGame) sound = this.bgmFreeGame;
            this.playSoundId('sfxAmbientFreeGame', true);
        } else if (currentGameMode === 'topupGame') {
            // if (this.bgmTopUpGame) sound = this.bgmTopUpGame;
        } else if (currentGameMode === 'freeOption') {
            // if (this.bgmFreeGameOption) sound = this.bgmFreeGameOption;
        } else if (currentGameMode === 'bonusGame') {
            // if (this.bgmBonus) sound = this.bgmBonus;
        }
        this.playMusic(sound, true, musicVolume);
    },
    playSFXId: function playSFXId(sfxId) {
        var isStopPreviousSfx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var currentSFX = this[sfxId];
        if (currentSFX) {
            if (isStopPreviousSfx && (currentSFX.currentSoundId || currentSFX.currentSoundId === 0)) {
                this.stopSound(currentSFX.currentSoundId);
            }
            currentSFX.currentSoundId = null;
            currentSFX.currentSoundId = this.playSFX(currentSFX);
        }
    },
    stopSFXId: function stopSFXId(sfxId) {
        var currentSFX = this[sfxId];
        if (currentSFX) {
            if (currentSFX.currentSoundId || currentSFX.currentSoundId === 0) {
                this.stopSound(currentSFX.currentSoundId);
                currentSFX.currentSoundId = null;
            }
        }
    },
    playSoundId: function playSoundId(soundId) {
        var isLoop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var currentSound = this[soundId];
        if (currentSound) {
            if (currentSound.currentSoundId || currentSound.currentSoundId === 0) {
                this.stopSound(currentSound.currentSoundId);
                currentSound.currentSoundId = null;
            }
            currentSound.currentSoundId = this.playSound(currentSound, isLoop);
        }
    },
    stopSoundId: function stopSoundId(soundId) {
        var currentSound = this[soundId];
        if (currentSound) {
            if (currentSound.currentSoundId || currentSound.currentSoundId === 0) {
                this.stopSound(currentSound.currentSoundId);
                currentSound.currentSoundId = null;
            }
        }
    }
});

cc._RF.pop();