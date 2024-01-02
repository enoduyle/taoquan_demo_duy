"use strict";
cc._RF.push(module, '51011OjsmlLrp4fU2Zm9qpX', 'betCard');
// cc-common/cc-share-v1/common/viewComponent/betCard.js

'use strict';

var Points = ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'MC', 'JC', 'QC', 'KC', 'AR', '2R', '3R', '4R', '5R', '6R', '7R', '8R', '9R', 'MR', 'JR', 'QR', 'KR', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'MH', 'JH', 'QH', 'KH', 'AB', '2B', '3B', '4B', '5B', '6B', '7B', '8B', '9B', 'MB', 'JB', 'QB', 'KB'];

cc.Class({
    extends: cc.Component,

    properties: {
        // nodes
        cardBG: cc.Sprite,
        mainPic: cc.Sprite,
        // resources
        cards: {
            default: [],
            type: cc.SpriteFrame
        },
        backBG: {
            default: [],
            type: cc.SpriteFrame
        },
        point: '',
        overlay: cc.Node
    },

    // use this for initialization
    init: function init(card) {
        var point = card.point,
            _card$isFaceUp = card.isFaceUp,
            isFaceUp = _card$isFaceUp === undefined ? false : _card$isFaceUp,
            _card$backStyle = card.backStyle,
            backStyle = _card$backStyle === undefined ? 0 : _card$backStyle;

        if (point) {
            this.mainPic.spriteFrame = this.cards[Points.indexOf(point)];
        }
        this.point = point;
        this.isFaceUp = isFaceUp;

        this.cardBG.spriteFrame = this.backBG[backStyle];

        this.handleFaceUp();
    },
    updateCard: function updateCard(card, noAnim) {
        var point = card.point,
            _card$isFaceUp2 = card.isFaceUp,
            isFaceUp = _card$isFaceUp2 === undefined ? false : _card$isFaceUp2;

        this.point = point;
        if (point) {
            this.mainPic.spriteFrame = this.cards[Points.indexOf(point)];
            if (isFaceUp) {
                this.revealUp(noAnim);
            }
        } else {
            this.mainPic.spriteFrame = this.backBG[0];
        }
    },
    scaleTo: function scaleTo(num) {
        this.node.scaleX = num;
        this.node.scaleY = num;
    },
    updatePoint: function updatePoint(point) {
        this.point = point;
        this.mainPic.spriteFrame = this.cards[Points.indexOf(point)];
    },
    handleFaceUp: function handleFaceUp() {
        this.mainPic.node.active = this.isFaceUp;
    },
    reveal: function reveal(noAnim) {
        var _this = this;

        this.isFaceUp = !this.isFaceUp;
        this.mainPic.node.active = true;

        if (noAnim) {
            this.handleFaceUp();
            return;
        }

        var _node$getContentSize = this.node.getContentSize(),
            height = _node$getContentSize.height;

        var actionBy = cc.scaleTo(0.2, 0, 1);
        var skewBy = cc.skewTo(0.2, height / 10, height / 10);
        var actionTo = cc.scaleTo(0.2, 1, 1);
        var skewTo = cc.skewTo(0.2, 0, 0);

        this.node.runAction(cc.sequence(cc.callFunc(function () {
            _this.node.runAction(actionBy);
            _this.node.runAction(skewBy);
        }), cc.delayTime(0.2), cc.callFunc(function () {
            _this.handleFaceUp();
        }), cc.callFunc(function () {
            _this.node.runAction(actionTo);
            _this.node.runAction(skewTo);
        })));
    },
    revealUp: function revealUp(noAnim) {
        if (!this.isFaceUp && this.point) {
            this.reveal(noAnim);
        }
    },
    showOverlay: function showOverlay(isActive) {
        this.overlay.active = isActive;
    }
});

cc._RF.pop();