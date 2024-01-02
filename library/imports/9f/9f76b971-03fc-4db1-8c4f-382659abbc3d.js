"use strict";
cc._RF.push(module, '9f76blxA/xNsYxPOCZZq7w9', 'TestSpine');
// cc-common/cc-slot-base-test/TestSpine/TestSpine.js

"use strict";

function getAnimationsName(spine) {
    return Object.keys(spine.skeletonData._skeletonJson.animations);
}
function getSkinsName(spine) {
    return Object.keys(spine.skeletonData._skeletonJson.skins);
}

cc.Class({
    extends: cc.Component,

    properties: {
        panel: cc.Node,
        isShowAddAnim: false
    },

    onLoad: function onLoad() {
        var _this = this;

        this._spines = this.node.getComponentsInChildren(sp.Skeleton);
        this._spines.forEach(function (spine) {
            spine.loop = false;
            spine.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
                _this.focus(spine);
            });
        });
    },
    focus: function focus(spine) {
        cc.log("%c SPINE", "color: red;", spine);
        this._isLoop = false;
        this.panel.removeAllChildren();
        this.addButtonReset(spine);
        this._creatButton("__ setAnimation __", cc.Color.ORANGE);
        this.showAnimListToSet(spine);
        this.showSkin(spine);
        if (this.isShowAddAnim) {
            this._creatButton("__ addAnimation __", cc.Color.ORANGE);
            this.showAnimListToAdd(spine);
        }
    },
    addButtonReset: function addButtonReset(spine) {
        var _this2 = this;

        var buttonOn = this._creatButton("ACTIVE");
        buttonOn.color = cc.Color.RED;
        buttonOn.on(cc.Node.EventType.MOUSE_DOWN, function () {
            spine.node.active = true;
        });

        var buttonOff = this._creatButton("DEACTIVATE");
        buttonOff.color = cc.Color.GRAY;
        buttonOff.on(cc.Node.EventType.MOUSE_DOWN, function () {
            spine.node.active = false;
        });

        var buttonLoop = this._creatButton(this._isLoop ? "UNLOOP" : "LOOP");
        buttonLoop.color = cc.Color.BLUE;
        buttonLoop.on(cc.Node.EventType.MOUSE_DOWN, function () {
            _this2._isLoop = !_this2._isLoop;
            buttonLoop.getComponent(cc.Label).string = _this2._isLoop ? "UNLOOP" : "LOOP";
            var anim = spine.animation;
            spine.setAnimation(0, anim, _this2._isLoop);
        });
    },
    showAnimListToSet: function showAnimListToSet(spine) {
        var _this3 = this;

        var animations = getAnimationsName(spine);

        var _loop = function _loop(i) {
            var animName = animations[i];
            var btn = _this3._creatButton(animName);
            btn.on(cc.Node.EventType.MOUSE_DOWN, function () {
                var currentTime = Date.now();
                spine.setAnimation(0, animName, _this3._isLoop);
                spine.setCompleteListener(function () {
                    cc.log("%c anims queue: " + spine._animationQueue.length, "color: red;", JSON.stringify(spine._animationQueue, null, '\t'));
                    cc.log('duration', Date.now() - currentTime);
                });
            });
        };

        for (var i = 0; i < animations.length; i++) {
            _loop(i);
        }
    },
    showSkin: function showSkin(spine) {
        var _this4 = this;

        var skins = getSkinsName(spine);
        cc.log("%c skins: ", "color:red", skins);
        if (!skins || skins.length === 0) return;
        this._creatButton("__ setSkin __", cc.Color.ORANGE);

        var _loop2 = function _loop2(i) {
            var skinName = skins[i];
            var btn = _this4._creatButton(skinName);
            btn.on(cc.Node.EventType.MOUSE_DOWN, function () {
                spine.setSkin(skinName);
            });
        };

        for (var i = 0; i < skins.length; i++) {
            _loop2(i);
        }
    },
    showAnimListToAdd: function showAnimListToAdd(spine) {
        var _this5 = this;

        var animations = getAnimationsName(spine);

        var _loop3 = function _loop3(i) {
            var animName = animations[i];
            var btn = _this5._creatButton(animName);
            btn.on(cc.Node.EventType.MOUSE_DOWN, function () {
                if (_this5._isLoop) {
                    alert("can not add animation when spine is looping");
                }
                spine.addAnimation(0, animName, false);
                cc.log("animation queue: ", spine._animationQueue);
            });
        };

        for (var i = 0; i < animations.length; i++) {
            _loop3(i);
        }
    },
    _creatButton: function _creatButton() {
        var buttonName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.Color.BLACK;

        var btn = new cc.Node();
        btn.name = "btn " + buttonName;
        btn.color = color;
        this.panel.addChild(btn);
        var label = btn.addComponent(cc.Label);
        label.string = buttonName;
        return btn;
    }
});

cc._RF.pop();