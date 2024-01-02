(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/WildMultiplier9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6cb71jhQXBEjrYL8VsBEu8B', 'WildMultiplier9983', __filename);
// cc-taoquan-9983/scripts/common/WildMultiplier9983.js

'use strict';

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

var COLOR = ['Bac', 'Do', 'Den', 'XanhDuong', 'Vang', 'XanhLa', 'Tim'];

cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        images: [cc.SpriteFrame],
        spine: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on('ACTIVE_MULTIPLIER', this.active, this);
        this.node.on('ACTIVE_FAST', this.active_fast, this);
        this.node.on('HIDE', this.hide, this);
        this.node.on('HIDE_FAST', this.hideFast, this);
        this.assets = convertAssetArrayToObject(this.images);
        this.display.scale = 0;
        if (this.spine) {
            this.spineAnim = this.spine.getComponent(sp.Skeleton);
        }
    },
    hide: function hide() {
        this.display.stopAllActions();
        this.display.opacity = 0;
        this.callback && this.callback();
        this.callback = null;
        if (this.isShowing) {
            this.display.scale = 1;
            this.display.angle = 0;
            this.display.opacity = 255;
            this.display.runAction(cc.fadeOut(0.4));
            this.isShowing = false;
            if (this.spineAnim) this.spineAnim.setAnimation(0, 'Static', true);
        }
    },
    hideFast: function hideFast() {
        this.display.stopAllActions();
        this.display.opacity = 0;
        this.callback && this.callback();
        this.callback = null;
        if (this.isShowing) {
            this.display.scale = 1;
            this.display.angle = 0;
            this.isShowing = false;
        }
    },
    active: function active(multiplier) {
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

        var _this = this;

        var isAutoSpin = arguments[2];
        var callback = arguments[3];

        this.isShowing = true;
        this.callback = callback;
        if (!isAutoSpin) {
            this.callback && this.callback();
            this.callback = null;
        }

        if (this.spineAnim) {
            this.spineAnim.setAnimation(0, 'Win', false);
            this.spineAnim.addAnimation(0, 'Idle', false);
            this.spineAnim.addAnimation(0, 'Static', true);
        }
        var delayTime = 0;
        var imagesName = this.convertName(multiplier, color);
        this.display.getComponent(cc.Sprite).spriteFrame = this.assets[imagesName];
        this.display.stopAllActions();
        this.display.scale = 0;
        this.display.angle = 0;
        this.display.opacity = 255;
        cc.tween(this.display).to(0.8, { angle: 360, scale: 1.3 }).to(0.2, { scale: 1 }).delay(delayTime).call(function () {
            if (isAutoSpin) {
                _this.callback && _this.callback();
                _this.callback = null;
            }
        }).start();
    },
    active_fast: function active_fast(multiplier) {
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

        this.isShowing = true;
        var imagesName = this.convertName(multiplier, color);
        this.display.getComponent(cc.Sprite).spriteFrame = this.assets[imagesName];
        if (this.spineAnim) this.spineAnim.setAnimation(0, 'Static', true);
        this.display.scale = 1;
        this.display.angle = 0;
        this.display.opacity = 255;
    },
    convertName: function convertName(multiplier, color) {
        return 'X' + multiplier + '-' + COLOR[color - 1];
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
        //# sourceMappingURL=WildMultiplier9983.js.map
        