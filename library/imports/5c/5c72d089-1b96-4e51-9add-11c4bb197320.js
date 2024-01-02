"use strict";
cc._RF.push(module, '5c72dCJG5ZOUZrdEcS7GXMg', 'Info');
// cc-common/cc-slotbase-v2/gui/Info.js

"use strict";

var _require = require("utils"),
    changeParent = _require.changeParent;

cc.Class({
    extends: cc.Component,

    properties: {
        nextBtn: cc.Node,
        preBtn: cc.Node,
        infoTitle: cc.Node,
        titles: {
            default: [],
            type: cc.SpriteFrame
        },
        pageViewNode: cc.Node,
        infoPanel: cc.Node,
        infoPanelIndex: 5
    },
    onLoad: function onLoad() {
        this.node.on("NEXT_GAME_INFO", this.next, this);
        this.node.on("PREVIOUS_GAME_INFO", this.previous, this);
        this.curInfoID = 0;
        this.pageView = this.pageViewNode.getComponent(cc.PageView);
        this.pageView.node.on('page-turning', this.pageViewEvent, this);
        this.activeButtons(this.curInfoID);
    },
    start: function start() {
        this.setParentInfoPanel();
    },
    setParentInfoPanel: function setParentInfoPanel() {
        var _this = this;

        if (this.infoPanel && this.infoPanelIndex) {
            var cutscene = this.node.mainDirector.director.cutscene;

            if (cutscene) {
                changeParent(this.infoPanel, cutscene);
                this.scheduleOnce(function () {
                    _this.infoPanel.setSiblingIndex(_this.infoPanelIndex);
                }, 0.034);
            }
        }
    },
    pageViewEvent: function pageViewEvent() {
        var newIndex = this.pageView.getCurrentPageIndex();
        if (Math.abs(newIndex - this.curInfoID) !== 1) {
            this.pageView.scrollToPage(this.curInfoID, 0.1);
            return;
        }
        this.curInfoID = newIndex;
        this.activeButtons(this.curInfoID);
    },
    next: function next() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.pageView.scrollToPage(this.curInfoID + 1);
        this.curInfoID++;
        this.activeButtons(this.curInfoID);
    },
    previous: function previous() {
        if (this.node.soundPlayer) this.node.soundPlayer.playSFXClick();
        this.pageView.scrollToPage(this.curInfoID - 1);
        this.curInfoID--;
        this.activeButtons(this.curInfoID);
    },
    activeButtons: function activeButtons(id) {
        var nextBtn = this.nextBtn,
            preBtn = this.preBtn,
            infoTitle = this.infoTitle;


        var totalInfo = this.pageView.node.getChildByName('view').getChildByName('content').children.length;
        if (id >= totalInfo - 1) {
            id = totalInfo - 1;
            nextBtn.getComponent(cc.Button).interactable = false;
        } else {
            nextBtn.getComponent(cc.Button).interactable = true;
        }

        if (id <= 0) {
            id = 0;
            preBtn.getComponent(cc.Button).interactable = false;
        } else {
            preBtn.getComponent(cc.Button).interactable = true;
        }
        this.curInfoID = id;
        if (infoTitle) {
            if (infoTitle.getComponent(cc.Sprite)) {
                infoTitle.getComponent(cc.Sprite).spriteFrame = this.titles[this.curInfoID];
            } else if (infoTitle.getComponent(cc.Label)) {
                var textData = infoTitle.getComponent('InfoText').textData;
                infoTitle.getComponent(cc.Label).string = textData[this.curInfoID];
            }
        }
    },
    resetInfo: function resetInfo() {
        this.pageView.scrollToPage(0, 0);
        this.curInfoID = 0;
        this.activeButtons(this.curInfoID);
    }
});

cc._RF.pop();