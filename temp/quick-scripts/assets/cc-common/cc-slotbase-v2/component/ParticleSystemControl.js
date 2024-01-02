(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/ParticleSystemControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c9b70SYGJGQY8+NlaDOreU', 'ParticleSystemControl', __filename);
// cc-common/cc-slotbase-v2/component/ParticleSystemControl.js

"use strict";

cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true
        // playOnFocus: true,
    },
    properties: {
        particles: {
            type: cc.ParticleSystem,
            default: []
        },
        fadeInTime: 0,
        fadeOutTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    playEffect: function playEffect() {
        var _this = this;

        var _loop = function _loop(i) {
            var particle = _this.particles[i];
            if (particle) {
                particle.node.opacity = 0;
                particle.node.active = true;
                if (_this.fadeInTime > 0) {
                    particle.node.stopAllActions();
                    particle.node.runAction(cc.sequence(cc.fadeIn(_this.fadeInTime), cc.callFunc(function () {
                        particle.resetSystem();
                    })));
                } else {
                    particle.node.opacity = 255;
                    particle.resetSystem();
                }
            }
        };

        for (var i = 0; i < this.particles.length; i++) {
            _loop(i);
        }
    },
    stopEffect: function stopEffect() {
        var _this2 = this;

        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var _loop2 = function _loop2(i) {
            var particle = _this2.particles[i];
            if (particle) {
                particle.stopSystem();
                if (_this2.fadeOutTime > 0) {
                    particle.node.stopAllActions();
                    particle.node.runAction(cc.sequence(cc.fadeOut(_this2.fadeOutTime), cc.callFunc(function () {
                        particle.node.active = false;
                        callback && callback();
                    })));
                } else {
                    particle.node.opacity = 0;
                    particle.node.active = false;
                    callback && callback();
                }
            }
        };

        for (var i = 0; i < this.particles.length; i++) {
            _loop2(i);
        }
    },
    onDestroy: function onDestroy() {
        this.particles = [];
        this.particles = null;
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
        //# sourceMappingURL=ParticleSystemControl.js.map
        