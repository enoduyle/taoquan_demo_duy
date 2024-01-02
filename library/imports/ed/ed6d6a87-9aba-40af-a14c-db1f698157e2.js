"use strict";
cc._RF.push(module, 'ed6d6qHmrpAr6FM2x9pgVfi', 'SlotTableSoundEffect9983');
// cc-taoquan-9983/scripts/table/SlotTableSoundEffect9983.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.on("REEL_STOP_SOUND", this.reelStopSound, this);
        this.node.on("STOP_SPINNING_SOUND", this.reelStopSpinningSound, this);
        this.node.on("TABLE_START_SOUND", this.reelStartSound, this);
    },
    reelStopSpinningSound: function reelStopSpinningSound() {},
    reelStartSound: function reelStartSound() {
        this.canGetFree = true;
    },
    reelStopSound: function reelStopSound(_ref) {
        var matrix = _ref.matrix,
            count = _ref.count,
            context = _ref.context;
        // count: 1 -> 5;
        var realMatrix = matrix.slice() /*copy*/.splice(1, matrix.length - 2); /*remove first and last*/

        if (this.canGetFree) {
            if (realMatrix.indexOf("A") > -1) {
                if (context.node.mode == 'TURBO' || context.isFastToResult) {
                    // play sound once 
                    if (count === 1) {
                        this.node.soundPlayer && this.node.soundPlayer.playSFXScatter(count - 1);
                    }
                } else {
                    this.node.soundPlayer && this.node.soundPlayer.playSFXScatter(count - 1);
                }
            } else {
                this.canGetFree = false; // scatters broken. not playsound anymore
            }
        }

        if (count >= this.node.reels.length) {
            this.allReelStopSound();
        }
    },
    allReelStopSound: function allReelStopSound() {}
});

cc._RF.pop();