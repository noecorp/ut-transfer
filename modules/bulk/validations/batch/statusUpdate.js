var joi = require('joi');
module.exports = {
    description: 'update status',
    params: joi.object({
        batchId: joi.number().required(),
        actionName: joi.string().required(),
        reason: joi.string().allow(null)
    }),
    result: joi.object({})
};
