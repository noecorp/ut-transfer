import { validationTypes, textValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export function getCorrespondentBankBeneficiaryValidations() {
    return [
        swiftValidation
    ];
}

export const swiftValidation = {
    key: ['correspondentBankBeneficiary', 'swift'],
    type: validationTypes.text,
    rules: [
        {type: textValidations.regex, value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, errorMessage: <Text>Swift is invalid</Text>}
    ]
};
