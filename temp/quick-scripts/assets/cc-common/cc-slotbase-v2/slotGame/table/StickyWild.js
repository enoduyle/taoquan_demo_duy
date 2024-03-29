(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/table/StickyWild.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cb1adfIVLJBq76XMrN31oWP', 'StickyWild', __filename);
// cc-common/cc-slotbase-v2/slotGame/table/StickyWild.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        wildSymbolPrefab: cc.Prefab,
        defaultNumber: 5,
        stickySymbol: 'K'
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on("INIT", this.init, this);
        this.node.on("SHOW_STICKY_WILD", this.showStickyWild, this);
        this.node.on("RESET", this.reset, this);
        this.node.on("UPDATE_MATRIX", this.updateMatrix, this);
        this.node.on("CHANGE_MATRIX", this.changeMatrix, this);
    },
    initWildPool: function initWildPool() {
        this.symbolPool = new cc.NodePool("StickyWildPool");
        for (var i = 0; i < this.defaultNumber; i++) {
            this.symbolPool.put(cc.instantiate(this.wildSymbolPrefab));
        }
    },
    init: function init(table) {
        var _this = this;

        this.table = table;
        this.COLUMN = this.table.tableFormat.length;
        this.ROW = this.table.tableFormat[0];
        this.SYMBOL_HEIGHT = this.table.node.config.SYMBOL_HEIGHT;
        this.SYMBOL_WIDTH = this.table.node.config.SYMBOL_WIDTH;
        this.wildMatrix = Array.from(Array(this.COLUMN), function () {
            return new Array(_this.ROW);
        });
        if (!this.wildSymbolPrefab) {
            this.wildSymbolPrefab = this.table.symbolPrefab;
        }
        this.initWildPool();
    },
    showStickyWild: function showStickyWild(reelIdx) {
        var skipAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        for (var i = 0; i < this.ROW; ++i) {
            if (this.matrix[reelIdx][i] == this.stickySymbol && !this.wildMatrix[reelIdx][i]) {
                var wild = this.getStickyWild();
                this.wildMatrix[reelIdx][i] = wild;
                wild.parent = this.node;
                wild.emit('RESET');
                wild.x = this.table.getXPosition(reelIdx);
                wild.y = this.getYPosition(i);
                this.playWildAnimation(wild, skipAnimation);
            }
        }
    },
    playWildAnimation: function playWildAnimation(wildNode) {
        var isSkip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // extend when do anything with wild
        wildNode.emit("PLAY_ANIMATION", isSkip);
    },
    getStickyWild: function getStickyWild() {
        if (!this.symbolPool.size()) {
            this.symbolPool.put(cc.instantiate(this.wildSymbolPrefab));
        }
        return this.symbolPool.get();
    },
    getYPosition: function getYPosition(index) {
        var startY = -(this.ROW / 2 + 0.5) * this.SYMBOL_HEIGHT;
        return startY + this.SYMBOL_HEIGHT * (this.ROW - index);
    },
    reset: function reset() {
        for (var i = 0; i < this.COLUMN; ++i) {
            for (var j = 0; j < this.ROW; ++j) {
                if (this.wildMatrix[i][j]) {
                    this.wildMatrix[i][j].emit('RESET');
                    this.symbolPool.put(this.wildMatrix[i][j]);
                }
                this.wildMatrix[i][j] = null;
            }
        }
        this.node.removeAllChildren(true);
    },
    updateMatrix: function updateMatrix(matrix) {
        this.matrix = matrix;
    },
    changeMatrix: function changeMatrix(matrix) {
        this.reset();
        this.updateMatrix(matrix);
        for (var i = 0; i < this.COLUMN; ++i) {
            this.showStickyWild(i, true);
        }
    },
    onDestroy: function onDestroy() {
        this.symbolPool.clear();
    }

    // update (dt) {},

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
        //# sourceMappingURL=StickyWild.js.map
        