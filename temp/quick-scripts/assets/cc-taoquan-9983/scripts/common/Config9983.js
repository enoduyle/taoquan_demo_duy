(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/cc-taoquan-9983/scripts/common/Config9983.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5b3e4EXxoVE16FqOfcQ+kys', 'Config9983', __filename);
// cc-taoquan-9983/scripts/common/Config9983.js

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
                    STEP_STOP: 12,
                    NEAR_WIN_DELAY_TIME: 0.6,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 1,
                    EXPECT_PAYLINE_TIME: 2,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 2
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
                    STEP_STOP: 6,
                    NEAR_WIN_DELAY_TIME: 0.5,
                    NEAR_WIN_DELAY_TIME_LAST_REEL: 1,
                    EXPECT_PAYLINE_TIME: 2,
                    EXPECT_PAYLINE_ALLWAYS_TIME: 2,
                    MIN_TIME_EACH_PAYLINE: 2
                }
            },
            SUPER_TURBO: 0.20 * (60 / 255),
            SUB_SYMBOL: ['s1', 's2'],
            SYMBOL_NAME_LIST: [['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 's1', 's2'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K', 's1', 's2'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K', 's1', 's2'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K', 's1', 's2'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 's1', 's2'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A']],
            SYMBOL_NAME_LIST_FREE: [['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A']],

            LIST_WILD_FREE: ['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7'],
            WILD_NORMAL: "K",

            SYMBOL_SMALL_NAME_LIST: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q'],
            SYMBOL_WIDTH: 160,
            SYMBOL_HEIGHT: 161,
            SYMBOL_MARGIN_RIGHT: 0,
            GAME_ID: '9983',
            JP_PREFIX_EVENT: 'TQUAN_JP_',
            JP_NAMES: ["GRAND", "MAJOR"],
            JP_NAMES_ID: {
                "MAJOR": '',
                "GRAND": ''

            },
            EXTRA_BET_STEPS: [0],
            PAY_LINE_LENGTH: 250,
            STEPS: {
                '1': 100,
                '2': 1000,
                '3': 10000,
                '4': 100000,
                '5': 500000
            },
            DEFAULT_BET: 1000,
            STEPS_IFRAME: {
                '2': 1000,
                '3': 10000,
                '4': 100000,
                '5': 500000,
                '6': 1000000
            },
            DEFAULT_BET_IFRAME: 1000,
            EXTRA_STEPS: {
                '0': 0
            },
            DEFAULT_EXTRA_BET: 0,
            DEFAULT_TRIAL_WALLET: 50000000,
            TABLE_FORMAT: [3, 3, 3, 3, 3],
            TABLE_SYMBOL_BUFFER: {
                TOP: 1,
                BOT: 1
            },
            TABLE_FORMAT_FREE: [4, 4, 4, 4, 4],
            MESSAGE_DIALOG: getMessageSlot(),
            PAY_LINE_ALLWAYS: true,
            PAY_LINE_MATRIX: {},
            GAME_SPEED: {
                NORMAL: 0,
                TURBO: 1,
                INSTANTLY: 2
            },
            MUSIC_VOLUME: 0.5,
            SOUND_EFFECT_VOLUME: 1,
            BET_IDS: "10-20-30-40-50",
            BET_IDS_IFRAME: "20-30-40-50-60",

            IS_SUPPORT_MULTI_CURRENCY: false,
            CURRENCY_CONFIG: {
                USD: {
                    MONEY_FORMAT: {
                        DECIMAL_COUNT: 2,
                        CURRENCY_PREFIX: '$',
                        TRIM_ZERO: false,
                        CENT_UNIT: 0.5,
                        CENT_SUFFIX: '¢'
                    },
                    DEFAULT_TRIAL_WALLET: 10000,
                    MAX_BET: 20,
                    DEFAULT_TRIAL_JACKPOT: {
                        'USD_1_GRAND': 40000,
                        'USD_2_GRAND': 80000,
                        'USD_3_GRAND': 160000,
                        'USD_4_GRAND': 240000,
                        'USD_5_GRAND': 400000,
                        'USD_1_MAJOR': 4000,
                        'USD_2_MAJOR': 8000,
                        'USD_3_MAJOR': 16000,
                        'USD_4_MAJOR': 24000,
                        'USD_5_MAJOR': 40000
                    }
                },
                VND: {
                    MONEY_FORMAT: {
                        DECIMAL_COUNT: 0,
                        CURRENCY_PREFIX: '',
                        TRIM_ZERO: false
                    }
                },
                THB: {
                    DEFAULT_TRIAL_WALLET: 300000,
                    MAX_BET: 200,
                    MONEY_FORMAT: {
                        DECIMAL_COUNT: 2,
                        CURRENCY_PREFIX: '฿',
                        TRIM_ZERO: false
                    },
                    BET_FORMAT: {
                        IS_SHORT_FORMAT: false,
                        DECIMAL_COUNT: 2
                    },
                    DEFAULT_TRIAL_JACKPOT: {
                        "THB_1_GRAND": 40000,
                        "THB_2_GRAND": 80000,
                        "THB_3_GRAND": 160000,
                        "THB_4_GRAND": 240000,
                        "THB_5_GRAND": 400000,

                        "THB_1_MAJOR": 4000,
                        "THB_2_MAJOR": 8000,
                        "THB_3_MAJOR": 16000,
                        "THB_4_MAJOR": 24000,
                        "THB_5_MAJOR": 40000
                    }
                }
            },
            DECIMAL_MBET: {
                DEFAULT: 0,
                VND: 0,
                USD: 2
            }
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
        //# sourceMappingURL=Config9983.js.map
        