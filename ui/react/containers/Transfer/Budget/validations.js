import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export const getTransferBuddgetValidations = () => {
    return [
        validations.account,
        validations.destinationAccountName,
        validations.iban,
        validations.paymentType,
        validations.amount,
        validations.reason,
        validations.documentType,
        validations.documentNumber
    ];
};

export const validations = {
    account: {
        key: ['account'],
        type: validationTypes.dropdown,
        rules: [
            { type: dropdownValidations.isRequired, errorMessage: <Text>Source Account is required</Text> }
        ]
    },
    destinationAccountName: {
        key: ['destinationName'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Beneficiary Name is required</Text> }
        ]
    },
    iban: {
        key: ['iban'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>IBAN is required</Text> },
            { type: textValidations.iban, errorMessage: <Text>IBAN must be valid</Text> }
        ]
    },
    paymentType: {
        key: ['paymentType'],
        type: validationTypes.dropdown,
        rules: [
            { type: dropdownValidations.isRequired, errorMessage: <Text>Payment Type is required</Text> }
        ]
    },
    amount: {
        key: ['amount'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Amount is required</Text> },
            { type: textValidations.regex, value: /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/g, errorMessage: <Text>Amount must be valid</Text> }
        ]
    },
    reason: {
        key: ['reason'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Payment reason is required</Text> }
        ]
    },
    documentType: {
        key: ['documentType'],
        type: validationTypes.dropdown,
        rules: [
            { type: dropdownValidations.isRequired, errorMessage: <Text>Document type is required</Text> }
        ]
    },
    documentNumber: {
        key: ['documentNumber'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Document Number is required</Text> }
        ]
    },
    personalIdentifier: {
        key: ['personalIdentifier'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Uniform Civil Number is required</Text> },
            { type: textValidations.uniformCivilNumber, errorMessage: <Text>Uniform Civil Number is invalid</Text> }
        ]
    }
};

export const customValidations = [
    {
        field: 'iban',
        key: ['iban'],
        rules: [
            { type: textValidations.iban, errorMessage: <Text>IBAN must be valid</Text> }
        ]
    },
    {
        field: 'documentDate',
        key: ['documentDate'],
        rules: [
            { isRequired: true, errorMessage: <Text>Document Date is required</Text> }
        ]
    },
    {
        field: 'startDate',
        key: ['startDate'],
        rules: [
            { isRequired: true, errorMessage: <Text>Payment Start Date is required</Text> }
        ]
    },
    {
        field: 'endDate',
        key: ['endDate'],
        rules: [
            { isRequired: true, errorMessage: <Text>Payment End Date is required</Text> }
        ]
    },
    {
        field: 'paymentSystem',
        key: ['paymentSystem'],
        rules: [
            { isRequired: true, errorMessage: <Text>Payment System is required</Text> }
        ]
    },
    {
        field: 'personalIdentifier',
        key: ['personalIdentifier'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.uniformCivilNumber, errorMessage: <Text>Uniform Civil Number is invalid</Text> }
        ]
    }
];
