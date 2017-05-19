var joi = require('joi');
module.exports = {
    description: '',
    params: joi.object({}),
    result: joi.object({
        batchType: joi.array().items(joi.object({
            id: joi.number().required(),
            name: joi.string()
            .allow('Bulk Credit Internal', 'Bulk Debit Internal','Bulk Credit Merchant')
            .required(),
            key: joi.string().required()
        }))
    })
};
