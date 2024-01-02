(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/cutScene/ScatterTransition9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '07ca5mx1StAiI5AAAoHJ8a7', 'ScatterTransition9983', __filename);
// cc-taoquan-9983/scripts/cutScene/ScatterTransition9983.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        particleNode: cc.Node,
        table: cc.Node,
        destPos: cc.Node,
        plus1fx: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this.plus1fx.storePos = this.plus1fx.position;
    },
    enter: function enter() {
        var _content = this.content,
            matrix = _content.matrix,
            isNormal = _content.isNormal;

        this.plus1fx.opacity = 0;
        this.parList = [];
        if (!isNormal) {
            var scatCoorList = [];
            for (var i = 0; i < matrix.length; ++i) {
                var j = 0;
                for (; j < matrix[i].length; ++j) {
                    if (matrix[i][j] === 'A') {
                        scatCoorList.push(cc.v2(i, j));
                        break;
                    }
                }
                if (j >= matrix[i].length) break;
            }
            this.playAnim(scatCoorList);
        } else this.scrollAnim();
    },
    playAnim: function playAnim(arrCoor) {
        var _this = this;

        var _loop = function _loop(i) {
            var particle = cc.instantiate(_this.particleNode);
            particle.parent = _this.table;
            particle.active = true;
            particle.x = _this.getXPosition(arrCoor[i].x);
            var colCount = 0 < arrCoor[i].x && arrCoor[i].x < 4 ? 4 : 4;
            var height = _this.node.config.SYMBOL_HEIGHT / 1 * 0.87;
            particle.y = (colCount - arrCoor[i].y) * height - height / 2;
            _this.parList.push(particle);
            var delayTime = 0.25;
            cc.tween(particle).to(0.5, { x: _this.destPos.x, y: _this.destPos.y }).call(function () {
                _this.plus1fx.opacity = 255;
                _this.plus1fx.position = _this.plus1fx.storePos;
                _this.plus1fx.runAction(cc.spawn(cc.fadeOut(delayTime), cc.moveBy(delayTime, 0, 10)));
            }).delay(delayTime).call(function () {
                _this.exit();
            }).start();
        };

        for (var i = 0; i < arrCoor.length; ++i) {
            _loop(i);
        }
    },
    scrollAnim: function scrollAnim() {
        var _this2 = this;

        var overlay = this.node.getChildByName('overlay');
        cc.tween(overlay).to(0.75, { opacity: 150 }).call(function () {
            // let particle = this.node.getChildByName('phaohoa');
            // particle.active = true;
        }).start();

        cc.tween(this.node).call(function () {
            _this2.isScrolling = true;
            var rollLeft = _this2.node.getChildByName('Roll_Left');
            cc.tween(rollLeft).to(0.5, { opacity: 255 }).to(0.7, { x: -300, y: -30, angle: 15 }, { easing: 'backOut' }).start();
            var rollRight = _this2.node.getChildByName('Roll_Right');
            cc.tween(rollRight).to(0.5, { opacity: 255 }).to(0.7, { x: 300, y: -30, angle: -15 }, { easing: 'backOut' }).start();
            var scroll = _this2.node.getChildByName('scroll');
            cc.tween(scroll).to(0.5, { opacity: 255 }).start();
        }).delay(1.25).call(function () {
            var overlay = _this2.node.getChildByName('overlay');
            cc.tween(overlay).call(function () {
                // let particle = this.node.getChildByName('phaohoa');
                // particle.active = true;
            }).to(0.75, { opacity: 0 }).start();
        }).delay(0.25).call(function () {
            if (_this2.callback && typeof _this2.callback == "function") {
                _this2.node.emit("STOP");
                _this2.callback();
            }
        }).delay(1.5).call(function () {
            _this2.isScrolling = false;
            _this2.exitForNormal();
        }).start();
    },
    update: function update() {
        if (this.isScrolling) {
            var rollLeft = this.node.getChildByName('Roll_Left');
            var rollRight = this.node.getChildByName('Roll_Right');
            var scroll = this.node.getChildByName('scroll');
            scroll.width = rollRight.x - rollLeft.x - 50;
        }
    },
    exitForNormal: function exitForNormal() {
        for (var i = 0; i < this.parList.length; ++i) {
            this.parList[i].removeFromParent(true);
            this.parList[i].destroy();
        }
        var rollLeft = this.node.getChildByName('Roll_Left');
        rollLeft.x = -75;
        rollLeft.y = 15;
        rollLeft.angle = 0;
        rollLeft.opacity = 0;
        var rollRight = this.node.getChildByName('Roll_Right');
        rollRight.x = 75;
        rollRight.y = 15;
        rollRight.angle = 0;
        rollRight.opacity = 0;
        var scroll = this.node.getChildByName('scroll');
        scroll.opacity = 0;

        this.node.active = false;
    },
    exit: function exit() {
        var overlay = this.node.getChildByName('overlay');
        if (overlay) {
            overlay.stopAllActions();
        }
        this.node.stopAllActions();
        if (this.callback && typeof this.callback == "function") {
            this.node.emit("STOP");
            this.callback();
        }
        for (var i = 0; i < this.parList.length; ++i) {
            this.parList[i].removeFromParent(true);
            this.parList[i].destroy();
        }
        var rollLeft = this.node.getChildByName('Roll_Left');
        rollLeft.opacity = 0;
        var rollRight = this.node.getChildByName('Roll_Right');
        rollRight.opacity = 0;
        var scroll = this.node.getChildByName('scroll');
        scroll.opacity = 0;

        this.node.active = false;
    },
    getXPosition: function getXPosition(index) {
        var width = this.node.config.SYMBOL_WIDTH * 1;
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
        //# sourceMappingURL=ScatterTransition9983.js.map
        