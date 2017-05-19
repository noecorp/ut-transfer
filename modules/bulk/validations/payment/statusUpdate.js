var joi = require('joi');
module.exports = {
    description: 'Getting batch statuses',
    params: joi.object({
        statusCode: joi.string()
            .allow('new', 'modified', 'disabled', 'verified', 'paid', 'failed', 'mismatch')
            .required(),
        paymentId: joi.string().required()
    }),
    result: joi.object({})
};
