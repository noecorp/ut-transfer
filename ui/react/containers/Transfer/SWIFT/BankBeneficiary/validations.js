import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

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
        {type: textValidations.isRequired, errorMessage: <Text>Swift is required</Text>},
        {type: textValidations.regex, value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, errorMessage: <Text>Swift is invalid</Text>}
    ]
};

export const cityValidation = {
    key: ['bankBeneficiary', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>City is required</Text>}
    ]
};

export const nameValidation = {
    key: ['bankBeneficiary', 'name'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Name is required</Text>}
    ]
};

export const countryValidation = {
    key: ['bankBeneficiary', 'country'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: <Text>Country is required</Text>}
    ]
};

export const addressValidation = {
    key: ['bankBeneficiary', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Address is required</Text>}
    ]
};
