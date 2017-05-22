var joi = require('joi');
module.exports = {
    description: 'Edit payment record',
    params: joi.object().keys({
        payment: joi.object({
            paymentId: joi.string().required(),
            customerName: joi.string().required(),
            amount: joi.any().required(),
            account: joi.string().required(),
            description: joi.string().allow(null)
        })
    }),
    result: joi.object([])
};
