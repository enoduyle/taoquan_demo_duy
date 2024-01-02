"use strict";
cc._RF.push(module, '05876D4O3hD65hcLNOJ+JVP', 'turnBaseFSM');
// cc-common/cc-share-v1/common/turnBaseFSM.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var StateMachine = require('javascript-state-machine');

exports.default = StateMachine.factory({ //  <-- the factory is constructed here
    init: 'bootingGame',
    transitions: [{
        name: 'gameStart',
        from: 'bootingGame',
        to: 'waitingAction'
    }, {
        name: 'gameResume',
        from: '*',
        to: 'showingResult'
    }, {
        name: 'actionTrigger',
        from: 'waitingAction',
        to: 'waitingResult'
    }, {
        name: 'resultReceive',
        from: 'waitingResult',
        to: 'showingResult'
    }, {
        name: 'gameRestart',
        from: 'showingResult',
        to: 'waitingAction'
    }, {
        name: 'gameEnd',
        from: 'showingResult',
        to: 'closingGame'
    }, {
        name: 'reboot',
        from: '*',
        to: 'bootingGame'
    }],
    methods: {
        onInvalidTransition: function onInvalidTransition() {
            // cc.log("fsm: transition not allowed from that state", transition, from, to);
        },
        onPendingTransition: function onPendingTransition() {
            // cc.log("fsm: transition already in progress", transition, from, to);
        },
        onTransition: function onTransition(lifecycle) {
            // cc.log("trigger: "+lifecycle.transition +", state change from "+ lifecycle.from +" to "+ lifecycle.to);
            if (this.GAME_MODE) {
                cc.log('%c ' + this.GAME_MODE + ':' + ('%c run ' + lifecycle.transition + ' =>'), 'color:blue;', 'color:red;', lifecycle.to);
            }
        }
    }
});
module.exports = exports['default'];

cc._RF.pop();