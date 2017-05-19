var handlers = require('./handlers');
module.exports = {
    start: function() {
        var self = this;
        this.registerRequestHandler && this.registerRequestHandler([{
            method: 'POST',
            path: '/rpc/batch',
            config: {
                payload: {
                    maxBytes: this.config.fileUpload.payloadMaxBytes,
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                },
                handler: (request, _reply) => {
                    handlers.batchAddandUpdate.call(self, request, _reply);
                }
            }
        }, {
            method: 'PUT',
            path: '/rpc/batch',
            config: {
                payload: {
                    maxBytes: this.config.fileUpload.payloadMaxBytes,
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                },
                handler: (request, _reply) => {
                    handlers.batchAddandUpdate.call(self, request, _reply);
                }
            }
        }]);
    }
};
