(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/table/SlotSymbolPayline9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b116byy+H1KubEtnChCrg+y', 'SlotSymbolPayline9983', __filename);
// cc-taoquan-9983/scripts/table/SlotSymbolPayline9983.js

'use strict';

var symbolSpines = cc.Class({
    name: 'symbolSpines9983',
    properties: {
        name: {
            default: ''
        },
        spine: {
            type: sp.SkeletonData,
            default: null
        }
    }
});

var symbolStatic = cc.Class({
    name: 'synmbolStatic9983',
    properties: {
        name: {
            default: ''
        },
        static: {
            type: cc.SpriteFrame,
            default: null
        }
    }
});

var listWildAnim = {
    'K': 'skin0',
    'K1': 'skin1',
    'K2': 'skin2',
    'K3': 'skin3',
    'K4': 'skin4',
    'K5': 'skin5',
    'K6': 'skin6',
    'K7': 'skin7'
};

cc.Class({
    extends: require('SlotSymbolPayline'),
    properties: {
        spineList: {
            default: [],
            type: [symbolSpines]
        },
        symbolList: {
            default: [],
            type: [symbolStatic]
        },
        spine: cc.Node,
        static: cc.Node,
        winEff: cc.Node,
        subSymbol1: cc.Node,
        subSymbol2: cc.Node
    },
    onLoad: function onLoad() {
        this._super();
        this.node.init = this.init.bind(this);
        this.node.remove = this.remove.bind(this);
        this.node.playAnimationSubSymbol = this.playAnimationSubSymbol.bind(this);
        this.node.hideAnimationSubSymbol = this.hideAnimationSubSymbol.bind(this);
        this.node.playWinLineEffect = this.playWinLineEffect.bind(this);
        this.node.hideWinLineEffect = this.hideWinLineEffect.bind(this);
        this.node.isSpineSymbol = this.isSpineSymbol.bind(this);
    },
    init: function init(symbolName) {
        var skeData = this.findSymbolSpineData(symbolName);
        this.spine.active = false;
        this.static.active = false;
        this.subSymbol1.active = false;
        this.subSymbol2.active = false;
        this.symbolName = symbolName;
        this.node.name = symbolName;
        if (skeData) {
            this.spine.getComponent(sp.Skeleton).skeletonData = skeData.spine;
            if (this.symbolName[0] == 'K') {
                this.spine.getComponent(sp.Skeleton).setSkin(listWildAnim[this.symbolName]);
                this.spine.getComponent(sp.Skeleton).setSlotsToSetupPose();
            }
            // this.spine.getComponent(sp.Skeleton).setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
        }
        var sprData = this.findSymbolStaticData(symbolName);
        if (sprData) {
            this.static.getComponent(cc.Sprite).spriteFrame = sprData.static;
        }
        this.setIndex();
    },
    isSpineSymbol: function isSpineSymbol() {
        return this.findSymbolSpineData(this.symbolName) !== null;
    },
    setIndex: function setIndex() {
        if (this.symbolName == "A") {
            this.node.zIndex = 2;
        } else if (this.symbolName[0] == "K") {
            this.node.zIndex = 1;
        } else {
            this.node.zIndex = 0;
        }
    },
    hideAnimationSubSymbol: function hideAnimationSubSymbol() {
        this.subSymbol1.active = false;
        this.subSymbol2.active = false;
    },
    playAnimationSubSymbol: function playAnimationSubSymbol(data) {
        if (this.node.modeTurbo == true) {
            this.static.active = true;
            if (data == '0') {
                this.subSymbol1.active = true;
            } else {
                this.subSymbol2.active = true;
            }
            this.winEff.opacity = 255;
            return;
        }
        this.spine.active = false;
        this.static.active = true;
        if (data == '0') {
            this.subSymbol1.active = true;
            this.subSymbol1.getComponent(sp.Skeleton).setAnimation(0, 'animation', false);
        } else {
            this.subSymbol2.active = true;
            this.subSymbol2.getComponent(sp.Skeleton).setAnimation(0, 'animation', false);
        }
    },
    playWinLineEffect: function playWinLineEffect() {
        this.winEff.opacity = 255;
        this.node.opacity = 255;
    },
    hideWinLineEffect: function hideWinLineEffect() {
        this.winEff.opacity = 0;
        this.node.opacity = 0;
    },
    playAnimation: function playAnimation() {
        var isBlink = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.subSymbol1.active = false;
        this.subSymbol2.active = false;
        if (isBlink == true && this.symbolName[0] != 'K') {
            this.static.active = true;
            this.winEff.opacity = 255;
            return;
        }
        if (this.findSymbolSpineData(this.symbolName)) {
            this.setIndex();
            this.spine.active = true;
            this.spine.opacity = 255;
            if (this.symbolName[0] == 'K') {
                this.spine.getComponent(sp.Skeleton).setSkin(listWildAnim[this.symbolName]);
                this.spine.getComponent(sp.Skeleton).setSlotsToSetupPose();
            }
            this.spine.getComponent(sp.Skeleton).setAnimation(0, 'animation', false);
        } else {
            this.static.active = true;
            this.spine.opacity = 255;
            var seq = cc.repeat(cc.sequence(cc.scaleTo(0.2, 1.05), cc.scaleTo(0.2, 0.95), cc.scaleTo(0.2, 1)), 2);
            this.static.runAction(seq);
        }
        this.winEff.opacity = 255;
    },
    stopAnimation: function stopAnimation() {
        this.static.stopAllActions();
        this.winEff.opacity = 0;
        this.static.active = false;
        this.spine.active = false;
        this.subSymbol1.active = false;
        this.subSymbol2.active = false;
    },
    findSymbolSpineData: function findSymbolSpineData(symbolName) {
        for (var i = 0; i < this.spineList.length; i++) {
            if (this.spineList[i].name == symbolName) return this.spineList[i];
        }
        return null;
    },
    findSymbolStaticData: function findSymbolStaticData(symbolName) {
        for (var i = 0; i < this.symbolList.length; i++) {
            if (this.symbolList[i].name == symbolName) return this.symbolList[i];
        }
        return null;
    },
    unuse: function unuse() {},
    reuse: function reuse(poolMng) {
        this.poolManager = poolMng;
    },
    remove: function remove() {
        this.node.stopAllActions();
        this.poolManager.put(this.node);
    },
    blinkHighlight: function blinkHighlight() {
        this.winEff.opacity = 255;
        this.node.opacity = 255;
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
        //# sourceMappingURL=SlotSymbolPayline9983.js.map
        