"use strict";
cc._RF.push(module, '396f6B6iUhOio0AN24a1yJw', 'NodePool9983');
// cc-taoquan-9983/scripts/common/NodePool9983.js

"use strict";

cc.Class({
    extends: cc.NodePool,
    init: function init(prefab) {
        var initCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

        cc.log(this.LOGTAG, "Init Node Pool");
        this.objPrefab = prefab;
        for (var i = 0; i < initCount; i++) {
            var item = cc.instantiate(this.objPrefab);
            this.put(item);
        }
    },
    getSize: function getSize() {
        return this.size();
    },
    getObj: function getObj() {
        var obj = null;
        if (this.size() > 0) {
            obj = this.get(this);
        } else {
            obj = cc.instantiate(this.objPrefab);
            this.put(obj);
            obj = this.get(this);
        }
        return obj;
    },
    clearPool: function clearPool() {
        this.clear();
    },
    reinit: function reinit() {
        this.clear();
        this.init(this.objPrefab);
    }
});

cc._RF.pop();