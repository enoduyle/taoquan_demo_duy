(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/Tutorial/TutorialDialog.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db1b3hUD1VNs6lggmlDr3fi', 'TutorialDialog', __filename);
// cc-common/cc-slotbase-v2/Tutorial/TutorialDialog.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        content: cc.Label,
        arrow: cc.Node,
        arrow1: cc.Node
    },

    onLoad: function onLoad() {
        if (this.arrow1) {
            this.arrow1.active = false;
        }
        if (this.arrow) {
            this.arrow.active = false;
        }
    },
    show: function show(title, content, arrow, arrow1) {
        this.title.string = title;
        this.content.string = content;
        this.node.active = true;
        if (!arrow) this.arrow.active = false;else {
            this.arrow.active = true;
            this.arrow.scaleX = arrow.scaleX || 1;
            this.arrow.scaleY = arrow.scaleY || 1;
            this.arrow.angle = arrow.angle || 0;
            this.arrow.position = { x: arrow.x, y: arrow.y };
        }
        if (this.arrow1) {
            this.arrow1.active = false;
            if (arrow1) {
                this.arrow1.active = true;
                this.arrow1.scaleX = arrow1.scaleX || 1;
                this.arrow1.scaleY = arrow1.scaleY || 1;
                this.arrow1.angle = arrow1.angle || 0;
                this.arrow1.position = { x: arrow1.x, y: arrow1.y };
            }
        }
    },
    hide: function hide() {
        this.node.active = false;
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
        //# sourceMappingURL=TutorialDialog.js.map
        