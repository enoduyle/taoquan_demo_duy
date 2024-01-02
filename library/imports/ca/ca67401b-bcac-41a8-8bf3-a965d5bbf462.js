"use strict";
cc._RF.push(module, 'ca674AbvKxBqIvzqWXVu/Ri', 'Jackpot9983');
// cc-taoquan-9983/scripts/common/Jackpot9983.js

"use strict";

cc.Class({
    extends: require('Jackpot'),

    properties: {},

    onLoad: function onLoad() {
        this._super();
        this.node.on("UPDATE_VALUE_JACKPOT", this.updateValueJP, this);
    },
    renderJackpot: function renderJackpot() {
        if (this.isPausedJP) return;
        this.renderJP({
            node: this.grand,
            value: this.jackpotData[this.JP_Names[0]]
        });
        this.renderJP({
            node: this.major,
            value: this.jackpotData[this.JP_Names[1]]
        });
    },
    updateValueJP: function updateValueJP() {
        var isGrand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = arguments[1];

        if (isGrand) {
            this.renderJP({
                node: this.grand,
                value: value,
                time: 100
            });
        } else {
            this.renderJP({
                node: this.major,
                value: value,
                time: 100
            });
        }
    }
});

cc._RF.pop();