export const inputsConfig = {
    left: [
        { key: 'account', type: 'dropdown', label: 'Изберете сметка', dropdownSource: 'accounts' },
        { key: 'sourceName', type: 'text', label: 'Име на задължено лице', readonly: true },
        { key: 'civilIdentifier', type: 'text', label: 'ЕГН/ЛНЧ на задължено лице', readonly: true },
        { key: 'bulstat', type: 'text', label: 'Булстат на задължено лице' },
        { key: 'destinationName', type: 'text', label: 'Име на получател' },
        { key: 'iban', type: 'text', label: 'IBAN' },
        { key: 'bic', type: 'text', label: 'BIC' }
    ],
    right: [
        { key: 'paymentType', type: 'dropdown', label: 'Вид на плащане', dropdownSource: 'accounts' },
        { key: 'amount', type: 'text', label: 'Сума' },
        { key: 'reason', type: 'text', label: 'Основание за плащане' },
        { key: 'moreReason', type: 'text', label: 'Още пояснения' },
        { key: 'documentType', type: 'dropdown', label: 'Вид на документа', dropdownSource: 'documentTypes' },
        { key: 'documentNumber', type: 'text', label: 'Номер на документа' },
        { key: 'documentDate', type: 'datePicker', label: 'Дата на документа' }
    ]
};
