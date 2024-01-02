"use strict";
cc._RF.push(module, '10de9eY875O3qKQcCGVOcmZ', 'LanguageData');
// cc-common/cc-slotbase-v2/localization/LanguageData.js

"use strict";

if (!window.languageData) window.languageData = {};
if (!window.defaultLanguage) window.defaultLanguage = 'VI';

var loadConfigAsync = require("loadConfigAsync");

var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
    LOGIN_IFRAME = _loadConfigAsync$getC.LOGIN_IFRAME;

var messageSlotConfig = {
	VI: {
		NAME: "DialogMessage",
		WILD: "Wild",
		SCATTER: "Scatter",
		BONUS: "Bonus",
		JACKPOT: "Jackpot",
		GRAND: "GRAND",
		MAJOR: "MAJOR",
		MINI: "MINI",
		MINOR: "MINOR",
		BASE_GAME: "Base Game",
		FREE_GAME: "Free Game",
		HISTORY_PAGE: "Trang",
		SECONDS: "s",
		TRIAL_MODE: "Chơi thử",
		REAL_MODE: "Chơi thật",
		SKIP_TUTORIAL: "Bỏ qua hướng dẫn",
		PLAYING_TRIAL: "Đang chơi thử",
		HOLD_AUTO_SPIN: "Giữ để tự quay",
		CLICK_TO_STOP: "Bấm để dừng",
		EXIT: "Thoát",
		BACK: "Trở lại",
		CLOSE: "Đóng",
		PREVIOUS: "Trở lại",
		NEXT: "Kế tiếp",
		BET_DETAILS: "Chi Tiết Cược",
		TOTAL_WIN: "Tổng thắng",
		SUMMARY: "Tổng kết",
		TOTAL_BET: "Tổng Cược",
		TOTAL: "Tổng thắng",
		NORMAL_GAME: "Normal",
		BONUS_GAME: "Bonus",
		TOPUP_GAME: "Top Up",
		FREE_SPIN_OPTION: "Freegame",
		FREE_GAME_OPTION: "Chế độ chơi Free",
		JACKPOT_FEATURE: "Bonus trúng hũ",
		JACKPOT_BONUS: "Hũ pick 3",
		JACKPOT_WHEEL: "Hũ wheel",
		BET_HISTORY: "Lịch Sử Cược",
		JACKPOT_HISTORY: "Lịch Sử Hũ",
		SETTINGS: "Cài Đặt",
		SOUND: "Âm Thanh",
		MUSIC: "Nhạc Nền",
		ON: "Bật",
		OFF: "Tắt",
		TIME: "Thời gian",
		HONOR: "Vinh danh",
		TYPE_JACKPOT: "Loại hũ",
		LINES: "Số line cược",
		WIN_AMOUNT: "Tiền thắng",
		WIN: "Thắng",
		WIN_TEXT_1: "thắng",
		LINE: "Line",
		RESULT: "Kết Quả",
		BIG_WIN: "Thắng Lớn",
		MEGA_WIN: "Thắng Cực Lớn",
		SUPER_WIN: "Thắng Siêu Lớn",
		GAME_RULES: "Luật Chơi",
		OK: "Đồng ý",
		CANCEL: "Huỷ",
		AUTO_SPIN: "Tự Động Quay",
		INTRO: "Giới thiệu",
		CONFIRM: "Xác nhận",
		PAYTABLE: "Bảng Trả Thưởng",
		FEATURE: "Tính năng",
		NOTICE: "Thông Báo",
		SESSION: "Phiên Chơi",
		CREDITS: "xu",
		DENOM: "Denom",
		BET_LEVEL: "Bet Level",
		BET_SIZES: "Bet Size",
		NOTIFY_JP_WON: "vừa thắng",
		TURBO_ON: "Turbo Bật",
		TURBO_OFF: "Turbo Tắt",
		MAX_BET: "Cược tối đa",
		MIN_BET: "Cược tối thiểu",
		JACKPOT_WIN: "Thắng hũ",
		FREEGAME_WIN: "Thắng miễn phí",
		BASE_GAME_WIN: "Thắng thường",
		ALLWAYS: "ALLWAYS",
		NOTIFY_JP_GRAND: "Grand Jackpot",
		NOTIFY_JP_MAJOR: "Major Jackpot",
		ROUND: "Lượt",
		RESPIN: "Vòng",
		YOU_WON: "Bạn đã thắng được",
		NO_MONEY: "Số dư trong ví không đủ, vui lòng nạp thêm để chơi tiếp.",
		LOST_CONNECT: "Bạn đã bị mất kết nối. \n Vui lòng chờ ...",
		SPIN_4_EVER: "Bạn đã mất kết nối. \n Vui lòng thử lại.",
		ANOTHER_ACCOUNT: "Tài khoản của bạn đã\nđăng nhập từ thiết bị khác.",
		AUTHEN_FAILED: "Xác thực tài khoản thất bại.",
		DEPOSIT_MONEY: "Số dư không đủ, bạn có muốn nạp thêm ?",
		MISMATCH_DATA: "Dữ liệu không đồng bộ với máy chủ, vui lòng thử lại.",
		SYSTEM_ERROR: "Có lỗi xảy ra, vui lòng thử lại.",
		DISCONNECT: "Bị mất kết nối tới máy chủ\n Đang kết nối lại.",
		NO_PLAYSESSION: "Hệ thống không tìm thấy phiên chơi.",
		GROUP_MAINTAIN: "Hệ thống đang bảo trì.\nVui lòng quay lại sau.",
		NETWORK_WARNING: "Đường truyền mạng yếu!",
		NETWORK_DISCONNECT: "Bị mất kết nối tới máy chủ \nĐang kết nối lại.",
		NO_FREESPIN_OPTION: "Dữ liệu không đồng bộ với máy chủ, vui lòng thử lại.",
		IN_PROGRESSING: "Mạng chậm vui lòng đợi trong giây lát để hoàn thành\nlượt quay hoặc bấm xác nhận để tải lại game.",
		SPIN_UNSUCCESS: "Thao tác không thành công, vui lòng thử lại.",
		ACCOUNT_BLOCKED_IFRAME_FALSE: "Tài khoản của bạn đã bị khoá, vui lòng liên hệ admin.",
		ACCOUNT_BLOCKED_IFRAME_TRUE: "Tài khoản bị khóa chơi game",
		FINISH_DEMO: "ĐÂY LÀ BẢN DEMO,\nBẠN CÓ MUỐN CHƠI THẬT KHÔNG?",
		SUGGEST_TURBO: "Bạn có vẻ đang chơi nhanh, bạn có muốn bật chế độ turbo không?",
		EVENT_ENDED: "Sự kiện đã kết thúc.",
		PROMOTION_EXPIRED: "Khuyến mãi đã hết hạn.",
		CURRENCY_NOT_SUPPORTED: "Tài khoản bạn không được hỗ trợ loại tiền tệ này, vui lòng liên hệ admin.",
		NO_BET_HISTORY: "Chưa có dữ liệu lịch sử cược",
		NO_JACKPOT_HISTORY: "Chưa có dữ liệu lịch sử hũ",
		BONUS_GAME_REMIND: "Hệ thống sẽ tự chọn sau:",
		REQUEST_DENIED: "Phiên đã hết hạn, vui lòng liên hệ với admin.",
		ERROR_CONNECTION_HISTORY: "Lỗi kết nối, vui lòng thử lại sau",
		PROMOTION_MESSAGE: "Bạn được tặng {1}\nlượt quay miễn phí,\nvới mức cược {2}",
		PROMOTION_RESET: "QUÀ TẶNG: {1} lượt quay miễn phí của ngày mới (cược {2})\nQUAY TIẾP NHÉ!",
		PROMOTION_NEW: "QUÀ TẶNG: {1} lượt quay miễn phí (cược {2})\nQUAY TIẾP NHÉ!",
		FREEGAME_REMAIN: "Bạn còn {1} lượt quay miễn phí",
		ACCOUNT_BLOCKED: LOGIN_IFRAME ? "Tài khoản bị khóa chơi game " + document.title.replace("Techplay - ", "") : "Tài khoản của bạn đã bị khoá, vui lòng liên hệ admin."
	},
	EN: {
		NAME: "DialogMessage",
		WILD: "Wild",
		SCATTER: "Scatter",
		BONUS: "Bonus",
		JACKPOT: "Jackpot",
		GRAND: "GRAND",
		MAJOR: "MAJOR",
		MINI: "MINI",
		MINOR: "MINOR",
		BASE_GAME: "Base Game",
		FREE_GAME: "Free Game",
		HISTORY_PAGE: "Page",
		SECONDS: "s",
		TRIAL_MODE: "Free Play",
		REAL_MODE: "Real Play",
		SKIP_TUTORIAL: "Skip",
		PLAYING_TRIAL: "Demo Mode",
		HOLD_AUTO_SPIN: "Hold for auto",
		CLICK_TO_STOP: "Stop",
		EXIT: "Exit",
		BACK: "Back",
		CLOSE: "Close",
		PREVIOUS: "Previous",
		NEXT: "Next",
		BET_DETAILS: "Bet Details",
		TOTAL_WIN: "Total Win",
		SUMMARY: "Summary",
		TOTAL_BET: "Total Bet",
		TOTAL: "Total Win",
		NORMAL_GAME: "Base Game",
		BONUS_GAME: "Bonus",
		TOPUP_GAME: "Top Up",
		FREE_SPIN_OPTION: "Free Spins Feature",
		FREE_GAME_OPTION: "Free Game Option",
		JACKPOT_FEATURE: "Jackpot Feature",
		JACKPOT_BONUS: "Jackpot Bonus",
		JACKPOT_WHEEL: "Jackpot Wheel",
		BET_HISTORY: "Bet History",
		JACKPOT_HISTORY: "Jackpot History",
		SETTINGS: "Settings",
		SOUND: "Sound",
		MUSIC: "Music",
		ON: "On",
		OFF: "Off",
		TIME: "Time",
		HONOR: "Honor",
		TYPE_JACKPOT: "Type",
		LINES: "Lines",
		WIN_AMOUNT: "Win",
		WIN: "Win",
		WIN_TEXT_1: "wins",
		LINE: "Line",
		RESULT: "Result",
		BIG_WIN: "Big Win",
		MEGA_WIN: "Mega Win",
		SUPER_WIN: "Super Mega Win",
		GAME_RULES: "Game Rules",
		OK: "OK",
		CANCEL: "Cancel",
		AUTO_SPIN: "Tự Động Quay",
		INTRO: "Intro",
		CONFIRM: "Confirm",
		PAYTABLE: "PAYTABLE",
		FEATURE: "Feature",
		NOTICE: "Messages",
		SESSION: "Session",
		CREDITS: "credits",
		DENOM: "Denom",
		BET_LEVEL: "Bet Level",
		BET_SIZES: "Bet Size",
		NOTIFY_JP_WON: "has just won",
		TURBO_ON: "Turbo ON",
		TURBO_OFF: "Turbo OFF",
		MAX_BET: "Max Bet",
		MIN_BET: "Min Bet",
		JACKPOT_WIN: "Jackpot Win",
		FREEGAME_WIN: "Free Game Win",
		BASE_GAME_WIN: "Base Game Win",
		ALLWAYS: "ALLWAYS",
		NOTIFY_JP_GRAND: "Grand Jackpot",
		NOTIFY_JP_MAJOR: "Major Jackpot",
		ROUND: "Round",
		RESPIN: "Respin",
		YOU_WON: "YOU WON",
		NO_MONEY: "Insufficient balance,\n please top up to continue.",
		LOST_CONNECT: "Your device is not connected to the Internet.\nPlease try again.",
		SPIN_4_EVER: "Your device is not connected to the Internet.\nPlease try again.",
		ANOTHER_ACCOUNT: "Account has been logged in\n on another device.",
		AUTHEN_FAILED: "Account authentication failed.",
		DEPOSIT_MONEY: "Insufficient balance,\n please top up your account.",
		MISMATCH_DATA: "Data sync error.\n Please try again later.",
		SYSTEM_ERROR: "Oops, an error occurred while \nloading, please try again!",
		DISCONNECT: "Sorry, could not connect to server!",
		NO_PLAYSESSION: "Session can't be found",
		GROUP_MAINTAIN: "Server maintenance, please come back later. Thank you!",
		NETWORK_WARNING: "Unstable connection. Please try again later!",
		NETWORK_DISCONNECT: "Sorry, could not connect to server!",
		NO_FREESPIN_OPTION: "Data sync error.\n Please try again later.",
		IN_PROGRESSING: "The network is slow, please wait for a moment to complete\nthe spin or click confirm to reload the game.",
		SPIN_UNSUCCESS: "Action failed. Please try again.",
		ACCOUNT_BLOCKED_IFRAME_FALSE: "Your account has been banned, please contact administrator.",
		ACCOUNT_BLOCKED_IFRAME_TRUE: "Your account is currently locked.",
		FINISH_DEMO: "THIS IS A DEMO,\nDO YOU WANT TO PLAY FOR REAL?",
		SUGGEST_TURBO: "Seems like you are playing in fast speed, do you want to turn Turbo Mode on?",
		EVENT_ENDED: "This event has ended.",
		PROMOTION_EXPIRED: "Promotion expired.",
		CURRENCY_NOT_SUPPORTED: "Your account is not supported in this currency, please contact admin.",
		NO_BET_HISTORY: "No records found",
		NO_JACKPOT_HISTORY: "No records found",
		BONUS_GAME_REMIND: "The system will automatically select after:",
		REQUEST_DENIED: "Sorry, your session has expired. Please contact administrator.",
		ERROR_CONNECTION_HISTORY: "Sorry, could not connect to server!",
		PROMOTION_MESSAGE: "You have received {1} free spins, with total bet {2}.",
		PROMOTION_RESET: "GIFT RECEIVED: {1} Freespins \nfor new day (total bet {2}). \nLET'S PLAY!",
		PROMOTION_NEW: "GIFT RECEIVED: {1} Freespins \n(total bet {2}). \nLET'S PLAY!",
		FREEGAME_REMAIN: "{1} Free spins left",
		ACCOUNT_BLOCKED: LOGIN_IFRAME ? "Your account is currently locked playing " + document.title.replace("Techplay - ", "") + "." : "Your account has been banned, please contact administrator."
	},

	TH: {
		NAME: "DialogMessage",
		WILD: "Wild",
		SCATTER: "Scatter",
		BONUS: "Bonus",
		JACKPOT: "Jackpot",
		GRAND: "GRAND",
		MAJOR: "MAJOR",
		MINI: "MINI",
		MINOR: "MINOR",
		BASE_GAME: "Base Game",
		FREE_GAME: "Free Game",
		HISTORY_PAGE: "หน้า",
		SECONDS: "วินาที",
		TRIAL_MODE: "ทดลอง \nเล่น",
		REAL_MODE: "เล่นจริง",
		SKIP_TUTORIAL: "ข้าม \nคำแนะนำ",
		PLAYING_TRIAL: "กำลังทดลองเล่น",
		HOLD_AUTO_SPIN: "กดค้างไว้เพื่อหมุน",
		CLICK_TO_STOP: "คลิกเพื่อหยุด",
		EXIT: "ออก",
		BACK: "กลับ",
		CLOSE: "ต่อไป",
		PREVIOUS: "กลับ",
		NEXT: "ต่อไป",
		BET_DETAILS: "รายละเอียดการเดิมพัน",
		TOTAL_WIN: "ชนะทั้งหมด",
		SUMMARY: "สรุป",
		TOTAL_BET: "เดิมพันรวม",
		TOTAL: "ชนะทั้งหมด",
		NORMAL_GAME: "Base Game",
		BONUS_GAME: "Bonus",
		TOPUP_GAME: "Top Up",
		FREE_SPIN_OPTION: "ฟรีเกม",
		FREE_GAME_OPTION: "หน้าการเลือกโหมด",
		JACKPOT_FEATURE: "แจ็คพอตโบนัส",
		JACKPOT_BONUS: "แจ็คพอตเลือกที่ 3",
		JACKPOT_WHEEL: "ล้อแจ็คพอต",
		BET_HISTORY: "ประวัติการเดิมพัน",
		JACKPOT_HISTORY: "ประวัติแจ็คพอต",
		SETTINGS: "การตั้งค่า",
		SOUND: "เสียง",
		MUSIC: "เสียงเพลง",
		ON: "เปิด",
		OFF: "ปิด",
		TIME: "เวลา",
		HONOR: "เกียรตินิยม",
		TYPE_JACKPOT: "ประเภทแจ็คพอต",
		LINES: "จำนวนไลน์การเดิมพัน",
		WIN_AMOUNT: "ชนะเงิน",
		WIN: "ชนะ",
		WIN_TEXT_1: "ชนะ",
		LINE: "ไลน์",
		RESULT: "ผลลัพธ์",
		BIG_WIN: "บิ๊กวิน",
		MEGA_WIN: "เมก้าวิน",
		SUPER_WIN: "ซุปเปอร์เมก้าวิน",
		GAME_RULES: "กฎของเกม",
		OK: "ยืนยัน",
		CANCEL: "ยกเลิก",
		AUTO_SPIN: "หมุนอัตโนมัติ",
		INTRO: "แนะนำ",
		CONFIRM: "ยืนยัน",
		PAYTABLE: "ตารางการชำระเงิน",
		FEATURE: "",
		NOTICE: "การแจ้งเตือน",
		SESSION: "ครั้ง",
		CREDITS: "เหรียญ",
		DENOM: "ราคาเหรียญ",
		BET_LEVEL: "เหรียญ",
		BET_SIZES: "",
		NOTIFY_JP_WON: "ชนะ",
		TURBO_ON: "เทอร์โบเปิด",
		TURBO_OFF: "เทอร์โบปิด",
		MAX_BET: "เดิมพันสูงสุด",
		MIN_BET: "เดิมพันขั้นต่ำ",
		JACKPOT_WIN: "ชนะ Jackpot",
		FREEGAME_WIN: "ชนะ Free Game",
		BASE_GAME_WIN: "ชนะ Base Game",
		ALLWAYS: "ชนะทั้งหมด",
		NOTIFY_JP_GRAND: "Grand Jackpot",
		NOTIFY_JP_MAJOR: "Major Jackpot",
		ROUND: "รอบที่",
		RESPIN: "Respin รอบที่",
		YOU_WON: "คุณชนะ",
		NO_MONEY: "ยอดคงเหลือในกระเป๋าสตางค์ \nของคุณไม่เพียงพอ\nกรุณาเติมเงินเพื่อเล่นต่อ",
		LOST_CONNECT: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		SPIN_4_EVER: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		ANOTHER_ACCOUNT: "บัญชีลงชื่อเข้าใช้จากอุปกรณ์อื่น",
		AUTHEN_FAILED: "การตรวจสอบบัญชีล้มเหลว",
		DEPOSIT_MONEY: "ยอดคงเหลือในกระเป๋าสตางค์ของคุณ\nไม่เพียงพอ \nกรุณาเติมเงินเพื่อเล่นต่อ",
		MISMATCH_DATA: "ข้อมูลไม่ซิงค์กับเซิร์ฟเวอร์ \nโปรดลองอีกครั้ง",
		SYSTEM_ERROR: "เกิดข้อผิดพลาด \nโปรดลองอีกครั้ง",
		DISCONNECT: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		NO_PLAYSESSION: "ระบบไม่พบเซสชันเกม",
		GROUP_MAINTAIN: "ระบบอยู่ในระหว่างการบำรุงรักษา \nโปรดกลับมาใหม่",
		NETWORK_WARNING: "การเชื่อมต่อเครือข่ายที่อ่อนแอ",
		NETWORK_DISCONNECT: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		NO_FREESPIN_OPTION: "ข้อมูลไม่ซิงค์กับเซิร์ฟเวอร์ \nโปรดลองอีกครั้ง",
		IN_PROGRESSING: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		SPIN_UNSUCCESS: "การดำเนินการล้มเหลว \nโปรดลองอีกครั้ง",
		ACCOUNT_BLOCKED_IFRAME_FALSE: "บัญชีของคุณถูกล็อค \nโปรดติดต่อแอดมิน",
		ACCOUNT_BLOCKED_IFRAME_TRUE: "บัญชีถูกล็อคจากการเล่นเกม",
		FINISH_DEMO: "นี่คือเดโม่ ยังเล่นต่อหรือไหม",
		SUGGEST_TURBO: "ดูเหมือนคุณกำลังเล่นเร็ว \nต้องการเปิดโหมดเทอร์โบไหม",
		EVENT_ENDED: "กิจกรรมสิ้นสุดแล้ว",
		PROMOTION_EXPIRED: "โปรโมชั่นหมดอายุแล้ว",
		CURRENCY_NOT_SUPPORTED: "บัญชีของคุณไม่รองรับสกุลเงินนี้ \nโปรดติดต่อแอดมิน",
		NO_BET_HISTORY: "ยังไม่มีข้อมูลประวัติการเดิมพัน",
		NO_JACKPOT_HISTORY: "ยังไม่มีประวัติแจ็คพอต",
		BONUS_GAME_REMIND: "ระบบจะหมุนอัตโนมัติหลังจากผ่านไป",
		REQUEST_DENIED: "เซสชันหมดอายุแล้ว \nโปรดติดต่อแอดมิน",
		ERROR_CONNECTION_HISTORY: "การเชื่อมต่อเกิดข้อผิดพลาด \nโปรดลองอีกครั้งในภายหลัง",
		PROMOTION_MESSAGE: "รับฟรีสปิน {1} ครั้ง \nโดยมีระดับการเดิมพัน: {2}",
		PROMOTION_RESET: "ของขวัญ: หมุนฟรี {1} ครั้งในวันใหม่ \n(เดิมพันทั้งหมด: {2}) \nหมุนครั้งต่อไป!",
		PROMOTION_NEW: "ของขวัญ: หมุนฟรี {1} ครั้ง \n(เดิมพันทั้งหมด: {2}) หมุนต่อไป!",
		FREEGAME_REMAIN: "คุณเหลือ Free Spins {1} รอบ",
		ACCOUNT_BLOCKED: LOGIN_IFRAME ? "บัญชีถูกล็อคจากการเล่นเกม \n" + document.title.replace("Techplay - ", "") : "บัญชีของคุณถูกล็อค \nโปรดติดต่อแอดมิน"
	}
};

if (!window.localizedString) window.localizedString = {};

module.exports = {
	getMessageSlot: function getMessageSlot() {
		var mess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var isBitmapFont = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var messageSlot = null;
		if (isBitmapFont) {
			var languageCode = (window.languageCode || window.defaultLanguage) + "_BITMAP_FONT";
			messageSlot = messageSlotConfig[languageCode];
		}

		if (!messageSlot) {
			messageSlot = messageSlotConfig[window.languageCode] || messageSlotConfig[window.defaultLanguage];
		}

		return Object.assign(messageSlot, mess);
	},
	getLocalizedString: function getLocalizedString(dataID) {
		var localizedText = localizedString[dataID] || {};
		return localizedText[window.languageCode] || localizedText[window.defaultLanguage];
	},
	updateLocalizeString: function updateLocalizeString(localizedString) {
		Object.assign(window.localizedString, localizedString);
	}
};

cc._RF.pop();