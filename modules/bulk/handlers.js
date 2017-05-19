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
        return self.bus.importMethod('identity.check')(Object.assign({}, request.auth.credentials))
        .then(function() {
            var file = request.payload.file;
            if (!file) {
                return reply(new Error('missing file'));
            }
            var name = request.payload.name;
            var description = request.payload.description;
            var batchTypeId = request.payload.batchTypeId;
            var originalFileName = file.hapi.filename;
            if (originalFileName.length > self.config.fileUpload.maxFileName) {
                return reply(new Error('file name too long'));
            }
            if (['csv'].indexOf(originalFileName.split('.').pop())) {
                return reply(new Error('file extention not allowed'));
            }
            var fileName = (new Date()).getTime() + '_' + originalFileName;
            var filePath = path.join(self.bus.config.workDir, 'ut-port-httpserver', 'uploads', fileName);
            let dispatch = (method, params) => {
                // let promise = self.bus.importMethod('identity.check')(Object.assign({actionId: method}, request.auth.credentials))
                // return promise.then(() => self.bus.importMethod(method)(params));
                return self.bus.importMethod(method)(params, {
                    method,
                    auth: {
                        actorId: request.auth.credentials.actorId
                    }
                });
            };
            if (!request.auth.credentials) {
                return reply(new Error('missing credentials'));
            }
            return dispatch('bulk.batch.add', {
                batch: {
                    name,
                    description,
                    batchTypeId
                }
            }).then((result) => {
                var batch = (result.batch[0] || {});
                return new Promise((resolve, reject) => {
                    let fail = (err) => {
                        return alreadyReplied ? resolve() : dispatch('bulk.batch.statusUpdate', {
                            batchId: batch.batchId,
                            actionName: 'invalidBatch'
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
                                // || !helpers.checkBatchColumns(csvData.columns)
                                if (records.length === 0) {
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
                                    payment = {
                                        customerName: record['CustomerName'],
                                        account: record['DRaccountID'] || record['CRaccountID'],
                                        description: record['Description'],
                                        amount: record['Amount'],
                                        currency: record['Currency'],
                                        sequenceNumber: ++sequenceNumber,
                                        batchId: batch.batchId
                                    };
                                    promise = promise.then(addPayment(payment));
                                });
                                return promise
                                .then(function() {
                                    return dispatch('bulk.batch.statusUpdate', {
                                        batchId: batch.batchId,
                                        actionName: 'newBatch'
                                    })
                                    .catch(function(err) {
                                        return resolve(fail(err));
                                    });
                                })
                                .then(function() {
                                    if (request.payload.checkBatch) {
                                        // return dispatch('bulk.batch.check')({
                                        //     batchId: batch.batchId,
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
