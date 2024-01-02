"use strict";
cc._RF.push(module, 'e7dbdh8pQFOQqzh1HVo4My0', 'ActorDialogSlotbase');
// cc-common/cc-slotbase-v2/component/ActorDialogSlotbase.js

"use strict";

var cutsceneMode = require('CutsceneMode');

cc.Class({
    extends: cutsceneMode,

    properties: {
        overlayLayer: cc.Node,
        lbMessage: cc.Label,
        btnOK: cc.Button,
        btnCancel: cc.Button,
        buttonLayout: cc.Node
    },
    actionOK: null,
    actionCancel: null,

    onLoad: function onLoad() {
        this.node.on("PLAY", this.play, this);
        this.node.on("HIDE", this.exit, this);
        this.node.opacity = 255;
        this.node.active = false;
    },
    start: function start() {},
    show: function show() {
        var _this = this;

        var _content = this.content,
            strText = _content.strText,
            _content$actionBtnOK = _content.actionBtnOK,
            actionBtnOK = _content$actionBtnOK === undefined ? null : _content$actionBtnOK,
            _content$actionCancel = _content.actionCancel,
            actionCancel = _content$actionCancel === undefined ? null : _content$actionCancel;

        this.node.active = true;
        this.overlayLayer.active = true;
        this.showMessage({ strText: strText, actionBtnOK: actionBtnOK, actionCancel: actionCancel });
        this.btnOK.node.off('click');
        this.btnOK.node.on('click', function () {
            _this.closeMessage();
            if (_this.actionOK) _this.actionOK();
            if (_this.node.soundPlayer) {
                _this.node.soundPlayer.playSFXClick();
            }
        });

        this.btnCancel.node.off('click');
        this.btnCancel.node.on('click', function () {
            _this.closeMessage();
            if (_this.actionCancel) _this.actionCancel();
            if (_this.node.soundPlayer) {
                _this.node.soundPlayer.playSFXClick();
            }
        });
    },
    enter: function enter() {},
    showMessage: function showMessage(_ref) {
        var strText = _ref.strText,
            _ref$actionBtnOK = _ref.actionBtnOK,
            actionBtnOK = _ref$actionBtnOK === undefined ? null : _ref$actionBtnOK,
            _ref$actionCancel = _ref.actionCancel,
            actionCancel = _ref$actionCancel === undefined ? null : _ref$actionCancel;

        this.node.active = true;
        this.lbMessage.getComponent(cc.Label).string = strText;
        this.actionOK = actionBtnOK;
        this.actionCancel = actionCancel;
        this.btnOK.node.active = actionBtnOK != null;
        this.btnCancel.node.active = actionCancel != null;
        if (this.buttonLayout) {
            this.buttonLayout.active = this.btnOK.node.active || this.btnCancel.node.active;
        }
    },
    closeMessage: function closeMessage() {
        this.hideNode();
        this.callback && this.callback();
    },
    setBtnOkText: function setBtnOkText(text) {
        var labelOk = this.btnOK.node.getComponentInChildren(cc.Label);
        if (labelOk) labelOk.string = text;
    },
    setBtnCancel: function setBtnCancel(text) {
        var labelCancel = this.btnCancel.node.getComponentInChildren(cc.Label);
        if (labelCancel) labelCancel.string = text;
    },
    hideNode: function hideNode() {
        this.overlayLayer.active = false;
        this.exit();
    }
});

cc._RF.pop();