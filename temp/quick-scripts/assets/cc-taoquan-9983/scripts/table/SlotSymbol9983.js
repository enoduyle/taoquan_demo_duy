(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/table/SlotSymbol9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b6709U6sLZKRJ1h3sLfAKgn', 'SlotSymbol9983', __filename);
// cc-taoquan-9983/scripts/table/SlotSymbol9983.js

'use strict';

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
    extends: require('SlotSymbol'),

    properties: {
        subSymbol: cc.Node,
        smallSubSymbol: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this.node.addSubSymbol = this.addSubSymbol.bind(this);
        this.node.removeSubSymbol = this.removeSubSymbol.bind(this);
        this.node.addSmallSubSymbol = this.addSmallSubSymbol.bind(this);
        this.node.showSmallSubSymbol = this.showSmallSubSymbol.bind(this);
        this.node.addWildSymbol = this.addWildSymbol.bind(this);
        this.node.removeWildSymbol = this.removeWildSymbol.bind(this);
        this.node.changeToFakeSymbol = this.changeToFakeSymbol.bind(this);

        this.staticSymbolSprite = this.staticSymbol.getComponent(cc.Sprite);
    },
    changeToSymbol: function changeToSymbol(symbolName) {
        this.isFakeSymbol = false;
        if (symbolName == "1") {
            this.isFakeSymbol = true;
            this.node.symbol = symbolName;
        }
        this._super(symbolName);
        this.setIndex();
    },
    setIndex: function setIndex() {
        if (this.node.symbol == "A") {
            this.node.zIndex = 2;
        } else if (this.node.symbol[0] == "K") {
            this.node.zIndex = 1;
        } else {
            this.node.zIndex = 0;
        }
    },
    addSubSymbol: function addSubSymbol(symbolName) {
        if (this.isFakeSymbol) return;
        var asset = this.assets[symbolName];
        this.subSymbol.active = true;
        this.smallSubSymbol.active = false;
        this.smallSubSymbol.getComponent(cc.Sprite).spriteFrame = asset;
        this.subSymbol.getComponent(cc.Sprite).spriteFrame = asset;
    },
    showSmallSubSymbol: function showSmallSubSymbol(symbolName) {
        if (this.isFakeSymbol) return;
        var asset = this.assets[symbolName];
        this.smallSubSymbol.getComponent(cc.Sprite).spriteFrame = asset;
        this.subSymbol.getComponent(cc.Sprite).spriteFrame = asset;
        this.subSymbol.active = false;
        this.smallSubSymbol.active = true;
    },
    addSmallSubSymbol: function addSmallSubSymbol() {
        var _this = this;

        if (this.isFakeSymbol) return;
        this.subSymbol.stopAllActions();
        var runTime = 0.2;
        this.smallSubSymbol.active = false;
        this.subSymbol.active = true;
        this.subSymbol.runAction(cc.sequence(cc.spawn(cc.scaleTo(runTime, 0.5), cc.moveTo(runTime, this.smallSubSymbol.x, this.smallSubSymbol.y)), cc.callFunc(function () {
            _this.subSymbol.scale = 1;
            _this.subSymbol.setPosition(0, 0);
            _this.smallSubSymbol.active = true;
            _this.subSymbol.active = false;
        })));
    },
    removeSubSymbol: function removeSubSymbol() {
        this.subSymbol.active = false;
        this.smallSubSymbol.active = false;
    },
    enableHighlight: function enableHighlight() {
        this.staticSymbol.opacity = 0;
        this.subSymbol.opacity = 0;
        this.smallSubSymbol.opacity = 0;
    },
    blinkHighlight: function blinkHighlight() {
        this.node.opacity = 255;
        this.staticSymbol.stopAllActions();
        this.staticSymbol.opacity = 255;
        this.staticSymbol.active = true;
        this.subSymbol.opacity = 255;
        this.smallSubSymbol.opacity = 255;
    },
    disableHighlight: function disableHighlight() {
        //maybe we will handle the big symbol from here, so it will never be dim
        this.staticSymbol.stopAllActions();
        this.staticSymbol.opacity = 100;
        this.subSymbol.opacity = 100;
        this.smallSubSymbol.opacity = 100;
    },
    reset: function reset() {
        this.staticSymbol.stopAllActions();
        this.bigSymbol = false;
        this.node.opacity = 255;
        this.staticSymbol.opacity = 255;
        this.subSymbol.opacity = 255;
        this.smallSubSymbol.opacity = 255;
    },
    addWildSymbol: function addWildSymbol(wildSymbol) {
        wildSymbol.active = true;
        wildSymbol.position = cc.v2(0, 0);
        this.staticSymbol.addChild(wildSymbol);
        var skeleton = wildSymbol.getComponent(sp.Skeleton);
        skeleton.setSkin(listWildAnim[this.node.symbol]);
        skeleton.setSlotsToSetupPose();
        skeleton.setAnimation(0, 'animation', true);
        this.staticSymbolSprite.spriteFrame = null;
    },
    removeWildSymbol: function removeWildSymbol(wildSymbol) {
        this.staticSymbol.removeChild(wildSymbol);
        this.staticSymbolSprite.spriteFrame = this.assets[this.node.symbol];
    },
    changeToFakeSymbol: function changeToFakeSymbol(symbolName) {
        this.staticSymbolSprite.spriteFrame = this.assets[symbolName];
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
        //# sourceMappingURL=SlotSymbol9983.js.map
        