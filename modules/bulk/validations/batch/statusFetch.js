var joi = require('joi');
module.exports = {
    description: 'Getting batch statuses',
    params: joi.object({}),
    result: joi.object({
        batchStatus: joi.array().items(joi.object({
            name: joi.string()
            .allow('Uploading', 'Invalid', 'New', 'Verifying', 'Ready', 'Rejected','Disabled', 'Approved', 'Processing', 'Done', 'Deleted')
            .required(),
            key: joi.number().required()
        }))
    })
};
