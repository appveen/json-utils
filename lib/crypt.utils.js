const crypto = require('crypto');

const e = {};

e.encrypt = (data, secret) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    const cipher = crypto.createCipher('aes-256-cbc-hmac-sha256', secret);
    return (cipher.update(data, 'utf8', 'hex') + cipher.final('hex'));
};

e.decrypt = (data, secret) => {
    const decipher = crypto.createDecipher('aes-256-cbc-hmac-sha256', secret);
    const text = (decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'));
    let returnValue;
    try {
        returnValue = JSON.parse(text);
    } catch (e) {
        returnValue = text;
    }
    return returnValue;
};

module.exports = e;