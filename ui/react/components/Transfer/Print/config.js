/* eslint-disable object-property-newline */
const budget = [
    { items: [
        { type: 'field', label: 'Pay to', dataPath: ['destinationName'] }
    ] },
    { items: [
        { type: 'field', label: 'Beneficiary IBAN', dataPath: ['iban'] },
        { type: 'field', label: 'Beneficiary BIC', dataPath: ['bic'] }
    ] },
    { items: [
        { type: 'field', label: 'Beneficiary Bank', dataPath: ['bank'] }
    ] },
    { items: [
        { type: 'title', flex: 3, heading: 'Payment slip', summary: 'For transfer from/to the Budget' },
        { type: 'field', flex: 2, label: 'Currency', defaultValue: 'BGN' },
        { type: 'field', flex: 2, label: 'Amount', dataPath: ['amount'], align: 'right' }
    ] },
    { items: [
        { type: 'field', label: 'Reason', dataPath: ['reason'] }
    ] },
    { items: [
        { type: 'field', label: 'More Reason', dataPath: ['moreReason'] }
    ] },
    { items: [
        { type: 'field', flex: 1, label: 'D.Type', dataPath: ['documentType'] },
        { type: 'field', flex: 10, label: 'Doc. Number', dataPath: ['documentNumber'] },
        { type: 'field', flex: 10, label: 'Doc. Date', dataPath: ['documentDate'] }
    ] },
    { title: 'Payment period', items: [
        { type: 'field', label: 'Start Date', dataPath: ['startDate'] },
        { type: 'field', label: 'End Date', dataPath: ['endDate'] }
    ] },
    { items: [
        { type: 'field', label: 'Liable Entity Name', dataPath: ['liableEntityName'] }
    ] },
    { items: [
        { type: 'field', label: 'Liable Entity Bulstat', dataPath: ['liableEntityInfo', 'bulstat'] },
        { type: 'field', label: 'Liable Person Personal Identifier', dataPath: ['liableEntityInfo', 'personalIdentifier'] },
        { type: 'field', label: 'Liable Person Foreign Resident Identifier', dataPath: ['liableEntityInfo', 'foreignResidentIdentifier'] }
    ]},
    { items: [
        { type: 'field', label: 'Sender', dataPath: ['sourceName'] }
    ]},
    { items: [
        { type: 'field', flex: 2, label: 'Sender IBAN', dataPath: ['sourceIban'] },
        { type: 'field', flex: 1, label: 'Sender BIC' }
    ]},
    { items: [
        { type: 'field', flex: 1, label: 'Payment System', dataPath: ['paymentSystem'] },
        { type: 'field', flex: 2, label: 'Payment Date', dataPath: ['paymentDate'] },
        { type: 'field', flex: 2, label: 'Payment Type', dataPath: ['paymentType'] }
    ]}
];

const swift = [];

export default {
    budget, swift
};
