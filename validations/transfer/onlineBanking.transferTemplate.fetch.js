var joi = require('joi');

module.exports = {
    description: 'Online Banking fetch templates',
    params: joi.any(),
    result: joi.any()
};
