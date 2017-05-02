'use strict';
var joi = require('joi');

module.exports = {
    description: 'get transfer report',
    notes: ['transfer report'],
    tags: ['list', 'transfer', 'report'],
    params: joi.object({
        cardNumber: joi.string(),
        accountNumber: joi.string(),
        deviceId: joi.string(),
        processingCode: joi.string(),
        startDate: joi.string(),
        endDate: joi.string(),
        issuerTxState: joi.number(),
        merchantName: joi.string(),
        pageNumber: joi.number().min(1),
        pageSize: joi.number().min(1)
    }),
    result: joi.any()
};
