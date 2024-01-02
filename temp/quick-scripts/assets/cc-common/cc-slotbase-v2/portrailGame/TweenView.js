(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/portrailGame/TweenView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6ea34lKIL5CiJO4MacWpBzM', 'TweenView', __filename);
// cc-common/cc-slotbase-v2/portrailGame/TweenView.js

"use strict";

var TweenType = cc.Enum({
    FADE: 0,
    MOVE: 1,
    ZOOM: 2,
    ROTATE: 3,

    FADE_AND_MOVE: 4,
    FADE_AND_ZOOM: 5,
    FADE_AND_ROTATE: 6,

    MOVE_AND_ZOOM: 7,
    MOVE_AND_ROTATE: 8,

    ROTATE_AND_ZOOM: 9,

    FADE_AND_MOVE_AND_ZOOM: 10,
    FADE_AND_MOVE_AND_ROTATE: 11,
    FADE_AND_ROTATE_AND_ZOOM: 12,

    MOVE_AND_ZOOM_AND_ROTATE: 13,

    FADE_AND_MOVE_AND_ZOOM_AND_ROTATE: 14,

    OTHER: 99
});

var TweenViewConfig = cc.Class({
    name: 'TweenViewConfig',

    properties: {
        fromOpacity: 0,
        toOpacity: 255,
        fadeDuration: 1,
        fadeEasing: "sineIn",

        fromPos: cc.v2(0, 0),
        toPos: cc.v2(0, 0),
        moveDuration: 1,
        moveEasing: "sineIn",

        fromScale: 1,
        toScale: 2,
        scaleDuration: 1,
        scaleEasing: "sineIn",

        fromAngle: 0,
        toAngle: 180,
        rotateDuration: 1,
        rotateEasing: "sineIn"
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        tweenType: {
            type: TweenType,
            default: TweenType.FADE
        },

        tweenViewConfig: {
            type: TweenViewConfig,
            default: null
        },
        delayStart: 0,
        forceChildrend: false,
        stopPreviousTween: true
    },

    onLoad: function onLoad() {
        this.node.show = this.show.bind(this);
        this.node.hide = this.hide.bind(this);
        this.node.on("SHOW", this.show, this);
        this.node.on("HIDE", this.hide, this);
    },
    onShowBtnClick: function onShowBtnClick() {
        this.show();
    },
    onHideBtnClick: function onHideBtnClick() {
        this.hide();
    },
    show: function show() {
        var _this = this;

        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.showByType(true, this.tweenType, this.delayStart, function () {
            if (_this.forceChildrend) {
                for (var i = 0; i < _this.node.children.length; i++) {
                    var child = _this.node.children[i];
                    if (child) child.emit("SHOW");
                }
            }
            onStartCB && onStartCB();
        }, onCompleteCB);
    },
    hide: function hide() {
        var _this2 = this;

        var onStartCB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onCompleteCB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.showByType(false, this.tweenType, this.delayStart, onStartCB, function () {
            if (_this2.forceChildrend) {
                for (var i = 0; i < _this2.node.children.length; i++) {
                    var child = _this2.node.children[i];
                    if (child) child.emit("HIDE");
                }
            }
            onCompleteCB && onCompleteCB();
        });
    },
    showByParams: function showByParams() {
        //Todo
    },
    showByType: function showByType(isShow, type, delay, onStartcallback, onFinishedCallback) {
        var _tweenViewConfig = this.tweenViewConfig,
            fromOpacity = _tweenViewConfig.fromOpacity,
            toOpacity = _tweenViewConfig.toOpacity,
            fadeDuration = _tweenViewConfig.fadeDuration,
            fadeEasing = _tweenViewConfig.fadeEasing,
            fromPos = _tweenViewConfig.fromPos,
            toPos = _tweenViewConfig.toPos,
            moveDuration = _tweenViewConfig.moveDuration,
            moveEasing = _tweenViewConfig.moveEasing,
            fromScale = _tweenViewConfig.fromScale,
            toScale = _tweenViewConfig.toScale,
            scaleDuration = _tweenViewConfig.scaleDuration,
            scaleEasing = _tweenViewConfig.scaleEasing,
            fromAngle = _tweenViewConfig.fromAngle,
            toAngle = _tweenViewConfig.toAngle,
            rotateDuration = _tweenViewConfig.rotateDuration,
            rotateEasing = _tweenViewConfig.rotateEasing;

        this._startCB = onStartcallback;
        this._endCB = onFinishedCallback;
        switch (type) {
            case TweenType.FADE:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                break;
            case TweenType.MOVE:
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                break;
            case TweenType.ZOOM:
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.ROTATE:
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_MOVE:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);

                break;
            case TweenType.FADE_AND_ZOOM:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_ROTATE:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                break;
            case TweenType.MOVE_AND_ZOOM:
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.MOVE_AND_ROTATE:
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_MOVE_AND_ZOOM:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_MOVE_AND_ROTATE:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_ROTATE_AND_ZOOM:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.MOVE_AND_ZOOM_AND_ROTATE:
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                break;
            case TweenType.FADE_AND_MOVE_AND_ZOOM_AND_ROTATE:
                this._fadeTo(isShow ? fromOpacity : toOpacity, isShow ? toOpacity : fromOpacity, delay, fadeDuration, fadeEasing, this._startCB, this._endCB);
                this._moveTo(isShow ? fromPos : toPos, isShow ? toPos : fromPos, delay, moveDuration, moveEasing, this._startCB, this._endCB);
                this._rotateTo(isShow ? fromAngle : toAngle, isShow ? toAngle : fromPos, delay, rotateDuration, rotateEasing, this._startCB, this._endCB);
                this._zoomTo(isShow ? fromScale : toScale, isShow ? toScale : fromPos, delay, scaleDuration, scaleEasing, this._startCB, this._endCB);
                break;
            case TweenType.OTHER:

                break;
        }
    },
    _fadeTo: function _fadeTo(fromOpacity, toOpacity, delay, duration, easing, startCallback, endCallback) {
        var _this3 = this;

        var _delay = delay;
        var _duration = duration;
        if (this.tweenFade && this.stopPreviousTween) {
            this.tweenFade.stop();
            this.tweenFade = null;
            _delay = 0;
            _duration = 0.01;
        } else {
            this.node.opacity = fromOpacity;
        }
        this.tweenFade = cc.tween(this.node).delay(_delay).call(function () {
            startCallback && startCallback();
            startCallback = null;
        }).to(_duration, { opacity: toOpacity }, { easing: easing }).call(function () {
            endCallback && endCallback();
            endCallback = null;
            _this3.tweenFade = null;
        }).start();
        return this.tweenFade;
    },
    _moveTo: function _moveTo(fromPos, toPos, delay, duration, easing, startCallback, endCallback) {
        var _this4 = this;

        var _delay = delay;
        var _duration = duration;
        if (this.tweenMove && this.stopPreviousTween) {
            this.tweenMove.stop();
            this.tweenMove = null;
            _delay = 0;
            _duration = 0.01;
        } else {
            this.node.posisition = fromPos;
        }
        this.tweenMove = cc.tween(this.node).delay(_delay).call(function () {
            startCallback && startCallback();
            startCallback = null;
        }).to(_duration, { position: toPos }, { easing: easing }).call(function () {
            endCallback && endCallback();
            endCallback = null;
            _this4.tweenMove = null;
        }).start();
        return this.tweenMove;
    },
    _zoomTo: function _zoomTo(fromScale, toScale, delay, duration, easing, startCallback, endCallback) {
        var _this5 = this;

        var _delay = delay;
        var _duration = duration;

        if (this.tweenZoom && this.stopPreviousTween) {
            this.tweenZoom.stop();
            this.tweenZoom = null;
            _delay = 0;
            _duration = 0.01;
        } else {
            this.node.scale = fromScale;
        }
        this.tweenZoom = cc.tween(this.node).delay(_delay).call(function () {
            startCallback && startCallback();
            startCallback = null;
        }).to(_duration, { scale: toScale }, { easing: easing }).call(function () {
            endCallback && endCallback();
            endCallback = null;
            _this5.tweenZoom = null;
        }).start();
        return this.tweenZoom;
    },
    _rotateTo: function _rotateTo(fromAngle, toAngle, delay, duration, easing, startCallback, endCallback) {
        var _this6 = this;

        var _delay = delay;
        var _duration = duration;
        if (this.tweenRotate && this.stopPreviousTween) {
            this.tweenRotate.stop();
            this.tweenRotate = null;
            _delay = 0;
            _duration = 0.01;
        } else {
            this.node.angle = fromAngle;
        }
        this.tweenRotate = cc.tween(this.node).delay(_delay).call(function () {
            startCallback && startCallback();
            startCallback = null;
        }).to(_duration, { angle: toAngle }, { easing: easing }).call(function () {
            endCallback && endCallback();
            endCallback = null;
            _this6.tweenRotate = null;
        }).start();
        return this.tweenRotate;
    },
    onDestroy: function onDestroy() {
        if (this.tweenFade) this.tweenFade.stop();
        if (this.tweenMove) this.tweenMove.stop();
        if (this.tweenZoom) this.tweenZoom.stop();
        if (this.tweenRotate) this.tweenRotate.stop();
        this.unscheduleAllCallbacks();
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
        //# sourceMappingURL=TweenView.js.map
        