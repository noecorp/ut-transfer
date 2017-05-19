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
            batchStatusId: joi.number().allow(null),
            status: joi.string().required(),
            batchType: joi.string().allow(null),
            batchTypeId: joi.number().allow(null),
            account: joi.string(),
            updatedOn: joi.date().allow(null),
            rejectReason: joi.string().allow(null),
            createdBy: joi.date().allow(null),
            createdOn: joi.string().allow(null),
            validatedOn: joi.date().allow(null),
            descrption: joi.string().allow(null),
            paymentsCount: joi.number(),
            totalAmount: joi.number()
        }))
    })
};
