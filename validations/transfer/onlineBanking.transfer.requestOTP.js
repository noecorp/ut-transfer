var joi = require('joi');

module.exports = {
    description: 'Online Banking fetch transfers',
    params: joi.any(),
    result: joi.any()
};
