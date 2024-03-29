(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/GameModeBasic9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58c4aoqakZBkaTHY80+4+6W', 'GameModeBasic9983', __filename);
// cc-taoquan-9983/scripts/common/GameModeBasic9983.js

"use strict";

var _require = require("utils"),
    changeParent = _require.changeParent;

cc.Class({
    extends: require("GameModeBasic"),
    properties: {
        increaseBetBtn: cc.Node,
        reduceBetBtn: cc.Node,
        backToLobby: cc.Node,
        setting: cc.Node,
        jackpotNormalHolder: cc.Node,
        jackpotFreeHolder: cc.Node,
        jackpot: cc.Node,
        jackpotGrand: cc.Node,
        jackpotMajor: cc.Node,
        turbo: cc.Node,
        info: cc.Node,
        bet: cc.Node,
        wallet: cc.Node
    },
    onLoad: function onLoad() {
        this._super();
        this.node.getWinAmount = this.getWinAmount.bind(this);

        this.node.on("SHOW_GUI_NORMAL_GAME_MODE", this.showNormalGame, this);
        this.node.on("SHOW_GUI_FREE_GAME_MODE", this.showFreeGame, this);
        this.node.on("BET_ENABLE", this.enableBet, this);
        this.node.on("BET_DISABLE", this.disableBet, this);
        this.jackpotGrand.storePos = this.jackpotGrand.position;
        this.jackpotMajor.storePos = this.jackpotMajor.position;
        this.jackpot.storePos = this.jackpot.position;
    },
    enableBet: function enableBet() {
        this.bet.emit("ENABLE_BET");
    },
    disableBet: function disableBet() {
        this.bet.emit("DISABLE_BET");
    },
    hideAll: function hideAll() {
        this.jackpotGrand.position = this.jackpotGrand.storePos;
        this.jackpotMajor.position = this.jackpotMajor.storePos;
        this.jackpot.position = this.jackpot.storePos;
        this.jackpot.scale = 1;
        this.backToLobby.active = false;
        this.setting.active = false;
        this.jackpot.active = false;
        this.winAmount.active = false;
        this.turbo.active = false;
        this.info.active = false;
        this.bet.active = false;
        this.wallet.active = false;
    },
    showNormalGame: function showNormalGame() {
        this.hideAll();
        this.node.emit('GAME_SHOW');
        this.node.active = true;
        this.node.opacity = 255;
        changeParent(this.jackpot, this.jackpotNormalHolder);
        this.jackpot.active = true;
        this.winAmount.active = true;
        this.turbo.active = true;
        this.info.active = true;
        this.bet.active = true;
        this.wallet.active = true;
        this.setting.active = true;
        this.backToLobby.active = true;
    },
    showFreeGame: function showFreeGame() {
        this.hideAll();
        this.node.emit('GAME_SHOW');
        this.node.active = true;
        this.node.opacity = 255;
        this.turbo.active = true;
        this.winAmount.active = true;
        this.setting.active = true;
        this.backToLobby.active = true;
        this.jackpot.active = true;
        changeParent(this.jackpot, this.jackpotFreeHolder);
        this.jackpot.scale = 0.9;
        this.jackpot.setPosition(-403, 312);
        this.jackpotMajor.setPosition(0, -100);
        this.jackpotGrand.setPosition(0, 0);
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
        //# sourceMappingURL=GameModeBasic9983.js.map
        