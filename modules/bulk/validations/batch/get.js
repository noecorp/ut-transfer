var joi = require('joi');
module.exports = {
    description: 'get details of a batch',
    params: joi.object({
        batchId: joi.number().required()
    }),
    result: joi.object({
        batch: joi.array().items(joi.object({
            batchId: joi.string().required(),
            name: joi.string().required(),
            batchStatusId: joi.number(),
            status: joi.string().required(),
            batchType: joi.string(),
            batchTypeId: joi.number(),
            account: joi.string().allow(null),
            updatedOn: joi.date(),
            reason: joi.string().allow(null),
            createdBy: joi.date(),
            validatedOn: joi.date().allow(null),
            description: joi.string().allow(null),
            paymentsCount: joi.number(),
            totalAmount: joi.any()
        }))
    })
};
