(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/AnimationControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dafbdSJh5pBQb+hML9ava8q', 'AnimationControl', __filename);
// cc-common/cc-slotbase-v2/component/AnimationControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        isPlaying: {
            get: function get() {
                var _playing = false;
                if (this._animation != null && this._animState != null) {
                    _playing = this._animState.isPlaying;
                }
                return _playing;
            },


            visible: false
        },

        onAnimationStartedDelegates: {
            get: function get() {
                return this._onAnimationStartedDelegates;
            },


            visible: false
        },

        onAnimationChangedDelegates: {
            get: function get() {
                return this._onAnimationChangedDelegates;
            },


            visible: false
        },

        onAnimationCompleteDelegates: {
            get: function get() {
                return this._onAnimationCompleteDelegates;
            },


            visible: false
        },

        currentAnimationState: {
            get: function get() {
                return this._animState;
            },


            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._animation = null;
        this._animState = null;
        this._onAnimationCompleteDelegates = [];
        this._onAnimationStartedDelegates = [];
        this._onAnimationChangedDelegates = [];
        this._animation = this.node.getComponent(cc.Animation);
    },
    start: function start() {
        // Obtain animation state of default animation clip first if any
        if (this._animation != null) {
            var defaultClip = this._animation.defaultClip;
            this._animState = this._animation.getAnimationState(defaultClip.name);
        }
    },
    playAnimation: function playAnimation() {
        var clipName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var isLoop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isAdditive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (this._animation != null) {
            if (isAdditive) {
                if (clipName != "") {
                    this._animState = this._animation.playAdditive(clipName);
                } else {
                    // play default clip
                    this._animState = this._animation.playAdditive();
                }
            } else {
                if (clipName != "") {
                    this._animState = this._animation.play(clipName);
                } else {
                    // play default clip
                    this._animState = this._animation.play();
                }
            }

            if (this._animState != null) {
                this._animState.speed = speed;
                this._animState.wrapMode = isLoop ? cc.WrapMode.Loop : cc.WrapMode.Normal;
            }
        }
    },
    setCurrentSpeed: function setCurrentSpeed(newSpeed) {
        if (this._animState != null) {
            this._animState.speed = newSpeed;
        }
    },
    stopAnimation: function stopAnimation() {
        var clipName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (this._animation != null) {
            if (clipName != "") {
                this._animation.stop(clipName);
            } else {
                //stop all the animations
                this._animation.stop();
            }
        }
    },
    onAnimationEnded: function onAnimationEnded() {
        if (this._animState != null) {
            cc.log("This animation clip name: " + this._animState.name + " is stopped");

            for (var i = 0; i < this._onAnimationCompleteDelegates.length; i++) {
                var delegate = this._onAnimationCompleteDelegates[i];
                delegate && delegate();
            }
        }
    },
    onAnimationStarted: function onAnimationStarted() {
        if (this._animState != null) {
            cc.log("This animation clip name: " + this._animState.name + " is started");

            for (var i = 0; i < this._onAnimationStartedDelegates.length; i++) {
                var delegate = this._onAnimationStartedDelegates[i];
                delegate && delegate();
            }
        }
    },
    onAnimationChanged: function onAnimationChanged(param) {
        cc.log('Param: ' + param);
        if (this._animState != null) {
            cc.log("This animation clip name: " + this._animState.name + " is changed param");

            for (var i = 0; i < this._onAnimationChangedDelegates.length; i++) {
                var delegate = this._onAnimationChangedDelegates[i];
                delegate && delegate(param);
            }
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
        //# sourceMappingURL=AnimationControl.js.map
        