const crypto = require('crypto');

const e = {};

e.encrypt = (data, secret) => {
    const cipher = crypto.createCipher('aes-256-cbc-hmac-sha256', secret);
    return (cipher.update(data, 'utf8', 'hex') + cipher.final('hex'));
};

e.decrypt = (data, secret) => {
    const decipher = crypto.createDecipher('aes-256-cbc-hmac-sha256', secret);
    return (decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'));
};

module.exports = e;