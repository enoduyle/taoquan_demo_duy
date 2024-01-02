(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/IntroAnimation9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92393xi8gpKu5M42nn2Pb5T', 'IntroAnimation9983', __filename);
// cc-taoquan-9983/scripts/common/IntroAnimation9983.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        isSkipFadeInFirstTime: false
    },

    onEnable: function onEnable() {
        var _this = this;

        var delayStep = 0.2;
        var fadeTime = 0.2;
        var scaleTime = 0.4;
        var fadeInNodes = this.node.children.slice(1);
        var totalFadeTime = this.isSkipFadeInFirstTime ? 0 : fadeTime * (fadeInNodes.length - 1);
        if (this.isSkipFadeInFirstTime) {
            this.isSkipFadeInFirstTime = false;
            fadeInNodes.forEach(function (child) {
                return child.opacity = 255;
            });
        } else {
            fadeInNodes.forEach(function (child, index) {
                child.opacity = 0;
                cc.tween(child).delay(index * delayStep).to(fadeTime, { opacity: 255 }).start();
            });
        }
        var loopScaleNodes = this.node.children.filter(function (node) {
            return node.name.includes("scale_loop");
        });
        this.scheduleOnce(function () {
            _this._tweenScale && _this._tweenScale.stop();
            _this._tweenScale = cc.tween(_this.node);
            loopScaleNodes.forEach(function (child, index) {
                _this._tweenScale.delay(scaleTime * 2.1);
                _this._tweenScale.call(function () {
                    var scale = +child.name.split("_").pop();
                    var tweenChild = cc.tween(child).to(scaleTime, { scale: scale }).to(scaleTime, { scale: 1 });
                    if (index === loopScaleNodes.length - 1) {
                        tweenChild.union().repeat(2);
                    }
                    tweenChild.start();
                });
            });
            _this._tweenScale.delay(1.5).union().repeatForever().start();
        }, totalFadeTime);
    },
    onDisable: function onDisable() {
        this._tweenScale && this._tweenScale.stop();
        this.node.children.slice(1).forEach(function (child) {
            child.stopAllActions();
            child.opacity = 0;
        });
    },
    run: function run() {
        this.node.active = !this.node.active;
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
        //# sourceMappingURL=IntroAnimation9983.js.map
        