import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

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
        {type: dropdownValidations.isRequired, errorMessage: <Text>Receiver is required</Text>}
    ]
};

export const countryValidation = {
    key: ['beneficiary', 'country'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: <Text>Country is required</Text>}
    ]
};

export const addressValidation = {
    key: ['beneficiary', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Address is required</Text>}
    ]
};

export const accountNumberValidation = {
    key: ['beneficiary', 'accountNumber'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Account Number is required</Text>},
        {type: textValidations.length, minVal: 1, maxVal: 34, errorMessage: <Text>Account Number is too long</Text>}
    ]
};

export const cityValidation = {
    key: ['beneficiary', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>City is required</Text>}
    ]
};

export const routingNumberValidation = {
    key: ['beneficiary', 'routingNumber'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Routing Number is requried</Text>}
    ]
};
