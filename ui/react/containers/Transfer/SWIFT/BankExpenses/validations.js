import { validationTypes, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export function getBankExpensesValidations() {
    return [
        bankExpensesValidation
    ];
}

export const bankExpensesValidation = {
    key: ['expenses', 'expenses'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: <Text>Bank Expenses is required</Text>}
    ]
};
