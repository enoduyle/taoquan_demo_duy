"use strict";
cc._RF.push(module, '809b1YpvLlJvq+h9J5sp5TP', 'slotUtils');
// cc-common/cc-slotbase-v2/component/slotUtils.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factorial = factorial;
exports.combination = combination;
exports.bezier = bezier;
exports.bezierTo = bezierTo;
exports.bezierBy = bezierBy;
exports.exportDataFile = exportDataFile;
exports.importDataFile = importDataFile;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getWorldScale(node) {
    var currentNode = node;
    var scale = currentNode.scale;
    while (currentNode.parent) {
        scale *= currentNode.parent.scale;
        currentNode = currentNode.parent;
    }
    return scale;
}

var _factoryCache = {};

function factorial(n) {
    if (_factoryCache[n] !== void 0) return _factoryCache[n];
    _factoryCache[n] = n < 2 ? 1 : n * factorial(n - 1);
    return _factoryCache[n];
}

function combination(n, k) {
    return factorial(n) / factorial(k) / factorial(n - k);
}

function bezier(pos, t) {
    var n = pos.length - 1,
        t1 = 1 - t;
    var _val = 0;
    for (var i = 0; i <= n; i++) {
        // Pi * Combine(n,i) * t^i * (1-t)^(n-i)
        _val += pos[i] * combination(n, i) * Math.pow(t, i) * Math.pow(t1, n - i);
    }
    return _val;
}

function bezierTo(node, duration, positions) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _target = { t: 0 };
    var bezierX = void 0,
        bezierY = void 0;
    var _options = Object.assign({}, option);
    _options.progress = function (start, end, current, ratio) {
        var t = _target.t;

        node.x = bezier(bezierX, t);
        node.y = bezier(bezierY, t);
        return start + (end - start) * ratio;
    };

    var tweenBezier = cc.tween(_target).call(function () {
        _target.t = 0;
        var x = node.x,
            y = node.y;

        bezierX = [x].concat(_toConsumableArray(positions.map(function (p) {
            return p.x;
        })));
        bezierY = [y].concat(_toConsumableArray(positions.map(function (p) {
            return p.y;
        })));
    }).to(duration, { t: 1 }, _options).start();

    return tweenBezier;
}

function bezierBy(node, duration, positions) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _target = { t: 0 };
    var bezierX = void 0,
        bezierY = void 0;

    option.progress = function (start, end, current, ratio) {
        var t = _target.t;

        node.x = bezier(bezierX, t);
        node.y = bezier(bezierY, t);
        return start + (end - start) * ratio;
    };

    var tweenBezier = cc.tween(_target).call(function () {
        _target.t = 0;
        var x = node.x,
            y = node.y;

        var _x = x,
            _y = y;
        bezierX = [x].concat(_toConsumableArray(positions.map(function (p) {
            return _x += p.x;
        })));
        bezierY = [y].concat(_toConsumableArray(positions.map(function (p) {
            return _y += p.y;
        })));
    }).to(duration, { t: 1 }, option).start();

    return tweenBezier;
}

/**
 * @only for web
 * @example exportDataFile({"speed":10}, config.json);
 */
function exportDataFile(dataStr, fileName) {
    var type = fileName.split(".").pop();
    var dataUri = 'data:application/' + type + ';charset=utf-8,' + encodeURIComponent(dataStr);
    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
}

/**
 * @only for web
 * @example importDataFile((result)=> {console.log(result)});
 */
function importDataFile(callback) {
    var input = window.document.createElement("input");
    input.type = "file";
    document.body.appendChild(input);
    setTimeout(function () {
        input.click();
    }, 500);
    input.onchange = function () {
        var selectedFile = input.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            console.log("file loaded", event.target.result);
            callback(event.target.result);
        };
        reader.readAsText(selectedFile);
    };
}

module.exports = {
    getWorldScale: getWorldScale,
    bezierTo: bezierTo,
    bezierBy: bezierBy,
    bezier: bezier,
    exportDataFile: exportDataFile,
    importDataFile: importDataFile
};

cc._RF.pop();