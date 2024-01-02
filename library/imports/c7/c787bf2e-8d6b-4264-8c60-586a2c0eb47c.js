"use strict";
cc._RF.push(module, 'c787b8ujWtCZIxgWGosDrR8', 'globalMiniGameState');
// cc-common/cc-share-v1/common/globalMiniGameState.js

'use strict';

function globalMiniGameState() {
    var _this = this;

    this.gameState = {
        '5999': {
            isOpen: false,
            isMinimized: false,
            data: {
                // wallet: 0,
                // winAmount: 0,
                // betValue: 0,
                // spinTimes: 0,
                // isAutoSpin: false,
                // freeSpin: 0,
                // isTurbo: false
            }
        }
    };

    var updateDataForGame = function updateDataForGame(gameId, data) {
        Object.keys(data).map(function (key) {
            _this.gameState[gameId].data[key] = data[key];
        });
    };
    var updateOpenGame = function updateOpenGame(gameId, isOpen) {
        _this.gameState[gameId].isOpen = isOpen;
    };

    var updateMinimizeGame = function updateMinimizeGame(gameId, isMinimized) {
        _this.gameState[gameId].isMinimized = isMinimized;
    };

    var getListGameState = function getListGameState() {
        return _this.gameState;
    };

    return {
        updateDataForGame: updateDataForGame,
        updateMinimizeGame: updateMinimizeGame,
        updateOpenGame: updateOpenGame,
        getListGameState: getListGameState
    };
}

module.exports = new globalMiniGameState();

cc._RF.pop();