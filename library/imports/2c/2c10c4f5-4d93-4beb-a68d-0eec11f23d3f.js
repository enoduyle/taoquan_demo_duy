"use strict";
cc._RF.push(module, '2c10cT1TZNL66aNDuwR8j0/', 'SlotTableSoundEffectv2');
// cc-common/cc-slotbase-v2/slotGame/table/SlotTableSoundEffectv2.js

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
    New Rule: Play sound when win above 3 symbol A, R - 5 symbol JP
*/
cc.Class({
    extends: cc.Component,

    properties: {
        sfxBonuses: {
            default: [],
            type: cc.AudioClip
        },
        sfxScatters: {
            default: [],
            type: cc.AudioClip
        },
        sfxJackpots: {
            default: [],
            type: cc.AudioClip
        },
        startSoundBonus: 3,
        startSoundScatter: 3,
        startSoundJackpot: 5
    },

    onLoad: function onLoad() {
        var _this = this;

        var payLineMatrix = this.node.config.PAY_LINE_MATRIX;
        this.payLineMatrixForCompare = [];
        if (payLineMatrix) {
            Object.keys(payLineMatrix).forEach(function (key) {
                _this.payLineMatrixForCompare.push(payLineMatrix[key].join());
            });
        }
    },
    start: function start() {
        this.node.on('TABLE_START_SOUND', this.reelStartSound, this);
        this.node.on('REEL_STOP_SOUND', this.reelStopSound, this);
    },
    reelStartSound: function reelStartSound() {
        this.countBonus = 0;
        this.countScatter = 0;
        this.countJackpot = 0;

        this.playedSoundBonus = [];
        this.playedSoundScatter = [];
        this.playedSoundJackpot = [];

        this.bonusPlaylist = [].concat(_toConsumableArray(this.sfxBonuses));
        this.scatterPlaylist = [].concat(_toConsumableArray(this.sfxScatters));
        this.jackpotPlayList = [].concat(_toConsumableArray(this.sfxJackpots));

        this.jackpotLine = '';
    },
    reelStopSound: function reelStopSound(_ref) {
        var matrix = _ref.matrix,
            count = _ref.count;

        var jpIndex = -1;
        for (var k = 1; k <= matrix.length - (matrix.length === 5 ? 2 : 1); k++) {
            var value = matrix[k];
            if (value === 'R') {
                this.countBonus++;
            } else if (value === 'A') {
                this.countScatter++;
            } else if (value === 'JP') {
                this.countJackpot++;
                jpIndex = k - 1;
            }
        }

        this.jackpotLine += (count > 1 ? ',' : '') + jpIndex;

        this._playSound(this.countBonus, this.startSoundBonus, this.playedSoundBonus, this.bonusPlaylist);
        this._playSound(this.countScatter, this.startSoundScatter, this.playedSoundScatter, this.scatterPlaylist);
        if (this.payLineMatrixForCompare.includes(this.jackpotLine)) {
            this._playSound(this.countJackpot, this.startSoundJackpot, this.playedSoundJackpot, this.jackpotPlayList);
        }
    },
    _playSound: function _playSound(countSymbol, startSoundSymbol, playedSoundSymbol, sfxSymbols) {
        if (countSymbol >= startSoundSymbol && !playedSoundSymbol.includes(countSymbol) && sfxSymbols.length) {
            playedSoundSymbol.push(countSymbol);
            var sound = sfxSymbols.shift();
            if (sound && this.node.soundPlayer) {
                this.node.soundPlayer.playSFX(sound);
            }
        }
    }
});

cc._RF.pop();