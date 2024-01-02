"use strict";
cc._RF.push(module, 'dad771e2olHVYZC5wlLNOYs', 'DebugWheel');
// cc-common/cc-slot-base-test/SpinWheel/Scripts/DebugWheel.js

"use strict";

var _require = require('dat.gui'),
    GUI = _require.GUI;

var NETWORK_STATE = {
    NORMAL: 0,
    SLOW: 1
};
cc.Class({
    extends: cc.Component,

    properties: {
        spinWheel: require("SpinWheel"),
        resultLabel: cc.Label
    },
    start: function start() {
        var _this = this;

        this._config = this.spinWheel.getConfig();
        this.wheelOptions = {
            "maxSpeed": this._config.maxSpeed,
            "endSpeed": this._config.endSpeed,
            "delayStop": this._config.delayStop,
            "speedUpTime": this._config.speedUpTime,
            "slowDownTime": this._config.slowDownTime,
            "bufferStop": this._config.bufferStop,
            // rotate a bit more before stop with endSpeed
            "totalItem": 12,
            "result": 0,
            "Export Config": function ExportConfig() {
                _this._exportConfig();
            }
        };
        this._createGui();
        this.networkState = NETWORK_STATE.NORMAL;
    },
    _createGui: function _createGui() {
        var _this2 = this;

        var gui = new GUI();
        gui.domElement.parentElement.style.zIndex = 1000;
        this.wheelGui = gui.addFolder("Wheel Config");

        var _loop = function _loop(key) {
            var control = _this2.wheelGui.add(_this2.wheelOptions, key);
            if (typeof _this2.wheelOptions[key] === "function") return "continue";
            control.onChange(function (value) {
                _this2.wheelOptions[key] = value;
                _this2._updateConfig(key, value);
            });
        };

        for (var key in this.wheelOptions) {
            var _ret = _loop(key);

            if (_ret === "continue") continue;
        }
        this._showResultLabel();
        this.wheelGui.open();
    },
    _updateConfig: function _updateConfig(key, value) {
        if (key === "result") {
            this.spinWheel.setResult(value);
            this._showResultLabel();
        } else {
            this._config[key] = value;
        }
        this.spinWheel.init(this._config);
    },
    _showResultLabel: function _showResultLabel() {
        var label = this.resultLabel;
        label.string = this.wheelOptions.result;
        var resultItem = label.node.parent;
        resultItem.active = true;
        resultItem.angle = 360 / this._config.totalItem * this.wheelOptions.result;
    },
    _exportConfig: function _exportConfig() {
        var dataStr = JSON.stringify(this._config);
        var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        var exportFileDefaultName = 'wheelConfig.json';
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    },
    testSpin: function testSpin() {
        var _this3 = this;

        this.spinWheel.node.emit("START_SPIN");
        this.tweenStart = cc.tween(this);
        var delayStop = this.wheelOptions.delayStop;

        switch (this.networkState) {
            case NETWORK_STATE.NORMAL:
                this.tweenStart.delay(0.2).call(function () {
                    _this3.spinWheel.setResult(_this3.wheelOptions.result);
                }).delay(this._config.speedUpTime + delayStop).call(function () {
                    _this3.spinWheel.node.emit("STOP_SPIN");
                });
                break;
            case NETWORK_STATE.SLOW:
                this.tweenStart.delay(this._config.speedUpTime + delayStop).call(function () {
                    _this3.spinWheel.setResult(_this3.wheelOptions.result);
                    _this3.spinWheel.node.emit("STOP_SPIN");
                });
                break;
        }
        this.tweenStart.start();
    }
});

cc._RF.pop();