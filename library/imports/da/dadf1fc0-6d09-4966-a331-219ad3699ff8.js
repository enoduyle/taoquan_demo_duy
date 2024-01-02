"use strict";
cc._RF.push(module, 'dadf1/AbQlJZqMxIZrTaZ/4', 'GetGameConfig');
// cc-common/cc-slotbase-v2/component/GetGameConfig.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        soundPlayer: true,
        gameConfig: true,
        dataStore: true,
        director: false,
        directorIndex: 1,
        needPool: false
    },

    onLoad: function onLoad() {
        var director = void 0;
        if (this.node.ROOT) {
            director = this.node.ROOT;
        } else {
            director = cc.find('Canvas').children[this.directorIndex];
        }

        if (this.soundPlayer) {
            this.node.soundPlayer = director.soundPlayer;
        }
        if (this.gameConfig) {
            this.node.config = director.config;
        }
        if (this.dataStore) {
            this.node.gSlotDataStore = director.gSlotDataStore;
        }
        if (this.needPool) {
            this.node.poolFactory = director.poolFactory;
        }
        if (director) this.node.mainDirector = director;
    }
});

cc._RF.pop();