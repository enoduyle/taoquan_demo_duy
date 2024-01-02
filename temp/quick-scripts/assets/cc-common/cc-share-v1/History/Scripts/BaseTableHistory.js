(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/History/Scripts/BaseTableHistory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6ec22dMhiNNebkKEkOn/Pyh', 'BaseTableHistory', __filename);
// cc-common/cc-share-v1/History/Scripts/BaseTableHistory.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        cell: cc.Prefab
    },
    onLoad: function onLoad() {
        this.node.on("UPDATE_DATA", this.updateData, this);
        this.node.on("CLEAR_DATA", this.clearData, this);
    },
    initCells: function initCells(itemPerPage) {
        for (var i = 0; i < itemPerPage; ++i) {
            var cell = cc.instantiate(this.cell);
            cell.parent = this.node;
            cell.opacity = 1;
        }
    },
    updateData: function updateData(data) {
        this.node.children.forEach(function (child, index) {
            if (index < data.length) {
                child.updateData(data[index]);
                child.active = true;
                child.opacity = 255;
            } else {
                child.active = false;
            }
        });
    },
    clearData: function clearData() {
        this.node.children.forEach(function (child) {
            return child.active = false;
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
        //# sourceMappingURL=BaseTableHistory.js.map
        