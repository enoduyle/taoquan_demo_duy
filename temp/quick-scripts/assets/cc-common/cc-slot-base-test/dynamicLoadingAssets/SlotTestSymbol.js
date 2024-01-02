(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/dynamicLoadingAssets/SlotTestSymbol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0aa20RY7MZOsbtKiT+n49ay', 'SlotTestSymbol', __filename);
// cc-common/cc-slot-base-test/dynamicLoadingAssets/SlotTestSymbol.js

"use strict";

/* global cc */

// const PROJECT_LIST = ['Config9000', 'Config9987', 'Config9977'];

cc.Class({
    extends: cc.Component,

    properties: {
        background: cc.Sprite,
        mask: cc.Node,
        paylineMask: cc.Node,
        table: cc.Node,
        payline: cc.Node,
        symbolPayline: cc.Node
    },

    onLoad: function onLoad() {
        this.node.symbolPayline = this.symbolPayline;
    },
    start: function start() {
        this.node.emit('INIT');
        this.loadBackground();
        this.loadConfig();
    },
    loadBackground: function loadBackground() {
        var _this = this;

        cc.loader.load("https://static.ktek.io/animTool/background.jpg", function (errors, background) {
            _this.background.spriteFrame = new cc.SpriteFrame(background);
        });
    },
    loadConfig: function loadConfig() {
        var _this2 = this;

        cc.loader.load("https://static.ktek.io/animTool/symbol.json", function (errors, config) {
            _this2.projectConfig = config;
            _this2.generateDebug();
        });
    },
    generateDebug: function generateDebug() {
        var _this3 = this;

        var thiz = this;
        var DEBUG = function DEBUG() {
            this.symbolWidth = 200;
            this.symbolHeight = 200;
            this.project = 'g9000';
            this.spin = function () {
                thiz.spinClick();
            }, this.stop = function () {
                thiz.stopClick();
            };
        };
        var dat = require('dat.gui');
        this.gui = new dat.GUI({
            autoPlace: true,
            load: JSON,
            preset: 'lasted'
        });

        this.debug = new DEBUG();
        var project = this.gui.add(this.debug, 'project', Object.keys(this.projectConfig));
        project.onChange(function (value) {
            _this3.mask.width = _this3.projectConfig[value].WIDTH * 5;
            _this3.mask.height = _this3.projectConfig[value].HEIGHT * 3;
            _this3.paylineMask.width = _this3.projectConfig[value].WIDTH * 5;
            _this3.paylineMask.height = _this3.projectConfig[value].HEIGHT * 3;
            _this3.node.config.SYMBOL_WIDTH = _this3.projectConfig[value].WIDTH;
            _this3.node.config.SYMBOL_HEIGHT = _this3.projectConfig[value].HEIGHT;
            _this3.node.config.SYMBOL_NAME_LIST = _this3.projectConfig[value].LIST;
            _this3.table.removeAllChildren();
            _this3.table.x = _this3.projectConfig[value].TABLE_X;
            _this3.table.y = _this3.projectConfig[value].TABLE_Y;
            _this3.payline.x = _this3.projectConfig[value].TABLE_X;
            _this3.payline.y = _this3.projectConfig[value].TABLE_Y;
            _this3.node.emit("INIT");
            _this3.node.emit("UPDATE_SYMBOL_LIST", _this3.projectConfig[value].LIST);
            _this3.replaceSymbols(_this3.node.assets);
            _this3.replaceBlurSymbols(_this3.node.blurAssets);
        });
        this.gui.add(this.debug, 'spin');
        this.gui.add(this.debug, 'stop');
        document.body.childNodes[document.body.childNodes.length - 1].style.zIndex = 999;
    },
    spinClick: function spinClick() {
        console.log('spinClick');
        this.node.emit('START_SPINNING');
        this.table.active = true;
        this.payline.active = false;
    },
    stopClick: function stopClick() {
        var _this4 = this;

        console.log('stopClick');
        this.node.emit('STOP_REEL_WITH_RANDOM_MATRIX', function () {
            _this4.playAllAnimation();
        });
    },
    replaceSymbols: function replaceSymbols(assets) {
        var symbols = this.node.getComponentsInChildren('SlotSymbol');
        symbols.forEach(function (it) {
            it.assets = assets;
            it.changeToSymbol('2');
        });
    },
    replaceBlurSymbols: function replaceBlurSymbols(assets) {
        var symbols = this.node.getComponentsInChildren('SlotSymbol');
        symbols.forEach(function (it) {
            it.blurAssets = assets;
        });
    },
    playAllAnimation: function playAllAnimation() {
        var _this5 = this;

        this.table.active = false;
        this.payline.active = true;
        this.payline.removeAllChildren();
        var symbols = this.node.getComponentsInChildren('SlotSymbol');
        symbols.forEach(function (it) {
            var symbol = cc.instantiate(_this5.symbolPayline);
            symbol.setParent(_this5.payline);
            symbol.getComponent("SlotSymbolPayline").assets = _this5.node.assets;
            symbol.getComponent("SlotSymbolPayline").changeToSymbol(it.getSymbolName());
            symbol.getComponent("SlotSymbolPayline").playAnimation(2, true);
            var position = _this5.payline.convertToNodeSpaceAR(it.node.parent.convertToWorldSpaceAR(it.node.position));
            symbol.position = position;
        });
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
        //# sourceMappingURL=SlotTestSymbol.js.map
        