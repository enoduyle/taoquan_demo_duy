(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/UIManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c827fxOHu5L47jM+Ekoi6Ub', 'UIManager', __filename);
// cc-common/cc-slotbase-v2/portrailGame/UIManager.js

'use strict';

var EventListenerManager = require("EventListenerManager");
cc.Class({
    extends: cc.Component,

    properties: {
        topUI: cc.Node,
        bottomUI: cc.Node,
        menuBar: cc.Node,
        payLineWinInfo: cc.Node,
        jackpotPopup: cc.Node,
        smallToolTip: cc.Node,
        //Button
        bottomButtons: {
            type: cc.Button,
            default: []
        },
        // popup
        // back2RealPanel: cc.Node,
        autoSpinPanel: cc.Node,
        betSelectionNode: cc.Node
    },

    onLoad: function onLoad() {
        this.node.showAllUI = this.showAllUI.bind(this);
        this.node.hideAllUI = this.hideAllUI.bind(this);
        this.node.showMenuBar = this.showMenuBar.bind(this);
        this.node.hideMenuBar = this.hideMenuBar.bind(this);
        this.node.isDisplayMenuBar = this.isDisplayMenuBar.bind(this);
        this.node.isDisplayBetSelectionPanel = this.isDisplayBetSelectionPanel.bind(this);
        this.node.isDisplayAutoSpinPanel = this.isDisplayAutoSpinPanel.bind(this);

        var customEvt = new cc.Event.EventCustom('BINDING_GUI', true);
        customEvt.detail = { GUI: this.node };
        this.node.dispatchEvent(customEvt);

        this.node.on('DISABLE_MENU', this.disableMenu, this);
        this.node.on('ENABLE_MENU', this.enableMenu, this);
        this.node.on('SHOW_SMALL_TOOL_TIP', this.showSmallToolTip, this);
        this.node.on('UPDATE_WIN_AMOUNT', this.updateWinAmount, this);
        this.node.on("SHOW_INFO_SYMBOL", this.showInfoSymbol, this);
        this.node.on("HIDE_INFO_SYMBOL", this.hideInfoSymbol, this);
        this.node.on("SHOW_JACKPOT_POPUP", this.showJackpotPopup, this);
        this.node.switchToRealMode = this.switchToRealMode.bind(this);
        this.node.switchToTrialMode = this.switchToTrialMode.bind(this);
        var serviceId = this.node.config.GAME_ID || "9966";
        this.eventListenerManager = EventListenerManager.getInstance(serviceId);
    },
    start: function start() {
        this.init();
    },
    init: function init() {
        if (this.menuBar) this.menuBar.init();
    },
    showAllUI: function showAllUI() {
        if (this.topUI) this.topUI.show();
        if (this.bottomUI) this.bottomUI.show();
    },
    hideAllUI: function hideAllUI() {
        if (this.topUI) this.topUI.hide();
        if (this.bottomUI) this.bottomUI.hide();
    },
    showMenuBar: function showMenuBar() {
        var _this = this;

        if (this.node.mainDirector.director.isTutorialShowing()) return;
        if (this.isShowingMenuBar) return;
        this.isShowingMenuBar = true;

        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.hideInfoSymbol();
        if (this.bottomUI) this.bottomUI.hide();
        if (this.menuBar) {
            this.menuBar.opacity = 255;
            this.menuBar.show(0, function () {
                _this.isShowingMenuBar = false;
                _this.isShowMenuBarCompleted = true;
            });
        }
    },
    hideMenuBar: function hideMenuBar() {
        var _this2 = this;

        var isPlaySfx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!this.isShowMenuBarCompleted) return;
        this.isShowMenuBarCompleted = false;
        isPlaySfx && this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        if (this.bottomUI) this.bottomUI.show();
        if (this.menuBar) {
            this.menuBar.hide(function () {}, function () {
                _this2.menuBar.opacity = 0;
                _this2.isShowingMenuBar = false;
            });
        }
    },
    showInfoSymbol: function showInfoSymbol(wLocation, symbol, spineData, spineBorder) {
        this.menuBar.opacity > 0 && this.hideMenuBar();
        if (this.betSelectionNode.isShowing) this.betSelectionNode.hide();
        if (this.eventListenerManager) {
            this.eventListenerManager.emit("SHOW_SYMBOL_PAYTABLE_INFO", wLocation, symbol, spineData, spineBorder);
        }
    },
    hideInfoSymbol: function hideInfoSymbol() {
        if (this.eventListenerManager) {
            this.eventListenerManager.emit("HIDE_SYMBOL_PAYTABLE_INFO");
        }
    },
    showAutoSpinPanel: function showAutoSpinPanel() {
        var _this3 = this;

        if (this.node.mainDirector.director.isTutorialShowing()) return;
        if (this.isShowingAutoSpinPanel) return;
        this.isShowingAutoSpinPanel = true;
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.hideInfoSymbol();
        if (!this.autoSpinPanel) return;
        this.autoSpinPanel.opacity = 255;
        this.autoSpinPanel.show(0, function () {
            _this3.isShowingAutoSpinPanel = false;
            _this3.autoSpinPanel.showOverlay(true);
        });
    },
    hideAutoSpinPanel: function hideAutoSpinPanel() {
        var _this4 = this;

        var isPlaySfx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        isPlaySfx && this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        if (!this.autoSpinPanel) return;
        this.autoSpinPanel.opacity = 255;
        this.autoSpinPanel.hide(0, function () {
            _this4.autoSpinPanel.opacity = 0;
            _this4.autoSpinPanel.showOverlay(false);
            _this4.isShowingAutoSpinPanel = false;
        });
    },
    showBetSelectionPanel: function showBetSelectionPanel() {
        var _this5 = this;

        if (this.node.mainDirector.director.isTutorialShowing()) return;
        if (this.isShowingBetPanel) return;
        this.isShowingBetPanel = true;
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.hideInfoSymbol();
        if (!this.betSelectionNode) return;
        this.betSelectionNode.show(0, function () {
            _this5.isShowingBetPanel = false;
        });
    },
    hideBetSelectionPanel: function hideBetSelectionPanel() {
        var isPlaySfx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        isPlaySfx && this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        if (!this.betSelectionNode) return;
        this.betSelectionNode.hide();
    },
    showInfoPanel: function showInfoPanel() {
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.node.mainDirector.director.showCutscene("InfoPanel", {}, function () {});
    },
    hideInfoPanel: function hideInfoPanel() {},
    showPaytablePanel: function showPaytablePanel() {
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.node.mainDirector.director.showCutscene("PaytablePanel", {}, function () {});
    },
    hidePaytablePanel: function hidePaytablePanel() {},
    switchToRealMode: function switchToRealMode() {
        this.hideOtherActivePanels();
    },
    switchToTrialMode: function switchToTrialMode() {
        this.scheduleOnce(this.hideOtherActivePanels, 1);
    },
    hideOtherActivePanels: function hideOtherActivePanels() {
        if (this.isDisplayMenuBar()) {
            this.hideMenuBar();
        }
        if (this.isDisplayBetSelectionPanel()) {
            this.hideBetSelectionPanel(false);
        }
        if (this.isDisplayAutoSpinPanel()) {
            this.hideAutoSpinPanel(false);
        }
        if (this.bottomUI && this.bottomUI.opacity < 250) this.bottomUI.show();
    },
    disableMenu: function disableMenu() {
        for (var i = 0; i < this.bottomButtons.length; i++) {
            var btn = this.bottomButtons[i];
            if (btn) btn.interactable = false;
        }
    },
    enableMenu: function enableMenu() {
        for (var i = 0; i < this.bottomButtons.length; i++) {
            var btn = this.bottomButtons[i];
            if (btn) btn.interactable = true;
        }
    },
    showSmallToolTip: function showSmallToolTip(data) {
        this.smallToolTip.emit('SHOW_SMALL_TOOL_TIP', data);
    },
    showBetHistoryPanel: function showBetHistoryPanel() {
        this.node.mainDirector.director.showCutscene("BetHistory", {}, function () {});
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.hideInfoSymbol();
    },
    showJackpotPopup: function showJackpotPopup(data) {
        this.jackpotPopup.show(data);
    },
    hideBetHistoryPanel: function hideBetHistoryPanel() {},
    onJackpotButtonClick: function onJackpotButtonClick() {
        this.showJackpotHistoryPanel();
        if (this.menuBar.opacity > 0) {
            this.hideMenuBar(false);
        }
    },
    showJackpotHistoryPanel: function showJackpotHistoryPanel() {
        this.node.mainDirector.director.showCutscene("JackpotHistory", {}, function () {});
        this.node.soundPlayer && this.node.soundPlayer.playSFXClick();
        this.hideInfoSymbol();
    },
    hideJackpotHistoryPanel: function hideJackpotHistoryPanel() {},
    onHideMenuBarButtonClick: function onHideMenuBarButtonClick() {
        this.hideMenuBar(false);
    },
    onHideBetSelection: function onHideBetSelection() {
        if (!this.isShowingBetPanel) this.hideBetSelectionPanel(false);
    },
    onHideAutoSpinPanel: function onHideAutoSpinPanel() {
        if (!this.isShowingAutoSpinPanel) this.hideAutoSpinPanel(false);
    },
    updateWinAmount: function updateWinAmount(winAmount) {
        this.betSelectionNode.emit('UPDATE_WIN_AMOUNT', winAmount);
    },
    isDisplayMenuBar: function isDisplayMenuBar() {
        return this.menuBar.opacity > 0;
    },
    isDisplayBetSelectionPanel: function isDisplayBetSelectionPanel() {
        return this.betSelectionNode.isShowing;
    },
    isDisplayAutoSpinPanel: function isDisplayAutoSpinPanel() {
        return this.autoSpinPanel.opacity > 0;
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
        //# sourceMappingURL=UIManager.js.map
        