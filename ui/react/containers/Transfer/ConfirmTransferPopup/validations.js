import { validationTypes, textValidations } from 'ut-front-react/validator/constants.js';
import React from 'react';
import Text from 'ut-front-react/components/Text';

export const getConfirmTransferPopupValidations = () => {
    return [
        validations.password,
        validations.otp
    ];
};

export const validations = {
    password: {
        key: ['password'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>Source Account is required</Text> }
        ]
    },
    otp: {
        key: ['otp'],
        type: validationTypes.text,
        rules: [
            { type: textValidations.isRequired, errorMessage: <Text>OTP is required</Text> }
        ]
    }
};
