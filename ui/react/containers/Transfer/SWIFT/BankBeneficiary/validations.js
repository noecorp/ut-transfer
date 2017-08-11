import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';

export function getBankBeneficiaryValidations() {
    return [
        swiftValidation,
        cityValidation,
        nameValidation,
        countryValidation,
        addressValidation
    ];
}

export const swiftValidation = {
    key: ['bankBeneficiary', 'swift'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Swift is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'Swift should be between 2 and 100 symbols long.'}
    ]
};

export const cityValidation = {
    key: ['bankBeneficiary', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'City is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 100, errorMessage: 'City should be between 2 and 100 symbols long.'}
    ]
};

export const nameValidation = {
    key: ['bankBeneficiary', 'name'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Name is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 200, errorMessage: 'Name should be between 2 and 200 symbols long.'}
    ]
};

export const countryValidation = {
    key: ['bankBeneficiary', 'country'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: 'Country is required.'}
    ]
};

export const addressValidation = {
    key: ['bankBeneficiary', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: 'Address is required.'},
        {type: textValidations.length, minVal: 2, maxVal: 200, errorMessage: 'Address should be between 2 and 200 symbols long.'}
    ]
};
