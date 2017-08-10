var joi = require('joi');

module.exports = {
    description: 'Online Banking fetch accounts',
    params: joi.any(),
    result: joi.any()
};
