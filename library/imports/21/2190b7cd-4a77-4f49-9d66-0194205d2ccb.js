"use strict";
cc._RF.push(module, '2190bfNSndPSZ1mAZQgXSzL', 'NearWinTable');
// cc-common/cc-slotbase-v2/slotGame/table/NearWinTable.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        nearWinEffect: cc.Node,
        symbolsHolder: cc.Node,
        symbolPrefab: cc.Prefab,
        bonusSymbol: 'R',
        scatterSymbol: 'A',
        jackpotSymbol: 'JP',
        startAtScatterCount: 2,
        stopAtScatterCount: 5,
        startAtBonusCount: 2,
        stopAtBonusCount: 5,
        startAtJackpotCount: 4,
        isSkipNearWinTurbo: true
    },

    onLoad: function onLoad() {
        this._startX = -(this.node.config.TABLE_FORMAT.length / 2 - 0.5) * this.node.config.SYMBOL_WIDTH;
        this._nearWinSymbols = [];
        this._countScatter = 0;
        this._countBonus = 0;
        this._countJp = 0;
        this._nearWinData = [];
        this._nearWinAnim = null;
        this._getAnimNearWin();
    },
    start: function start() {
        this.node.on("REEL_ABOUT_TO_STOP_NEARWIN", this.setupNearWin, this);
        this.node.on("REEL_STOP_NEARWIN", this.reelStopNearWin, this);
        this.node.on("TABLE_START_NEARWIN", this.resetNearWin, this);
    },


    /**
     * @API
     */
    setupNearWin: function setupNearWin(_ref) {
        var reels = _ref.reels,
            data = _ref.data;

        var matrix = this._getMatrix(data);
        this._isSkipEffect = this.isSkipNearWinTurbo && reels[0].curentConfig.mode === "TURBO";

        for (var col = 0; col < matrix.length; col++) {
            this._setDataNearWin(col);
            var isNearWin = this._nearWinData[col].isNearWin;

            reels[col].extendTimeToStop(isNearWin);

            for (var symbolName, row = 0; row < matrix[col].length; row++) {
                symbolName = matrix[col][row];
                if (symbolName === this.bonusSymbol) {
                    this._countBonus++;
                    this._canWinBonus(col) && this._createSymbol(this.bonusSymbol, col, row);
                }
                if (symbolName === this.scatterSymbol) {
                    this._countScatter++;
                    this._canWinFree(col) && this._createSymbol(this.scatterSymbol, col, row);
                }
                if (symbolName === this.jackpotSymbol) {
                    this._countJp++;
                    this._canWinJP(col) && this._createSymbol(this.jackpotSymbol, col, row);
                }
            }
            this._nearWinData[col].canWinBonus = this._canWinBonus(col);
            this._nearWinData[col].canWinFree = this._canWinFree(col);
            this._nearWinData[col].canWinJP = this._canWinJP(col);
        }
        cc.warn('%c nearWinList', 'color: orange', this._nearWinData);
    },
    reelStopNearWin: function reelStopNearWin(_ref2) {
        var count = _ref2.count,
            context = _ref2.context;

        if (count >= this.node.reels.length) return this.resetNearWin();
        if (context.isFastToResult) return;
        this._playNearWinSymbols(count - 1);
        this._playNearWinEffect(count);
    },
    resetNearWin: function resetNearWin() {
        this._countScatter = 0;
        this._countBonus = 0;
        this._countJp = 0;
        this._nearWinData.length = 0;
        this._clearSymbols();
        this._stopNearWinEffect();
        this._stopSoundNearWin();
    },


    /** @private */
    _getMatrix: function _getMatrix(data) {
        return data.slice();
    },


    //* logic play symbol
    _canWinBonus: function _canWinBonus(col) {
        if (col === 2 && this._countBonus < 1) return false;
        if (col === 3 && this._countBonus < 2) return false;
        if (col === 4 && this._countBonus < 3) return false;
        return true;
    },
    _canWinFree: function _canWinFree(col) {
        if (col === 2 && this._countScatter < 1) return false; // _|_|_|
        if (col === 3 && this._countScatter < 2) return false; // A|_|_|_|
        if (col === 4 && this._countScatter < 3) return false; // A|_|_|_|A
        return true;
    },
    _canWinJP: function _canWinJP(col) {
        return this._countJp === col + 1;
    },
    _createSymbol: function _createSymbol(symbolName, col, row) {
        var symbol = this._getNewSymbol();
        symbol.active = true;
        symbol.parent = this.symbolsHolder;
        symbol.x = this._getXPosition(col);
        symbol.y = this._getYPosition(col, row);
        symbol.changeToSymbol(symbolName);
        symbol.disableHighlight();
        symbol.col = col;
        symbol.row = row;
        symbol.symbolName = symbolName;
        symbol.active = false;
        this._nearWinSymbols.push(symbol);
    },
    _getNewSymbol: function _getNewSymbol() {
        // override it if using pool
        return cc.instantiate(this.symbolPrefab);
    },
    _getXPosition: function _getXPosition(col) {
        return this._startX + this.node.config.SYMBOL_WIDTH * col;
    },
    _getYPosition: function _getYPosition(col, row) {
        var showNumber = this.node.config.TABLE_FORMAT[col];
        return (showNumber / 2 - 0.5 - row) * this.node.config.SYMBOL_HEIGHT;
    },
    _playNearWinSymbols: function _playNearWinSymbols(col) {
        var _this = this;

        this.symbolsHolder.opacity = 255;
        this._nearWinSymbols.forEach(function (symbol) {
            if (symbol.col <= col) {
                _this._playAnimSymbol(symbol);
                _this.node.emit('SHOW_STATIC_SYMBOL', col, symbol.row, symbol.symbolName, false);
            }
        });
    },
    _playAnimSymbol: function _playAnimSymbol(symbol) {
        symbol.active = true;
        symbol.opacity = 255;
        symbol.enableHighlight();
        symbol.playAnimation();
    },
    _clearSymbols: function _clearSymbols() {
        var _this2 = this;

        // override it if using pool
        this._nearWinSymbols.forEach(function (symbol) {
            _this2.node.emit('SHOW_STATIC_SYMBOL', symbol.col, symbol.row, symbol.symbolName, true);
            _this2.symbolsHolder.removeChild(symbol);
            symbol.destroy();
        });
        this._nearWinSymbols.length = 0;
    },


    //* logic play effect
    _getAnimNearWin: function _getAnimNearWin() {
        if (!this._nearWinAnim) this._nearWinAnim = this.nearWinEffect.getComponentInChildren(cc.Animation);
    },
    _setDataNearWin: function _setDataNearWin(col) {
        var isNearWinBonus = this._isNearWinBonus();
        var isNearWinScatter = this._isNearWinScatter();
        var isNearWinJp = this._isNearWinJp();
        var isNearWin = isNearWinBonus || isNearWinScatter || isNearWinJp;
        this._nearWinData[col] = { isNearWin: isNearWin, isNearWinBonus: isNearWinBonus, isNearWinScatter: isNearWinScatter, isNearWinJp: isNearWinJp };
    },
    _isNearWinBonus: function _isNearWinBonus() {
        if (this._isSkipEffect) return false;
        return this._countBonus >= this.startAtBonusCount && this._countBonus < this.stopAtBonusCount;
    },
    _isNearWinScatter: function _isNearWinScatter() {
        if (this._isSkipEffect) return false;
        return this._countScatter >= this.startAtScatterCount && this._countScatter < this.stopAtScatterCount;
    },
    _isNearWinJp: function _isNearWinJp() {
        if (this._isSkipEffect) return false;
        return this._countJp >= this.startAtJackpotCount;
    },
    _playNearWinEffect: function _playNearWinEffect(col) {
        var isNearWin = this._nearWinData[col].isNearWin;

        if (!isNearWin) return this._stopNearWinEffect();

        if (!this.nearWinEffect.active) {
            this.nearWinEffect.active = true;
            this._nearWinAnim.play();
            this._playSoundNearWin();
        }
        this.nearWinEffect.x = this._getXPosition(col);
    },
    _stopNearWinEffect: function _stopNearWinEffect() {
        if (!this._nearWinAnim) return;
        this._nearWinAnim.stop();
        this.nearWinEffect.active = false;
    },
    _playSoundNearWin: function _playSoundNearWin() {
        this.node.soundPlayer && this.node.soundPlayer.playSoundNearWin();
    },
    _stopSoundNearWin: function _stopSoundNearWin() {
        this.node.soundPlayer && this.node.soundPlayer.stopSoundNearWin();
    }
});

cc._RF.pop();