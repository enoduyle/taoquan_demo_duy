"use strict";
cc._RF.push(module, '0b2bakdTYFPSaHtrov1OD5E', 'Setting');
// cc-common/cc-slotbase-v2/gui/Setting.js

"use strict";

/* global CC_DEBUG */
cc.Class({
    extends: cc.Component,
    properties: {
        BGMCheckBox: cc.Node,
        SFXCheckBox: cc.Node,
        btnBetHistory: cc.Button
    },
    onLoad: function onLoad() {
        this.node.on("TOGGLE_SFX", this.sfxToggle, this);
        this.node.on("TOGGLE_BGM", this.bgmToggle, this);
        this.node.on("INIT", this.init, this);
        this.node.on("ADD_TOGGLE_SWITCH_NETWORK", this.addToggleSwitchNetwork, this);
        this.initialized = false;
    },
    init: function init() {
        //Its some weird sound with Toggle sound when init, so this.initialized is the work around
        this.BGMCheckBox.getComponent(cc.Toggle).isChecked = false;
        this.SFXCheckBox.getComponent(cc.Toggle).isChecked = false;

        if (this.node.soundPlayer && this.node.soundPlayer.isEnableBGM) {
            this.BGMCheckBox.getComponent(cc.Toggle).check();
            this.node.soundPlayer.playMainBGM();
        }
        if (this.node.soundPlayer && this.node.soundPlayer.isEnableSFX) {
            this.SFXCheckBox.getComponent(cc.Toggle).check();
        }
        this.initialized = true;
        if (!this.node.mainDirector) return;
        var director = this.node.mainDirector.director;
        if (director && director.playingDemo) {
            this.btnBetHistory && (this.btnBetHistory.interactable = false);
        }
    },
    sfxToggle: function sfxToggle() {
        if (this.node.soundPlayer && this.initialized) {
            this.node.soundPlayer.setEffectEnable(this.SFXCheckBox.getComponent(cc.Toggle).isChecked);
            this.node.soundPlayer.playSFXClick();
        }
    },
    bgmToggle: function bgmToggle() {
        if (this.node.soundPlayer && this.initialized) {
            this.node.soundPlayer.playSFXClick();
            this.node.soundPlayer.setBgmEnable(this.BGMCheckBox.getComponent(cc.Toggle).isChecked);
        }
    },
    addToggleSwitchNetwork: function addToggleSwitchNetwork(gameStateManager) {
        var _this = this;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            IS_PRODUCTION = _loadConfigAsync$getC.IS_PRODUCTION;

        if (!gameStateManager || IS_PRODUCTION || !CC_DEBUG) return;

        var compName = 'ClickAndShow';
        var extendCompName = compName + gameStateManager.serviceId;
        var panelComponent = this.node.getComponent('ClickAndShow');
        if (!panelComponent && this.node.getComponent(extendCompName)) {
            panelComponent = this.node.getComponent(extendCompName);
        }
        if (panelComponent && panelComponent.panel) {
            this.toggleNode = new cc.Node();
            this.toggleNode.addComponent(cc.Toggle);
            this.toggleNode.setContentSize(cc.size(80, 80));
            this.toggleNode.opacity = 0;

            panelComponent.panel.addChild(this.toggleNode);
            var labelNode = new cc.Node();
            labelNode.addComponent(cc.Label);
            labelNode.getComponent(cc.Label).string = 'SLOW NETWORK';
            labelNode.getComponent(cc.Label).fontSize = 18;
            this.toggleNode.addChild(labelNode);

            var toggleCom = this.toggleNode.getComponent(cc.Toggle);
            toggleCom.isChecked = false;
            this.toggleNode.position = cc.v2(540, 0);
            this.toggleNode.on('toggle', function () {
                _this.toggleNode.opacity = toggleCom.isChecked ? 255 : 0;
                gameStateManager.onForceGetLatestedState(toggleCom.isChecked);
            }, this);
        }
    },
    onDestroy: function onDestroy() {
        if (this.toggleNode) {
            this.toggleNode.off("toggle");
        }
    }
});

cc._RF.pop();