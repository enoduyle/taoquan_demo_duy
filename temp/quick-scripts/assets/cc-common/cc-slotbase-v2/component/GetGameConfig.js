(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GetGameConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dadf1/AbQlJZqMxIZrTaZ/4', 'GetGameConfig', __filename);
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
        //# sourceMappingURL=GetGameConfig.js.map
        