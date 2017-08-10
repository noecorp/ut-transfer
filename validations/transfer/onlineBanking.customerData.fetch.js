var joi = require('joi');

module.exports = {
    description: 'Online Banking customer data fetch',
    params: joi.any(),
    result: joi.any()
};
