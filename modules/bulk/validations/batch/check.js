var joi = require('joi');
module.exports = {
    description: 'check the validity of the payments',
    notes: '',
    params: joi.object().keys({
        async: joi.bool().optional().description('whether to check synchronously or asynchronously'),
        batchId: joi.number().example(1).description('the id of the batch'),
        payments: joi.array().items(joi.number()).optional().description('array of payment IDs')
    }),
    result: joi.object().keys({
        batchId: joi.number().example(1),
        account: joi.string().allow(null),
        expirationDate: joi.string().example('2017-04-26T12:55:28.182Z').allow(null),
        name: joi.string().example('batch 1'),
        batchStatusId: joi.number().example(5).description('batch status id'),
        batchInfo: joi.string().allow(''),
        uploadInfo: joi.string().allow(''),
        actorId: joi.string().example('4'),
        fileName: joi.string().example('1493211327449_batch-dfsp1.csv'),
        originalFilename: joi.string().example('batch-dfsp1.csv'),
        validatedOn: joi.string().example('2017-04-26T12:55:28.182Z').allow(null)
    })
};
