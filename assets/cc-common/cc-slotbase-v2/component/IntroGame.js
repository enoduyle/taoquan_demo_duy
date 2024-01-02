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
    },
    onLoad() {
        this.node.on("ENABLE_BUTTON_JOIN_GAME", this.enableButtonJoinGame, this);
        this.node.on("SHOW_BUTTON_JOIN_GAME", this.showButtonJoinGame, this);
        this.init();
    },
    init() {
        this.currentIndex = globalThis.currentIntroPage || 0;
        if (this.isLoading) this.currentIndex = 0;
        this.showPageIntro();
        if (!this.isLoading) {
            const cacheValue = JSON.parse(cc.sys.localStorage.getItem("HideIntroGame")) || {};
            this.isHideIntroGame = cacheValue[this.gameId];
            this.node.active = !this.isHideIntroGame;
            this.node.opacity = 255;
            this.showButtonJoinGame(false);
        }
        this.pageView.node.on('page-turning', this._onPageTurning, this);
    },
    _onPageTurning(){
        this.currentIndex = this.pageView.getCurrentPageIndex();
        this.showPageIntro();
    },
    onNextIntro() {
        this.currentIndex++;
        this.showPageIntro();
        this.pageView.setCurrentPageIndex(this.currentIndex);
    },
    onPrevIntro() {
        this.currentIndex--;
        this.showPageIntro();
        this.pageView.setCurrentPageIndex(this.currentIndex);
    },
    showPageIntro() {
        globalThis.currentIntroPage = this.currentIndex;
        this.introNodes.forEach((item, index) => {
            const isShow = index == this.currentIndex;
            item.active = isShow;
            this.anchorPages[index].active = isShow;
            this.buttons[index].interactable = isShow;
        });
    },
    onClickJoinGame() {
        this.cacheHideIntroGame();
        this.node.runAction(cc.sequence(
            cc.fadeOut(0.2),
            cc.callFunc(() => {
                this.node.active = false;
            })
        ));
    },
    cacheHideIntroGame() {
        const cacheValue = {};
        cacheValue[this.gameId] = this.isHideIntroGame;
        cc.sys.localStorage.setItem("HideIntroGame", JSON.stringify(cacheValue));
    },
    onCheckDoNotShowAgain() {
        this.isHideIntroGame = !this.isHideIntroGame;
    },
    enableButtonJoinGame(isEnable) {
        this.btnJoinGame && (this.btnJoinGame.interactable = isEnable);
    },
    showButtonJoinGame(isShow) {
        this.doNotShowNode && (this.doNotShowNode.active = isShow);
        this.btnJoinGame && (this.btnJoinGame.node.active = isShow);
    }

});
