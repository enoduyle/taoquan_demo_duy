"use strict";
cc._RF.push(module, 'aad30aVAWVIzqLIOR9hj0Rc', 'ClosePopups9983');
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