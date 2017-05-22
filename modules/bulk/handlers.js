var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
module.exports = {
    batchAddandUpdate: function(request, _reply) {
        let alreadyReplied = false;
        var self = this;
        function reply(data) {
            if (alreadyReplied) {
                return data;
            }
            alreadyReplied = true;
            var code = 200;
            var message = data;
            if (data instanceof Error) {
                code = 400;
                message = data.errorPrint || data.message;
            }
            return _reply(message).code(code);
        }
        let dispatch = (method, params) => {
            return self.bus.importMethod(method)(params, {
                method,
                auth: {
                    actorId: request.auth.credentials.actorId
                }
            });
        };
        return self.bus.importMethod('identity.check')(Object.assign({}, request.auth.credentials))
        .then(() => dispatch('bulk.batch.typeFetch', {}))
        .then(function(result) {
            var batchTypes = result.batchTypes; var excludes = ['file'];
            var batch = {};
            for (var key in request.payload) {
                if (excludes.indexOf('key') === -1) {
                    batch[key] = request.payload[key];
                }
            }
            var file = request.payload.file;
            if (!file) {
                return reply(new Error('missing file'));
            }
            if (batch.originalFilename.length > self.config.fileUpload.maxFileName) {
                return reply(new Error('file name too long'));
            }
            if (['csv'].indexOf(batch.originalFilename.split('.').pop())) {
                return reply(new Error('file extention not allowed'));
            }
            var batchType = batchTypes.find(function(batchType) {
                return batchType.key === parseInt(batch.batchTypeId);
            });
            var fileName = (new Date()).getTime() + '_' + batch.originalFilename;
            batch.fileName = fileName;
            var filePath = path.join(self.bus.config.workDir, 'uploads', fileName);
            if (!request.auth.credentials) {
                return reply(new Error('missing credentials'));
            }
            return dispatch('bulk.batch.add', {
                batch
            }).then((result) => {
                var newBatch = (result.batch[0] || {});
                return new Promise((resolve, reject) => {
                    let fail = (err) => {
                        return alreadyReplied ? resolve() : dispatch('bulk.batch.statusUpdate', {
                            batchId: newBatch.batchId,
                            actionName: 'invalidBatch',
                            reason: err instanceof Error ? err.message : err
                        })
                        .then(() => {
                            self.log.error && self.log.error(err);
                            return resolve(reply(err));
                        })
                        .catch((err) => {
                            self.log.error && self.log.error(err);
                            return resolve(reply(err));
                        });
                    };
                    let ws = fs.createWriteStream(filePath);
                    ws.on('error', (err) => {
                        return fail(err);
                    });
                    file.pipe(ws);
                    ws.on('finish', (err) => {
                        if (err) {
                            return fail(err);
                        }
                        let records = [];
                        return new Promise(function(resolve, reject) {
                            fs.readFile(filePath, function(err, data) {
                                if (err) {
                                    return resolve(fail(err));
                                }
                                var csvData = helpers.csvStringToJsonArray(data.toString());
                                records = csvData.rows;
                                if (!records.length || !helpers.checkBatchColumns(csvData.columns, batchType.code)) {
                                    resolve(fail(new Error('Batch file is not valid')));
                                }
                                var sequenceNumber = 0; var payment = {};
                                var insertedRows = 0; var invalidRows = 0;
                                function addPayment(payment) {
                                    return dispatch('bulk.payment.add', {payment})
                                        .then(() => {
                                            insertedRows = insertedRows + 1;
                                            return insertedRows;
                                        })
                                        .catch(() => {
                                            invalidRows = invalidRows + 1;
                                        });
                                }
                                var promise = Promise.resolve();
                                records.forEach((record) => {
                                    payment = helpers.getPaymentData(record, batchType.code);
                                    payment.sequenceNumber = ++sequenceNumber;
                                    payment.batchId = newBatch.batchId;
                                    promise = promise.then(addPayment(payment));
                                });
                                return promise
                                .then(function() {
                                    return dispatch('bulk.batch.statusUpdate', {
                                        batchId: newBatch.batchId,
                                        actionName: 'newBatch'
                                    })
                                    .catch(function(err) {
                                        return resolve(fail(err));
                                    });
                                })
                                .then(function() {
                                    if (request.payload.checkBatch) {
                                        // return dispatch('bulk.batch.check')({
                                        //     batchId: newBatch.batchId,
                                        //     actorId: batch.actorId,
                                        //     async: true
                                        // }).then(function(result) {
                                        //     return resolve(reply({insertedRows: insertedRows}));
                                        // });
                                    }
                                    return resolve(reply({insertedRows, invalidRows}));
                                });
                            });
                        });
                    });
                });
            });
        })
        .catch((err) => reply(err));
    }
};
