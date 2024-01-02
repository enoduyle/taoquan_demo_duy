(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/ClosePopups9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aad30aVAWVIzqLIOR9hj0Rc', 'ClosePopups9983', __filename);
// cc-taoquan-9983/scripts/common/ClosePopups9983.js

"use strict";

cc.Class({
	extends: cc.Component,

	onLoad: function onLoad() {
		var canvas = cc.find('Canvas');
		this._director = canvas.getComponentInChildren("Director");
		// ! not apply for web app 
		// this.node.on(cc.Node.EventType.TOUCH_END, this.closePopups, this);
		this.fadeSpeed = 0.2;
		this.isFading = false;
	},
	closePopups: function closePopups() {
		var _this = this;

		if (this.isFading) return;
		this.isFading = true;
		this.scheduleOnce(function () {
			_this.isFading = false;
		}, this.fadeSpeed);
		this._director.closePopups && this._director.closePopups();
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
        //# sourceMappingURL=ClosePopups9983.js.map
        