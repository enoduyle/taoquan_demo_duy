(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slotbase-v2/component/RenderedTextureFactory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ecf8lXXd9HLZM0HKQHcH2A', 'RenderedTextureFactory', __filename);
// cc-common/cc-slotbase-v2/component/RenderedTextureFactory.js

'use strict';

var SymbolContext = cc.Class({
    name: 'SymbolContext',
    properties: {
        symbolNode: cc.Node,
        spine: sp.Skeleton,
        symbolIndex: 0,
        symbolCode: ""
    }

});

var NormalSymbolContainer = cc.Class({
    name: 'NormalSymbolContainer',
    properties: {
        container: cc.Node,
        row: 2,
        col: 4,
        padding: 10,
        symbolList: {
            type: SymbolContext,
            default: []
        }
    }
});

var MegaSymbolData = cc.Class({
    name: 'MegaSymbolData',
    properties: {
        skeletonFile: sp.SkeletonData,
        symbolCode: ""
    }
});

var MegaSymbolContainer = cc.Class({
    name: 'MegaSymbolContainer',
    properties: {
        symbolNode: cc.Node,
        spine: sp.Skeleton,
        currentSymbolCode: '',
        megaSymbols: {
            type: MegaSymbolData,
            default: []
        }
    }
});
var SymbolDataType = cc.Enum({
    NORMAL: 0,
    MEGA: 1
});
var SymbolSpriteData = cc.Class({
    name: 'SymbolSpriteData',
    properties: {
        spriteFrame: cc.SpriteFrame,
        width: 100,
        height: 100,
        symbolType: {
            type: SymbolDataType,
            default: SymbolDataType.NORMAL
        },
        symbolCode: '',
        index: 0,
        isRendering: true
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        turnOnAtStart: false,
        fps: 30,
        rootContainer: cc.Node,
        renderCamera: cc.Camera,
        padding: 10,
        renderTexture: {
            type: cc.RenderTexture,
            default: null,
            visible: false
        },

        normalSymbolContainer: {
            type: NormalSymbolContainer,
            default: null
        },

        megaSymbolContainer: {
            type: MegaSymbolContainer,
            default: null
        },

        IsEnable: {
            get: function get() {
                return this._isEnable;
            },
            set: function set(value) {
                this._isEnable = value;
            },


            visible: false
        },

        IsPlayingMegaSymbol: {
            get: function get() {
                return this._isPlayingMegaSymbol;
            },

            visible: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._spriteDatabase = [];
        this._isEnable = false;
        this._standartFps = 60;
        this._tick = 0;
        this._isPlayingMegaSymbol = false;
        cc.log("Load Rendered Texture System");
    },
    start: function start() {
        this.renderTexture = new cc.RenderTexture();

        var spriteCount = this.normalSymbolContainer.symbolList.length + 1;
        cc.log('Total Sprite Frame in Render Texture: ' + spriteCount);
        for (var i = 0; i < this.normalSymbolContainer.symbolList.length; i++) {
            var symbolSpriteData = new SymbolSpriteData();
            symbolSpriteData.spriteFrame = new cc.SpriteFrame();
            symbolSpriteData.symbolCode = this.normalSymbolContainer.symbolList[i].symbolCode;
            symbolSpriteData.width = this.normalSymbolContainer.symbolList[i].symbolNode.width;
            symbolSpriteData.height = this.normalSymbolContainer.symbolList[i].symbolNode.height;
            symbolSpriteData.symbolType = SymbolDataType.NORMAL;
            symbolSpriteData.index = this.normalSymbolContainer.symbolList[i].symbolIndex;
            symbolSpriteData.isRendering = true;
            this._spriteDatabase.push(symbolSpriteData);
        }
        var megaSymbolSpriteData = new SymbolSpriteData();
        megaSymbolSpriteData.spriteFrame = new cc.SpriteFrame();
        megaSymbolSpriteData.symbolCode = 'M';
        megaSymbolSpriteData.width = this.megaSymbolContainer.symbolNode.width * 4 / 5;
        megaSymbolSpriteData.height = this.megaSymbolContainer.symbolNode.height;
        megaSymbolSpriteData.symbolType = SymbolDataType.MEGA;
        megaSymbolSpriteData.isRendering = true;
        this._spriteDatabase.push(megaSymbolSpriteData);
        this.snapShot();
        this.turnOffRenderTextureSystem();
        if (this.turnOnAtStart) {
            this.turnOnRenderTextureSystem();
        }
        // this.snapShot();
        // cc.log(this._spriteDatabase);
        // cc.log(this.renderTexture);
        this.renderCamera.node.active = false;
    },
    turnOffRenderTextureSystem: function turnOffRenderTextureSystem() {
        this.stopAllNormalSymbolAnimation();
        this.stopMegaSymbolAnimation();
        this._isEnable = false;
    },
    turnOnRenderTextureSystem: function turnOnRenderTextureSystem() {
        this._isEnable = true;
    },
    setDefaultPerformance: function setDefaultPerformance() {
        this.fps = 60;
    },
    setLowPerformance: function setLowPerformance() {
        this.fps = 30;
    },
    getRTSpriteFrame: function getRTSpriteFrame(symbolCode) {
        var skinName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var isMega = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var spriteFrame = null;
        var _symbolCode = symbolCode;

        if (isMega && this._isEnable) {
            if (symbolCode != this.megaSymbolContainer.currentSymbolCode) {
                this.setUpMegaSymbol(symbolCode);
            }
            _symbolCode = 'M';
        }

        for (var i = 0; i < this._spriteDatabase.length; i++) {
            if (this._spriteDatabase[i].symbolCode == _symbolCode && this._isEnable) {
                if (this._spriteDatabase[i].symbolType == SymbolDataType.NORMAL) {
                    this.playNormalSymbolAnimation(_symbolCode, skinName, true);
                } else {
                    this.playMegaSymbolAnimation(skinName, true);
                }
                spriteFrame = this._spriteDatabase[i].spriteFrame;
                break;
            }
        }
        return spriteFrame;
    },
    setUpMegaSymbol: function setUpMegaSymbol(symbolCode) {
        for (var i = 0; i < this.megaSymbolContainer.megaSymbols.length; i++) {
            if (this.megaSymbolContainer.megaSymbols[i].symbolCode == symbolCode) {
                this.megaSymbolContainer.spine.node.active = true;
                if (this.megaSymbolContainer.currentSymbolCode != symbolCode) {
                    // this.megaSymbolContainer.spine.clearTracks();
                    this.megaSymbolContainer.spine.skeletonData = null;
                    this.megaSymbolContainer.spine.skeletonData = this.megaSymbolContainer.megaSymbols[i].skeletonFile;
                    this.megaSymbolContainer.currentSymbolCode = symbolCode;
                    this._isPlayingMegaSymbol = false;
                }
                break;
            }
        }
    },
    playMegaSymbolAnimation: function playMegaSymbolAnimation() {
        var skinName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var isloop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.megaSymbolContainer.spine.node.active = true;
        this.megaSymbolContainer.spine.paused = false;
        this.megaSymbolContainer.spine.node.angle = 180;
        this.megaSymbolContainer.symbolNode.opacity = 255;
        if (this._isPlayingMegaSymbol == false) {
            if (skinName && skinName !== '') {
                this.megaSymbolContainer.spine.setSkin(skinName);
            }
            this.megaSymbolContainer.spine.setAnimation(0, 'animation', isloop);
            this._isPlayingMegaSymbol = true;
        }
        for (var i = 0; i < this._spriteDatabase.length; i++) {
            if (this._spriteDatabase[i].symbolType == SymbolDataType.MEGA) {
                this._spriteDatabase[i].isRendering = true;
                break;
            }
        }
    },
    stopMegaSymbolAnimation: function stopMegaSymbolAnimation() {
        // this.megaSymbolContainer.spine.clearTracks();
        this.megaSymbolContainer.spine.paused = true;
        this.megaSymbolContainer.spine.node.active = false;
        this.megaSymbolContainer.symbolNode.opacity = 0;
        this._isPlayingMegaSymbol = false;
        for (var i = 0; i < this._spriteDatabase.length; i++) {
            if (this._spriteDatabase[i].symbolType == SymbolDataType.MEGA) {
                this._spriteDatabase[i].isRendering = false;
                break;
            }
        }
    },
    playNormalSymbolAnimation: function playNormalSymbolAnimation(symbolCode) {
        var skinName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var isloop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        for (var i = 0; i < this.normalSymbolContainer.symbolList.length; i++) {
            if (this.normalSymbolContainer.symbolList[i].symbolCode == symbolCode) {
                if (this.normalSymbolContainer.symbolList[i].spine) {
                    this.normalSymbolContainer.symbolList[i].spine.node.active = true;
                    this.normalSymbolContainer.symbolList[i].spine.node.paused = false;
                    this.normalSymbolContainer.symbolList[i].spine.node.angle = 180;
                    // this.normalSymbolContainer.symbolList[i].spine.clearTracks();
                    if (skinName && skinName !== '') {
                        this.normalSymbolContainer.symbolList[i].spine.setSkin(skinName);
                    }
                    this.normalSymbolContainer.symbolList[i].spine.setAnimation(0, 'animation', isloop);
                } else {
                    if (this.normalSymbolContainer.symbolList[i].symbolNode.children) {
                        var childNode = this.normalSymbolContainer.symbolList[i].symbolNode.children[0];
                        if (childNode) {
                            childNode.active = true;
                        }
                    }
                }

                break;
            }
        }

        for (var _i = 0; _i < this._spriteDatabase.length; _i++) {
            if (this._spriteDatabase[_i].symbolType == SymbolDataType.NORMAL) {
                if (this._spriteDatabase[_i].symbolCode == symbolCode) {
                    this._spriteDatabase[_i].isRendering = true;
                    break;
                }
            }
        }
    },
    stopNormalSymbolAnimation: function stopNormalSymbolAnimation(symbolCode) {
        for (var i = 0; i < this.normalSymbolContainer.symbolList.length; i++) {
            if (this.normalSymbolContainer.symbolList[i].symbolCode == symbolCode) {
                if (this.normalSymbolContainer.symbolList[i].spine) {
                    // this.normalSymbolContainer.symbolList[i].spine.clearTracks();
                    this.normalSymbolContainer.symbolList[i].spine.node.paused = true;
                    this.normalSymbolContainer.symbolList[i].spine.node.active = false;
                } else {
                    if (this.normalSymbolContainer.symbolList[i].symbolNode.children) {
                        var childNode = this.normalSymbolContainer.symbolList[i].symbolNode.children[0];
                        if (childNode) {
                            childNode.active = false;
                        }
                    }
                }
                break;
            }
        }

        for (var _i2 = 0; _i2 < this._spriteDatabase.length; _i2++) {
            if (this._spriteDatabase[_i2].symbolType == SymbolDataType.NORMAL) {
                if (this._spriteDatabase[_i2].symbolCode == symbolCode) {
                    this._spriteDatabase[_i2].isRendering = false;
                    break;
                }
            }
        }
    },
    playAllNormalSymbolAnimation: function playAllNormalSymbolAnimation() {
        var isLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        for (var i = 0; i < this.normalSymbolContainer.symbolList.length; i++) {

            if (this.normalSymbolContainer.symbolList[i].spine) {
                this.normalSymbolContainer.symbolList[i].spine.node.active = true;
                this.normalSymbolContainer.symbolList[i].spine.node.angle = 180;
                // this.normalSymbolContainer.symbolList[i].spine.clearTracks();
                this.normalSymbolContainer.symbolList[i].spine.setAnimation(0, 'animation', isLoop);
            } else {
                if (this.normalSymbolContainer.symbolList[i].symbolNode.children) {
                    var childNode = this.normalSymbolContainer.symbolList[i].symbolNode.children[0];
                    if (childNode) {
                        childNode.active = true;
                    }
                }
            }
        }

        for (var _i3 = 0; _i3 < this._spriteDatabase.length; _i3++) {
            if (this._spriteDatabase[_i3].symbolType == SymbolDataType.NORMAL) {
                this._spriteDatabase[_i3].isRendering = true;
            }
        }
    },
    stopAllNormalSymbolAnimation: function stopAllNormalSymbolAnimation() {
        for (var i = 0; i < this.normalSymbolContainer.symbolList.length; i++) {
            if (this.normalSymbolContainer.symbolList[i].spine) {
                // this.normalSymbolContainer.symbolList[i].spine.clearTracks();
                this.normalSymbolContainer.symbolList[i].spine.node.active = false;
            } else {
                if (this.normalSymbolContainer.symbolList[i].symbolNode.children) {
                    var childNode = this.normalSymbolContainer.symbolList[i].symbolNode.children[0];
                    if (childNode) {
                        childNode.active = false;
                    }
                }
            }
        }

        for (var _i4 = 0; _i4 < this._spriteDatabase.length; _i4++) {
            if (this._spriteDatabase[_i4].symbolType == SymbolDataType.NORMAL) {
                this._spriteDatabase[_i4].isRendering = false;
            }
        }
    },
    snapShot: function snapShot() {
        this.renderTexture.initWithSize(this.rootContainer.width, this.rootContainer.height);
        this.renderCamera.targetTexture = this.renderTexture;
        this.renderCamera.render(this.rootContainer);
        var normalPadding = this.normalSymbolContainer.padding;
        for (var i = 0; i < this._spriteDatabase.length; i++) {
            if (this._spriteDatabase[i].isRendering == true) {
                if (this._spriteDatabase[i].symbolType == SymbolDataType.NORMAL) {
                    var normalIndex = this._spriteDatabase[i].index;
                    var width = this._spriteDatabase[i].width;
                    var height = this._spriteDatabase[i].height;
                    var colIndex = normalIndex % this.normalSymbolContainer.col;
                    var rowIndex = Math.floor(normalIndex / this.normalSymbolContainer.col);
                    var preWidth = colIndex == 0 ? 0 : this._spriteDatabase[normalIndex - 1].width;

                    var preHeight = rowIndex == 0 ? 0 : this._spriteDatabase[normalIndex - this.normalSymbolContainer.col].height;

                    var x = normalPadding + colIndex * (preWidth + normalPadding);
                    var y = this.megaSymbolContainer.symbolNode.height + normalPadding + rowIndex * (preHeight + normalPadding);
                    this._spriteDatabase[i].spriteFrame.setTexture(this.renderTexture, new cc.Rect(x, y, width, height));
                } else {
                    var _x8 = (this.megaSymbolContainer.symbolNode.width - this._spriteDatabase[i].width) / 2;
                    var _y = 0;
                    var _width = this._spriteDatabase[i].width;
                    var _height = this._spriteDatabase[i].height;
                    this._spriteDatabase[i].spriteFrame.setTexture(this.renderTexture, new cc.Rect(_x8, _y, _width, _height));
                }
            }
        }
    },
    update: function update() {
        if (this._isEnable == true) {
            this._tick++;
            if (this._tick >= this._standartFps / this.fps) {
                this._tick = 0;
                this.snapShot();
            }
        }
    },
    onDestroy: function onDestroy() {
        if (this._spriteDatabase.length > 0) {
            for (var i = 0; i < this._spriteDatabase.length; i++) {
                this._spriteDatabase[i] = null;
            }
        }
        this._spriteDatabase = null;
        if (this.renderCamera != null) {
            this.renderCamera.targetTexture = null;
        }
        if (this.renderTexture != null) {
            this.renderTexture.destroy();
        }
        this.normalSymbolContainer = null;
        this.megaSymbolContainer = null;
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
        //# sourceMappingURL=RenderedTextureFactory.js.map
        