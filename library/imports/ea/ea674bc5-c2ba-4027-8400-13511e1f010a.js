"use strict";
cc._RF.push(module, 'ea674vFwrpAJ4QAE1EeHwEK', 'IntroGame9983');
// cc-taoquan-9983/scripts/common/IntroGame9983.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        pageView: cc.PageView,
        introNodes: { type: cc.Node, default: [] },
        anchorPages: { type: cc.Node, default: [] },
        buttons: { type: cc.Button, default: [] },
        isLoading: false,
        btnJoinGame: cc.Button,
        gameId: "",
        doNotShowNode: cc.Node,
        progressBar: cc.Node
    },
    start: function start() {
        this.node.on("ENABLE_BUTTON_JOIN_GAME", this.enableButtonJoinGame, this);
        this.node.on("SHOW_BUTTON_JOIN_GAME", this.showButtonJoinGame, this);
        this.pageView.node.on('scroll-ended', this._onPageTurning, this);
        this.init();
    },
    init: function init() {
        this.currentIndex = globalThis.currentIntroPage || 0;
        if (this.isLoading) this.currentIndex = 0;
        this.showPageIntro();
        this.pageView.scrollToPage(this.currentIndex, 0);
        if (!this.isLoading) {
            var cacheValue = JSON.parse(cc.sys.localStorage.getItem("HideIntroGame")) || {};
            this.isHideIntroGame = cacheValue[this.gameId];
            this.node.active = !this.isHideIntroGame;
            this.node.opacity = 255;
            this.showButtonJoinGame(false);
        }
    },
    _onPageTurning: function _onPageTurning() {
        this.currentIndex = this.pageView.getCurrentPageIndex();
        this.showPageIntro();
    },
    onNextIntro: function onNextIntro() {
        this.currentIndex++;
        this.showPageIntro();
        this.pageView.scrollToPage(this.currentIndex, 0.3);
    },
    onPrevIntro: function onPrevIntro() {
        this.currentIndex--;
        this.showPageIntro();
        this.pageView.scrollToPage(this.currentIndex, 0.3);
    },
    showPageIntro: function showPageIntro() {
        var _this = this;

        globalThis.currentIntroPage = this.currentIndex;
        this.introNodes.forEach(function (item, index) {
            var isShow = index == _this.currentIndex;
            item.active = isShow;
            _this.anchorPages[index].active = isShow;
            _this.buttons[index].interactable = isShow;
        });
    },
    onClickJoinGame: function onClickJoinGame() {
        var _this2 = this;

        this.cacheHideIntroGame();
        this.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
            _this2.node.active = false;
        })));
    },
    cacheHideIntroGame: function cacheHideIntroGame() {
        var cacheValue = {};
        cacheValue[this.gameId] = this.isHideIntroGame;
        cc.sys.localStorage.setItem("HideIntroGame", JSON.stringify(cacheValue));
    },
    onCheckDoNotShowAgain: function onCheckDoNotShowAgain() {
        this.isHideIntroGame = !this.isHideIntroGame;
    },
    enableButtonJoinGame: function enableButtonJoinGame(isEnable) {
        this.btnJoinGame && (this.btnJoinGame.interactable = isEnable);
    },
    showButtonJoinGame: function showButtonJoinGame(isShow) {
        this.progressBar && (this.progressBar.active = !isShow);
        this.doNotShowNode && (this.doNotShowNode.active = isShow);
        this.btnJoinGame && (this.btnJoinGame.node.active = isShow);
    }
});

cc._RF.pop();