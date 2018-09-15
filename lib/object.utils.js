const deepmerge = require('deepmerge');

const e = {};

e.flatten = function (obj = {}, delimeter = '.', parent = null) {
    if (!obj || Object.keys(obj).length === 0) {
        return null;
    }
    if (!delimeter) {
        delimeter = '.';
    }
    const temp = {};
    Object.keys(obj).forEach(function (key) {
        const thisKey = parent ? parent + delimeter + key : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            temp = Object.assign(temp, e.flatten(obj[key], delimeter, thisKey));
        }
        else {
            temp[thisKey] = obj[key];
        }
    });
    return temp;
};

e.unFlatten = function (obj = {}, delimeter = '.') {
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

e.getValue = function (key, obj, delimeter = '.') {
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

e.setValue = function (key, obj, value, delimeter = '.') {
    if (!obj || Object.keys(obj).length === 0) {
        obj = {};
        obj[key] = value;
        return obj;
    }
    if (!delimeter) {
        delimeter = '.';
    }
    const len = key.split(delimeter).length;
    key.split(delimeter).reduce((p, c, ci) => {
        if (ci === len - 1) {
            if (p) {
                p[c] = value;
            } else {
                p = {};
                p[c] = value;
            }
        } else {
            if (!p) {
                p = {};
            }
            if (!p[c]) {
                p[c] = {};
            }
            return p[c];
        }
    }, obj);
};

e.deleteValue = function (key, obj, delimeter = '.') {
    if (!obj || Object.keys(obj).length === 0) {
        return null;
    }
    if (!delimeter) {
        delimeter = '.';
    }
    if (obj[key]) {
        delete obj[key];
    }
    const len = key.split(delimeter).length;
    key.split(delimeter).reduce((p, c, ci) => {
        if (ci === len - 1) {
            if (p) {
                delete p[c];
            }
        } else {
            if (p) {
                return p[c];
            }
        }
    }, obj);
};

e.deepmerge = (obj1 = {}, obj2 = {}) => {
    return deepmerge(obj1, obj2);
};

e.clone = (obj = {}) => {
    if (!obj || Object.keys(obj).length === 0) {
        return null;
    }
    return JSON.parse(JSON.stringify(obj));
};

e.convertToArray = (obj = {}, recursive = false) => {
    const temp = [];
    if (!obj || Object.keys(obj).length === 0) {
        return null;
    }
    Object.keys(obj).forEach(key => {
        if (recursive) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                temp.push({
                    key: key,
                    value: e.convertToArray(obj[key], recursive)
                });
            } else {
                temp.push({
                    key: key,
                    value: obj[key]
                });
            }
        } else {
            temp.push({
                key: key,
                value: obj[key]
            });
        }
    });
    return temp;
};


module.exports = e;
