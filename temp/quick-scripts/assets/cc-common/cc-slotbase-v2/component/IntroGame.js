(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/IntroGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cecbcxQXQdExpB+FSjSjSIo', 'IntroGame', __filename);
// cc-common/cc-slotbase-v2/component/IntroGame.js

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
        doNotShowNode: cc.Node
    },
    onLoad: function onLoad() {
        this.node.on("ENABLE_BUTTON_JOIN_GAME", this.enableButtonJoinGame, this);
        this.node.on("SHOW_BUTTON_JOIN_GAME", this.showButtonJoinGame, this);
        this.init();
    },
    init: function init() {
        this.currentIndex = globalThis.currentIntroPage || 0;
        if (this.isLoading) this.currentIndex = 0;
        this.showPageIntro();
        if (!this.isLoading) {
            var cacheValue = JSON.parse(cc.sys.localStorage.getItem("HideIntroGame")) || {};
            this.isHideIntroGame = cacheValue[this.gameId];
            this.node.active = !this.isHideIntroGame;
            this.node.opacity = 255;
            this.showButtonJoinGame(false);
        }
        this.pageView.node.on('page-turning', this._onPageTurning, this);
    },
    _onPageTurning: function _onPageTurning() {
        this.currentIndex = this.pageView.getCurrentPageIndex();
        this.showPageIntro();
    },
    onNextIntro: function onNextIntro() {
        this.currentIndex++;
        this.showPageIntro();
        this.pageView.setCurrentPageIndex(this.currentIndex);
    },
    onPrevIntro: function onPrevIntro() {
        this.currentIndex--;
        this.showPageIntro();
        this.pageView.setCurrentPageIndex(this.currentIndex);
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
        this.doNotShowNode && (this.doNotShowNode.active = isShow);
        this.btnJoinGame && (this.btnJoinGame.node.active = isShow);
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
        //# sourceMappingURL=IntroGame.js.map
        