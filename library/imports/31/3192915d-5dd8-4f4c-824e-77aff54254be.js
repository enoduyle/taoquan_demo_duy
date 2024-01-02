"use strict";
cc._RF.push(module, '31929FdXdhPTIJOd6/1QlS+', 'BetLineSelection');
// cc-common/cc-slotbase-v2/gui/betLines/BetLineSelection.js

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('gameCommonUtils'),
    getKeyWithGame = _require.getKeyWithGame,
    setKeyWithGame = _require.setKeyWithGame;

cc.Class({
    extends: cc.Component,

    properties: {
        betLineView: cc.Node,
        betLineItemPrefab: cc.Prefab,
        toastView: cc.Node,
        betLineLabel: cc.Label,
        bet: cc.Node,
        panel: cc.Node,
        betLineNumberHolders: {
            type: cc.Node,
            default: []
        },
        maxBetLines: 25,
        betLineComponentText: 'BetLineButton',
        itemWidth: 100,
        itemHeight: 100,
        toggles: [cc.Toggle]
    },

    onLoad: function onLoad() {
        this.mainDirector = this.node.mainDirector.director;
        if (this.betLineLabel) this.betLineLabel.string = this.maxBetLines;
        this.allBetLineTypes = [];
        this.selectBetLineTypes = [];
        this.allBetLineNodes = [];
        this.fullBetLine = [];
        this.oddBetLine = [];
        this.evenBetLine = [];
        this.noneBetLine = [];
        for (var i = 1; i <= this.maxBetLines; i++) {
            var a = i;
            this.fullBetLine.push(a);
            if (i % 2 === 0) {
                var b = i;
                this.evenBetLine.push(b);
            } else {
                var c = i;
                this.oddBetLine.push(c);
            }
        }
        this._renderBetLines();

        this._setDefaultBetLines();
        this.node.on('UPDATE_BET_LINES', this.updateBetLines, this);
        this.node.on('UPDATE_BET_LINES_REAL', this.updateBetLinesReal, this);
        this.node.on('UPDATE_BET_LINES_TRIAL', this.updateBetLinesTrial, this);
        this.node.on('ENABLE_BET_LINE_ITEM', this.enableBetLineItem, this);
        this.node.on('ENABLE_BET_LINE_ITEMS', this.enableBetLineItems, this);
    },
    _setDefaultBetLines: function _setDefaultBetLines() {
        if (this.node.gSlotDataStore) {
            var defaultBetLines = [].concat(_toConsumableArray(Array(this.node.config.PAY_LINE_LENGTH).keys())).map(function (i) {
                return i + 1;
            }).join(',');
            var betLines = getKeyWithGame(this.node.config.GAME_ID, this.node.config.BET_LINES_KEY, defaultBetLines);
            if (betLines) {
                this.node.gSlotDataStore.betLines = betLines.split(',').map(function (e) {
                    return Number(e);
                }) || [];
                this.allBetLineTypes = this.node.gSlotDataStore.betLines;
                this.updateBetLines(this.node.gSlotDataStore.betLines);
            } else {
                this.node.gSlotDataStore.betLines = [];
                this.updateBetLines([]);
            }
        } else {
            this.allBetLineNodes = [].concat(_toConsumableArray(Array(this.node.config.PAY_LINE_LENGTH).keys())).map(function (i) {
                return i + 1;
            });
        }
    },
    enableBetLineItem: function enableBetLineItem(index) {
        var _this = this;

        this.betLineView.children.forEach(function (item, i) {
            var betLineComponent = item.getComponent(_this.betLineComponentText);
            betLineComponent.enableButton(index === i);
        });
    },
    enableBetLineItems: function enableBetLineItems() {
        var _this2 = this;

        this.betLineView.children.forEach(function (item) {
            var betLineComponent = item.getComponent(_this2.betLineComponentText);
            betLineComponent.enableButton(true);
        });
    },
    updateBetLines: function updateBetLines() {
        var _this3 = this;

        var betLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!this.node.gSlotDataStore.isTrialMode) {
            setKeyWithGame(this.node.config.GAME_ID, this.node.config.BET_LINES_KEY, betLines.join(','));
        }
        this.selectBetLineTypes = [].concat(_toConsumableArray(betLines));
        if (this.betLineLabel) this.betLineLabel.string = betLines.length;
        this.betLineView.children.forEach(function (item) {
            var betLineComponent = item.getComponent(_this3.betLineComponentText);
            var isActive = betLineComponent && betLineComponent.index && betLines.indexOf(betLineComponent.index) !== -1;
            betLineComponent.setActiveButton(isActive);
        });

        this.betLineNumberHolders.forEach(function (item) {
            item.emit('UPDATE_BET_LINES', betLines);
        });

        this.onBetLineChangedByButton();
    },
    updateBetLinesReal: function updateBetLinesReal() {
        var _this4 = this;

        var defaultBetLines = [].concat(_toConsumableArray(Array(this.node.config.PAY_LINE_LENGTH).keys())).map(function (i) {
            return i + 1;
        }).join(',');
        var betLines = getKeyWithGame(this.node.config.GAME_ID, this.node.config.BET_LINES_KEY, defaultBetLines);
        this.updateBetLines(betLines.split(',').map(function (e) {
            return Number(e);
        }) || []);

        var selectedBetLines = this._getSelectedBetLines();
        this._setStoreBetLines(selectedBetLines);
        if (this.betLineLabel) this.betLineLabel.string = selectedBetLines.length;

        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        if (this.bet) this.bet.emit('UPDATE_BET', currentBetData);
        this.betLineNumberHolders.forEach(function (item) {
            item.emit('UPDATE_BET_LINES', _this4.node.gSlotDataStore.betLines);
        });
    },
    updateBetLinesTrial: function updateBetLinesTrial() {
        var _this5 = this;

        var betLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        this.selectBetLineTypes = [].concat(_toConsumableArray(betLines));
        if (this.betLineLabel) this.betLineLabel.string = betLines.length;
        this.betLineView.children.forEach(function (item) {
            var betLineComponent = item.getComponent(_this5.betLineComponentText);
            var isActive = betLineComponent && betLineComponent.index && betLines.indexOf(betLineComponent.index) !== -1;
            betLineComponent.setActiveButton(isActive);
        });

        this._setStoreBetLines(this.selectBetLineTypes);
        if (this.betLineLabel) this.betLineLabel.string = this.selectBetLineTypes.length;

        if (this.bet) this.bet.emit('UPDATE_BET', this.node.config.DEFAULT_BET);
        this.betLineNumberHolders.forEach(function (item) {
            item.emit('UPDATE_BET_LINES', _this5.node.gSlotDataStore.betLines);
        });

        if (this.toggles) {
            for (var i = 0; i < this.toggles.length; i++) {
                var toggle = this.toggles[i];
                if (toggle && toggle.isChecked) {
                    toggle.uncheck();
                }
            }
        }
    },
    _renderBetLines: function _renderBetLines() {
        var itemPerRow = 5;
        var itemPerCol = this.maxBetLines / itemPerRow;
        this.selectBetLineTypes = [].concat(_toConsumableArray(this.allBetLineTypes));

        for (var i = 1; i <= this.maxBetLines; i++) {
            var betLineItem = cc.instantiate(this.betLineItemPrefab);
            betLineItem.name = 'BetLineButton_' + i;
            var betLineComponent = betLineItem.getComponent(this.betLineComponentText);
            betLineComponent.setActiveButton(true);
            betLineComponent.init(this);
            betLineComponent.setIndex(i);
            betLineComponent.setSound(this.node.soundPlayer);

            betLineItem.x = (Math.floor(i - 1) % itemPerRow - itemPerRow / 2 + 0.5) * this.itemWidth;
            betLineItem.y = ((Math.floor(i - 1) / itemPerRow | 0) - itemPerCol / 2 + 0.5) * -this.itemHeight;

            this.allBetLineNodes.push(betLineItem);
            this.betLineView.addChild(betLineItem);
        }
    },
    _setStoreBetLines: function _setStoreBetLines(selectedBetLines) {
        if (this.node.gSlotDataStore && selectedBetLines) {
            this.node.gSlotDataStore.betLines = [].concat(_toConsumableArray(selectedBetLines));
            if (!this.node.gSlotDataStore.isTrialMode) {
                setKeyWithGame(this.node.config.GAME_ID, this.node.config.BET_LINES_KEY, this.node.gSlotDataStore.betLines.join(','));
            }
        }
    },
    _getSelectedBetLines: function _getSelectedBetLines() {
        var _this6 = this;

        var selectedBetLines = [];
        this.betLineView.children.forEach(function (item) {
            var betLineComponent = item.getComponent(_this6.betLineComponentText);
            if (betLineComponent && betLineComponent.index && betLineComponent.isActive) {
                selectedBetLines.push(betLineComponent.index);
            }
        });
        return selectedBetLines.sort(function (a, b) {
            return a - b;
        });
    },
    compareArr: function compareArr(soureArr, destArr) {
        var res = true;
        if (soureArr.length === destArr.length) {
            for (var i = 0; i < soureArr.length; i++) {
                if (soureArr[i] != destArr[i]) {
                    res = false;
                    break;
                }
            }
        } else {
            res = false;
        }

        return res;
    },
    onBetLineChangedByButton: function onBetLineChangedByButton() {
        if (this.toggles) {
            for (var i = 0; i < this.toggles.length; i++) {
                var toggle = this.toggles[i];
                if (toggle && toggle.isChecked) {
                    toggle.uncheck();
                }
            }
        } else return;

        var selectedBetLines = this._getSelectedBetLines();
        if (this.compareArr(selectedBetLines, this.fullBetLine)) {
            var allToggle = this.toggles[0];
            if (allToggle) {
                allToggle.check();
            }
        } else if (this.compareArr(selectedBetLines, this.evenBetLine)) {
            var evenToggle = this.toggles[1];
            if (evenToggle) {
                evenToggle.check();
            }
        } else if (this.compareArr(selectedBetLines, this.oddBetLine)) {
            var oddToggle = this.toggles[2];
            if (oddToggle) {
                oddToggle.check();
            }
        } else if (this.compareArr(selectedBetLines, this.noneBetLine)) {
            var nonToggle = this.toggles[3];
            if (nonToggle) {
                nonToggle.check();
            }
        }
    },


    /** Select Even BetLines **/
    onSelectEvenPayLines: function onSelectEvenPayLines() {
        var evenToggle = this.toggles[1];
        if (evenToggle && evenToggle.isChecked) return;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.allBetLineNodes.forEach(function (item, i) {
            item.emit('SET_ACTIVE', i % 2 !== 0);
        });
        this.mainDirector.onIngameEvent("BET_LINE_EVEN_CLICK");
    },


    /** Select Odd BetLines **/
    onSeletOddBetLines: function onSeletOddBetLines() {
        var oddToggle = this.toggles[2];
        if (oddToggle && oddToggle.isChecked) return;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.allBetLineNodes.forEach(function (item, i) {
            item.emit('SET_ACTIVE', i % 2 === 0);
        });
    },


    /** Cancel Select All BetLines **/
    onCancelSelectBetLines: function onCancelSelectBetLines() {
        var nonToggle = this.toggles[3];
        if (nonToggle && nonToggle.isChecked) return;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.allBetLineNodes.forEach(function (item) {
            item.emit('SET_ACTIVE', false);
        });
    },


    /** Select All BetLines **/
    onSelectAllBetLines: function onSelectAllBetLines() {
        var allToggle = this.toggles[0];
        if (allToggle && allToggle.isChecked) return;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.allBetLineNodes.forEach(function (item) {
            item.emit('SET_ACTIVE', true);
        });
        this.mainDirector.onIngameEvent("BET_LINE_ALL_CLICK");
    },


    /** Check BetLine Before Exit **/
    onCheckBetLines: function onCheckBetLines() {
        var _this7 = this;

        var selectedBetLines = this._getSelectedBetLines();
        if (!selectedBetLines.length) {
            this.toastView.stopAllActions();
            this.toastView.opacity = 0;
            this.toastView.runAction(cc.sequence(cc.fadeIn(0.5).easing(cc.easeSineIn()), cc.delayTime(1), cc.fadeOut(0.5).easing(cc.easeSineIn())));
            return;
        }

        this._setStoreBetLines(selectedBetLines);
        if (this.betLineLabel) this.betLineLabel.string = selectedBetLines.length;

        var currentBetData = this.node.gSlotDataStore.slotBetDataStore.data.currentBetData;

        if (this.bet) this.bet.emit('UPDATE_BET', currentBetData);
        this.betLineNumberHolders.forEach(function (item) {
            item.emit('UPDATE_BET_LINES', _this7.node.gSlotDataStore.betLines);
        });

        this.hide();
    },
    show: function show() {
        this.panel.active = true;
        this.panel.opacity = 255;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.mainDirector.onIngameEvent("BET_LINE_OPEN");
        var currentSlotDirector = this.mainDirector.currentGameMode.director;
        if (currentSlotDirector) {
            currentSlotDirector.buttons.emit("ENABLE_SPIN_KEY", false);
        }
    },
    hide: function hide() {
        this.panel.active = false;
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.mainDirector.onIngameEvent("BET_LINE_CLOSE");
        var currentSlotDirector = this.mainDirector.currentGameMode.director;
        if (currentSlotDirector && this.mainDirector.tutorialMgr && this.mainDirector.tutorialMgr.isFinished()) {
            currentSlotDirector.buttons.emit("ENABLE_SPIN_KEY", true);
        }
    }
});

cc._RF.pop();