(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/GameMode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b1f859Y3kxMraJkR4kWX5Of', 'GameMode', __filename);
// cc-common/cc-slotbase-v2/component/GameMode.js

'use strict';

cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function onLoad() {
        this.node.init = this.init.bind(this);
        this.node.enter = this.enter.bind(this);
        this.node.exit = this.exit.bind(this);
        this.node.hide = this.hide.bind(this);
        this.node.show = this.show.bind(this);
        this.node.reset = this.reset.bind(this);
        this.node.stateUpdate = this.stateUpdate.bind(this);
        this.node.stateResume = this.stateResume.bind(this);
        this.node.resetCallbackWhenHide = this.resetCallbackWhenHide.bind(this);
    },
    init: function init(mainDirector) {
        var isActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.node.mainDirector = mainDirector;
        this.node.emit('GAME_INIT');
        this.node.opacity = 0;
        this.node.active = false;
        if (isActive) {
            this.node.opacity = 255;
            this.node.active = true;
        }
    },
    stateResume: function stateResume(callback) {
        this.node.emit('GAME_RESUME');

        if (callback && typeof callback == "function") {
            callback();
        }
    },
    stateUpdate: function stateUpdate(callback) {
        this.node.emit('GAME_UPDATE');

        if (callback && typeof callback == "function") {
            callback();
        }
    },

    //Show have callback to transition other mode out
    show: function show(callback) {
        this.node.opacity = 255;
        this.node.emit('GAME_SHOW');
        if (callback && typeof callback == "function") {
            callback();
        }
    },
    exit: function exit() {
        if (this.callBackWhenHide && typeof this.callBackWhenHide == "function") {
            this.callBackWhenHide();
            this.callBackWhenHide = null;
        }
        this.hide();
        this.node.emit('GAME_EXIT');
        this.node.active = false;
    },
    hide: function hide(callback) {
        this.node.opacity = 0;
        this.node.emit('GAME_HIDE');
        if (callback && typeof callback == "function") {
            callback();
        }
    },
    enter: function enter(data, callback) {
        this.node.active = true;
        this.show();
        this.callBackWhenHide = callback;
        this.node.emit('GAME_ENTER', data);
    },
    reset: function reset(callback) {
        this.node.emit('GAME_RESET');

        if (callback && typeof callback == "function") {
            callback();
        }
    },
    resetCallbackWhenHide: function resetCallbackWhenHide() {
        if (this.callBackWhenHide && typeof this.callBackWhenHide == "function") {
            this.callBackWhenHide = null;
        }
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
        //# sourceMappingURL=GameMode.js.map
        