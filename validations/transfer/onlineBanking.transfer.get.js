var joi = require('joi');

module.exports = {
    description: 'Online Banking get transfer details',
    params: joi.object().keys({
        transferId: joi.number().integer()
    }),
    result: joi.any()
};
