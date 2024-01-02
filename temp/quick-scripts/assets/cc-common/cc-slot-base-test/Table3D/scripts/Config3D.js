(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/Table3D/scripts/Config3D.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a60814wXWNJIpbD+tC/8+gT', 'Config3D', __filename);
// cc-common/cc-slot-base-test/Table3D/scripts/Config3D.js

'use strict';

var _require = require('gameCommonUtils'),
    getMessageSlot = _require.getMessageSlot;

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        this.node.config = {
            STATS: {
                FAST: {
                    TIME: 0.06,
                    REEL_DELAY_START: 0,
                    REEL_DELAY_STOP: 0.5,
                    REEL_EASING_DISTANCE: 15,
                    REEL_EASING_TIME: 0.08,
                    BLINKS: 2,
                    BLINK_DURATION: 0.25,
                    ANIMATION_DURATION: 2,
                    STEP_STOP: 11.5,
                    NEAR_WIN_DELAY_TIME: 0.6,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 1,
                    EXPECT_PAYLINE_TIME: 2,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 0.2,
                    MODE: 'NORMAL',
                    DELAY_BIG_WILD: 1,
                    REEL_DELAY_SURE_WIN: 4,
                    CONFETTI_DUR: 2
                },
                TURBO: {
                    TIME: 0.05,
                    REEL_DELAY_START: 0.0,
                    REEL_DELAY_STOP: 0.0,
                    REEL_EASING_DISTANCE: 15,
                    REEL_EASING_TIME: 0.08,
                    BLINKS: 1,
                    BLINK_DURATION: 0.5,
                    ANIMATION_DURATION: 2,
                    STEP_STOP: 7,
                    NEAR_WIN_DELAY_TIME: 0.3,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 0.5,
                    EXPECT_PAYLINE_TIME: 2,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 0.1,
                    MODE: 'TURBO',
                    DELAY_BIG_WILD: 1,
                    REEL_DELAY_SURE_WIN: 4,
                    CONFETTI_DUR: 2
                }
            },
            GAME_SPEED: {
                NORMAL: 0,
                TURBO: 1,
                INSTANTLY: 2
            },
            SUPER_TURBO: 0.04,
            SYMBOL_NAME_LIST: [['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C']],
            SYMBOL_NAME_LIST_FREE: [['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C'], ['2', '3', '4', 'C']],
            SYMBOL_SMALL_NAME_LIST: ['2', '3', '4', 'C'],
            SYMBOL_WIDTH: 158,
            SYMBOL_HEIGHT: 154,
            SYMBOL_MARGIN_RIGHT: 0,

            SYMBOLS_PER_REEL: 12,
            CIRCLE_ANGLE: 360,

            GAME_ID: '9960',
            JP_PREFIX_EVENT: '9960_',
            JP_NAMES: ["GRAND", "MAJOR"],
            JP_NAMES_ID: {
                "GRAND": 0,
                "MAJOR": 1
            },
            PAY_LINE_LENGTH: 50,
            TOTAL_BET_CREDIT: 50,
            DENOMINATION_BONUS_SYMBOL: 20,
            BET_IDS: "10-20-30-40-50",
            BET_IDS_IFRAME: "10-20-30-40-50",
            EXTRA_BET_STEPS: [0],
            STEPS: {
                '10': 500,
                '20': 1000,
                '30': 5000,
                '40': 10000,
                '50': 50000,
                '60': 500000
            },
            DEFAULT_BET: 100,
            EXTRA_STEPS: {
                '0': 0
            },
            DEFAULT_EXTRA_BET: 0,
            DEFAULT_TRIAL_WALLET: 200000000,
            DEFAULT_TRIAL_JACKPOT: {
                "1_GRAND": 500000,
                "1_MAJOR": 50000,
                "2_GRAND": 1000000,
                "2_MAJOR": 100000,
                "3_GRAND": 5000000,
                "3_MAJOR": 500000,
                "4_GRAND": 10000000,
                "4_MAJOR": 1000000,
                "5_GRAND": 50000000,
                "5_MAJOR": 5000000,
                "6_GRAND": 500000000,
                "6_MAJOR": 50000000
            },
            MAX_BET: 50000,
            MAX_EXTRA_BET: 0,
            TABLE_FORMAT: [3, 3, 3, 3, 3],
            TABLE_FORMAT_FREE: [3, 3, 3, 3, 3],
            TABLE_SYMBOL_BUFFER: {
                TOP: 1,
                BOT: 1
            },
            PAY_LINE_ALLWAYS: true,
            USE_SHORT_PARAM: true,
            MUSIC_VOLUME: 0.5,
            SOUND_EFFECT_VOLUME: 1,
            IS_SHOW_JACKPOT_EXPLOSION: true,
            TIME_SHOW_JACKPOT_EXPLOSION: 5,
            MESSAGE_DIALOG: getMessageSlot({})
        };
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
        //# sourceMappingURL=Config3D.js.map
        