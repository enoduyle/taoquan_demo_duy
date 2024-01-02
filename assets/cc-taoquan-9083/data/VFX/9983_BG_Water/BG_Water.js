cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1.0,
    },

    start () {
        const sprite = this.node.getComponent(cc.Sprite);
        if(sprite) {
            this.material = sprite.getMaterial(0);
        }
        this.time = 0;
    },

    update (dt) {
        if(!this.material) return;
        this.material.setProperty('iTime', this.time);
        this.time += this.speed * dt;
    },
});
