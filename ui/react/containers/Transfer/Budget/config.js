export const inputsConfig = {
    left: {
        account: { key: 'account', type: 'dropdown', label: 'Source Account', dropdownSource: 'accounts' },
        sourceName: { key: 'sourceName', type: 'text', label: 'Sender Name', readonly: true },
        civilIdentifier: { key: 'civilIdentifier', type: 'text', readonly: true },
        foreignResidentIdentifier: { key: 'foreignResidentIdentifier', type: 'text', readonly: true },
        bulstat: { key: 'bulstat', type: 'text', label: 'Sender Bulstat' },
        destinationName: { key: 'destinationName', type: 'text', label: 'Beneficiary Name' },
        iban: { key: 'iban', type: 'text', label: 'IBAN' },
        bic: { key: 'bic', type: 'text', label: 'BIC', readonly: true },
        bank: { key: 'bank', type: 'text', label: 'Bank', readonly: true }
    },
    right: {
        paymentType: { key: 'paymentType', type: 'dropdown', label: 'Payment Type', dropdownSource: 'accounts' },
        amount: { key: 'amount', type: 'text', label: 'Amount' },
        reason: { key: 'reason', type: 'text', label: 'Payment Reason' },
        moreReason: { key: 'moreReason', type: 'text', label: 'Additional Payment Reason' },
        documentType: { key: 'documentType', type: 'dropdown', label: 'Document Type', dropdownSource: 'documentTypes' },
        documentNumber: { key: 'documentNumber', type: 'text' },
        documentDate: { key: 'documentDate', type: 'datePicker', label: 'Document Date' }
    }
};

export const uppercasedInputs = [
    'sourceName', 'civilIdentifier', 'foreignResidentIdentifier', 'bulstat', 'destinationName', 'iban', 'bic', 'bank',
    'amount', 'reason', 'moreReason', 'documentNumber'
];
