(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/Streaming/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89075XBSJBA4KMO838vzCcb', 'Player', __filename);
// cc-common/cc-slot-base-test/Streaming/scripts/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
var wsURL = "wss://my-test-streaming-hgq4ku4h.livekit.cloud";
var livekit_client_1 = require("livekit-client");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.roomName = null;
        _this.roomStatus = null;
        _this.token = null;
        _this._room = null;
        return _this;
    }
    Player.prototype.onLoad = function () {
        this._room = new livekit_client_1.Room();
        this._room.on(livekit_client_1.RoomEvent.Connected, this.onRoomConnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Disconnected, this.onRoomDisconnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Reconnected, this.onRoomStatusChange.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Reconnecting, this.onRoomStatusChange.bind(this));
        var getUrlParam = require('gameCommonUtils').getUrlParam;
        var stoken = getUrlParam('stoken');
        if (stoken) {
            this.joinRoomWithToken(wsURL, stoken);
        }
    };
    Player.prototype.onRoomConnected = function () {
        this.roomName.string = "Room: " + this._room.name;
        this.onRoomStatusChange();
    };
    Player.prototype.onRoomDisconnected = function () {
        this.roomName.string = "Room: n/a";
        this.onRoomStatusChange();
    };
    Player.prototype.onRoomStatusChange = function (displayStatus) {
        if (displayStatus === void 0) { displayStatus = null; }
        this.roomStatus.string = "Status: " + (displayStatus ? displayStatus : this._room.state);
    };
    Player.prototype.onClickJoinRoom = function () {
        var _this = this;
        this.joinRoomWithToken(wsURL, this.token.string)
            .then(function () {
            _this.subscribeDealer();
            _this.listenRoomEvents();
        })
            .catch(function (e) {
            _this.onRoomStatusChange('failed');
            console.log('Error while connecting to room, please recheck token' + e);
        });
    };
    Player.prototype.joinRoomWithToken = function (socket, token) {
        console.log('joinRoom, waiting for connect...');
        this.onRoomStatusChange('connecting');
        return this._room.connect(socket, token, {
            autoSubscribe: false,
        });
    };
    Player.prototype.subscribeDealer = function () {
        console.log('subscribeDealer');
        this._room.participants.forEach(function (participant) {
            participant.tracks.forEach(function (publication) {
                publication.setSubscribed(true);
            });
        });
    };
    Player.prototype.listenRoomEvents = function () {
        this._room.on(livekit_client_1.RoomEvent.TrackSubscribed, this.handleTrackSubscribed);
        this._room.on(livekit_client_1.RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed);
        this._room.on(livekit_client_1.RoomEvent.TrackPublished, this.handleTrackPublished);
        this._room.on(livekit_client_1.RoomEvent.TrackUnpublished, this.handleTrackUnpublished);
        this._room.on(livekit_client_1.RoomEvent.TrackMuted, this.handleTrackMuted);
    };
    Player.prototype.handleTrackMuted = function (track, publication, participant) {
        //Event raised when MC stop broadcast media/streaming
        console.log('Handle track muted/stop broadcast from MC');
    };
    Player.prototype.handleTrackUnpublished = function (track, publication, participant) {
        //Event raised when client stop subscribe MC, if it's not called from client, maybe MC left room
    };
    Player.prototype.handleTrackPublished = function (track, publication, participant) {
        publication.setVideoQuality(livekit_client_1.VideoQuality.MEDIUM);
        if (track.kind === 'video') {
            var container = CC_DEV ? document.getElementById('GameDiv') : document.body;
            var videoElement = track.attach();
            container.insertBefore(videoElement, container.firstChild);
            videoElement.style = "position: absolute; bottom: 0px; left: 0px; visibility: visible; width: 100%; height: 100%;";
        }
        else if (track.kind === 'audio') {
            var container = document.getElementById('Cocos2dGameContainer');
            var audioElement = track.attach();
            container.appendChild(audioElement);
        }
    };
    Player.prototype.handleTrackUnsubscribed = function (track, publication, participant) {
        //Event raised when client stop subscribe MC, if it's not called from client, maybe MC left room
    };
    Player.prototype.handleTrackSubscribed = function (track, publication, participant) {
        publication.setVideoQuality(livekit_client_1.VideoQuality.MEDIUM);
        if (track.kind === 'video') {
            var container = CC_DEV ? document.getElementById('GameDiv') : document.body;
            var videoElement = track.attach();
            container.insertBefore(videoElement, container.firstChild);
            videoElement.style = "position: absolute; bottom: 0px; left: 0px; visibility: visible; width: 100%; height: 100%;";
        }
        else if (track.kind === 'audio') {
            var container = document.getElementById('Cocos2dGameContainer');
            var audioElement = track.attach();
            container.appendChild(audioElement);
        }
    };
    __decorate([
        property(cc.Label)
    ], Player.prototype, "roomName", void 0);
    __decorate([
        property(cc.Label)
    ], Player.prototype, "roomStatus", void 0);
    __decorate([
        property(cc.EditBox)
    ], Player.prototype, "token", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
        //# sourceMappingURL=Player.js.map
        