"use strict";
cc._RF.push(module, 'c5bbeN99S9C/KxNP4D54mIB', 'serviceRest');
// cc-common/cc-share-v1/shareServices/serviceRest.js

"use strict";

// Rest API to connect to server


function encodeQueryData(data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

var apiObject = {

    getRawDataWeb: function getRawDataWeb(_ref) {
        var _ref$fullURL = _ref.fullURL,
            fullURL = _ref$fullURL === undefined ? '' : _ref$fullURL,
            _ref$callback = _ref.callback,
            callback = _ref$callback === undefined ? function () {} : _ref$callback,
            _ref$callbackErr = _ref.callbackErr,
            callbackErr = _ref$callbackErr === undefined ? function () {} : _ref$callbackErr;


        var request = new XMLHttpRequest();
        request.open("GET", fullURL, true);
        request.timeout = 15000;
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //get status text
                if (callback) {
                    if (request.responseText) {
                        callback(JSON.parse(request.responseText));
                    } else {
                        callbackErr();
                    }
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send();
    },

    get: function get(_ref2) {
        var _ref2$url = _ref2.url,
            url = _ref2$url === undefined ? '' : _ref2$url,
            _ref2$params = _ref2.params,
            params = _ref2$params === undefined ? {} : _ref2$params,
            _ref2$callback = _ref2.callback,
            callback = _ref2$callback === undefined ? function () {} : _ref2$callback,
            _ref2$apiUrl = _ref2.apiUrl,
            apiUrl = _ref2$apiUrl === undefined ? '' : _ref2$apiUrl,
            _ref2$callbackErr = _ref2.callbackErr,
            callbackErr = _ref2$callbackErr === undefined ? function () {} : _ref2$callbackErr;


        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var querystring = '?' + encodeQueryData(params);
        var fullURL = (apiUrl ? apiUrl : API_URL) + url + querystring;
        request.open("GET", fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //get status text
                if (callback) {
                    if (request.responseText) {
                        callback(JSON.parse(request.responseText));
                    } else {
                        callbackErr();
                    }
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send();
    },

    getWithHeader: function getWithHeader(_ref3) {
        var _ref3$url = _ref3.url,
            url = _ref3$url === undefined ? '' : _ref3$url,
            _ref3$params = _ref3.params,
            params = _ref3$params === undefined ? {} : _ref3$params,
            _ref3$headers = _ref3.headers,
            headers = _ref3$headers === undefined ? {} : _ref3$headers,
            _ref3$callback = _ref3.callback,
            callback = _ref3$callback === undefined ? function () {} : _ref3$callback,
            _ref3$apiUrl = _ref3.apiUrl,
            apiUrl = _ref3$apiUrl === undefined ? '' : _ref3$apiUrl,
            _ref3$callbackErr = _ref3.callbackErr,
            callbackErr = _ref3$callbackErr === undefined ? function () {} : _ref3$callbackErr;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC2 = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC2.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var querystring = '?' + encodeQueryData(params);
        var fullURL = (apiUrl ? apiUrl : API_URL) + url + querystring;
        request.open("GET", fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        Object.keys(headers).forEach(function (key) {
            request.setRequestHeader(key, headers[key]);
        });

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //get status text
                if (callback) {
                    if (request.responseText) {
                        callback(JSON.parse(request.responseText));
                    } else {
                        callbackErr();
                    }
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function () {
            callbackErr();
        };
        request.onerror = function () {
            callbackErr();
        };
        request.send();
    },

    post: function post(_ref4) {
        var _ref4$url = _ref4.url,
            url = _ref4$url === undefined ? '' : _ref4$url,
            _ref4$data = _ref4.data,
            data = _ref4$data === undefined ? {} : _ref4$data,
            _ref4$callback = _ref4.callback,
            callback = _ref4$callback === undefined ? function () {} : _ref4$callback,
            _ref4$apiUrl = _ref4.apiUrl,
            apiUrl = _ref4$apiUrl === undefined ? '' : _ref4$apiUrl,
            _ref4$callbackErr = _ref4.callbackErr,
            callbackErr = _ref4$callbackErr === undefined ? function () {} : _ref4$callbackErr;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC3 = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC3.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var dataPost = encodeQueryData(data);
        var fullURL = (apiUrl ? apiUrl : API_URL) + url;
        request.open('POST', fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.responseText) {
                    callback({
                        status: request.status,
                        data: JSON.parse(request.responseText)
                    });
                } else {
                    callbackErr();
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send(dataPost);
    },

    postWithHeader: function postWithHeader(_ref5) {
        var _ref5$url = _ref5.url,
            url = _ref5$url === undefined ? '' : _ref5$url,
            _ref5$params = _ref5.params,
            params = _ref5$params === undefined ? {} : _ref5$params,
            _ref5$headers = _ref5.headers,
            headers = _ref5$headers === undefined ? {} : _ref5$headers,
            _ref5$data = _ref5.data,
            data = _ref5$data === undefined ? {} : _ref5$data,
            _ref5$callback = _ref5.callback,
            callback = _ref5$callback === undefined ? function () {} : _ref5$callback,
            _ref5$apiUrl = _ref5.apiUrl,
            apiUrl = _ref5$apiUrl === undefined ? '' : _ref5$apiUrl,
            _ref5$callbackErr = _ref5.callbackErr,
            callbackErr = _ref5$callbackErr === undefined ? function () {} : _ref5$callbackErr;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC4 = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC4.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var dataPost = JSON.stringify(data);
        var querystring = '?' + encodeQueryData(params);
        var fullURL = (apiUrl ? apiUrl : API_URL) + url + querystring;
        request.open('POST', fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader('Content-type', 'application/json');

        Object.keys(headers).forEach(function (key) {
            request.setRequestHeader(key, headers[key]);
        });

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.responseText) {
                    callback({
                        status: request.status,
                        data: JSON.parse(request.responseText)
                    });
                } else {
                    callbackErr();
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send(dataPost);
    },

    postRaw: function postRaw(_ref6) {
        var _ref6$url = _ref6.url,
            url = _ref6$url === undefined ? '' : _ref6$url,
            _ref6$data = _ref6.data,
            data = _ref6$data === undefined ? {} : _ref6$data,
            _ref6$callback = _ref6.callback,
            callback = _ref6$callback === undefined ? function () {} : _ref6$callback,
            _ref6$apiUrl = _ref6.apiUrl,
            apiUrl = _ref6$apiUrl === undefined ? '' : _ref6$apiUrl,
            _ref6$callbackErr = _ref6.callbackErr,
            callbackErr = _ref6$callbackErr === undefined ? function () {} : _ref6$callbackErr;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC5 = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC5.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var dataPost = data;
        var fullURL = (apiUrl ? apiUrl : API_URL) + url;
        request.open('POST', fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.status == 200) {
                callback({
                    status: request.status,
                    data: request.responseText
                });
            } else {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send(dataPost);
    },

    put: function put(_ref7) {
        var _ref7$url = _ref7.url,
            url = _ref7$url === undefined ? '' : _ref7$url,
            _ref7$data = _ref7.data,
            data = _ref7$data === undefined ? {} : _ref7$data,
            _ref7$callback = _ref7.callback,
            callback = _ref7$callback === undefined ? function () {} : _ref7$callback,
            _ref7$apiUrl = _ref7.apiUrl,
            apiUrl = _ref7$apiUrl === undefined ? '' : _ref7$apiUrl,
            _ref7$callbackErr = _ref7.callbackErr,
            callbackErr = _ref7$callbackErr === undefined ? function () {} : _ref7$callbackErr;

        var loadConfigAsync = require('loadConfigAsync');

        var _loadConfigAsync$getC6 = loadConfigAsync.getConfig(),
            API_URL = _loadConfigAsync$getC6.API_URL;

        var request = cc.loader.getXMLHttpRequest();
        var dataPost = encodeQueryData(data);
        var fullURL = (apiUrl ? apiUrl : API_URL) + url;

        request.open('PUT', fullURL, true);
        request.timeout = 15000;
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.responseText) {
                    callback({
                        status: request.status,
                        data: JSON.parse(request.responseText)
                    });
                } else {
                    callbackErr();
                }
            } else if (request.readyState === 0) {
                callbackErr();
            }
            if (request.status !== 200) {
                callbackErr();
            }
        };
        request.ontimeout = function (e) {
            callbackErr(e);
        };
        request.onerror = function (e) {
            callbackErr(e);
        };
        request.send(dataPost);
    }
};

module.exports = apiObject;

cc._RF.pop();