"use strict";
exports.__esModule = true;

const deepmerge = require('deepmerge');

var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    ObjectUtils.prototype.flatten = function (obj = {}, delimeter = '.', parent) {
        var _this = this;
        if (!obj || Object.keys(obj).length === 0) {
            return null;
        }
        if (!delimeter) {
            delimeter = '.';
        }
        var temp = {};
        Object.keys(obj).forEach(function (key) {
            var thisKey = parent ? parent + delimeter + key : key;
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                temp = Object.assign(temp, _this.flatten(obj[key], delimeter, thisKey));
            }
            else {
                temp[thisKey] = obj[key];
            }
        });
        return temp;
    };
    ObjectUtils.prototype.unFlatten = function (obj = {}, delimeter = '.') {
        var _this = this;
        if (!obj || Object.keys(obj).length === 0) {
            return null;
        }
        if (!delimeter) {
            delimeter = '.';
        }
        var temp = {};
        Object.keys(obj).forEach(_key => {
            let keys = _key.split('#');
            if (keys.length > 1) {
                keys.reverse();
                let tempObj = keys.reduce((p, c) => {
                    return Object.defineProperty({}, c, {
                        value: p,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                }, obj[_key]);
                temp = deepmerge(temp, tempObj);
            } else {
                temp[_key] = obj[_key];
            }
        });
        return temp;
    };
    ObjectUtils.prototype.getValue = function (key, obj, delimeter = '.') {
        if (!obj || Object.keys(obj).length === 0) {
            return null;
        }
        if (!delimeter) {
            delimeter = '.';
        }
        if (obj[key]) {
            return obj[key];
        }
        return key.split(delimeter).reduce(function (p, c) {
            return p ? p[c] : null;
        }, obj);
    };
    ObjectUtils.prototype.clone = function (obj = {}) {
        if (!obj || Object.keys(obj).length === 0) {
            return null;
        }
        return JSON.parse(JSON.stringify(obj));
    };
    return ObjectUtils;
}());
module.exports = new ObjectUtils();
