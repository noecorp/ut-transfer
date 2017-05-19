var joi = require('joi');
module.exports = {
    description: 'Add batch',
    params: joi.object({
        batch: joi.object({
            batchId: joi.string().allow(null),
            name: joi.string().required(),
            descrption: joi.string().allow(null),
            batchStatusId: joi.number().allow(null),
            batchTypeId: joi.number().required(),
            account: joi.string().allow(null),
            fileName: joi.string().allow(null)
        })
    }),
    result: joi.object({
        batch: joi.array().items(joi.object({
            batchId: joi.string().required(),
            name: joi.string().required(),
            batchStatusId: joi.number(),
            batchTypeId: joi.number().allow(null),
            account: joi.string().allow(null),
            updatedOn: joi.date().allow(null),
            createdOn: joi.date().allow(null),
            validatedOn: joi.date().allow(null)
        }))
    })
};
