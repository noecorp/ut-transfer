import { validationTypes, dropdownValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export function getAMLValidations() {
    return [
        fundsOriginValidation
    ];
}

export const fundsOriginValidation = {
    key: ['amlDeclaration', 'fundsOrigin'],
    type: validationTypes.dropdown,
    rules: [
         {type: dropdownValidations.isRequired, errorMessage: <Text>Funds Origin is required</Text>}
    ]
};
