var joi = require('joi');
module.exports = {
    description: 'Bulk payments management',
    params: joi.object({
        fromDate: joi.date(),
        toDate: joi.date(),
        batchTypeId: joi.number().required(),
        pageSize: joi.number(),
        pageNumber: joi.number(),
        sortBy: joi.string().allow('name', 'status', 'validatedOn'),
        sortOrder: joi.string().allow('ASC', 'DESC')
    }),
    result: joi.object({
        batch: joi.array().items(joi.object({
            batchId: joi.string().required(),
            name: joi.string().required(),
            batchStatusId: joi.number().allow(null),
            status: joi.string().required(),
            batchTypeId: joi.number().required(),
            account: joi.string(),
            createdOn: joi.date().allow(null),
            validatedOn: joi.date().allow(null),
            paymentsCount: joi.number(),
            totalAmount: joi.number(),
            rowNum: joi.number().allow(null)
        })),
        pagination: joi.array().items(joi.object({
            pageNumber: joi.number(),
            pageSize: joi.number(),
            pagesTotal: joi.number(),
            recordsTotal: joi.number()
        }))
    })
};
