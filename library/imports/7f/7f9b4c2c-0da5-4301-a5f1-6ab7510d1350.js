"use strict";
cc._RF.push(module, '7f9b4wsDaVDAaXxardRDRNQ', 'SlotButtonV2');
// cc-common/cc-slotbase-v2/slotGame/controller/SlotButtonV2.js

"use strict";

cc.Class({
    extends: require("SlotButtonBase"),

    properties: {
        //buttons
        stopAutoSpinBtn: cc.Node,
        spinBtn: cc.Node,
        fastToResultBtn: cc.Node,
        promotionSpin: cc.Node,
        promotionSpinStopBtn: cc.Node,
        promotionSpinTimes: cc.Node,
        // text
        textSpin: cc.Node,
        txtHoldToAuto: cc.SpriteFrame,
        txtPressToStop: cc.SpriteFrame,
        //effects
        iconSpin: cc.Node,
        spineBtnSpin: sp.Skeleton,
        spineHover: sp.Skeleton,
        spinePromotion: sp.Skeleton,
        promotionIconSpin: cc.Node,
        // animation Names
        animNormal: "",
        animHover: "",
        animPressed: "",
        animDisable: "",
        animFastToResult: "",
        // sound
        removeSoundClick: false
    },

    onLoad: function onLoad() {
        var _this = this;

        this.isDebug = true;
        this.node.on("PAUSE_AUTO_SPIN", this.pauseAutoSpin, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on("ENABLE_SPIN_KEY", function (enable) {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);
            if (enable) cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);
        });

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
            this.node.on("STOP_AUTO_SPIN_HIDE", this.hideStopAutoSpin, this);
        }

        if (this.promotionSpin) {
            this.node.on("PROMOTION_SPIN_SHOW", this.showPromotionSpin, this);
            this.node.on("PROMOTION_SPIN_HIDE", this.hidePromotionSpin, this);
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

        if (this.promotionSpinEffect) {
            this.node.on("SHOW_PROMOTION_SPIN_EFFECT", this.showPromotionSpinEffect, this);
            this.node.on("HIDE_PROMOTION_SPIN_EFFECT", this.hidePromotionSpinEffect, this);
        }

        this.node.on("HIDE_ALL_PROMOTION_BUTTONS", this.hideAllPromotionButton, this);
        this.node.on("SHOW_ALL_PROMOTION_BUTTONS", this.showAllPromotionButton, this);

        if (this.textAutoSpins) {
            this.node.on("SHOW_TEXT_AUTOSPIN", this.showTextAutoSpin, this);
            this.node.on("HIDE_TEXT_AUTOSPIN", this.hideTextAutoSpin, this);
        }
        if (this.spinBtn) {
            this.spinBtnComponent = this.spinBtn.getComponent(cc.Button);
            this.spinBtnComponent.interactable = false;
        }
        this.bindAutoSpinEvent();
    },
    start: function start() {
        this._isPromotionSpin = false;
        this.selectionAutoSpin = false;
    },
    bindAutoSpinEvent: function bindAutoSpinEvent() {
        if (this.spinBtn) {
            this.spinBtn.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
            this.spinBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchCancel.bind(this));
            this.spinBtn.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
            this.spinBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this));
            this.spinBtn.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave.bind(this));
            this.spinBtn.on(cc.Node.EventType.MOUSE_ENTER, this.onHover.bind(this));
        }
        if (this.promotionSpin) {
            this.promotionSpin.on(cc.Node.EventType.MOUSE_ENTER, this.onHover.bind(this));
            this.promotionSpin.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave.bind(this));
        }
        this._isOnHover = false;
    },
    unbindAutoSpinEvent: function unbindAutoSpinEvent() {
        if (this.spinBtn) {
            this.spinBtn.off(cc.Node.EventType.TOUCH_START);
            this.spinBtn.off(cc.Node.EventType.TOUCH_END);
            this.spinBtn.off(cc.Node.EventType.TOUCH_CANCEL);
            this.spinBtn.off(cc.Node.EventType.TOUCH_MOVE);
            this.spinBtn.off(cc.Node.EventType.MOUSE_LEAVE);
            this.spinBtn.off(cc.Node.EventType.MOUSE_ENTER);
        }
    },


    /**
     * @InputEvent
     * */
    onKeyUp: function onKeyUp(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            if (this.spinBtnComponent && this.spinBtnComponent.interactable && !this.stopAutoSpinBtn.active) {
                this.node.emit('SPACE_PRESSED');
                this.onMouseLeave();
            } else if (this.fastToResultBtn && this.fastToResultBtn.active) {
                if (this.fastToResultBtn.getComponent(cc.Button).interactable) this.node.emit('FAST_TO_RESULT_CLICK');
            }
        }
    },
    onHover: function onHover() {
        if (this.spineHover && this.spinBtnComponent.interactable && !this.stopAutoSpinBtn.active) {
            this.spineHover.node.active = true;
            this.spineHover.setAnimation(0, this.animHover, true);
        }
    },


    /**
     * @Spin
     * */
    showSpin: function showSpin() {
        this.spinBtn.active = true;
        this.spinBtn.opacity = this._isPromotionSpin == true ? 0 : 255;
        if (this.textSpin && this.txtHoldToAuto) {
            this.textSpin.getComponent(cc.Sprite).spriteFrame = this.txtHoldToAuto;
        }
        if (this.spinEffect) {
            this.spinEffect.isRotating = false;
            this.spinEffect.angle = 0;
        }
    },
    hideSpin: function hideSpin() {
        this.cancelAutoSpinPanel();
        this.spinBtn.active = false;
    },
    enableSpin: function enableSpin() {
        this.spinBtnComponent.interactable = true;
        this.spinBtn.emit("BUTTON_SPIN_SHOW");
        if (this.spineBtnSpin) {
            this.spineBtnSpin.setAnimation(0, this.animNormal, true);
        }
    },
    disableSpin: function disableSpin() {
        this.spinBtnComponent.interactable = false;
        this.spinBtn.emit('BUTTON_SPIN_HIDE');
    },
    spinClick: function spinClick() {
        this.node.emit('SPIN_CLICK');
        cc.log("SlotButton: spinClick");
    },


    /**
     * @autoSpin
     */
    onTouchStart: function onTouchStart() {
        var _this2 = this;

        this.selectionAutoSpin = false;
        this.showFunc = function () {
            if (_this2.canAutoSpin()) {
                _this2._runAutoSpin();
            }
            _this2.showFunc = null;
        };
        this.scheduleOnce(this.showFunc, 0.7);
        this.node.emit('ON_TOUCH_START');
        this._isTouched = true;
        this.isDebug && cc.log("onTouchStart");
    },
    _runAutoSpin: function _runAutoSpin() {
        this.selectionAutoSpin = true;
        this.node.emit('MULTI_SPIN_4_CLICK');
        if (this.spineBtnSpin) {
            this.spineBtnSpin.setAnimation(0, this.animPressed, false);
        }
        if (this.spineHover) {
            this.spineHover.node.active = false;
        }
        this.isDebug && cc.log("_runAutoSpin");
    },
    onTouchCancel: function onTouchCancel() {
        this.cancelAutoSpinPanel();
        if (this.selectionAutoSpin) return;
        this.node.emit('ON_TOUCH_CANCEL');
        this._isTouched = false;
    },
    cancelAutoSpinPanel: function cancelAutoSpinPanel() {
        if (this.selectionAutoSpin) return;
        if (this.showFunc) {
            this.unschedule(this.showFunc);
        }
        if (this.spineHover) {
            this.spineHover.node.active = false;
        }
    },
    onMouseLeave: function onMouseLeave() {
        if (this.selectionAutoSpin === false) {
            this.cancelAutoSpinPanel();
        }
        if (this.spineHover && this.spineHover.node.active === true) {
            this.spineHover.node.active = false;
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
    stopAutoSpinClick: function stopAutoSpinClick() {
        this.node.emit('STOP_AUTO_SPIN_CLICK');
    },
    showStopAutoSpin: function showStopAutoSpin() {
        if (this.stopAutoSpinBtn) {
            this.stopAutoSpinBtn.active = true;
        }
        if (this.textSpin && this.txtPressToStop) {
            this.textSpin.getComponent(cc.Sprite).spriteFrame = this.txtPressToStop;
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
    showTextAutoSpin: function showTextAutoSpin() {
        if (this.textSpin) {
            this.textSpin.active = true;
        }
    },
    hideTextAutoSpin: function hideTextAutoSpin() {
        if (this.textSpin) {
            this.textSpin.active = false;
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


    /**
     * @FastToResult
     */
    fastToResultClick: function fastToResultClick() {
        this.node.emit('FAST_TO_RESULT_CLICK');
        this.isDebug && cc.log("SlotButton: fastToResultClick");
    },
    showFastToResult: function showFastToResult() {
        this.fastToResultBtn.active = true;
    },
    hideFastToResult: function hideFastToResult() {
        this.fastToResultBtn.active = false;
    },
    enableFastToResult: function enableFastToResult() {
        this.fastToResultBtn.getComponent(cc.Button).interactable = true;
        if (this.textSpin && this.txtPressToStop) {
            this.textSpin.getComponent(cc.Sprite).spriteFrame = this.txtPressToStop;
        }
        if (this.spineBtnSpin) {
            this.spineBtnSpin.setAnimation(0, this.animFastToResult, false);
        }
    },
    disableFastToResult: function disableFastToResult() {
        this.fastToResultBtn.getComponent(cc.Button).interactable = false;
        if (this.spineBtnSpin) {
            this.spineBtnSpin.setAnimation(0, this.animDisable, false);
        }
    },
    hideButtonStartPromotion: function hideButtonStartPromotion() {
        if (!this.spinBtn || !this.fastToResultBtn || !this.stopAutoSpinBtn) return;
        this._isPromotionSpin = true;
        this.spinBtn.opacity = 0;
        this.fastToResultBtn.opacity = 0;
        this.stopAutoSpinBtn.opacity = 0;
        this.showPromotionSpinEffect();
    },


    /**
     * @promotions
     */
    showAllPromotionButton: function showAllPromotionButton() {
        this.showPromotionSpin();
        // this.unbindAutoSpinEvent();
        this.hideSpinButtons();
        this.showPromotionSpinTimes();
        this.hideButtonStartPromotion();
        this.hideTextAutoSpin();
    },
    hideAllPromotionButton: function hideAllPromotionButton() {
        this.hidePromotionSpin();
        this.hidePromotionSpinStopBtn();
        this.hidePromotionSpinTimes();
        this.showSpinButtons();
        // this.bindAutoSpinEvent();
        this.showButtonsEndPromotion();
        this.hidePromotionIconSpin();
        this.showTextAutoSpin();
    },
    showSpinButtons: function showSpinButtons() {
        this.spinBtn.active = true;
        this.stopAutoSpinBtn.active = false;
        this.fastToResultBtn.active = false;
    },
    hideSpinButtons: function hideSpinButtons() {
        this.spinBtn.active = false;
        this.stopAutoSpinBtn.active = false;
        this.fastToResultBtn.active = false;
    },
    showPromotionSpin: function showPromotionSpin() {
        if (this.promotionSpin) this.promotionSpin.active = true;
        this.showPromotionIconSpin();
        this.enableIconSpin();
    },
    hidePromotionSpin: function hidePromotionSpin() {
        if (this.promotionSpin) this.promotionSpin.active = false;
        this.hidePromotionIconSpin();
        this.disableIconSpin();
    },
    showPromotionIconSpin: function showPromotionIconSpin() {
        if (this.promotionIconSpin) {
            this.promotionIconSpin.active = true;
        }
    },
    hidePromotionIconSpin: function hidePromotionIconSpin() {
        if (this.promotionIconSpin) {
            this.promotionIconSpin.active = false;
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
    showButtonsEndPromotion: function showButtonsEndPromotion() {
        if (!this.spinBtn || !this.fastToResultBtn || !this.stopAutoSpinBtn) return;
        this._isPromotionSpin = false;
        this.spinBtn.opacity = 255;
        this.fastToResultBtn.opacity = 255;
        this.stopAutoSpinBtn.opacity = 255;
        this.hidePromotionSpinEffect();
    },
    onDestroy: function onDestroy() {
        if (this.showFunc) {
            this.unschedule(this.showFunc);
            this.showFunc = null;
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.hidePromotionSpinEffect();
    },
    enableIconSpin: function enableIconSpin() {},
    disableIconSpin: function disableIconSpin() {}
});

cc._RF.pop();