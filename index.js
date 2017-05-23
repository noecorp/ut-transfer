module.exports = () => ({
    ports: [],
    modules: {
        currency: require('./currency'),
        transfer: require('./api/script'),
        errors: require('./errors'),
        'db/transfer': require('./api/sql'),
        bulk: require('./modules/bulk'),
        bulkHTTP: require('./modules/bulk/http')
        transferHTTP: require('./http')
    },
    validations: {
        transfer: require('./validations/transfer'),
        'db/transfer': require('./validations/db/transfer'),
        bulk: require('./modules/bulk/validations')
    }
});
