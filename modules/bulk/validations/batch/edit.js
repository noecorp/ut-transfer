var joi = require('joi');
module.exports = {
    description: '',
    notes: '',
    params: joi.object({
        batch: joi.array().items(
            joi.object({
                name: joi.string(),
                account: joi.string(),
                updatedOn: joi.date(),
                rejectReason: joi.string(),
                updatedBy: joi.string(),
                validatedOn: joi.date()
            })
        )
    }),
    result: joi.object({})
};
