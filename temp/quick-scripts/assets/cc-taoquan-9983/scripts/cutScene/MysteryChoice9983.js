(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/cutScene/MysteryChoice9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f7eetmQzpLMpdNTUlT87tP', 'MysteryChoice9983', __filename);
// cc-taoquan-9983/scripts/cutScene/MysteryChoice9983.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        fgoSymbol: cc.Prefab,
        delayStop: 2,
        rollingSpeed: 2000,
        glow: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on('INIT', this.init, this);
        this.node.on('RESET', this.reset, this);
        this.node.on('MYSTERY_CHOICE', this.roll, this);
        this.node.on('STOP_ROLL', this.stop, this);
    },
    init: function init(symbolList) {
        this.symbolList = symbolList.slice();
        this.defaultSprite = this.symbolList[3];
        this.symbolList.splice(3, 1);
        this.height = this.node.height;
        for (var i = 0; i < 3; ++i) {
            var symbol = cc.instantiate(this.fgoSymbol);
            symbol.parent = this.display;
        }
        this.reset();
        this.isRolling = false;
    },
    getRandomSymbol: function getRandomSymbol() {
        return this.symbolList[this.symbolList.length * Math.random() | 0];
    },
    reset: function reset() {
        this.pass = 1;
        this.glow.opacity = 255;
        this.glow.scale = 1;
        this.glow.getComponent(cc.Sprite).spriteFrame = this.defaultSprite;
        this.display.opacity = 0;
        for (var i = 0; i < 3; ++i) {
            var symbol = this.display.children[i];
            symbol.getComponent(cc.Sprite).spriteFrame = this.getRandomSymbol();
            symbol.y = i * this.height;
            symbol.setSiblingIndex(i);
        }
        this.display.y = 0;
        this.speedY = 0.0;
        this.display.children[0].getComponent(cc.Sprite).spriteFrame = this.defaultSprite;
    },
    roll: function roll(callback) {
        var _this = this;

        this.glow.opacity = 0;
        this.display.opacity = 255;
        this.isRolling = true;
        this.display.runAction(cc.sequence(cc.moveBy(0.2, 0, 0.5 * this.height).easing(cc.easeCubicActionIn()), cc.callFunc(function () {
            _this.speedY = -_this.rollingSpeed;
            for (var i = 0; i < 3; ++i) {
                _this.display.children[i].emit('ACTIVE_BLUR', 0.03);
                _this.display.children[i].scaleY = 2;
            }
            callback && callback();
        })));
    },
    stop: function stop(result, callback) {
        var _this2 = this;

        this.node.runAction(cc.sequence(cc.delayTime(this.delayStop), cc.callFunc(function () {
            _this2.isRolling = false;
            _this2.speedY = 0;
            for (var i = 0; i < 3; ++i) {
                _this2.display.children[i].emit('STOP_BLUR');
                _this2.display.children[i].scaleY = 1;
            }
            var symbol = _this2.display.children[2];
            symbol.getComponent(cc.Sprite).spriteFrame = _this2.symbolList[result - 1];
            var gapY = Math.abs(_this2.display.y) - _this2.height * (_this2.pass - 1);
            _this2.display.runAction(cc.sequence(cc.moveBy(0.01, 0, -_this2.height * 2), cc.moveBy(0.3, 0, gapY), cc.callFunc(function () {
                _this2.glow.getComponent(cc.Sprite).spriteFrame = _this2.symbolList[result - 1];
                _this2.glow.opacity = 200;
                _this2.glow.scale = 1;
                cc.tween(_this2.glow).to(0.5, { opacity: 0, scale: 2 }).start();
                _this2.node.soundPlayer && _this2.node.soundPlayer.playSFXOptionPickEnd();
            }), cc.delayTime(2), cc.callFunc(function () {
                callback && callback();
            })));
        })));
    },
    circularSymbol: function circularSymbol() {
        var symbol = this.display.children[0];
        symbol.y += this.height * 3;
        symbol.getComponent(cc.Sprite).spriteFrame = this.getRandomSymbol();
        symbol.setSiblingIndex(2);
    },
    update: function update(dt) {
        if (!this.isRolling) return;
        this.updatePosition(dt);
        while (this.display.y <= -this.height * this.pass) {
            this.circularSymbol();
            ++this.pass;
        }
    },
    updatePosition: function updatePosition(dt) {
        this.display.y += this.speedY * dt;
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
        //# sourceMappingURL=MysteryChoice9983.js.map
        