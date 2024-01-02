"use strict";
cc._RF.push(module, '6ec22dMhiNNebkKEkOn/Pyh', 'BaseTableHistory');
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