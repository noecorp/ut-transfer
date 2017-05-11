var { filterElementTypes } = require('ut-front-react/components/GridToolBox/types');

var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);

module.exports = (gridStyle) => ({
    title: 'Settlement Report',
    grid: {
        fields: [
            {name: 'productName', title: 'Product Name'},
            {name: 'transferType', title: 'Transfer Type'},
            {name: 'transferCount', title: 'Transfer Count'},
            {name: 'transferAmount', title: 'Transfer Amount'},
            {name: 'transferFee', title: 'Transfer Fee'},
            {name: 'deniedCount', title: 'Denied Count'},
            {name: 'dueTo', title: 'Due to'}
        ],
        allowColumnConfig: true,
        method: 'db/transfer.report.settlement',
        resultsetName: 'settlement',
        externalStyle: gridStyle
    },
    toolbox: {
        showAdvanced: false,
        maxVisibleInputs: 5,
        filterAutoFetch: true
    },
    filters: [
        {
            label: 'Settlement Date',
            name: 'settlementDate',
            type: filterElementTypes.datePicker,
            defaultValue: date
        },
        {
            type: filterElementTypes.clear, validateFilter: false
        }
    ],
    order: {
        single: true,
        by: []
    }
});