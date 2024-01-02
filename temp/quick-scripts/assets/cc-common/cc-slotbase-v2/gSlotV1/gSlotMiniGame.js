(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/gSlotV1/gSlotMiniGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '22edaSAtBFIxq37pdkHHHLn', 'gSlotMiniGame', __filename);
// cc-common/cc-slotbase-v2/gSlotV1/gSlotMiniGame.js

'use strict';

var baseActor = require("baseActor");
cc.Class({
    extends: baseActor,
    __ctor__: function __ctor__(director) {
        var _this = this;

        this.director = director;
        this.nodeView = director.nodeView;

        var _nodeView = this.nodeView,
            closeGameBtn = _nodeView.closeGameBtn,
            minimizeBtn = _nodeView.minimizeBtn;


        closeGameBtn.off('click');
        closeGameBtn.on('click', function () {
            _this.director.closeGame();
        });

        minimizeBtn.off('click');
        minimizeBtn.on('click', function () {
            _this.director.minimizeGame();
        });
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
        //# sourceMappingURL=gSlotMiniGame.js.map
        