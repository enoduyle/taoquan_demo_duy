"use strict";
cc._RF.push(module, '3ac3en1OA9Lj5LI7nG+ufU5', 'TouchPayableSymbol');
// cc-common/cc-slotbase-v2/portrailGame/gui/TouchPayableSymbol.js

"use strict";

var EventListenerManager = require("EventListenerManager");
cc.Class({
    extends: cc.Component,

    properties: {
        gradient: cc.Node,
        infoSymbol: cc.Node,
        touchBlocks: [cc.Node]
    },

    onLoad: function onLoad() {
        this.node.showInfoSymbol = this.showInfoSymbol.bind(this);
        this.node.hideInfoSymbol = this.hideInfoSymbol.bind(this);
        this.infoSymbol.on(cc.Node.EventType.TOUCH_END, this.onInfoSymbolTouchEnded, this);
        var serviceId = this.node.config.GAME_ID || "9966";
        this.eventListenerManager = EventListenerManager.getInstance(serviceId);
        this.registerEvent();
        this.node.active = false;
        for (var i = 0; i < this.touchBlocks.length; i++) {
            this.touchBlocks[i].on(cc.Node.EventType.TOUCH_START, this.onBlockTouchStarted, this);
        }
    },
    registerEvent: function registerEvent() {
        if (this.eventListenerManager) {
            this.eventListenerManager.on("SHOW_SYMBOL_PAYTABLE_INFO", this.showInfoSymbol, this);
            this.eventListenerManager.on("HIDE_SYMBOL_PAYTABLE_INFO", this.hideInfoSymbol, this);
        }
    },
    unRegisterAll: function unRegisterAll() {
        if (this.eventListenerManager) {
            this.eventListenerManager.targetOff(this);
        }
    },
    showInfoSymbol: function showInfoSymbol(wLocation, symbol, spineData, spineBorder) {
        var _this = this;

        var pos = this.gradient.parent.convertToNodeSpaceAR(wLocation);
        if (!this.gradient.getBoundingBox().contains(pos)) {
            return;
        }

        if (this.node.active == false) {
            this.node.active = true;
            this.infoSymbol.active = true;
            this.node.opacity = 0;
            this.twFadeIn && this.twFadeIn.stop();
            this.twFadeIn = cc.tween(this.node).to(0.03, { opacity: 255 }).call(function () {
                _this.twFadeIn = null;
                if (_this.eventListenerManager) {
                    _this.eventListenerManager.emit("ON_SHOW_SYMBOL_INFO", true);
                }
                _this.showTouchBlocks();
            }).start();
        }
        var SYMBOL_SPECIALS = this.node.config && this.node.config.SYMBOL_SPECIALS || [];
        if (SYMBOL_SPECIALS.indexOf(symbol.mainComponent.symbolName) !== -1) {
            this.node.soundPlayer && this.node.soundPlayer.playGodTap();
        } else {
            this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        }
        var symbolName = symbol.mainComponent.symbolName;
        var p1 = symbol.parent.convertToWorldSpaceAR(symbol.getPosition());
        var p2 = this.infoSymbol.parent.convertToNodeSpaceAR(p1);
        this.infoSymbol.emit("UPDATE_DATA", symbol.mainComponent.symbolName, spineData, spineBorder);
        if (symbol.isLeftBorder) {
            this.infoSymbol.emit("UPDATE_LAYOUT", cc.Layout.HorizontalDirection.LEFT_TO_RIGHT, p2, symbolName);
        } else if (symbol.isRightBorder) {
            this.infoSymbol.emit("UPDATE_LAYOUT", cc.Layout.HorizontalDirection.RIGHT_TO_LEFT, p2, symbolName);
        } else if (symbol.isMiddle) {
            this.infoSymbol.emit("UPDATE_LAYOUT", cc.Layout.HorizontalDirection.LEFT_TO_RIGHT, p2, symbolName);
        }
    },
    hideInfoSymbol: function hideInfoSymbol() {
        var _this2 = this;

        this.twFadeOut && this.twFadeOut.stop();
        this.twFadeOut = cc.tween(this.node).to(0.03, { opacity: 0 }).call(function () {
            _this2.twFadeOut = null;
            if (_this2.eventListenerManager) {
                _this2.eventListenerManager.emit("ON_SHOW_SYMBOL_INFO", false);
            }
            _this2.infoSymbol.emit("RESET_ANIM");
            _this2.infoSymbol.active = false;
            _this2.node.active = false;
        }).start();
    },
    onDestroy: function onDestroy() {
        this.unRegisterAll();
    },
    onBlockTouchStarted: function onBlockTouchStarted() {
        this.showTouchBlocks(false);
        cc.log(">>> On Touch Started on Block!");
        this.hideInfoSymbol();
    },
    showTouchBlocks: function showTouchBlocks() {
        var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        for (var i = 0; i < this.touchBlocks.length; i++) {
            this.touchBlocks[i].active = isOn;
        }
    },
    onInfoSymbolTouchEnded: function onInfoSymbolTouchEnded(event) {
        if (event) event.stopPropagation();
        this.hideInfoSymbol();
    }
});

cc._RF.pop();