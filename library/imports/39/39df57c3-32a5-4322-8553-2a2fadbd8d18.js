"use strict";
cc._RF.push(module, '39df5fDMqVDIoVTKi+tvY0Y', 'Saoguang');
// cc-common/cc-share-v1/shader/shaderEffect/Saoguang.ts

// port from https://blog.csdn.net/huadudududud/article/details/88631355
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Saoguang = /** @class */ (function (_super) {
    __extends(Saoguang, _super);
    function Saoguang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.time = 0;
        _this._time = 0;
        _this._sin = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Saoguang.prototype.onLoad = function () {
        this._time = 0;
        this._sin = 0;
    };
    Saoguang.prototype.start = function () {
        this.material = this.sprite.getMaterial(0);
    };
    Saoguang.prototype.update = function (dt) {
        if (this.material != null) {
            this._time += 0.5 * dt;
            this._sin = Math.sin(this._time);
            if (this._sin > 0.99) {
                this._sin = 0;
                this._time = 0;
            }
            this.material.effect.setProperty('sys_time', this._sin);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Saoguang.prototype, "sprite", void 0);
    Saoguang = __decorate([
        ccclass
    ], Saoguang);
    return Saoguang;
}(cc.Component));
exports.default = Saoguang;

cc._RF.pop();