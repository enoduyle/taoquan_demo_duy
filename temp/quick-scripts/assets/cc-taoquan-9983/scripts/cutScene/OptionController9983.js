(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/cutScene/OptionController9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4d4226QOdhEI7eC7xeDn2fa', 'OptionController9983', __filename);
// cc-taoquan-9983/scripts/cutScene/OptionController9983.js

"use strict";

var Y_START = 102;
var Y_END = -140;
var START_HEIGHT = 40;

cc.Class({
    extends: cc.Component,

    properties: {
        spinNumber: cc.Node,
        wildSpine: cc.Node,
        wildMultiply: cc.Node,
        background: cc.Node,
        scrollTop: cc.Node,
        scrollBottom: cc.Node,
        mask: cc.Node,
        topMysteryChoice: cc.Node,
        botMysteryChoice: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on("UPDATE_OPTION_DATA", this.updateData, this);
        this.node.on("SCROLLING_ROLL", this.playRollAnimation, this);
        this.node.on("RESET_DATA", this.reset, this);
        this.node.on('INIT_MYSTERY', this.initMystery, this);
        this.node.on('RESET_MYSTERY', this.resetMystery, this);
        this.node.on('ROLL_MYSTERY', this.rollMystery, this);
        this.node.on('STOP_MYSTERY', this.stopMystery, this);
        this.node.on('CAN_CLICK', this.canClickOption, this);
        if (this.wildSpine) {
            this.wildSpine.active = false;
        }
        this.topMysteryChoice.active = false;
        this.botMysteryChoice.active = false;
    },
    canClickOption: function canClickOption(value) {
        this.canClick = value;
    },
    attachEvent: function attachEvent(data, selectOptionCallback) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "OptionController9983";
        clickEventHandler.handler = "callback";
        this.data = data;
        this.selectOptionCallback = selectOptionCallback;

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    callback: function callback() {
        if (!this.canClick) return;
        this.canClick = false;
        this.wildSpine.active = true;
        this.wildSpine.getComponent(sp.Skeleton).setAnimation(0, 'animation', false);
        this.selectOptionCallback(this.data);
    },
    updateData: function updateData(_ref) {
        var spinNumber = _ref.spinNumber,
            index = _ref.index,
            wildMultiply = _ref.wildMultiply,
            background = _ref.background,
            scroll = _ref.scroll,
            spinImageList = _ref.spinImageList,
            wildMultiplyImageList = _ref.wildMultiplyImageList;

        this.background.getComponent(cc.Sprite).spriteFrame = background;
        this.spinNumber.getComponent(cc.Sprite).spriteFrame = spinNumber;
        this.wildMultiply.getComponent(cc.Sprite).spriteFrame = wildMultiply;
        this.scrollTop.getComponent(cc.Sprite).spriteFrame = scroll;
        this.scrollBottom.getComponent(cc.Sprite).spriteFrame = scroll;
        this.wildSpine.getComponent(sp.Skeleton).setSkin("skin" + index);
        this.wildSpine.getComponent(sp.Skeleton).setSlotsToSetupPose();
        this.index = index;
        if (index == 7) {
            this.topMysteryChoice.active = true;
            this.botMysteryChoice.active = true;
            this.initMystery(spinImageList, wildMultiplyImageList);
        }
    },
    playRollAnimation: function playRollAnimation() {
        this.tweenMask = cc.tween(this.mask).to(0.8, { height: this.background.height });
        this.tweenMask.start();
        this.scrollBottom.runAction(cc.moveTo(0.8, cc.v2(this.scrollBottom.x, Y_END)));
    },
    reset: function reset() {
        this.canClick = false;
        this.mask.height = START_HEIGHT;
        this.scrollTop.y = -Y_END;
        this.scrollBottom.y = Y_START;
        this.node.opacity = 255;
        this.wildSpine.active = false;
        this.wildSpine.getComponent(sp.Skeleton).clearTracks();
    },
    initMystery: function initMystery(topSymbols, botSymbols) {
        this.topMysteryChoice.emit('INIT', topSymbols);
        this.botMysteryChoice.emit('INIT', botSymbols);
    },
    rollMystery: function rollMystery() {
        if (this.index != 7) return;
        this.topMysteryChoice.emit('MYSTERY_CHOICE');
        this.botMysteryChoice.emit('MYSTERY_CHOICE');
    },
    resetMystery: function resetMystery() {
        this.topMysteryChoice.emit('RESET');
        this.botMysteryChoice.emit('RESET');
    },
    stopMystery: function stopMystery(multiId, spinTimeId, callback) {
        this.topMysteryChoice.emit('STOP_ROLL', spinTimeId);
        this.botMysteryChoice.emit('STOP_ROLL', multiId, callback);
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
        //# sourceMappingURL=OptionController9983.js.map
        