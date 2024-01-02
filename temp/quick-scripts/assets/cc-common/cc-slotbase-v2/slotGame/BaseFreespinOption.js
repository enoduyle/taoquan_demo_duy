(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BaseFreespinOption.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e8c95jl2kRGYL5uUNAvT1Q7', 'BaseFreespinOption', __filename);
// cc-common/cc-slotbase-v2/slotGame/BaseFreespinOption.js

'use strict';

cc.Class({
    extends: require('CutsceneMode'),

    properties: {
        options: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this.director = this.node.mainDirector.getComponent('Director');
        this.node.opacity = 0;
    },


    //enable option when open
    enter: function enter() {
        this.options.children.forEach(function (item) {
            item.getComponent(cc.Button).interactable = true;
            item.opacity = 255;
        });
    },


    //disable option when close
    optionClick: function optionClick(ev, index) {
        var _this = this;

        this.options.children.forEach(function (item, i) {
            item.getComponent(cc.Button).interactable = false;
            if (i != index) {
                item.opacity = 150;
            } else {
                _this.director.currentGameMode.director.freeSpinOptionTrigger(i);
                item.opacity = 255;
            }
        });
    },


    //play anim if any before close
    exit: function exit() {
        if (this.callback && typeof this.callback == "function") {
            if (this.node.mainDirector) {
                this.node.mainDirector.onIngameEvent("ON_CUTSCENE_CLOSE", this.node.name);
            }
            this.node.emit("STOP");
            this.callback();
        }
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
        //# sourceMappingURL=BaseFreespinOption.js.map
        