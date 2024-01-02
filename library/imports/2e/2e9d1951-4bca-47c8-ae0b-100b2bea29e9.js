"use strict";
cc._RF.push(module, '2e9d1lRS8pHyK4LEAsr6inp', 'DisableMultiTouchButtons');
// cc-common/cc-share-v1/common/DisableMultiTouchButtons.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        buttons: [cc.Button],
        delayToEnable: 0.5
    },

    onLoad: function onLoad() {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            if (button) {
                button.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStarted, this);
                button.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
                button.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
                button.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCanceled, this);
            }
        }
    },
    onTouchStarted: function onTouchStarted(event) {
        var target = event.target;

        if (target) {
            var btn = target.getComponent(cc.Button);
            if (btn && btn.interactable && !this.node.gSlotDataStore.isAutoSpin && this.node.gSlotDataStore.playSession.isFinished !== false) {
                this.disableOtherButtons(target);
            }
        }
    },
    onTouchEnded: function onTouchEnded(event) {
        var target = event.target;

        if (target) {
            var btn = target.getComponent(cc.Button);
            if (btn && btn.interactable && !this.node.gSlotDataStore.isAutoSpin && this.node.gSlotDataStore.playSession.isFinished !== false) {
                this.enableOtherButtons(target, this.delayToEnable);
            }
        }
    },
    onTouchMoved: function onTouchMoved() {
        //todo
    },
    onTouchCanceled: function onTouchCanceled(event) {
        var target = event.target;

        if (target) {
            var btn = target.getComponent(cc.Button);
            if (btn && btn.interactable && !this.node.gSlotDataStore.isAutoSpin && this.node.gSlotDataStore.playSession.isFinished !== false) {
                this.enableOtherButtons(target);
            }
        }
    },
    disableOtherButtons: function disableOtherButtons(target) {
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            if (button && button.node !== target) {
                button.interactable = false;
            }
        }
    },
    enableOtherButtons: function enableOtherButtons(target) {
        var _this = this;

        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this.scheduleOnce(function () {
            for (var i = 0; i < _this.buttons.length; i++) {
                var button = _this.buttons[i];
                if (button && button.node !== target) {
                    button.interactable = true;
                }
            }
        }, delay);
    }
});

cc._RF.pop();