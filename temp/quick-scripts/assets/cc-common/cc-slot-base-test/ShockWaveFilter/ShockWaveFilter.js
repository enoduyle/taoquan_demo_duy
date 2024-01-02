(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/ShockWaveFilter/ShockWaveFilter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd2bbb1UZLVIrLC8cf7PtJI5', 'ShockWaveFilter', __filename);
// cc-common/cc-slot-base-test/ShockWaveFilter/ShockWaveFilter.js

"use strict";

var _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dat = require('dat.gui');
cc.Class((_cc$Class = {
    extends: cc.Component,

    properties: {
        mainCamera: cc.Camera,
        inputCamera: cc.Camera,
        outputCamera: cc.Camera,
        sprite: cc.Sprite
    },

    onLoad: function onLoad() {
        var _sprite$node = this.sprite.node,
            width = _sprite$node.width,
            height = _sprite$node.height;

        this._center = Object.freeze(cc.v2(0, 0));
        this.uniforms = {
            filterArea: cc.v4(width, height, 0, 0),
            filterClamp: cc.v4(0.0, 0.0, 1.0, 1.0),
            center: cc.v2(width / 2, height / 2),
            amplitude: 3,
            wavelength: 900,
            brightness: 1.12,
            speed: 1800,
            radius: -1,
            time: 0
        };
        cc.director.on("PLAY_SHADER", this.play, this);
        cc.director.on("STOP_SHADER", this.stop, this);
        this.sprite.node.scaleY = cc.sys.isBrowser ? -1 : 1;
    },
    update: function update(dt) {
        if (!this.material) return;
        if (!this.isPlaying) return;
        this.uniforms.time += dt;
        this.material.setProperty('time', this.uniforms.time);
    },
    onDestroy: function onDestroy() {
        cc.director.off("PLAY_SHADER", this.play, this);
        cc.director.off("STOP_SHADER", this.stop, this);
    },
    export: function _export() {
        console.error(this.uniforms);
    },
    play: function play() {
        this._createTexture();
        this.inputCamera.node.active = true;
        this.inputCamera.targetTexture = this.renderTexture;

        this.mainCamera.node.active = false;
        this.mainCamera.node.active = false;

        this.outputCamera.node.active = true;
        this.sprite.node.active = true;
        this.isPlaying = true;
    },
    _createTexture: function _createTexture() {
        var _sprite$node2 = this.sprite.node,
            width = _sprite$node2.width,
            height = _sprite$node2.height;

        this.renderTexture = new cc.RenderTexture();
        this.renderTexture.initWithSize(width, height, cc.gfx.RB_FMT_D24S8);

        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this.renderTexture, new cc.Rect(0, 0, width, height));
        this.sprite.spriteFrame = spriteFrame;
        this.material = this.sprite.getMaterial(0);
        this.uniforms.time = 0;
        this._setUniforms();
    },
    stop: function stop() {
        this.mainCamera.node.active = true;
        this.inputCamera.node.active = false;
        this.outputCamera.node.active = false;
        this.sprite.node.active = false;
        this._tweenCenter && this._tweenCenter.stop();
        this._tweenCenter = null;
        this.isPlaying = false;
    },
    _setUniforms: function _setUniforms() {
        for (var key in this.uniforms) {
            this.material.setProperty(key, this.uniforms[key]);
        }
    },

    // /* //!test
    start: function start() {
        this._initTestGui();
    },
    _initTestGui: function _initTestGui() {
        var gui = new dat.GUI({ name: "Filter", width: 250 });
        gui.domElement.parentElement.style.zIndex = 1000;
        var folder = this._folder = gui.addFolder("Shockwave");

        folder.open();
        folder.add(this, "play");
        folder.add(this, "stop");
        folder.add(this, "export");
        folder.add(this.uniforms.center, "x", 0, 720, 1);
        folder.add(this.uniforms.center, "y", 0, 1280, 1);
        folder.add(this.uniforms, "time", 0, 2.5, 0.1);
        folder.add(this.uniforms, "radius", -100, 2000, 1);
        folder.add(this.uniforms, "wavelength", 2, 1000);
        folder.add(this.uniforms, "amplitude", 1, 50, 1);
        folder.add(this.uniforms, "brightness", .2, 2, .01);
        folder.add(this.uniforms, "speed", 0, 4000, 1);
        folder.add(this, "export");
    }
}, _defineProperty(_cc$Class, "export", function _export() {
    var data = {};
    this._folder.__controllers.forEach(function (control) {
        if (typeof control.initValue !== "function") {
            var property = control.property,
                object = control.object;

            data[property] = object[property];
        }
    });
    console.error(JSON.stringify(data));
    this.exportDataFile(JSON.stringify(data), config);
}), _defineProperty(_cc$Class, "exportDataFile", function exportDataFile(dataStr, fileName) {
    var type = fileName.split(".").pop();
    var dataUri = "data:application/" + type + ";charset=utf-8," + encodeURIComponent(dataStr);
    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
}), _cc$Class));

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
        //# sourceMappingURL=ShockWaveFilter.js.map
        