(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/controller/SlotButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd4441HwPr5IVbNrLprBYG2G', 'SlotButton', __filename);
// cc-common/cc-slotbase-v2/slotGame/controller/SlotButton.js

"use strict";

cc.Class({
    extends: require("SlotButtonBase"),

    properties: {
        stopAutoSpinBtn: cc.Node,
        spinBtn: cc.Node,
        fastToResultBtn: cc.Node,
        panelMultiSpin: cc.Node,
        multiSpin1Btn: cc.Node,
        multiSpin2Btn: cc.Node,
        multiSpin3Btn: cc.Node,
        multiSpin4Btn: cc.Node,
        removeSpinPanel: false,
        promotionSpin: cc.Node,
        promotionSpinTimes: cc.Node,
        promotionSpinStopBtn: cc.Node,
        promotionSpinEffect: cc.Node,
        promotionIconSpin: cc.Node,
        removeSoundClick: false
    },
    onLoad: function onLoad() {
        var _this = this;

        if (this.spinBtn) {
            this.node.on("SPIN_ENABLE", this.enableSpin, this);
            this.node.on("SPIN_DISABLE", this.disableSpin, this);
            this.node.on("SPIN_SHOW", this.showSpin, this);
            this.node.on("SPIN_HIDE", this.hideSpin, this);
        }

        if (this.fastToResultBtn) {
            this.node.on("FAST_TO_RESULT_SHOW", this.showFastToResult, this);
            this.node.on("FAST_TO_RESULT_HIDE", this.hideFastToResult, this);
            this.node.on("FAST_TO_RESULT_ENABLE", this.enableFastToResult, this);
            this.node.on("FAST_TO_RESULT_DISABLE", this.disableFastToResult, this);
        }

        if (this.stopAutoSpinBtn) {
            this.node.on("STOP_AUTO_SPIN_SHOW", this.showStopAutoSpin, this);
            this.node.on("STOP_AUTO_SPIN_HIDE", this.hideStopAutoSpin.bind(this));
        }

        this.node.on("PAUSE_AUTO_SPIN", this.pauseAutoSpin, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.node.on("ENABLE_SPIN_KEY", function (enable) {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);

            if (enable) cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);
        });

        if (this.promotionSpin) {
            this.node.on("PROMOTION_SPIN_SHOW", this.showPromotionSpin, this);
            this.node.on("PROMOTION_SPIN_HIDE", this.hidePromotionSpin, this);
        }

        if (this.promotionSpinEffect) {
            this.node.on("SHOW_PROMOTION_SPIN_EFFECT", this.showPromotionSpinEffect, this);
            this.node.on("HIDE_PROMOTION_SPIN_EFFECT", this.hidePromotionSpinEffect, this);
        }

        if (this.promotionSpinTimes) {
            this.node.on("PROMOTION_SPIN_TIMES_SHOW", this.showPromotionSpinTimes, this);
            this.node.on("PROMOTION_SPIN_TIMES_HIDE", this.hidePromotionSpinTimes, this);
        }

        if (this.promotionSpinStopBtn) {
            this.node.on("PROMOTION_STOP_SPIN_SHOW", this.showPromotionSpinStopBtn, this);
            this.node.on("PROMOTION_STOP_SPIN_HIDE", this.hidePromotionSpinStopBtn, this);
            this.node.on("DISABLE_PROMOTION_STOP_SPIN", this.disablePromotionSpinStopBtn, this);
            this.node.on("ENABLE_PROMOTION_STOP_SPIN", this.enablePromotionSpinStopBtn, this);
        }

        this.node.on("HIDE_ALL_PROMOTION_BUTTONS", this.hideAllPromotionButton, this);
        this.node.on("SHOW_ALL_PROMOTION_BUTTONS", this.showAllPromotionButton, this);

        this._isPromotionSpin = false;

        if (this.promotionSpin) {
            this.promotionSpin.zIndex = 7;
        }

        if (this.promotionSpinStopBtn) {
            this.promotionSpinStopBtn.zIndex = 8;
        }

        if (this.promotionIconSpin) {
            this.promotionIconSpin.zIndex = 10;
        }

        if (this.promotionSpinTimes) {
            this.promotionSpinTimes.zIndex = 11;
        }

        if (this.spinBtn) {
            this.spinBtnComponent = this.spinBtn.getComponent(cc.Button);
            this.spinBtnComponent.interactable = false;
        }
    },
    start: function start() {
        if (this.spinBtn && this.panelMultiSpin && this.stopAutoSpinBtn) {
            this.hideAutoSpinPanel();
            this.bindAutoSpinEvent();
            this.panelMultiSpin.zIndex = 4;
            this.stopAutoSpinBtn.zIndex = 3;
        }
        if (this.spinBtn) {
            this.spinBtn.zIndex = 1;
        }
        if (this.fastToResultBtn) {
            this.fastToResultBtn.zIndex = 2;
        }
    },
    bindAutoSpinEvent: function bindAutoSpinEvent() {
        var _this2 = this;

        if (this.spinBtn) {
            this.spinBtn.on(cc.Node.EventType.TOUCH_START, function () {
                _this2.selectionAutoSpin = false;
                _this2.showFunc = setTimeout(function () {
                    if (_this2.canAutoSpin()) {
                        _this2.selectionAutoSpin = true;
                        if (_this2.node.soundPlayer) {
                            _this2.node.soundPlayer.playSFXClick();
                        }
                        if (!_this2.removeSpinPanel) _this2.showAutoSpinPanel();else _this2.node.emit('MULTI_SPIN_4_CLICK');
                    }
                }, 700);
                _this2.node.emit('ON_TOUCH_START');
                _this2._isTouched = true;
            });
            this.spinBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchCancel.bind(this));
            this.spinBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this));
            this.spinBtn.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
            this.spinBtn.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave.bind(this));
        }
    },
    unbindAutoSpinEvent: function unbindAutoSpinEvent() {
        if (this.spinBtn) {
            this.spinBtn.off(cc.Node.EventType.TOUCH_START);
            this.spinBtn.off(cc.Node.EventType.TOUCH_END);
            this.spinBtn.off(cc.Node.EventType.TOUCH_CANCEL);
            this.spinBtn.off(cc.Node.EventType.TOUCH_MOVE);
            this.spinBtn.off(cc.Node.EventType.MOUSE_LEAVE);
        }
    },
    hideAutoSpinPanel: function hideAutoSpinPanel() {
        this.panelMultiSpin.active = false;
    },
    showAutoSpinPanel: function showAutoSpinPanel() {
        this.panelMultiSpin.active = true;
    },
    cancelAutoSpinPanel: function cancelAutoSpinPanel() {
        if (this.selectionAutoSpin) return;
        if (this.showFunc) {
            this.panelMultiSpin.active = false;
            clearTimeout(this.showFunc);
        }
    },
    onMouseLeave: function onMouseLeave() {
        if (this.selectionAutoSpin === false) {
            this.cancelAutoSpinPanel();
        }
    },
    onTouchMove: function onTouchMove(event) {
        var touch = event.touch;
        var hit = this.spinBtn._hitTest(touch.getLocation());
        if (hit) {
            if (!this._isTouched) {
                this.node.emit('ON_TOUCH_START');
                this._isTouched = true;
            }
        } else {
            this.cancelAutoSpinPanel();
            if (this.selectionAutoSpin) return;
            this.node.emit('ON_TOUCH_CANCEL');
            this._isTouched = false;
        }
    },
    onTouchCancel: function onTouchCancel() {
        this.cancelAutoSpinPanel();
        if (this.selectionAutoSpin) return;
        this.node.emit('ON_TOUCH_CANCEL');
        this._isTouched = false;
    },


    //Spin button
    showSpin: function showSpin() {
        this.spinBtn.active = true;
        this.spinBtn.opacity = this._isPromotionSpin == true ? 0 : 255;
    },
    hideSpin: function hideSpin() {
        this.cancelAutoSpinPanel();
        this.spinBtn.active = false;
    },
    enableSpin: function enableSpin() {
        this.spinBtnComponent.interactable = true;
    },
    disableSpin: function disableSpin() {
        //this is cheat to turn off panelMultiSpin after click other func
        if (this.panelMultiSpin) {
            this.panelMultiSpin.active = false;
        }
        this.spinBtnComponent.interactable = false;
    },
    spinClick: function spinClick() {
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        if (this.panelMultiSpin.active) return;
        this.node.emit('SPIN_CLICK');
    },


    //Fast to result
    showFastToResult: function showFastToResult() {
        this.fastToResultBtn.active = true;
    },
    hideFastToResult: function hideFastToResult() {
        this.fastToResultBtn.active = false;
    },
    enableFastToResult: function enableFastToResult() {
        this.fastToResultBtn.getComponent(cc.Button).interactable = true;
    },
    disableFastToResult: function disableFastToResult() {
        this.fastToResultBtn.getComponent(cc.Button).interactable = false;
    },
    fastToResultClick: function fastToResultClick() {
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('FAST_TO_RESULT_CLICK');
    },


    //Stop Auto Spin
    showStopAutoSpin: function showStopAutoSpin() {
        if (this.stopAutoSpinBtn) {
            this.stopAutoSpinBtn.active = true;
        }
    },
    hideStopAutoSpin: function hideStopAutoSpin(isResume) {
        if (this.stopAutoSpinBtn) {
            this.stopAutoSpinBtn.active = false;
        }
        if (this.fastToResultBtn && !this.fastToResultBtn.active && this.selectionAutoSpin && !isResume) {
            this.fastToResultBtn.active = true;
        }
    },
    stopAutoSpinClick: function stopAutoSpinClick() {
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('STOP_AUTO_SPIN_CLICK');
    },
    multiSpin1Click: function multiSpin1Click() {
        this.panelMultiSpin.active = false;
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('MULTI_SPIN_1_CLICK');
    },
    multiSpin2Click: function multiSpin2Click() {
        this.panelMultiSpin.active = false;
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('MULTI_SPIN_2_CLICK');
    },
    multiSpin3Click: function multiSpin3Click() {
        this.panelMultiSpin.active = false;
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('MULTI_SPIN_3_CLICK');
    },
    multiSpin4Click: function multiSpin4Click() {
        this.panelMultiSpin.active = false;
        if (this.node.soundPlayer && !this.removeSoundClick) {
            this.node.soundPlayer.playSFXClick();
        }
        this.node.emit('MULTI_SPIN_4_CLICK');
    },
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            if (this.spinBtnComponent && this.spinBtnComponent.interactable && !this.stopAutoSpinBtn.active) this.node.emit('SPACE_PRESSED');else if (this.fastToResultBtn && this.fastToResultBtn.active) {
                if (this.fastToResultBtn.getComponent(cc.Button).interactable) this.node.emit('FAST_TO_RESULT_CLICK');
            }
        }
    },
    pauseAutoSpin: function pauseAutoSpin() {
        var isPause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.isPauseAutoSpin = isPause;
    },
    canAutoSpin: function canAutoSpin() {
        if (this.node) {
            this.node.emit('CHECK_AUTO_SPIN_FLAG', 'pauseAutoSpin');
        }
        return !this.isPauseAutoSpin && this.spinBtnComponent.interactable;
    },
    showPromotionSpin: function showPromotionSpin() {
        this.promotionSpin.active = true;
        this.showPromotionIconSpin();
        this.enableIconSpin();
    },
    hidePromotionSpin: function hidePromotionSpin() {
        this.promotionSpin.active = false;
        this.hidePromotionIconSpin();
        this.disableIconSpin();
    },
    enableIconSpin: function enableIconSpin() {},
    disableIconSpin: function disableIconSpin() {},
    hidePromotionIconSpin: function hidePromotionIconSpin() {
        if (this.promotionIconSpin) {
            this.promotionIconSpin.active = false;
        }
    },
    showPromotionIconSpin: function showPromotionIconSpin() {
        if (this.promotionIconSpin) {
            this.promotionIconSpin.active = true;
        }
    },
    showPromotionSpinEffect: function showPromotionSpinEffect() {
        var _this3 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.promotionSpinEffect) {
            this.promotionSpinEffect.active = true;
            this.promotionEffect = cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
                _this3.promotionSpinEffect.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
                _this3.promotionSpinEffect.opacity = 255;
            }));
            this.promotionSpinEffect.runAction(this.promotionEffect);
        }
    },
    hidePromotionSpinEffect: function hidePromotionSpinEffect() {
        if (this.promotionSpinEffect) {
            if (this.promotionEffect) {
                this.promotionSpinEffect.stopAction(this.promotionEffect);
            }
            this.promotionSpinEffect.opacity = 0;
            this.promotionSpinEffect.active = false;
        }
    },
    showPromotionSpinTimes: function showPromotionSpinTimes() {
        if (this.promotionSpinTimes) {
            this.promotionSpinTimes.active = true;
        }
    },
    hidePromotionSpinTimes: function hidePromotionSpinTimes() {
        if (this.promotionSpinTimes) {
            this.promotionSpinTimes.active = false;
        }
    },
    showPromotionSpinStopBtn: function showPromotionSpinStopBtn() {
        if (this.promotionSpinStopBtn) {
            this.promotionSpinStopBtn.active = true;
        }
    },
    hidePromotionSpinStopBtn: function hidePromotionSpinStopBtn() {
        if (this.promotionSpinStopBtn) {
            this.promotionSpinStopBtn.active = false;
        }
    },
    disablePromotionSpinStopBtn: function disablePromotionSpinStopBtn() {
        if (this.promotionSpinStopBtn) {
            this.promotionSpinStopBtn.getComponent(cc.Button).interactable = false;
        }
    },
    enablePromotionSpinStopBtn: function enablePromotionSpinStopBtn() {
        if (this.promotionSpinStopBtn) {
            this.promotionSpinStopBtn.getComponent(cc.Button).interactable = true;
        }
    },
    showButtonsEndPromotion: function showButtonsEndPromotion() {
        if (!this.spinBtn || !this.fastToResultBtn || !this.stopAutoSpinBtn) return;
        this._isPromotionSpin = false;
        this.spinBtn.opacity = 255;
        this.fastToResultBtn.opacity = 255;
        this.stopAutoSpinBtn.opacity = 255;
        this.hidePromotionSpinEffect();
    },
    hideButtonStartPromotion: function hideButtonStartPromotion() {
        if (!this.spinBtn || !this.fastToResultBtn || !this.stopAutoSpinBtn) return;
        this._isPromotionSpin = true;
        this.spinBtn.opacity = 0;
        this.fastToResultBtn.opacity = 0;
        this.stopAutoSpinBtn.opacity = 0;
        this.showPromotionSpinEffect();
    },
    hideAllPromotionButton: function hideAllPromotionButton() {
        this.hidePromotionSpin();
        this.hidePromotionSpinStopBtn();
        this.hidePromotionSpinTimes();
        this.bindAutoSpinEvent();
        this.showButtonsEndPromotion();
        this.hidePromotionIconSpin();
    },
    showAllPromotionButton: function showAllPromotionButton() {
        this.showPromotionSpin();
        this.unbindAutoSpinEvent();
        this.showPromotionSpinTimes();
        this.hideButtonStartPromotion();
    },
    onDestroy: function onDestroy() {
        clearTimeout(this.showFunc);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        if (this.promotionSpin) {
            this.node.off("PROMOTION_SPIN_SHOW", this.showPromotionSpin, this);
            this.node.off("PROMOTION_SPIN_HIDE", this.hidePromotionSpin, this);
        }

        if (this.promotionSpinEffect) {
            this.node.off("SHOW_PROMOTION_SPIN_EFFECT", this.showPromotionSpinEffect, this);
            this.node.off("HIDE_PROMOTION_SPIN_EFFECT", this.hidePromotionSpinEffect, this);
        }

        if (this.promotionSpinTimes) {
            this.node.off("PROMOTION_SPIN_TIMES_SHOW", this.showPromotionSpinTimes, this);
            this.node.off("PROMOTION_SPIN_TIMES_HIDE", this.hidePromotionSpinTimes, this);
        }

        if (this.promotionSpinStopBtn) {
            this.node.off("PROMOTION_STOP_SPIN_SHOW", this.showPromotionSpinStopBtn, this);
            this.node.off("PROMOTION_STOP_SPIN_HIDE", this.hidePromotionSpinStopBtn, this);
        }

        this.node.off("HIDE_ALL_PROMOTION_BUTTONS", this.hideAllPromotionButton, this);
        this.node.off("SHOW_ALL_PROMOTION_BUTTONS", this.showAllPromotionButton, this);

        this.hidePromotionSpinEffect();
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
        //# sourceMappingURL=SlotButton.js.map
        