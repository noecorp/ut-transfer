import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';

export function getTransferValidations() {
    return [
        priorityValidation,
        reasonValidation,
        otherBankCostsValidation,
        commentsValidation
    ];
}

export const priorityValidation = {
    key: ['transfer', 'priority'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: 'Priority is required.'}
    ]
};

export const reasonValidation = {
    key: ['transfer', 'reason'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Name is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 200, errorMessage: 'Reason should be between 2 and 200 symbols long.'}
    ]
};

export const otherBankCostsValidation = {
    key: ['transfer', 'otherBankCosts'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Other Bank Costs is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'Other Bank Costs should be between 2 and 100 symbols long.'}
    ]
};

export const commentsValidation = {
    key: ['transfer', 'comments'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Comments is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 200, errorMessage: 'Comments should be between 2 and 200 symbols long.'}
    ]
};
