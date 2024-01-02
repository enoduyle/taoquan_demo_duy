"use strict";
cc._RF.push(module, 'a546fVU+wJIcbdUcSztVZqw', 'SpinWheel');
// cc-common/cc-slot-base-test/SpinWheel/Scripts/SpinWheel.js

"use strict";

cc.Class({

    extends: cc.Component,

    properties: {
        wheel: cc.Node,
        configFile: {
            type: cc.Asset,
            default: null
        }
    },
    onLoad: function onLoad() {
        this._config = this.configFile.json;
        this.node.on("INIT", this.init, this);
        this.node.on("START_SPIN", this.startSpin, this);
        this.node.on("SET_RESULT", this.setResult, this);
        this.node.on("STOP_SPIN", this.stopSpin, this);
        this.init(this._config);
        window.wheel = this;
    },
    lateUpdate: function lateUpdate(dt) {
        if (!this.isSpinning) return;
        this.wheel.angle += dt * this.rotateSpeed;
        this.wheel.angle %= 360;
    },
    init: function init(config) {
        Object.assign(this._config, config);
        this.tweenSpeed = null;
        this.tweenStop = null;
        this.result = null;
        this.stepAngle = 360 / this._config.totalItem;
        this.rotateSpeed = 0;
    },
    startSpin: function startSpin() {
        var _this = this;

        if (this.isSpinning) return;
        this.isSpinning = true;
        var _config = this._config,
            speedUpTime = _config.speedUpTime,
            maxSpeed = _config.maxSpeed;

        this.tweenSpeed && this.tweenSpeed.stop();
        this.tweenSpeed = cc.tween(this).to(speedUpTime, { rotateSpeed: maxSpeed }).call(function () {
            _this.tweenSpeed = null;
        }).start();
    },
    setResult: function setResult(result) {
        this.result = result;
        this.endAngle = 360 - this._getItemAngle(this.result);
    },
    _getItemAngle: function _getItemAngle(index) {
        return this.stepAngle * index;
    },
    stopSpin: function stopSpin() {
        var _this2 = this;

        var _config2 = this._config,
            slowDownTime = _config2.slowDownTime,
            endSpeed = _config2.endSpeed,
            maxSpeed = _config2.maxSpeed,
            bufferStop = _config2.bufferStop;

        var bufferAngle = bufferStop * this.stepAngle;
        var slowDownAngle = (maxSpeed + endSpeed) * slowDownTime / 2;
        var delayAngle = 360 + (this.endAngle - bufferAngle - slowDownAngle) % 360;
        var delayTime = (360 + delayAngle - this.wheel.angle) % 360 / maxSpeed;

        this.tweenStop = cc.tween(this).delay(delayTime).to(slowDownTime, { rotateSpeed: endSpeed }).call(function () {
            _this2.isSpinning = false;
            _this2._tweenToResult();
        }).start();
    },
    _tweenToResult: function _tweenToResult() {
        var _this3 = this;

        var endSpeed = this._config.endSpeed;

        var offset = (360 + this.endAngle - this.wheel.angle) % 360;
        this.tweenStop = cc.tween(this.wheel).to(offset / endSpeed, { angle: this.endAngle }).call(function () {
            _this3.tweenStop = null;
        }).start();
    },
    resetSpinWheel: function resetSpinWheel() {
        this.tweenSpeed && this.tweenSpeed.stop();
        this.tweenSpeed = null;

        this.tweenStop && this.tweenStop.stop();
        this.tweenStop = null;

        this.isSpinning = false;
        this.rotateSpeed = 0;
    },
    getConfig: function getConfig() {
        return Object.assign(Object.create(null), this._config);
    }
});

cc._RF.pop();