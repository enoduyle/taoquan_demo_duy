(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/History/Scripts/JackpotCellHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a895NS7GFEs40AQMK2na45', 'JackpotCellHistory', __filename);
// cc-common/cc-share-v1/History/Scripts/JackpotCellHistory.js

"use strict";

var _require = require('CustomDataType'),
    jackpotStatic = _require.jackpotStatic;

cc.Class({
    extends: require("BaseCellHistory"),

    properties: {
        jackpotType: cc.Node,
        jackpotList: {
            default: [],
            type: [jackpotStatic]
        },
        height: 50
    },

    onLoad: function onLoad() {
        this._super();
        this.node.height = this.height;
    },
    updateData: function updateData(data) {
        this._super(data);
        if (this.jackpotType) {
            var imageJP = this.findJackpotStaticData(data.jpType);
            if (imageJP) {
                this.jackpotType.getComponent(cc.Sprite).spriteFrame = imageJP.static;
            }
        }
    },
    findJackpotStaticData: function findJackpotStaticData(jackpotType) {
        for (var i = 0; i < this.jackpotList.length; i++) {
            if (this.jackpotList[i].name == jackpotType) return this.jackpotList[i];
        }
        return null;
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
        //# sourceMappingURL=JackpotCellHistory.js.map
        