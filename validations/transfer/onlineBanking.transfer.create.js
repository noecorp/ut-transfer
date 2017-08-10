var joi = require('joi');

module.exports = {
    description: 'Online Banking create transfer',
    params: joi.any(),
    result: joi.any()
};
