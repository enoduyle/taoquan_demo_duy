(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/common/WebSoundPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9019zQzPdBbZNIfB0+FocA', 'WebSoundPlayer', __filename);
// cc-common/cc-share-v1/common/WebSoundPlayer.js

"use strict";

/* global Howl */

var SoundStateEnum = {
    NONE: 0,
    PLAYING: 1
};

var SoundStorageKeys = {
    ENABLE_BGM: "enableBackgroundMusic",
    ENABLE_SFX: "enableSound"
};

var WebSoundPlayer = cc.Class({
    extends: require('SoundPlayer'),
    properties: {
        gameNode: {
            type: cc.Node,
            default: null
        },

        keepAudioSession: true,
        isUseNativeSound: false
    },

    ctor: function ctor() {
        this.webSound = false;
        this.musicInstance = null;

        // for fixing safari on ios 13, only for iframe only
        this.isWebSoundEnable = cc.sys.isBrowser && typeof Howl !== 'undefined';

        this.soundLoadCount = 0;
        this.totalSound = 0;
        this.isAllWebSoundLoaded = false;
        this.loadSoundCompleteHdl = this.onWebSoundLoadComplete.bind(this);
        this.ccMusic = -1;
        this.musicOffset = 0;
        this.musicVolume = 1;
        this.effectVolume = 1;
        this.isGameActive = true;
        this.howlMap = {};
        this.bgMusicId = -1;
        this.playingSounds = [];
        this.bgMusicUUID = 0;
        this.releaseCocosSound = true;
        this._timer = 0;
        this._sfxCacheGesture = [];
        this._resumeWithGesture = this.resumeWithGesture.bind(this);
    },


    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        if (this.isUseNativeSound) {
            this.isWebSoundEnable = false;
        }

        if (this.isWebSoundEnable) {
            var session = window['_v_audio_backgroud_session'];
            if (session) {
                this.bgMusicUUID = session.uuid;
                this.bgMusicId = session.bgMusicId;
                this.musicInstance = session.instance;
                this.howlMap[session.uuid] = session.instance;
            }
        }

        this.currentBGM = null;
        this._super();
        this.musicVolume = this.MUSIC_VOLUME;
        this.effectVolume = this.SOUND_EFFECT_VOLUME;
        // init config
        if (this.isWebSoundEnable) {
            this.webSound = true;
            this.loadWebSounds(this.gameNode || this.node, null);
            var Howler = window.Howler;
            this._hasAudioContext = !!(Howler && Howler.ctx && Howler.ctx.state == "running");
            if (!this._hasAudioContext) {
                this.node.width = 2024;
                this.node.height = 2000;
                this.node.on(cc.Node.EventType.TOUCH_END, this._resumeWithGesture, this, true);

                // this._onOrientationChange();
                // window.addEventListener('orientationchange', this._onOrientationChange);

                var handImage = document.getElementById('mask');
                if (handImage) handImage.addEventListener("touchstart", this._resumeWithGesture);
            }
        }
        cc.game.on(cc.game.EVENT_SHOW, this.onGameShow, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onGameHide, this);
    },
    update: function update(dt) {
        if (this._hasAudioContext || !this.isGameActive || !this.webSound) return;
        this._timer += dt;
        this._waitingGestureSound();
    },
    _waitingGestureSound: function _waitingGestureSound() {
        for (var index = this._sfxCacheGesture.length - 1; index >= 0; index--) {
            var _sfxCacheGesture$inde = this._sfxCacheGesture[index],
                startTime = _sfxCacheGesture$inde.startTime,
                duration = _sfxCacheGesture$inde.duration,
                loop = _sfxCacheGesture$inde.loop;

            var endTime = startTime + duration;
            if (!loop && this._timer > endTime) {
                this._sfxCacheGesture.splice(index, 1);
            }
        }
    },
    _onOrientationChange: function _onOrientationChange() {
        if (this._hasAudioContext) return;
        var handImage = document.getElementById('mask');
        var divGestureSound = document.getElementById('div_gesture_sound');
        if (!divGestureSound) return;
        if (!handImage || handImage.style.display == 'none') {
            divGestureSound.style.display = 'block';
        } else {
            divGestureSound.style.display = 'none';
        }
    },
    resumeWithGesture: function resumeWithGesture() {
        var _this = this;

        if (this._hasAudioContext) return;
        this._hasAudioContext = true;
        this._sfxCacheGesture.forEach(function (soundObject) {
            var startTime = soundObject.startTime,
                duration = soundObject.duration,
                loop = soundObject.loop,
                sound = soundObject.sound,
                volume = soundObject.volume;

            var offset = (_this._timer - startTime) % duration;
            var endTime = startTime + duration;
            if (!loop && _this._timer > endTime) return;
            sound.loop(loop);
            sound.volume(volume);
            sound.play();
            sound.seek(offset);
        });
        this._sfxCacheGesture = [];

        var divGestureSound = document.getElementById('div_gesture_sound');
        if (divGestureSound) divGestureSound.style.display = 'none';

        var handImage = document.getElementById('mask');
        if (handImage) handImage.removeEventListener('touchstart', this._resumeWithGesture);

        window.removeEventListener("orientationchange", this._onOrientationChange);
        this.node.off(cc.Node.EventType.TOUCH_END, this._resumeWithGesture, this, true);
    },

    // need to debug memory for muliple loading call -----
    loadWebSounds: function loadWebSounds(gameNode) {
        this.soundLoadCount = 0;
        this.gameNode = gameNode;
        var sounds = [
            // {id: 'test_sound', src: 'res/import/df/df3d8497-4e8c-4a25-8fb9-e5b70e8c3f88.mp3'}
        ];
        var soundMap = {};
        var soundUuids = [];
        this.loadedSoundMap = {};
        for (var _i in cc.loader._cache) {
            var clip = cc.loader._cache[_i]._owner;
            if (clip instanceof cc.AudioClip) {
                if (clip._nativeAsset instanceof window.Howl) {
                    this.howlMap[clip._uuid] = clip._nativeAsset;
                    this.loadedSoundMap[clip.name] = true;
                    continue;
                }

                // dont load the cached background audio session
                if (this.bgMusicUUID && clip._uuid == this.bgMusicUUID) {
                    continue;
                }
                if (!soundMap[clip.url]) {
                    sounds.push({ uuid: clip._uuid, name: clip.name, src: clip.url });
                    soundMap[clip.url] = true;
                    soundUuids.push(clip._uuid);

                    this.loadedSoundMap[clip.name] = false;
                }
            }
        }

        if (this.releaseCocosSound) cc.loader.release(soundUuids);

        this.totalSound = sounds.length;
        if (this.totalSound == 0) this.isAllWebSoundLoaded = true;
        cc.log('this.totalSound === ' + this.totalSound);
        for (var i = 0; i < sounds.length; i++) {
            var sound = sounds[i];
            var howl = new Howl({
                src: [sound.src],
                preload: true
            });

            howl.once('load', this.onWebSoundLoadComplete.bind(this, sound.name));
            this.howlMap[sound.uuid] = howl;
        }

        // init user gesture for audio to start
        this.waitForGesture(gameNode);
    },
    waitForGesture: function waitForGesture(gameNode) {
        if (!window['_v_audio_backgroud_session']) gameNode.on(cc.Node.EventType.TOUCH_END, this.startPlayWithUserGesture, this, true);
    },
    onWebSoundLoadComplete: function onWebSoundLoadComplete(e) {
        this.soundLoadCount++;
        if (!this.gameNode) {
            // trick to handle bug from preloading scene. Will resolve it later.
            return;
        }
        this.loadedSoundMap[e] = true;

        var fail = '';
        for (var k in this.loadedSoundMap) {
            if (!this.loadedSoundMap[k]) {
                fail = k;
                break;
            }
        }
        if (window && window['vtrace']) window['vtrace']('fail: ' + fail);

        if (this.soundLoadCount == this.totalSound) {
            this.isAllWebSoundLoaded = true;

            // all sounds loaded - switch to websound
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.stopMusic();
            if (this.isEnableBGM) {
                if (!this.currentBGM) this.playMusic(this.bgmMain, true, -1, this.musicOffset);else this.playMusic(this.currentBGM, true, -1, this.musicOffset);
            }
        }
    },
    playHowl: function playHowl(howl, options) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

        if (options.loop) howl.loop(options.loop);
        if (options.volume) howl.volume(options.volume);
        if (options.offset) howl.seek(options.offset);
        return id >= 0 ? howl.play(id) : howl.play();
    },
    onGameShow: function onGameShow() {
        var _this2 = this;

        cc.log("WebSound: onGameShow");
        this.isGameActive = true;
        if (this.webSound) {
            this.resumeContext().then(function () {
                if (_this2.isEnableBGM) {
                    if (_this2.musicInstance.pausedOnHide) {
                        _this2.musicInstance.pausedOnHide = false;
                        _this2.resumeMusic();
                    }
                }
                // resume all sound effects
                for (var i in _this2.howlMap) {
                    var instance = _this2.howlMap[i];
                    if (instance == _this2.musicInstance) continue;
                    if (instance['_vorgVolume']) {
                        instance.volume(instance['_vorgVolume']);
                        delete instance['_vorgVolume'];
                        if (instance.pausedOnHide) {
                            instance.play();
                            instance.pausedOnHide = false;
                        }
                    }
                }
            });
        } else {
            if (!this.isEnableBGM) {
                this.stopMusic();
            }
        }
    },
    resumeContext: function resumeContext() {
        var Howler = window.Howler;
        if (Howler && Howler.ctx && Howler.ctx.state != "running") {
            return Howler.ctx.resume();
        }

        return Promise.resolve();
    },
    onGameHide: function onGameHide() {
        cc.log("WebSound: onGameHide");
        this.isGameActive = false;
        if (this.webSound) {
            if (this.musicInstance) {
                if (this.musicInstance.playing()) {
                    this.musicInstance.pausedOnHide = true;
                }
                this.pauseMusic();
            }
            // pause all sound effects
            for (var i in this.howlMap) {
                var instance = this.howlMap[i];
                if (instance != this.musicInstance) {
                    instance['_vorgVolume'] = instance.volume();
                    instance.volume(0);
                    if (instance.playing()) {
                        instance.pause();
                        instance.pausedOnHide = true;
                    }
                }
            }
        }
    },
    startPlayWithUserGesture: function startPlayWithUserGesture() {
        var _this3 = this;

        if (!this.isAllWebSoundLoaded) return;
        if (!this.currentBGM) this.currentBGM = this.bgmMain;
        if (!this.currentBGM) {
            cc.log('WebSoundPlayer::startPlayWithUserGesture this.bgmMain is not initialized.');
            return;
        }

        if (this.musicInstance) {
            this.musicInstance.stop();
        }

        this.gameNode.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
            _this3.playMusic(_this3.currentBGM, true, -1, _this3.musicOffset);

            if (_this3.musicInstance && _this3.musicInstance.playing()) {
                _this3.gameNode.off(cc.Node.EventType.TOUCH_END, _this3.startPlayWithUserGesture, _this3, true);
            }

            if (!_this3.isEnableBGM && _this3.musicInstance) _this3.musicInstance.pause();
        })));
        cc.isLoadAllSoundWeb = true;
    },
    setMusicVolume: function setMusicVolume(volume) {
        this.musicVolume = volume;
        if (!this.isEnableBGM) return;

        if (!this.webSound) // audioEngine
            {
                cc.audioEngine.setMusicVolume(volume);
            } else {
            // web sound ---
            if (this.musicInstance) this.musicInstance.volume(volume);
        }
    },
    setEffectsVolume: function setEffectsVolume(volume) {
        this.effectVolume = volume;
        if (!this.webSound) // audioEngine
            {
                cc.audioEngine.setEffectsVolume(volume);
            } else {
            // web sound ---
            for (var i in this.howlMap) {
                var instance = this.howlMap[i];
                if (instance != this.musicInstance) instance.volume(volume);
            }
        }
    },
    playMusic: function playMusic(audio) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.musicVolume;
        var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        if (volume < 0) volume = this.musicVolume;
        try {
            this._playMusic(audio, loop, volume, offset);
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _playMusic: function _playMusic(audio) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.musicVolume;
        var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        if (!audio || !audio.name && !this.howlMap[audio._uuid]) {
            cc.log("WebSoundPlayer::playMusic invalid audio", audio);
            return;
        }
        cc.log("playMusic ==== " + audio._uuid + ' volume ' + volume);

        //this.node.getChildByName('debugTf').getComponent('cc.Label').string = this.isEnableBGM;
        this.currentBGM = audio;
        this.musicVolume = volume;
        this.musicOffset = offset;
        if (!this.webSound) {
            this.ccMusic = cc.audioEngine.playMusic(audio, loop);
            if (!cc.sys.isBrowser) // fix native sync issue
                {
                    if (!this.isEnableBGM) cc.audioEngine.setMusicVolume(0.001);else cc.audioEngine.setMusicVolume(volume);
                } else {
                cc.audioEngine.setMusicVolume(volume);
                if (!this.isEnableBGM) cc.audioEngine.pauseMusic();
            }
            if (offset > 0) cc.audioEngine.setCurrentTime(this.ccMusic, offset);
        } else {
            // websound
            if (this.isAllWebSoundLoaded) {
                if (this.musicInstance) this.musicInstance.stop();
                this.musicInstance = this.howlMap[audio._uuid];
                this.bgMusicUUID = audio._uuid;
                this.musicInstance.loop(loop);
                this.musicInstance.volume(volume);
                this.bgMusicId = this.musicInstance.play();
                if (!this.isEnableBGM || !this.isGameActive) this.pauseMusic();
                if (offset > 0) this.musicInstance.seek(offset);
            }
        }
    },
    stopMusic: function stopMusic() {
        try {
            this._stopMusic();
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _stopMusic: function _stopMusic() {
        this.currentBGM = null;
        this.ccMusic = -1;
        if (!this.webSound) {
            cc.audioEngine.stopMusic();
            return;
        }

        // web sound ---
        if (this.musicInstance) {
            this.musicInstance.stop();
            this.bgMusicId = -1;
        }
    },
    pauseMusic: function pauseMusic() {
        try {
            this._pauseMusic();
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _pauseMusic: function _pauseMusic() {
        if (!this.webSound) {
            cc.audioEngine.pauseMusic();
            return;
        }

        // web sound ---
        if (this.musicInstance) {
            if (cc.sys.os == cc.sys.OS_IOS) this.musicInstance.volume(0.001);else this.musicInstance.pause();
        }
    },
    resumeMusic: function resumeMusic() {
        try {
            this._resumeMusic();
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _resumeMusic: function _resumeMusic() {
        if (!this.isEnableBGM) return;
        if (!this.webSound) // audioEngine
            {
                cc.audioEngine.resumeMusic();
                cc.audioEngine.setMusicVolume(this.musicVolume);
            } else {
            // web sound ---
            if (!this.musicInstance || !this.currentBGM) return;
            var offset = 0;
            offset = this.musicInstance.seek();
            this.musicInstance.stop(this.bgMusicId);
            this.musicInstance = this.howlMap[this.currentBGM._uuid];
            this.bgMusicId = this.playHowl(this.musicInstance, { loop: true, volume: this.MUSIC_VOLUME, offset: offset });
        }
    },
    fadeMusicTo: function fadeMusicTo(time, endVolume) {
        var _this4 = this;

        if (!this.currentBGM) return;

        var volume = { value: this.musicVolume };
        var tweenFade = cc.tween(volume).to(time, { value: endVolume }, {
            progress: function progress(start, end, current, ratio) {
                var currentVolume = Math.round(current * 100) / 100;
                _this4.setMusicVolume(currentVolume);
                return start + (end - start) * ratio;
            }
        }).start();

        return tweenFade;
    },
    fadeEffectTo: function fadeEffectTo(soundId, time, endVolume) {
        var _this5 = this;

        if (soundId === null || soundId === undefined) return null;

        var volume = { value: this.getVolume(soundId) };
        var tweenFade = cc.tween(volume).to(time, { value: endVolume }, {
            progress: function progress(start, end, current, ratio) {
                var currentVolume = Math.round(current * 100) / 100;
                _this5.setVolume(soundId, currentVolume);
                return start + (end - start) * ratio;
            }
        }).start();

        return tweenFade;
    },
    stopEffect: function stopEffect(id) {
        try {
            this._stopEffect(id);
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _stopEffect: function _stopEffect(id) {
        var _this6 = this;

        if (!this.webSound) // audioEngine
            {
                if (id !== undefined && id !== null) {
                    cc.audioEngine.stopEffect(id);
                }
            } else {
            // web sound ---
            // need check type more precise
            if (this._hasAudioContext) {
                if (typeof id != 'number' && id) id.stop();
            } else {
                this._sfxCacheGesture.forEach(function (soundObject, index) {
                    if (soundObject.sound == id) {
                        _this6._sfxCacheGesture.splice(index, 1);
                    }
                });
            }
        }
    },
    stopAllEffects: function stopAllEffects() {
        try {
            this._stopAllEffects();
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _stopAllEffects: function _stopAllEffects() {
        if (!this.webSound) {
            // let offset = 0, isLoop = false, musicVolume = 1;
            // if (this.ccMusic >= 0)
            // {
            //     offset = cc.audioEngine.getCurrentTime(this.ccMusic);
            //     isLoop = cc.audioEngine.isLoop(this.ccMusic);
            //     musicVolume = cc.audioEngine.getVolume(this.ccMusic);
            // }
            // cc.audioEngine.stopAllEffects();
            // // for fixing sound native issue
            // if (this.ccMusic >= 0 && this.currentBGM && !cc.sys.isBrowser)
            // {
            //     let volume = this.isEnableBGM ? this.musicVolume : 0;
            //     this.ccMusic = cc.audioEngine.playMusic(this.currentBGM, isLoop);
            //     cc.audioEngine.setMusicVolume(volume);
            //     cc.audioEngine.setCurrentTime(this.ccMusic, offset);
            // }

            for (var _i2 = 0; _i2 < this.playingSounds.length; _i2++) {
                var soundId = this.playingSounds[_i2];
                if (soundId) {
                    // this._stopEffect(soundId);
                    var state = cc.audioEngine.getState(soundId);
                    if (state == cc.audioEngine.AudioState.PLAYING) {
                        this._stopEffect(soundId);
                    }
                }
            }
            this.playingSounds = [];
        } else {
            // web sound ---
            for (var i in this.howlMap) {
                var howl = this.howlMap[i];
                if (howl != this.musicInstance) howl.stop();
            }
            this._sfxCacheGesture = [];
        }
    },
    pauseEffect: function pauseEffect(soundId) {
        try {
            this._pauseEffect(soundId);
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _pauseEffect: function _pauseEffect(soundId) {
        if (!this.webSound) {
            cc.audioEngine.pauseEffect(soundId);
            return;
        }

        if (soundId) {
            soundId.pause();
        }
    },
    resumeEffect: function resumeEffect(soundId) {
        try {
            this._resumeEffect(soundId);
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _resumeEffect: function _resumeEffect(soundId) {
        if (!this.webSound) {
            cc.audioEngine.resumeEffect(soundId);
            return;
        }

        if (soundId) {
            soundId.play();
        }
    },
    playSFXClick: function playSFXClick() {
        if (!this.sfxClick || !this.sfxClick.name && !this.howlMap[this.sfxClick._uuid]) {
            cc.log("WebSoundPlayer::playSFXClick invalid sfxClick");
            return;
        }
        if (!this.isEnableSFX || !this.sfxClick) return;
        var id = void 0;
        if (!this.webSound) {
            id = cc.audioEngine.playEffect(this.sfxClick);
            this.playingSounds.push(id);
            this._filterPlayingSounds();
        } else {
            // web sound ---
            id = this.howlMap[this.sfxClick._uuid];
            id.play();
        }
        return id;
    },
    playEffect: function playEffect(sfx) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.effectVolume;

        var id = null;
        try {
            id = this._playEffect(sfx, loop, volume);
        } catch (e) {
            cc.log(e.toString());
        }
        return id;
    },
    _playEffect: function _playEffect(sfx) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.effectVolume;

        if (!this.isGameActive) return;
        if (!sfx || !sfx.name && !this.howlMap[sfx._uuid]) {
            cc.log("WebSoundPlayer::playEffect invalid sfx");
            return;
        }

        if (!this.isEnableSFX) return;
        var id = null;
        if (!this.webSound) {
            id = cc.audioEngine.playEffect(sfx, loop);
            this.playingSounds.push(id);
            this._filterPlayingSounds();
        } else {
            // web sound ---
            if (this.isAllWebSoundLoaded) {
                id = this.howlMap[sfx._uuid];
                if (this._hasAudioContext) {
                    id.loop(loop);
                    id.volume(volume);
                    id.play();
                } else {
                    this._sfxCacheGesture.push({ sound: id, startTime: this._timer, duration: id._duration, loop: loop, volume: volume });
                }
            }
        }
        return id;
    },
    _filterPlayingSounds: function _filterPlayingSounds() {
        if (this.playingSounds.length <= 12) return;
        this.playingSounds = this.playingSounds.filter(function (id) {
            var state = cc.audioEngine.getState(id);
            return state === cc.audioEngine.AudioState.PLAYING || state === cc.audioEngine.AudioState.PAUSED;
        });
    },
    playSFX: function playSFX(sfx) {
        return this.playEffect(sfx);
    },
    playSound: function playSound(audio) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.SOUND_EFFECT_VOLUME;

        var id = null;
        try {
            id = this._playSound(audio, loop, volume);
        } catch (e) {
            cc.log(e.toString());
        }
        return id;
    },
    _playSound: function _playSound(audio) {
        var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.SOUND_EFFECT_VOLUME;

        if (!this.isGameActive) return;
        if (!audio || !audio.name && !this.howlMap[audio._uuid]) {
            cc.log("WebSoundPlayer::playSound invalid audio");
            return;
        }

        if (!this.isEnableSFX) return null;
        var id = null;
        if (!this.webSound) {
            id = cc.audioEngine.play(audio, loop, volume);
            this.playingSounds.push(id);
            this._filterPlayingSounds();
        } else {
            // web sound ---
            if (this.isAllWebSoundLoaded) {
                id = this.howlMap[audio._uuid];
                if (this._hasAudioContext) {
                    id.loop(loop);
                    id.volume(volume);
                    id.play();
                } else {
                    this._sfxCacheGesture.push({ sound: id, startTime: this._timer, duration: id._duration, loop: loop, volume: volume });
                }
            }
        }
        return id;
    },
    stopSound: function stopSound(id) {
        try {
            this._stopSound(id);
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _stopSound: function _stopSound(id) {
        this.stopEffect(id);
    },
    stopAllAudio: function stopAllAudio() {
        try {
            this._stopAllAudio();
        } catch (e) {
            cc.log(e.toString());
        }
    },
    _stopAllAudio: function _stopAllAudio() {
        this.currentBGM = null;
        this.ccMusic = -1;
        if (!this.webSound) {
            cc.audioEngine.stopAll();
        } else {
            // web sound ---
            this.stopAllEffects();
            if (this.musicInstance) this.musicInstance.pause();
        }
    },
    sfxToggle: function sfxToggle() {
        this.setEffectEnable(!this.isEnableSFX);
    },
    setEffectEnable: function setEffectEnable(enable) {
        this.isEnableSFX = enable;
        if (this.node.gSlotDataStore) this.node.gSlotDataStore.isEnableSFX = this.isEnableSFX;
        if (this.isWebSoundClient2) {
            cc.sys.localStorage.setItem(this.storageKeySFX, this.isEnableSFX ? "1" : "0");
        } else {
            cc.sys.localStorage.setItem(this.storageKeySFX, this.isEnableSFX);
        }

        if (!this.isEnableSFX) {
            this.stopAllEffects();
        }
    },
    bgmToggle: function bgmToggle() {
        this.setBgmEnable(!this.isEnableBGM);
    },
    setBgmEnable: function setBgmEnable(enable) {
        var _this7 = this;

        this.isEnableBGM = enable;
        if (this.node.gSlotDataStore) this.node.gSlotDataStore.isEnableBGM = this.isEnableBGM;

        if (this.isWebSoundClient2) {
            cc.sys.localStorage.setItem(this.storageKeyBGM, this.isEnableBGM ? "1" : "0");
        } else {
            cc.sys.localStorage.setItem(this.storageKeyBGM, this.isEnableBGM);
        }

        if (this.enableMusicFunc) {
            clearTimeout(this.enableMusicFunc);
        }
        this.enableMusicFunc = setTimeout(function () {
            if (_this7.isEnableBGM) {
                if (!_this7.currentBGM) _this7.playMainBGM();else _this7.resumeMusic();
            } else {
                _this7.pauseMusic();
            }
            _this7.enableMusicFunc = null;
        }, 100);
    },
    setVolume: function setVolume(id) {
        var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

        if (id !== 0 && !id) return false;
        if (!this.webSound) // audioEngine
            {
                cc.audioEngine.setVolume(id, volume);
            } else {
            // web sound ---       
            // need check type more precise
            if (typeof id != 'number') id.volume(volume);
        }
        return true;
    },
    getVolume: function getVolume(id) {
        if (id !== 0 && !id) return 0;
        if (!this.webSound) // audioEngine
            {
                return cc.audioEngine.getVolume(id);
            } else {
            // web sound ---       
            // need check type more precise
            if (typeof id != 'number') return id.volume();
        }
    },
    getPlayState: function getPlayState(id) {
        if (id !== 0 && !id) return SoundStateEnum.NONE;
        var state = SoundStateEnum.NONE;
        if (!this.webSound) // audioEngine
            {
                switch (cc.audioEngine.getState(id)) {
                    case cc.audioEngine.AudioState.PLAYING:
                        state = SoundStateEnum.PLAYING;
                        break;
                }
            } else {
            // web sound ---       
            // need check type more precise
            if (typeof id != 'number') {
                if (id.playing()) state = SoundStateEnum.PLAYING;
            }
        }
        return state;
    },
    getMusicState: function getMusicState() {
        var id = this.webSound ? this.musicInstance : this.ccMusic;
        return this.getPlayState(id);
    },


    // return in seconds
    getDuration: function getDuration(id) {
        if (id === null || id === undefined) return 0;
        if (!this.webSound) // audioEngine
            {
                return cc.audioEngine.getDuration(id);
            } else {
            // web sound ---       
            // need check type more precise
            if (typeof id != 'number') return id.duration();
        }
    },


    // update (dt) {},

    onDestroy: function onDestroy() {
        if (this.gameNode) this.gameNode.off(cc.Node.EventType.TOUCH_END, this.startPlayWithUserGesture, this, true);
        cc.game.off(cc.game.EVENT_SHOW, this.onGameShow, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onGameHide, this);
        if (this.webSound) {
            for (var i in this.howlMap) {
                if (this.howlMap[i] != this.musicInstance || !this.keepAudioSession) this.howlMap[i].unload();
            }

            if (this.keepAudioSession) {
                if (this.musicInstance) {
                    this.musicInstance.volume(0.001);
                    window['_v_audio_backgroud_session'] = {
                        uuid: this.bgMusicUUID,
                        bgMusicId: this.bgMusicId,
                        instance: this.musicInstance
                    };
                }
            } else window['_v_audio_backgroud_session'] = null;
        }
        this.playingSounds = [];
        clearTimeout(this.enableMusicFunc);
    }
});

module.exports = {
    SoundStateEnum: SoundStateEnum,
    SoundStorageKeys: SoundStorageKeys,
    WebSoundPlayer: WebSoundPlayer
};

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
        //# sourceMappingURL=WebSoundPlayer.js.map
        