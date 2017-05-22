var joi = require('joi');
module.exports = {
    description: 'Get a batch payment',
    params: joi.object().keys({
        paymentId: joi.string().example('1').description('the id of the batch')
    }).unknown(),
    result: joi.object().keys({
        payment: joi.array().items(joi.object({
            paymentId: joi.string().example('6'),
            customerName: joi.string().example('Example A'),
            account: joi.string().example('1233123').allow(null).allow(''),
            sequenceNumber: joi.any().example(2),
            comment: joi.string().example('User not found'),
            updatedOn: joi.string().example('2017-04-26T12:55:39.444Z'),
            paymentStatusId: joi.number().example(7),
            batchId: joi.number().example(2),
            paymentStatus: joi.string().example('mismatch'),
            amount: joi.any().example('222')
        }))
    })
};
