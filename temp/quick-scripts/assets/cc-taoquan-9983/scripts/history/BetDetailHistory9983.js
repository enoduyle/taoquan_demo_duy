(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/history/BetDetailHistory9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f79a14fAqJFqKKqdlCOiGTk', 'BetDetailHistory9983', __filename);
// cc-taoquan-9983/scripts/history/BetDetailHistory9983.js

"use strict";

var arrayTypeJackpot = ["MAJOR", "GRAND"];
cc.Class({
    extends: require("BetDetailHistory"),
    updateTitleJP: function updateTitleJP(data) {
        var _this = this;

        var latestWinJackpotInfo = data.latestWinJackpotInfo;

        if (latestWinJackpotInfo) {
            var idJP = -1;
            arrayTypeJackpot.forEach(function (it, index) {
                if (latestWinJackpotInfo.jackpotId.indexOf(it) >= 0) idJP = index;
            });
            if (this.listJP.length <= arrayTypeJackpot.length && idJP != -1) {
                this.titleJP.getComponent(cc.Sprite).spriteFrame = this.listJP[idJP];
                this.titleJP.active = true;
                this.titleJP.opacity = 0;
                this.scheduleOnce(function () {
                    _this.titleJP.opacity = 255;
                }, 0);
                this.updateTitle(data);
                var tt = this.title.getComponent(cc.Label).string;
                this.title.getComponent(cc.Label).string = tt + "  +  ";
            }
        } else {
            this.titleJP.active = false;
        }
    },
    addButtonTotalPage: function addButtonTotalPage() {
        var totalResultItem = cc.instantiate(this.scrollItem);
        var labelScroll = null;
        totalResultItem.getComponent(this.nameBetHistoryScrollItem).setIndex(-1);
        totalResultItem.parent = this.scrollContainer;
        if (totalResultItem.getComponent(cc.Label)) {
            labelScroll = totalResultItem.getComponent(cc.Label);
        } else {
            labelScroll = totalResultItem.getComponentInChildren(cc.Label);
        }
        if (labelScroll) labelScroll.string = this.summaryName ? this.summaryName + " " : "Tổng kết ";
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
        //# sourceMappingURL=BetDetailHistory9983.js.map
        