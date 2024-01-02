"use strict";
cc._RF.push(module, '6c2f3wuwfhIu527C7byzFrG', 'IntroTips');
// cc-common/cc-slotbase-v2/gui/IntroTips.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

var lodash = require('lodash');
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        phase1: cc.Label,
        symbol: cc.Sprite,
        phase2: cc.Label,
        imageList: [cc.SpriteFrame],
        textList: cc.JsonAsset
    },

    onLoad: function onLoad() {
        var _this = this;

        if (this.node.config.SHOW_INTRO_TIPS) {
            this.node.on("SHOW_INTRO", this.showRandomIntro.bind(this), this);
            this.node.on("HIDE_INTRO", this.hideIntro.bind(this), this);
        }
        this.specSymbols = [];
        this.imageList.forEach(function (it) {
            _this.specSymbols.push(it.name);
        });
        this.loadTextFromFile();
    },
    loadTextFromFile: function loadTextFromFile() {
        if (this.textList && this.textList.json.data) {
            this.node.config.INTRO_GAME_PLAY = this.textList.json.data;
        }
    },
    start: function start() {
        var _this2 = this;

        this.curIndex = 0;
        this.node.opacity = 1;
        this.display.opacity = 1;
        this.speed = 200;
        this.isFirstShow = true;
        this.assets = convertAssetArrayToObject(this.imageList);
        if (this.node.config.SHOW_INTRO_TIPS) {
            this.scheduleOnce(function () {
                _this2.node.opacity = 255;
                _this2.showRandomIntro();
            }, 1);
        }
    },
    showIntro: function showIntro() {
        this.display.opacity = 255;
    },
    showRandomIntro: function showRandomIntro() {
        var _this3 = this;

        this.node.stopAllActions();
        this.display.stopAllActions();

        var destination = new cc.Vec2(-this.node.width / 2, 0);
        this.node.runAction(cc.sequence(cc.callFunc(function () {
            _this3.reset();
            _this3.parseString(_this3.node.config.INTRO_GAME_PLAY[_this3.curIndex]);
            _this3.curIndex = (_this3.curIndex + 1) % _this3.node.config.INTRO_GAME_PLAY.length;
        }), cc.delayTime(2), cc.callFunc(function () {
            _this3.showIntro();
            var center = (_this3.display.width - _this3.node.width) / 2;
            _this3.display.x = _this3.display.width - _this3.node.width > 0 ? center : 0;
        }), cc.delayTime(2), cc.callFunc(function () {
            var distance = _this3.display.width + _this3.node.width / 2;
            var street = Math.abs(destination.x - distance);
            var time = street / _this3.speed;
            if (street > _this3.node.width / 2) {
                _this3.display.runAction(cc.sequence(cc.moveBy(time, -street, 0), cc.callFunc(function () {
                    _this3.showRandomIntro();
                })));
            } else {
                _this3.display.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
                    _this3.showRandomIntro();
                })));
            }
            _this3.isFirstShow = false;
        })));
    },
    parseString: function parseString() {
        var _this4 = this;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var arrStr = str.split(' ');
        var groupStr = [];
        var runIndex = 0;
        var indexGroup = 0;
        var phase = '';
        while (runIndex < arrStr.length) {
            var element = arrStr[runIndex];
            var symbol = this.findSpecialSymbol(element);
            if (symbol == null) {
                var space = runIndex === arrStr.length - 1 ? '' : " ";
                phase += element + space;
                groupStr[indexGroup] = { phase: phase, symbol: null };
            } else {
                indexGroup++;
                groupStr[indexGroup] = { phase: element, symbol: symbol };
                phase = '';
                indexGroup++;
            }
            runIndex++;
        }
        groupStr = groupStr.filter(function (it) {
            return it != null;
        });
        this.display.removeAllChildren();
        groupStr && groupStr.forEach(function (it) {
            if (lodash.isEqual(it.symbol, null)) {
                _this4.addStrToTips(it.phase);
            } else {
                _this4.addStrToTips("   ");
                _this4.addSpriteToTips(it.symbol);
                _this4.addStrToTips("   ");
            }
        });
        this.display.getComponent(cc.Layout).updateLayout();
    },
    addStrToTips: function addStrToTips() {
        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var tem = cc.instantiate(this.phase1.node);
        tem.getComponent(cc.Label).string = str;
        this.display.addChild(tem);
    },
    addSpriteToTips: function addSpriteToTips(symbol) {
        var tem = cc.instantiate(this.symbol.node);
        tem.getComponent(cc.Sprite).spriteFrame = this.assets[symbol];
        this.display.addChild(tem);
    },
    findSpecialSymbol: function findSpecialSymbol() {
        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var found = -1;
        this.specSymbols.forEach(function (it, index) {
            var sym = '[' + it + ']';
            if (lodash.isEqual(sym, str)) found = index;
        });
        return found != -1 ? this.specSymbols[found] : null;
    },
    reset: function reset() {
        this.display.opacity = 0;
        this.phase1.string = "";
        this.symbol.spriteFrame = null;
        this.phase2.string = "";
    },
    hideIntro: function hideIntro() {
        this.node.stopAllActions();
        this.display.stopAllActions();
        this.node.active = false;
    },
    onDestroy: function onDestroy() {
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.display.stopAllActions();
        if (this.node.config.SHOW_INTRO_TIPS) {
            this.node.off("SHOW_INTRO", this.showRandomIntro.bind(this), this);
            this.node.off("HIDE_INTRO", this.hideIntro.bind(this), this);
        }
    }
});

cc._RF.pop();