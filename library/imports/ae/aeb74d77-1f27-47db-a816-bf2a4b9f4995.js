"use strict";
cc._RF.push(module, 'aeb7413HydH26gWvypLn0mV', 'FluxaySuper');
// cc-common/cc-share-v1/shader/shaderEffect/FluxaySuper.ts

/**
 *
 * https://github.com/ShawnZhang2015/ShaderHelper/blob/master/assets/shader/FluxaySuper.js
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FluxaySuper = /** @class */ (function (_super) {
    __extends(FluxaySuper, _super);
    function FluxaySuper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    FluxaySuper.prototype.start = function () {
        this.material = this.sprite.getMaterial(0);
        this._start = Date.now();
    };
    FluxaySuper.prototype.update = function (dt) {
        var now = Date.now();
        var time = ((now - this._start) / 1000);
        this.material.setProperty('time', time);
    };
    __decorate([
        property(cc.Sprite)
    ], FluxaySuper.prototype, "sprite", void 0);
    FluxaySuper = __decorate([
        ccclass
    ], FluxaySuper);
    return FluxaySuper;
}(cc.Component));
exports.default = FluxaySuper;

cc._RF.pop();