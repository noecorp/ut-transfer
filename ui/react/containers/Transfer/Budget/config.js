export const inputsConfig = {
    left: {
        account: { key: 'account', type: 'dropdown', label: 'Select account', dropdownSource: 'accounts' },
        sourceName: { key: 'sourceName', type: 'text', label: 'Sender name', readonly: true },
        civilIdentifier: { key: 'civilIdentifier', type: 'text', readonly: true },
        foreignResidentIdentifier: { key: 'foreignResidentIdentifier', type: 'text', readonly: true },
        bulstat: { key: 'bulstat', type: 'text', label: 'Sender bulstat' },
        destinationName: { key: 'destinationName', type: 'text', label: 'Beneficiary name' },
        iban: { key: 'iban', type: 'text', label: 'IBAN' },
        bic: { key: 'bic', type: 'text', label: 'BIC', readonly: true },
        bank: { key: 'bank', type: 'text', label: 'Bank', readonly: true }
    },
    right: {
        paymentType: { key: 'paymentType', type: 'dropdown', label: 'Payment type', dropdownSource: 'accounts' },
        amount: { key: 'amount', type: 'text', label: 'Amount' },
        reason: { key: 'reason', type: 'text', label: 'Payment reason' },
        moreReason: { key: 'moreReason', type: 'text', label: 'Additional payment reason' },
        documentType: { key: 'documentType', type: 'dropdown', label: 'Document type', dropdownSource: 'documentTypes' },
        documentNumber: { key: 'documentNumber', type: 'text' },
        documentDate: { key: 'documentDate', type: 'datePicker', label: 'Document date' }
    }
};

export const uppercasedInputs = [
    'sourceName', 'civilIdentifier', 'foreignResidentIdentifier', 'bulstat', 'destinationName', 'iban', 'bic', 'bank',
    'amount', 'reason', 'moreReason', 'documentNumber'
];
