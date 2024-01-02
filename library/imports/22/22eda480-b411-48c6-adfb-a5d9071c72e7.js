"use strict";
cc._RF.push(module, '22edaSAtBFIxq37pdkHHHLn', 'gSlotMiniGame');
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