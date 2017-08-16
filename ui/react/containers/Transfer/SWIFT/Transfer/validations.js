import { validationTypes, textValidations, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export function getTransferValidations() {
    return [
        priorityValidation,
        reasonValidation
        // otherBankCostsValidation
        // commentsValidation
    ];
}

export const priorityValidation = {
    key: ['transfer', 'priority'],
    type: validationTypes.dropdown,
    rules: [
        {type: dropdownValidations.isRequired, errorMessage: <Text>Priority is required</Text>}
    ]
};

export const reasonValidation = {
    key: ['transfer', 'reason'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.isRequired, errorMessage: <Text>Name is required</Text>}
    ]
};

// export const otherBankCostsValidation = {
//     key: ['transfer', 'otherBankCosts'],
//     type: validationTypes.text,
//     rules: [
//         {type: textValidations.isRequired, errorMessage: <Text>Other Bank Costs is required</Text>}
//     ]
// };

// export const commentsValidation = {
//     key: ['transfer', 'comments'],
//     type: validationTypes.text,
//     rules: [
//         {type: textValidations.isRequired, errorMessage: <Text>More Info is required</Text>}
//     ]
// };
