var bulkDebitInternal = [{key: 'account', name: 'Account'}, {key: 'customerName', name: 'Customer Name'},
    {key: 'description', name: 'Description'}, {key: 'amount', name: 'Amount'}, {key: 'currency', name: 'Currency'}];
// var bulkCreditInternal = [{key: 'account', name: 'Account'}, {key: 'customerName', name: 'Customer Name'},
//     {key: 'description', name: 'Description'}, {key: 'amount', name: 'Amount'}, {key: 'currency', name: 'Currency'}];
const batchColumns = {
    bulkDebitInternal,
    bulkCreditInternal: bulkDebitInternal,
    bulkCreditMerchantInternal: bulkDebitInternal
};
module.exports = {
    csvStringToJsonArray: function(csvString) {
        var data = {
            columns: [],
            rows: []
        };
        var array = csvString.split('\r\n');
        var headers = array[0].split(',');
        for (var i = 1; i < array.length; i++) {
            var rowArray = array[i].split(',');
            if (rowArray.length === headers.length) {
                var rowJson = {};
                for (var j = 0; j < rowArray.length; j++) {
                    rowJson[headers[j]] = rowArray[j];
                }
                data.rows.push(rowJson);
            }
        }
        data.columns = headers;
        return data;
    },
    checkBatchColumns: function(columns, batchType) {
        var matched = true;
        if (batchColumns[batchType]) {
            batchColumns[batchType].forEach(function(column) {
                if (columns.indexOf(column.name) === -1) {
                    matched = false;
                    return !0;
                }
            });
        } else {
            matched = false;
        }
        return matched;
    },
    getPaymentData: function(payment, batchType) {
        var record = {};
        if (batchColumns[batchType]) {
            for (var name in payment) {
                var key = (batchColumns[batchType].find(function(column) {
                    return column.name === name;
                }) || {}).key;
                record[key] = payment[name];
            }
            return record;
        } else {
            return null;
        }
    }
};
