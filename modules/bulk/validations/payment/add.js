var joi = require('joi');
module.exports = {
    description: 'Add new payment',
    params: joi.object().keys({
        actorId: joi.string().example('4'),
        payments: joi.array().items(joi.object().keys({
            paymentId: joi.string().example('6').allow(null),
            customerNmae: joi.string().example('cooper'),
            sequenceNumber: joi.number().example(2),
            batchId: joi.number().example(2),
            amount: joi.string().example('222.00'),
            account: joi.string().required(),
            currency: joi.string()
        }))
    }),
    result: joi.object().keys({
        payments: joi.array().items(joi.object().keys({
            paymentId: joi.number().example(6),
            customerNmae: joi.string().example('cooper'),
            sequenceNumber: joi.number().example(2),
            updatedOn: joi.string().example('2017-04-26T12:55:39.444Z'),
            paymentStatusId: joi.number().example(7),
            batchId: joi.number().example(2),
            amount: joi.number().example(222),
            createdAt: joi.string().example('2017-04-26T12:55:27.792Z')
        }))
    })
};
