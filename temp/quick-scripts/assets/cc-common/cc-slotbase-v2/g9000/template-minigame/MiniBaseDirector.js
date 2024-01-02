(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/g9000/template-minigame/MiniBaseDirector.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd02eoK0dpG7aXJAHNNuuyT', 'MiniBaseDirector', __filename);
// cc-common/cc-slotbase-v2/g9000/template-minigame/MiniBaseDirector.js

"use strict";

cc.Class({
    extends: require("BaseDirectorV2"),

    properties: {
        table: cc.Node,
        winAmount: cc.Node,
        coundownText: cc.Label,
        max_open_items: 3,
        timerCount: 20,
        defaultValue: -1
    },
    onExtendedLoad: function onExtendedLoad() {
        this.node.on("GAME_UPDATE", this.stateUpdate, this);
        this.node.on("GAME_ENTER", this.onEnterGame, this);
        this.node.on("GAME_INIT", this.init, this);
        this.node.on('CLICK_ITEM', this.onClickItem, this);
        this.node.on("RUN_CONTINUE_SCRIPT", this.runContinueScript, this);
        this.node.on("FORCE_RESET_GAME_MODE", this.forceResetGameMode, this);
        this._resetStoreScript();
        this.node.listIdOpenItem = [];
    },

    /**
     * @receive_data*/
    stateUpdate: function stateUpdate(callback) {
        this.isWaitingResult = false;
        this.callbackStateUpdate = callback;
        this.runAction('ResultReceive');
    },
    init: function init() {
        this.isWaitingResult = false;
        this.writer = this.node.writer;
        this.table.emit("INIT_TABLE");
        if (!this.winAmount) this.winAmount = this.node.mainDirector.gui.getWinAmount();
    },
    onEnterGame: function onEnterGame(data) {
        this.resetMiniGame();
        if (data) {
            this.table.emit("RESUME_MINI_GAME", data, this.defaultValue);
            for (var i = 0; i < data.length; i++) {
                if (data[i] !== this.defaultValue) {
                    this.node.listIdOpenItem.push(i + 1);
                }
            }
        }
        this.runAction("MiniGameStart");
        this.node.mainDirector.onIngameEvent("ENTER_GAME_MODE");
    },
    _miniGameStart: function _miniGameStart(script) {
        this._runAutoTrigger(this.timerCount);
        this.executeNextScript(script);
    },
    _miniGameRestart: function _miniGameRestart(script) {
        this.executeNextScript(script);
    },
    onClickItem: function onClickItem(e) {
        if (this.isWaitingResult) return;
        e.stopPropagation();
        this._stopAutoTrigger();
        if (this.node.listIdOpenItem.length < this.max_open_items) {
            var item = e.target;
            this.node.currentPick = item.itemId;
            this.node.listIdOpenItem.push(item.itemId);
            this.runAction("MiniGameClick");
            item.itemController.playAnimClick();
            item.itemController.disableClick();
            this.isAutoTrigger = e.getUserData().isAutoTrigger;
        }
    },
    _sendRequestPlayMiniGame: function _sendRequestPlayMiniGame(script, _ref) {
        var openCell = _ref.openCell;

        this.isWaitingResult = true;
        this.node.mainDirector.gameStateManager.triggerMiniGame(openCell);
        this.executeNextScript(script);
    },
    _showResult: function _showResult(script) {
        this.isWaitingResult = false;
        this.runAction("ShowResult");
        this.executeNextScript(script);
    },
    _openPickedItem: function _openPickedItem(script, data) {
        var _this = this;

        this.table.emit("OPEN_PICKED_ITEM", data, function () {
            _this.executeNextScript(script);
        });
        if (this.node.listIdOpenItem.length < this.max_open_items) {
            var time = this.isAutoTrigger ? 0.5 : this.timerCount;
            this._runAutoTrigger(time);
        }
    },
    _openAllItems: function _openAllItems(script, matrix) {
        var _this2 = this;

        this._stopAutoTrigger();
        this.table.emit("OPEN_ALL_ITEMS", matrix, function () {
            _this2.executeNextScript(script);
        });
        this._stopRepeatCountDown();
    },
    _gameExit: function _gameExit(script) {
        var _this3 = this;

        this.resetMiniGame();
        this.node.exit(function () {
            _this3.executeNextScript(script);
        });
    },
    _showCutscene: function _showCutscene(script, _ref2) {
        var _this4 = this;

        var name = _ref2.name,
            content = _ref2.content;

        if (this.node.mainDirector) {
            this.node.mainDirector.showCutscene(name, content, function () {
                _this4.executeNextScript(script);
            });
        } else {
            cc.error('There is no main Director to play cutscenes');
            this.executeNextScript(script);
        }
    },


    /** @WinAmount*/
    _updateLastWin: function _updateLastWin(script, data) {
        if (data) {
            this.winAmount.emit("CHANGE_TO_LAST_WIN");
            this.node.mainDirector.updateWinAmountText({ isWin: false });
        } else {
            this.winAmount.emit("CHANGE_TO_WIN");
            this.node.mainDirector.updateWinAmountText({ isWin: true });
        }
        this.executeNextScript(script);
    },
    _updateWinningAmount: function _updateWinningAmount(script, _ref3) {
        var winAmount = _ref3.winAmount,
            time = _ref3.time;

        this.winAmount.emit("UPDATE_WIN_AMOUNT", { value: winAmount, time: time });
        this.executeNextScript(script);
    },
    _clearWinAmount: function _clearWinAmount(script) {
        this.winAmount.emit("RESET_NUMBER");
        this.executeNextScript(script);
    },
    resetMiniGame: function resetMiniGame() {
        this._stopAutoTrigger();
        this._stopRepeatCountDown();
        this.node.listIdOpenItem = [];
        this.node.currentPick = 0;
        this.table.emit("RESET_MINI_TABLE");
        this._count = this.timerCount;
        if (this.coundownText) {
            this.coundownText.node.opacity = 0;
        }
    },
    _runAutoTrigger: function _runAutoTrigger(delay) {
        var _this5 = this;

        this._stopAutoTrigger();
        this.autoTriggerMinigame = cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
            _this5.table.emit("AUTO_OPEN_BOX");
        }));
        if (this.node) this.node.runAction(this.autoTriggerMinigame);
        this._updateCownDownText(delay);
    },
    _stopAutoTrigger: function _stopAutoTrigger() {
        if (this.autoTriggerMinigame && this.autoTriggerMinigame.target) {
            this.node.stopAction(this.autoTriggerMinigame);
        }
    },
    runContinueScript: function runContinueScript() {
        var _storeNextScripts = this.storeNextScripts,
            data = _storeNextScripts.data,
            script = _storeNextScripts.script;

        this[this.storeCurrentScripts] && this[this.storeCurrentScripts](script, data);
        this._resetStoreScript();
    },
    _resetStoreScript: function _resetStoreScript() {
        this.storeCurrentScripts = '';
        this.storeNextScripts = {
            script: [],
            data: {}
        };
    },
    _updateCownDownText: function _updateCownDownText(delay) {
        var _this6 = this;

        if (!this.coundownText) return;
        this._stopRepeatCountDown();
        if (delay === this.timerCount) {
            this.repeatCountDown = cc.repeatForever(cc.sequence(cc.callFunc(function () {
                _this6.coundownText.node.opacity = 255;
                _this6.coundownText.string = "H\u1EC7 th\u1ED1ng s\u1EBD t\u1EF1 ch\u1ECDn sau: " + _this6._count + "s";
            }), cc.delayTime(1), cc.callFunc(function () {
                _this6._count--;
                if (_this6._count <= 0) {
                    _this6.node.stopAction(_this6.repeatCountDown);
                }
            })));
            this.node.runAction(this.repeatCountDown);
        } else {
            this.coundownText.node.opacity = 0;
        }
    },
    _stopRepeatCountDown: function _stopRepeatCountDown() {
        if (this.repeatCountDown && this.repeatCountDown.target) {
            this.node.stopAction(this.repeatCountDown);
            this._count = this.timerCount;
            this.coundownText.node.opacity = 0;
        }
    },
    forceStopSpinning: function forceStopSpinning() {},
    stopAutoSpinClick: function stopAutoSpinClick() {},
    forceResetGameMode: function forceResetGameMode(gameMode) {
        this.isSkipAllScrips = true;
        if (gameMode === 'bonusGame') {
            this.forceResetBonusGame();
        }
    },
    forceResetBonusGame: function forceResetBonusGame() {
        var _this7 = this;

        this.node.resetCallbackWhenHide();
        this.scheduleOnce(function () {
            _this7.isSkipAllScrips = false;
            _this7.node.exit(function () {});
        }, 1);
    },
    onDestroy: function onDestroy() {
        if (this.repeatCountDown) this.node.stopAction(this.repeatCountDown);
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
        //# sourceMappingURL=MiniBaseDirector.js.map
        