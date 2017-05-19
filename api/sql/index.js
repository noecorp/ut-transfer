var path = require('path');

module.exports = {
    schema: [
        {path: path.join(__dirname, 'schema'), linkSP: true},
        {path: path.join(__dirname, '../../modules/bulk/sql/schema'), linkSP: true}
    ]
};
