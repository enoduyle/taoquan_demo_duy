(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/ExpandingWildSymbol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d8c4Qk+8dMA6AY7O/Fi698', 'ExpandingWildSymbol', __filename);
// cc-common/cc-slotbase-v2/component/ExpandingWildSymbol.js

"use strict";

cc.Class({
    extends: require("SlotSymbolPayline"),

    properties: {
        spineExpand: cc.Node,
        spineIdle: cc.Node,
        winEff: {
            default: [],
            type: cc.Node
        },
        idleAnimation: "",
        expandAnimations: {
            type: cc.String,
            default: []
        },

        expandTopPosY: 160,
        expandMidPosY: 0,
        expandBotPosY: -160
    },

    onLoad: function onLoad() {
        this._super();
        this.node.playSpineAnimation = this.playSpineAnimation.bind(this);
        this.node.reset = this.reset.bind(this);

        if (this.spineExpand) {
            this._spineSkeletonExp = this.spineExpand.getComponent(sp.Skeleton);
        }

        if (this.spineIdle) {
            this._spineSkeletonIdle = this.spineIdle.getComponent(sp.Skeleton);
        }
    },
    playSpineAnimation: function playSpineAnimation(row) {
        var _this = this;

        if (this._spineSkeletonExp) {
            this.spineExpand.active = true;
            this.spineExpand.stopAllActions();
            this.spineExpand.opacity = 255;
            if (row == 0) {
                this.spineExpand.y = this.expandTopPosY;
            } else if (row == 1) {
                this.spineExpand.y = this.expandMidPosY;
            } else if (row == 2) {
                this.spineExpand.y = this.expandBotPosY;
            }
            var animationName = "";
            if (row >= 0 && row < this.expandAnimations.length) {
                animationName = this.expandAnimations[row];
            }
            this._spineSkeletonIdle && this._spineSkeletonIdle.setCompleteListener(function () {});
            this._spineSkeletonExp.setCompleteListener(function () {
                _this._spineSkeletonExp.setCompleteListener(function () {});
                if (_this.spineIdle) {
                    _this.spineExpand.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function () {
                        _this.spineExpand.active = false;
                    })));
                    _this.spineIdle.opacity = 255;
                    _this.spineIdle.active = true;
                    _this._spineSkeletonIdle.setAnimation(0, _this.idleAnimation, true);
                }
            });
            this._spineSkeletonExp.setAnimation(0, animationName, false);
        }
    },
    reset: function reset() {
        if (this.spineExpand) {
            this.spineExpand.stopAllActions();
            this.spineExpand.opacity = 0;
            this.spineExpand.active = false;
        }
        if (this.spineIdle) {
            this.spineIdle.opacity = 0;
            this.spineIdle.active = false;
        }

        this.winEff.forEach(function (item) {
            item.active = false;
        });
    },
    playAnimation: function playAnimation(row) {
        this.winEff[row].active = true;
        var animationControl = this.winEff[row].getComponent('AnimationControl');
        if (animationControl) {
            animationControl.playAnimation('', 0.8, true, false);
        }
    },
    stopAnimation: function stopAnimation(row) {
        this.winEff[row].active = false;
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
        //# sourceMappingURL=ExpandingWildSymbol.js.map
        