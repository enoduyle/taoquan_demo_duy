"use strict";
cc._RF.push(module, '3f57cuXe/lJYpT0fiBE3iQN', 'SlotTableTouchSymbol');
// cc-common/cc-slotbase-v2/portrailGame/Tables/SlotTableTouchSymbol.js

"use strict";

var EventListenerManager = require("EventListenerManager");
cc.Class({
    extends: cc.Component,

    properties: {
        spineAnimBorder: 'VFX_WinFrame'
    },

    onLoad: function onLoad() {
        this.init();
        this.node.on("ALLOW_TOUCH_SYMBOL", this.allowTouchSymbol.bind(this));
        var serviceId = this.node.config.GAME_ID || "9966";
        this.eventListenerManager = EventListenerManager.getInstance(serviceId);
        this.registerEvent();
    },
    registerEvent: function registerEvent() {
        if (this.eventListenerManager) {
            this.eventListenerManager.on("ON_SHOW_SYMBOL_INFO", this.onShowSymbolInfo, this);
        }
    },
    unRegisterAll: function unRegisterAll() {
        if (this.eventListenerManager) {
            this.eventListenerManager.targetOff(this);
        }
    },
    start: function start() {
        this.GUI = this.node.mainDirector && this.node.mainDirector.director.gui;
    },
    allowTouchSymbol: function allowTouchSymbol() {
        var isAllow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isAllowTouchSymbol = isAllow;
        this.GUI && this.GUI.emit('HIDE_INFO_SYMBOL');
    },
    init: function init() {
        this.canvas = cc.find('Canvas');
        if (this.canvas) {
            this.camera = this.canvas.getComponentInChildren(cc.Camera);
        }

        if (this.camera) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        }
    },
    onTouchEnd: function onTouchEnd(event) {
        if (this.node.mainDirector.director.isTutorialShowing()) return;
        var wlocation = new cc.Vec2(0, 0);
        this.camera.getScreenToWorldPoint(event.getLocation(), wlocation);
        if (this.isAllowTouchSymbol == false) return;

        this.allSymbols = this.getAllSymbol();
        for (var index = 0; index < this.allSymbols.length; ++index) {
            var symbol = this.allSymbols[index];
            this.curPoint = symbol.parent.convertToNodeSpaceAR(wlocation);
            var rect = symbol.getBoundingBox();
            if (rect.contains(this.curPoint)) {
                var spineData = this.findSpineData(symbol.mainComponent.symbolName);
                var spineBorder = this.findSpineData(this.spineAnimBorder);
                this.GUI && this.GUI.emit('SHOW_INFO_SYMBOL', wlocation, symbol, spineData, spineBorder);
            }
        }
    },
    findSpineData: function findSpineData(animName) {
        return this.node.mainDirector.director.spineSkeletonDatabase.getSpineSkeletonData(animName);
    },
    onShowSymbolInfo: function onShowSymbolInfo() {
        //override here
    },
    getAllSymbol: function getAllSymbol() {
        var _this = this;

        var arr = [];

        var _loop = function _loop(col) {
            var reel = _this.node.reels[col];
            reel.showSymbols.forEach(function (it) {
                arr.push(it);
                it.isLeftBorder = col === 0 || col == 1;
                it.isRightBorder = col === _this.node.reels.length - 1 || col === _this.node.reels.length - 2;
                it.isMiddle = it.isLeftBorder === false && it.isLeftBorder === false;
            });
        };

        for (var col = 0; col < this.node.reels.length; ++col) {
            _loop(col);
        }
        return arr;
    },
    onDestroy: function onDestroy() {
        this.unRegisterAll();
    }
});

cc._RF.pop();