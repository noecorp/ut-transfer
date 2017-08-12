import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

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
        {type: dropdownValidations.isRequired, errorMessage: <Text>Source Account is required</Text>}
    ]
};

export const phoneValidation = {
    key: ['sender', 'phone'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Phone is required</Text>}
    ]
};

export const nameValidation = {
    key: ['sender', 'name'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Name is required</Text>}
    ]
};

export const ibanOrdererValidation = {
    key: ['sender', 'ibanOrderer'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>IBAN is required</Text>}
    ]
};

export const addressValidation = {
    key: ['sender', 'address'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Address is required</Text>}
    ]
};

export const cityValidation = {
    key: ['sender', 'city'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>City is required</Text>}
    ]
};

export const transferDestinationValidation = {
    key: ['sender', 'transferDestination'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: <Text>Destination is required</Text>}
    ]
};

export const countryValidation = {
    key: ['sender', 'country'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: <Text>Country is required</Text>}
    ]
};
