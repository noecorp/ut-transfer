var joi = require('joi');
module.exports = {
    description: 'Fetch batch payments',
    params: joi.object().keys({
        batchId: joi.string().example('1').description('the id of the batch'),
        sequenceNumber: joi.any(),
        customerName: joi.string(),
        account: joi.string(),
        paymentStatusId: joi.number(),
        pageSize: joi.number(),
        pageNumber: joi.number(),
        sortBy: joi.string().allow('name', 'status', 'validatedOn'),
        sortOrder: joi.string().allow('ASC', 'DESC')
    }).unknown(),
    result: joi.object().keys({
        payments: joi.array().items(joi.object().keys({
            paymentId: joi.string().example('6'),
            customerName: joi.string().example('Example A'),
            account: joi.string().example('1233123').allow(null).allow(''),
            sequenceNumber: joi.number().example(2),
            comment: joi.string().example('User not found'),
            updatedOn: joi.string().example('2017-04-26T12:55:39.444Z'),
            paymentStatusId: joi.number().example(7),
            batchId: joi.number().example(2),
            status: joi.string().example('mismatch'),
            amount: joi.any().example('222')
        })),
        pagination: joi.array().items(joi.object({
            pageNumber: joi.number(),
            pageSize: joi.number(),
            pagesTotal: joi.number(),
            recordsTotal: joi.number()
        }))
    })
};
