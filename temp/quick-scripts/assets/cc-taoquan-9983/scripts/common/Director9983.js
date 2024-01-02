(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/Director9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '676ebTnI1RDLLJcIyexwW7E', 'Director9983', __filename);
// cc-taoquan-9983/scripts/common/Director9983.js

"use strict";

cc.Class({
    extends: require('Director'),

    properties: {
        introGame: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this.usingPopups = [this.setting, this.info, this.jackpotHistory, this.betHistory];
    },
    closePopups: function closePopups() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.usingPopups.forEach(function (popup) {
            popup && popup.emit("CLOSE_PANEL");
        });
    },
    initGameMode: function initGameMode() {
        //Binding game modes
        if (this.normalGame) this.normalGame.init(this, true);
        if (this.freeGame) this.freeGame.init(this);

        //2 modes: normalGame, freeGame
        this.node.gSlotDataStore.currentGameMode = "normalGame";
        this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];

        this.gui.emit('SHOW_GUI_NORMAL_GAME_MODE');
        this.currentGameMode.enter();
    },
    extendActionForResume: function extendActionForResume() {
        this.normalGame.emit("AUTO_SPIN_DISABLE");
    },
    hideCutscene: function hideCutscene(name, callback) {
        this.cutscene.emit("CLOSE_CUTSCENE", name, callback);
    },
    newGameMode: function newGameMode(_ref, callback) {
        var name = _ref.name,
            data = _ref.data;

        if (this[name]) {
            this.currentGameMode.hide();
            this.node.gSlotDataStore.currentGameMode = name;
            this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];
            switch (name) {
                case 'normalGame':
                    this.gui.emit('SHOW_GUI_NORMAL_GAME_MODE');
                    break;
                case 'freeGame':
                    this.gui.emit('SHOW_GUI_FREE_GAME_MODE');
                    break;
            }
            this.resetGameSpeed();
            this.currentGameMode.enter(data, callback);
        }
    },
    resumeGameMode: function resumeGameMode(_ref2, callback) {
        var name = _ref2.name;

        if (this[name]) {
            this.node.gSlotDataStore.currentGameMode = name;
            this.currentGameMode = this[this.node.gSlotDataStore.currentGameMode];
            switch (name) {
                case 'normalGame':
                    this.gui.emit('SHOW_GUI_NORMAL_GAME_MODE');
                    break;
                case 'freeGame':
                    this.gui.emit('SHOW_GUI_FREE_GAME_MODE');
                    break;
            }
            this.resetGameSpeed();
            this.currentGameMode.show(callback);
        }
    },
    resetGameSpeed: function resetGameSpeed() {
        if (this.currentGameMode.director && this.currentGameMode.director.resetGameSpeed) {
            this.currentGameMode.director.resetGameSpeed();
        }
    },
    pauseJackpot: function pauseJackpot() {
        this.jackpot.emit("PAUSE_JACKPOT");
    },
    resumeJackpot: function resumeJackpot() {
        this.jackpot.emit("RESUME_JACKPOT");
    },
    updateValueJackpot: function updateValueJackpot() {
        var isGrand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this.jackpot.emit("UPDATE_VALUE_JACKPOT", isGrand, value);
    },
    extendInit: function extendInit(metaData) {
        var dataResume = metaData.dataResume,
            metaDataPromotion = metaData.metaDataPromotion;

        if (dataResume || metaDataPromotion) {
            this.introGame.active = false;
        } else {
            this.introGame.emit("SHOW_BUTTON_JOIN_GAME", true);
        }
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
        //# sourceMappingURL=Director9983.js.map
        