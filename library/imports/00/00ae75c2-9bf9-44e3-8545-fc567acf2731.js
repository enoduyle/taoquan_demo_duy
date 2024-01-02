"use strict";
cc._RF.push(module, '00ae7XCm/lE44VF/FZ6zycx', 'DialogMessage');
// cc-common/cc-slotbase-v2/component/DialogMessage.js

"use strict";

/**
 * @custom for Message Dialog
 * @for changing button spriteFrames
 */
var _require = require("CustomDataType"),
    ButtonAsset = _require.ButtonAsset;

cc.Class({
    extends: require('ActorDialogSlotbase'),

    properties: {
        buttonAssets: {
            default: [],
            type: ButtonAsset
        }
    },
    show: function show() {
        this._super();
        this._customButtonsForDemo();
    },
    _customButtonsForDemo: function _customButtonsForDemo() {
        var _this = this;

        var strText = this.content.strText;

        if (!this.node.config) {
            cc.error("Need Config");
            return;
        }
        var _node$config$MESSAGE_ = this.node.config.MESSAGE_DIALOG,
            FINISH_DEMO = _node$config$MESSAGE_.FINISH_DEMO,
            SUGGEST_TURBO = _node$config$MESSAGE_.SUGGEST_TURBO;

        if (strText === FINISH_DEMO) {
            this._setSpriteButton(this.btnOK, "CHOI_THAT");
            this._setSpriteButton(this.btnCancel, "KHONG");
        } else if (strText === SUGGEST_TURBO) {
            this._setSpriteButton(this.btnOK, "QUAY_NHANH");
            this._setSpriteButton(this.btnCancel, "DE_SAU");
        } else {
            this._setSpriteButton(this.btnOK, "XAC_NHAN");
            this._setSpriteButton(this.btnCancel, "HUY");
        }
        this.node.opacity = 0;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, 0);
    },
    _setSpriteButton: function _setSpriteButton(button, btnName) {
        var btnAsset = this.buttonAssets.find(function (btnAsset) {
            return btnAsset.name === btnName;
        });
        if (btnAsset) {
            button.normalSprite = btnAsset.normalSprite;
            button.pressedSprite = btnAsset.pressedSprite;
            button.hoverSprite = btnAsset.hoverSprite;
            button.disabledSprite = btnAsset.disabledSprite;
        } else {
            cc.error("Can not find button assets for: ", btnName);
        }
    }
});

cc._RF.pop();