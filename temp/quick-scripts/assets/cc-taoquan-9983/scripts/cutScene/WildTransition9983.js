(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/cutScene/WildTransition9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e97c+gNbJOiLhNnEk/Incz', 'WildTransition9983', __filename);
// cc-taoquan-9983/scripts/cutScene/WildTransition9983.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        particleNode: cc.Node,
        tableNormal: cc.Node,
        destPosNormal: cc.Node,
        tableFree: cc.Node,
        destPosFree: cc.Node
    },
    enter: function enter() {
        var _content = this.content,
            matrix = _content.matrix,
            isNormal = _content.isNormal;

        this.isNormal = isNormal;
        this.tableFormat = this.node.config.TABLE_FORMAT;
        this.table = this.tableNormal;
        this.tableFree.active = false;
        this.tableNormal.active = true;
        this.destPos = this.destPosNormal;
        if (!isNormal) {
            this.tableFormat = this.node.config.TABLE_FORMAT_FREE;
            this.table = this.tableFree;
            this.destPos = this.destPosFree;
            this.tableFree.active = true;
            this.tableNormal.active = false;
        }
        this.parList = [];
        var scatCoorList = [];
        for (var i = 0; i < matrix.length; ++i) {
            for (var j = 0; j < matrix[i].length; ++j) {
                if (matrix[i][j] === 'K') {
                    scatCoorList.push(cc.v2(i, j));
                }
            }
        }
        this.playAnim(scatCoorList);
        this.isShowing = true;
    },
    playAnim: function playAnim(arrCoor) {
        var _this = this;

        if (this.node.soundPlayer) this.node.soundPlayer.playParticleMultiplier();
        for (var i = 0; i < arrCoor.length; ++i) {
            var particle = cc.instantiate(this.particleNode);
            particle.parent = this.table;
            particle.active = true;
            particle.x = this.getXPosition(arrCoor[i].x);
            particle.y = (this.tableFormat[arrCoor[i].x] - arrCoor[i].y) * this.node.config.SYMBOL_HEIGHT - this.node.config.SYMBOL_HEIGHT / 2;
            this.parList.push(particle);
            cc.tween(particle).to(0.5, { x: this.destPos.x, y: this.destPos.y }).call(function () {
                _this.exit();
            }).start();
        }
    },
    skip: function skip() {
        if (!this.isShowing) return;
        this.exit(true);
    },
    exit: function exit() {
        var isForce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.callback && this.callback(isForce);
        this.isShowing = false;
        for (var i = 0; i < this.parList.length; ++i) {
            this.parList[i].stopAllActions();
            this.parList[i].removeFromParent(true);
            this.parList[i].destroy();
        }
        this.node.active = false;
    },
    getXPosition: function getXPosition(index) {
        var width = this.node.config.SYMBOL_WIDTH;
        return (width + this.node.config.SYMBOL_MARGIN_RIGHT) * index + width / 2;
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
        //# sourceMappingURL=WildTransition9983.js.map
        