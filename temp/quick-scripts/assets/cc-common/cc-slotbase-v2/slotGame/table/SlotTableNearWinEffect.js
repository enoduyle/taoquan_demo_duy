(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/SlotTableNearWinEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '49846W0nUNAupRbyj3XtUDw', 'SlotTableNearWinEffect', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/SlotTableNearWinEffect.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        stopAtScatterNumber: 99,
        stopAtBonusNumber: 3,
        reelParticle: cc.Node,
        reelParticle1: cc.Node,
        sfxNearWin: {
            default: null,
            type: cc.AudioClip
        }
    },

    start: function start() {
        this.node.on("REEL_STOP_NEARWIN", this.reelStopNearWin, this);
        this.node.on("TABLE_START_NEARWIN", this.reelReset, this);
        this.node.on("REEL_ABOUT_TO_STOP_NEARWIN", this.adjustReelDelay, this);

        this.particleList = [];
        if (this.reelParticle) this.particleList.push(this.reelParticle);
        if (this.reelParticle1) this.particleList.push(this.reelParticle1);

        this.reelReset();
    },
    reelReset: function reelReset() {
        this.playSoundNearWin = false;
        this.getFirstNearWin = false;
        this.activeParticleList({ isActive: false, opacity: 0 });
        if (this.node.config.SKIP_NEAR_WIN_TURBO === true && this.node.gSlotDataStore.modeTurbo === true) {
            this.skipNearWin = true;
        } else {
            this.skipNearWin = false;
        }
    },
    adjustReelDelay: function adjustReelDelay(_ref) {
        var reels = _ref.reels,
            data = _ref.data;

        var countScatter = 0;
        var countBonus = 0;
        this.nearWinList = [];

        for (var col = 0; col < data.length; ++col) {
            var isNearWinScatter = countScatter >= 2;
            var isNearWinBonus = countBonus >= 2;
            var isNearWin = isNearWinScatter || isNearWinBonus;

            for (var row = 0; row < data[col].length; ++row) {
                var symbolValue = data[col][row];
                if (symbolValue === 'R') {
                    countBonus++;
                } else if (symbolValue === 'A') {
                    countScatter++;
                }
            }

            if (isNearWin) {
                this.nearWinList[col] = { isNearWinScatter: isNearWinScatter, isNearWinBonus: isNearWinBonus, isNearWin: isNearWin };
                reels[col].extendTimeToStop();
            }

            this.getFirstNearWin = countBonus >= this.stopAtBonusNumber || countScatter >= this.stopAtScatterNumber;
        }
    },
    reelStopNearWin: function reelStopNearWin(_ref2) {
        var count = _ref2.count,
            context = _ref2.context;

        //back to normal mode, normal speed....
        //Where to calculate this???
        if (this.getFirstNearWin && !context.isFastToResult) {
            for (var i = count; i < this.node.reels.length; i++) {
                this.node.reels[i].adjustReelSpeed(this.node.curentConfig.TIME);
                if (this.nearWinList[i] && this.nearWinList[i].isNearWin) {
                    this.nearWinList[i].isNearWin = false;
                }
            }
            this.hideParticleList(0, .5);
            context.isFastToResult = true;
        }

        if (this.nearWinList[count] && this.nearWinList[count].isNearWin && !context.isFastToResult) {

            if (this.playSoundNearWin === false) {
                this.playSoundNearWin = true;
                if (this.node.soundPlayer) {
                    this.nearWinSoundKey = this.node.soundPlayer.playSound(this.sfxNearWin);
                }
            }
            var x = context.getXPosition(count) - this.node.config.TABLE_SHIFT_X - 15;
            var x1 = context.getXPosition(count + 1) - this.node.config.TABLE_SHIFT_X - 15;

            this.activeParticleList({ isActive: true, opacity: 255 });
            this.setPosParticleList([x, x1]);

            for (var _i = count; _i < this.node.reels.length; _i++) {
                this.node.reels[_i].adjustReelSpeed(this.node.config.SUPER_TURBO);
            }

            if (count === this.node.reels.length - 1) {
                cc.director.getScheduler().schedule(function () {
                    this.node.reels[count].adjustReelSpeed(this.node.curentConfig.TIME);
                }, this, 0, 0, 1, false);
            }

            //TODO: wonder do we need to
            if (this.nearWinList[count].isNearWinScatter) {
                this.runAnimationNearWin('A', count);
            }

            if (this.nearWinList[count].isNearWinBonus) {
                this.runAnimationNearWin('R', count);
            }
        }
        if (count >= this.node.reels.length) {
            if (this.nearWinList[count - 1] && this.nearWinList[count - 1].isNearWinScatter < 3 && this.nearWinList[count - 1].isNearWinBonus < 3) {
                this.clearBonusPaylines();
            }
            this.hideParticleList({ isActive: false });
        }
    },
    hideParticleList: function hideParticleList() {
        // will do making some animation on these particles late.
        // currently will hidden right now.
        this.activeParticleList({ isActive: false, opacity: 0 });
        if (this.node.soundPlayer && this.nearWinSoundKey) {
            this.node.soundPlayer.stopSound(this.nearWinSoundKey);
            this.nearWinSoundKey = null;
        }
    },
    activeParticleList: function activeParticleList(object) {
        for (var i = 0; i < this.particleList.length; i++) {
            var item = this.particleList[i];
            if (object.isActive !== undefined) {
                item.active = object.isActive;
            }
            if (object.opacity !== undefined) {
                item.opacity = object.opacity;
            }
        }
    },
    setPosParticleList: function setPosParticleList(posArr) {
        for (var i = 0; i < this.particleList.length; i++) {
            this.particleList[i].x = posArr[i];
        }
    },
    clearBonusPaylines: function clearBonusPaylines() {},
    runAnimationNearWin: function runAnimationNearWin() {}
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
        //# sourceMappingURL=SlotTableNearWinEffect.js.map
        