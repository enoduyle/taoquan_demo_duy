"use strict";
cc._RF.push(module, '5bdb8pXPIVNyJuQbuPG1pip', 'SlotTableNearWinEffectv2');
// cc-common/cc-slotbase-v2/slotGame/table/SlotTableNearWinEffectv2.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        startAtScatterCount: 2,
        startAtBonusCount: 2,
        startAtJackpotCount: 4,
        stopAtScatterCount: 99,
        stopAtBonusCount: 99,
        reelParticle: cc.Node,
        sfxNearWin: {
            default: null,
            type: cc.AudioClip
        },
        paylineHolderNode: cc.Node,
        paylineNormalSymbol: cc.Prefab,
        bonusSymbol: 'R',
        scatterSymbol: 'A',
        jackpotSymbol: 'JP',
        isSkipNearWinTurbo: false
    },

    onLoad: function onLoad() {
        var _this = this;

        var payLineMatrix = this.node.config.PAY_LINE_MATRIX;
        this.payLineMatrixForCompare = [];
        if (payLineMatrix) {
            Object.keys(payLineMatrix).forEach(function (key) {
                _this.payLineMatrixForCompare.push(payLineMatrix[key].join().slice(0, -2));
            });
        }
    },
    start: function start() {
        this.node.on("REEL_STOP_NEARWIN", this.reelStopNearWin, this);
        this.node.on("TABLE_START_NEARWIN", this.reelReset, this);
        this.node.on("REEL_ABOUT_TO_STOP_NEARWIN", this.adjustReelDelay, this);
        this.reelReset();
        this.startPositionX = this.reelParticle.x;
    },
    reelReset: function reelReset() {
        if (this.nearWinSoundKey) {
            this.node.soundPlayer.stopSound(this.nearWinSoundKey);
            this.nearWinSoundKey = null;
        }
        this.hideParticleList();
        this.clearSymbolPaylines();
    },
    adjustReelDelay: function adjustReelDelay(_ref) {
        var reels = _ref.reels,
            data = _ref.data;

        var countScatter = 0;
        var countBonus = 0;
        var countJackpot = 0;
        var foundNearWin = false;
        var jackpotLine = '';
        this.nearWinList = [];
        var betLines = [];
        if (this.node.gSlotDataStore) {
            betLines = this.node.gSlotDataStore.betLines;
        }

        var isSkipWhenTurbo = this.isSkipNearWinTurbo && this.node.gSlotDataStore && this.node.gSlotDataStore.modeTurbo;
        for (var col = 0; col < data.length; col++) {
            var isNearWinScatter = countScatter >= this.startAtScatterCount && countScatter < this.stopAtScatterCount && !isSkipWhenTurbo;
            var isNearWinBonus = countBonus >= this.startAtBonusCount && countBonus < this.stopAtBonusCount && !isSkipWhenTurbo;
            var isNearWinJackpot = countJackpot >= this.startAtJackpotCount && !isSkipWhenTurbo;
            var isNearWin = isNearWinScatter || isNearWinBonus;
            var jpIndex = -1;
            for (var row = 0; row < data[col].length; ++row) {
                var symbolValue = data[col][row];
                if (symbolValue === this.bonusSymbol) {
                    countBonus++;
                    this.createPaylineSymbol(this.node.reels[col], symbolValue, col, row);
                } else if (symbolValue === this.scatterSymbol) {
                    countScatter++;
                    this.createPaylineSymbol(this.node.reels[col], symbolValue, col, row);
                } else if (symbolValue === this.jackpotSymbol) {
                    countJackpot++;
                    jpIndex = row;
                    this.createPaylineSymbol(this.node.reels[col], symbolValue, col, row);
                }
            }

            if (col !== data.length - 1) {
                jackpotLine += (col > 0 ? ',' : '') + jpIndex;
            }

            if (!isSkipWhenTurbo && betLines && betLines.length) {
                var jpInBetLine = false;
                for (var i = 0; i < betLines.length; i++) {
                    if (!jpInBetLine) {
                        jpInBetLine = this.payLineMatrixForCompare[betLines[i] - 1] === jackpotLine;
                    }
                }
                isNearWinJackpot = col === data.length - 1 && countJackpot >= 4 && jpInBetLine;
            }

            isNearWin = isNearWin || isNearWinJackpot;
            foundNearWin = foundNearWin || isNearWin;

            if (foundNearWin) {
                this.nearWinList[col] = { isNearWinScatter: isNearWinScatter, isNearWinBonus: isNearWinBonus, isNearWinJackpot: isNearWinJackpot, isNearWin: isNearWin };
                reels[col].extendTimeToStop(isNearWin);
            }
        }
    },
    reelStopNearWin: function reelStopNearWin(_ref2) {
        var count = _ref2.count,
            context = _ref2.context;

        this.hideParticleList();
        if (!context.isFastToResult) {
            this.runAnimationNearWin(this.scatterSymbol, count);
            this.runAnimationNearWin(this.bonusSymbol, count);
        }

        if (this.nearWinList[count] && this.nearWinList[count].isNearWin && !context.isFastToResult) {

            if (this.node.soundPlayer && !this.nearWinSoundKey) {
                this.nearWinSoundKey = this.node.soundPlayer.playSound(this.sfxNearWin, true);
            }

            var pos = this.startPositionX + count * this.node.config.SYMBOL_WIDTH;
            this.activeParticleList(pos);

            for (var i = count; i < this.node.reels.length; i++) {
                if (this.nearWinList[i] && this.nearWinList[i].isNearWin) this.node.reels[i].adjustReelSpeed(this.node.config.SUPER_TURBO);
            }

            if (count === this.node.reels.length - 1) {
                cc.director.getScheduler().schedule(function () {
                    this.node.reels[count].adjustReelSpeed(this.node.curentConfig.TIME);
                }, this, 0, 0, 1, false);
            }

            if (this.nearWinList[count].isNearWinScatter) {
                this.runAnimationNearWin(this.scatterSymbol, count);
            }

            if (this.nearWinList[count].isNearWinBonus) {
                this.runAnimationNearWin(this.bonusSymbol, count);
            }

            if (this.nearWinList[count].isNearWinJackpot) {
                this.runAnimationNearWin(this.jackpotSymbol, count);
            }
        } else {
            if (this.nearWinSoundKey) {
                this.node.soundPlayer.stopSound(this.nearWinSoundKey);
                this.nearWinSoundKey = null;
            }
        }
        if (count >= this.node.reels.length) {
            this.clearSymbolPaylines();
            this.hideParticleList();
        }
    },
    hideParticleList: function hideParticleList() {
        this.reelParticle.active = false;
    },
    activeParticleList: function activeParticleList(pos) {
        this.reelParticle.active = true;
        this.reelParticle.x = pos;
    },
    clearSymbolPaylines: function clearSymbolPaylines() {
        var _this2 = this;

        if (!this.paylineNormalSymbol || !this.paylineHolderNode) return;
        this.paylineHolderNode.children.forEach(function (paylineSymbol) {
            if (paylineSymbol) {
                var col = paylineSymbol.col,
                    row = paylineSymbol.row,
                    symbol = paylineSymbol.symbol;

                _this2.node.emit('SHOW_STATIC_SYMBOL', col, row, symbol, true);
            }
        });
        this.paylineHolderNode.opacity = 0;
        this.paylineHolderNode.removeAllChildren();
    },
    runAnimationNearWin: function runAnimationNearWin(symbolName, currentIndex) {
        var _this3 = this;

        if (!this.paylineNormalSymbol || !this.paylineHolderNode || !symbolName) return;

        this.paylineHolderNode.opacity = 255;
        this.paylineHolderNode.children.forEach(function (paylineSymbol) {
            if (paylineSymbol.symbol === symbolName && paylineSymbol.col < currentIndex && !paylineSymbol.isShowing) {
                paylineSymbol.opacity = 255;
                paylineSymbol.isShowing = true;
                paylineSymbol.enableHighlight();
                paylineSymbol.playAnimation(1, true);
            }
            if (paylineSymbol.symbol === symbolName) {
                var col = paylineSymbol.col,
                    row = paylineSymbol.row,
                    symbol = paylineSymbol.symbol;

                _this3.node.emit('SHOW_STATIC_SYMBOL', col, row, symbol, false);
            }
        });
    },
    getXPosition: function getXPosition(index) {
        var startX = -(this.node.config.TABLE_FORMAT.length / 2 - 0.5) * this.node.config.SYMBOL_WIDTH;
        return startX + this.node.config.SYMBOL_WIDTH * index;
    },
    createPaylineSymbol: function createPaylineSymbol(reel, symbol, col, row) {
        if (!this.paylineNormalSymbol || !this.paylineHolderNode) return;

        var paylineSymbol = cc.instantiate(this.paylineNormalSymbol);
        paylineSymbol.parent = this.paylineHolderNode;
        paylineSymbol.x = this.getXPosition(col);
        paylineSymbol.y = (reel.showNumber / 2 - row - 0.5) * this.node.config.SYMBOL_HEIGHT;
        paylineSymbol.col = col;
        paylineSymbol.row = row;
        paylineSymbol.isShowing = false;
        paylineSymbol.symbol = symbol;
        paylineSymbol.changeToSymbol(symbol);
        paylineSymbol.disableHighlight();
    }
});

cc._RF.pop();