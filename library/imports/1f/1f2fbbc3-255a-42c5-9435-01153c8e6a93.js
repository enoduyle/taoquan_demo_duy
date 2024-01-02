"use strict";
cc._RF.push(module, '1f2fbvDJVpCxZQ1ARU8jmqT', 'InfoScreen');
// cc-common/cc-slotbase-v2/component/InfoScreen.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on("PLAY", this.play, this);
        this.node.on("HIDE", this.close, this);
        this.node.on("INIT", this.init, this);
        this.node.opacity = 0;
        this.onLoadExtended();
        this.node.active = false;
    },
    onLoadExtended: function onLoadExtended() {
        // override this if add more in onLoad
    },
    init: function init(mainDirector) {
        this.node.mainDirector = mainDirector;
    },
    play: function play(content, callback) {
        this.content = content;
        this.callback = callback;
        var instantly = content.instantly;

        this.instantly = instantly;
        this.node.active = true;
        this.enter();
        if (this.instantly == true) {
            this.show();
        } else {
            this.playOpeningAnimation();
        }
    },
    playOpeningAnimation: function playOpeningAnimation() {
        var _this = this;

        // TODO: override it with animation actions
        if (this._openingAction != null && this._openingAction.target != null) {
            this.node.stopAction(this._openingAction);
        }
        this._openingAction = cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this.show();
        }));
        this.node.runAction(this._openingAction);
    },
    playClosingAnimation: function playClosingAnimation() {
        var _this2 = this;

        // TODO: override it with animation actions
        if (this._closingAction != null && this._closingAction.target != null) {
            this.node.stopAction(this._closingAction);
        }
        this._closingAction = cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            _this2.resetNode();
            _this2.exit();
        }));
        this.node.runAction(this._closingAction);
    },
    show: function show() {
        this.node.opacity = 255;
    },
    enter: function enter() {
        // Overwrite this when extends

    },
    close: function close() {
        if (this.instantly == true) {
            this.resetNode();
            this.exit();
        } else {
            this.playClosingAnimation();
        }
    },
    resetNode: function resetNode() {},
    exit: function exit() {
        if (this.callback && typeof this.callback == "function") {
            this.node.emit("STOP");
            this.callback();
        }
        if (this._openingAction != null && this._openingAction.target != null) {
            this.node.stopAction(this._openingAction);
        }
        if (this._closingAction != null && this._closingAction.target != null) {
            this.node.stopAction(this._closingAction);
        }
        this._openingAction = null;
        this._closingAction = null;
        this.content = null;
        this.callback = null;
        this.node.opacity = 0;
        this.node.active = false;
    }
});

cc._RF.pop();