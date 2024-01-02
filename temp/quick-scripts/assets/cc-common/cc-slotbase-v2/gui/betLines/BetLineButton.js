(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/betLines/BetLineButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cac95/GVJdHBbGDmYx0rQBU', 'BetLineButton', __filename);
// cc-common/cc-slotbase-v2/gui/betLines/BetLineButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        betLineButton: cc.Node,
        activeButtons: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    onLoad: function onLoad() {
        this.node.on('SET_ACTIVE', this.setActiveButton, this);
        this.node.on('SET_INDEX', this.setIndex, this);
        this.node.on('SET_SOUND', this.setSound, this);
    },
    init: function init(betLineManager) {
        this.betLineManager = betLineManager;
    },
    setActiveButton: function setActiveButton(isActive) {
        this.isActive = isActive;
        this.betLineButton.color = isActive ? cc.Color.WHITE : new cc.Color(70, 78, 143);

        this.node.mainDirector && this.node.mainDirector.director && this.node.mainDirector.director.onIngameEvent("BET_LINE_CLICK");
    },
    enableButton: function enableButton(isEnable) {
        this.betLineButton.getComponent(cc.Button).interactable = isEnable;
    },
    setIndex: function setIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        this.index = Number(index);
        this.betLineButton.getComponent(cc.Sprite).spriteFrame = this.activeButtons[this.index - 1];
    },
    setSound: function setSound(soundPlayer) {
        this.soundPlayer = soundPlayer;
    },


    /** Toggle Active Payline **/
    onToggleActive: function onToggleActive() {
        if (this.soundPlayer) this.soundPlayer.playSFXClick();
        this.setActiveButton(!this.isActive);
        if (this.betLineManager) {
            this.betLineManager.onBetLineChangedByButton();
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
        //# sourceMappingURL=BetLineButton.js.map
        