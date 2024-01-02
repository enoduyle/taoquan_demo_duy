"use strict";
cc._RF.push(module, 'c6bccIyoRpJNr1fcXSycUo5', 'ControlBtn');
// cc-common/cc-share-v1/common/gOverlay/ControlBtn.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {
        gamePrefab: cc.Prefab,
        parentNode: cc.Node
    },
    onLoad: function onLoad() {
        this.loaded = false;

        this.parentNode.on('PLT_SHOW_SCORE', this.showScore);
        this.parentNode.on('PLT_WALLET_UPDATE', this.showWallet);
        this.parentNode.on('PLT_BLUR', this.blur);
        this.parentNode.on('PLT_FOCUS', this.focus);
        this.parentNode.on('PLT_SPIN_START', this.spinStart);
    },
    loadGame: function loadGame() {
        this.gameNode = cc.instantiate(this.gamePrefab);
    },
    spinStart: function spinStart() {
        cc.log("PLT_Start_Spin");
    },
    showScore: function showScore(value) {
        cc.log("PLT_Score:", value);
    },
    showWallet: function showWallet(value) {
        cc.log("PLT_Wallet:", value);
    },
    blur: function blur() {
        cc.log("PLT_Blur!");
    },
    focus: function focus() {
        cc.log("PLT_Focus!");
    },
    openGame: function openGame() {
        if (!this.loaded) {
            this.gameNode.parent = this.parentNode;
            this.gameNode.active = true;
            this.gameNodeScript = this.gameNode.getChildByName('Scripts');
            this.gameNodeDimFocusControl = this.gameNode.getComponent('DimFocusControl');
            this.gameNodeScript.emit('CONNECT_GAME');
            this.loaded = true;
        } else {
            this.gameNodeScript.emit('OPEN_GAME');
            this.gameNodeDimFocusControl.focus && this.gameNodeDimFocusControl.focus();
        }

        return this.gameNode;
    },
    outGame: function outGame() {
        if (this.loaded) {
            this.gameNodeScript.emit('OUT_GAME');
            this.parentNode.removeChild(this.gameNode);
            this.loaded = false;
        }
    },
    closeConnection: function closeConnection() {
        var globalNetwork = require('globalNetwork');
        globalNetwork.triggerUserLogout();
    }
});

cc._RF.pop();