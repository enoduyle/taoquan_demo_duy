(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotTableSoundEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f1d33VYl7ZJIKYFOEnAXZ6j', 'SlotTableSoundEffect', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotTableSoundEffect.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        sfxReelSpinning: {
            default: null,
            type: cc.AudioClip
        },
        sfxReelStop: {
            default: null,
            type: cc.AudioClip
        },
        sfxBonus1: {
            default: null,
            type: cc.AudioClip
        },
        sfxBonus2: {
            default: null,
            type: cc.AudioClip
        },
        sfxBonus3: {
            default: null,
            type: cc.AudioClip
        },
        sfxScatter1: {
            default: null,
            type: cc.AudioClip
        },
        sfxScatter2: {
            default: null,
            type: cc.AudioClip
        },
        sfxScatter3: {
            default: null,
            type: cc.AudioClip
        },

        bonusSymbol: 'R',
        scatterSymbol: 'A'
    },

    start: function start() {
        this.node.on("REEL_STOP_SOUND", this.reelStopSound, this);
        this.node.on("TABLE_START_SOUND", this.reelStartSound, this);
    },
    reelStartSound: function reelStartSound() {
        this.countBonus = 0;
        this.countScatter = 0;
        if (this.node.soundPlayer) this.soundSpinId = this.node.soundPlayer.playSFX(this.sfxReelSpinning);
    },
    reelStopSound: function reelStopSound(_ref) {
        var matrix = _ref.matrix,
            count = _ref.count;

        var isSpecialSoundBonus = null;
        var isSpecialSoundScatter = null;
        for (var k = 1; k < matrix.length - 1; k++) {
            var value = matrix[k];
            if (value === this.bonusSymbol) {
                this.countBonus++;
                isSpecialSoundBonus = value;
            } else if (value === this.scatterSymbol) {
                this.countScatter++;
                isSpecialSoundScatter = value;
            }
        }

        if (count - this.countBonus > 2) {
            isSpecialSoundBonus = null;
        }
        if (count - this.countScatter > 2) {
            isSpecialSoundScatter = null;
        }

        if (isSpecialSoundBonus) {
            var sfxSpecia = this.sfxBonus1;
            if (this.countBonus >= 3) {
                sfxSpecia = this.sfxBonus3;
            } else if (this.countBonus == 2) {
                sfxSpecia = this.sfxBonus2;
            }
            if (this.node.soundPlayer) this.node.soundPlayer.playSFX(sfxSpecia);
        } else if (isSpecialSoundScatter) {
            var _sfxSpecia = this.sfxScatter1;
            if (this.countScatter >= 3) {
                _sfxSpecia = this.sfxScatter3;
            } else if (this.countScatter == 2) {
                _sfxSpecia = this.sfxScatter2;
            }
            if (this.node.soundPlayer) this.node.soundPlayer.playSFX(_sfxSpecia);
        } else {
            if (this.node.soundPlayer) this.node.soundPlayer.playSFX(this.sfxReelStop);
        }

        if (count >= this.node.reels.length) {
            this.node.soundPlayer.stopSound(this.soundSpinId);
            this.allReelStopSound();
        }
    },
    allReelStopSound: function allReelStopSound() {}
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
        //# sourceMappingURL=SlotTableSoundEffect.js.map
        