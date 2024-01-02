"use strict";
cc._RF.push(module, '8db3bEV2lxA+KttBbLBP32v', 'Broadcaster');
// cc-common/cc-slot-base-test/Streaming/scripts/Broadcaster.ts

Object.defineProperty(exports, "__esModule", { value: true });
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
var wsURL = "wss://my-test-streaming-hgq4ku4h.livekit.cloud";
var livekit_client_1 = require("livekit-client");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Broadcaster = /** @class */ (function (_super) {
    __extends(Broadcaster, _super);
    function Broadcaster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.roomName = null;
        _this.roomStatus = null;
        _this.token = null;
        _this._room = null;
        return _this;
    }
    Broadcaster.prototype.onLoad = function () {
        this.createVideoDiv();
    };
    Broadcaster.prototype.createVideoDiv = function () {
        var container = CC_DEV ? document.getElementById('GameDiv') : document.body;
        var remoteVideo = document.createElement('div');
        var localVideo = document.createElement('div');
        remoteVideo.id = 'remoteVideo';
        localVideo.id = 'localVideo';
        container.insertBefore(localVideo, container.firstChild);
        container.insertBefore(remoteVideo, container.firstChild);
    };
    Broadcaster.prototype.start = function () {
        this._room = new livekit_client_1.Room();
        this._room.on(livekit_client_1.RoomEvent.Connected, this.onRoomConnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Disconnected, this.onRoomDisconnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Reconnected, this.onRoomStatusChange.bind(this));
        this._room.on(livekit_client_1.RoomEvent.Reconnecting, this.onRoomStatusChange.bind(this));
    };
    Broadcaster.prototype.onRoomConnected = function () {
        this.roomName.string = "Room: " + this._room.name;
        this.onRoomStatusChange();
    };
    Broadcaster.prototype.onRoomDisconnected = function () {
        this.roomName.string = "Room: n/a";
        this.onRoomStatusChange();
    };
    Broadcaster.prototype.onRoomStatusChange = function () {
        this.roomStatus.string = "Status: " + this._room.state;
    };
    Broadcaster.prototype.onClickJoinRoom = function () {
        var _this = this;
        this.joinRoomWithToken(wsURL, this.token.string)
            .then(function () {
            console.log('Join room successfully');
            _this.subscribeOthers();
            _this.listenRoomEvents();
        })
            .catch(function (e) {
            _this.roomStatus.string = "Status: Failed connecting to room";
            console.log('Error while connecting to room, please recheck token');
        });
    };
    Broadcaster.prototype.joinRoomWithToken = function (socket, token) {
        console.log('joinRoom, waiting for connect...');
        return this._room.connect(socket, token, {
            autoSubscribe: false,
        });
    };
    Broadcaster.prototype.listenRoomEvents = function () {
        this._room.on(livekit_client_1.RoomEvent.ParticipantConnected, this.handleParticipantConnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.ParticipantDisconnected, this.handleParticipantDisconnected.bind(this));
        this._room.on(livekit_client_1.RoomEvent.TrackSubscribed, this.handleTrackSubscribed.bind(this));
        this._room.on(livekit_client_1.RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed.bind(this));
        this._room.on(livekit_client_1.RoomEvent.TrackPublished, this.handleTrackPublished.bind(this));
        this._room.on(livekit_client_1.RoomEvent.TrackUnpublished, this.handleTrackUnpublished.bind(this));
        this._room.on(livekit_client_1.RoomEvent.TrackMuted, this.handleTrackMuted.bind(this));
    };
    Broadcaster.prototype.handleParticipantConnected = function (RemoteParticipant) {
        cc.log('[LiveKit] new participant connected: ', RemoteParticipant.identity);
    };
    Broadcaster.prototype.handleParticipantDisconnected = function (RemoteParticipant) {
        cc.log('[LiveKit] participant disconnected: ', RemoteParticipant.identity);
    };
    //subscribe all participants in the room
    Broadcaster.prototype.subscribeOthers = function () {
        this._room.participants.forEach(function (participant) {
            participant.tracks.forEach(function (publication) {
                publication.setSubscribed(true);
            });
        });
    };
    Broadcaster.prototype.startBroadcast = function () {
        console.log('startBroadcast');
        this._room.localParticipant.setCameraEnabled(true);
        this._room.localParticipant.setMicrophoneEnabled(true);
        this._room.on(livekit_client_1.RoomEvent.LocalTrackPublished, this.handleLocalTrackPublished.bind(this));
    };
    Broadcaster.prototype.handleLocalTrackPublished = function (trackPublication) {
        //display local video on screen & skip audio
        if (trackPublication.kind === 'video') {
            var container = document.getElementById('localVideo');
            var videoElement = trackPublication.track.attach();
            container.insertBefore(videoElement, container.firstChild);
            videoElement.style = "position: absolute; bottom: 0px; right: 0px; visibility: visible; width: 33%; height: 33%;";
            videoElement.zIndex = -1;
        }
    };
    Broadcaster.prototype.stopBroadcast = function () {
        console.log('stopBroadcast');
        this._room.localParticipant.setCameraEnabled(false);
        this._room.localParticipant.setMicrophoneEnabled(false);
    };
    Broadcaster.prototype.handleTrackMuted = function (track, publication, participant) {
        //Event raised when MC stop broadcast media/streaming
        console.log('Handle track muted/stop broadcast from MC');
    };
    Broadcaster.prototype.handleTrackUnpublished = function (publication, participant) {
        //Event raised when client stop subscribe MC, if it's not called from client
    };
    Broadcaster.prototype.handleTrackPublished = function (publication, participant) {
        //Event raise when a participant start broadcast media/streaming
        publication.setSubscribed(true);
    };
    Broadcaster.prototype.handleTrackUnsubscribed = function (track, publication, participant) {
        //Event raised when a participant stop subscribe MC, if it's not called from client
    };
    Broadcaster.prototype.handleTrackSubscribed = function (track, publication, participant) {
        publication.setVideoQuality(livekit_client_1.VideoQuality.HIGH);
        if (track.kind === 'video') {
            var container = document.getElementById('remoteVideo');
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
    ], Broadcaster.prototype, "roomName", void 0);
    __decorate([
        property(cc.Label)
    ], Broadcaster.prototype, "roomStatus", void 0);
    __decorate([
        property(cc.EditBox)
    ], Broadcaster.prototype, "token", void 0);
    Broadcaster = __decorate([
        ccclass
    ], Broadcaster);
    return Broadcaster;
}(cc.Component));
exports.default = Broadcaster;

cc._RF.pop();