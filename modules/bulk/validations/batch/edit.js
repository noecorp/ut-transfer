var joi = require('joi');
module.exports = {
    description: 'Edit batch',
    params: joi.object({
        batch: joi.object({
            batchId: joi.string().required(),
            name: joi.string().required(),
            account: joi.string().allow(null),
            description: joi.string().required()
        })
    }),
    result: joi.object([])
};
