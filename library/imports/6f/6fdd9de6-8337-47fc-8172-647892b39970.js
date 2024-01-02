"use strict";
cc._RF.push(module, '6fdd93mgzdH/IFyZHiSs5lw', 'Jackpot');
// cc-common/cc-slotbase-v2/gui/Jackpot.js

"use strict";

var _require = require('utils'),
    convertObjectToArrayKey = _require.convertObjectToArrayKey,
    findKeyByValue = _require.findKeyByValue,
    formatMoney = _require.formatMoney;

cc.Class({
    extends: cc.Component,

    properties: {
        mini: cc.Node,
        minor: cc.Node,
        major: cc.Node,
        grand: cc.Node,
        jackpotIconAnims: {
            default: [],
            type: sp.Skeleton,
            override: true
        },
        jackpotIcons: {
            default: [],
            type: cc.Node,
            override: true
        },
        jackpotParticles: {
            default: [],
            type: cc.Animation,
            override: true
        },
        jackpotMultiply: cc.Node,
        maxMultiply: 6
    },
    onLoad: function onLoad() {
        this.node.on("CHANGE_JACKPOT", this.renderJackpotBet, this);
        this.node.on("UPDATE_JACKPOT", this.callbackJackpotUpdate, this);
        this.node.on("REGISTER_JACKPOT", this.register, this);
        this.node.on("PAUSE_JACKPOT", this.pauseRenderJP, this);
        this.node.on("RESUME_JACKPOT", this.resumeRenderJP, this);
        this.node.on("UPDATE_VALUE_JACKPOT", this.updateValueJP, this);
        this.node.on("PLAY_JACKPOT_EXPLOSION", this.playJackpotExplosion, this);
        this.node.on("STOP_JACKPOT_EXPLOSION", this.stopJackpotExplosion, this);
        this.node.on("NOTICE_JACKPOT_WIN", this.noticeJackpotWin, this);
        this.indexJp = {
            "GRAND": 0,
            "MAJOR": 1,
            "MINOR": 2,
            "MINI": 3
        };
    },
    start: function start() {
        this.initData();
    },
    initData: function initData() {
        if (!this.inited) {
            this.isPausedJP = false;
            this.initJackpotData = {};
            this.currentJackpotData = {};
            this.jackpotData = {};
            this.currentJackpotLevel = {};
            this.newJackpotLevel = {};
            this.JP_Prefix = this.node.config.JP_PREFIX_EVENT;
            this.JP_Steps = convertObjectToArrayKey(this.node.config.STEPS);
            this.JP_Names = this.node.config.JP_NAMES;
            this.inited = true;
        }
    },
    register: function register(gameId, data, gameStateManager) {
        var _this = this;

        this.gameId = gameId;
        this.data = data;
        this.initData();
        gameStateManager.networkCallbackJP(this.jackpotUpdate.bind(this));
        if (data.jackpot) {
            Object.keys(data.jackpot).map(function (jpName) {
                var name = jpName.replace(_this.JP_Prefix, '');
                _this.callbackJackpotUpdate(name, data.jackpot[jpName]);
                if (data.jackpot[jpName]) {
                    var levelData = data.jackpot[jpName].toString().split('_');
                    _this.currentJackpotLevel[name] = levelData.length > 1 ? Number(levelData[1]) : 1;
                    _this.currentJackpotData[name] = Number(data.jackpot[jpName]);
                    _this.initJackpotData[jpName] = Number(data.jackpot[jpName]);
                }
            });
        }
    },
    jackpotUpdate: function jackpotUpdate(data) {
        var _this2 = this;

        if (data) {
            Object.keys(data).map(function (jpName) {
                var name = jpName.replace(_this2.JP_Prefix, '');
                _this2.callbackJackpotUpdate(name, data[jpName]);
            });
        }
    },
    renderJackpotBet: function renderJackpotBet() {
        this.renderJackpot(300);
    },
    renderJackpot: function renderJackpot() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

        if (this.isPausedJP) return;
        var _node$gSlotDataStore$ = this.node.gSlotDataStore.slotBetDataStore.data,
            currentBetData = _node$gSlotDataStore$.currentBetData,
            steps = _node$gSlotDataStore$.steps;

        var stepIndex = findKeyByValue(steps, currentBetData).toString();

        // Check & Play anim jackpot multiply
        this.playAnimMultiply(stepIndex, time);

        this.renderJP({
            node: this.grand,
            value: this.jackpotData[stepIndex + this.transformJPName(this.JP_Names[0])],
            time: time,
            stepIndex: stepIndex
        });

        if (this.JP_Names.length > 1) {
            this.renderJP({
                node: this.mini,
                value: this.jackpotData[stepIndex + this.transformJPName(this.JP_Names[1])],
                time: time,
                stepIndex: stepIndex
            });
            this.renderJP({
                node: this.minor,
                value: this.jackpotData[stepIndex + this.transformJPName(this.JP_Names[2])],
                time: time,
                stepIndex: stepIndex
            });
            this.renderJP({
                node: this.major,
                value: this.jackpotData[stepIndex + this.transformJPName(this.JP_Names[3])],
                time: time,
                stepIndex: stepIndex
            });
        }
    },
    playAnimMultiply: function playAnimMultiply(stepIndex, time) {
        if (this.jackpotMultiply) {
            var jpLevel = stepIndex + this.transformJPName(this.JP_Names[0]);
            if (jpLevel && this.newJackpotLevel[jpLevel] && this.newJackpotLevel[jpLevel] > 1 && this.newJackpotLevel[jpLevel] <= this.maxMultiply) {
                var isDiffJPMultiply = this.currentJackpotLevel[jpLevel] && this.newJackpotLevel[jpLevel] && this.currentJackpotLevel[jpLevel] !== this.newJackpotLevel[jpLevel] && this.newJackpotLevel[jpLevel] > 1;

                var isDiffJPValue = this.currentJackpotLevel[jpLevel] && this.newJackpotLevel[jpLevel] && this.currentJackpotLevel[jpLevel] == this.newJackpotLevel[jpLevel] && this.newJackpotLevel[jpLevel] > 1 && this.currentJackpotData[jpLevel] && this.jackpotData[jpLevel] && this.currentJackpotData[jpLevel] > this.jackpotData[jpLevel];

                if (isDiffJPMultiply || isDiffJPValue) {
                    this.grand.onUpdateValue(this.jackpotData[jpLevel] / this.newJackpotLevel[jpLevel], time, false);
                    this.currentJackpotLevel = Object.assign({}, this.newJackpotLevel);
                    this.currentJackpotData = Object.assign({}, this.jackpotData);
                }
                this.jackpotMultiply.emit('PLAY_ANIM_MULTIPLY', this.newJackpotLevel[jpLevel], time);
            } else {
                this.stopAnimMultiply();
            }
        }
    },
    stopAnimMultiply: function stopAnimMultiply() {
        if (this.jackpotMultiply) this.jackpotMultiply.emit('STOP_ANIM_MULTIPLY');
    },
    transformJPName: function transformJPName(name) {
        if (name && name.length > 0) {
            return "_" + name;
        }
        return "";
    },
    renderJP: function renderJP(_ref) {
        var node = _ref.node,
            value = _ref.value,
            _ref$time = _ref.time,
            time = _ref$time === undefined ? 3000 : _ref$time,
            stepIndex = _ref.stepIndex;

        if (node) {
            var allowRunDown = stepIndex != node.stepIndex;
            node.onUpdateValue(value, time, allowRunDown);
            node.stepIndex = stepIndex;
        }
    },
    pauseRenderJP: function pauseRenderJP() {
        this.isPausedJP = true;
    },
    resumeRenderJP: function resumeRenderJP() {
        this.isPausedJP = false;
        this.renderJackpot();
    },
    callbackJackpotUpdate: function callbackJackpotUpdate(jackpotID, data) {
        if (jackpotID) {
            var currencyPrefix = this._getCurrencyPrefix();
            if (currencyPrefix && !jackpotID.includes(currencyPrefix)) return;
            jackpotID = jackpotID.toString().replace(currencyPrefix, '');
            this.jackpotData[jackpotID] = Number(data);
            var levelData = data.toString().split('_');
            this.newJackpotLevel[jackpotID] = levelData.length > 1 ? Number(levelData[1]) : 1;
        }
        this.renderJackpot();
    },
    _getCurrencyPrefix: function _getCurrencyPrefix() {
        if (!this.node.gSlotDataStore || !this.node.gSlotDataStore.currencyCode) return '';
        var currencyCode = this.node.gSlotDataStore.currencyCode;
        var defaultCurrency = this.node.config.DEFAULT_CURRENCY || 'VND';
        var currencyPrefix = !currencyCode || defaultCurrency === currencyCode ? '' : currencyCode + "_";
        return currencyPrefix;
    },
    updateValueJP: function updateValueJP(value) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _node$gSlotDataStore$2 = this.node.gSlotDataStore.slotBetDataStore.data,
            steps = _node$gSlotDataStore$2.steps,
            currentBetData = _node$gSlotDataStore$2.currentBetData;

        var stepIndex = findKeyByValue(steps, currentBetData).toString();
        var node = void 0;
        switch (type) {
            case 0:
                node = this.grand;
                break;
            case 1:
                node = this.major;
                break;
            case 3:
                node = this.minor;
                break;
            case 4:
                node = this.mini;
                break;
            default:
                node = this.grand;
                break;
        }
        this.renderJP({
            node: node,
            value: value,
            time: 300,
            stepIndex: stepIndex
        });
    },
    _getIndexJpByType: function _getIndexJpByType(jpType) {
        return this.indexJp[jpType];
    },
    _getLabelByType: function _getLabelByType(jpType) {
        var jpName = jpType.toLowerCase();
        if (this[jpName]) {
            return this[jpName];
        }
        return this.grand;
    },
    isValidJackpotData: function isValidJackpotData(data) {
        var _data$ = data[0],
            jpId = _data$.jpId,
            serverCurrency = _data$.c;

        if (serverCurrency && serverCurrency != this.node.gSlotDataStore.currencyCode || !this.initJackpotData[jpId]) return false;
        return true;
    },
    noticeJackpotWin: function noticeJackpotWin(data) {
        var _this3 = this;

        if (!this.isValidJackpotData(data)) return;
        var jpId = data[0].jpId;

        var prefixLength = this.node.config.JP_PREFIX_EVENT.length;
        var jpIndex = jpId.charAt(prefixLength);
        // let jpType = jpId.slice(prefixLength + 2);
        var _node$gSlotDataStore$3 = this.node.gSlotDataStore.slotBetDataStore.data,
            steps = _node$gSlotDataStore$3.steps,
            currentBetData = _node$gSlotDataStore$3.currentBetData;

        var betIndex = findKeyByValue(steps, currentBetData).toString();

        if (jpIndex === betIndex) {
            this.pauseRenderJP();
            var time = this.node.config.TIME_SHOW_JACKPOT_EXPLOSION || 3;
            this._callbackPauseJackpotWin = function () {
                _this3._callbackPauseJackpotWin = null;
                _this3.resumeRenderJP();
            };
            this.scheduleOnce(this._callbackPauseJackpotWin, time);
        }
    },
    playJackpotExplosion: function playJackpotExplosion(data, callback) {
        if (!this.isValidJackpotData(data)) return;
        var _data$2 = data[0],
            jpId = _data$2.jpId,
            amt = _data$2.amt,
            dn = _data$2.dn,
            lv = _data$2.lv;

        var prefixLength = this.node.config.JP_PREFIX_EVENT.length;
        var jpIndex = jpId.charAt(prefixLength);
        var jpType = jpId.slice(prefixLength + 2);
        var jpAmount = 1 * amt;
        var _node$gSlotDataStore$4 = this.node.gSlotDataStore.slotBetDataStore.data,
            steps = _node$gSlotDataStore$4.steps,
            currentBetData = _node$gSlotDataStore$4.currentBetData;

        var betIndex = findKeyByValue(steps, currentBetData).toString();

        if (jpIndex === betIndex) {
            this._callbackNotiJp = callback;
            this.updateValueJP(jpAmount, 0);
            this.pauseRenderJP();
            if (lv && lv >= 1) {
                var jpLevel = jpIndex + this.transformJPName(jpType);
                this.newJackpotLevel[jpLevel] = 1;
                this.currentJackpotData[jpLevel] = Number(jpAmount);
                this.showAnimNoticeWinJP(jpAmount, dn, lv, jpType);
            } else {
                this.showAnimWinJp(jpType, jpAmount);
            }
            if (this._callbackPauseJackpotWin) {
                this._callbackPauseJackpotWin();
                this.unschedule(this._callbackPauseJackpotWin);
            }
        }
    },
    showAnimNoticeWinJP: function showAnimNoticeWinJP(jpAmount) {
        var dn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var _this4 = this;

        var lv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var jpType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        if (this.jackpotMultiply) this.jackpotMultiply.emit('SHOW_ANIM_NOTICE_WIN_JP', jpAmount, dn, lv, jpType);
        var time = this.node.config.TIME_SHOW_JACKPOT_EXPLOSION || 3;
        this._callbackHideJpWin = function () {
            _this4._callbackHideJpWin = null;
            _this4._callbackNotiJp && _this4._callbackNotiJp();
            _this4._callbackNotiJp = null;

            if (_this4.jackpotMultiply) _this4.jackpotMultiply.emit('RESET_ANIM_NOTICE');
            _this4.resumeRenderJP();
        };
        this.scheduleOnce(this._callbackHideJpWin, time);
    },
    showAnimWinJp: function showAnimWinJp(jpType, jpAmount) {
        this._playAnimWinJp(jpType, jpAmount);
    },
    _playAnimWinJp: function _playAnimWinJp(jpType, jpAmount) {
        var _this5 = this;

        var spine = void 0,
            labelNode = void 0,
            icon = void 0,
            particle = void 0;
        var time = this.node.config.TIME_SHOW_JACKPOT_EXPLOSION || 3;

        var _index = this._getIndexJpByType(jpType);
        spine = this.jackpotIconAnims[_index];
        icon = this.jackpotIcons[_index];
        particle = this.jackpotParticles[_index];
        labelNode = this._getLabelByType(jpType);

        if (!spine || !icon || !particle) {
            cc.warn("Have to implement enought anim for JP explosion", { spine: spine, icon: icon, particle: particle });
            return;
        }

        if (spine && icon) {
            icon.active = false;
            spine.node.active = true;
            spine._animationQueue = [];
            spine.setAnimation(0, "animation", false);
            spine.addAnimation(0, "animation", false);
        }

        if (labelNode && labelNode.active === true) {
            labelNode.initScale = labelNode.initScale ? labelNode.initScale : labelNode.scaleX;
            labelNode.getComponent(cc.Label).string = formatMoney(jpAmount);
            var dur = 0.75,
                repeatTime = Math.floor(time / (2 * dur));
            labelNode.actionZoom && labelNode.stopAction(labelNode.actionZoom);
            labelNode.actionZoom = cc.repeat(cc.sequence(cc.scaleTo(dur, labelNode.initScale + 0.2), cc.scaleTo(dur, labelNode.initScale)), repeatTime);
            labelNode.runAction(labelNode.actionZoom);
        }

        if (particle) {
            particle.node.active = true;
            particle.play();
        }

        this._callbackHideJpWin = function () {
            spine.node.active = false;
            icon.active = true;
            particle.node.active = false;
            _this5._callbackHideJpWin = null;
            _this5._callbackNotiJp && _this5._callbackNotiJp();
            _this5._callbackNotiJp = null;
            _this5.resumeRenderJP();
        };
        this.scheduleOnce(this._callbackHideJpWin, time);
    },
    stopJackpotExplosion: function stopJackpotExplosion() {
        if (this._callbackHideJpWin) {
            this.unschedule(this._callbackHideJpWin);
            this._callbackHideJpWin();
        }
    }
});

cc._RF.pop();