(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-share-v1/shader/shaderEffect/Gradient.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '882dcfHHgFE/o/tFokI6snn', 'Gradient', __filename);
// cc-common/cc-share-v1/shader/shaderEffect/Gradient.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Gradient = /** @class */ (function (_super) {
    __extends(Gradient, _super);
    function Gradient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.time = 0;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Gradient.prototype.start = function () {
        this.material = this.label.getMaterial(0);
        this.schedule(this.upd, 0, cc.macro.REPEAT_FOREVER, 1);
    };
    Gradient.prototype.upd = function () {
        this.time += 0.005;
        this.material.effect.setProperty('time', this.time);
        if (this.time > 1.2) {
            this.unschedule(this.upd);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Gradient.prototype, "label", void 0);
    Gradient = __decorate([
        ccclass
    ], Gradient);
    return Gradient;
}(cc.Component));
exports.default = Gradient;

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
        //# sourceMappingURL=Gradient.js.map
        