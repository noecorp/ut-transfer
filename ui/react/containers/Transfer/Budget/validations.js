import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export function getTransferBUddgetValidations() {
    return [
        validations.account,
        validations.destinationAccountName,
        validations.iban,
        validations.paymentType,
        validations.amount,
        validations.reason,
        validations.documentType
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
            { type: textValidations.isRequired, errorMessage: <Text>Beneficiary name is required</Text> }
        ]
    },
    iban: {
        key: ['iban'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>IBAN is required</Text> },
            { type: textValidations.length, minVal: 22, maxVal: 22, errorMessage: <Text>IBAN must have a length of 22</Text> }
        ]
    },
    paymentType: {
        key: ['paymentType'],
        type: validationTypes.dropdown,
        rules: [
            { type: dropdownValidations.isRequired, errorMessage: <Text>Payment type is required</Text> }
        ]
    },
    amount: {
        key: ['amount'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Payment amount is required</Text> },
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
    }
};
