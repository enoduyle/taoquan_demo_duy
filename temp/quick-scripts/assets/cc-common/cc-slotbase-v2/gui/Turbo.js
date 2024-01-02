(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gui/Turbo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '775d70SMv1DqbD/LuvTspkz', 'Turbo', __filename);
// cc-common/cc-slotbase-v2/gui/Turbo.js

"use strict";

var lodash = require('lodash');

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Node,
        mainDirector: cc.Node
    },

    onLoad: function onLoad() {
        this.node.on("TOGGLE_TURBO", this.turboToggle, this);
        this.node.on("TURN_ON", this.turnOnTurbo, this);
        this.node.on("TURN_OFF", this.turnOffTurbo, this);
        if (this.mainDirector) {
            this.node.mainDirector = this.mainDirector;
        }
        this.loadTurboConfig();
    },
    loadTurboConfig: function loadTurboConfig() {
        this.firstLoad = true;
        if (!this.node.config || !this.node.mainDirector) return;
        var gameId = this.node.config.GAME_ID;
        var turboValue = cc.sys.localStorage.getItem('turboValueWithGame');
        if (lodash.isEmpty(turboValue)) {
            var newObj = {};
            newObj[gameId] = false;
            cc.sys.localStorage.setItem('turboValueWithGame', JSON.stringify(newObj));
        } else {
            turboValue = JSON.parse(turboValue);
            if (turboValue[gameId]) {
                this.node.mainDirector.director.setModeTurbo(true);
                this.turnOnTurbo();
            } else {
                this.node.mainDirector.director.setModeTurbo(false);
                this.turnOffTurbo();
            }
        }
        this.firstLoad = false;
    },
    setValueTurboConfig: function setValueTurboConfig(value) {
        if (!this.node.config) return;
        if (this.node.mainDirector && this.node.mainDirector.director && this.node.mainDirector.director.trialMode) return;

        var gameId = this.node.config.GAME_ID;
        var turboValue = cc.sys.localStorage.getItem('turboValueWithGame');
        if (lodash.isEmpty(turboValue)) {
            var newObj = {};
            newObj[gameId] = value;
            cc.sys.localStorage.setItem('turboValueWithGame', JSON.stringify(newObj));
        } else {
            turboValue = JSON.parse(turboValue);
            if (lodash.isEmpty(turboValue)) {
                var _newObj = {};
                _newObj[gameId] = value;
                cc.sys.localStorage.setItem('turboValueWithGame', JSON.stringify(_newObj));
            } else {
                turboValue[gameId] = value;
                cc.sys.localStorage.setItem('turboValueWithGame', JSON.stringify(turboValue));
            }
        }
    },
    turboToggle: function turboToggle() {
        if (this.node.soundPlayer && !this.firstLoad) {
            if (typeof this.node.soundPlayer.playSfxTurboClick === 'function') {
                this.node.soundPlayer.playSfxTurboClick();
            } else {
                this.node.soundPlayer.playSFXClick();
            }
        }
        var isCheck = this.button.getComponent(cc.Toggle).isChecked;
        this.setValueTurboConfig(isCheck);
        this.node.emit('TURBO_TOGGLE', isCheck);
    },
    turnOnTurbo: function turnOnTurbo() {
        this.button.getComponent(cc.Toggle).isChecked = true;
        this.node.emit('TURBO_TOGGLE', true);
    },
    turnOffTurbo: function turnOffTurbo() {
        this.button.getComponent(cc.Toggle).isChecked = false;
        this.node.emit('TURBO_TOGGLE', false);
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
        //# sourceMappingURL=Turbo.js.map
        