var joi = require('joi');
module.exports = {
    description: 'Add new payment',
    params: joi.object().keys({
        payment: joi.object({
            paymentId: joi.string().example('6').allow(null),
            customerName: joi.string().example('cooper'),
            sequenceNumber: joi.number().required(),
            batchId: joi.number().allow(null),
            amount: joi.any().required(),
            account: joi.string().required(),
            currency: joi.string().required()
        })
    }),
    result: joi.object().keys({
        payment: joi.array().items(joi.object().keys({
            paymentId: joi.number().example(6),
            customerName: joi.string().example('cooper'),
            sequenceNumber: joi.number().example(2),
            updatedOn: joi.string().example('2017-04-26T12:55:39.444Z'),
            paymentStatusId: joi.number().example(7),
            batchId: joi.number().example(2),
            amount: joi.any().example(222),
            createdOn: joi.string().example('2017-04-26T12:55:27.792Z')
        }))
    })
};
