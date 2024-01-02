(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/viewComponent/dragAndDrop.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4c4c0nCHXtGDJU951k9FmYS', 'dragAndDrop', __filename);
// cc-common/cc-share-v1/common/viewComponent/dragAndDrop.js

"use strict";

var TouchDragger = cc.Class({
    extends: cc.Component,

    setEventClick: function setEventClick(callback) {
        this.callback = callback;
    },
    setEventMoveOpen: function setEventMoveOpen(callbackMoveOpen) {
        this.callbackMoveOpen = callbackMoveOpen;
    },
    setEventMoveClose: function setEventMoveClose(callbackMoveClose) {
        this.callbackMoveClose = callbackMoveClose;
    },
    noDraggableToNode: function noDraggableToNode(_noDraggableToNode) {
        this.noDraggableToNode = _noDraggableToNode;
    },
    onLoad: function onLoad() {
        this.initDNR();
    },
    initDNR: function initDNR() {
        var _this = this;

        var node = this.node;
        node.beforMove = { x: node.x, y: node.y };

        node.on(cc.Node.EventType.TOUCH_START, function () {
            node.beforMove = { x: node.x, y: node.y };
        });
        node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            node.x += delta.x;
            node.y += delta.y;
            if (node.getComponent(TouchDragger).propagate) event.stopPropagation();
            node.propagate = true;
            if (_this.callbackMoveOpen) _this.callbackMoveOpen();
            if (_this.callbackMoveClose) _this.callbackMoveClose();
        });

        node.on(cc.Node.EventType.TOUCH_END, function () {
            if (Math.sqrt(Math.pow(node.x - node.beforMove.x, 2) + Math.pow(node.y - node.beforMove.y, 2)) < 3) {
                node.propagate = false;
            }
            if (node.propagate) {
                if (_this.noDraggableToNode) {
                    if (checkTwoRectanglesOverlap(_this.noDraggableToNode, node)) {
                        var moveTo = cc.moveTo(0.3, cc.v2(node.beforMove.x, node.beforMove.y));
                        node.runAction(moveTo);
                    }
                }
                node.propagate = !node.propagate;
            } else if (_this.callback) _this.callback();
        });

        function checkTwoRectanglesOverlap(rectangle1, rectangle2) {
            var inside = false;
            var top_left = { x: rectangle2.x, y: rectangle2.y + rectangle2.height };
            var bottom_left = { x: rectangle2.x, y: rectangle2.y };
            var top_right = { x: rectangle2.x + rectangle2.width, y: rectangle2.y + rectangle2.height };
            var bottom_right = { x: rectangle2.x + rectangle2.width, y: rectangle2.y };
            if (checkPointInsideRectangle(top_left, rectangle1) || checkPointInsideRectangle(bottom_left, rectangle1) || checkPointInsideRectangle(top_right, rectangle1) || checkPointInsideRectangle(bottom_right, rectangle1)) {
                inside = true;
            }
            return inside;
        }

        function checkPointInsideRectangle(point, rectangle) {
            var inside = false;
            if (point.x - rectangle.x >= 0 && point.y - rectangle.y >= 0 && point.x <= rectangle.x + rectangle.width && point.y <= rectangle.y + rectangle.height) {
                inside = true;
            }
            return inside;
        }
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
        //# sourceMappingURL=dragAndDrop.js.map
        