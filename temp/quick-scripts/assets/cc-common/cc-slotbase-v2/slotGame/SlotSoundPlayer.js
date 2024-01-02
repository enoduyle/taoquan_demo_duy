(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/SlotSoundPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e15f8KaTzBCyJ+++u6SY/U8', 'SlotSoundPlayer', __filename);
// cc-common/cc-slotbase-v2/slotGame/SlotSoundPlayer.js

'use strict';

cc.Class({
    extends: require('WebSoundPlayer').WebSoundPlayer,

    playMainBGM: function playMainBGM() {
        var _this = this;

        var mode = this.node.gSlotDataStore.currentGameMode;
        if (!this.isEnableBGM) return;
        var soundBG = this.bgmMain;
        if (mode == 'freeGame') {
            soundBG = this.bgmFree;
        } else if (mode == "bonusGame") {
            soundBG = this.bgmBonus;
        }
        soundBG = soundBG || this.bgmMain; // ! cover invalid sounds
        if (this.currentBGM === soundBG) return;
        if (this.currentBGM && this.currentBGM !== soundBG) {
            var dur = 0.5;
            this.fadeMusicTo(dur, 0);
            cc.tween(this.node).delay(dur).call(function () {
                _this.playMusic(soundBG, true);
                _this.tweenMusic = _this.fadeMusicTo(dur, _this.MUSIC_VOLUME);
            }).delay(dur).call(function () {
                _this.tweenMusic = null;
            }).start();
        } else {
            this.playMusic(soundBG, true, this.MUSIC_VOLUME);
        }
    },
    getMusicCurrentTime: function getMusicCurrentTime() {
        if (this.webSound) {
            return this.musicInstance.seek();
        } else {
            return cc.audioEngine.getCurrentTime(this.ccMusic);
        }
    },
    getSFXCurrentTime: function getSFXCurrentTime(id) {
        if (!id) return 0;
        if (this.webSound) {
            return 0; //TODO support for howler;
        } else {
            var progress = cc.audioEngine.getCurrentTime(id);
            return progress;
        }
    },


    // Empty function for override
    playSfxTurboClick: function playSfxTurboClick() {
        this.playSFXClick();
    },
    playSfxPopupOpen: function playSfxPopupOpen() {},
    playSfxPopupClose: function playSfxPopupClose() {},
    playSfxResult: function playSfxResult() {},
    playSoundNearWin: function playSoundNearWin() {},
    stopSoundNearWin: function stopSoundNearWin() {}
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
        //# sourceMappingURL=SlotSoundPlayer.js.map
        