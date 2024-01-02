(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/controller/IconSpin.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1a5eGbW9RAeZd0n2+xSaIf', 'IconSpin', __filename);
// cc-common/cc-slotbase-v2/slotGame/controller/IconSpin.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: cc.Node,
        direction: 1
    },

    onLoad: function onLoad() {
        this._onHover = this.onHover.bind(this);
        this._onMouseOut = this.onMouseOut.bind(this);
        if (this.targetNode) {
            this.targetNode.on(cc.Node.EventType.MOUSE_ENTER, this._onHover, null, true);
            this.targetNode.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseOut, null, true);
            this.targetNode.on("BUTTON_SPIN_SHOW", this.showIcon, this);
            this.targetNode.on("BUTTON_SPIN_HIDE", this.hideIcon, this);
        }
    },
    start: function start() {
        this.rotateIcon();
    },
    showIcon: function showIcon() {
        this.node.opacity = 255;
    },
    hideIcon: function hideIcon() {
        this.node.opacity = 0;
    },
    onHover: function onHover() {
        this.rotateIcon(1);
    },
    onMouseOut: function onMouseOut() {
        this.rotateIcon();
    },
    rotateIcon: function rotateIcon() {
        var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.5;

        this._tweenRotate && this._tweenRotate.stop();
        this._tweenRotate = cc.tween(this.node).by(speed, { angle: -360 * this.direction }).repeatForever().start();
    },
    onDestroy: function onDestroy() {
        this._tweenRotate && this._tweenRotate.stop();
        if (this.targetNode) {
            this.targetNode.off(cc.Node.EventType.MOUSE_ENTER, this.onHover.bind(this));
            this.targetNode.off(cc.Node.EventType.MOUSE_ENTER, this.onHover.bind(this));
            this.targetNode.off("BUTTON_SPIN_SHOW", this.showIcon, this);
            this.targetNode.off("BUTTON_SPIN_HIDE", this.hideIcon, this);
        }
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
        //# sourceMappingURL=IconSpin.js.map
        