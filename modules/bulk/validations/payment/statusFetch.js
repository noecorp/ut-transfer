var joi = require('joi');
module.exports = {
    description: 'Getting batch statuses',
    params: joi.object({}),
    result: joi.object({
        paymentStatus: joi.array().items(joi.object({
            code: joi.string()
            .allow('new', 'modified', 'disabled', 'verified', 'paid', 'failed', 'mismatch')
            .required(),
            name: joi.string()
            .allow('New', 'Modified', 'Disabled', 'Verified', 'Paid', 'Failed', 'Mismatch')
            .required(),
            key: joi.number().required()
        }))
    })
};
