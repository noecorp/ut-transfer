import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';

export function getSenderValidations() {
    return [
        sourceAccountValidation,
        phoneValidation,
        nameValidation,
        ibanOrdererValidation,
        cityValidation,
        transferDestinationValidation,
        countryValidation
    ];
}

export const sourceAccountValidation = {
    key: ['sender', 'sourceAccount'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: 'Source Account is required.'}
    ]
};

export const phoneValidation = {
    key: ['sender', 'phone'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Phone is required.'},
        {type: textValidations.length, minVal: 8, maxVal: 12, errorMessage: 'Phone should be between 8 and 12 symbols long.'}
    ]
};

export const nameValidation = {
    key: ['sender', 'name'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Name is required.'},
        {type: textValidations.length, minVal: 5, maxVal: 100, errorMessage: 'Name should be between 5 and 100 symbols long.'}
    ]
};

export const ibanOrdererValidation = {
    key: ['sender', 'ibanOrderer'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'IBAN is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'IBAN should be between 2 and 100 symbols long.'}
    ]
};

export const addressValidation = {
    key: ['sender', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Address is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'Address should be between 2 and 100 symbols long.'}
    ]
};

export const cityValidation = {
    key: ['sender', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'City is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'City should be between 2 and 100 symbols long.'}
    ]
};

export const transferDestinationValidation = {
    key: ['sender', 'transferDestination'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: 'Destination is required.'}
    ]
};

export const countryValidation = {
    key: ['sender', 'countryValidation'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: 'Country is required.'}
    ]
};
