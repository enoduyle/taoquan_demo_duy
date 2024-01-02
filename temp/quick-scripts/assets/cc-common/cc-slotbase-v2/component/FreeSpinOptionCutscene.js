(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/FreeSpinOptionCutscene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'caa0dvIiTFI/Z+l6IQi7s6F', 'FreeSpinOptionCutscene', __filename);
// cc-common/cc-slotbase-v2/component/FreeSpinOptionCutscene.js

"use strict";

var InfoScreen = require('InfoScreen');
cc.Class({
    extends: InfoScreen,

    properties: {
        overlayNode: cc.Node,
        contentNode: cc.Node,
        mainDirector: cc.Node,
        options: {
            type: cc.Node,
            default: []
        },
        displayDuration: 1,
        introFreeGame: cc.Node,
        waitingTimeToAutoSelect: 20
    },

    onLoadExtended: function onLoadExtended() {
        this._buttons = [];
        for (var i = 0; i < this.options.length; i++) {
            var button = this.options[i].getComponent(cc.Button);
            if (button) {
                this._buttons.push(button);
            }
        }
    },
    enter: function enter() {
        var _this = this;

        cc.log("Enter Free Spin Option Cutscene");
        this.enableAllButtons(true);

        var _loop = function _loop(i) {
            _this.options[i].off("click");
            _this.options[i].on("click", function () {
                _this.selectOption(i + 1);
            });
        };

        for (var i = 0; i < this.options.length; i++) {
            _loop(i);
        }
        if (this.node.soundPlayer) {
            this.node.soundPlayer.playMainBGM("freeSpinOption");
        }
        this._isOptionSelected = false;

        if (this._autoSelectOption != null && this._autoSelectOption.target != null) {
            this.node.stopAction(this._autoSelectOption);
        }

        if (this.node.gSlotDataStore.isTrialMode == true) {
            this._autoSelectOption = cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                _this.selectOption(1);
            }));
        } else {
            this._autoSelectOption = cc.sequence(cc.delayTime(this.waitingTimeToAutoSelect), cc.callFunc(function () {
                _this.selectOption(2);
            }));
        }

        this.node.runAction(this._autoSelectOption);

        this.contentNode.opacity = 0;
        this.contentNode.scale = 0.01;
        this.overlayNode.opacity = 0;
    },
    show: function show() {
        this._super();
        this.contentNode.opacity = 255;
        this.contentNode.scale = 1;
        this.overlayNode.opacity = 180;
    },
    enableAllButtons: function enableAllButtons(isEnable) {
        var exceptionIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        for (var i = 0; i < this._buttons.length; i++) {
            if (i != exceptionIndex) {
                this._buttons[i].interactable = isEnable;
            }
            this._buttons[i].node.scale = 1;
        }
    },
    selectOption: function selectOption(optionIndex) {
        var _this2 = this;

        if (this._isOptionSelected == false) {
            if (this.node.soundPlayer) {
                this.node.soundPlayer.stopAllAudio();
                this.node.soundPlayer.playSoundFreeSpinOptionClick();
            }
            this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                cc.log("Send Free Spin Option Index: " + optionIndex);
                _this2.mainDirector.getComponent('Director').gameStateManager.triggerFreeSpinOption(optionIndex);
                for (var i = 0; i < _this2.options.length; i++) {
                    _this2.options[i].off("click");
                }
            })));
            this._isOptionSelected = true;
            this.enableAllButtons(false, optionIndex - 1);
            if (this._autoSelectOption != null && this._autoSelectOption.target != null) {
                this.node.stopAction(this._autoSelectOption);
            }
        }
    },
    resetNode: function resetNode() {
        if (this.instantly == true) {
            this.contentNode.opacity = 0;
            this.overlayNode.opacity = 0;
        } else {
            this.contentNode.runAction(cc.fadeOut(0.5));
            this.overlayNode.runAction(cc.fadeOut(0.5));
        }

        this._isOptionSelected = false;
    },
    onDestroy: function onDestroy() {
        this._buttons = [];
        if (this._autoSelectOption != null && this._autoSelectOption.target != null) {
            this.node.stopAction(this._autoSelectOption);
        }
        this._autoSelectOption = null;
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
        //# sourceMappingURL=FreeSpinOptionCutscene.js.map
        