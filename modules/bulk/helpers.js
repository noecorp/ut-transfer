
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
    checkBatchColumns: function(columns1, columns2) {
        var matched = true;
        return matched;
    }
};
