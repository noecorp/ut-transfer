import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';

export function getBeneficiaryValidations() {
    return [
        recipientValidation,
        countryValidation,
        addressValidation,
        accountNumberValidation,
        cityValidation
    ];
}

export const recipientValidation = {
    key: ['beneficiary', 'recipient'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: 'Recipient is required.'}
    ]
};

export const countryValidation = {
    key: ['beneficiary', 'country'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: 'Country is required.'}
    ]
};

export const addressValidation = {
    key: ['beneficiary', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Address is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'Address should be between 2 and 100 symbols long.'}
    ]
};

export const accountNumberValidation = {
    key: ['beneficiary', 'accountNumber'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Account Number is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 200, errorMessage: 'Account Number should be between 2 and 200 symbols long.'}
    ]
};

export const cityValidation = {
    key: ['beneficiary', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'City is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 50, errorMessage: 'City should be between 2 and 50 symbols long.'}
    ]
};
