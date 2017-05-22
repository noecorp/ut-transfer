var joi = require('joi');
module.exports = {
    description: '',
    params: joi.object({}),
    result: joi.object({
        batchTypes: joi.array().items(joi.object({
            key: joi.number().required(),
            name: joi.string(),
            code: joi.string().required()
        }))
    })
};
