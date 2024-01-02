"use strict";
cc._RF.push(module, '0f6a3eEFbNNTpGXGD4WkDFp', 'BaseDirectorV2');
// cc-common/cc-share-v1/common/baseComponent/BaseDirectorV2.js

'use strict';

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.director = this;
        this.lastCommand = null;
        this.onExtendedLoad();
    },
    start: function start() {
        this.writer = this.node.writer;
        this.forceToExitMode = false;
        this.exitScript = [];
    },
    onExtendedLoad: function onExtendedLoad() {},
    runAction: function runAction(actionName, data) {
        if (!this.writer || typeof this.writer['makeScript' + actionName] !== 'function') return;
        var script = this.writer['makeScript' + actionName](data);
        this.executeNextScript(script);
    },
    executeNextScript: function executeNextScript(script) {
        if (!this.writer || !script || script.length == 0 || this.isSkipAllScrips) return;
        this.script = script;
        if (this.forceToExitMode && this.exitScript && this.exitScript.length > 0) {
            this.script = this.exitScript;
        }
        // if(this.script.length === 0) return;
        var nextScript = this.script.shift();
        var command = nextScript.command,
            data = nextScript.data;


        command = this.getCommandName(command);
        this.lastCommand = command;
        if (this[command] && typeof this[command] === 'function') {
            cc.log(this.name + ' run command', command, data);
            this[command](this.script, data);
        } else {
            cc.error('There is no ' + this.name + ' command', command);
            this.executeNextScript(this.script);
        }
    },
    getCommandName: function getCommandName(command) {
        var gameSpeed = this.getGameSpeed();
        while (gameSpeed > 0) {
            var commandWithSpeed = command + '_' + gameSpeed;
            if (this[commandWithSpeed] && typeof this[commandWithSpeed] === 'function') {
                return commandWithSpeed;
            }
            gameSpeed--;
        }
        return command;
    },
    destroyData: function destroyData() {
        this.runAction = function () {};
        this.executeNextScript = function () {};
        this.script = [];
    },
    forceToExit: function forceToExit(script) {
        this.forceToExitMode = true;
        this.exitScript = script;
    },
    resetGameSpeed: function resetGameSpeed() {
        this.node.gSlotDataStore.gameSpeed = this.getDefaultGameSpeed();
    },
    setGameSpeed: function setGameSpeed(gameSpeed) {
        this.node.gSlotDataStore.gameSpeed = gameSpeed || this.getDefaultGameSpeed();
    },
    setGameSpeedMode: function setGameSpeedMode() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'NORMAL';

        var GAME_SPEED = this.getGameSpeedConfig();
        this.node.gSlotDataStore.gameSpeed = GAME_SPEED[mode] || GAME_SPEED.NORMAL;
    },
    getGameSpeed: function getGameSpeed() {
        return this.node.gSlotDataStore.gameSpeed || this.getDefaultGameSpeed();
    },
    getDefaultGameSpeed: function getDefaultGameSpeed() {
        var GAME_SPEED = this.getGameSpeedConfig();
        return this.node.gSlotDataStore.modeTurbo ? GAME_SPEED.TURBO : GAME_SPEED.NORMAL;
    },
    getGameSpeedConfig: function getGameSpeedConfig() {
        // remove after all games updated
        if (this.node.config && this.node.config.GAME_SPEED) {
            return this.node.config.GAME_SPEED;
        } else {
            return {
                NORMAL: 0,
                TURBO: 1,
                INSTANTLY: 2
            };
        }
    },
    getRemainScripts: function getRemainScripts() {
        var result = [];
        if (this.script) {
            result = this.script.map(function (it) {
                return it.command;
            });
        }
        return result;
    },
    getLastCommand: function getLastCommand() {
        return this.lastCommand;
    }
});

cc._RF.pop();