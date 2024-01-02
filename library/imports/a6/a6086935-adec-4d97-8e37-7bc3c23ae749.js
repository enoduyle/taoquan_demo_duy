"use strict";
cc._RF.push(module, 'a6086k1rexNl443e8PCOudJ', 'KtekEventHandler');
// cc-common/cc-lobby-999/KtekEventHandler.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KtekEventHandler = /** @class */ (function (_super) {
    __extends(KtekEventHandler, _super);
    function KtekEventHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.receiveKtekCallback = null; //message send from KTEK
        _this.receiveOurCallback = null; //message send from us
        _this.joinRoomData = null;
        return _this;
        // update (dt) {}
    }
    KtekEventHandler_1 = KtekEventHandler;
    KtekEventHandler.prototype.onLoad = function () {
        if (KtekEventHandler_1.instance == null) {
            KtekEventHandler_1.instance = this;
        }
        if (KtekEventHandler_1.staticJoinRoomData) {
            this.setJoinRoomData(KtekEventHandler_1.staticJoinRoomData.tableId, KtekEventHandler_1.staticJoinRoomData.gameId, KtekEventHandler_1.staticJoinRoomData.bet, KtekEventHandler_1.staticJoinRoomData.time);
            KtekEventHandler_1.staticJoinRoomData = null;
        }
    };
    KtekEventHandler.prototype.start = function () {
    };
    KtekEventHandler.prototype.getInstance = function () {
        return KtekEventHandler_1.instance;
    };
    KtekEventHandler.prototype.sendToKtek = function (key, data) {
        cc.log("sendToKtek key: " + key + " | data: " + data);
        if (this.receiveOurCallback != null) {
            this.receiveOurCallback(key, data);
        }
    };
    KtekEventHandler.prototype.sendToUs = function (key, data) {
        cc.log("sendToUs key: " + key + " | data: " + JSON.stringify(data));
        cc.log("sendToUs callback: " + this.receiveKtekCallback);
        if (this.receiveKtekCallback != null) {
            this.receiveKtekCallback(key, data);
        }
    };
    KtekEventHandler.prototype.setJoinRoomData = function (tableID, gameID, betMoney, time) {
        var roomData = {
            tableId: tableID,
            gameId: gameID,
            bet: betMoney,
            time: time,
        };
        KtekEventHandler_1.instance.joinRoomData = roomData;
    };
    KtekEventHandler.prototype.setStaticJoinRoomData = function (tableID, gameID, betMoney, time) {
        var roomData = {
            tableId: tableID,
            gameId: gameID,
            bet: betMoney,
            time: time,
        };
        KtekEventHandler_1.staticJoinRoomData = roomData;
        cc.sys.localStorage.setItem("invitation_" + gameID, JSON.stringify(roomData));
    };
    KtekEventHandler.prototype.switchEnv = function (_a) {
        var isProd = _a.isProd;
        cc.log("KtekEventHandler switchEnv: " + isProd);
        var loadConfigAsync = require('loadConfigAsync');
        loadConfigAsync.switchEnv(isProd);
    };
    var KtekEventHandler_1;
    KtekEventHandler.instance = null;
    KtekEventHandler.staticJoinRoomData = null;
    KtekEventHandler = KtekEventHandler_1 = __decorate([
        ccclass
    ], KtekEventHandler);
    return KtekEventHandler;
}(cc.Component));
exports.default = KtekEventHandler;

cc._RF.pop();