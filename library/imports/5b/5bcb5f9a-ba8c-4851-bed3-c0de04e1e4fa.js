"use strict";
cc._RF.push(module, '5bcb5+auoxIUb7TwN4E4eT6', 'ActorDialogSlot');
// cc-common/cc-share-v1/common/viewComponent/ActorDialogSlot.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        overlayLayer: cc.Node,
        lbMessage: cc.Label,
        btnOK: cc.Button,
        btnCancel: cc.Button
    },
    actionOK: null,
    actionCancel: null,

    onLoad: function onLoad() {
        var _this = this;

        this.btnCancel.node.on('click', function () {
            _this.closeMessage();
            if (_this.actionCancel) _this.actionCancel();
        });
        this.btnOK.node.on('click', function () {
            _this.closeMessage();
            if (_this.actionOK) _this.actionOK();
        });
    },
    showMessage: function showMessage(_ref) {
        var strText = _ref.strText,
            _ref$actionCancel = _ref.actionCancel,
            actionCancel = _ref$actionCancel === undefined ? null : _ref$actionCancel,
            _ref$actionOK = _ref.actionOK,
            actionOK = _ref$actionOK === undefined ? null : _ref$actionOK;

        if (!this.node) return;
        this.node.active = true;
        this.lbMessage.string = strText;
        this.actionCancel = actionCancel;
        this.actionOK = actionOK;
        this.btnCancel.node.active = false;
        if (actionCancel !== null) {
            this.btnCancel.node.active = true;
        } else {
            this.btnCancel.node.active = false;
        }
        if (actionOK !== null) {
            this.btnOK.node.active = true;
        } else {
            this.btnOK.node.active = false;
        }
    },
    showNotifyMessage: function showNotifyMessage(_ref2) {
        var strText = _ref2.strText;

        if (!this.node) return;

        this.node.active = true;
        this.lbMessage.string = strText;
        this.btnOK.node.active = false;
        this.btnCancel.node.active = false;
    },
    closeMessage: function closeMessage() {
        this.node.active = false;
    },
    setBtnOkText: function setBtnOkText(text) {
        this.btnOK.node.getChildByName('Text').getComponent(cc.Label).string = text;
    },
    setBtnCancel: function setBtnCancel(text) {
        this.btnCancel.node.getChildByName('Text').getComponent(cc.Label).string = text;
    }
});

cc._RF.pop();