(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-common/cc-slot-base-test/TestReel/ConfigSlotTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42bc1H1o4RJorbYFtHkgyOJ', 'ConfigSlotTest', __filename);
// cc-common/cc-slot-base-test/TestReel/ConfigSlotTest.js

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
                    BLINK_DURATION: 0.5,
                    ANIMATION_DURATION: 2,
                    STEP_STOP: 14,
                    NEAR_WIN_DELAY_TIME: 0.6,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 1,
                    EXPECT_PAYLINE_TIME: 2,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 0
                },
                TURBO: {
                    TIME: 0.05,
                    REEL_DELAY_START: 0.0,
                    REEL_DELAY_STOP: 0.0,
                    REEL_EASING_DISTANCE: 15,
                    REEL_EASING_TIME: 0.08,
                    BLINKS: 1,
                    BLINK_DURATION: 0.5,
                    ANIMATION_DURATION: 1,
                    STEP_STOP: 8,
                    NEAR_WIN_DELAY_TIME: 0.3,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 0.5,
                    EXPECT_PAYLINE_TIME: 1,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 0
                }
            },
            GAME_SPEED: {
                NORMAL: 0,
                TURBO: 1,
                INSTANTLY: 2
            },
            TREASURE_VALUE: [{ value: 5, count: 7 }, { value: 15, count: 5 }, { value: 45, count: 3 }],
            SUPER_TURBO: 0.04,
            SYMBOL_NAME_LIST: [['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9']],
            SYMBOL_NAME_LIST_FREE: [['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9'], ['2', '3', '4', '5', '6', '7', '8', '9']],
            SYMBOL_SMALL_NAME_LIST: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J'],
            SYMBOL_WIDTH: 162,
            SYMBOL_HEIGHT: 150,
            SYMBOL_MARGIN_RIGHT: 26,

            SYMBOL_WIDTH_HISTORY: 152,
            SYMBOL_HEIGHT_HISTORY: 125,
            SYMBOL_PADDING_HISTORY: 4,

            GAME_ID: '9980',
            JP_PREFIX_EVENT: 'THLQS_JP_',
            JP_NAMES: ["GRAND"],
            EXTRA_BET_STEPS: [0, 1, 2, 3],
            PAY_LINE_LENGTH: 20,
            TOTAL_BET_CREDIT: 20,
            STEPS: {
                '1': 50,
                '2': 100,
                '3': 150,
                '4': 200,
                '5': 250,
                '6': 300,
                '7': 350,
                '8': 400
            },
            DEFAULT_BET: 50,
            EXTRA_STEPS: {
                '1': 10,
                '2': 25,
                '3': 50,
                '4': 60
            },
            DEFAULT_EXTRA_BET: 1,
            DEFAULT_TRIAL_WALLET: 100000000,
            DEFAULT_TRIAL_JACKPOT: {
                "1_GRAND": 1000000,
                "2_GRAND": 10000000,
                "3_GRAND": 100000000
            },
            MAX_BET: 3500,
            TABLE_FORMAT: [3, 3, 3, 3, 3],
            // TABLE_FORMAT: [5,5,5,5,5],
            TABLE_SYMBOL_BUFFER: {
                TOP: 1,
                BOT: 1
            },
            PAY_LINE_ALLWAYS: false,
            PAY_LINE_MATRIX: {
                "1": [1, 1, 1, 1, 1],
                "2": [0, 0, 0, 0, 0],
                "3": [2, 2, 2, 2, 2],
                "4": [1, 1, 0, 1, 1],
                "5": [1, 1, 2, 1, 1],
                "6": [0, 0, 1, 0, 0],
                "7": [2, 2, 1, 2, 2],
                "8": [0, 2, 0, 2, 0],
                "9": [2, 0, 2, 0, 2],
                "10": [1, 0, 2, 0, 1],
                "11": [2, 1, 0, 1, 2],
                "12": [0, 1, 2, 1, 0],
                "13": [1, 2, 1, 0, 1],
                "14": [1, 0, 1, 2, 1],
                "15": [2, 1, 1, 1, 2],
                "16": [0, 1, 1, 1, 0],
                "17": [1, 2, 2, 2, 1],
                "18": [1, 0, 0, 0, 1],
                "19": [2, 2, 1, 0, 0],
                "20": [0, 0, 1, 2, 2]
            },
            MUSIC_VOLUME: 0.5,
            SOUND_EFFECT_VOLUME: 1,
            MESSAGE_DIALOG: getMessageSlot({}),
            TIME_SHOW_JACKPOT_EXPLOSION: 3
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
        //# sourceMappingURL=ConfigSlotTest.js.map
        