"use strict";
cc._RF.push(module, 'a3e3dConUdEoK92bRkWG3cd', 'InfoPayableSymbol');
// cc-common/cc-slotbase-v2/portrailGame/gui/InfoPayableSymbol.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        frameBg: cc.Node,
        layout: cc.Layout,
        description: cc.Node,
        payable: cc.Node,
        spine: cc.Node,
        border: cc.Node,
        listSymbols: [cc.String],
        listPayable: [cc.SpriteFrame]
    },

    onLoad: function onLoad() {
        this.node.on("UPDATE_LAYOUT", this.updateLayout.bind(this));
        this.node.on("UPDATE_DATA", this.updateData.bind(this));
        this.node.on("RESET_ANIM", this.resetAnim.bind(this));
        this.spineAnim = this.spine.getComponent(sp.Skeleton);
        this.borderAnim = this.border.getComponent(sp.Skeleton);
    },
    updateLayout: function updateLayout() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
        var newPos = arguments[1];
        var symbolName = arguments[2];

        var newX = void 0;
        if (symbolName === 'K') {
            this.node.width = 480;
            this.description.width = 300;
            newX = direction === cc.Layout.HorizontalDirection.LEFT_TO_RIGHT ? newPos.x + this.node.width * 0.3 : newPos.x - this.node.width * 0.3;
        } else {
            this.node.width = 310;
            this.description.width = 144;
            newX = direction === cc.Layout.HorizontalDirection.LEFT_TO_RIGHT ? newPos.x + this.node.width * 0.22 : newPos.x - this.node.width * 0.22;
        }
        this.node.x = newX;
        this.node.y = newPos.y;
        this.layout.horizontalDirection = direction;
        this.layout.getComponent(cc.Layout).updateLayout();
    },
    updateData: function updateData() {
        var symbolName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var spineData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var spineBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (!symbolName) return;
        var index = this.listSymbols.indexOf(symbolName);
        if (index > -1) {
            this.payable.getComponent(cc.Sprite).spriteFrame = this.listPayable[index];
        }

        if (spineData) {
            this.spineAnim.skeletonData = spineData;
            if (this.spineAnim.findAnimation('Active')) {
                this.spineAnim.setMix('Active', 'Idle', 0.5);
                this.spineAnim.setAnimation(0, 'Active', false);
                this.spineAnim.addAnimation(0, 'Idle', true);
                this.spineAnim.timeScale = 0.5;
            }
        }

        if (spineBorder) {
            this.borderAnim.skeletonData = spineBorder;
            if (this.borderAnim.findAnimation('Touch')) {
                this.borderAnim.setAnimation(0, 'Touch', true);
            }
        }
    },
    resetAnim: function resetAnim() {

        this.spineAnim.skeletonData = null;
        this.borderAnim.skeletonData = null;
    }
});

cc._RF.pop();