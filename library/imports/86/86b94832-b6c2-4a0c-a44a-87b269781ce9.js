"use strict";
cc._RF.push(module, '86b94gytsJKDKRKh7JpeBzp', 'CutsceneControl');
// cc-common/cc-slotbase-v2/component/CutsceneControl.js

"use strict";

var _require = require('utils'),
    convertAssetArrayToObject = _require.convertAssetArrayToObject;

cc.Class({
    extends: cc.Component,

    properties: {
        cutscenes: {
            type: cc.Node,
            default: []
        }
    },
    onLoad: function onLoad() {
        this.cutscenesList = convertAssetArrayToObject(this.cutscenes);
        this.node.on("PLAY_CUTSCENE", this.playCutScene, this);
        this.node.on("CLOSE_CUTSCENE", this.closeCutScene, this);
        this.node.on("SKIP_CUTSCENES", this.skipCutscenes, this);
        this.node.on("CLOSE_ALL_NOTICES", this.closeAllNotices, this);
    },
    playCutScene: function playCutScene(name, contents, callback) {
        if (this.cutscenesList[name]) {
            this.cutscenesList[name].emit("PLAY", contents, function () {
                if (callback && typeof callback == "function") {
                    callback();
                }
            });
        } else {
            if (callback && typeof callback == "function") {
                callback();
            }
        }
    },
    closeCutScene: function closeCutScene(name, callback) {
        if (this.cutscenesList[name]) {
            this.cutscenesList[name].emit("HIDE", function () {
                if (callback && typeof callback == "function") {
                    callback();
                }
            });
        } else {
            if (callback && typeof callback == "function") {
                callback();
            }
        }
    },
    skipCutscenes: function skipCutscenes() {
        for (var i = 0; i < this.cutscenes.length; i++) {
            this.cutscenes[i].emit("SKIP");
        }
    },
    isDisplayDialog: function isDisplayDialog() {
        var dialogNode = this.node.getChildByName("DialogMessage");
        var bigWinNode = this.node.getChildByName("BigWinEffect");
        return dialogNode && dialogNode.active || bigWinNode && bigWinNode.active;
    },
    isDisplayCutscene: function isDisplayCutscene() {
        var res = false;
        for (var i = 0; i < this.cutscenes.length; i++) {
            var cutscene = this.cutscenes[i];
            if (cutscene && cutscene.active && cutscene.opacity === 255 && cutscene.fullDisplay) {
                res = true;
                break;
            }
        }
        return res;
    },
    closeAllNotices: function closeAllNotices() {
        for (var i = 0; i < this.node.children.length; i++) {
            var cutscene = this.node.children[i];
            cutscene.emit("CLOSE_NOTICE");
        }
    },
    getDisplayCutscene: function getDisplayCutscene() {
        var result = '';
        for (var i = 0; i < this.cutscenes.length; i++) {
            var cutscene = this.cutscenes[i];
            if (cutscene && cutscene.active && cutscene.opacity === 255) {
                result = cutscene.name;
                break;
            }
        }
        return result;
    }
});

cc._RF.pop();