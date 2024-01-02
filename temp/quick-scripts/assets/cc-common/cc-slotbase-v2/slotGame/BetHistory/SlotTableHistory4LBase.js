(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotTableHistory4LBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ebce1HxTQlGnpvXyfFBUQu5', 'SlotTableHistory4LBase', __filename);
// cc-common/cc-slotbase-v2/slotGame/BetHistory/SlotTableHistory4LBase.js

'use strict';

var _require = require('utils'),
    formatMoney = _require.formatMoney;

var _require2 = require('utils'),
    convertAssetArrayToObject = _require2.convertAssetArrayToObject;

var arrayTypeJackpot = ["MINI", "MINOR", "MAJOR", "GRAND"];

cc.Class({
    extends: require("SlotTableHistory"),

    properties: {
        bonusSprite: {
            type: cc.SpriteFrame,
            default: []
        },
        isShowSpecialPayline: false
    },

    onLoad: function onLoad() {
        this.bonusSprite = convertAssetArrayToObject(this.bonusSprite);

        this._super();

        this.node.on("SHOW_TABLE_MATRIX", this.showTableMatrix, this);
        this.node.on("HIDE_TABLE_MATRIX", this.hideTableMatrix, this);
        this.turnSpecialPayline = false;
    },
    showPaylineAllWay: function showPaylineAllWay(_ref) {
        var _this = this;

        var payLineSymbol = _ref.payLineSymbol,
            paylineMaxColumn = _ref.paylineMaxColumn;

        var symbolId = payLineSymbol;
        var symbolCount = paylineMaxColumn;
        this.symbolNode.children.forEach(function (it) {
            if ((it.val == symbolId || it.val == "K" || _this.currentMode == "free" && it.val == "A1") && it.col < symbolCount) {
                it.opacity = 255;
            } else {
                it.opacity = 100;
            }
        });
    },
    renderResult: function renderResult(data) {
        //data.selectedOption = 2;
        //data.extraData = {"scatterA1":["0;358","10;358"],"scatterA2":["7;1074"],"extraBet":"5;88","scaterA":["1;168","2;68","5;8","6;38","11;38","13;38"]};
        this.typeJackpot = 0;
        this.paylines = [];
        this.listSpecialLine = [];
        this.showingPayline = false;
        this.paylineInfo.emit('HIDE_PAYLINE');
        // selectedOption
        // 1 = FREE8; 2 TOPUP

        this.gameMode = data.mode;
        if (data.mode == "free" && data.selectedOption == 2) {
            this.gameMode = data.mode = "topup";
        } else if (data.mode == "free" && data.selectedOption == 1) {
            this.gameMode = data.mode = "free";
        } else if (data.mode == "bonus") {
            var latestWinJackpotInfo = data.latestWinJackpotInfo;

            if (latestWinJackpotInfo) {
                this.typeJackpot = this.getTypeJackpot(latestWinJackpotInfo.jackpotId);
            }

            this.gameMode = "bonus";
        }

        this._super(data);

        if (this.listSpecialLine.length > 0) {
            this.showingPayline = true;
        }
        this.paylineTime = 0.02;
    },
    setBonusPayline: function setBonusPayline() {
        var _this2 = this;

        // only for 9991
        this.bonusList = [];
        this.symbolNode.children.forEach(function (it) {
            if (it.val == "A" || it.val == "A1" || it.val == "A2") {
                _this2.bonusList.push(it);
            }
        });
    },
    setWildPayline: function setWildPayline() {
        var _this3 = this;

        this.wildJackpotList = [];
        this.symbolNode.children.forEach(function (it) {
            if (it.val == "K") {
                _this3.wildJackpotList.push(it);
            }
        });
    },
    getTypeJackpot: function getTypeJackpot(jackpotId) {
        for (var index = 0; index < arrayTypeJackpot.length; index++) {
            var jp = arrayTypeJackpot[index];
            if (jackpotId.includes(jp)) {
                return index + 1;
            }
        }
        return 0;
    },
    renderGameTable: function renderGameTable(matrix, format) {
        var startX = (-format.length / 2 + 0.4) * this.node.config.SYMBOL_WIDTH;
        var count = 0;
        for (var i = 0; i < format.length; i++) {
            var startY = (format[i] / 2 - 0.5) * this.node.config.SYMBOL_HEIGHT + 5;
            for (var j = 0; j < format[i]; j++) {
                var symbol = this.getSymbol(this.currentMode);
                symbol.parent = this.symbolNode;
                symbol.setPosition(startX + i * (this.node.config.SYMBOL_WIDTH + 10), startY - j * (this.node.config.SYMBOL_HEIGHT + 10));
                symbol.getComponent("SlotSymbol").changeToSymbol(matrix[count]);
                symbol.col = i;
                symbol.row = j;
                symbol.val = matrix[count];
                symbol.disableNumber();
                count++;
            }
        }
    },
    renderBonusTable: function renderBonusTable(matrix, format) {
        var width = this.node.config.SYMBOL_WIDTH - 14;
        var startX = (-format.length / 2 + 0.5) * width;
        var count = 0;

        for (var i = 0; i < matrix.length; i++) {
            var startY = (format[0] / 2 - 0.5) * this.node.config.SYMBOL_HEIGHT;

            var col = Math.floor(i % 4);
            var row = Math.floor(i / 4);
            var value = parseInt(matrix[count]);

            var displayTypeJackpot = parseInt(value % 10);
            var symbol = this.getSymbol(this.currentMode);
            symbol.parent = this.symbolNode;
            symbol.setPosition(startX + col * width, startY - row * this.node.config.SYMBOL_HEIGHT);
            symbol.setResult('treasure' + value);

            if (this.typeJackpot == displayTypeJackpot || this.typeJackpot == 0) {
                symbol.opacity = 255;
            } else {
                symbol.opacity = 100;
            }
            count++;
        }
    },
    onNextButton: function onNextButton() {
        if (this.currentMode == "free" || this.currentMode == "topup") {
            this.currentFree++;
        }
    },
    onBackButton: function onBackButton() {
        this.currentPage = this.currentPage - 1;
        if (this.currentMode == "free" || this.currentMode == "topup") {
            this.currentFree = Math.max(0, this.currentFree - 1);
        }
    },
    updateTitle: function updateTitle(data) {
        var titleMode = "Normal";
        var winAmount = 0;
        switch (data.mode) {
            case "normal":
                titleMode = "Normal";
                winAmount = data.winAmount;
                break;
            case "free":
                titleMode = "Free";
                winAmount = data.winAmount;
                break;
            case "topup":
                titleMode = "Topup";
                winAmount = data.totalFreeWinAmount;
                break;
            case "bonus":
                titleMode = "Bonus";
                winAmount = data.totalBonusWinAmount;
                break;
        }
        if (this.currentMode == "free") {
            titleMode += " lần " + (this.currentFree + 1);
            titleMode += " : " + formatMoney(winAmount || 0);
        } else if (this.currentMode == "topup") {
            titleMode += " lần " + (this.currentFree + 1);
            if (winAmount && winAmount > 0) titleMode += " : " + formatMoney(winAmount || 0);
        }

        if (data.latestWinJackpotInfo) {
            titleMode += " Jackpot: " + data.latestWinJackpotInfo.jackpotAmount;
        } else if (data.mode == "bonus") {
            titleMode += " : " + formatMoney(winAmount || 0);
        }
        this.title.string = titleMode;
    },
    renderExtendData: function renderExtendData(data) {
        var _data$extraData = data.extraData,
            scaterA = _data$extraData.scaterA,
            scatterA1 = _data$extraData.scatterA1,
            scatterA2 = _data$extraData.scatterA2,
            lsa8 = _data$extraData.lsa8,
            lsan = _data$extraData.lsan,
            lta = _data$extraData.lta,
            bg = _data$extraData.bg,
            opt = _data$extraData.opt;

        var scatterCredit = scaterA.concat(scatterA1).concat(scatterA2);

        this.bonusList = [];
        this.wildJackpotList = [];
        this.indexSpecialLine = 0;

        var isBonusPayline = this.gameMode != "normal" && (lsa8 > 0 || lsan > 0 || lta > 0) || this.gameMode == "normal" && opt;

        if (isBonusPayline) {
            this.setBonusPayline();
            this.listSpecialLine.push("SCATTER");
            this.bonusWinAmount = lsa8 || lsan || lta;
        }

        if (bg) {
            this.listSpecialLine.push("WILD");
            this.setWildPayline();
        }

        var totalCredit = 0;
        for (var i = 0; i < scaterA.length; i++) {
            var _data = scaterA[i].split(';');
            var credit = parseInt(_data[1]);
            totalCredit += credit;
        }
        if (this.gameMode == 'free') {
            for (var _i = 0; _i < this.symbolNode.children.length; _i++) {
                var symbol = this.symbolNode.children[_i];
                // let credit = parseInt(scatterA1[0]);
                if (symbol.val == "A1") symbol.addNumber(totalCredit);
            }
        } else {
            for (var _i2 = 0; _i2 < scatterCredit.length; _i2++) {
                var _data2 = scatterCredit[_i2].split(';');
                var index = parseInt(_data2[0]);
                var _credit = parseInt(_data2[1]);
                var _symbol = this.symbolNode.children[index];
                if (_symbol.val == "A" || _symbol.val == "A1" || _symbol.val == "A2") _symbol.addNumber(_credit);
            }
        }
    },
    showNextPayline: function showNextPayline() {
        /*
        try {
            if (this.turnSpecialPayline) {
                if (this.indexSpecialLine < this.listSpecialLine.length) {
                    if (this.listSpecialLine[this.indexSpecialLine] == "SCATTER") {
                        // show special payline
                        this.showBonusPayline();
                        if (this.gameMode == "free") {
                            this.paylineInfo.emit('SHOW_PAYLINE_BONUS',this.bonusWinAmount, true);
                        } else if (this.gameMode == "topup") {
                            this.paylineInfo.emit('SHOW_PAYLINE_BONUS',this.bonusWinAmount, false);
                        } else {
                            this.paylineInfo.emit('HIDE_PAYLINE');
                        }
                        
                        this.indexSpecialLine++;
                    } else if (this.listSpecialLine[this.indexSpecialLine] == "WILD") {
                        // show special payline
                        this.showWildJackpot();
                        this.paylineInfo.emit('SHOW_WILD_JACKPOT');
                        this.indexSpecialLine++;
                    }
                } else {
                    this.turnSpecialPayline = false;
                }
                this.paylineTime = 2;
                return;
            }
                 if (this.paylines && this.paylines.length > 0) {
                let paylineInfo = this.paylines[this.paylineIndex];
                if (!paylineInfo.betDenom) paylineInfo.betDenom = this.betDenom;
                if (this.node.config.PAY_LINE_ALLWAYS) {
                    this.showPaylineAllWay(paylineInfo);
                }
                else {
                    this.showPaylinePerline(paylineInfo);
                }
                this.paylineInfo.emit('SHOW_PAYLINE',{line: this.paylines[this.paylineIndex]});
                this.paylineTime = 2;
        
                let isDisplayBonusPayline = this.isShowSpecialPayline && this.listSpecialLine && this.listSpecialLine.length > 0;
                 if (this.paylineIndex + 1 == this.paylines.length && isDisplayBonusPayline) {
                    this.turnSpecialPayline = true;
                    this.indexSpecialLine = 0;
                    this.paylineIndex = 0;
                } else {
                    this.paylineIndex = (this.paylineIndex + 1) % this.paylines.length;
                }
            } else if (this.listSpecialLine && this.listSpecialLine.length > 0) {
                this.turnSpecialPayline = true;
                this.indexSpecialLine = 0;
                this.paylineTime = 0.02;
            }
            
        } catch (exception) {
            // change next page but this called by update
        }
        */
    },
    showBonusPayline: function showBonusPayline() {
        // only for 9991
        if (this.bonusList && this.bonusList.length > 0) {
            this.symbolNode.children.forEach(function (it) {
                it.opacity = 100;
            });
            for (var i = 0; i < this.bonusList.length; i++) {
                var symbol = this.bonusList[i];
                if (symbol) symbol.opacity = 255;
            }
        }
    },
    showWildJackpot: function showWildJackpot() {
        // only for 9991
        if (this.wildJackpotList && this.wildJackpotList.length > 0) {
            this.symbolNode.children.forEach(function (it) {
                it.opacity = 100;
            });
            for (var i = 0; i < this.wildJackpotList.length; i++) {
                var symbol = this.wildJackpotList[i];
                if (symbol) symbol.opacity = 255;
            }
        }
    },
    update: function update() {},
    clearPayline: function clearPayline() {
        if (this.gameMode != "bonus") {
            this.symbolNode.children.forEach(function (it) {
                return it.opacity = 255;
            });
        }
    },
    showTableMatrix: function showTableMatrix() {
        this.node.opacity = 255;
    },
    hideTableMatrix: function hideTableMatrix() {
        this.node.opacity = 0;
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
        //# sourceMappingURL=SlotTableHistory4LBase.js.map
        