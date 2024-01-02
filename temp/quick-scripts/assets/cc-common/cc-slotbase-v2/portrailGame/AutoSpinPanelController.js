(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/AutoSpinPanelController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd02e4LumRhKjqE0rwY272Kk', 'AutoSpinPanelController', __filename);
// cc-common/cc-slotbase-v2/portrailGame/AutoSpinPanelController.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        autoSpinButton: cc.Node,
        normalFrame: cc.SpriteFrame,
        selectedFrame: cc.SpriteFrame,
        numberButtons: [cc.Node],
        overlay: cc.Node
    },

    onLoad: function onLoad() {
        this.node.showOverlay = this.showOverlay.bind(this);
    },
    showOverlay: function showOverlay() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.overlay.active = isShow;
    },
    getSpinNumber: function getSpinNumber(evt, number) {
        var _this = this;

        if (!evt || !number) {
            cc.warn('Missing event or number of spins');
            return;
        }
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.spinNumber = number;
        this.numberButtons.forEach(function (it) {
            it.getComponent(cc.Sprite).spriteFrame = _this.normalFrame;
            it.getChildByName('Label').color = new cc.Color().fromHEX('#ffffff');
        });
        evt.target.getComponent(cc.Sprite).spriteFrame = this.selectedFrame;
        evt.target.getChildByName('Label').color = new cc.Color().fromHEX('#f3d598');
        this.autoSpinButton.getComponent(cc.Button).interactable = true;
    },
    startAutoSpinning: function startAutoSpinning() {
        var _this2 = this;

        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.setAutoSpinEvent = new cc.Event.EventCustom('SET_AUTO_SPIN_EVENT', true);
        this.setAutoSpinEvent.setUserData({
            spinNumber: this.spinNumber
        });
        this.node.dispatchEvent(this.setAutoSpinEvent);
        this.node.emit('HIDE', 0, function () {
            _this2.node.opacity = 0;
        });
        this.resetButtonStatus();
        this.overlay.active = false;
    },
    resetButtonStatus: function resetButtonStatus() {
        var _this3 = this;

        this.autoSpinButton.getComponent(cc.Button).interactable = false;
        this.numberButtons.forEach(function (it) {
            it.getComponent(cc.Sprite).spriteFrame = _this3.normalFrame;
            it.getChildByName('Label').color = new cc.Color().fromHEX('#ffffff');
        });
    },
    clickBtnClose: function clickBtnClose() {
        var _this4 = this;

        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.resetButtonStatus();
        this.node.emit('HIDE', 0, function () {
            _this4.node.opacity = 0;
        });
        this.overlay.active = false;
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
        //# sourceMappingURL=AutoSpinPanelController.js.map
        